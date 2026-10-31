"""Таблица «Сравнение отраслей» → ../cmp.svg и ../cmppics.js"""
import html, json, os
R = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
COLS = [('ЛПК', '#2f6b3a'), ('АПК', '#8a5a12'), ('Лёгкая промышленность', '#5b3f7a'), ('ТЭК', '#2f4858')]
# (признак, [(текст, уровень 0–3), ...]) — уровень окрашивает ячейку
ROWS = [
 ('Что производит', [('древесина, бумага, плиты, лесохимия', 2), ('продовольствие, корма, сырьё', 2), ('ткани, одежда, обувь, кожа', 2), ('топливо, электроэнергия, тепло', 2)]),
 ('Сырьё', [('возобновляемое, растёт 60–100 лет', 2), ('возобновляемое, каждый год', 3), ('берёт у АПК, ЛПК и ТЭК', 1), ('в основном невозобновляемое', 0)]),
 ('Капиталоёмкость', [('высокая (ЦБК, плиты)', 2), ('средняя', 1), ('низкая', 0), ('очень высокая', 3)]),
 ('Трудоёмкость', [('средняя', 1), ('высокая', 2), ('очень высокая', 3), ('низкая на единицу продукции', 0)]),
 ('Сезонность', [('сильная: зимняя заготовка, распутица', 2), ('очень сильная: посевная, уборка', 3), ('слабая: сезоны спроса', 1), ('зимний пик потребления', 2)]),
 ('Ориентация на экспорт', [('высокая', 2), ('растущая: зерно, масло, рыба', 2), ('низкая, рынок занят импортом', 0), ('очень высокая', 3)]),
 ('Роль в доходах бюджета', [('умеренная', 1), ('умеренная', 1), ('малая', 0), ('ключевая', 3)]),
 ('Главные риски', [('пожары, вредители, истощение доступных лесов', 2), ('погода, болезни, цены', 2), ('импорт, контрафакт, кадры', 2), ('цены на нефть, санкции, аварии', 3)]),
 ('Нагрузка на природу', [('рубки, стоки ЦБК', 2), ('почвы, вода, метан', 2), ('стоки крашения, отходы одежды', 1), ('выбросы CO₂, разливы, отвалы', 3)]),
 ('Место в УИС', [('основное производство лесных колоний', 3), ('подсобные хозяйства, питание', 2), ('швейные цеха — главное направление труда', 3), ('котельные и расходы на энергию', 1)]),
]
SH = ['#f6f6f2', '#eef3e8', '#dfe9d6', '#cfdfc2']
W = 1180; LW = 210; CW = (W - LW - 20) / 4; RH = 58; TOP = 86
H = TOP + len(ROWS) * RH + 30
e = html.escape
o = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}" font-family="PT Sans, Arial, sans-serif">', f'<rect width="{W}" height="{H}" fill="#fbfbf8"/>',
     '<text x="16" y="30" font-size="20" font-weight="700" fill="#1d2a22">Сравнение отраслей</text>',
     '<text x="16" y="52" font-size="13" fill="#666">Чем насыщеннее цвет ячейки, тем сильнее выражен признак</text>']
for j, (t, c) in enumerate(COLS):
    x = LW + j * CW
    o.append(f'<rect x="{x + 3:.0f}" y="{TOP - 26}" width="{CW - 6:.0f}" height="24" rx="5" fill="{c}"/><text x="{x + CW / 2:.0f}" y="{TOP - 9}" font-size="14" font-weight="700" fill="#fff" text-anchor="middle">{e(t)}</text>')
def wrap(t, n=28):
    words = t.split(); lines = ['']
    for w in words:
        if len(lines[-1]) + len(w) + 1 > n: lines.append(w)
        else: lines[-1] = (lines[-1] + ' ' + w).strip()
    return lines
for i, (name, cells) in enumerate(ROWS):
    y = TOP + i * RH
    o.append(f'<rect x="10" y="{y + 2}" width="{LW - 14}" height="{RH - 4}" rx="5" fill="#eceee8"/>')
    for k, ln in enumerate(wrap(name, 22)):
        o.append(f'<text x="20" y="{y + RH / 2 + 5 - (len(wrap(name, 22)) - 1) * 8 + k * 16:.0f}" font-size="13.5" font-weight="700" fill="#333">{e(ln)}</text>')
    for j, (t, lv) in enumerate(cells):
        x = LW + j * CW
        o.append(f'<rect x="{x + 3:.0f}" y="{y + 2}" width="{CW - 6:.0f}" height="{RH - 4}" rx="5" fill="{SH[lv]}"/>')
        ls = wrap(t)
        for k, ln in enumerate(ls):
            o.append(f'<text x="{x + CW / 2:.0f}" y="{y + RH / 2 + 5 - (len(ls) - 1) * 8 + k * 16:.0f}" font-size="13" fill="#222" text-anchor="middle">{e(ln)}</text>')
o.append('</svg>')
open(os.path.join(R, 'cmp.svg'), 'w', encoding='utf-8').write('\n'.join(o))
open(os.path.join(R, 'cmppics.js'), 'w', encoding='utf-8').write('/* Сгенерировано data_src/compare.py */\nif(window.N.mx_cmp)window.N.mx_cmp.pics=[{src:"cmp.svg",z:1}];\n')
print('ok')
