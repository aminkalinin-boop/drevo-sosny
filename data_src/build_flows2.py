"""Схемы идеальных циклов новых отраслей и схема связей семи отраслей → ../f2_*.svg и ../flows2.js"""
import json, os, sys
D = os.path.dirname(os.path.abspath(__file__)); R = os.path.join(D, '..')
sys.path.insert(0, D)
import schemes_new as S
MAP = {'tl_cyc': S.T0, 'pf_cyc': S.P0, 'rb_cyc': S.R0, 'nr_cyc': S.N0, 'wl_cyc': S.W0, 'mx_all': S.X0, 'te_cyc': S.E0}
HOW = ('Как читать схему: прямоугольник — операция, ромб — условие «если», полоса с роликами — конвейер, '
       'пунктирная рамка — отход, скошенная рамка — энергия, двойная рамка — переход в другую отрасль. '
       'Зелёная стрелка «да», красная «нет», толстая зелёная — возврат в цикл. Нажмите на блок, чтобы открыть карточку.')
P = {}
for nid, fn in MAP.items():
    svg, hs = fn().svg()
    name = 'f2_' + nid + '.svg'; open(os.path.join(R, name), 'w', encoding='utf-8').write(svg)
    P[nid] = dict(src=name, hs=hs, z=1)
js = '/* Сгенерировано data_src/build_flows2.py */\n(function(){var P=' + json.dumps(P, ensure_ascii=False) + ',H=' + json.dumps(HOW, ensure_ascii=False) + ';\n'
js += 'for(var k in P){var n=window.N[k];if(!n)continue;n.pics=[P[k]];n.f=(n.f||[]).concat([H])}\n'
js += 'var r=window.N.mx_root;if(r&&r.c&&r.c.indexOf("mx_all")<0)r.c.unshift("mx_all");var c=window.N.im_root;if(c){c.ln=(c.ln||[]).concat(["mx_all"])}})();\n'
open(os.path.join(R, 'flows2.js'), 'w', encoding='utf-8').write(js)
print('ok', list(P))
