(function() {
    'use strict';
    
    const CONFIG = {
        VERSION: '1.0',
        PARTICLES: {
            desktop: { min: 50, max: 100 },
            mobile: { min: 25, max: 50 }
        },
        PERFORMANCE: {
            mobile: { trailLength: 3, fps: 30 },
            desktop: { trailLength: 5, fps: 60 }
        },
        SENSITIVITY: {
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
                    'чисто', 'невинно', 'целомудренно', 'кротко', 'смиренно', 'усердно', 'прилежно', 'трудолюбиво', 
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
        }
    };
    
    const DeviceDetector = {
        isMobile: () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768,
        isTouch: () => 'ontouchstart' in window || navigator.maxTouchPoints > 0,
        getPerformanceMode() {
            return this.isMobile() ? CONFIG.PERFORMANCE.mobile : CONFIG.PERFORMANCE.desktop;
        }
    };
    
    class QuantumSession {
        constructor(text = '') {
            this.text = text.trim();
            this.seed = this.generateSeed();
            this.sessionId = this.generateSessionId();
            this.physics = this.generatePhysics();
            this.behaviors = this.generateBehaviors();
            this.language = this.detectLanguage();
            this.creationTime = Date.now();
            this.uniqueHash = this.createHash();
            this.stats = this.calculateTextStats();
            this.sensitivity = this.analyzeSensitivity();
            this.particleCount = this.generateParticleCount();
            this.intensityMultipliers = this.generateIntensityMultipliers();
            this.colorPalette = this.generateColorPalette(100);
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
        
        generateSessionId() {
            const chars = '0123456789abcdefghijklmnopqrstuvwxyz';
            let id = 'textuniverse-';
            for (let i = 0; i < 10; i++) {
                id += chars[Math.floor(Math.random() * chars.length)];
            }
            return id;
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
            const allBehaviors = ['orbit', 'swarm', 'wave', 'chaos', 'spiral', 'magnetic', 'pulse'];
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
            const range = isMobile ? CONFIG.PARTICLES.mobile : CONFIG.PARTICLES.desktop;
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
        
        analyzeSensitivity() {
            if (this.text.length === 0) return 'neutral';
            
            const textLower = this.text.toLowerCase();
            let warmCount = 0;
            let darkCount = 0;
            
            ['ru', 'en'].forEach(lang => {
                if (CONFIG.SENSITIVITY.warmWords[lang]) {
                    CONFIG.SENSITIVITY.warmWords[lang].forEach(word => {
                        const regex = new RegExp(`(^|[^\\p{L}])${this.escapeRegExp(word)}([^\\p{L}]|$)`, 'giu');
                        const matches = textLower.match(regex);
                        if (matches) warmCount += matches.length;
                    });
                }
                
                if (CONFIG.SENSITIVITY.darkWords[lang]) {
                    CONFIG.SENSITIVITY.darkWords[lang].forEach(word => {
                        const regex = new RegExp(`(^|[^\\p{L}])${this.escapeRegExp(word)}([^\\p{L}]|$)`, 'giu');
                        const matches = textLower.match(regex);
                        if (matches) darkCount += matches.length;
                    });
                }
            });
            
            if (warmCount === 0 && darkCount === 0) return 'neutral';
            
            const totalWords = this.stats.words || 1;
            const warmRatio = warmCount / totalWords;
            const darkRatio = darkCount / totalWords;
            
            if (warmRatio > 0.7 && darkRatio < 0.15) return 'hot';
            if (warmRatio > 0.55) return 'warm';
            if (darkRatio > 0.7 && warmRatio < 0.15) return 'haze';
            if (darkRatio > 0.55) return 'dark';
            if (Math.abs(warmRatio - darkRatio) < 0.15) return 'neutral';
            
            return warmRatio > darkRatio ? 'warm' : 'dark';
        }
        
        escapeRegExp(string) {
            return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        }
        
        generateIntensityMultipliers() {
            switch(this.sensitivity) {
                case 'hot':
                    return { speed: 1.5, amplitude: 1.5, size: 1.2 };
                case 'warm':
                    return { speed: 1.2, amplitude: 1.2, size: 1.1 };
                case 'neutral':
                    return { speed: 1.0, amplitude: 1.0, size: 1.0 };
                case 'dark':
                    return { speed: 0.8, amplitude: 0.8, size: 0.9 };
                case 'haze':
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
                
                switch(this.sensitivity) {
                    case 'hot':
                        h = rng(0, 60) + (Math.random() > 0.5 ? 300 : 0);
                        s = rng(70, 100);
                        l = rng(40, 60);
                        break;
                    case 'warm':
                        h = rng(20, 80);
                        s = rng(50, 80);
                        l = rng(50, 70);
                        break;
                    case 'neutral':
                        h = rng(0, 360);
                        s = rng(40, 70);
                        l = rng(40, 60);
                        break;
                    case 'dark':
                        h = rng(0, 360);
                        s = rng(20, 50);
                        l = rng(20, 40);
                        break;
                    case 'haze':
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
            lines.push('semantic physic visualization');
            lines.push(`id: ${this.sessionId}`);
            if (this.text.length > 0) {
                lines.push(`objects: ${this.particleCount}`);
                lines.push(`sensitivity: ${this.sensitivity}`);
            } else {
                lines.push('objects: ' + this.particleCount);
            }
            lines.push(`behaviors: ${this.behaviors.join(', ')}`);
            return lines.join('\n');
        }
    }
    
    class ParticleSystem {
        constructor(canvas, session) {
            this.canvas = canvas;
            this.ctx = canvas.getContext('2d');
            this.session = session;
            this.particles = [];
            this.isMobile = DeviceDetector.isMobile();
            this.performance = DeviceDetector.getPerformanceMode();
            this.time = 0;
            this.interactionPoint = { x: 0, y: 0, active: false };
            this.init();
        }
        
        init() {
            this.resize();
            this.generateParticles();
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
        
        generateParticles() {
            this.particles = [];
            const text = this.session.text;
            const particleCount = this.session.particleCount;
            if (text.length === 0) {
                this.generateAbstractParticles(particleCount);
            } else {
                this.generateSemanticParticles(text, particleCount);
            }
        }
        
        generateAbstractParticles(count) {
            const colors = this.session.getColorPalette();
            const centerX = this.canvas.width / 2 / (window.devicePixelRatio || 1);
            const centerY = this.canvas.height / 2 / (window.devicePixelRatio || 1);
            const maxRadius = Math.min(centerX, centerY) * 0.7;
            const sizeMultiplier = this.session.intensityMultipliers.size;
            for (let i = 0; i < count; i++) {
                const angle = (i / count) * Math.PI * 2;
                const radius = (i % 5 + 1) * (maxRadius / 5);
                const baseSize = 1 + Math.random() * 3;
                const particleSize = Math.min(baseSize * sizeMultiplier, 6);
                this.particles.push({
                    type: 'abstract',
                    x: centerX + Math.cos(angle) * radius,
                    y: centerY + Math.sin(angle) * radius,
                    vx: 0,
                    vy: 0,
                    radius: particleSize,
                    color: colors[i % colors.length],
                    orbitRadius: radius,
                    orbitSpeed: 0.001 + Math.random() * 0.002,
                    orbitAngle: angle,
                    life: 1,
                    trail: [],
                    behavior: this.session.behaviors[i % this.session.behaviors.length]
                });
            }
        }
        
        generateSemanticParticles(text, count) {
            const colors = this.session.getColorPalette();
            const centerX = this.canvas.width / 2 / (window.devicePixelRatio || 1);
            const centerY = this.canvas.height / 2 / (window.devicePixelRatio || 1);
            const words = this.extractRandomWords(text, count * 2);
            const sizeMultiplier = this.session.intensityMultipliers.size;
            for (let i = 0; i < count; i++) {
                const angle = (i / count) * Math.PI * 2;
                const distance = 30 + (i % 5) * 15;
                const baseSize = 1.5 + Math.random() * 3;
                const particleSize = Math.min(baseSize * sizeMultiplier, 6);
                const colorIndex = Math.floor(Math.random() * colors.length);
                const color = colors[colorIndex];
                this.particles.push({
                    type: 'semantic',
                    x: centerX + Math.cos(angle) * distance,
                    y: centerY + Math.sin(angle) * distance,
                    vx: 0,
                    vy: 0,
                    radius: particleSize,
                    color: color,
                    originalX: centerX + Math.cos(angle) * distance,
                    originalY: centerY + Math.sin(angle) * distance,
                    life: 1,
                    trail: [],
                    behavior: this.session.behaviors[i % this.session.behaviors.length]
                });
            }
        }
        
        extractRandomWords(text, count) {
            const allWords = text
                .toLowerCase()
                .replace(/[^\p{L}\s]/gu, ' ')
                .split(/\s+/)
                .filter(w => w.length > 1);
            if (allWords.length === 0) return [];
            const result = [];
            for (let i = 0; i < count; i++) {
                const randomIndex = Math.floor(Math.random() * allWords.length);
                result.push(allWords[randomIndex]);
            }
            return result;
        }
        
        setupEventListeners() {
            const canvas = this.canvas;
            canvas.addEventListener('mousemove', (e) => {
                const rect = canvas.getBoundingClientRect();
                const dpr = window.devicePixelRatio || 1;
                this.interactionPoint.x = (e.clientX - rect.left) * (canvas.width / canvas.offsetWidth) / dpr;
                this.interactionPoint.y = (e.clientY - rect.top) * (canvas.height / canvas.offsetHeight) / dpr;
                this.interactionPoint.active = true;
            });
            canvas.addEventListener('mouseleave', () => {
                this.interactionPoint.active = false;
                const dpr = window.devicePixelRatio || 1;
                this.interactionPoint.x = this.canvas.width / 2 / dpr;
                this.interactionPoint.y = this.canvas.height / 2 / dpr;
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
                }
            }, { passive: false });
            canvas.addEventListener('touchend', () => {
                this.interactionPoint.active = false;
                const dpr = window.devicePixelRatio || 1;
                this.interactionPoint.x = this.canvas.width / 2 / dpr;
                this.interactionPoint.y = this.canvas.height / 2 / dpr;
            });
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
                this.applyBehavior(particle, index, multipliers);
                this.applyPhysics(particle, physics, multipliers);
                if (this.interactionPoint.active) {
                    this.applyInteraction(particle, multipliers);
                }
                particle.x += particle.vx * physics.timeScale * multipliers.speed;
                particle.y += particle.vy * physics.timeScale * multipliers.speed;
                particle.vx *= physics.viscosity;
                particle.vy *= physics.viscosity;
                this.handleBoundaries(particle);
            });
        }
        
        applyBehavior(particle, index, multipliers) {
            const behaviors = this.session.behaviors;
            const time = this.time;
            behaviors.forEach(behavior => {
                switch(behavior) {
                    case 'orbit':
                        if (particle.orbitRadius) {
                            particle.orbitAngle += particle.orbitSpeed * multipliers.speed;
                            const centerX = this.canvas.width / 2 / (window.devicePixelRatio || 1);
                            const centerY = this.canvas.height / 2 / (window.devicePixelRatio || 1);
                            const targetX = centerX + Math.cos(particle.orbitAngle) * particle.orbitRadius;
                            const targetY = centerY + Math.sin(particle.orbitAngle) * particle.orbitRadius;
                            particle.vx += (targetX - particle.x) * 0.02 * multipliers.amplitude;
                            particle.vy += (targetY - particle.y) * 0.02 * multipliers.amplitude;
                        }
                        break;
                    case 'swarm':
                        if (index % 3 === 0) {
                            const centerX = this.canvas.width / 2 / (window.devicePixelRatio || 1);
                            const centerY = this.canvas.height / 2 / (window.devicePixelRatio || 1);
                            const dx = centerX - particle.x;
                            const dy = centerY - particle.y;
                            const distance = Math.sqrt(dx * dx + dy * dy);
                            if (distance > 30) {
                                particle.vx += dx * 0.002 * multipliers.amplitude;
                                particle.vy += dy * 0.002 * multipliers.amplitude;
                            }
                        }
                        break;
                    case 'wave':
                        particle.vy += Math.sin(time + particle.x * 0.02) * 0.15 * multipliers.amplitude;
                        particle.vx += Math.cos(time + particle.y * 0.02) * 0.15 * multipliers.amplitude;
                        break;
                    case 'chaos':
                        particle.vx += (Math.random() - 0.5) * 0.3 * multipliers.amplitude;
                        particle.vy += (Math.random() - 0.5) * 0.3 * multipliers.amplitude;
                        break;
                    case 'spiral':
                        const centerX = this.canvas.width / 2 / (window.devicePixelRatio || 1);
                        const centerY = this.canvas.height / 2 / (window.devicePixelRatio || 1);
                        const angle = Math.atan2(particle.y - centerY, particle.x - centerX);
                        particle.vx += Math.cos(angle + Math.PI / 2) * 0.03 * multipliers.amplitude;
                        particle.vy += Math.sin(angle + Math.PI / 2) * 0.03 * multipliers.amplitude;
                        break;
                    case 'magnetic':
                        const dx = this.interactionPoint.x - particle.x;
                        const dy = this.interactionPoint.y - particle.y;
                        const distance = Math.sqrt(dx * dx + dy * dy);
                        if (distance > 10) {
                            const force = 0.001 / distance * multipliers.amplitude;
                            particle.vx += dx * force;
                            particle.vy += dy * force;
                        }
                        break;
                    case 'pulse':
                        const pulse = Math.sin(time * 2 + index) * 0.5 + 0.5;
                        const newRadius = particle.radius + pulse * 0.3 * multipliers.amplitude;
                        particle.radius = Math.min(newRadius, 6);
                        break;
                }
            });
        }
        
        applyPhysics(particle, physics, multipliers) {
            const centerX = this.canvas.width / 2 / (window.devicePixelRatio || 1);
            const centerY = this.canvas.height / 2 / (window.devicePixelRatio || 1);
            const dx = centerX - particle.x;
            const dy = centerY - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance > 20) {
                const force = physics.attraction / distance * multipliers.amplitude;
                particle.vx += dx * force;
                particle.vy += dy * force;
            }
            particle.vy += physics.gravity * 0.08 * multipliers.amplitude;
            if (physics.turbulence > 0) {
                particle.vx += (Math.random() - 0.5) * physics.turbulence * 0.5 * multipliers.amplitude;
                particle.vy += (Math.random() - 0.5) * physics.turbulence * 0.5 * multipliers.amplitude;
            }
        }
        
        applyInteraction(particle, multipliers) {
            const dx = this.interactionPoint.x - particle.x;
            const dy = this.interactionPoint.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 80) {
                if (distance < 15) {
                    const force = 0.8 / distance * multipliers.amplitude;
                    particle.vx -= dx * force;
                    particle.vy -= dy * force;
                } else {
                    const force = 0.03 * multipliers.amplitude;
                    particle.vx += dx * force;
                    particle.vy += dy * force;
                }
            }
        }
        
        handleBoundaries(particle) {
            const width = this.canvas.width / (window.devicePixelRatio || 1);
            const height = this.canvas.height / (window.devicePixelRatio || 1);
            const margin = particle.radius * 2;
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
            const width = this.canvas.width / (window.devicePixelRatio || 1);
            const height = this.canvas.height / (window.devicePixelRatio || 1);
            ctx.fillStyle = 'rgba(10, 14, 23, 0.1)';
            ctx.fillRect(0, 0, width, height);
            if (!this.isMobile) {
                this.drawGrid(ctx, width, height);
            }
            this.particles.forEach(particle => {
                this.drawParticle(particle);
            });
            if (this.interactionPoint.active) {
                this.drawInteractionPoint(ctx);
            } else {
                this.drawCenterPoint(ctx);
            }
            this.drawInfoText(ctx, width, height);
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
        
        drawParticle(particle) {
            const ctx = this.ctx;
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
        
        drawCenterPoint(ctx) {
            const centerX = this.canvas.width / 2 / (window.devicePixelRatio || 1);
            const centerY = this.canvas.height / 2 / (window.devicePixelRatio || 1);
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
        
        drawInteractionPoint(ctx) {
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
            ctx.font = '11px monospace';
            ctx.textAlign = 'left';
            ctx.textBaseline = 'top';
            lines.forEach((line, index) => {
                ctx.fillText(line, 15, 15 + (index * 16));
            });
        }
        
        destroy() {
            this.particles = [];
            const ctx = this.canvas.getContext('2d');
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }
    
    class ChaosController {
        constructor() {
            this.btn = document.getElementById('chaos-btn');
            this.container = document.getElementById('chaos-canvas-container');
            this.canvas = document.getElementById('chaos-canvas');
            this.closeBtn = document.getElementById('chaos-close-btn');
            this.isActive = false;
            this.particleSystem = null;
            this.animationId = null;
            this.currentSession = null;
            this.lastTime = 0;
            this.init();
        }
        
        init() {
            if (!this.btn || !this.container || !this.canvas) {
                console.warn('ChaOS: Required elements not found');
                return;
            }
            this.setupEventListeners();
            this.updateCloseButton();
            console.log('Chaos universe v' + CONFIG.VERSION + ' initialized');
        }
        
        setupEventListeners() {
            this.btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggle();
            });
            this.closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.close();
            });
            this.container.addEventListener('click', (e) => {
                if (e.target === this.container) {
                    this.close();
                }
            });
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.isActive) {
                    this.close();
                }
            });
            let resizeTimeout;
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(() => {
                    if (this.isActive && this.particleSystem) {
                        this.particleSystem.resize();
                    }
                }, 250);
            });
            window.addEventListener('orientationchange', () => {
                setTimeout(() => {
                    if (this.isActive && this.particleSystem) {
                        this.particleSystem.resize();
                        this.particleSystem.generateParticles();
                    }
                }, 300);
            });
        }
        
        updateCloseButton() {
            this.closeBtn.style.cssText = `
                position: absolute;
                top: 10px;
                right: 10px;
                background: transparent;
                border: none;
                color: rgba(200, 200, 200, 0.9);
                font-size: 28px;
                cursor: pointer;
                z-index: 10001;
                padding: 0;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s ease;
                font-family: Arial, sans-serif;
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
        
        toggle() {
            if (this.isActive) {
                this.close();
            } else {
                this.open();
            }
        }
        
        open() {
            if (this.isActive) return;
            this.isActive = true;
            this.container.style.display = 'block';
            this.container.classList.remove('closing');
            const text = this.getEditorText();
            this.currentSession = new QuantumSession(text);
            this.particleSystem = new ParticleSystem(this.canvas, this.currentSession);
            this.startAnimation();
            this.triggerEvent('chaos_open', {
                sessionId: this.currentSession.sessionId,
                textLength: text.length,
                sensitivity: this.currentSession.sensitivity,
                particleCount: this.currentSession.particleCount
            });
        }
        
        close() {
            if (!this.isActive) return;
            this.container.classList.add('closing');
            setTimeout(() => {
                this.isActive = false;
                this.container.style.display = 'none';
                this.container.classList.remove('closing');
                this.stopAnimation();
                if (this.particleSystem) {
                    this.particleSystem.destroy();
                    this.particleSystem = null;
                }
                this.currentSession = null;
            }, 300);
        }
        
        getEditorText() {
            const editor = document.getElementById('editor');
            return editor ? editor.innerText || editor.textContent || '' : '';
        }
        
        startAnimation() {
            this.stopAnimation();
            this.lastTime = performance.now();
            this.animate();
        }
        
        stopAnimation() {
            if (this.animationId) {
                cancelAnimationFrame(this.animationId);
                this.animationId = null;
            }
        }
        
        animate(currentTime = performance.now()) {
            if (!this.isActive || !this.particleSystem) return;
            const deltaTime = currentTime - this.lastTime;
            this.lastTime = currentTime;
            this.particleSystem.update(deltaTime);
            this.particleSystem.render();
            this.animationId = requestAnimationFrame((time) => this.animate(time));
        }
        
        triggerEvent(name, data) {
            if (typeof gtag !== 'undefined') {
                gtag('event', name, {
                    event_category: 'chaos_universe',
                    ...data
                });
            }
            const event = new CustomEvent('chaos:' + name, {
                detail: data,
                bubbles: true
            });
            document.dispatchEvent(event);
        }
    }
    
    let chaosController = null;
    
    function initializeChaos() {
        try {
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => {
                    chaosController = new ChaosController();
                });
            } else {
                chaosController = new ChaosController();
            }
        } catch (error) {
            console.error('ChaOS initialization failed:', error);
            const btn = document.getElementById('chaos-btn');
            if (btn) btn.style.display = 'none';
        }
    }
    
    initializeChaos();
})();



