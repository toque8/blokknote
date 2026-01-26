(function() {
  'use strict';
  
  console.log('=== WAVE UNIVERSE v2.0 INITIALIZED ===');
  
  // КОНФИГУРАЦИЯ (полная, включая слова как в chaos.js)
  const WAVE_CONFIG = {
    VERSION: '2.0',
    WORDS: {
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
    },
    
    // ПЯТЬ УРОВНЕЙ НАСТРОЕНИЯ (как в chaos)
    MOOD_LEVELS: {
      'hot': {        // Очень веселое
        color: '#FF6B6B',
        speed: 2.0,
        energy: 1.5,
        tempo: 160,
        brightness: 1.0,
        complexity: 0.9
      },
      'warm': {       // Веселое
        color: '#FFA726',
        speed: 1.5,
        energy: 1.2,
        tempo: 120,
        brightness: 0.8,
        complexity: 0.7
      },
      'neutral': {    // Нейтральное
        color: '#42A5F5',
        speed: 1.0,
        energy: 1.0,
        tempo: 90,
        brightness: 0.6,
        complexity: 0.5
      },
      'dark': {       // Грустное
        color: '#5C6BC0',
        speed: 0.7,
        energy: 0.8,
        tempo: 70,
        brightness: 0.4,
        complexity: 0.3
      },
      'haze': {       // Очень грустное
        color: '#37474F',
        speed: 0.4,
        energy: 0.5,
        tempo: 50,
        brightness: 0.2,
        complexity: 0.2
      }
    },
    
    // МУЗЫКАЛЬНЫЕ ПАРАМЕТРЫ ДЛЯ КАЖДОГО НАСТРОЕНИЯ
    MUSIC_PROFILES: {
      'hot': {
        scale: [0, 2, 4, 5, 7, 9, 11], // Мажорная
        waveType: 'sine',
        attack: 0.01,
        release: 0.3,
        vibrato: 0.2,
        reverb: 0.4
      },
      'warm': {
        scale: [0, 2, 4, 7, 9], // Пентатоника
        waveType: 'triangle',
        attack: 0.02,
        release: 0.5,
        vibrato: 0.1,
        reverb: 0.3
      },
      'neutral': {
        scale: [0, 2, 4, 7, 9], // Нейтральная
        waveType: 'sine',
        attack: 0.03,
        release: 0.7,
        vibrato: 0.05,
        reverb: 0.2
      },
      'dark': {
        scale: [0, 2, 3, 5, 7, 8, 10], // Минорная
        waveType: 'sawtooth',
        attack: 0.05,
        release: 1.0,
        vibrato: 0.0,
        reverb: 0.5
      },
      'haze': {
        scale: [0, 1, 3, 5, 6, 8, 10], // Мрачная
        waveType: 'square',
        attack: 0.1,
        release: 1.5,
        vibrato: 0.0,
        reverb: 0.7
      }
    },
    
    // ВИЗУАЛИЗАЦИЯ - ТИПЫ ВОЛН
    WAVE_TYPES: ['sine', 'cosine', 'tangent', 'logarithm', 'exponential', 'bessel'],
    
    // ОПРЕДЕЛЕНИЕ УСТРОЙСТВА
    DEVICE: {
      isMobile: () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768,
      getWaveCount: () => {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
        return isMobile ? 
          Math.floor(Math.random() * 25) + 25 :  // 25-50 на мобильных
          Math.floor(Math.random() * 50) + 50;   // 50-100 на десктопе
      }
    }
  };
  
  // КЛАСС ДЛЯ АНАЛИЗА ТЕКСТА
  class TextAnalyzer {
    constructor(text = '') {
      this.text = text.trim();
      this.sessionId = 'wave-' + Math.random().toString(36).substr(2, 9);
      this.language = this.detectLanguage();
      this.mood = this.analyzeMood();
      this.waveCount = WAVE_CONFIG.DEVICE.getWaveCount();
      this.stats = this.calculateStats();
    }
    
    detectLanguage() {
      const ruChars = this.text.match(/[а-яА-ЯёЁ]/g) || [];
      const enChars = this.text.match(/[a-zA-Z]/g) || [];
      if (ruChars.length > enChars.length * 1.5) return 'ru';
      if (enChars.length > ruChars.length * 1.5) return 'en';
      return 'mixed';
    }
    
    analyzeMood() {
      if (this.text.length === 0) return 'neutral';
      
      const textLower = this.text.toLowerCase();
      let warmCount = 0;
      let darkCount = 0;
      
      // Проверяем теплые слова
      ['ru', 'en'].forEach(lang => {
        if (WAVE_CONFIG.WORDS.warmWords[lang]) {
          WAVE_CONFIG.WORDS.warmWords[lang].forEach(word => {
            const regex = new RegExp(`(^|[^\\p{L}])${this.escapeRegExp(word)}([^\\p{L}]|$)`, 'giu');
            const matches = textLower.match(regex);
            if (matches) warmCount += matches.length;
          });
        }
        
        if (WAVE_CONFIG.WORDS.darkWords[lang]) {
          WAVE_CONFIG.WORDS.darkWords[lang].forEach(word => {
            const regex = new RegExp(`(^|[^\\p{L}])${this.escapeRegExp(word)}([^\\p{L}]|$)`, 'giu');
            const matches = textLower.match(regex);
            if (matches) darkCount += matches.length;
          });
        }
      });
      
      // Определяем настроение по соотношению слов
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
    
    calculateStats() {
      const stats = {
        characters: this.text.length,
        words: 0,
        sentences: 0
      };
      
      if (this.text.length > 0) {
        const words = this.text
          .replace(/[^\p{L}\s]/gu, ' ')
          .split(/\s+/)
          .filter(w => w.length > 1);
        stats.words = words.length;
        
        const sentences = this.text.split(/[.!?]+/).filter(s => s.trim().length > 0);
        stats.sentences = sentences.length;
      }
      
      return stats;
    }
    
    getInfoText() {
      const lines = [];
      lines.push('semantic visualisation of your text');
      lines.push(`id: ${this.sessionId}`);
      lines.push(`waves: ${this.waveCount}`);
      lines.push(`mood: ${this.mood}`);
      if (this.text.length > 0) {
        lines.push(`words: ${this.stats.words}`);
      }
      return lines.join('\n');
    }
    
    getMoodConfig() {
      return WAVE_CONFIG.MOOD_LEVELS[this.mood] || WAVE_CONFIG.MOOD_LEVELS.neutral;
    }
    
    getMusicProfile() {
      return WAVE_CONFIG.MUSIC_PROFILES[this.mood] || WAVE_CONFIG.MUSIC_PROFILES.neutral;
    }
  }
  
  // КЛАСС ДЛЯ ВИЗУАЛИЗАЦИИ ВОЛН
  class WaveVisualizer {
    constructor(canvas, analyzer) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.analyzer = analyzer;
      this.moodConfig = analyzer.getMoodConfig();
      this.waves = [];
      this.time = 0;
      this.isAnimating = false;
      this.animationId = null;
      
      this.init();
    }
    
    init() {
      this.resize();
      this.generateWaves();
    }
    
    resize() {
      const dpr = window.devicePixelRatio || 1;
      const rect = this.canvas.getBoundingClientRect();
      this.canvas.width = rect.width * dpr;
      this.canvas.height = rect.height * dpr;
      this.ctx.scale(dpr, dpr);
    }
    
    generateWaves() {
      this.waves = [];
      const waveCount = this.analyzer.waveCount;
      const width = this.canvas.width / (window.devicePixelRatio || 1);
      const height = this.canvas.height / (window.devicePixelRatio || 1);
      const moodConfig = this.moodConfig;
      
      for (let i = 0; i < waveCount; i++) {
        const waveType = WAVE_CONFIG.WAVE_TYPES[Math.floor(Math.random() * WAVE_CONFIG.WAVE_TYPES.length)];
        const amplitude = (Math.random() * 40 + 20) * moodConfig.energy;
        const frequency = (Math.random() * 0.02 + 0.01) * moodConfig.speed;
        const phase = Math.random() * Math.PI * 2;
        const speed = (Math.random() * 0.5 + 0.5) * moodConfig.speed;
        const thickness = Math.random() * 2 + 1;
        
        // Генерируем цвет на основе настроения
        const baseColor = this.hexToRgb(moodConfig.color);
        const hueShift = (Math.random() - 0.5) * 60;
        const color = this.shiftColor(baseColor, hueShift, moodConfig.brightness);
        
        this.waves.push({
          type: waveType,
          amplitude,
          frequency,
          phase,
          speed,
          thickness,
          color: `rgba(${color.r}, ${color.g}, ${color.b}, ${0.3 + Math.random() * 0.7})`,
          yOffset: (i / waveCount) * height,
          seed: Math.random() * 1000
        });
      }
    }
    
    hexToRgb(hex) {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : { r: 0, g: 0, b: 0 };
    }
    
    shiftColor(rgb, hueShift, brightness) {
      // Простое смещение цвета
      const r = Math.min(255, Math.max(0, rgb.r * brightness + hueShift));
      const g = Math.min(255, Math.max(0, rgb.g * brightness));
      const b = Math.min(255, Math.max(0, rgb.b * brightness - hueShift));
      return { r, g, b };
    }
    
    calculateWaveY(x, wave, time) {
      const t = time * wave.speed + wave.phase + wave.seed;
      
      switch(wave.type) {
        case 'sine':
          return Math.sin(x * wave.frequency + t) * wave.amplitude;
        case 'cosine':
          return Math.cos(x * wave.frequency + t) * wave.amplitude;
        case 'tangent':
          return Math.tan(x * wave.frequency * 0.1 + t) * wave.amplitude;
        case 'logarithm':
          return Math.log(Math.abs(x * wave.frequency * 0.1) + 1) * Math.sin(t) * wave.amplitude;
        case 'exponential':
          return Math.exp(Math.sin(x * wave.frequency + t)) * wave.amplitude * 0.1;
        case 'bessel':
          // Аппроксимация функции Бесселя
          return Math.sin(x * wave.frequency + t) * Math.cos(t * 0.5) * wave.amplitude;
        default:
          return Math.sin(x * wave.frequency + t) * wave.amplitude;
      }
    }
    
    draw() {
      const ctx = this.ctx;
      const width = this.canvas.width / (window.devicePixelRatio || 1);
      const height = this.canvas.height / (window.devicePixelRatio || 1);
      
      // Очищаем с полупрозрачным фоном для эффекта шлейфа
      ctx.fillStyle = 'rgba(8, 12, 25, 0.1)';
      ctx.fillRect(0, 0, width, height);
      
      // Рисуем сетку (только на десктопе)
      if (!WAVE_CONFIG.DEVICE.isMobile()) {
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
      
      // Рисуем волны
      this.waves.forEach(wave => {
        ctx.beginPath();
        ctx.strokeStyle = wave.color;
        ctx.lineWidth = wave.thickness;
        ctx.lineJoin = 'round';
        
        const points = [];
        const step = 2;
        
        for (let x = 0; x <= width; x += step) {
          const y = wave.yOffset + this.calculateWaveY(x, wave, this.time);
          points.push({ x, y });
        }
        
        // Сглаживание кривой
        for (let i = 0; i < points.length; i++) {
          if (i === 0) {
            ctx.moveTo(points[i].x, points[i].y);
          } else {
            const prev = points[i - 1];
            const curr = points[i];
            const cpX = (prev.x + curr.x) / 2;
            const cpY1 = prev.y;
            const cpY2 = curr.y;
            ctx.quadraticCurveTo(cpX, cpY1, curr.x, curr.y);
          }
        }
        
        ctx.stroke();
      });
      
      // Рисуем информационный текст
      this.drawInfoText(ctx, width, height);
    }
    
    drawInfoText(ctx, width, height) {
      const infoText = this.analyzer.getInfoText();
      const lines = infoText.split('\n');
      ctx.fillStyle = 'rgba(150, 150, 150, 0.8)';
      ctx.font = '11px monospace';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      lines.forEach((line, index) => {
        ctx.fillText(line, 15, 15 + (index * 16));
      });
    }
    
    animate() {
      if (!this.isAnimating) return;
      
      this.time += 0.02 * this.moodConfig.speed;
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
  
  // КЛАСС ДЛЯ ГЕНЕРАЦИИ МУЗЫКИ
  class MusicComposer {
    constructor(analyzer) {
      this.analyzer = analyzer;
      this.moodConfig = analyzer.getMoodConfig();
      this.musicProfile = analyzer.getMusicProfile();
      this.audioContext = null;
      this.isPlaying = false;
      this.notes = [];
      this.currentNoteIndex = 0;
      this.intervalId = null;
      this.volume = 0.3;
      
      this.generateMelody();
    }
    
    generateMelody() {
      this.notes = [];
      const scale = this.musicProfile.scale;
      const mood = this.analyzer.mood;
      const text = this.analyzer.text;
      
      if (text.length === 0) {
        // Для пустого текста - простая нейтральная мелодия
        for (let i = 0; i < 16; i++) {
          const degree = i % scale.length;
          const octave = 3 + Math.floor(i / scale.length) % 2;
          const midiNote = 60 + scale[degree] + (octave * 12);
          const duration = 0.5 + Math.random() * 0.5;
          this.notes.push({ midiNote, duration });
        }
      } else {
        // Генерация мелодии на основе текста
        const words = text.toLowerCase()
          .replace(/[^\p{L}\s]/gu, ' ')
          .split(/\s+/)
          .filter(w => w.length > 1);
        
        const maxNotes = Math.min(32, words.length * 2);
        
        for (let i = 0; i < maxNotes; i++) {
          const word = words[i % words.length];
          const wordValue = this.calculateWordValue(word);
          
          // Определяем параметры ноты на основе настроения и значения слова
          const moodMultiplier = this.moodConfig.energy;
          const noteIntensity = (wordValue % 100) / 100;
          
          let degree;
          let octave;
          
          if (mood === 'hot' || mood === 'warm') {
            // Веселые настроения - более высокие ноты
            degree = (wordValue + i) % scale.length;
            octave = 4 + Math.floor(noteIntensity * 2);
          } else if (mood === 'dark' || mood === 'haze') {
            // Грустные настроения - более низкие ноты
            degree = (wordValue - i) % scale.length;
            if (degree < 0) degree += scale.length;
            octave = 2 + Math.floor(noteIntensity);
          } else {
            // Нейтральное - средний диапазон
            degree = (i * 3) % scale.length;
            octave = 3 + Math.floor(noteIntensity * 1.5);
          }
          
          const midiNote = 60 + scale[degree] + (octave * 12);
          const duration = 0.3 + (noteIntensity * 0.7) * moodMultiplier;
          
          this.notes.push({ midiNote, duration, word });
        }
      }
    }
    
    calculateWordValue(word) {
      let value = 0;
      for (let i = 0; i < word.length; i++) {
        value += word.charCodeAt(i);
      }
      return value % 100;
    }
    
    midiToFrequency(midiNote) {
      return 440 * Math.pow(2, (midiNote - 69) / 12);
    }
    
    playNote(midiNote, duration) {
      if (!this.audioContext) {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      }
      
      const frequency = this.midiToFrequency(midiNote);
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      oscillator.type = this.musicProfile.waveType;
      oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
      
      // Добавляем вибрато для веселых настроений
      if (this.musicProfile.vibrato > 0) {
        const vibrato = this.audioContext.createOscillator();
        const vibratoGain = this.audioContext.createGain();
        
        vibrato.connect(vibratoGain);
        vibratoGain.connect(oscillator.frequency);
        
        vibrato.type = 'sine';
        vibrato.frequency.setValueAtTime(5, this.audioContext.currentTime);
        vibratoGain.gain.setValueAtTime(frequency * 0.05 * this.musicProfile.vibrato, this.audioContext.currentTime);
        
        vibrato.start();
        vibrato.stop(this.audioContext.currentTime + duration);
      }
      
      // Огибающая атаки и релиза
      const now = this.audioContext.currentTime;
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(this.volume, now + this.musicProfile.attack);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration - this.musicProfile.release);
      
      oscillator.start(now);
      oscillator.stop(now + duration);
    }
    
    play() {
      if (this.isPlaying) return;
      
      this.isPlaying = true;
      this.currentNoteIndex = 0;
      
      const playNextNote = () => {
        if (!this.isPlaying || this.currentNoteIndex >= this.notes.length) {
          this.stop();
          return;
        }
        
        const note = this.notes[this.currentNoteIndex];
        this.playNote(note.midiNote, note.duration);
        
        this.currentNoteIndex++;
        
        // Рандомизируем интервал для более естественного звучания
        const interval = note.duration * 500 * (1 + Math.random() * 0.2);
        this.intervalId = setTimeout(playNextNote, interval);
      };
      
      playNextNote();
    }
    
    stop() {
      this.isPlaying = false;
      if (this.intervalId) {
        clearTimeout(this.intervalId);
        this.intervalId = null;
      }
      
      // Останавливаем аудиоконтекст
      if (this.audioContext) {
        this.audioContext.close();
        this.audioContext = null;
      }
    }
    
    setVolume(value) {
      this.volume = value;
    }
  }
  
  // ОСНОВНОЙ КОНТРОЛЛЕР
  class WaveController {
    constructor() {
      console.log('🌊 Wave Universe v' + WAVE_CONFIG.VERSION + ' initializing');
      
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
      this.composer = null;
      
      if (!this.btn) {
        console.error('❌ noise-btn element not found');
        return;
      }
      
      this.setupEventListeners();
      console.log('✅ Wave Universe initialized successfully');
    }
    
    setupEventListeners() {
      // Основная кнопка
      this.btn.addEventListener('click', (e) => {
        e.stopPropagation();
        console.log('🌊 Wave button clicked');
        this.toggle();
      });
      
      // Кнопка закрытия
      if (this.closeBtn) {
        this.closeBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          console.log('✖️ Close button clicked');
          this.close();
        });
      }
      
      // Клик по фону для закрытия
      if (this.container) {
        this.container.addEventListener('click', (e) => {
          if (e.target === this.container) {
            console.log('⏭️ Background click detected, closing');
            this.close();
          }
        });
      }
      
      // Клавиша Escape
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isActive) {
          console.log('⌨️ Escape pressed, closing');
          this.close();
        }
      });
      
      // Кнопки Play/Stop
      if (this.playBtn) {
        this.playBtn.addEventListener('click', () => {
          console.log('▶️ Play button clicked');
          this.play();
        });
      }
      
      if (this.stopBtn) {
        this.stopBtn.addEventListener('click', () => {
          console.log('⏹️ Stop button clicked');
          this.stop();
        });
      }
      
      // Громкость
      if (this.volumeSlider) {
        this.volumeSlider.addEventListener('input', (e) => {
          const value = e.target.value / 100;
          console.log(`🔊 Volume changed to: ${value.toFixed(2)}`);
          
          if (this.composer) {
            this.composer.setVolume(value);
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
      
      // Изменение размера окна
      window.addEventListener('resize', () => {
        if (this.isActive && this.visualizer) {
          this.visualizer.resize();
        }
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
      
      console.log('📂 Opening wave panel');
      this.isActive = true;
      
      if (this.container) {
        this.container.style.display = 'block';
        this.container.classList.remove('closing');
      }
      
      // Получаем текст из редактора
      const editor = document.getElementById('editor');
      const text = editor ? editor.innerText.trim() : '';
      
      console.log(`📝 Analyzing text (length: ${text.length})`);
      
      // Создаем анализатор текста
      try {
        this.analyzer = new TextAnalyzer(text);
        console.log('✅ Text analysis complete:', {
          mood: this.analyzer.mood,
          waveCount: this.analyzer.waveCount,
          sessionId: this.analyzer.sessionId
        });
        
        // Создаем визуализатор
        this.visualizer = new WaveVisualizer(this.canvas, this.analyzer);
        
        // Создаем композитора
        this.composer = new MusicComposer(this.analyzer);
        
        // Обновляем статус
        this.updateStatus();
        
        // Запускаем визуализацию
        this.visualizer.start();
        
      } catch (error) {
        console.error('❌ Error initializing wave universe:', error);
        
        if (this.statusText) {
          this.statusText.textContent = 'Error initializing';
        }
      }
    }
    
    close() {
      if (!this.isActive) return;
      
      console.log('📂 Closing wave panel');
      this.container.classList.add('closing');
      
      setTimeout(() => {
        this.isActive = false;
        this.container.style.display = 'none';
        this.container.classList.remove('closing');
        
        // Останавливаем все
        this.stop();
        
        if (this.visualizer) {
          this.visualizer.destroy();
          this.visualizer = null;
        }
        
        this.analyzer = null;
        this.composer = null;
      }, 300);
    }
    
    play() {
      if (!this.isActive || !this.composer) return;
      
      console.log('🎵 Starting music playback');
      
      if (this.composer) {
        this.composer.play();
      }
      
      if (this.playBtn) this.playBtn.disabled = true;
      if (this.stopBtn) this.stopBtn.disabled = false;
      
      this.updateStatus('Playing...');
      
      // Запускаем обновление прогресс-бара
      this.startProgressBar();
    }
    
    stop() {
      console.log('🎵 Stopping music playback');
      
      if (this.composer) {
        this.composer.stop();
      }
      
      if (this.playBtn) this.playBtn.disabled = false;
      if (this.stopBtn) this.stopBtn.disabled = true;
      
      this.updateStatus();
      
      // Останавливаем прогресс-бар
      this.stopProgressBar();
    }
    
    updateStatus(extra = '') {
      if (!this.statusText) return;
      
      if (extra) {
        this.statusText.textContent = extra;
      } else if (this.analyzer) {
        const mood = this.analyzer.mood;
        const waves = this.analyzer.waveCount;
        this.statusText.textContent = `${mood} • ${waves} waves • ready`;
      } else {
        this.statusText.textContent = 'Ready to play';
      }
    }
    
    startProgressBar() {
      if (!this.progressBar) return;
      
      let progress = 0;
      const interval = setInterval(() => {
        if (!this.composer || !this.composer.isPlaying) {
          clearInterval(interval);
          this.progressBar.style.width = '0%';
          return;
        }
        
        progress = (progress + 0.5) % 100;
        this.progressBar.style.width = `${progress}%`;
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
    
    setVolume(value) {
      if (this.composer) {
        this.composer.setVolume(value / 100);
      }
    }
  }
  
  // Инициализация при загрузке
  document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
      if (typeof WaveController !== 'undefined') {
        try {
          window.waveController = new WaveController();
          console.log('🌊 Wave Universe loaded and ready');
        } catch (error) {
          console.error('Failed to create WaveController:', error);
        }
      }
    }, 100);
  });
  
  // Экспорт для глобального доступа
  window.WaveController = WaveController;
  window.TextAnalyzer = TextAnalyzer;
  
  console.log('=== WAVE UNIVERSE v' + WAVE_CONFIG.VERSION + ' LOADED ===');
  console.log('💡 Tips:');
  console.log('- Write emotional text to hear different music');
  console.log('- Try different moods: hot, warm, neutral, dark, haze');
  console.log('- Music and visualization change based on your text');
})();
