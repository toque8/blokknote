(function() {
    'use strict';
    
    class EmotionAnalyzer {
        constructor(language = 'auto') {
            this.version = '1.1';
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
                        'экстаз', 'восторг', 'ликование', 'эйфория', 'упоение', 'кульминация', 'грандиозность', 'безграничность', 
                        'блаженство', 'восхищение', 'опьянение', 'торжество', 'триумф', 'кураж', 'катарсис', 'феерия', 'чудо', 'великолепие', 
                        'апофеоз', 'накал', 'транс', 'нирвана', 'преображение', 'вознесение', 'апогей', 'самозабвение', 'наваждение', 'совершенство',
                        'взлёт', 'подъём', 'одухотворение', 'просветление', 'озарение', 'жар', 'неистовство', 'оргазм', 'фурор', 'сенсация',
                        'идеал', 'вечность', 'бесконечность', 'гармония', 'величие', 'рай', 'дзен', 'раздолье', 'свобода', 'простор', 'изобилие',
                        'всепоглощение', 'запредельность'
                    ],
                    joy: [
                        'радость', 'счастье', 'веселье', 'упоение', 'ликбезность',
                        'блаженство', 'наслаждение', 'удовольствие', 'утеха', 'утешение', 'забава', 'увеселение',
                        'праздник', 'празднество', 'веселость', 'жизнерадостность', 'оптимизм', 'восторженность', 'восхитительность', 'прелесть', 
                        'очарование', 'благодушие', 'благополучие', 'процветание', 'расцвет', 'цветение'
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
                        'обожание', 'благоговение', 'трепет', 'воодушевление', 'вдохновение'
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
                                    ru: ['всегда', 'никогда', 'все', 'никто', 'абсолютно', 'категорически', 'либо-либо', 'постоянно', 'всегда так', 'вечно'],
                                    en: ['always', 'never', 'everyone', 'nobody', 'absolutely', 'categorically', 'either-or', 'constantly']
                                },
                                  weight: 1.2
                              },
                              catastrophizing: {
                                  markers: {
                                      ru: ['ужасно', 'кошмар', 'конец', 'катастрофа', 'не выносимо', 'все пропало', 'худшее', 'безысходность', 'конец', 'крах'],
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
                                      ru: ['как всегда', 'опять все по старому', 'вечно одно и то же', 'опять тоже самое', 'каждый раз', 'всегда все', 'никто никогда', 'у меня никогда не получается', 'все люди'],
                                      en: ['as always', 'again everything is the same', 'I never succeed', 'all people...']
                                  },
                                  weight: 1.0
                              },
                              mindReading: {
                                  enabled: true,
                                  markers: {
                                      ru: ['думает, что я', 'все думают', 'догадываются', 'догадывается', 'считает', 'считают', 'они наверняка', 'он наверняка', 'она наверняка'],
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
                                markers: {
                                    ru: ['наверняка не получится', 'точно провалюсь', 'они откажут', 'будет ужасно', 'а вдруг', 'что если', 'предчувствую', 'боюсь, что'],
                                    en: ['it probably won\'t work', 'I\'ll definitely fail', 'they will refuse', 'it will be terrible', 'what if', 'I\'m afraid that']
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
                                      ru: ['если бы ты меня любил', 'все так делают', 'ты же не хочешь, чтобы...', 'после всего, что я для тебя...', 'ты мне должен', 'я на тебя рассчитывал', 'неужели тебе не жаль'],
                                      en: ['if you loved me', 'everyone does it', 'you don\'t want to...', 'after all I\'ve done for you...', 'you owe me', 'I was counting on you']
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

            this.psychologicalModels.cognitiveBiases = {
                              dichotomous: {
                                        markers: {
                                                  ru: ['всегда', 'никогда', 'все', 'никто', 'абсолютно', 'категорически', 'либо-либо'],
                                                  en: ['always', 'never', 'everyone', 'nobody', 'absolutely', 'categorically', 'either-or']
                                        },
                                        weight: 1.2,
                                        enabled: true
                              },
                              catastrophizing: {
                                        markers: {
                                                  ru: ['ужасно', 'кошмар', 'конец', 'катастрофа', 'все пропало', 'безысходность', 'крах'],
                                                  en: ['awful', 'nightmare', 'the end', 'disaster', 'all is lost', 'hopelessness', 'collapse']
                                        },
                                        weight: 1.5,
                                        enabled: true
                              },
                              emotionalReasoning: {
                                        markers: {
                                                  ru: ['чувствую, что это так', 'ощущаю, что он неправ', 'мне кажется, это плохо'],
                                                  en: ['I feel that it is so', 'I feel that he is wrong', 'it seems bad to me']
                                        },
                                        weight: 1.1,
                                        enabled: true
                              },
                              overgeneralization: {
                                        markers: {
                                                  ru: ['как всегда', 'опять все по старому', 'у меня никогда не получается', 'все люди...'],
                                                  en: ['as always', 'again everything is the same', 'I never succeed', 'all people...']
                                        },
                                        weight: 1.0,
                                        enabled: true
                              },
                              mindReading: {
                                        markers: {
                                                  ru: ['он думает, что я', 'она наверняка считает', 'они меня ненавидят'],
                                                  en: ['he thinks that I', 'she surely thinks', 'they hate me']
                                        },
                                        weight: 1.3,
                                        enabled: true
                              },
                              personalization: {
                                        markers: {
                                                  ru: ['это из-за меня', 'я виноват', 'наверное, я им не нравлюсь', 'они так поступили, потому что я...'],
                                                  en: ['it\'s because of me', 'I\'m to blame', 'probably they don\'t like me', 'they did that because I...']
                                        },
                                        weight: 1.2,
                                        enabled: true
                              },
                              fortuneTelling: {
                                        markers: {
                                                  ru: ['наверняка не получится', 'точно провалюсь', 'они откажут', 'будет ужасно'],
                                                  en: ['it probably won\'t work', 'I\'ll definitely fail', 'they will refuse', 'it will be terrible']
                                        },
                                        weight: 1.1,
                                        enabled: true
                              },
                              minimization: {
                                        markers: {
                                                  ru: ['ничего особенного', 'просто повезло', 'это ерунда', 'не стоит внимания'],
                                                  en: ['nothing special', 'just lucky', 'it\'s nonsense', 'not worth attention']
                                        },
                                        weight: 0.9,
                                        enabled: true
                              }
            };

            this.psychologicalModels.communicationStyles = {
                              assertive: {
                                        markers: {
                                                  ru: ['я считаю', 'предлагаю', 'давайте вместе', 'мне важно'],
                                                  en: ['I think', 'I suggest', 'let\'s together', 'it is important to me']
                                        },
                                        markersAvoid: {
                                                  ru: ['наверное', 'извините, но', 'как-нибудь'],
                                                  en: ['maybe', 'sorry, but', 'somehow']
                                        },
                                        weight: 1.0,
                                        enabled: true
                              },
                              passive: {
                                        markers: {
                                                  ru: ['не знаю', 'как скажете', 'мне все равно', 'лишь бы вас не беспокоить'],
                                                  en: ['I don\'t know', 'as you say', 'I don\'t care', 'just not to bother you']
                                        },
                                        weight: 0.8,
                                        enabled: true
                              },
                              aggressive: {
                                        markers: {
                                                  ru: ['ты должен', 'категорически не согласен', 'это глупость', 'сейчас же'],
                                                  en: ['you must', 'categorically disagree', 'this is nonsense', 'right now']
                                        },
                                        weight: 1.2,
                                        enabled: true
                              },
                              manipulative: {
                                        markers: {
                                                  ru: ['если бы ты меня любил', 'все так делают', 'ты же не хочешь, чтобы...', 'после всего, что я для тебя...'],
                                                  en: ['if you loved me', 'everyone does it', 'you don\'t want to...', 'after all I\'ve done for you...']
                                        },
                                        weight: 1.3,
                                        enabled: true
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
                    const readabilityMetrics = this.calculateReadabilityMetrics(preprocessing);
                    const repetitionAnalysis = this.detectWordRepetitions(preprocessing); 
                    
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

                    let writerMetrics = {};
                    try {
                        writerMetrics = this.calculateWriterMetrics(text);
                    } catch (e) {
                        console.warn('Writer metrics calculation error:', e);
                    }

                    let poetryMetrics = {};
                    try {
                        poetryMetrics = this.calculatePoetryMetrics(text);
                    } catch (e) {
                        console.warn('Poetry metrics calculation error:', e);
                    }

                    let journalistMetrics = {};
                    try {
                        journalistMetrics = this.calculateJournalistMetrics(text);
                    } catch (e) {
                        console.warn('Journalist metrics calculation error:', e);
                    }

                    let copywriterMetrics = {};
                    try {
                        copywriterMetrics = this.calculateCopywriterMetrics(text);
                    } catch (e) {
                        console.warn('Copywriter metrics calculation error:', e);
                    }

                    let funMetrics = {};
                    try {
                        funMetrics = this.calculateFunMetrics(text);
                    } catch (e) {
                        console.warn('Fun metrics calculation error:', e);
                    }
                    
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
                            complexityScore: integratedResult.complexityScore,
                            writer: writerMetrics,
                            poetry: poetryMetrics,
                            journalist: journalistMetrics,
                            copywriter: copywriterMetrics,
                            fun: funMetrics
                        },
                        details: {
                            lexical: lexicalAnalysis,
                            syntactic: syntacticAnalysis,
                            contextual: contextualAnalysis,
                            cultural: culturalAnalysis,
                            semantic: semanticAnalysis,
                            psychological: psychologicalAnalysis,
                            readability: readabilityMetrics
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

        calculateWriterMetrics(text) {
                    if (!text || typeof text !== 'string') return {};
                    
                    const sentences = text.split(/[.!?]+/).filter(Boolean);
                    const words = text.match(/[a-zA-Zа-яА-ЯёЁ0-9]+/gu) || [];
                    const chars = text.length;
                    const totalSentences = sentences.length;
                    const totalWords = words.length;
                    
                    const metrics = {};
                    
                    const subordConjRu = ['чтобы','потому','который','что','когда','если','так','как','будто','словно'];
                    const subordConjEn = ['that','which','because','if','when','as','like','than','while','though'];
                    let hemingwayCount = 0;
                    sentences.forEach(s => {
                              const sentWords = s.match(/[a-zA-Zа-яА-ЯёЁ0-9]+/gu) || [];
                              if (sentWords.length <= 5) {
                                        const lower = s.toLowerCase();
                                        const hasSubord = subordConjRu.some(c => lower.includes(c)) || 
                                                          subordConjEn.some(c => lower.includes(c));
                                        if (!hasSubord) hemingwayCount++;
                              }
                    });
                    metrics.hemingwayCoefficient = totalSentences ? (hemingwayCount / totalSentences * 100).toFixed(1) : 0;
                    
                    const silenceWordsRu = ['тишина','молчание','пауза','безмолвие','покой','тишь','затишье'];
                    const silenceWordsEn = ['silence','quiet','stillness','pause','hush','calm'];
                    let silenceCount = 0;
                    const lowerText = text.toLowerCase();
                    silenceWordsRu.concat(silenceWordsEn).forEach(w => {
                              const re = new RegExp(w, 'g');
                              const matches = lowerText.match(re);
                              if (matches) silenceCount += matches.length;
                    });
                    const ellipsisCount = (text.match(/…|\.{3,}/g) || []).length;
                    const silenceDensity = (silenceCount + ellipsisCount) / chars * 1000;
                    metrics.silenceEffect = silenceDensity > 0 ? (10 * Math.log10(silenceDensity + 1)).toFixed(1) : 0;
                    
                    const heatRu = ['жар','огонь','солнце','тепл','горяч','зной','пекл','раскал'];
                    const heatEn = ['hot','fire','sun','warm','heat','burn','scorch'];
                    const coldRu = ['лед','мороз','холод','снег','стуж','холодн','мерз'];
                    const coldEn = ['ice','frost','cold','snow','freeze','chill'];
                    let heatScore = 0, coldScore = 0;
                    heatRu.concat(heatEn).forEach(w => {
                              const re = new RegExp(w, 'g');
                              const m = lowerText.match(re);
                              if (m) heatScore += m.length;
                    });
                    coldRu.concat(coldEn).forEach(w => {
                              const re = new RegExp(w, 'g');
                              const m = lowerText.match(re);
                              if (m) coldScore += m.length;
                    });
                    const totalTempMarkers = heatScore + coldScore;
                    metrics.weatherIndex = totalTempMarkers + 2 ? 
                        ((heatScore + 1 - (coldScore + 1)) / (totalTempMarkers + 2) * 40).toFixed(0) : 0;
                    
                    const quotesRegex = /«[^»]+»|"[^"]+"|„[^“]+“|'[^']+'|‘[^’]+’|“[^”]+”/g;
                    const quotesMatches = text.match(quotesRegex) || [];
                    const quotesChars = quotesMatches.join('').length;
                    metrics.dialogueParadigm = chars ? (quotesChars / chars * 100).toFixed(1) : 0;
                    
                    const pastRu = /[а-яё]+(л|ла|ло|ли)/gi;
                    const pastEnWords = ['went','saw','did','said','came','took','thought','made','felt','got','gave','found','knew','left','meant'];
                    const pastEnEd = /\b[a-z]+ed\b/gi;
                    let pastCount = 0;
                    const pastRuMatches = text.match(pastRu);
                    if (pastRuMatches) pastCount += pastRuMatches.length;
                    pastEnWords.forEach(w => {
                              const re = new RegExp('\\b' + w + '\\b', 'gi');
                              const m = text.match(re);
                              if (m) pastCount += m.length;
                    });
                    const pastEnEdMatches = text.match(pastEnEd);
                    if (pastEnEdMatches) pastCount += pastEnEdMatches.length;
                    
                    const futureRu = /\b(будет|будут|буду|будешь|будем|будете|станет|станут)\b/gi;
                    const futureEn = /\b(will|shall|\'ll)\b/gi;
                    let futureCount = 0;
                    const futureRuMatches = text.match(futureRu);
                    if (futureRuMatches) futureCount += futureRuMatches.length;
                    const futureEnMatches = text.match(futureEn);
                    if (futureEnMatches) futureCount += futureEnMatches.length;
                    
                    metrics.timeVector = ((futureCount - pastCount) / (pastCount + futureCount + 1) * 100).toFixed(1);
                    
                    const modalityRu = ['может быть','наверное','возможно','вероятно','кажется','похоже','пожалуй','едва ли','вряд ли'];
                    const modalityEn = ['probably','maybe','perhaps','possibly','apparently','seemingly','likely'];
                    let modalityCount = 0;
                    modalityRu.concat(modalityEn).forEach(w => {
                              const re = new RegExp(w, 'gi');
                              const m = lowerText.match(re);
                              if (m) modalityCount += m.length;
                    });
                    metrics.modalityLevel = totalWords ? (modalityCount / totalWords * 1000).toFixed(1) : 0;
                    
                    const firstPersonRu = ['я','меня','мне','мной','мною','мы','нас','нам','нами'];
                    const firstPersonEn = ['i','me','my','mine','we','us','our','ours'];
                    const allPersonalRu = ['ты','тебя','тебе','тобой','вы','вас','вам','вами','он','его','ему','им','она','её','ей','ею','они','их','им'];
                    const allPersonalEn = ['you','your','yours','he','him','his','she','her','hers','they','them','their','theirs'];
                    let firstPersonCount = 0, totalPronounCount = 0;
                    const wordRegex = /[a-zA-Zа-яА-ЯёЁ]+/g;
                    const allWords = text.match(wordRegex) || [];
                    allWords.forEach(w => {
                              const lw = w.toLowerCase();
                              if (firstPersonRu.includes(lw) || firstPersonEn.includes(lw)) firstPersonCount++;
                              if (firstPersonRu.includes(lw) || firstPersonEn.includes(lw) || 
                                  allPersonalRu.includes(lw) || allPersonalEn.includes(lw)) totalPronounCount++;
                    });
                    metrics.egoFactor = totalPronounCount ? ((firstPersonCount / totalPronounCount) * 100).toFixed(1) : 0;
                    
                    const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0);
                    const paragraphCount = paragraphs.length || 1;
                    const avgSentPerParagraph = totalSentences / paragraphCount;
                    metrics.fragmentationDegree = avgSentPerParagraph > 0 ? (10 / avgSentPerParagraph).toFixed(1) : 0;
                    
                    const sensoryRu = [
                        'видеть', 'увидеть', 'взгляд', 'глаз', 'глаза', 'смотреть', 'посмотреть',
                        'глядеть', 'поглядеть', 'заметить', 'приметить', 'наблюдать', 'лицезреть',
                        'зоркий', 'зрение', 'видение', 'очертание', 'силуэт', 'краска', 'цвет',
                        'свет', 'тьма', 'мрак', 'сияние', 'блеск', 'мерцание', 'вспышка',
                        'облако', 'туман', 'дымка', 'пейзаж', 'ландшафт', 'картина',

                        'слышать', 'услышать', 'слушать', 'прослушать', 'звук', 'звучание',
                        'шум', 'грохот', 'стук', 'треск', 'скрип', 'шелест', 'шёпот', 'шорох',
                        'голос', 'крик', 'вопль', 'плач', 'смех', 'хохот', 'кашель', 'вздох',
                        'тишина', 'беззвучие', 'эхо', 'отзвук', 'аккорд', 'мелодия', 'песня',
                        'разговор', 'речь', 'беседа', 'звон', 'звонок', 'бряцание',

                        'касаться', 'прикасаться', 'трогать', 'потрогать', 'осязать', 'щупать',
                        'гладкий', 'шершавый', 'шероховатый', 'мягкий', 'твёрдый', 'упругий',
                        'колючий', 'острый', 'тупой', 'горячий', 'холодный', 'тёплый', 'прохладный',
                        'ледяной', 'обжигающий', 'влажный', 'сухой', 'липкий', 'скользкий',
                        'пушистый', 'ворсистый', 'шёлковый', 'бархатистый', 'жёсткий',

                        'пахнуть', 'запахнуть', 'нюхать', 'понюхать', 'обонять', 'запах', 'аромат',
                        'благоухание', 'амбре', 'дух', 'вонь', 'смрад', 'чад', 'дым', 'гар',
                        'цветочный', 'пряный', 'гнилостный', 'свежий', 'душистый', 'пахучий',

                        'вкус', 'вкушать', 'пробовать', 'отведать', 'кушать', 'есть', 'пить',
                        'сладкий', 'горький', 'кислый', 'солёный', 'пресный', 'пряный', 'терпкий',
                        'вкусный', 'невкусный', 'аппетитный', 'сочный', 'сухой'
                    ];
                    const sensoryEn = [
                        'see', 'look', 'watch', 'view', 'gaze', 'stare', 'glance', 'peer',
                        'eye', 'eyes', 'sight', 'vision', 'view', 'scene', 'landscape',
                        'light', 'dark', 'shadow', 'shine', 'glow', 'flash', 'sparkle',
                        'color', 'colour', 'bright', 'dim', 'clear', 'foggy', 'mist',

                        'hear', 'listen', 'sound', 'noise', 'voice', 'tone', 'music', 'song',
                        'silence', 'quiet', 'loud', 'soft', 'faint', 'rustle', 'whisper',
                        'scream', 'shout', 'cry', 'laugh', 'footstep', 'step', 'ring', 'bang',
                    
                        'touch', 'feel', 'hand', 'finger', 'skin', 'soft', 'hard', 'smooth',
                        'rough', 'warm', 'cold', 'hot', 'cool', 'icy', 'burning', 'wet',
                        'dry', 'sticky', 'slippery', 'sharp', 'dull', 'furry', 'silky',
                    
                        'smell', 'scent', 'odor', 'aroma', 'perfume', 'fragrance', 'stink',
                        'reek', 'whiff', 'musty', 'fresh', 'foul', 'sweet', 'pungent',
                    
                        'taste', 'flavor', 'sweet', 'sour', 'bitter', 'salty', 'savory',
                        'delicious', 'yummy', 'spicy', 'hot', 'mild', 'juicy', 'dry'
                    ];
                    let sensoryCount = 0;
                    sensoryRu.concat(sensoryEn).forEach(w => {
                              const re = new RegExp(w, 'gi');
                              const m = text.match(re);
                              if (m) sensoryCount += m.length;
                    });
                    metrics.immersiveness = totalWords ? (sensoryCount / totalWords * 1000).toFixed(1) : 0;
                    
                    const sentLengths = sentences.map(s => (s.match(/[a-zA-Zа-яА-ЯёЁ0-9]+/gu) || []).length);
                    const sentFreq = {};
                    sentLengths.forEach(len => sentFreq[len] = (sentFreq[len] || 0) + 1);
                    let sentEntropy = 0;
                    if (totalSentences > 0) {
                              Object.values(sentFreq).forEach(f => {
                                        const p = f / totalSentences;
                                        sentEntropy -= p * Math.log2(p);
                              });
                    }
                    const uniqueSentLengths = Object.keys(sentFreq).length;
                    const maxSentEntropy = uniqueSentLengths > 1 ? Math.log2(uniqueSentLengths) : 0;
                    const normSentEntropy = maxSentEntropy > 0 ? sentEntropy / maxSentEntropy : 0;
                    
                    const paraLengths = paragraphs.map(p => {
                              const s = p.split(/[.!?]+/).filter(Boolean);
                              return s.length;
                    });
                    if (paraLengths.length === 0) paraLengths.push(totalSentences);
                    const paraFreq = {};
                    paraLengths.forEach(len => paraFreq[len] = (paraFreq[len] || 0) + 1);
                    let paraEntropy = 0;
                    const totalParas = paraLengths.length;
                    if (totalParas > 0) {
                              Object.values(paraFreq).forEach(f => {
                                        const p = f / totalParas;
                                        paraEntropy -= p * Math.log2(p);
                              });
                    }
                    const uniqueParaLengths = Object.keys(paraFreq).length;
                    const maxParaEntropy = uniqueParaLengths > 1 ? Math.log2(uniqueParaLengths) : 0;
                    const normParaEntropy = maxParaEntropy > 0 ? paraEntropy / maxParaEntropy : 0;
                    
                    const punctuationMarks = [
                              '.', ',', '!', '?', ';', ':', '—', '…',
                              '(', ')', '[', ']', '{', '}', '"', "'", '«', '»'
                    ];
                    const punctCounts = {};
                    punctuationMarks.forEach(mark => punctCounts[mark] = 0);
                    for (let i = 0; i < chars; i++) {
                              const ch = text[i];
                              if (punctCounts.hasOwnProperty(ch)) punctCounts[ch]++;
                    }
                    const totalPunct = Object.values(punctCounts).reduce((a, b) => a + b, 0);
                    let punctEntropy = 0;
                    if (totalPunct > 0) {
                              Object.values(punctCounts).forEach(c => {
                                        if (c > 0) {
                                                  const p = c / totalPunct;
                                                  punctEntropy -= p * Math.log2(p);
                                        }
                              });
                    }
                    const usedPunct = Object.keys(punctCounts).filter(m => punctCounts[m] > 0).length;
                    const maxPunctEntropy = usedPunct > 1 ? Math.log2(usedPunct) : 0;
                    const normPunctEntropy = maxPunctEntropy > 0 ? punctEntropy / maxPunctEntropy : 0;
                    
                    const chaosPercent = ((normSentEntropy + normParaEntropy + normPunctEntropy) / 3 * 100).toFixed(1);
                    metrics.chaosEntropyPercent = chaosPercent;
                    
                    return metrics;
        }

        calculatePoetryMetrics(text) {
                            if (!text || typeof text !== 'string') return {};
                  
                            const lines = text.split('\n').filter(line => line.trim().length > 0);
                            const totalLines = lines.length;
                            if (totalLines === 0) return {};
                  
                            const allWords = text.match(/[a-zA-Zа-яА-ЯёЁ0-9]+/gu) || [];
                            const totalWords = allWords.length;
                            if (totalWords === 0) return {};
                  
                            const vowelsRu = 'аеёиоуыэюя';
                            const vowelsEn = 'aeiouy';
                            const allVowels = vowelsRu + vowelsEn + vowelsRu.toUpperCase() + vowelsEn.toUpperCase();
                  
                            const metrics = {};
                  
                            let anaphoraCount = 0;
                            for (let i = 1; i < totalLines; i++) {
                                      const prevFirst = lines[i-1].match(/[a-zA-Zа-яА-ЯёЁ0-9]+/gu)?.[0]?.toLowerCase();
                                      const currFirst = lines[i].match(/[a-zA-Zа-яА-ЯёЁ0-9]+/gu)?.[0]?.toLowerCase();
                                      if (prevFirst && currFirst && prevFirst === currFirst) {
                                                anaphoraCount++;
                                      }
                            }
                            metrics.anaphoraFreq = totalLines ? ((anaphoraCount / totalLines) * 100).toFixed(1) : 0;
                  
                            let epiphoraCount = 0;
                            for (let i = 1; i < totalLines; i++) {
                                      const prevWords = lines[i-1].match(/[a-zA-Zа-яА-ЯёЁ0-9]+/gu);
                                      const currWords = lines[i].match(/[a-zA-Zа-яА-ЯёЁ0-9]+/gu);
                                      if (prevWords && currWords && prevWords.length > 0 && currWords.length > 0) {
                                                const prevLast = prevWords[prevWords.length-1].toLowerCase();
                                                const currLast = currWords[currWords.length-1].toLowerCase();
                                                if (prevLast === currLast) {
                                                          epiphoraCount++;
                                                }
                                      }
                            }
                            metrics.epiphoraFreq = totalLines ? ((epiphoraCount / totalLines) * 100).toFixed(1) : 0;
                  
                            const consonantsRu = 'бвгджзйклмнпрстфхцчшщ';
                            const consonantsEn = 'bcdfghjklmnpqrstvwxz';
                            const allConsonants = consonantsRu + consonantsEn + consonantsRu.toUpperCase() + consonantsEn.toUpperCase();
                            let consRepetitions = 0;
                            const consCounts = {};
                            for (let char of text) {
                                      if (allConsonants.includes(char)) {
                                                consCounts[char] = (consCounts[char] || 0) + 1;
                                      }
                            }
                            for (let count of Object.values(consCounts)) {
                                      if (count > 1) consRepetitions += (count - 1);
                            }
                            metrics.consonantWhisper = totalWords ? ((consRepetitions / totalWords) * 100).toFixed(1) : 0;
                  
                            let vowelRepetitions = 0;
                            const vowelCounts = {};
                            for (let char of text) {
                                      if (allVowels.includes(char)) {
                                                vowelCounts[char] = (vowelCounts[char] || 0) + 1;
                                      }
                            }
                            for (let count of Object.values(vowelCounts)) {
                                      if (count > 1) vowelRepetitions += (count - 1);
                            }
                            metrics.vowelCaress = totalWords ? ((vowelRepetitions / totalWords) * 100).toFixed(1) : 0;
                  
                            let syllableCount = 0;
                            for (let char of text) {
                                      if (allVowels.includes(char)) syllableCount++;
                            }
                            metrics.syllableScore = totalWords ? ((syllableCount / totalWords) * 100).toFixed(1) : 0;
                  
                            let syllablesPerLine = [];
                            for (let line of lines) {
                                      let lineSyllables = 0;
                                      for (let char of line) {
                                                if (allVowels.includes(char)) lineSyllables++;
                                      }
                                      syllablesPerLine.push(lineSyllables);
                            }
                            const avgSyllablesPerLine = syllablesPerLine.reduce((a,b) => a+b, 0) / totalLines;
                            metrics.stropheMeter = avgSyllablesPerLine.toFixed(1);
                  
                            let lineEndings = [];
                            for (let line of lines) {
                                      const words = line.match(/[a-zA-Zа-яА-ЯёЁ0-9]+/gu);
                                      if (words && words.length > 0) {
                                                const lastWord = words[words.length-1].toLowerCase();
                                                const ending = lastWord.slice(-3);
                                                lineEndings.push(ending);
                                      } else {
                                                lineEndings.push('');
                                      }
                            }
                            let rhymePairs = 0;
                            const endingCounts = {};
                            for (let end of lineEndings) {
                                      if (end) {
                                                endingCounts[end] = (endingCounts[end] || 0) + 1;
                                      }
                            }
                            for (let count of Object.values(endingCounts)) {
                                      if (count > 1) {
                                                rhymePairs += count * (count - 1) / 2;
                                      }
                            }
                            metrics.rhymeCatcher = totalLines ? ((rhymePairs / totalLines) * 100).toFixed(1) : 0;
                  
                            let patterns = {};
                            for (let i = 0; i + 3 < totalLines; i += 4) {
                                      const pattern = [];
                                      for (let j = 0; j < 4; j++) {
                                                const lineWords = lines[i+j].match(/[a-zA-Zа-яА-ЯёЁ0-9]+/gu) || [];
                                                pattern.push(lineWords.length);
                                      }
                                      const key = pattern.join('-');
                                      patterns[key] = (patterns[key] || 0) + 1;
                            }
                            let bestPattern = 'смешанный';
                            let maxCount = 0;
                            for (let [pattern, count] of Object.entries(patterns)) {
                                      if (count > maxCount) {
                                                maxCount = count;
                                                bestPattern = pattern;
                                      }
                            }
                            metrics.suitableMeter = bestPattern;
                  
                            const lineLengths = lines.map(line => (line.match(/[a-zA-Zа-яА-ЯёЁ0-9]+/gu) || []).length);
                            const avgLineLength = lineLengths.reduce((a,b) => a+b, 0) / totalLines;
                            metrics.lineLength = avgLineLength.toFixed(1);
                  
                            const uniqueLengths = new Set(lineLengths).size;
                            metrics.freedomWaves = totalLines ? ((uniqueLengths / totalLines) * 100).toFixed(1) : 0;

                            metrics.totalLines = totalLines;
                  
                            return metrics;
        }

        calculateJournalistMetrics(text) {
                    if (!text || typeof text !== 'string') return {};
                    
                    const words = text.match(/[a-zA-Zа-яА-ЯёЁ0-9]+/gu) || [];
                    const totalWords = words.length;
                    const lowerText = text.toLowerCase();
                    
                    const metrics = {};
                    
                    const numberRegex = /\b\d+([.,]\d+)?\b/g;
                    const numbers = text.match(numberRegex) || [];
                    const dateWordsRu = ['год','года','лет','месяц','месяца','месяцев','день','дня','дней','неделя','недели','недель'];
                    const dateWordsEn = ['year','years','month','months','day','days','week','weeks'];
                    let dateWordCount = 0;
                    dateWordsRu.concat(dateWordsEn).forEach(w => {
                              const re = new RegExp(w, 'gi');
                              const m = text.match(re);
                              if (m) dateWordCount += m.length;
                    });
                    metrics.digitalFootprint = totalWords ? ((numbers.length + dateWordCount) / totalWords * 1000).toFixed(1) : 0;
                    
                    const sentences = text.split(/[.!?]+/).filter(Boolean);
                    let nameCount = 0;
                    sentences.forEach(s => {
                              const trimmed = s.trim();
                              if (!trimmed) return;
                              const firstWordEnd = trimmed.search(/\s/);
                              const firstWord = firstWordEnd === -1 ? trimmed : trimmed.substring(0, firstWordEnd);
                              const rest = firstWordEnd === -1 ? '' : trimmed.substring(firstWordEnd);
                              const candidates = rest.match(/\b[A-ZА-Я][a-zа-яё]*\b/g) || [];
                              nameCount += candidates.length;
                    });
                    metrics.nameIndex = totalWords ? (nameCount / totalWords * 1000).toFixed(1) : 0;
                    
                    const subjectiveRu = ['я думаю','я считаю','мне кажется','на мой взгляд','по моему мнению','полагаю','уверен','сомневаюсь'];
                    const subjectiveEn = ['i think','i believe','in my opinion','it seems to me','i suppose','i guess'];
                    let subjectiveCount = 0;
                    subjectiveRu.concat(subjectiveEn).forEach(phrase => {
                              const re = new RegExp(phrase, 'gi');
                              const m = lowerText.match(re);
                              if (m) subjectiveCount += m.length;
                    });
                    const subjectiveScore = totalWords ? (subjectiveCount / totalWords * 1000) : 0;
                    metrics.factMirror = Math.max(0, 100 - subjectiveScore * 10).toFixed(1);
                    
                    const freshnessRu = ['сегодня','вчера','сейчас','только что','этой ночью','час назад','утром','в понедельник','на этой неделе'];
                    const freshnessEn = ['today','yesterday','tonight','this morning','just in','breaking','hours ago'];
                    let freshnessCount = 0;
                    freshnessRu.concat(freshnessEn).forEach(phrase => {
                              const re = new RegExp(phrase, 'gi');
                              const m = lowerText.match(re);
                              if (m) freshnessCount += m.length;
                    });
                    metrics.freshnessGauge = totalWords ? (freshnessCount / totalWords * 1000).toFixed(1) : 0;
                    
                    const clickbaitRu = ['шокирует','сенсация','сенсацией','сенсаций','секрет','тайна','невероятно','вы не поверите','скандал','ужас','кошмар','немедленно','сенсационный','шокирующий','потрясающий','невероятный','фантастический','эксклюзив','срочно','только что','секретный','тайный','скандальный','ужасный','кошмарный','безумный','сумасшедший','эпичный','детали','подробности','шок','сенсационно','шокирующие','сенсационные','потрясающе','нереально','очевидец','видео','фото','расследование','разоблачение','инсайд','утечка','шокирующее','сенсационное','скандальное','громкое','резонансное','неожиданное','внезапное','экстренное','важное','спецвыпуск'];
                    const clickbaitEn = ['shocking','unbelievable','you won\'t believe','secret','scandal','what happened next','viral','sensation','sensational','astonishing','incredible','mind-blowing','epic','crazy','jaw-dropping','dramatic','unexpected','exclusive','warning','urgent','must see','will shock you','what happens next'];
                    let clickbaitCount = 0;
                    clickbaitRu.concat(clickbaitEn).forEach(phrase => {
                              const re = new RegExp(phrase, 'gi');
                              const m = lowerText.match(re);
                              if (m) clickbaitCount += m.length;
                    });
                    const clickbaitScore = totalWords ? (clickbaitCount / totalWords * 1000) : 0;
                    metrics.antiYellow = Math.max(0, 100 - clickbaitScore * 20).toFixed(1);
                    
                    const contrastRu = ['однако','но','тем не менее','несмотря на','с другой стороны','вопреки'];
                    const contrastEn = ['nevertheless','however','but','although','despite','on the other hand','whereas'];
                    let contrastCount = 0;
                    contrastRu.concat(contrastEn).forEach(phrase => {
                              const re = new RegExp(phrase, 'gi');
                              const m = lowerText.match(re);
                              if (m) contrastCount += m.length;
                    });
                    metrics.opinionPalette = totalWords ? (contrastCount / totalWords * 1000).toFixed(1) : 0;
                    
                    const bureaucratRu = [
                              'осуществление','мероприятие','взаимодействие','обеспечение','реализация','находится','является',
                              'производится','за счёт','в целях','в рамках','на сегодняшний день','в настоящее время','с учётом',
                              'в соответствии','во исполнение','а также','данный','вышеуказанный'
                    ];
                    const bureaucratEn = [
                              'implementation','provision','interaction','within the framework','in accordance','currently',
                              'this','these','aforementioned'
                    ];
                    let bureaucratCount = 0;
                    bureaucratRu.concat(bureaucratEn).forEach(phrase => {
                              const re = new RegExp(phrase, 'gi');
                              const m = lowerText.match(re);
                              if (m) bureaucratCount += m.length;
                    });
                    metrics.bureaucraticNoise = totalWords ? (bureaucratCount / totalWords * 1000).toFixed(1) : 0;
                    
                    const wordsList = words.map(w => w.toLowerCase());
                    let tautologyPairs = 0;
                    for (let i = 0; i < wordsList.length - 1; i++) {
                              for (let j = i + 1; j < Math.min(i + 50, wordsList.length); j++) {
                                        if (wordsList[i].length > 3 && wordsList[j].length > 3 &&
                                            wordsList[i] !== wordsList[j] &&
                                            (wordsList[i].startsWith(wordsList[j].substring(0, 4)) ||
                                             wordsList[j].startsWith(wordsList[i].substring(0, 4)))) {
                                                  tautologyPairs++;
                                        }
                              }
                    }
                    metrics.verbalEcho = totalWords ? (tautologyPairs / totalWords * 1000).toFixed(1) : 0;
                    
                    const vagueRu = ['около','примерно','почти','где-то','несколько','некоторый','некий','какой-то'];
                    const vagueEn = ['certain','some','several','around','approximately','almost','nearly','kind of','sort of'];
                    let vagueCount = 0;
                    vagueRu.concat(vagueEn).forEach(phrase => {
                              const re = new RegExp(phrase, 'gi');
                              const m = lowerText.match(re);
                              if (m) vagueCount += m.length;
                    });
                    metrics.fogZone = totalWords ? (vagueCount / totalWords * 1000).toFixed(1) : 0;
                    
                    const absoluteRu = ['всегда','никогда','каждый','любой','никто','ничто','весь','абсолютно','совершенно','полностью'];
                    const absoluteEn = ['always','never','every','anybody','nobody','nothing','all','absolutely','completely','entirely'];
                    let absoluteCount = 0;
                    absoluteRu.concat(absoluteEn).forEach(phrase => {
                              const re = new RegExp(phrase, 'gi');
                              const m = lowerText.match(re);
                              if (m) absoluteCount += m.length;
                    });
                    metrics.categoricalTone = totalWords ? (absoluteCount / totalWords * 1000).toFixed(1) : 0;
                    
                    return metrics;
        }

        calculateCopywriterMetrics(text) {
                            if (!text || typeof text !== 'string') return {};
                  
                            const sentences = text.split(/[.!?]+/).filter(Boolean);
                            const words = text.match(/[a-zA-Zа-яА-ЯёЁ0-9]+/gu) || [];
                            const totalWords = words.length;
                            const lowerText = text.toLowerCase();
                  
                            const metrics = {};
                  
                            const stopWordsRu = ['и','в','во','не','что','он','на','я','с','со','как','а','то','все','она','так','его','но','да','ты','к','у','же','вы','за','бы','по','только','ее','мне','было','вот','от','меня','еще','нет','о','из','ему','теперь','когда','даже','ну','вдруг','ли','если','уже','или','ни','быть','был','него','до','вас','нибудь','опять','уж','вам','ведь','там','потом','себя','ничего','ей','может','они','тут','где','есть','надо','ней','для','мы','тем','кто','меня','сейчас','без','под','над','об','при','про','через','после','вокруг','около','мимо','среди','между','ради','благодаря','ввиду','вследствие','вроде','насчет','вместо','несмотря','спустя'];
                            const stopWordsEn = ['i','me','my','myself','we','our','ours','ourselves','you','your','yours','yourself','yourselves','he','him','his','himself','she','her','hers','herself','it','its','itself','they','them','their','theirs','themselves','what','which','who','whom','this','that','these','those','am','is','are','was','were','be','been','being','have','has','had','having','do','does','did','doing','a','an','the','and','but','if','or','because','as','until','while','of','at','by','for','with','about','against','between','into','through','during','before','after','above','below','to','from','up','down','in','out','on','off','over','under','again','further','then','once','here','there','when','where','why','how','all','any','both','each','few','more','most','other','some','such','no','nor','not','only','own','same','so','than','too','very','s','t','can','will','just','don','should','now'];
                  
                            const ctaRu = ['купи','подпишись','жми','скачай','попробуй','закажи','оформи','введи','перейди','начни','получи','сэкономь','забронируй','запишись','кликни','позвони'];
                            const ctaEn = ['buy','subscribe','click','download','try','order','enter','start','get','save','book','register','join','call','shop'];
                  
                            const clicheRu = ['инновационный','уникальный','качественный','профессиональный','оптимальный','эффективный','надёжный','доступный','выгодный','современный'];
                            const clicheEn = ['innovative','unique','quality','professional','optimal','effective','reliable','affordable','beneficial','modern'];
                  
                            const superlativeRu = ['лучший','величайший','идеальный','совершенный','безупречный','первоклассный','топовый','ультимативный','превосходный'];
                            const superlativeEn = ['best','greatest','perfect','ideal','ultimate','superior','top','prime','supreme','finest'];
                  
                            const fillerRu = ['ну','вообще','типа','как бы','короче','это самое','в общем','значит','так сказать','в принципе','в некотором роде'];
                            const fillerEn = ['well','like','you know','actually','basically','literally','sort of','kind of','in a way','i mean'];
                  
                            const firstPersonRu = ['я','меня','мне','мной','мною','мы','нас','нам','нами'];
                            const firstPersonEn = ['i','me','my','mine','we','us','our','ours'];
                  
                            const wordFreq = {};
                            words.forEach(w => {
                                      const lw = w.toLowerCase();
                                      if ((this.language === 'ru' && !stopWordsRu.includes(lw)) || (this.language === 'en' && !stopWordsEn.includes(lw))) {
                                                wordFreq[lw] = (wordFreq[lw] || 0) + 1;
                                      }
                            });
                            const sorted = Object.entries(wordFreq).sort((a,b) => b[1] - a[1]);
                            const top5 = sorted.slice(0,5);
                            const top5Sum = top5.reduce((acc, [_, freq]) => acc + freq, 0);
                            metrics.seoDensity = totalWords ? ((top5Sum / totalWords) * 100).toFixed(1) : 0;
                  
                            let ctaCount = 0;
                            ctaRu.concat(ctaEn).forEach(phrase => {
                                      const re = new RegExp(phrase, 'gi');
                                      const m = lowerText.match(re);
                                      if (m) ctaCount += m.length;
                            });
                            metrics.callToAction = totalWords ? Math.round((ctaCount / totalWords) * 1000) : 0;
                  
                            let clicheCount = 0;
                            clicheRu.concat(clicheEn).forEach(phrase => {
                                      const re = new RegExp(phrase, 'gi');
                                      const m = lowerText.match(re);
                                      if (m) clicheCount += m.length;
                            });
                            metrics.clicheMeter = totalWords ? Math.round((clicheCount / totalWords) * 1000) : 0;
                  
                            let superlativeCount = 0;
                            superlativeRu.concat(superlativeEn).forEach(phrase => {
                                      const re = new RegExp(phrase, 'gi');
                                      const m = lowerText.match(re);
                                      if (m) superlativeCount += m.length;
                            });
                            metrics.superlativeDegree = totalWords ? Math.round((superlativeCount / totalWords) * 1000) : 0;
                  
                            let firstPersonCount = 0;
                            words.forEach(w => {
                                      const lw = w.toLowerCase();
                                      if (firstPersonRu.includes(lw) || firstPersonEn.includes(lw)) firstPersonCount++;
                            });

                            const pastRu = /[а-яё]+(л|ла|ло|ли)/gi;
                            const pastEnWords = ['went','saw','did','said','came','took','thought','made','felt','got','gave','found','knew','left','meant','bought','told','became','began','broke','brought','built','bought','caught','chose','drank','drove','ate','fell','flew','forgot','froze','gave','grew','hung','hid','kept','led','left','let','lost','made','met','paid','put','ran','said','saw','sold','sent','sang','sat','slept','spoke','spent','stood','stole','swam','took','taught','thought','threw','understood','woke','won','wrote'];
                            const pastEnEd = /\b[a-z]+ed\b/gi;
                            let pastCount = 0;
                            const pastRuMatches = text.match(pastRu);
                            if (pastRuMatches) pastCount += pastRuMatches.length;
                            pastEnWords.forEach(w => {
                                      const re = new RegExp('\\b' + w + '\\b', 'gi');
                                      const m = text.match(re);
                                      if (m) pastCount += m.length;
                            });
                            const pastEnEdMatches = text.match(pastEnEd);
                            if (pastEnEdMatches) pastCount += pastEnEdMatches.length;
                            const properCandidates = text.match(/\b[A-ZА-Я][a-zа-яё]*\b/g) || [];
                            const firstWords = sentences.map(s => {
                                      const first = s.trim().split(/\s+/)[0];
                                      return first ? first.replace(/[^a-zA-Zа-яА-ЯёЁ]/g, '') : '';
                            }).filter(w => w.length > 0);
                            const properNames = properCandidates.filter(word => !firstWords.includes(word));
                            const properCount = properNames.length;
                  
                            const storytellingMarkers = firstPersonCount + pastCount + properCount;
                            metrics.storytelling = totalWords ? Math.round((storytellingMarkers / totalWords) * 1000) : 0;
                  
                            let fillerCount = 0;
                            fillerRu.concat(fillerEn).forEach(phrase => {
                                      const re = new RegExp(phrase, 'gi');
                                      const m = lowerText.match(re);
                                      if (m) fillerCount += m.length;
                            });
                            metrics.fillerWords = totalWords ? Math.round((fillerCount / totalWords) * 1000) : 0;
                  
                            let stopWordsCount = 0;
                            words.forEach(w => {
                                      const lw = w.toLowerCase();
                                      if ((this.language === 'ru' && stopWordsRu.includes(lw)) || (this.language === 'en' && stopWordsEn.includes(lw))) {
                                                stopWordsCount++;
                                      }
                            });
                            metrics.waterContent = totalWords ? ((stopWordsCount / totalWords) * 100).toFixed(1) : 0;
                  
                            const topFreq = sorted.length > 0 ? sorted[0][1] : 0;
                            metrics.spamIndex = totalWords ? ((topFreq / totalWords) * 100).toFixed(1) : 0;
                  
                            // 9. Наличие списков
                            const lines = text.split('\n');
                            let listItems = 0;
                            lines.forEach(line => {
                                      const trimmed = line.trim();
                                      if (/^[\*\-•]/.test(trimmed) || /^\d+\./.test(trimmed)) {
                                                listItems++;
                                      }
                            });
                            metrics.listDensity = totalWords ? Math.round((listItems / totalWords) * 1000) : 0;
                  
                            const allWordsFreq = {};
                            words.forEach(w => {
                                      const lw = w.toLowerCase();
                                      allWordsFreq[lw] = (allWordsFreq[lw] || 0) + 1;
                            });
                            const uniqueOnce = Object.values(allWordsFreq).filter(f => f === 1).length;
                            metrics.noveltyCoefficient = totalWords ? ((uniqueOnce / totalWords) * 100).toFixed(1) : 0;
                  
                            return metrics;
        }

        calculateFunMetrics(text) {
                    if (!text || typeof text !== 'string') return {};
                    
                    const words = text.match(/[a-zA-Zа-яА-ЯёЁ0-9]+/gu) || [];
                    const totalWords = words.length;
                    const lowerText = text.toLowerCase();
                    const sentences = text.split(/[.!?]+/).filter(Boolean);
                    const totalSentences = sentences.length;
                    
                    const metrics = {};
                    
                    const coffeeWords = ['кофе','эспрессо','капучино','латте','американо','coffee','espresso','cappuccino','latte','americano'];
                    let coffeeCount = 0;
                    coffeeWords.forEach(w => {
                              const re = new RegExp(w, 'gi');
                              const m = lowerText.match(re);
                              if (m) coffeeCount += m.length;
                    });
                    metrics.moreCoffee = totalWords ? Math.min(10, Math.round((coffeeCount / totalWords * 1000))) : 0;
                    
                    const longWords = words.filter(w => w.length >= 10).length;
                    metrics.lostTime = totalWords ? Math.min(10, Math.round((longWords / totalWords * 1000))) : 0;
                    
                    const sentLengths = sentences.map(s => (s.match(/[a-zA-Zа-яА-ЯёЁ0-9]+/gu) || []).length);
                    const avgSentLength = sentLengths.length > 0 ? sentLengths.reduce((a,b)=>a+b,0) / sentLengths.length : 0;
                    const longSentCount = sentLengths.filter(l => l > avgSentLength * 1.5).length;
                    metrics.rabbitHole = totalWords ? Math.min(10, Math.round((longSentCount / totalWords * 1000))) : 0;
                    
                    const crimeWords = ['тюрьма','вор','мент','бандит','разборка','киллер','мафия','оружие','криминал','преступление','пушка','ограбление','prison','thief','cop','gangster','murder','weapon','crime','robbery','criminal','mob'];
                    let crimeCount = 0;
                    crimeWords.forEach(w => {
                              const re = new RegExp(w, 'gi');
                              const m = lowerText.match(re);
                              if (m) crimeCount += m.length;
                    });
                    metrics.pulpFiction = totalWords ? Math.min(10, Math.round((crimeCount / totalWords * 1000))) : 0;
                    
                    const angerWords = ['бесит','злит','ненавижу','достало','надоело','ужасно','раздражает','терпеть','hate','annoying','frustrating','sick of','terrible','awful','irritating','cannot stand','fed up'];
                    let angerCount = 0;
                    angerWords.forEach(w => {
                              const re = new RegExp(w, 'gi');
                              const m = lowerText.match(re);
                              if (m) angerCount += m.length;
                    });
                    metrics.copyOfCopy = totalWords ? Math.min(10, Math.round((angerCount / totalWords * 1000))) : 0;
                    
                    const officeWords = ['офис','кулер','бумага','принтер','переговорка','дедлайн','отчёт','договор','совещание','планёрка','менеджер','скрентон','босс','office','printer','paper','scranton','meeting','deadline','report','copier','cubicle','boss','manager'];
                    let officeCount = 0;
                    officeWords.forEach(w => {
                              const re = new RegExp(w, 'gi');
                              const m = lowerText.match(re);
                              if (m) officeCount += m.length;
                    });
                    metrics.scranton = totalWords ? Math.min(10, Math.round((officeCount / totalWords * 1000))) : 0;
                    
                    const magicWords = ['магия','волшебство','чудо','эликсир','заклинание','волшебник','колдун','фея','дракон','Гарри','Поттер','Дамблдор','волшебная палочка','Хогсмит','Гермиона','Рон','Гриффиндор','magic','wizard','witch','spell','elixir','miracle','fairy','dragon','Harry','Potter','Gryffindor','Dumbledore'];
                    let magicCount = 0;
                    magicWords.forEach(w => {
                              const re = new RegExp(w, 'gi');
                              const m = lowerText.match(re);
                              if (m) magicCount += m.length;
                    });
                    metrics.hogwarts = totalWords ? Math.min(10, Math.round((magicCount / totalWords * 1000))) : 0;
                    
                    const spaceWords = ['космос','звезда','планета','луч','галактика','вселенная','спутник','орбита','ракета','пришелец','джедай','инопланетянин','space','star','planet','ray','galaxy','universe','satellite','orbit','rocket','alien','jedi'];
                    let spaceCount = 0;
                    spaceWords.forEach(w => {
                              const re = new RegExp(w, 'gi');
                              const m = lowerText.match(re);
                              if (m) spaceCount += m.length;
                    });
                    metrics.unknownPlanets = totalWords ? Math.min(10, Math.round((spaceCount / totalWords * 1000))) : 0;
                    
                    const doubleLetterWords = words.filter(w => /(.)\1/.test(w)).length;
                    metrics.mordor = totalWords ? Math.min(10, Math.round((doubleLetterWords / totalWords * 1000))) : 0;
                    
                    const allLetters = text.match(/[a-zA-Zа-яА-ЯёЁ]/g) || [];
                    const totalLetters = allLetters.length;
                    const vowels = /[аеёиоуыэюяaeiouy]/gi;
                    const consonantCount = allLetters.filter(ch => !ch.match(vowels)).length;
                    const consonantRatio = totalLetters ? consonantCount / totalLetters : 0;
                    metrics.garageRock = totalLetters ? Math.min(10, Math.round(consonantRatio * 10)) : 0;
                    
                    const lovePattern = /я тебя люблю|i love you/gi;
                    const loveMatches = text.match(lovePattern) || [];
                    metrics.iceMelts = loveMatches.length > 0 ? Math.min(10, loveMatches.length) : 0;
                    
                    return metrics;
        }
        
        detectLanguageWithConfidence(text) {
            if (!text || typeof text !== 'string') {
                return { language: 'en', confidence: 0.5 };
            }
            if (this.language !== 'auto') {
                return { language: this.language, confidence: 1.0 };
            }
            if (/[ёЁ]/.test(text)) {
                return { language: 'ru', confidence: 0.95 };
            }
            const ruChars = (text.match(/[а-яА-ЯёЁ]/g) || []).length;
            const enChars = (text.match(/[a-zA-Z]/g) || []).length;
            const totalChars = ruChars + enChars;
            if (totalChars === 0) {
                return /[А-Яа-яЁё]/.test(text) ? 
                    { language: 'ru', confidence: 0.7 } : 
                    { language: 'en', confidence: 0.5 };
            }
            const ruRatio = ruChars / totalChars;
            const enRatio = enChars / totalChars;
            const diff = Math.abs(ruRatio - enRatio);
            let baseConfidence = Math.max(ruRatio, enRatio);
            if (text.length < 30) {
                baseConfidence = Math.min(baseConfidence, 0.75);
            }
            if (diff < 0.25) {
                baseConfidence = Math.min(baseConfidence, 0.65);
            }
            const lowerText = text.toLowerCase();
            const hasRuMarkers = /(^|\s)(и|в|на|с|к|а|но|или|да|же)($|\s)/.test(lowerText);
            const hasEnMarkers = /(^|\s)(the|a|an|and|or|but|in|on|at|to)($|\s)/.test(lowerText);
            let confidence = baseConfidence;
            if (hasRuMarkers && ruRatio > enRatio) confidence = Math.min(0.9, confidence + 0.15);
            if (hasEnMarkers && enRatio > ruRatio) confidence = Math.min(0.9, confidence + 0.15);
            if (hasRuMarkers && hasEnMarkers && diff < 0.4) {
                confidence = Math.min(confidence, 0.6);
            }
            const detectedLang = ruRatio >= enRatio ? 'ru' : 'en';
            return { 
                language: detectedLang,
                confidence: parseFloat(confidence.toFixed(2))
            };
        }
        
        enhancedPreprocessText(text) {
            const cleanedText = text
              .replace(/\r\n/g, '\n')
              .replace(/\r/g, '\n')
              .replace(/\t/g, ' ')
              .replace(/\u00A0/g, ' ')
              .replace(/\u200B/g, '')
              .replace(/\u200C/g, '')
              .replace(/\u200D/g, '')
              .replace(/\uFEFF/g, '')
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
              shortWords: words.filter(w => w.length < 4).length,
              wordLengthDistribution: this.calculateWordLengthDistribution(words),
              avgSentenceLength: sentences.length > 0 ? 
                sentences.reduce((sum, s) => sum + s.wordCount, 0) / sentences.length : 0,
              punctuationDensity: this.calculatePunctuationDensity(cleanedText),
              emoticonDensity: this.calculateEmoticonDensity(emoticons, words.length)
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
          if (!text || typeof text !== 'string') {
            return [];
          }
          const abbreviations = this.language === 'ru'
            ? ['т\.д\.', 'т\.п\.', 'др\.', 'г\.', 'ул\.', 'им\.', 'проф\.', 'акад\.', 'см\.', 'рис\.', 'стр\.', 'п\.', 'к\.', 'м\.', 'ж\.', 'гг\.', 'вв\.', 'тыс\.', 'млн\.', 'млрд\.']
            : ['e\.g\.', 'i\.e\.', 'etc\.', 'Mr\.', 'Mrs\.', 'Dr\.', 'Prof\.', 'vs\.', 'fig\.', 'no\.', 'vol\.', 'pp\.', 'inc\.', 'ltd\.', 'corp\.', 'st\.', 'ave\.', 'blvd\.'];
          let protectedText = text;
          const placeholders = [];
          abbreviations.forEach((abbr, index) => {
            const regex = new RegExp(abbr, 'gi');
            let match;
            while ((match = regex.exec(protectedText)) !== null) {
              const placeholder = `__ABBR_${index}_${placeholders.length}__`;
              placeholders.push({ placeholder, original: match[0], position: match.index });
            }
          });
          placeholders.forEach(ph => {
            protectedText = protectedText.replace(ph.original, ph.placeholder);
          });
          const sentenceRegex = /[^.!?…]*[.!?…]+(?=\s+|$)/g;
          const matches = protectedText.match(sentenceRegex) || [];
          const sentences = matches
            .map(s => s.trim())
            .filter(s => s.length > 0)
            .map((sentence, index) => {
              let restored = sentence;
              placeholders.forEach(ph => {
                if (restored.includes(ph.placeholder)) {
                  restored = restored.replace(ph.placeholder, ph.original);
                }
              });
              return {
                text: restored,
                index: index,
                length: restored.length,
                wordCount: this.enhancedTokenization(restored).length,
                emotionalMarkers: this.extractSentenceEmotionalMarkers(restored)
              };
            });
          const lastMatchEnd = matches.reduce((end, m) => end + m.length, 0);
          if (lastMatchEnd < protectedText.length) {
            let remainder = protectedText.slice(lastMatchEnd).trim();
            if (remainder) {
              placeholders.forEach(ph => {
                if (remainder.includes(ph.placeholder)) {
                  remainder = remainder.replace(ph.placeholder, ph.original);
                }
              });
              sentences.push({
                text: remainder,
                index: sentences.length,
                length: remainder.length,
                wordCount: this.enhancedTokenization(remainder).length,
                emotionalMarkers: this.extractSentenceEmotionalMarkers(remainder)
              });
            }
          }
          return sentences;
        }

        calculateWordLengthDistribution(words) {
            if (words.length === 0) return { short: 0, medium: 0, long: 0 };
            const short = words.filter(w => w.length <= 3).length;
            const medium = words.filter(w => w.length > 3 && w.length <= 7).length;
            const long = words.filter(w => w.length > 7).length;
            const total = words.length;
            return {
              short: short / total,
              medium: medium / total,
              long: long / total
            };
        }

        calculatePunctuationDensity(text) {
            const punctuationCount = (text.match(/[.!?…,:;—\-]/g) || []).length;
            const wordCount = text.split(/\s+/).filter(w => w.length > 0).length;
            return wordCount > 0 ? punctuationCount / wordCount : 0;
        }

        calculateEmoticonDensity(emoticons, wordCount) {
            if (wordCount === 0) return 0;
            const totalEmoticons = Object.values(emoticons).reduce((a, b) => a + b, 0);
            return totalEmoticons / wordCount;
        }

        isValidSentence(sentence) {
            if (!sentence || sentence.length === 0) return false;
            const hasLetter = /[a-zA-Zа-яА-ЯёЁ]/.test(sentence);
            const hasContent = sentence.trim().length >= 2;
            return hasLetter && hasContent;
        }

        countWordsInSentence(sentence) {
            if (!sentence) return 0;
            return sentence
              .replace(/[^\p{L}\s\-']/gu, ' ')
              .split(/\s+/)
              .filter(w => w.length > 0).length;
        }

        findOriginalPosition(processedIndex, originalPositions) {
            if (!originalPositions || originalPositions.length === 0) return processedIndex;
            if (processedIndex < 0) return 0;
            if (processedIndex >= originalPositions.length) {
              return originalPositions[originalPositions.length - 1] || processedIndex;
            }
            return originalPositions[processedIndex] || processedIndex;
        }

        extractSentenceEmotionalMarkers(sentence) {
         if (typeof sentence !== 'string' || sentence.length === 0) {
            return {
              exclamation: 0,
              question: 0,
              ellipsis: 0,
              capitalization: 0,
              emotionalWords: 0,
              dash: 0,
              quotes: 0,
              combined: {
                exclamatory: 0,
                interrogative: 0,
                mixed: 0,
                repetitive: 0
              },
              position: {
                startsWithPunct: false,
                endsWithPunct: false
              },
              intensityBoosters: {
                repetition: 0,
                allCaps: 0
              },
              emotionalContext: {
                positive: 0,
                negative: 0,
                complex: 0,
                neutral: 0
              },
              modifiers: {
                intensifiers: 0,
                negations: 0,
                diminishers: 0
              }
            };
          }
          const exclamatory = (sentence.match(/!{2,}/g) || []).length;
          const interrogative = (sentence.match(/\?{2,}/g) || []).length;
          const mixedPunctuation = (sentence.match(/[!?]{2,}/g) || []).length;
          const repetitivePunctuation = (sentence.match(/([!?]){3,}/g) || []).length;
          const dash = (sentence.match(/—|--/g) || []).length;
          const quotes = (sentence.match(/["«»„“”]/g) || []).length;
          const startsWithPunct = /^[!?…—]/.test(sentence.trim());
          const endsWithPunct = /[!?…—]$/.test(sentence.trim());
          const repetition = (sentence.match(/([а-яёa-z])\1{2,}/gi) || []).length;
          const allCapsWords = (sentence.match(/\b[A-ZА-ЯЁ]{3,}\b/g) || []).length;
          const emotionalContext = this.analyzeEmotionalContext(sentence);
          const modifiers = this.extractEmotionalModifiers(sentence);
          return {
            exclamation: (sentence.match(/!/g) || []).length,
            question: (sentence.match(/\?/g) || []).length,
            ellipsis: (sentence.match(/…|\.{3,}/g) || []).length,
            capitalization: (sentence.match(/[A-ZА-ЯЁ]{2,}/g) || []).length,
            emotionalWords: this.countEmotionalWordsInSentence(sentence),
            dash,
            quotes,
            combined: {
              exclamatory,
              interrogative,
              mixed: mixedPunctuation,
              repetitive: repetitivePunctuation
            },
            position: {
              startsWithPunct,
              endsWithPunct
            },
            intensityBoosters: {
              repetition,
              allCaps: allCapsWords
            },
            emotionalContext,
            modifiers
          };
        }

        analyzeEmotionalContext(sentence) {
          const words = this.enhancedTokenization(sentence);
          const positiveCats = ['ecstasy', 'joy', 'love', 'peace', 'hope', 'gratitude', 'inspiration', 'pride'];
          const negativeCats = ['sadness', 'grief', 'anger', 'fear', 'disgust', 'shame', 'guilt', 'loneliness', 'envy', 'despair'];
          const complexCats = ['ambivalence', 'irony', 'nostalgiaMixed', 'bittersweet'];
          let positive = 0;
          let negative = 0;
          let complex = 0;
          let neutral = 0;
          for (const [category, wordList] of Object.entries(this.dictionaries[this.language])) {
            for (const word of wordList) {
              if (words.includes(word)) {
                if (positiveCats.includes(category)) positive++;
                else if (negativeCats.includes(category)) negative++;
                else if (complexCats.includes(category)) complex++;
                else neutral++;
                break;
              }
            }
          }
          return { positive, negative, complex, neutral };
        }
        
        extractEmotionalModifiers(sentence) {
          const lowerSentence = sentence.toLowerCase();
          const rules = this.contextRules[this.language];
          return {
            intensifiers: rules.intensifiers.filter(word => lowerSentence.includes(word)).length,
            negations: rules.negations.filter(word => lowerSentence.includes(word)).length,
            diminishers: rules.understatement.filter(word => lowerSentence.includes(word)).length
          };
        }
        
        countEmotionalWordsInSentence(sentence) {
                if (typeof sentence !== 'string' || sentence.length === 0) {
                    return 0;
                }
                
                const normalizedSentence = sentence
                    .toLowerCase()
                    .normalize('NFKC')
                    .replace(/[^\p{L}\p{M}\p{N}\s\-']/gu, ' ');
                
                const words = normalizedSentence
                    .split(/\s+/)
                    .filter(w => {
                        const trimmed = w.replace(/^[-']+|[-']+$/g, '');
                        return trimmed.length >= this.metricsConfig.wordThreshold;
                    });
                
                if (words.length === 0) {
                    return 0;
                }
                
                const dict = this.dictionaries[this.language];
                let totalCount = 0;
                const foundWords = new Set();
                
                for (const [category, categoryWords] of Object.entries(dict)) {
                    if (!Array.isArray(categoryWords)) {
                        continue;
                    }
                    
                    for (const emotionalWord of categoryWords) {
                        if (words.includes(emotionalWord)) {
                            totalCount++;
                            foundWords.add(emotionalWord);
                        }
                    }
                    
                    const categoryVariants = this.generateWordVariants(categoryWords);
                    
                    for (const variant of categoryVariants) {
                        if (words.includes(variant) && !foundWords.has(variant)) {
                            totalCount++;
                            foundWords.add(variant);
                        }
                    }
                }
                
                const partialMatches = this.countPartialMatches(words, dict);
                const contextualMatches = this.countContextualEmotions(sentence, dict);
                
                return totalCount + partialMatches + contextualMatches;
        }
          
        generateWordVariants(words) {
                const variants = new Set();
                const language = this.language;
                
                for (const word of words) {
                    variants.add(word);
                    
                    if (language === 'ru') {
                        if (word.endsWith('ая') || word.endsWith('яя') || 
                            word.endsWith('ое') || word.endsWith('ее') || 
                            word.endsWith('ый') || word.endsWith('ий')) {
                            const base = word.slice(0, -2);
                            variants.add(base + 'ого');
                            variants.add(base + 'ому');
                            variants.add(base + 'ым');
                            variants.add(base + 'ом');
                        }
                        
                        if (word.endsWith('ость')) {
                            variants.add(word.slice(0, -4) + 'ый');
                            variants.add(word.slice(0, -4) + 'ая');
                            variants.add(word.slice(0, -4) + 'ое');
                        }
                    } else if (language === 'en') {
                        if (word.endsWith('ing')) {
                            variants.add(word.slice(0, -3) + 'ed');
                            variants.add(word.slice(0, -3));
                        } else if (word.endsWith('ed')) {
                            variants.add(word.slice(0, -2) + 'ing');
                            variants.add(word.slice(0, -1));
                        } else if (word.endsWith('s')) {
                            variants.add(word.slice(0, -1));
                        }
                    }
                    
                    if (word.includes('-')) {
                        variants.add(word.replace('-', ''));
                        variants.add(word.replace('-', ' '));
                    }
                }
                
                return Array.from(variants);
        }
          
        countPartialMatches(words, dict) {
                let partialCount = 0;
                const processed = new Set();
                
                for (const word of words) {
                    if (processed.has(word)) {
                        continue;
                    }
                    
                    for (const [category, categoryWords] of Object.entries(dict)) {
                        if (!Array.isArray(categoryWords)) {
                            continue;
                        }
                        
                        for (const emotionalWord of categoryWords) {
                            if (emotionalWord.includes(word) && emotionalWord !== word) {
                                partialCount += 0.5;
                                processed.add(word);
                                break;
                            } else if (word.includes(emotionalWord) && emotionalWord !== word) {
                                partialCount += 0.3;
                                processed.add(word);
                                break;
                            }
                        }
                    }
                }
                
                return partialCount;
        }
          
        countContextualEmotions(sentence, dict) {
                const contextualMarkers = {
                    ru: [
                        { pattern: /(чувствую себя|ощущаю себя|испытываю)\s+(\w+)/i, weight: 1.2 },
                        { pattern: /(кажется|похоже|вероятно)\s+(что\s+)?(\w+)/i, weight: 0.7 },
                        { pattern: /(почти|чуть не|едва не)\s+(\w+)/i, weight: 0.8 },
                        { pattern: /(так\s+)?(\w+)\s+(что|как)/i, weight: 0.6 },
                        { pattern: /(не\s+)?(\w+)\s+(\w+)/i, weight: 0.5 }
                    ],
                    en: [
                        { pattern: /(feel|feeling|felt)\s+(\w+)/i, weight: 1.2 },
                        { pattern: /(seems|seemed|appears)\s+(to be\s+)?(\w+)/i, weight: 0.7 },
                        { pattern: /(almost|nearly|barely)\s+(\w+)/i, weight: 0.8 },
                        { pattern: /(so|too|very)\s+(\w+)/i, weight: 0.9 },
                        { pattern: /(not\s+)?(\w+)\s+(\w+)/i, weight: 0.5 }
                    ]
                };
                
                const markers = contextualMarkers[this.language] || [];
                let contextualScore = 0;
                
                for (const marker of markers) {
                    const matches = sentence.match(marker.pattern);
                    if (matches) {
                        const potentialEmotion = matches[matches.length - 1]?.toLowerCase();
                        if (potentialEmotion) {
                            for (const [category, categoryWords] of Object.entries(dict)) {
                                if (Array.isArray(categoryWords) && categoryWords.includes(potentialEmotion)) {
                                    contextualScore += marker.weight;
                                    break;
                                }
                            }
                        }
                    }
                }
                
                return Math.min(3, contextualScore);
        }
        
        enhancedTokenization(text) {
          if (!text || typeof text !== 'string') {
            return [];
          }
          const lowerText = text.toLowerCase();
          try {
            const config = this.metricsConfig.tokenization || {};
            const preserveNumbers = config.preserveNumbers !== false;
            const preserveEmojis = config.preserveEmojis === true;
            const normalize = config.normalize !== false;
            const minWordLength = config.minWordLength || this.metricsConfig.wordThreshold || 1;
            const preserveHyphens = config.preserveHyphens !== false;
            let processedText = lowerText;
            if (preserveEmojis) {
              processedText = this.extractAndPreserveEmojis(processedText);
            }
            if (this.language === 'ru') {
              const allowedPattern = preserveNumbers ?
                /[^а-яё0-9\s\-']/gi :
                /[^а-яё\s\-']/gi;
              return processedText
                .replace(allowedPattern, ' ')
                .replace(/\s+/g, ' ')
                .trim()
                .split(' ')
                .filter(w => w && w.length >= minWordLength)
                .map(w => this.normalizeRussianWord(w, normalize, preserveHyphens))
                .filter(w => w && w.length > 0);
            } else {
              const allowedPattern = preserveNumbers ?
                /[^a-z0-9\s\-']/gi :
                /[^a-z\s\-']/gi;
              return processedText
                .replace(allowedPattern, ' ')
                .replace(/\s+/g, ' ')
                .trim()
                .split(' ')
                .filter(w => w && w.length >= minWordLength)
                .map(w => this.normalizeEnglishWord(w, normalize, preserveHyphens))
                .filter(w => w && w.length > 0);
            }
          } catch (error) {
            console.error('Tokenization error:', error);
            return [];
          }
        }

        normalizeRussianWord(word, normalize = true, preserveHyphens = true) {
          if (!word) return '';
          let result = word;
          if (!preserveHyphens) {
            result = result.replace(/^-+|-+$/g, '');
          }
          return result;
        }

        normalizeEnglishWord(word, normalize = true, preserveHyphens = true) {
          if (!word) return '';
          let result = word;
          if (!preserveHyphens) {
            result = result.replace(/^-+|-+$|^'|'$/g, '');
          }
          return result;
        }

        applyRussianNormalization(word) {
          return word;
        }

        applyEnglishNormalization(word) {
           return word;
        }
        
        extractEmotionalPunctuation(text) {
          if (typeof text !== 'string' || text.length === 0) {
            return {};
          }
          const punctuation = {};
          const normalizedText = text
            .replace(/…/g, '...')
            .replace(/\.\.\./g, '...');
          const patterns = [
            { key: '!', regex: /!{1}(?!!|\?)/g },
            { key: '!!', regex: /!{2}(?!!)/g },
            { key: '!!!', regex: /!{3,}/g },
            { key: '?', regex: /\?{1}(?!\?|!)/g },
            { key: '??', regex: /\?{2}(?!\?)/g },
            { key: '???', regex: /\?{3,}/g },
            { key: '!?', regex: /!\?/g },
            { key: '?!', regex: /\?!/g },
            { key: '...', regex: /\.{3,}/g },
            { key: '--', regex: /--/g },
            { key: '—', regex: /—/g },
            { key: ',', regex: /,/g },
            { key: ';', regex: /;/g },
            { key: ':', regex: /:/g },
            { key: '"', regex: /"/g },
            { key: '\'', regex: /'/g }
          ];
          let workingText = normalizedText;
          for (const pattern of patterns) {
            const matches = workingText.match(pattern.regex);
            if (matches) {
              punctuation[pattern.key] = matches.length;
              workingText = workingText.replace(pattern.regex, ' ');
            }
          }
          punctuation.total = Object.values(punctuation).reduce((a, b) => a + b, 0);
          return punctuation;
        }
          
        comprehensivePunctuationScan(text) {
                const punctuation = {};
                const patterns = [
                    { key: '!', regex: /!{1}(?!!|\?)/g },
                    { key: '!!', regex: /!{2}(?!!)/g },
                    { key: '!!!', regex: /!{3,}/g },
                    { key: '?', regex: /\?{1}(?!\?|!)/g },
                    { key: '??', regex: /\?{2}(?!\?)/g },
                    { key: '???', regex: /\?{3,}/g },
                    { key: '!?', regex: /!\?/g },
                    { key: '?!', regex: /\?!/g },
                    { key: '!!?', regex: /!!\?/g },
                    { key: '??!', regex: /\?\?!/g },
                    { key: '!?!', regex: /!\?!/g },
                    { key: '?!?', regex: /\?!\?/g },
                    { key: '...', regex: /\.{3,}/g },
                    { key: '--', regex: /--{2,}/g },
                    { key: '—-', regex: /—{1,}/g },
                    { key: ',', regex: /,{1,}/g },
                    { key: ';', regex: /;{1,}/g },
                    { key: ':', regex: /:{1,}/g },
                    { key: '…..', regex: /\.{4,}/g },
                    { key: '?!?!', regex: /\?!!\?/g },
                    { key: '!!!', regex: /!{4,}/g, weight: 2.5 },
                    { key: '????', regex: /\?{4,}/g, weight: 1.8 }
                ];
                
                let workingText = text;
                
                for (const pattern of patterns) {
                    const matches = workingText.match(pattern.regex);
                    if (matches) {
                        punctuation[pattern.key] = matches.length;
                    }
                }
                
                punctuation.singleQuote = (text.match(/'/g) || []).length;
                punctuation.doubleQuote = (text.match(/"/g) || []).length;
                punctuation.parentheses = (text.match(/[()]/g) || []).length;
                punctuation.brackets = (text.match(/[\[\]]/g) || []).length;
                punctuation.ellipsis = punctuation['...'] || 0;
                punctuation.total = Object.values(punctuation).reduce((a, b) => a + b, 0);
                
                return punctuation;
        }
          
        extractSequencedPatterns(text) {
                const sequences = [];
                const pattern = /[!?…]{2,}/g;
                let match;
                
                while ((match = pattern.exec(text)) !== null) {
                    sequences.push({
                        pattern: match[0],
                        position: match.index,
                        length: match[0].length,
                        context: this.getPunctuationContext(text, match.index, match[0].length)
                    });
                }
                
                const uniqueSequences = {};
                sequences.forEach(seq => {
                    if (!uniqueSequences[seq.pattern]) {
                        uniqueSequences[seq.pattern] = {
                            count: 0,
                            positions: [],
                            contexts: []
                        };
                    }
                    uniqueSequences[seq.pattern].count++;
                    uniqueSequences[seq.pattern].positions.push(seq.position);
                    uniqueSequences[seq.pattern].contexts.push(seq.context);
                });
                
                return {
                    sequences: sequences,
                    uniquePatterns: uniqueSequences,
                    complexity: Object.keys(uniqueSequences).length,
                    longestSequence: sequences.length > 0 ? 
                        Math.max(...sequences.map(s => s.length)) : 0,
                    density: sequences.length / (text.length / 100)
                };
        }
          
        analyzePunctuationContext(text) {
                const context = {
                    endOfSentence: 0,
                    middleOfSentence: 0,
                    afterEmotionalWords: 0,
                    clustered: 0,
                    isolated: 0,
                    withIntensifiers: 0,
                    withNegations: 0
                };
                
                const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
                const emotionalWords = this.buildEmotionalWordsList();
                const intensifiers = this.language === 'ru' ? 
                    ['очень', 'крайне', 'невероятно', 'ужасно'] :
                    ['very', 'extremely', 'incredibly', 'terribly'];
                const negations = this.language === 'ru' ?
                    ['не', 'ни', 'нет', 'без'] :
                    ['not', 'no', 'never', 'without'];
                
                sentences.forEach(sentence => {
                    const trimmed = sentence.trim();
                    if (trimmed.length === 0) return;
                    
                    const lastChar = text.charAt(text.indexOf(trimmed) + trimmed.length);
                    if ('!?'.includes(lastChar)) {
                        context.endOfSentence++;
                        
                        const words = trimmed.toLowerCase().split(/\s+/);
                        const hasEmotional = words.some(w => emotionalWords.has(w));
                        if (hasEmotional) context.afterEmotionalWords++;
                        
                        const hasIntensifier = words.some(w => intensifiers.includes(w));
                        if (hasIntensifier) context.withIntensifiers++;
                        
                        const hasNegation = words.some(w => negations.includes(w));
                        if (hasNegation) context.withNegations++;
                    }
                    
                    const internalPunctuation = (trimmed.match(/[!?]/g) || []).length;
                    if (internalPunctuation > 0) {
                        context.middleOfSentence += internalPunctuation;
                    }
                });
                
                const punctuationClusters = text.match(/[!?]{2,}/g) || [];
                context.clustered = punctuationClusters.length;
                
                const isolatedPattern = /\b[^!?]*[!?][^!?]*\b/g;
                const isolatedMatches = text.match(isolatedPattern) || [];
                context.isolated = isolatedMatches.length;
                
                return context;
        }
          
        identifyPunctuationIntensityZones(text) {
                const zones = [];
                const punctuationPattern = /[!?…]{2,}/g;
                let match;
                
                while ((match = punctuationPattern.exec(text)) !== null) {
                    const start = Math.max(0, match.index - 50);
                    const end = Math.min(text.length, match.index + match[0].length + 50);
                    const context = text.substring(start, end);
                    
                    let intensity = 1;
                    if (match[0].length >= 3) intensity += 0.5;
                    if (match[0].includes('!')) intensity += 0.3;
                    if (match[0].includes('?')) intensity += 0.2;
                    if (match[0].includes('…')) intensity += 0.1;
                    
                    const emotionalWordsInContext = this.countEmotionalWordsInSentence(context);
                    if (emotionalWordsInContext > 0) intensity += emotionalWordsInContext * 0.1;
                    
                    const capsWords = (context.match(/\b[A-ZА-ЯЁ]{3,}\b/g) || []).length;
                    if (capsWords > 0) intensity += capsWords * 0.05;
                    
                    zones.push({
                        pattern: match[0],
                        position: match.index,
                        length: match[0].length,
                        context: context,
                        intensity: Math.min(3, intensity),
                        surroundingEmotion: this.analyzeSurroundingEmotion(context)
                    });
                }
                
                zones.sort((a, b) => b.intensity - a.intensity);
                
                return {
                    zones: zones.slice(0, 10),
                    maxIntensity: zones.length > 0 ? Math.max(...zones.map(z => z.intensity)) : 0,
                    averageIntensity: zones.length > 0 ? 
                        zones.reduce((sum, z) => sum + z.intensity, 0) / zones.length : 0,
                    intensityDistribution: this.calculateIntensityDistribution(zones)
                };
        }
          
        calculatePunctuationIntensityScore(punctuationData) {
                let score = 0;
                
                if (punctuationData['!']) score += punctuationData['!'] * 1.0;
                if (punctuationData['!!']) score += punctuationData['!!'] * 1.5;
                if (punctuationData['!!!']) score += punctuationData['!!!'] * 2.0;
                if (punctuationData['?']) score += punctuationData['?'] * 0.7;
                if (punctuationData['??']) score += punctuationData['??'] * 1.0;
                if (punctuationData['???']) score += punctuationData['???'] * 1.3;
                if (punctuationData['!?']) score += punctuationData['!?'] * 1.8;
                if (punctuationData['?!']) score += punctuationData['?!'] * 1.8;
                if (punctuationData['...']) score += punctuationData['...'] * 0.5;
                
                const sequencedPatterns = punctuationData.sequencedPatterns;
                if (sequencedPatterns && sequencedPatterns.complexity > 0) {
                    score += sequencedPatterns.complexity * 0.3;
                }
                
                const intensityZones = punctuationData.intensityZones;
                if (intensityZones && intensityZones.maxIntensity > 0) {
                    score += intensityZones.maxIntensity * 0.5;
                }
                
                return Math.round(score * 100) / 100;
        }
          
        buildEmotionalWordsList() {
                const emotionalSet = new Set();
                const dict = this.dictionaries[this.language];
                
                for (const [category, words] of Object.entries(dict)) {
                    if (Array.isArray(words)) {
                        words.forEach(word => emotionalSet.add(word));
                    }
                }
                
                return emotionalSet;
        }
          
        getPunctuationContext(text, position, length) {
                const start = Math.max(0, position - 30);
                const end = Math.min(text.length, position + length + 30);
                return text.substring(start, end);
        }
          
        countEmotionalWordsInSentence(sentence) {
                const words = sentence.toLowerCase().split(/\s+/);
                const dict = this.dictionaries[this.language];
                let count = 0;
                
                for (const [category, categoryWords] of Object.entries(dict)) {
                    if (!Array.isArray(categoryWords)) continue;
                    for (const word of categoryWords) {
                        if (words.includes(word)) {
                            count++;
                        }
                    }
                }
                
                return count;
        }
          
        analyzeSurroundingEmotion(context) {
                const dict = this.dictionaries[this.language];
                const words = context.toLowerCase().split(/\s+/);
                const emotions = [];
                
                for (const [category, categoryWords] of Object.entries(dict)) {
                    if (!Array.isArray(categoryWords)) continue;
                    for (const word of categoryWords) {
                        if (words.includes(word) && !emotions.includes(category)) {
                            emotions.push(category);
                        }
                    }
                }
                
                return emotions.slice(0, 3);
        }
          
        calculateIntensityDistribution(zones) {
                if (zones.length === 0) return { low: 0, medium: 0, high: 0 };
                
                let low = 0, medium = 0, high = 0;
                zones.forEach(zone => {
                    if (zone.intensity < 1.5) low++;
                    else if (zone.intensity < 2.5) medium++;
                    else high++;
                });
                
                const total = zones.length;
                return {
                    low: low / total,
                    medium: medium / total,
                    high: high / total
                };
        }
          
        mergePunctuationResults(...results) {
                const merged = {};
                
                results.forEach(result => {
                    if (typeof result === 'object') {
                        Object.entries(result).forEach(([key, value]) => {
                            if (typeof value === 'number') {
                                merged[key] = (merged[key] || 0) + value;
                            } else if (key !== 'sequencedPatterns' && 
                                     key !== 'contextual' && 
                                     key !== 'intensityZones') {
                                merged[key] = value;
                            }
                        });
                    }
                });
                
                return merged;
        }
        
        extractEmoticons(text) {
                if (typeof text !== 'string' || text.length === 0) {
                    return {
                        positive: 0,
                        negative: 0,
                        neutral: 0,
                        complex: 0,
                        total: 0,
                        details: [],
                        density: 0,
                        modernEmojis: 0,
                        combinedEmoticons: 0,
                        intensityScore: 0,
                        emojiAnalysis: {},
                        patternAnalysis: {}
                    };
                }

                const basicEmoticons = this.buildBasicEmoticonPatterns();
                const modernEmojis = this.buildModernEmojiPatterns();
                const combinedPatterns = this.buildCombinedEmoticonPatterns();
                
                const allPatterns = [
                    ...basicEmoticons.patterns,
                    ...modernEmojis.patterns,
                    ...combinedPatterns.patterns
                ];
                
                const emoticonMap = new Map([
                    ...basicEmoticons.map,
                    ...modernEmojis.map,
                    ...combinedPatterns.map
                ]);
                
                const emojiWeights = this.buildEmojiWeights();
                const contextAnalyzer = this.buildContextAnalyzer();
                
                const matches = this.findAllEmoticonMatches(text, allPatterns);
                const categorized = this.categorizeMatches(matches, emoticonMap, emojiWeights);
                const contextual = this.analyzeEmoticonContext(text, matches, contextAnalyzer);
                const intensity = this.calculateEmoticonIntensity(categorized, contextual);
                
                const result = {
                    positive: categorized.positive || 0,
                    negative: categorized.negative || 0,
                    neutral: categorized.neutral || 0,
                    complex: categorized.complex || 0,
                    total: categorized.total || 0,
                    details: categorized.details || [],
                    density: this.calculateEmoticonDensity(categorized.total, text.length),
                    modernEmojis: categorized.modernEmojis || 0,
                    combinedEmoticons: categorized.combinedEmoticons || 0,
                    intensityScore: intensity.score || 0,
                    emojiAnalysis: categorized.emojiAnalysis || {},
                    patternAnalysis: categorized.patternAnalysis || {},
                    contextual: contextual,
                    intensity: intensity,
                    clusters: this.findEmoticonClusters(matches, text),
                    sequentialPatterns: this.findSequentialPatterns(matches),
                    positionAnalysis: this.analyzeEmoticonPositions(matches, text.length)
                };
                
                return result;
        }
          
        buildBasicEmoticonPatterns() {
                const patterns = [];
                const map = new Map();
                
                const categories = {
                    positive: [
                        ':)', ':-)', ':]', '=)', ':D', ':-D', ':>', '=D', 
                        ';)', ';-)', ';]', '^_^', '^^', ':3', 'c:', '(:', 
                        'xD', 'XD', 'xDD', 'XDXD', ':P', ':-P', ':p', ':-p',
                        'B)', 'B-)', '8)', '8-)', '>:)', '>:-)', '(-:', 
                        '°ω°', '°▽°', '°∀°', '≧▽≦', '≧ω≦', '(´▽｀)', 
                        '(⁎˃ᆺ˂)', '(๑˃ᴗ˂)ﻭ', '(๑>ᴗ<๑)', '（＾ω＾）', 
                        '(´• ω •`)', '(◕‿◕)', '(◠‿◠)', '(｡◕‿◕｡)', 
                        '(づ｡◕‿◕｡)づ', '(~˘▾˘)~', '~(˘▾˘~)', '( ˘▽˘)っ♨',
                        '(´ ε ` )♨', '(◠﹏◠)', '＼(^ω^)／', 'ヽ(´▽`)/',
                        'ヾ(´▽`)ノ', 'ヽ(´ー`)人', '(´∀`)人'
                    ],
                    negative: [
                        ':(', ':-(', ':[', '=(', ':/', ':-/', ':\\', ':-\\',
                        ':|', ':-|', '>:(', '>:-(', 'D:', '):', ':-c', ':c',
                        ':{', '>:|', '>:-|', '>:O', '>:-O', ':-[', '=[',
                        ':-{', ':-||', ':@', ':-@', '×_×', 'x_x', 'X_X',
                        'x.x', 'X.X', '(´；д；`)', '(；ω；)', '(；へ：)',
                        '(´；ω；`)', '（；へ：）', '(T_T)', '(TT)', '(T.T)',
                        '(ToT)', '(>_<)', '(>_>)', '(<_<)', '(>_<)>',
                        '(¬_¬)', '(－‸ლ)', '(ಠ_ಠ)', '(×_×)', '(╯°□°)╯',
                        '(︶︹︶)', '(；一_一)', '(´-﹏-`；)', '(´-ι_-`)',
                        '(´-ω-`)', '(´-﹏-`)', '(´-д-`)'
                    ],
                    neutral: [
                        ':|', ':-|', ':|]', ':-|]', ':O', ':-O', '://',
                        '°-°', '°o°', '°O°', '°0°', 'o.O', 'O.o', 'o_o',
                        'O_O', '0_0', 'o.O', '◉_◉', '⊙_⊙', '・_・',
                        '（・_・）', '(・_・;)', '(・–・;)', '(・∀・)',
                        '(・▽・)', '(・ω・)', '(・ε・)', '(・д・)',
                        '(・_・)', '(´・ω・`)', '(´・∀・`)', '(´・д・`)',
                        '(´・ε・`)', '(´・▽・`)', '(´・_・`)', '(´-ι_-｀)',
                        '(´-д-｀)', '(´-ω-｀)', '(´-ε-｀)', '(´-▽-｀)'
                    ],
                    complex: [
                        ':\'(', ':\'-(', ':\')', ':\'-)', ';_;', 'T_T',
                        'T.T', 'ToT', '>_.<', 'o_o', 'O_O', '0_0', '-_-',
                        '¯\\_(ツ)_/¯', 'ಠ_ಠ', 'ಠ⌣ಠ', 'ಠ▃ಠ', 'ಠ益ಠ',
                        'ლ(ಠ益ಠლ)', '≧☉_☉≦', '≧◉_◉≦', '≧✯_✯≦',
                        '(≧◡≦)', '(≧ω≦)', '(≧ε≦)', '(≧д≦)', '(≧▽≦)',
                        '(≧∇≦)', '(≧∀≦)', '(≧﹏≦)', '(≧×≦)', '(≧人≦)',
                        '(╥_╥)', '(╥﹏╥)', '(╯︵╰,)', '(╯_╰)', '(╯3╰)',
                        '(╯▽╰)', '(╯ω╰)', '(╯ε╰)', '(╯д╰)', '(╯︿╰)',
                        '(╯△╰)', '(╯□╰)', '（╯°□°）╯', '(ノಠ益ಠ)ノ',
                        '┻━┻', '┬─┬', '╰(´□`)╯', '╰(´︵`)╯',
                        '(⊙﹏⊙)', '(⊙_⊙;)', '(⊙ω⊙)', '(⊙ε⊙)',
                        '(⊙▽⊙)', '(⊙∀⊙)', '(⊙△⊙)', '(⊙□⊙)',
                        '(●´ω`●)', '(●´∀`●)', '(●´▽`●)', '(●´д`●)',
                        '(●´ε`●)', '(●´△`●)', '(●´□`●)', '(＠´ー`)',
                        '(＠´ω`)', '(＠´∀`)', '(＠´▽`)', '(＠´д`)',
                        '(＠´ε`)', '(＠´△`)', '(＠´□`)'
                    ]
                };
                
                for (const [type, emoticons] of Object.entries(categories)) {
                    emoticons.forEach(emoticon => {
                        const escaped = emoticon.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                        patterns.push(escaped);
                        map.set(emoticon, type);
                    });
                }
                
                return { patterns, map };
        }
          
        buildModernEmojiPatterns() {
                const patterns = [];
                const map = new Map();
                
                const emojiRanges = [
                    '\\u{1F600}-\\u{1F64F}', 
                    '\\u{1F300}-\\u{1F5FF}', 
                    '\\u{1F680}-\\u{1F6FF}', 
                    '\\u{1F1E0}-\\u{1F1FF}',
                    '\\u{2600}-\\u{26FF}',
                    '\\u{2700}-\\u{27BF}',
                    '\\u{FE00}-\\u{FE0F}',
                    '\\u{1F900}-\\u{1F9FF}',
                    '\\u{1F018}-\\u{1F270}'
                ];
                
                const emojiRegex = new RegExp(`[${emojiRanges.join('')}]`, 'gu');
                
                patterns.push(emojiRegex.source);
                
                const predefinedEmojis = {
                    positive: ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🥳', '🤩', '🥺', '😻', '😽', '🙀', '😺', '😸', '😹', '😼', '🤗', '🤭', '🤫', '🤔', '🤐', '🤠', '🥴', '😸', '💖', '💕', '💞', '💓', '💗', '💘', '💝', '💟', '❤️', '🧡', '💛', '💚', '💙', '💜', '🤎', '🖤', '🤍', '💯', '✨', '🌟', '⭐', '🌈', '☀️', '🌞', '🌻', '🌺', '🌹', '🌸', '💐', '🎉', '🎊', '🎁', '🎈', '🏆', '🥇', '🥈', '🥉', '🏅', '🎖', '👍', '👏', '🙌', '👌', '🤘', '✌️', '🤞', '🤙', '👋', '🖐', '✋', '👐', '🙏', '🤝', '💪', '🧠', '🦾', '🦿', '🦵', '🦶', '👂', '👃', '👀', '👁', '👅', '👄', '💋', '🦷', '🍦', '🍧', '🍨', '🍩', '🍪', '🎂', '🍰', '🧁', '🥧', '🍫', '🍬', '🍭', '🍮', '🍯', '🥛', '🍼', '☕', '🍵', '🧃', '🥤', '🍶', '🍾', '🍷', '🍸', '🍹', '🍺', '🍻', '🥂', '🥃', '🧉', '🧊', '🥢', '🍽', '🍴', '🥄', '🔪', '🏺'],
                    negative: ['😢', '😭', '😤', '😠', '😡', '🤬', '🤯', '😳', '🥵', '🥶', '😱', '😨', '😰', '😥', '😓', '🤢', '🤮', '🤧', '😷', '🤒', '🤕', '🤑', '🤠', '😈', '👿', '💀', '☠️', '💩', '🤡', '👹', '👺', '👻', '👽', '👾', '🤖', '🎃', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '😿', '😾', '🐱', '🐶', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐽', '🐸', '🐵', '🙈', '🙉', '🙊', '🐒', '🐔', '🐧', '🐦', '🐤', '🐣', '🐥', '🦆', '🦅', '🦉', '🦇', '🐺', '🐗', '🐴', '🦄', '🐝', '🐛', '🦋', '🐌', '🐞', '🐜', '🦟', '🦗', '🕷', '🕸', '🦂', '🐢', '🐍', '🦎', '🦖', '🦕', '🐙', '🦑', '🦐', '🦞', '🦀', '🐡', '🐠', '🐟', '🐬', '🐳', '🐋', '🦈', '🐊', '🐅', '🐆', '🦓', '🦍', '🦧', '🐘', '🦛', '🦏', '🐪', '🐫', '🦒', '🦘', '🐃', '🐂', '🐄', '🐎', '🐖', '🐏', '🐑', '🦙', '🐐', '🦌', '🐕', '🐩', '🦮', '🐕‍🦺', '🐈', '🐓', '🦃', '🦚', '🦜', '🦢', '🦩', '🐇', '🦝', '🦨', '🦡', '🦦', '🦥', '🐁', '🐀', '🐿', '🦔'],
                    neutral: ['😐', '😑', '😶', '😶‍🌫️', '😏', '😒', '🙄', '😬', '😮‍💨', '🤥', '😌', '😔', '😪', '🤤', '😴', '😷', '🤒', '🤕', '🤢', '🤮', '🤧', '🥴', '🥵', '🥶', '😵', '😵‍💫', '🤯', '🤠', '🥳', '🥸', '😎', '🤓', '🧐', '😕', '😟', '🙁', '☹️', '😮', '😯', '😲', '😳', '🥺', '😦', '😧', '😨', '😰', '😥', '😢', '😭', '😱', '😖', '😣', '😞', '😓', '😩', '😫', '🥱', '😤', '😡', '😠', '🤬', '😈', '👿', '💀', '☠️', '💩', '🤡', '👹', '👺', '👻', '👽', '👾', '🤖', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '😿', '😾'],
                    complex: ['😅', '😂', '🤣', '🥲', '☺️', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🥳', '🤩', '🥺', '😻', '😽', '🙀', '😺', '😸', '😹', '😼', '🤗', '🤭', '🤫', '🤔', '🤐', '🤠', '🥴', '😸', '💖', '💕', '💞', '💓', '💗', '💘', '💝', '💟', '❤️', '🧡', '💛', '💚', '💙', '💜', '🤎', '🖤', '🤍', '💯', '✨', '🌟', '⭐', '🌈', '☀️', '🌞', '🌻', '🌺', '🌹', '🌸', '💐', '🎉', '🎊', '🎁', '🎈', '🏆', '🥇', '🥈', '🥉', '🏅', '🎖', '👍', '👏', '🙌', '👌', '🤘', '✌️', '🤞', '🤙', '👋', '🖐', '✋', '👐', '🙏', '🤝', '💪', '🧠', '🦾', '🦿', '🦵', '🦶', '👂', '👃', '👀', '👁', '👅', '👄', '💋', '🦷']
                };
                
                for (const [type, emojis] of Object.entries(predefinedEmojis)) {
                    emojis.forEach(emoji => {
                        map.set(emoji, type);
                    });
                }
                
                return { patterns: [emojiRegex], map };
        }
          
        buildCombinedEmoticonPatterns() {
                const patterns = [];
                const map = new Map();
                
                const combined = [
                    { pattern: '>:D', type: 'positive' },
                    { pattern: '>:[', type: 'negative' },
                    { pattern: '>:]', type: 'positive' },
                    { pattern: '>:)', type: 'positive' },
                    { pattern: '>:(', type: 'negative' },
                    { pattern: '>:O', type: 'complex' },
                    { pattern: '>:P', type: 'positive' },
                    { pattern: '>:p', type: 'positive' },
                    { pattern: '>:S', type: 'negative' },
                    { pattern: '>:|', type: 'neutral' },
                    { pattern: '>:\\', type: 'negative' },
                    { pattern: '>:/', type: 'negative' },
                    { pattern: '>:＼', type: 'negative' },
                    { pattern: '>:３', type: 'positive' },
                    { pattern: '<3', type: 'positive' },
                    { pattern: '</3', type: 'negative' },
                    { pattern: '<\\3', type: 'negative' },
                    { pattern: '~@~', type: 'complex' },
                    { pattern: '~_~', type: 'neutral' },
                    { pattern: '-_-', type: 'neutral' },
                    { pattern: '^_^', type: 'positive' },
                    { pattern: '^^', type: 'positive' },
                    { pattern: '>_<', type: 'negative' },
                    { pattern: '>_>', type: 'neutral' },
                    { pattern: '<_<', type: 'neutral' },
                    { pattern: '=.=', type: 'neutral' },
                    { pattern: '= =', type: 'neutral' },
                    { pattern: '=.=', type: 'neutral' },
                    { pattern: '=3=', type: 'complex' },
                    { pattern: 'XD', type: 'positive' },
                    { pattern: 'XDXD', type: 'positive' },
                    { pattern: 'XDD', type: 'positive' },
                    { pattern: 'xDD', type: 'positive' },
                    { pattern: 'xD', type: 'positive' },
                    { pattern: 'xd', type: 'positive' },
                    { pattern: 'X-D', type: 'positive' },
                    { pattern: 'X-d', type: 'positive' },
                    { pattern: 'x-d', type: 'positive' },
                    { pattern: ':’D', type: 'positive' },
                    { pattern: ':’d', type: 'positive' },
                    { pattern: ':’(', type: 'negative' },
                    { pattern: ':’)', type: 'positive' },
                    { pattern: ':’|', type: 'neutral' },
                    { pattern: ':’O', type: 'complex' },
                    { pattern: ':’o', type: 'complex' },
                    { pattern: ':’P', type: 'positive' },
                    { pattern: ':’p', type: 'positive' },
                    { pattern: ':’S', type: 'negative' },
                    { pattern: ':’s', type: 'negative' },
                    { pattern: ':’\\', type: 'negative' },
                    { pattern: ':’/', type: 'negative' },
                    { pattern: ':’３', type: 'positive' },
                    { pattern: ':’３', type: 'positive' }
                ];
                
                combined.forEach(item => {
                    const escaped = item.pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                    patterns.push(escaped);
                    map.set(item.pattern, item.type);
                });
                
                return { patterns, map };
        }
          
        findAllEmoticonMatches(text, patterns) {
                const matches = [];
                
                patterns.forEach(pattern => {
                    let regex;
                    if (pattern instanceof RegExp) {
                        regex = pattern;
                    } else {
                        regex = new RegExp(pattern, 'gi');
                    }
                    
                    let match;
                    while ((match = regex.exec(text)) !== null) {
                        matches.push({
                            emoticon: match[0],
                            position: match.index,
                            length: match[0].length,
                            pattern: pattern instanceof RegExp ? pattern.source : pattern
                        });
                    }
                });
                
                matches.sort((a, b) => a.position - b.position);
                
                return this.removeOverlappingMatches(matches);
        }
          
        removeOverlappingMatches(matches) {
                if (matches.length <= 1) return matches;
                
                const filtered = [];
                let lastMatch = matches[0];
                filtered.push(lastMatch);
                
                for (let i = 1; i < matches.length; i++) {
                    const current = matches[i];
                    const lastEnd = lastMatch.position + lastMatch.length;
                    
                    if (current.position >= lastEnd) {
                        filtered.push(current);
                        lastMatch = current;
                    }
                }
                
                return filtered;
        }
          
        categorizeMatches(matches, emoticonMap, emojiWeights) {
                const result = {
                    positive: 0,
                    negative: 0,
                    neutral: 0,
                    complex: 0,
                    total: 0,
                    details: [],
                    modernEmojis: 0,
                    combinedEmoticons: 0,
                    emojiAnalysis: {},
                    patternAnalysis: {}
                };
                
                const typeCounts = {};
                const emojiCounts = {};
                const patternCounts = {};
                
                matches.forEach(match => {
                    const type = emoticonMap.get(match.emoticon) || 'neutral';
                    result[type]++;
                    result.total++;
                    
                    if (match.pattern.includes('\\u{') || match.emoticon.length > 2) {
                        result.modernEmojis++;
                    }
                    
                    if (match.emoticon.length >= 3 && !match.pattern.includes('\\u{')) {
                        result.combinedEmoticons++;
                    }
                    
                    typeCounts[type] = (typeCounts[type] || 0) + 1;
                    emojiCounts[match.emoticon] = (emojiCounts[match.emoticon] || 0) + 1;
                    patternCounts[match.pattern] = (patternCounts[match.pattern] || 0) + 1;
                    
                    result.details.push({
                        emoticon: match.emoticon,
                        type: type,
                        position: match.position,
                        length: match.length,
                        weight: emojiWeights[match.emoticon] || 1.0
                    });
                });
                
                result.emojiAnalysis = {
                    uniqueEmojis: Object.keys(emojiCounts).length,
                    mostFrequent: Object.entries(emojiCounts)
                        .sort((a, b) => b[1] - a[1])
                        .slice(0, 10)
                        .map(([emoji, count]) => ({ emoji, count })),
                    distribution: typeCounts
                };
                
                result.patternAnalysis = {
                    uniquePatterns: Object.keys(patternCounts).length,
                    patternFrequency: patternCounts
                };
                
                return result;
        }
          
        buildEmojiWeights() {
                const weights = {
                    '❤️': 1.5, '😍': 1.4, '😂': 1.3, '🥰': 1.4, '😊': 1.2,
                    '😭': 1.4, '😘': 1.3, '🤣': 1.3, '😁': 1.2, '👍': 1.1,
                    '😢': 1.3, '🎉': 1.2, '🔥': 1.2, '💕': 1.3, '🙏': 1.1,
                    '😎': 1.2, '✨': 1.1, '🤔': 1.0, '😴': 1.0, '💖': 1.3,
                    '💯': 1.2, '👏': 1.1, '🙌': 1.1, '😅': 1.1, '🤗': 1.2,
                    '😡': 1.4, '😠': 1.3, '😤': 1.2, '😞': 1.2, '😔': 1.2,
                    '😕': 1.1, '😟': 1.2, '🙁': 1.2, '☹️': 1.3, '😣': 1.2,
                    '😖': 1.3, '😫': 1.2, '😩': 1.2, '😮': 1.1, '😯': 1.1,
                    '😲': 1.2, '😳': 1.2, '🥺': 1.3, '😦': 1.2, '😧': 1.2,
                    '😨': 1.3, '😰': 1.2, '😥': 1.2, '😢': 1.3, '😭': 1.4,
                    '😱': 1.4, '😵': 1.2, '😵‍💫': 1.3, '🤯': 1.3, '🤠': 1.1,
                    '🥳': 1.2, '🥸': 1.1, '😎': 1.2, '🤓': 1.1, '🧐': 1.1
                };
                
                return weights;
        }
          
         buildContextAnalyzer() {
                return {
                    positiveWords: ['хорошо', 'отлично', 'прекрасно', 'радость', 'счастье', 'любовь', 'good', 'great', 'excellent', 'happy', 'love', 'joy'],
                    negativeWords: ['плохо', 'ужасно', 'грустно', 'злость', 'ненависть', 'bad', 'terrible', 'awful', 'sad', 'angry', 'hate'],
                    intensifiers: ['очень', 'крайне', 'невероятно', 'ужасно', 'жутко', 'very', 'extremely', 'incredibly', 'terribly', 'awfully'],
                    distance: 5
                };
        }
          
        analyzeEmoticonContext(text, matches, contextAnalyzer) {
                const context = {
                    withPositiveWords: 0,
                    withNegativeWords: 0,
                    withIntensifiers: 0,
                    atSentenceEnd: 0,
                    atSentenceStart: 0,
                    isolated: 0,
                    clustered: 0,
                    contextMatches: []
                };
                
                const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
                
                matches.forEach(match => {
                    const start = Math.max(0, match.position - 30);
                    const end = Math.min(text.length, match.position + match.length + 30);
                    const surroundingText = text.substring(start, end).toLowerCase();
                    
                    const contextMatch = {
                        emoticon: match.emoticon,
                        surrounding: surroundingText,
                        features: {}
                    };
                    
                    contextAnalyzer.positiveWords.forEach(word => {
                        if (surroundingText.includes(word)) {
                            context.withPositiveWords++;
                            contextMatch.features.positiveWord = true;
                        }
                    });
                    
                    contextAnalyzer.negativeWords.forEach(word => {
                        if (surroundingText.includes(word)) {
                            context.withNegativeWords++;
                            contextMatch.features.negativeWord = true;
                        }
                    });
                    
                    contextAnalyzer.intensifiers.forEach(intensifier => {
                        if (surroundingText.includes(intensifier)) {
                            context.withIntensifiers++;
                            contextMatch.features.intensifier = true;
                        }
                    });
                    
                    const charBefore = text.charAt(match.position - 1);
                    const charAfter = text.charAt(match.position + match.length);
                    
                    if (charAfter === '' || /[.!?]/.test(charAfter)) {
                        context.atSentenceEnd++;
                        contextMatch.features.sentenceEnd = true;
                    }
                    
                    if (charBefore === '' || /[.!?]/.test(charBefore)) {
                        context.atSentenceStart++;
                        contextMatch.features.sentenceStart = true;
                    }
                    
                    if ((charBefore === ' ' || charBefore === '') && 
                        (charAfter === ' ' || charAfter === '')) {
                        context.isolated++;
                        contextMatch.features.isolated = true;
                    }
                    
                    context.contextMatches.push(contextMatch);
                });
                
                const clusters = this.findEmoticonClusters(matches, text);
                context.clustered = clusters.length;
                
                return context;
        }
          
        calculateEmoticonIntensity(categorized, contextual) {
                let score = 0;
                
                score += categorized.positive * 1.0;
                score += categorized.negative * 1.2;
                score += categorized.complex * 0.8;
                score += categorized.neutral * 0.5;
                
                if (contextual.withIntensifiers > 0) {
                    score *= (1 + contextual.withIntensifiers * 0.1);
                }
                
                if (contextual.clustered > 0) {
                    score *= (1 + contextual.clustered * 0.15);
                }
                
                if (categorized.modernEmojis > 0) {
                    score *= (1 + categorized.modernEmojis * 0.05);
                }
                
                const weightSum = categorized.details.reduce((sum, detail) => {
                    return sum + (detail.weight || 1.0);
                }, 0);
                
                if (categorized.total > 0) {
                    score *= (weightSum / categorized.total);
                }
                
                return {
                    score: Math.round(score * 100) / 100,
                    baseScore: score,
                    weightedScore: weightSum,
                    contextualBoost: contextual.withIntensifiers + contextual.clustered
                };
        }
          
        calculateEmoticonDensity(totalEmoticons, textLength) {
                if (textLength === 0) return 0;
                return Math.round((totalEmoticons / textLength) * 1000 * 100) / 100;
        }
          
        findEmoticonClusters(matches, text) {
                const clusters = [];
                let currentCluster = [];
                const clusterDistance = 10;
                
                for (let i = 0; i < matches.length; i++) {
                    if (currentCluster.length === 0) {
                        currentCluster.push(matches[i]);
                    } else {
                        const lastMatch = currentCluster[currentCluster.length - 1];
                        const currentMatch = matches[i];
                        
                        const distance = currentMatch.position - (lastMatch.position + lastMatch.length);
                        
                        if (distance <= clusterDistance) {
                            currentCluster.push(currentMatch);
                        } else {
                            if (currentCluster.length > 1) {
                                clusters.push({
                                    matches: [...currentCluster],
                                    size: currentCluster.length,
                                    start: currentCluster[0].position,
                                    end: currentCluster[currentCluster.length - 1].position + 
                                          currentCluster[currentCluster.length - 1].length,
                                    types: [...new Set(currentCluster.map(m => 
                                        this.categorizeEmoticonType(m.emoticon)
                                    ))],
                                    intensity: this.calculateClusterIntensity(currentCluster)
                                });
                            }
                            currentCluster = [currentMatch];
                        }
                    }
                }
                
                if (currentCluster.length > 1) {
                    clusters.push({
                        matches: [...currentCluster],
                        size: currentCluster.length,
                        start: currentCluster[0].position,
                        end: currentCluster[currentCluster.length - 1].position + 
                              currentCluster[currentCluster.length - 1].length,
                        types: [...new Set(currentCluster.map(m => 
                            this.categorizeEmoticonType(m.emoticon)
                        ))],
                        intensity: this.calculateClusterIntensity(currentCluster)
                    });
                }
                
                return clusters;
        }
          
        categorizeEmoticonType(emoticon) {
                if (emoticon.includes(')') || emoticon.includes('D') || emoticon.includes('^')) {
                    return 'positive';
                } else if (emoticon.includes('(') || emoticon.includes('[') || emoticon.includes('/')) {
                    return 'negative';
                } else if (emoticon.includes('|') || emoticon.includes('O') || emoticon.includes('o')) {
                    return 'neutral';
                } else {
                    return 'complex';
                }
        }
          
        calculateClusterIntensity(cluster) {
                let intensity = 0;
                
                cluster.forEach(match => {
                    if (match.emoticon.includes('!')) intensity += 0.2;
                    if (match.emoticon.includes('?')) intensity += 0.1;
                    if (match.emoticon.includes('!!')) intensity += 0.3;
                    if (match.emoticon.includes('??')) intensity += 0.2;
                    if (match.emoticon.length > 3) intensity += 0.1;
                });
                
                return Math.min(1, intensity);
        }
          
        findSequentialPatterns(matches) {
                const patterns = [];
                
                for (let i = 0; i < matches.length - 1; i++) {
                    const current = matches[i];
                    const next = matches[i + 1];
                    
                    const distance = next.position - (current.position + current.length);
                    
                    if (distance <= 5) {
                        patterns.push({
                            first: current.emoticon,
                            second: next.emoticon,
                            distance: distance,
                            types: [
                                this.categorizeEmoticonType(current.emoticon),
                                this.categorizeEmoticonType(next.emoticon)
                            ],
                            patternType: this.determinePatternType(
                                current.emoticon, 
                                next.emoticon
                            )
                        });
                    }
                }
                
                return {
                    patterns: patterns,
                    total: patterns.length,
                    mostCommon: this.findMostCommonPattern(patterns)
                };
        }
          
        determinePatternType(first, second) {
                const firstType = this.categorizeEmoticonType(first);
                const secondType = this.categorizeEmoticonType(second);
                
                if (firstType === 'positive' && secondType === 'positive') {
                    return 'reinforcement';
                } else if (firstType === 'negative' && secondType === 'negative') {
                    return 'amplification';
                } else if (firstType === 'positive' && secondType === 'negative') {
                    return 'contrast';
                } else if (firstType === 'negative' && secondType === 'positive') {
                    return 'recovery';
                } else {
                    return 'mixed';
                }
        }
          
        findMostCommonPattern(patterns) {
                if (patterns.length === 0) return null;
                
                const patternCounts = {};
                patterns.forEach(pattern => {
                    const key = `${pattern.first}+${pattern.second}`;
                    patternCounts[key] = (patternCounts[key] || 0) + 1;
                });
                
                let maxCount = 0;
                let mostCommon = null;
                
                for (const [key, count] of Object.entries(patternCounts)) {
                    if (count > maxCount) {
                        maxCount = count;
                        mostCommon = { pattern: key, count: count };
                    }
                }
                
                return mostCommon;
        }
          
        analyzeEmoticonPositions(matches, textLength) {
                if (matches.length === 0) {
                    return {
                        distribution: { start: 0, middle: 0, end: 0 },
                        densityBySection: { start: 0, middle: 0, end: 0 }
                    };
                }
                
                const third = Math.floor(textLength / 3);
                let startCount = 0, middleCount = 0, endCount = 0;
                
                matches.forEach(match => {
                    if (match.position < third) {
                        startCount++;
                    } else if (match.position < 2 * third) {
                        middleCount++;
                    } else {
                        endCount++;
                    }
                });
                
                const total = matches.length;
                
                return {
                    distribution: {
                        start: startCount / total,
                        middle: middleCount / total,
                        end: endCount / total
                    },
                    densityBySection: {
                        start: startCount / third,
                        middle: middleCount / third,
                        end: endCount / third
                    },
                    rawCounts: {
                        start: startCount,
                        middle: middleCount,
                        end: endCount
                    }
                };
        }
        
        analyzeCapitalization(text) {
             const words = text.split(/\s+/);
             const capitalizedWords = words.filter(word => 
                       word.length > 1 && /^[A-ZА-ЯЁ]/.test(word)
             );
             
             const allCapsWords = words.filter(word => 
                       word.length > 1 && /^[A-ZА-ЯЁ]+$/.test(word)
             );
             
             const firstWordsInSentence = this.extractFirstWordsInSentence(text);
             const properNouns = this.detectProperNouns(words, text);
             const emotionalCaps = this.detectEmotionalCapitalization(words, text);
             
             const mixedCaseWords = words.filter(word => 
                       word.length > 2 && 
                       /[A-ZА-ЯЁ].*[A-ZА-ЯЁ]/.test(word) &&
                       !/^[A-ZА-ЯЁ]+$/.test(word)
             );
             
             const positionAnalysis = this.analyzeCapsPosition(text);
             const clusters = this.findCapitalizationClusters(text);
             
             return {
                       totalWords: words.length,
                       capitalized: capitalizedWords.length,
                       allCaps: allCapsWords.length,
                       ratio: words.length > 0 ? capitalizedWords.length / words.length : 0,
                       intensity: words.length > 0 ? allCapsWords.length / words.length : 0,
                       advanced: {
                                 sentenceStarters: firstWordsInSentence.length,
                                 properNouns: properNouns.length,
                                 emotionalUse: emotionalCaps.length,
                                 mixedCase: mixedCaseWords.length,
                                 grammaticalRatio: firstWordsInSentence.length / words.length,
                                 emotionalRatio: emotionalCaps.length / words.length,
                                 stylisticRatio: mixedCaseWords.length / words.length,
                                 positionAnalysis: positionAnalysis,
                                 clusters: clusters
                       },
                       details: {
                                 capitalizedWords: capitalizedWords,
                                 allCapsWords: allCapsWords,
                                 emotionalCaps: emotionalCaps,
                                 properNouns: properNouns
                       }
             };
       }
 
       extractFirstWordsInSentence(text) {
             const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
             return sentences.map(sentence => {
                       const firstWord = sentence.trim().split(/\s+/)[0];
                       return firstWord.length > 1 ? firstWord : null;
             }).filter(Boolean);
       }
 
       detectProperNouns(words, text) {
             const properNouns = [];
             const context = text.toLowerCase();
             
             for (let i = 0; i < words.length; i++) {
                       const word = words[i];
                       if (word.length > 2 && /^[A-ZА-ЯЁ]/.test(word)) {
                                 const isSentenceStart = this.isSentenceStart(word, text);
                                 const prevWord = i > 0 ? words[i - 1] : null;
                                 
                                 const isLikelyProperNoun = 
                                           !isSentenceStart &&
                                           (word.endsWith('ов') || word.endsWith('ев') || 
                                            word.endsWith('ин') || word.endsWith('ын') ||
                                            /^[A-Z][a-z]+ [A-Z][a-z]+$/.test(word)) ||
                                           (prevWord && ['господин', 'мистер', 'доктор', 'профессор', 
                                                        'mr.', 'dr.', 'prof.'].includes(prevWord.toLowerCase()));
                                 
                                 if (isLikelyProperNoun) {
                                           properNouns.push(word);
                                 }
                       }
             }
             
             return properNouns;
       }
 
       detectEmotionalCapitalization(words, text) {
             return words.filter(word => {
                       if (word.length <= 1 || !/^[A-ZА-ЯЁ]/.test(word)) return false;
                       const isSentenceStart = this.isSentenceStart(word, text);
                       const isProperNoun = this.isLikelyProperNoun(word, words, text);
                       return !isSentenceStart && !isProperNoun;
             });
       }
 
       analyzeCapsPosition(text) {
             const words = text.split(/\s+/);
             const positions = [];
             
             for (let i = 0; i < words.length; i++) {
                       const word = words[i];
                       if (word.length > 1 && /^[A-ZА-ЯЁ]/.test(word)) {
                                 positions.push({
                                           position: i / words.length,
                                           word: word,
                                           type: /^[A-ZА-ЯЁ]+$/.test(word) ? 'ALLCAPS' : 'Capitalized'
                                 });
                       }
             }
             
             const startDensity = positions.filter(p => p.position < 0.3).length;
             const middleDensity = positions.filter(p => p.position >= 0.3 && p.position <= 0.7).length;
             const endDensity = positions.filter(p => p.position > 0.7).length;
             const distributionEvenness = this.calculateDistributionEvenness(positions);
             
             return {
                       startDensity: startDensity,
                       middleDensity: middleDensity,
                       endDensity: endDensity,
                       distributionEvenness: distributionEvenness
             };
       }
 
       findCapitalizationClusters(text) {
             const words = text.split(/\s+/);
             const clusters = [];
             let currentCluster = [];
             
             for (let i = 0; i < words.length; i++) {
                       const word = words[i];
                       const isCapped = word.length > 1 && /^[A-ZА-ЯЁ]/.test(word);
                       
                       if (isCapped) {
                                 currentCluster.push({ word: word, index: i });
                       } else if (currentCluster.length > 0) {
                                 if (currentCluster.length >= 2) {
                                           clusters.push({
                                                     size: currentCluster.length,
                                                     words: currentCluster.map(c => c.word),
                                                     startIndex: currentCluster[0].index,
                                                     intensity: this.calculateClusterIntensity(currentCluster)
                                           });
                                 }
                                 currentCluster = [];
                       }
             }
             
             if (currentCluster.length >= 2) {
                       clusters.push({
                                 size: currentCluster.length,
                                 words: currentCluster.map(c => c.word),
                                 startIndex: currentCluster[0].index,
                                 intensity: this.calculateClusterIntensity(currentCluster)
                       });
             }
             
             return clusters;
       }
 
       getCapitalizationRules(language) {
             const rules = {
                       ru: {
                                 alwaysCapitalized: ['я', 'россия', 'москва'],
                                 alwaysLowercase: ['и', 'в', 'на', 'с', 'о'],
                                 properNounPatterns: [/ов$/, /ев$/, /ин$/, /ский$/, /цкий$/]
                       },
                       en: {
                                 alwaysCapitalized: ['i', 'usa', 'uk'],
                                 alwaysLowercase: ['a', 'an', 'the', 'and', 'but', 'or'],
                                 properNounPatterns: [/\b(?:mr|mrs|dr|prof)\.?\s+[A-Z]/i]
                       }
             };
             return rules[language] || rules.en;
       }
 
       integrateWithEmotionalAnalysis(capitalizationData, emotionalAnalysis) {
             const capsIntensity = capitalizationData.advanced.emotionalRatio;
             const emotionIntensity = emotionalAnalysis.profile.intensity || 0;
             const combinedIntensity = (capsIntensity * 0.3 + emotionIntensity * 0.7);
             const confidence = Math.min(1, capitalizationData.totalWords / 50);
             
             const flags = {
                       isShouting: capitalizationData.intensity > 0.1,
                       isEmphasizing: capitalizationData.advanced.emotionalRatio > 0.05,
                       hasCapsClusters: capitalizationData.advanced.clusters.length > 0,
                       isFormal: capitalizationData.advanced.properNouns.length > 
                                 capitalizationData.advanced.emotionalUse
             };
             
             const recommendations = this.generateCapitalizationRecommendations(capitalizationData);
             
             return {
                       combinedIntensity: combinedIntensity,
                       confidence: confidence,
                       flags: flags,
                       recommendations: recommendations
             };
       }
 
       isSentenceStart(word, text) {
             const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
             for (let i = 0; i < sentences.length; i++) {
                       const sentence = sentences[i];
                       const firstWord = sentence.trim().split(/\s+/)[0];
                       if (firstWord === word) {
                                 return true;
                       }
             }
             return false;
       }
 
       isLikelyProperNoun(word, words, text) {
             const index = words.indexOf(word);
             const prevWord = index > 0 ? words[index - 1] : null;
             
             const properNounMarkers = [
                       'господин', 'мистер', 'доктор', 'профессор', 
                       'mr.', 'mrs.', 'dr.', 'prof.', 'ms.',
                       'святой', 'святая', 'папа', 'король', 'королева'
             ];
             
             if (prevWord && properNounMarkers.includes(prevWord.toLowerCase())) {
                       return true;
             }
             
             const language = this.language || 'en';
             const rules = this.getCapitalizationRules(language);
             return rules.properNounPatterns.some(pattern => pattern.test(word));
       }
 
       calculateDistributionEvenness(positions) {
             if (positions.length === 0) return 1;
             const positionsOnly = positions.map(p => p.position);
             const mean = positionsOnly.reduce((a, b) => a + b, 0) / positionsOnly.length;
             const variance = positionsOnly.reduce((sq, n) => sq + Math.pow(n - mean, 2), 0) / positionsOnly.length;
             return Math.max(0, 1 - Math.sqrt(variance) * 2);
       }
 
       calculateClusterIntensity(cluster) {
             let intensity = 0;
             for (let i = 0; i < cluster.length; i++) {
                       const item = cluster[i];
                       if (/^[A-ZА-ЯЁ]+$/.test(item.word)) {
                                 intensity += 1.0;
                       } else {
                                 intensity += 0.5;
                       }
             }
             return intensity / cluster.length;
       }
 
        generateCapitalizationRecommendations(capitalizationData) {
             const recommendations = [];
             
             if (capitalizationData.intensity > 0.15) {
                       recommendations.push('reduce_shouting');
             }
             
             if (capitalizationData.advanced.emotionalRatio > 0.1) {
                       recommendations.push('moderate_emphasis');
             }
             
             if (capitalizationData.advanced.mixedCase > 0) {
                       recommendations.push('avoid_mixed_case');
             }
             
             if (capitalizationData.advanced.clusters.length > 2) {
                       recommendations.push('break_up_caps_clusters');
             }
             
             return recommendations.length > 0 ? recommendations : ['capitalization_appropriate'];
        }
        
        enhancedLexicalAnalysis(data) {
                              const words = data.words;
                              const language = this.language;
                              const dict = this.dictionaries[language];
                              const results = {};

                              const stemRussian = (word) => {
                                        if (!word || word.length < 3) return word;
                                        let w = word.toLowerCase();
                                        if (w.length > 6) {
                                                  if (w.endsWith('ого') || w.endsWith('его') || w.endsWith('ому') || w.endsWith('ему')) return w.slice(0, -3);
                                                  if (w.endsWith('ыми') || w.endsWith('ими')) return w.slice(0, -3);
                                        }
                                        if (w.length > 5) {
                                                  if (w.endsWith('ая') || w.endsWith('яя') || w.endsWith('ое') || w.endsWith('ее') || w.endsWith('ые') || w.endsWith('ие')) return w.slice(0, -2);
                                                  if (w.endsWith('ой') || w.endsWith('ий') || w.endsWith('ый')) return w.slice(0, -2);
                                                  if (w.endsWith('ом') || w.endsWith('ем') || w.endsWith('ам') || w.endsWith('ям')) return w.slice(0, -2);
                                                  if (w.endsWith('ов') || w.endsWith('ев') || w.endsWith('ин') || w.endsWith('ын')) return w.slice(0, -2);
                                                  if (w.endsWith('ах') || w.endsWith('ях')) return w.slice(0, -2);
                                        }
                                        if (w.length > 4) {
                                                  if (w.endsWith('ка') || w.endsWith('га') || w.endsWith('ха')) return w.slice(0, -1);
                                                  if (w.endsWith('ть') || w.endsWith('ти')) return w.slice(0, -2);
                                                  if (w.endsWith('ла') || w.endsWith('ло') || w.endsWith('ли')) return w.slice(0, -2);
                                        }
                                        return w;
                              };

                              for (const [category, wordList] of Object.entries(dict)) {
                                        let count = 0;
                                        let positions = [];
                                        let sentenceOccurrences = {};

                                        wordList.forEach(word => {
                                                  const normalizedWord = language === 'ru' ? stemRussian(word) : word;
                                                  const regex = new RegExp(`\\b${this.escapeRegExp(word)}\\b`, 'gi');
                                                  let match;
                                                  while ((match = regex.exec(data.cleaned)) !== null) {
                                                            const context = this.getWordContext(data.cleaned, match.index, word.length, 20);
                                                            let hasNegation = false;
                                                            const negations = this.contextRules[this.language]?.negations || ['не', 'ни', 'нет', 'без', 'not', 'no', 'never', 'none', 'don\'t', 'doesn\'t', 'didn\'t', 'won\'t'];
                                                            const contextStr = (context && typeof context === 'string') ? context : '';
                                                            const lowerContext = ' ' + contextStr.toLowerCase() + ' ';
                                                            for (const neg of negations) {
                                                                      const searchPhrase = ' ' + neg.toLowerCase() + ' ';
                                                                      if (lowerContext.includes(searchPhrase)) {
                                                                                hasNegation = true;
                                                                                break;
                                                                      }
                                                            }
                                                            positions.push({
                                                                      word: word,
                                                                      position: match.index,
                                                                      length: word.length,
                                                                      context: context,
                                                                      hasNegation: hasNegation
                                                            });
                                                            count += hasNegation ? 0.15 : 1.0;
                                                            const sentenceIndex = this.findSentenceIndex(data.sentences, match.index);
                                                            if (sentenceIndex !== -1) {
                                                                      if (!sentenceOccurrences[sentenceIndex]) {
                                                                                sentenceOccurrences[sentenceIndex] = [];
                                                                      }
                                                                      sentenceOccurrences[sentenceIndex].push(word);
                                                            }
                                                  }

                                                  if (language === 'ru' && count === 0) {
                                                            const stemmedTextWords = data.words.map(w => stemRussian(w));
                                                            if (stemmedTextWords.includes(normalizedWord)) {
                                                                      count += 0.5; 
                                                                      positions.push({
                                                                                word: word,
                                                                                position: -1,
                                                                                length: word.length,
                                                                                context: '',
                                                                                hasNegation: false
                                                                      });
                                                            }
                                                  }
                                        });

                                        if (count > 0) {
                                                  const weight = this.categoryWeights[category] || 1.0;
                                                  const frequency = count / words.length;
                                                  const intensity = this.calculateCategoryIntensity(category, count, frequency, data, { positions: positions });

                                                  results[category] = {
                                                            count,
                                                            frequency,
                                                            weight,
                                                            intensity,
                                                            score: count * weight * intensity,
                                                            positions,
                                                            sentenceOccurrences,
                                                            words: wordList.filter(word => 
                                                                      data.cleaned.toLowerCase().includes(word.toLowerCase()) || 
                                                                      (language === 'ru' && data.words.some(w => stemRussian(w) === stemRussian(word)))
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
        
        calculateCategoryIntensity(category, count, frequency, data = null, categoryData = null) {
                  const baseIntensity = Math.min(1, frequency * 10);
                  const intenseCategories = ['ecstasy', 'rage', 'despair', 'triumph', 'grief', 'terror', 'fury', 'agony', 'bliss', 'rapture', 'exaltation'];
                  const moderateCategories = ['joy', 'sadness', 'anger', 'fear', 'love', 'hate', 'disgust', 'shame', 'guilt', 'envy', 'loneliness', 'anxiety', 'contempt', 'bitterness', 'confusion', 'emptiness'];
                  const mildCategories = ['peace', 'calmness', 'curiosity', 'hope', 'gratitude', 'inspiration', 'pride', 'surprise', 'aesthetic', 'nostalgia', 'connection', 'resilience', 'vulnerability'];
                  let multiplier = 1.0;
                  if (intenseCategories.includes(category)) {
                    multiplier = 1.5;
                  } else if (moderateCategories.includes(category)) {
                    multiplier = 1.0;
                  } else if (mildCategories.includes(category)) {
                    multiplier = 0.7;
                  }
                  let contextualBoost = 0;
                  if (data && data.punctuation) {
                    if (data.punctuation['!']) contextualBoost += data.punctuation['!'] * 0.05;
                    if (data.punctuation['!!!']) contextualBoost += data.punctuation['!!!'] * 0.15;
                  }
                  if (data && data.contextual && data.contextual.indicators && data.contextual.indicators.intensifiers) {
                    contextualBoost += data.contextual.indicators.intensifiers * 0.03;
                  }
                  let positionFactor = 1.0;
                  if (categoryData && categoryData.positions && data && data.cleaned) {
                    const firstPosition = categoryData.positions[0]?.position || 0;
                    const lastPosition = categoryData.positions[categoryData.positions.length - 1]?.position || 0;
                    const textLength = data.cleaned.length;
                    if (firstPosition < textLength * 0.1 || lastPosition > textLength * 0.9) {
                      positionFactor = 1.2;
                    }
                  }
                  let textLengthFactor = 1.0;
                  if (data && data.words && data.words.length > 0) {
                    textLengthFactor = Math.min(1.5, 1 + (100 / (data.words.length + 100)));
                  }
                  let negationFactor = 1.0;
                    if (categoryData && categoryData.positions && categoryData.positions.length > 0) {
                        const negations = this.contextRules[this.language]?.negations || [];
                        let negationCount = 0;
                        categoryData.positions.forEach(pos => {
                            if (pos.context && typeof pos.context === 'string') {
                                const lowerContext = pos.context.toLowerCase();
                                negations.forEach(neg => {
                                    const negPattern = new RegExp(`\\b${this.escapeRegExp(neg)}\\b`, 'i');
                                    if (negPattern.test(lowerContext)) {
                                        negationCount++;
                                    }
                                });
                            }
                        });
                        if (negationCount > 0) {
                            negationFactor = 0.4;
                        }
                  }
                  let clusterBoost = 0;
                  if (categoryData && categoryData.clusters) {
                    clusterBoost = Math.min(0.5, categoryData.clusters.length * 0.1);
                  }
                  let contextFactor = 1.0;
                  if (categoryData && categoryData.positions && categoryData.positions.length > 0) {
                    let negationCount = 0;
                    let intensifierCount = 0;
                    let allCapsCount = 0;
                    categoryData.positions.forEach(pos => {
                        if (pos.context && typeof pos.context === 'string') {
                            const lowerContext = pos.context.toLowerCase();
                            const rules = this.contextRules[this.language];
                            rules.negations.forEach(neg => {
                                if (lowerContext.includes(` ${neg} `) || lowerContext.startsWith(`${neg} `)) negationCount++;
                            });
                            rules.intensifiers.forEach(int => {
                                if (lowerContext.includes(` ${int} `) || lowerContext.startsWith(`${int} `)) intensifierCount++;
                            });
                            if (pos.context.match(/\b[A-ZА-ЯЁ]{3,}\b/)) allCapsCount++;
                        }
                    });
                    if (negationCount > 0) contextFactor *= 0.6;
                    if (intensifierCount > 0) contextFactor *= (1 + Math.min(0.4, intensifierCount * 0.1));
                    if (allCapsCount > 0) contextFactor *= (1 + Math.min(0.3, allCapsCount * 0.05));
                  }
                  const adjustedMultiplier = multiplier * textLengthFactor * negationFactor * contextFactor;
                  const contextualIntensity = baseIntensity * adjustedMultiplier * (1 + contextualBoost) * positionFactor;
                  const finalIntensity = Math.min(1, contextualIntensity + clusterBoost);
                  return finalIntensity;
        }
        
        calculateCategoryDominance(category, count, totalWords, categoryData = null, textLength = null, allCategories = null) {
                  const proportion = totalWords > 0 ? count / totalWords : 0;
                  let textLengthFactor = 1.0;
                  if (textLength) {
                    textLengthFactor = Math.min(1.5, 100 / (textLength + 100));
                  }
                  let relativeFactor = 1.0;
                  if (allCategories && Object.keys(allCategories).length > 0) {
                    const categoryProportions = Object.values(allCategories).map(cat => cat.count / totalWords);
                    const maxProportion = Math.max(...categoryProportions);
                    const proportionRank = categoryProportions.sort((a, b) => b - a).indexOf(proportion);
                    if (proportion > 0 && proportion >= maxProportion * 0.7) {
                      relativeFactor = 1.3;
                    }
                    if (proportionRank === 0) {
                      relativeFactor = 1.5;
                    } else if (proportionRank === 1) {
                      relativeFactor = 1.2;
                    }
                  }
                  let clusterFactor = 1.0;
                  if (categoryData && categoryData.clusters && categoryData.clusters.length > 0) {
                    const clusterDensity = categoryData.clusters.length / (textLength || 1);
                    clusterFactor = 1 + Math.min(0.5, clusterDensity * 10);
                  }
                  let intensityFactor = 1.0;
                  if (categoryData && categoryData.intensity) {
                    intensityFactor = 0.8 + (categoryData.intensity * 0.4);
                  }
                  let positionFactor = 1.0;
                  if (categoryData && categoryData.positions && categoryData.positions.length > 0) {
                    const positions = categoryData.positions.map(p => p.position);
                    const firstPosition = Math.min(...positions);
                    const lastPosition = Math.max(...positions);
                    const textStart = firstPosition / (textLength || 1);
                    const textEnd = lastPosition / (textLength || 1);
                    if (textStart < 0.1 || textEnd > 0.9) {
                      positionFactor = 1.3;
                    }
                    const positionSpread = (lastPosition - firstPosition) / (textLength || 1);
                    if (positionSpread > 0.7) {
                      positionFactor *= 1.2;
                    }
                  }
                  const adjustedProportion = proportion * textLengthFactor * relativeFactor * clusterFactor * intensityFactor * positionFactor;
                  const baseThreshold = 0.05;
                  const adjustedThresholds = {
                    high: baseThreshold * 2,
                    medium: baseThreshold,
                    low: baseThreshold * 0.4
                  };
                  if (adjustedProportion > adjustedThresholds.high) return 'high';
                  if (adjustedProportion > adjustedThresholds.medium) return 'medium';
                  if (adjustedProportion > adjustedThresholds.low) return 'low';
                  return 'minimal';
        }
        
        calculateLexicalConcentration(categories, totalWords, data = null, categoryData = null) {
                  if (totalWords === 0) return 0;
                  const emotionalWords = Object.values(categories).reduce((sum, cat) => sum + cat.count, 0);
                  if (emotionalWords === 0) return 0;
                  let weightedProportions = [];
                  for (const [category, catData] of Object.entries(categories)) {
                    const rawProportion = catData.count / emotionalWords;
                    const weight = catData.weight || 1.0;
                    const intensity = catData.intensity || 0.5;
                    const weightedProportion = rawProportion * weight * intensity;
                    weightedProportions.push({
                      category: category,
                      proportion: weightedProportion,
                      weight: weight,
                      intensity: intensity,
                      rawCount: catData.count
                    });
                  }
                  const totalWeighted = weightedProportions.reduce((sum, p) => sum + p.proportion, 0);
                  if (totalWeighted === 0) return 0;
                  weightedProportions = weightedProportions.map(p => ({
                    ...p,
                    normalized: p.proportion / totalWeighted
                  }));
                  const proportions = weightedProportions.map(p => p.normalized).sort((a, b) => a - b);
                  const n = proportions.length;
                  if (n === 0) return 0;
                  let gini = 0;
                  for (let i = 0; i < n; i++) {
                    for (let j = 0; j < n; j++) {
                      gini += Math.abs(proportions[i] - proportions[j]);
                    }
                  }
                  const baseGini = gini / (2 * n * n * (proportions.reduce((a, b) => a + b, 0) / n));
                  let textLengthFactor = 1.0;
                  if (data && data.words && data.words.length > 0) {
                    const textLength = data.words.length;
                    textLengthFactor = Math.max(0.7, 1 - (50 / (textLength + 50)));
                  }
                  let clusterFactor = 1.0;
                  if (categoryData) {
                    let totalClusters = 0;
                    for (const [category, catData] of Object.entries(categoryData)) {
                      if (catData.clusters && catData.clusters.length > 0) {
                        totalClusters += catData.clusters.length;
                      }
                    }
                    if (totalClusters > 0) {
                      clusterFactor = 1 + Math.min(0.3, totalClusters * 0.05);
                    }
                  }
                  let positionFactor = 1.0;
                  if (data && data.sentences && data.sentences.length > 0) {
                    const firstThird = Math.floor(data.sentences.length / 3);
                    const lastThird = data.sentences.length - firstThird;
                    let earlyEmotionCount = 0;
                    let lateEmotionCount = 0;
                    for (const [category, catData] of Object.entries(categories)) {
                      if (catData.sentenceOccurrences) {
                        for (const sentenceIdx of Object.keys(catData.sentenceOccurrences)) {
                          const idx = parseInt(sentenceIdx);
                          if (idx < firstThird) earlyEmotionCount += catData.sentenceOccurrences[sentenceIdx].length;
                          if (idx >= lastThird) lateEmotionCount += catData.sentenceOccurrences[sentenceIdx].length;
                        }
                      }
                    }
                    const totalEmotions = emotionalWords;
                    const edgeConcentration = (earlyEmotionCount + lateEmotionCount) / totalEmotions;
                    if (edgeConcentration > 0.6) {
                      positionFactor = 1.2;
                    }
                  }
                  const adjustedGini = baseGini * textLengthFactor * clusterFactor * positionFactor;
                  return Math.min(1, Math.max(0, adjustedGini));
        }
        
        calculateLexicalDistribution(categories, sentenceCount, data = null) {
                  if (sentenceCount === 0) return 0;
                  const sentencesWithEmotion = new Set();
                  const emotionDensityPerSentence = {};
                  const categoryDiversityPerSentence = {};
                  const sentencePositions = {};
                  for (const [category, dataItem] of Object.entries(categories)) {
                    if (dataItem.sentenceOccurrences) {
                      Object.entries(dataItem.sentenceOccurrences).forEach(([sentenceIndexStr, words]) => {
                        const sentenceIndex = parseInt(sentenceIndexStr);
                        sentencesWithEmotion.add(sentenceIndex);
                        emotionDensityPerSentence[sentenceIndex] = (emotionDensityPerSentence[sentenceIndex] || 0) + words.length;
                        if (!categoryDiversityPerSentence[sentenceIndex]) {
                          categoryDiversityPerSentence[sentenceIndex] = new Set();
                        }
                        categoryDiversityPerSentence[sentenceIndex].add(category);
                        sentencePositions[sentenceIndex] = sentenceIndex;
                      });
                    }
                  }
                  const coverageRatio = sentencesWithEmotion.size / sentenceCount;
                  let densityFactor = 0;
                  if (Object.keys(emotionDensityPerSentence).length > 0) {
                    const densities = Object.values(emotionDensityPerSentence);
                    const avgDensity = densities.reduce((a, b) => a + b, 0) / densities.length;
                    const maxDensity = Math.max(...densities);
                    densityFactor = Math.min(1, avgDensity / 3 + maxDensity / 10);
                  }
                  let diversityFactor = 0;
                  if (Object.keys(categoryDiversityPerSentence).length > 0) {
                    const diversities = Object.values(categoryDiversityPerSentence).map(set => set.size);
                    const avgDiversity = diversities.reduce((a, b) => a + b, 0) / diversities.length;
                    diversityFactor = Math.min(1, avgDiversity / 3);
                  }
                  let sequenceFactor = 1.0;
                  if (sentencesWithEmotion.size > 1) {
                    const sortedIndices = Array.from(sentencesWithEmotion).sort((a, b) => a - b);
                    let consecutiveCount = 0;
                    let maxConsecutive = 1;
                    for (let i = 1; i < sortedIndices.length; i++) {
                      if (sortedIndices[i] === sortedIndices[i - 1] + 1) {
                        consecutiveCount++;
                        maxConsecutive = Math.max(maxConsecutive, consecutiveCount + 1);
                      } else {
                        consecutiveCount = 0;
                      }
                    }
                    sequenceFactor = 1 + Math.min(0.3, maxConsecutive * 0.05);
                  }
                  let positionFactor = 1.0;
                  if (data && data.sentences && data.sentences.length > 0) {
                    const firstThird = Math.floor(sentenceCount / 3);
                    const lastThird = sentenceCount - firstThird;
                    let earlyEmotionCount = 0;
                    let lateEmotionCount = 0;
                    sentencesWithEmotion.forEach(idx => {
                      if (idx < firstThird) earlyEmotionCount++;
                      if (idx >= lastThird) lateEmotionCount++;
                    });
                    const edgeConcentration = (earlyEmotionCount + lateEmotionCount) / sentencesWithEmotion.size;
                    if (edgeConcentration > 0.6) {
                      positionFactor = 1.2;
                    }
                  }
                  let sectionAnalysis = { first: 0, middle: 0, last: 0 };
                  if (sentenceCount >= 3) {
                    const firstThird = Math.floor(sentenceCount / 3);
                    const lastThird = sentenceCount - firstThird;
                    let firstCount = 0, middleCount = 0, lastCount = 0;
                    sentencesWithEmotion.forEach(idx => {
                      if (idx < firstThird) firstCount++;
                      else if (idx < lastThird) middleCount++;
                      else lastCount++;
                    });
                    sectionAnalysis = {
                      first: firstCount / firstThird,
                      middle: middleCount / (lastThird - firstThird),
                      last: lastCount / firstThird
                    };
                  }
                  const adjustedCoverage = coverageRatio * (1 + densityFactor * 0.2 + diversityFactor * 0.2) * sequenceFactor * positionFactor;
                  return {
                    coverage: Math.min(1, adjustedCoverage),
                    rawCoverage: coverageRatio,
                    densityFactor: densityFactor,
                    diversityFactor: diversityFactor,
                    sequenceFactor: sequenceFactor,
                    positionFactor: positionFactor,
                    sectionAnalysis: sectionAnalysis,
                    emotionDensityPerSentence: emotionDensityPerSentence,
                    categoryDiversityPerSentence: categoryDiversityPerSentence
                  };
        }
        
        calculateLexicalRichness(categories, allWords, data = null) {
                  const uniqueEmotionalWords = new Set();
                  const emotionalWordWeights = {};
                  const emotionalCategories = new Set();
                  for (const [category, dataItem] of Object.entries(categories)) {
                    emotionalCategories.add(category);
                    if (dataItem.words) {
                      dataItem.words.forEach(word => {
                        uniqueEmotionalWords.add(word);
                        emotionalWordWeights[word] = dataItem.weight || 1.0;
                      });
                    }
                  }
                  const totalUniqueWords = new Set(allWords).size;
                  if (totalUniqueWords === 0 || uniqueEmotionalWords.size === 0) return 0;
                  const baseRichness = uniqueEmotionalWords.size / totalUniqueWords;
                  let weightFactor = 1.0;
                  if (Object.keys(emotionalWordWeights).length > 0) {
                    const weights = Object.values(emotionalWordWeights);
                    const avgWeight = weights.reduce((a, b) => a + b, 0) / weights.length;
                    weightFactor = 0.8 + (avgWeight * 0.4);
                  }
                  let categoryDiversityFactor = 1.0;
                  const categoryCount = emotionalCategories.size;
                  const maxCategories = 15;
                  categoryDiversityFactor = 0.7 + (categoryCount / maxCategories * 0.6);
                  let textLengthFactor = 1.0;
                  if (data && data.words && data.words.length > 0) {
                    const textLength = data.words.length;
                    textLengthFactor = Math.min(1.3, 1 + (200 / (textLength + 200)));
                  }
                  let specificityFactor = 1.0;
                  if (data && data.contextual && data.contextual.lexical) {
                    const specificWords = data.contextual.lexical.specificEmotionalWords || 0;
                    const totalEmotional = uniqueEmotionalWords.size;
                    if (totalEmotional > 0) {
                      const specificityRatio = specificWords / totalEmotional;
                      specificityFactor = 0.9 + (specificityRatio * 0.4);
                    }
                  }
                  const adjustedRichness = baseRichness * weightFactor * categoryDiversityFactor * textLengthFactor * specificityFactor;
                  return Math.min(1, Math.max(0, adjustedRichness));
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
                                    context: pos.context,
                                    weight: this.categoryWeights[category] || 1.0
                                });
                            });
                        }
                    }
                    
                    emotionalPositions.sort((a, b) => a.position - b.position);
                    
                    let currentCluster = [];
                    const clusterDistance = 50;
                    const minWordsForCluster = 2;
                    
                    for (let i = 0; i < emotionalPositions.length; i++) {
                        if (currentCluster.length === 0) {
                            currentCluster.push(emotionalPositions[i]);
                        } else {
                            const lastPosition = currentCluster[currentCluster.length - 1];
                            const currentPosition = emotionalPositions[i];
                            const gap = currentPosition.position - (lastPosition.position + lastPosition.length);
                            
                            if (gap < clusterDistance) {
                                currentCluster.push(currentPosition);
                            } else {
                                if (currentCluster.length >= minWordsForCluster) {
                                    clusters.push({
                                        positions: [...currentCluster],
                                        size: currentCluster.length,
                                        categories: [...new Set(currentCluster.map(p => p.category))],
                                        intensity: this.calculateClusterIntensity(currentCluster),
                                        center: this.calculateClusterCenter(currentCluster),
                                        emotionalWeight: this.calculateClusterWeight(currentCluster),
                                        diversity: this.calculateClusterDiversity(currentCluster)
                                    });
                                }
                                currentCluster = [currentPosition];
                            }
                        }
                    }
                    
                    if (currentCluster.length >= minWordsForCluster) {
                        clusters.push({
                            positions: [...currentCluster],
                            size: currentCluster.length,
                            categories: [...new Set(currentCluster.map(p => p.category))],
                            intensity: this.calculateClusterIntensity(currentCluster),
                            center: this.calculateClusterCenter(currentCluster),
                            emotionalWeight: this.calculateClusterWeight(currentCluster),
                            diversity: this.calculateClusterDiversity(currentCluster)
                        });
                    }
                    
                    return clusters.sort((a, b) => b.intensity - a.intensity);
        }
                
        calculateClusterCenter(positions) {
                    const avgPosition = positions.reduce((sum, p) => sum + p.position, 0) / positions.length;
                    const avgLength = positions.reduce((sum, p) => sum + p.length, 0) / positions.length;
                    const span = positions[positions.length - 1].position - positions[0].position;
                    const density = span > 0 ? positions.length / span : 0;
                    
                    const weightedPosition = positions.reduce((sum, p) => sum + p.position * (p.weight || 1), 0) / positions.reduce((sum, p) => sum + (p.weight || 1), 0);
                    
                    return {
                        position: avgPosition,
                        weightedPosition: weightedPosition,
                        length: avgLength,
                        density: density,
                        span: span,
                        concentration: positions.length / (span + 1)
                    };
        }
                
        calculateClusterIntensity(cluster) {
                    const baseIntensity = cluster.length * 1.5;
                    const categoryCount = new Set(cluster.map(p => p.category)).size;
                    const diversityBonus = Math.min(2.0, categoryCount * 0.3);
                    const weightSum = cluster.reduce((sum, p) => sum + (p.weight || 1), 0);
                    const weightFactor = weightSum / cluster.length;
                    
                    return baseIntensity * (1 + diversityBonus) * weightFactor;
        }
                
        calculateClusterWeight(cluster) {
                    return cluster.reduce((sum, p) => sum + (p.weight || 1), 0) / cluster.length;
        }
                
        calculateClusterDiversity(cluster) {
                    const categories = new Set(cluster.map(p => p.category));
                    const totalCategories = 30;
                    return categories.size / totalCategories;
        }
        
        analyzeEmotionalProgression(categories, data) {
                    const progression = {
                        phases: [],
                        transitions: [],
                        overallTrend: 'stable',
                        emotionalArc: [],
                        metrics: {
                            volatility: 0,
                            momentum: 0,
                            peakIntensity: 0,
                            valleyDepth: 0,
                            arcType: 'flat',
                            phaseCount: 0,
                            averagePhaseLength: 0,
                            emotionalMomentum: 0
                        },
                        peaks: [],
                        valleys: [],
                        inflectionPoints: [],
                        emotionalMomentum: 0,
                        complexityScore: 0
                    };
                    
                    if (data.sentences.length < 2) return progression;
                    
                    const sentenceEmotions = data.sentences.map((sentence, index) => {
                        const sentenceText = typeof sentence === 'object' ? sentence.text : sentence;
                        const words = this.enhancedTokenization(sentenceText);
                        
                        let score = 0;
                        let categoryCount = 0;
                        let weightedScore = 0;
                        let positiveWeight = 0;
                        let negativeWeight = 0;
                        let complexWeight = 0;
                        const emotionCategories = [];
                        
                        for (const [category, categoryData] of Object.entries(categories)) {
                            if (categoryData.sentenceOccurrences && categoryData.sentenceOccurrences[index]) {
                                const occurrences = categoryData.sentenceOccurrences[index].length;
                                const weight = this.categoryWeights[category] || 1.0;
                                const intensity = categoryData.intensity || 0.5;
                                const weightedOccurrences = occurrences * weight * intensity;
                                
                                const isPositive = ['ecstasy', 'joy', 'love', 'peace', 'hope', 
                                                  'gratitude', 'inspiration', 'pride', 'surprise', 'curiosity'].includes(category);
                                const isNegative = ['sadness', 'grief', 'anger', 'fear', 'disgust', 
                                                  'shame', 'guilt', 'loneliness', 'envy', 'despair', 'contempt', 'bitterness'].includes(category);
                                const isComplex = ['ambivalence', 'irony', 'nostalgiaMixed', 'bittersweet', 
                                                 'nostalgia', 'aesthetic', 'intensity', 'calmness'].includes(category);
                                
                                if (isPositive) {
                                    score += occurrences;
                                    weightedScore += weightedOccurrences;
                                    positiveWeight += weightedOccurrences;
                                }
                                if (isNegative) {
                                    score -= occurrences;
                                    weightedScore -= weightedOccurrences;
                                    negativeWeight += weightedOccurrences;
                                }
                                if (isComplex) {
                                    complexWeight += weightedOccurrences;
                                }
                                
                                categoryCount += occurrences;
                                emotionCategories.push({
                                    category: category,
                                    occurrences: occurrences,
                                    weight: weight,
                                    intensity: intensity
                                });
                            }
                        }
                        
                        const emotionalDensity = categoryCount / words.length || 0;
                        const complexityFactor = complexWeight / (positiveWeight + negativeWeight + complexWeight + 0.001);
                        const intensityFactor = Math.abs(weightedScore) / (categoryCount || 1);
                        const momentumFactor = emotionalDensity * intensityFactor * (1 + complexityFactor * 0.3);
                        
                        return {
                            sentence: sentenceText,
                            index: index,
                            rawScore: score,
                            weightedScore: weightedScore,
                            score: categoryCount > 0 ? weightedScore / categoryCount : 0,
                            wordCount: words.length,
                            emotionalDensity: emotionalDensity,
                            positiveWeight: positiveWeight,
                            negativeWeight: negativeWeight,
                            complexWeight: complexWeight,
                            complexityFactor: complexityFactor,
                            intensityFactor: intensityFactor,
                            momentumFactor: momentumFactor,
                            categories: emotionCategories,
                            categoryCount: categoryCount
                        };
                    });
                    
                    let currentPhase = {
                        start: 0,
                        end: 0,
                        trend: 'neutral',
                        intensity: 0,
                        dominantCategories: [],
                        momentum: 0,
                        complexity: 0,
                        emotionalDensity: 0
                    };
                    
                    const trendThreshold = 0.08;
                    const changeThreshold = 0.15;
                    const momentumThreshold = 0.2;
                    
                    for (let i = 0; i < sentenceEmotions.length; i++) {
                        const emotion = sentenceEmotions[i];
                        
                        if (i === 0) {
                            currentPhase.trend = emotion.score > trendThreshold ? 'positive' : 
                                               emotion.score < -trendThreshold ? 'negative' : 'neutral';
                            currentPhase.intensity = Math.abs(emotion.score);
                            currentPhase.momentum = emotion.momentumFactor;
                            currentPhase.complexity = emotion.complexityFactor;
                            currentPhase.emotionalDensity = emotion.emotionalDensity;
                        } else {
                            const prevEmotion = sentenceEmotions[i - 1];
                            const scoreChange = emotion.score - prevEmotion.score;
                            const momentumChange = emotion.momentumFactor - prevEmotion.momentumFactor;
                            const trendChange = Math.abs(scoreChange) > changeThreshold || 
                                              Math.abs(momentumChange) > momentumThreshold;
                            
                            if (trendChange) {
                                currentPhase.end = i - 1;
                                progression.phases.push({...currentPhase});
                                
                                currentPhase = {
                                    start: i,
                                    end: i,
                                    trend: emotion.score > trendThreshold ? 'positive' : 
                                          emotion.score < -trendThreshold ? 'negative' : 'neutral',
                                    intensity: Math.abs(emotion.score),
                                    momentum: emotion.momentumFactor,
                                    complexity: emotion.complexityFactor,
                                    emotionalDensity: emotion.emotionalDensity,
                                    dominantCategories: []
                                };
                            } else {
                                currentPhase.end = i;
                                currentPhase.intensity = (currentPhase.intensity + Math.abs(emotion.score)) / 2;
                                currentPhase.momentum = (currentPhase.momentum + emotion.momentumFactor) / 2;
                                currentPhase.complexity = (currentPhase.complexity + emotion.complexityFactor) / 2;
                                currentPhase.emotionalDensity = (currentPhase.emotionalDensity + emotion.emotionalDensity) / 2;
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
                                intensityChange: Math.abs(currPhase.intensity - prevPhase.intensity),
                                momentumChange: Math.abs(currPhase.momentum - prevPhase.momentum),
                                complexityChange: Math.abs(currPhase.complexity - prevPhase.complexity)
                            });
                        }
                    }
                    
                    const totalScore = sentenceEmotions.reduce((sum, e) => sum + e.score, 0);
                    const avgScore = totalScore / sentenceEmotions.length;
                    const momentumSum = sentenceEmotions.reduce((sum, e) => sum + e.momentumFactor, 0);
                    const avgMomentum = momentumSum / sentenceEmotions.length;
                    
                    if (avgScore > trendThreshold) progression.overallTrend = 'positive';
                    else if (avgScore < -trendThreshold) progression.overallTrend = 'negative';
                    else progression.overallTrend = 'balanced';
                    
                    progression.emotionalMomentum = avgMomentum;
                    
                    const volatility = this.calculateEmotionalVolatility(sentenceEmotions);
                    const momentum = this.calculateEmotionalMomentum(sentenceEmotions);
                    const arcType = this.detectEmotionalArcType(sentenceEmotions);
                    
                    progression.metrics.volatility = volatility;
                    progression.metrics.momentum = momentum;
                    progression.metrics.arcType = arcType;
                    progression.metrics.phaseCount = progression.phases.length;
                    progression.metrics.averagePhaseLength = progression.phases.length > 0 ? 
                        progression.phases.reduce((sum, p) => sum + (p.end - p.start + 1), 0) / progression.phases.length : 0;
                    progression.metrics.peakIntensity = Math.max(...sentenceEmotions.map(e => Math.abs(e.score)));
                    progression.metrics.valleyDepth = Math.min(...sentenceEmotions.map(e => e.score));
                    progression.metrics.emotionalMomentum = momentum;
                    
                    progression.peaks = this.detectEmotionalPeaks(sentenceEmotions);
                    progression.valleys = this.detectEmotionalValleys(sentenceEmotions);
                    progression.inflectionPoints = this.detectInflectionPoints(sentenceEmotions);
                    
                    progression.complexityScore = this.calculateProgressionComplexity(progression);
                    
                    return progression;
        }
                
        calculateEmotionalVolatility(sentenceEmotions) {
                    if (sentenceEmotions.length < 2) return 0;
                    let totalChange = 0;
                    let maxChange = 0;
                    let sharpTransitions = 0;
                    let directionChanges = 0;
                    let prevDirection = null;
                    for (let i = 1; i < sentenceEmotions.length; i++) {
                        const diff = sentenceEmotions[i].score - sentenceEmotions[i - 1].score;
                        const absDiff = Math.abs(diff);
                        totalChange += absDiff;
                        maxChange = Math.max(maxChange, absDiff);
                        if (absDiff > 0.4) sharpTransitions++;
                        const currentDirection = diff > 0 ? 1 : (diff < 0 ? -1 : 0);
                        if (prevDirection !== null && currentDirection !== 0 && prevDirection !== currentDirection) {
                            directionChanges++;
                        }
                        prevDirection = currentDirection;
                    }
                    const avgChange = totalChange / (sentenceEmotions.length - 1);
                    const sharpnessFactor = 1 + (sharpTransitions / (sentenceEmotions.length - 1)) * 0.5;
                    const directionFactor = 1 + (directionChanges / (sentenceEmotions.length - 1)) * 0.3;
                    const maxImpact = maxChange > 0.6 ? 1.2 : 1.0;
                    const volatility = avgChange * sharpnessFactor * directionFactor * maxImpact;
                    return Math.min(1.0, volatility);
        }
                
        calculateEmotionalMomentum(sentenceEmotions) {
                    if (sentenceEmotions.length === 0) return 0;
                    const momentumValues = sentenceEmotions.map(e => e.momentumFactor);
                    const avgMomentum = momentumValues.reduce((a, b) => a + b, 0) / momentumValues.length;
                    const stdDev = Math.sqrt(
                        momentumValues.reduce((sum, val) => sum + Math.pow(val - avgMomentum, 2), 0) / momentumValues.length
                    );
                    return avgMomentum * (1 + stdDev);
        }
                
        detectEmotionalPeaks(sentenceEmotions) {
                    const peaks = [];
                    for (let i = 1; i < sentenceEmotions.length - 1; i++) {
                        const prev = sentenceEmotions[i - 1].score;
                        const curr = sentenceEmotions[i].score;
                        const next = sentenceEmotions[i + 1].score;
                        
                        if (curr > prev && curr > next && curr > 0.15) {
                            peaks.push({
                                position: i,
                                score: curr,
                                intensity: curr,
                                type: 'positive'
                            });
                        }
                    }
                    return peaks.sort((a, b) => b.intensity - a.intensity).slice(0, 5);
        }
                
        detectEmotionalValleys(sentenceEmotions) {
                    const valleys = [];
                    for (let i = 1; i < sentenceEmotions.length - 1; i++) {
                        const prev = sentenceEmotions[i - 1].score;
                        const curr = sentenceEmotions[i].score;
                        const next = sentenceEmotions[i + 1].score;
                        
                        if (curr < prev && curr < next && curr < -0.15) {
                            valleys.push({
                                position: i,
                                score: curr,
                                intensity: Math.abs(curr),
                                type: 'negative'
                            });
                        }
                    }
                    return valleys.sort((a, b) => b.intensity - a.intensity).slice(0, 5);
        }
                
        detectInflectionPoints(sentenceEmotions) {
                    const inflections = [];
                    for (let i = 2; i < sentenceEmotions.length - 2; i++) {
                        const prev2 = sentenceEmotions[i - 2].score;
                        const prev1 = sentenceEmotions[i - 1].score;
                        const curr = sentenceEmotions[i].score;
                        const next1 = sentenceEmotions[i + 1].score;
                        const next2 = sentenceEmotions[i + 2].score;
                        
                        const firstDerivative = (next1 - prev1) / 2;
                        const secondDerivative = (next2 - 2 * curr + prev2) / 4;
                        
                        if (Math.abs(secondDerivative) > 0.1 && Math.abs(firstDerivative) < 0.05) {
                            inflections.push({
                                position: i,
                                type: secondDerivative > 0 ? 'minimum' : 'maximum',
                                curvature: Math.abs(secondDerivative)
                            });
                        }
                    }
                    return inflections.slice(0, 10);
        }
                
        createIntensityProfile(categories) {
                    const profile = {
                        overall: 0,
                        positive: 0,
                        negative: 0,
                        complex: 0,
                        distribution: {},
                        balance: 0,
                        dominance: 0,
                        contrast: 0,
                        weightedOverall: 0,
                        intensityDistribution: {
                            high: 0,
                            medium: 0,
                            low: 0
                        },
                        polarityRatio: 0,
                        complexityScore: 0,
                        concentration: 0
                    };
                    
                    const positiveCats = ['ecstasy', 'joy', 'love', 'peace', 'hope', 'gratitude', 'inspiration', 'pride', 'surprise', 'curiosity', 'aesthetic', 'triumph', 'liberation', 'connection', 'calmness', 'vulnerability', 'resilience'];
                    const negativeCats = ['sadness', 'grief', 'anger', 'fear', 'disgust', 'shame', 'guilt', 'loneliness', 'envy', 'despair', 'contempt', 'bitterness', 'anxiety', 'emptiness', 'confusion'];
                    const complexCats = ['ambivalence', 'irony', 'nostalgiaMixed', 'bittersweet', 'nostalgia', 'intensity'];
                    
                    let totalIntensity = 0;
                    let weightedTotalIntensity = 0;
                    let positiveIntensity = 0;
                    let negativeIntensity = 0;
                    let complexIntensity = 0;
                    let totalCount = 0;
                    let maxIntensity = 0;
                    let highIntensityCount = 0;
                    let mediumIntensityCount = 0;
                    let lowIntensityCount = 0;
                    
                    const categoryScores = [];
                    
                    for (const [category, data] of Object.entries(categories)) {
                        const rawIntensity = data.intensity || 0;
                        const weight = data.weight || 1.0;
                        const count = data.count || 0;
                        const weightedIntensity = rawIntensity * weight;
                        
                        totalIntensity += rawIntensity;
                        weightedTotalIntensity += weightedIntensity;
                        totalCount += count;
                        
                        if (rawIntensity > maxIntensity) {
                            maxIntensity = rawIntensity;
                        }
                        
                        if (rawIntensity > 0.7) {
                            highIntensityCount++;
                        } else if (rawIntensity > 0.3) {
                            mediumIntensityCount++;
                        } else {
                            lowIntensityCount++;
                        }
                        
                        if (positiveCats.includes(category)) {
                            positiveIntensity += weightedIntensity;
                        } else if (negativeCats.includes(category)) {
                            negativeIntensity += weightedIntensity;
                        } else if (complexCats.includes(category)) {
                            complexIntensity += weightedIntensity;
                        }
                        
                        profile.distribution[category] = {
                            raw: rawIntensity,
                            weighted: weightedIntensity,
                            count: count,
                            weight: weight,
                            dominance: data.dominance || 'medium'
                        };
                        
                        categoryScores.push({
                            category: category,
                            score: weightedIntensity,
                            intensity: rawIntensity,
                            count: count
                        });
                    }
                    
                    profile.overall = totalIntensity;
                    profile.weightedOverall = weightedTotalIntensity;
                    
                    if (totalIntensity > 0) {
                        profile.positive = positiveIntensity / totalIntensity;
                        profile.negative = negativeIntensity / totalIntensity;
                        profile.complex = complexIntensity / totalIntensity;
                    }
                    
                    if (weightedTotalIntensity > 0) {
                        const polarityDifference = Math.abs(profile.positive - profile.negative);
                        const polaritySum = profile.positive + profile.negative;
                        profile.balance = polaritySum > 0 ? 1 - (polarityDifference / polaritySum) : 0;
                        profile.contrast = polarityDifference;
                        profile.polarityRatio = profile.negative > 0 ? profile.positive / profile.negative : profile.positive > 0 ? Infinity : 1;
                    }
                    
                    if (categoryScores.length > 0) {
                        categoryScores.sort((a, b) => b.score - a.score);
                        const topScore = categoryScores[0].score;
                        const secondScore = categoryScores.length > 1 ? categoryScores[1].score : 0;
                        profile.dominance = topScore > 0 ? 1 - (secondScore / topScore) : 0;
                    }
                    
                    const totalCategories = categoryScores.length;
                    if (totalCategories > 0) {
                        profile.intensityDistribution.high = highIntensityCount / totalCategories;
                        profile.intensityDistribution.medium = mediumIntensityCount / totalCategories;
                        profile.intensityDistribution.low = lowIntensityCount / totalCategories;
                    }
                    
                    const complexCategoriesFound = categoryScores.filter(s => complexCats.includes(s.category)).length;
                    profile.complexityScore = totalCategories > 0 ? complexCategoriesFound / totalCategories : 0;
                    
                    const intensityValues = categoryScores.map(s => s.intensity);
                    if (intensityValues.length > 0) {
                        const avgIntensity = intensityValues.reduce((a, b) => a + b, 0) / intensityValues.length;
                        const variance = intensityValues.reduce((sum, val) => sum + Math.pow(val - avgIntensity, 2), 0) / intensityValues.length;
                        profile.concentration = 1 - Math.min(1, variance * 2);
                    }
                    
                    return profile;
        }
                
        findDominantCategory(categoryData) {
                    if (!categoryData || Object.keys(categoryData).length === 0) {
                        return 'neutral';
                    }
                    
                    let maxScore = 0;
                    let dominant = 'neutral';
                    let dominantData = null;
                    
                    for (const [category, data] of Object.entries(categoryData)) {
                        const baseScore = data.score || (data.count * (data.weight || 1.0));
                        const intensity = data.intensity || 0;
                        const dominance = data.dominance || 'medium';
                        
                        let adjustedScore = baseScore;
                        
                        if (intensity > 0.7) {
                            adjustedScore *= 1.3;
                        } else if (intensity > 0.5) {
                            adjustedScore *= 1.1;
                        }
                        
                        if (dominance === 'high') {
                            adjustedScore *= 1.2;
                        } else if (dominance === 'medium') {
                            adjustedScore *= 1.0;
                        } else if (dominance === 'low') {
                            adjustedScore *= 0.8;
                        }
                        
                        const positionFactor = this.calculateCategoryPositionFactor(data, categoryData);
                        adjustedScore *= positionFactor;
                        
                        const clusterFactor = this.calculateCategoryClusterFactor(data);
                        adjustedScore *= clusterFactor;
                        
                        if (adjustedScore > maxScore) {
                            maxScore = adjustedScore;
                            dominant = category;
                            dominantData = data;
                        }
                    }
                    
                    if (maxScore === 0) {
                        return 'neutral';
                    }
                    
                    const secondaryCandidates = this.findSecondaryCategories(categoryData, dominant, maxScore);
                    
                    return {
                        primary: dominant,
                        score: maxScore,
                        confidence: this.calculateDominanceConfidence(categoryData, dominant, maxScore),
                        secondary: secondaryCandidates,
                        data: dominantData
                    };
        }
                
        calculateCategoryPositionFactor(categoryData, allCategories) {
                    if (!categoryData.positions || categoryData.positions.length === 0) {
                        return 1.0;
                    }
                    
                    const positions = categoryData.positions.map(p => p.position);
                    const firstPosition = Math.min(...positions);
                    const lastPosition = Math.max(...positions);
                    
                    let positionScore = 1.0;
                    
                    if (firstPosition < 100) {
                        positionScore *= 1.2;
                    }
                    
                    if (lastPosition > 500) {
                        positionScore *= 1.1;
                    }
                    
                    const positionSpan = lastPosition - firstPosition;
                    if (positionSpan > 1000) {
                        positionScore *= 1.15;
                    }
                    
                    return positionScore;
        }
                
        calculateCategoryClusterFactor(categoryData) {
                    if (!categoryData.clusters || categoryData.clusters.length === 0) {
                        return 1.0;
                    }
                    
                    const clusterCount = categoryData.clusters.length;
                    const avgClusterSize = categoryData.clusters.reduce((sum, c) => sum + c.size, 0) / clusterCount;
                    
                    let clusterScore = 1.0;
                    
                    if (clusterCount >= 3) {
                        clusterScore *= 1.3;
                    } else if (clusterCount >= 2) {
                        clusterScore *= 1.15;
                    }
                    
                    if (avgClusterSize > 3) {
                        clusterScore *= 1.2;
                    }
                    
                    return clusterScore;
        }
                
        findSecondaryCategories(categoryData, primaryCategory, primaryScore) {
                    const secondary = [];
                    
                    for (const [category, data] of Object.entries(categoryData)) {
                        if (category === primaryCategory) continue;
                        
                        const score = data.score || (data.count * (data.weight || 1.0));
                        const ratio = score / primaryScore;
                        
                        if (ratio > 0.5) {
                            secondary.push({
                                category: category,
                                score: score,
                                ratio: ratio,
                                intensity: data.intensity || 0
                            });
                        }
                    }
                    
                    secondary.sort((a, b) => b.score - a.score);
                    
                    return secondary.slice(0, 3);
        }
                
        calculateDominanceConfidence(categoryData, dominantCategory, dominantScore) {
                    if (Object.keys(categoryData).length === 1) {
                        return 0.95;
                    }
                    
                    let secondHighestScore = 0;
                    
                    for (const [category, data] of Object.entries(categoryData)) {
                        if (category === dominantCategory) continue;
                        
                        const score = data.score || (data.count * (data.weight || 1.0));
                        if (score > secondHighestScore) {
                            secondHighestScore = score;
                        }
                    }
                    
                    if (dominantScore === 0) {
                        return 0.3;
                    }
                    
                    const ratio = secondHighestScore / dominantScore;
                    const confidence = 0.5 + (0.5 * (1 - ratio));
                    
                    const categoryCount = Object.keys(categoryData).length;
                    const normalizedConfidence = confidence * (1 - (0.2 / categoryCount));
                    
                    return Math.min(0.95, Math.max(0.3, normalizedConfidence));
        }

        calculateProgressionComplexity(progression) {
                    const factors = [];
                    
                    const volatility = progression.metrics.volatility || 0;
                    factors.push(volatility * 0.3);
                    
                    const transitions = progression.transitions.length || 0;
                    const phases = progression.phases.length || 1;
                    const transitionRatio = transitions / phases;
                    factors.push(transitionRatio * 0.3);
                    
                    const phaseCount = progression.phases.length || 0;
                    const normalizedPhases = Math.min(1, phaseCount / 10);
                    factors.push(normalizedPhases * 0.2);
                    
                    const peaks = progression.peaks.length || 0;
                    const valleys = progression.valleys.length || 0;
                    const peakValleyRatio = (peaks + valleys) / Math.max(1, phases);
                    factors.push(peakValleyRatio * 0.2);
                    
                    const validFactors = factors.filter(f => !isNaN(f) && f !== undefined && f !== null);
                    
                    if (validFactors.length === 0) {
                        return 0.3;
                    }
                    
                    const rawComplexity = validFactors.reduce((a, b) => a + b, 0) / validFactors.length;
                    
                    const nonLinearComplexity = Math.pow(rawComplexity, 1.2);
                    
                    const finalComplexity = Math.min(0.99, Math.max(0.05, nonLinearComplexity));
                    
                    return Math.round(finalComplexity * 100) / 100;
        }
        
        getWordContext(text, position, length, contextSize = 30) {
                    const startRaw = Math.max(0, position - contextSize);
                    const endRaw = Math.min(text.length, position + length + contextSize);
                    let start = startRaw;
                    let end = endRaw;
                    const beforeText = text.substring(0, position);
                    const afterText = text.substring(position + length);
                    const beforeWords = beforeText.split(/\s+/);
                    const afterWords = afterText.split(/\s+/);
                    const wordBeforeCount = Math.min(5, beforeWords.length);
                    const wordAfterCount = Math.min(5, afterWords.length);
                    if (wordBeforeCount > 0) {
                        const searchStart = beforeText.lastIndexOf(beforeWords[beforeWords.length - wordBeforeCount]);
                        if (searchStart !== -1) start = searchStart;
                    }
                    if (wordAfterCount > 0 && afterWords.length > 0) {
                        const searchEnd = afterText.indexOf(afterWords[wordAfterCount - 1]);
                        if (searchEnd !== -1) {
                            end = position + length + searchEnd + afterWords[wordAfterCount - 1].length;
                        }
                    }
                    const contextText = text.substring(start, end);
                    const sentenceStart = beforeText.lastIndexOf(/[.!?…]+[\s\n]/);
                    const sentenceEndMatch = afterText.match(/[.!?…]+/);
                    const sentenceEnd = sentenceEndMatch ? position + length + sentenceEndMatch.index + sentenceEndMatch[0].length : -1;
                    const emotionalWords = this.countEmotionalWordsInSentence(contextText);
                    const hasNegation = /(?:не|ни|нет|без|without|not|no|never|none)\s+\S{3,}/i.test(contextText);
                    const hasIntensifier = /(?:очень|крайне|чрезвычайно|невероятно|очень|extremely|incredibly|absolutely|very)\s+\S{3,}/i.test(contextText);
                    const allCapsCount = (contextText.match(/\b[A-ZА-ЯЁ]{3,}\b/g) || []).length;
                    const exclamationCount = (contextText.match(/!/g) || []).length;
                    const questionCount = (contextText.match(/\?/g) || []).length;
                    const isCrossingSentenceBoundary = (sentenceStart !== -1 && sentenceStart > start) || (sentenceEnd !== -1 && sentenceEnd < end);
                    return {
                        text: contextText,
                        position: {
                            start: start,
                            end: end,
                            wordStart: position - start,
                            wordEnd: position + length - start,
                            originalStart: position,
                            originalEnd: position + length
                        },
                        boundaries: {
                            sentenceStart: sentenceStart,
                            sentenceEnd: sentenceEnd,
                            crossesSentence: isCrossingSentenceBoundary,
                            wordBeforeCount: wordBeforeCount,
                            wordAfterCount: wordAfterCount
                        },
                        metrics: {
                            emotionalWords: emotionalWords,
                            hasNegation: hasNegation,
                            hasIntensifier: hasIntensifier,
                            allCapsCount: allCapsCount,
                            exclamationCount: exclamationCount,
                            questionCount: questionCount,
                            length: contextText.length,
                            wordCount: contextText.split(/\s+/).filter(w => w.length > 0).length
                        },
                        modifiers: {
                            negationDetected: hasNegation,
                            intensificationDetected: hasIntensifier,
                            emphasisLevel: Math.min(1, (allCapsCount + exclamationCount * 0.5) / 3)
                        }
                    };
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
              return this.enhancedTokenization(text).length;
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
                    if (!sentence || sentence.length === 0) return 0;
                    const lower = sentence.toLowerCase();
                    const words = sentence.split(/\s+/).filter(w => w.length > 0);
                    const wordCount = words.length;
                    const wordLengths = words.map(w => w.length);
                    const avgWordLength = wordLengths.reduce((a, b) => a + b, 0) / wordCount;
                    const longWords = wordLengths.filter(len => len > 7).length;
                    const clauses = (sentence.match(/,|;|:|—/gu) || []).length;
                    const relativeClauses = (sentence.match(/\b(который|которая|которое|которые|которому|которой|которых|которыми|that|which|who|whom|whose)\b/giu) || []).length;
                    const subordinating = (sentence.match(/\b(потому что|так как|поскольку|если|когда|пока|хотя|несмотря на то что|в то время как|although|though|because|since|if|when|while|where|unless|provided that|whereas|even though)\b/giu) || []).length;
                    const coordinating = (sentence.match(/\b(и|а|но|или|зато|однако|зато|да|либо|либо|то|то|не|только|но и|как|так и|ни|ни|не только|но и|and|but|or|yet|so|for|nor|either|or|neither|nor|not only|but also)\b/giu) || []).length;
                    const participialPhrases = (sentence.match(/\b([а-яё]+(ший|шая|шее|шие|вший|вшая|вшее|вши|вши|вшим|вшими|вшего|вшую|вшее|вше|вшем|вшему|вшими|вшими|ем|ом|ым|им|ая|яя|ое|ее|ый|ий|ой|ему|ем|ом|ом|ым|им|ую|юю|ого|его|ому|ему|ыми|ими|ем|ем|ом|ом))\b/giu) || []).length;
                    const gerundialPhrases = (sentence.match(/\b([а-яё]+(а|я|в|вши|ши))[,.\s]/giu) || []).length;
                    const passiveVoice = (sentence.match(/\b(был|была|было|были|является|являются|считается|считаются|называется|называются|являлся|являлась|являлось|являлись|is|are|was|were|has been|have been|had been|being|been)\b/giu) || []).length;
                    const inversion = (sentence.match(/^(ни|не|только|лишь|едва|едва ли|вот|вот и|здесь|там|тут|тогда|тогда-то|тогда как|тогда когда|тогда если|тогда хотя|тогда потому что|тогда так как|тогда поскольку|тогда если|тогда когда|тогда пока|тогда хотя|тогда несмотря на то что|тогда в то время как)\b/giu) || []).length;
                    const complexPrepositions = (sentence.match(/\b(вместо|вследствие|ввиду|вопреки|наперекор|насчет|относительно|согласно|в течение|в продолжение|в заключение|в отличие от|в связи с|в сравнении с|в дополнение к|в противоположность|взамен|вместо того чтобы|вместо того чтоб|вместо того чтоб|вместо того чтоб|вместо того чтоб|in addition to|according to|because of|due to|instead of|in spite of|in case of|in front of|in back of|in the middle of|in the center of|in the beginning of|in the end of|in the course of|in the process of|in the event of|in the absence of|in the presence of)\b/giu) || []).length;
                    const nestedClauses = Math.max(0, (sentence.match(/\(/gu) || []).length + (sentence.match(/\)/gu) || []).length - 1);
                    const wordComplexityScore = Math.min(1, (longWords / wordCount) * 0.7 + (avgWordLength / 10) * 0.3);
                    const structureScore = (clauses * 0.15 + relativeClauses * 0.25 + subordinating * 0.20 + coordinating * 0.10 + participialPhrases * 0.15 + gerundialPhrases * 0.10 + passiveVoice * 0.08 + inversion * 0.07 + complexPrepositions * 0.05 + nestedClauses * 0.10);
                    const baseComplexity = wordComplexityScore * 0.4 + structureScore * 0.6;
                    const lengthFactor = Math.min(1, wordCount / 25);
                    const finalComplexity = baseComplexity * (0.7 + lengthFactor * 0.3);
                    return Math.min(1, Math.max(0, finalComplexity));
        }
        
        calculatePunctuationEmotionalWeight(punctuation) {
                    if (!punctuation || Object.keys(punctuation).length === 0) return 0;
                    const weights = this.metricsConfig.punctuationWeight || {};
                    let totalWeight = 0;
                    let totalCount = 0;
                    let clusterBonus = 0;
                    let comboBonus = 0;
                    for (const [mark, count] of Object.entries(punctuation)) {
                        const baseWeight = weights[mark] || 1.0;
                        let markWeight = baseWeight * count;
                        if (mark === '!' && count >= 3) {
                            clusterBonus += (count - 2) * 0.3;
                        }
                        if (mark === '?' && count >= 3) {
                            clusterBonus += (count - 2) * 0.2;
                        }
                        if ((mark === '!' || mark === '?') && count >= 2) {
                            markWeight *= 1.2;
                        }
                        totalWeight += markWeight;
                        totalCount += count;
                    }
                    const exclamationCount = punctuation['!'] || 0;
                    const questionCount = punctuation['?'] || 0;
                    const periodCount = punctuation['.'] || 0;
                    if (exclamationCount > 0 && questionCount > 0) {
                        comboBonus = Math.min(exclamationCount, questionCount) * 0.4;
                    }
                    if (exclamationCount > questionCount * 2) {
                        comboBonus += 0.3;
                    }
                    if (questionCount > exclamationCount * 2) {
                        comboBonus += 0.2;
                    }
                    if (totalCount > 10 && periodCount === 0) {
                        clusterBonus += 0.5;
                    }
                    const baseAverage = totalWeight / totalCount;
                    const intensityFactor = 1 + (clusterBonus + comboBonus) / Math.max(1, totalCount);
                    const finalWeight = baseAverage * intensityFactor;
                    return Math.min(1.0, Math.max(0, finalWeight));
        }
        
        calculatePunctuationDensity(text) {
                    if (!text || text.length === 0) return 0;
                    const emotionalPunctuation = (text.match(/[!?…‼⁇⁈⁉]+/gu) || []);
                    const neutralPunctuation = (text.match(/[.,:;—\-]+/gu) || []);
                    let emotionalCount = 0;
                    let neutralCount = 0;
                    emotionalPunctuation.forEach(match => {
                        const len = match.length;
                        emotionalCount += len;
                        if (len >= 3) emotionalCount += (len - 2) * 0.5;
                        if (match.includes('!') && match.includes('?')) emotionalCount += len * 0.3;
                    });
                    neutralPunctuation.forEach(match => {
                        neutralCount += match.length;
                    });
                    const wordCount = text.split(/\s+/).filter(w => w.length > 0).length;
                    if (wordCount === 0) return 0;
                    const emotionalDensity = emotionalCount / wordCount;
                    const neutralDensity = neutralCount / wordCount;
                    const weightedDensity = emotionalDensity * 0.7 + neutralDensity * 0.3;
                    const intensityBonus = Math.min(0.3, emotionalDensity * 0.5);
                    const finalDensity = weightedDensity * (1 + intensityBonus);
                    return Math.min(1.0, finalDensity);
        }
        
        detectPunctuationPatterns(sentences) {
                    const patterns = {
                        repetitiveExclamation: 0,
                        questionExclamation: 0,
                        ellipsisClusters: 0,
                        mixedPunctuation: 0,
                        trailingEllipsis: 0,
                        excessiveDashes: 0
                    };
                    
                    sentences.forEach(s => {
                        const text = typeof s === 'object' ? s.text : s;
                        const lower = text.toLowerCase();
                        
                        const exclMatches = lower.match(/!+/gu) || [];
                        exclMatches.forEach(match => {
                            if (match.length >= 2) {
                                patterns.repetitiveExclamation += 1 + (match.length - 2) * 0.3;
                            }
                        });
                        
                        const qeMatches = lower.match(/\?+!+|!+\?+/gu) || [];
                        qeMatches.forEach(match => {
                            patterns.questionExclamation += 1 + (match.length - 2) * 0.2;
                        });
                        
                        const ellipsisMatches = lower.match(/\.{3,}|…/gu) || [];
                        ellipsisMatches.forEach(match => {
                            patterns.ellipsisClusters += 1;
                            if (match.endsWith('…') || match.endsWith('...') || match.endsWith('....')) {
                                patterns.trailingEllipsis += 0.8;
                            }
                        });
                        
                        const mixedMatches = lower.match(/[!?…]{3,}/gu) || [];
                        mixedMatches.forEach(match => {
                            if (!qeMatches.some(qe => match.includes(qe))) {
                                patterns.mixedPunctuation += 1 + (match.length - 3) * 0.25;
                            }
                        });
                        
                        const dashMatches = lower.match(/—{2,}|-{3,}/gu) || [];
                        dashMatches.forEach(match => {
                            patterns.excessiveDashes += 1 + (match.length - 2) * 0.2;
                        });
                    });
                    
                    return patterns;
        }
        
        enhancedRhythmAnalysis(sentences) {
                    if (sentences.length < 3) {
                        return { regularity: 1, pattern: 'undefined', variability: 0, flow: 'smooth' };
                    }
                    
                    const lengths = sentences.map(s => {
                        const text = typeof s === 'object' ? s.text : s;
                        return text.split(/\s+/).filter(w => w.length > 0).length;
                    });
                    
                    const avgLength = lengths.reduce((a, b) => a + b, 0) / lengths.length;
                    const stdDev = Math.sqrt(lengths.reduce((sum, len) => sum + Math.pow(len - avgLength, 2), 0) / lengths.length);
                    const coefficientOfVariation = avgLength > 0 ? stdDev / avgLength : 0;
                    
                    const differences = [];
                    for (let i = 0; i < lengths.length - 1; i++) {
                        differences.push(Math.abs(lengths[i] - lengths[i + 1]));
                    }
                    
                    const avgDifference = differences.reduce((a, b) => a + b, 0) / differences.length;
                    const maxLength = Math.max(...lengths);
                    const minLength = Math.min(...lengths);
                    const range = maxLength - minLength;
                    
                    const pattern = this.detectEnhancedRhythmPattern(lengths);
                    
                    const variability = coefficientOfVariation;
                    const flow = variability < 0.3 ? 'smooth' : 
                                variability < 0.6 ? 'moderate' : 'choppy';
                    
                    return {
                        regularity: 1 - variability,
                        pattern,
                        variability,
                        flow,
                        range,
                        avgLength: avgLength,
                        lengthDistribution: this.calculateLengthDistribution(lengths)
                    };
        }
        
        detectEnhancedRhythmPattern(lengths) {
                    if (lengths.length < 4) return 'undefined';
                    
                    const tolerance = 0.1;
                    let isAscending = true;
                    for (let i = 1; i < lengths.length; i++) {
                        if (lengths[i] < lengths[i - 1] * (1 - tolerance)) {
                            isAscending = false;
                            break;
                        }
                    }
                    
                    let isDescending = true;
                    for (let i = 1; i < lengths.length; i++) {
                        if (lengths[i] > lengths[i - 1] * (1 + tolerance)) {
                            isDescending = false;
                            break;
                        }
                    }
                    
                    const waveScore = this.calculateWavePatternScore(lengths);
                    const isWavy = waveScore > 0.5;
                    
                    const symmetricScore = this.calculateSymmetryScore(lengths);
                    const isSymmetric = symmetricScore > 0.65;
                    
                    if (isAscending) return 'ascending';
                    if (isDescending) return 'descending';
                    if (isSymmetric) return 'symmetric';
                    if (isWavy) return 'wavy';
                    
                    if (this.isCrescendoPattern(lengths)) return 'crescendo';
                    
                    if (this.isDecrescendoPattern(lengths)) return 'decrescendo';
                    
                    return 'irregular';
        }
        
        calculateWavePatternScore(lengths) {
                    if (lengths.length < 4) return 0;
                    let directionChanges = 0;
                    let significantChanges = 0;
                    
                    for (let i = 1; i < lengths.length - 1; i++) {
                        const prevDiff = lengths[i] - lengths[i - 1];
                        const nextDiff = lengths[i + 1] - lengths[i];
                        
                        if (prevDiff * nextDiff < 0) {
                            directionChanges++;
                            const avgLength = (lengths[i - 1] + lengths[i] + lengths[i + 1]) / 3;
                            const minAmplitude = avgLength * 0.15;
                            if (Math.abs(prevDiff) > minAmplitude && Math.abs(nextDiff) > minAmplitude) {
                                significantChanges++;
                            }
                        }
                    }
                    
                    if (directionChanges === 0) return 0;
                    return significantChanges / directionChanges;
        }
        
        calculateSymmetryScore(lengths) {
                    if (lengths.length < 4) return 0;
                    const start = lengths.length % 2 === 0 ? 0 : 1;
                    const mid = Math.floor(lengths.length / 2);
                    let symmetry = 0;
                    let pairs = 0;
                    
                    for (let i = 0; i < mid; i++) {
                        const left = lengths[i + start];
                        const right = lengths[lengths.length - 1 - i];
                        const diff = Math.abs(left - right);
                        const maxLength = Math.max(left, right);
                        if (maxLength > 0) {
                            symmetry += 1 - (diff / maxLength);
                            pairs++;
                        }
                    }
                    
                    return pairs > 0 ? symmetry / pairs : 0;
        }
        
        isCrescendoPattern(lengths) {
                    if (lengths.length < 5) return false;
                    
                    const firstHalf = lengths.slice(0, Math.floor(lengths.length / 2));
                    const secondHalf = lengths.slice(Math.floor(lengths.length / 2));
                    
                    let increasing = true;
                    for (let i = 1; i < firstHalf.length; i++) {
                        if (firstHalf[i] < firstHalf[i - 1] * 0.9) {
                            increasing = false;
                            break;
                        }
                    }
                    
                    if (!increasing) return false;
                    
                    const maxFirstHalf = Math.max(...firstHalf);
                    const minSecondHalf = Math.min(...secondHalf);
                    const avgSecondHalf = secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length;
                    
                    const significantDrop = avgSecondHalf < maxFirstHalf * 0.65;
                    
                    return significantDrop;
        }
        
        isDecrescendoPattern(lengths) {
                    if (lengths.length < 5) return false;
                    
                    const firstHalf = lengths.slice(0, Math.floor(lengths.length / 2));
                    const secondHalf = lengths.slice(Math.floor(lengths.length / 2));
                    
                    let decreasing = true;
                    for (let i = 1; i < firstHalf.length; i++) {
                        if (firstHalf[i] > firstHalf[i - 1] * 1.1) {
                            decreasing = false;
                            break;
                        }
                    }
                    
                    if (!decreasing) return false;
                    
                    const minFirstHalf = Math.min(...firstHalf);
                    const maxSecondHalf = Math.max(...secondHalf);
                    const avgSecondHalf = secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length;
                    
                    const significantRise = avgSecondHalf > minFirstHalf * 1.4;
                    
                    return significantRise;
        }
        
        calculateLengthDistribution(lengths) {
            const distribution = {
                short: 0,      
                medium: 0,     
                long: 0,       
                veryLong: 0    
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
                    const commas = (sentence.match(/,/gu) || []).length;
                    const semicolons = (sentence.match(/;/gu) || []).length;
                    const dashes = (sentence.match(/—|–/gu) || []).length;
                    const question = sentence.includes('?') ? 1 : 0;
                    const exclamation = sentence.includes('!') ? 1 : 0;
                    const ellipsis = /…|\.{3,}/.test(sentence) ? 1 : 0;
                    
                    const enConjunctions = (sentence.match(/\b(and|but|or|because|although|while|since|if|when|where|that|which|who|as|until|unless|yet|so|for|nor|either|neither)\b/giu) || []).length;
                    const ruConjunctions = (sentence.match(/\b(и|а|но|или|зато|однако|да|либо|то|не|только|но и|как|так и|ни|если|когда|пока|хотя|несмотря на то что|потому что|так как|поскольку|чтобы|дабы|едва|лишь|в то время как)\b/giu) || []).length;
                    const conjunctions = enConjunctions + ruConjunctions;
                    
                    const hasIntroductory = /\b(однако|тем не менее|впрочем|итак|следовательно|например|в самом деле|конечно|безусловно|по-видимому|вероятно|кажется|похоже|к счастью|к сожалению|к удивлению)\b/i.test(sentence) ? 1 : 0;
                    
                    return `${words}_${commas}_${semicolons}_${dashes}_${question}${exclamation}${ellipsis}_${conjunctions}_${hasIntroductory}`;
        }
        
        calculateReadabilityMetrics(data) {
                    const text = data.cleaned;
                    const words = data.words.length;
                    const sentences = data.sentences.length;
                    
                    if (words === 0 || sentences === 0) {
                        return { fleschReadingEase: 0, fleschKincaidGrade: 0, gunningFog: 0, readingLevel: this.language === 'ru' ? 'очень легко' : 'very easy' };
                    }
                    
                    let syllables = 0;
                    data.words.forEach(word => {
                        syllables += this.countSyllables(word);
                    });
                    
                    const avgWordsPerSentence = words / sentences;
                    const avgSyllablesPerWord = syllables / words;
                    
                    let fleschReadingEase;
                    let fleschKincaidGrade;
                    let gunningFog;
                    
                    if (this.language === 'ru') {
                        fleschReadingEase = 206.835 - (1.3 * avgWordsPerSentence) - (60.1 * avgSyllablesPerWord);
                        fleschKincaidGrade = 0.5 * avgWordsPerSentence + 8.4 * avgSyllablesPerWord - 15.59;
                    } else {
                        fleschReadingEase = 206.835 - (1.015 * avgWordsPerSentence) - (84.6 * avgSyllablesPerWord);
                        fleschKincaidGrade = 0.39 * avgWordsPerSentence + 11.8 * avgSyllablesPerWord - 15.59;
                    }
                    
                    const complexWords = data.words.filter(word => {
                        const syllableCount = this.countSyllables(word);
                        return syllableCount >= 3;
                    }).length;
                    const percentComplexWords = (complexWords / words) * 100;
                    gunningFog = 0.4 * (avgWordsPerSentence + percentComplexWords);
                    
                    return {
                        fleschReadingEase: Math.max(0, Math.min(100, fleschReadingEase)),
                        fleschKincaidGrade: Math.max(0, fleschKincaidGrade),
                        gunningFog: Math.max(0, gunningFog),
                        readingLevel: this.determineReadingLevel(fleschReadingEase)
                    };
        }
        
        countSyllables(word) {
                    if (!word || word.length === 0) return 1;
                    const lower = word.toLowerCase();
                    
                    if (this.language === 'ru') {
                        const vowels = 'аеёиоуыэюя';
                        let count = 0;
                        let prevWasVowel = false;
                        
                        for (let i = 0; i < lower.length; i++) {
                            const isVowel = vowels.includes(lower[i]);
                            if (isVowel && !prevWasVowel) {
                                count++;
                            }
                            prevWasVowel = isVowel;
                        }
                        
                        if (count === 0) return 1;
                        if (lower.endsWith('ь') || lower.endsWith('ъ')) {
                            count = Math.max(1, count - 1);
                        }
                        if (lower.endsWith('ия') || lower.endsWith('ие') || lower.endsWith('ий') || lower.endsWith('ие')) {
                            count = Math.max(1, count - 1);
                        }
                        
                        return count;
                    } else {
                        if (lower.length <= 3) return 1;
                        
                        let clean = lower.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
                        clean = clean.replace(/^y/, '');
                        
                        const syllables = clean.match(/[aeiouy]{1,2}/g);
                        return syllables ? syllables.length : 1;
                    }
        }
        
        determineReadingLevel(fleschScore) {
                    if (this.language === 'ru') {
                        if (fleschScore >= 85) return 'очень легко';
                        if (fleschScore >= 75) return 'легко';
                        if (fleschScore >= 65) return 'довольно легко';
                        if (fleschScore >= 55) return 'стандартно';
                        if (fleschScore >= 45) return 'довольно сложно';
                        if (fleschScore >= 30) return 'сложно';
                        return 'очень сложно';
                    } else {
                        if (fleschScore >= 90) return 'very easy';
                        if (fleschScore >= 80) return 'easy';
                        if (fleschScore >= 70) return 'fairly easy';
                        if (fleschScore >= 60) return 'standard';
                        if (fleschScore >= 50) return 'fairly difficult';
                        if (fleschScore >= 30) return 'difficult';
                        return 'very difficult';
                    }
        }
        
        calculateTextCoherence(sentences) {
                    if (sentences.length < 2) return 1;
                    
                    const allWords = [];
                    const sentenceWords = [];
                    
                    sentences.forEach(s => {
                        const text = typeof s === 'object' ? s.text : s;
                        const words = this.enhancedTokenization(text);
                        if (this.language === 'ru') {
                            words.filter(w => w.length > 0);
                        } else {
                            words.filter(w => w.length > 3);
                        }
                        allWords.push(...words);
                        sentenceWords.push(new Set(words));
                    });
                    
                    let totalOverlap = 0;
                    let pairsCount = 0;
                    
                    for (let i = 0; i < sentenceWords.length - 1; i++) {
                        const current = sentenceWords[i];
                        const next = sentenceWords[i + 1];
                        
                        let overlap = 0;
                        current.forEach(word => {
                            if (next.has(word)) overlap++;
                        });
                        
                        const avgSize = (current.size + next.size) / 2;
                        const overlapRatio = avgSize > 0 ? overlap / avgSize : 0;
                        
                        totalOverlap += overlapRatio;
                        pairsCount++;
                        
                        if (i + 2 < sentenceWords.length) {
                            const nextNext = sentenceWords[i + 2];
                            let overlap2 = 0;
                            current.forEach(word => {
                                if (nextNext.has(word)) overlap2++;
                            });
                            const avgSize2 = (current.size + nextNext.size) / 2;
                            const overlapRatio2 = avgSize2 > 0 ? overlap2 / avgSize2 : 0;
                            totalOverlap += overlapRatio2 * 0.5;
                            pairsCount += 0.5;
                        }
                    }
                    
                    return pairsCount > 0 ? totalOverlap / pairsCount : 0;
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
                        const lowerNeg = negation.toLowerCase();
                        const regex = new RegExp(`${this.escapeRegExp(lowerNeg)}`, 'gi');
                        const matches = text.match(regex);
                        if (matches) {
                            analysis.indicators.negations += matches.length;
                            const weight = lowerNeg.includes('отнюдь') || lowerNeg.includes('вовсе') || lowerNeg.includes('ни') ? 1.5 : 1.0;
                            analysis.scores.negationImpact -= matches.length * 0.3 * weight;
                        }
                    });
                    
                    rules.intensifiers.forEach(intensifier => {
                        const lowerInt = intensifier.toLowerCase();
                        const regex = new RegExp(`${this.escapeRegExp(lowerInt)}`, 'gi');
                        const matches = text.match(regex);
                        if (matches) {
                            analysis.indicators.intensifiers += matches.length;
                            const weight = lowerInt.includes('чрезвычайно') || lowerInt.includes('невероятно') || lowerInt.includes('абсолютно') ? 1.5 : 
                                          lowerInt.includes('очень') || lowerInt.includes('сильно') || lowerInt.includes('крайне') ? 1.0 : 1.2;
                            analysis.scores.intensification += matches.length * 0.2 * weight;
                        }
                    });
                    
                    if (this.language === 'ru') {
                        rules.diminutives.forEach(suffix => {
                            const cleanSuffix = suffix.replace(/^-+|-+$/g, '');
                            if (!cleanSuffix) return;
                            const regex = new RegExp(`[а-яё]+${this.escapeRegExp(cleanSuffix)}[а-яё]*`, 'gi');
                            const matches = text.match(regex);
                            if (matches) {
                                analysis.indicators.diminutives += matches.length;
                                analysis.scores.emotionalModulation += matches.length * 0.1;
                            }
                        });
                        
                        rules.augmentatives.forEach(suffix => {
                            const cleanSuffix = suffix.replace(/^-+|-+$/g, '');
                            if (!cleanSuffix) return;
                            const regex = new RegExp(`[а-яё]+${this.escapeRegExp(cleanSuffix)}[а-яё]*`, 'gi');
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
                            const lowerIndicator = indicator.toLowerCase();
                            if (lowerSentence.includes(lowerIndicator)) {
                                const isIrony = this.checkIronyPattern(sentence);
                                if (isIrony) {
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
                        });
                        
                        rules.rhetoricalQuestions.forEach(marker => {
                            const lowerMarker = marker.toLowerCase();
                            if (lowerSentence.includes(lowerMarker) && sentence.includes('?')) {
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
                            const lowerMarker = marker.toLowerCase();
                            if (lowerSentence.includes(lowerMarker)) {
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
                            const lowerMarker = marker.toLowerCase();
                            if (lowerSentence.includes(lowerMarker)) {
                                analysis.indicators.hyperbole++;
                                analysis.scores.intensification += 0.3;
                            }
                        });
                        
                        rules.understatement.forEach(marker => {
                            const lowerMarker = marker.toLowerCase();
                            if (lowerSentence.includes(lowerMarker)) {
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
                    
                    analysis.coherence = this.calculateAdvancedCoherence ? this.calculateAdvancedCoherence(sentences) : 1;
                    
                    analysis.consistency = this.analyzeEmotionalConsistency ? this.analyzeEmotionalConsistency(data) : 1;
                    
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
                        'to put it simply', 'to put it mildly', 'to say the least'
                    ];
                    
                    const positiveWords = this.language === 'ru' ? [
                        'отлично', 'прекрасно', 'замечательно', 'восхитительно', 'идеально', 
                        'потрясающе', 'замечательный', 'прекрасный', 'отличный', 'великолепно', 
                        'чудесно', 'фантастично', 'супер', 'лучший', 'хорошо', 'лучше', 'лучшее'
                    ] : [
                        'perfect', 'great', 'wonderful', 'amazing', 'fantastic', 'awesome', 
                        'excellent', 'good', 'better', 'best', 'superb', 'splendid', 'marvelous'
                    ];
                    
                    const negativeWords = this.language === 'ru' ? [
                        'ужасно', 'кошмарно', 'отвратительно', 'плохо', 'скверно', 'мерзко', 
                        'глупо', 'идиотски', 'дурацки', 'тупо', 'плохой', 'ужасный', 
                        'отвратительный', 'кошмарный', 'хуже', 'худший'
                    ] : [
                        'terrible', 'horrible', 'awful', 'bad', 'worse', 'worst', 
                        'stupid', 'idiotic', 'ridiculous', 'dumb', 'awful'
                    ];
                    
                    let ironyScore = 0;
                    let pattern = '';
                    
                    ironyIndicators.forEach(indicator => {
                        const regex = new RegExp(`\\b${this.escapeRegExp(indicator)}\\b`, this.language === 'ru' ? 'iu' : 'i');
                        if (regex.test(lowerSentence)) {
                            ironyScore += 0.5;
                            if (!pattern) pattern = 'irony indicator';
                        }
                    });
                    
                    const hasPositive = positiveWords.some(word => new RegExp(`\\b${this.escapeRegExp(word)}\\b`, this.language === 'ru' ? 'iu' : 'i').test(lowerSentence));
                    const hasNegative = negativeWords.some(word => new RegExp(`\\b${this.escapeRegExp(word)}\\b`, this.language === 'ru' ? 'iu' : 'i').test(lowerSentence));
                    
                    if (hasPositive && hasNegative) {
                        ironyScore += 1.5;
                        pattern = 'positive + negative contrast';
                    }
                    
                    const hasQuestion = sentence.includes('?');
                    const hasExclamation = sentence.includes('!');
                    const hasEllipsis = sentence.includes('…') || sentence.includes('...');
                    
                    if (hasQuestion && hasExclamation) {
                        ironyScore += 1.0;
                        if (!pattern) pattern = 'question + exclamation';
                    }
                    
                    if (hasEllipsis && (hasPositive || hasNegative || ironyScore > 0)) {
                        ironyScore += 0.5;
                        if (!pattern) pattern = 'ellipsis + emotional word';
                    }
                    
                    const contradictionPatterns = this.language === 'ru' ? [
                        /но\s+[а-яё]+\s+(хорош|прекрасн|замечательн|отличн)/iu,
                        /хотя\s+[а-яё]+\s+(плох|ужасн|отвратительн|скучн)/iu,
                        /конечно.*\?/iu,
                        /разумеется.*!/iu,
                        /^[а-яё]+,\s+[а-яё]+.*!/iu,
                        /[а-яё]+!\s+[а-яё]+.*\?/iu,
                        /[а-яё]+\?+\s+[а-яё]+.*!/iu,
                        /[а-яё]+!+\s+[а-яё]+.*\?/iu,
                        /не то чтобы/iu,
                        /не сказать чтобы/iu,
                        /вот тебе и.*радость|счастье|удача|победа/iu
                    ] : [
                        /but\s+[a-z]+\s+(good|great|excellent|wonderful)/iu,
                        /although\s+[a-z]+\s+(bad|terrible|awful|boring)/iu,
                        /of course.*\?/iu,
                        /certainly.*!/iu,
                        /^[a-z]+,\s+[a-z]+.*!/iu,
                        /[a-z]+!\s+[a-z]+.*\?/iu,
                        /[a-z]+\?+\s+[a-z]+.*!/iu,
                        /not exactly/iu,
                        /not really/iu
                    ];
                    
                    contradictionPatterns.forEach(patternRegex => {
                        if (patternRegex.test(sentence)) {
                            ironyScore += 1.0;
                            if (!pattern) pattern = 'contradiction pattern';
                        }
                    });
                    
                    const isIrony = ironyScore > 0.7;
                    return isIrony;
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
                    new RegExp(`\\b${pronoun}\\b`, this.language === 'ru' ? 'iu' : 'i').test(curr)
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
                    
                    const countMarkers = (markers) => {
                        return markers.filter(m => {
                            const regex = new RegExp(`\\b${this.escapeRegExp(m)}\\b`, this.language === 'ru' ? 'iu' : 'i');
                            return regex.test(lower);
                        }).length;
                    };
                    
                    const pastCount = countMarkers(pastMarkers);
                    const futureCount = countMarkers(futureMarkers);
                    const presentCount = countMarkers(presentMarkers);
                    
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
                            const hasWord = words.some(w => w.toLowerCase() === word.toLowerCase());
                            if (hasWord) {
                                const isPositive = ['ecstasy', 'joy', 'love', 'peace', 'hope', 
                                                  'gratitude', 'inspiration', 'pride'].includes(category);
                                const isNegative = ['sadness', 'grief', 'anger', 'fear', 'disgust', 
                                                  'shame', 'guilt', 'loneliness', 'envy', 'despair'].includes(category);
                                
                                if (isPositive) score += weight;
                                if (isNegative) score -= weight;
                                count++;
                                break;
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
                              const text = data.cleaned.toLowerCase();
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
                                        const lowerRef = ref.toLowerCase();
                                        const escaped = this.escapeRegExp(lowerRef);
                                        const regex = new RegExp(`\\b${escaped}\\b`, 'gi');
                                        const matches = text.match(regex);
                                        if (matches) {
                                                  analysis.references.literary.count += matches.length;
                                                  analysis.references.literary.items.push({
                                                            reference: ref,
                                                            count: matches.length,
                                                            contexts: this.findReferenceContexts ? this.findReferenceContexts(text, lowerRef) : []
                                                  });
                                                  analysis.scores.culturalDepth += matches.length * 0.5;

                                                  if (this.isIntertextualReference && this.isIntertextualReference(lowerRef, text)) {
                                                            analysis.scores.intertextuality += 0.3;
                                                            analysis.patterns.intertextualReferences.push(ref);
                                                  }
                                        }
                              });

                              cultural.historicalReferences.forEach(ref => {
                                        const lowerRef = ref.toLowerCase();
                                        const escaped = this.escapeRegExp(lowerRef);
                                        const regex = new RegExp(`\\b${escaped}\\b`, 'gi');
                                        const matches = text.match(regex);
                                        if (matches) {
                                                  analysis.references.historical.count += matches.length;
                                                  analysis.references.historical.items.push({
                                                            reference: ref,
                                                            count: matches.length,
                                                            period: this.determineHistoricalPeriod ? this.determineHistoricalPeriod(ref) : 'unknown'
                                                  });
                                                  analysis.scores.culturalDepth += matches.length * 0.4;
                                        }
                              });

                              cultural.mythologicalReferences.forEach(ref => {
                                        const lowerRef = ref.toLowerCase();
                                        const escaped = this.escapeRegExp(lowerRef);
                                        const regex = new RegExp(`\\b${escaped}\\b`, 'gi');
                                        const matches = text.match(regex);
                                        if (matches) {
                                                  analysis.references.mythological.count += matches.length;
                                                  analysis.references.mythological.items.push({
                                                            reference: ref,
                                                            count: matches.length,
                                                            archetype: this.determineMythologicalArchetype ? this.determineMythologicalArchetype(ref) : 'unknown'
                                                  });
                                                  analysis.scores.culturalDepth += matches.length * 0.3;

                                                  if (this.isMythologicalPattern && this.isMythologicalPattern(lowerRef, text)) {
                                                            analysis.patterns.culturalThemes.push(`mythological: ${ref}`);
                                                  }
                                        }
                              });

                              cultural.idioms.forEach(idiom => {
                                        const lowerIdiom = idiom.toLowerCase();
                                        const escaped = this.escapeRegExp(lowerIdiom);
                                        const regex = new RegExp(`\\b${escaped}\\b`, 'gi');
                                        const matches = text.match(regex);
                                        if (matches) {
                                                  analysis.references.idioms.count += matches.length;
                                                  analysis.references.idioms.items.push({
                                                            idiom: idiom,
                                                            count: matches.length,
                                                            literalMeaning: this.getLiteralMeaning ? this.getLiteralMeaning(idiom, language) : ''
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
                                                            type: this.classifyPoeticPattern ? this.classifyPoeticPattern(pattern) : 'unknown'
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

                              analysis.scores.culturalDepth = totalReferences > 0 ? analysis.scores.culturalDepth / totalReferences : 0;
                              analysis.scores.culturalRichness = totalReferences > 0 ? analysis.scores.culturalRichness / totalReferences : 0;
                              analysis.scores.overall = (analysis.scores.culturalDepth + 
                                                          analysis.scores.culturalRichness + 
                                                          analysis.scores.intertextuality) / 3;

                              analysis.culturalDensity = totalReferences / (data.words.length || 1);

                              analysis.culturalCoherence = this.calculateCulturalCoherence ? this.calculateCulturalCoherence(analysis.references) : 1;

                              analysis.dominantCulturalTheme = this.detectDominantCulturalTheme ? this.detectDominantCulturalTheme(analysis.references) : 'none';

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

                              const baseStopWords = this.language === 'ru' ? 
                                        ['и', 'в', 'на', 'с', 'к', 'а', 'у', 'ли', 'но', 'или', 'я', 'ты', 'не', 'то', 'он', 'она', 'оно', 'они', 'это', 'всё', 'тот', 'такой', 'какой', 'свой', 'свою', 'свои', 'себе', 'мой', 'твой', 'его', 'её', 'их', 'мы', 'наш', 'ваш'] :
                                        ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'this', 'that', 'these', 'those', 'it', 'its', 'he', 'she', 'they', 'we', 'you', 'i', 'my', 'your', 'his', 'her', 'our', 'their'];

                              const punctuationSymbols = [':', '-', ')', '(', '[', ']', '{', '}', '<', '>', '/', '\\', '|', '*', '+', '=', '~', '`', '@', '#', '$', '%', '^', '&', '_', '!', '?', '.', ',', ';', '\'', '"', '»', '«', '—', '…'];

                              const stopWords = baseStopWords.concat(punctuationSymbols);

                              const wordFrequency = {};
                              words.forEach(word => {
                                        if (!stopWords.includes(word)) {
                                                  wordFrequency[word] = (wordFrequency[word] || 0) + 1;
                                        }
                              });

                              const repetitions = [];

                              for (const [word, count] of Object.entries(wordFrequency)) {
                                        if (count >= 2) {
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
                    const regex = new RegExp(`\\b${this.escapeRegExp(reference)}\\b`, this.language === 'ru' ? 'gui' : 'gi');
                    let match;
                    
                    while ((match = regex.exec(text)) !== null) {
                        let start = Math.max(0, match.index - contextSize);
                        let end = Math.min(text.length, match.index + reference.length + contextSize);
                        
                        const beforeText = text.substring(0, start);
                        const afterText = text.substring(end);
                        
                        const lastSentenceEnd = beforeText.search(/[.!?…]+[\s]/);
                        if (lastSentenceEnd !== -1 && lastSentenceEnd > match.index - 200) {
                            start = lastSentenceEnd + 1;
                        }
                        
                        const nextSentenceEnd = afterText.search(/[.!?…]+[\s]/);
                        if (nextSentenceEnd !== -1 && nextSentenceEnd < 200) {
                            end += nextSentenceEnd + 1;
                        }
                        
                        const context = text.substring(start, end).trim();
                        if (context.length > 0) {
                            contexts.push(context);
                        }
                    }
                    
                    return contexts;
        }
        
        isIntertextualReference(reference, text) {
                    const literaryContexts = this.language === 'ru' ? [
                        'как говорил', 'как писал', 'в духе', 'напоминает', 'по словам', 
                        'цитируя', 'в стиле', 'в манере', 'напоминающий', 'отсылая к',
                        'отсылка к', 'аллюзия на', 'пародируя', 'имитируя', 'в подражание'
                    ] : [
                        'as said by', 'as written by', 'in the spirit of', 'reminiscent of',
                        'according to', 'quoting', 'in the style of', 'in the manner of',
                        'alluding to', 'parodying', 'imitating', 'in homage to'
                    ];
                    
                    const lowerText = text.toLowerCase();
                    const lowerRef = reference.toLowerCase();
                    
                    if (!lowerText.includes(lowerRef)) return false;
                    
                    return literaryContexts.some(phrase => {
                        const regex = new RegExp(`\\b${this.escapeRegExp(phrase)}\\b`, this.language === 'ru' ? 'iu' : 'i');
                        return regex.test(lowerText);
                    });
        }
        
        determineHistoricalPeriod(reference) {
                    const lowerRef = reference.toLowerCase();
                    
                    const periods = {
                        ru: {
                            древнерусский: ['варяг', 'древняя русь', 'киевская русь', 'новгород', 'владимир', 'ольга', 'святослав', 'владимир мономах', 'летопись', 'былина', 'князь', 'княгиня', 'дружина', 'воевода', 'боярин', 'смерд', 'холоп', 'митрополит', 'епископ', 'патриарх', 'перун', 'язычество', 'славяне'],
                            средневековый: ['орда', 'татаро-монгол', 'золотая орда', 'хан', 'батый', 'монгол', 'татарин', 'казань', 'астрахань', 'крым', 'казак', 'атаман', 'гетман', 'удельный князь', 'московское княжество', 'великое княжество', 'царь', 'царица', 'царевич', 'царевна', 'боярин', 'боярыня', 'дворянин', 'крепостной', 'поместье', 'вотчина'],
                            имперский: ['петр', 'екатерина', 'александр', 'николай', 'романов', 'империя', 'император', 'императрица', 'пушкин', 'лермонтов', 'гоголь', 'достоевский', 'толстой', 'чехов', 'тургенев', 'дворянство', 'аристократия', 'чиновник', 'табель о рангах', 'крепостное право', 'отмена крепостного права', 'реформа', 'освобождение', 'промышленность', 'завод', 'фабрика', 'пароход', 'железная дорога', 'вокзал', 'университет', 'гимназия', 'лицей', 'сенат', 'синод'],
                            советский: ['советский', 'большевик', 'ленин', 'сталин', 'троцкий', 'брежнев', 'хрущев', 'горбачев', 'кпсс', 'комсомол', 'пионер', 'колхоз', 'совхоз', 'пятилетка', 'план', 'индустриализация', 'коллективизация', 'голод', 'война', 'победа', 'фронт', 'блокада', 'герой', 'орден', 'медаль', 'космонавт', 'гагарин', 'терешкова', 'спутник', 'космос', 'холодная война', 'атомная бомба', 'водородная бомба', 'ядерное оружие', 'стахановец', 'передовик', 'ударник', 'коммунизм', 'социализм', 'пролетариат', 'рабочий класс', 'буржуазия'],
                            современный: ['перестройка', 'гласность', 'ускорение', 'рынок', 'капитализм', 'приватизация', 'ваучер', 'биржа', 'доллар', 'рубль', 'инфляция', 'кризис', 'дефолт', 'санкции', 'импортозамещение', 'интернет', 'смартфон', 'соцсеть', 'постсоветский', 'российский', 'федерация', 'президент', 'демократия', 'выборы', 'парламент', 'дума', 'федерация', 'снг', 'содружество']
                        },
                        en: {
                            ancient: ['ancient', 'rome', 'greek', 'egypt', 'pharaoh', 'pyramid', 'troy', 'homer', 'iliad', 'odyssey', 'zeus', 'jupiter', 'apollo', 'athena', 'roman', 'greek', 'egyptian', 'babylon', 'assyria', 'persia', 'alexander', 'caesar', 'augustus', 'nero', 'plato', 'aristotle', 'socrates'],
                            medieval: ['medieval', 'middle ages', 'feudal', 'knight', 'castle', 'crusade', 'kingdom', 'monarchy', 'viking', 'norman', 'william conqueror', 'magna carta', 'black death', 'plague', 'hundred years war', 'templar', 'cathedral', 'gothic', 'byzantine', 'ottoman', 'mongol', 'genghis khan', 'charlemagne', 'vikings', 'vikings', 'vikings'],
                            renaissance: ['renaissance', 'enlightenment', 'leonardo', 'michelangelo', 'raphael', 'shakespeare', 'cervantes', 'dante', 'petrarch', 'boccaccio', 'galileo', 'newton', 'copernicus', 'kepler', 'humanism', 'reformation', 'martin luther', 'calvin', 'printing press', 'gutenberg', 'voyage', 'columbus', 'magellan', 'da gama', 'exploration', 'discovery'],
                            industrial: ['industrial', 'revolution', 'steam', 'engine', 'factory', 'mill', 'textile', 'coal', 'iron', 'steel', 'railway', 'train', 'locomotive', 'victorian', 'queen victoria', 'dickens', 'twain', 'darwin', 'evolution', 'marx', 'engels', 'communist manifesto', 'socialism', 'capitalism', 'urbanization', 'city', 'london', 'manchester', 'chicago', 'new york'],
                            modern: ['modern', 'contemporary', 'world war', 'wwi', 'wwii', 'hitler', 'stalin', 'churchill', 'roosevelt', 'cold war', 'nuclear', 'atom', 'hydrogen bomb', 'space race', 'moon landing', 'armstrong', 'apollo', 'computer', 'internet', 'digital', 'globalization', 'facebook', 'twitter', 'smartphone', 'ai', 'artificial intelligence', 'climate change', 'environment', 'sustainability', 'postmodern', 'postmodernism']
                        }
                    };
                    
                    const langPeriods = periods[this.language] || periods.ru;
                    
                    for (const [period, keywords] of Object.entries(langPeriods)) {
                        for (const keyword of keywords) {
                            const lowerKeyword = keyword.toLowerCase();
                            const regex = new RegExp(`\\b${this.escapeRegExp(lowerKeyword)}\\b`, 'i');
                            if (regex.test(lowerRef)) {
                                return period;
                            }
                        }
                    }
                    
                    return 'undefined';
        }
        
        determineMythologicalArchetype(reference) {
                    const lowerRef = reference.toLowerCase().trim();
                    
                    const archetypes = {
                        trickster: ['баба яга', 'баба-яга', 'леший', 'домовой', 'кикимора', 'кощей', 'кощей бессмертный', 'гоблин', 'чёрт', 'бес', 'шутник', 'озорник', 'проказник'],
                        hero: ['богатырь', 'витязь', 'герой', 'илья муромец', 'добрыня никитич', 'алёша попович', 'святогор', 'иван-царевич', 'рыцарь', 'паладин', 'воин', 'защитник', 'персей', 'геракл', 'одиссей', 'ахиллес', 'один', 'тор', 'архангел'],
                        monster: ['водяной', 'змей горыныч', 'василиск', 'минотавр', 'циклоп', 'гарпия', 'цербер', 'химера', 'гиена', 'виверна', 'дракон', 'тролль', 'орк'],
                        mystical: ['русалка', 'русалочка', 'алконост', 'сирин', 'гамаюн', 'феникс', 'единорог', 'фея', 'эльф', 'нимфа', 'дриада', 'наяда', 'океанида', 'нереида', 'амазонка', 'валькирия']
                    };
                    
                    for (const [archetype, refs] of Object.entries(archetypes)) {
                        for (const r of refs) {
                            const regex = new RegExp(`\\b${this.escapeRegExp(r)}\\b`, this.language === 'ru' ? 'iu' : 'i');
                            if (regex.test(lowerRef)) {
                                return archetype;
                            }
                        }
                    }
                    return 'other';
        }
                
        isMythologicalPattern(reference, text) {
                    const lowerText = text.toLowerCase();
                    const lowerRef = reference.toLowerCase().trim();
                    const escapedRef = this.escapeRegExp(lowerRef);
                    
                    const patterns = [
                        new RegExp(`\\bкак\\s+${escapedRef}\\b`, this.language === 'ru' ? 'iu' : 'i'),
                        new RegExp(`\\bсловно\\s+${escapedRef}\\b`, this.language === 'ru' ? 'iu' : 'i'),
                        new RegExp(`\\bподобно\\s+${escapedRef}\\b`, this.language === 'ru' ? 'iu' : 'i'),
                        new RegExp(`\\bбудто\\s+${escapedRef}\\b`, this.language === 'ru' ? 'iu' : 'i'),
                        new RegExp(`\\bточно\\s+${escapedRef}\\b`, this.language === 'ru' ? 'iu' : 'i'),
                        new RegExp(`\\bнаподобие\\s+${escapedRef}\\b`, this.language === 'ru' ? 'iu' : 'i'),
                        new RegExp(`\\bкак\\s+будто\\s+${escapedRef}\\b`, this.language === 'ru' ? 'iu' : 'i'),
                        new RegExp(`\\bсловно\\s+бы\\s+${escapedRef}\\b`, this.language === 'ru' ? 'iu' : 'i')
                    ];
                    
                    return patterns.some(pattern => pattern.test(lowerText));
        }
        
        getLiteralMeaning(idiom, language) {
                    const meanings = {
                        ru: {
                            'тянуть канитель': 'заниматься нудным, монотонным делом',
                            'бить баклуши': 'бездельничать',
                            'дело в шляпе': 'всё решено, успех обеспечен',
                            'кот наплакал': 'очень мало',
                            'собаку съел': 'имеет большой опыт в чем-либо',
                            'водить за нос': 'обманывать, вводить в заблуждение',
                            'вешать лапшу': 'обманывать, говорить неправду',
                            'делать из мухи слона': 'преувеличивать значение чего-либо',
                            'кровь с молоком': 'здоровый, полный сил',
                            'сесть в лужу': 'попасть в неловкое положение',
                            'пройти огонь и воду': 'пережить много трудностей',
                            'ни пуха ни пера': 'пожелание удачи',
                            'к шапочному разбору': 'опоздать, прийти слишком поздно',
                            'семь пятниц на неделе': 'непостоянство, изменчивость',
                            'когда рак на горе свистнет': 'никогда, в очень отдалённом будущем',
                            'после дождичка в четверг': 'никогда',
                            'два сапога пара': 'два человека, очень похожих друг на друга',
                            'белая ворона': 'человек, отличающийся от окружающих',
                            'стреляный воробей': 'опытный, искушённый человек',
                            'косая сажень в плечах': 'очень высокий, широкоплечий человек',
                            'семь верст до небес': 'очень много, бесконечно',
                            'филькина грамота': 'недействительный, незаконный документ',
                            'игра не стоит свеч': 'результат не оправдывает затрат',
                            'мелкая сошка': 'незначительный, маловажный человек',
                            'тертый калач': 'опытный, хитрый человек'
                        },
                        en: {
                            'break the ice': 'начать общение в неловкой ситуации',
                            'piece of cake': 'очень легко',
                            'hit the hay': 'идти спать',
                            'spill the beans': 'выдать секрет',
                            'cost an arm and a leg': 'очень дорого стоить',
                            'kick the bucket': 'умереть',
                            'bite the bullet': 'стиснуть зубы и пережить что-то неприятное',
                            'let the cat out of the bag': 'выдать секрет',
                            'hit the nail on the head': 'попасть в точку',
                            'burn the midnight oil': 'работать допоздна',
                            'under the weather': 'чувствовать себя плохо',
                            'once in a blue moon': 'очень редко',
                            'the ball is in your court': 'теперь твоя очередь действовать',
                            'barking up the wrong tree': 'ошибаться, искать не там',
                            'beat around the bush': 'ходить вокруг да около',
                            'call it a day': 'закончить на сегодня',
                            'cut corners': 'делать что-то небрежно, экономя время',
                            'every cloud has a silver lining': 'всё плохое имеет хорошую сторону',
                            'get cold feet': 'струсить, испугаться',
                            'give someone the cold shoulder': 'игнорировать кого-то',
                            'go the extra mile': 'приложить дополнительные усилия',
                            'hit the road': 'отправляться в путь',
                            'jump on the bandwagon': 'присоединиться к популярному',
                            'keep your chin up': 'не унывать, держаться',
                            'let sleeping dogs lie': 'не будить спящих собак (не трогать то, что лучше оставить)'
                        }
                    };
                    
                    return meanings[language]?.[idiom] || 'idiomatic expression';
        }
                
        classifyPoeticPattern(pattern) {
                    const patternStr = pattern.toString();
                    
                    if (/\\bкак\\b|\\bas\\b/.test(patternStr)) {
                        return 'simile';
                    } else if (/не.*\\bа\\b|not.*\\bbut\\b/.test(patternStr)) {
                        return 'contrast';
                    } else if (/то.*то|now.*now/.test(patternStr)) {
                        return 'repetition';
                    } else if (/\\bсловно\\b|\\bbudto\\b|\\bточно\\b|\\bподобно\\b|\\blike\\b|\\bas if\\b|\\bas though\\b/.test(patternStr)) {
                        return 'comparison';
                    } else if (/\\bи\\b.*\\bи\\b|\\bда\\b.*\\bда\\b|and.*and/.test(patternStr)) {
                        return 'parallelism';
                    }
                    
                    return 'poetic';
        }
                
        calculateCulturalCoherence(references) {
                    if (!references || typeof references !== 'object') return 0;
                    
                    const referenceCounts = Object.values(references)
                        .map(ref => ref?.count || 0)
                        .filter(count => count > 0);
                    
                    if (referenceCounts.length < 2) return referenceCounts.length === 1 ? 0.5 : 0;
                    
                    const total = referenceCounts.reduce((a, b) => a + b, 0);
                    const max = Math.max(...referenceCounts);
                    const concentration = max / total;
                    
                    const entropy = referenceCounts.reduce((sum, count) => {
                        const p = count / total;
                        return sum - p * Math.log2(p);
                    }, 0);
                    
                    const normalizedEntropy = entropy / Math.log2(referenceCounts.length);
                    const coherence = concentration * (1 - normalizedEntropy * 0.3);
                    
                    return Math.min(1, Math.max(0, coherence));
        }
                
        detectDominantCulturalTheme(references) {
                    if (!references || typeof references !== 'object') return 'none';
                    
                    const themeCounts = [];
                    for (const [theme, data] of Object.entries(references)) {
                        if (data?.count > 0) {
                            themeCounts.push({ theme, count: data.count });
                        }
                    }
                    
                    if (themeCounts.length === 0) return 'none';
                    
                    themeCounts.sort((a, b) => b.count - a.count);
                    
                    const total = themeCounts.reduce((sum, item) => sum + item.count, 0);
                    const maxPercentage = themeCounts[0].count / total;
                    
                    if (maxPercentage < 0.3) {
                        return 'mixed';
                    }
                    
                    return themeCounts[0].theme;
        }
        
        enhancedSemanticAnalysis(data) {
                        const sentences = data.sentences;
                        const words = data.words;
                        const uniqueWords = [...new Set(words)];
                        
                        const stopWords = this.language === 'ru' ? 
                            ['и', 'в', 'на', 'с', 'к', 'а', 'но', 'или', 'не', 'то', 'он', 'она', 'оно', 'они', 'это', 'тот', 'такой', 'какой', 'который', 'свой', 'мой', 'твой', 'его', 'её', 'их', 'наш', 'ваш', 'этот', 'да', 'нет', 'же', 'бы', 'ли', 'что', 'чтобы', 'потому', 'когда', 'если', 'так', 'как'] :
                            ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'this', 'that', 'these', 'those', 'it', 'its', 'he', 'she', 'they', 'we', 'you', 'i', 'my', 'your', 'his', 'her', 'our', 'their', 'as', 'by', 'from', 'so', 'if', 'then', 'than', 'too', 'very', 'can', 'will', 'just', 'don', 'should', 'now'];
                        
                        const filteredWords = words.filter(word => !stopWords.includes(word.toLowerCase()));
                        const filteredUniqueWords = [...new Set(filteredWords)];
                        
                        const semanticDensity = filteredWords.length > 0 ? 
                            filteredUniqueWords.length / filteredWords.length : 0;
                        
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
                            semanticRichness: this.calculateEnhancedSemanticRichness(filteredWords, filteredUniqueWords),
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
                complexity: this.calculateThematicComplexity(dimensions)
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
                        const dimensionEntries = Object.entries(dimensions);
                        const totalDimensions = dimensionEntries.length;
                        
                        if (totalDimensions === 0) return 0;
                        
                        let activeCount = 0;
                        let totalScore = 0;
                        
                        dimensionEntries.forEach(([name, dim]) => {
                            if (dim.score > 0) {
                                activeCount++;
                                totalScore += dim.score;
                            }
                        });
                        
                        if (activeCount === 0) return 0;
                        
                        const activityRatio = activeCount / totalDimensions;
                        const avgScore = totalScore / activeCount;
                        
                        const complexity = activityRatio * (1 + avgScore * 0.3);
                        
                        return Math.min(1, complexity);
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
                            'время', 'пространство', 'идея', 'мысль', 'чувство', 'эмоция', 'философия', 'смысл', 'цель', 'существование', 'бытие', 'ничто', 'вечность', 'душа', 'разум', 'сознание', 'память', 'воображение', 'вера', 'надежда', 'любовь', 'свобода', 'справедливость', 'красота', 'гармония',
                            'time', 'space', 'idea', 'thought', 'feeling', 'emotion', 'philosophy', 'meaning', 'purpose', 'existence', 'being', 'nothingness', 'eternity', 'soul', 'mind', 'consciousness', 'memory', 'imagination', 'faith', 'hope', 'love', 'freedom', 'justice', 'beauty', 'harmony'
                        ];
                        
                        const concreteWords = [
                            'стол', 'стул', 'дом', 'машина', 'книга', 'ручка', 'стена', 'окно', 'дверь', 'пол', 'потолок', 'стакан', 'тарелка', 'ложка', 'вилка', 'нож', 'яблоко', 'банан', 'дерево', 'цветок', 'собака', 'кошка', 'ключ', 'замок', 'часы', 'телефон', 'компьютер',
                            'table', 'chair', 'house', 'car', 'book', 'pen', 'wall', 'window', 'door', 'floor', 'ceiling', 'glass', 'plate', 'spoon', 'fork', 'knife', 'apple', 'banana', 'tree', 'flower', 'dog', 'cat', 'key', 'lock', 'clock', 'phone', 'computer'
                        ];
                        
                        const abstractCount = abstractWords.filter(word => 
                            words.some(w => w.toLowerCase().includes(word.toLowerCase()))
                        ).length;
                        
                        const concreteCount = concreteWords.filter(word => 
                            words.some(w => w.toLowerCase().includes(word.toLowerCase()))
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
                        if (abstract === 0 && concrete === 0) {
                            return 'balanced';
                        }
                        const ratio = concrete > 0 ? abstract / concrete : (abstract > 0 ? Infinity : 0);
                        
                        if (ratio > 1.5) return 'highly abstract';
                        if (ratio > 1) return 'abstract';
                        if (ratio > 0.5) return 'balanced';
                        if (ratio > 0) return 'concrete';
                        return 'very concrete';
        }
        
        calculateEnhancedSemanticRichness(words, uniqueWords) {
                        if (words.length === 0) return 0;
                        
                        const stopWords = this.language === 'ru' ? 
                            ['и', 'в', 'на', 'с', 'к', 'а', 'но', 'или', 'не', 'то', 'он', 'она', 'оно', 'они', 'это', 'тот', 'такой', 'какой', 'который', 'свой', 'мой', 'твой', 'его', 'её', 'их', 'наш', 'ваш', 'этот', 'да', 'нет', 'же', 'бы', 'ли', 'что', 'чтобы', 'потому', 'когда', 'если', 'так', 'как'] :
                            ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'this', 'that', 'these', 'those', 'it', 'its', 'he', 'she', 'they', 'we', 'you', 'i', 'my', 'your', 'his', 'her', 'our', 'their', 'as', 'by', 'from', 'so', 'if', 'then', 'than', 'too', 'very', 'can', 'will', 'just', 'don', 'should', 'now'];
                        
                        const filteredWords = words.filter(word => !stopWords.includes(word.toLowerCase()));
                        if (filteredWords.length === 0) return 0;
                        
                        const filteredUnique = [...new Set(filteredWords)];
                        const uniqueRatio = filteredUnique.length / filteredWords.length;
                        const avgWordLength = filteredWords.reduce((sum, w) => sum + w.length, 0) / filteredWords.length;
                        const longWords = filteredWords.filter(w => w.length > 7).length / filteredWords.length;
                        
                        return (uniqueRatio * 0.4) + (Math.log(avgWordLength + 1) * 0.3) + (longWords * 0.3);
        }

        calculateSemanticCoherence(sentences) {
                              if (sentences.length < 2) return 1;

                              const stopWords = this.language === 'ru' ? 
                                        ['и', 'в', 'на', 'с', 'к', 'а', 'но', 'или', 'не', 'то', 'он', 'она', 'оно', 'они', 'это', 'тот', 'такой', 'какой', 'который', 'свой', 'мой', 'твой', 'его', 'её', 'их', 'наш', 'ваш', 'что', 'как', 'весь', 'этот'] :
                                        ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'this', 'that', 'these', 'those', 'it', 'its', 'he', 'she', 'they', 'we', 'you', 'i', 'my', 'your', 'his', 'her', 'our', 'their'];

                              const stem = (word) => {
                                        if (this.language === 'ru') {
                                                  if (word.length > 4) {
                                                            if (word.endsWith('ого') || word.endsWith('его') || word.endsWith('ому') || word.endsWith('ему')) return word.slice(0, -3);
                                                            if (word.endsWith('ыми') || word.endsWith('ими')) return word.slice(0, -3);
                                                            if (word.endsWith('ая') || word.endsWith('яя') || word.endsWith('ое') || word.endsWith('ее') || word.endsWith('ые') || word.endsWith('ие')) return word.slice(0, -2);
                                                            if (word.endsWith('ой') || word.endsWith('ий') || word.endsWith('ый')) return word.slice(0, -2);
                                                            if (word.endsWith('ом') || word.endsWith('ем') || word.endsWith('ам') || word.endsWith('ям')) return word.slice(0, -2);
                                                            if (word.endsWith('ов') || word.endsWith('ев') || word.endsWith('ин') || word.endsWith('ын')) return word.slice(0, -2);
                                                            if (word.endsWith('ах') || word.endsWith('ях')) return word.slice(0, -2);
                                                  }
                                                  if (word.length > 3) {
                                                            if (word.endsWith('ка') || word.endsWith('га') || word.endsWith('ха')) return word.slice(0, -1);
                                                            if (word.endsWith('ть') || word.endsWith('ти')) return word.slice(0, -2);
                                                  }
                                        } else {
                                                  if (word.length > 3) {
                                                            if (word.endsWith('ing')) return word.slice(0, -3);
                                                            if (word.endsWith('ed')) return word.slice(0, -2);
                                                            if (word.endsWith('ly')) return word.slice(0, -2);
                                                            if (word.endsWith('er')) return word.slice(0, -2);
                                                            if (word.endsWith('est')) return word.slice(0, -3);
                                                            if (word.endsWith('s') && !word.endsWith('ss') && !word.endsWith('us')) return word.slice(0, -1);
                                                  }
                                        }
                                        return word;
                              };

                              const synonymGroups = this.language === 'ru' ? [
                                        ['радость', 'счастье', 'веселье', 'восторг'],
                                        ['грусть', 'печаль', 'тоска', 'уныние'],
                                        ['гнев', 'злость', 'ярость', 'негодование'],
                                        ['страх', 'ужас', 'боязнь', 'тревога'],
                                        ['думать', 'мыслить', 'размышлять', 'полагать'],
                                        ['говорить', 'сказать', 'произносить', 'вещать']
                              ] : [
                                        ['joy', 'happiness', 'delight', 'glee'],
                                        ['sad', 'sorrow', 'melancholy', 'gloom'],
                                        ['anger', 'rage', 'fury', 'wrath'],
                                        ['fear', 'terror', 'dread', 'anxiety'],
                                        ['think', 'believe', 'consider', 'ponder'],
                                        ['speak', 'talk', 'say', 'utter']
                              ];

                              const processedSentences = sentences.map(s => {
                                        const text = typeof s === 'object' ? s.text : s;
                                        const words = this.enhancedTokenization(text)
                                                  .map(w => w.toLowerCase())
                                                  .filter(w => w.length > 1 && !stopWords.includes(w))
                                                  .map(stem);
                                        return new Set(words);
                              });

                              let totalCoherence = 0;
                              let validPairs = 0;

                              for (let i = 1; i < processedSentences.length; i++) {
                                        const prevSet = processedSentences[i - 1];
                                        const currSet = processedSentences[i];

                                        if (prevSet.size === 0 || currSet.size === 0) {
                                                  totalCoherence += 0.1;
                                                  validPairs++;
                                                  continue;
                                        }

                                        const exactOverlap = [...prevSet].filter(w => currSet.has(w)).length;

                                        let synonymOverlap = 0;
                                        for (const group of synonymGroups) {
                                                  const groupSet = new Set(group);
                                                  const prevInGroup = [...prevSet].filter(w => groupSet.has(w)).length;
                                                  const currInGroup = [...currSet].filter(w => groupSet.has(w)).length;
                                                  if (prevInGroup > 0 && currInGroup > 0) {
                                                            synonymOverlap += Math.min(prevInGroup, currInGroup) * 0.5; 
                                                  }
                                        }

                                        let thematicOverlap = 0;
                                        const emotionCategories = Object.keys(this.dictionaries[this.language] || {});
                                        for (const cat of emotionCategories) {
                                                  const catWords = this.dictionaries[this.language][cat] || [];
                                                  const catSet = new Set(catWords.map(w => stem(w.toLowerCase())));
                                                  const prevInCat = [...prevSet].filter(w => catSet.has(w)).length;
                                                  const currInCat = [...currSet].filter(w => catSet.has(w)).length;
                                                  if (prevInCat > 0 && currInCat > 0) {
                                                            thematicOverlap += Math.min(prevInCat, currInCat) * 0.3; 
                                                  }
                                        }

                                        const totalOverlapWeight = exactOverlap + synonymOverlap + thematicOverlap;
                                        const maxPossible = Math.min(prevSet.size, currSet.size); 
                                        let pairCoherence = maxPossible > 0 ? totalOverlapWeight / maxPossible : 0;

                                        pairCoherence = Math.min(1, pairCoherence);

                                        totalCoherence += pairCoherence;
                                        validPairs++;
                              }

                              const result = validPairs > 0 ? totalCoherence / validPairs : 0;
                              return result;
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
                              const cognitiveBiases = this.analyzeCognitiveBiases(text);
                              const communicationStyles = this.analyzeCommunicationStyles(text);
                              const selfAwareness = this.assessSelfAwareness(text); 

                              const psychologicalComplexity = this.calculatePsychologicalComplexity(
                                        plutchikAnalysis, maslowAnalysis, bigFiveAnalysis, emotionalIntelligence, defenseMechanisms, cognitiveBiases, communicationStyles
                              );

                              return {
                                        plutchik: plutchikAnalysis,
                                        maslow: maslowAnalysis,
                                        bigFive: bigFiveAnalysis,
                                        emotionalIntelligence: emotionalIntelligence,
                                        defenseMechanisms: defenseMechanisms,
                                        cognitiveBiases: cognitiveBiases,
                                        communicationStyles: communicationStyles,
                                        selfAwarenessLevel: selfAwareness,
                                        psychologicalComplexity: psychologicalComplexity
                              };
        }
        
        analyzePlutchikEmotions(words) {
                              const plutchik = this.psychologicalModels.plutchikWheel;
                              const emotions = {};

                              const plutchikMapping = {
                                        joy: ['ecstasy', 'joy', 'happiness', 'delight', 'euphoria'],
                                        trust: ['trust', 'faith', 'hope', 'confidence'],
                                        fear: ['fear', 'anxiety', 'worry', 'dread', 'terror'],
                                        surprise: ['surprise', 'astonishment', 'amazement', 'shock'],
                                        sadness: ['sadness', 'grief', 'sorrow', 'melancholy', 'despair'],
                                        disgust: ['disgust', 'revulsion', 'contempt', 'loathing'],
                                        anger: ['anger', 'rage', 'fury', 'wrath', 'irritation'],
                                        anticipation: ['anticipation', 'expectation', 'curiosity', 'interest']
                              };

                              for (const [plutchikEmotion, ourCategories] of Object.entries(plutchikMapping)) {
                                        let totalWeightedCount = 0;
                                        let categoryCount = 0;

                                        ourCategories.forEach(category => {
                                                  if (this.dictionaries[this.language][category]) {
                                                            const categoryWords = this.dictionaries[this.language][category];
                                                            const weight = this.categoryWeights[category] || 1.0;
                                                            // Находим все вхождения слов этой категории
                                                            const found = words.filter(word => categoryWords.includes(word)).length;
                                                            if (found > 0) {
                                                                      totalWeightedCount += found * weight;
                                                                      categoryCount++;
                                                            }
                                                  }
                                        });

                                        if (totalWeightedCount > 0) {
                                                  emotions[plutchikEmotion] = {
                                                            intensity: totalWeightedCount / (words.length || 1), 
                                                            presence: categoryCount > 0,
                                                            weightedIntensity: totalWeightedCount * 2 / (words.length || 1) 
                                                  };
                                        }
                              }

                              const primaryEmotion = this.findPrimaryPlutchikEmotion(emotions);
                              const combinations = this.calculatePlutchikCombinations(emotions);
                              const emotionalDiversity = Object.keys(emotions).length / 8;
                              const emotionalIntensity = this.calculatePlutchikIntensity(emotions);

                              return {
                                        basicEmotions: emotions,
                                        primary: primaryEmotion,
                                        combinations: combinations,
                                        emotionalDiversity: emotionalDiversity,
                                        emotionalIntensity: emotionalIntensity
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

        analyzeCognitiveBiases(text) {
                              const biases = this.psychologicalModels.cognitiveBiases || {};
                              const result = {};

                              for (const [bias, config] of Object.entries(biases)) {
                                        if (!config.enabled) continue;
                                        const markers = config.markers || { ru: [], en: [] };
                                        const langMarkers = markers[this.language] || markers.en || [];
                                        let count = 0;

                                        langMarkers.forEach(marker => {
                                                  const lowerMarker = marker.toLowerCase();
                                                  if (lowerMarker.includes(' ')) {
                                                            const phraseRegex = new RegExp('(^|[\\s\\p{P}])' + this.escapeRegExp(lowerMarker) + '($|[\\s\\p{P}])', 'giu');
                                                            const matches = text.match(phraseRegex);
                                                            if (matches) count += matches.length;
                                                  } else {
                                                            const wordRegex = new RegExp('\\b' + this.escapeRegExp(lowerMarker) + '\\b', 'gi');
                                                            const matches = text.match(wordRegex);
                                                            if (matches) count += matches.length;
                                                  }
                                        });

                                        if (count > 0) {
                                                  const weight = config.weight || 1.0;
                                                  const intensity = Math.min(1, count * 0.2);
                                                  result[bias] = {
                                                            frequency: count,
                                                            intensity: intensity,
                                                            weight: weight
                                                  };
                                        }
                              }

                              return result;
        }

        analyzeCommunicationStyles(text) {
                              const styles = this.psychologicalModels.communicationStyles || {};
                              const result = {};

                              for (const [style, config] of Object.entries(styles)) {
                                        if (!config.enabled) continue;
                                        const markers = config.markers || { ru: [], en: [] };
                                        const avoidMarkers = config.markersAvoid || { ru: [], en: [] };
                                        const langMarkers = markers[this.language] || markers.en || [];
                                        const langAvoid = avoidMarkers[this.language] || avoidMarkers.en || [];
                                        let score = 0;

                                        langMarkers.forEach(marker => {
                                                  const lowerMarker = marker.toLowerCase();
                                                  if (lowerMarker.includes(' ')) {
                                                            const phraseRegex = new RegExp('(^|[\\s\\p{P}])' + this.escapeRegExp(lowerMarker) + '($|[\\s\\p{P}])', 'giu');
                                                            const matches = text.match(phraseRegex);
                                                            if (matches) score += matches.length * 0.2;
                                                  } else {
                                                            const wordRegex = new RegExp('\\b' + this.escapeRegExp(lowerMarker) + '\\b', 'gi');
                                                            const matches = text.match(wordRegex);
                                                            if (matches) score += matches.length * 0.2;
                                                  }
                                        });

                                        langAvoid.forEach(marker => {
                                                  const lowerMarker = marker.toLowerCase();
                                                  if (lowerMarker.includes(' ')) {
                                                            const phraseRegex = new RegExp('(^|[\\s\\p{P}])' + this.escapeRegExp(lowerMarker) + '($|[\\s\\p{P}])', 'giu');
                                                            const matches = text.match(phraseRegex);
                                                            if (matches) score -= matches.length * 0.1;
                                                  } else {
                                                            const wordRegex = new RegExp('\\b' + this.escapeRegExp(lowerMarker) + '\\b', 'gi');
                                                            const matches = text.match(wordRegex);
                                                            if (matches) score -= matches.length * 0.1;
                                                  }
                                        });

                                        if (score > 0) {
                                                  result[style] = {
                                                            score: Math.min(1, score),
                                                            intensity: Math.min(1, score / 2),
                                                            weight: config.weight || 1.0
                                                  };
                                        }
                              }

                              return result;
        }
        
        analyzeMaslowNeeds(text) {
                              const maslow = this.psychologicalModels.maslowHierarchy;
                              const needs = {};

                              const stemRussian = (word) => {
                                        if (!word || word.length < 3) return word;
                                        let w = word.toLowerCase();
                                        if (w.length > 6) {
                                                  if (w.endsWith('ого') || w.endsWith('его') || w.endsWith('ому') || w.endsWith('ему')) return w.slice(0, -3);
                                                  if (w.endsWith('ыми') || w.endsWith('ими')) return w.slice(0, -3);
                                        }
                                        if (w.length > 5) {
                                                  if (w.endsWith('ая') || w.endsWith('яя') || w.endsWith('ое') || w.endsWith('ее') || w.endsWith('ые') || w.endsWith('ие')) return w.slice(0, -2);
                                                  if (w.endsWith('ой') || w.endsWith('ий') || w.endsWith('ый')) return w.slice(0, -2);
                                                  if (w.endsWith('ом') || w.endsWith('ем') || w.endsWith('ам') || w.endsWith('ям')) return w.slice(0, -2);
                                                  if (w.endsWith('ов') || w.endsWith('ев') || w.endsWith('ин') || w.endsWith('ын')) return w.slice(0, -2);
                                                  if (w.endsWith('ах') || w.endsWith('ях')) return w.slice(0, -2);
                                                  if (w.endsWith('ку') || w.endsWith('гу') || w.endsWith('ху')) return w.slice(0, -2);
                                        }
                                        if (w.length > 4) {
                                                  if (w.endsWith('ка') || w.endsWith('га') || w.endsWith('ха')) return w.slice(0, -1);
                                                  if (w.endsWith('ть') || w.endsWith('ти')) return w.slice(0, -2);
                                                  if (w.endsWith('ла') || w.endsWith('ло') || w.endsWith('ли')) return w.slice(0, -2);
                                                  if (w.endsWith('ет') || w.endsWith('ют') || w.endsWith('ят')) return w.slice(0, -2);
                                                  if (w.endsWith('ит') || w.endsWith('ат')) return w.slice(0, -2);
                                        }
                                        if (w.length > 3) {
                                                  if (w.endsWith('а') || w.endsWith('я') || w.endsWith('о') || w.endsWith('е') || 
                                                      w.endsWith('ы') || w.endsWith('и') || w.endsWith('у') || w.endsWith('ю')) {
                                                            return w.slice(0, -1);
                                                  }
                                        }
                                        return w;
                              };

                              const extendedThemes = {
                                        physiological: [
                                                  'еда', 'вода', 'пить', 'голод', 'жажда', 'сон', 'отдых', 'спать', 'устал', 'усталость',
                                                  'тепло', 'холод', 'кров', 'дом', 'жильё', 'здоровье', 'болезнь', 'лечение', 'физический',
                                                  'пища', 'напиток', 'голодный', 'сонный', 'уставший', 'температура', 'жилище'
                                        ],
                                        safety: [
                                                  'безопасность', 'защита', 'стабильность', 'порядок', 'страх', 'опасность', 'угроза',
                                                  'тревога', 'уверенность', 'спокойствие', 'работа', 'деньги', 'финансы', 'будущее',
                                                  'устойчивость', 'надёжность', 'кредит', 'ипотека', 'долг', 'риск', 'паника',
                                                  'безопасный', 'защищённый', 'стабильный', 'спокойный', 'тревожный', 'опасный'
                                        ],
                                        'love/belonging': [
                                                  'любовь', 'дружба', 'семья', 'близкие', 'отношения', 'принятие', 'общение', 'одиночество',
                                                  'друг', 'подруга', 'мать', 'отец', 'родители', 'ребёнок', 'дети', 'коллеги', 'группа',
                                                  'команда', 'сообщество', 'принадлежность', 'доверие', 'нежность', 'забота', 'ласка',
                                                  'родные', 'любимый', 'близкий', 'родственный', 'дружеский', 'семейный'
                                        ],
                                        esteem: [
                                                  'уважение', 'признание', 'достижение', 'успех', 'гордость', 'самоуважение', 'статус',
                                                  'похвала', 'восхищение', 'престиж', 'влияние', 'авторитет', 'репутация', 'карьера',
                                                  'должность', 'звание', 'награда', 'премия', 'почёт', 'достоинство', 'самооценка',
                                                  'уважаемый', 'признанный', 'успешный', 'гордый', 'престижный', 'влиятельный'
                                        ],
                                        'self-actualization': [
                                                  'самореализация', 'развитие', 'рост', 'потенциал', 'творчество', 'смысл', 'цель',
                                                  'мечта', 'призвание', 'талант', 'способности', 'самосовершенствование', 'духовность',
                                                  'просветление', 'гармония', 'мудрость', 'познание', 'истина', 'предназначение',
                                                  'реализоваться', 'развиваться', 'расти', 'творить', 'созидать', 'познавать'
                                        ]
                              };

                              const words = text.toLowerCase().split(/[^а-яёa-z]+/).filter(w => w.length > 1);
                              const stemmedWords = words.map(w => stemRussian(w));
                              const stemmedText = stemmedWords.join(' ');

                              for (const level of maslow.levels) {
                                        const themes = extendedThemes[level] || [];
                                        let score = 0;
                                        const foundThemes = [];

                                        themes.forEach(theme => {
                                                  const stemmedTheme = stemRussian(theme);
                                                  const regex = new RegExp(`\\b${this.escapeRegExp(stemmedTheme)}\\b`, 'gi');
                                                  const matches = stemmedText.match(regex);
                                                  if (matches) {
                                                            score += matches.length * 0.15;
                                                            foundThemes.push(theme);
                                                  } else {
                                                            let found = false;
                                                            stemmedWords.forEach(sw => {
                                                                      if (sw.includes(stemmedTheme) || stemmedTheme.includes(sw)) {
                                                                                if (!found) {
                                                                                          score += 0.1;
                                                                                          foundThemes.push(theme + '*');
                                                                                          found = true;
                                                                                }
                                                                      }
                                                            });
                                                  }
                                        });

                                        if (score > 0) {
                                                  needs[level] = {
                                                            score: Math.min(1, score / 3),
                                                            themes: [...new Set(foundThemes)].slice(0, 10),
                                                            intensity: Math.min(1, score / (themes.length * 0.3))
                                                  };
                                        }
                              }

                              const dominantLevel = this.findDominantMaslowLevel(needs);
                              const hierarchyCompletion = this.calculateHierarchyCompletion(needs);
                              const needComplexity = Object.keys(needs).length / maslow.levels.length;

                              return {
                                        needs: needs,
                                        dominant: dominantLevel,
                                        hierarchyCompletion: hierarchyCompletion,
                                        needComplexity: needComplexity
                              };
        }
        
        findDominantMaslowLevel(needs) {
            let maxScore = 0;
            let dominant = 'self-actualization'; 
            
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

                              const stemRussian = (word) => {
                                        if (!word || word.length < 3) return word;
                                        let w = word.toLowerCase();
                                        if (w.length > 6) {
                                                  if (w.endsWith('ого') || w.endsWith('его') || w.endsWith('ому') || w.endsWith('ему')) return w.slice(0, -3);
                                                  if (w.endsWith('ыми') || w.endsWith('ими')) return w.slice(0, -3);
                                        }
                                        if (w.length > 5) {
                                                  if (w.endsWith('ая') || w.endsWith('яя') || w.endsWith('ое') || w.endsWith('ее') || w.endsWith('ые') || w.endsWith('ие')) return w.slice(0, -2);
                                                  if (w.endsWith('ой') || w.endsWith('ий') || w.endsWith('ый')) return w.slice(0, -2);
                                                  if (w.endsWith('ом') || w.endsWith('ем') || w.endsWith('ам') || w.endsWith('ям')) return w.slice(0, -2);
                                                  if (w.endsWith('ов') || w.endsWith('ев') || w.endsWith('ин') || w.endsWith('ын')) return w.slice(0, -2);
                                                  if (w.endsWith('ах') || w.endsWith('ях')) return w.slice(0, -2);
                                        }
                                        if (w.length > 4) {
                                                  if (w.endsWith('ка') || w.endsWith('га') || w.endsWith('ха')) return w.slice(0, -1);
                                                  if (w.endsWith('ть') || w.endsWith('ти')) return w.slice(0, -2);
                                                  if (w.endsWith('ла') || w.endsWith('ло') || w.endsWith('ли')) return w.slice(0, -2);
                                                  if (w.endsWith('ет') || w.endsWith('ют') || w.endsWith('ят')) return w.slice(0, -2);
                                                  if (w.endsWith('ит') || w.endsWith('ат')) return w.slice(0, -2);
                                        }
                                        if (w.length > 3) {
                                                  if (w.endsWith('а') || w.endsWith('я') || w.endsWith('о') || w.endsWith('е') || 
                                                      w.endsWith('ы') || w.endsWith('и') || w.endsWith('у') || w.endsWith('ю')) {
                                                            return w.slice(0, -1);
                                                  }
                                        }
                                        return w;
                              };

                              const extendedIndicators = {
                                        openness: [
                                                  'любопытный', 'творческий', 'фантазия', 'воображение', 'искусство', 'поэзия',
                                                  'интеллектуальный', 'нестандартный', 'свободомыслящий', 'либеральный',
                                                  'новый', 'эксперимент', 'инновация', 'оригинальный', 'креативный',
                                                  'изобретательный', 'нетрадиционный', 'прогрессивный', 'открытый',
                                                  'любознательный', 'пытливый', 'интересующийся', 'мечтательный'
                                        ],
                                        conscientiousness: [
                                                  'дисциплинированный', 'организованный', 'ответственный', 'надёжный', 'трудолюбивый',
                                                  'перфекционист', 'пунктуальный', 'план', 'цель', 'порядок', 'система', 'обязательный',
                                                  'старательный', 'усердный', 'аккуратный', 'последовательный', 'методичный',
                                                  'рациональный', 'расчётливый', 'предусмотрительный', 'исполнительный',
                                                  'добросовестный', 'принципиальный', 'обязанность', 'долг'
                                        ],
                                        extraversion: [
                                                  'общительный', 'разговорчивый', 'энергичный', 'активный', 'компанейский',
                                                  'дружелюбный', 'энтузиазм', 'жизнерадостный', 'шумный', 'вечеринка', 'люди',
                                                  'коммуникабельный', 'открытый', 'контактный', 'весёлый', 'оживлённый',
                                                  'экстраверт', 'общение', 'тусовка', 'собрание', 'компания', 'друзья'
                                        ],
                                        agreeableness: [
                                                  'добрый', 'отзывчивый', 'сочувствующий', 'доверчивый', 'кооперативный',
                                                  'альтруистичный', 'вежливый', 'терпимый', 'мягкий', 'помогать',
                                                  'снисходительный', 'великодушный', 'благожелательный', 'сердечный',
                                                  'милосердный', 'сострадательный', 'эмпатичный', 'чуткий', 'понимающий',
                                                  'уступчивый', 'покладистый', 'миролюбивый', 'добродушный'
                                        ],
                                        neuroticism: [
                                                  'тревожный', 'нервный', 'напряжённый', 'неуверенный', 'ранимый', 'пессимистичный',
                                                  'депрессивный', 'эмоциональный', 'обидчивый', 'раздражительный', 'беспокойный',
                                                  'впечатлительный', 'чувствительный', 'мнительный', 'неспокойный', 'возбудимый',
                                                  'импульсивный', 'нестабильный', 'капризный', 'непостоянный', 'изменчивый',
                                                  'страх', 'боязнь', 'паника', 'стресс', 'переживание', 'волнение'
                                        ]
                              };

                              const words = text.toLowerCase().split(/[^а-яёa-z]+/).filter(w => w.length > 1);
                              const stemmedWords = words.map(w => stemRussian(w));
                              const stemmedText = stemmedWords.join(' ');

                              for (const trait of bigFive.traits) {
                                        const indicators = extendedIndicators[trait] || [];
                                        let score = 0;
                                        const foundIndicators = [];

                                        indicators.forEach(indicator => {
                                                  const stemmedIndicator = stemRussian(indicator);
                                                  const regex = new RegExp(`\\b${this.escapeRegExp(stemmedIndicator)}\\b`, 'gi');
                                                  const matches = stemmedText.match(regex);
                                                  if (matches) {
                                                            score += matches.length * 0.1;
                                                            foundIndicators.push(indicator);
                                                  } else {
                                                            let found = false;
                                                            stemmedWords.forEach(sw => {
                                                                      if (sw.includes(stemmedIndicator) || stemmedIndicator.includes(sw)) {
                                                                                if (!found) {
                                                                                          score += 0.05;
                                                                                          foundIndicators.push(indicator + '*');
                                                                                          found = true;
                                                                                }
                                                                      }
                                                            });
                                                  }
                                        });

                                        if (score > 0) {
                                                  const normalizedScore = Math.min(1, score / 3);
                                                  traits[trait] = {
                                                            score: normalizedScore,
                                                            indicators: foundIndicators.slice(0, 10),
                                                            level: normalizedScore > 0.4 ? 'high' : 
                                                                   normalizedScore > 0.15 ? 'medium' : 'low'
                                                  };
                                        }
                              }

                              const profile = this.createBigFiveProfile(traits);
                              const complexity = this.calculatePersonalityComplexity(traits);

                              return {
                                        traits: traits,
                                        profile: profile,
                                        complexity: complexity
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
                              const stemRussian = (word) => {
                                        if (!word || word.length < 3) return word;
                                        let w = word.toLowerCase();
                                        if (w.length > 6) {
                                                  if (w.endsWith('ого') || w.endsWith('его') || w.endsWith('ому') || w.endsWith('ему')) return w.slice(0, -3);
                                                  if (w.endsWith('ыми') || w.endsWith('ими')) return w.slice(0, -3);
                                        }
                                        if (w.length > 5) {
                                                  if (w.endsWith('ая') || w.endsWith('яя') || w.endsWith('ое') || w.endsWith('ее') || w.endsWith('ые') || w.endsWith('ие')) return w.slice(0, -2);
                                                  if (w.endsWith('ой') || w.endsWith('ий') || w.endsWith('ый')) return w.slice(0, -2);
                                                  if (w.endsWith('ом') || w.endsWith('ем') || w.endsWith('ам') || w.endsWith('ям')) return w.slice(0, -2);
                                                  if (w.endsWith('ов') || w.endsWith('ев') || w.endsWith('ин') || w.endsWith('ын')) return w.slice(0, -2);
                                                  if (w.endsWith('ах') || w.endsWith('ях')) return w.slice(0, -2);
                                        }
                                        if (w.length > 4) {
                                                  if (w.endsWith('ка') || w.endsWith('га') || w.endsWith('ха')) return w.slice(0, -1);
                                                  if (w.endsWith('ть') || w.endsWith('ти')) return w.slice(0, -2);
                                                  if (w.endsWith('ла') || w.endsWith('ло') || w.endsWith('ли')) return w.slice(0, -2);
                                                  if (w.endsWith('ет') || w.endsWith('ют') || w.endsWith('ят')) return w.slice(0, -2);
                                                  if (w.endsWith('ит') || w.endsWith('ат')) return w.slice(0, -2);
                                        }
                                        if (w.length > 3) {
                                                  if (w.endsWith('а') || w.endsWith('я') || w.endsWith('о') || w.endsWith('е') || 
                                                      w.endsWith('ы') || w.endsWith('и') || w.endsWith('у') || w.endsWith('ю')) {
                                                            return w.slice(0, -1);
                                                  }
                                        }
                                        return w;
                              };

                              const words = text.toLowerCase().split(/[^а-яёa-z]+/).filter(w => w.length > 1);
                              const stemmedWords = words.map(w => stemRussian(w));
                              const stemmedText = stemmedWords.join(' ');

                              const indicators = {
                                        selfAwareness: [
                                                  { pattern: /осознаю|понимаю себя|мои чувства|рефлексирую|самоанализ|интроспекция|я думаю о себе|я задумываюсь|почему я|что я чувствую|рефлексия/i, weight: 0.2 },
                                                  { pattern: /анализирую себя|самопознание|самонаблюдение/i, weight: 0.25 },
                                                  { pattern: /я понял|я заметил|до меня дошло/i, weight: 0.3 }
                                        ],
                                        empathy: [
                                                  { pattern: /понимаю (тебя|других)|чувствую твою|сопереживаю|эмпатия|ставлю себя на место|понимаю других|сочувствую|i understand you|i feel your|empathy|compassion/i, weight: 0.25 },
                                                  { pattern: /ты должно быть чувствуешь|тебе наверное трудно|i know how you feel/i, weight: 0.2 },
                                                  { pattern: /поддерживаю|помогаю|support|help/i, weight: 0.15 },
                                                  { pattern: /понимаю (других|людей)|сочувствую|сопереживаю|чувствую чужие|эмпатия/i, weight: 0.25 }
                                        ],
                                        emotionalRegulation: [
                                                  { pattern: /контролирую (себя|эмоции)|управляю эмоциями|сохраняю спокойствие|держу себя в руках|дышу глубоко|считаю до десяти|успокаиваюсь|беру себя в руки|стараюсь не реагировать|сдерживаюсь|control (myself|my emotions)|manage emotions|stay calm|keep my cool|take a deep breath|count to ten|relax|calm down/i, weight: 0.2 },
                                                  { pattern: /медитирую|йога|дыхательные практики|meditate|yoga|breathing exercises/i, weight: 0.25 },
                                                  { pattern: /не даю эмоциям|не позволяю себе|i don't let emotions|i keep my emotions in check/i, weight: 0.3 }
                                        ],
                                        socialSkills: [
                                                  { pattern: /общаюсь|взаимодействую|нахожу общий язык|коммуникация|умею слушать|слышу других|разрешаю конфликты|иду на компромисс|поддерживаю разговор|i communicate|i interact|i get along|social skills|i know how to listen|i hear others|i resolve conflicts|i compromise|i keep a conversation/i, weight: 0.2 },
                                                  { pattern: /работа в команде|сотрудничество|teamwork|collaboration/i, weight: 0.25 },
                                                  { pattern: /лидерство|убеждаю|веду за собой|leadership|persuade|lead/i, weight: 0.2 },
                                                  { pattern: /нахожу общий язык|общительный|коммуникабельный|легко знакомлюсь|дружелюбный/i, weight: 0.2 }
                                        ]
                              };

                              const scores = {};
                              let totalScore = 0;

                              for (const [component, patterns] of Object.entries(indicators)) {
                                        let componentScore = 0;
                                        patterns.forEach(({ pattern, weight }) => {
                                                  const matches = stemmedText.match(pattern);
                                                  if (matches) {
                                                            componentScore += matches.length * weight;
                                                  }
                                        });
                                        scores[component] = Math.min(1, componentScore);
                                        totalScore += componentScore;
                              }

                              const avgScore = totalScore / Object.keys(indicators).length;
                              const level = avgScore > 0.6 ? 'high' : avgScore > 0.3 ? 'moderate' : 'developing';

                              const strengths = [];
                              for (const [component, score] of Object.entries(scores)) {
                                        if (score > 0.5) strengths.push(component);
                              }

                              return {
                                        components: scores,
                                        overall: avgScore,
                                        level: level,
                                        strengths: strengths
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
                              const stemRussian = (word) => {
                                        if (!word || word.length < 3) return word;
                                        let w = word.toLowerCase();
                                        if (w.length > 6) {
                                                  if (w.endsWith('ого') || w.endsWith('его') || w.endsWith('ому') || w.endsWith('ему')) return w.slice(0, -3);
                                                  if (w.endsWith('ыми') || w.endsWith('ими')) return w.slice(0, -3);
                                        }
                                        if (w.length > 5) {
                                                  if (w.endsWith('ая') || w.endsWith('яя') || w.endsWith('ое') || w.endsWith('ее') || w.endsWith('ые') || w.endsWith('ие')) return w.slice(0, -2);
                                                  if (w.endsWith('ой') || w.endsWith('ий') || w.endsWith('ый')) return w.slice(0, -2);
                                                  if (w.endsWith('ом') || w.endsWith('ем') || w.endsWith('ам') || w.endsWith('ям')) return w.slice(0, -2);
                                                  if (w.endsWith('ов') || w.endsWith('ев') || w.endsWith('ин') || w.endsWith('ын')) return w.slice(0, -2);
                                                  if (w.endsWith('ах') || w.endsWith('ях')) return w.slice(0, -2);
                                        }
                                        if (w.length > 4) {
                                                  if (w.endsWith('ка') || w.endsWith('га') || w.endsWith('ха')) return w.slice(0, -1);
                                                  if (w.endsWith('ть') || w.endsWith('ти')) return w.slice(0, -2);
                                                  if (w.endsWith('ла') || w.endsWith('ло') || w.endsWith('ли')) return w.slice(0, -2);
                                                  if (w.endsWith('ет') || w.endsWith('ют') || w.endsWith('ят')) return w.slice(0, -2);
                                                  if (w.endsWith('ит') || w.endsWith('ат')) return w.slice(0, -2);
                                        }
                                        if (w.length > 3) {
                                                  if (w.endsWith('а') || w.endsWith('я') || w.endsWith('о') || w.endsWith('е') || 
                                                      w.endsWith('ы') || w.endsWith('и') || w.endsWith('у') || w.endsWith('ю')) {
                                                            return w.slice(0, -1);
                                                  }
                                        }
                                        return w;
                              };

                              const words = text.toLowerCase().split(/[^а-яёa-z]+/).filter(w => w.length > 1);
                              const stemmedWords = words.map(w => stemRussian(w));
                              const stemmedText = stemmedWords.join(' ');

                              const mechanisms = {
                                        denial: [
                                                  { pattern: /нет проблемы|всё хорошо|ничего страшного|no problem|everything is fine|nothing wrong|i'm fine|it's okay/i, weight: 0.2 },
                                                  { pattern: /я не (верю|принимаю)|i don't (believe|accept)/i, weight: 0.25 },
                                                  { pattern: /этого не может быть|it can't be|неправда|not true/i, weight: 0.3 },
                                                  { pattern: /ерунда|чепуха|глупости|nonsense|rubbish/i, weight: 0.15 }
                                        ],
                                        projection: [
                                                  { pattern: /ты сам|это ты|все вокруг|you are|it's you|everyone else|они все|they all/i, weight: 0.2 },
                                                  { pattern: /это не я, это|it's not me, it's|не я виноват, а|i'm not to blame, it's/i, weight: 0.25 },
                                                  { pattern: /на других|на окружающих|на всех|on others|on everyone/i, weight: 0.15 },
                                                  { pattern: /они меня (бесят|раздражают)|they annoy me/i, weight: 0.2 }
                                        ],
                                        rationalization: [
                                                  { pattern: /потому что|поэтому|так получилось|because|therefore|it happened|объясняется тем|explained by/i, weight: 0.2 },
                                                  { pattern: /на самом деле|на самом-то деле|actually|in fact/i, weight: 0.15 },
                                                  { pattern: /это (было|есть) необходимо|it was necessary|i had no choice|пришлось|had to/i, weight: 0.25 },
                                                  { pattern: /есть причины|there are reasons/i, weight: 0.2 }
                                        ],
                                        intellectualization: [
                                                  { pattern: /с теоретической точки|анализируя|рассматривая|from a theoretical perspective|analyzing|considering|with regard to|в контексте|in context/i, weight: 0.2 },
                                                  { pattern: /стоит отметить|следует заметить|it should be noted|it is worth mentioning/i, weight: 0.15 },
                                                  { pattern: /объективно|рационально|objectively|rationally/i, weight: 0.2 },
                                                  { pattern: /абстрагируясь|detached|dispassionate/i, weight: 0.25 }
                                        ],
                                        displacement: [
                                                  { pattern: /злюсь на|раздражает|бесит|angry at|irritated by|annoyed by|срываюсь на|take it out on/i, weight: 0.2 },
                                                  { pattern: /не на того|не на тех|on the wrong person|on the wrong people/i, weight: 0.25 },
                                                  { pattern: /перекладываю|blame shifting/i, weight: 0.2 }
                                        ]
                              };

                              const detected = [];

                              for (const [mechanism, patterns] of Object.entries(mechanisms)) {
                                        let score = 0;
                                        patterns.forEach(({ pattern, weight }) => {
                                                  const matches = stemmedText.match(pattern);
                                                  if (matches) {
                                                            score += matches.length * weight;
                                                  }
                                        });
                                        if (score > 0) {
                                                  detected.push({
                                                            mechanism: mechanism,
                                                            frequency: Math.round(score * 10) / 10,
                                                            intensity: Math.min(1, score / 4)
                                                  });
                                        }
                              }

                              const total = detected.length;
                              const overallIntensity = detected.length > 0 ? detected.reduce((sum, m) => sum + m.intensity, 0) / detected.length : 0;
                              const primaryMechanism = detected.length > 0 ? detected.sort((a, b) => b.intensity - a.intensity)[0].mechanism : 'none';

                              return {
                                        mechanisms: detected,
                                        total: total,
                                        overallIntensity: overallIntensity,
                                        primaryMechanism: primaryMechanism
                              };
        }
        
        calculatePsychologicalComplexity(plutchik, maslow, bigFive, ei, defense, biases, comm) {
                              const factors = [
                                        plutchik.emotionalDiversity * 0.25,
                                        maslow.needComplexity * 0.2,
                                        bigFive.complexity * 0.15,
                                        (ei?.overall || 0) * 0.1,
                                        (defense?.overallIntensity || 0) * 0.1,
                                        (biases?.overallIntensity || 0) * 0.1,
                                        (comm?.total || 0) / 4 * 0.1 
                              ];
                              const weightedSum = factors.reduce((a, b) => a + b, 0);
                              const complexity = Math.min(1, weightedSum);
                              return Math.round(complexity * 100) / 100;
        }
        
        assessSelfAwareness(text) {
                              const selfReflectionMarkers = [
                                        { pattern: /я думаю|я чувствую|я осознаю|i think|i feel|i realize|я понимаю|i understand|я размышляю|i ponder/gi, weight: 0.2 },
                                        { pattern: /я заметил|я понял|i noticed|i realized|до меня дошло|it dawned on me/gi, weight: 0.25 },
                                        { pattern: /мои мысли|мои чувства|my thoughts|my feelings/gi, weight: 0.2 }
                              ];
                              const metacognitionMarkers = [
                                        { pattern: /почему я|зачем я|что я чувствую|why (do|am) i|what (do|am) i feel|как я отношусь|how (do|) i feel about/gi, weight: 0.3 },
                                        { pattern: /анализирую себя|самоанализ|self-analysis|introspection/gi, weight: 0.25 },
                                        { pattern: /рефлексия|reflection/gi, weight: 0.2 }
                              ];

                              let selfReflectionScore = 0;
                              let metacognitionScore = 0;

                              selfReflectionMarkers.forEach(({ pattern, weight }) => {
                                        const matches = text.match(pattern);
                                        if (matches) selfReflectionScore += matches.length * weight;
                              });

                              metacognitionMarkers.forEach(({ pattern, weight }) => {
                                        const matches = text.match(pattern);
                                        if (matches) metacognitionScore += matches.length * weight;
                              });

                              const totalScore = Math.min(1, selfReflectionScore + metacognitionScore);
                              const level = totalScore > 0.5 ? 'high' : totalScore > 0.2 ? 'moderate' : 'low';

                              return {
                                        score: totalScore,
                                        selfReflection: Math.min(1, selfReflectionScore),
                                        metacognition: Math.min(1, metacognitionScore),
                                        level: level
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

        calculatePsychologicalDimensionScore(psychological) {
                        if (!psychological) return 0;
                        const factors = [
                            psychological.psychologicalComplexity || 0,
                            (psychological.selfAwarenessLevel && psychological.selfAwarenessLevel.score) || 0,
                            (psychological.emotionalIntelligence && psychological.emotionalIntelligence.score) || 0,
                            (psychological.defenseMechanisms && psychological.defenseMechanisms.intensity) || 0
                        ];
                        const validFactors = factors.filter(f => !isNaN(f) && f !== null && f !== undefined);
                        if (validFactors.length === 0) return 0;
                        return Math.min(1, validFactors.reduce((a, b) => a + b, 0) / validFactors.length);
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
                              const lexicalDominantRaw = analyses.lexical?.summary?.dominantCategory;
                              let lexicalEmotion = 'neutral';
                              let lexicalConfidence = 0;

                              if (lexicalDominantRaw && lexicalDominantRaw !== 'neutral') {
                                        if (typeof lexicalDominantRaw === 'object') {
                                                  lexicalEmotion = lexicalDominantRaw.primary || 'neutral';
                                                  lexicalConfidence = lexicalDominantRaw.confidence || 0;
                                        } else {
                                                  lexicalEmotion = lexicalDominantRaw;
                                                  lexicalConfidence = analyses.lexical?.summary?.lexicalDensity || 0.5;
                                        }
                                        if (lexicalConfidence > 0.6) {
                                                  return {
                                                            emotion: lexicalEmotion,
                                                            confidence: lexicalConfidence,
                                                            sources: ['lexical']
                                                  };
                                        }
                              }

                              const candidates = [];

                              if (lexicalEmotion !== 'neutral') {
                                        candidates.push({
                                                  source: 'lexical',
                                                  emotion: lexicalEmotion,
                                                  confidence: lexicalConfidence || 0.5
                                        });
                              }

                              const plutchikDominant = analyses.psychological?.plutchik?.primary?.emotion;
                              if (plutchikDominant && plutchikDominant !== 'neutral') {
                                        candidates.push({
                                                  source: 'psychological',
                                                  emotion: plutchikDominant,
                                                  confidence: analyses.psychological?.plutchik?.primary?.confidence || 0.5
                                        });
                              }

                              const semanticDominant = analyses.semantic?.progression?.arc;
                              if (semanticDominant && semanticDominant !== 'flat') {
                                        const mapped = this.mapArcToEmotion(semanticDominant);
                                        candidates.push({
                                                  source: 'semantic',
                                                  emotion: mapped,
                                                  confidence: analyses.semantic?.progression?.stability || 0.5
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
                              let maxTotalConfidence = 0;

                              for (const [emotion, group] of Object.entries(emotionGroups)) {
                                        const totalConfidence = group.reduce((sum, c) => sum + c.confidence, 0);
                                        if (totalConfidence > maxTotalConfidence) {
                                                  maxTotalConfidence = totalConfidence;
                                                  maxGroup = group;
                                                  dominantEmotion = emotion;
                                        }
                              }

                              const confidence = maxGroup.length > 0 ? maxGroup.reduce((sum, c) => sum + c.confidence, 0) / maxGroup.length : 0.5;

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
            const normalizedCategories = Math.min(1, categoryCount / 15);
            rangeFactors.push({ value: normalizedCategories, weight: 0.30 });
            
            const lexicalDistribution = analyses.lexical?.metrics?.distribution || 0;
            rangeFactors.push({ value: lexicalDistribution, weight: 0.25 });
            
            const complexEmotions = ['ambivalence', 'bittersweet', 'nostalgiaMixed', 'irony', 'nostalgia'];
            const complexCount = complexEmotions.filter(cat =>
              analyses.lexical?.categories?.[cat]
            ).length;
            const complexRatio = complexCount / complexEmotions.length;
            rangeFactors.push({ value: complexRatio, weight: 0.20 });
            
            const progressionComplexity = analyses.semantic?.progression?.metrics?.avgComplexity || 0;
            rangeFactors.push({ value: progressionComplexity, weight: 0.15 });
            
            const plutchikDiversity = analyses.psychological?.plutchik?.emotionalDiversity || 0;
            rangeFactors.push({ value: plutchikDiversity, weight: 0.15 });
            
            const positiveCategories = ['ecstasy', 'joy', 'love', 'peace', 'hope', 'gratitude', 'inspiration', 'pride'];
            const negativeCategories = ['sadness', 'grief', 'anger', 'fear', 'disgust', 'shame', 'guilt', 'loneliness', 'envy', 'despair'];
            
            const positiveCount = positiveCategories.filter(cat =>
              analyses.lexical?.categories?.[cat]
            ).length;
            const negativeCount = negativeCategories.filter(cat =>
              analyses.lexical?.categories?.[cat]
            ).length;
            
            const balanceRatio = positiveCount > 0 && negativeCount > 0 ? 
              1 - Math.abs(positiveCount - negativeCount) / (positiveCount + negativeCount) : 0;
            rangeFactors.push({ value: balanceRatio, weight: 0.20 });
            
            const volatility = analyses.semantic?.progression?.metrics?.volatility || 0;
            rangeFactors.push({ value: volatility, weight: 0.15 });
            
            const totalWeight = rangeFactors.reduce((sum, f) => sum + f.weight, 0);
            const weightedSum = rangeFactors.reduce((sum, f) => sum + f.value * f.weight, 0);
            const rawRange = totalWeight > 0 ? weightedSum / totalWeight : 0.3;
            
            const nonLinearRange = Math.pow(rawRange, 1.2);
            
            const variance = this.calculateVariance(rangeFactors.map(f => f.value));
            const varianceBonus = Math.min(0.25, variance * 1.0);
            
            const finalRange = Math.min(0.99, Math.max(0.05,
              nonLinearRange * (1 + varianceBonus)
            ));
            
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
                this.calculateAnalysisConfidence(analyses, 1), 
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
                              const dominantEmotionObj = integratedResult.dominantEmotion || { emotion: 'neutral', confidence: 0.5 };
                              const emotionalRange = integratedResult.emotionalRange || 0.5;
                              const emotionalDepth = integratedResult.emotionalDepth || 0.5;

                              const intensity = Math.max(0, Math.min(1, (
                                        Math.abs(totalScore) * 0.4 +
                                        emotionalRange * 0.3 +
                                        dominantEmotionObj.confidence * 0.3
                              )));

                              const primaryEmotion = this.classifyPrimaryEmotion(
                                        dominantEmotionObj.emotion,
                                        totalScore,
                                        emotionalRange,
                                        intensity,
                                        dominantEmotionObj.confidence
                              );

                              const secondaryEmotions = this.identifySecondaryEmotions(integratedResult);

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
        
        classifyPrimaryEmotion(dominantEmotion, totalScore, emotionalRange, intensity, confidence = 0.5) {

                              if (dominantEmotion && dominantEmotion !== 'neutral' && confidence > 0.4) {
                                        const emotionMapping = {
                                                  'ecstasy': 'ecstatic',
                                                  'joy': 'joyful',
                                                  'love': 'content',
                                                  'peace': 'calm',
                                                  'sadness': 'sad',
                                                  'grief': 'despairing',
                                                  'anger': 'angry',
                                                  'fear': 'anxious',
                                                  'surprise': 'exhilarated',
                                                  'anxiety': 'anxious',
                                                  'nostalgia': 'nostalgic',
                                                  'bittersweet': 'bittersweet',
                                                  'ambivalence': 'ambivalent',
                                                  'irony': 'ironic',
                                                  'calmness': 'calm',
                                                  'vulnerability': 'vulnerable',
                                                  'resilience': 'resilient'
                                        };
                                        if (emotionMapping[dominantEmotion]) {
                                                  return emotionMapping[dominantEmotion];
                                        }
                              }

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
                              if (totalScore > 0.1) category = 'positive';
                              else if (totalScore < -0.1) category = 'negative';

                              let level = 'mediumIntensity';
                              if (intensity > 0.7) level = 'highIntensity';
                              else if (intensity < 0.3) level = 'lowIntensity';

                              if (Math.abs(totalScore) <= 0.1 && emotionalRange > 0.6 && confidence <= 0.5) {
                                        category = 'complex';
                                        level = emotionalRange > 0.7 ? 'highComplexity' : 
                                               emotionalRange > 0.5 ? 'mediumComplexity' : 'lowComplexity';
                              }

                              const emotions = emotionMatrix[category]?.[level] || ['balanced'];
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
                                        nostalgic: 'Ностальгическое эхо',
                                        reflective: 'Глубокое размышление',
                                        contemplative: 'Созерцательное спокойствие',
                                        mixed: 'Смешанные чувства',
                                        ironic: 'Ироничный взгляд',
                                        vulnerable: 'Уязвимая нежность',
                                        resilient: 'Стойкая уверенность',
                                        enraged: 'Неистовая ярость',
                                        despairing: 'Всепоглощающее отчаяние',
                                        terrified: 'Леденящий ужас',
                                        subdued: 'Приглушённая тоска',
                                        pensive: 'Задумчивая печаль',
                                        resigned: 'Смиренное принятие',
                                        euphoric: 'Эйфорический восторг',
                                        exhilarated: 'Ошеломляющая радость',
                                        pleased: 'Тихая радость',
                                        satisfied: 'Довольное спокойствие',
                                        balanced: 'Сбалансированное состояние',
                                        detached: 'Отстранённое наблюдение'
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
                              const ruKeywordMap = {
                                        ecstatic: ['восторг', 'экстаз', 'эйфория', 'блаженство', 'ликование', 'упоение', 'неистовство', 'кульминация'],
                                        joyful: ['радость', 'счастье', 'ликование', 'веселье', 'праздник', 'торжество', 'свет', 'сияние'],
                                        happy: ['удовлетворение', 'благополучие', 'гармония', 'довольство', 'успех', 'достижение', 'радость жизни'],
                                        content: ['спокойствие', 'удовлетворение', 'баланс', 'уравновешенность', 'покой', 'тишина', 'принятие'],
                                        calm: ['мир', 'тишина', 'равновесие', 'умиротворение', 'безмятежность', 'релаксация', 'медитация', 'дзен'],
                                        pleased: ['довольство', 'удовлетворение', 'приятность', 'комфорт', 'уют', 'теплота'],
                                        satisfied: ['насыщение', 'исполнение', 'достаточность', 'полнота', 'завершённость'],
                                        
                                        angry: ['гнев', 'ярость', 'раздражение', 'негодование', 'злость', 'бешенство', 'озлобление', 'враждебность'],
                                        enraged: ['ярость', 'бешенство', 'неистовство', 'исступление', 'яростный', 'неконтролируемый гнев'],
                                        sad: ['грусть', 'печаль', 'тоска', 'скорбь', 'уныние', 'меланхолия', 'хандра', 'слезы', 'плач'],
                                        despairing: ['отчаяние', 'безысходность', 'безнадёжность', 'обречённость', 'крах', 'провал'],
                                        melancholic: ['меланхолия', 'рефлексия', 'созерцание', 'задумчивость', 'элегия', 'ностальгия'],
                                        anxious: ['тревога', 'беспокойство', 'опасение', 'нервозность', 'напряжение', 'страх', 'паника', 'переживание'],
                                        terrified: ['ужас', 'страх', 'боязнь', 'испуг', 'паника', 'кошмар', 'леденящий'],
                                        subdued: ['подавленность', 'угнетённость', 'апатия', 'безразличие', 'вялость', 'истощение'],
                                        pensive: ['задумчивость', 'размышление', 'рефлексия', 'созерцание', 'медитация', 'интроспекция'],
                                        resigned: ['смирение', 'принятие', 'покорность', 'безропотность', 'фатализм'],
                                        
                                        complex: ['противоречие', 'многослойность', 'глубина', 'нюансы', 'парадокс', 'амбивалентность', 'дилемма'],
                                        bittersweet: ['амбивалентность', 'смешанные чувства', 'контраст', 'горько-сладкий', 'двойственность', 'ностальгия'],
                                        nostalgic: ['воспоминания', 'прошлое', 'память', 'эхо', 'былое', 'минувшее', 'ретроспектива'],
                                        ambivalent: ['двойственность', 'противоречивость', 'неоднозначность', 'колебание', 'нерешительность'],
                                        ironic: ['ирония', 'сарказм', 'насмешка', 'парадокс', 'абсурд', 'гротеск'],
                                        reflective: ['рефлексия', 'самоанализ', 'интроспекция', 'размышление', 'осмысление'],
                                        contemplative: ['созерцание', 'медитация', 'погружение', 'отстранённость', 'наблюдение'],
                                        mixed: ['смешанные', 'противоречивые', 'неоднозначные', 'комплексные', 'многогранные'],
                                        vulnerable: ['уязвимость', 'ранимость', 'чувствительность', 'открытость', 'беззащитность'],
                                        resilient: ['стойкость', 'устойчивость', 'выносливость', 'сила', 'несгибаемость']
                              };

                              const enKeywordMap = {
                                        ecstatic: ['ecstasy', 'rapture', 'euphoria', 'bliss', 'jubilation', 'exhilaration', 'elation'],
                                        joyful: ['joy', 'happiness', 'delight', 'glee', 'merriment', 'celebration', 'light', 'radiance'],
                                        happy: ['satisfaction', 'well-being', 'harmony', 'contentment', 'success', 'achievement', 'joy of life'],
                                        content: ['calm', 'satisfaction', 'balance', 'equanimity', 'peace', 'silence', 'acceptance'],
                                        calm: ['peace', 'silence', 'balance', 'serenity', 'tranquility', 'relaxation', 'meditation', 'zen'],
                                        pleased: ['contentment', 'satisfaction', 'pleasure', 'comfort', 'coziness', 'warmth'],
                                        satisfied: ['fulfillment', 'completion', 'sufficiency', 'fullness', 'finality'],
                                        
                                        angry: ['anger', 'fury', 'irritation', 'indignation', 'rage', 'wrath', 'hostility'],
                                        enraged: ['fury', 'rage', 'frenzy', 'frenzy', 'uncontrollable anger'],
                                        sad: ['sadness', 'sorrow', 'melancholy', 'grief', 'despondency', 'gloom', 'tears', 'crying'],
                                        despairing: ['despair', 'hopelessness', 'desperation', 'doom', 'collapse', 'failure'],
                                        melancholic: ['melancholy', 'reflection', 'contemplation', 'pensiveness', 'elegy', 'nostalgia'],
                                        anxious: ['anxiety', 'worry', 'apprehension', 'nervousness', 'tension', 'fear', 'panic', 'concern'],
                                        terrified: ['terror', 'fear', 'dread', 'fright', 'panic', 'nightmare', 'chilling'],
                                        subdued: ['subdued', 'oppressed', 'apathy', 'indifference', 'lethargy', 'exhaustion'],
                                        pensive: ['pensiveness', 'thought', 'reflection', 'contemplation', 'meditation', 'introspection'],
                                        resigned: ['resignation', 'acceptance', 'submission', 'compliance', 'fatalism'],
                                        
                                        complex: ['contradiction', 'multi-layeredness', 'depth', 'nuances', 'paradox', 'ambivalence', 'dilemma'],
                                        bittersweet: ['ambivalence', 'mixed feelings', 'contrast', 'bittersweet', 'duality', 'nostalgia'],
                                        nostalgic: ['memories', 'past', 'memory', 'echo', 'bygone', 'retrospect', 'reminiscence'],
                                        ambivalent: ['duality', 'contradictoriness', 'ambiguity', 'hesitation', 'indecision'],
                                        ironic: ['irony', 'sarcasm', 'mockery', 'paradox', 'absurdity', 'grotesque'],
                                        reflective: ['reflection', 'self-analysis', 'introspection', 'thought', 'contemplation'],
                                        contemplative: ['contemplation', 'meditation', 'immersion', 'detachment', 'observation'],
                                        mixed: ['mixed', 'contradictory', 'ambiguous', 'complex', 'multifaceted'],
                                        vulnerable: ['vulnerability', 'sensitivity', 'openness', 'defenselessness'],
                                        resilient: ['resilience', 'fortitude', 'endurance', 'strength', 'unbending']
                              };

                              const defaultRu = ['эмоция', 'чувство', 'переживание', 'настроение', 'тон'];
                              const defaultEn = ['emotion', 'feeling', 'experience', 'mood', 'tone'];

                              const keywordMap = this.language === 'ru' ? ruKeywordMap : enKeywordMap;
                              const defaultKeywords = this.language === 'ru' ? defaultRu : defaultEn;

                              let keywords = [];

                              if (primary && keywordMap[primary]) {
                                        keywords = keywords.concat(keywordMap[primary]);
                              }

                              if (secondary && Array.isArray(secondary)) {
                                        secondary.forEach(sec => {
                                                  if (keywordMap[sec]) {
                                                            keywords = keywords.concat(keywordMap[sec]);
                                                  }
                                        });
                              }

                              if (keywords.length === 0) {
                                        keywords = defaultKeywords;
                              }

                              const uniqueKeywords = [...new Set(keywords)];
                              return uniqueKeywords.slice(0, 12);
        }
        
        generatePsychologicalInsights(integratedResult) {
                              const insights = {
                                        emotionalPatterns: this.identifyEmotionalPatterns(integratedResult),
                                        cognitiveStyle: this.assessCognitiveStyle(integratedResult),
                                        relationalPatterns: this.inferRelationalPatterns(integratedResult),
                                        personalGrowth: this.suggestPersonalGrowthPaths(integratedResult),
                                        therapeuticApproaches: this.recommendTherapeuticApproaches(integratedResult)
                              };

                              const summary = this.createPsychologicalSummary(insights);

                              return {
                                        insights: insights,
                                        summary: summary,
                                        confidence: integratedResult.confidenceScore,
                                        applicability: this.assessInsightApplicability(integratedResult),
                                        meta: {
                                                  timestamp: new Date().toISOString(),
                                                  language: this.language,
                                                  version: '2.0'
                                        }
                              };
        }
        
        identifyEmotionalPatterns(integratedResult) {
                              const patterns = [];
                              const lexical = integratedResult.details?.lexical;
                              const contextual = integratedResult.details?.contextual;
                              const psychological = integratedResult.details?.psychological;

                              if (integratedResult.consistencyScore > 0.8) {
                                        patterns.push('устойчивый эмоциональный фон');
                              } else if (integratedResult.consistencyScore < 0.3) {
                                        patterns.push('эмоциональная лабильность');
                              }

                              if (integratedResult.emotionalRange > 0.7) {
                                        patterns.push('широкий эмоциональный диапазон');
                              } else if (integratedResult.emotionalRange < 0.3) {
                                        patterns.push('суженный эмоциональный диапазон');
                              }

                              if (integratedResult.complexityScore > 0.7) {
                                        patterns.push('сложная эмоциональная палитра');
                              }

                              if (integratedResult.ironyLevel > 0.5) {
                                        patterns.push('ироничный взгляд на мир');
                              }

                              if (lexical?.categories) {
                                        const positiveCats = ['ecstasy', 'joy', 'love', 'peace', 'hope', 'gratitude', 'inspiration', 'pride'];
                                        const negativeCats = ['sadness', 'grief', 'anger', 'fear', 'disgust', 'shame', 'guilt', 'loneliness', 'envy', 'despair'];
                                        const complexCats = ['ambivalence', 'irony', 'nostalgiaMixed', 'bittersweet', 'nostalgia'];

                                        let positiveCount = 0, negativeCount = 0, complexCount = 0;
                                        
                                        Object.keys(lexical.categories).forEach(cat => {
                                                  if (positiveCats.includes(cat)) positiveCount++;
                                                  else if (negativeCats.includes(cat)) negativeCount++;
                                                  else if (complexCats.includes(cat)) complexCount++;
                                        });

                                        if (positiveCount > negativeCount * 2) {
                                                  patterns.push('преобладание позитивных эмоций');
                                        } else if (negativeCount > positiveCount * 2) {
                                                  patterns.push('преобладание негативных эмоций');
                                        } else if (positiveCount > 0 && negativeCount > 0) {
                                                  patterns.push('эмоциональная амбивалентность');
                                        }

                                        if (complexCount > 2) {
                                                  patterns.push('склонность к сложным, смешанным переживаниям');
                                        }
                              }

                              if (psychological?.plutchik?.basicEmotions) {
                                        const emotions = psychological.plutchik.basicEmotions;
                                        const strongEmotions = Object.entries(emotions)
                                                  .filter(([_, data]) => data.intensity > 0.3)
                                                  .map(([emotion]) => emotion);

                                        if (strongEmotions.length >= 4) {
                                                  patterns.push('эмоциональное разнообразие');
                                        }

                                        if (strongEmotions.includes('fear') && strongEmotions.includes('anxiety')) {
                                                  patterns.push('тревожный фон');
                                        }
                                        if (strongEmotions.includes('anger') && strongEmotions.includes('irritation')) {
                                                  patterns.push('повышенная раздражительность');
                                        }
                                        if (strongEmotions.includes('joy') && strongEmotions.includes('love')) {
                                                  patterns.push('эмоциональная теплота');
                                        }
                              }

                              if (contextual?.indicators) {
                                        if (contextual.indicators.negations > 5) {
                                                  patterns.push('склонность к отрицанию');
                                        }
                                        if (contextual.indicators.intensifiers > 5) {
                                                  patterns.push('эмоциональная экспрессивность');
                                        }
                                        if (contextual.indicators.understatement > 3) {
                                                  patterns.push('склонность к преуменьшению');
                                        }
                              }

                              if (this.language === 'en') {
                                        const enPatterns = {
                                                  'устойчивый эмоциональный фон': 'stable emotional background',
                                                  'эмоциональная лабильность': 'emotional lability',
                                                  'широкий эмоциональный диапазон': 'wide emotional range',
                                                  'суженный эмоциональный диапазон': 'narrowed emotional range',
                                                  'сложная эмоциональная палитра': 'complex emotional palette',
                                                  'ироничный взгляд на мир': 'ironic worldview',
                                                  'преобладание позитивных эмоций': 'predominance of positive emotions',
                                                  'преобладание негативных эмоций': 'predominance of negative emotions',
                                                  'эмоциональная амбивалентность': 'emotional ambivalence',
                                                  'склонность к сложным, смешанным переживаниям': 'tendency to complex mixed feelings',
                                                  'эмоциональное разнообразие': 'emotional diversity',
                                                  'тревожный фон': 'anxious background',
                                                  'повышенная раздражительность': 'increased irritability',
                                                  'эмоциональная теплота': 'emotional warmth',
                                                  'склонность к отрицанию': 'tendency to denial',
                                                  'эмоциональная экспрессивность': 'emotional expressiveness',
                                                  'склонность к преуменьшению': 'tendency to understatement',
                                                  'склонность к драматизации': 'tendency to dramatization',
                                                  'использование юмора': 'use of humor',
                                                  'умеренная эмоциональная выразительность': 'moderate emotional expressiveness'
                                        };
                                        return patterns.map(p => enPatterns[p] || p);
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
                              const lexical = integratedResult.details?.lexical;
                              const semantic = integratedResult.details?.semantic;
                              const contextual = integratedResult.details?.contextual;
                              const psychological = integratedResult.details?.psychological;

                              const styleFactors = {
                                        analytical: (
                                                  (integratedResult.complexityScore > 0.6 ? 0.4 : 0.1) +
                                                  (semantic?.coherence > 0.6 ? 0.3 : 0.1) +
                                                  (lexical?.metrics?.lexicalRichness > 0.5 ? 0.3 : 0.1)
                                        ),

                                        intuitive: (
                                                  (integratedResult.emotionalDepth > 0.5 ? 0.4 : 0.1) +
                                                  (semantic?.abstraction?.level > 0.6 ? 0.3 : 0.1) +
                                                  (lexical?.categories?.intensity ? 0.3 : 0.1)
                                        ),

                                        reflective: (
                                                  (psychological?.selfAwarenessLevel?.score > 0.5 ? 0.4 : 0.1) +
                                                  (psychological?.emotionalIntelligence?.components?.selfAwareness > 0.3 ? 0.3 : 0.1) +
                                                  (integratedResult.consistencyScore > 0.5 ? 0.3 : 0.1)
                                        ),

                                        practical: (
                                                  (semantic?.abstraction?.level < 0.4 ? 0.4 : 0.1) +
                                                  (contextual?.coherence > 0.5 ? 0.3 : 0.1) +
                                                  (lexical?.summary?.lexicalDensity > 0.3 ? 0.3 : 0.1)
                                        )
                              };

                              Object.keys(styleFactors).forEach(key => {
                                        styleFactors[key] = Math.min(1, styleFactors[key]);
                              });

                              const maxScore = Math.max(...Object.values(styleFactors));
                              const dominantStyle = Object.keys(styleFactors).find(
                                        key => styleFactors[key] === maxScore
                              );

                              const scores = Object.values(styleFactors);
                              const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
                              const variance = scores.reduce((sum, s) => sum + Math.pow(s - avg, 2), 0) / scores.length;
                              const flexibility = 1 - Math.min(1, variance * 2);

                              const styleNames = {
                                        analytical: this.language === 'ru' ? 'аналитический' : 'analytical',
                                        intuitive: this.language === 'ru' ? 'интуитивный' : 'intuitive',
                                        reflective: this.language === 'ru' ? 'рефлексивный' : 'reflective',
                                        practical: this.language === 'ru' ? 'практический' : 'practical'
                              };

                              return {
                                        style: styleNames[dominantStyle] || 'balanced',
                                        factors: styleFactors,
                                        flexibility: flexibility,
                                        description: this.getCognitiveStyleDescription(dominantStyle)
                              };
        }

        getCognitiveStyleDescription(style) {
                              const descriptions = {
                                        analytical: {
                                                  ru: 'Склонность к логическому анализу, структурированию информации, поиску закономерностей',
                                                  en: 'Tendency to logical analysis, structuring information, finding patterns'
                                        },
                                        intuitive: {
                                                  ru: 'Опора на интуицию, целостное восприятие, быстрые решения без детального анализа',
                                                  en: 'Reliance on intuition, holistic perception, quick decisions without detailed analysis'
                                        },
                                        reflective: {
                                                  ru: 'Склонность к самоанализу, рефлексии, глубокому осмыслению опыта',
                                                  en: 'Tendency to introspection, reflection, deep understanding of experience'
                                        },
                                        practical: {
                                                  ru: 'Ориентация на конкретные результаты, практическое применение знаний',
                                                  en: 'Focus on concrete results, practical application of knowledge'
                                        }
                              };
                              return descriptions[style]?.[this.language] || descriptions[style]?.en || '';
        }
        
        inferRelationalPatterns(integratedResult) {
                              const patterns = [];
                              const psychological = integratedResult.details?.psychological;
                              const contextual = integratedResult.details?.contextual;
                              const lexical = integratedResult.details?.lexical;
                              const { emotion } = integratedResult.dominantEmotion;

                              if (['joyful', 'happy', 'content', 'joy', 'love'].includes(emotion)) {
                                        patterns.push('склонность к позитивным взаимодействиям');
                                        patterns.push('открытость в общении');
                                        patterns.push('эмоциональная теплота в отношениях');
                              } else if (['sad', 'melancholic', 'sadness', 'grief'].includes(emotion)) {
                                        patterns.push('потребность в понимании и поддержке');
                                        patterns.push('глубина и искренность в отношениях');
                                        patterns.push('чувствительность к отвержению');
                              } else if (['angry', 'anxious', 'anger', 'fear', 'anxiety'].includes(emotion)) {
                                        patterns.push('защитная позиция в отношениях');
                                        patterns.push('потребность в безопасных границах');
                                        patterns.push('настороженность в новых контактах');
                              }

                              if (psychological?.communicationStyles) {
                                        const styles = psychological.communicationStyles;
                                        
                                        if (styles.assertive?.score > 0.3) {
                                                  patterns.push('способность отстаивать свои интересы');
                                        }
                                        if (styles.passive?.score > 0.3) {
                                                  patterns.push('склонность к уступчивости');
                                        }
                                        if (styles.aggressive?.score > 0.3) {
                                                  patterns.push('конфликтность в стрессовых ситуациях');
                                        }
                                        if (styles.manipulative?.score > 0.3) {
                                                  patterns.push('использование непрямых способов влияния');
                                        }
                              }

                              if (psychological?.cognitiveBiases) {
                                        const biases = psychological.cognitiveBiases;
                                        
                                        if (biases.mindReading?.intensity > 0.3) {
                                                  patterns.push('склонность приписывать мысли другим');
                                        }
                                        if (biases.personalization?.intensity > 0.3) {
                                                  patterns.push('тенденция принимать всё на свой счёт');
                                        }
                              }

                              if (contextual?.indicators) {
                                        if (contextual.indicators.negations > 3) {
                                                  patterns.push('склонность к конфронтации');
                                        }
                                        if (contextual.indicators.intensifiers > 3) {
                                                  patterns.push('эмоциональная экспрессивность в общении');
                                        }
                              }

                              if (psychological?.emotionalIntelligence?.components?.empathy > 0.3) {
                                        patterns.push('развитая эмпатия');
                              }

                              if (integratedResult.ironyLevel > 0.5) {
                                        patterns.push('использование иронии как способа дистанцирования');
                              }

                              const uniquePatterns = [...new Set(patterns)];

                              if (this.language === 'en') {
                                        const enPatterns = {
                                                  'склонность к позитивным взаимодействиям': 'tendency to positive interactions',
                                                  'открытость в общении': 'openness in communication',
                                                  'эмоциональная теплота в отношениях': 'emotional warmth in relationships',
                                                  'потребность в понимании и поддержке': 'need for understanding and support',
                                                  'глубина и искренность в отношениях': 'depth and sincerity in relationships',
                                                  'чувствительность к отвержению': 'sensitivity to rejection',
                                                  'защитная позиция в отношениях': 'defensive position in relationships',
                                                  'потребность в безопасных границах': 'need for safe boundaries',
                                                  'настороженность в новых контактах': 'caution in new contacts',
                                                  'способность отстаивать свои интересы': 'ability to assert one\'s interests',
                                                  'склонность к уступчивости': 'tendency to compliance',
                                                  'конфликтность в стрессовых ситуациях': 'conflictness in stressful situations',
                                                  'использование непрямых способов влияния': 'use of indirect influence',
                                                  'склонность приписывать мысли другим': 'tendency to attribute thoughts to others',
                                                  'тенденция принимать всё на свой счёт': 'tendency to take everything personally',
                                                  'склонность к конфронтации': 'tendency to confrontation',
                                                  'эмоциональная экспрессивность в общении': 'emotional expressiveness in communication',
                                                  'развитая эмпатия': 'developed empathy',
                                                  'использование иронии как способа дистанцирования': 'use of irony as a way of distancing',
                                                  'сбалансированный стиль общения': 'balanced communication style'
                                        };
                                        return uniquePatterns.map(p => enPatterns[p] || p);
                              }

                              return uniquePatterns.length > 0 ? uniquePatterns : ['сбалансированный стиль общения'];
        }
        
        suggestPersonalGrowthPaths(integratedResult) {
                              const paths = [];
                              const psychological = integratedResult.details?.psychological;
                              const lexical = integratedResult.details?.lexical;
                              const semantic = integratedResult.details?.semantic;

                              if (integratedResult.emotionalRange < 0.3) {
                                        paths.push('расширение эмоционального репертуара');
                              } else if (integratedResult.emotionalRange > 0.7 && integratedResult.consistencyScore < 0.4) {
                                        paths.push('развитие эмоциональной регуляции');
                              }

                              if (integratedResult.consistencyScore < 0.4) {
                                        paths.push('развитие эмоциональной стабильности');
                              }

                              if (integratedResult.complexityScore > 0.6) {
                                        paths.push('интеграция сложных эмоциональных переживаний');
                              }

                              if (psychological?.cognitiveBiases) {
                                        const biasCount = Object.keys(psychological.cognitiveBiases).length;
                                        if (biasCount > 3) {
                                                  paths.push('работа с когнитивными искажениями');
                                        }
                              }

                              if (semantic?.abstraction?.level > 0.7) {
                                        paths.push('развитие практического мышления');
                              } else if (semantic?.abstraction?.level < 0.3) {
                                        paths.push('развитие абстрактного мышления');
                              }

                              if (psychological?.communicationStyles) {
                                        const styles = psychological.communicationStyles;
                                        if (styles.aggressive?.score > 0.3) {
                                                  paths.push('развитие ассертивности');
                                        }
                                        if (styles.passive?.score > 0.3) {
                                                  paths.push('развитие уверенности в общении');
                                        }
                                        if (styles.manipulative?.score > 0.3) {
                                                  paths.push('развитие прямых способов коммуникации');
                                        }
                              }

                              const ei = psychological?.emotionalIntelligence;
                              if (ei) {
                                        if (ei.components.empathy < 0.3) {
                                                  paths.push('развитие эмпатии');
                                        }
                                        if (ei.components.socialSkills < 0.3) {
                                                  paths.push('развитие социальных навыков');
                                        }
                                        if (ei.components.emotionalRegulation < 0.3) {
                                                  paths.push('развитие навыков саморегуляции');
                                        }
                              }

                              if (psychological?.selfAwarenessLevel) {
                                        if (psychological.selfAwarenessLevel.score < 0.4) {
                                                  paths.push('развитие самосознания');
                                        } else if (psychological.selfAwarenessLevel.score > 0.7) {
                                                  paths.push('углубление самопознания');
                                        }
                              }

                              if (psychological?.psychologicalComplexity < 0.3) {
                                        paths.push('развитие психологической осознанности');
                              }

                              const uniquePaths = [...new Set(paths)];

                              if (this.language === 'en') {
                                        const enPaths = {
                                                  'расширение эмоционального репертуара': 'expanding emotional repertoire',
                                                  'развитие эмоциональной регуляции': 'developing emotional regulation',
                                                  'развитие эмоциональной стабильности': 'developing emotional stability',
                                                  'интеграция сложных эмоциональных переживаний': 'integration of complex emotional experiences',
                                                  'работа с когнитивными искажениями': 'working with cognitive distortions',
                                                  'развитие практического мышления': 'developing practical thinking',
                                                  'развитие абстрактного мышления': 'developing abstract thinking',
                                                  'развитие ассертивности': 'developing assertiveness',
                                                  'развитие уверенности в общении': 'developing confidence in communication',
                                                  'развитие прямых способов коммуникации': 'developing direct communication',
                                                  'развитие эмпатии': 'developing empathy',
                                                  'развитие социальных навыков': 'developing social skills',
                                                  'развитие навыков саморегуляции': 'developing self-regulation skills',
                                                  'развитие самосознания': 'developing self-awareness',
                                                  'углубление самопознания': 'deepening self-knowledge',
                                                  'развитие психологической осознанности': 'developing psychological awareness',
                                                  'гармонизация эмоциональной сферы': 'harmonization of emotional sphere'
                                        };
                                        return uniquePaths.map(p => enPaths[p] || p);
                              }

                              return uniquePaths.length > 0 ? uniquePaths : ['гармонизация эмоциональной сферы'];
        }
        
        recommendTherapeuticApproaches(integratedResult) {
                              const approaches = [];
                              const psychological = integratedResult.details?.psychological;
                              const lexical = integratedResult.details?.lexical;

                              if (psychological?.cognitiveBiases) {
                                        const biasCount = Object.keys(psychological.cognitiveBiases).length;
                                        if (biasCount > 2) {
                                                  approaches.push('когнитивно-поведенческая терапия (КПТ)');
                                        }
                              }

                              if (psychological?.defenseMechanisms) {
                                        const defenseCount = psychological.defenseMechanisms.mechanisms?.length || 0;
                                        if (defenseCount > 2) {
                                                  approaches.push('психодинамическая терапия');
                                        }
                              }

                              if (integratedResult.emotionalRange > 0.7 && integratedResult.consistencyScore < 0.4) {
                                        approaches.push('диалектическая поведенческая терапия (ДПТ)');
                              }

                              if (integratedResult.ironyLevel > 0.5) {
                                        approaches.push('когнитивно-поведенческая терапия (КПТ)');
                              }

                              if (integratedResult.emotionalDepth > 0.6) {
                                        approaches.push('глубинная психотерапия');
                                        approaches.push('психоанализ');
                              }

                              if (psychological?.maslow?.dominant) {
                                        const dominantNeed = psychological.maslow.dominant.level;
                                        if (dominantNeed === 'safety') {
                                                  approaches.push('терапия, ориентированная на безопасность');
                                        } else if (dominantNeed === 'love/belonging') {
                                                  approaches.push('интерперсональная терапия');
                                        } else if (dominantNeed === 'esteem') {
                                                  approaches.push('терапия самооценки');
                                        } else if (dominantNeed === 'self-actualization') {
                                                  approaches.push('экзистенциальная терапия');
                                                  approaches.push('гуманистическая терапия');
                                        }
                              }

                              if (psychological?.communicationStyles) {
                                        const styles = psychological.communicationStyles;
                                        if (styles.assertive?.score < 0.2) {
                                                  approaches.push('тренинг ассертивности');
                                        }
                                        if (styles.aggressive?.score > 0.3) {
                                                  approaches.push('тренинг управления гневом');
                                        }
                              }

                              if (integratedResult.complexityScore > 0.6) {
                                        if (!approaches.includes('гештальт-терапия')) {
                                                  approaches.push('гештальт-терапия');
                                        }
                                        if (!approaches.includes('экзистенциальная терапия')) {
                                                  approaches.push('экзистенциальная терапия');
                                        }
                              }

                              if (psychological?.selfAwarenessLevel?.score < 0.3) {
                                        approaches.push('майндфулнес');
                                  } else if (psychological?.selfAwarenessLevel?.score > 0.7) {
                                        approaches.push('терапия, ориентированная на инсайт');
                              }

                              const uniqueApproaches = [...new Set(approaches)];

                              if (this.language === 'en') {
                                        const enApproaches = {
                                                  'когнитивно-поведенческая терапия (КПТ)': 'cognitive-behavioral therapy (CBT)',
                                                  'психодинамическая терапия': 'psychodynamic therapy',
                                                  'диалектическая поведенческая терапия (ДПТ)': 'dialectical behavior therapy (DBT)',
                                                  'глубинная психотерапия': 'depth psychotherapy',
                                                  'психоанализ': 'psychoanalysis',
                                                  'терапия, ориентированная на безопасность': 'safety-focused therapy',
                                                  'интерперсональная терапия': 'interpersonal therapy',
                                                  'терапия самооценки': 'self-esteem therapy',
                                                  'экзистенциальная терапия': 'existential therapy',
                                                  'гуманистическая терапия': 'humanistic therapy',
                                                  'тренинг ассертивности': 'assertiveness training',
                                                  'тренинг управления гневом': 'anger management training',
                                                  'гештальт-терапия': 'gestalt therapy',
                                                  'майндфулнес': 'mindfulness',
                                                  'терапия принятия и ответственности': 'acceptance and commitment therapy (ACT)',
                                                  'общеукрепляющая психотерапия': 'general strengthening psychotherapy',
                                                  'терапия, ориентированная на инсайт': 'insight-oriented therapy'
                                        };
                                        return uniqueApproaches.map(a => enApproaches[a] || a);
                              }

                              return uniqueApproaches.length > 0 ? uniqueApproaches : ['общеукрепляющая психотерапия'];
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

