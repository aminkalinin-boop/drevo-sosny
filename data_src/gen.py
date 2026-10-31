"""Сборка карточек справочника из текстовых файлов data_src/*.txt в JS-файлы.

Формат:
  id | вид | Заголовок | краткая подпись      — строка узла; отступ (2 пробела на уровень) задаёт вложенность
  w: основной текст                            — свойства относятся к последнему узлу
  f: пункт «Подробности» (можно несколько)
  n: другие названия
  ln: id1, id2                                 — ссылки «Связано»
  im: картинка
  g: термин = определение                      — статья словаря
Файл NAME.txt → ../NAME.js
"""
import json, os, re, sys
D = os.path.dirname(os.path.abspath(__file__))
KINDS = {'forest', 'live', 'part', 'proc', 'prod', 'final', 'waste', 'place', 'idea', 'doc', 'info', 'tech'}

def parse(path):
    N, G, stack, last = {}, {}, [], None
    for no, raw in enumerate(open(path, encoding='utf-8'), 1):
        line = raw.rstrip('\n')
        if not line.strip() or line.lstrip().startswith('#'):
            continue
        ind = len(line) - len(line.lstrip(' '))
        s = line.strip()
        m = re.match(r'^(w|f|n|ln|im|g|map|e):\s?(.*)$', s)
        if m:
            k, v = m.groups()
            if k == 'g':
                t, _, d = v.partition(' = ')
                assert d, f'{path}:{no} словарь без «=»'
                G[t.strip().lower()] = d.strip()
                continue
            assert last, f'{path}:{no} свойство без узла'
            n = N[last]
            if k == 'f': n.setdefault('f', []).append(v)
            elif k == 'ln': n['ln'] = [x.strip() for x in v.split(',') if x.strip()]
            elif k == 'w': n['w'] = (n['w'] + ' ' + v) if 'w' in n else v
            else: n[k] = v
            continue
        parts = [p.strip() for p in s.split('|')]
        assert len(parts) >= 3, f'{path}:{no} плохая строка: {s}'
        id, kind, t = parts[:3]
        sub = parts[3] if len(parts) > 3 else ''
        assert kind in KINDS, f'{path}:{no} вид {kind}'
        assert id not in N, f'{path}:{no} повтор {id}'
        lvl = ind // 2
        while stack and stack[-1][0] >= lvl: stack.pop()
        node = {'t': t, 'k': kind}
        if sub: node['s'] = sub; node['e'] = sub
        N[id] = node
        if stack:
            N[stack[-1][1]].setdefault('c', []).append(id)
        stack.append((lvl, id)); last = id
    return N, G

def main(names):
    for name in names:
        N, G = parse(os.path.join(D, name + '.txt'))
        js = '/* Сгенерировано data_src/gen.py из data_src/%s.txt — правьте исходник */\n' % name
        js += 'Object.assign(window.N,' + json.dumps(N, ensure_ascii=False) + ');\n'
        if G: js += 'Object.assign(window.G,' + json.dumps(G, ensure_ascii=False) + ');\n'
        open(os.path.join(D, '..', name + '.js'), 'w', encoding='utf-8').write(js)
        print(name, len(N), 'узлов,', len(G), 'терминов')

if __name__ == '__main__':
    main(sys.argv[1:] or sorted(f[:-4] for f in os.listdir(D) if f.endswith('.txt')))
