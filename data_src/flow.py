"""Генератор блок-схем: узлы на сетке, ортогональные стрелки (поиск пути A*), ромбы-условия, дорожки.

f = Flow(cols, rows, 'Заголовок')
f.lane('Название', r0, r1, цвет, c0=None, c1=None)
f.node(id, колонка, ряд, вид, 'Подпись\\nв две строки', ссылка_на_карточку)
f.edge(a, b, сторона_выхода, сторона_входа, lbl='да', st='yes')
svg, hs = f.svg()      # hs — кликабельные зоны в процентах
Виды узлов: op, dec, prod, waste, store, conv, energy, start, end, sub, out.
Стили стрелок: main, yes, no, waste, energy, loop, data.
"""
import html, heapq
G = 8
CX, RY = 216, 104
MX, MY = 136, 48
SZ = {k: (176, 64) for k in ('op', 'prod', 'waste', 'store', 'conv', 'energy', 'start', 'end', 'sub', 'out')}
SZ['dec'] = (192, 80)
COL = {
    'op': ('#dbe7f3', '#23507a', '#14263a'), 'dec': ('#fff4cc', '#a37b00', '#3d2e00'),
    'prod': ('#e3efe0', '#2e6b3a', '#173a1d'), 'waste': ('#efe6dd', '#6e4a36', '#3b2a1e'),
    'store': ('#eef0f3', '#5b6470', '#22262b'), 'conv': ('#e9e2f3', '#5b3f86', '#2d1f44'),
    'energy': ('#fde3cf', '#b5531c', '#4a220a'), 'start': ('#d9efe9', '#1f6f5c', '#103a30'),
    'end': ('#d9efe9', '#1f6f5c', '#103a30'), 'sub': ('#f3e3f0', '#8a2f7a', '#3d1236'), 'out': ('#e3efe0', '#2e6b3a', '#173a1d')}
ES = {'main': ('#3a3f45', None, 2.2), 'yes': ('#2e6b3a', None, 2.2), 'no': ('#a33a2a', None, 2.2),
      'waste': ('#6e4a36', '6 4', 1.8), 'energy': ('#c8601e', '3 4', 2.2), 'loop': ('#1f8a5a', None, 2.4), 'data': ('#5b3f86', '8 4', 1.6)}
LANE = {'g': '#eef5ea', 'b': '#eaf0f7', 'y': '#fbf5e6', 'p': '#f4eef6', 'o': '#fdf0e6', 'n': '#f2f2f2'}
PRI = {'main': 0, 'yes': 0, 'no': 0, 'waste': 1, 'data': 2, 'energy': 2, 'loop': 3}
D4 = {'R': (1, 0), 'L': (-1, 0), 'T': (0, -1), 'B': (0, 1)}


class Flow:
    def __init__(s, cols, rows, title=''):
        s.cols, s.rows, s.title = cols, rows, title
        s.n, s.e, s.lanes = {}, [], []

    def node(s, id, c, r, kind, label, link=None):
        s.n[id] = dict(c=c, r=r, k=kind, l=label, link=link)

    def lane(s, title, r0, r1, color='n', c0=None, c1=None):
        s.lanes.append((title, r0, r1, color, c0, c1))

    def edge(s, a, b, fs=None, ts=None, lbl=None, st='main', lp=None):
        s.e.append(dict(a=a, b=b, fs=fs, ts=ts, lbl=lbl, st=st, lp=lp, fo=None, to=None))

    def size(s):
        return MX * 2 + (s.cols - 1) * CX, MY + 40 + (s.rows - 1) * RY + 120

    def cxy(s, id):
        n = s.n[id]; return MX + n['c'] * CX, MY + 40 + n['r'] * RY

    def port(s, id, side, off=0):
        x, y = s.cxy(id); w, h = SZ[s.n[id]['k']]
        return {'R': (x + w / 2, y + off), 'L': (x - w / 2, y + off), 'T': (x + off, y - h / 2), 'B': (x + off, y + h / 2)}[side]

    def auto_sides(s, a, b):
        A, B = s.n[a], s.n[b]; dc, dr = B['c'] - A['c'], B['r'] - A['r']
        if dr == 0: return ('R', 'L') if dc > 0 else ('L', 'R')
        if dc == 0: return ('B', 'T') if dr > 0 else ('T', 'B')
        if dr > 0: return ('R' if dc > 0 else 'L'), 'T'
        return ('R' if dc > 0 else 'L'), 'B'

    def prepare(s):
        W, H = s.size()
        for e in s.e:
            a, b = s.auto_sides(e['a'], e['b'])
            e['fs'] = e['fs'] or a; e['ts'] = e['ts'] or b
        cnt = {}
        for e in s.e: cnt[(e['a'], e['fs'])] = cnt.get((e['a'], e['fs']), 0) + 1
        for e in s.e:
            if cnt[(e['a'], e['fs'])] > 1 and not e['lp'] and s.n[e['a']]['k'] != 'dec': e['lp'] = 'end'
        io = {}
        for e in s.e:
            io.setdefault((e['a'], e['fs']), set()).add('out'); io.setdefault((e['b'], e['ts']), set()).add('in')
        for k, v in io.items():
            if len(v) > 1: print('  конфликт порта:', s.title[:20], k)
        # разнос входов на одной стороне
        side = {}
        for e in s.e: side.setdefault((e['b'], e['ts']), []).append(e)
        for (nid, sd), lst in side.items():
            k = len(lst)
            lst.sort(key=lambda e: s.n[e['a']]['c'] if sd in 'TB' else s.n[e['a']]['r'])
            for i, e in enumerate(lst): e['to'] = (i - (k - 1) / 2) * 16
        for e in s.e: e['fo'] = e['fo'] or 0
        s.gw, s.gh = int(W / G) + 2, int(H / G) + 2
        s.block = set()
        for id, n in s.n.items():
            x, y = s.cxy(id); w, h = SZ[n['k']]
            for gx in range(int((x - w / 2 - 5) // G), int((x + w / 2 + 5) // G) + 1):
                for gy in range(int((y - h / 2 - 5) // G), int((y + h / 2 + 5) // G) + 1):
                    s.block.add((gx, gy))
        s.used = {}

    def astar(s, e, p0, fs, p1, ts):
        g0 = (round(p0[0] / G), round(p0[1] / G)); g1 = (round(p1[0] / G), round(p1[1] / G))
        d0 = D4[fs]; d1 = D4[ts]
        st = (g0[0] + d0[0] * 2, g0[1] + d0[1] * 2); en = (g1[0] + d1[0] * 2, g1[1] + d1[1] * 2)
        src, tgt = e['a'], e['b']

        def cost(c, d):
            if c in s.block and c != st and c != en: return None
            if not (5 <= c[0] < s.gw - 2 and 4 <= c[1] < s.gh - 7): return None
            k = 1.0
            for (o, sa, sb) in s.used.get(c, ()):
                par = (o == (d[0] != 0))
                if sa == src or sb == tgt: k += 0.0 if par else 0.5
                else: k += 40 if par else 4
            return k
        start = (st, d0)
        pq = [(abs(st[0] - en[0]) + abs(st[1] - en[1]), 0, st, d0)]; best = {start: 0}; prev = {}; n = 0
        found = None
        while pq:
            f, g, c, d = heapq.heappop(pq); n += 1
            if n > 400000: return None
            if c == en: found = (c, d); break
            if best.get((c, d), 1e18) < g: continue
            for nd in D4.values():
                if nd == (-d[0], -d[1]): continue
                nc = (c[0] + nd[0], c[1] + nd[1]); k = cost(nc, nd)
                if k is None: continue
                ng = g + k + (14 if nd != d else 0)
                if ng < best.get((nc, nd), 1e18):
                    best[(nc, nd)] = ng; prev[(nc, nd)] = (c, d)
                    heapq.heappush(pq, (ng + abs(nc[0] - en[0]) + abs(nc[1] - en[1]), ng, nc, nd))
        if not found: return None
        key = found; path = [key[0]]
        while key != start:
            key = prev[key]; path.append(key[0])
        path.reverse()
        for i in range(len(path) - 1):
            a, b = path[i], path[i + 1]; horiz = a[1] == b[1]
            for c in (a, b): s.used.setdefault(c, []).append((horiz, src, tgt))
        cells = [g0] + path + [g1]
        P = [(x * G, y * G) for x, y in cells]
        P[0] = p0; P[-1] = p1
        P[1] = (P[1][0], p0[1]) if fs in 'LR' else (p0[0], P[1][1])
        P[-2] = (P[-2][0], p1[1]) if ts in 'LR' else (p1[0], P[-2][1])
        out = [P[0]]
        for q in P[1:]:
            if q == out[-1]: continue
            if len(out) >= 2:
                a, b = out[-2], out[-1]
                if (a[0] == b[0] == q[0]) or (a[1] == b[1] == q[1]): out[-1] = q; continue
            out.append(q)
        fixed = [out[0]]
        for q in out[1:]:
            l = fixed[-1]
            if l[0] != q[0] and l[1] != q[1]: fixed.append((l[0], q[1]))
            fixed.append(q)
        return fixed

    def route(s, e):
        fs, ts = e['fs'], e['ts']
        p0 = s.port(e['a'], fs, e['fo']); p1 = s.port(e['b'], ts, e['to'])
        if (fs, ts) in (('B', 'T'), ('T', 'B')) and abs(p0[1] - p1[1]) < 48 and abs(p0[0] - p1[0]) < 60:
            if p0[0] == p1[0]: return [p0, p1]
            m = (p0[1] + p1[1]) / 2; return [p0, (p0[0], m), (p1[0], m), p1]
        if (fs, ts) in (('R', 'L'), ('L', 'R')) and abs(p0[0] - p1[0]) < 48 and abs(p0[1] - p1[1]) < 60:
            if p0[1] == p1[1]: return [p0, p1]
            m = (p0[0] + p1[0]) / 2; return [p0, (m, p0[1]), (m, p1[1]), p1]
        r = s.astar(e, p0, fs, p1, ts)
        if r: return r
        print('  путь не найден:', s.title[:20], e['a'], '->', e['b'])
        if fs in 'LR' and ts in 'TB': return [p0, (p1[0], p0[1]), p1]
        if fs in 'TB' and ts in 'LR': return [p0, (p0[0], p1[1]), p1]
        if fs in 'LR': m = (p0[0] + p1[0]) / 2; return [p0, (m, p0[1]), (m, p1[1]), p1]
        m = (p0[1] + p1[1]) / 2; return [p0, (p0[0], m), (p1[0], m), p1]

    def svg(s):
        s.prepare()
        W, H = s.size(); e = html.escape
        o = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}" font-family="PT Sans, Arial, sans-serif">', '<defs>']
        for k, (c, d, w) in ES.items():
            o.append(f'<marker id="m{k}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto"><path d="M0,0L10,5L0,10z" fill="{c}"/></marker>')
        o.append('</defs>'); o.append(f'<rect width="{W}" height="{H}" fill="#fbfbf8"/>')
        if s.title: o.append(f'<text x="16" y="26" font-size="19" font-weight="700" fill="#1d2a22">{e(s.title)}</text>')
        for title, r0, r1, col, c0, c1 in s.lanes:
            y0 = MY + 40 + r0 * RY - RY / 2 + 3; y1 = MY + 40 + r1 * RY + RY / 2 - 3
            x0 = 8 if c0 is None else MX + c0 * CX - CX / 2 + 4; x1 = W - 8 if c1 is None else MX + c1 * CX + CX / 2 - 4
            o.append(f'<rect x="{x0}" y="{y0}" width="{x1-x0}" height="{y1-y0}" rx="10" fill="{LANE[col]}" stroke="#d8dbd2"/>')
            if c0 is not None or c1 is not None:
                o.append(f'<text x="{x0+12}" y="{y0+16}" font-size="11.5" font-weight="700" fill="#6b7469" letter-spacing=".6">{e(title.upper())}</text>')
            else:
                lfs = min(11.5, (y1 - y0 - 12) / (len(title) * 0.72))
                o.append(f'<text transform="translate({x0+17},{(y0+y1)/2}) rotate(-90)" font-size="{lfs:.1f}" font-weight="700" fill="#6b7469" text-anchor="middle" letter-spacing=".6">{e(title.upper())}</text>')
        labels = []
        order = sorted(s.e, key=lambda ed: (PRI[ed['st']], abs(s.n[ed['a']]['c'] - s.n[ed['b']]['c']) + abs(s.n[ed['a']]['r'] - s.n[ed['b']]['r'])))
        for ed in order:
            pts = s.route(ed); c, dash, w = ES[ed['st']]
            d = 'M' + ' L'.join(f'{x:.0f},{y:.0f}' for x, y in pts)
            o.append(f'<path d="{d}" fill="none" stroke="{c}" stroke-width="{w}"' + (f' stroke-dasharray="{dash}"' if dash else '') + f' marker-end="url(#m{ed["st"]})" stroke-linejoin="round"/>')
            if ed['lbl']: labels.append((pts, ed, c))
        hs = []; rects = []
        for id, n in s.n.items():
            x, y = s.cxy(id); w, h = SZ[n['k']]; f, st, tc = COL[n['k']]; k = n['k']
            rects.append((x - w / 2, y - h / 2, x + w / 2, y + h / 2))
            if k == 'dec':
                o.append(f'<path d="M{x},{y-h/2} L{x+w/2},{y} L{x},{y+h/2} L{x-w/2},{y} Z" fill="{f}" stroke="{st}" stroke-width="2"/>')
            elif k in ('start', 'end'):
                o.append(f'<rect x="{x-w/2}" y="{y-h/2}" width="{w}" height="{h}" rx="{h/2}" fill="{f}" stroke="{st}" stroke-width="2.2"/>')
            elif k == 'conv':
                o.append(f'<rect x="{x-w/2}" y="{y-h/2}" width="{w}" height="{h}" rx="6" fill="{f}" stroke="{st}" stroke-width="2"/>')
                for i in range(9): o.append(f'<circle cx="{x-w/2+10+i*(w-20)/8:.0f}" cy="{y+h/2-6}" r="3.4" fill="none" stroke="{st}" stroke-width="1.3"/>')
            elif k == 'store':
                o.append(f'<path d="M{x-w/2},{y-h/2+8} Q{x},{y-h/2-6} {x+w/2},{y-h/2+8} L{x+w/2},{y+h/2-6} Q{x},{y+h/2+8} {x-w/2},{y+h/2-6} Z" fill="{f}" stroke="{st}" stroke-width="2"/>')
            elif k == 'sub':
                o.append(f'<rect x="{x-w/2}" y="{y-h/2}" width="{w}" height="{h}" rx="8" fill="{f}" stroke="{st}" stroke-width="2"/><rect x="{x-w/2+5}" y="{y-h/2+5}" width="{w-10}" height="{h-10}" rx="5" fill="none" stroke="{st}" stroke-width="1"/>')
            elif k == 'waste':
                o.append(f'<rect x="{x-w/2}" y="{y-h/2}" width="{w}" height="{h}" rx="6" fill="{f}" stroke="{st}" stroke-width="1.8" stroke-dasharray="6 3"/>')
            elif k == 'energy':
                o.append(f'<path d="M{x-w/2+10},{y-h/2} L{x+w/2},{y-h/2} L{x+w/2-10},{y+h/2} L{x-w/2},{y+h/2} Z" fill="{f}" stroke="{st}" stroke-width="2"/>')
            elif k in ('prod', 'out'):
                o.append(f'<rect x="{x-w/2}" y="{y-h/2}" width="{w}" height="{h}" rx="14" fill="{f}" stroke="{st}" stroke-width="2"/>')
            else:
                o.append(f'<rect x="{x-w/2}" y="{y-h/2}" width="{w}" height="{h}" rx="5" fill="{f}" stroke="{st}" stroke-width="2"/>')
            lines = n['l'].split('\n'); fs = 13.5 if k == 'dec' else 14.5
            mw = (w * (0.7 if k == 'dec' else 0.86 if k == 'energy' else 1)) - 12; bold = 0.58 if k in ('start', 'end', 'sub') else 0.53
            while fs > 10.5 and max(len(l) for l in lines) * fs * bold > mw: fs -= 0.5
            lh = fs + 2.5
            y0 = y - (len(lines) - 1) * lh / 2 + fs * 0.36 - (5 if k == 'conv' else 0)
            for i, ln in enumerate(lines):
                o.append(f'<text x="{x}" y="{y0+i*lh:.1f}" font-size="{fs}" text-anchor="middle" fill="{tc}"' + (' font-weight="700"' if k in ('start', 'end', 'sub') else '') + f'>{e(ln)}</text>')
            if n['link']: hs.append([n['link'], round((x - w / 2) / W * 100, 2), round((y - h / 2) / H * 100, 2), round(w / W * 100, 2), round(h / H * 100, 2)])

        def free(r):
            if r[0] < 40 or r[2] > W - 8 or r[1] < 34 or r[3] > H - 34: return False
            return all(not (r[0] < q[2] and r[2] > q[0] and r[1] < q[3] and r[3] > q[1]) for q in rects)
        for pts, ed, c in labels:
            t = ed['lbl']; wdt = len(t) * 7.3 + 8; hh = 16
            segs = [(pts[i], pts[i + 1]) for i in range(len(pts) - 1)]
            dec = s.n[ed['a']]['k'] == 'dec' and ed['lp'] != 'mid'
            order = [0] if dec else sorted(range(len(segs)), key=lambda i: -(abs(segs[i][1][0] - segs[i][0][0]) + abs(segs[i][1][1] - segs[i][0][1])))
            if ed['lp'] == 'end': order = [len(segs) - 1]
            if ed['lp'] == 'start': order = [0, 1] if len(segs) > 1 else [0]
            placed = None
            for i in order + [j for j in range(len(segs)) if j not in order]:
                (x0, y0), (x1, y1) = segs[i]
                for f0 in ([0.0] if (dec and i == 0) else [0.5, 0.35, 0.65, 0.2, 0.8]):
                    if abs(x1 - x0) >= abs(y1 - y0):
                        mx = x0 + (x1 - x0) * f0
                        mx = x0 + (6 if x1 > x0 else -6 - wdt) if (dec and i == 0) else mx - wdt / 2
                        for dy in (-hh - 3, 3):
                            r = (mx, y0 + dy, mx + wdt, y0 + dy + hh)
                            if free(r): placed = r; break
                    else:
                        my = y0 + (y1 - y0) * f0
                        my = y0 + (5 if y1 > y0 else -5 - hh) if (dec and i == 0) else my - hh / 2
                        for dx in (5, -5 - wdt):
                            r = (x0 + dx, my, x0 + dx + wdt, my + hh)
                            if free(r): placed = r; break
                    if placed: break
                if placed: break
            if not placed:
                (x0, y0), _ = segs[0]; placed = (x0 + 4, y0 - hh - 2, x0 + 4 + wdt, y0 - 2)
            rects.append(placed)
            o.append(f'<rect x="{placed[0]:.0f}" y="{placed[1]:.0f}" width="{wdt:.0f}" height="{hh}" rx="3" fill="#fbfbf8" opacity=".94"/>')
            o.append(f'<text x="{placed[0] + wdt / 2:.0f}" y="{placed[1] + 12.5:.0f}" font-size="12.5" font-weight="700" text-anchor="middle" fill="{c}">{e(t)}</text>')
        lg = [('op', 'операция'), ('dec', 'условие «если»'), ('conv', 'конвейер'), ('prod', 'продукт'), ('waste', 'отход, побочный'), ('energy', 'энергия'), ('store', 'склад, накопитель'), ('sub', 'другая схема')]
        lx = 16; ly = H - 14
        for k, t in lg:
            f, st, _ = COL[k]
            o.append(f'<rect x="{lx}" y="{ly-11}" width="22" height="14" rx="3" fill="{f}" stroke="{st}" stroke-width="1.5"/><text x="{lx+28}" y="{ly}" font-size="12.5" fill="#444">{t}</text>')
            lx += 40 + len(t) * 7
        o.append('</svg>')
        return '\n'.join(o), hs
