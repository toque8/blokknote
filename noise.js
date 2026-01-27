(function() {
'use strict';
console.log('🌌 NOISE UNIVERSE v1.0 INITIALIZED');

const NOISE_CONFIG = {
    VERSION: '1.0',
    PARTICLES: {
        desktop: { min: 50, max: 100 },
        mobile: { min: 25, max: 50 }
    },
    PERFORMANCE: {
        mobile: { trailLength: 3, fps: 30 },
        desktop: { trailLength: 5, fps: 60 }
    },
    MOOD_LEVELS: {
        'serene': {       // Очень позитивное
            color: '#FF6B6B',
            speed: 1.5,
            energy: 1.3,
            tempo: 140,
            brightness: 1.0,
            complexity: 0.7
        },
        'calm': {         // Умеренно позитивное
            color: '#FFA726',
            speed: 1.2,
            energy: 1.1,
            tempo: 110,
            brightness: 0.8,
            complexity: 0.6
        },
        'balance': {      // Нейтральное
            color: '#42A5F5',
            speed: 1.0,
            energy: 1.0,
            tempo: 90,
            brightness: 0.6,
            complexity: 0.5
        },
        'melancholy': {   // Умеренно негативное
            color: '#5C6BC0',
            speed: 0.7,
            energy: 0.8,
            tempo: 70,
            brightness: 0.4,
            complexity: 0.3
        },
        'gloomy': {       // Очень негативное
            color: '#37474F',
            speed: 0.5,
            energy: 0.6,
            tempo: 60,
            brightness: 0.2,
            complexity: 0.2
        }
    },
    SENSITIVITY: {
        warmWords: {
            ru: [
                'радость', 'счастье', 'надежда', 'мечта', 'свет', 'тепло', 'улыбка', 'друг', 'семья', 'солнце',
                'праздник', 'успех', 'победа', 'красота', 'гармония', 'доброта', 'добро', 'щедрость', 'верность',
                'честность', 'мудрость', 'свобода', 'приключение', 'открытие', 'вдохновение', 'творчество',
                'энергия', 'жизнь', 'здравие', 'благодарность', 'спокойствие', 'уют', 'комфорт', 'ласка',
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
                'сочувствующий', 'благополучный', 'радушный', 'приветливый', 'ободряющий',
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
                'ураганный', 'разрушительный', 'краховый', 'провальный', 'пораженческий', 'позорный', 'стыдный',
                'виновный', 'раскаявшийся', 'сожалеющий', 'отчаявшийся', 'безысходный', 'мрачный', 'унылый',
                'тленный', 'немощный', 'несправедливый', 'злой', 'коварный', 'вероломный', 'подлый', 'жестокий',
                'беспощадный', 'безжалостный', 'бездушный', 'бесчувственный', 'безразличный', 'немилосердный',
                'неумолимый', 'беспросветный', 'безрадостный', 'безнадежный', 'безвольный', 'бессильный',
                'беззащитный', 'беспомощный', 'безвыходный', 'скорбный', 'горький', 'ожесточенный', 'безутешный',
                'мрачный', 'хмурый', 'угрюмый', 'тоскливый', 'пессимистический', 'угрожающий', 'опасный',
                'рискованный', 'бедственный', 'страдальческий', 'мучительный', 'плачевный', 'слезливый',
                'рыдающий', 'вопиющий', 'неприятный', 'трагический', 'гнетущий', 'угнетающий', 'мученический',
                'невольный', 'принудительный', 'насильственный', 'притеснительный', 'изгнанный', 'изолированный',
                'отвергнутый', 'забытый', 'заброшенный', 'небрежный', 'пренебрежительный', 'презрительный',
                'грустить', 'болеть', 'умирать', 'темнеть', 'страшиться', 'тосковать', 'печалиться',
                'разочаровываться', 'терять', 'горевать', 'бедствовать', 'несчастливить', 'страдать', 'мучиться',
                'пытать', 'истязать', 'унижать', 'предавать', 'изменять', 'лгать', 'обманывать', 'ненавидеть',
                'злобствовать', 'яриться', 'гневаться', 'ревновать', 'завидовать', 'жадничать', 'скупиться',
                'эгоистить', 'равнодушествовать', 'холодеть', 'леденеть', 'морозить', 'туманиться', 'тучнеть',
                'грозить', 'ураганить', 'разрушать', 'краховать', 'проваливаться', 'терпеть поражение', 'позорить',
                'стыдиться', 'чувствовать вину', 'раскаиваться', 'сожалеть', 'отчаиваться', 'чувствовать безысходность',
                'мрачнеть', 'унывать', 'тлеть', 'немоществовать', 'несправедливить', 'злобствовать', 'коварничать',
                'вероломствовать', 'подличать', 'жесточить', 'беспощадствовать', 'безжалостничать', 'бездушничать',
                'бесчувствовать', 'безразличествовать', 'немилосердствовать', 'неумолимствовать', 'беспросветничать',
                'безрадостничать', 'безнадежничать', 'безвольничать', 'бессиличать', 'беззащитничать',
                'беспомоществовать', 'безвыходничать', 'скорбеть', 'горчить', 'ожесточаться', 'безутешествовать',
                'мрачнеть', 'хмуриться', 'угрюмничать', 'тосковать', 'пессимизировать', 'угрожать', 'опасаться',
                'рисковать', 'бедствовать', 'страдать', 'мучиться', 'плакать', 'слезиться', 'рыдать', 'вопить',
                'неприятничать', 'трагедировать', 'гнетить', 'угнетать', 'мученичествовать', 'неволить',
                'принуждать', 'насиловать', 'притеснять', 'изгонять', 'изолировать', 'отвергать', 'забывать',
                'забрасывать', 'небрежничать', 'пренебрегать', 'презирать', 'зима', 'дождь', 'дождливо'
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
                'selfish', 'indifferent', 'cold', 'icy', 'frosty', 'foggy', 'cloudy', 'stormy', 'hurricane-like',
                'destructive', 'collapsing', 'failing', 'defeated', 'shameful', 'guilty', 'remorseful', 'regretful',
                'desperate', 'hopeless', 'gloomy', 'desolate', 'decaying', 'weak', 'unjust', 'treacherous',
                'perfidious', 'base', 'cruel', 'merciless', 'ruthless', 'insensitive', 'heartless', 'callous',
                'pitiless', 'implacable', 'bleak', 'dreadful', 'futile', 'powerless', 'helpless', 'hopeless',
                'willless', 'defenseless', 'inevitable', 'mournful', 'bitter', 'embittered', 'hardened', 'dreary',
                'gloomy', 'melancholic', 'sorrowful', 'grieving', 'sad', 'cheerless', 'menacing', 'perilous',
                'risky', 'calamitous', 'unfortunate', 'disastrous', 'unfavorable', 'unpleasant', 'offensive',
                'distressing', 'annoying', 'disappointing', 'dissatisfied', 'displeased', 'contemptuous', 'careless',
                'abandoned', 'forgotten', 'despised', 'neglected', 'contemptible', 'humiliated', 'insulted',
                'offended', 'undervalued', 'unrecognized', 'abandoned', 'forsaken', 'rejected', 'cursed', 'cursing',
                'sadden', 'hurt', 'die', 'darken', 'fear', 'be lonely', 'long', 'grieve', 'disappoint', 'lose',
                'mourn', 'trouble', 'agonize', 'torment', 'torture', 'humiliate', 'betray', 'commit treason', 'lie',
                'deceive', 'hate', 'be malicious', 'fume', 'be angry', 'be jealous', 'envy', 'be greedy', 'be stingy',
                'be selfish', 'be indifferent', 'grow cold', 'freeze', 'frost', 'fog', 'cloud', 'storm', 'hurricane',
                'destroy', 'collapse', 'fail', 'be defeated', 'be ashamed', 'feel guilty', 'feel remorse', 'regret',
                'despair', 'be hopeless', 'gloom', 'be desolate', 'decay', 'weaken', 'be unjust', 'be treacherous',
                'be perfidious', 'be base', 'be cruel', 'be merciless', 'be ruthless', 'be insensitive', 'be heartless',
                'be callous', 'be pitiless', 'be implacable', 'be bleak', 'be dreadful', 'be futile', 'be powerless',
                'be helpless', 'be hopeless', 'be willless', 'be defenseless', 'be inevitable', 'mourn', 'be bitter',
                'be embittered', 'harden', 'be dreary', 'be gloomy', 'be melancholic', 'be sorrowful', 'grieve',
                'be sad', 'be cheerless', 'menace', 'endanger', 'risk', 'be unfortunate', 'be disastrous',
                'be unfavorable', 'be unpleasant', 'offend', 'distress', 'annoy', 'disappoint', 'dissatisfy',
                'displease', 'contemn', 'neglect', 'disregard', 'abandon', 'forget', 'despise', 'humiliate',
                'insult', 'offend', 'undervalue', 'fail to recognize', 'abandon', 'forsake', 'reject', 'curse',
                'condemn', 'sadly', 'painfully', 'mortally', 'darkly', 'fearfully', 'lonelily', 'longingly',
                'sorrowfully', 'disappointedly', 'lostly', 'nocturnally', 'wintrily', 'rainily', 'grievously',
                'troubledly', 'unfortunately', 'tragically', 'disastrously', 'agonizingly', 'tormentingly',
                'torturously', 'humiliatingly', 'treacherously', 'treasonously', 'lyingly', 'deceptively',
                'hatefully', 'maliciously', 'furiously', 'angrily', 'jealously', 'enviously', 'greedily', 'stingily',
                'selfishly', 'indifferently', 'coldly', 'icily', 'frostily', 'foggily', 'cloudily', 'stormily',
                'hurricane-like', 'destructively', 'collapsingly', 'failingly', 'defeatedly', 'shamefully',
                'guiltily', 'remorsefully', 'regretfully', 'desperately', 'hopelessly', 'gloomily', 'desolately',
                'decayingly', 'weakly', 'unjustly', 'treacherously', 'perfidiously', 'basely', 'cruelly',
                'mercilessly', 'ruthlessly', 'insensitively', 'heartlessly', 'callously', 'pitilessly',
                'implacably', 'bleakly', 'dreadfully', 'futilely', 'powerlessly', 'helplessly', 'hopelessly',
                'willlessly', 'defenselessly', 'inevitably', 'mournfully', 'bitterly', 'embitteredly', 'hardenedly',
                'drearily', 'gloomily', 'melancholically', 'sorrowfully', 'grievingly', 'sadly', 'cheerlessly',
                'menacingly', 'perilously', 'riskily', 'calamitously', 'unfortunately', 'disastrously',
                'unfavorably', 'unpleasantly', 'offensively', 'distressingly', 'annoyingly', 'disappointingly',
                'dissatisfyingly', 'displeasingly', 'contemptuously', 'carelessly', 'abandonedly', 'forgottenly',
                'despisely', 'neglectingly', 'contemptibly', 'humiliatingly', 'insultingly', 'offensively',
                'undervaluingly', 'unrecognizably', 'abandonedly', 'forsakenly', 'rejectingly', 'cursedly',
                'condemningly', 'winter', 'rain', 'rainy'
            ]
        }
    }
};

const DeviceDetector = {
    isMobile: () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768,
    isTouch: () => 'ontouchstart' in window || navigator.maxTouchPoints > 0,
    getPerformanceMode() {
        return this.isMobile() ? NOISE_CONFIG.PERFORMANCE.mobile : NOISE_CONFIG.PERFORMANCE.desktop;
    }
};

class SonicSession {
    constructor(text = '') {
        this.text = text.trim();
        this.seed = this.generateSeed();
        this.sessionId = 'textuniverse-' + this.generateRandomId(10);
        this.physics = this.generatePhysics();
        this.behaviors = this.generateBehaviors();
        this.language = this.detectLanguage();
        this.creationTime = Date.now();
        this.uniqueHash = this.createHash();
        this.stats = this.calculateTextStats();
        this.mood = this.analyzeMood();
        this.particleCount = this.generateParticleCount();
        this.intensityMultipliers = this.generateIntensityMultipliers();
        this.colorPalette = this.generateColorPalette(100);
    }

    generateRandomId(length) {
        const chars = '0123456789abcdefghijklmnopqrstuvwxyz';
        let id = '';
        for (let i = 0; i < length; i++) {
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

    generatePhysics() {
        const rng = this.createRNG();
        return {
            gravity: rng(-0.3, 0.3),
            viscosity: rng(0.88, 0.96),
            turbulence: rng(0.1, 0.4),
            attraction: rng(0.0005, 0.005),
            repulsion: rng(0.0005, 0.003),
            timeScale: rng(0.7, 1.3)
        };
    }

    generateBehaviors() {
        const allBehaviors = ['orbit', 'swarm', 'wave', 'chaos', 'spiral', 'magnetic', 'pulse', 'harmony', 'resonance'];
        const selected = [];
        const count = Math.floor(Math.random() * 3) + 2;
        const rng = this.createRNG();
        for (let i = 0; i < count; i++) {
            const available = allBehaviors.filter(b => !selected.includes(b));
            if (available.length === 0) break;
            const index = Math.floor(rng(0, available.length));
            selected.push(available[index]);
        }
        return selected;
    }

    generateParticleCount() {
        const isMobile = DeviceDetector.isMobile();
        const range = isMobile ? NOISE_CONFIG.PARTICLES.mobile : NOISE_CONFIG.PARTICLES.desktop;
        const rng = this.createRNG();
        return Math.floor(rng(range.min, range.max + 1));
    }

    detectLanguage() {
        const ruChars = this.text.match(/[а-яА-ЯёЁ]/g) || [];
        const enChars = this.text.match(/[a-zA-Z]/g) || [];
        if (ruChars.length > enChars.length * 1.2) return 'ru';
        if (enChars.length > ruChars.length * 1.2) return 'en';
        return 'mixed';
    }

    createHash() {
        let hash = 0;
        const str = this.seed + this.text + this.creationTime;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return Math.abs(hash).toString(16).substring(0, 6);
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

    analyzeMood() {
        if (this.text.length === 0) return 'balance';
        const textLower = this.text.toLowerCase();
        let warmCount = 0;
        let darkCount = 0;
        ['ru', 'en'].forEach(lang => {
            if (NOISE_CONFIG.SENSITIVITY.warmWords[lang]) {
                NOISE_CONFIG.SENSITIVITY.warmWords[lang].forEach(word => {
                    const regex = new RegExp(`(^|[^\\p{L}])${this.escapeRegExp(word)}([^\\p{L}]|$)`, 'giu');
                    const matches = textLower.match(regex);
                    if (matches) warmCount += matches.length;
                });
            }
            if (NOISE_CONFIG.SENSITIVITY.darkWords[lang]) {
                NOISE_CONFIG.SENSITIVITY.darkWords[lang].forEach(word => {
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
        if (warmRatio > 0.7 && darkRatio < 0.15) return 'serene';
        if (warmRatio > 0.55) return 'calm';
        if (darkRatio > 0.7 && warmRatio < 0.15) return 'gloomy';
        if (darkRatio > 0.55) return 'melancholy';
        if (Math.abs(warmRatio - darkRatio) < 0.15) return 'balance';
        return warmRatio > darkRatio ? 'calm' : 'melancholy';
    }

    escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    generateIntensityMultipliers() {
        switch(this.mood) {
            case 'serene':
                return { speed: 1.5, amplitude: 1.5, size: 1.2 };
            case 'calm':
                return { speed: 1.2, amplitude: 1.2, size: 1.1 };
            case 'balance':
                return { speed: 1.0, amplitude: 1.0, size: 1.0 };
            case 'melancholy':
                return { speed: 0.8, amplitude: 0.8, size: 0.9 };
            case 'gloomy':
                return { speed: 0.6, amplitude: 0.6, size: 0.8 };
            default:
                return { speed: 1.0, amplitude: 1.0, size: 1.0 };
        }
    }

    generateColorPalette(count) {
        const palette = [];
        const rng = this.createRNG();
        for (let i = 0; i < count; i++) {
            let h, s, l;
            switch(this.mood) {
                case 'serene':
                    h = rng(0, 60) + (Math.random() > 0.5 ? 300 : 0);
                    s = rng(70, 100);
                    l = rng(40, 60);
                    break;
                case 'calm':
                    h = rng(20, 80);
                    s = rng(50, 80);
                    l = rng(50, 70);
                    break;
                case 'balance':
                    h = rng(0, 360);
                    s = rng(40, 70);
                    l = rng(40, 60);
                    break;
                case 'melancholy':
                    h = rng(180, 240);
                    s = rng(30, 60);
                    l = rng(30, 50);
                    break;
                case 'gloomy':
                    h = rng(180, 300);
                    s = rng(10, 30);
                    l = rng(10, 25);
                    break;
                default:
                    h = rng(0, 360);
                    s = rng(30, 70);
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

    getColorPalette() {
        return this.colorPalette;
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
        lines.push('sonic visualization of your text');
        lines.push(`id: ${this.sessionId}`);
        lines.push(`waves: ${this.particleCount}`);
        lines.push(`mood: ${this.mood}`);
        lines.push(`behaviors: ${this.behaviors.join(', ')}`);
        return lines.join('\n');
    }
}

class WaveSystem {
    constructor(canvas, session) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.session = session;
        this.particles = [];
        this.isMobile = DeviceDetector.isMobile();
        this.performance = DeviceDetector.getPerformanceMode();
        this.time = 0;
        this.interactionPoint = { x: 0, y: 0, active: false };
        this.lastFrameTime = 0;
        this.audioData = null;
        this.animationId = null;
        this.init();
    }

    init() {
        this.resize();
        this.generateParticles();
        this.setupEventListeners();
        this.startAnimation();
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

    generateParticles() {
        this.particles = [];
        const colors = this.session.getColorPalette();
        const centerX = this.canvas.width / 2 / (window.devicePixelRatio || 1);
        const centerY = this.canvas.height / 2 / (window.devicePixelRatio || 1);
        const sizeMultiplier = this.session.intensityMultipliers.size;
        const amplitudeMultiplier = this.session.intensityMultipliers.amplitude;
        const speedMultiplier = this.session.intensityMultipliers.speed;
        const particleCount = this.session.particleCount;

        for (let i = 0; i < particleCount; i++) {
            const angle = (i / particleCount) * Math.PI * 2;
            const baseRadius = 80 + Math.random() * 200;
            const spiralFactor = 1 + (i / particleCount) * 3;
            const x = centerX + Math.cos(angle * 3) * baseRadius * spiralFactor;
            const y = centerY + Math.sin(angle * 3) * baseRadius * spiralFactor;
            
            const particleSize = Math.min(1.5 + Math.random() * 2.5 * sizeMultiplier, 6);
            const colorIndex = Math.floor(Math.random() * colors.length);
            const color = colors[colorIndex];
            const baseFrequency = 0.02 + Math.random() * 0.03;
            const behavior = this.session.behaviors[i % this.session.behaviors.length];

            this.particles.push({
                x: x,
                y: y,
                vx: 0,
                vy: 0,
                radius: particleSize,
                color: color,
                originalX: x,
                originalY: y,
                trail: [],
                behavior: behavior,
                frequency: baseFrequency * amplitudeMultiplier,
                phase: Math.random() * Math.PI * 2,
                speed: (0.5 + Math.random() * 0.5) * speedMultiplier,
                amplitude: (5 + Math.random() * 15) * amplitudeMultiplier,
                harmonic: 1 + Math.floor(Math.random() * 3),
                spiralRadius: baseRadius,
                spiralAngle: angle,
                orbitSpeed: 0.001 + Math.random() * 0.002,
                waveType: this.determineWaveType()
            });
        }
    }

    determineWaveType() {
        switch(this.session.mood) {
            case 'serene': return 'harmonic';
            case 'calm': return 'gentle';
            case 'balance': return 'balanced';
            case 'melancholy': return 'melancholic';
            case 'gloomy': return 'deep';
            default: return 'balanced';
        }
    }

    setupEventListeners() {
        window.addEventListener('resize', () => this.resize());
        
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const dpr = window.devicePixelRatio || 1;
            this.interactionPoint.x = (e.clientX - rect.left) * (this.canvas.width / rect.width) / dpr;
            this.interactionPoint.y = (e.clientY - rect.top) * (this.canvas.height / rect.height) / dpr;
            this.interactionPoint.active = true;
        });

        this.canvas.addEventListener('mouseleave', () => {
            this.interactionPoint.active = false;
            const dpr = window.devicePixelRatio || 1;
            this.interactionPoint.x = this.canvas.width / 2 / dpr;
            this.interactionPoint.y = this.canvas.height / 2 / dpr;
        });

        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            if (e.touches.length === 1) {
                const rect = this.canvas.getBoundingClientRect();
                const touch = e.touches[0];
                const dpr = window.devicePixelRatio || 1;
                this.interactionPoint.x = (touch.clientX - rect.left) * (this.canvas.width / rect.width) / dpr;
                this.interactionPoint.y = (touch.clientY - rect.top) * (this.canvas.height / rect.height) / dpr;
                this.interactionPoint.active = true;
            }
        });

        this.canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            if (e.touches.length === 1) {
                const rect = this.canvas.getBoundingClientRect();
                const touch = e.touches[0];
                const dpr = window.devicePixelRatio || 1;
                this.interactionPoint.x = (touch.clientX - rect.left) * (this.canvas.width / rect.width) / dpr;
                this.interactionPoint.y = (touch.clientY - rect.top) * (this.canvas.height / rect.height) / dpr;
                this.interactionPoint.active = true;
            }
        });

        this.canvas.addEventListener('touchend', () => {
            this.interactionPoint.active = false;
            const dpr = window.devicePixelRatio || 1;
            this.interactionPoint.x = this.canvas.width / 2 / dpr;
            this.interactionPoint.y = this.canvas.height / 2 / dpr;
        });
    }

    startAnimation() {
        this.lastFrameTime = performance.now();
        this.animate();
    }

    animate(timestamp) {
        const deltaTime = timestamp - this.lastFrameTime;
        this.lastFrameTime = timestamp;
        
        this.update(deltaTime);
        this.render();
        
        this.animationId = requestAnimationFrame((t) => this.animate(t));
    }

    update(deltaTime) {
        this.time += deltaTime * 0.001;
        const physics = this.session.physics;
        const multipliers = this.session.intensityMultipliers;
        
        this.particles.forEach((particle, index) => {
            if (particle.trail.length > this.performance.trailLength) {
                particle.trail.shift();
            }
            particle.trail.push({ x: particle.x, y: particle.y });
            
            this.applyWaveBehavior(particle, multipliers);
            
            switch(particle.behavior) {
                case 'orbit':
                    this.applyOrbitBehavior(particle, multipliers);
                    break;
                case 'swarm':
                    this.applySwarmBehavior(particle, multipliers);
                    break;
                case 'spiral':
                    this.applySpiralBehavior(particle, multipliers);
                    break;
                case 'wave':
                    this.applyWaveMotion(particle, multipliers);
                    break;
                case 'chaos':
                    this.applyChaosBehavior(particle, multipliers);
                    break;
                case 'magnetic':
                    this.applyMagneticBehavior(particle, multipliers);
                    break;
                case 'pulse':
                    this.applyPulseBehavior(particle, multipliers);
                    break;
                case 'harmony':
                    this.applyHarmonyBehavior(particle, multipliers);
                    break;
                case 'resonance':
                    this.applyResonanceBehavior(particle, multipliers);
                    break;
            }
            
            if (this.interactionPoint.active) {
                this.applyInteraction(particle);
            }
            
            particle.x += particle.vx * physics.timeScale * multipliers.speed;
            particle.y += particle.vy * physics.timeScale * multipliers.speed;
            particle.vx *= physics.viscosity;
            particle.vy *= physics.viscosity;
            
            this.handleBoundaries(particle);
        });
    }

    applyWaveBehavior(particle, multipliers) {
        const t = this.time * particle.speed;
        let displacementX = 0;
        let displacementY = 0;
        
        switch(particle.waveType) {
            case 'harmonic':
                const angle = t * 0.5 + particle.phase;
                displacementX = Math.cos(angle) * particle.amplitude * 0.5;
                displacementY = Math.sin(angle) * particle.amplitude * 0.5;
                break;
            case 'gentle':
                displacementX = Math.sin(t * particle.frequency + particle.phase) * particle.amplitude * 0.7;
                displacementY = Math.cos(t * particle.frequency * 0.7 + particle.phase) * particle.amplitude * 0.3;
                break;
            case 'balanced':
                displacementX = Math.sin(t * particle.frequency + particle.phase) * particle.amplitude * 0.8;
                displacementY = Math.sin(t * particle.frequency * 0.8 + particle.phase + Math.PI/4) * particle.amplitude * 0.6;
                break;
            case 'melancholic':
                displacementX = Math.sin(t * particle.frequency * 0.6 + particle.phase) * particle.amplitude * 0.9;
                displacementY = Math.cos(t * particle.frequency * 0.4 + particle.phase) * particle.amplitude * 0.4;
                break;
            case 'deep':
                displacementX = Math.sin(t * particle.frequency * 0.3 + particle.phase) * particle.amplitude;
                displacementY = Math.cos(t * particle.frequency * 0.3 + particle.phase) * particle.amplitude * 0.2;
                break;
        }
        
        particle.vx += displacementX * 0.01 * multipliers.speed;
        particle.vy += displacementY * 0.01 * multipliers.speed;
    }

    applyOrbitBehavior(particle, multipliers) {
        const centerX = this.canvas.width / 2 / (window.devicePixelRatio || 1);
        const centerY = this.canvas.height / 2 / (window.devicePixelRatio || 1);
        
        particle.spiralAngle += particle.orbitSpeed * multipliers.speed;
        const targetX = centerX + Math.cos(particle.spiralAngle) * particle.spiralRadius;
        const targetY = centerY + Math.sin(particle.spiralAngle) * particle.spiralRadius;
        
        particle.vx += (targetX - particle.x) * 0.02 * multipliers.amplitude;
        particle.vy += (targetY - particle.y) * 0.02 * multipliers.amplitude;
    }

    applySwarmBehavior(particle, multipliers) {
        const centerX = this.canvas.width / 2 / (window.devicePixelRatio || 1);
        const centerY = this.canvas.height / 2 / (window.devicePixelRatio || 1);
        const dx = centerX - particle.x;
        const dy = centerY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > 50) {
            const force = 0.002 * multipliers.amplitude;
            particle.vx += dx * force;
            particle.vy += dy * force;
        }
    }

    applySpiralBehavior(particle, multipliers) {
        const centerX = this.canvas.width / 2 / (window.devicePixelRatio || 1);
        const centerY = this.canvas.height / 2 / (window.devicePixelRatio || 1);
        const dx = particle.x - centerX;
        const dy = particle.y - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > 30) {
            const angle = Math.atan2(dy, dx);
            particle.vx += Math.cos(angle + Math.PI / 2) * 0.03 * multipliers.amplitude;
            particle.vy += Math.sin(angle + Math.PI / 2) * 0.03 * multipliers.amplitude;
        }
    }

    applyWaveMotion(particle, multipliers) {
        const t = this.time;
        particle.vx += Math.sin(t + particle.x * 0.01) * 0.1 * multipliers.amplitude;
        particle.vy += Math.cos(t + particle.y * 0.01) * 0.1 * multipliers.amplitude;
    }

    applyChaosBehavior(particle, multipliers) {
        particle.vx += (Math.random() - 0.5) * 0.3 * multipliers.amplitude;
        particle.vy += (Math.random() - 0.5) * 0.3 * multipliers.amplitude;
    }

    applyMagneticBehavior(particle, multipliers) {
        const dx = this.interactionPoint.x - particle.x;
        const dy = this.interactionPoint.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > 10 && distance < 150) {
            const force = 0.001 / distance * multipliers.amplitude;
            particle.vx += dx * force;
            particle.vy += dy * force;
        }
    }

    applyPulseBehavior(particle, multipliers) {
        const pulse = Math.sin(this.time * 3 + particle.phase) * 0.5 + 0.5;
        const newRadius = particle.radius + pulse * 0.3 * multipliers.amplitude;
        particle.radius = Math.min(newRadius, 6);
    }

    applyHarmonyBehavior(particle, multipliers) {
        const harmonyFactor = Math.sin(this.time * (0.5 + particle.harmonic * 0.2) + particle.phase);
        particle.vx += harmonyFactor * 0.1 * multipliers.amplitude;
        particle.vy += harmonyFactor * 0.1 * multipliers.amplitude;
    }

    applyResonanceBehavior(particle, multipliers) {
        for (let j = 0; j < this.particles.length; j++) {
            const other = this.particles[j];
            if (other === particle) continue;
            
            const dx = other.x - particle.x;
            const dy = other.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 40) {
                const force = (40 - distance) * 0.001 * multipliers.amplitude;
                particle.vx += dx * force;
                particle.vy += dy * force;
            }
        }
    }

    applyInteraction(particle) {
        const dx = this.interactionPoint.x - particle.x;
        const dy = this.interactionPoint.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
            if (distance < 20) {
                const force = 0.8 / distance;
                particle.vx -= dx * force;
                particle.vy -= dy * force;
            } else {
                const force = 0.03;
                particle.vx += dx * force;
                particle.vy += dy * force;
            }
        }
    }

    handleBoundaries(particle) {
        const width = this.canvas.width / (window.devicePixelRatio || 1);
        const height = this.canvas.height / (window.devicePixelRatio || 1);
        const margin = particle.radius * 3;
        
        if (particle.x < margin) {
            particle.x = margin;
            particle.vx *= -0.7;
        } else if (particle.x > width - margin) {
            particle.x = width - margin;
            particle.vx *= -0.7;
        }
        
        if (particle.y < margin) {
            particle.y = margin;
            particle.vy *= -0.7;
        } else if (particle.y > height - margin) {
            particle.y = height - margin;
            particle.vy *= -0.7;
        }
    }

    render() {
        const ctx = this.ctx;
        const dpr = window.devicePixelRatio || 1;
        const width = this.canvas.width / dpr;
        const height = this.canvas.height / dpr;
        
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        ctx.fillStyle = 'rgba(8, 12, 25, 0.1)';
        ctx.fillRect(0, 0, width, height);
        
        if (!this.isMobile) {
            this.drawGrid(ctx, width, height);
        }
        
        this.particles.forEach(particle => {
            this.drawParticle(ctx, particle);
        });
        
        this.drawInteractionPoint(ctx);
        this.drawInfoText(ctx, width, height);
        this.drawAudioVisualization(ctx, width, height);
    }

    drawGrid(ctx, width, height) {
        ctx.strokeStyle = 'rgba(100, 100, 100, 0.1)';
        ctx.lineWidth = 0.5;
        const gridSize = 40;
        
        for (let x = 0; x < width; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
        }
        
        for (let y = 0; y < height; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }
    }

    drawParticle(ctx, particle) {
        if (particle.trail.length > 1) {
            ctx.beginPath();
            ctx.moveTo(particle.trail[0].x, particle.trail[0].y);
            for (let i = 1; i < particle.trail.length; i++) {
                ctx.lineTo(particle.trail[i].x, particle.trail[i].y);
            }
            ctx.strokeStyle = particle.color + '20';
            ctx.lineWidth = particle.radius * 0.3;
            ctx.stroke();
        }
        
        const gradient = ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, particle.radius * 1.8
        );
        gradient.addColorStop(0, particle.color + 'ff');
        gradient.addColorStop(0.6, particle.color + '60');
        gradient.addColorStop(1, particle.color + '00');
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius * 1.8, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
    }

    drawInteractionPoint(ctx) {
        if (!this.interactionPoint.active) return;
        
        ctx.beginPath();
        ctx.arc(this.interactionPoint.x, this.interactionPoint.y, 20, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(100, 100, 100, 0.15)';
        ctx.lineWidth = 1;
        ctx.stroke();
        
        ctx.beginPath();
        ctx.arc(this.interactionPoint.x, this.interactionPoint.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(100, 100, 100, 0.1)';
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(this.interactionPoint.x, this.interactionPoint.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = '#808080';
        ctx.fill();
    }

    drawInfoText(ctx, width, height) {
        const infoText = this.session.getInfoText();
        const lines = infoText.split('\n');
        
        ctx.fillStyle = 'rgba(150, 150, 150, 0.8)';
        ctx.font = '12px monospace';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        
        lines.forEach((line, index) => {
            ctx.fillText(line, 20, 20 + (index * 18));
        });
    }

    drawAudioVisualization(ctx, width, height) {
        if (!this.audioData || !this.audioData.frequencyData) return;
        
        const centerX = width / 2;
        const centerY = height / 2;
        const maxRadius = Math.min(centerX, centerY) * 0.8;
        const barCount = 64;
        const barWidth = Math.PI * 2 / barCount;
        
        ctx.save();
        ctx.translate(centerX, centerY);
        
        for (let i = 0; i < barCount; i++) {
            const angle = i * barWidth;
            const dataIndex = Math.floor(i * this.audioData.frequencyData.length / barCount);
            const value = this.audioData.frequencyData[dataIndex] / 255;
            const barHeight = maxRadius * value * 0.3;
            
            ctx.beginPath();
            ctx.strokeStyle = `rgba(102, 234, 126, ${value * 0.7})`;
            ctx.lineWidth = 2;
            ctx.arc(0, 0, maxRadius * 0.7 + barHeight, angle, angle + barWidth);
            ctx.stroke();
        }
        
        ctx.restore();
    }

    setAudioData(audioData) {
        this.audioData = audioData;
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        this.particles = [];
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

class AudioEngine {
    constructor(mood = 'balance', tempo = 90) {
        this.mood = mood;
        this.tempo = tempo;
        this.audioContext = null;
        this.masterGain = null;
        this.analyser = null;
        this.frequencyData = null;
        this.isPlaying = false;
        this.currentNotes = [];
        this.intervals = [];
        this.volume = 0.3;
        this.harmonyLevel = 0;
        this.initialize();
    }

    initialize() {
        try {
            window.AudioContext = window.AudioContext || window.webkitAudioContext;
            if (window.AudioContext) {
                this.audioContext = new window.AudioContext();
                this.masterGain = this.audioContext.createGain();
                this.masterGain.gain.value = this.volume;
                this.analyser = this.audioContext.createAnalyser();
                this.analyser.fftSize = 2048;
                this.frequencyData = new Uint8Array(this.analyser.frequencyBinCount);
                this.masterGain.connect(this.analyser);
                this.analyser.connect(this.audioContext.destination);
            }
        } catch (e) {
            console.error('Audio context initialization failed:', e);
        }
    }

    setMood(mood, tempo) {
        this.mood = mood;
        this.tempo = tempo || NOISE_CONFIG.MOOD_LEVELS[mood].tempo;
    }

    getAudioData() {
        if (!this.analyser) return null;
        this.analyser.getByteFrequencyData(this.frequencyData);
        return {
            frequencyData: this.frequencyData
        };
    }

    createInstrument(type, options = {}) {
        if (!this.audioContext) return null;

        const instrument = {
            type: type,
            options: options,
            playNote: (note, duration = 1, time = 0) => {
                if (!this.audioContext || !this.isPlaying) return null;

                const now = this.audioContext.currentTime + time;
                const osc = this.audioContext.createOscillator();
                const gain = this.audioContext.createGain();

                switch(type) {
                    case 'piano':
                        osc.type = 'triangle';
                        break;
                    case 'strings':
                        osc.type = 'sine';
                        break;
                    case 'synth':
                        osc.type = Math.random() > 0.5 ? 'square' : 'sawtooth';
                        break;
                    case 'ambient':
                        osc.type = 'sine';
                        break;
                    default:
                        osc.type = 'sine';
                }

                osc.frequency.value = this.noteToFrequency(note);

                let attack = 0.01;
                let decay = 0.1;
                let sustain = 0.7;
                let release = 0.3;
                let maxGain = 0.7;

                switch(this.mood) {
                    case 'serene':
                        attack = 0.01; decay = 0.1; sustain = 0.8; release = 0.2; maxGain = 0.8;
                        break;
                    case 'calm':
                        attack = 0.02; decay = 0.15; sustain = 0.7; release = 0.3; maxGain = 0.6;
                        break;
                    case 'balance':
                        attack = 0.03; decay = 0.2; sustain = 0.6; release = 0.4; maxGain = 0.5;
                        break;
                    case 'melancholy':
                        attack = 0.05; decay = 0.3; sustain = 0.4; release = 0.6; maxGain = 0.4;
                        break;
                    case 'gloomy':
                        attack = 0.1; decay = 0.4; sustain = 0.2; release = 1.0; maxGain = 0.3;
                        break;
                }

                gain.gain.setValueAtTime(0, now);
                gain.gain.linearRampToValueAtTime(maxGain, now + attack);
                gain.gain.linearRampToValueAtTime(maxGain * sustain, now + attack + decay);
                gain.gain.setValueAtTime(maxGain * sustain, now + attack + decay + duration - release);
                gain.gain.linearRampToValueAtTime(0, now + attack + decay + duration);

                osc.connect(gain);
                gain.connect(this.masterGain);
                osc.start(now);
                osc.stop(now + attack + decay + duration);

                return { osc, gain };
            },
            playChord: (notes, duration = 1, time = 0) => {
                const voices = [];
                notes.forEach((note, i) => {
                    voices.push(this.playNote(note, duration, time + i * 0.05));
                });
                return voices;
            }
        };

        return instrument;
    }

    noteToFrequency(note) {
        const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
        let keyNumber = 0;
        
        if (typeof note === 'string') {
            const match = note.match(/([A-G]#?)(\d+)/);
            if (match) {
                const noteName = match[1];
                const octave = parseInt(match[2]);
                const noteIndex = notes.indexOf(noteName);
                keyNumber = (octave + 1) * 12 + noteIndex;
            }
        } else {
            keyNumber = note;
        }
        
        return 440 * Math.pow(2, (keyNumber - 69) / 12);
    }

    generateMelody() {
        const baseNotes = {
            'serene': [60, 64, 67, 72, 76],      // C major - bright and happy
            'calm': [57, 60, 64, 67, 70],        // A minor - peaceful
            'balance': [60, 62, 65, 67, 69],     // C major pentatonic - neutral
            'melancholy': [55, 58, 62, 65, 67],  // G minor - sad but gentle
            'gloomy': [48, 51, 55, 58, 60]       // C minor - deep and melancholic
        };
        
        const notes = baseNotes[this.mood] || baseNotes['balance'];
        const melodyLength = Math.floor(Math.random() * 4) + 4;
        const melody = [];
        
        for (let i = 0; i < melodyLength; i++) {
            melody.push(notes[Math.floor(Math.random() * notes.length)]);
        }
        
        return melody;
    }

    startMusic() {
        if (!this.audioContext) return;
        
        if (this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
        
        this.isPlaying = true;
        this.stopMusic();
        
        const instrument = this.createInstrument('piano');
        const melody = this.generateMelody();
        const noteDuration = 60 / this.tempo;
        
        this.intervals.push(setInterval(() => {
            if (!this.isPlaying) return;
            
            const startTime = this.audioContext.currentTime;
            melody.forEach((note, i) => {
                instrument.playNote(note, noteDuration * 0.9, i * noteDuration * 0.5);
            });
        }, noteDuration * melody.length * 1000 * 0.5));
    }

    stopMusic() {
        this.isPlaying = false;
        
        this.intervals.forEach(interval => clearInterval(interval));
        this.intervals = [];
        
        this.currentNotes.forEach(note => {
            if (note.osc) note.osc.stop();
        });
        this.currentNotes = [];
    }

    setVolume(volume) {
        this.volume = volume;
        if (this.masterGain) {
            this.masterGain.gain.value = volume;
        }
    }

    destroy() {
        this.stopMusic();
        if (this.audioContext) {
            this.audioContext.close();
            this.audioContext = null;
        }
    }
}

// Ключевое исправление: класс должен называться NoiseController, а не WaveController
class NoiseController {
    constructor() {
        this.canvas = null;
        this.session = null;
        this.waveSystem = null;
        this.audioEngine = null;
        this.editor = null;
        this.noiseBtn = null;
        this.closeBtn = null;
        this.playBtn = null;
        this.stopBtn = null;
        this.volumeSlider = null;
        this.statusText = null;
        this.progressBar = null;
        this.noiseContainer = null;
        this.isInitialized = false;
        this.isActive = false;
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.setupDOM();
            this.setupEventListeners();
            this.setupAudio();
            this.isInitialized = true;
            console.log('NoiseController successfully initialized');
        });
    }

    setupDOM() {
        this.canvas = document.getElementById('noise-canvas');
        this.editor = document.getElementById('editor');
        this.noiseBtn = document.getElementById('noise-btn');
        this.closeBtn = document.getElementById('noise-close-btn');
        this.playBtn = document.getElementById('noise-play-btn');
        this.stopBtn = document.getElementById('noise-stop-btn');
        this.volumeSlider = document.getElementById('noise-volume');
        this.statusText = document.getElementById('noise-status');
        this.progressBar = document.getElementById('noise-progress-bar');
        this.noiseContainer = document.getElementById('noise-canvas-container');
        
        if (!this.canvas) {
            console.error('Noise canvas not found');
        }
        
        if (!this.noiseBtn) {
            console.error('Noise button not found');
        }
        
        if (!this.noiseContainer) {
            console.error('Noise container not found');
        }
    }

    setupEventListeners() {
        if (this.noiseBtn) {
            this.noiseBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggle();
            });
        }
        
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.close();
            });
        }
        
        if (this.noiseContainer) {
            this.noiseContainer.addEventListener('click', (e) => {
                if (e.target === this.noiseContainer) {
                    this.close();
                }
            });
        }
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isActive) {
                this.close();
            }
        });
        
        window.addEventListener('resize', () => {
            if (this.isActive && this.waveSystem) {
                this.waveSystem.resize();
            }
        });
        
        if (this.playBtn) {
            this.playBtn.addEventListener('click', () => {
                this.play();
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
                if (this.audioEngine) {
                    this.audioEngine.setVolume(value);
                }
                if (this.statusText) {
                    this.statusText.textContent = `Volume: ${Math.round(value * 100)}%`;
                    setTimeout(() => {
                        if (this.statusText && this.statusText.textContent.includes('Volume:')) {
                            this.updateStatus();
                        }
                    }, 1000);
                }
            });
        }
    }

    setupAudio() {
        this.audioEngine = new AudioEngine('balance', 90);
        this.startAudioUpdates();
    }

    startAudioUpdates() {
        const updateAudio = () => {
            if (this.audioEngine && this.audioEngine.isPlaying) {
                const audioData = this.audioEngine.getAudioData();
                if (this.waveSystem && audioData) {
                    this.waveSystem.setAudioData(audioData);
                }
            }
            requestAnimationFrame(updateAudio);
        };
        
        requestAnimationFrame(updateAudio);
    }

    toggle() {
        if (this.isActive) {
            this.close();
        } else {
            this.open();
        }
    }

    open() {
        if (this.isActive) return;
        
        if (!this.editor) {
            return;
        }
        
        const text = this.editor.innerText.trim();
        
        if (!text) {
            alert('Please enter some text to visualize');
            return;
        }
        
        this.session = new SonicSession(text);
        this.audioEngine.setMood(this.session.mood, this.session.tempo);
        
        if (this.waveSystem) {
            this.waveSystem.destroy();
        }
        
        this.waveSystem = new WaveSystem(this.canvas, this.session);
        
        if (this.noiseContainer) {
            this.noiseContainer.style.display = 'block';
            setTimeout(() => {
                this.noiseContainer.classList.remove('closing');
            }, 10);
        }
        
        this.isActive = true;
        this.updateStatus();
    }

    close() {
        if (!this.isActive) return;
        
        if (this.noiseContainer) {
            this.noiseContainer.classList.add('closing');
            setTimeout(() => {
                this.noiseContainer.style.display = 'none';
                this.noiseContainer.classList.remove('closing');
            }, 300);
        }
        
        this.isActive = false;
        
        if (this.waveSystem) {
            this.waveSystem.destroy();
            this.waveSystem = null;
        }
        
        if (this.audioEngine) {
            this.audioEngine.stopMusic();
        }
    }

    play() {
        if (!this.isActive || !this.audioEngine) return;
        
        this.audioEngine.startMusic();
        
        if (this.playBtn) this.playBtn.disabled = true;
        if (this.stopBtn) this.stopBtn.disabled = false;
        
        this.updateStatus('Playing...');
        this.startProgressBar();
    }

    stop() {
        if (this.audioEngine) {
            this.audioEngine.stopMusic();
        }
        
        if (this.playBtn) this.playBtn.disabled = false;
        if (this.stopBtn) this.stopBtn.disabled = true;
        
        this.updateStatus();
        this.stopProgressBar();
    }

    updateStatus(extra = '') {
        if (!this.statusText) return;
        
        if (extra) {
            this.statusText.textContent = extra;
        } else if (this.session) {
            const mood = this.session.mood;
            const waves = this.session.particleCount;
            this.statusText.textContent = `${mood} • ${waves} waves • ready`;
        } else {
            this.statusText.textContent = 'Ready to play';
        }
    }

    startProgressBar() {
        if (!this.progressBar) return;
        
        let progress = 0;
        const interval = setInterval(() => {
            if (!this.audioEngine || !this.audioEngine.isPlaying) {
                clearInterval(interval);
                if (this.progressBar) {
                    this.progressBar.style.width = '0%';
                }
                return;
            }
            
            progress = (progress + 0.5) % 100;
            if (this.progressBar) {
                this.progressBar.style.width = `${progress}%`;
            }
        }, 50);
        
        this.progressInterval = interval;
    }

    stopProgressBar() {
        if (this.progressInterval) {
            clearInterval(this.progressInterval);
            this.progressInterval = null;
        }
        
        if (this.progressBar) {
            this.progressBar.style.width = '0%';
        }
    }

    destroy() {
        this.stop();
        
        if (this.waveSystem) {
            this.waveSystem.destroy();
        }
        
        if (this.audioEngine) {
            this.audioEngine.destroy();
        }
    }
}

// Совместимость с глобальным пространством имен, как в chaos.js
let noiseController = null;

function initializeNoise() {
    try {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                noiseController = new NoiseController();
            });
        } else {
            noiseController = new NoiseController();
        }
    } catch (error) {
        console.error('NOISE initialization failed:', error);
        const btn = document.getElementById('noise-btn');
        if (btn) btn.style.display = 'none';
    }
}

// Автоматическая инициализация при загрузке страницы
initializeNoise();

})();
