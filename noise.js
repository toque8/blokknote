(function() {
  'use strict';
  
  console.log('Noise universe v1.0 initialized');
  
  const NOISE_CONFIG = {
    VERSION: '1.0',
    WAVES: {
      mobile: { min: 5, max: 10 },
      desktop: { min: 10, max: 20 }
    },
    MOOD_LEVELS: {
      'calm': {
        name: 'calm',
        speed: 1.3,
        amplitude: 1.2,
        brightness: 1.0,
        energy: 1.2,
        audioSpeed: 1.1,
        audioPitch: 1.05,
        segmentCount: 12,
        interactionStrength: 0.8
      },
      'comfort': {
        name: 'comfort',
        speed: 1.1,
        amplitude: 1.0,
        brightness: 0.8,
        energy: 1.0,
        audioSpeed: 1.0,
        audioPitch: 1.0,
        segmentCount: 10,
        interactionStrength: 0.6
      },
      'balance': {
        name: 'balance',
        speed: 0.9,
        amplitude: 0.9,
        brightness: 0.6,
        energy: 0.9,
        audioSpeed: 0.9,
        audioPitch: 0.95,
        segmentCount: 8,
        interactionStrength: 0.4
      },
      'melancholy': {
        name: 'melancholy',
        speed: 0.7,
        amplitude: 0.7,
        brightness: 0.4,
        energy: 0.7,
        audioSpeed: 0.8,
        audioPitch: 0.9,
        segmentCount: 6,
        interactionStrength: 0.3
      },
      'depression': {
        name: 'depression',
        speed: 0.5,
        amplitude: 0.5,
        brightness: 0.2,
        energy: 0.5,
        audioSpeed: 0.7,
        audioPitch: 0.85,
        segmentCount: 4,
        interactionStrength: 0.2
      }
    }
  };
  
  const WORD_LISTS = {
    warmWords: {
      ru: [
        'радость', 'счастье', 'надежда', 'мечта', 'свет', 'тепло', 'улыбка', 'друг', 'семья', 'солнце', 
        'праздник', 'успех', 'победа', 'красота', 'гармония', 'доброта', 'добро', 'щедрость', 'верность', 
        'честность', 'мудрость', 'свобода', 'приключение', 'открытие', 'вдохновение', 'творчество', 
        'энергия', 'жизнь', 'здововье', 'благодарность', 'спокойствие', 'уют', 'комфорт', 'ласка', 
        'нежность', 'страсть', 'восторг', 'ликование', 'триумф', 'согласие', 'единство', 'дружба', 
        'поддержка', 'забота', 'опека', 'восхищение', 'признание', 'почет', 'уважение', 'доверие', 
        'понимание', 'сочувствие', 'созидание', 'благополучие', 'радушие', 'приветствие', 'ободрение', 
        'воодушевление', 'оптимизм', 'благочестие', 'чистота', 'невинность', 'целомудрие', 'кротость', 
        'усердие', 'старание', 'трудолюбие', 'упорство', 'терпение', 'выдержка', 'мужество', 'отвага', 
        'храбрость', 'героизм', 'самоотверженность', 'трепет', 'благословение', 'веселье', 'бодрость', 
        'сияние', 'просветление', 'процветание', 'свежесть', 'безмятежность', 'простодушие', 'искренность', 
        'открытость', 'теплота', 'радостный', 'счастливый', 'надежный', 'светлый', 'теплый', 'дружелюбный', 
        'родной', 'солнечный', 'праздничный', 'успешный', 'красивый', 'гармоничный', 'добрый', 'щедрый', 
        'верный', 'честный', 'мудрый', 'свободный', 'вдохновляющий', 'творческий', 'энергичный', 'здоровый', 
        'благодарный', 'спокойный', 'уютный', 'комфортный', 'ласковый', 'нежный', 'страстный', 'восторженный', 
        'единодушный', 'дружеский', 'заботливый', 'восхищающий', 'уважаемый', 'доверчивый', 'понимающий', 
        'сочувствующий', 'благополучный', 'благодатный', 'радушный', 'приветливый', 'ободряющий', 
        'воодушевленный', 'оптимистичный', 'благочестивый', 'чистый', 'невинный', 'целомудренный', 'кроткий', 
        'смиренный', 'усердный', 'прилежный', 'трудолюбивый', 'упорный', 'терпеливый', 'выдержанный', 
        'мужественный', 'отважный', 'храбрый', 'героический', 'самоотверженный', 'трепетный', 'веселый', 
        'бодрый', 'благоговейный', 'сияющий', 'процветающий', 'безмятежный', 'благодушный', 'искренний', 
        'открытый', 'непорочный', 'незапятнанный', 'безупречный', 'безгрешный', 'добродетельный', 'благородный', 
        'великодушный', 'гостеприимный', 'приветный', 'радоваться', 'наслаждаться', 'надеяться', 'мечтать', 
        'светить', 'греть', 'улыбаться', 'дружить', 'любить', 'праздновать', 'побеждать', 'украшать', 'дарить', 
        'верить', 'постигать', 'освобождать', 'открывать', 'вдохновлять', 'творить', 'жить', 'благодарить', 
        'успокаивать', 'утешать', 'ласкать', 'нежиться', 'восхищаться', 'соглашаться', 'объединять', 
        'поддерживать', 'заботиться', 'опекать', 'признавать', 'почитать', 'уважать', 'доверять', 'понимать', 
        'принимать', 'сочувствовать', 'благословлять', 'веселиться', 'воодушевлять', 'просветлять', 'сиять', 
        'процветать', 'веселить', 'прощать', 'теплеть', 'светлеть', 'благородствовать', 'приветствовать', 
        'возвышать', 'воспарять', 'расцветать', 'оживать', 'оживлять', 'окрылять', 'облагораживать', 
        'покровительствовать', 'прославлять', 'прочувствовать', 'чувствовать', 'радостно', 'счастливо', 
        'надежно', 'светло', 'дружелюбно', 'солнечно', 'весело', 'празднично', 'успешно', 'красиво', 
        'гармонично', 'щедро', 'верно', 'честно', 'мудро', 'свободно', 'вдохновенно', 'творчески', 'энергично', 
        'благодарно', 'спокойно', 'уютно', 'комфортно', 'ласково', 'нежно', 'страстно', 'восторженно', 
        'единогласно', 'дружески', 'заботливо', 'восхищенно', 'уважительно', 'доверчиво', 'понимающе', 
        'сочувственно', 'благополучно', 'радушно', 'приветливо', 'ободряюще', 'воодушевляюще', 'оптимистично', 
        'чисто', 'невинно', 'целомудренно', 'кротко', 'смиренне', 'усердно', 'прилежно', 'трудолюбиво', 
        'упорно', 'терпеливо', 'выдержанно', 'мужественно', 'отважно', 'храбро', 'героически', 'самоотверженно', 
        'трепетно', 'бодро', 'безмятежно', 'искренне', 'открыто', 'непорочно', 'безупречно', 'безгрешно', 
        'благородно', 'великодушно', 'гостеприимно', 'возвышенно', 'любовь', 'мир', 'весна'
      ],
      en: [
        'joy', 'happiness', 'hope', 'dream', 'light', 'warmth', 'smile', 'friend', 'family', 'sun', 
        'celebration', 'success', 'victory', 'beauty', 'harmony', 'kindness', 'generosity', 'loyalty', 
        'honesty', 'wisdom', 'freedom', 'adventure', 'discovery', 'inspiration', 'creativity', 'energy', 
        'life', 'health', 'gratitude', 'calm', 'coziness', 'comfort', 'affection', 'tenderness', 'passion', 
        'delight', 'triumph', 'agreement', 'unity', 'friendship', 'support', 'care', 'guardianship', 
        'admiration', 'recognition', 'honor', 'respect', 'trust', 'understanding', 'compassion', 
        'peacemaking', 'prosperity', 'grace', 'blessing', 'welcome', 'greeting', 'encouragement', 
        'enthusiasm', 'optimism', 'piety', 'purity', 'innocence', 'chastity', 'meekness', 'humility', 
        'zeal', 'diligence', 'assiduity', 'industriousness', 'perseverance', 'patience', 'endurance', 
        'courage', 'valor', 'bravery', 'heroism', 'selflessness', 'reverence', 'merriment', 'vigor', 
        'buoyancy', 'radiance', 'enlightenment', 'flourishing', 'wellbeing', 'freshness', 'tranquility', 
        'glee', 'joyfulness', 'goodwill', 'trustfulness', 'naivety', 'sincerity', 'openness', 'joyful', 
        'happy', 'hopeful', 'bright', 'warm', 'friendly', 'dear', 'sunny', 'festive', 'successful', 
        'beautiful', 'harmonious', 'kind', 'generous', 'loyal', 'honest', 'wise', 'free', 'inspiring', 
        'creative', 'energetic', 'healthy', 'grateful', 'calm', 'cozy', 'comfortable', 'affectionate', 
        'tender', 'passionate', 'delighted', 'unanimous', 'caring', 'admiring', 'respected', 'trusting', 
        'understanding', 'compassionate', 'peacemaking', 'prosperous', 'gracious', 'welcoming', 
        'encouraging', 'enthusiastic', 'optimistic', 'pious', 'pure', 'innocent', 'chaste', 'meek', 
        'humble', 'zealous', 'diligent', 'assiduous', 'industrious', 'persevering', 'patient', 'enduring', 
        'courageous', 'valiant', 'brave', 'heroic', 'selfless', 'reverent', 'merry', 'vibrant', 'radiant', 
        'flourishing', 'tranquil', 'trusting', 'naive', 'sincere', 'open', 'immaculate', 'unblemished', 
        'impeccable', 'sinless', 'virtuous', 'noble', 'magnanimous', 'cordial', 'enjoy', 'hope', 'dream', 
        'shine', 'warm', 'smile', 'befriend', 'love', 'celebrate', 'win', 'decorate', 'harmonize', 'give', 
        'believe', 'think', 'comprehend', 'free', 'discover', 'inspire', 'create', 'live', 'thank', 'calm', 
        'caress', 'cherish', 'admire', 'agree', 'unite', 'support', 'care', 'protect', 'recognize', 
        'respect', 'trust', 'understand', 'sympathize', 'bless', 'merrymake', 'delight', 'optimize', 
        'enlighten', 'purify', 'radiate', 'flourish', 'prosper', 'cheer', 'forgive', 'brighten', 'greet', 
        'elevate', 'soar', 'blossom', 'revive', 'inspire', 'ennoble', 'proclaim', 'expect', 'patronize', 
        'praise', 'deeply feel', 'joyfully', 'happily', 'hopefully', 'brightly', 'warmly', 'friendly', 
        'dearly', 'sunnily', 'cheerfully', 'festively', 'successfully', 'beautifully', 'harmoniously', 
        'kindly', 'generously', 'loyally', 'honestly', 'wisely', 'freely', 'inspiringly', 'creatively', 
        'healthily', 'gratefully', 'calmly', 'cozily', 'comfortably', 'affectionately', 'tenderly', 
        'passionately', 'delightedly', 'unanimously', 'caringly', 'admiringly', 'respectfully', 
        'trustingly', 'understandingly', 'compassionately', 'peacemakingly', 'prosperously', 'graciously', 
        'welcomingly', 'encouragingly', 'enthusiastically', 'optimistically', 'piously', 'purely', 
        'innocently', 'chastely', 'meekly', 'humbly', 'zealously', 'diligently', 'assiduously', 
        'industriously', 'perseveringly', 'patiently', 'enduringly', 'courageously', 'valiantly', 
        'bravely', 'heroically', 'selflessly', 'reverently', 'merrily', 'vibrantly', 'radiantly', 
        'flourishingly', 'tranquilly', 'good-naturedly', 'trustingly', 'sincerely', 'openly', 'warmly', 
        'immaculately', 'impeccably', 'sinlessly', 'virtuously', 'nobly', 'magnanimously', 'cordially', 
        'sublimely', 'love', 'peace', 'spring'
      ]
    },
    darkWords: {
      ru: [
        'грусть', 'боль', 'смерть', 'тьма', 'страх', 'одиночество', 'тоска', 'печаль', 'разочарование', 
        'потеря', 'ночь', 'горе', 'беда', 'несчастье', 'трагедия', 'катастрофа', 'агония', 'мучение', 
        'пытка', 'истязание', 'унижение', 'предательство', 'измена', 'ложь', 'обман', 'ненависть', 'злоба', 
        'ярость', 'гнев', 'ревность', 'зависть', 'жадность', 'скупость', 'эгоизм', 'равнодушие', 'холод', 
        'лед', 'мороз', 'туман', 'туча', 'гроза', 'ураган', 'разрушение', 'крах', 'провал', 'поражение', 
        'позор', 'стыд', 'вина', 'раскаяние', 'сожаление', 'отчаяние', 'безысходность', 'мрак', 'уныние', 
        'тлен', 'немощь', 'несправедливость', 'зло', 'коварство', 'вероломство', 'подлость', 'жестокость', 
        'беспощадность', 'безжалостность', 'бездушность', 'безразличие', 'неумолимость', 'беспросветность', 
        'безрадостность', 'безнадежность', 'безволие', 'бессилие', 'беззащитность', 'беспомощность', 
        'безвыходность', 'скорбь', 'горечь', 'ожесточение', 'безутешность', 'мрачность', 'угрюмость', 
        'тоскливость', 'хмурость', 'пессимизм', 'угроза', 'опасность', 'риск', 'бедствие', 'страдание', 
        'мука', 'плач', 'слезы', 'рыдание', 'вопль', 'неприятность', 'трагизм', 'гнет', 'угнетение', 
        'мученичество', 'неволя', 'принуждение', 'насилие', 'притеснение', 'изгнание', 'изоляция', 
        'отверженность', 'забвение', 'заброшенность', 'небрежность', 'пренебрежение', 'презрение', 
        'грустный', 'болезненный', 'смертный', 'темный', 'страшный', 'одинокий', 'тоскливый', 'печальный', 
        'разочарованный', 'потерянный', 'горестный', 'бедственный', 'несчастный', 'трагический', 
        'катастрофический', 'мучительный', 'истязующий', 'унизительный', 'предательский', 'лживый', 
        'обманчивый', 'ненавистный', 'злобный', 'яростный', 'гневный', 'ревнивый', 'завистливый', 'жадный', 
        'скупой', 'эгоистичный', 'равнодушный', 'холодный', 'ледяной', 'морозный', 'туманный', 'грозовой', 
        'ураганный', 'разрушительный', 'провальный', 'позорный', 'стыдный', 'виновный', 'сожалеющий', 
        'отчаянный', 'безысходный', 'мрачный', 'унылый', 'тленный', 'немощный', 'несправедливый', 'коварный', 
        'вероломный', 'подлый', 'жестокий', 'беспощадный', 'безжалостный', 'бездушный', 'бесчувственный', 
        'безразличный', 'немилосердный', 'неумолимый', 'беспросветный', 'безрадостный', 'безнадежный', 
        'безвольный', 'бессильный', 'беззащитный', 'беспомощный', 'безвыходный', 'скорбный', 'горький', 
        'озлобленный', 'ожесточенный', 'безутешный', 'хмурый', 'угрюмый', 'угрожающий', 'опасный', 
        'рискованный', 'неблагоприятный', 'неприятный', 'обидный', 'огорчающий', 'раздражающий', 
        'разочаровывающий', 'недовольный', 'неудовлетворенный', 'пренебрежительный', 'небрежный', 
        'заброшенный', 'забытый', 'презренный', 'униженный', 'оскорбленный', 'обиженный', 'недооцененный', 
        'непризнанный', 'покинутый', 'брошенный', 'отвергнутый', 'проклятый', 'грустить', 'болеть', 
        'умирать', 'темнеть', 'страшиться', 'тосковать', 'печалиться', 'разочаровываться', 'терять', 
        'горевать', 'бедствовать', 'мучиться', 'пытать', 'истязать', 'унижать', 'предавать', 'изменять', 
        'лгать', 'обманывать', 'ненавидеть', 'гневаться', 'ревновать', 'завидовать', 'жадничать', 'скупиться', 
        'холодеть', 'леденеть', 'морозить', 'грозить', 'разрушать', 'проваливаться', 'позориться', 'стыдиться', 
        'сожалеть', 'отчаиваться', 'унывать', 'тлеть', 'злорадствовать', 'коварствовать', 'вероломствовать', 
        'жесточить', 'бездушничать', 'скорбеть', 'горчить', 'ожесточать', 'мрачнеть', 'хмуриться', 
        'угрюмничать', 'горевать', 'угрожать', 'опасаться', 'рисковать', 'бедствовать', 'обижать', 'огорчать', 
        'раздражать', 'разочаровывать', 'пренебрегать', 'забрасывать', 'забывать', 'презирать', 'унижать', 
        'оскорблять', 'недооценивать', 'покидать', 'бросать', 'отвергать', 'проклинать', 'грустно', 
        'болезненно', 'темно', 'страшно', 'одиноко', 'тоскливо', 'печально', 'разочарованно', 'потерянно', 
        'горестно', 'бедственно', 'несчастно', 'трагически', 'катастрофически', 'мучительно', 'унизительно', 
        'предательски', 'изменнически', 'лживо', 'обманчиво', 'ненавистно', 'злобно', 'яростно', 'гневно', 
        'ревниво', 'завистливо', 'жадно', 'скупо', 'эгоистично', 'равнодушно', 'холодно', 'морозно', 
        'туманно', 'ураганно', 'разрушительно', 'провально', 'позорно', 'стыдно', 'отчаянно', 'мрачно', 
        'уныло', 'тленно', 'немощно', 'несправедливо', 'злорадно', 'коварно', 'вероломно', 'подло', 
        'жестоко', 'жестко', 'беспощадно', 'безжалостно', 'бездушно', 'бесчувственно', 'безразлично', 
        'немилосердно', 'неумолимо', 'беспросветно', 'безрадостно', 'безнадежно', 'безвольно', 'бессильно', 
        'беззащитно', 'беспомощно', 'безвыходно', 'скорбно', 'горько', 'озлобленно', 'ожесточенно', 
        'безутешно', 'хмуро', 'угрюмо', 'безотрадно', 'угрожающе', 'опасно', 'рискованно', 'бедственно', 
        'неблагоприятно', 'неприятно', 'обидно', 'огорчающе', 'раздражающе', 'разочаровывающе', 'недовольно', 
        'неудовлетворенно', 'неудовлетворительно', 'пренебрежительно', 'небрежно', 'заброшенно', 'забыто', 
        'презрительно', 'уничижительно', 'оскорбительно', 'обидчиво', 'покинуто', 'брошенно', 'отверженно', 
        'проклято', 'зима', 'дождь', 'дождливо'
      ],
      en: [
        'sadness', 'pain', 'death', 'darkness', 'fear', 'loneliness', 'longing', 'sorrow', 'disappointment', 
        'loss', 'night', 'winter', 'rain', 'grief', 'trouble', 'misfortune', 'tragedy', 'disaster', 'agony', 
        'torment', 'torture', 'humiliation', 'betrayal', 'treason', 'lie', 'deception', 'hatred', 'malice', 
        'fury', 'anger', 'jealousy', 'envy', 'greed', 'stinginess', 'selfishness', 'indifference', 'cold', 
        'ice', 'frost', 'fog', 'cloud', 'storm', 'hurricane', 'destruction', 'collapse', 'failure', 'defeat', 
        'shame', 'guilt', 'remorse', 'regret', 'despair', 'hopelessness', 'gloom', 'desolation', 'decay', 
        'weakness', 'injustice', 'treachery', 'perfidy', 'baseness', 'cruelty', 'mercilessness', 
        'ruthlessness', 'insensitivity', 'heartlessness', 'callousness', 'pitilessness', 'implacability', 
        'bleakness', 'futility', 'embitterment', 'hardening', 'melancholy', 'mourning', 'menace', 'peril', 
        'risk', 'calamity', 'injustice', 'suffering', 'affliction', 'misery', 'woe', 'weeping', 'tears', 
        'sobbing', 'screaming', 'groaning', 'adversity', 'affliction', 'tragicism', 'bitterness', 'oppression', 
        'tyranny', 'martyrdom', 'bondage', 'constraint', 'violence', 'persecution', 'exile', 'isolation', 
        'rejection', 'oblivion', 'neglect', 'abandonment', 'indifference', 'disregard', 'contempt', 'disdain', 
        'sad', 'painful', 'mortal', 'dark', 'fearful', 'lonely', 'melancholy', 'sorrowful', 'disappointed', 
        'lost', 'nocturnal', 'wintry', 'rainy', 'grievous', 'troubled', 'unfortunate', 'tragic', 'disastrous', 
        'agonizing', 'tormenting', 'torturous', 'humiliating', 'treacherous', 'treasonous', 'lying', 
        'deceptive', 'hateful', 'malicious', 'furious', 'angry', 'jealous', 'envious', 'greedy', 'stingy', 
        'selfish', 'indifferent', 'cold', 'icy', 'frosty', 'foggy', 'stormy', 'destructive', 'collapsing', 
        'failing', 'defeated', 'shameful', 'guilty', 'remorseful', 'regretful', 'desperate', 'hopeless', 
        'gloomy', 'desolate', 'decaying', 'weak', 'unjust', 'treacherous', 'perfidious', 'base', 'cruel', 
        'merciless', 'ruthless', 'insensitive', 'heartless', 'callous', 'pitiless', 'implacable', 'bleak', 
        'dreadful', 'futile', 'powerless', 'helpless', 'hopeless', 'willless', 'defenseless', 'inevitable', 
        'mournful', 'bitter', 'embittered', 'hardened', 'dreary', 'gloomy', 'melancholic', 'sorrowful', 
        'grieving', 'sad', 'cheerless', 'menacing', 'perilous', 'risky', 'calamitous', 'unfortunate', 
        'disastrous', 'unfavorable', 'unpleasant', 'offensive', 'distressing', 'annoying', 'disappointing', 
        'dissatisfied', 'displeased', 'contemptuous', 'careless', 'abandoned', 'forgotten', 'despised', 
        'neglected', 'contemptible', 'humiliated', 'insulted', 'offended', 'undervalued', 'unrecognized', 
        'abandoned', 'forsaken', 'rejected', 'cursed', 'sadden', 'hurt', 'die', 'darken', 'fear', 'be lonely', 
        'long', 'grieve', 'disappoint', 'lose', 'mourn', 'trouble', 'agonize', 'torment', 'torture', 
        'humiliate', 'betray', 'commit treason', 'lie', 'deceive', 'hate', 'be malicious', 'fume', 'be angry', 
        'be jealous', 'envy', 'be greedy', 'be stingy', 'be selfish', 'be indifferent', 'grow cold', 
        'freeze', 'storm', 'destroy', 'collapse', 'fail', 'be defeated', 'be ashamed', 'feel guilty', 
        'feel remorse', 'regret', 'despair', 'be hopeless', 'gloom', 'be desolate', 'decay', 'weaken', 
        'be unjust', 'be treacherous', 'be perfidious', 'be base', 'be cruel', 'be merciless', 'be ruthless', 
        'be insensitive', 'be heartless', 'be callous', 'be pitiless', 'be implacable', 'be bleak', 
        'be dreadful', 'be futile', 'be powerless', 'be helpless', 'be hopeless', 'be willless', 
        'be defenseless', 'be inevitable', 'mourn', 'be bitter', 'be embittered', 'harden', 'be dreary', 
        'be gloomy', 'be melancholic', 'be sorrowful', 'grieve', 'be sad', 'be cheerless', 'menace', 
        'endanger', 'risk', 'be unfortunate', 'be disastrous', 'be unfavorable', 'be unpleasant', 'offend', 
        'distress', 'annoy', 'disappoint', 'dissatisfy', 'displease', 'contemn', 'neglect', 'disregard', 
        'abandon', 'forget', 'despise', 'humiliate', 'insult', 'offend', 'undervalue', 'fail to recognize', 
        'abandon', 'forsake', 'reject', 'curse', 'condemn', 'sadly', 'painfully', 'mortally', 'darkly', 
        'fearfully', 'lonelily', 'longingly', 'sorrowfully', 'disappointedly', 'lostly', 'nocturnally', 
        'wintrily', 'rainily', 'grievously', 'troubledly', 'unfortunately', 'tragically', 'disastrously', 
        'agonizingly', 'tormentingly', 'torturously', 'humiliatingly', 'treacherously', 'treasonously', 
        'deceptively', 'hatefully', 'maliciously', 'furiously', 'angrily', 'jealously', 'enviously', 
        'greedily', 'stingily', 'selfishly', 'indifferently', 'coldly', 'icily', 'frostily', 'foggily', 
        'stormily', 'destructively', 'collapsingly', 'failingly', 'defeatedly', 'shamefully', 'guiltily', 
        'remorsefully', 'regretfully', 'desperately', 'hopelessly', 'gloomily', 'desolately', 'decayingly', 
        'weakly', 'unjustly', 'treacherously', 'perfidiously', 'basely', 'cruelly', 'mercilessly', 
        'ruthlessly', 'insensitively', 'heartlessly', 'callously', 'pitilessly', 'implacably', 'bleakly', 
        'dreadfully', 'futilely', 'powerlessly', 'helplessly', 'hopelessly', 'willlessly', 'defenselessly', 
        'inevitably', 'mournfully', 'bitterly', 'embitteredly', 'hardenedly', 'drearily', 'gloomily', 
        'melancholically', 'sorrowfully', 'grievingly', 'sadly', 'cheerlessly', 'menacingly', 'perilously', 
        'riskily', 'calamitously', 'unfortunately', 'disastrously', 'unfavorably', 'unpleasantly', 
        'offensively', 'distressingly', 'annoyingly', 'disappointingly', 'dissatisfyingly', 'displeasingly', 
        'contemptuously', 'carelessly', 'abandonedly', 'forgottenly', 'despisely', 'neglectingly', 
        'contemptibly', 'humiliatingly', 'insultingly', 'offensively', 'undervaluingly', 'unrecognizably', 
        'abandonedly', 'forsakenly', 'rejectingly', 'cursedly'
      ]
    }
  };
  
  class TextAnalyzer {
    constructor(text = '') {
      this.text = text.trim();
      this.sessionId = this.generateSessionId();
      this.seed = this.generateSeed();
      this.language = this.detectLanguage();
      this.stats = this.calculateTextStats();
      this.mood = this.analyzeSensitivity();
      this.waveCount = this.generateWaveCount();
      this.colorPalette = this.generateColorPalette(100);
      this.creationTime = Date.now();
    }
    
    generateSessionId() {
      const chars = '0123456789abcdefghijklmnopqrstuvwxyz';
      let id = 'textuniverse-';
      for (let i = 0; i < 10; i++) {
        id += chars[Math.floor(Math.random() * chars.length)];
      }
      return id;
    }
    
    generateSeed() {
      const sources = [
        Date.now(),
        performance.now(),
        navigator.userAgent.length,
        window.innerWidth,
        window.innerHeight,
        this.text.length,
        this.text.split('').reduce((a, b) => a + b.charCodeAt(0), 0)
      ];
      
      let seed = 0;
      sources.forEach((value, i) => {
        seed = ((seed << 5) - seed + value) >>> 0;
      });
      return seed;
    }
    
    detectLanguage() {
      const ruChars = this.text.match(/[а-яА-ЯёЁ]/g) || [];
      const enChars = this.text.match(/[a-zA-Z]/g) || [];
      if (ruChars.length > enChars.length * 1.2) return 'ru';
      if (enChars.length > ruChars.length * 1.2) return 'en';
      return 'mixed';
    }
    
    calculateTextStats() {
      const stats = {
        symbols: this.text.length,
        words: 0,
        uniqueWords: 0
      };
      
      if (this.text.length > 0) {
        const words = this.text
          .toLowerCase()
          .replace(/[^\p{L}\s]/gu, ' ')
          .split(/\s+/)
          .filter(w => w.length > 1);
        stats.words = words.length;
        stats.uniqueWords = [...new Set(words)].length;
      }
      
      return stats;
    }
    
    analyzeSensitivity() {
      if (this.text.length === 0) return 'balance';
      
      const textLower = this.text.toLowerCase();
      let warmCount = 0;
      let darkCount = 0;
      
      ['ru', 'en'].forEach(lang => {
        if (WORD_LISTS.warmWords[lang]) {
          WORD_LISTS.warmWords[lang].forEach(word => {
            const regex = new RegExp(`(^|[^\\p{L}])${this.escapeRegExp(word)}([^\\p{L}]|$)`, 'giu');
            const matches = textLower.match(regex);
            if (matches) warmCount += matches.length;
          });
        }
        
        if (WORD_LISTS.darkWords[lang]) {
          WORD_LISTS.darkWords[lang].forEach(word => {
            const regex = new RegExp(`(^|[^\\p{L}])${this.escapeRegExp(word)}([^\\p{L}]|$)`, 'giu');
            const matches = textLower.match(regex);
            if (matches) darkCount += matches.length;
          });
        }
      });
      
      if (warmCount === 0 && darkCount === 0) return 'balance';
      
      const totalWords = this.stats.words || 1;
      const warmRatio = warmCount / totalWords;
      const darkRatio = darkCount / totalWords;
      
      if (warmRatio > 0.7 && darkRatio < 0.15) return 'calm';
      if (warmRatio > 0.55) return 'comfort';
      if (darkRatio > 0.7 && warmRatio < 0.15) return 'depression';
      if (darkRatio > 0.55) return 'melancholy';
      if (Math.abs(warmRatio - darkRatio) < 0.15) return 'balance';
      
      return warmRatio > darkRatio ? 'comfort' : 'melancholy';
    }
    
    escapeRegExp(string) {
      return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
    
    generateWaveCount() {
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
      const range = isMobile ? NOISE_CONFIG.WAVES.mobile : NOISE_CONFIG.WAVES.desktop;
      const rng = this.createRNG();
      return Math.floor(rng(range.min, range.max + 1));
    }
    
    generateColorPalette(count) {
      const palette = [];
      const rng = this.createRNG();
      const mood = this.mood;
      
      for (let i = 0; i < count; i++) {
        let h, s, l;
        
        switch(mood) {
          case 'calm':
            h = rng(0, 60) + (Math.random() > 0.5 ? 300 : 0);
            s = rng(70, 100);
            l = rng(60, 80);
            break;
          case 'comfort':
            h = rng(20, 80);
            s = rng(60, 90);
            l = rng(50, 70);
            break;
          case 'balance':
            h = rng(0, 360);
            s = rng(40, 70);
            l = rng(40, 60);
            break;
          case 'melancholy':
            h = rng(180, 270);
            s = rng(30, 50);
            l = rng(30, 45);
            break;
          case 'depression':
            h = rng(200, 280);
            s = rng(20, 40);
            l = rng(20, 35);
            break;
          default:
            h = rng(0, 360);
            s = rng(40, 70);
            l = rng(40, 60);
        }
        
        palette.push(this.hslToHex(h, s, l));
      }
      
      return palette;
    }
    
    hslToHex(h, s, l) {
      h /= 360;
      s /= 100;
      l /= 100;
      
      let r, g, b;
      
      if (s === 0) {
        r = g = b = l;
      } else {
        const hue2rgb = (p, q, t) => {
          if (t < 0) t += 1;
          if (t > 1) t -= 1;
          if (t < 1/6) return p + (q - p) * 6 * t;
          if (t < 1/2) return q;
          if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
          return p;
        };
        
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
      }
      
      const toHex = x => {
        const hex = Math.round(x * 255).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      };
      
      return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    }
    
    createRNG() {
      let seed = this.seed;
      return function(min, max) {
        seed = (seed * 9301 + 49297) % 233280;
        const rnd = seed / 233280;
        return min + rnd * (max - min);
      };
    }
    
    getInfoText() {
      const lines = [];
      lines.push('semantic audio visualization');
      lines.push(`id: ${this.sessionId}`);
      lines.push(`waves: ${this.waveCount}`);
      lines.push(`mood: ${this.mood}`);
      return lines.join('\n');
    }
    
    getMoodConfig() {
      return NOISE_CONFIG.MOOD_LEVELS[this.mood] || NOISE_CONFIG.MOOD_LEVELS.balance;
    }
  }
  
  class WaveVisualizer {
    constructor(canvas, analyzer) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.analyzer = analyzer;
      this.moodConfig = analyzer.getMoodConfig();
      this.colorPalette = analyzer.colorPalette;
      this.waves = [];
      this.time = 0;
      this.isAnimating = false;
      this.animationId = null;
      this.interactionPoint = { x: 0, y: 0, active: false };
      this.lastMouseX = 0;
      this.lastMouseY = 0;
      
      this.init();
    }
    
    init() {
      this.resize();
      this.generateWaves();
      this.setupEventListeners();
    }
    
    resize() {
      const dpr = window.devicePixelRatio || 1;
      const rect = this.canvas.getBoundingClientRect();
      this.canvas.width = rect.width * dpr;
      this.canvas.height = rect.height * dpr;
      this.ctx.scale(dpr, dpr);
      this.interactionPoint.x = this.canvas.width / 2 / dpr;
      this.interactionPoint.y = this.canvas.height / 2 / dpr;
    }
    
    setupEventListeners() {
      const canvas = this.canvas;
      
      canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        this.interactionPoint.x = (e.clientX - rect.left) * (canvas.width / canvas.offsetWidth) / dpr;
        this.interactionPoint.y = (e.clientY - rect.top) * (canvas.height / canvas.offsetHeight) / dpr;
        this.interactionPoint.active = true;
        this.lastMouseX = this.interactionPoint.x;
        this.lastMouseY = this.interactionPoint.y;
      });
      
      canvas.addEventListener('mouseleave', () => {
        this.interactionPoint.active = false;
        this.interactionPoint.x = this.canvas.width / 2 / (window.devicePixelRatio || 1);
        this.interactionPoint.y = this.canvas.height / 2 / (window.devicePixelRatio || 1);
      });
      
      canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        if (e.touches.length === 1) {
          const rect = canvas.getBoundingClientRect();
          const touch = e.touches[0];
          const dpr = window.devicePixelRatio || 1;
          this.interactionPoint.x = (touch.clientX - rect.left) * (canvas.width / canvas.offsetWidth) / dpr;
          this.interactionPoint.y = (touch.clientY - rect.top) * (canvas.height / canvas.offsetHeight) / dpr;
          this.interactionPoint.active = true;
          this.lastMouseX = this.interactionPoint.x;
          this.lastMouseY = this.interactionPoint.y;
        }
      }, { passive: false });
      
      canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        if (e.touches.length === 1) {
          const rect = canvas.getBoundingClientRect();
          const touch = e.touches[0];
          const dpr = window.devicePixelRatio || 1;
          this.interactionPoint.x = (touch.clientX - rect.left) * (canvas.width / canvas.offsetWidth) / dpr;
          this.interactionPoint.y = (touch.clientY - rect.top) * (canvas.height / canvas.offsetHeight) / dpr;
          this.interactionPoint.active = true;
          this.lastMouseX = this.interactionPoint.x;
          this.lastMouseY = this.interactionPoint.y;
        }
      }, { passive: false });
      
      canvas.addEventListener('touchend', () => {
        this.interactionPoint.active = false;
        this.interactionPoint.x = this.canvas.width / 2 / (window.devicePixelRatio || 1);
        this.interactionPoint.y = this.canvas.height / 2 / (window.devicePixelRatio || 1);
      });
    }
    
    generateWaves() {
      this.waves = [];
      const waveCount = this.analyzer.waveCount;
      const width = this.canvas.width / (window.devicePixelRatio || 1);
      const height = this.canvas.height / (window.devicePixelRatio || 1);
      const moodConfig = this.moodConfig;
      
      for (let i = 0; i < waveCount; i++) {
        const amplitude = (Math.random() * 20 + 10) * moodConfig.amplitude;
        const frequency = (Math.random() * 0.02 + 0.005) * moodConfig.speed;
        const phase = Math.random() * Math.PI * 2;
        const speed = (Math.random() * 0.3 + 0.7) * moodConfig.speed;
        const thickness = Math.random() * 2 + 0.5;
        
        const color = this.colorPalette[Math.floor(Math.random() * this.colorPalette.length)];
        const alpha = 0.3 + Math.random() * 0.4;
        
        this.waves.push({
          amplitude,
          frequency,
          phase,
          speed,
          thickness,
          color: this.hexToRgba(color, alpha),
          originalColor: this.hexToRgba(color, alpha),
          yOffset: (i / waveCount) * height * 0.8 + height * 0.1,
          seed: Math.random() * 1000,
          interactionResponse: Math.random() * 0.8 + 0.2,
          originalY: (i / waveCount) * height * 0.8 + height * 0.1
        });
      }
    }
    
    hexToRgba(hex, alpha) {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    
    calculateWaveY(x, wave, time) {
      const t = time * wave.speed + wave.phase + wave.seed;
      
      let y = Math.sin(x * wave.frequency + t) * wave.amplitude +
              Math.sin(x * wave.frequency * 1.7 + t * 0.8) * wave.amplitude * 0.5 +
              Math.cos(x * wave.frequency * 0.5 + t * 1.2) * wave.amplitude * 0.3;
      
      if (this.interactionPoint.active) {
        const dx = this.interactionPoint.x - x;
        const dy = this.interactionPoint.y - wave.originalY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          const interactionStrength = this.moodConfig.interactionStrength * wave.interactionResponse;
          const influence = (1 - distance / 150) * interactionStrength * 40;
          
          const angle = Math.atan2(this.interactionPoint.y - wave.originalY, this.interactionPoint.x - x);
          y += Math.sin(angle * 2 + t) * influence;
        }
      }
      
      return y;
    }
    
    draw() {
      const ctx = this.ctx;
      const width = this.canvas.width / (window.devicePixelRatio || 1);
      const height = this.canvas.height / (window.devicePixelRatio || 1);
      
      ctx.fillStyle = 'rgba(8, 12, 25, 0.1)';
      ctx.fillRect(0, 0, width, height);
      
      this.waves.forEach(wave => {
        ctx.beginPath();
        ctx.strokeStyle = wave.color;
        ctx.lineWidth = wave.thickness;
        ctx.lineJoin = 'round';
        
        const step = Math.max(4, Math.floor(width / 60));
        
        for (let x = 0; x <= width; x += step) {
          const y = wave.yOffset + this.calculateWaveY(x, wave, this.time);
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        
        ctx.stroke();
      });
      
      this.drawCenterPoint(ctx);
      this.drawInfoText(ctx, width, height);
    }
    
    drawCenterPoint(ctx) {
      const centerX = this.interactionPoint.x;
      const centerY = this.interactionPoint.y;
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, 20, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(100, 100, 100, 0.15)';
      ctx.lineWidth = 1;
      ctx.stroke();
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, 5, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(100, 100, 100, 0.1)';
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, 2, 0, Math.PI * 2);
      ctx.fillStyle = '#808080';
      ctx.fill();
    }
    
    drawInfoText(ctx, width, height) {
      const infoText = this.analyzer.getInfoText();
      const lines = infoText.split('\n');
      ctx.fillStyle = 'rgba(180, 180, 180, 0.8)';
      ctx.font = '11px monospace';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      lines.forEach((line, index) => {
        ctx.fillText(line, 15, 15 + (index * 16));
      });
    }
    
    animate() {
      if (!this.isAnimating) return;
      
      this.time += 0.015 * this.moodConfig.speed;
      this.draw();
      this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    start() {
      if (this.isAnimating) return;
      this.isAnimating = true;
      this.animate();
    }
    
    stop() {
      this.isAnimating = false;
      if (this.animationId) {
        cancelAnimationFrame(this.animationId);
        this.animationId = null;
      }
    }
    
    destroy() {
      this.stop();
      const ctx = this.canvas.getContext('2d');
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }
  
  class AudioRecombinator {
    constructor(analyzer) {
      this.analyzer = analyzer;
      this.moodConfig = analyzer.getMoodConfig();
      this.audioContext = null;
      this.isPlaying = false;
      this.currentSource = null;
      this.gainNode = null;
      this.volume = 0.5;
      this.segments = [];
      this.totalDuration = 60;
      this.playbackStartTime = 0;
      this.audioFiles = {
        calm: 'https://blokknote.vercel.app/audio/mood/calm.mp3',
        comfort: 'https://blokknote.vercel.app/audio/mood/comfort.mp3',
        balance: 'https://blokknote.vercel.app/audio/mood/balance.mp3',
        melancholy: 'https://blokknote.vercel.app/audio/mood/melancholy.mp3',
        depression: 'https://blokknote.vercel.app/audio/mood/depression.mp3'
      };
    }
    
    async initialize() {
      if (!this.audioContext) {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      }
      
      try {
        const mood = this.analyzer.mood;
        const response = await fetch(this.audioFiles[mood]);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
        
        this.segments = this.sliceAudioBuffer(audioBuffer);
        return true;
      } catch (error) {
        console.error('Audio loading failed:', error);
        return false;
      }
    }
    
    sliceAudioBuffer(audioBuffer) {
      const sampleRate = audioBuffer.sampleRate;
      const channelData = audioBuffer.getChannelData(0);
      const segments = [];
      
      const segmentDuration = 1.0;
      const segmentSamples = Math.floor(segmentDuration * sampleRate);
      const fadeSamples = Math.floor(0.08 * sampleRate);
      
      let startSample = 0;
      
      while (startSample < channelData.length - segmentSamples) {
        const endSample = startSample + segmentSamples;
        const segmentData = new Float32Array(segmentSamples);
        
        let maxAmplitude = 0;
        for (let i = 0; i < segmentSamples; i++) {
          const sourceIndex = startSample + i;
          if (sourceIndex < channelData.length) {
            const val = Math.abs(channelData[sourceIndex]);
            if (val > maxAmplitude) maxAmplitude = val;
          }
        }
        
        if (maxAmplitude < 0.02) {
          startSample += Math.floor(segmentSamples * 0.5);
          continue;
        }
        
        for (let i = 0; i < segmentSamples; i++) {
          const sourceIndex = startSample + i;
          if (sourceIndex < channelData.length) {
            let sample = channelData[sourceIndex];
            
            if (i < fadeSamples) {
              sample *= i / fadeSamples;
            } else if (i > segmentSamples - fadeSamples) {
              sample *= (segmentSamples - i) / fadeSamples;
            }
            
            segmentData[i] = sample;
          }
        }
        
        const segmentBuffer = this.audioContext.createBuffer(1, segmentSamples, sampleRate);
        segmentBuffer.copyToChannel(segmentData, 0);
        
        const energy = this.calculateEnergy(segmentData);
        const hasDrums = this.detectDrums(segmentData, sampleRate);
        const smoothness = this.calculateSmoothness(segmentData);
        
        if (smoothness < 0.5) {
          startSample += Math.floor(segmentSamples * 0.5);
          continue;
        }
        
        segments.push({
          buffer: segmentBuffer,
          duration: segmentBuffer.duration,
          startTime: startSample / sampleRate,
          energy: energy,
          hasDrums: hasDrums,
          smoothness: smoothness
        });
        
        startSample += Math.floor(segmentSamples * 0.5);
      }
      
      return segments;
    }
    
    calculateEnergy(data) {
      let sum = 0;
      for (let i = 0; i < data.length; i++) {
        sum += data[i] * data[i];
      }
      return Math.sqrt(sum / data.length);
    }
    
    detectDrums(data, sampleRate) {
      const windowSize = Math.floor(0.01 * sampleRate);
      let maxEnergy = 0;
      
      for (let i = 0; i < data.length - windowSize; i += windowSize) {
        let windowEnergy = 0;
        for (let j = 0; j < windowSize; j++) {
          windowEnergy += Math.abs(data[i + j]);
        }
        windowEnergy /= windowSize;
        
        if (windowEnergy > maxEnergy) {
          maxEnergy = windowEnergy;
        }
      }
      
      return maxEnergy > 0.15;
    }
    
    calculateSmoothness(data) {
      let sum = 0;
      for (let i = 1; i < data.length; i++) {
        sum += Math.abs(data[i] - data[i - 1]);
      }
      return 1 - (sum / data.length);
    }
    
    createRecombinedBuffer() {
      const moodConfig = this.moodConfig;
      const segments = this.segments;
      
      if (!segments || segments.length === 0) return null;
      
      const sampleRate = this.audioContext.sampleRate;
      const totalSamples = Math.floor(this.totalDuration * sampleRate);
      const outputBuffer = this.audioContext.createBuffer(1, totalSamples, sampleRate);
      const outputData = outputBuffer.getChannelData(0);
      
      let currentSample = 0;
      const fadeInSamples = Math.floor(2 * sampleRate);
      const fadeOutSamples = Math.floor(3 * sampleRate);
      const crossfadeSamples = Math.floor(0.1 * sampleRate);
      
      const filteredSegments = segments.filter(segment => !segment.hasDrums && segment.smoothness > 0.7);
      const availableSegments = filteredSegments.length > 5 ? filteredSegments : segments;
      
      if (availableSegments.length === 0) return null;
      
      const segmentCount = Math.min(moodConfig.segmentCount, availableSegments.length);
      const selectedSegments = [];
      
      for (let i = 0; i < segmentCount; i++) {
        let segment;
        
        if (this.analyzer.mood === 'calm' || this.analyzer.mood === 'comfort') {
          const suitableSegments = availableSegments.filter(s => s.energy > 0.05 && s.energy < 0.2 && s.smoothness > 0.8);
          segment = suitableSegments.length > 0 ? 
            suitableSegments[Math.floor(Math.random() * suitableSegments.length)] : 
            availableSegments[Math.floor(Math.random() * availableSegments.length)];
        } else {
          segment = availableSegments[Math.floor(Math.random() * availableSegments.length)];
        }
        
        selectedSegments.push(segment);
      }
      
      let segmentIndex = 0;
      let lastSegmentIndex = -1;
      
      while (currentSample < totalSamples) {
        let randomIndex;
        do {
          randomIndex = Math.floor(Math.random() * selectedSegments.length);
        } while (selectedSegments.length > 1 && randomIndex === lastSegmentIndex);
        
        const segment = selectedSegments[randomIndex];
        lastSegmentIndex = randomIndex;
        
        const segmentData = segment.buffer.getChannelData(0);
        const playbackRate = moodConfig.audioSpeed * (0.98 + Math.random() * 0.04);
        const pitchShift = moodConfig.audioPitch * (0.99 + Math.random() * 0.02);
        
        const segmentSamples = segmentData.length;
        const segmentLengthAdjusted = Math.floor(segmentSamples / playbackRate);
        
        const remainingSamples = totalSamples - currentSample;
        const copyLength = Math.min(segmentLengthAdjusted, remainingSamples);
        
        for (let j = 0; j < copyLength; j++) {
          const sourceIndex = Math.floor(j * playbackRate);
          if (sourceIndex < segmentSamples) {
            let sample = segmentData[sourceIndex] * pitchShift;
            
            if (currentSample + j < fadeInSamples) {
              sample *= (currentSample + j) / fadeInSamples;
            }
            else if (currentSample + j > totalSamples - fadeOutSamples) {
              sample *= (totalSamples - (currentSample + j)) / fadeOutSamples;
            }
            
            if (j < crossfadeSamples && currentSample > 0) {
              const crossfade = j / crossfadeSamples;
              outputData[currentSample + j] = outputData[currentSample + j] * (1 - crossfade) + sample * crossfade;
            } else {
              outputData[currentSample + j] = sample;
            }
          }
        }
        
        currentSample += copyLength;
        segmentIndex++;
      }
      
      return outputBuffer;
    }
    
    play() {
      if (this.isPlaying || !this.audioContext) return false;
      
      const recombinedBuffer = this.createRecombinedBuffer();
      if (!recombinedBuffer) return false;
      
      this.isPlaying = true;
      
      this.currentSource = this.audioContext.createBufferSource();
      this.currentSource.buffer = recombinedBuffer;
      
      this.gainNode = this.audioContext.createGain();
      this.gainNode.gain.value = this.volume;
      
      const filterNode = this.audioContext.createBiquadFilter();
      
      switch(this.analyzer.mood) {
        case 'calm':
          filterNode.type = 'highpass';
          filterNode.frequency.value = 150;
          break;
        case 'comfort':
          filterNode.type = 'bandpass';
          filterNode.frequency.value = 600;
          break;
        case 'balance':
          filterNode.type = 'lowpass';
          filterNode.frequency.value = 3000;
          break;
        case 'melancholy':
          filterNode.type = 'lowpass';
          filterNode.frequency.value = 1500;
          break;
        case 'depression':
          filterNode.type = 'lowpass';
          filterNode.frequency.value = 800;
          break;
      }
      
      this.currentSource.connect(filterNode);
      filterNode.connect(this.gainNode);
      this.gainNode.connect(this.audioContext.destination);
      
      this.playbackStartTime = Date.now();
      
      this.currentSource.start();
      
      this.currentSource.onended = () => {
        this.isPlaying = false;
        this.currentSource = null;
        this.gainNode = null;
      };
      
      return true;
    }
    
    stop() {
      if (this.currentSource && this.isPlaying) {
        try {
          this.currentSource.stop();
        } catch (e) {}
        this.isPlaying = false;
        this.currentSource = null;
        this.gainNode = null;
      }
    }
    
    setVolume(value) {
      this.volume = value;
      if (this.gainNode) {
        this.gainNode.gain.value = value;
      }
    }
  }
  
  class NoiseController {
    constructor() {
      console.log('Noise universe v' + NOISE_CONFIG.VERSION + ' initializing');
      
      this.btn = document.getElementById('noise-btn');
      this.container = document.getElementById('noise-canvas-container');
      this.canvas = document.getElementById('noise-canvas');
      this.closeBtn = document.getElementById('noise-close-btn');
      this.playBtn = document.getElementById('noise-play-btn');
      this.stopBtn = document.getElementById('noise-stop-btn');
      this.volumeSlider = document.getElementById('noise-volume');
      this.statusText = document.getElementById('noise-status');
      this.progressBar = document.getElementById('noise-progress-bar');
      
      this.isActive = false;
      this.analyzer = null;
      this.visualizer = null;
      this.recombinator = null;
      this.progressInterval = null;
      this.animationFrame = null;
      
      if (!this.btn) {
        console.error('noise-btn element not found');
        return;
      }
      
      this.setupEventListeners();
      this.updateCloseButton();
      this.updateControlsStyle();
      console.log('Noise universe initialized successfully');
    }
    
    setupEventListeners() {
      this.btn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggle();
      });
      
      if (this.closeBtn) {
        this.closeBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.close();
        });
      }
      
      if (this.container) {
        this.container.addEventListener('click', (e) => {
          if (e.target === this.container) {
            this.close();
          }
        });
      }
      
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isActive) {
          this.close();
        }
      });
      
      if (this.playBtn) {
        this.playBtn.addEventListener('click', async () => {
          await this.play();
        });
      }
      
      if (this.stopBtn) {
        this.stopBtn.addEventListener('click', () => {
          this.stop();
        });
      }
      
      if (this.volumeSlider) {
        this.volumeSlider.addEventListener('input', (e) => {
          const value = e.target.value / 100;
          
          if (this.recombinator) {
            this.recombinator.setVolume(value);
          }
        });
      }
      
      window.addEventListener('resize', () => {
        if (this.isActive && this.visualizer) {
          this.visualizer.resize();
          this.visualizer.generateWaves();
        }
      });
    }
    
    updateCloseButton() {
      if (this.closeBtn) {
        this.closeBtn.style.cssText = `
          position: absolute;
          top: 12px;
          right: 12px;
          background: transparent;
          border: none;
          color: rgba(200, 200, 200, 0.9);
          width: 32px;
          height: 32px;
          font-size: 24px;
          cursor: pointer;
          z-index: 10001;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: Arial, sans-serif;
          transition: all 0.2s ease;
        `;
        
        this.closeBtn.addEventListener('mouseenter', () => {
          this.closeBtn.style.color = 'rgba(255, 255, 255, 1)';
          this.closeBtn.style.transform = 'scale(1.1)';
        });
        
        this.closeBtn.addEventListener('mouseleave', () => {
          this.closeBtn.style.color = 'rgba(200, 200, 200, 0.9)';
          this.closeBtn.style.transform = 'scale(1)';
        });
      }
    }
    
    updateControlsStyle() {
      const controls = document.querySelector('.noise-controls');
      if (controls) {
        controls.style.cssText = `
          position: absolute;
          bottom: 10px;
          left: 10px;
          right: 10px;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px;
          background: transparent;
          backdrop-filter: none;
          -webkit-backdrop-filter: none;
          border: none;
        `;
        
        const playBtn = document.getElementById('noise-play-btn');
        const stopBtn = document.getElementById('noise-stop-btn');
        
        if (playBtn) {
          playBtn.style.cssText = `
            background: transparent;
            border: 1px solid rgba(100, 150, 255, 0.3);
            color: rgba(220, 240, 255, 0.9);
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
            font-family: monospace;
            font-size: 13px;
            transition: all 0.2s ease;
          `;
        }
        
        if (stopBtn) {
          stopBtn.style.cssText = `
            background: transparent;
            border: 1px solid rgba(100, 150, 255, 0.3);
            color: rgba(220, 240, 255, 0.9);
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
            font-family: monospace;
            font-size: 13px;
            transition: all 0.2s ease;
          `;
        }
        
        const volumeSlider = document.getElementById('noise-volume');
        if (volumeSlider) {
          volumeSlider.style.cssText = `
            flex: 1;
            max-width: 120px;
            accent-color: #667eea;
          `;
        }
        
        const statusText = document.getElementById('noise-status');
        if (statusText) {
          statusText.style.display = 'none';
        }
      }
    }
    
    async toggle() {
      if (this.isActive) {
        this.close();
      } else {
        await this.open();
      }
    }
    
    async open() {
      if (this.isActive) return;
      
      this.isActive = true;
      
      if (this.container) {
        this.container.style.display = 'block';
        setTimeout(() => {
          this.container.classList.remove('closing');
        }, 10);
      }
      
      const editor = document.getElementById('editor');
      const text = editor ? editor.innerText.trim() : '';
      
      try {
        this.analyzer = new TextAnalyzer(text);
        this.visualizer = new WaveVisualizer(this.canvas, this.analyzer);
        this.recombinator = new AudioRecombinator(this.analyzer);
        
        const audioReady = await this.recombinator.initialize();
        
        if (!audioReady) {
          throw new Error('Audio initialization failed');
        }
        
        this.visualizer.start();
        
        if (this.playBtn) this.playBtn.disabled = false;
        if (this.stopBtn) this.stopBtn.disabled = true;
        
      } catch (error) {
        console.error('Error initializing noise universe:', error);
      }
    }
    
    close() {
      if (!this.isActive) return;
      
      this.container.classList.add('closing');
      
      setTimeout(() => {
        this.isActive = false;
        this.container.style.display = 'none';
        this.container.classList.remove('closing');
        
        this.stop();
        
        if (this.visualizer) {
          this.visualizer.destroy();
          this.visualizer = null;
        }
        
        this.analyzer = null;
        this.recombinator = null;
      }, 300);
    }
    
    async play() {
      if (!this.isActive || !this.recombinator) return;
      
      const success = this.recombinator.play();
      if (!success) return;
      
      if (this.playBtn) this.playBtn.disabled = true;
      if (this.stopBtn) this.stopBtn.disabled = false;
      
      this.startProgressBar();
      this.checkPlaybackStatus();
    }
    
    checkPlaybackStatus() {
      if (!this.recombinator || !this.recombinator.isPlaying) {
        this.stop();
        return;
      }
      
      this.animationFrame = requestAnimationFrame(() => this.checkPlaybackStatus());
    }
    
    stop() {
      if (this.animationFrame) {
        cancelAnimationFrame(this.animationFrame);
        this.animationFrame = null;
      }
      
      if (this.recombinator) {
        this.recombinator.stop();
      }
      
      if (this.playBtn) this.playBtn.disabled = false;
      if (this.stopBtn) this.stopBtn.disabled = true;
      
      this.stopProgressBar();
    }
    
    startProgressBar() {
      if (!this.progressBar) return;
      
      this.progressBar.style.width = '0%';
      const startTime = Date.now();
      const duration = 60000;
      
      const updateProgress = () => {
        if (!this.recombinator || !this.recombinator.isPlaying) {
          this.progressBar.style.width = '0%';
          return;
        }
        
        const elapsed = Date.now() - startTime;
        const progress = Math.min(100, (elapsed / duration) * 100);
        this.progressBar.style.width = `${progress}%`;
        
        if (progress < 100) {
          requestAnimationFrame(updateProgress);
        } else {
          setTimeout(() => {
            if (this.recombinator && this.recombinator.isPlaying) {
              this.stop();
            }
          }, 100);
        }
      };
      
      requestAnimationFrame(updateProgress);
    }
    
    stopProgressBar() {
      if (this.progressBar) {
        this.progressBar.style.width = '0%';
      }
    }
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
      if (typeof NoiseController !== 'undefined') {
        try {
          window.noiseController = new NoiseController();
          console.log('Noise universe loaded and ready');
        } catch (error) {
          console.error('Failed to create NoiseController:', error);
        }
      }
    }, 100);
  });
  
  window.NoiseController = NoiseController;
  
  console.log('Noise universe v' + NOISE_CONFIG.VERSION + ' loaded');
})();

