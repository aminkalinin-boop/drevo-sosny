"""Слои карты «Регионы» для новых отраслей → ../regions2.js. Уровни 1–3 ориентировочные (специализация регионов по открытым отраслевым обзорам)."""
import json, os
def L(s): return {('RU-' + k.split('=')[0].strip()): int(k.split('=')[1]) for k in s.split()}
LEG = ['нет данных', 'есть', 'развито', 'среди лидеров']
R = {
 'lgt': dict(pal=['#efecf3', '#cfc2e0', '#9a80c0', '#5b3f7a'], layers=[
   ['Текстиль: пряжа и ткани', LEG, L('IVA=3 VLA=2 TVE=2 MOS=2 KOS=2 YAR=1 SMO=1 CU=1 ULY=1 NIZ=1 SPE=1 ALT=1')],
   ['Лён и конопля', LEG, L('TVE=3 SMO=3 VLG=2 KOS=2 YAR=2 NGR=2 PSK=2 NIZ=2 UD=2 KIR=1 BRY=1 KLU=1 PNZ=1 MO=1')],
   ['Одежда и трикотаж', LEG, L('MOW=3 SPE=3 IVA=3 MOS=2 ROS=2 CU=2 STA=1 KDA=1 NIZ=1 PNZ=1 TA=1 SVE=1 NVS=1 ULY=1 MO=1')],
   ['Кожа и обувь', LEG, L('ROS=2 MOS=2 MOW=2 SPE=2 RYA=2 NIZ=2 KIR=2 TA=1 SVE=1')],
   ['Шерсть', LEG, L('STA=3 DA=3 KL=2 ZAB=2 TY=2 AL=1 BU=1 VGG=1 ORE=1 KC=1 AST=1 ROS=1')]],
   notes={'RU-IVA': 'Иваново — исторический «ситцевый край», центр хлопчатобумажной промышленности и швейного производства.',
          'RU-TVE': 'Тверская область — главный льноводческий регион.', 'RU-STA': 'Ставрополье — центр тонкорунного овцеводства.'}),
 'fod': dict(pal=['#f3ebe7', '#e3b8a6', '#c06f4f', '#8a3d22'], layers=[
   ['Пищевая промышленность в целом', LEG, L('MOW=3 MOS=3 KDA=3 BEL=3 SPE=2 LEN=2 VOR=2 ROS=2 TA=2 BA=2 KRS=2 LIP=2 BRY=2 TAM=1 NVS=1 SVE=1 NIZ=1 SAM=1 KLU=1 TUL=1 ALT=1 OMS=1 CHE=1 PNZ=1 ORL=1 STA=1 KGD=1 SAR=1 VGG=1')],
   ['Масложировая', LEG, L('KDA=3 ROS=3 BEL=2 VOR=2 SAR=2 SAM=2 KGD=2 AMU=2 VGG=1 STA=1 ALT=1 ORE=1 NVS=1 KRS=1 TAM=1 LIP=1 PNZ=1')],
   ['Сахарная', LEG, L('KRS=3 LIP=3 TAM=3 VOR=3 KDA=3 BEL=2 ORL=2 PNZ=2 TA=2 BA=2 BRY=1 STA=1 ALT=1 MO=1 ULY=1')],
   ['Мука, крупы, хлеб', LEG, L('ALT=3 ROS=2 KDA=2 MOW=2 MOS=2 OMS=2 NVS=2 SAR=2 STA=2 VGG=1 ORE=1 KGN=1 CHE=1 SAM=1 TA=1 VOR=1')],
   ['Напитки: вино, вода, пиво', LEG, L('KDA=3 CR=3 STA=2 KB=2 DA=2 KC=2 MOS=2 LEN=2 SPE=2 ROS=1 TUL=1 SAM=1 KLU=1 LIP=1')]],
   notes={'RU-KDA': 'Кубань — крупнейший производитель пищевой продукции: масло, сахар, вино, консервы, рис.',
          'RU-BEL': 'Белгородская область — лидер по мясу (свинина, птица) и мясопереработке.'}),
 'fsh': dict(pal=['#e6eef2', '#a9cbd9', '#5a98b5', '#1f5f7a'], layers=[
   ['Вылов в морях', LEG, L('KAM=3 PRI=3 SAK=3 MUR=3 KHA=2 MAG=2 KGD=2 ARK=2 CHU=1 NEN=1 KDA=1 ROS=1 AST=1 DA=1 CR=1 SPE=1')],
   ['Аквакультура', LEG, L('KR=3 MUR=3 SAK=2 PRI=2 AST=2 KDA=2 ROS=2 LEN=2 VLG=1 VGG=1 CHE=1 NVS=1 KGN=1 TYU=1 OMS=1 CR=1 KAM=1 KHA=1')],
   ['Рыбопереработка', LEG, L('KAM=3 PRI=3 SAK=3 MUR=3 KGD=3 SPE=2 LEN=2 MOS=2 KHA=1 MAG=1 AST=1 KDA=1 ARK=1')]],
   notes={'RU-KAM': 'Камчатка — главный район добычи лососей.', 'RU-KR': 'Карелия — лидер по садковому выращиванию радужной форели.',
          'RU-MUR': 'Мурманск — центр тралового флота Баренцева моря и садкового выращивания атлантического лосося.',
          'RU-AST': 'Астраханская область — исторический центр осетрового хозяйства и рыбоводства в дельте Волги.'}),
 'nrg': dict(pal=['#f3ece3', '#e6c493', '#c68a3c', '#7a4a14'], layers=[
   ['Добыча торфа', LEG, L('KIR=3 TVE=3 LEN=2 NGR=2 SVE=2 PER=1 KOS=1 YAR=1 NIZ=1 VLA=1 VLG=1 PSK=1 KGD=1 MOS=1 UD=1 TOM=1 ARK=1 KR=1')],
   ['Древесные пеллеты и брикеты', LEG, L('LEN=3 ARK=3 KYA=3 IRK=2 VLG=2 KR=2 NGR=2 PSK=2 KO=2 KIR=1 KOS=1 TOM=1 TVE=1 PER=1 KHA=1 PRI=1')],
   ['Котельные на биомассе', LEG, L('ARK=3 KR=2 KO=2 VLG=2 KIR=2 KYA=2 IRK=2 KOS=2 TOM=1 PER=1 TVE=1 KHM=1')],
   ['Биогаз', LEG, L('BEL=3 PNZ=1 LEN=1 MOS=1 TA=1 LIP=1 BRY=1 VOR=1')]],
   notes={'RU-BEL': 'Белгородская область — первые в России крупные биогазовые станции на отходах животноводства.',
          'RU-KIR': 'Кировская область — крупнейший производитель торфа, в том числе для энергетики.'}),
 'wld': dict(pal=['#f2e8eb', '#d8aab6', '#a85e72', '#6b2f3f'], layers=[
   ['Ягоды и грибы', LEG, L('KR=3 ARK=3 TOM=3 KHM=3 VLG=2 KIR=2 KO=2 MUR=2 KOS=2 TYU=2 YAN=2 KYA=2 IRK=2 OMS=2 ZAB=2 BU=2 NGR=2 PSK=2 PER=1 NVS=1 SVE=1 KHA=1 SA=1 LEN=1 TVE=1 NIZ=1 ME=1 UD=1')],
   ['Кедровый орех', LEG, L('TOM=3 KYA=2 IRK=2 KHM=2 AL=2 TY=2 BU=2 KEM=1 NVS=1 ALT=1 KHA=1 PRI=1 ZAB=1 TYU=1 OMS=1')],
   ['Лекарственное сырьё', LEG, L('AL=3 ALT=3 BU=2 TOM=2 PRI=2 KIR=1 PER=1 KR=1 ARK=1 KYA=1 IRK=1 KHA=1')],
   ['Охотничье хозяйство и пушнина', LEG, L('SA=3 KYA=3 IRK=2 KHA=2 KHM=2 KAM=2 MAG=2 ARK=2 KO=2 KIR=2 ZAB=2 BU=2 TOM=2 AMU=1 PER=1 TVE=1 VLG=1 KOS=1 PRI=1')],
   ['Оленеводство', LEG, L('YAN=3 NEN=3 CHU=3 SA=3 MUR=2 KAM=2 MAG=2 KYA=2 KHM=1 KO=1 TY=1 BU=1 KHA=1 ZAB=1')]],
   notes={'RU-YAN': 'Ямал — крупнейшее в мире стадо домашних северных оленей.', 'RU-TOM': 'Томская область — один из центров заготовки кедрового ореха, ягод и грибов.'}),
}
for s in R.values():
    for l in s['layers']: l[1] = LEG
js = '/* Сгенерировано data_src/regions2.py — слои карты «Регионы» для новых отраслей */\nwindow.RG2=' + json.dumps(R, ensure_ascii=False) + ';\n'
open(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'regions2.js'), 'w', encoding='utf-8').write(js)
print('ok')
