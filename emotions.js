(function() {
    'use strict';
    
    class EmotionAnalyzer {
        constructor(language = 'auto') {
            this.version = '1.0.0';
            this.language = language;
            this.metrics = {};
            this.initializeExtendedDictionaries();
            this.initializeEnhancedAnalysisMethods();
            this.initializeCulturalContext();
            this.initializePsychologicalModels();
            console.log(`Blokknote Emotion Analyzer v${this.version} initialized for ${language}`);
        }
        
        initializeExtendedDictionaries() {
            this.dictionaries = {        
                ru: {
                    ecstasy: [
                        'экстаз', 'восторг', 'ликование', 'эйфория', 'упоение', 'исступление', 'воодушевление',
                        'блаженство', 'восхищение', 'опьянение', 'торжество', 'триумф', 'празднество', 'литургия',
                        'апофеоз', 'пафос', 'патетика', 'экзальтация', 'упоенье', 'распаление', 'накал', 'напряжение',
                        'парения', 'взлёт', 'подъём', 'возвышение', 'одухотворение', 'вдохновенность', 'горение'
                    ],
                    joy: [
                        'радость', 'счастье', 'веселье', 'упоение', 'ликбезность', 'торжество', 'триумф',
                        'блаженство', 'наслаждение', 'удовольствие', 'утеха', 'утешение', 'забава', 'увеселение',
                        'праздник', 'празднество', 'ликование', 'торжество', 'радостность', 'счастливость', 'веселость',
                        'жизнерадостность', 'оптимизм', 'восторженность', 'восхитительность', 'прелесть', 'очарование',
                        'благодушие', 'благополучие', 'процветание', 'расцвет', 'распускание', 'цветение'
                    ],
                    love: [
                        'любовь', 'обожание', 'преклонение', 'обожествление', 'симпатия', 'привязанность', 'нежность',
                        'страсть', 'влюбленность', 'обожание', 'благоговение', 'почтение', 'уважение', 'признание',
                        'преданность', 'верность', 'преклонение', 'обожествление', 'идеализация', 'романтизм', 'чувственность',
                        'эмоциональность', 'теплота', 'ласка', 'нежность', 'забота', 'опека', 'самопожертвование'
                    ],
                    peace: [
                        'мир', 'спокойствие', 'умиротворение', 'безмятежность', 'гармония', 'равновесие', 'баланс',
                        'тишина', 'покой', 'успокоение', 'умиротворенность', 'беспечность', 'беззаботность', 'легкость',
                        'расслабление', 'релаксация', 'медитация', 'созерцание', 'размышление', 'самонаблюдение', 'интроспекция',
                        'самопознание', 'самосозерцание', 'уединение', 'изоляция', 'отшельничество', 'аскеза'
                    ],
                    hope: [
                        'надежда', 'вера', 'упование', 'ожидание', 'предвкушение', 'антиципация', 'чаянность',
                        'упование', 'доверие', 'уверенность', 'оптимизм', 'перспектива', 'будущее', 'горизонт',
                        'свет', 'луч', 'просвет', 'озарение', 'откровение', 'видение', 'мечта', 'фантазия',
                        'иллюзия', 'миражи', 'грёзы', 'сновидения', 'утопия', 'идеал', 'совершенство'
                    ],
                    gratitude: [
                        'благодарность', 'признательность', 'благодарение', 'спасибо', 'благодать', 'ценность',
                        'признание', 'оценка', 'уважение', 'почитание', 'почет', 'восхищение', 'преклонение',
                        'обожание', 'благоговение', 'трепет', 'восторг', 'воодушевление', 'вдохновение'
                    ],
                    inspiration: [
                        'вдохновение', 'одушевление', 'воодушевление', 'порыв', 'импульс', 'побуждение',
                        'муза', 'творчество', 'создание', 'творение', 'произведение', 'шедевр', 'мастерство',
                        'искусство', 'талант', 'гений', 'дарование', 'способность', 'умение', 'мастерство'
                    ],
                    pride: [
                        'гордость', 'достоинство', 'самоуважение', 'честь', 'гордыня', 'величие', 'величавость',
                        'самолюбие', 'самоуважение', 'самоценность', 'самооценка', 'самодостаточность', 'независимость',
                        'автономия', 'суверенитет', 'самостоятельность', 'самоуправление', 'самоопределение'
                    ],
                    surprise: [
                        'удивление', 'изумление', 'ошеломление', 'поражение', 'потрясение', 'шок', 'амейзинг',
                        'неожиданность', 'сюрприз', 'открытие', 'озарение', 'просветление', 'осознание', 'понимание',
                        'прозрение', 'инсайт', 'озарение', 'вдохновение', 'творческий подъём'
                    ],
                    curiosity: [
                        'любопытство', 'любознательность', 'интерес', 'внимание', 'впечатлительность',
                        'исследование', 'изучение', 'анализ', 'синтез', 'поиск', 'разведка', 'рекогносцировка',
                        'экспедиция', 'путешествие', 'странствие', 'паломничество', 'квест', 'миссия'
                    ],
                    
                    aesthetic: [
                        'красота', 'изящество', 'грация', 'элегантность', 'прелесть', 'очарование', 'обаяние',
                        'эстетика', 'гармония', 'симметрия', 'пропорция', 'соразмерность', 'совершенство', 'идеал',
                        'возвышенное', 'прекрасное', 'величественное', 'монументальное', 'грандиозное', 'великолепное',
                        'роскошь', 'блеск', 'сияние', 'свечение', 'свет', 'луч', 'сияние', 'блеск', 'яркость'
                    ],
                    nostalgia: [
                        'ностальгия', 'томление', 'тоска', 'воспоминание', 'память', 'прошлое',
                        'ретроспектива', 'взгляд назад', 'реминисценция', 'отголосок', 'эхо', 'след', 'отпечаток',
                        'палимпсест', 'слой', 'пласт', 'стратиграфия', 'история', 'хроника', 'летопись'
                    ],
                    triumph: [
                        'триумф', 'победа', 'успех', 'достижение', 'завоевание', 'превосходство', 'доминирование',
                        'торжество', 'ликование', 'празднование', 'чествование', 'награждение', 'признание', 'слава',
                        'известность', 'популярность', 'признание', 'авторитет', 'влияние', 'власть'
                    ],
                    liberation: [
                        'освобождение', 'свобода', 'воля', 'независимость', 'автономия', 'суверенитет',
                        'эмансипация', 'раскрепощение', 'расслабление', 'отпускание', 'отпущение', 'прощение',
                        'искупление', 'очищение', 'катарсис', 'просветление', 'освобождение', 'спасение', 'избавление'
                    ],
                    connection: [
                        'связь', 'единство', 'союз', 'сопричастность', 'общность', 'коммуникация',
                        'взаимодействие', 'сотрудничество', 'партнерство', 'альянс', 'коалиция', 'федерация',
                        'конфедерация', 'сообщество', 'коллектив', 'группа', 'команда', 'бригада', 'отряд'
                    ],
                    
                    sadness: [
                        'грусть', 'печаль', 'тоска', 'уныние', 'меланхолия', 'хандра', 'сплин',
                        'скорбь', 'горе', 'печаль', 'траур', 'плач', 'слёзы', 'рыдание', 'вопль',
                        'стенание', 'причитание', 'жалоба', 'ропот', 'брюзжание', 'ворчание', 'воркотня'
                    ],
                    grief: [
                        'горе', 'скорбь', 'траур', 'потеря', 'утрата', 'лишение', 'бедствие',
                        'катастрофа', 'трагедия', 'беда', 'несчастье', 'бедствие', 'катаклизм', 'апокалипсис',
                        'конец света', 'судный день', 'армагеддон', 'распад', 'разложение', 'тление'
                    ],
                    anger: [
                        'гнев', 'ярость', 'злость', 'озлобление', 'негодование', 'возмущение', 'раздражение',
                        'бешенство', 'исступление', 'неистовство', 'яростность', 'злобность', 'озлобленность',
                        'враждебность', 'ненависть', 'отвращение', 'омерзение', 'презрение', 'пренебрежение'
                    ],
                    fear: [
                        'страх', 'ужас', 'боязнь', 'тревога', 'опасение', 'паника', 'фобия',
                        'испуг', 'пугливость', 'трусость', 'малодушие', 'робость', 'застенчивость', 'стеснительность',
                        'неуверенность', 'сомнение', 'опасение', 'предчувствие', 'предвидение', 'пророчество'
                    ],
                    disgust: [
                        'отвращение', 'омерзение', 'неприязнь', 'антипатия', 'нелюбовь', 'ненависть',
                        'презрение', 'пренебрежение', 'презрительность', 'пренебрежительность', 'надменность',
                        'высокомерие', 'гордыня', 'тщеславие', 'самолюбование', 'нарциссизм', 'эгоцентризм'
                    ],
                    shame: [
                        'стыд', 'срам', 'позор', 'унижение', 'смирение', 'принижение', 'уничижение',
                        'самоуничижение', 'самобичевание', 'самообвинение', 'самокритика', 'самоанализ', 'интроспекция',
                        'рефлексия', 'саморефлексия', 'самокопание', 'самоедство', 'саморазрушение'
                    ],
                    guilt: [
                        'вина', 'грех', 'проступок', 'провинность', 'прегрешение', 'преступление',
                        'предательство', 'измена', 'вероломство', 'коварство', 'подлость', 'низость', 'мерзость',
                        'гнусность', 'отвратительность', 'омерзительность', 'непристойность', 'неприличность'
                    ],
                    loneliness: [
                        'одиночество', 'изоляция', 'отчуждение', 'покинутость', 'заброшенность', 'сиротство',
                        'отшельничество', 'затворничество', 'аскетизм', 'монашество', 'схима', 'постничество',
                        'молчальничество', 'безмолвие', 'тишина', 'безлюдье', 'пустыня', 'пустошь'
                    ],
                    envy: [
                        'зависть', 'ревность', 'соперничество', 'конкуренция', 'соревнование', 'недоброжелательство',
                        'соперничество', 'конкуренция', 'борьба', 'противостояние', 'конфликт', 'столкновение',
                        'противоречие', 'антагонизм', 'вражда', 'неприязнь', 'антипатия', 'неприятие'
                    ],
                    despair: [
                        'отчаяние', 'безысходность', 'безнадежность', 'крах', 'провал', 'поражение', 'фиаско',
                        'провал', 'неудача', 'крах', 'банкротство', 'разорение', 'нищета', 'бедность', 'упадок',
                        'деградация', 'регресс', 'вырождение', 'дегенерация', 'распад', 'разложение'
                    ],
                    
                    contempt: [
                        'презрение', 'пренебрежение', 'надменность', 'высокомерие', 'гордыня', 'тщеславие',
                        'снобизм', 'элитаризм', 'аристократизм', 'патрицианство', 'вельможность', 'вельможество',
                        'барство', 'помещичество', 'дворянство', 'аристократия', 'элита', 'верхушка'
                    ],
                    bitterness: [
                        'горечь', 'обида', 'неудовлетворенность', 'фрустрация', 'разочарование', 'негатив',
                        'досада', 'раздражение', 'негодование', 'возмущение', 'недовольство', 'неудовлетворение',
                        'фрустрация', 'блокировка', 'препятствие', 'барьер', 'заграждение', 'блокада'
                    ],
                    anxiety: [
                        'тревога', 'беспокойство', 'волнение', 'нервозность', 'суетливость', 'возбуждение',
                        'тревожность', 'беспокойность', 'неуверенность', 'сомнение', 'нерешительность', 'колебание',
                        'неустойчивость', 'шаткость', 'зыбкость', 'нестабильность', 'неустойчивость'
                    ],
                    emptiness: [
                        'пустота', 'вакуум', 'ничто', 'небытие', 'отсутствие', 'лишение', 'депривация',
                        'нирвана', 'просветление', 'освобождение', 'отпускание', 'отпущение', 'отречение',
                        'аскетизм', 'минимализм', 'простота', 'скромность', 'незаметность', 'неприметность'
                    ],
                    confusion: [
                        'смущение', 'замешательство', 'растерянность', 'недоумение', 'ошеломление', 'потерянность',
                        'дезориентация', 'дезориентированность', 'потерянность', 'блуждание', 'скитание', 'странствие',
                        'путешествие', 'паломничество', 'квест', 'поиск', 'исследование', 'изучение'
                    ],
                    
                    ambivalence: [
                        'двойственность', 'неоднозначность', 'противоречивость', 'парадокс', 'дилемма',
                        'противоречие', 'антиномия', 'антитеза', 'оппозиция', 'противоположность', 'контраст',
                        'полярность', 'биполярность', 'маниакально-депрессивный', 'циклотимия', 'биполярность'
                    ],
                    irony: [
                        'ирония', 'сарказм', 'насмешка', 'язвительность', 'колкость', 'едкость',
                        'сатира', 'пародия', 'гротеск', 'абсурд', 'нелепость', 'бессмыслица', 'абсурдизм',
                        'экзистенциализм', 'абсурдизм', 'нигилизм', 'скептицизм', 'агностицизм', 'атеизм'
                    ],
                    nostalgiaMixed: [
                        'горькая ностальгия', 'сладкая грусть', 'радостная печаль', 'грустная радость',
                        'меланхолическая радость', 'светлая грусть', 'тёмная радость', 'мрачное веселье',
                        'весёлая тоска', 'радостное уныние', 'счастливая печаль', 'благодарная скорбь'
                    ],
                    bittersweet: [
                        'горько-сладкий', 'противоречивый', 'смешанный', 'комплексный', 'многослойный',
                        'многосложный', 'многогранный', 'многоаспектный', 'многомерный', 'многоуровневый',
                        'многоэтапный', 'последовательный', 'поступательный', 'прогрессивный', 'поступательный'
                    ],
                    
                    intensity: [
                        'интенсивность', 'напряжение', 'накал', 'страстность', 'пылкость', 'горение',
                        'жар', 'тепло', 'огонь', 'пламя', 'горение', 'пылание', 'воспламенение', 'возгорание',
                        'вспышка', 'молния', 'гром', 'буря', 'шторм', 'ураган', 'тайфун'
                    ],
                    calmness: [
                        'спокойствие', 'умиротворение', 'безмятежность', 'невозмутимость', 'равнодушие',
                        'хладнокровие', 'бесстрастие', 'апатия', 'индифферентность', 'нейтральность', 'объективность',
                        'беспристрастность', 'непредвзятость', 'независимость', 'автономность', 'суверенность'
                    ],
                    vulnerability: [
                        'уязвимость', 'ранимость', 'чувствительность', 'восприимчивость', 'открытость',
                        'прозрачность', 'искренность', 'честность', 'прямота', 'откровенность', 'непосредственность',
                        'наивность', 'детскость', 'невинность', 'непорочность', 'девственность', 'чистота'
                    ],
                    resilience: [
                        'стойкость', 'устойчивость', 'выносливость', 'терпение', 'упорство', 'непоколебимость',
                        'непокорность', 'несгибаемость', 'непобедимость', 'неуязвимость', 'неприступность',
                        'недоступность', 'неприкосновенность', 'неосязаемость', 'неуловимость', 'непостижимость'
                    ],
                    
                    rejoice: [
                        'радоваться', 'веселиться', 'ликовать', 'торжествовать', 'праздновать',
                        'наслаждаться', 'блаженствовать', 'упиваться', 'восторгаться', 'восхищаться',
                        'обожать', 'боготворить', 'преклоняться', 'поклоняться', 'служить', 'следовать'
                    ],
                    suffer: [
                        'страдать', 'мучиться', 'терпеть', 'переносить', 'выдерживать', 'испытывать',
                        'переживать', 'выносить', 'сносить', 'выдерживать', 'претерпевать', 'преодолевать',
                        'побеждать', 'превозмогать', 'превосходить', 'превышать', 'превосходить'
                    ],
                    loveVerb: [
                        'любить', 'обожать', 'боготворить', 'преклоняться', 'восхищаться',
                        'обожествлять', 'идеализировать', 'романтизировать', 'поэтизировать', 'возвеличивать',
                        'превозносить', 'восхвалять', 'славить', 'величать', 'чествовать', 'праздновать'
                    ],
                    hateVerb: [
                        'ненавидеть', 'презирать', 'отвергать', 'осуждать', 'проклинать',
                        'отвращаться', 'омерзеть', 'презирать', 'пренебрегать', 'игнорировать',
                        'отвергать', 'отказываться', 'отрицать', 'отрекаться', 'отказываться'
                    ],
                    fearVerb: [
                        'бояться', 'страшиться', 'опасаться', 'тревожиться', 'беспокоиться',
                        'пугаться', 'ужасаться', 'трусить', 'робеть', 'стесняться', 'сомневаться',
                        'не доверять', 'подозревать', 'опасаться', 'предчувствовать', 'предвидеть'
                    ],
                    hopeVerb: [
                        'надеяться', 'верить', 'уповать', 'ожидать', 'предвкушать',
                        'мечтать', 'фантазировать', 'воображать', 'представлять', 'видеть',
                        'предчувствовать', 'предвидеть', 'пророчествовать', 'прорицать', 'гадать'
                    ],
                    
                    joyfulAdj: [
                        'радостный', 'счастливый', 'веселый', 'ликующий', 'торжествующий',
                        'блаженный', 'восторженный', 'восхищенный', 'упоенный', 'опьяненный',
                        'одухотворенный', 'вдохновленный', 'воодушевленный', 'одушевленный', 'живой'
                    ],
                    sadAdj: [
                        'грустный', 'печальный', 'унылый', 'меланхоличный', 'тоскливый',
                        'скорбный', 'горестный', 'безутешный', 'отчаянный', 'безысходный',
                        'безнадежный', 'обреченный', 'погибший', 'умерший', 'мертвый'
                    ],
                    angryAdj: [
                        'злой', 'гневный', 'раздраженный', 'негодующий', 'яростный',
                        'бешеный', 'неистовый', 'исступленный', 'озлобленный', 'враждебный',
                        'ненавидящий', 'презирающий', 'пренебрегающий', 'отвергающий', 'отрицающий'
                    ],
                    peacefulAdj: [
                        'мирный', 'спокойный', 'умиротворенный', 'безмятежный', 'гармоничный',
                        'тихий', 'бесшумный', 'беззвучный', 'молчаливый', 'немой', 'безмолвный',
                        'спящий', 'дремлющий', 'отдыхающий', 'расслабленный', 'освобожденный'
                    ],
                    intenseAdj: [
                        'интенсивный', 'напряженный', 'страстный', 'пылкий', 'горячий',
                        'жаркий', 'знойный', 'палящий', 'горящий', 'пылающий', 'воспламеняющий',
                        'взрывной', 'молниеносный', 'стремительный', 'быстрый', 'скоростной'
                    ],
                    
                    joyfullyAdv: [
                        'радостно', 'счастливо', 'весело', 'ликующе', 'торжествующе',
                        'блаженно', 'восторженно', 'восхищенно', 'упоенно', 'опьяненно',
                        'одухотворенно', 'вдохновенно', 'воодушевленно', 'одушевленно', 'живо'
                    ],
                    sadlyAdv: [
                        'грустно', 'печально', 'уныло', 'меланхолично', 'тоскливо',
                        'скорбно', 'горестно', 'безутешно', 'отчаянно', 'безысходно',
                        'безнадежно', 'обреченно', 'погибше', 'умерше', 'мертво'
                    ],
                    angrilyAdv: [
                        'зло', 'гневно', 'раздраженно', 'негодующе', 'яростно',
                        'бешено', 'неистово', 'исступленно', 'озлобленно', 'враждебно',
                        'ненавидяще', 'презирающе', 'пренебрежительно', 'отвергающе', 'отрицающе'
                    ],
                    peacefullyAdv: [
                        'мирно', 'спокойно', 'умиротворенно', 'безмятежно', 'гармонично',
                        'тихо', 'бесшумно', 'беззвучно', 'молчаливо', 'немо', 'безмолвно',
                        'спяще', 'дремлюще', 'отдыхающе', 'расслабленно', 'освобожденно'
                    ]
                },
                
                en: {
                    ecstasy: [
                        'ecstasy', 'rapture', 'euphoria', 'bliss', 'delight', 'exaltation', 'elation',
                        'exhilaration', 'jubilation', 'triumph', 'celebration', 'festivity', 'liturgy',
                        'apotheosis', 'pathos', 'pathetic', 'exaltation', 'intoxication', 'passion', 'fervor',
                        'ardor', 'zeal', 'enthusiasm', 'inspiration', 'aspiration', 'ambition', 'yearning'
                    ],
                    joy: [
                        'joy', 'happiness', 'gladness', 'cheer', 'glee', 'jubilation', 'merriment',
                        'delight', 'pleasure', 'enjoyment', 'gratification', 'satisfaction', 'contentment',
                        'felicity', 'beatitude', 'blessedness', 'wellbeing', 'prosperity', 'flourishing',
                        'thriving', 'blooming', 'flowering', 'blossoming', 'ripening', 'maturing', 'developing'
                    ],
                    love: [
                        'love', 'adoration', 'affection', 'fondness', 'tenderness', 'devotion', 'passion',
                        'romance', 'infatuation', 'enchantment', 'fascination', 'captivation', 'obsession',
                        'idolization', 'worship', 'veneration', 'reverence', 'respect', 'admiration', 'esteem'
                    ],
                    peace: [
                        'peace', 'calm', 'serenity', 'tranquility', 'harmony', 'balance', 'equanimity',
                        'quiet', 'silence', 'stillness', 'repose', 'rest', 'relaxation', 'meditation',
                        'contemplation', 'reflection', 'introspection', 'self-observation', 'self-knowledge'
                    ],
                    hope: [
                        'hope', 'faith', 'trust', 'expectation', 'anticipation', 'optimism', 'confidence',
                        'assurance', 'certainty', 'conviction', 'belief', 'creed', 'doctrine', 'dogma',
                        'principle', 'maxim', 'axiom', 'theorem', 'hypothesis', 'theory', 'conjecture'
                    ],
                    gratitude: [
                        'gratitude', 'thankfulness', 'appreciation', 'recognition', 'acknowledgment',
                        'gratefulness', 'indebtedness', 'obligation', 'duty', 'responsibility', 'accountability',
                        'liability', 'commitment', 'engagement', 'involvement', 'participation', 'contribution'
                    ],
                    inspiration: [
                        'inspiration', 'enthusiasm', 'motivation', 'encouragement', 'stimulation',
                        'muse', 'creativity', 'creation', 'invention', 'innovation', 'discovery', 'breakthrough',
                        'revelation', 'epiphany', 'insight', 'realization', 'understanding', 'comprehension'
                    ],
                    pride: [
                        'pride', 'dignity', 'self-respect', 'honor', 'arrogance', 'grandeur', 'majesty',
                        'vanity', 'conceit', 'egoism', 'narcissism', 'self-love', 'self-admiration', 'self-esteem',
                        'self-confidence', 'self-assurance', 'self-reliance', 'independence', 'autonomy'
                    ],
                    surprise: [
                        'surprise', 'amazement', 'astonishment', 'wonder', 'shock', 'stupefaction',
                        'astonishment', 'wonderment', 'awe', 'marvel', 'miracle', 'phenomenon', 'prodigy',
                        'marvelous', 'wonderful', 'extraordinary', 'exceptional', 'remarkable', 'notable'
                    ],
                    curiosity: [
                        'curiosity', 'interest', 'inquisitiveness', 'attention', 'impressionability',
                        'investigation', 'inquiry', 'examination', 'scrutiny', 'analysis', 'research', 'study',
                        'exploration', 'expedition', 'journey', 'voyage', 'travel', 'pilgrimage', 'quest'
                    ],
                    
                    aesthetic: [
                        'beauty', 'grace', 'elegance', 'charm', 'attraction', 'allure', 'fascination',
                        'aesthetics', 'harmony', 'symmetry', 'proportion', 'perfection', 'ideal',
                        'sublime', 'beautiful', 'magnificent', 'grandiose', 'monumental', 'majestic',
                        'luxury', 'opulence', 'splendor', 'brilliance', 'radiance', 'brightness', 'light'
                    ],
                    nostalgia: [
                        'nostalgia', 'longing', 'yearning', 'memory', 'reminiscence', 'past',
                        'retrospection', 'recollection', 'remembrance', 'echo', 'trace', 'imprint', 'footprint',
                        'palimpsest', 'layer', 'stratum', 'stratigraphy', 'history', 'chronicle', 'annals'
                    ],
                    triumph: [
                        'triumph', 'victory', 'success', 'achievement', 'conquest', 'supremacy', 'dominance',
                        'celebration', 'jubilation', 'commemoration', 'honoring', 'recognition', 'glory',
                        'fame', 'renown', 'celebrity', 'popularity', 'recognition', 'acclaim', 'praise'
                    ],
                    liberation: [
                        'liberation', 'freedom', 'liberty', 'independence', 'autonomy', 'sovereignty',
                        'emancipation', 'release', 'deliverance', 'salvation', 'redemption', 'absolution',
                        'forgiveness', 'cleansing', 'catharsis', 'purification', 'enlightenment', 'illumination'
                    ],
                    connection: [
                        'connection', 'unity', 'union', 'community', 'togetherness', 'communication',
                        'interaction', 'cooperation', 'collaboration', 'partnership', 'alliance', 'coalition',
                        'federation', 'confederation', 'association', 'organization', 'institution', 'establishment'
                    ],
                    
                    sadness: [
                        'sadness', 'sorrow', 'melancholy', 'gloom', 'depression', 'despondency', 'dejection',
                        'grief', 'mourning', 'lamentation', 'weeping', 'crying', 'sobbing', 'wailing',
                        'lament', 'complaint', 'grievance', 'protest', 'objection', 'opposition', 'resistance'
                    ],
                    grief: [
                        'grief', 'mourning', 'bereavement', 'loss', 'suffering', 'distress', 'agony',
                        'catastrophe', 'tragedy', 'disaster', 'calamity', 'misfortune', 'adversity', 'hardship',
                        'apocalypse', 'doomsday', 'armageddon', 'decay', 'decomposition', 'disintegration'
                    ],
                    anger: [
                        'anger', 'rage', 'fury', 'wrath', 'irritation', 'indignation', 'resentment',
                        'outrage', 'frenzy', 'fury', 'wrathfulness', 'hostility', 'animosity', 'antagonism',
                        'hatred', 'loathing', 'detestation', 'abhorrence', 'aversion', 'repugnance'
                    ],
                    fear: [
                        'fear', 'terror', 'dread', 'anxiety', 'apprehension', 'panic', 'phobia',
                        'fright', 'alarm', 'horror', 'terror', 'dismay', 'consternation', 'trepidation',
                        'unease', 'nervousness', 'jitteriness', 'apprehensiveness', 'foreboding', 'premonition'
                    ],
                    disgust: [
                        'disgust', 'revulsion', 'repulsion', 'antipathy', 'aversion', 'hatred',
                        'contempt', 'scorn', 'disdain', 'derision', 'mockery', 'ridicule', 'sarcasm',
                        'cynicism', 'skepticism', 'doubt', 'distrust', 'suspicion', 'mistrust'
                    ],
                    shame: [
                        'shame', 'disgrace', 'humiliation', 'embarrassment', 'mortification', 'abasement',
                        'self-abasement', 'self-flagellation', 'self-reproach', 'self-criticism', 'self-analysis',
                        'introspection', 'reflection', 'self-reflection', 'self-examination', 'self-scrutiny'
                    ],
                    guilt: [
                        'guilt', 'sin', 'fault', 'blame', 'culpability', 'responsibility', 'accountability',
                        'treason', 'betrayal', 'treachery', 'perfidy', 'duplicity', 'deceit', 'deception',
                        'fraud', 'corruption', 'depravity', 'degeneracy', 'decadence', 'degradation'
                    ],
                    loneliness: [
                        'loneliness', 'isolation', 'alienation', 'abandonment', 'solitude', 'forsakenness',
                        'seclusion', 'reclusion', 'withdrawal', 'retreat', 'hermitage', 'monasticism', 'asceticism',
                        'austerity', 'simplicity', 'minimalism', 'poverty', 'destitution', 'privation'
                    ],
                    envy: [
                        'envy', 'jealousy', 'rivalry', 'competition', 'covetousness', 'resentment',
                        'rivalry', 'competitiveness', 'contest', 'struggle', 'conflict', 'clash', 'collision',
                        'confrontation', 'opposition', 'resistance', 'defiance', 'rebellion', 'insurrection'
                    ],
                    despair: [
                        'despair', 'hopelessness', 'desperation', 'defeat', 'failure', 'collapse', 'ruin',
                        'bankruptcy', 'insolvency', 'poverty', 'destitution', 'misery', 'wretchedness', 'dejection',
                        'degradation', 'deterioration', 'decline', 'decay', 'degeneration', 'deterioration'
                    ],
                    
                    contempt: [
                        'contempt', 'disdain', 'scorn', 'arrogance', 'haughtiness', 'superiority',
                        'snobbery', 'elitism', 'aristocracy', 'patricianism', 'nobility', 'gentry',
                        'upper class', 'ruling class', 'establishment', 'authority', 'power', 'dominance'
                    ],
                    bitterness: [
                        'bitterness', 'resentment', 'dissatisfaction', 'frustration', 'disappointment',
                        'annoyance', 'irritation', 'exasperation', 'vexation', 'displeasure', 'discontent',
                        'frustration', 'obstruction', 'hindrance', 'impediment', 'obstacle', 'barrier'
                    ],
                    anxiety: [
                        'anxiety', 'worry', 'concern', 'nervousness', 'unease', 'restlessness',
                        'apprehension', 'foreboding', 'misgiving', 'doubt', 'uncertainty', 'insecurity',
                        'instability', 'volatility', 'fluctuation', 'variation', 'change', 'transformation'
                    ],
                    emptiness: [
                        'emptiness', 'void', 'nothingness', 'absence', 'deprivation', 'lack',
                        'nirvana', 'enlightenment', 'liberation', 'release', 'detachment', 'renunciation',
                        'asceticism', 'minimalism', 'simplicity', 'modesty', 'humility', 'unobtrusiveness'
                    ],
                    confusion: [
                        'confusion', 'bewilderment', 'perplexity', 'disorientation', 'befuddlement',
                        'disorientation', 'lostness', 'wandering', 'roaming', 'roving', 'traveling',
                        'journeying', 'pilgrimage', 'quest', 'search', 'exploration', 'investigation'
                    ],
                    
                    ambivalence: [
                        'ambivalence', 'ambiguity', 'equivocation', 'paradox', 'dilemma', 'conflict',
                        'contradiction', 'antinomy', 'antithesis', 'opposition', 'contrast', 'polarity',
                        'bipolarity', 'manic-depressive', 'cyclothymia', 'bipolar disorder', 'mood swings'
                    ],
                    irony: [
                        'irony', 'sarcasm', 'mockery', 'cynicism', 'sardonicism', 'satire',
                        'parody', 'caricature', 'grotesque', 'absurdity', 'nonsense', 'meaninglessness',
                        'absurdism', 'existentialism', 'nihilism', 'skepticism', 'agnosticism', 'atheism'
                    ],
                    nostalgiaMixed: [
                        'bittersweet nostalgia', 'melancholy joy', 'joyful sadness', 'sad happiness',
                        'melancholic happiness', 'bright sadness', 'dark joy', 'gloomy merriment',
                        'happy melancholy', 'joyful gloom', 'sad gladness', 'grateful sorrow'
                    ],
                    bittersweet: [
                        'bittersweet', 'mixed', 'complex', 'multifaceted', 'layered', 'nuanced',
                        'multilayered', 'multidimensional', 'multifarious', 'manifold', 'diverse', 'varied',
                        'heterogeneous', 'miscellaneous', 'assorted', 'sundry', 'diverse', 'varied'
                    ],
                    
                    intensity: [
                        'intensity', 'tension', 'passion', 'fervor', 'ardor', 'zeal',
                        'heat', 'warmth', 'fire', 'flame', 'burning', 'blazing', 'ignition', 'combustion',
                        'explosion', 'blast', 'detonation', 'eruption', 'outburst', 'flare-up'
                    ],
                    calmness: [
                        'calmness', 'serenity', 'peacefulness', 'composure', 'equanimity', 'placidity',
                        'coolness', 'detachment', 'dispassion', 'impartiality', 'neutrality', 'objectivity',
                        'fairness', 'justice', 'equity', 'equality', 'parity', 'balance', 'symmetry'
                    ],
                    vulnerability: [
                        'vulnerability', 'sensitivity', 'susceptibility', 'openness', 'exposure',
                        'transparency', 'candor', 'honesty', 'frankness', 'directness', 'straightforwardness',
                        'naivety', 'childlikeness', 'innocence', 'purity', 'chastity', 'virtue', 'morality'
                    ],
                    resilience: [
                        'resilience', 'fortitude', 'endurance', 'perseverance', 'tenacity', 'stamina',
                        'toughness', 'hardiness', 'durability', 'sturdiness', 'robustness', 'strength',
                        'power', 'might', 'force', 'energy', 'vigor', 'vitality', 'vibrancy'
                    ],
                    
                    rejoice: [
                        'rejoice', 'celebrate', 'exult', 'delight', 'cheer', 'glory',
                        'enjoy', 'savor', 'relish', 'bask', 'luxuriate', 'wallow', 'indulge', 'pamper',
                        'spoil', 'coddle', 'baby', 'mollicoddle', 'pamper', 'indulge', 'gratify'
                    ],
                    suffer: [
                        'suffer', 'endure', 'bear', 'tolerate', 'withstand', 'experience',
                        'undergo', 'sustain', 'weather', 'survive', 'persist', 'persevere', 'continue',
                        'persist', 'endure', 'last', 'remain', 'stay', 'continue', 'persevere'
                    ],
                    loveVerb: [
                        'love', 'adore', 'cherish', 'treasure', 'worship', 'idolize',
                        'deify', 'idealize', 'romanticize', 'poeticize', 'glorify', 'exalt', 'magnify',
                        'amplify', 'enhance', 'intensify', 'heighten', 'deepen', 'strengthen'
                    ],
                    hateVerb: [
                        'hate', 'despise', 'loathe', 'abhor', 'detest', 'condemn',
                        'reject', 'refuse', 'decline', 'deny', 'negate', 'contradict', 'oppose',
                        'resist', 'defy', 'challenge', 'contest', 'dispute', 'question'
                    ],
                    fearVerb: [
                        'fear', 'dread', 'apprehend', 'worry', 'anxious', 'concern',
                        'frighten', 'scare', 'alarm', 'terrify', 'horrify', 'panic', 'dismay',
                        'distress', 'trouble', 'bother', 'perturb', 'disturb', 'agitate'
                    ],
                    hopeVerb: [
                        'hope', 'trust', 'believe', 'expect', 'anticipate', 'await',
                        'dream', 'fantasize', 'imagine', 'envision', 'foresee', 'predict', 'forecast',
                        'prophesy', 'divine', 'augur', 'portend', 'presage', 'foreshadow'
                    ],
                    
                    joyfulAdj: [
                        'joyful', 'happy', 'cheerful', 'jubilant', 'merry', 'gleeful',
                        'blissful', 'ecstatic', 'rapturous', 'euphoric', 'elated', 'exhilarated',
                        'inspired', 'motivated', 'encouraged', 'stimulated', 'energized', 'vitalized'
                    ],
                    sadAdj: [
                        'sad', 'sorrowful', 'melancholy', 'gloomy', 'mournful', 'dismal',
                        'grieving', 'bereaved', 'heartbroken', 'desolate', 'forlorn', 'abandoned',
                        'deserted', 'forsaken', 'rejected', 'excluded', 'ostracized', 'banished'
                    ],
                    angryAdj: [
                        'angry', 'furious', 'irate', 'indignant', 'wrathful', 'enraged',
                        'infuriated', 'incensed', 'outraged', 'livid', 'fuming', 'seething',
                        'hostile', 'antagonistic', 'belligerent', 'aggressive', 'combative', 'confrontational'
                    ],
                    peacefulAdj: [
                        'peaceful', 'calm', 'serene', 'tranquil', 'placid', 'harmonious',
                        'quiet', 'silent', 'still', 'motionless', 'static', 'stationary',
                        'dormant', 'quiescent', 'inactive', 'passive', 'receptive', 'responsive'
                    ],
                    intenseAdj: [
                        'intense', 'passionate', 'fervent', 'ardent', 'vehement', 'forceful',
                        'powerful', 'strong', 'potent', 'mighty', 'forceful', 'vigorous',
                        'energetic', 'dynamic', 'active', 'lively', 'vibrant', 'vivacious'
                    ],
                    
                    joyfullyAdv: [
                        'joyfully', 'happily', 'cheerfully', 'jubilantly', 'merrily', 'gleefully',
                        'blissfully', 'ecstatically', 'rapturously', 'euphorically', 'elatedly', 'exhilaratedly',
                        'inspiredly', 'motivatedly', 'encouragingly', 'stimulatingly', 'energetically', 'vibrantly'
                    ],
                    sadlyAdv: [
                        'sadly', 'sorrowfully', 'melancholically', 'gloomily', 'mournfully', 'dismally',
                        'grievingly', 'bereavedly', 'heartbrokenly', 'desolately', 'forlornly', 'abandonedly',
                        'desertedly', 'forsakenly', 'rejectedly', 'excludedly', 'ostracizedly', 'banishedly'
                    ],
                    angrilyAdv: [
                        'angrily', 'furiously', 'irately', 'indignantly', 'wrathfully', 'enragedly',
                        'infuriatedly', 'incensely', 'outragedly', 'lividly', 'fumingly', 'seethingly',
                        'hostilely', 'antagonistically', 'belligerently', 'aggressively', 'combatively', 'confrontationally'
                    ],
                    peacefullyAdv: [
                        'peacefully', 'calmly', 'serenely', 'tranquilly', 'placidity', 'harmoniously',
                        'quietly', 'silently', 'stillly', 'motionlessly', 'statically', 'stationarily',
                        'dormantly', 'quiescently', 'inactively', 'passively', 'receptively', 'responsively'
                    ]
                }
            };
            
            this.categoryWeights = {
                ecstasy: 1.7,
                joy: 1.5,
                love: 1.6,
                peace: 1.3,
                hope: 1.4,
                gratitude: 1.2,
                inspiration: 1.4,
                pride: 1.2,
                surprise: 1.1,
                curiosity: 1.0,
                
                sadness: 1.5,
                grief: 1.7,
                anger: 1.6,
                fear: 1.5,
                disgust: 1.4,
                shame: 1.3,
                guilt: 1.4,
                loneliness: 1.5,
                envy: 1.3,
                despair: 1.7,
                
                aesthetic: 1.1,
                nostalgia: 1.0,
                triumph: 1.4,
                liberation: 1.3,
                connection: 1.1,
                
                contempt: 1.3,
                bitterness: 1.2,
                anxiety: 1.4,
                emptiness: 1.3,
                confusion: 1.1,
                
                ambivalence: 1.0,
                irony: 0.9,
                nostalgiaMixed: 1.1,
                bittersweet: 1.0,
                
                intensity: 0.8,
                calmness: 0.7,
                vulnerability: 0.9,
                resilience: 0.8
            };
        }
        
        initializeEnhancedAnalysisMethods() {
            this.contextRules = {
                ru: {
                    negations: ['не', 'ни', 'без', 'нет', 'никак', 'нисколько', 'отнюдь', 'отнюдь не', 'вовсе не', 'далеко не', 'ничуть не', 'нисколечко', 'ни капли'],
                    intensifiers: ['очень', 'крайне', 'чрезвычайно', 'невероятно', 'ужасно', 'жутко', 'сильно', 'чрезмерно', 'излишне', 'сверхмерно', 'гипер', 'супер', 'мега'],
                    diminutives: ['-еньк-', '-ечк-', '-очк-', '-ик', '-ок', '-ек', '-ушк-', '-юшк-', '-ышк-', '-ишк-', '-оньк-', '-онек'],
                    augmentatives: ['-ищ-', '-ин-', '-ище', '-га', '-уха', '-ан', '-ян', '-ист', '-ат'],
                    ironyIndicators: ['конечно', 'разумеется', 'естественно', 'безусловно', 'несомненно', 'бесспорно', 'очевидно', 'явно', 'понятно'],
                    contrastMarkers: ['но', 'однако', 'хотя', 'впрочем', 'тем не менее', 'несмотря на', 'вопреки', 'наперекор'],
                    rhetoricalQuestions: ['разве', 'неужели', 'ли', 'как же', 'что же', 'кто же', 'где же', 'когда же', 'почему же'],
                    hyperbole: ['вечность', 'бесконечность', 'абсолютно', 'совершенно', 'тотально', 'полностью', 'всецело'],
                    understatement: ['немного', 'слегка', 'чуть-чуть', 'капельку', 'немножко', 'малость', 'чуточку']
                },
                en: {
                    negations: ['not', 'no', 'none', 'never', 'neither', 'nor', 'without', 'cannot', 'don\'t', 'doesn\'t', 'didn\'t', 'won\'t', 'wouldn\'t', 'couldn\'t', 'shouldn\'t'],
                    intensifiers: ['very', 'extremely', 'incredibly', 'absolutely', 'utterly', 'terribly', 'awfully', 'excessively', 'overly', 'super', 'mega', 'hyper', 'ultra'],
                    diminutives: ['-y', '-ie', '-let', '-ling', '-ette', '-kin', '-sy', '-poo', '-kins', '-pie', '-bear'],
                    augmentatives: ['mega-', 'super-', 'hyper-', 'ultra-', 'over-', 'arch-', 'out-', 'grand-', 'great-'],
                    ironyIndicators: ['of course', 'certainly', 'undoubtedly', 'naturally', 'surely', 'obviously', 'clearly', 'evidently', 'manifestly'],
                    contrastMarkers: ['but', 'however', 'although', 'though', 'nevertheless', 'nonetheless', 'yet', 'still', 'despite', 'in spite of'],
                    rhetoricalQuestions: ['do you', 'isn\'t it', 'aren\'t we', 'why not', 'how could', 'what if', 'who would', 'where would', 'when would'],
                    hyperbole: ['eternity', 'infinity', 'absolutely', 'completely', 'totally', 'utterly', 'entirely', 'wholly'],
                    understatement: ['a bit', 'slightly', 'a little', 'somewhat', 'rather', 'fairly', 'quite', 'pretty']
                }
            };
            
            this.sentencePatterns = {
                exclamatory: /!+$|^(Ура|Ого|Вау|Браво|Ах|Ох|Эх|Wow|Yay|Hooray|Bravo|Ouch|Whoa)!?$/i,
                interrogative: /\?+$|^(Кто|Что|Где|Когда|Почему|Зачем|Как|Какой|Чей|Куда|Откуда|Who|What|Where|When|Why|How|Which)\b.*[^.!]$/i,
                hesitant: /(\.{3,}|…)\s*$|\b(может быть|наверное|вроде|кажется|похоже|возможно|probably|maybe|perhaps|I guess|kind of|sort of)\b/i,
                emphatic: /[!?]{2,}$|\b[А-ЯA-Z]{4,}\b|\b(очень|крайне|...)\b|\b\w(\w)\1{2,}\w\b/iu,                incomplete: /[,:;-–—]\s$|^[А-ЯA-Z][^.!?…][а-яa-z]$|\b(но|и|а|или|потому что|because|and|but|or|so)\s*$/i,
                imperative: /^[А-ЯA-Z][а-яa-z]+(й|йте|и|ите|ь|ьте)[\s,!]|^(Let's|Don't|Please)\b/i,
                hyperbolic: /\b(вечность|бесконечность|навсегда|навеки|всегда|никогда|абсолютно|совершенно|полностью|целиком|весь|все|никто|ничто|тысяч[аи]|миллион[ыа]?|миллиард[ыа]?|триллион|невероятно|безумно|ужасно|страшно|жутко|incredibly|absolutely|completely|totally|forever|never|always|everyone|nobody|nothing|thousand|million|billion|trillion|extremely|insanely|terribly|ridiculously|ages)\b/i,
                poetic: /\b(словно|будто|как|точно|подобно|似|like|as if|as though)\s+\w+|\b(\w+)\s+(и|да|but|and)\s+\1\b|([а-я]+)а[,:]?\s+\3а\b/iu,
                dramatic: /^[А-ЯA-Z].*[!?]{2,}$|\b(катастрофа|трагедия|ужас|кошмар|беда|шок|паника|крах|disaster|tragedy|horror|nightmare|shock|panic|crisis)\b|О\s+(Боже|Господи|God|my|no)!?/i
            };
            
            this.metricsConfig = {
                wordThreshold: 1,
                sentenceThreshold: 1,
                paragraphThreshold: 0,
                punctuationWeight: {
                    '!': 1.5,
                    '?': 0.8,
                    '...': 0.6,
                    '…': 0.6,
                    '—': 0.3,
                    ',': 0.0,
                    '!!': 2.0,
                    '?!': 1.6,
                    '!?': 1.6,
                    '!!!': 2.5,
                    '??': 1.2,
                    '???': 1.5,
                    '!?!': 1.8,
                    ';': 0.1
                },
                advancedMetrics: {
                      emotionalDepth: true,
                      
                      contextualLayers: {
                          enabled: true,
                          count: 3,
                          mode: 'extend',
                          layers: [
                              'word', 
                              'sentence', 
                              'discourse'
                          ],
                          weights: {
                              word: 0.4,
                              sentence: 0.4,
                              discourse: 0.2
                          },
                          advanced: {
                              word: {
                                  considerSynonyms: true,
                                  considerStemming: true,
                                  intensityMultipliers: {
                                      повтор: 1.2,
                                      ALLCAPS: 1.5,
                                      '!!!': 2.0
                                  }
                              },
                              sentence: {
                                  considerPunctuation: true,
                                  considerStructure: true,
                                  questionWeight: 0.8,
                                  exclamationWeight: 1.5
                              },
                              discourse: {
                                  windowSize: 3,
                                  trackTransitions: true,
                                  coherenceThreshold: 0.7
                              }
                          }
                      },
                      
                      semanticComplexity: {
                          enabled: true,
                          mode: 'extend',
                          metrics: {
                              lexicalDiversity: { enabled: true, weight: 0.25 },
                              averageWordLength: { enabled: true, weight: 0.15 },
                              sentenceComplexity: { enabled: true, weight: 0.30 },
                              syntacticVariety: { enabled: true, weight: 0.20 },
                              metaphorDensity: { enabled: false, weight: 0.10 }
                          },
                          thresholds: {
                              simple: 0.3,
                              medium: 0.6,
                              complex: 0.8
                          },
                          languageSpecific: {
                              ru: {
                                  considerVerbalAspect: true,
                                  considerCaseSystem: true
                              },
                              en: {
                                  considerPhrasalVerbs: true,
                                  considerArticles: true
                              }
                          }
                      },
                      
                      culturalReferences: {
                          enabled: true,
                          mode: 'extend',
                          categories: {
                              internetSlang: {
                                  mode: 'override',
                                  markers: {
                                      ru: ['кек', 'лол', 'кринж', 'вайб', 'хайп', 'рофл', 'агриться', 'шипперить', 'скоммуниздить', 'краш', 'флекс', 'скибиди', 'рил', 'пруф', 'имба'],
                                      en: ['lol', 'rofl', 'cringe', 'simp', 'flex', 'noob', 'facepalm', 'based', 'salty', 'ghosting', 'shipping', 'stan']
                                  },
                                  weight: 0.7,
                                  caseSensitive: false
                              },
                              literaryQuotes: {
                                  mode: 'extend',
                                  markers: {
                                      ru: [
                                          'быть или не быть',
                                          'счастливые часов не наблюдают',
                                          'а счастье было так возможно',
                                          'весь мир — театр',
                                          'рожденный ползать летать не может',
                                          'глаза страшатся — руки делают'
                                      ],
                                      en: [
                                          'to be or not to be',
                                          'all the world\'s a stage',
                                          'the rest is silence',
                                          'it was the best of times, it was the worst of times',
                                          'call me Ishmael',
                                          'happy families are all alike'
                                      ]
                                  },
                                  weight: 1.3,
                                  detectPartial: true
                              },
                              philosophy: {
                                  mode: 'extend',
                                  markers: {
                                      ru: ['экзистенция', 'бытие', 'стоицизм', 'смысл', 'диалектика', 'абсурд', 'нигилизм', 'категорический императив', 'вечное возвращение', 'дазайн', 'феноменология', 'солипсизм'],
                                      en: ['existence', 'being', 'meaning', 'dialectics', 'absurd', 'nihilism', 'categorical imperative', 'eternal recurrence', 'dasein', 'phenomenology', 'solipsism']
                                  },
                                  weight: 1.5
                              },
                              historicalEvents: {
                                  enabled: true,
                                  markers: {
                                      ru: ['куликовская битва', 'крещение руси', 'ленинградский метроном', 'железный занавес', 'перестройка', 'августовский путч', 'бородино', 'дефолт'],
                                      en: ['battle of kulikovo', 'baptism of rus', 'leningrad metronome', 'iron curtain', 'perestroika', 'august coup', 'default']
                                  },
                                  weight: 1.4,
                                  contextRequired: true
                              },
                              cinemaQuotes: {
                                  enabled: true,
                                  markers: {
                                      ru: [
                                          'мы легких путей не ищем',
                                          'я требую продолжения банкета',
                                          'а вдоль дороги мертвые с косами',
                                          'морда лица',
                                          'все путем',
                                          'деньги есть — ума не надо'
                                      ],
                                      en: [
                                          'you shall not pass',
                                          'may the force be with you',
                                          'I\'ll be back',
                                          'show me the money',
                                          'you can\'t handle the truth',
                                          'I see dead people'
                                      ]
                                  },
                                  weight: 0.9
                              },
                              popCulture: {
                                  enabled: true,
                                  markers: {
                                      ru: ['баян', 'дноклассик', 'превед', 'ржака', 'троллинг', 'вирусный', 'эпично', 'омегапечаль'],
                                      en: ['meme', 'viral', 'trolling', 'epic', 'fail', 'win', 'cancelled', 'woke', 'based', 'sus']
                                  },
                                  weight: 0.6
                              }
                          },
                          detection: {
                              requireContext: false,
                              minOccurrences: 1,
                              boostForExactMatch: 1.5
                          }
                      },
                      
                      psychologicalProfiling: {
                          enabled: true,
                          mode: 'extend',
                          states: {
                              anxiety: {
                                  markers: {
                                      ru: ['боюсь', 'страшно', 'беспокоюсь', 'волнуюсь', 'паника', 'тревога', 'нервы', 'испуг'],
                                      en: ['afraid', 'scared', 'worried', 'anxious', 'panic', 'nervous', 'frightened']
                                  },
                                  threshold: 2,
                                  coOccurrence: ['stress', 'panic', 'anxiety']
                              },
                              joy: {
                                  markers: {
                                      ru: ['счастливо', 'радостно', 'восторг', 'кайф', 'ура', 'это победа', 'обожаю', 'блаженство'],
                                      en: ['happy', 'joy', 'delight', 'bliss', 'hooray', 'victory', 'love', 'ecstasy']
                                  },
                                  threshold: 1,
                                  intensityBoosters: ['очень', 'невероятно', 'безумно', 'very', 'incredibly', 'insanely']
                              },
                              sadness: {
                                  markers: {
                                      ru: ['грустно', 'печально', 'тоскливо', 'уныние', 'хандра', 'нет сил', 'все плохо'],
                                      en: ['sad', 'sorrow', 'melancholy', 'gloom', 'depression', 'no strength', 'everything is bad']
                                  },
                                  threshold: 1,
                                  coOccurrence: ['слезы', 'одиночество', 'потеря', 'tears', 'loneliness', 'loss']
                              },
                              anger: {
                                  markers: {
                                      ru: ['бесит', 'злост', 'ненавижу', 'достало', 'ярост', 'возмущен', 'в бешенстве', 'терпеть не могу'],
                                      en: ['angry', 'furious', 'hate', 'enough', 'rage', 'outraged', 'fuming', 'can\'t stand']
                                  },
                                  threshold: 1,
                                  intensityIndicators: ['ужасно', 'совершенно', 'окончательно', 'terribly', 'completely', 'finally']
                              },
                              curiosity: {
                                  enabled: true,
                                  markers: {
                                      ru: ['интересно', 'любопытно', 'хочу узнать', 'почему', 'как это работает', 'а что если'],
                                      en: ['interesting', 'curious', 'want to know', 'why', 'how it works', 'what if']
                                  },
                                  threshold: 1,
                                  weight: 0.9
                              },
                              surprise: {
                                  enabled: true,
                                  markers: {
                                      ru: ['неожиданно', 'ничего себе', 'вот это да', 'ого', 'не может быть', 'шок', 'сюрприз'],
                                      en: ['unexpected', 'wow', 'oh my', 'oh', 'can\'t be', 'shock', 'surprise']
                                  },
                                  threshold: 1,
                                  weight: 0.8
                              },
                              gratitude: {
                                  enabled: true,
                                  markers: {
                                      ru: ['спасибо', 'благодарен', 'ценю', 'признателен', 'ты лучший', 'выручил'],
                                      en: ['thanks', 'thankful', 'appreciate', 'grateful', 'you are the best', 'helped out']
                                  },
                                  threshold: 1,
                                  weight: 1.1
                              },
                              nostalgia: {
                                  enabled: true,
                                  markers: {
                                      ru: ['вспомнилось', 'как в старые добрые', 'ностальгия', 'раньше было лучше', 'помню'],
                                      en: ['remembered', 'like in the good old days', 'nostalgia', 'it was better before', 'I remember']
                                  },
                                  threshold: 1,
                                  weight: 1.0
                              },
                              pride: {
                                  enabled: true,
                                  markers: {
                                      ru: ['горжусь', 'достижение', 'успех', 'победа', 'я смог', 'лучший'],
                                      en: ['proud', 'achievement', 'success', 'victory', 'I did it', 'the best']
                                  },
                                  threshold: 1,
                                  weight: 1.2
                              },
                              shame: {
                                  enabled: true,
                                  markers: {
                                      ru: ['стыдно', 'позор', 'срам', 'унижение', 'неловко', 'смущение'],
                                      en: ['ashamed', 'shame', 'disgrace', 'humiliation', 'awkward', 'embarrassment']
                                  },
                                  threshold: 1,
                                  weight: 1.3
                              },
                              envy: {
                                  enabled: true,
                                  markers: {
                                      ru: ['зависть', 'ревность', 'хочу как', 'несправедливо', 'почему у него есть'],
                                      en: ['envy', 'jealous', 'want what he has', 'unfair', 'why does he have']
                                  },
                                  threshold: 1,
                                  weight: 1.1
                              },
                              contempt: {
                                  enabled: true,
                                  markers: {
                                      ru: ['презрение', 'пренебрежение', 'ничтожество', 'жалкий', 'презираю'],
                                      en: ['contempt', 'disdain', 'scorn', 'pathetic', 'despise']
                                  },
                                  threshold: 1,
                                  weight: 1.4
                              }
                          },
                          cognitiveBiases: {
                              dichotomous: {
                                  markers: {
                                      ru: ['всегда', 'никогда', 'все', 'никто', 'абсолютно', 'категорически', 'либо-либо'],
                                      en: ['always', 'never', 'everyone', 'nobody', 'absolutely', 'categorically', 'either-or']
                                  },
                                  weight: 1.2
                              },
                              catastrophizing: {
                                  markers: {
                                      ru: ['ужасно', 'кошмар', 'конец', 'катастрофа', 'все пропало', 'безысходность', 'крах'],
                                      en: ['awful', 'nightmare', 'the end', 'disaster', 'all is lost', 'hopelessness', 'collapse']
                                  },
                                  weight: 1.5
                              },
                              emotionalReasoning: {
                                  enabled: true,
                                  markers: {
                                      ru: ['чувствую, что это так', 'ощущаю, что он неправ', 'мне кажется, это плохо'],
                                      en: ['I feel that it is so', 'I feel that he is wrong', 'it seems bad to me']
                                  },
                                  weight: 1.1
                              },
                              overgeneralization: {
                                  enabled: true,
                                  markers: {
                                      ru: ['как всегда', 'опять все по старому', 'у меня никогда не получается', 'все люди...'],
                                      en: ['as always', 'again everything is the same', 'I never succeed', 'all people...']
                                  },
                                  weight: 1.0
                              },
                              mindReading: {
                                  enabled: true,
                                  markers: {
                                      ru: ['он думает, что я', 'она наверняка считает', 'они меня ненавидят'],
                                      en: ['he thinks that I', 'she surely thinks', 'they hate me']
                                  },
                                  weight: 1.3
                              },
                              personalization: {
                                  enabled: true,
                                  markers: {
                                      ru: ['это из-за меня', 'я виноват', 'наверное, я им не нравлюсь', 'они так поступили, потому что я...'],
                                      en: ['it\'s because of me', 'I\'m to blame', 'probably they don\'t like me', 'they did that because I...']
                                  },
                                  weight: 1.2
                              },
                              fortuneTelling: {
                                  enabled: true,
                                  markers: {
                                      ru: ['наверняка не получится', 'точно провалюсь', 'они откажут', 'будет ужасно'],
                                      en: ['it probably won\'t work', 'I\'ll definitely fail', 'they will refuse', 'it will be terrible']
                                  },
                                  weight: 1.1
                              },
                              minimization: {
                                  enabled: true,
                                  markers: {
                                      ru: ['ничего особенного', 'просто повезло', 'это ерунда', 'не стоит внимания'],
                                      en: ['nothing special', 'just lucky', 'it\'s nonsense', 'not worth attention']
                                  },
                                  weight: 0.9
                              }
                          },
                          communicationStyles: {
                              enabled: true,
                              assertive: {
                                  markers: {
                                      ru: ['я считаю', 'предлагаю', 'давайте вместе', 'мне важно'],
                                      en: ['I think', 'I suggest', 'let\'s together', 'it is important to me']
                                  },
                                  markersAvoid: {
                                      ru: ['наверное', 'извините, но', 'как-нибудь'],
                                      en: ['maybe', 'sorry, but', 'somehow']
                                  }
                              },
                              passive: {
                                  markers: {
                                      ru: ['не знаю', 'как скажете', 'мне все равно', 'лишь бы вас не беспокоить'],
                                      en: ['I don\'t know', 'as you say', 'I don\'t care', 'just not to bother you']
                                  }
                              },
                              aggressive: {
                                  markers: {
                                      ru: ['ты должен', 'категорически не согласен', 'это глупость', 'сейчас же'],
                                      en: ['you must', 'categorically disagree', 'this is nonsense', 'right now']
                                  }
                              },
                              manipulative: {
                                  enabled: true,
                                  markers: {
                                      ru: ['если бы ты меня любил', 'все так делают', 'ты же не хочешь, чтобы...', 'после всего, что я для тебя...'],
                                      en: ['if you loved me', 'everyone does it', 'you don\'t want to...', 'after all I\'ve done for you...']
                                  }
                              }
                          },
                          valuesAndMotivation: {
                              enabled: true,
                              achievement: {
                                  markers: {
                                      ru: ['успех', 'цель', 'результат', 'победа', 'достижение'],
                                      en: ['success', 'goal', 'result', 'victory', 'achievement']
                                  }
                              },
                              relationships: {
                                  markers: {
                                      ru: ['семья', 'друзья', 'любовь', 'близкие', 'поддержка'],
                                      en: ['family', 'friends', 'love', 'close ones', 'support']
                                  }
                              },
                              growth: {
                                  markers: {
                                      ru: ['развитие', 'учеба', 'новое', 'опыт', 'самосовершенствование'],
                                      en: ['development', 'learning', 'new', 'experience', 'self-improvement']
                                  }
                              },
                              security: {
                                  markers: {
                                      ru: ['безопасность', 'стабильность', 'надежность', 'защита', 'покой'],
                                      en: ['security', 'stability', 'reliability', 'protection', 'peace']
                                  }
                              }
                          }
                      }
                  }
            };
        }
        
        initializeCulturalContext() {
            this.culturalContext = {
                ru: {
                    literaryReferences: [
                        'Пушкин', 'Достоевский', 'Толстой', 'Чехов', 'Гоголь', 'Булгаков', 'Есенин',
                        'Лермонтов', 'Тургенев', 'Некрасов', 'Блок', 'Ахматова', 'Цветаева', 'Мандельштам',
                        'Пастернак', 'Солженицын', 'Бродский', 'Набоков', 'Шолохов', 'Замятин', 'Платонов',
                        'Ильф и Петров', 'Грибоедов', 'Фонвизин', 'Радищев', 'Карамзин', 'Жуковский',
                        'Батюшков', 'Баратынский', 'Тютчев', 'Фет', 'Майков', 'Полонский', 'Апухтин'
                    ],
                    historicalReferences: [
                        'царь', 'революция', 'советский', 'перестройка', 'ВОВ', 'империя', 'царство',
                        'князь', 'боярин', 'дворянин', 'крепостной', 'большевик', 'меньшевик', 'комиссар',
                        'колхоз', 'совхоз', 'пятилетка', 'стахановец', 'целина', 'БАМ', 'космос', 'спутник',
                        'перестройка', 'гласность', 'ускорение', 'новое мышление', 'рынок', 'приватизация',
                        'дефолт', 'стабилизация', 'модернизация', 'инновации', 'цифровизация'
                    ],
                    mythologicalReferences: [
                        'баба яга', 'леший', 'домовой', 'русалка', 'кикимора', 'водяной', 'кощей',
                        'богатырь', 'витязь', 'дракон', 'змей', 'василиск', 'алконост', 'сирин', 'гамаюн',
                        'феникс', 'единорог', 'грифон', 'пегас', 'кентавр', 'сатир', 'нимфа', 'дриада',
                        'наяда', 'океанида', 'нереида', 'горгона', 'гарпия', 'циклоп', 'минотавр'
                    ],
                    traditionalReferences: [
                        'матрёшка', 'самовар', 'балалайка', 'ушанка', 'валенки', 'борщ', 'пельмени',
                        'блины', 'икра', 'водка', 'квас', 'мед', 'сбитень', 'окрошка', 'щи', 'солянка',
                        'гуляш', 'плов', 'шашлык', 'шаурма', 'чебурек', 'бешбармак', 'манты', 'хинкали',
                        'оладьи', 'вареники', 'сырники', 'творог', 'сметана', 'простокваша', 'ряженка'
                    ],
                    
                    idioms: [
                        'тянуть канитель', 'бить баклуши', 'дело в шляпе', 'кот наплакал', 
                        'собаку съел', 'положить зубы на полку', 'водить за нос', 'вешать лапшу',
                        'делать из мухи слона', 'кровь с молоком', 'сесть в лужу', 'пройти огонь и воду',
                        'ни пуха ни пера', 'к шапочному разбору', 'семь пятниц на неделе', 'когда рак на горе свистнет',
                        'после дождичка в четверг', 'два сапога пара', 'белая ворона', 'стреляный воробей',
                        'косая сажень в плечах', 'семь верст до небес', 'собаку съесть', 'филькина грамота',
                        'хамелеон', 'игра не стоит свеч', 'мелкая сошка', 'тертый калач', 'стреляный воробей'
                    ],
                    
                    poeticPatterns: [
                        /\bкак\s+[^,]{3,},\s+так\s+и\s+\w+/iu,
                        /\bне\s+\w+,\s+а\s+\w+/iu,
                        /\bто\s+\w+,\s+то\s+\w+/iu,
                        /,\s+(словно|будто|точно|подобно|вроде|наподобие)\s+[^,.]{5,}[,.!?]/iu,
                        /\b(словно|будто|точно|подобно|вроде|наподобие)\s+[^,.]{5,}$/iu,
                        /\b(как\s+будто|словно\s+бы|точно\s+бы)\s+[^,.]{5,}/iu,
                        /\b(\w+)\s+(и|да|но|а)\s+\1\b/iu,
                        /^([А-ЯЁA-Z]\w{2,})\s+.*[.!?]\s+\1\s+/mu,
                        /\b(белый|чёрный|тёмный|светлый|холодный|горячий|красный|синий|зелёный|золотой|серебряный|алый|багровый|бледный|яркий|тусклый|мрачный|радостный|печальный|грустный|весёлый|тихий|громкий|быстрый|медленный|лёгкий|тяжёлый|нежный|грубый|мягкий|жёсткий|сладкий|горький|острый|пряный|свежий|старый|молодой|древний|вечный|белоснежный|кроваво-красный|изумрудный|лазурный|пурпурный|янтарный|жемчужный|хрустальный|стеклянный|ледяной|огненный|каменный|железный|шёлковый|бархатный|прозрачный|мутный|чистый|грязный)\s+\w+\s+(словно|будто|как|точно|подобно|наподобие)\s+\w+/iu,
                        /\b(white|black|dark|light|cold|hot|red|blue|green|golden|silver|crimson|scarlet|pale|bright|dim|gloomy|joyful|sad|happy|quiet|loud|fast|slow|light|heavy|gentle|rough|soft|hard|sweet|bitter|sharp|spicy|fresh|old|young|ancient|eternal|snow-white|blood-red|emerald|azure|purple|amber|pearly|crystal|glassy|icy|fiery|stone|iron|silky|velvet|transparent|murky|clean|dirty)\s+\w+\s+(like|as|似)\s+\w+/iu,
                        /^([А-ЯЁA-Z]\w+)\s+(его|её|их|мой|твой|наш|ваш)\b/iu
                    ],
                    
                    languageFeatures: {
                        doubleNegation: true,
                        aspectualPairs: true,
                        caseSystem: true,
                        verbalAspect: true,
                        wordOrderFlexibility: true,
                        diminutiveAffection: true,
                        augmentativeIntensity: true,
                        poeticInversion: true,
                        rhetoricalEmphasis: true
                    }
                },
                
                en: {
                    literaryReferences: [
                        'Shakespeare', 'Dickens', 'Austen', 'Hemingway', 'Twain', 'Orwell', 'Joyce',
                        'Faulkner', 'Fitzgerald', 'Steinbeck', 'Melville', 'Poe', 'Whitman', 'Dickinson',
                        'Frost', 'Eliot', 'Pound', 'Yeats', 'Woolf', 'Lawrence', 'Conrad', 'Hardy',
                        'Bronte', 'Shelley', 'Byron', 'Keats', 'Wordsworth', 'Coleridge', 'Blake',
                        'Milton', 'Donne', 'Chaucer', 'Spenser', 'Jonson', 'Marvell', 'Herbert'
                    ],
                    historicalReferences: [
                        'king', 'queen', 'revolution', 'colonial', 'independence', 'empire', 'kingdom',
                        'monarchy', 'republic', 'democracy', 'constitution', 'declaration', 'manifesto',
                        'renaissance', 'enlightenment', 'industrial', 'victorian', 'edwardian', 'georgian',
                        'medieval', 'feudal', 'crusade', 'reformation', 'counter-reformation', 'inquisition',
                        'exploration', 'discovery', 'colonization', 'imperialism', 'nationalism', 'globalization'
                    ],
                    mythologicalReferences: [
                        'dragon', 'unicorn', 'fairy', 'elf', 'wizard', 'witch', 'goblin',
                        'dwarf', 'giant', 'troll', 'ogre', 'hobbit', 'centaur', 'satyr', 'nymph',
                        'dryad', 'naiad', 'oread', 'hamadryad', 'gorgon', 'harpy', 'cyclops', 'minotaur',
                        'chimera', 'hydra', 'cerberus', 'sphinx', 'griffin', 'phoenix', 'pegasus', 'hippogriff'
                    ],
                    traditionalReferences: [
                        'tea', 'pub', 'queue', 'cricket', 'royalty', 'fish and chips', 'scones',
                        'roast', 'pudding', 'pie', 'pastry', 'biscuit', 'crumpet', 'muffin', 'bagel',
                        'breakfast', 'brunch', 'lunch', 'dinner', 'supper', 'afternoon tea', 'high tea',
                        'whisky', 'ale', 'stout', 'porter', 'cider', 'perry', 'mead', 'wine', 'champagne'
                    ],
                    
                    idioms: [
                        'break the ice', 'piece of cake', 'hit the hay', 'spill the beans', 
                        'cost an arm and a leg', 'barking up the wrong tree', 'once in a blue moon',
                        'beat around the bush', 'blessing in disguise', 'call it a day', 'cut corners',
                        'cut the mustard', 'devil\'s advocate', 'elephant in the room', 'every cloud has a silver lining',
                        'feel under the weather', 'give the benefit of the doubt', 'hear it on the grapevine',
                        'hit the nail on the head', 'jump on the bandwagon', 'kill two birds with one stone',
                        'let the cat out of the bag', 'miss the boat', 'no pain no gain', 'off the record',
                        'on the ball', 'pull someone\'s leg', 'see eye to eye', 'speak of the devil', 'the last straw'
                    ],
                    
                    poeticPatterns: [
                        /as\s+.*,\s+so\s+.*/i,
                        /not\s+.*,\s+but\s+.*/i,
                        /now\s+.*,\s+now\s+.*/i,
                        /.*,\s+as\s+if\s+.*/i,
                        /.*,\s+as\s+though\s+.*/i,
                        /.*,\s+like\s+.*/i,
                        /.*,\s+similar\s+to\s+.*/i,
                        /.*,\s+akin\s+to\s+.*/i,
                        /.*,\s+comparable\s+to\s+.*/i,
                        /.*,\s+reminiscent\s+of\s+.*/i,
                        /.*,\s+evocative\s+of\s+.*/i,
                        /.*,\s+suggestive\s+of\s+.*/i
                    ],
                    
                    languageFeatures: {
                        doubleNegation: false,
                        phrasalVerbs: true,
                        articles: true,
                        continuousTenses: true,
                        fixedWordOrder: true,
                        idiomaticExpressions: true,
                        prepositionComplexity: true,
                        modalVerbNuance: true,
                        subjunctiveMood: true
                    }
                }
            };
        }
        
        initializePsychologicalModels() {
            this.psychologicalModels = {
                plutchikWheel: {
                    primaryEmotions: ['joy', 'trust', 'fear', 'surprise', 'sadness', 'disgust', 'anger', 'anticipation'],
                    intensityLevels: ['serenity', 'joy', 'ecstasy', 'pensiveness', 'sadness', 'grief'],
                    combinations: {
                        'joy + trust': 'love',
                        'trust + fear': 'submission',
                        'fear + surprise': 'awe',
                        'surprise + sadness': 'disapproval',
                        'sadness + disgust': 'remorse',
                        'disgust + anger': 'contempt',
                        'anger + anticipation': 'aggressiveness',
                        'anticipation + joy': 'optimism'
                    }
                },
                maslowHierarchy: {
                    levels: ['physiological', 'safety', 'love/belonging', 'esteem', 'self-actualization'],
                    emotionalThemes: {
                        'physiological': ['basic needs', 'survival', 'comfort'],
                        'safety': ['security', 'stability', 'protection'],
                        'love/belonging': ['connection', 'affection', 'community'],
                        'esteem': ['recognition', 'respect', 'achievement'],
                        'self-actualization': ['growth', 'fulfillment', 'purpose']
                    }
                },
                bigFivePersonality: {
                    traits: ['openness', 'conscientiousness', 'extraversion', 'agreeableness', 'neuroticism'],
                    emotionalCorrelations: {
                        'openness': ['curiosity', 'creativity', 'aesthetic appreciation'],
                        'conscientiousness': ['discipline', 'responsibility', 'achievement'],
                        'extraversion': ['sociability', 'enthusiasm', 'assertiveness'],
                        'agreeableness': ['empathy', 'cooperation', 'trust'],
                        'neuroticism': ['anxiety', 'vulnerability', 'emotional instability']
                    }
                }
            };
            
            this.complexityMetrics = {
                emotionalDiversity: {
                    measure: 'Distribution balance of emotional categories (Shannon Entropy)',
                    weight: 0.25,
                    calculation: (categories) => {
                        const total = Object.values(categories)
                        .reduce((sum, cat) => sum + cat.frequency.length, 0);
                        if (total === 0) return 0;

                        const entropy = Object.values(categories).reduce((sum, cat) => {
                        const p = cat.frequency.length / total;
                        return p > 0 ? sum - p * Math.log2(p) : sum;
                        }, 0);
                        const maxEntropy = Math.log2(Object.keys(categories).length);
                        return maxEntropy > 0 ? entropy / maxEntropy : 0;
                    }
                },
                emotionalIntensity: {
                    measure: 'Average emotional intensity per sentence',
                    weight: 0.25,
                    calculation: (categories, allSentences) => {
                        const totalSentences = allSentences.length; 
                        if (totalSentences === 0) return 0;
                        const emotionalSentences = allSentences.filter(sentence => {
                        const emotionCount = Object.values(categories)
                            .filter(cat => cat.sentences.some(s => s.text === sentence))
                            .length;
                            return emotionCount >= 2;
                        });
                        return emotionalSentences.length / totalSentences;
                    }
                },
                emotionalNuance: {
                    measure: 'Presence of complex/mixed/ambivalent emotions',
                    weight: 0.25,
                    calculation: (categories) => {
                        const complexCategories = [
                            'ambivalence', 'bittersweet', 'nostalgiaMixed',
                            'anticipationHope', 'joyContentment', 'trustGratitude',
                            'surpriseCuriosity', 'aweWonder',
                            'fearAnxiety', 'angerFrustration', 'sadnessNostalgia',
                            'disgustContempt', 'guiltShame',
                            'irony', 'sarcasm'
                        ];
                        const foundComplex = complexCategories
                            .filter(cat => categories[cat] && categories[cat].frequency.length > 0);
                            return foundComplex.length / complexCategories.length;
                        }
                },
                emotionalDynamics: {
                    measure: 'How much emotions change throughout the text',
                    weight: 0.25,
                    calculation: (categories, allSentences) => {
                        if (allSentences.length < 2) return 0;
                        const third = Math.floor(allSentences.length / 3);
                        const parts = [
                            allSentences.slice(0, third),
                            allSentences.slice(third, third * 2),
                            allSentences.slice(third * 2)
                        ];
                        const dominantEmotions = parts.map(part => {
                        const emotionCounts = {};
                            part.forEach(sentence => {
                                Object.entries(categories).forEach(([emotion, data]) => {
                                    if (data.sentences.some(s => s.text === sentence)) {
                                        emotionCounts[emotion] = (emotionCounts[emotion] || 0) + 1;
                                    }
                            });
                        });
                        return Object.keys(emotionCounts).reduce((a, b) => 
                            emotionCounts[a] > emotionCounts[b] ? a : b, null
                        );
                        });
                        const changes = dominantEmotions.filter((emotion, i) => 
                            i > 0 && emotion !== dominantEmotions[i - 1]
                        ).length;
                        return changes / 2;
                    }
                }
            };
        }
        
        analyze(text) {
                if (!text || typeof text !== 'string' || text.trim().length === 0) {
                return this.getNeutralResult();
                }
                
                const startTime = performance.now();
                
                try {
                    const detectedLanguage = this.detectLanguageWithConfidence(text);
                    this.language = detectedLanguage.language;
                    
                    const preprocessing = this.enhancedPreprocessText(text);
                    
                    const lexicalAnalysis = this.enhancedLexicalAnalysis(preprocessing);
                    const syntacticAnalysis = this.enhancedSyntacticAnalysis(preprocessing);
                    const contextualAnalysis = this.enhancedContextualAnalysis(preprocessing);
                    const culturalAnalysis = this.enhancedCulturalAnalysis(preprocessing);
                    const semanticAnalysis = this.enhancedSemanticAnalysis(preprocessing);
                    const psychologicalAnalysis = this.psychologicalAnalysis(preprocessing);
                    const repetitionAnalysis = this.detectWordRepetitions(preprocessing); // ВЫЗОВ ЕСТЬ
                    
                    const integratedResult = this.deepIntegration({
                        lexical: lexicalAnalysis,
                        syntactic: syntacticAnalysis,
                        contextual: contextualAnalysis,
                        cultural: culturalAnalysis,
                        semantic: semanticAnalysis,
                        psychological: psychologicalAnalysis,
                        languageConfidence: detectedLanguage.confidence
                    });
                    
                    const emotionProfile = this.calculateAdvancedEmotionProfile(integratedResult);
                    
                    const psychologicalInsights = this.generatePsychologicalInsights(integratedResult);
                    
                    const processingTime = performance.now() - startTime;
                    
                    return {
                        success: true,
                        language: detectedLanguage.language,
                        languageConfidence: detectedLanguage.confidence,
                        profile: emotionProfile,
                        psychologicalInsights: psychologicalInsights,
                        metrics: {
                            processingTime: Math.round(processingTime),
                            textLength: text.length,
                            wordCount: preprocessing.words.length,
                            sentenceCount: preprocessing.sentences.length,
                            paragraphCount: preprocessing.paragraphs.length,
                            readingTime: preprocessing.words.length / 200,
                            complexityScore: integratedResult.complexityScore
                        },
                        details: {
                            lexical: lexicalAnalysis,
                            syntactic: syntacticAnalysis,
                            contextual: contextualAnalysis,
                            cultural: culturalAnalysis,
                            semantic: semanticAnalysis,
                            psychological: psychologicalAnalysis
                        },
                        writingQuality: { 
                            repetitions: repetitionAnalysis
                        },
                        timestamp: new Date().toISOString(),
                        analysisVersion: this.version
                    };
                    
                } catch (error) {
                    console.error('Advanced emotion analysis error:', error);
                    return {
                        success: false,
                        error: error.message,
                        profile: this.getNeutralResult().profile
                    };
                }
        }
        
        detectLanguageWithConfidence(text) {
            if (!text || typeof text !== 'string') {
                return { language: 'en', confidence: 0.5 };
            }
            
            if (this.language !== 'auto') {
                return { language: this.language, confidence: 1.0 };
            }
            
            const ruChars = (text.match(/[а-яё]/gi) || []).length;
            const enChars = (text.match(/[a-z]/gi) || []).length;
            const totalChars = ruChars + enChars;
            
            if (totalChars === 0) return { language: 'en', confidence: 0.5 };
            
            const ruConfidence = ruChars / totalChars;
            const enConfidence = enChars / totalChars;
            
            if (ruConfidence > 0.7) return { language: 'ru', confidence: ruConfidence };
            if (enConfidence > 0.7) return { language: 'en', confidence: enConfidence };
            
            const confidence = Math.max(ruConfidence, enConfidence);
            return { 
                language: ruConfidence >= enConfidence ? 'ru' : 'en', 
                confidence: confidence 
            };
        }
        
        enhancedPreprocessText(text) {
            const cleanedText = text
                  .replace(/\r\n/g, '\n')
                  .replace(/\r/g, '\n')
                  .replace(/\t/g, ' ')
                  .replace(/\s+/g, ' ')
                  .trim();
            
            const sentences = this.enhancedSentenceSplit(cleanedText);
            
            const paragraphSplit = text.split(/\n\s*\n/);
            const paragraphs = paragraphSplit.filter(p => {
                  const trimmed = p.trim();
                  return trimmed.length > 0 && trimmed !== '\n';
            });
            
            const words = this.enhancedTokenization(cleanedText);
            
            const punctuation = this.extractEmotionalPunctuation(cleanedText);
            const emoticons = this.extractEmoticons(text);
            const capitalization = this.analyzeCapitalization(text);
            
            const stats = {
                  avgWordLength: words.length > 0 ? 
                        words.reduce((sum, w) => sum + w.length, 0) / words.length : 0,
                  uniqueWords: [...new Set(words)].length,
                  longWords: words.filter(w => w.length > 7).length,
                  shortWords: words.filter(w => w.length < 4).length
            };
            
            return {
                  original: text,
                  cleaned: cleanedText,
                  sentences,
                  paragraphs,
                  words,
                  punctuation,
                  emoticons,
                  capitalization,
                  stats
            };
        }
        
        enhancedSentenceSplit(text) {
            const sentenceRegex = /[^.!?…]*[.!?…]+(?=\s+|$)/g;
            const matches = text.match(sentenceRegex) || [];
            
            return matches
                .map(s => s.trim())
                .filter(s => s.length > 0)
                .map((sentence, index) => ({
                    text: sentence,
                    index: index,
                    length: sentence.length,
                    wordCount: sentence.split(/\s+/).length,
                    emotionalMarkers: this.extractSentenceEmotionalMarkers(sentence)
                }));
        }
        
        extractSentenceEmotionalMarkers(sentence) {
            const markers = {
                exclamation: (sentence.match(/!/g) || []).length,
                question: (sentence.match(/\?/g) || []).length,
                ellipsis: (sentence.match(/…|\.{3,}/g) || []).length,
                capitalization: (sentence.match(/[A-ZА-ЯЁ]{2,}/g) || []).length,
                emotionalWords: this.countEmotionalWordsInSentence(sentence)
            };
            return markers;
        }
        
        countEmotionalWordsInSentence(sentence) {
            const words = sentence.toLowerCase()
                .replace(/[^\p{L}\s]/gu, ' ')
                .split(/\s+/)
                .filter(w => w.length >= this.metricsConfig.wordThreshold);
            
            let count = 0;
            const dict = this.dictionaries[this.language];
            
            for (const categoryWords of Object.values(dict)) {
                if (Array.isArray(categoryWords)) {
                    for (const word of categoryWords) {
                        if (words.includes(word)) {
                            count++;
                            break; 
                        }
                    }
                }
            }
            
            return count;
        }
        
        enhancedTokenization(text) {
            if (!text || typeof text !== 'string') {
                  return [];
            }
            
            const lowerText = text.toLowerCase();
            
            try {
                  if (this.language === 'ru') {
                        return lowerText
                              .replace(/[^а-яё\s\-']/gi, ' ')
                              .split(/\s+/)
                              .filter(w => w && w.length >= this.metricsConfig.wordThreshold)
                              .map(w => w.replace(/^-+|-$/g, ''))
                              .filter(w => w.length > 0);
                  } else {
                        return lowerText
                              .replace(/[^a-z\s\-']/gi, ' ')
                              .split(/\s+/)
                              .filter(w => w && w.length >= this.metricsConfig.wordThreshold)
                              .map(w => w.replace(/^-+|-$|^'|'$/g, ''))
                              .filter(w => w.length > 0);
                  }
            } catch (error) {
                  console.error('Tokenization error:', error);
                  return [];
            }
        }
        
        extractEmotionalPunctuation(text) {
            const punctuation = {};
            
            const normalizedText = text
                  .replace(/…/g, '...')
                  .replace(/\.\.\./g, '...');
            
            const patterns = [
                  { key: '!', regex: /!{1}(?!\!|\?)/g },
                  { key: '!!', regex: /!{2}(?!\!)/g },
                  { key: '!!!', regex: /!{3,}/g },
                  { key: '?', regex: /\?{1}(?!\?|\!)/g },
                  { key: '??', regex: /\?{2}(?!\?)/g },
                  { key: '???', regex: /\?{3,}/g },
                  { key: '!?', regex: /!\?/g },
                  { key: '?!', regex: /\?!/g },
                  { key: '...', regex: /\.{3,}/g }
            ];
            
            let workingText = normalizedText;
            
            for (const pattern of patterns) {
                  const matches = workingText.match(pattern.regex);
                  if (matches) {
                        punctuation[pattern.key] = matches.length;
                        workingText = workingText.replace(pattern.regex, ' ');
                  }
            }
            
            return punctuation;
        }
        
        extractEmoticons(text) {
            const emoticonPatterns = {
                positive: [':)', ':-)', ':]', '=)', ':D', ':-D', ':>', '=D', ';)', ';-)', ';]', '^_^', '^^'],
                negative: [':(', ':-(', ':[', '=(', ':/', ':-/', ':\\', ':-\\', ':|', ':-|', '>:(', '>:-('],
                neutral: [':|', ':-|', ':|]', ':-|]', ':O', ':-O', ':@', ':-@'],
                complex: [':\'()', ':\'-()', ':\')', ':\'-)', ';_;', 'T_T', 'ಥ_ಥ']
            };
            
            const emoticons = {};
            for (const [type, patterns] of Object.entries(emoticonPatterns)) {
                const count = patterns.reduce((total, emoticon) => {
                    const regex = new RegExp(this.escapeRegExp(emoticon), 'g');
                    const matches = text.match(regex);
                    return total + (matches ? matches.length : 0);
                }, 0);
                
                if (count > 0) {
                    emoticons[type] = count;
                }
            }
            
            return emoticons;
        }
        
        analyzeCapitalization(text) {
            const words = text.split(/\s+/);
            const capitalizedWords = words.filter(word => 
                word.length > 1 && /^[A-ZА-ЯЁ]/.test(word)
            );
            
            const allCapsWords = words.filter(word => 
                word.length > 1 && /^[A-ZА-ЯЁ]+$/.test(word)
            );
            
            return {
                totalWords: words.length,
                capitalized: capitalizedWords.length,
                allCaps: allCapsWords.length,
                ratio: words.length > 0 ? capitalizedWords.length / words.length : 0,
                intensity: words.length > 0 ? allCapsWords.length / words.length : 0
            };
        }
        
        enhancedLexicalAnalysis(data) {
            const words = data.words;
            const language = this.language;
            const dict = this.dictionaries[language];
            const results = {};
            
            for (const [category, wordList] of Object.entries(dict)) {
                let count = 0;
                let positions = [];
                let sentenceOccurrences = {};
                
                wordList.forEach(word => {
                    const regex = new RegExp(`\\b${this.escapeRegExp(word)}\\b`, 'gi');
                    const matches = data.cleaned.match(regex);
                    
                    if (matches) {
                        count += matches.length;
                        
                        let match;
                        const re = new RegExp(`\\b${this.escapeRegExp(word)}\\b`, 'gi');
                        while ((match = re.exec(data.cleaned)) !== null) {
                            positions.push({
                                word: word,
                                position: match.index,
                                length: word.length,
                                context: this.getWordContext(data.cleaned, match.index, word.length)
                            });
                            
                            const sentenceIndex = this.findSentenceIndex(data.sentences, match.index);
                            if (sentenceIndex !== -1) {
                                if (!sentenceOccurrences[sentenceIndex]) {
                                    sentenceOccurrences[sentenceIndex] = [];
                                }
                                sentenceOccurrences[sentenceIndex].push(word);
                            }
                        }
                    }
                });
                
                if (count > 0) {
                    const weight = this.categoryWeights[category] || 1.0;
                    const frequency = count / words.length;
                    const intensity = this.calculateCategoryIntensity(category, count, frequency);
                    
                    results[category] = {
                        count,
                        frequency,
                        weight,
                        intensity,
                        score: count * weight * intensity,
                        positions,
                        sentenceOccurrences,
                        words: wordList.filter(word => 
                            data.cleaned.toLowerCase().includes(word.toLowerCase())
                        ),
                        dominance: this.calculateCategoryDominance(category, count, words.length)
                    };
                }
            }
            
            const emotionalWordsCount = Object.values(results)
                .reduce((sum, cat) => sum + cat.count, 0);
            
            const lexicalMetrics = {
                density: emotionalWordsCount / words.length,
                diversity: Object.keys(results).length,
                concentration: this.calculateLexicalConcentration(results, words.length),
                distribution: this.calculateLexicalDistribution(results, data.sentences.length),
                richness: this.calculateLexicalRichness(results, words),
                emoticonCount: Object.values(data.emoticons || {}).reduce((a, b) => a + b, 0),
                punctuationCount: Object.values(data.punctuation || {}).reduce((a, b) => a + b, 0),
                emoticonDetails: data.emoticons || {},
                punctuationDetails: data.punctuation || {}
            };
            
            const emotionalClusters = this.detectEmotionalClusters(results, data);
            
            const temporalAnalysis = this.analyzeEmotionalProgression(results, data);
            
            return {
                categories: results,
                summary: {
                    totalEmotionalWords: emotionalWordsCount,
                    lexicalDensity: lexicalMetrics.density,
                    categoryCount: lexicalMetrics.diversity,
                    dominantCategory: this.findDominantCategory(results),
                    lexicalConcentration: lexicalMetrics.concentration,
                    lexicalRichness: lexicalMetrics.richness
                },
                metrics: lexicalMetrics,
                clusters: emotionalClusters,
                temporal: temporalAnalysis,
                intensityProfile: this.createIntensityProfile(results),
                emoticons: data.emoticons || {},
                emotionalPunctuation: data.punctuation || {},
            };
        }
        
        calculateCategoryIntensity(category, count, frequency) {
            const baseIntensity = Math.min(1, frequency * 10);
            
            const intenseCategories = ['ecstasy', 'rage', 'despair', 'triumph'];
            const moderateCategories = ['joy', 'sadness', 'anger', 'fear'];
            const mildCategories = ['peace', 'calmness', 'curiosity'];
            
            if (intenseCategories.includes(category)) {
                return baseIntensity * 1.5;
            } else if (moderateCategories.includes(category)) {
                return baseIntensity * 1.0;
            } else if (mildCategories.includes(category)) {
                return baseIntensity * 0.7;
            }
            
            return baseIntensity;
        }
        
        calculateCategoryDominance(category, count, totalWords) {
            const proportion = count / totalWords;
            
            if (proportion > 0.1) return 'high';
            if (proportion > 0.05) return 'medium';
            if (proportion > 0.02) return 'low';
            return 'minimal';
        }
        
        calculateLexicalConcentration(categories, totalWords) {
            if (totalWords === 0) return 0;
            const emotionalWords = Object.values(categories)
                .reduce((sum, cat) => sum + cat.count, 0);
            if (emotionalWords === 0) return 0;
            const proportions = Object.values(categories)
                .map(cat => cat.count / emotionalWords)
                .sort((a, b) => a - b);
            const n = proportions.length;
            if (n === 0) return 0;
            let gini = 0;
            for (let i = 0; i < n; i++) {
                for (let j = 0; j < n; j++) {
                    gini += Math.abs(proportions[i] - proportions[j]);
                }
            }
            return gini / (2 * n * n * (proportions.reduce((a, b) => a + b, 0) / n));
        }
        
        calculateLexicalDistribution(categories, sentenceCount) {
            if (sentenceCount === 0) return 0;
            
            const sentencesWithEmotion = new Set();
            
            for (const [category, data] of Object.entries(categories)) {
                if (data.sentenceOccurrences) {
                    Object.keys(data.sentenceOccurrences).forEach(sentenceIndex => {
                        sentencesWithEmotion.add(parseInt(sentenceIndex));
                    });
                }
            }
            
            return sentencesWithEmotion.size / sentenceCount;
        }
        
        calculateLexicalRichness(categories, allWords) {
            const uniqueEmotionalWords = new Set();
            
            for (const [category, data] of Object.entries(categories)) {
                if (data.words) {
                    data.words.forEach(word => uniqueEmotionalWords.add(word));
                }
            }
            
            const totalUniqueWords = new Set(allWords).size;
            
            if (totalUniqueWords === 0) return 0;
            return uniqueEmotionalWords.size / totalUniqueWords;
        }
        
        detectEmotionalClusters(categories, data) {
            const clusters = [];
            const emotionalPositions = [];
            
            for (const [category, categoryData] of Object.entries(categories)) {
                if (categoryData.positions) {
                    categoryData.positions.forEach(pos => {
                        emotionalPositions.push({
                            category: category,
                            position: pos.position,
                            length: pos.length,
                            context: pos.context
                        });
                    });
                }
            }
            
            emotionalPositions.sort((a, b) => a.position - b.position);
            
            let currentCluster = [];
            const clusterDistance = 50; // characters
            
            for (let i = 0; i < emotionalPositions.length; i++) {
                if (currentCluster.length === 0) {
                    currentCluster.push(emotionalPositions[i]);
                } else {
                    const lastPosition = currentCluster[currentCluster.length - 1];
                    const currentPosition = emotionalPositions[i];
                    
                    if (currentPosition.position - (lastPosition.position + lastPosition.length) < clusterDistance) {
                        currentCluster.push(currentPosition);
                    } else {
                        if (currentCluster.length > 1) {
                            clusters.push({
                                positions: [...currentCluster],
                                size: currentCluster.length,
                                categories: [...new Set(currentCluster.map(p => p.category))],
                                intensity: currentCluster.length * 2,
                                center: this.calculateClusterCenter(currentCluster)
                            });
                        }
                        currentCluster = [currentPosition];
                    }
                }
            }
            
            if (currentCluster.length > 1) {
                clusters.push({
                    positions: [...currentCluster],
                    size: currentCluster.length,
                    categories: [...new Set(currentCluster.map(p => p.category))],
                    intensity: currentCluster.length * 2,
                    center: this.calculateClusterCenter(currentCluster)
                });
            }
            
            return clusters;
        }
        
        calculateClusterCenter(positions) {
            const avgPosition = positions.reduce((sum, p) => sum + p.position, 0) / positions.length;
            const avgLength = positions.reduce((sum, p) => sum + p.length, 0) / positions.length;
            return {
                position: avgPosition,
                length: avgLength,
                density: positions.length / (positions[positions.length - 1].position - positions[0].position)
            };
        }
        
        analyzeEmotionalProgression(categories, data) {
            const progression = {
                phases: [],
                transitions: [],
                overallTrend: 'stable',
                emotionalArc: []
            };
            
            if (data.sentences.length < 2) return progression;
            
            const sentenceEmotions = data.sentences.map((sentence, index) => {
                const sentenceText = typeof sentence === 'object' ? sentence.text : sentence;
                const words = this.enhancedTokenization(sentenceText);
                
                let score = 0;
                let categoryCount = 0;
                
                for (const [category, categoryData] of Object.entries(categories)) {
                    if (categoryData.sentenceOccurrences && categoryData.sentenceOccurrences[index]) {
                        const occurrences = categoryData.sentenceOccurrences[index].length;
                        const weight = this.categoryWeights[category] || 1.0;
                        
                        const isPositive = ['ecstasy', 'joy', 'love', 'peace', 'hope', 
                                          'gratitude', 'inspiration', 'pride'].includes(category);
                        const isNegative = ['sadness', 'grief', 'anger', 'fear', 'disgust', 
                                          'shame', 'guilt', 'loneliness', 'envy', 'despair'].includes(category);
                        
                        if (isPositive) score += occurrences * weight;
                        if (isNegative) score -= occurrences * weight;
                        
                        categoryCount += occurrences;
                    }
                }
                
                return {
                    sentence: sentenceText,
                    index: index,
                    score: categoryCount > 0 ? score / categoryCount : 0,
                    wordCount: words.length,
                    emotionalDensity: categoryCount / words.length || 0
                };
            });
            
            let currentPhase = {
                start: 0,
                end: 0,
                trend: 'neutral',
                intensity: 0,
                dominantCategories: []
            };
            
            for (let i = 0; i < sentenceEmotions.length; i++) {
                const emotion = sentenceEmotions[i];
                
                if (i === 0) {
                    currentPhase.trend = emotion.score > 0.1 ? 'positive' : 
                                       emotion.score < -0.1 ? 'negative' : 'neutral';
                    currentPhase.intensity = Math.abs(emotion.score);
                } else {
                    const prevEmotion = sentenceEmotions[i - 1];
                    const trendChange = Math.abs(emotion.score - prevEmotion.score) > 0.2;
                    
                    if (trendChange) {
                        currentPhase.end = i - 1;
                        progression.phases.push({...currentPhase});
                        
                        currentPhase = {
                            start: i,
                            end: i,
                            trend: emotion.score > 0.1 ? 'positive' : 
                                  emotion.score < -0.1 ? 'negative' : 'neutral',
                            intensity: Math.abs(emotion.score),
                            dominantCategories: []
                        };
                    } else {
                        currentPhase.end = i;
                        currentPhase.intensity = (currentPhase.intensity + Math.abs(emotion.score)) / 2;
                    }
                }
                
                progression.emotionalArc.push(emotion.score);
            }
            
            if (currentPhase.start <= sentenceEmotions.length - 1) {
                currentPhase.end = sentenceEmotions.length - 1;
                progression.phases.push(currentPhase);
            }
            
            for (let i = 1; i < progression.phases.length; i++) {
                const prevPhase = progression.phases[i - 1];
                const currPhase = progression.phases[i];
                
                if (prevPhase.trend !== currPhase.trend) {
                    progression.transitions.push({
                        from: prevPhase.trend,
                        to: currPhase.trend,
                        position: prevPhase.end,
                        intensityChange: Math.abs(currPhase.intensity - prevPhase.intensity)
                    });
                }
            }
            
            const totalScore = sentenceEmotions.reduce((sum, e) => sum + e.score, 0);
            const avgScore = totalScore / sentenceEmotions.length;
            
            if (avgScore > 0.1) progression.overallTrend = 'positive';
            else if (avgScore < -0.1) progression.overallTrend = 'negative';
            else progression.overallTrend = 'balanced';
            
            return progression;
        }
        
        createIntensityProfile(categories) {
            const profile = {
                overall: 0,
                positive: 0,
                negative: 0,
                complex: 0,
                distribution: {}
            };
            
            const positiveCats = ['ecstasy', 'joy', 'love', 'peace', 'hope', 'gratitude', 'inspiration', 'pride'];
            const negativeCats = ['sadness', 'grief', 'anger', 'fear', 'disgust', 'shame', 'guilt', 'loneliness', 'envy', 'despair'];
            const complexCats = ['ambivalence', 'irony', 'nostalgiaMixed', 'bittersweet', 'nostalgia', 'aesthetic'];
            
            let totalIntensity = 0;
            let positiveIntensity = 0;
            let negativeIntensity = 0;
            let complexIntensity = 0;
            
            for (const [category, data] of Object.entries(categories)) {
                const intensity = data.intensity || 0;
                totalIntensity += intensity;
                
                if (positiveCats.includes(category)) {
                    positiveIntensity += intensity;
                } else if (negativeCats.includes(category)) {
                    negativeIntensity += intensity;
                } else if (complexCats.includes(category)) {
                    complexIntensity += intensity;
                }
                
                profile.distribution[category] = intensity;
            }
            
            profile.overall = totalIntensity;
            profile.positive = positiveIntensity;
            profile.negative = negativeIntensity;
            profile.complex = complexIntensity;
            
            if (totalIntensity > 0) {
                profile.positive = positiveIntensity / totalIntensity;
                profile.negative = negativeIntensity / totalIntensity;
                profile.complex = complexIntensity / totalIntensity;
            }
            
            return profile;
        }
        
        findDominantCategory(categoryData) {
            let maxScore = 0;
            let dominant = 'neutral';
            
            for (const [category, data] of Object.entries(categoryData)) {
                const score = data.score || data.count * data.weight;
                if (score > maxScore) {
                    maxScore = score;
                    dominant = category;
                }
            }
            
            return dominant;
        }
        
        getWordContext(text, position, length, contextSize = 30) {
            const start = Math.max(0, position - contextSize);
            const end = Math.min(text.length, position + length + contextSize);
            return text.substring(start, end);
        }
        
        findSentenceIndex(sentences, position) {
            let currentPosition = 0;
            for (let i = 0; i < sentences.length; i++) {
                const sentence = sentences[i];
                const sentenceText = typeof sentence === 'object' ? sentence.text : sentence;
                const sentenceLength = sentenceText.length;
                if (position >= currentPosition && position < currentPosition + sentenceLength) {
                    return i;
                }
                currentPosition += sentenceLength;
                if (i < sentences.length - 1) currentPosition += 1;
            }
            return sentences.length - 1;
        }
        
        enhancedSyntacticAnalysis(data) {
            const sentences = data.sentences;
            
            const sentenceStats = {
                count: sentences.length,
                lengths: sentences.map(s => {
                    const text = typeof s === 'object' ? s.text : s;
                    return text.split(/\s+/).length;
                }),
                characters: sentences.map(s => {
                    const text = typeof s === 'object' ? s.text : s;
                    return text.length;
                }),
                complexityScores: sentences.map(s => {
                    const text = typeof s === 'object' ? s.text : s;
                    return this.calculateSentenceComplexity(text);
                })
            };
            
            sentenceStats.avgLength = sentenceStats.lengths.length > 0 ? 
                sentenceStats.lengths.reduce((a, b) => a + b) / sentenceStats.lengths.length : 0;
            sentenceStats.lengthVariance = this.calculateVariance(sentenceStats.lengths);
            sentenceStats.complexity = sentenceStats.complexityScores.length > 0 ?
                sentenceStats.complexityScores.reduce((a, b) => a + b) / sentenceStats.complexityScores.length : 0;
            
            const punctuationAnalysis = {
                distribution: data.punctuation,
                emotionalWeight: this.calculatePunctuationEmotionalWeight(data.punctuation),
                density: this.calculatePunctuationDensity(data.cleaned),
                patterns: this.detectPunctuationPatterns(data.sentences)
            };
            
            const sentenceTypes = {
                exclamatory: sentences.filter(s => {
                    const text = typeof s === 'object' ? s.text : s;
                    return this.sentencePatterns.exclamatory.test(text);
                }).length,
                interrogative: sentences.filter(s => {
                    const text = typeof s === 'object' ? s.text : s;
                    return this.sentencePatterns.interrogative.test(text);
                }).length,
                hesitant: sentences.filter(s => {
                    const text = typeof s === 'object' ? s.text : s;
                    return this.sentencePatterns.hesitant.test(text);
                }).length,
                emphatic: sentences.filter(s => {
                    const text = typeof s === 'object' ? s.text : s;
                    return this.sentencePatterns.emphatic.test(text);
                }).length,
                incomplete: sentences.filter(s => {
                    const text = typeof s === 'object' ? s.text : s;
                    return this.sentencePatterns.incomplete.test(text);
                }).length,
                imperative: sentences.filter(s => {
                    const text = typeof s === 'object' ? s.text : s;
                    return this.sentencePatterns.imperative.test(text);
                }).length,
                hyperbolic: sentences.filter(s => {
                    const text = typeof s === 'object' ? s.text : s;
                    return this.sentencePatterns.hyperbolic.test(text);
                }).length,
                poetic: sentences.filter(s => {
                    const text = typeof s === 'object' ? s.text : s;
                    return this.sentencePatterns.poetic.test(text);
                }).length,
                dramatic: sentences.filter(s => {
                    const text = typeof s === 'object' ? s.text : s;
                    return this.sentencePatterns.dramatic.test(text);
                }).length
            };
            
            const rhythmAnalysis = this.enhancedRhythmAnalysis(sentences);
            
            const syntacticDiversity = this.calculateSyntacticDiversity(sentences);
            
            const readability = this.calculateReadabilityMetrics(data);
            
            return {
                sentenceStats,
                punctuation: punctuationAnalysis,
                sentenceTypes,
                rhythm: rhythmAnalysis,
                complexity: sentenceStats.complexity,
                diversity: syntacticDiversity,
                readability,
                coherence: this.calculateTextCoherence(sentences)
            };
        }
        
        calculateVariance(values) {
            if (values.length < 2) return 0;
            const mean = values.reduce((a, b) => a + b, 0) / values.length;
            const variance = values.reduce((sum, val) => 
                sum + Math.pow(val - mean, 2), 0) / (values.length - 1);
            return variance;
        }
        
        calculateSentenceComplexity(sentence) {
            const words = sentence.split(/\s+/).filter(w => w.length > 0).length;
            const clauses = (sentence.match(/,|;|:|—|\s+[а-яa-z]+\s+(который|которая|которое|которые|that|which|who|whom|whose)/gi) || []).length + 1;
            const subordinating = (sentence.match(/\b(потому что|так как|поскольку|although|though|because|since|if|when|while|where|unless|provided that)\b/gi) || []).length;
            const coordinating = (sentence.match(/\b(и|а|но|или|зато|однако|and|but|or|yet|so|for|nor)\b/gi) || []).length;
            const wordComplexity = words > 20 ? 1 : words > 15 ? 0.8 : words > 10 ? 0.6 : words > 5 ? 0.4 : 0.2;
            const structureComplexity = (clauses * 0.3 + subordinating * 0.4 + coordinating * 0.2 + wordComplexity * 0.1);
            const normalizedComplexity = Math.min(1, structureComplexity / 3);
            return normalizedComplexity;
        }
        
        calculatePunctuationEmotionalWeight(punctuation) {
            let weight = 0;
            const weights = this.metricsConfig.punctuationWeight;
            
            for (const [mark, count] of Object.entries(punctuation)) {
                  const markWeight = weights[mark] || 1.0;
                  weight += count * markWeight;
            }
            
            const totalPunctuationCount = Object.values(punctuation).reduce((a, b) => a + b, 0);
            
            if (totalPunctuationCount === 0) return 0;
            
            return weight / totalPunctuationCount;
        }
        
        calculatePunctuationDensity(text) {
            const punctuationCount = (text.match(/[.!?…,:;—\-]/g) || []).length;
            const wordCount = text.split(/\s+/).filter(w => w.length > 0).length;
            
            return wordCount > 0 ? punctuationCount / wordCount : 0;
        }
        
        detectPunctuationPatterns(sentences) {
            const patterns = {
                repetitiveExclamation: 0,
                questionExclamation: 0,
                ellipsisClusters: 0,
                mixedPunctuation: 0
            };
            
            sentences.forEach(s => {
                const text = typeof s === 'object' ? s.text : s;
                
                if (text.match(/!{2,}/)) patterns.repetitiveExclamation++;
                if (text.match(/\?!|!\?/)) patterns.questionExclamation++;
                if (text.match(/…{2,}|\.{4,}/)) patterns.ellipsisClusters++;
                if (text.match(/[!?…]{2,}/)) patterns.mixedPunctuation++;
            });
            
            return patterns;
        }
        
        enhancedRhythmAnalysis(sentences) {
            if (sentences.length < 3) {
                return { regularity: 1, pattern: 'undefined', variability: 0, flow: 'smooth' };
            }
            
            const lengths = sentences.map(s => {
                const text = typeof s === 'object' ? s.text : s;
                return text.split(/\s+/).length;
            });
            
            const differences = [];
            for (let i = 0; i < lengths.length - 1; i++) {
                differences.push(Math.abs(lengths[i] - lengths[i + 1]));
            }
            
            const avgDifference = differences.reduce((a, b) => a + b, 0) / differences.length;
            const maxLength = Math.max(...lengths);
            const minLength = Math.min(...lengths);
            const range = maxLength - minLength;
            
            const pattern = this.detectEnhancedRhythmPattern(lengths);
            
            const variability = avgDifference / (maxLength || 1);
            const flow = variability < 0.3 ? 'smooth' : 
                        variability < 0.6 ? 'moderate' : 'choppy';
            
            return {
                regularity: 1 - variability,
                pattern,
                variability,
                flow,
                range,
                avgLength: lengths.reduce((a, b) => a + b, 0) / lengths.length,
                lengthDistribution: this.calculateLengthDistribution(lengths)
            };
        }
        
        detectEnhancedRhythmPattern(lengths) {
            if (lengths.length < 4) return 'undefined';
            
            let isAscending = true;
            for (let i = 1; i < lengths.length; i++) {
                if (lengths[i] < lengths[i - 1]) {
                    isAscending = false;
                    break;
                }
            }
            
            let isDescending = true;
            for (let i = 1; i < lengths.length; i++) {
                if (lengths[i] > lengths[i - 1]) {
                    isDescending = false;
                    break;
                }
            }
            
            const waveScore = this.calculateWavePatternScore(lengths);
            const isWavy = waveScore > 0.7;
            
            const symmetricScore = this.calculateSymmetryScore(lengths);
            const isSymmetric = symmetricScore > 0.8;
            
            if (isAscending) return 'ascending';
            if (isDescending) return 'descending';
            if (isSymmetric) return 'symmetric';
            if (isWavy) return 'wavy';
            
            if (this.isCrescendoPattern(lengths)) return 'crescendo';
            
            if (this.isDecrescendoPattern(lengths)) return 'decrescendo';
            
            return 'irregular';
        }
        
        calculateWavePatternScore(lengths) {
            let directionChanges = 0;
            
            for (let i = 1; i < lengths.length - 1; i++) {
                const prevDiff = lengths[i] - lengths[i - 1];
                const nextDiff = lengths[i + 1] - lengths[i];
                
                if (prevDiff * nextDiff < 0) {
                    directionChanges++;
                }
            }
            
            return directionChanges / (lengths.length - 2);
        }
        
        calculateSymmetryScore(lengths) {
            if (lengths.length % 2 !== 0) return 0;
            
            const mid = lengths.length / 2;
            let symmetry = 0;
            
            for (let i = 0; i < mid; i++) {
                const diff = Math.abs(lengths[i] - lengths[lengths.length - 1 - i]);
                const maxLength = Math.max(lengths[i], lengths[lengths.length - 1 - i]);
                symmetry += 1 - (diff / (maxLength || 1));
            }
            
            return symmetry / mid;
        }
        
        isCrescendoPattern(lengths) {
            if (lengths.length < 5) return false;
            
            const firstHalf = lengths.slice(0, Math.floor(lengths.length / 2));
            const secondHalf = lengths.slice(Math.floor(lengths.length / 2));
            
            let increasing = true;
            for (let i = 1; i < firstHalf.length; i++) {
                if (firstHalf[i] < firstHalf[i - 1] * 0.8) {
                    increasing = false;
                    break;
                }
            }
            
            const maxFirstHalf = Math.max(...firstHalf);
            const minSecondHalf = Math.min(...secondHalf);
            const significantDrop = minSecondHalf < maxFirstHalf * 0.5;
            
            return increasing && significantDrop;
        }
        
        isDecrescendoPattern(lengths) {
            if (lengths.length < 5) return false;
            
            const firstHalf = lengths.slice(0, Math.floor(lengths.length / 2));
            const secondHalf = lengths.slice(Math.floor(lengths.length / 2));
            
            let decreasing = true;
            for (let i = 1; i < firstHalf.length; i++) {
                if (firstHalf[i] > firstHalf[i - 1] * 1.2) {
                    decreasing = false;
                    break;
                }
            }
            
            const minFirstHalf = Math.min(...firstHalf);
            const maxSecondHalf = Math.max(...secondHalf);
            const significantRise = maxSecondHalf > minFirstHalf * 1.5;
            
            return decreasing && significantRise;
        }
        
        calculateLengthDistribution(lengths) {
            const distribution = {
                short: 0,      // 1-5 words
                medium: 0,     // 6-15 words
                long: 0,       // 16-25 words
                veryLong: 0    // 26+ words
            };
            
            lengths.forEach(length => {
                if (length <= 5) distribution.short++;
                else if (length <= 15) distribution.medium++;
                else if (length <= 25) distribution.long++;
                else distribution.veryLong++;
            });
            
            const total = lengths.length;
            if (total > 0) {
                distribution.short = distribution.short / total;
                distribution.medium = distribution.medium / total;
                distribution.long = distribution.long / total;
                distribution.veryLong = distribution.veryLong / total;
            }
            
            return distribution;
        }
        
        calculateSyntacticDiversity(sentences) {
            if (sentences.length === 0) return 0;
            
            const structures = new Set();
            
            sentences.forEach(s => {
                const text = typeof s === 'object' ? s.text : s;
                const structure = this.extractSentenceStructure(text);
                structures.add(structure);
            });
            
            return structures.size / sentences.length;
        }
        
        extractSentenceStructure(sentence) {
            const words = sentence.split(/\s+/).length;
            const commas = (sentence.match(/,/g) || []).length;
            const conjunctions = (sentence.match(/\b(and|but|or|because|although|while|since|if|when|where|that|which|who)\b/gi) || []).length;
            
            return `${words}_${commas}_${conjunctions}`;
        }
        
        calculateReadabilityMetrics(data) {
            const text = data.cleaned;
            const words = data.words.length;
            const sentences = data.sentences.length;
            
            if (words === 0 || sentences === 0) {
                return { fleschReadingEase: 0, fleschKincaidGrade: 0, gunningFog: 0 };
            }
            
            let syllables = 0;
            data.words.forEach(word => {
                syllables += this.countSyllables(word);
            });
            
            const avgWordsPerSentence = words / sentences;
            const avgSyllablesPerWord = syllables / words;
            
            const fleschReadingEase = 206.835 - (1.015 * avgWordsPerSentence) - (84.6 * avgSyllablesPerWord);
            
            const fleschKincaidGrade = 0.39 * avgWordsPerSentence + 11.8 * avgSyllablesPerWord - 15.59;
            
            const complexWords = data.words.filter(word => {
                const syllableCount = this.countSyllables(word);
                return syllableCount >= 3;
            }).length;
            const percentComplexWords = (complexWords / words) * 100;
            const gunningFog = 0.4 * (avgWordsPerSentence + percentComplexWords);
            
            return {
                fleschReadingEase: Math.max(0, Math.min(100, fleschReadingEase)),
                fleschKincaidGrade: Math.max(0, fleschKincaidGrade),
                gunningFog: Math.max(0, gunningFog),
                readingLevel: this.determineReadingLevel(fleschReadingEase)
            };
        }
        
        countSyllables(word) {
            word = word.toLowerCase();
            
            if (word.length <= 3) return 1;
            
            word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
            word = word.replace(/^y/, '');
            
            const syllables = word.match(/[aeiouy]{1,2}/g);
            return syllables ? syllables.length : 1;
        }
        
        determineReadingLevel(fleschScore) {
            if (fleschScore >= 90) return 'very easy';
            if (fleschScore >= 80) return 'easy';
            if (fleschScore >= 70) return 'fairly easy';
            if (fleschScore >= 60) return 'standard';
            if (fleschScore >= 50) return 'fairly difficult';
            if (fleschScore >= 30) return 'difficult';
            return 'very difficult';
        }
        
        calculateTextCoherence(sentences) {
            if (sentences.length < 2) return 1;
            
            const allWords = [];
            const sentenceWords = [];
            
            sentences.forEach(s => {
                const text = typeof s === 'object' ? s.text : s;
                const words = this.enhancedTokenization(text).filter(w => w.length > 3);
                allWords.push(...words);
                sentenceWords.push(new Set(words));
            });
            
            let totalOverlap = 0;
            for (let i = 0; i < sentenceWords.length - 1; i++) {
                const current = sentenceWords[i];
                const next = sentenceWords[i + 1];
                
                let overlap = 0;
                current.forEach(word => {
                    if (next.has(word)) overlap++;
                });
                
                const maxSize = Math.max(current.size, next.size);
                totalOverlap += maxSize > 0 ? overlap / maxSize : 0;
            }
            
            return totalOverlap / (sentenceWords.length - 1);
        }
        
        enhancedContextualAnalysis(data) {
            const text = data.cleaned.toLowerCase();
            const sentences = data.sentences;
            const rules = this.contextRules[this.language];
            
            const analysis = {
                indicators: {
                    negations: 0,
                    intensifiers: 0,
                    diminutives: 0,
                    augmentatives: 0,
                    irony: 0,
                    contrasts: 0,
                    rhetorical: 0,
                    hyperbole: 0,
                    understatement: 0
                },
                scores: {
                    negationImpact: 0,
                    intensification: 0,
                    emotionalModulation: 0,
                    contextualComplexity: 0
                },
                patterns: {
                    ironyPatterns: [],
                    contrastPatterns: [],
                    rhetoricalPatterns: []
                }
            };
            
            rules.negations.forEach(negation => {
                const regex = new RegExp(`\\b${this.escapeRegExp(negation)}\\b`, 'gi');
                const matches = text.match(regex);
                if (matches) {
                    analysis.indicators.negations += matches.length;
                    const weight = negation.includes('отнюдь') || negation.includes('вовсе') ? 1.5 : 1.0;
                    analysis.scores.negationImpact -= matches.length * 0.3 * weight;
                }
            });
            
            rules.intensifiers.forEach(intensifier => {
                const regex = new RegExp(`\\b${this.escapeRegExp(intensifier)}\\b`, 'gi');
                const matches = text.match(regex);
                if (matches) {
                    analysis.indicators.intensifiers += matches.length;
                    const weight = intensifier.includes('чрезвычайно') || intensifier.includes('невероятно') ? 1.5 : 
                                  intensifier.includes('очень') || intensifier.includes('сильно') ? 1.0 : 1.2;
                    analysis.scores.intensification += matches.length * 0.2 * weight;
                }
            });
            
            if (this.language === 'ru') {
                rules.diminutives.forEach(suffix => {
                    const regex = new RegExp(`[а-яё]+${suffix}[а-яё]*`, 'gi');
                    const matches = text.match(regex);
                    if (matches) {
                        analysis.indicators.diminutives += matches.length;
                        analysis.scores.emotionalModulation += matches.length * 0.1;
                    }
                });
                
                rules.augmentatives.forEach(suffix => {
                    const regex = new RegExp(`[а-яё]+${suffix}[а-яё]*`, 'gi');
                    const matches = text.match(regex);
                    if (matches) {
                        analysis.indicators.augmentatives += matches.length;
                        analysis.scores.emotionalModulation += matches.length * 0.15;
                    }
                });
            }
            
            sentences.forEach((sentenceObj, index) => {
                const sentence = typeof sentenceObj === 'object' ? sentenceObj.text : sentenceObj;
                const lowerSentence = sentence.toLowerCase();
                
                let ironyDetected = false;
                rules.ironyIndicators.forEach(indicator => {
                    if (lowerSentence.includes(indicator)) {
                        if (sentence.includes('?') || sentence.includes('!')) {
                            const positiveAfterNegative = this.checkIronyPattern(sentence);
                            if (positiveAfterNegative) {
                                analysis.indicators.irony++;
                                analysis.scores.contextualComplexity += 0.5;
                                ironyDetected = true;
                                analysis.patterns.ironyPatterns.push({
                                    sentenceIndex: index,
                                    pattern: `irony indicator: ${indicator}`,
                                    text: sentence.substring(0, 100) + '...'
                                });
                            }
                        }
                    }
                });
                
                rules.rhetoricalQuestions.forEach(marker => {
                    if (lowerSentence.includes(marker) && sentence.includes('?')) {
                        analysis.indicators.rhetorical++;
                        analysis.scores.contextualComplexity += 0.3;
                        analysis.patterns.rhetoricalPatterns.push({
                            sentenceIndex: index,
                            marker: marker,
                            text: sentence.substring(0, 100) + '...'
                        });
                    }
                });
                
                rules.contrastMarkers.forEach(marker => {
                    if (lowerSentence.includes(marker)) {
                        analysis.indicators.contrasts++;
                        analysis.scores.contextualComplexity += 0.2;
                        analysis.patterns.contrastPatterns.push({
                            sentenceIndex: index,
                            marker: marker,
                            text: sentence.substring(0, 100) + '...'
                        });
                    }
                });
                
                rules.hyperbole.forEach(marker => {
                    if (lowerSentence.includes(marker)) {
                        analysis.indicators.hyperbole++;
                        analysis.scores.intensification += 0.3;
                    }
                });
                
                rules.understatement.forEach(marker => {
                    if (lowerSentence.includes(marker)) {
                        analysis.indicators.understatement++;
                        analysis.scores.emotionalModulation += 0.2;
                    }
                });
            });
            
            analysis.overallScore = 
                analysis.scores.negationImpact +
                analysis.scores.intensification +
                analysis.scores.emotionalModulation +
                analysis.scores.contextualComplexity;
            
            analysis.coherence = this.calculateAdvancedCoherence(sentences);
            
            analysis.consistency = this.analyzeEmotionalConsistency(data);
            
            return analysis;
        }
        
        checkIronyPattern(sentence) {
            const lowerSentence = sentence.toLowerCase();
            
            const ironyIndicators = this.language === 'ru' ? [
                'конечно', 'разумеется', 'естественно', 'безусловно', 'несомненно', 
                'бесспорно', 'очевидно', 'явно', 'понятно', 'само собой', 
                'как же', 'что же', 'кто же', 'где же', 'когда же', 'почему же',
                'вот именно', 'еще бы', 'ну да', 'как будто', 'словно', 'точно',
                'прямо', 'просто', 'особенно', 'именно', 'как раз', 'уж',
                'точно-точно', 'само собой разумеется', 'без сомнения', 'без вопросов',
                'и вправду', 'неужели', 'разве', 'что за', 'какой', 'так себе',
                'ничего себе', 'ничего так', 'ничего подобного', 'еще чего',
                'сказал тоже', 'ну и ну', 'вот так вот', 'вот тебе и', 'вот тебе на',
                'вот это да', 'ну прямо', 'прямо скажем', 'мягко говоря', 'скажем так',
                'так сказать', 'называется', 'так и быть', 'чего уж там', 'куда там',
                'где там', 'и не подумал', 'и не подумаю', 'и не собираюсь',
                'и не собирался', 'как бы не так', 'как бы не', 'вот еще',
                'еще чего не хватало', 'счастье-то какое', 'радость-то какая',
                'ну надо же', 'вот так сюрприз', 'вот так новости', 'вот так дела',
                'вот так история', 'ну разумеется', 'еще бы нет', 'как же без этого',
                'как же иначе', 'еще лучше', 'еще лучше некуда', 'просто замечательно',
                'просто прекрасно', 'просто великолепно', 'просто отлично',
                'просто шикарно', 'просто сказочно', 'просто волшебно'
            ] : [
                'of course', 'certainly', 'undoubtedly', 'naturally', 'surely',
                'obviously', 'clearly', 'evidently', 'manifestly', 'indeed',
                'as if', 'as though', 'just like', 'exactly', 'precisely',
                'simply', 'especially', 'particularly', 'actually', 'really',
                'truly', 'genuinely', 'honestly', 'frankly', 'apparently',
                'seemingly', 'supposedly', 'allegedly', 'reportedly', 'ostensibly',
                'ironically', 'sarcastically', 'mockingly', 'jestingly', 'jokingly',
                'funnily enough', 'amusingly', 'interestingly', 'curiously',
                'strangely', 'oddly', 'surprisingly', 'unexpectedly', 'incidentally',
                'coincidentally', 'conveniently', 'typically', 'classic', 'perfectly',
                'absolutely', 'totally', 'utterly', 'completely', 'entirely',
                'wholly', 'quite', 'rather', 'pretty', 'fairly', 'somewhat',
                'slightly', 'a bit', 'a little', 'just', 'only', 'merely',
                'barely', 'hardly', 'scarcely', 'almost', 'nearly', 'virtually',
                'practically', 'basically', 'essentially', 'fundamentally',
                'literally', 'figuratively', 'seriously', 'honestly', 'truly',
                'genuinely', 'really', 'actually', 'in fact', 'as a matter of fact',
                'to be honest', 'to tell the truth', 'frankly speaking',
                'in all honesty', 'in all sincerity', 'to be sincere',
                'to be frank', 'to be truthful', 'to be candid', 'to be blunt',
                'to be direct', 'to be straightforward', 'to put it bluntly',
                'to put it simply', 'to put it mildly', 'to say the least',
                'to say the most', 'to say the best', 'to say the worst',
                'needless to say', 'it goes without saying', 'as you can imagine',
                'as you might expect', 'as expected', 'as anticipated',
                'as predicted', 'as foreseen', 'as envisaged', 'as envisioned',
                'as planned', 'as scheduled', 'as arranged', 'as agreed',
                'as promised', 'as sworn', 'as vowed', 'as pledged',
                'as committed', 'as dedicated', 'as devoted', 'as loyal',
                'as faithful', 'as true', 'as steady', 'as constant',
                'as consistent', 'as reliable', 'as dependable', 'as trustworthy',
                'as honest', 'as sincere', 'as genuine', 'as authentic',
                'as real', 'as actual', 'as factual', 'as true to life',
                'as lifelike', 'as realistic', 'as natural', 'as organic',
                'as pure', 'as clean', 'as clear', 'as transparent',
                'as see-through', 'as invisible', 'as hidden', 'as concealed',
                'as covered', 'as masked', 'as disguised', 'as camouflaged',
                'as veiled', 'as shrouded', 'as cloaked', 'as draped',
                'as curtained', 'as screened', 'as shielded', 'as protected',
                'as guarded', 'as defended', 'as secured', 'as safe',
                'as secure', 'as sound', 'as firm', 'as solid', 'as stable',
                'as steady', 'as strong', 'as sturdy', 'as tough', 'as durable',
                'as lasting', 'as enduring', 'as permanent', 'as eternal',
                'as everlasting', 'as immortal', 'as undying', 'as deathless',
                'as imperishable', 'as indestructible', 'as unbreakable',
                'as shatterproof', 'as bulletproof', 'as waterproof',
                'as fireproof', 'as heatproof', 'as coldproof', 'as frostproof',
                'as rustproof', 'as corrosion-proof', 'as stain-proof',
                'as dirt-proof', 'as dust-proof', 'as water-resistant',
                'as fire-resistant', 'as heat-resistant', 'as cold-resistant',
                'as frost-resistant', 'as rust-resistant', 'as corrosion-resistant',
                'as stain-resistant', 'as dirt-resistant', 'as dust-resistant'
            ];
            
            let ironyScore = 0;
            
            ironyIndicators.forEach(indicator => {
                if (lowerSentence.includes(indicator)) {
                    ironyScore += 0.5;
                }
            });
            
            const contradictionPatterns = this.language === 'ru' ? [
                /но\s+[а-яa-z]+\s+(хорош|прекрасн|замечательн|отличн)/i,
                /хотя\s+[а-яa-z]+\s+(плох|ужасн|отвратительн|скучн)/i,
                /конечно.*\?/i,
                /разумеется.*!/i,
                /^[а-яa-z]+,\s+[а-яa-z]+.*!/i,
                /[а-яa-z]+!\s+[а-яa-z]+.*\?/i,
                /[а-яa-z]+\?+\s+[а-яa-z]+.*!/i,
                /[а-яa-z]+!+\s+[а-яa-z]+.*\?/i,
                /[а-яa-z]+\?+\s+[а-яa-z]+.*\?/i,
                /[а-яa-z]+!+\s+[а-яa-z]+.*!/i,
                /[а-яa-z]+,\s+[а-яa-z]+.*\?/i,
                /[а-яa-z]+,\s+[а-яa-z]+.*!/i,
                /[а-яa-z]+;\s+[а-яa-z]+.*\?/i,
                /[а-яa-z]+;\s+[а-яa-z]+.*!/i,
                /[а-яa-z]+:\s+[а-яa-z]+.*\?/i,
                /[а-яa-z]+:\s+[а-яa-z]+.*!/i,
                /[а-яa-z]+\s+—\s+[а-яa-z]+.*\?/i,
                /[а-яa-z]+\s+—\s+[а-яa-z]+.*!/i,
                /[а-яa-z]+\s+–\s+[а-яa-z]+.*\?/i,
                /[а-яa-z]+\s+–\s+[а-яa-z]+.*!/i,
                /[а-яa-z]+\s+-\s+[а-яa-z]+.*\?/i,
                /[а-яa-z]+\s+-\s+[а-яa-z]+.*!/i,
                /[а-яa-z]+\s+—\s+[а-яa-z]+.*\?/i,
                /[а-яa-z]+\s+—\s+[а-яa-z]+.*!/i
            ] : [
                /but\s+[a-z]+\s+(good|great|excellent|wonderful)/i,
                /although\s+[a-z]+\s+(bad|terrible|awful|boring)/i,
                /of course.*\?/i,
                /certainly.*!/i,
                /^[a-z]+,\s+[a-z]+.*!/i,
                /[a-z]+!\s+[a-z]+.*\?/i,
                /[a-z]+\?+\s+[a-z]+.*!/i,
                /[a-z]+!+\s+[a-z]+.*\?/i,
                /[a-z]+\?+\s+[a-z]+.*\?/i,
                /[a-z]+!+\s+[a-z]+.*!/i,
                /[a-z]+,\s+[a-z]+.*\?/i,
                /[a-z]+,\s+[a-z]+.*!/i,
                /[a-z]+;\s+[a-z]+.*\?/i,
                /[a-z]+;\s+[a-z]+.*!/i,
                /[a-z]+:\s+[a-z]+.*\?/i,
                /[a-z]+:\s+[a-z]+.*!/i,
                /[a-z]+\s+—\s+[a-z]+.*\?/i,
                /[a-z]+\s+—\s+[a-z]+.*!/i,
                /[a-z]+\s+–\s+[a-z]+.*\?/i,
                /[a-z]+\s+–\s+[a-z]+.*!/i,
                /[a-z]+\s+-\s+[a-z]+.*\?/i,
                /[a-z]+\s+-\s+[a-z]+.*!/i,
                /[a-z]+\s+—\s+[a-z]+.*\?/i,
                /[a-z]+\s+—\s+[a-z]+.*!/i
            ];
            
            contradictionPatterns.forEach(pattern => {
                if (pattern.test(sentence)) {
                    ironyScore += 1;
                }
            });
            
            return ironyScore > 0;
        }
        
        calculateAdvancedCoherence(sentences) {
            if (sentences.length < 2) return 1;
            
            let coherence = 0;
            const factors = [];
            
            const topics = this.extractTopics(sentences);
            factors.push(this.calculateTopicContinuity(topics));
            
            factors.push(this.calculateReferentialCoherence(sentences));
            
            factors.push(this.calculateTemporalCoherence(sentences));
            
            factors.push(this.calculateStructuralCoherence(sentences));
            
            coherence = factors.reduce((a, b) => a + b, 0) / factors.length;
            
            return coherence;
        }
        
        extractTopics(sentences) {
            const topics = [];
            const stopWords = this.language === 'ru' ? 
                ['это', 'тот', 'такой', 'какой', 'который', 'свой'] :
                ['the', 'a', 'an', 'this', 'that', 'these', 'those'];
            
            sentences.forEach(s => {
                const text = typeof s === 'object' ? s.text : s;
                const words = this.enhancedTokenization(text)
                    .filter(w => w.length > 3 && !stopWords.includes(w));
                
                const sorted = words.sort((a, b) => b.length - a.length).slice(0, 3);
                topics.push(sorted);
            });
            
            return topics;
        }
        
        calculateTopicContinuity(topics) {
            if (topics.length < 2) return 1;
            
            let continuity = 0;
            for (let i = 0; i < topics.length - 1; i++) {
                const current = new Set(topics[i]);
                const next = new Set(topics[i + 1]);
                
                let overlap = 0;
                current.forEach(word => {
                    if (next.has(word)) overlap++;
                });
                
                const maxSize = Math.max(current.size, next.size);
                continuity += maxSize > 0 ? overlap / maxSize : 0;
            }
            
            return continuity / (topics.length - 1);
        }
        
        calculateReferentialCoherence(sentences) {
            let coherence = 0;
            let referenceChains = 0;
            
            for (let i = 1; i < sentences.length; i++) {
                const prev = typeof sentences[i-1] === 'object' ? sentences[i-1].text : sentences[i-1];
                const curr = typeof sentences[i] === 'object' ? sentences[i].text : sentences[i];
                
                const pronouns = this.language === 'ru' ? 
                    ['он', 'она', 'оно', 'они', 'его', 'её', 'их', 'этот', 'тот'] :
                    ['he', 'she', 'it', 'they', 'him', 'her', 'them', 'this', 'that'];
                
                const hasPronoun = pronouns.some(pronoun => 
                    new RegExp(`\\b${pronoun}\\b`, 'i').test(curr)
                );
                
                if (hasPronoun) {
                    const nouns = this.extractNouns(prev);
                    if (nouns.length > 0) {
                        referenceChains++;
                    }
                }
            }
            
            coherence = sentences.length > 1 ? referenceChains / (sentences.length - 1) : 0;
            return coherence;
        }
        
        extractNouns(text) {
            const words = this.enhancedTokenization(text);
            return words.filter(w => w.length > 3 && /^[а-яa-z]/i.test(w));
        }
        
        calculateTemporalCoherence(sentences) {
            const tenses = [];
            
            sentences.forEach(s => {
                const text = typeof s === 'object' ? s.text : s;
                const tense = this.detectTense(text);
                tenses.push(tense);
            });
            
            let changes = 0;
            for (let i = 1; i < tenses.length; i++) {
                if (tenses[i] !== tenses[i-1] && tenses[i] !== 'mixed' && tenses[i-1] !== 'mixed') {
                    changes++;
                }
            }
            
            const maxChanges = tenses.length - 1;
            return maxChanges > 0 ? 1 - (changes / maxChanges) : 1;
        }
        
        detectTense(text) {
            const lower = text.toLowerCase();
            
            const pastMarkers = this.language === 'ru' ? 
                ['был', 'была', 'было', 'были', 'прошл', 'вчера', 'раньше'] :
                ['was', 'were', 'had', 'did', 'yesterday', 'ago', 'before'];
            
            const futureMarkers = this.language === 'ru' ?
                ['будет', 'будут', 'завтра', 'потом', 'позже'] :
                ['will', 'shall', 'going to', 'tomorrow', 'later'];
            
            const presentMarkers = this.language === 'ru' ?
                ['есть', 'является', 'сейчас', 'теперь', 'в настоящее время'] :
                ['is', 'are', 'am', 'do', 'does', 'now', 'currently'];
            
            const pastCount = pastMarkers.filter(m => lower.includes(m)).length;
            const futureCount = futureMarkers.filter(m => lower.includes(m)).length;
            const presentCount = presentMarkers.filter(m => lower.includes(m)).length;
            
            const max = Math.max(pastCount, futureCount, presentCount);
            
            if (max === 0) return 'unknown';
            if (pastCount === futureCount && futureCount === presentCount) return 'mixed';
            
            if (pastCount === max) return 'past';
            if (futureCount === max) return 'future';
            return 'present';
        }
        
        calculateStructuralCoherence(sentences) {
            const connectives = this.language === 'ru' ?
                ['и', 'а', 'но', 'или', 'однако', 'поэтому', 'следовательно', 'таким образом'] :
                ['and', 'but', 'or', 'however', 'therefore', 'thus', 'consequently', 'moreover'];
            
            let connectiveCount = 0;
            sentences.forEach(s => {
                const text = typeof s === 'object' ? s.text : s;
                const hasConnective = connectives.some(connective => 
                    new RegExp(`\\b${connective}\\b`, 'i').test(text)
                );
                if (hasConnective) connectiveCount++;
            });
            
            return sentences.length > 0 ? connectiveCount / sentences.length : 0;
        }
        
        analyzeEmotionalConsistency(data) {
            const sentences = data.sentences;
            if (sentences.length < 2) return { consistency: 1, pattern: 'stable' };
            
            const sentenceTones = sentences.map((s, index) => {
                const text = typeof s === 'object' ? s.text : s;
                return this.calculateSentenceEmotion(text);
            });
            
            let changes = 0;
            for (let i = 1; i < sentenceTones.length; i++) {
                const diff = Math.abs(sentenceTones[i] - sentenceTones[i-1]);
                if (diff > 0.3) changes++;
            }
            
            const consistency = 1 - (changes / (sentenceTones.length - 1));
            
            let pattern = 'stable';
            if (consistency < 0.3) pattern = 'volatile';
            else if (consistency < 0.6) pattern = 'moderate';
            
            return {
                consistency,
                pattern,
                toneVariation: this.calculateToneVariation(sentenceTones),
                emotionalRange: Math.max(...sentenceTones) - Math.min(...sentenceTones)
            };
        }
        
        calculateSentenceEmotion(text) {
            const words = this.enhancedTokenization(text.toLowerCase());
            const dict = this.dictionaries[this.language];
            let score = 0;
            let count = 0;
            
            for (const [category, wordList] of Object.entries(dict)) {
                const weight = this.categoryWeights[category] || 1.0;
                
                for (const word of wordList) {
                    if (words.includes(word)) {
                        const isPositive = ['ecstasy', 'joy', 'love', 'peace', 'hope', 
                                          'gratitude', 'inspiration', 'pride'].includes(category);
                        const isNegative = ['sadness', 'grief', 'anger', 'fear', 'disgust', 
                                          'shame', 'guilt', 'loneliness', 'envy', 'despair'].includes(category);
                        
                        if (isPositive) score += weight;
                        if (isNegative) score -= weight;
                        count++;
                        break; // Count each category only once per sentence
                    }
                }
            }
            
            return count > 0 ? score / count : 0;
        }
        
        calculateToneVariation(tones) {
            if (tones.length < 2) return 0;
            
            let variation = 0;
            for (let i = 1; i < tones.length; i++) {
                variation += Math.abs(tones[i] - tones[i-1]);
            }
            
            return variation / (tones.length - 1);
        }
        
        enhancedCulturalAnalysis(data) {
            const text = data.cleaned;
            const language = this.language;
            const cultural = this.culturalContext[language];
            
            const analysis = {
                references: {
                    literary: { count: 0, items: [] },
                    historical: { count: 0, items: [] },
                    mythological: { count: 0, items: [] },
                    traditional: { count: 0, items: [] },
                    idioms: { count: 0, items: [] },
                    poetic: { count: 0, items: [] }
                },
                scores: {
                    culturalDepth: 0,
                    intertextuality: 0,
                    culturalRichness: 0
                },
                patterns: {
                    literaryPatterns: [],
                    culturalThemes: [],
                    intertextualReferences: []
                }
            };
            
            cultural.literaryReferences.forEach(ref => {
                const regex = new RegExp(`\\b${this.escapeRegExp(ref)}\\b`, 'gi');
                const matches = text.match(regex);
                if (matches) {
                    analysis.references.literary.count += matches.length;
                    analysis.references.literary.items.push({
                        reference: ref,
                        count: matches.length,
                        contexts: this.findReferenceContexts(text, ref)
                    });
                    analysis.scores.culturalDepth += matches.length * 0.5;
                    
                    // Check for intertextual patterns
                    if (this.isIntertextualReference(ref, text)) {
                        analysis.scores.intertextuality += 0.3;
                        analysis.patterns.intertextualReferences.push(ref);
                    }
                }
            });
            
            cultural.historicalReferences.forEach(ref => {
                const regex = new RegExp(`\\b${this.escapeRegExp(ref)}\\b`, 'gi');
                const matches = text.match(regex);
                if (matches) {
                    analysis.references.historical.count += matches.length;
                    analysis.references.historical.items.push({
                        reference: ref,
                        count: matches.length,
                        period: this.determineHistoricalPeriod(ref)
                    });
                    analysis.scores.culturalDepth += matches.length * 0.4;
                }
            });
            
            cultural.mythologicalReferences.forEach(ref => {
                const regex = new RegExp(`\\b${this.escapeRegExp(ref)}\\b`, 'gi');
                const matches = text.match(regex);
                if (matches) {
                    analysis.references.mythological.count += matches.length;
                    analysis.references.mythological.items.push({
                        reference: ref,
                        count: matches.length,
                        archetype: this.determineMythologicalArchetype(ref)
                    });
                    analysis.scores.culturalDepth += matches.length * 0.3;
                    
                    if (this.isMythologicalPattern(ref, text)) {
                        analysis.patterns.culturalThemes.push(`mythological: ${ref}`);
                    }
                }
            });
            
            cultural.idioms.forEach(idiom => {
                const escapedIdiom = this.escapeRegExp(idiom);
                const regex = new RegExp(escapedIdiom, 'gi');
                const matches = text.match(regex);
                if (matches) {
                    analysis.references.idioms.count += matches.length;
                    analysis.references.idioms.items.push({
                        idiom: idiom,
                        count: matches.length,
                        literalMeaning: this.getLiteralMeaning(idiom, language)
                    });
                    analysis.scores.culturalRichness += matches.length * 0.3;
                }
            });
            
            cultural.poeticPatterns.forEach((pattern, index) => {
                const matches = text.match(pattern);
                if (matches) {
                    analysis.references.poetic.count += matches.length;
                    analysis.references.poetic.items.push({
                        pattern: pattern.toString(),
                        count: matches.length,
                        type: this.classifyPoeticPattern(pattern)
                    });
                    analysis.scores.culturalRichness += matches.length * 0.2;
                    
                    matches.forEach(match => {
                        analysis.patterns.literaryPatterns.push({
                            pattern: `poetic_${index}`,
                            example: match.substring(0, 50) + '...'
                        });
                    });
                }
            });
            
            const totalReferences = Object.values(analysis.references)
                .reduce((sum, ref) => sum + ref.count, 0);
            
            analysis.scores.culturalDepth = analysis.scores.culturalDepth / (totalReferences || 1);
            analysis.scores.culturalRichness = analysis.scores.culturalRichness / (totalReferences || 1);
            analysis.scores.overall = (analysis.scores.culturalDepth + 
                                      analysis.scores.culturalRichness + 
                                      analysis.scores.intertextuality) / 3;
            
            analysis.culturalDensity = totalReferences / (data.words.length || 1);
            
            analysis.culturalCoherence = this.calculateCulturalCoherence(analysis.references);
            
            analysis.dominantCulturalTheme = this.detectDominantCulturalTheme(analysis.references);
            
            return analysis;
        }
        
        detectWordRepetitions(data) {
            const words = data.words;
            const sentences = data.sentences;
            
            if (words.length === 0) {
                return {
                    repetitions: [],
                    metrics: {
                        repetitionDensity: 0,
                        averageDistance: 0,
                        clusterCount: 0,
                        severity: 0
                    },
                    recommendations: []
                };
            }
            
            const wordFrequency = {};
            words.forEach(word => {
                wordFrequency[word] = (wordFrequency[word] || 0) + 1;
            });
            
            const repetitions = [];
            const stopWords = this.language === 'ru' ? 
                ['и', 'в', 'на', 'с', 'к', 'а', 'но', 'или', 'не', 'то', 'что', 'как', 'это', 'он', 'она', 'оно', 'они'] :
                ['and', 'in', 'on', 'with', 'to', 'but', 'or', 'not', 'that', 'what', 'how', 'this', 'he', 'she', 'it', 'they'];
            
            for (const [word, count] of Object.entries(wordFrequency)) {
                if (count >= 2 && !stopWords.includes(word)) {
                    const positions = [];
                    words.forEach((w, idx) => {
                        if (w === word) {
                            positions.push(idx);
                        }
                    });
                    
                    const distances = [];
                    for (let i = 1; i < positions.length; i++) {
                        distances.push(positions[i] - positions[i - 1]);
                    }
                    
                    const avgDistance = distances.reduce((a, b) => a + b, 0) / distances.length;
                    const minDistance = Math.min(...distances);
                    const maxDistance = Math.max(...distances);
                    
                    const severity = this.calculateRepetitionSeverity(count, avgDistance, words.length);
                    
                    repetitions.push({
                        word: word,
                        count: count,
                        positions: positions,
                        distances: distances,
                        avgDistance: avgDistance,
                        minDistance: minDistance,
                        maxDistance: maxDistance,
                        severity: severity,
                        sentenceDistribution: this.mapPositionsToSentences(positions, sentences)
                    });
                }
            }
            
            const sortedRepetitions = repetitions.sort((a, b) => b.severity - a.severity);
            
            const metrics = {
                repetitionDensity: sortedRepetitions.length / Math.max(1, words.length / 10),
                averageDistance: sortedRepetitions.length > 0 ? 
                    sortedRepetitions.reduce((sum, r) => sum + r.avgDistance, 0) / sortedRepetitions.length : 0,
                clusterCount: sortedRepetitions.filter(r => r.minDistance <= 10).length,
                severity: sortedRepetitions.length > 0 ? 
                    sortedRepetitions.reduce((sum, r) => sum + r.severity, 0) / sortedRepetitions.length : 0,
                criticalRepetitions: sortedRepetitions.filter(r => r.severity > 0.7).length
            };
            
            const recommendations = this.generateRepetitionRecommendations(sortedRepetitions, metrics);
            
            return {
                repetitions: sortedRepetitions.slice(0, 20),
                metrics: metrics,
                recommendations: recommendations,
                hasIssues: metrics.severity > 0.3 || metrics.criticalRepetitions > 0
            };
        }
        
        calculateRepetitionSeverity(count, avgDistance, totalWords) {
            const frequencyFactor = Math.min(1, count / 10);
            const proximityFactor = Math.max(0, 1 - (avgDistance / 50));
            const densityFactor = count / totalWords;
            
            return (frequencyFactor * 0.4 + proximityFactor * 0.4 + densityFactor * 0.2);
        }
        
        mapPositionsToSentences(positions, sentences) {
            const sentenceMap = {};
            
            positions.forEach(pos => {
                let currentPos = 0;
                for (let i = 0; i < sentences.length; i++) {
                    const sentence = typeof sentences[i] === 'object' ? sentences[i].text : sentences[i];
                    const sentenceWords = sentence.split(/\s+/).length;
                    
                    if (pos >= currentPos && pos < currentPos + sentenceWords) {
                        sentenceMap[i] = (sentenceMap[i] || 0) + 1;
                        break;
                    }
                    
                    currentPos += sentenceWords;
                }
            });
            
            return sentenceMap;
        }
        
        generateRepetitionRecommendations(repetitions, metrics) {
            const recommendations = [];
            
            if (metrics.criticalRepetitions > 3) {
                recommendations.push('critical_word_overuse');
            }
            
            if (metrics.clusterCount > 2) {
                recommendations.push('clustered_repetitions');
            }
            
            if (metrics.repetitionDensity > 0.5) {
                recommendations.push('high_repetition_density');
            }
            
            const closeRepetitions = repetitions.filter(r => r.minDistance <= 5);
            if (closeRepetitions.length > 0) {
                recommendations.push('immediate_repetitions');
            }
            
            if (metrics.averageDistance < 20) {
                recommendations.push('frequent_repetitions');
            }
            
            return recommendations;
        }
        
        findReferenceContexts(text, reference, contextSize = 100) {
            const contexts = [];
            const regex = new RegExp(`\\b${this.escapeRegExp(reference)}\\b`, 'gi');
            let match;
            
            while ((match = regex.exec(text)) !== null) {
                const start = Math.max(0, match.index - contextSize);
                const end = Math.min(text.length, match.index + reference.length + contextSize);
                contexts.push(text.substring(start, end));
            }
            
            return contexts;
        }
        
        isIntertextualReference(reference, text) {
            const literaryContexts = [
                'как говорил', 'как писал', 'в духе', 'напоминает', 
                'as said by', 'as written by', 'in the spirit of', 'reminiscent of'
            ];
            
            const context = text.toLowerCase();
            return literaryContexts.some(phrase => 
                context.includes(phrase) && context.includes(reference.toLowerCase())
            );
        }
        
        determineHistoricalPeriod(reference) {
            const periods = {
                ru: {
                    древний: ['царь', 'князь', 'боярин'],
                    средневековый: ['крепостной', 'дворянин'],
                    имперский: ['империя', 'царство', 'революция'],
                    советский: ['советский', 'большевик', 'комиссар', 'колхоз'],
                    современный: ['перестройка', 'рынок', 'приватизация']
                },
                en: {
                    ancient: ['king', 'queen', 'empire'],
                    medieval: ['feudal', 'crusade', 'kingdom'],
                    renaissance: ['renaissance', 'enlightenment'],
                    industrial: ['industrial', 'victorian'],
                    modern: ['globalization', 'digital']
                }
            };
            
            const langPeriods = periods[this.language];
            for (const [period, keywords] of Object.entries(langPeriods)) {
                if (keywords.some(keyword => reference.toLowerCase().includes(keyword))) {
                    return period;
                }
            }
            return 'undefined';
        }
        
        determineMythologicalArchetype(reference) {
            const archetypes = {
                trickster: ['баба яга', 'леший', 'домовой', 'кикимора', 'кощей', 'дракон', 'тролль', 'гоблин'],
                hero: ['богатырь', 'витязь', 'герой', 'hero', 'knight', 'warrior'],
                monster: ['водяной', 'змей', 'василиск', 'минотавр', 'циклоп', 'гарпия'],
                mystical: ['русалка', 'алконост', 'сирин', 'гамаюн', 'феникс', 'единорог', 'фея', 'эльф']
            };
            
            for (const [archetype, refs] of Object.entries(archetypes)) {
                if (refs.some(r => reference.toLowerCase().includes(r))) {
                    return archetype;
                }
            }
            return 'other';
        }
        
        isMythologicalPattern(reference, text) {
            const patterns = [
                new RegExp(`как\\s+${reference}[^.!?]*[.!?]`, 'i'),
                new RegExp(`словно\\s+${reference}[^.!?]*[.!?]`, 'i'),
                new RegExp(`подобно\\s+${reference}[^.!?]*[.!?]`, 'i')
            ];
            
            return patterns.some(pattern => pattern.test(text));
        }
        
        getLiteralMeaning(idiom, language) {
            const meanings = {
                ru: {
                    'тянуть канитель': 'заниматься нудным, монотонным делом',
                    'бить баклуши': 'бездельничать',
                    'дело в шляпе': 'всё решено, успех обеспечен',
                    'кот наплакал': 'очень мало',
                    'собаку съел': 'имеет большой опыт в чем-либо'
                },
                en: {
                    'break the ice': 'начать общение в неловкой ситуации',
                    'piece of cake': 'очень легко',
                    'hit the hay': 'идти спать',
                    'spill the beans': 'выдать секрет',
                    'cost an arm and a leg': 'очень дорого стоить'
                }
            };
            
            return meanings[language]?.[idiom] || 'idiomatic expression';
        }
        
        classifyPoeticPattern(pattern) {
            const patternStr = pattern.toString();
            if (patternStr.includes('как') || patternStr.includes('as')) {
                return 'simile';
            } else if (patternStr.includes('не.*а') || patternStr.includes('not.*but')) {
                return 'contrast';
            } else if (patternStr.includes('то.*то') || patternStr.includes('now.*now')) {
                return 'repetition';
            } else if (patternStr.includes('словно') || patternStr.includes('like')) {
                return 'comparison';
            }
            return 'poetic';
        }
        
        calculateCulturalCoherence(references) {
            const referenceCounts = Object.values(references)
                .map(ref => ref.count)
                .filter(count => count > 0);
            
            if (referenceCounts.length < 2) return 1;
            
            const total = referenceCounts.reduce((a, b) => a + b, 0);
            const max = Math.max(...referenceCounts);
            const concentration = max / total;
            
            return concentration;
        }
        
        detectDominantCulturalTheme(references) {
            const themeCounts = [];
            for (const [theme, data] of Object.entries(references)) {
                if (data.count > 0) {
                    themeCounts.push({ theme, count: data.count });
                }
            }
            
            if (themeCounts.length === 0) return 'none';
            
            themeCounts.sort((a, b) => b.count - a.count);
            return themeCounts[0].theme;
        }
        
        enhancedSemanticAnalysis(data) {
            const sentences = data.sentences;
            const words = data.words;
            
            const uniqueWords = [...new Set(words)];
            const semanticDensity = uniqueWords.length / (words.length || 1);
            
            const emotionalProgression = this.enhancedEmotionalProgression(sentences);
            
            const semanticClusters = this.enhancedSemanticClustering(words, data.cleaned);
            
            const thematicAnalysis = this.multiDimensionalThematicAnalysis(words, sentences);
            
            const semanticRelations = this.analyzeSemanticRelations(words);
            
            const abstractionLevel = this.calculateAbstractionLevel(words);
            
            return {
                density: semanticDensity,
                progression: emotionalProgression,
                clusters: semanticClusters,
                thematic: thematicAnalysis,
                relations: semanticRelations,
                abstraction: abstractionLevel,
                semanticRichness: this.calculateEnhancedSemanticRichness(words, uniqueWords),
                coherence: this.calculateSemanticCoherence(sentences)
            };
        }
        
        enhancedEmotionalProgression(sentences) {
            if (sentences.length < 2) {
                return { stable: true, changes: 0, arc: 'flat' };
            }
            
            const sentenceEmotions = sentences.map((sentence, index) => {
                const text = typeof sentence === 'object' ? sentence.text : sentence;
                return {
                    index,
                    text: text.substring(0, 100) + (text.length > 100 ? '...' : ''),
                    emotion: this.calculateSentenceEmotionScore(text),
                    intensity: this.calculateSentenceIntensity(text),
                    complexity: this.calculateSentenceEmotionalComplexity(text)
                };
            });
            
            const shifts = [];
            for (let i = 1; i < sentenceEmotions.length; i++) {
                const change = Math.abs(sentenceEmotions[i].emotion - sentenceEmotions[i-1].emotion);
                if (change > 0.3) {
                    shifts.push({
                        position: i,
                        change: change,
                        from: sentenceEmotions[i-1].emotion,
                        to: sentenceEmotions[i].emotion,
                        type: this.determineShiftType(sentenceEmotions[i-1].emotion, sentenceEmotions[i].emotion)
                    });
                }
            }
            
            const progressionMetrics = this.calculateProgressionMetrics(sentenceEmotions);
            
            const arcType = this.detectEmotionalArcType(sentenceEmotions);
            
            return {
                emotions: sentenceEmotions,
                shifts: shifts,
                metrics: progressionMetrics,
                arc: arcType,
                stability: shifts.length / (sentenceEmotions.length - 1),
                climax: this.findEmotionalClimax(sentenceEmotions)
            };
        }
        
        calculateSentenceEmotionScore(sentence) {
            const words = this.enhancedTokenization(sentence.toLowerCase());
            let score = 0;
            let weightSum = 0;
            const foundCategories = new Set();
            
            for (const [category, wordList] of Object.entries(this.dictionaries[this.language])) {
                const categoryWeight = this.categoryWeights[category] || 1.0;
                
                for (const word of wordList) {
                    if (words.includes(word)) {
                        if (!foundCategories.has(category)) {
                            const polarity = this.getCategoryPolarity(category);
                            score += polarity * categoryWeight;
                            foundCategories.add(category);
                            weightSum += categoryWeight;
                        }
                    }
                }
            }
            
            const intensityBonus = Math.min(0.3, foundCategories.size * 0.1);
            
            return weightSum > 0 ? 
                (score / weightSum) * (1 + intensityBonus) * Math.min(1, foundCategories.size / 3) : 
                0;
        }
        
        getCategoryPolarity(category) {
            const positive = ['ecstasy', 'joy', 'love', 'peace', 'hope', 
                            'gratitude', 'inspiration', 'pride', 'surprise',
                            'curiosity', 'aesthetic', 'triumph', 'liberation',
                            'connection', 'calmness', 'vulnerability', 'resilience'];
            
            const negative = ['sadness', 'grief', 'anger', 'fear', 'disgust', 
                            'shame', 'guilt', 'loneliness', 'envy', 'despair',
                            'contempt', 'bitterness', 'anxiety', 'emptiness',
                            'confusion'];
            
            const complex = ['ambivalence', 'irony', 'nostalgiaMixed', 'bittersweet',
                            'nostalgia', 'intensity', 'calmness'];
            
            if (positive.includes(category)) return 0.8;
            if (negative.includes(category)) return -0.8;
            if (complex.includes(category)) return 0.1;
            
            return 0;
        }
        
        calculateSentenceIntensity(sentence) {
            let intensity = 0;
            
            const exclamations = (sentence.match(/!/g) || []).length;
            intensity += exclamations * 0.3;
            
            const allCaps = (sentence.match(/\b[A-ZА-ЯЁ]{2,}\b/g) || []).length;
            intensity += allCaps * 0.2;
            
            const intensifiers = this.contextRules[this.language].intensifiers;
            intensifiers.forEach(word => {
                if (sentence.toLowerCase().includes(word)) {
                    intensity += 0.1;
                }
            });
            
            return Math.min(1, intensity);
        }
        
        calculateSentenceEmotionalComplexity(sentence) {
            const words = this.enhancedTokenization(sentence.toLowerCase());
            const foundCategories = new Set();
            
            for (const [category, wordList] of Object.entries(this.dictionaries[this.language])) {
                for (const word of wordList) {
                    if (words.includes(word)) {
                        foundCategories.add(category);
                        break;
                    }
                }
            }
            
            const complexCategories = ['ambivalence', 'irony', 'nostalgiaMixed', 'bittersweet'];
            const complexCount = complexCategories.filter(cat => foundCategories.has(cat)).length;
            
            return (foundCategories.size * 0.3) + (complexCount * 0.7);
        }
        
        determineShiftType(from, to) {
            const diff = to - from;
            if (diff > 0.5) return 'dramatic_improvement';
            if (diff > 0.2) return 'improvement';
            if (diff < -0.5) return 'dramatic_decline';
            if (diff < -0.2) return 'decline';
            if (Math.abs(diff) < 0.1) return 'stable';
            return 'subtle_change';
        }
        
        calculateProgressionMetrics(emotions) {
            const scores = emotions.map(e => e.emotion);
            const intensities = emotions.map(e => e.intensity);
            const complexities = emotions.map(e => e.complexity);
            
            return {
                avgScore: scores.reduce((a, b) => a + b, 0) / scores.length,
                scoreVariance: this.calculateVariance(scores),
                avgIntensity: intensities.reduce((a, b) => a + b, 0) / intensities.length,
                avgComplexity: complexities.reduce((a, b) => a + b, 0) / complexities.length,
                trend: this.calculateTrend(scores),
                volatility: this.calculateVolatility(scores)
            };
        }
        
        calculateTrend(scores) {
            if (scores.length < 2) return 'stable';
            
            const first = scores[0];
            const last = scores[scores.length - 1];
            const diff = last - first;
            
            if (diff > 0.3) return 'rising';
            if (diff < -0.3) return 'falling';
            return 'stable';
        }
        
        calculateVolatility(scores) {
            if (scores.length < 2) return 0;
            
            let volatility = 0;
            for (let i = 1; i < scores.length; i++) {
                volatility += Math.abs(scores[i] - scores[i-1]);
            }
            
            return volatility / (scores.length - 1);
        }
        
        detectEmotionalArcType(emotions) {
            const scores = emotions.map(e => e.emotion);
            
            if (this.isRiseFallRiseArc(scores)) return 'rise_fall_rise';
            if (this.isFallRiseFallArc(scores)) return 'fall_rise_fall';
            if (this.isSteadyRiseArc(scores)) return 'steady_rise';
            if (this.isSteadyFallArc(scores)) return 'steady_fall';
            if (this.isManInHoleArc(scores)) return 'man_in_hole';
            if (this.isManInHoleRiseArc(scores)) return 'man_in_hole_rise';
            
            return 'irregular';
        }
        
        isRiseFallRiseArc(scores) {
            if (scores.length < 5) return false;
            
            const third = Math.floor(scores.length / 3);
            const firstThird = scores.slice(0, third);
            const secondThird = scores.slice(third, 2 * third);
            const lastThird = scores.slice(2 * third);
            
            return this.isIncreasing(firstThird) && 
                   this.isDecreasing(secondThird) && 
                   this.isIncreasing(lastThird);
        }
        
        isFallRiseFallArc(scores) {
            if (scores.length < 5) return false;
            
            const third = Math.floor(scores.length / 3);
            const firstThird = scores.slice(0, third);
            const secondThird = scores.slice(third, 2 * third);
            const lastThird = scores.slice(2 * third);
            
            return this.isDecreasing(firstThird) && 
                   this.isIncreasing(secondThird) && 
                   this.isDecreasing(lastThird);
        }
        
        isSteadyRiseArc(scores) {
            return this.isIncreasing(scores);
        }
        
        isSteadyFallArc(scores) {
            return this.isDecreasing(scores);
        }
        
        isManInHoleArc(scores) {
            if (scores.length < 3) return false;
            
            const mid = Math.floor(scores.length / 2);
            const firstHalf = scores.slice(0, mid);
            const secondHalf = scores.slice(mid);
            
            return this.isDecreasing(firstHalf) && this.isIncreasing(secondHalf);
        }
        
        isManInHoleRiseArc(scores) {
            if (scores.length < 3) return false;
            
            const mid = Math.floor(scores.length / 2);
            const firstHalf = scores.slice(0, mid);
            const secondHalf = scores.slice(mid);
            
            return this.isIncreasing(firstHalf) && this.isDecreasing(secondHalf);
        }
        
        isIncreasing(scores) {
            for (let i = 1; i < scores.length; i++) {
                if (scores[i] < scores[i-1] - 0.1) return false;
            }
            return true;
        }
        
        isDecreasing(scores) {
            for (let i = 1; i < scores.length; i++) {
                if (scores[i] > scores[i-1] + 0.1) return false;
            }
            return true;
        }
        
        findEmotionalClimax(emotions) {
            if (emotions.length === 0) return null;
            
            let maxIntensityIndex = 0;
            let maxIntensity = 0;
            
            emotions.forEach((emotion, index) => {
                const combinedIntensity = emotion.intensity * (1 + Math.abs(emotion.emotion));
                if (combinedIntensity > maxIntensity) {
                    maxIntensity = combinedIntensity;
                    maxIntensityIndex = index;
                }
            });
            
            return {
                position: maxIntensityIndex,
                emotion: emotions[maxIntensityIndex].emotion,
                intensity: emotions[maxIntensityIndex].intensity,
                text: emotions[maxIntensityIndex].text
            };
        }
        
        enhancedSemanticClustering(words, text) {
            const clusters = [];
            const wordPositions = {};
            
            words.forEach((word, index) => {
                if (!wordPositions[word]) {
                    wordPositions[word] = [];
                }
                wordPositions[word].push(index);
            });
            
            const visited = new Set();
            const semanticGroups = this.psychologicalModels.bigFivePersonality.emotionalCorrelations;
            
            for (const [group, relatedWords] of Object.entries(semanticGroups)) {
                const groupWords = words.filter(word => 
                    relatedWords.some(rw => word.includes(rw) || rw.includes(word))
                );
                
                if (groupWords.length > 1) {
                    clusters.push({
                        group: group,
                        words: [...new Set(groupWords)],
                        size: groupWords.length,
                        density: groupWords.length / words.length,
                        positions: groupWords.flatMap(word => wordPositions[word] || [])
                    });
                }
            }
            
            const coOccurrenceClusters = this.findCoOccurrenceClusters(words, wordPositions);
            clusters.push(...coOccurrenceClusters);
            
            const themeClusters = this.createThemeClusters(words);
            clusters.push(...themeClusters);
            
            return clusters.slice(0, 10); // Limit to 10 clusters
        }
        
        findCoOccurrenceClusters(words, wordPositions) {
            const clusters = [];
            const windowSize = 5;
            
            for (let i = 0; i < words.length - windowSize; i++) {
                const window = words.slice(i, i + windowSize);
                const uniqueWords = [...new Set(window)];
                
                if (uniqueWords.length >= 3) {
                    let coOccurrenceScore = 0;
                    uniqueWords.forEach(word => {
                        const positions = wordPositions[word] || [];
                        const inWindow = positions.filter(pos => 
                            pos >= i && pos < i + windowSize
                        ).length;
                        coOccurrenceScore += inWindow;
                    });
                    
                    if (coOccurrenceScore > windowSize * 2) {
                        clusters.push({
                            type: 'co-occurrence',
                            words: uniqueWords,
                            window: windowSize,
                            start: i,
                            score: coOccurrenceScore
                        });
                    }
                }
            }
            
            return clusters;
        }
        
        createThemeClusters(words) {
            const themes = {
                nature: ['солнце', 'луна', 'звезда', 'небо', 'земля', 'вода', 'огонь', 'ветер', 'дерево', 'цветок', 'sun', 'moon', 'star', 'sky', 'earth', 'water', 'fire', 'wind', 'tree', 'flower'],
                human: ['человек', 'люди', 'жизнь', 'смерть', 'душа', 'тело', 'разум', 'сердце', 'man', 'people', 'life', 'death', 'soul', 'body', 'mind', 'heart'],
                emotion: ['любовь', 'ненависть', 'радость', 'грусть', 'страх', 'гнев', 'love', 'hate', 'joy', 'sadness', 'fear', 'anger'],
                time: ['время', 'прошлое', 'настоящее', 'будущее', 'вечность', 'мгновение', 'time', 'past', 'present', 'future', 'eternity', 'moment']
            };
            
            const clusters = [];
            
            for (const [theme, themeWords] of Object.entries(themes)) {
                const foundWords = words.filter(word => 
                    themeWords.includes(word.toLowerCase())
                );
                
                if (foundWords.length > 0) {
                    clusters.push({
                        theme: theme,
                        words: [...new Set(foundWords)],
                        count: foundWords.length,
                        percentage: foundWords.length / words.length
                    });
                }
            }
            
            return clusters;
        }
        
        multiDimensionalThematicAnalysis(words, sentences) {
            const dimensions = {
                temporal: this.analyzeTemporalDimension(words),
                spatial: this.analyzeSpatialDimension(words),
                social: this.analyzeSocialDimension(words),
                existential: this.analyzeExistentialDimension(words),
                aesthetic: this.analyzeAestheticDimension(words)
            };
            
            const dimensionScores = Object.entries(dimensions).map(([dim, data]) => ({
                dimension: dim,
                score: data.score
            }));
            
            dimensionScores.sort((a, b) => b.score - a.score);
            const dominantDimension = dimensionScores[0].dimension;
            
            const thematicEvolution = this.analyzeThematicEvolution(sentences);
            
            return {
                dimensions: dimensions,
                dominant: dominantDimension,
                evolution: thematicEvolution,
                complexity: this.calculateThematicComplexity(dimensions),
                coherence: this.calculateThematicCoherence(dimensions)
            };
        }
        
        analyzeTemporalDimension(words) {
            const temporalMarkers = {
                past: ['вчера', 'раньше', 'прошлое', 'был', 'была', 'yesterday', 'before', 'past', 'was', 'were'],
                present: ['сейчас', 'теперь', 'сегодня', 'now', 'today', 'present'],
                future: ['завтра', 'потом', 'будущее', 'скоро', 'tomorrow', 'future', 'soon', 'will']
            };
            
            let score = 0;
            const foundMarkers = {};
            
            for (const [tense, markers] of Object.entries(temporalMarkers)) {
                const count = markers.filter(marker => 
                    words.some(word => word.toLowerCase().includes(marker))
                ).length;
                
                if (count > 0) {
                    foundMarkers[tense] = count;
                    score += count;
                }
            }
            
            return {
                score: score / words.length,
                markers: foundMarkers,
                temporalFocus: this.determineTemporalFocus(foundMarkers)
            };
        }
        
        determineTemporalFocus(markers) {
            const entries = Object.entries(markers);
            if (entries.length === 0) return 'timeless';
            
            entries.sort((a, b) => b[1] - a[1]);
            return entries[0][0];
        }
        
        analyzeSpatialDimension(words) {
            const spatialWords = [
                'пространство', 'место', 'здесь', 'там', 'везде', 'нигде', 'space', 'place', 'here', 'there', 'everywhere', 'nowhere',
                'близко', 'далеко', 'высоко', 'низко', 'close', 'far', 'high', 'low'
            ];
            
            const count = spatialWords.filter(spatial => 
                words.some(word => word.toLowerCase().includes(spatial))
            ).length;
            
            return {
                score: count / words.length,
                spatialReferences: count,
                spatialDensity: count / (words.length || 1)
            };
        }
        
        analyzeSocialDimension(words) {
            const socialWords = {
                relationships: ['друг', 'враг', 'семья', 'общество', 'friend', 'enemy', 'family', 'society'],
                communication: ['говор', 'слово', 'молчание', 'speech', 'word', 'silence'],
                power: ['власть', 'сила', 'контроль', 'power', 'strength', 'control']
            };
            
            let totalScore = 0;
            const categoryScores = {};
            
            for (const [category, categoryWords] of Object.entries(socialWords)) {
                const count = categoryWords.filter(word => 
                    words.some(w => w.toLowerCase().includes(word))
                ).length;
                
                categoryScores[category] = count;
                totalScore += count;
            }
            
            return {
                score: totalScore / words.length,
                categories: categoryScores,
                socialIntensity: totalScore / (words.length || 1)
            };
        }
        
        analyzeExistentialDimension(words) {
            const existentialWords = [
                'жизнь', 'смерть', 'смысл', 'цель', 'существование', 'life', 'death', 'meaning', 'purpose', 'existence',
                'бытие', 'ничто', 'вечность', 'being', 'nothingness', 'eternity'
            ];
            
            const count = existentialWords.filter(word => 
                words.some(w => w.toLowerCase().includes(word))
            ).length;
            
            return {
                score: count / words.length,
                existentialThemes: count,
                existentialDepth: count > 0 ? 1 : 0
            };
        }
        
        analyzeAestheticDimension(words) {
            const aestheticWords = [
                'красота', 'гармония', 'искусство', 'творчество', 'beauty', 'harmony', 'art', 'creativity',
                'форма', 'цвет', 'звук', 'форма', 'form', 'color', 'sound', 'shape'
            ];
            
            const count = aestheticWords.filter(word => 
                words.some(w => w.toLowerCase().includes(word))
            ).length;
            
            return {
                score: count / words.length,
                aestheticReferences: count,
                aestheticSensitivity: count > 0 ? 1 : 0
            };
        }
        
        analyzeThematicEvolution(sentences) {
            if (sentences.length < 2) return { stable: true, transitions: [] };
            
            const sentenceThemes = sentences.map(sentence => {
                const text = typeof sentence === 'object' ? sentence.text : sentence;
                const words = this.enhancedTokenization(text);
                return this.extractSentenceTheme(words);
            });
            
            const transitions = [];
            for (let i = 1; i < sentenceThemes.length; i++) {
                if (sentenceThemes[i] !== sentenceThemes[i-1]) {
                    transitions.push({
                        from: sentenceThemes[i-1],
                        to: sentenceThemes[i],
                        position: i
                    });
                }
            }
            
            return {
                themes: sentenceThemes,
                transitions: transitions,
                stability: 1 - (transitions.length / (sentenceThemes.length - 1)),
                dominantTheme: this.findDominantTheme(sentenceThemes)
            };
        }
        
        extractSentenceTheme(words) {
            const themeScores = {
                nature: words.filter(w => this.isNatureWord(w)).length,
                human: words.filter(w => this.isHumanWord(w)).length,
                abstract: words.filter(w => this.isAbstractWord(w)).length,
                emotional: words.filter(w => this.isEmotionalWord(w)).length
            };
            
            const maxScore = Math.max(...Object.values(themeScores));
            if (maxScore === 0) return 'neutral';
            
            for (const [theme, score] of Object.entries(themeScores)) {
                if (score === maxScore) return theme;
            }
            
            return 'mixed';
        }
        
        isNatureWord(word) {
            const natureWords = ['солнце', 'луна', 'небо', 'земля', 'вода', 'огонь', 'ветер', 'дерево', 'цветок', 'sun', 'moon', 'sky', 'earth', 'water', 'fire', 'wind', 'tree', 'flower'];
            return natureWords.some(nw => word.includes(nw));
        }
        
        isHumanWord(word) {
            const humanWords = ['человек', 'люди', 'жизнь', 'смерть', 'душа', 'тело', 'разум', 'сердце', 'man', 'people', 'life', 'death', 'soul', 'body', 'mind', 'heart'];
            return humanWords.some(hw => word.includes(hw));
        }
        
        isAbstractWord(word) {
            const abstractWords = ['время', 'пространство', 'идея', 'мысль', 'чувство', 'эмоция', 'time', 'space', 'idea', 'thought', 'feeling', 'emotion'];
            return abstractWords.some(aw => word.includes(aw));
        }
        
        isEmotionalWord(word) {
            for (const categoryWords of Object.values(this.dictionaries[this.language])) {
                if (categoryWords.includes(word)) {
                    return true;
                }
            }
            return false;
        }
        
        findDominantTheme(themes) {
            const themeCounts = {};
            themes.forEach(theme => {
                themeCounts[theme] = (themeCounts[theme] || 0) + 1;
            });
            
            let maxCount = 0;
            let dominant = 'mixed';
            
            for (const [theme, count] of Object.entries(themeCounts)) {
                if (count > maxCount) {
                    maxCount = count;
                    dominant = theme;
                }
            }
            
            return dominant;
        }
        
        calculateThematicComplexity(dimensions) {
            const activeDimensions = Object.values(dimensions)
                .filter(dim => dim.score > 0)
                .length;
            
            return activeDimensions / Object.keys(dimensions).length;
        }
        
        calculateThematicCoherence(dimensions) {
            const scores = Object.values(dimensions).map(dim => dim.score);
            const variance = this.calculateVariance(scores);
            
            return 1 - Math.min(1, variance * 10);
        }
        
        analyzeSemanticRelations(words) {
            const relations = {
                synonyms: this.findSemanticRelations(words, 'synonym'),
                antonyms: this.findSemanticRelations(words, 'antonym'),
                hierarchies: this.findHierarchicalRelations(words),
                associations: this.findAssociativeRelations(words)
            };
            
            return {
                types: relations,
                density: this.calculateRelationDensity(relations, words.length),
                complexity: this.calculateRelationComplexity(relations)
            };
        }
        
        findSemanticRelations(words, type) {
            const semanticGroups = {
                synonym: [
                    ['счастье', 'радость', 'восторг'],
                    ['грусть', 'печаль', 'тоска'],
                    ['love', 'affection', 'adoration'],
                    ['hate', 'anger', 'rage']
                ],
                antonym: [
                    ['счастье', 'грусть'],
                    ['любовь', 'ненависть'],
                    ['joy', 'sadness'],
                    ['love', 'hate']
                ]
            };
            
            const groups = semanticGroups[type] || [];
            const foundGroups = [];
            
            groups.forEach(group => {
                const foundWords = group.filter(word => 
                    words.some(w => w.toLowerCase().includes(word))
                );
                
                if (foundWords.length >= 2) {
                    foundGroups.push({
                        words: foundWords,
                        strength: foundWords.length / group.length
                    });
                }
            });
            
            return foundGroups;
        }
        
        findHierarchicalRelations(words) {
            const hierarchies = [
                { general: 'эмоция', specific: ['радость', 'грусть', 'гнев'] },
                { general: 'emotion', specific: ['joy', 'sadness', 'anger'] },
                { general: 'человек', specific: ['мужчина', 'женщина', 'ребенок'] },
                { general: 'human', specific: ['man', 'woman', 'child'] }
            ];
            
            const foundHierarchies = [];
            
            hierarchies.forEach(hierarchy => {
                const generalFound = words.some(w => w.includes(hierarchy.general));
                const specificFound = hierarchy.specific.filter(spec => 
                    words.some(w => w.includes(spec))
                );
                
                if (generalFound && specificFound.length > 0) {
                    foundHierarchies.push({
                        general: hierarchy.general,
                        specific: specificFound,
                        completeness: specificFound.length / hierarchy.specific.length
                    });
                }
            });
            
            return foundHierarchies;
        }
        
        findAssociativeRelations(words) {
            const associations = [];
            const wordSet = new Set(words);
            
            const commonAssociations = [
                ['солнце', 'свет', 'тепло'],
                ['луна', 'ночь', 'звезды'],
                ['дождь', 'туча', 'небо'],
                ['sun', 'light', 'warmth'],
                ['moon', 'night', 'stars'],
                ['rain', 'cloud', 'sky']
            ];
            
            commonAssociations.forEach(association => {
                const found = association.filter(word => wordSet.has(word));
                if (found.length >= 2) {
                    associations.push({
                        words: found,
                        strength: found.length / association.length
                    });
                }
            });
            
            return associations;
        }
        
        calculateRelationDensity(relations, totalWords) {
            let totalRelations = 0;
            
            for (const relationType of Object.values(relations)) {
                if (Array.isArray(relationType)) {
                    totalRelations += relationType.length;
                }
            }
            
            return totalWords > 0 ? totalRelations / totalWords : 0;
        }
        
        calculateRelationComplexity(relations) {
            let complexity = 0;
            
            for (const [type, relationList] of Object.entries(relations)) {
                if (Array.isArray(relationList)) {
                    complexity += relationList.length * this.getRelationTypeWeight(type);
                }
            }
            
            return complexity;
        }
        
        getRelationTypeWeight(type) {
            const weights = {
                synonyms: 0.3,
                antonyms: 0.4,
                hierarchies: 0.5,
                associations: 0.2
            };
            
            return weights[type] || 0.1;
        }
        
        calculateAbstractionLevel(words) {
            const abstractWords = [
                'время', 'пространство', 'идея', 'мысль', 'чувство', 'эмоция', 'философия',
                'time', 'space', 'idea', 'thought', 'feeling', 'emotion', 'philosophy'
            ];
            
            const concreteWords = [
                'стол', 'стул', 'дом', 'машина', 'книга', 'ручка',
                'table', 'chair', 'house', 'car', 'book', 'pen'
            ];
            
            const abstractCount = abstractWords.filter(word => 
                words.some(w => w.includes(word))
            ).length;
            
            const concreteCount = concreteWords.filter(word => 
                words.some(w => w.includes(word))
            ).length;
            
            const total = abstractCount + concreteCount;
            
            return {
                abstract: total > 0 ? abstractCount / total : 0,
                concrete: total > 0 ? concreteCount / total : 0,
                level: total > 0 ? abstractCount / total : 0.5,
                description: this.getAbstractionDescription(abstractCount, concreteCount)
            };
        }
        
        getAbstractionDescription(abstract, concrete) {
            const ratio = concrete > 0 ? abstract / concrete : abstract > 0 ? 2 : 0;
            
            if (ratio > 1.5) return 'highly abstract';
            if (ratio > 1) return 'abstract';
            if (ratio > 0.5) return 'balanced';
            if (ratio > 0) return 'concrete';
            return 'highly concrete';
        }
        
        calculateEnhancedSemanticRichness(words, uniqueWords) {
            if (words.length === 0) return 0;
            
            const uniqueRatio = uniqueWords.length / words.length;
            const avgWordLength = words.reduce((sum, w) => sum + w.length, 0) / words.length;
            const longWords = words.filter(w => w.length > 7).length / words.length;
            
            return (uniqueRatio * 0.4) + (Math.log(avgWordLength + 1) * 0.3) + (longWords * 0.3);
        }
        
        calculateSemanticCoherence(sentences) {
            if (sentences.length < 2) return 1;
            
            let coherence = 0;
            
            for (let i = 1; i < sentences.length; i++) {
                const prev = typeof sentences[i-1] === 'object' ? sentences[i-1].text : sentences[i-1];
                const curr = typeof sentences[i] === 'object' ? sentences[i].text : sentences[i];
                
                const prevWords = this.enhancedTokenization(prev);
                const currWords = this.enhancedTokenization(curr);
                
                const overlap = prevWords.filter(w => currWords.includes(w)).length;
                const maxWords = Math.max(prevWords.length, currWords.length);
                
                coherence += maxWords > 0 ? overlap / maxWords : 0;
            }
            
            return coherence / (sentences.length - 1);
        }

        calculatePsychologicalDimensionScore(psychological) {
            const factors = [
              psychological.psychologicalComplexity || 0,
              (psychological.selfAwarenessLevel && psychological.selfAwarenessLevel.score) || 0,
              (psychological.plutchik && psychological.plutchik.emotionalDiversity) || 0,
              (psychological.bigFive && psychological.bigFive.complexity) || 0
            ];
            const validFactors = factors.filter(f => f > 0);
            if (validFactors.length === 0) return 0.5;
            return Math.min(1, validFactors.reduce((a, b) => a + b, 0) / validFactors.length);
        }
        
        psychologicalAnalysis(data) {
            const text = data.cleaned;
            const words = data.words;
            const sentences = data.sentences;
            
            const plutchikAnalysis = this.analyzePlutchikEmotions(words);
            
            const maslowAnalysis = this.analyzeMaslowNeeds(text);
            
            const bigFiveAnalysis = this.analyzeBigFiveTraits(text);
            
            const emotionalIntelligence = this.assessEmotionalIntelligence(text);
            
            const defenseMechanisms = this.detectDefenseMechanisms(text);
            
            return {
                plutchik: plutchikAnalysis,
                maslow: maslowAnalysis,
                bigFive: bigFiveAnalysis,
                emotionalIntelligence: emotionalIntelligence,
                defenseMechanisms: defenseMechanisms,
                psychologicalComplexity: this.calculatePsychologicalComplexity(
                    plutchikAnalysis, maslowAnalysis, bigFiveAnalysis
                ),
                selfAwarenessLevel: this.assessSelfAwareness(text)
            };
        }
        
        analyzePlutchikEmotions(words) {
            const plutchik = this.psychologicalModels.plutchikWheel;
            const emotions = {};
            
            const plutchikMapping = {
                joy: ['joy', 'ecstasy', 'happiness'],
                trust: ['trust', 'faith', 'hope'],
                fear: ['fear', 'anxiety', 'worry'],
                surprise: ['surprise', 'astonishment', 'amazement'],
                sadness: ['sadness', 'grief', 'sorrow'],
                disgust: ['disgust', 'revulsion', 'contempt'],
                anger: ['anger', 'rage', 'fury'],
                anticipation: ['anticipation', 'expectation', 'curiosity']
            };
            
            for (const [plutchikEmotion, ourCategories] of Object.entries(plutchikMapping)) {
                let intensity = 0;
                let count = 0;
                
                ourCategories.forEach(category => {
                    if (this.dictionaries[this.language][category]) {
                        const found = this.dictionaries[this.language][category].filter(word => 
                            words.includes(word)
                        ).length;
                        intensity += found;
                        count += found > 0 ? 1 : 0;
                    }
                });
                
                if (count > 0) {
                    emotions[plutchikEmotion] = {
                        intensity: intensity / (words.length || 1),
                        presence: count > 0,
                        weightedIntensity: intensity * 2 / (words.length || 1)
                    };
                }
            }
            
            const primaryEmotion = this.findPrimaryPlutchikEmotion(emotions);
            
            const combinations = this.calculatePlutchikCombinations(emotions);
            
            return {
                basicEmotions: emotions,
                primary: primaryEmotion,
                combinations: combinations,
                emotionalDiversity: Object.keys(emotions).length / 8, // 8 basic emotions
                emotionalIntensity: this.calculatePlutchikIntensity(emotions)
            };
        }
        
        findPrimaryPlutchikEmotion(emotions) {
            let maxIntensity = 0;
            let primary = 'neutral';
            
            for (const [emotion, data] of Object.entries(emotions)) {
                if (data.intensity > maxIntensity) {
                    maxIntensity = data.intensity;
                    primary = emotion;
                }
            }
            
            return {
                emotion: primary,
                intensity: maxIntensity,
                confidence: maxIntensity > 0.05 ? 0.8 : 0.3
            };
        }
        
        calculatePlutchikCombinations(emotions) {
            const combinations = [];
            const plutchik = this.psychologicalModels.plutchikWheel;
            
            for (const [combo, result] of Object.entries(plutchik.combinations)) {
                const [emotion1, emotion2] = combo.split(' + ');
                
                if (emotions[emotion1] && emotions[emotion2]) {
                    const intensity = (emotions[emotion1].intensity + emotions[emotion2].intensity) / 2;
                    
                    combinations.push({
                        combination: combo,
                        result: result,
                        intensity: intensity,
                        completeness: intensity > 0.02 ? 'present' : 'hint'
                    });
                }
            }
            
            return combinations;
        }
        
        calculatePlutchikIntensity(emotions) {
            if (Object.keys(emotions).length === 0) return 0;
            const intensities = Object.values(emotions).map(e => e.weightedIntensity || e.intensity);
            const maxIntensity = Math.max(...intensities);
            const avgIntensity = intensities.reduce((a, b) => a + b, 0) / intensities.length;
            const stdDev = Math.sqrt(
                intensities.reduce((sum, val) => sum + Math.pow(val - avgIntensity, 2), 0) / intensities.length
            );
            const concentration = maxIntensity / (avgIntensity + 0.001);
            return Math.min(1, (avgIntensity * 0.6 + maxIntensity * 0.3 + (1 - stdDev) * 0.1) * concentration);
        }
        
        analyzeMaslowNeeds(text) {
            const maslow = this.psychologicalModels.maslowHierarchy;
            const needs = {};
            
            for (const level of maslow.levels) {
                const themes = maslow.emotionalThemes[level];
                let score = 0;
                const foundThemes = [];
                
                themes.forEach(theme => {
                    const regex = new RegExp(`\\b${theme}\\b`, 'gi');
                    const matches = text.match(regex);
                    if (matches) {
                        score += matches.length * 0.1;
                        foundThemes.push(theme);
                    }
                });
                
                if (score > 0) {
                    needs[level] = {
                        score: Math.min(1, score),
                        themes: foundThemes,
                        intensity: score / themes.length
                    };
                }
            }
            
            const dominantLevel = this.findDominantMaslowLevel(needs);
            
            const hierarchyCompletion = this.calculateHierarchyCompletion(needs);
            
            return {
                needs: needs,
                dominant: dominantLevel,
                hierarchyCompletion: hierarchyCompletion,
                needComplexity: Object.keys(needs).length / maslow.levels.length
            };
        }
        
        findDominantMaslowLevel(needs) {
            let maxScore = 0;
            let dominant = 'self-actualization'; // default highest level
            
            for (const [level, data] of Object.entries(needs)) {
                if (data.score > maxScore) {
                    maxScore = data.score;
                    dominant = level;
                }
            }
            
            return {
                level: dominant,
                score: maxScore,
                description: this.getMaslowLevelDescription(dominant)
            };
        }
        
        getMaslowLevelDescription(level) {
            const descriptions = {
                'physiological': 'Basic survival needs',
                'safety': 'Security and stability',
                'love/belonging': 'Social connections',
                'esteem': 'Recognition and respect',
                'self-actualization': 'Personal growth and fulfillment'
            };
            
            return descriptions[level] || 'Personal development';
        }
        
        calculateHierarchyCompletion(needs) {
            const levels = ['physiological', 'safety', 'love/belonging', 'esteem', 'self-actualization'];
            let completed = 0;
            
            levels.forEach(level => {
                if (needs[level] && needs[level].score > 0.1) {
                    completed++;
                }
            });
            
            return completed / levels.length;
        }
        
        analyzeBigFiveTraits(text) {
            const bigFive = this.psychologicalModels.bigFivePersonality;
            const traits = {};
            
            for (const trait of bigFive.traits) {
                const correlations = bigFive.emotionalCorrelations[trait];
                let score = 0;
                const indicators = [];
                
                correlations.forEach(indicator => {
                    const regex = new RegExp(`\\b${indicator}\\b`, 'gi');
                    const matches = text.match(regex);
                    if (matches) {
                        score += matches.length * 0.05;
                        indicators.push(indicator);
                    }
                });
                
                if (score > 0) {
                    traits[trait] = {
                        score: Math.min(1, score),
                        indicators: indicators,
                        level: this.getBigFiveLevel(score)
                    };
                }
            }
            
            const profile = this.createBigFiveProfile(traits);
            
            return {
                traits: traits,
                profile: profile,
                complexity: this.calculatePersonalityComplexity(traits)
            };
        }
        
        getBigFiveLevel(score) {
            if (score > 0.7) return 'high';
            if (score > 0.4) return 'medium';
            return 'low';
        }
        
        createBigFiveProfile(traits) {
            const profile = {
                type: 'balanced',
                dominantTraits: [],
                complementaryTraits: []
            };
            
            const traitEntries = Object.entries(traits);
            if (traitEntries.length === 0) return profile;
            
            traitEntries.sort((a, b) => b[1].score - a[1].score);
            
            profile.dominantTraits = traitEntries.slice(0, 2).map(([trait, data]) => trait);
            
            if (profile.dominantTraits.includes('extraversion') && profile.dominantTraits.includes('agreeableness')) {
                profile.type = 'sociable';
            } else if (profile.dominantTraits.includes('openness') && profile.dominantTraits.includes('neuroticism')) {
                profile.type = 'sensitive';
            } else if (profile.dominantTraits.includes('conscientiousness') && profile.dominantTraits.includes('agreeableness')) {
                profile.type = 'responsible';
            }
            
            return profile;
        }
        
        calculatePersonalityComplexity(traits) {
            const scores = Object.values(traits).map(t => t.score);
            if (scores.length === 0) return 0;
            
            const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
            const variance = this.calculateVariance(scores);
            
            return (scores.length / 5) * (1 - Math.abs(avgScore - 0.5)) * (1 + variance);
        }
        
        assessEmotionalIntelligence(text) {
            const indicators = {
                selfAwareness: ['осознаю', 'понимаю свои', 'чувствую что', 'i feel', 'i understand', 'i realize'],
                empathy: ['понимаю тебя', 'чувствую твою', 'сочувствую', 'i understand you', 'i feel your', 'empathy'],
                emotionalRegulation: ['контролирую', 'управляю эмоциями', 'сохраняю спокойствие', 'control', 'manage emotions', 'stay calm'],
                socialSkills: ['общаюсь', 'взаимодействую', 'понимаю других', 'communicate', 'interact', 'understand others']
            };
            
            const scores = {};
            let totalScore = 0;
            
            for (const [component, phrases] of Object.entries(indicators)) {
                let componentScore = 0;
                
                phrases.forEach(phrase => {
                    const regex = new RegExp(phrase, 'gi');
                    const matches = text.match(regex);
                    if (matches) {
                        componentScore += matches.length * 0.1;
                    }
                });
                
                scores[component] = Math.min(1, componentScore);
                totalScore += componentScore;
            }
            
            const avgScore = totalScore / Object.keys(indicators).length;
            
            return {
                components: scores,
                overall: avgScore,
                level: this.getEILevel(avgScore),
                strengths: this.findEIStrengths(scores)
            };
        }
        
        getEILevel(score) {
            if (score > 0.7) return 'high';
            if (score > 0.4) return 'moderate';
            return 'developing';
        }
        
        findEIStrengths(scores) {
            const strengths = [];
            for (const [component, score] of Object.entries(scores)) {
                if (score > 0.5) {
                    strengths.push(component);
                }
            }
            return strengths;
        }
        
        detectDefenseMechanisms(text) {
            const mechanisms = {
                denial: ['нет проблемы', 'всё хорошо', 'ничего страшного', 'no problem', 'everything is fine', 'nothing wrong'],
                projection: ['ты сам', 'это ты', 'все вокруг', 'you are', 'it\'s you', 'everyone else'],
                rationalization: ['потому что', 'поэтому', 'так получилось', 'because', 'therefore', 'it happened'],
                intellectualization: ['с теоретической точки', 'анализируя', 'рассматривая', 'from theoretical perspective', 'analyzing', 'considering'],
                displacement: ['злюсь на', 'раздражает', 'бесит', 'angry at', 'irritated by', 'annoyed by']
            };
            
            const detected = [];
            
            for (const [mechanism, phrases] of Object.entries(mechanisms)) {
                let count = 0;
                
                phrases.forEach(phrase => {
                    const regex = new RegExp(phrase, 'gi');
                    const matches = text.match(regex);
                    if (matches) {
                        count += matches.length;
                    }
                });
                
                if (count > 0) {
                    detected.push({
                        mechanism: mechanism,
                        frequency: count,
                        intensity: Math.min(1, count * 0.2)
                    });
                }
            }
            
            return {
                mechanisms: detected,
                total: detected.length,
                overallIntensity: detected.reduce((sum, m) => sum + m.intensity, 0) / (detected.length || 1),
                primaryMechanism: detected.length > 0 ? 
                    detected.sort((a, b) => b.intensity - a.intensity)[0].mechanism : 'none'
            };
        }
        
        calculatePsychologicalComplexity(plutchik, maslow, bigFive) {
            const factors = [
                plutchik.emotionalDiversity * 0.4,
                maslow.needComplexity * 0.3,
                bigFive.complexity * 0.3
            ];
            const weightedSum = factors.reduce((a, b) => a + b, 0);
            const diversityBonus = Math.min(0.2, (plutchik.emotionalDiversity + maslow.needComplexity + bigFive.complexity) / 15);
            const nonLinearity = Math.pow(weightedSum, 1.2);
            return Math.min(1, nonLinearity + diversityBonus);
        }
        
        assessSelfAwareness(text) {
            const selfReflectionMarkers = ['я думаю', 'я чувствую', 'я осознаю', 'i think', 'i feel', 'i realize'];
            const metacognitionMarkers = ['почему я', 'зачем я', 'что я чувствую', 'why do i', 'what do i feel'];
            
            let selfReflectionScore = 0;
            let metacognitionScore = 0;
            
            selfReflectionMarkers.forEach(marker => {
                const regex = new RegExp(marker, 'gi');
                const matches = text.match(regex);
                if (matches) selfReflectionScore += matches.length * 0.2;
            });
            
            metacognitionMarkers.forEach(marker => {
                const regex = new RegExp(marker, 'gi');
                const matches = text.match(regex);
                if (matches) metacognitionScore += matches.length * 0.3;
            });
            
            const totalScore = Math.min(1, selfReflectionScore + metacognitionScore);
            
            return {
                score: totalScore,
                selfReflection: Math.min(1, selfReflectionScore),
                metacognition: Math.min(1, metacognitionScore),
                level: totalScore > 0.6 ? 'high' : totalScore > 0.3 ? 'moderate' : 'low'
            };
        }
        
        deepIntegration(analyses) {
            const {
                lexical,
                syntactic,
                contextual,
                cultural,
                semantic,
                psychological,
                languageConfidence
            } = analyses;
            
            const dimensionScores = {
                lexical: this.calculateLexicalDimensionScore(lexical),
                syntactic: this.calculateSyntacticDimensionScore(syntactic),
                contextual: this.calculateContextualDimensionScore(contextual),
                cultural: this.calculateCulturalDimensionScore(cultural),
                semantic: this.calculateSemanticDimensionScore(semantic),
                psychological: this.calculatePsychologicalDimensionScore(psychological)
            };
            
            const weights = {
                lexical: 0.25,
                syntactic: 0.15,
                contextual: 0.20,
                cultural: 0.10,
                semantic: 0.15,
                psychological: 0.15
            };
            
            let totalScore = 0;
            for (const [dimension, weight] of Object.entries(weights)) {
                const score = dimensionScores[dimension] || 0;
                if (!isNaN(score)) {
                    totalScore += score * weight;
                }
            }
            
            const complexityScore = this.calculateOverallComplexity(analyses);
            
            const confidenceScore = this.calculateAnalysisConfidence(analyses, languageConfidence);
            
            const consistencyScore = this.calculateEmotionalConsistency(analyses);
            
            return {
                totalScore: totalScore,
                complexityScore: complexityScore,
                confidenceScore: confidenceScore,
                consistencyScore: consistencyScore,
                
                dimensionScores: dimensionScores,
                weightedScores: weights,
                
                dominantEmotion: this.findDominantEmotion(analyses),
                emotionalRange: this.calculateEmotionalRange(analyses),
                emotionalDepth: this.calculateEmotionalDepth(analyses),
                
                analysisCorrelations: this.calculateAnalysisCorrelations(analyses),
                integrationQuality: this.calculateIntegrationQuality(analyses)
            };
        }
        
        calculateLexicalDimensionScore(lexical) {
            const factors = [
                lexical.summary.lexicalDensity * 2,
                lexical.summary.categoryCount / 10,
                lexical.metrics.lexicalRichness * 1.5,
                lexical.intensityProfile.overall
            ];
            
            return Math.min(1, factors.reduce((a, b) => a + b, 0) / factors.length);
        }
        
        calculateSyntacticDimensionScore(syntactic) {
            const factors = [
                syntactic.complexity * 0.5,
                syntactic.punctuation.emotionalWeight / 10,
                1 - syntactic.rhythm.variability,
                syntactic.readability.fleschReadingEase / 100
            ];
            
            return Math.min(1, factors.reduce((a, b) => a + b, 0) / factors.length);
        }
        
        calculateContextualDimensionScore(contextual) {
            const factors = [
                0.5 + (contextual.overallScore / 2),
                contextual.coherence,
                1 - contextual.consistency.volatility
            ];
            
            return Math.min(1, Math.max(-1, factors.reduce((a, b) => a + b, 0) / factors.length));
        }
        
        calculateCulturalDimensionScore(cultural) {
            const factors = [
                cultural.scores.overall,
                cultural.culturalDensity * 10,
                cultural.culturalCoherence
            ];
            
            return Math.min(1, factors.reduce((a, b) => a + b, 0) / factors.length);
        }
        
        calculateSemanticDimensionScore(semantic) {
            const factors = [
                semantic.semanticRichness,
                semantic.abstraction.level,
                semantic.coherence,
                semantic.progression.metrics.avgComplexity
            ];
            
            return Math.min(1, factors.reduce((a, b) => a + b, 0) / factors.length);
        }
        
        calculateOverallComplexity(analyses) {
            const textFactors = [];
            const sentenceComplexity = analyses.syntactic?.sentenceStats?.complexity || 0;
            textFactors.push({ value: sentenceComplexity, weight: 0.25 });
            const readabilityGrade = analyses.syntactic?.readability?.fleschKincaidGrade || 0;
            const normalizedReadability = Math.min(1, readabilityGrade / 12);
            textFactors.push({ value: normalizedReadability, weight: 0.20 });
            const lexicalRichness = analyses.lexical?.metrics?.lexicalRichness || 0;
            textFactors.push({ value: lexicalRichness, weight: 0.20 });
            const syntacticDiversity = analyses.syntactic?.diversity || 0;
            textFactors.push({ value: syntacticDiversity, weight: 0.15 });
            const wordCount = analyses.lexical?.summary?.totalEmotionalWords || 0;
            const lengthFactor = wordCount > 0 ? Math.min(1, Math.log10(wordCount + 1) / 2.5) : 0;
            textFactors.push({ value: lengthFactor, weight: 0.15 });
            const sentenceLengthVariance = analyses.syntactic?.sentenceStats?.lengthVariance || 0;
            const normalizedVariance = Math.min(1, sentenceLengthVariance / 6);
            textFactors.push({ value: normalizedVariance, weight: 0.20 });
            const punctuationDensity = analyses.syntactic?.punctuation?.density || 0;
            textFactors.push({ value: Math.min(1, punctuationDensity * 4), weight: 0.15 });
            const coherence = analyses.syntactic?.coherence || 0;
            textFactors.push({ value: coherence, weight: 0.15 });
            const totalWeight = textFactors.reduce((sum, f) => sum + f.weight, 0);
            const weightedSum = textFactors.reduce((sum, f) => sum + f.value * f.weight, 0);
            const rawComplexity = totalWeight > 0 ? weightedSum / totalWeight : 0.5;
            const nonLinearComplexity = Math.pow(rawComplexity, 0.8);
            const finalComplexity = Math.min(0.99, Math.max(0.1, nonLinearComplexity));
            return Math.round(finalComplexity * 100) / 100;
        }
        
        calculateAnalysisConfidence(analyses, languageConfidence) {
            const confidenceFactors = [
                languageConfidence,
                analyses.lexical.summary.totalEmotionalWords > 5 ? 0.8 : 0.3,
                analyses.semantic.coherence,
                analyses.contextual.coherence,
                analyses.cultural.culturalCoherence
            ];
            
            return confidenceFactors.reduce((a, b) => a + b, 0) / confidenceFactors.length;
        }
        
        calculateEmotionalConsistency(analyses) {
            const consistencies = [];
            const lexicalProgression = analyses.lexical.temporal.overallTrend;
            const semanticProgression = analyses.semantic.progression.metrics.trend;
            const lexicalToSemantic = this.compareProgressions(lexicalProgression, semanticProgression);
            consistencies.push(lexicalToSemantic * 0.9);
            const contextualScore = analyses.contextual.overallScore;
            const psychologicalIntensity = analyses.psychological.plutchik.primary.intensity || 0;
            const contextualToPsychological = 1 - Math.min(1, Math.abs(contextualScore - psychologicalIntensity) / 2);
            consistencies.push(contextualToPsychological * 0.8);
            const culturalTheme = analyses.cultural.dominantCulturalTheme;
            const semanticTheme = analyses.semantic.thematic.dominant;
            const culturalToSemantic = culturalTheme === semanticTheme ? 1 : culturalTheme === 'none' || semanticTheme === 'neutral' ? 0.7 : 0.4;
            consistencies.push(culturalToSemantic * 0.7);
            const semanticCoherence = analyses.semantic.coherence || 0.5;
            const contextualCoherence = analyses.contextual.coherence || 0.5;
            const coherenceAlignment = 1 - Math.abs(semanticCoherence - contextualCoherence);
            consistencies.push(coherenceAlignment * 0.6);
            return Math.min(1, consistencies.reduce((a, b) => a + b, 0) / (0.9 + 0.8 + 0.7 + 0.6));
        }
        
        compareProgressions(prog1, prog2) {
            if (prog1 === prog2) return 1;
            
            const compatiblePairs = [
                ['positive', 'rising'],
                ['negative', 'falling'],
                ['neutral', 'stable']
            ];
            
            for (const [a, b] of compatiblePairs) {
                if ((prog1 === a && prog2 === b) || (prog1 === b && prog2 === a)) {
                    return 0.8;
                }
            }
            
            return 0.5;
        }
        
        findDominantEmotion(analyses) {
            const candidates = [];
            
            const lexicalDominant = analyses.lexical.summary.dominantCategory;
            if (lexicalDominant !== 'neutral') {
                candidates.push({
                    source: 'lexical',
                    emotion: lexicalDominant,
                    confidence: analyses.lexical.summary.lexicalDensity
                });
            }
            
            const plutchikDominant = analyses.psychological.plutchik.primary.emotion;
            if (plutchikDominant !== 'neutral') {
                candidates.push({
                    source: 'psychological',
                    emotion: plutchikDominant,
                    confidence: analyses.psychological.plutchik.primary.confidence
                });
            }
            
            const semanticDominant = analyses.semantic.progression.arc;
            if (semanticDominant !== 'flat') {
                candidates.push({
                    source: 'semantic',
                    emotion: this.mapArcToEmotion(semanticDominant),
                    confidence: analyses.semantic.progression.stability
                });
            }
            
            if (candidates.length === 0) {
                return {
                    emotion: 'neutral',
                    confidence: 0.5,
                    sources: []
                };
            }
            
            const emotionGroups = {};
            candidates.forEach(candidate => {
                if (!emotionGroups[candidate.emotion]) {
                    emotionGroups[candidate.emotion] = [];
                }
                emotionGroups[candidate.emotion].push(candidate);
            });
            
            let maxGroup = [];
            let dominantEmotion = 'neutral';
            
            for (const [emotion, group] of Object.entries(emotionGroups)) {
                if (group.length > maxGroup.length) {
                    maxGroup = group;
                    dominantEmotion = emotion;
                }
            }
            
            const confidence = maxGroup.reduce((sum, c) => sum + c.confidence, 0) / maxGroup.length;
            
            return {
                emotion: dominantEmotion,
                confidence: confidence,
                sources: maxGroup.map(g => g.source)
            };
        }
        
        mapArcToEmotion(arcType) {
            const mapping = {
                'rise_fall_rise': 'hopeful',
                'fall_rise_fall': 'resilient',
                'steady_rise': 'optimistic',
                'steady_fall': 'melancholic',
                'man_in_hole': 'troubled',
                'man_in_hole_rise': 'recovering'
            };
            
            return mapping[arcType] || 'complex';
        }
        
        calculateEmotionalRange(analyses) {
            const rangeFactors = [];
            const categoryCount = analyses.lexical?.summary?.categoryCount || 0;
            const normalizedCategories = Math.min(1, categoryCount / 20);
            rangeFactors.push({ value: normalizedCategories, weight: 0.30 });
            const lexicalDistribution = analyses.lexical?.metrics?.distribution || 0;
            rangeFactors.push({ value: lexicalDistribution, weight: 0.25 });
            const complexEmotions = ['ambivalence', 'bittersweet', 'nostalgiaMixed', 'irony', 'nostalgia'];
            const complexCount = complexEmotions.filter(cat => analyses.lexical?.categories?.[cat]).length;
            const complexRatio = complexCount / complexEmotions.length;
            rangeFactors.push({ value: complexRatio, weight: 0.25 });
            const progressionComplexity = analyses.semantic?.progression?.metrics?.avgComplexity || 0;
            rangeFactors.push({ value: progressionComplexity, weight: 0.20 });
            const plutchikDiversity = analyses.psychological?.plutchik?.emotionalDiversity || 0;
            rangeFactors.push({ value: plutchikDiversity, weight: 0.20 });
            const positiveCategories = ['ecstasy', 'joy', 'love', 'peace', 'hope', 'gratitude', 'inspiration', 'pride'];
            const negativeCategories = ['sadness', 'grief', 'anger', 'fear', 'disgust', 'shame', 'guilt', 'loneliness', 'envy', 'despair'];
            const positiveCount = positiveCategories.filter(cat => analyses.lexical?.categories?.[cat]).length;
            const negativeCount = negativeCategories.filter(cat => analyses.lexical?.categories?.[cat]).length;
            const balanceRatio = positiveCount > 0 && negativeCount > 0 ? 1 - Math.abs(positiveCount - negativeCount) / (positiveCount + negativeCount) : 0;
            rangeFactors.push({ value: balanceRatio, weight: 0.20 });
            const volatility = analyses.semantic?.progression?.metrics?.volatility || 0;
            rangeFactors.push({ value: volatility, weight: 0.20 });
            const totalWeight = rangeFactors.reduce((sum, f) => sum + f.weight, 0);
            const weightedSum = rangeFactors.reduce((sum, f) => sum + f.value * f.weight, 0);
            const rawRange = totalWeight > 0 ? weightedSum / totalWeight : 0.3;
            const nonLinearRange = Math.pow(rawRange, 1.1);
            const variance = this.calculateVariance(rangeFactors.map(f => f.value));
            const varianceBonus = Math.min(0.15, variance * 0.6);
            const finalRange = Math.min(0.99, Math.max(0.05, nonLinearRange * (1 + varianceBonus)));
            return Math.round(finalRange * 100) / 100;
        }
        
        calculateEmotionalDepth(analyses) {
                const depthFactors = [];
                
                const selfAwareness = analyses.psychological?.selfAwarenessLevel?.score || 0;
                depthFactors.push(selfAwareness * 0.30);
                
                const abstractionLevel = analyses.semantic?.abstraction?.level || 0;
                depthFactors.push(abstractionLevel * 0.25);
                
                const culturalDepth = analyses.cultural?.scores?.culturalDepth || 0;
                depthFactors.push(culturalDepth * 0.20);
                
                const semanticDepth = analyses.semantic?.progression?.metrics?.avgComplexity || 0;
                depthFactors.push(semanticDepth * 0.20);
                
                const psychologicalDepth = analyses.psychological?.maslow?.needComplexity || 0;
                depthFactors.push(psychologicalDepth * 0.15);
                
                const emotionalIntelligence = analyses.psychological?.emotionalIntelligence?.overall || 0;
                depthFactors.push(emotionalIntelligence * 0.15);
                
                const poeticPatterns = analyses.cultural?.references?.poetic?.count || 0;
                const poeticFactor = Math.min(0.2, poeticPatterns * 0.1);
                depthFactors.push(poeticFactor);
                
                const reflectionMarkers = analyses.psychological?.selfAwarenessLevel?.metacognition || 0;
                depthFactors.push(reflectionMarkers * 0.15);
                
                const validFactors = depthFactors.filter(f => 
                    !isNaN(f) && f !== undefined && f !== null && f >= 0
                );
                
                if (validFactors.length === 0) return 0.3;
                
                const rawDepth = validFactors.reduce((a, b) => a + b, 0) / validFactors.length;
                
                const depthWeighted = Math.pow(rawDepth, 0.6);
                
                const finalDepth = Math.min(0.99, Math.max(0.1, depthWeighted * 1.2));
                
                return Math.round(finalDepth * 100) / 100;
        }
        
        calculateAnalysisCorrelations(analyses) {
            const correlations = [];
            
            const dimensions = ['lexical', 'syntactic', 'contextual', 'cultural', 'semantic', 'psychological'];
            
            for (let i = 0; i < dimensions.length; i++) {
                for (let j = i + 1; j < dimensions.length; j++) {
                    const dim1 = dimensions[i];
                    const dim2 = dimensions[j];
                    
                    const score1 = analyses[dim1].summary ? 
                        analyses[dim1].summary.lexicalDensity || analyses[dim1].complexity || 0.5 : 0.5;
                    const score2 = analyses[dim2].summary ? 
                        analyses[dim2].summary.lexicalDensity || analyses[dim2].complexity || 0.5 : 0.5;
                    
                    const correlation = 1 - Math.abs(score1 - score2);
                    
                    correlations.push({
                        dimensions: `${dim1}-${dim2}`,
                        correlation: correlation,
                        strength: correlation > 0.7 ? 'strong' : correlation > 0.4 ? 'moderate' : 'weak'
                    });
                }
            }
            
            return correlations;
        }
        
        calculateIntegrationQuality(analyses) {
            const qualityFactors = [
                this.calculateAnalysisConfidence(analyses, 1), // max language confidence
                this.calculateEmotionalConsistency(analyses),
                analyses.semantic.coherence,
                analyses.contextual.coherence
            ];
            
            return qualityFactors.reduce((a, b) => a + b, 0) / qualityFactors.length;
        }
        
        calculateAdvancedEmotionProfile(integratedResult) {
                const totalScore = integratedResult.totalScore || 0;
                const complexityScore = integratedResult.complexityScore || 0;
                const confidenceScore = integratedResult.confidenceScore || 0;
                const consistencyScore = integratedResult.consistencyScore || 0;
                const dominantEmotion = integratedResult.dominantEmotion || { emotion: 'neutral', confidence: 0.5 };
                const emotionalRange = integratedResult.emotionalRange || 0.5;
                const emotionalDepth = integratedResult.emotionalDepth || 0.5;
                
                const primaryEmotion = this.classifyPrimaryEmotion(
                    dominantEmotion.emotion,
                    totalScore,
                    emotionalRange
                );
                
                const secondaryEmotions = this.identifySecondaryEmotions(integratedResult);
                
                const intensity = Math.max(0, Math.min(1, (
                    Math.abs(totalScore) * 0.4 +
                    emotionalRange * 0.3 +
                    dominantEmotion.confidence * 0.3
                )));
                
                const emotionComplexity = Math.max(0, Math.min(1, (
                    emotionalRange * 0.4 +          
                    emotionalDepth * 0.3 +          
                    integratedResult.dimensionScores.psychological * 0.3
                )));
                
                const ironyLevel = this.calculateIronyLevel(integratedResult);
                
                const polarity = Math.max(-1, Math.min(1, totalScore));
                
                const visualProfile = this.generateAdvancedVisualProfile(primaryEmotion, intensity, polarity, emotionComplexity);
                
                const behavioralProfile = this.generateAdvancedBehavioralProfile(primaryEmotion, intensity, emotionComplexity);
                
                const psychologicalIntegration = this.integratePsychologicalInsights(integratedResult);
                
                const narrativeArchetype = this.determineNarrativeArchetype(integratedResult);
                
                return {
                    primary: primaryEmotion,
                    polarity: polarity,
                    intensity: intensity,
                    complexity: emotionComplexity,
                    confidence: confidenceScore,
                    consistency: consistencyScore,
                    secondary: secondaryEmotions,
                    ironyLevel: ironyLevel,
                    emotionalRange: emotionalRange,
                    emotionalDepth: emotionalDepth,
                    visual: visualProfile,
                    behavioral: behavioralProfile,
                    psychological: psychologicalIntegration,
                    narrative: narrativeArchetype,
                    display: {
                        name: this.getAdvancedDisplayName(primaryEmotion, polarity, intensity, emotionComplexity),
                        description: this.getAdvancedDescription(primaryEmotion, polarity, intensity, emotionComplexity),
                        keywords: this.generateEmotionKeywords(primaryEmotion, secondaryEmotions)
                    },
                    meta: {
                        analysisDepth: 'advanced',
                        timestamp: new Date().toISOString(),
                        modelVersion: this.version
                    }
                };
        }
        
        classifyPrimaryEmotion(dominantEmotion, totalScore, emotionalRange, intensity) {
            const emotionMatrix = {
                positive: {
                    highIntensity: ['ecstatic', 'euphoric', 'exhilarated'],
                    mediumIntensity: ['joyful', 'happy', 'content'],
                    lowIntensity: ['pleased', 'satisfied', 'calm']
                },
                negative: {
                    highIntensity: ['enraged', 'despairing', 'terrified'],
                    mediumIntensity: ['angry', 'sad', 'anxious'],
                    lowIntensity: ['subdued', 'pensive', 'resigned']
                },
                complex: {
                    highComplexity: ['bittersweet', 'nostalgic', 'ambivalent'],
                    mediumComplexity: ['reflective', 'contemplative', 'mixed'],
                    lowComplexity: ['neutral', 'balanced', 'detached']
                }
            };
            
            let category = 'complex';
            if (totalScore > 0.3) category = 'positive';
            else if (totalScore < -0.3) category = 'negative';
            let level = 'mediumIntensity';
            if (intensity > 0.7) level = 'highIntensity';
            else if (intensity < 0.3) level = 'lowIntensity';
            if (Math.abs(totalScore) < 0.2 && emotionalRange > 0.4) {
                category = 'complex';
                level = emotionalRange > 0.6 ? 'highComplexity' : 
                       emotionalRange > 0.3 ? 'mediumComplexity' : 'lowComplexity';
            }
            const emotions = emotionMatrix[category]?.[level] || ['balanced'];
            const emotionMapping = {
                'ecstasy': 'ecstatic',
                'joy': 'joyful',
                'love': 'content',
                'peace': 'calm',
                'sadness': 'sad',
                'grief': 'despairing',
                'anger': 'angry',
                'fear': 'anxious',
                'surprise': 'exhilarated'
            };
            
            if (dominantEmotion !== 'neutral' && emotionMapping[dominantEmotion]) {
                return emotionMapping[dominantEmotion];
            }
            return emotions[0];
        }
        
        identifySecondaryEmotions(integratedResult) {
            const secondary = [];
            
            if (integratedResult.complexityScore > 0.7) {
                secondary.push('complex');
            }
            
            if (integratedResult.emotionalRange > 0.6) {
                secondary.push('intense');
            } else if (integratedResult.emotionalRange < 0.3) {
                secondary.push('subtle');
            }
            
            if (integratedResult.consistencyScore > 0.8) {
                secondary.push('consistent');
            } else if (integratedResult.consistencyScore < 0.5) {
                secondary.push('volatile');
            }
            
            const { emotion } = integratedResult.dominantEmotion;
            if (['joy', 'ecstasy', 'love'].includes(emotion)) {
                secondary.push('warm');
            } else if (['sadness', 'grief', 'loneliness'].includes(emotion)) {
                secondary.push('cool');
            } else if (['anger', 'fear', 'anxiety'].includes(emotion)) {
                secondary.push('tense');
            }
            
            return [...new Set(secondary)].slice(0, 5);
        }
        
        calculateOverallIntensity(integratedResult) {
            const intensityFactors = [
                Math.abs(integratedResult.totalScore) * 2,
                integratedResult.emotionalRange,
                integratedResult.dominantEmotion.confidence
            ];
            
            return Math.min(1, intensityFactors.reduce((a, b) => a + b, 0) / intensityFactors.length);
        }
        
        generateColorPalette(tone, intensity, polarity) {
            const colorMappings = {
                ecstasy: ['#FF3366', '#FF0066', '#FF66CC', '#FF3399'],
                joy: ['#FF9900', '#FFCC00', '#FF6600', '#FF9933'],
                happy: ['#FF9900', '#FFCC00', '#FF6600', '#FF9933'],
                love: ['#FF66CC', '#FF3399', '#FF99CC', '#FF66FF'],
                peace: ['#6699FF', '#3366CC', '#99CCFF', '#6699CC'],
                hope: ['#66FF99', '#33FF66', '#99FFCC', '#66FFCC'],
                sadness: ['#666699', '#333366', '#9999CC', '#6666CC'],
                sad: ['#666699', '#333366', '#9999CC', '#6666CC'],
                anger: ['#CC0000', '#990000', '#FF3333', '#CC3333'],
                angry: ['#CC0000', '#990000', '#FF3333', '#CC3333'],
                fear: ['#6600CC', '#330099', '#9966FF', '#6600FF'],
                disgust: ['#669933', '#336600', '#99CC66', '#669966'],
                nostalgia: ['#CC9966', '#996633', '#FFCC99', '#CC9933'],
                bittersweet: ['#9933CC', '#33CC99', '#CC9933', '#3399CC'],
                ambivalent: ['#CCCC66', '#999933', '#FFFF99', '#CCCC33'],
                irony: ['#9966CC', '#663399', '#CC99FF', '#9966FF'],
                calm: ['#6699CC', '#336699', '#99CCFF', '#6699FF'],
                anxious: ['#996633', '#663300', '#CC9966', '#996600'],
                inspired: ['#FF66FF', '#CC33CC', '#FF99FF', '#FF66CC'],
                proud: ['#FF9900', '#CC6600', '#FFCC33', '#FF9933'],
                neutral: ['#CCCCCC', '#999999', '#666666', '#333333'],
                balanced: ['#6699CC', '#99CC66', '#CC9966', '#66CC99'],
                complex: ['#9933CC', '#33CC99', '#CC9933', '#3399CC'],
                mixed: ['#CC9966', '#99CC66', '#6699CC', '#CC6699']
            };
            
            const normalizedTone = tone.toLowerCase().trim();
            
            let basePalette = colorMappings.neutral;
            
            if (colorMappings[normalizedTone]) {
                basePalette = colorMappings[normalizedTone];
            } else {
                for (const [key, palette] of Object.entries(colorMappings)) {
                    if (normalizedTone.includes(key) || key.includes(normalizedTone)) {
                        basePalette = palette;
                        break;
                    }
                }
            }
            
            const uniqueBaseColors = [...new Set(basePalette.slice(0, 4))];
            
            while (uniqueBaseColors.length < 4) {
                const randomColor = this.generateRandomColor();
                if (!uniqueBaseColors.includes(randomColor)) {
                    uniqueBaseColors.push(randomColor);
                }
            }
            
            const modifiedColors = uniqueBaseColors.slice(0, 4).map((color, index) => {
                return this.modifyColorByEmotion(color, intensity, polarity, index);
            });
            
            const finalColors = [];
            for (const color of modifiedColors) {
                if (!finalColors.includes(color)) {
                    finalColors.push(color);
                }
            }
            
            while (finalColors.length < 4) {
                const baseColor = finalColors[0] || '#FF9900';
                const variantIndex = finalColors.length;
                const variant = this.generateColorVariant(baseColor, variantIndex);
                if (!finalColors.includes(variant)) {
                    finalColors.push(variant);
                }
            }
            
            return finalColors.slice(0, 4);
        }

        generateRandomColor() {
            const letters = '0123456789ABCDEF';
            let color = '#';
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }

        generateColorVariant(baseColor, index) {
            const hex = baseColor.replace('#', '');
            if (hex.length !== 6) return baseColor;
            
            const r = parseInt(hex.substr(0, 2), 16);
            const g = parseInt(hex.substr(2, 2), 16);
            const b = parseInt(hex.substr(4, 2), 16);
            
            const variations = [
                { r: 1.2, g: 0.9, b: 0.9 },
                { r: 0.9, g: 1.2, b: 0.9 },
                { r: 0.9, g: 0.9, b: 1.2 },
                { r: 1.1, g: 1.1, b: 0.8 }
            ];
            
            const variation = variations[index % variations.length];
            const nr = Math.min(255, Math.max(0, Math.round(r * variation.r)));
            const ng = Math.min(255, Math.max(0, Math.round(g * variation.g)));
            const nb = Math.min(255, Math.max(0, Math.round(b * variation.b)));
            
            return `#${nr.toString(16).padStart(2, '0')}${ng.toString(16).padStart(2, '0')}${nb.toString(16).padStart(2, '0')}`;
        }

        modifyColorByEmotion(color, intensity, polarity, index = 0) {
            try {
                const hex = color.replace('#', '');
                if (hex.length !== 6) return color;
                
                const r = parseInt(hex.substr(0, 2), 16);
                const g = parseInt(hex.substr(2, 2), 16);
                const b = parseInt(hex.substr(4, 2), 16);
                
                let nr = r, ng = g, nb = b;
                
                const intensityMod = 0.8 + (intensity * 0.4);
                nr = Math.min(255, Math.max(0, Math.round(r * intensityMod)));
                ng = Math.min(255, Math.max(0, Math.round(g * intensityMod)));
                nb = Math.min(255, Math.max(0, Math.round(b * intensityMod)));
                
                if (polarity > 0.3) {
                    nr = Math.min(255, Math.round(nr * 1.1));
                    ng = Math.min(255, Math.round(ng * 1.05));
                } else if (polarity < -0.3) {
                    ng = Math.min(255, Math.round(ng * 0.95));
                    nb = Math.min(255, Math.round(nb * 1.1));
                }
                
                const indexVariations = [0.95, 1.0, 1.05, 0.92];
                const variation = indexVariations[index % 4];
                nr = Math.min(255, Math.max(0, Math.round(nr * variation)));
                ng = Math.min(255, Math.max(0, Math.round(ng * variation)));
                nb = Math.min(255, Math.max(0, Math.round(nb * variation)));
                
                const avg = (nr + ng + nb) / 3;
                if (avg < 30) {
                    nr = Math.min(255, nr + 20);
                    ng = Math.min(255, ng + 20);
                    nb = Math.min(255, nb + 20);
                }
                
                const result = `#${nr.toString(16).padStart(2, '0')}${ng.toString(16).padStart(2, '0')}${nb.toString(16).padStart(2, '0')}`;
                
                return result;
            } catch (error) {
                return color;
            }
        }

        increaseSaturation(color, amount) {
                const hex = color.replace('#', '');
                const r = parseInt(hex.substr(0, 2), 16);
                const g = parseInt(hex.substr(2, 2), 16);
                const b = parseInt(hex.substr(4, 2), 16);
                
                const max = Math.max(r, g, b);
                const min = Math.min(r, g, b);
                const delta = max - min;
                
                if (delta === 0) return color;
                
                const factor = (delta + amount * 255) / delta;
                const nr = Math.min(255, Math.round(r * factor));
                const ng = Math.min(255, Math.round(g * factor));
                const nb = Math.min(255, Math.round(b * factor));
                
                return `#${nr.toString(16).padStart(2, '0')}${ng.toString(16).padStart(2, '0')}${nb.toString(16).padStart(2, '0')}`;
        }

        decreaseSaturation(color, amount) {
                const hex = color.replace('#', '');
                const r = parseInt(hex.substr(0, 2), 16);
                const g = parseInt(hex.substr(2, 2), 16);
                const b = parseInt(hex.substr(4, 2), 16);
                
                const gray = Math.round((r + g + b) / 3);
                const nr = Math.round(r + (gray - r) * amount);
                const ng = Math.round(g + (gray - g) * amount);
                const nb = Math.round(b + (gray - b) * amount);
                
                return `#${nr.toString(16).padStart(2, '0')}${ng.toString(16).padStart(2, '0')}${nb.toString(16).padStart(2, '0')}`;
        }        
        
        calculateIronyLevel(integratedResult) {
            try {
                const contextualAnalysis = integratedResult.details?.contextual;
                const lexicalAnalysis = integratedResult.details?.lexical;
                if (!contextualAnalysis || !lexicalAnalysis) {
                    return 0;
                }
                let ironyScore = 0;
                const ironyIndicators = contextualAnalysis.indicators?.irony || 0;
                ironyScore += Math.min(0.4, ironyIndicators * 0.15);
                const contrastMarkers = contextualAnalysis.indicators?.contrasts || 0;
                ironyScore += Math.min(0.2, contrastMarkers * 0.05);
                const rhetoricalQuestions = contextualAnalysis.indicators?.rhetorical || 0;
                ironyScore += Math.min(0.2, rhetoricalQuestions * 0.1);
                const ironyCategory = lexicalAnalysis.categories?.irony;
                if (ironyCategory && ironyCategory.frequency > 0) {
                    ironyScore += Math.min(0.3, ironyCategory.frequency * 5);
                }
                const ironyPatterns = contextualAnalysis.patterns?.ironyPatterns?.length || 0;
                ironyScore += Math.min(0.25, ironyPatterns * 0.15);
                ironyScore = Math.max(0, Math.min(1, ironyScore));
                return Math.round(ironyScore * 100) / 100;
            } catch (error) {
                return 0;
            }
        }
        
        generateAdvancedVisualProfile(primaryEmotion, intensity, polarity, complexity) {
            const basePalette = this.generateColorPalette(primaryEmotion, intensity, polarity);
            
            let enhancedPalette = [...basePalette];
            
            if (complexity > 0.7) {
                const extraColorsComplex = ['#8A2BE2', '#DA70D6', '#9370DB', '#20B2AA', '#00CED1', '#48D1CC'];
                for (const color of extraColorsComplex) {
                    if (!enhancedPalette.includes(color)) {
                        enhancedPalette.push(color);
                    }
                }
            }
            
            if (intensity > 0.7) {
                const extraColorsIntensity = ['#FF4500', '#FF1493', '#FFD700', '#00FF00', '#00FFFF', '#FF00FF'];
                for (const color of extraColorsIntensity) {
                    if (!enhancedPalette.includes(color)) {
                        enhancedPalette.push(color);
                    }
                }
            }
            
            const textures = [];
            if (intensity > 0.6) textures.push('gradient', 'pulse', 'glow');
            if (complexity > 0.6) textures.push('layered', 'textured', 'patterned');
            if (polarity > 0) textures.push('warm', 'radiant');
            if (polarity < 0) textures.push('cool', 'matte');
            
            return {
                palette: enhancedPalette.slice(0, 4),
                textures: [...new Set(textures)].slice(0, 5),
                suggestedStyles: this.suggestVisualStyles(primaryEmotion, intensity, complexity),
                mood: this.getVisualMood(primaryEmotion, intensity)
            };
        }
        
        suggestVisualStyles(emotion, intensity, complexity) {
            const styles = [];
            
            if (intensity > 0.7) {
                styles.push('expressionist', 'abstract', 'dynamic');
            } else if (intensity < 0.3) {
                styles.push('minimalist', 'subtle', 'quiet');
            }
            
            if (complexity > 0.7) {
                styles.push('cubist', 'surreal', 'multi-layered');
            }
            
            if (['joyful', 'ecstatic', 'happy'].includes(emotion)) {
                styles.push('impressionist', 'bright', 'vibrant');
            } else if (['sad', 'melancholic', 'grief'].includes(emotion)) {
                styles.push('romantic', 'soft', 'blurred');
            } else if (['angry', 'tense', 'anxious'].includes(emotion)) {
                styles.push('expressionist', 'distorted', 'chaotic');
            }
            
            return [...new Set(styles)].slice(0, 5);
        }
        
        getVisualMood(emotion, intensity) {
            const moods = {
                joyful: intensity > 0.6 ? 'celebratory' : 'cheerful',
                sad: intensity > 0.6 ? 'tragic' : 'melancholic',
                angry: intensity > 0.6 ? 'explosive' : 'tense',
                calm: intensity > 0.6 ? 'serene' : 'peaceful',
                complex: intensity > 0.6 ? 'profound' : 'thoughtful'
            };
            
            return moods[emotion] || 'expressive';
        }
        
        generateBehaviorProfile(tone, intensity, complexity) {
            const behaviors = {
                ecstatic: ['chaos', 'pulse', 'explode', 'swarm', 'magnetic'],
                joyful: ['swarm', 'orbit', 'wave', 'pulse', 'attract'],
                pleased: ['orbit', 'wave', 'swarm', 'drift', 'float'],
                calm: ['orbit', 'drift', 'float', 'gentle', 'slow'],
                angry: ['chaos', 'repel', 'explode', 'violent', 'scatter'],
                sad: ['drift', 'sink', 'fall', 'slow', 'gravitate'],
                melancholy: ['spiral', 'drift', 'sink', 'orbit', 'float'],
                subdued: ['drift', 'float', 'gentle', 'slow', 'calm'],
                complex: ['spiral', 'swarm', 'orbit', 'wave', 'chaos'],
                balanced: ['orbit', 'wave', 'swarm', 'drift', 'pulse']
            };
    
            let baseBehaviors = behaviors[tone] || behaviors.balanced;
    
            if (intensity > 0.6) {
                baseBehaviors = [...baseBehaviors, 'intense', 'fast', 'energetic'];
            } else if (intensity < 0.3) {
                baseBehaviors = [...baseBehaviors, 'slow', 'gentle', 'peaceful'];
            }
    
            if (complexity > 0.6) {
                baseBehaviors = [...baseBehaviors, 'complex', 'layered', 'multidimensional'];
            }
    
            return Array.from(new Set(baseBehaviors)).slice(0, 8); 
        }
        
        generateAdvancedBehavioralProfile(primaryEmotion, intensity, complexity) {
            const baseBehaviors = this.generateBehaviorProfile(primaryEmotion, intensity, complexity);
            
            let enhancedBehaviors = [...baseBehaviors];
            
            if (complexity > 0.7) {
                enhancedBehaviors = enhancedBehaviors.concat([
                    'evolve', 'transform', 'metamorphose', 
                    'intertwine', 'converge', 'diverge'
                ]);
            }
            
            if (intensity > 0.7) {
                enhancedBehaviors = enhancedBehaviors.concat([
                    'accelerate', 'amplify', 'magnify',
                    'resonate', 'reverberate', 'echo'
                ]);
            }
            
            const interactions = this.suggestInteractionPatterns(primaryEmotion, intensity);
            
            return {
                behaviors: [...new Set(enhancedBehaviors)].slice(0, 10),
                interactions: interactions,
                tempo: this.getBehavioralTempo(intensity, complexity),
                fluidity: this.getBehavioralFluidity(complexity)
            };
        }
        
        suggestInteractionPatterns(emotion, intensity) {
            const patterns = [];
            
            if (intensity > 0.6) {
                patterns.push('resonant', 'synchronized', 'harmonious');
            }
            
            if (['joyful', 'ecstatic', 'happy'].includes(emotion)) {
                patterns.push('attractive', 'connecting', 'unifying');
            } else if (['sad', 'melancholic'].includes(emotion)) {
                patterns.push('withdrawing', 'reflecting', 'isolating');
            } else if (['angry', 'tense'].includes(emotion)) {
                patterns.push('repelling', 'conflicting', 'resisting');
            }
            
            return [...new Set(patterns)].slice(0, 4);
        }
        
        getBehavioralTempo(intensity, complexity) {
            if (intensity > 0.7) return 'allegro';
            if (intensity < 0.3) return 'lento';
            if (complexity > 0.7) return 'rubato';
            return 'andante';
        }
        
        getBehavioralFluidity(complexity) {
            if (complexity > 0.7) return 'viscous';
            if (complexity > 0.4) return 'fluid';
            return 'water';
        }
        
        integratePsychologicalInsights(integratedResult) {
            return {
                emotionalIntelligence: this.assessIntegratedEI(integratedResult),
                selfAwareness: this.assessIntegratedSelfAwareness(integratedResult),
                copingStrategies: this.suggestCopingStrategies(integratedResult),
                growthPotential: this.assessGrowthPotential(integratedResult)
            };
        }
        
        assessIntegratedEI(integratedResult) {
            const factors = [
                integratedResult.consistencyScore,
                integratedResult.emotionalRange,
                integratedResult.complexityScore
            ];
            
            const score = factors.reduce((a, b) => a + b, 0) / factors.length;
            
            return {
                score: score,
                level: score > 0.7 ? 'high' : score > 0.4 ? 'moderate' : 'developing',
                strengths: this.identifyEIStrengths(integratedResult)
            };
        }
        
        identifyEIStrengths(integratedResult) {
            const strengths = [];
            
            if (integratedResult.consistencyScore > 0.7) {
                strengths.push('emotional consistency');
            }
            
            if (integratedResult.emotionalRange > 0.6) {
                strengths.push('emotional range');
            }
            
            if (integratedResult.complexityScore > 0.7) {
                strengths.push('emotional complexity');
            }
            
            if (integratedResult.confidenceScore > 0.8) {
                strengths.push('self-awareness');
            }
            
            return strengths;
        }
        
        assessIntegratedSelfAwareness(integratedResult) {
            const awarenessScore = integratedResult.confidenceScore * 0.6 + 
                                 integratedResult.consistencyScore * 0.4;
            
            return {
                score: awarenessScore,
                level: awarenessScore > 0.7 ? 'high' : awarenessScore > 0.4 ? 'moderate' : 'low',
                indicators: this.getSelfAwarenessIndicators(integratedResult)
            };
        }
        
        getSelfAwarenessIndicators(integratedResult) {
            const indicators = [];
            
            if (integratedResult.dominantEmotion.confidence > 0.7) {
                indicators.push('clear emotional recognition');
            }
            
            if (integratedResult.emotionalDepth > 0.6) {
                indicators.push('emotional depth');
            }
            
            if (integratedResult.complexityScore > 0.5) {
                indicators.push('nuanced understanding');
            }
            
            return indicators;
        }
        
        suggestCopingStrategies(integratedResult) {
            const strategies = [];
            const { emotion } = integratedResult.dominantEmotion;
            const intensity = integratedResult.emotionalRange;
            
            if (['sad', 'grief', 'despair'].includes(emotion)) {
                strategies.push('self-compassion practice', 'emotional expression', 'social connection');
            } else if (['angry', 'rage', 'frustration'].includes(emotion)) {
                strategies.push('mindful breathing', 'physical activity', 'constructive expression');
            } else if (['anxious', 'fear', 'worry'].includes(emotion)) {
                strategies.push('grounding techniques', 'perspective shifting', 'gradual exposure');
            } else if (['joyful', 'ecstatic'].includes(emotion) && intensity > 0.7) {
                strategies.push('savoring the moment', 'sharing joy', 'creative expression');
            }
            
            if (integratedResult.complexityScore > 0.7) {
                strategies.push('journaling', 'therapy', 'artistic expression');
            }
            
            return strategies.slice(0, 5);
        }
        
        assessGrowthPotential(integratedResult) {
            const potentialFactors = [
                integratedResult.complexityScore,
                integratedResult.emotionalRange,
                integratedResult.emotionalDepth
            ];
            
            const score = potentialFactors.reduce((a, b) => a + b, 0) / potentialFactors.length;
            
            return {
                score: score,
                potential: score > 0.7 ? 'high' : score > 0.4 ? 'moderate' : 'low',
                areas: this.identifyGrowthAreas(integratedResult)
            };
        }
        
        identifyGrowthAreas(integratedResult) {
            const areas = [];
            
            if (integratedResult.consistencyScore < 0.5) {
                areas.push('emotional regulation');
            }
            
            if (integratedResult.emotionalRange < 0.3) {
                areas.push('emotional expression');
            }
            
            if (integratedResult.complexityScore < 0.4) {
                areas.push('emotional awareness');
            }
            
            return areas.length > 0 ? areas : ['emotional integration'];
        }
        
        determineNarrativeArchetype(integratedResult) {
            const { emotion } = integratedResult.dominantEmotion;
            const intensity = integratedResult.emotionalRange;
            const progression = integratedResult.dimensionScores.semantic;
            
            const archetypes = {
                heroic: emotion === 'joyful' && intensity > 0.6,
                tragic: emotion === 'sad' && intensity > 0.6,
                romantic: emotion === 'love' && intensity > 0.5,
                comic: emotion === 'joyful' && intensity < 0.4,
                ironic: integratedResult.ironyLevel > 0.5,
                epic: integratedResult.complexityScore > 0.7 && intensity > 0.6,
                lyrical: integratedResult.emotionalDepth > 0.7
            };
            
            for (const [archetype, condition] of Object.entries(archetypes)) {
                if (condition) return archetype;
            }
            
            return 'realistic';
        }
        
        getAdvancedDisplayName(primaryEmotion, polarity, intensity, complexity) {
            const names = {
                ecstatic: polarity > 0.8 ? 'Божественный экстаз' : 'Всепоглощающая радость',
                joyful: intensity > 0.7 ? 'Лучистая радость' : 'Тихий восторг',
                happy: 'Счастливая гармония',
                content: 'Умиротворённое удовлетворение',
                calm: intensity < 0.2 ? 'Абсолютное спокойствие' : 'Гармоничное равновесие',
                angry: intensity > 0.8 ? 'Яростный шторм' : 'Сдерживаемая буря',
                sad: intensity > 0.6 ? 'Бездонная печаль' : 'Нежная грусть',
                melancholic: 'Философская меланхолия',
                anxious: 'Тревожное ожидание',
                complex: complexity > 0.7 ? 'Многогранная сложность' : 'Сложное переплетение',
                bittersweet: 'Горько-сладкая симфония',
                nostalgic: 'Ностальгическое эхо'
            };
            
            return names[primaryEmotion] || 'Эмоциональная гамма';
        }
        
        getAdvancedDescription(primaryEmotion, polarity, intensity, complexity) {
            const descriptions = {
                ecstatic: 'Состояние полного, всеобъемлющего счастья и духовного подъёма',
                joyful: 'Яркое, жизнеутверждающее эмоциональное состояние',
                happy: 'Устойчивое чувство удовлетворения и благополучия',
                content: 'Спокойное принятие и удовлетворение текущим моментом',
                calm: 'Глубокое внутреннее равновесие и гармония',
                angry: 'Интенсивное состояние недовольства и внутреннего напряжения',
                sad: 'Эмоциональное переживание потери или разочарования',
                melancholic: 'Сложное сочетание грусти и глубокой рефлексии',
                anxious: 'Состояние беспокойства и предчувствия',
                complex: 'Многоуровневое, противоречивое эмоциональное переживание',
                bittersweet: 'Одновременное переживание радости и печали',
                nostalgic: 'Тёплые воспоминания, окрашенные лёгкой грустью'
            };
            
            let base = descriptions[primaryEmotion] || 'Богатое эмоциональное переживание';
            
            if (intensity > 0.7) {
                base = 'Интенсивное ' + base.toLowerCase();
            } else if (intensity < 0.3) {
                base = 'Сдержанное ' + base.toLowerCase();
            }
            
            if (complexity > 0.7) {
                base += ', отличающееся глубиной и многослойностью';
            }
            
            return base;
        }
        
        generateEmotionKeywords(primary, secondary) {
            const keywordMap = {
                ecstatic: ['восторг', 'экстаз', 'эйфория', 'блаженство'],
                joyful: ['радость', 'счастье', 'ликование', 'веселье'],
                happy: ['удовлетворение', 'благополучие', 'гармония'],
                content: ['спокойствие', 'удовлетворение', 'баланс'],
                calm: ['мир', 'тишина', 'равновесие', 'умиротворение'],
                angry: ['гнев', 'ярость', 'раздражение', 'негодование'],
                sad: ['грусть', 'печаль', 'тоска', 'скорбь'],
                melancholic: ['меланхолия', 'рефлексия', 'созерцание'],
                anxious: ['тревога', 'беспокойство', 'опасение', 'нервозность'],
                complex: ['противоречие', 'многослойность', 'глубина', 'нюансы'],
                bittersweet: ['амбивалентность', 'смешанные чувства', 'контраст'],
                nostalgic: ['воспоминания', 'прошлое', 'память', 'эхо']
            };
            
            let keywords = keywordMap[primary] || ['эмоция', 'чувство', 'переживание'];
            
            secondary.forEach(sec => {
                if (keywordMap[sec]) {
                    keywords = keywords.concat(keywordMap[sec]);
                }
            });
            
            return [...new Set(keywords)].slice(0, 10);
        }
        
        generatePsychologicalInsights(integratedResult) {
            const insights = {
                emotionalPatterns: this.identifyEmotionalPatterns(integratedResult),
                cognitiveStyle: this.assessCognitiveStyle(integratedResult),
                relationalPatterns: this.inferRelationalPatterns(integratedResult),
                personalGrowth: this.suggestPersonalGrowthPaths(integratedResult),
                therapeuticApproaches: this.recommendTherapeuticApproaches(integratedResult)
            };
            
            return {
                insights: insights,
                summary: this.createPsychologicalSummary(insights),
                confidence: integratedResult.confidenceScore,
                applicability: this.assessInsightApplicability(integratedResult)
            };
        }
        
        identifyEmotionalPatterns(integratedResult) {
            const patterns = [];
            
            if (integratedResult.consistencyScore > 0.8) {
                patterns.push('устойчивый эмоциональный фон');
            }
            
            if (integratedResult.emotionalRange > 0.7) {
                patterns.push('широкий эмоциональный диапазон');
            }
            
            if (integratedResult.complexityScore > 0.7) {
                patterns.push('сложная эмоциональная палитра');
            }
            
            if (integratedResult.ironyLevel > 0.5) {
                patterns.push('использование иронии как защитного механизма');
            }
            
            const archetype = this.determineNarrativeArchetype(integratedResult);
            if (archetype === 'tragic') {
                patterns.push('склонность к драматизации');
            } else if (archetype === 'comic') {
                patterns.push('использование юмора');
            }
            
            return patterns.length > 0 ? patterns : ['умеренная эмоциональная выразительность'];
        }
        
        assessCognitiveStyle(integratedResult) {
            const styleFactors = {
                analytical: integratedResult.complexityScore > 0.7 ? 0.8 : 0.3,
                intuitive: integratedResult.emotionalDepth > 0.6 ? 0.7 : 0.4,
                reflective: integratedResult.dimensionScores.semantic > 0.6 ? 0.9 : 0.5,
                practical: integratedResult.dimensionScores.contextual > 0 ? 0.6 : 0.4
            };
            
            const maxScore = Math.max(...Object.values(styleFactors));
            const dominantStyle = Object.keys(styleFactors).find(
                key => styleFactors[key] === maxScore
            );
            
            return {
                style: dominantStyle,
                factors: styleFactors,
                flexibility: 1 - Math.max(...Object.values(styleFactors)) + 
                           Math.min(...Object.values(styleFactors))
            };
        }
        
        inferRelationalPatterns(integratedResult) {
            const patterns = [];
            const { emotion } = integratedResult.dominantEmotion;
            
            if (['joyful', 'happy', 'content'].includes(emotion)) {
                patterns.push('склонность к позитивным взаимодействиям');
                patterns.push('открытость в общении');
            } else if (['sad', 'melancholic'].includes(emotion)) {
                patterns.push('потребность в понимании и поддержке');
                patterns.push('глубина в отношениях');
            } else if (['angry', 'anxious'].includes(emotion)) {
                patterns.push('защитная позиция в отношениях');
                patterns.push('потребность в безопасных границах');
            }
            
            if (integratedResult.ironyLevel > 0.5) {
                patterns.push('использование дистанции в общении');
            }
            
            return patterns.length > 0 ? patterns : ['сбалансированный стиль общения'];
        }
        
        suggestPersonalGrowthPaths(integratedResult) {
            const paths = [];
            
            if (integratedResult.emotionalRange < 0.4) {
                paths.push('расширение эмоционального репертуара');
            }
            
            if (integratedResult.consistencyScore < 0.5) {
                paths.push('развитие эмоциональной стабильности');
            }
            
            if (integratedResult.complexityScore > 0.7) {
                paths.push('интеграция сложных эмоциональных переживаний');
            }
            
            if (integratedResult.dimensionScores.psychological < 0.4) {
                paths.push('развитие психологической осознанности');
            }
            
            return paths.length > 0 ? paths : ['гармонизация эмоциональной сферы'];
        }
        
        recommendTherapeuticApproaches(integratedResult) {
            const approaches = [];
            
            if (integratedResult.complexityScore > 0.7) {
                approaches.push('гештальт-терапия', 'экзистенциальная терапия');
            }
            
            if (integratedResult.ironyLevel > 0.5) {
                approaches.push('когнитивно-поведенческая терапия');
            }
            
            if (integratedResult.dimensionScores.contextual < 0) {
                approaches.push('терапия принятия и ответственности');
            }
            
            if (integratedResult.emotionalDepth > 0.6) {
                approaches.push('глубинная психотерапия');
            }
            
            return approaches.length > 0 ? approaches : ['общеукрепляющая психотерапия'];
        }
        
        createPsychologicalSummary(insights) {
            const summary = [];
            
            if (insights.emotionalPatterns) {
                summary.push(`Эмоциональные паттерны: ${insights.emotionalPatterns.join(', ')}`);
            }
            
            if (insights.cognitiveStyle) {
                summary.push(`Когнитивный стиль: преимущественно ${insights.cognitiveStyle.style}`);
            }
            
            if (insights.relationalPatterns) {
                summary.push(`Межличностные особенности: ${insights.relationalPatterns.join(', ')}`);
            }
            
            if (insights.personalGrowth && insights.personalGrowth.length > 0) {
                summary.push(`Направления роста: ${insights.personalGrowth.join(', ')}`);
            }
            
            return summary.join('. ');
        }
        
        assessInsightApplicability(integratedResult) {
            const applicabilityFactors = [
                integratedResult.confidenceScore,
                integratedResult.consistencyScore,
                integratedResult.dimensionScores.psychological
            ];
            
            const score = applicabilityFactors.reduce((a, b) => a + b, 0) / applicabilityFactors.length;
            
            return {
                score: score,
                applicability: score > 0.7 ? 'высокая' : score > 0.4 ? 'умеренная' : 'ограниченная',
                limitations: this.identifyInsightLimitations(integratedResult)
            };
        }
        
        identifyInsightLimitations(integratedResult) {
            const limitations = [];
            
            if (integratedResult.confidenceScore < 0.5) {
                limitations.push('ограниченная надёжность анализа');
            }
            
            if (integratedResult.consistencyScore < 0.4) {
                limitations.push('высокая эмоциональная изменчивость');
            }
            
            if (integratedResult.dimensionScores.psychological < 0.3) {
                limitations.push('ограниченное психологическое содержание');
            }
            
            return limitations.length > 0 ? limitations : ['стандартные ограничения текстового анализа'];
        }
        
        escapeRegExp(string) {
            return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        }
        
        getNeutralResult() {
            return {
                success: true,
                language: this.language || 'en',
                languageConfidence: 1.0,
                profile: {
                    primary: 'neutral',
                    polarity: 0,
                    intensity: 0.3,
                    complexity: 0.3,
                    confidence: 0.5,
                    consistency: 0.8,
                    secondary: ['balanced', 'calm'],
                    ironyLevel: 0.1,
                    emotionalRange: 0.2,
                    emotionalDepth: 0.3,
                    visual: {
                        colors: ['#CCCCCC', '#999999', '#666666', '#333333'],
                        intensity: 0.3,
                        contrast: 0.4
                    },
                    behavioral: {
                        type: 'neutral',
                        energy: 0.3,
                        social: 0.5
                    },
                    psychological: {
                        primaryNeeds: ['safety'],
                        personalityTraits: ['balanced']
                    },
                    narrative: 'neutral_observation',
                    display: {
                        name: 'Balanced Observation',
                        description: 'Neutral emotional state with balanced perspective',
                        keywords: ['neutral', 'balanced', 'calm', 'observant']
                    }
                },
                psychologicalInsights: {
                    emotionalIntelligence: 0.5,
                    selfAwareness: 0.4,
                    needLevel: 'safety'
                },
                metrics: {
                    processingTime: 0,
                    textLength: 0,
                    wordCount: 0,
                    sentenceCount: 0,
                    paragraphCount: 0,
                    readingTime: 0,
                    complexityScore: 0.3
                },
                details: {
                    lexical: { categories: {}, summary: { totalEmotionalWords: 0 } },
                    syntactic: { sentenceStats: { count: 0 } },
                    contextual: { indicators: {}, scores: {} },
                    cultural: { references: {}, scores: {} },
                    semantic: { density: 0, progression: {} },
                    psychological: { plutchik: {}, maslow: {} }
                },
                timestamp: new Date().toISOString(),
                analysisVersion: this.version
            };
        }
        
        getVersion() {
            return this.version;
        }
        
        getDictionaryStats() {
            const stats = {};
            
            for (const [lang, categories] of Object.entries(this.dictionaries)) {
                stats[lang] = {
                    categories: Object.keys(categories).length,
                    totalWords: Object.values(categories).flat().length,
                    categoriesList: Object.keys(categories)
                };
            }
            
            return stats;
        }
        
        getModelCapabilities() {
            return {
                analysisDimensions: ['lexical', 'syntactic', 'contextual', 'cultural', 'semantic', 'psychological'],
                psychologicalModels: Object.keys(this.psychologicalModels),
                supportedLanguages: Object.keys(this.dictionaries),
                features: [
                    'advanced_emotional_profiling',
                    'psychological_insights',
                    'cultural_analysis',
                    'narrative_archetypes',
                    'visual_and_behavioral_profiles'
                ]
            };
        }
        
        analyzeWithDebug(text) {
            const result = this.analyze(text);
            
            if (result.success) {
                result.debug = {
                    dictionaries: this.getDictionaryStats(),
                    modelCapabilities: this.getModelCapabilities(),
                    config: this.metricsConfig,
                    languageRules: this.contextRules[this.language],
                    culturalContext: Object.keys(this.culturalContext[this.language]),
                    psychologicalModels: this.psychologicalModels
                };
            }
            
            return result;
        }
        
        exportConfig() {
            return {
                version: this.version,
                language: this.language,
                metricsConfig: this.metricsConfig,
                categoryWeights: this.categoryWeights,
                contextRules: this.contextRules[this.language],
                psychologicalModels: Object.keys(this.psychologicalModels)
            };
        }
        
        importConfig(config) {
            if (config.metricsConfig) {
                this.metricsConfig = { ...this.metricsConfig, ...config.metricsConfig };
            }
            
            if (config.categoryWeights) {
                this.categoryWeights = { ...this.categoryWeights, ...config.categoryWeights };
            }
            
            if (config.contextRules && this.contextRules[this.language]) {
                this.contextRules[this.language] = { 
                    ...this.contextRules[this.language], 
                    ...config.contextRules 
                };
            }
            
            console.log('Config imported successfully');
            return true;
        }
        
        addCustomDictionary(language, category, words) {
            if (!this.dictionaries[language]) {
                this.dictionaries[language] = {};
            }
            
            if (!this.dictionaries[language][category]) {
                this.dictionaries[language][category] = [];
            }
            
            this.dictionaries[language][category] = [
                ...new Set([...this.dictionaries[language][category], ...words])
            ];
            
            console.log(`Added ${words.length} words to ${language}.${category}`);
            return true;
        }
        
        removeDictionaryCategory(language, category) {
            if (this.dictionaries[language] && this.dictionaries[language][category]) {
                delete this.dictionaries[language][category];
                console.log(`Removed category ${language}.${category}`);
                return true;
            }
            return false;
        }
        
        getAnalysisHistory() {
            // This would typically connect to a storage system
            return {
                totalAnalyses: 0,
                averageProcessingTime: 0,
                mostCommonEmotion: 'neutral',
                languageDistribution: {}
            };
        }
        
        static getSupportedLanguages() {
            return ['ru', 'en', 'auto'];
        }
        
        static getEmotionCategories() {
            return {
                basic: ['joy', 'sadness', 'anger', 'fear', 'disgust', 'surprise'],
                complex: ['love', 'hope', 'gratitude', 'pride', 'shame', 'guilt', 'envy'],
                aesthetic: ['aesthetic', 'nostalgia', 'triumph', 'liberation'],
                states: ['calmness', 'intensity', 'vulnerability', 'resilience']
            };
        }
        
        static createQuickAnalyzer(language = 'auto') {
            const analyzer = new EmotionAnalyzer(language);
            
            analyzer.metricsConfig = {
                wordThreshold: 2,
                sentenceThreshold: 2,
                paragraphThreshold: 1,
                punctuationWeight: {
                    '!': 1.2,
                    '?': 0.7,
                    '...': 0.5
                },
                advancedMetrics: {
                    emotionalDepth: false,
                    contextualLayers: 1,
                    semanticComplexity: false,
                    culturalReferences: false,
                    psychologicalProfiling: false
                }
            };
            
            console.log('Quick analyzer created');
            return analyzer;
        }
    }
    
    if (typeof window !== 'undefined') {
        window.EmotionAnalyzer = EmotionAnalyzer;
        window.EmotionAnalyzerAdvanced = EmotionAnalyzer; // Alias for compatibility
    }
    
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = EmotionAnalyzer;
    }
    
    if (typeof exports !== 'undefined') {
        exports.default = EmotionAnalyzer;
        exports.EmotionAnalyzer = EmotionAnalyzer;
    }
    
    if (typeof window !== 'undefined' && window.document) {
        document.addEventListener('DOMContentLoaded', () => {
            console.log('Blokknote Emotion Analyzer v1.0.0 loaded successfully');
            console.log('Available methods: analyze(), analyzeWithDebug(), getDictionaryStats()');
            console.log('Supported languages: ru, en, auto');
        });
    }
    

})();
















