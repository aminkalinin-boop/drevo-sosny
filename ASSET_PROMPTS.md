# Фото-ассеты для «Древа сосны»: что сгенерировать и промпты

## Общие советы

- **Формат.** Иллюстрация к разделу — 1536×1024 (3:2). Карточки — сеткой 2×2 или 4×2 на одном листе 1536×1024, как в прошлых ассетах: одна картинка, несколько плиток, я нарезаю их и раскладываю по карточкам.
- **Стиль.** Тот же, что у прошлых ассетов: фотореалистичный снимок, тёмно-зелёная плашка с заголовком, круглые врезки-детали, нижняя полоса с иконками и параметрами. Тогда весь справочник выглядит единым.
- **Текст на картинке.** Генераторы часто путают буквы кириллицы (в прошлом ассете «Пиловочник» вышел с битой буквой). Оставляй на картинке только крупный заголовок и 2–3 коротких подписи, а подробности всё равно есть в карточке. После генерации проверяй каждое слово.
- **Язык промпта.** Описание сцены лучше писать по-английски, а надписи — по-русски в кавычках. Так модель точнее рисует сцену и не переводит подписи.
- **Люди.** Для блока «ЛПК в УИС» не генерируй реалистичных осуждённых и сотрудников в форме: такие картинки легко принять за документальные. Лучше инфографика, схемы, цеха и техника без узнаваемых людей.
- **Проверка фактов.** Модель может нарисовать технику «из головы»: проверяй, чтобы харвестер, рама или карра выглядели как настоящие.

## Базовая строка стиля

Добавляй её в конец каждого промпта:

```
Style: photorealistic educational infographic card, natural daylight, Russian boreal pine forest setting, dark forest-green header bar with large white Cyrillic title, 2–3 circular detail insets with thin white border, bottom dark-green band with simple white line icons and short parameters, clean layout, high detail, 3:2, 1536x1024. All text in Russian, spelled exactly as given in quotes, no other text.
```

## Что сгенерировать в первую очередь

Порядок — по тому, где без картинки понять труднее всего.

### 1. Направленная валка: подруб, недоруб, основной рез
Куда: «Лесозаготовка → Валка», «Древо сосны → Рубка».
```
Cross-section diagram of a pine trunk at the base during directional felling: a wedge-shaped notch cut on the falling side, a back cut slightly higher on the opposite side, a narrow hinge of uncut wood between them, a felling wedge driven into the back cut, arrow showing the direction of fall, a person in orange forestry PPE with chainsaw standing at 45 degrees on the escape route, dotted circle showing the danger zone of two tree lengths. Labels: "Подруб", "Недоруб", "Основной рез", "Клин", "Путь отхода", "Опасная зона". Title: "Направленная валка".
```

### 2. Раскряжёвка хлыста на сортименты
Куда: «Древо сосны → Раскряжёвка», «Лесозаготовка → Раскряжёвка».
```
A long debranched pine stem lying horizontally on a forest landing, divided by bright cut lines into colored segments from butt to top: thick butt section, middle sections, thin top section; each segment labeled with its product and length. Labels: "Комель", "Пиловочник 6 м", "Пиловочник 4 м", "Баланс 4 м", "Подтоварник", "Дрова", "Вершина". Inset circles: close-up of the butt end with growth rings, close-up of a top-end diameter measurement with a caliper. Title: "Раскряжёвка хлыста".
```

### 3. Пороки древесины (сетка 4×2)
Куда: «Деловая древесина», «Пороки» в словаре.
```
Grid of 8 equal tiles, each a close-up photo of a pine board or log end showing one wood defect, with a short Russian caption bar at the bottom of each tile: "Здоровый сучок", "Гнилой сучок", "Ядровая гниль", "Синева", "Трещина", "Червоточина", "Смоляной карман", "Кривизна".
```

### 4. Схема распиловки бревна
Куда: «Деревообработка → Распиловка», «Пиловочник».
```
End-grain view of a pine log with a sawing pattern drawn over it: a central two-sided cant, boards cut from the cant, side boards, curved slabs with bark on the outside, small pile of sawdust beside. Second panel shows the resulting products laid out: cant, edged boards, unedged board, slabs, sawdust, chips. Labels: "Двухкантный брус", "Обрезная доска", "Необрезная доска", "Горбыль", "Опилки", "Щепа". Title: "Как распиливают бревно".
```

### 5. Пиломатериалы и погонаж (сетка 4×2)
Куда: «Пиломатериалы», «Каталог продукции».
```
Grid of 8 tiles, each a studio photo of a pine lumber product on light background with its end profile visible: "Обрезная доска", "Необрезная доска", "Брус", "Брусок", "Вагонка", "Имитация бруса", "Блок-хаус", "Половая доска".
```

### 6. Плиты в разрезе (сетка 3×2 или 4×2)
Куда: «Производство плит».
```
Grid of tiles, each showing a stack of wood-based panels with a cut edge clearly revealing internal structure: plywood with cross-laminated veneer layers, particleboard with chips, MDF with fine uniform fibres, OSB with large oriented strands, hardboard thin sheet, glued laminated beam with lamellae. Captions: "Фанера", "ДСП", "МДФ", "ОСП", "ДВП", "Клееный брус".
```

### 7. Подсочка сосны
Куда: «Древо сосны → Живица».
```
Mature Scots pine trunk with a resin-tapping face: a vertical strip of removed bark with herringbone-pattern diagonal grooves, a central channel, a small cone-shaped cup collecting golden resin at the bottom, a curved tapping knife resting nearby. Inset circles: fresh resin drops on the grooves, a bucket of collected raw resin. Labels: "Карра", "Насечки «ёлочкой»", "Приёмник", "Хак". Title: "Подсочка".
```

### 8. Технологии заготовки: три способа (сетка 3×1)
Куда: «Лесозаготовка → Три технологии».
```
Three wide panels side by side. Panel 1: harvester cutting and processing a tree into short logs at the stump, forwarder carrying logs; caption "Сортиментная". Panel 2: worker with chainsaw felling, skidder dragging whole stems with cables, delimber at landing; caption "Хлыстовая". Panel 3: feller-buncher gathering whole trees with crowns, skidder dragging tree bundles to a processor and chipper at the roadside; caption "Деревьями".
```

### 9. Трелёвка (сетка 2×2)
Куда: «Лесозаготовка → Трелёвка».
```
Four tiles: crawler skidder dragging a bundle of stems tied with steel choker cables, caption "Чокерная"; wheeled grapple skidder carrying stems with front ends raised, caption "Бесчокерная"; eight-wheel forwarder loaded with short logs on a strip road covered with branch mat, caption "Форвардером"; cable yarding system moving logs through the air on a steep slope, caption "Канатная".
```

### 10. Лесопильные станки (сетка 2×2 или 4×2)
Куда: «Техника → Лесопильные станки».
```
Tiles of woodworking sawmill machines in a real workshop, each with caption: horizontal band sawmill with carriage on rails, "Ленточная пилорама"; heavy vertical frame saw with many blades, "Лесопильная рама"; multi-rip circular saw with several blades, "Многопильный станок"; edger trimming bark edges off boards with laser lines, "Обрезной станок"; four-sided planer-moulder with exposed cutter heads, "Четырёхсторонний станок"; jointer and thicknesser, "Фуговальный и рейсмусовый"; CNC router cutting MDF, "Станок с ЧПУ"; drying kiln interior with stickered lumber stacks and fans, "Сушильная камера".
```

### 11. Вредители и болезни сосны (сетка 4×2)
Куда: «Древо сосны → Кто вредит сосне».
```
Grid of 8 close-up nature photos with captions: hoof-shaped bracket fungus on pine trunk near a branch stub, "Сосновая губка"; red-banded polypore on a dead pine log, "Окаймлённый трутовик"; galleries of bark beetles under peeled pine bark with boring dust, "Сосновый лубоед"; large hairy caterpillar eating pine needles, "Сосновый шелкопряд"; black longhorn beetle with very long antennae on pine bark, "Чёрный сосновый усач"; pine stem with resin-soaked cracked canker, "Смоляной рак"; evergreen mistletoe ball on a pine branch, "Омела"; honey mushrooms clustered at the base of a pine, "Опёнок осенний".
```

### 12. Грибы на брёвнах
Куда: «Грибы на брёвнах: выращивание».
```
Shaded mushroom yard with hardwood logs stacked in a criss-cross pattern; close-up of a log with rows of drilled holes sealed with wax plugs; shiitake mushrooms fruiting from logs; glossy red-brown reishi shelf mushrooms growing on a stump. Insets: drill bit and wooden dowels with white mycelium, harvested mushrooms in a basket. Labels: "Отверстия с грибницей", "Шиитаке", "Рейши (трутовик лакированный)". Title: "Грибы на брёвнах".
```

### 13. Лесные дороги (сетка 2×2)
Куда: «Отвод делянки → Лесные дороги».
```
Four tiles: gravel all-season forest road with ditches and a culvert, caption "Магистраль"; narrow temporary dirt spur road into a cutting area, caption "Ус"; packed snow winter road across a frozen bog with log trucks, caption "Зимник"; corduroy road of transverse logs laid across a swamp, caption "Лежнёвка".
```

### 14. Таксация: как меряют дерево
Куда: «Лес → Как описывают участок», «Отвод делянки → Перечёт».
```
Forester measuring a pine at breast height with a large aluminium caliper, a mark showing "1,3 м" on the trunk; second forester sighting the top with a handheld hypsometer; close-up of an increment borer extracting a thin wood core showing growth rings. Labels: "Мерная вилка", "Высотомер", "Бурав Пресслера", "Керн". Title: "Таксация".
```

### 15. Плотный и складочный кубометр
Куда: «Учёт древесины», «Словарь».
```
Side-by-side comparison on a forest landing: left, a solid 1×1×1 m cube of wood; right, a 1×1×1 m frame filled with stacked logs with visible air gaps between them. Labels: "Плотный м³", "Складочный м³ ≈ 0,6–0,8 плотного". Title: "Как считают кубометры".
```

### 16. Лесохимия: от живицы и пней к продуктам
Куда: «Канифоль», «Скипидар», «Осмол».
```
Clean technical illustration of a small rosin and turpentine plant: barrels of raw pine resin, melting and settling tanks, a copper still with steam pipe, condenser coil dripping clear turpentine into a tank, molten amber rosin poured into drums. Second smaller panel: old pine stump pieces loaded into a brick tar kiln with dark tar flowing into a barrel. Labels: "Живица", "Перегонный куб", "Скипидар", "Канифоль", "Смолокурня", "Смола". Title: "Лесохимия".
```

### 17. Целлюлозно-бумажный комбинат
Куда: «Целлюлоза».
```
Isometric cutaway infographic of a pulp and paper mill: log yard, debarking drum, chipper, chip pile, tall digester, washing, paper machine with long line of rollers producing a giant paper roll, recovery boiler with chimney. Labels: "Окорка", "Щепа", "Варка", "Целлюлоза", "Бумагоделательная машина", "Котёл щёлока". Title: "Как дерево становится бумагой".
```

### 18. Питомник: открытая и закрытая корневая система
Куда: «Лесовосстановление → Питомник».
```
Two panels: left, bare-root pine seedlings lifted from a field nursery bed with exposed roots, caption "Открытая корневая система"; right, pine seedlings growing in black plastic cassette trays in a greenhouse, one pulled out showing a root plug of peat, caption "Закрытая корневая система". Insets: worker planting with a narrow steel planting sword, a planting tube. Labels: "Меч Колесова", "Посадочная труба".
```

### 19. Путь партии древесины: документы
Куда: «Реализация → Путь одной партии».
```
Horizontal step-by-step infographic with icons and arrows: forest declaration document, felling site with stacked logs, contract signing, computer screen with state timber accounting system, log truck with electronic waybill on a phone, mill gate scanner measuring logs, invoice and payment. Captions: "Декларация", "Заготовка", "Договор", "ЛесЕГАИС", "ЭСД", "Приёмка", "Оплата". Flat vector style, forest-green palette, no photorealistic people.
```

### 20. Структура ЛПК в УИС (схема)
Куда: «ЛПК в УИС → Структура управления».
```
Clean flat organizational chart infographic, forest-green and grey palette, no people: top box "ФСИН России", below "УФСИН / ГУФСИН", below three boxes "Исправительные колонии", "Колонии-поселения", "ОИУ ОУХД", below them "Центры трудовой адаптации", side boxes "Профучилища при колониях" and "Лесные участки (постоянное пользование)". Thin arrows, simple icons (building, tree, gear, graduation cap). Title: "Лесной комплекс УИС".
```

### 21. Производственный цикл учреждения (схема)
Куда: «ЛПК в УИС → Производственный цикл».
```
Circular flow infographic without people: forest plot → logging → lower landing → sawmill → drying → joinery and furniture workshop → finished products (log house kits, furniture, pallets) → sales; waste wood arrow going to a boiler house heating a small settlement. Flat vector, green palette, short Russian captions: "Лесной участок", "Заготовка", "Нижний склад", "Лесопиление", "Сушка", "Деревообработка", "Продукция", "Котельная".
```

## Как отдавать мне

Присылай картинку в чат и пиши, в какой раздел она относится, — или просто присылай: по заголовкам на плитках я сам разберусь, как в прошлый раз.

## Новые вкладки «Хвойные» и «Лиственные»

### 22. Хвойные породы (сетка 4×1, как прошлый ассет видов сосен)
Куда: «Хвойные» — карточки ели, лиственницы, кедра, пихты.
```
Four tall tiles in the same style as a species card: each shows a mature tree in its natural habitat, with three circular insets on the right (needles close-up, cone, wood cross-section) and a dark-green caption bar with the Russian name and Latin name: "Ель обыкновенная (Picea abies)" — dense conical spruce reaching the ground, hanging cones; "Лиственница сибирская (Larix sibirica)" — tall larch with soft light-green tufted needles, small upright cones, red-brown heartwood; "Кедр сибирский (Pinus sibirica)" — massive five-needle pine with large purple-brown cones full of nuts; "Пихта сибирская (Abies sibirica)" — narrow spire-shaped fir with flat soft needles, upright cones, smooth grey bark with resin blisters.
```

### 23. Лиственные породы (сетка 4×2)
Куда: «Лиственные» — карточки пород.
```
Eight tiles, same style: tree, insets with leaf, fruit or flower, wood cross-section, caption bar with Russian and Latin name: "Берёза (Betula pendula)", "Осина (Populus tremula)", "Дуб черешчатый (Quercus robur)", "Липа мелколистная (Tilia cordata)", "Ольха чёрная (Alnus glutinosa)", "Ясень (Fraxinus excelsior)", "Бук восточный (Fagus orientalis)", "Тополь (Populus nigra)".
```

### 24. Что даёт берёза (сетка 4×2)
Куда: «Берёза».
```
Eight tiles with captions: rolls of white birch bark, "Береста"; dark tar dripping from a clay pot over fire, "Дёготь"; birch sap dripping from a tap into a glass jar in early spring, "Берёзовый сок"; black chaga growth on a birch trunk, "Чага"; birch bark baskets and lidded containers, "Туеса"; stack of birch plywood sheets with layered edge, "Фанера"; split birch firewood stack, "Дрова"; bath broom of birch twigs, "Веник".
```

### 25. Продукты хвойных (сетка 4×2)
Куда: «Ель», «Лиственница», «Кедр», «Пихта».
```
Eight tiles with captions: cedar nuts in cones and shelled kernels, "Кедровые орехи"; bottle of golden cedar nut oil, "Кедровое масло"; small amber bottle of fir essential oil with fir sprigs, "Пихтовое масло"; violin top made of spruce with fine straight grain, "Резонансная ель"; larch terrace decking, "Лиственничная терраса"; larch piles in water under a pier, "Лиственничные сваи"; spruce bark pieces with leather hides, "Еловое корьё"; natural chewing resin pieces, "Сера".
```

### 26. Продукты лиственных (сетка 4×2)
Куда: «Дуб», «Липа», «Осина», «Ольха», «Ясень».
```
Eight tiles with captions: oak barrels in a cellar, "Дубовые бочки"; oak parquet floor, "Дубовый паркет"; black bog oak slab, "Мореный дуб"; linden bast strips and bast shoes, "Лыко и мочало"; carved linden spoons and icon board, "Липовая резьба"; aspen shingles on a wooden church dome, "Осиновый лемех"; matchsticks and matchboxes, "Спички"; alder wood chips smoking fish, "Ольховая щепа для копчения".
```
