# Промпты: породы деревьев и техника

Все листы — сетка 4×2 (8 плиток) на одном изображении 1536×1024, как прошлые ассеты с сортиментами и станками. Подписи на плитках совпадают с названиями карточек в приложении: так я сразу разложу каждую плитку по своей карточке. Плитки, для которых отдельной карточки нет (например, «Медонос» или «Пихтовая тайга»), я покажу в карточке самой породы.

## Строка стиля для листов-сеток

Добавляй в конец каждого промпта:

```
Layout: grid of 8 equal tiles, 4 columns × 2 rows, thin white gaps, each tile has a dark forest-green caption bar at the bottom with white bold Cyrillic text exactly as given in quotes. Style: photorealistic, natural light, realistic Russian forestry and woodworking setting, clean background, high detail, 3:2, 1536x1024. No brand names, no logos, no watermarks, no other text.
```

Если какое-то слово вышло с ошибкой — перегенерируй только эту плитку или напиши мне, я поправлю подпись в приложении.

---

# Часть 1. Породы деревьев

У каждого дерева один лист. Первая плитка — само дерево с круглыми врезками (хвоя или лист, шишка или плод, срез древесины), остальные — что из него получают.

## Хвойные

### Ель
```
Tile 1: mature Norway spruce in a dark spruce forest, dense conical crown reaching the ground, with three circular insets: short sharp four-sided needles, long hanging spruce cone, pale wood cross-section without dark heartwood; caption "Ель". Tile 2: spruce branches covering rose bushes in a garden for winter; caption "Еловая лапа и зелень". Tile 3: pile of hanging-type spruce cones and small winged seeds in a palm; caption "Шишки и семена". Tile 4: decorated cut spruce at a Christmas tree market with tags; caption "Новогодние ели". Tile 5: pieces of spruce bark next to rolls of tanned brown leather; caption "Еловая кора". Tile 6: stack of debarked pale spruce pulpwood logs next to a roll of white paper; caption "Балансы на белую бумагу". Tile 7: light timber-frame house under construction from spruce studs; caption "Еловые пиломатериалы". Tile 8: unfinished violin top showing fine straight spruce grain in a luthier workshop; caption "Резонансная ель".
```

### Лиственница
```
Tile 1: tall Siberian larch in autumn taiga with golden needles, insets: soft needle tufts on a short shoot, small upright cone, red-brown heartwood cross-section; caption "Лиственница". Tile 2: thick golden resin oozing from larch bark; caption "Лиственничная живица". Tile 3: amber pieces of larch gum and a jar of white powder; caption "Камедь → арабиногалактан". Tile 4: old larch piles under a wooden pier in water; caption "Сваи и гидросооружения". Tile 5: reddish larch terrace decking around a house; caption "Террасная доска, палубы, полы". Tile 6: lower crowns of a log house made of dark larch logs on a stone base; caption "Нижние венцы и срубы". Tile 7: larch sawdust and a small jar of yellow crystalline powder; caption "Дигидрокверцетин". Tile 8: white hoof-shaped bracket fungus on an old larch trunk; caption "Лиственничная губка (агарикон)".
```

### Кедр сибирский
```
Tile 1: massive Siberian stone pine in mountain taiga, insets: long soft needles in bundles of five, large purple-brown cone, pinkish wood cross-section; caption "Кедр сибирский". Tile 2: heap of ripe cedar cones on the forest floor and a sack; caption "Шишки и орехи". Tile 3: cedar nuts in shell and shelled cream kernels in wooden bowls; caption "Кедровые орехи". Tile 4: bottle of golden cedar nut oil beside kernels; caption "Кедровое масло". Tile 5: bowl of cedar nut flour and pressed cake; caption "Жмых и мука". Tile 6: small amber bottle of essential oil with cedar sprigs; caption "Хвоя". Tile 7: thick cedar resin in a glass jar with oil; caption "Кедровая живица". Tile 8: carved cedar wood chest and pencils made of cedar; caption "Древесина кедра".
```

### Пихта сибирская
```
Tile 1: slender Siberian fir with a narrow spire-shaped crown, insets: flat soft needles with two white stripes beneath, upright dark-violet cone, pale wood cross-section; caption "Пихта сибирская". Tile 2: pile of freshly cut fir branches on a truck at a logging site; caption "Пихтовая лапа". Tile 3: small amber bottle of fir essential oil next to a copper distillation tank; caption "Пихтовое масло". Tile 4: fragrant fir bath broom hanging in a wooden sauna; caption "Пихтовые веники". Tile 5: close-up of resin blisters on smooth grey fir bark, a drop of clear balsam on a needle; caption "Пихтовый бальзам". Tile 6: light fir boards and a wooden produce crate; caption "Древесина пихты". Tile 7: dead grey fir forest killed by beetles, close-up of a tiny bark beetle; caption "Уссурийский полиграф". Tile 8: fir branch with snow in winter taiga; caption "Пихтовая тайга".
```

## Лиственные

### Берёза
```
Tile 1: white-barked silver birch in a sunny birch grove, insets: serrated triangular leaf, catkins, white-yellow wood cross-section; caption "Берёза". Tile 2: rolls of freshly peeled white birch bark; caption "Береста". Tile 3: dark tar dripping from a clay pot over fire into a bowl; caption "Дёготь". Tile 4: birch bark baskets and lidded containers with carved pattern; caption "Берестяные изделия". Tile 5: birch sap dripping from a small tap into a glass jar, early spring snow; caption "Берёзовый сок". Tile 6: black cracked chaga growth on a birch trunk; caption "Чага и трутовик". Tile 7: stack of birch plywood sheets with layered edge; caption "Берёзовая фанера". Tile 8: polished burl-patterned Karelian birch box; caption "Карельская берёза".
```

### Осина
```
Tile 1: aspen grove with trembling round leaves and smooth grey-green bark, insets: round leaf on a flat stalk, catkin, white wood cross-section with a soft rotten centre; caption "Осина". Tile 2: matchsticks and matchboxes on aspen veneer; caption "Спички". Tile 3: sheets of OSB made from large aspen strands; caption "ОСП (OSB) и щепа". Tile 4: silvery aspen shingles on onion domes of a wooden church; caption "Лемех". Tile 5: interior of a sauna with pale aspen benches; caption "Бани и колодцы". Tile 6: wooden bread peel, ladle and spoons from aspen; caption "Посуда, лопаты, игрушки". Tile 7: aspen pulpwood logs and soft white paper; caption "Целлюлоза". Tile 8: moose gnawing aspen bark in winter; caption "Кора".
```

### Дуб
```
Tile 1: mighty English oak in a meadow, insets: lobed oak leaf, acorns, dark brown heartwood cross-section with visible rays; caption "Дуб". Tile 2: oak barrels in a wine cellar; caption "Бочки". Tile 3: oak herringbone parquet floor; caption "Паркет и массив". Tile 4: stack of thin oak veneer sheets with beautiful figure; caption "Строганый шпон". Tile 5: black bog oak slab next to raw dark log from a river; caption "Мореный дуб". Tile 6: strips of oak bark and a bottle of tanning extract; caption "Дубовая кора". Tile 7: pile of acorns in a basket; caption "Жёлуди". Tile 8: oak galls on leaves and a quill with iron-gall ink; caption "Галлы (чернильные орешки)".
```

### Липа
```
Tile 1: linden tree in bloom, insets: heart-shaped leaf, yellow flowers with bract, pale wood cross-section; caption "Липа". Tile 2: strips of linden bast drying and a pair of bast shoes; caption "Лыко и мочало". Tile 3: carved linden spoons, toys and an icon board; caption "Резьба и иконы". Tile 4: dried linden blossom tea and a jar of light honey; caption "Липовый цвет и мёд". Tile 5: wooden linden tub filled with honey; caption "Кадки и бочки для мёда". Tile 6: pale linden sauna benches; caption "Баня и уголь для рисования". Tile 7: linden boards in a joinery workshop; caption "Древесина липы". Tile 8: bees on linden flowers; caption "Медонос".
```

### Ольха
```
Tile 1: black alder on a riverbank, insets: rounded leaf, small woody cones, orange-red freshly cut wood; caption "Ольха". Tile 2: alder chips smoking fish in a smokehouse; caption "Щепа для копчения". Tile 3: sauna interior with alder lining; caption "Бани". Tile 4: alder furniture stained to look like cherry; caption "Мебель и имитация ценных пород". Tile 5: alder piles in water; caption "Сваи и колодцы". Tile 6: alder cones in a pharmacy pack; caption "Ольховые шишечки". Tile 7: alder bark and wool dyed brown; caption "Кора". Tile 8: alder root nodules close-up; caption "Азотфиксация".
```

### Ясень
```
Tile 1: tall ash tree, insets: pinnate compound leaf, bunches of winged seeds, light wood cross-section; caption "Ясень". Tile 2: axe and shovel handles made of ash; caption "Рукояти инструментов". Tile 3: ash hockey sticks, oars and gymnastic bars; caption "Спортинвентарь". Tile 4: bentwood ash chair and ash parquet; caption "Мебель, паркет, шпон". Tile 5: emerald ash borer beetle on bark and D-shaped exit holes; caption "Ясеневая златка". Tile 6: ash boards with straight grain; caption "Древесина ясеня". Tile 7: ash bow and arrows; caption "Луки". Tile 8: ash log at a sawmill; caption "Пиловочник ясеня".
```

### Бук, клён, тополь (один лист на три породы)
```
Tile 1: oriental beech forest in Caucasus mountains with smooth grey trunks, insets: oval leaf, beechnuts, pinkish wood; caption "Бук восточный". Tile 2: classic bentwood chair; caption "Гнутая мебель и паркет". Tile 3: beech cutting boards and wooden toys; caption "Посуда и игрушки". Tile 4: Norway maple with five-lobed leaves and winged seeds, light wood cross-section; caption "Клён остролистный". Tile 5: violin back made of flamed maple; caption "Музыкальные инструменты". Tile 6: maple sap dripping into a bucket in spring; caption "Кленовый сок". Tile 7: tall poplar with triangular leaves, light wood cross-section; caption "Тополь". Tile 8: rows of young hybrid poplars on a plantation; caption "Плантации".
```

---

# Часть 2. Техника и оборудование

17 листов. Карточки внутри листа подобраны по смыслу, но кое-где группы смешаны, чтобы в каждом листе было ровно 8 плиток.

### Т1. Таксация и отвод — 1
```
Tile 1: forester pushing a thin needle drill into a pine trunk, laptop-like device printing a density graph; caption "Резистограф". Tile 2: ring of sensors with cables around a tree trunk, tablet showing a coloured cross-section; caption "Акустический томограф". Tile 3: forester looking at a pine crown through binoculars; caption "Бинокль". Tile 4: small hand-held angle gauge with slots held at arm's length in a forest; caption "Реласкоп". Tile 5: compass with sighting slit mounted on a wooden tripod in a forest clearing; caption "Буссоль". Tile 6: yellow total station on a tripod aimed through the forest; caption "Тахеометр". Tile 7: red-white striped surveying pole with a prism reflector; caption "Геодезическая рейка". Tile 8: 50-metre steel measuring tape stretched along the ground between trees; caption "Мерная лента".
```

### Т2. Таксация и отвод — 2
```
Tile 1: hand-held laser rangefinder aimed at a tree; caption "Лазерный дальномер". Tile 2: GNSS receiver antenna on a pole with a controller, forest boundary corner; caption "Спутниковый геодезический приёмник". Tile 3: rugged tablet showing a forest map with compartments in a forester's hands; caption "Навигатор и полевой планшет". Tile 4: electronic caliper and a rugged handheld data computer recording tree diameters; caption "Полевой компьютер". Tile 5: steel marking hammer with raised letters striking a blaze on a trunk; caption "Клеймо". Tile 6: spray can marking a ring and number on a pine trunk; caption "Маркировочная краска". Tile 7: bright red-white plastic tape wrapped around trees marking a protected area; caption "Сигнальная лента". Tile 8: drone flying above a forest with a coloured 3D point cloud on a screen; caption "Дрон и лидар".
```

### Т3. Цифровые системы и контроль
```
Tile 1: computer screen with a forest map: compartments, stands, roads, cutting blocks in colours; caption "ГИС и лесные карты". Tile 2: satellite image of taiga with fresh clear-cuts and a burned area outlined; caption "Спутниковые снимки". Tile 3: log passing through a laser scanning frame at a sawmill gate with a 3D model on a monitor; caption "Сканер брёвен". Tile 4: smartphone photographing log ends of a stack, app highlighting each log circle; caption "Фотообмер". Tile 5: loaded log truck standing on a truck weighbridge with a display; caption "Автомобильные весы". Tile 6: tall metal fire lookout tower with a rotating camera above the forest; caption "Пожарные вышки и камеры". Tile 7: black funnel trap hanging on a stake in a pine stand; caption "Феромонная ловушка". Tile 8: pin-type moisture meter pressed into a board showing a percentage; caption "Влагомер".
```

### Т4. Ручной инструмент — 1
```
Tile 1: felling axe stuck in a pine stump; caption "Топор". Tile 2: long two-man crosscut saw resting on a log; caption "Двуручная пила". Tile 3: professional chainsaw with a long bar on a stump; caption "Бензопила". Tile 4: orange plastic felling wedges driven into a back cut; caption "Валочный клин". Tile 5: felling lever and a long forked pole leaning against a tree; caption "Валочная лопатка и вилка". Tile 6: worker with a shoulder-hung brush cutter clearing young growth; caption "Кусторез и мотокоса". Tile 7: two-handled draw knife peeling bark off a log; caption "Скобель". Tile 8: cant hook turning a log; caption "Кантовальный крюк (аппарат)".
```

### Т5. Ручной инструмент — 2, охрана леса
```
Tile 1: two workers carrying a log with large log tongs; caption "Захват-клещи для брёвен". Tile 2: splitting maul and a hydraulic log splitter splitting a round; caption "Колун и дровокол". Tile 3: full chainsaw protective gear laid out: helmet with mesh visor and ear muffs, cut-resistant trousers, steel-toe boots, gloves; caption "Защита вальщика (СИЗ)". Tile 4: handheld radio and satellite phone on a log; caption "Рация и связь". Tile 5: backpack water pump extinguishers, shovels and a portable motor pump by a stream; caption "Противопожарный инвентарь". Tile 6: firefighter with a backpack leaf blower pushing back a low ground fire; caption "Лесная воздуходувка". Tile 7: drip torch igniting a backfire line along a forest road; caption "Зажигательный аппарат". Tile 8: curved resin-tapping knife on a resin-tapped pine; caption "Хак".
```

### Т6. Лесозаготовительные машины, тушение
```
Tile 1: wheeled harvester holding a pine with its head, cutting and processing it; caption "Харвестер". Tile 2: tracked feller-buncher gripping several thin trees with its cutting head; caption "Валочно-пакетирующая машина (ВПМ)". Tile 3: steel choker cables with hooks wrapped around log ends; caption "Чокеры". Tile 4: delimbing machine at a landing pulling a whole tree through a ring of knives; caption "Сучкорезная машина". Tile 5: processor on a tracked base cutting delimbed stems to length at a roadside; caption "Процессор". Tile 6: mobile wood chipper blowing chips into a container truck; caption "Рубительная машина". Tile 7: off-road forest fire truck with water tank and hoses on a forest road; caption "Лесопожарный автомобиль". Tile 8: amphibious water-bombing aircraft dropping water over a burning taiga; caption "Авиалесоохрана".
```

### Т7. Транспорт и погрузка — 1
```
Tile 1: off-road log truck with trailer loaded with short logs, red stakes; caption "Лесовоз". Tile 2: truck tractor with a pole trailer carrying long tree-length stems; caption "Хлыстовоз". Tile 3: close-up of a hydraulic loader crane with rotating grapple lifting logs onto a truck; caption "Гидроманипулятор". Tile 4: heavy loader with huge jaws carrying a bundle of logs on a yard; caption "Челюстной погрузчик". Tile 5: wheel loader with log forks and top clamp; caption "Фронтальный погрузчик с грейфером". Tile 6: forklift carrying wrapped packs of boards in a warehouse; caption "Вилочный погрузчик". Tile 7: gantry crane over a log yard loading a railway car; caption "Козловой кран". Tile 8: railway flat car with high stakes loaded with logs; caption "Вагон-сортиментовоз".
```

### Т8. Транспорт — 2, дорожная техника
```
Tile 1: river barge and a cargo ship loaded with timber at a port; caption "Лесовозное судно и баржа". Tile 2: historic log raft towed by a tug on a wide northern river; caption "Плоты и сплав". Tile 3: bulldozer pushing soil on a new forest road; caption "Бульдозер". Tile 4: motor grader levelling a gravel forest road; caption "Автогрейдер". Tile 5: excavator digging a roadside ditch, another with a hydraulic breaker on rock; caption "Экскаватор". Tile 6: dump truck unloading gravel; caption "Самосвал". Tile 7: vibratory road roller compacting a forest road; caption "Каток". Tile 8: excavator with a stump ripper tooth pulling out a pine stump; caption "Корчеватель пней".
```

### Т9. Вахтовый посёлок, ЦБК, котельная
```
Tile 1: row of mobile living wagons on skids in a snowy forest camp; caption "Вагон-дом". Tile 2: containerized diesel generator; caption "Дизель-генератор". Tile 3: fuel tanker truck and fuel tanks behind a fence; caption "Топливозаправщик и склад ГСМ". Tile 4: huge rotating debarking drum with logs falling out; caption "Окорочный барабан". Tile 5: tall steel continuous digester tower at a pulp mill; caption "Варочный котёл ЦБК". Tile 6: large industrial recovery boiler building with pipes and chimney; caption "Содорегенерационный котёл". Tile 7: long paper machine with rollers producing a giant paper reel; caption "Бумагоделательная машина". Tile 8: biomass boiler house with a pile of bark and wood chips; caption "Котельная на древесных отходах".
```

### Т10. Лесовосстановление — 1
```
Tile 1: cone drying kiln with racks of pine cones; caption "Шишкосушилка". Tile 2: rotating drum machine removing wings from conifer seeds; caption "Обескрыливатель семян". Tile 3: automated line filling cassette trays with peat and sowing seeds; caption "Линия посева в кассеты". Tile 4: black plastic cassette trays with seedlings, one plug pulled out; caption "Кассеты для сеянцев". Tile 5: long greenhouse full of conifer seedlings under irrigation; caption "Теплица питомника". Tile 6: worker planting a pine seedling with a narrow steel planting sword; caption "Меч Колесова". Tile 7: planter dropping a plug seedling into a planting tube; caption "Посадочная труба". Tile 8: tractor with a tree planting machine, worker on the seat feeding seedlings; caption "Лесопосадочная машина".
```

### Т11. Лесовосстановление — 2, лесохимия — 1
```
Tile 1: tractor pulling a forest plough cutting furrows through moss to sand; caption "Лесной плуг". Tile 2: disc trencher scarifying a clear-cut in strips; caption "Дисковый рыхлитель". Tile 3: tractor cultivator loosening soil between rows of young pines; caption "Культиватор". Tile 4: worker with a backpack sprayer treating young plantation; caption "Опрыскиватель". Tile 5: rotary drum dryer and a mill producing green needle meal into sacks; caption "Сушилка и мельница". Tile 6: steam distillation vat with fir branches and a glass separator with oil on water; caption "Перегонный куб для эфирного масла". Tile 7: closed steel retort kiln producing charcoal with smoke pipe; caption "Печь-реторта". Tile 8: row of industrial extraction tanks with pipes at a chemical plant; caption "Экстракционная установка".
```

### Т12. Лесохимия — 2, подготовка сырья, распиловка
```
Tile 1: rosin and turpentine plant: melting tanks, copper still, condenser, rosin poured into drums; caption "Канифольно-терпентинная установка". Tile 2: tall distillation column with platforms at a tall oil refinery; caption "Ректификационная колонна". Tile 3: ring debarker stripping bark off a log on a conveyor; caption "Окорочный станок". Tile 4: metal detector frame over a log conveyor with a warning light; caption "Металлодетектор". Tile 5: log slasher deck: conveyor and circular saws cutting stems into logs; caption "Раскряжёвочная установка". Tile 6: long log sorting conveyor dropping logs into side pockets; caption "Сортировочный транспортёр". Tile 7: large industrial vertical band saw with log carriage in a sawmill; caption "Ленточнопильный станок". Tile 8: circular-saw sawmill with horizontal and vertical blades cutting a log; caption "Дисковая (круглопильная) пилорама".
```

### Т13. Распиловка, сушка, столярка — 1
```
Tile 1: chipper-canter line: log passing cutter heads producing chips and a cant; caption "Фрезерно-пильная линия". Tile 2: band resaw splitting a thick board into thin boards; caption "Делительный (ребровый) станок". Tile 3: radial arm crosscut saw cutting a board on a table; caption "Торцовочный станок". Tile 4: automatic optimizing crosscut line with a scanner marking defects on boards; caption "Торцовочный станок с оптимизатором". Tile 5: cylindrical vacuum kiln with an open door and stacked hardwood; caption "Вакуумная сушильная камера". Tile 6: spindle moulder shaping a profiled edge on a door part; caption "Фрезерный станок". Tile 7: tenoning machine cutting tenons on frame parts; caption "Шипорезный станок". Tile 8: horizontal boring and slot mortising machine making a mortise; caption "Сверлильно-пазовальный станок".
```

### Т14. Столярка — 2, склейка, раскрой
```
Tile 1: wood lathe turning a baluster with shavings flying; caption "Токарный станок по дереву". Tile 2: finger-joint line with zig-zag joints on board ends; caption "Линия сращивания". Tile 3: roller glue spreader coating veneer sheets; caption "Клеенаносящий станок". Tile 4: hydraulic press clamping a glulam beam; caption "Пресс для склейки". Tile 5: membrane vacuum press wrapping MDF fronts in foil; caption "Вакуумный (мембранный) пресс". Tile 6: sliding table panel saw cutting a chipboard sheet; caption "Форматно-раскроечный станок". Tile 7: edge banding machine applying edge tape to a panel; caption "Кромкооблицовочный станок". Tile 8: wide-belt calibrating sander with a panel entering; caption "Калибровально-шлифовальный станок".
```

### Т15. Отделка, защита, домостроение
```
Tile 1: belt sander smoothing a wooden panel; caption "Шлифовальный станок". Tile 2: spray coating line with boards on a conveyor entering a drying tunnel; caption "Покрасочная линия". Tile 3: horizontal pressure impregnation cylinder with greenish treated lumber; caption "Автоклав для пропитки". Tile 4: thermal modification chamber with dark brown heat-treated boards; caption "Камера термомодификации". Tile 5: machine wrapping a pack of boards in plastic film and straps; caption "Упаковочная машина". Tile 6: log rounding machine turning a log into a perfect cylinder; caption "Оцилиндровочный станок". Tile 7: machine cutting a saddle notch in a round log; caption "Чашкозарезной станок". Tile 8: automatic saw blade sharpening machine with grinding wheel on a band saw blade; caption "Заточной станок".
```

### Т16. Инструментальное хозяйство, фанера и плиты
```
Tile 1: saw tooth setting machine bending band saw teeth alternately; caption "Разводной станок". Tile 2: long knife grinding machine sharpening a planer knife; caption "Ножеточильный станок". Tile 3: rotary veneer lathe peeling a continuous ribbon from a log; caption "Лущильный станок". Tile 4: guillotine clipper cutting veneer ribbon into sheets; caption "Ножницы для шпона". Tile 5: long roller veneer dryer with sheets coming out; caption "Сушилка шпона". Tile 6: multi-opening hot press loaded with plywood panels; caption "Горячий пресс". Tile 7: knife ring flaker producing flat wood strands; caption "Стружечный станок". Tile 8: refiner with large discs and steam pipes producing wood fibre; caption "Дефибратор (рафинёр)".
```

### Т17. Биотопливо (сетка 3×1)
```
Three wide tiles in one row with captions: hammer mill grinding wood chips into fine sawdust; caption "Молотковая дробилка". Ring-die pellet mill with fresh pellets pouring out; caption "Гранулятор". Briquetting press producing cylindrical sawdust briquettes with a hole in the middle; caption "Брикетировщик". Layout: 3 equal tiles in one row, dark-green caption bars, photorealistic, 3:2, 1536x1024, no brand names, no logos, no other text.
```

---

Итого: 11 листов по породам и 17 по технике. Присылай в любом порядке, можно частями.
