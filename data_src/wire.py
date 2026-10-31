"""Подключает сгенерированные JS к index.html и sw.js и поднимает версию кеша."""
import re, sys, os
R = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
def main(files):
    p = os.path.join(R, 'index.html'); s = open(p, encoding='utf-8').read()
    for f in files:
        tag = f'<script charset="utf-8" src="{f}"></script>'
        if tag not in s:
            s = s.replace('<script charset="utf-8" src="flows.js"></script>', tag + '\n<script charset="utf-8" src="flows.js"></script>', 1)
    open(p, 'w', encoding='utf-8').write(s)
    p = os.path.join(R, 'sw.js'); w = open(p, encoding='utf-8').read()
    for f in files:
        if f'"{f}"' not in w: w = w.replace('"index.html",', f'"index.html", "{f}",', 1)
    w = re.sub(r'drevo-otrasley-v(\d+)', lambda m: 'drevo-otrasley-v%d' % (int(m.group(1)) + 1), w, count=1)
    open(p, 'w', encoding='utf-8').write(w)
    print(re.search(r'drevo-otrasley-v\d+', w).group(0))
main(sys.argv[1:])
