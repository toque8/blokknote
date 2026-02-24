(function() {
'use strict';
class EmotionsUI {
constructor() {
this.btn = document.getElementById('emotions-btn');
this.sidebar = document.getElementById('emotions-sidebar');
this.closeBtn = null;
this.analyzer = null;
this.isActive = false;
this._rendering = false;
if (this.btn) {
this.init();
}
}
init() {
    if (!this.sidebar) {
        this.createSidebar();
    }
    this.closeBtn = document.getElementById('emotions-close-btn');

    if (typeof EmotionAnalyzer !== 'undefined') {
        this.analyzer = new EmotionAnalyzer('auto');
        console.log('Blokknote emotions analyzer ready');
    } else {
        console.error('EmotionAnalyzer class not found!');
        this.btn.style.display = 'none';
        return;
    }

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

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isActive) {
            this.close();
        }
    });
}

createSidebar() {
    const sidebar = document.createElement('div');
    sidebar.id = 'emotions-sidebar';
    sidebar.innerHTML = `<button class="close-btn" id="emotions-close-btn">×</button><h2>Blokknote Emotions Analysis</h2><div id="emotions-content"><p style="color:#aaa;text-align:center;padding:40px 0;">Click 'A' button to analyze text</p></div>`;
    document.body.appendChild(sidebar);
    this.sidebar = sidebar;
    this.closeBtn = document.getElementById('emotions-close-btn');
}

toggle() {
    if (this.isActive) {
         this.close();
    } else {
        this.open();
    }
}

open() {
    if (this.isActive || this._rendering) return;
    const editor = document.getElementById('editor');
     const text = editor ? editor.innerText.trim() : '';
    
    if (!text) {
        const currentLang = this.getCurrentLanguage();
        if (currentLang === 'ru') {
            alert('Пожалуйста, сначала напишите что-нибудь');
        } else {
            alert('Please write some text first');
        }
        return;
    }

    this.isActive = true;
    this.sidebar.classList.add('active');
    this._rendering = true;

    setTimeout(() => {
        try {
            const result = this.analyzer.analyze(text);
            if (result.success) {
                const hasEnoughData = result.details && 
                                     result.details.syntactic && 
                                     result.details.syntactic.sentenceStats;
                
                if (!hasEnoughData) {
                    const currentLang = this.getCurrentLanguage();
                    if (currentLang === 'ru') {
                        this.showError('Недостаточно данных для анализа');
                    } else {
                         this.showError('Not enough data for analysis');
                    }
                    return;
                }
                
                this.renderResult(result);
            } else {
                this.showError(result.error);
            }
        } catch (err) {
            const currentLang = this.getCurrentLanguage();
             let message = err.message;
            if (err.message.includes('avgComplexity') || 
                err.message.includes('Cannot read properties') || 
                err.message.includes('undefined') ||
                err.message.includes('syntactic')) {
                message = currentLang === 'ru' ? 'Недостаточно данных для анализа' : 'Not enough data for analysis';
            }
            this.showError(message);
        } finally {
            this._rendering = false;
        }
    }, 10);
}

close() {
    if (!this.isActive) return;
    this.isActive = false;
    this.sidebar.classList.remove('active');
}

countAllPunctuation(text) {
    if (!text || typeof text !== 'string') return 0;
     
    const punctuationPattern = /[.,!?;:…\-—()\[\]{}"'«»„"]/g;
    const matches = text.match(punctuationPattern);
    return matches ? matches.length : 0;
}

pluralize(number, forms) {
    const n = Math.abs(number) % 100;
    const n1 = n % 10;
    if (n > 10 && n < 20) return forms[2];
    if (n1 > 1 && n1 < 5) return forms[1];
    if (n1 === 1) return forms[0];
    return forms[2];
}

getSafe(obj, path, defaultValue = null) {
    return path.split('.').reduce((acc, part) => {
        if (acc === null || acc === undefined || acc[part] === undefined) {
            return defaultValue;
        }
        return acc[part];
    }, obj);
}

isValidNumber(value) {
    if (value === null || value === undefined) return false;
    if (typeof value === 'string') {
        const num = parseFloat(value);
        return !isNaN(num) && isFinite(num);
    }
    if (typeof value === 'number') {
        return !isNaN(value) && isFinite(value);
    }
    return false;
}

getNumber(value) {
    if (this.isValidNumber(value)) {
        if (typeof value === 'string') {
            return parseFloat(value); 
        }
        return value;
    }
    return null;
}

shouldShowMetric(value, isNumber = false) {
    if (isNumber) {
        return this.isValidNumber(value) && value !== 0;
    }
    return value !== null && value !== undefined && value !== 'N/A' && value !== '' && value !== 'undefined' && value !== 'null';
}

hasArrayContent(array) {
    return Array.isArray(array) && array.length > 0 && array.every(item =>
        item !== null && item !== undefined && item !== '' && item !== 'undefined' && item !== 'null'
    );
}

translateBigFiveTrait(trait, lang) {
    if (lang !== 'ru') return trait;
    const translations = {
        'openness': 'открытость',
        'conscientiousness': 'добросовестность',
        'extraversion': 'экстраверсия',
        'agreeableness': 'доброжелательность',
        'neuroticism': 'нейротизм',
        'balanced': 'сбалансированность'
    };
    return translations[trait] || trait;
}

translatePlutchikEmotion(emotion, lang) {
    if (lang !== 'ru') return emotion;
    const translations = {
         'joy': 'радость',
        'trust': 'доверие',
        'fear': 'страх',
        'surprise': 'удивление',
        'sadness': 'грусть',
        'disgust': 'отвращение',
        'anger': 'гнев',
        'anticipation': 'ожидание',
        'love': 'любовь',
        'submission': 'подчинение',
        'awe': 'трепет',
        'aggressiveness': 'агрессивность',
         'optimism': 'оптимизм',
        'disapproval': 'неодобрение',
        'remorse': 'раскаяние',
        'neutral': 'мало данных',
        'contempt': 'презрение',
        'peaceful': 'спокойствие',
        'peacefulAdj': 'покой'
    };
    return translations[emotion] || emotion;
}

translateBigFiveLevel(level, lang) {
                              if (lang !== 'ru') return level;
                              const translations = {
                                        'high': 'высокий',
                                        'medium': 'средний',
                                        'low': 'низкий'
                              };
                              return translations[level] || level;
}

translateEIComponent(component, lang) {
                              if (lang !== 'ru') return component;
                              const translations = {
                                        'selfAwareness': 'самосознание',
                                        'empathy': 'эмпатия',
                                        'emotionalRegulation': 'регуляция эмоций',
                                        'socialSkills': 'социальные навыки'
                              };
                              return translations[component] || component;
}

translateCognitiveFactor(factor, lang) {
                              if (lang !== 'ru') return factor;
                              const translations = {
                                        'analytical': 'аналитический',
                                        'intuitive': 'интуитивный',
                                        'reflective': 'рефлексивный',
                                        'practical': 'практический'
                              };
                              return translations[factor] || factor;
}

translateCognitiveBias(bias, lang) {
                              if (lang !== 'ru') return bias;
                              const translations = {
                                        'dichotomous': 'дихотомическое мышление',
                                        'catastrophizing': 'катастрофизация',
                                        'emotionalReasoning': 'эмоциональное обоснование',
                                        'overgeneralization': 'сверхобобщение',
                                        'mindReading': 'чтение мыслей',
                                        'personalization': 'персонализация',
                                        'fortuneTelling': 'гадание на будущее',
                                        'minimization': 'минимизация'
                              };
                              return translations[bias] || bias;
}

translateCommunicationStyle(style, lang) {
                              if (lang !== 'ru') return style;
                              const translations = {
                                        'assertive': 'ассертивный',
                                        'passive': 'пассивный',
                                        'aggressive': 'агрессивный',
                                        'manipulative': 'манипулятивный'
                              };
                              return translations[style] || style;
}

translateEmotionalArc(arc, lang) {
    if (lang !== 'ru') return arc;
    const translations = {
        'rising': 'восходящая',
        'falling': 'нисходящая',
        'stable': 'стабильная',
        'wave': 'волнообразная',
        'chaotic': 'хаотичная',
        'cyclical': 'циклическая',
        'complex': 'сложная',
        'irregular': 'нерегулярная',
        'rise_fall_rise': 'восходяще-нисходящая',
        'fall_rise_fall': 'нисходяще-восходящая',
        'steady_rise': 'устойчиво восходящая',
        'steady_fall': 'устойчиво нисходящая',
        'man_in_hole': 'человек в яме',
        'man_in_hole_rise': 'человек в яме с подъёмом'
    };
    return translations[arc] || arc;
}

translateReadingLevel(level, lang) {
    if (lang === 'ru') {
        const translations = {
            'very easy': 'очень легко',
            'easy': 'легко',
            'fairly easy': 'довольно легко',
            'standard': 'стандартно',
            'fairly difficult': 'довольно сложно',
            'difficult': 'сложно',
            'very difficult': 'очень сложно',
            'очень легко': 'очень легко',
            'легко': 'легко',
            'довольно легко': 'довольно легко',
            'стандартно': 'стандартно',
            'довольно сложно': 'довольно сложно',
            'сложно': 'сложно',
            'очень сложно': 'очень сложно'
        };
        return translations[level] || level;
    } else {
        const translations = {
            'очень легко': 'very easy',
            'легко': 'easy',
            'довольно легко': 'fairly easy',
            'стандартно': 'standard',
            'довольно сложно': 'fairly difficult',
            'сложно': 'difficult',
            'очень сложно': 'very difficult',
            'very easy': 'very easy',
            'easy': 'easy',
            'fairly easy': 'fairly easy',
            'standard': 'standard',
            'fairly difficult': 'fairly difficult',
            'difficult': 'difficult',
            'very difficult': 'very difficult'
        };
        return translations[level] || level;
    }
}
	
translateAbstraction(description, lang) {
    if (lang !== 'ru') return description;
     const translations = {
        'very concrete': 'очень конкретный',
        'concrete': 'конкретный',
        'moderately concrete': 'умеренно конкретный',
        'balanced': 'сбалансированный',
        'moderately abstract': 'умеренно абстрактный',
        'abstract': 'абстрактный',
        'very abstract': 'очень абстрактный',
        'highly concrete': 'высокая конкретность',
        'highly abstract': 'высокая абстрактность'
    };
    return translations[description] || description;
}

translateCulturalTheme(theme, lang) {
    if (lang !== 'ru') return theme;
    const translations = {
        'poetic': 'поэтическая',
        'literary': 'литературная',
        'historical': 'историческая',
        'mythological': 'мифологическая',
        'philosophical': 'философская',
        'spiritual': 'духовная',
        'traditional': 'традиционная',
        'modern': 'современная',
        'balanced': 'сбалансированная',
		'idioms': 'идиоматическая',
        'mixed': 'смешанная',
        'none': 'отсутствует',
        'undefined': 'не определёна',
		'not defined': 'не определена'
    };
    return translations[theme] || theme;
}

translateLimitation(limitation, lang) {
                              if (lang !== 'ru') return limitation;
                              const translations = {
                                        'ограниченная надёжность анализа': 'ограниченная надёжность анализа',
                                        'высокая эмоциональная изменчивость': 'высокая эмоциональная изменчивость',
                                        'ограниченное психологическое содержание': 'ограниченное психологическое содержание',
                                        'стандартные ограничения текстового анализа': 'стандартные ограничения текстового анализа'
                              };
                              return translations[limitation] || limitation;
}

translateValue(value, lang) {
    if (lang === 'ru') {
        const translations = {
            'reflective': 'рефлексивный',
            'impulsive': 'импульсивный',
            'analytical': 'аналитический',
            'intuitive': 'интуитивный',
            'balanced': 'сбалансированный',
            'creative': 'креативный',
            'practical': 'прагматичный',
            'устойчивый эмоциональный фон': 'устойчивый эмоциональный фон',
            'широкий эмоциональный диапазон': 'широкий эмоциональный диапазон',
            'сложная эмоциональная палитра': 'сложная эмоциональная палитра',
            'сдержанное спокойное принятие и удовлетворение текущим моментом': 'restrained calm acceptance and satisfaction with the current moment',
            'использование иронии как защитного механизма': 'использование иронии как защитного механизма',
            'склонность к драматизации': 'склонность к драматизации',
            'использование юмора': 'использование юмора',
            'умеренная эмоциональная выразительность': 'умеренная эмоциональная выразительность',
            'склонность к позитивным взаимодействиям': 'склонность к позитивным взаимодействиям',
            'открытость в общении': 'открытость в общении',
             'потребность в понимании и поддержке': 'потребность в понимании и поддержке',
            'глубина в отношениях': 'глубина в отношениях',
            'защитная позиция в отношениях': 'защитная позиция в отношениях',
            'потребность в безопасных границах': 'потребность в безопасных границах',
            'использование дистанции в общении': 'использование дистанции в общении',
            'сбалансированный стиль общения': 'сбалансированный стиль общения',
            'расширение эмоционального репертуара': 'расширение эмоционального репертуара',
             'развитие эмоциональной стабильности': 'развитие эмоциональной стабильности',
            'интеграция сложных эмоциональных переживаний': 'интеграция сложных эмоциональных переживаний',
             'развитие психологической осознанности': 'развитие психологической осознанности',
            'гармонизация эмоциональной сферы': 'гармонизация эмоциональной сферы',
            'гештальт-терапия': 'гештальт-терапия',
            'экзистенциальная терапия': 'экзистенциальная терапия',
            'когнитивно-поведенческая терапия': 'когнитивно-поведенческая терапия',
            'терапия принятия и ответственности': 'терапия принятия и ответственности',
            'глубинная психотерапия': 'глубинная психотерапия',
            'общеукрепляющая психотерапия': 'общеукрепляющая психотерапия',
			'Коэффициент Хемингуэя': 'Коэффициент Хемингуэя',
            'Эффект тишины': 'Эффект тишины',
            'Индекс погоды': 'Индекс погоды',
            'Парадигма диалога': 'Парадигма диалога',
            'Вектор времени': 'Вектор времени',
            'Уровень модальности': 'Уровень модальности',
            'Эго-фактор': 'Эго-фактор',
            'Степень фрагментации': 'Степень фрагментации',
            'Показатель иммерсивности': 'Показатель иммерсивности',
            'Процент энтропии': 'Процент энтропии',
			'Цифровой след': 'Цифровой след',
            'Именной указатель': 'Именной указатель',
            'Зеркало фактов': 'Зеркало фактов',
            'Показатель актуальности': 'Показатель актуальности',
            'Анти-желтизна': 'Анти-желтизна',
            'Спектр мнений': 'Спектр мнений',
            'Бюрократический шум': 'Бюрократический шум',
            'Вербальное эхо': 'Вербальное эхо',
            'Зона тумана': 'Зона тумана',
            'Категоричный тон': 'Категоричный тон',
			'SEO-плотность': 'SEO-плотность',
            'Призывы к действию': 'Призывы к действию',
            'Штампометр': 'Штампометр',
            'Превосходная степень': 'Превосходная степень',
            'Сторителлинг': 'Сторителлинг',
            'Детектор вредных слов': 'Детектор вредных слов',
            'Водность': 'Водность',
            'Индекс переспама': 'Индекс переспама',
            'Списки': 'Списки',
            'Игра в уникальность': 'Игра в уникальность',
			'Анафорическая частота': 'Анафорическая частота',
            'Эпифорическая частота': 'Эпифорическая частота',
            'Шелест букв': 'Шелест букв',
            'Ласка звуков': 'Ласка звуков',
            'Слогопись': 'Слогопись',
            'Строфамёт': 'Строфамёт',
            'Ловец рифм': 'Ловец рифм',
            'Подходящий размер': 'Подходящий размер',
            'Длинностих': 'Длинностих',
            'Вольноволны': 'Вольноволны',
   
            'звонков': 'звонков',
            'штампов': 'штампов',
            'убеждений': 'убеждений',
            'историй': 'историй',
            'паразитов': 'паразитов',
            'списков': 'списков',
			'маркеров': 'маркеров',
			'Ещё кофе, пожалуйста': 'Ещё кофе, пожалуйста',
			'В поисках утраченного...': 'В поисках утраченного',
            'Падение в кроличью нору': 'Я падаю?', 
            'Криминальное чтиво': 'Криминальное чтиво',
            'Копия, снятая с копии': 'Копия, снятая с копии',
            'Пора в Скрантон': 'Пора в Скрантон',
            'Путешествие в Хогвартс': 'Путешествие в Хогвартс',
            'На неведомых планетах': 'На неведомых планетах',
            'Ещё чуть-чуть до Мордора': 'Ещё чуть-чуть до Мордора',
            'Гаражный рок': 'Гаражный рок',
            'Между нами тает лёд': 'Между нами тает лёд',
			'джармушей': 'джармушей',
            'прустов': 'прустов',
            'кроликов': 'кроликов',
            'тарантинок': 'тарантинок',
            'палаников': 'палаников',
            'дандермиффлинов': 'дандермиффлинов',
            'философских камней': 'философских камней',
            'джедаев': 'джедаев',
            'хоббитов': 'хоббитов',
            'кобейнов': 'кобейнов',
            'титаник': 'титаник',
			'undefined': 'не определён',
                            'other': 'не определён',
                            'repetition': 'повтор',
                            'simile': 'сравнение',
                            'contrast': 'контраст',
                            'comparison': 'сравнение',
                            'parallelism': 'параллелизм',
                            'poetic': 'Поэтические',
                            'trickster': 'хитрец',
                            'hero': 'герой',
                            'monster': 'монстр',
                            'mystical': 'мистический',
                            'древнерусский': 'древнерусский',
                            'средневековый': 'средневековый',
                            'имперский': 'имперский',
                            'советский': 'советский',
                            'современный': 'современный',
                            'ancient': 'древний',
                            'medieval': 'средневековый',
                            'renaissance': 'ренессанс',
                            'industrial': 'индустриальный',
                            'modern': 'современный',
							'other': 'не определён',
							'undefined': 'не определён',
							'other': 'not defined',
                            'undefined': 'not defined',
							'Frost': 'Фрост',
                            'Shakespeare': 'Шекспир',
                            'Dickens': 'Диккенс',
                            'Homer': 'Гомер',
                            'Tolstoy': 'Толстой',
                            'Dostoevsky': 'Достоевский',
                            'Pushkin': 'Пушкин',
                            'Chekhov': 'Чехов',
                            'Twain': 'Твен',
                            'Orwell': 'Оруэлл',
                            'Hemingway': 'Хемингуэй',
                            'Joyce': 'Джойс',
                            'Wilde': 'Уайльд',
                            'Poe': 'По',
                            'Byron': 'Байрон',
                            'Keats': 'Китс',
                            'Wordsworth': 'Вордсворт',
                            'Whitman': 'Уитмен',
                            'Plato': 'Платон',
                            'Aristotle': 'Аристотель',
                            'Socrates': 'Сократ',
                            'Virgil': 'Вергилий',
                            'Ovid': 'Овидий',
							'not defined': 'не определён',
                            'Пушкин': 'Пушкин',
                            'Достоевский': 'Достоевский',
                            'Толстой': 'Толстой',
                            'Чехов': 'Чехов',
                            'Гоголь': 'Гоголь',
                            'Булгаков': 'Булгаков',
                            'Есенин': 'Есенин',
                            'Лермонтов': 'Лермонтов',
                            'Тургенев': 'Тургенев',
                            'Некрасов': 'Некрасов',
                            'Блок': 'Блок',
                            'Ахматова': 'Ахматова',
                            'Цветаева': 'Цветаева',
                            'Мандельштам': 'Мандельштам',
                            'Пастернак': 'Пастернак',
                            'Солженицын': 'Солженицын',
                            'Бродский': 'Бродский',
                            'Набоков': 'Набоков',
                            'Шолохов': 'Шолохов',
                            'Замятин': 'Замятин',
                            'Платонов': 'Платонов',
                            'Ильф и Петров': 'Ильф и Петров',
                            'Грибоедов': 'Грибоедов',
                            'Фонвизин': 'Фонвизин',
                            'Радищев': 'Радищев',
                            'Карамзин': 'Карамзин',
                            'Жуковский': 'Жуковский',
                            'Батюшков': 'Батюшков',
                            'Баратынский': 'Баратынский',
                            'Тютчев': 'Тютчев',
                            'Фет': 'Фет',
                            'Майков': 'Майков',
                            'Полонский': 'Полонский',
                            'Апухтин': 'Апухтин',
			 				'other': 'не определён',
                            'undefined': 'не определён',
                            'not defined': 'не определён',
                            'Пушкин': 'Пушкин',
                            'Достоевский': 'Достоевский',
                            'Толстой': 'Толстой',
                            'Чехов': 'Чехов',
                            'Гоголь': 'Гоголь',
                            'Булгаков': 'Булгаков',
                            'Есенин': 'Есенин',
                            'Лермонтов': 'Лермонтов',
                            'Тургенев': 'Тургенев',
                            'Некрасов': 'Некрасов',
                            'Блок': 'Блок',
                            'Ахматова': 'Ахматова',
                            'Цветаева': 'Цветаева',
                            'Мандельштам': 'Мандельштам',
                            'Пастернак': 'Пастернак',
                            'Солженицын': 'Солженицын',
                            'Бродский': 'Бродский',
                            'Набоков': 'Набоков',
                            'Шолохов': 'Шолохов',
                            'Замятин': 'Замятин',
                            'Платонов': 'Платонов',
                            'Ильф и Петров': 'Ильф и Петров',
                            'Грибоедов': 'Грибоедов',
                            'Фонвизин': 'Фонвизин',
                            'Радищев': 'Радищев',
                            'Карамзин': 'Карамзин',
                            'Жуковский': 'Жуковский',
                            'Батюшков': 'Батюшков',
                            'Баратынский': 'Баратынский',
                            'Тютчев': 'Тютчев',
                            'Фет': 'Фет',
                            'Майков': 'Майков',
                            'Полонский': 'Полонский',
                            'Апухтин': 'Апухтин',
                            'Frost': 'Фрост',
                            'Shakespeare': 'Шекспир',
                            'Dickens': 'Диккенс',
                            'Homer': 'Гомер',
                            'Twain': 'Твен',
                            'Orwell': 'Оруэлл',
                            'Hemingway': 'Хемингуэй',
                            'Joyce': 'Джойс',
                            'Wilde': 'Уайльд',
                            'Poe': 'По',
                            'Byron': 'Байрон',
                            'Keats': 'Китс',
                            'Wordsworth': 'Вордсворт',
                            'Whitman': 'Уитмен',
                            'Plato': 'Платон',
                            'Aristotle': 'Аристотель',
                            'Socrates': 'Сократ',
                            'Virgil': 'Вергилий',
                            'Ovid': 'Овидий',

							'high': 'высокая',
							'moderate': 'умеренная',
							'limited': 'ограниченная',
							'ограниченный': 'ограниченный',
							'умеренный': 'умеренный',
							'высокий': 'высокий',
							
							'limited analysis reliability': 'ограниченная надёжность анализа',
							'high emotional variability': 'высокая эмоциональная изменчивость',
							'limited psychological content': 'ограниченное психологическое содержание',
							'standard limitations of text analysis': 'стандартные ограничения текстового анализа',
							
							'analytical': 'аналитический',
							'reflective': 'рефлексивный',
							'intuitive': 'интуитивный',
							'practical': 'практический',
							'depth in relationships': 'глубина в отношениях',
							'sensitivity to rejection': 'чувствительность к отвержению',
							'sincerity in relationships': 'искренность в отношениях',
							'Межличностные особенности: защитная позиция в отношениях, потребность в безопасных границах, настороженность в новых контактах': 'Межличностные особенности: защитная позиция в отношениях, потребность в безопасных границах, настороженность в новых контактах',
							'Межличностные особенности: потребность в понимании и поддержке, глубина и искренность в отношениях, чувствительность к отвержению': 'Межличностные особенности: потребность в понимании и поддержке, глубина и искренность в отношениях, чувствительность к отвержению',
							'Межличностные особенности: склонность к позитивным взаимодействиям, открытость в общении, эмоциональная теплота в отношениях': 'Межличностные особенности: склонность к позитивным взаимодействиям, открытость в общении, эмоциональная теплота в отношениях',
							'Межличностные особенности: защитная позиция в отношениях, потребность в безопасных границах, настороженность в новых контактах': 'Межличностные особенности: защитная позиция в отношениях, потребность в безопасных границах, настороженность в новых контактах',
							'Межличностные особенности: способность отстаивать свои интересы, склонность к уступчивости, конфликтность в стрессовых ситуациях': 'Межличностные особенности: способность отстаивать свои интересы, склонность к уступчивости, конфликтность в стрессовых ситуациях',
							'moderate emotional expressiveness': 'умеренная эмоциональная выразительность',
							'Relational patterns: need for understanding and support, depth and sincerity in relationships, sensitivity to rejection': 'Межличностные особенности: потребность в понимании и поддержке, глубина и искренность в отношениях, чувствительность к отвержению',

							'balanced communication style': 'сбалансированный стиль общения',
							'harmonization of emotional sphere': 'гармонизация эмоциональной сферы',
							'predominantly': 'преимущественно',
							'Ограничения анализа — факторы, снижающие точность': 'Ограничения анализа — факторы, снижающие точность',
							'Сводка основных психологических характеристик текста': 'Сводка основных психологических характеристик текста',
							'Фактор, снижающий точность анализа': 'Фактор, снижающий точность анализа',
							'Психологическая характеристика': 'Психологическая характеристика'
        };
        return translations[value] || value;
    } else if (lang === 'en') {
        const translations = {
            'Эмоциональная гамма': 'Emotional Spectrum',
            'Божественный экстаз': 'Divine Ecstasy',
            'Всепоглощающая радость': 'All-Encompassing Joy',
            'Лучистая радость': 'Radiant Joy',
            'Тихий восторг': 'Quiet Delight',
            'Счастливая гармония': 'Happy Harmony',
            'Умиротворённое удовлетворение': 'Peaceful Satisfaction',
            'Абсолютное спокойствие': 'Absolute Calm',
            'Гармоничное равновесие': 'Harmonious Balance',
            'Яростный шторм': 'Furious Storm',
            'Сдерживаемая буря': 'Contained Storm',
            'Бездонная печаль': 'Bottomless Sadness',
            'Нежная грусть': 'Gentle Sadness',
            'Философская меланхолия': 'Philosophical Melancholy',
            'Тревожное ожидание': 'Anxious Anticipation',
            'Многогранная сложность': 'Multifaceted Complexity',
            'Сложное переплетение': 'Complex Intertwining',
            'Горько-сладкая симфония': 'Bittersweet Symphony',
            'Ностальгическое эхо': 'Nostalgic Echo',
			                            'Эмоциональная гамма': 'Emotional Spectrum',
                                        'Нежная грусть': 'Gentle Sadness',
                                        'Тревожное ожидание': 'Anxious Anticipation',
                                        'Многогранная сложность': 'Multifaceted Complexity',
                                        'Сложное переплетение': 'Complex Intertwining',
                                        'Глубокое размышление': 'Deep Reflection',
                                        'Созерцательное спокойствие': 'Contemplative Calm',
                                        'Смешанные чувства': 'Mixed Feelings',
                                        'Ироничный взгляд': 'Ironic Gaze',
                                        'Уязвимая нежность': 'Vulnerable Tenderness',
                                        'Стойкая уверенность': 'Resilient Confidence',
			                            'Нежная грусть': 'Gentle Sadness',
                                        'Тревожное ожидание': 'Anxious Anticipation',
                                        'Яростный шторм': 'Furious Storm',
                                        'Сдерживаемая буря': 'Contained Storm',
                                        'Бездонная печаль': 'Bottomless Sadness',
                                        'Философская меланхолия': 'Philosophical Melancholy',
                                        'Многогранная сложность': 'Multifaceted Complexity',
                                        'Сложное переплетение': 'Complex Intertwining',
                                        'Глубокое размышление': 'Deep Reflection',
                                        'Созерцательное спокойствие': 'Contemplative Calm',
                                        'Смешанные чувства': 'Mixed Feelings',
                                        'Ироничный взгляд': 'Ironic Gaze',
                                        'Уязвимая нежность': 'Vulnerable Tenderness',
                                        'Стойкая уверенность': 'Resilient Confidence',
                                        'Неистовая ярость': 'Raging Fury',
                                        'Всепоглощающее отчаяние': 'All-consuming Despair',
                                        'Леденящий ужас': 'Chilling Horror',
                                        'Приглушённая тоска': 'Muffled Longing',
                                        'Задумчивая печаль': 'Thoughtful Sadness',
                                        'Смиренное принятие': 'Humble Acceptance',
                                        'Эйфорический восторг': 'Euphoric Delight',
                                        'Ошеломляющая радость': 'Stunning Joy',
                                        'Тихая радость': 'Quiet Joy',
                                        'Довольное спокойствие': 'Content Calm',
                                        'Сбалансированное состояние': 'Balanced State',
                                        'Отстранённое наблюдение': 'Detached Observation',

										'высокая': 'high',
										'умеренная': 'moderate',
										'ограниченная': 'limited',
										'ограниченный': 'limited',
										'умеренный': 'moderate',
										'высокий': 'high',
										
										'ограниченная надёжность анализа': 'limited analysis reliability',
										'высокая эмоциональная изменчивость': 'high emotional variability',
										'ограниченное психологическое содержание': 'limited psychological content',
										'стандартные ограничения текстового анализа': 'standard limitations of text analysis',
										
										'Эмоциональные паттерны': 'Emotional patterns',
										'Когнитивный стиль': 'Cognitive style',
										'Межличностные особенности': 'Relational patterns',
										'Направления роста': 'Growth paths',
										'преимущественно': 'predominantly',
										
										'умеренная эмоциональная выразительность': 'moderate emotional expressiveness',
										'сбалансированный стиль общения': 'balanced communication style',
										'гармонизация эмоциональной сферы': 'harmonization of emotional sphere',
										'аналитический': 'analytical',
										'рефлексивный': 'reflective',
										'интуитивный': 'intuitive',
										'практический': 'practical',
										'защитная позиция в отношениях': 'defensive position in relationships',
										'потребность в безопасных границах': 'need for safe boundaries',
										'настороженность в новых контактах': 'caution in new contacts',
										
										'защитная позиция': 'defensive position',
										'потребность в безопасных границах': 'need for safe boundaries',
										'настороженность': 'caution',
										'новых контактах': 'new contacts',

										'высокая': 'high',
										'умеренная': 'moderate',
										'ограниченная': 'limited',
										
										'ограниченная надёжность анализа': 'limited analysis reliability',
										'высокая эмоциональная изменчивость': 'high emotional variability',
										'ограниченное психологическое содержание': 'limited psychological content',
										'стандартные ограничения текстового анализа': 'standard limitations of text analysis',
										'Межличностные особенности: защитная позиция в отношениях, потребность в безопасных границах, настороженность в новых контактах': 'Relational patterns: defensive position in relationships, need for safe boundaries, caution in new contacts',
										
										'рефлексивный': 'reflective',
										'аналитический': 'analytical',
										'интуитивный': 'intuitive',
										'практический': 'practical',
										'преимущественно': 'predominantly',

										'Межличностные особенности: потребность в понимании и поддержке, глубина и искренность в отношениях, чувствительность к отвержению': 'Relational patterns: need for understanding and support, depth and sincerity in relationships, sensitivity to rejection',
										
										'умеренная эмоциональная выразительность': 'moderate emotional expressiveness',
										
										'сбалансированный стиль общения': 'balanced communication style',
										
										'гармонизация эмоциональной сферы': 'harmonization of emotional sphere',

										'Ограничения анализа — факторы, снижающие точность': 'Analysis limitations — factors that reduce accuracy',
										'Сводка основных психологических характеристик текста': 'Summary of the main psychological characteristics of the text',
										
										'Эмоциональные паттерны: умеренная эмоциональная выразительность': 'Emotional patterns: moderate emotional expressiveness',
										'Эмоциональные паттерны: moderate emotional expressiveness': 'Emotional patterns: moderate emotional expressiveness',
										'Когнитивный стиль: преимущественно аналитический': 'Cognitive style: predominantly analytical',
										'Когнитивный стиль: преимущественно рефлексивный': 'Cognitive style: predominantly reflective',
										'Когнитивный стиль: преимущественно интуитивный': 'Cognitive style: predominantly intuitive',
										'Когнитивный стиль: преимущественно практический': 'Cognitive style: predominantly practical',
										'Когнитивный стиль: преимущественно analytical': 'Cognitive style: predominantly analytical',
										'Когнитивный стиль: преимущественно reflective': 'Cognitive style: predominantly reflective',
										'Когнитивный стиль: преимущественно intuitive': 'Cognitive style: predominantly intuitive',
										'Когнитивный стиль: преимущественно practical': 'Cognitive style: predominantly practical',
										'Межличностные особенности: сбалансированный стиль общения': 'Relational patterns: balanced communication style',
										'Межличностные особенности: balanced communication style': 'Relational patterns: balanced communication style',
										'Направления роста: гармонизация эмоциональной сферы': 'Growth paths: harmonization of emotional sphere',
										'Направления роста: harmonization of emotional sphere': 'Growth paths: harmonization of emotional sphere',
										'Фактор, снижающий точность анализа': 'Factor reducing analysis accuracy',
										'Психологическая характеристика': 'Psychological characteristic',

										'высокая': 'high',
										'умеренная': 'moderate',
										'ограниченная': 'limited',
										
										'ограниченная надёжность анализа': 'limited analysis reliability',
										'высокая эмоциональная изменчивость': 'high emotional variability',
										'ограниченное психологическое содержание': 'limited psychological content',
										'стандартные ограничения текстового анализа': 'standard limitations of text analysis',
										
										'аналитический': 'analytical',
										'рефлексивный': 'reflective',
										'интуитивный': 'intuitive',
										'практический': 'practical',
										
										'умеренная эмоциональная выразительность': 'moderate emotional expressiveness',
										'сбалансированный стиль общения': 'balanced communication style',
										'гармонизация эмоциональной сферы': 'harmonization of emotional sphere',
										
										'Эмоциональные паттерны: умеренная эмоциональная выразительность': 'Emotional patterns: moderate emotional expressiveness',
										'Когнитивный стиль: преимущественно аналитический': 'Cognitive style: predominantly analytical',
										'Когнитивный стиль: преимущественно рефлексивный': 'Cognitive style: predominantly reflective',
										'Когнитивный стиль: преимущественно интуитивный': 'Cognitive style: predominantly intuitive',
										'Когнитивный стиль: преимущественно практический': 'Cognitive style: predominantly practical',
										'Межличностные особенности: сбалансированный стиль общения': 'Relational patterns: balanced communication style',
										'Направления роста: гармонизация эмоциональной сферы': 'Growth paths: harmonization of emotional sphere',
										'преимущественно': 'predominantly',
			'Межличностные особенности: потребность в понимании и поддержке, глубина и искренность в отношениях, чувствительность к отвержению': 'Relational patterns: need for understanding and support, depth and sincerity in relationships, sensitivity to rejection',
			'искренность в отношениях': 'sincerity in relationships',
			'Межличностные особенности: потребность в понимании и поддержке, глубина и искренность в отношениях, чувствительность к отвержению': 'Relational patterns: need for understanding and support, depth and sincerity in relationships, sensitivity to rejection',
			'Межличностные особенности: склонность к позитивным взаимодействиям, открытость в общении, эмоциональная теплота в отношениях': 'Relational patterns: tendency to positive interactions, openness in communication, emotional warmth in relationships',
			'Межличностные особенности: защитная позиция в отношениях, потребность в безопасных границах, настороженность в новых контактах': 'Relational patterns: defensive position in relationships, need for safe boundaries, caution in new contacts',
			'Межличностные особенности: способность отстаивать свои интересы, склонность к уступчивости, конфликтность в стрессовых ситуациях': 'Relational patterns: ability to assert interests, tendency to compliance, conflict in stressful situations',
			'Межличностные особенности: сбалансированный стиль общения': 'Relational patterns: balanced communication style',
			'Эмоциональные паттерны: умеренная эмоциональная выразительность': 'Emotional patterns: moderate emotional expressiveness',
			'Эмоциональные паттерны: moderate emotional expressiveness': 'Emotional patterns: moderate emotional expressiveness',
			'Когнитивный стиль: преимущественно аналитический': 'Cognitive style: predominantly analytical',
			'Когнитивный стиль: преимущественно analytical': 'Cognitive style: predominantly analytical',
			'Межличностные особенности: сбалансированный стиль общения': 'Relational patterns: balanced communication style',
			'Межличностные особенности: balanced communication style': 'Relational patterns: balanced communication style',
			'Направления роста: гармонизация эмоциональной сферы': 'Growth paths: harmonization of emotional sphere',
			'Направления роста: harmonization of emotional sphere': 'Growth paths: harmonization of emotional sphere',
			'Коэффициент Хемингуэя': 'Hemingway Coefficient',
            'Эффект тишины': 'Silence Effect',
            'Индекс погоды': 'Weather Index',
            'Парадигма диалога': 'Dialogue Paradigm',
            'Вектор времени': 'Time Vector',
            'Уровень модальности': 'Modality Level',
            'Эго-фактор': 'Ego Factor',
            'Степень фрагментации': 'Fragmentation Degree',
            'Показатель иммерсивности': 'Immersiveness',
            'Процент энтропии': 'Chaos Entropy',
			'Цифровой след': 'Digital Footprint',
            'Именной указатель': 'Name Index',
            'Зеркало фактов': 'Fact Mirror',
            'Показатель актуальности': 'Freshness Gauge',
            'Анти-желтизна': 'Anti‑Yellowness',
            'Спектр мнений': 'Opinion Palette',
            'Бюрократический шум': 'Bureaucratic Noise',
            'Словесное эхо': 'Verbal Echo',
            'Зона тумана': 'Fog Zone',
            'Категоричный тон': 'Categorical Tone',
			'SEO-плотность': 'SEO Density',
            'Призывы к действию': 'Calls to Action',
            'Штампометр': 'Cliche Meter',
            'Превосходная степень': 'Superlative Degree',
            'Сторителлинг': 'Storytelling',
            'Детектор вредных слов': 'Filler Words',
            'Водность': 'Water Content',
            'Индекс переспама': 'Spam Index',
            'Списки': 'Lists',
            'Игра в уникальность': 'Novelty Game',

            'звонков': 'calls',
            'штампов': 'cliches',
            'убеждений': 'convictions',
            'историй': 'stories',
            'паразитов': 'parasites',
            'списков': 'lists',
			'маркеров': 'markers',
			'Ещё кофе, пожалуйста': 'Another Coffee, Please',
            'В поисках утраченного': 'In Search of Lost Time',
            'Я падаю?': 'Am I Falling?',
            'Криминальное чтиво': 'Pulp Fiction',
            'Копия, снятая с копии': 'A Copy of a Copy',
            'Пора в Скрантон': 'Time for Scranton',
            'Путешествие в Хогвартс': 'Journey to Hogwarts',
            'На неведомых планетах': 'On Unknown Planets',
            'Ещё чуть-чуть до Мордора': 'Still a Bit to Mordor',
            'Гаражный рок': 'Garage Rock',
            'Между нами тает лёд': 'Between Us Melts Ice',
			'джармушей': 'jarmuschs',
            'прустов': 'prousts',
            'кроликов': 'rabbits',
            'тарантинок': 'tarantinos',
            'палаников': 'palahniuks',
            'дандермиффлинов': 'dundermifflins',
            'философских камней': 'philosopherstones',
            'джедаев': 'jedis',
            'хоббитов': 'hobbits',
            'кобейнов': 'cobains',
            'титаник': 'titanic',
			'Анафорическая частота': 'Anaphoric Frequency',
            'Эпифорическая частота': 'Epiphoric Frequency',
            'Шелест букв': 'Consonant Whisper',
            'Ласка звуков': 'Vowel Caress',
            'Слогопись': 'Syllable Score',
            'Строфамёт': 'Strophe Meter',
            'Ловец рифм': 'Rhyme Catcher',
            'Подходящий размер': 'Suitable Meter',
            'Длинностих': 'Line Length',
            'Вольноволны': 'Freedom Waves',
            
            'Сдержанное богатое эмоциональное переживание': 'Restrained rich emotional experience',
            'Сдержанное спокойное принятие и удовлетворение текущим моментом': 'Restrained calm acceptance and satisfaction with the current moment',            'Состояние полного, всеобъемлющего счастья и духовного подъёма': 'A state of complete, all-encompassing happiness and spiritual upliftment',
            'Яркое, жизнеутверждающее эмоциональное состояние': 'A bright, life-affirming emotional state',
            'Устойчивое чувство удовлетворения и благополучия': 'A stable feeling of satisfaction and well-being',
            'Спокойное принятие и удовлетворение текущим моментом': 'Calm acceptance and satisfaction with the current moment',
            'Глубокое внутреннее равновесие и гармония': 'Deep inner balance and harmony',
            'Интенсивное состояние недовольства и внутреннего напряжения': 'An intense state of dissatisfaction and inner tension',
            'Эмоциональное переживание потери или разочарования': 'An emotional experience of loss or disappointment',
            'Сложное сочетание грусти и глубокой рефлексии': 'A complex combination of sadness and deep reflection',
            'Состояние беспокойства и предчувствия': 'A state of anxiety and premonition',
            'Многоуровневое, противоречивое эмоциональное переживание': 'A multi-layered, contradictory emotional experience',
            'Одновременное переживание радости и печали': 'Simultaneous experience of joy and sadness',
            'Тёплые воспоминания, окрашенные лёгкой грустью': 'Warm memories tinged with slight sadness',
            'Богатое эмоциональное переживание': 'Rich emotional experience',
            'Интенсивное богатое эмоциональное переживание, отличающееся глубиной и многослойностью': 'Intense rich emotional experience characterized by depth and multi-layeredness',
            'Сдержанное богатое эмоциональное переживание, отличающееся глубиной и многослойностью': 'Restrained rich emotional experience characterized by depth and multi-layeredness',
            
            'эмоция': 'emotion',
            'чувство': 'feeling',
            'переживание': 'experience',
            'восторг': 'ecstasy',
            'экстаз': 'ecstasy',
            'эйфория': 'euphoria',
            'блаженство': 'bliss',
            'радость': 'joy',
            'счастье': 'happiness',
            'ликование': 'jubilation',
            'веселье': 'merriment',
            'удовлетворение': 'satisfaction',
            'благополучие': 'well-being',
            'гармония': 'harmony',
            'спокойствие': 'calm',
            'тишина': 'silence',
            'равновесие': 'balance',
            'умиротворение': 'serenity',
            'гнев': 'anger',
            'ярость': 'fury',
            'раздражение': 'irritation',
            'негодование': 'indignation',
            'грусть': 'sadness',
            'печаль': 'sorrow',
            'тоска': 'melancholy',
            'скорбь': 'grief',
            'меланхолия': 'melancholy',
            'рефлексия': 'reflection',
            'созерцание': 'contemplation',
            'тревога': 'anxiety',
            'беспокойство': 'worry',
            'опасение': 'apprehension',
            'нервозность': 'nervousness',
            'противоречие': 'contradiction',
            'многослойность': 'multi-layeredness',
            'глубина': 'depth',
            'нюансы': 'nuances',
            'амбивалентность': 'ambivalence',
            'смешанные чувства': 'mixed feelings',
            'контраст': 'contrast',
            'воспоминания': 'memories',
            'прошлое': 'past',
            'память': 'memory',
            'эхо': 'echo',
			'Relational Patterns: need for understanding and support, глубина и искренность в отношениях, чувствительность к отвержению': 'Relational patterns: need for understanding and support, depth and sincerity in relationships, sensitivity to rejection',
            
            'устойчивый эмоциональный фон': 'stable emotional background',
            'широкий эмоциональный диапазон': 'wide emotional range',
            'сложная эмоциональная палитра': 'complex emotional palette',
            'использование иронии как защитного механизма': 'use of irony as a defense mechanism',
            'склонность к драматизации': 'tendency to dramatization',
            'использование юмора': 'use of humor',
            'умеренная эмоциональная выразительность': 'moderate emotional expressiveness',
            'склонность к позитивным взаимодействиям': 'tendency to positive interactions',
            'открытость в общении': 'openness in communication',
            'потребность в понимании и поддержке': 'need for understanding and support',
            'глубина в отношениях': 'depth in relationships',
            'защитная позиция в отношениях': 'defensive position in relationships',
            'потребность в безопасных границах': 'need for safe boundaries',
            'использование дистанции в общении': 'use of distance in communication',
            'сбалансированный стиль общения': 'balanced communication style',
            'расширение эмоционального репертуара': 'expanding emotional repertoire',
            'развитие эмоциональной стабильности': 'developing emotional stability',
            'интеграция сложных эмоциональных переживаний': 'integration of complex emotional experiences',
            'развитие психологической осознанности': 'developing psychological awareness',
            'гармонизация эмоциональной сферы': 'harmonization of emotional sphere',
            'гештальт-терапия': 'gestalt therapy',
            'экзистенциальная терапия': 'existential therapy',
            'когнитивно-поведенческая терапия': 'cognitive-behavioral therapy',
            'терапия принятия и ответственности': 'acceptance and commitment therapy',
            'глубинная психотерапия': 'depth psychotherapy',
            'общеукрепляющая психотерапия': 'general strengthening psychotherapy',
            'рефлексивный': 'reflective',
            'импульсивный': 'impulsive',
            'аналитический': 'analytical',
            'интуитивный': 'intuitive',
            'сбалансированный': 'balanced',
            'креативный': 'creative',
            'прагматичный': 'practical',
			'другой': 'undefined',
			'other': 'не определён',
			'Тип паттерна': 'Pattern Type',
			'other': 'not defined',
            'undefined': 'not defined',
							'Фрост': 'Frost',
                            'Шекспир': 'Shakespeare',
                            'Диккенс': 'Dickens',
                            'Гомер': 'Homer',
                            'Толстой': 'Tolstoy',
                            'Достоевский': 'Dostoevsky',
                            'Пушкин': 'Pushkin',
                            'Чехов': 'Chekhov',
							'Пушкин': 'Pushkin',
                            'Достоевский': 'Dostoevsky',
                            'Толстой': 'Tolstoy',
                            'Чехов': 'Chekhov',
                            'Гоголь': 'Gogol',
                            'Булгаков': 'Bulgakov',
                            'Есенин': 'Yesenin',
                            'Лермонтов': 'Lermontov',
                            'Тургенев': 'Turgenev',
                            'Некрасов': 'Nekrasov',
                            'Блок': 'Blok',
                            'Ахматова': 'Akhmatova',
                            'Цветаева': 'Tsvetaeva',
                            'Мандельштам': 'Mandelstam',
                            'Пастернак': 'Pasternak',
                            'Солженицын': 'Solzhenitsyn',
                            'Бродский': 'Brodsky',
                            'Набоков': 'Nabokov',
                            'Шолохов': 'Sholokhov',
                            'Замятин': 'Zamyatin',
                            'Платонов': 'Platonov',
                            'Ильф и Петров': 'Ilf and Petrov',
                            'Грибоедов': 'Griboyedov',
                            'Фонвизин': 'Fonvizin',
                            'Радищев': 'Radishchev',
                            'Карамзин': 'Karamzin',
                            'Жуковский': 'Zhukovsky',
                            'Батюшков': 'Batjushkov',
                            'Баратынский': 'Baratynsky',
                            'Тютчев': 'Tyutchev',
                            'Фет': 'Fet',
                            'Майков': 'Maykov',
                            'Полонский': 'Polonsky',
                            'Апухтин': 'Apukhtin',
							'другой': 'undefined',
                            'other': 'not defined',
                            'undefined': 'not defined',
                            'not defined': 'not defined',
                            'Тип паттерна': 'Pattern Type',
                            'Пушкин': 'Pushkin',
                            'Достоевский': 'Dostoevsky',
                            'Толстой': 'Tolstoy',
                            'Чехов': 'Chekhov',
                            'Гоголь': 'Gogol',
                            'Булгаков': 'Bulgakov',
                            'Есенин': 'Yesenin',
                            'Лермонтов': 'Lermontov',
                            'Тургенев': 'Turgenev',
                            'Некрасов': 'Nekrasov',
                            'Блок': 'Blok',
                            'Ахматова': 'Akhmatova',
                            'Цветаева': 'Tsvetaeva',
                            'Мандельштам': 'Mandelstam',
                            'Пастернак': 'Pasternak',
                            'Солженицын': 'Solzhenitsyn',
                            'Бродский': 'Brodsky',
                            'Набоков': 'Nabokov',
                            'Шолохов': 'Sholokhov',
                            'Замятин': 'Zamyatin',
                            'Платонов': 'Platonov',
                            'Ильф и Петров': 'Ilf and Petrov',
                            'Грибоедов': 'Griboyedov',
                            'Фонвизин': 'Fonvizin',
                            'Радищев': 'Radishchev',
                            'Карамзин': 'Karamzin',
                            'Жуковский': 'Zhukovsky',
                            'Батюшков': 'Batjushkov',
                            'Баратынский': 'Baratynsky',
                            'Тютчев': 'Tyutchev',
                            'Фет': 'Fet',
                            'Майков': 'Maykov',
                            'Полонский': 'Polonsky',
                            'Апухтин': 'Apukhtin',
                            'Фрост': 'Frost',
                            'Шекспир': 'Shakespeare',
                            'Диккенс': 'Dickens',
                            'Гомер': 'Homer',
                            'Твен': 'Twain',
                            'Оруэлл': 'Orwell',
                            'Хемингуэй': 'Hemingway',
                            'Джойс': 'Joyce',
                            'Уайльд': 'Wilde',
                            'По': 'Poe',
                            'Байрон': 'Byron',
                            'Китс': 'Keats',
                            'Вордсворт': 'Wordsworth',
                            'Уитмен': 'Whitman',
                            'Платон': 'Plato',
                            'Аристотель': 'Aristotle',
                            'Сократ': 'Socrates',
                            'Вергилий': 'Virgil',
                            'Овидий': 'Ovid'
        };
        return translations[value] || value;
    }
    return value;
}

detectTextType(metrics) {
                            let fictionScore = 0;
                            let copyScore = 0;
                            let journScore = 0;
                            let poetryScore = 0;
                  
                            if (metrics.poetry) {
                                      const lines = this.getNumber(metrics.poetry.totalLines) || 0;
                                      const rhyme = this.getNumber(metrics.poetry.rhymeCatcher) || 0;
                                      const lineLen = this.getNumber(metrics.poetry.lineLength) || 0; 
                                      const freedom = this.getNumber(metrics.poetry.freedomWaves) || 0;
                                      const anaphora = this.getNumber(metrics.poetry.anaphoraFreq) || 0;
                                      const epiphora = this.getNumber(metrics.poetry.epiphoraFreq) || 0;
                                      const cons = this.getNumber(metrics.poetry.consonantWhisper) || 0;
                                      const vowel = this.getNumber(metrics.poetry.vowelCaress) || 0;
                  
                                      if (lines > 4) {
                                                if (rhyme > 5) {
                                                          poetryScore += 4; 
                                                } else {
                                                          poetryScore += 0; 
                                                }
                                                
                                                if (rhyme > 5) {
                                                          if (lineLen > 0 && lineLen < 8) poetryScore += 2;
                                                          if (freedom < 30) poetryScore += 2;
                                                          if (anaphora > 5) poetryScore += 1;
                                                          if (epiphora > 3) poetryScore += 1;
                                                          if (cons > 150) poetryScore += 1;
                                                          if (vowel > 150) poetryScore += 1;
                                                }
                                      }
                            }
                  
                            if (metrics.writer) {
                                      const immerse = this.getNumber(metrics.writer.immersiveness) || 0;
                                      const silence = this.getNumber(metrics.writer.silenceEffect) || 0;
                                      const dialogue = this.getNumber(metrics.writer.dialogueParadigm) || 0;
                                      const ego = this.getNumber(metrics.writer.egoFactor) || 0;
                                      const chaos = this.getNumber(metrics.writer.chaosEntropyPercent) || 0;
                                      const timeVector = this.getNumber(metrics.writer.timeVector) || 0;
                  
                                      if (immerse > 5) fictionScore += 3;  
                                      if (silence > 2) fictionScore += 3;  
                                      if (dialogue > 1) fictionScore += 3; 
                                      if (ego > 30) fictionScore += 2;      
                                      if (chaos > 60) fictionScore += 2;   
                                      if (timeVector < -20 || timeVector > 20) fictionScore += 2; 
                            }
                  
                            if (metrics.copywriter) {
                                      const cta = this.getNumber(metrics.copywriter.callToAction) || 0;
                                      const cliche = this.getNumber(metrics.copywriter.clicheMeter) || 0;
                                      const filler = this.getNumber(metrics.copywriter.fillerWords) || 0;
                                      const superlative = this.getNumber(metrics.copywriter.superlativeDegree) || 0;
                                      const spam = this.getNumber(metrics.copywriter.spamIndex) || 0;
                                      const water = this.getNumber(metrics.copywriter.waterContent) || 0;
                  
                                      if (cta > 8) copyScore += 2;
                                      if (cliche > 8) copyScore += 2;
                                      if (filler > 8) copyScore += 1;
                                      if (superlative > 8) copyScore += 2;
                                      if (spam > 5) copyScore += 2;
                                      if (water > 65) copyScore += 1;
                            }
                  
                            if (metrics.journalist) {
                                      const digital = this.getNumber(metrics.journalist.digitalFootprint) || 0;
                                      const nameIdx = this.getNumber(metrics.journalist.nameIndex) || 0;
                                      const factMirror = this.getNumber(metrics.journalist.factMirror) || 0;
                                      const antiYellow = this.getNumber(metrics.journalist.antiYellow) || 0;
                                      const freshness = this.getNumber(metrics.journalist.freshnessGauge) || 0;
                                      const categorical = this.getNumber(metrics.journalist.categoricalTone) || 0;
                  
                                      if (digital > 8) journScore += 2;
                                      if (nameIdx > 8) journScore += 2;
                                      if (factMirror > 80) journScore += 1;
                                      if (antiYellow > 80) journScore += 1;
                                      if (freshness > 3) journScore += 2;
                                      if (categorical > 8) journScore += 1;
                            }
                  
                            if (poetryScore >= 8) {
                                      return 'poetry';
                            }
                  
                            if (copyScore > fictionScore && copyScore > journScore) {
                                      return 'copywriting';
                            }
                            if (journScore > fictionScore && journScore > copyScore) {
                                      return 'journalism';
                            }
                            return 'fiction';
}
                  
generateRecommendations(metrics, lang) {
                            const type = this.detectTextType(metrics);
                            const recs = [];
                  
                            if (type === 'poetry') {
                                      if (metrics.poetry) {
                                                const rhyme = this.getNumber(metrics.poetry.rhymeCatcher);
                                                if (rhyme !== null) {
                                                          if (rhyme < 5) {
                                                                    recs.push(lang === 'ru' ? 
                                                                              '▪ Рифм мало, добавьте рифму для музыкальности' : 
                                                                              '▪ Few rhymes, add some for musicality');
                                                          } else if (rhyme > 20) {
                                                                    recs.push(lang === 'ru' ? 
                                                                              '▪ Богатая рифмовка – стих звучит мелодично' : 
                                                                              '▪ Rich rhyming – the verse sounds melodious');
                                                          }
                                                }
                                                const freedom = this.getNumber(metrics.poetry.freedomWaves);
                                                if (freedom !== null) {
                                                          if (freedom < 20) {
                                                                    recs.push(lang === 'ru' ? 
                                                                              '▪ Ритм однообразен, пробуйте строки разной длины' : 
                                                                              '▪ Monotonous rhythm, try varying line length');
                                                          } else if (freedom > 50) {
                                                                    recs.push(lang === 'ru' ? 
                                                                              '▪ Смелый ритм – текст дышит свободой' : 
                                                                              '▪ Bold rhythm – the text breathes freedom');
                                                          }
                                                }
                                                const anaphora = this.getNumber(metrics.poetry.anaphoraFreq);
                                                if (anaphora !== null) {
                                                          if (anaphora < 3) {
                                                                    recs.push(lang === 'ru' ? 
                                                                              '▪ Анафора почти не используется, добавьте повторы для усиления' : 
                                                                              '▪ Anaphora is rare, add repetitions for emphasis');
                                                          } else if (anaphora > 15) {
                                                                    recs.push(lang === 'ru' ? 
                                                                              '▪ Частая анафора – красивый приём, но не переусердствуйте' : 
                                                                              '▪ Frequent anaphora – beautiful technique, but donʼt overdo it');
                                                          }
                                                }
                                                const epiphora = this.getNumber(metrics.poetry.epiphoraFreq);
                                                if (epiphora !== null && epiphora > 5) {
                                                          recs.push(lang === 'ru' ? 
                                                                    '▪ Эпифора создаёт интересное звучание' : 
                                                                    '▪ Epiphora creates an interesting sound');
                                                }
                                                const syllable = this.getNumber(metrics.poetry.syllableScore);
                                                if (syllable !== null) {
                                                          if (syllable < 150) {
                                                                    recs.push(lang === 'ru' ? 
                                                                              '▪ Слова короткие, стих лёгкий' : 
                                                                              '▪ Short words, light verse');
                                                          } else if (syllable > 250) {
                                                                    recs.push(lang === 'ru' ? 
                                                                              '▪ Многосложные слова – стих звучит весомо' : 
                                                                              '▪ Multi‑syllable words – the verse sounds weighty');
                                                          }
                                                }
                                                const lineLen = this.getNumber(metrics.poetry.lineLength);
                                                if (lineLen !== null && lineLen < 4) {
                                                          recs.push(lang === 'ru' ? 
                                                                    '▪ Очень короткие строки, подумайте о разнообразии' : 
                                                                    '▪ Very short lines, consider varying length');
                                                } else if (lineLen !== null && lineLen > 12) {
                                                          recs.push(lang === 'ru' ? 
                                                                    '▪ Строки длинные, следите за ритмом' : 
                                                                    '▪ Long lines, watch the rhythm');
                                                }
                                                if (metrics.poetry.suitableMeter && metrics.poetry.suitableMeter !== 'смешанный') {
                                                          recs.push(lang === 'ru' ? 
                                                                    `▪ Преобладает размер: ${metrics.poetry.suitableMeter}` : 
                                                                    `▪ Prevailing meter: ${metrics.poetry.suitableMeter}`);
                                                }
                                      }
                            } else if (type === 'copywriting') {
                                      if (metrics.copywriter) {
                                                const cta = this.getNumber(metrics.copywriter.callToAction);
                                                if (cta !== null) {
                                                          if (cta < 3) {
                                                                    recs.push(lang === 'ru' ? 
                                                                              '▪ Слишком мало призывов, добавьте глаголы в повелительном наклонении' : 
                                                                              '▪ Too few calls to action, add imperative verbs');
                                                          } else if (cta > 15) {
                                                                    recs.push(lang === 'ru' ? 
                                                                              '▪ Очень много призывов – текст может казаться агрессивным' : 
                                                                              '▪ Too many calls – the text may seem aggressive');
                                                          } else if (cta >= 3 && cta <= 15) {
                                                                    recs.push(lang === 'ru' ? 
                                                                              '▪ Хорошее количество призывов, текст побуждает к действию' : 
                                                                              '▪ Good number of calls, the text encourages action');
                                                          }
                                                }
                                                const cliche = this.getNumber(metrics.copywriter.clicheMeter);
                                                if (cliche !== null) {
                                                          if (cliche > 12) {
                                                                    recs.push(lang === 'ru' ? 
                                                                              '▪ Слишком много штампов, пишите оригинальнее' : 
                                                                              '▪ Too many clichés, be more original');
                                                          } else if (cliche < 3) {
                                                                    recs.push(lang === 'ru' ? 
                                                                              '▪ Почти нет штампов – свежий язык' : 
                                                                              '▪ Almost no clichés – fresh language');
                                                          }
                                                }
                                                const filler = this.getNumber(metrics.copywriter.fillerWords);
                                                if (filler !== null) {
                                                          if (filler > 10) {
                                                                    recs.push(lang === 'ru' ? 
                                                                              '▪ Много слов‑паразитов, уберите их для чистоты' : 
                                                                              '▪ Too many filler words, remove them for clarity');
                                                          } else if (filler < 3) {
                                                                    recs.push(lang === 'ru' ? 
                                                                              '▪ Чистая речь без паразитов – отлично' : 
                                                                              '▪ Clean speech without fillers – great');
                                                          }
                                                }
                                                const superlative = this.getNumber(metrics.copywriter.superlativeDegree);
                                                if (superlative !== null && superlative > 10) {
                                                          recs.push(lang === 'ru' ? 
                                                                    '▪ Много превосходных степеней, текст может казаться хвастливым' : 
                                                                    '▪ Too many superlatives, the text may seem boastful');
                                                }
                                                const spam = this.getNumber(metrics.copywriter.spamIndex);
                                                if (spam !== null && spam > 6) {
                                                          recs.push(lang === 'ru' ? 
                                                                    '▪ Одно слово слишком часто повторяется – риск переспама' : 
                                                                    '▪ One word repeats too often – risk of keyword stuffing');
                                                }
                                                const water = this.getNumber(metrics.copywriter.waterContent);
                                                if (water !== null && water > 70) {
                                                          recs.push(lang === 'ru' ? 
                                                                    '▪ Высокая водность, уберите лишние слова' : 
                                                                    '▪ High water content, remove filler words');
                                                } else if (water !== null && water < 40) {
                                                          recs.push(lang === 'ru' ? 
                                                                    '▪ Низкая водность – текст информативный' : 
                                                                    '▪ Low water content – informative text');
                                                }
                                                const list = this.getNumber(metrics.copywriter.listDensity);
                                                if (list !== null && list > 0) {
                                                          recs.push(lang === 'ru' ? 
                                                                    '▪ Есть списки – это улучшает читаемость' : 
                                                                    '▪ Lists present – improves readability');
                                                }
                                                const novelty = this.getNumber(metrics.copywriter.noveltyCoefficient);
                                                if (novelty !== null && novelty > 60) {
                                                          recs.push(lang === 'ru' ? 
                                                                    '▪ Высокое лексическое разнообразие – богатый словарь' : 
                                                                    '▪ High lexical diversity – rich vocabulary');
                                                } else if (novelty !== null && novelty < 30) {
                                                          recs.push(lang === 'ru' ? 
                                                                    '▪ Низкое лексическое разнообразие, повторяете одни и те же слова' : 
                                                                    '▪ Low lexical diversity, you repeat the same words');
                                                }
                                      }
                            } else if (type === 'journalism') {
                                      if (metrics.journalist) {
                                                const digital = this.getNumber(metrics.journalist.digitalFootprint);
                                                if (digital !== null) {
                                                          if (digital < 3) {
                                                                    recs.push(lang === 'ru' ? 
                                                                              '▪ Мало цифр и фактов – добавьте конкретики' : 
                                                                              '▪ Too few facts and figures – add specifics');
                                                          } else if (digital > 20) {
                                                                    recs.push(lang === 'ru' ? 
                                                                              '▪ Очень много цифр, не перегружайте читателя' : 
                                                                              '▪ Too many numbers, donʼt overwhelm the reader');
                                                          } else if (digital >= 3 && digital <= 20) {
                                                                    recs.push(lang === 'ru' ? 
                                                                              '▪ Хорошая насыщенность данными' : 
                                                                              '▪ Good data density');
                                                          }
                                                }
                                                const mirror = this.getNumber(metrics.journalist.factMirror);
                                                if (mirror !== null) {
                                                          if (mirror < 60) {
                                                                    recs.push(lang === 'ru' ? 
                                                                              '▪ Много субъективных выражений, будьте объективнее' : 
                                                                              '▪ Too many subjective expressions, be more objective');
                                                          } else if (mirror > 90) {
                                                                    recs.push(lang === 'ru' ? 
                                                                              '▪ Высокая объективность – текст выглядит достоверно' : 
                                                                              '▪ High objectivity – the text appears credible');
                                                          }
                                                }
                                                const yellow = this.getNumber(metrics.journalist.antiYellow);
                                                if (yellow !== null) {
                                                          if (yellow < 70) {
                                                                    recs.push(lang === 'ru' ? 
                                                                              '▪ Текст содержит кликбейтные выражения, снизьте манипулятивность' : 
                                                                              '▪ Text contains clickbait, reduce manipulation');
                                                          } else if (yellow > 95) {
                                                                    recs.push(lang === 'ru' ? 
                                                                              '▪ Чисто, нет манипулятивной лексики' : 
                                                                              '▪ Clean, no manipulative vocabulary');
                                                          }
                                                }
                                                const nameIdx = this.getNumber(metrics.journalist.nameIndex);
                                                if (nameIdx !== null) {
                                                          if (nameIdx < 3) {
                                                                    recs.push(lang === 'ru' ? 
                                                                              '▪ Мало имён и названий, добавьте конкретных источников' : 
                                                                              '▪ Too few names and places, add specific sources');
                                                          } else if (nameIdx > 15) {
                                                                    recs.push(lang === 'ru' ? 
                                                                              '▪ Очень много имён, возможно, текст перегружен' : 
                                                                              '▪ Too many names, the text may be overloaded');
                                                          } else {
                                                                    recs.push(lang === 'ru' ? 
                                                                              '▪ Умеренное количество имён – хороший баланс' : 
                                                                              '▪ Moderate number of names – good balance');
                                                          }
                                                }
                                                const freshness = this.getNumber(metrics.journalist.freshnessGauge);
                                                if (freshness !== null && freshness > 3) {
                                                          recs.push(lang === 'ru' ? 
                                                                    '▪ Текст актуален, использует маркеры свежести' : 
                                                                    '▪ Timely text, uses freshness markers');
                                                }
                                                const fog = this.getNumber(metrics.journalist.fogZone);
                                                if (fog !== null && fog > 8) {
                                                          recs.push(lang === 'ru' ? 
                                                                    '▪ Много неопределённых формулировок (около, примерно), уточните' : 
                                                                    '▪ Too many vague words (around, approximately), be specific');
                                                }
                                                const categorical = this.getNumber(metrics.journalist.categoricalTone);
                                                if (categorical !== null && categorical > 8) {
                                                          recs.push(lang === 'ru' ? 
                                                                    '▪ Слишком категорично, используйте более мягкие выражения' : 
                                                                    '▪ Too categorical, use softer expressions');
                                                }
                                      }
                            } else { 
                                      if (metrics.writer) {
                                                const hemingway = this.getNumber(metrics.writer.hemingwayCoefficient);
                                                if (hemingway !== null) {
                                                          if (hemingway < 30) {
                                                                    recs.push(lang === 'ru' ? 
                                                                              '▪ Мало коротких фраз, текст тяжеловат – добавьте рубленых предложений' : 
                                                                              '▪ Few short phrases, text is heavy – add some choppy sentences');
                                                          } else if (hemingway > 70) {
                                                                    recs.push(lang === 'ru' ? 
                                                                              '▪ Очень много коротких фраз, добавьте связности и плавности' : 
                                                                              '▪ Too many short phrases, add cohesion and fluency');
                                                          } else {
                                                                    recs.push(lang === 'ru' ? 
                                                                              '▪ Хороший баланс коротких и длинных предложений' : 
                                                                              '▪ Good balance of short and long sentences');
                                                          }
                                                }
                                                const immerse = this.getNumber(metrics.writer.immersiveness);
                                                if (immerse !== null) {
                                                          if (immerse < 5) {
                                                                    recs.push(lang === 'ru' ? 
                                                                              '▪ Не хватает сенсорных деталей (звуки, запахи, ощущения)' : 
                                                                              '▪ Lack sensory details (sounds, smells, feelings)');
                                                          } else if (immerse > 20) {
                                                                    recs.push(lang === 'ru' ? 
                                                                              '▪ Богатая сенсорика – отлично погружает' : 
                                                                              '▪ Rich sensory vocabulary – great immersion');
                                                          } else {
                                                                    recs.push(lang === 'ru' ? 
                                                                              '▪ Умеренная сенсорика, можно добавить деталей' : 
                                                                              '▪ Moderate sensory details, you could add more');
                                                          }
                                                }
                                                const silence = this.getNumber(metrics.writer.silenceEffect);
                                                if (silence !== null) {
                                                          if (silence < 2) {
                                                                    recs.push(lang === 'ru' ? 
                                                                              '▪ Не хватает пауз и тишины – добавьте многоточий, слов о молчании' : 
                                                                              '▪ Lack of pauses and silence – add ellipses, words of silence');
                                                          } else if (silence > 8) {
                                                                    recs.push(lang === 'ru' ? 
                                                                              '▪ Много пауз – текст создаёт атмосферу задумчивости' : 
                                                                              '▪ Many pauses – the text creates a thoughtful atmosphere');
                                                          }
                                                }
                                                const weather = this.getNumber(metrics.writer.weatherIndex);
                                                if (weather !== null) {
                                                          if (weather < -20) {
                                                                    recs.push(lang === 'ru' ? 
                                                                              '▪ Текст «холодный», добавьте тёплых образов' : 
                                                                              '▪ Text feels "cold", add warm imagery');
                                                          } else if (weather > 20) {
                                                                    recs.push(lang === 'ru' ? 
                                                                              '▪ Текст «горячий», много жаркой лексики' : 
                                                                              '▪ Text feels "hot", lots of hot vocabulary');
                                                          } else {
                                                                    recs.push(lang === 'ru' ? 
                                                                              '▪ Температурный баланс в норме' : 
                                                                              '▪ Temperature balance is normal');
                                                          }
                                                }
                                                const dialogue = this.getNumber(metrics.writer.dialogueParadigm);
                                                if (dialogue !== null && dialogue < 5) {
                                                          recs.push(lang === 'ru' ? 
                                                                    '▪ Диалогов мало, добавьте прямую речь для живости' : 
                                                                    '▪ Few dialogues, add direct speech for liveliness');
                                                } else if (dialogue !== null && dialogue > 30) {
                                                          recs.push(lang === 'ru' ? 
                                                                    '▪ Много диалогов – текст динамичный' : 
                                                                    '▪ Many dialogues – dynamic text');
                                                }
                                                const time = this.getNumber(metrics.writer.timeVector);
                                                if (time !== null && time > 30) {
                                                          recs.push(lang === 'ru' ? 
                                                                    '▪ Текст устремлён в будущее' : 
                                                                    '▪ Text looks to the future');
                                                } else if (time !== null && time < -30) {
                                                          recs.push(lang === 'ru' ? 
                                                                    '▪ Текст обращён в прошлое, много воспоминаний' : 
                                                                    '▪ Text looks to the past, many memories');
                                                }
                                                const modality = this.getNumber(metrics.writer.modalityLevel);
                                                if (modality !== null && modality > 15) {
                                                          recs.push(lang === 'ru' ? 
                                                                    '▪ Много слов неуверенности, придайте тексту больше уверенности' : 
                                                                    '▪ Many words of uncertainty, make the text more confident');
                                                } else if (modality !== null && modality < 3) {
                                                          recs.push(lang === 'ru' ? 
                                                                    '▪ Текст звучит уверенно' : 
                                                                    '▪ The text sounds confident');
                                                }
                                                const ego = this.getNumber(metrics.writer.egoFactor);
                                                if (ego !== null) {
                                                          if (ego > 70) {
                                                                    recs.push(lang === 'ru' ? 
                                                                              '▪ Сильный эго-фактор – повествование от первого лица' : 
                                                                              '▪ Strong ego factor – first‑person narration');
                                                          } else if (ego < 20) {
                                                                    recs.push(lang === 'ru' ? 
                                                                              '▪ Текст безличный, попробуйте добавить личного присутствия' : 
                                                                              '▪ Impersonal text, try adding personal presence');
                                                          }
                                                }
                                                const chaos = this.getNumber(metrics.writer.chaosEntropyPercent);
                                                if (chaos !== null && chaos > 80) {
                                                          recs.push(lang === 'ru' ? 
                                                                    '▪ Ритмическое богатство – текст живой, непредсказуемый' : 
                                                                    '▪ Rhythmic richness – lively, unpredictable text');
                                                } else if (chaos !== null && chaos < 40) {
                                                          recs.push(lang === 'ru' ? 
                                                                    '▪ Ритм монотонный, добавьте разнообразия в длину предложений' : 
                                                                    '▪ Monotonous rhythm, vary sentence length');
                                                }
                                      }
                            }
                  
                            return [...new Set(recs)].slice(0, 8);
}

async downloadSidebarAsImage() {
    if (!this.sidebar) return;

    const sidebar = this.sidebar;
    const originalOverflow = sidebar.style.overflow;
    const originalHeight = sidebar.style.height;

    try {
        sidebar.style.overflow = 'visible';
        sidebar.style.height = 'auto';

        await new Promise(resolve => setTimeout(resolve, 100));

        const fullHeight = sidebar.scrollHeight;
        const fullWidth = sidebar.offsetWidth;

        const canvas = document.createElement('canvas');
        canvas.width = fullWidth;
        canvas.height = fullHeight;

        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#1e1e1e';
        ctx.fillRect(0, 0, fullWidth, fullHeight);
        ctx.fillStyle = '#e0e0e0';
        ctx.font = '14px Consolas, Monaco, monospace';

        let y = 20;
        const lines = sidebar.innerText.split('\n').filter(line => line.trim());

        lines.forEach(line => {
            if (line.includes('Скачать') || line.includes('Download')) return;
            ctx.fillText(line.trim(), 20, y);
            y += 22;
        });

        const link = document.createElement('a');
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        link.download = `emotions_${timestamp}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();

    } catch (error) {
        console.error('Error:', error);
    } finally {
        sidebar.style.overflow = originalOverflow;
        sidebar.style.height = originalHeight;
    }
}

addDownloadButtonToSidebar() {
    const content = document.getElementById('emotions-content');
    if (!content) return;

    const oldBtn = document.getElementById('emotions-download-btn');
    if (oldBtn) oldBtn.remove();

    const lang = this.getCurrentLanguage();
    const downloadBtn = document.createElement('div');
    downloadBtn.id = 'emotions-download-btn';
    downloadBtn.textContent = lang === 'ru' ? 'Скачать' : 'Download';
    downloadBtn.style.cssText = `
        text-align: center;
        color: #fff;
        font-size: 14px;
        padding: 15px 0 10px 0;
        cursor: pointer;
        user-select: none;
    `;

    downloadBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.downloadSidebarAsImage();
    });

    downloadBtn.addEventListener('mouseenter', () => {
        downloadBtn.style.color = '#ccc';
    });

    downloadBtn.addEventListener('mouseleave', () => {
        downloadBtn.style.color = '#fff';
    });

    content.appendChild(downloadBtn);
}

renderResult(result) {
    if (!result || !result.success) {
        this.showError('Analysis failed');
        return;
    }
     
    if (!result.profile || !result.metrics) {
        this.showError('Invalid analysis result');
        return;
    }
    
    const content = document.getElementById('emotions-content');
    const currentLang = this.getCurrentLanguage();
    const translations = this.getTranslations(currentLang);
    const title = 'Blokknote Emotions Analysis';

    const titleElement = this.sidebar.querySelector('h2');
    if (titleElement) {
        titleElement.textContent = title;
    }

    const polarity = this.getNumber(this.getSafe(result, 'profile.polarity'));
    const intensity = this.getNumber(this.getSafe(result, 'profile.intensity'));
    const complexity = this.getNumber(this.getSafe(result, 'profile.complexity'));
    const confidence = this.getNumber(this.getSafe(result, 'profile.confidence'));
    const consistency = this.getNumber(this.getSafe(result, 'profile.consistency'));
    const emotionalRange = this.getNumber(this.getSafe(result, 'profile.emotionalRange'));
    const emotionalDepth = this.getNumber(this.getSafe(result, 'profile.emotionalDepth'));
    const ironyLevel = this.getNumber(this.getSafe(result, 'profile.ironyLevel'));
    const textComplexity = this.getNumber(this.getSafe(result, 'metrics.complexityScore'));
    const primaryToneName = this.getSafe(result, 'profile.display.name');
    const primaryToneDesc = this.getSafe(result, 'profile.display.description');
    const keywords = this.getSafe(result, 'profile.display.keywords', []);
    const narrative = this.getSafe(result, 'profile.narrative');
    
    const semanticProgression = this.getSafe(result, 'details.semantic.progression', {});
    const emotionalArc = semanticProgression.arc;
    const emotionalTrend = this.getSafe(semanticProgression, 'metrics.trend');
    const emotionalVolatility = this.getNumber(this.getSafe(semanticProgression, 'metrics.volatility'));
    
    const colorPalette = this.getSafe(result, 'profile.visual.palette', []);

    let html = '';
 
    const hasPrimaryProfile = this.shouldShowMetric(primaryToneName) || 
                            this.shouldShowMetric(primaryToneDesc) ||
                            this.shouldShowMetric(polarity, true) ||
                            this.shouldShowMetric(intensity, true);

    if (hasPrimaryProfile) {
		html += `
			<div class="emotion-section">
				<h3>${translations.primaryProfile}</h3>
		`;

		if (this.shouldShowMetric(primaryToneName)) {
				html += `
					<div class="emotion-metric">
						<span class="label" title="${translations.primaryToneDesc}">${translations.primaryTone}:</span>
						<span class="value" style="text-align:right !important;float:right;">${this.translateValue(primaryToneName, currentLang)}</span>
					</div>
				`;
		}

		if (this.shouldShowMetric(primaryToneDesc)) {
				html += `
					<div class="emotion-metric">
						<span class="label">${translations.description}:</span>
						<span class="value" style="display:block;text-align:right !important;float:right;word-break:break-word;margin-top:2px;">${this.translateValue(primaryToneDesc, currentLang)}</span>
					</div>
				`;
		}

		if (this.shouldShowMetric(polarity, true)) {
				html += `
					<div class="emotion-metric">
						<span class="label" title="${translations.polarityDesc}">${translations.polarity}:</span>
						<span class="value" style="text-align:right !important;float:right;">${(polarity * 100).toFixed(1)}%</span>
					</div>
				`;
		}

		if (this.shouldShowMetric(intensity, true)) {
				html += `
					<div class="emotion-metric">
						<span class="label" title="${translations.intensityDesc}">${translations.intensity}:</span>
						<span class="value" style="text-align:right !important;float:right;">${(intensity * 100).toFixed(1)}%</span>
					</div>
				`;
		}

		if (this.shouldShowMetric(confidence, true)) {
				html += `
					<div class="emotion-metric">
						<span class="label" title="${translations.confidenceDesc}">${translations.confidence}:</span>
						<span class="value" style="text-align:right !important;float:right;">${(confidence * 100).toFixed(1)}%</span>
					</div>
				`;
		}

		if (this.shouldShowMetric(consistency, true)) {
				html += `
					<div class="emotion-metric">
						<span class="label" title="${translations.consistencyDesc}">${translations.consistency}:</span>
						<span class="value" style="text-align:right !important;float:right;">${(consistency * 100).toFixed(1)}%</span>
					</div>
				`;
		}

		if (this.shouldShowMetric(complexity, true)) {
				html += `
					<div class="emotion-metric">
						<span class="label" title="${translations.complexityDesc}">${translations.complexity}:</span>
						<span class="value" style="text-align:right !important;float:right;">${(complexity * 100).toFixed(1)}%</span>
					</div>
				`;
		}

		if (this.shouldShowMetric(emotionalRange, true)) {
				html += `
					<div class="emotion-metric">
						<span class="label" title="${translations.emotionalRangeDesc}">${translations.emotionalRange}:</span>
						<span class="value" style="text-align:right !important;float:right;">${(emotionalRange * 100).toFixed(1)}%</span>
					</div>
				`;
		}

		if (this.shouldShowMetric(emotionalDepth, true)) {
				html += `
					<div class="emotion-metric">
						<span class="label" title="${translations.emotionalDepthDesc}">${translations.emotionalDepth}:</span>
						<span class="value" style="text-align:right !important;float:right;">${(emotionalDepth * 100).toFixed(1)}%</span>
					</div>
				`;
		}

		if (this.shouldShowMetric(ironyLevel, true)) {
				html += `
					<div class="emotion-metric">
						<span class="label" title="${translations.ironyLevelDesc}">${translations.ironyLevel}:</span>
						<span class="value" style="text-align:right !important;float:right;">${(ironyLevel * 100).toFixed(1)}%</span>
					</div>
				`;
		}

		const intensityProfile = this.getSafe(result, 'details.lexical.intensityProfile', {});
		const emotionBalance = this.getNumber(intensityProfile.balance);
		if (this.shouldShowMetric(emotionBalance, true)) {
				html += `
					<div class="emotion-metric">
						<span class="label" title="${translations.emotionBalanceDesc}">${translations.emotionBalance}:</span>
						<span class="value" style="text-align:right !important;float:right;">${(emotionBalance * 100).toFixed(1)}%</span>
					</div>
				`;
		}

		const emotionDominance = this.getNumber(intensityProfile.dominance);
		if (this.shouldShowMetric(emotionDominance, true)) {
				html += `
					<div class="emotion-metric">
						<span class="label" title="${translations.emotionDominanceDesc}">${translations.emotionDominance}:</span>
						<span class="value" style="text-align:right !important;float:right;">${(emotionDominance * 100).toFixed(1)}%</span>
					</div>
				`;
		}

		const emotionContrast = this.getNumber(intensityProfile.contrast);
		if (this.shouldShowMetric(emotionContrast, true)) {
				html += `
					<div class="emotion-metric">
						<span class="label" title="${translations.emotionContrastDesc}">${translations.emotionContrast}:</span>
						<span class="value" style="text-align:right !important;float:right;">${(emotionContrast * 100).toFixed(1)}%</span>
					</div>
				`;
		}

		const emotionConcentration = this.getNumber(intensityProfile.concentration);
		if (this.shouldShowMetric(emotionConcentration, true)) {
				html += `
					<div class="emotion-metric">
						<span class="label" title="${translations.emotionConcentrationDesc}">${translations.emotionConcentration}:</span>
						<span class="value" style="text-align:right !important;float:right;">${(emotionConcentration * 100).toFixed(1)}%</span>
					</div>
				`;
		}

		const temporal = this.getSafe(result, 'details.lexical.temporal', {});
		const emotionMomentum = this.getNumber(this.getSafe(temporal, 'metrics.momentum'));
		if (this.shouldShowMetric(emotionMomentum, true)) {
				html += `
					<div class="emotion-metric">
						<span class="label" title="${translations.emotionMomentumDesc}">${translations.emotionMomentum}:</span>
						<span class="value" style="text-align:right !important;float:right;">${(emotionMomentum * 100).toFixed(1)}%</span>
					</div>
				`;
		}

		const emotionVolatility = this.getNumber(this.getSafe(temporal, 'metrics.volatility'));
		if (this.shouldShowMetric(emotionVolatility, true)) {
				html += `
					<div class="emotion-metric">
						<span class="label" title="${translations.emotionVolatilityDesc}">${translations.emotionVolatility}:</span>
						<span class="value" style="text-align:right !important;float:right;">${(emotionVolatility * 100).toFixed(1)}%</span>
					</div>
				`;
		}

		const peakIntensity = this.getNumber(this.getSafe(temporal, 'metrics.peakIntensity'));
		if (this.shouldShowMetric(peakIntensity, true)) {
				html += `
					<div class="emotion-metric">
						<span class="label" title="${translations.peakIntensityDesc}">${translations.peakIntensity}:</span>
						<span class="value" style="text-align:right !important;float:right;">${(peakIntensity * 100).toFixed(1)}%</span>
					</div>
				`;
		}

		const valleyDepth = this.getNumber(this.getSafe(temporal, 'metrics.valleyDepth'));
		if (this.shouldShowMetric(valleyDepth, true)) {
				html += `
					<div class="emotion-metric">
						<span class="label" title="${translations.valleyDepthDesc}">${translations.valleyDepth}:</span>
						<span class="value" style="text-align:right !important;float:right;">${(Math.abs(valleyDepth) * 100).toFixed(1)}%</span>
					</div>
				`;
		}

		const peakCount = this.getNumber(this.getSafe(temporal, 'peaks', []).length);
		if (this.shouldShowMetric(peakCount, true) && peakCount > 0) {
				html += `
					<div class="emotion-metric">
						<span class="label" title="${translations.peakCountDesc}">${translations.peakCount}:</span>
						<span class="value" style="text-align:right !important;float:right;">${peakCount.toFixed(0)}</span>
					</div>
				`;
		}

		const valleyCount = this.getNumber(this.getSafe(temporal, 'valleys', []).length);
		if (this.shouldShowMetric(valleyCount, true) && valleyCount > 0) {
				html += `
					<div class="emotion-metric">
						<span class="label" title="${translations.valleyCountDesc}">${translations.valleyCount}:</span>
						<span class="value" style="text-align:right !important;float:right;">${valleyCount.toFixed(0)}</span>
					</div>
				`;
		}

		if (this.shouldShowMetric(emotionalTrend)) {
				html += `
					<div class="emotion-metric">
						<span class="label" title="${translations.emotionalTrendDesc}">${translations.emotionalTrend}:</span>
						<span class="value" style="text-align:right !important;float:right;">${this.translateEmotionalTrend(emotionalTrend, currentLang)}</span>
					</div>
				`;
		}

		if (this.shouldShowMetric(emotionalArc)) {
				html += `
					<div class="emotion-metric">
						<span class="label" title="${translations.emotionalArcDesc}">${translations.emotionalArc}:</span>
						<span class="value" style="text-align:right !important;float:right;">${this.translateEmotionalArc(emotionalArc, currentLang)}</span>
					</div>
				`;
		}

		if (this.shouldShowMetric(narrative)) {
				html += `
					<div class="emotion-metric">
						<span class="label" title="${translations.narrativeDesc}">${translations.narrative}:</span>
						<span class="value" style="text-align:right !important;float:right;">${this.translateNarrative(narrative, currentLang)}</span>
					</div>
				`;
		}

		html += `
			</div>
		`;
	}
    
    const writer = result.metrics?.writer || {};
	const hasWriterMetrics = Object.keys(writer).length > 0;
          
    if (hasWriterMetrics) {
                    const lang = this.getCurrentLanguage();
                    const t = this.getTranslations(lang);
                    
                    html += `<div class="emotion-section">`;
                    html += `<h3>${t.writerSection || (lang === 'ru' ? 'Для писателя' : 'For Writer')}</h3>`;
                    
                    const hemingwayVal = this.getNumber(writer.hemingwayCoefficient);
                    if (this.shouldShowMetric(hemingwayVal, true)) {
                              html += `<div class="emotion-metric">`;
                              html += `<span class="label" title="${t.writerHemingwayHint || ''}">${this.translateValue('Коэффициент Хемингуэя', lang)}:</span>`;
                              html += `<span class="value" style="text-align:right !important;float:right;">${writer.hemingwayCoefficient}%</span>`;
                              html += `</div>`;
                    }
                    
                    const silenceVal = this.getNumber(writer.silenceEffect);
                    if (this.shouldShowMetric(silenceVal, true)) {
                              html += `<div class="emotion-metric">`;
                              html += `<span class="label" title="${t.writerSilenceHint || ''}">${this.translateValue('Эффект тишины', lang)}:</span>`;
                              html += `<span class="value" style="text-align:right !important;float:right;">${writer.silenceEffect}dB</span>`;
                              html += `</div>`;
                    }
                    
                    const weatherVal = this.getNumber(writer.weatherIndex);
                    if (this.shouldShowMetric(weatherVal, true)) {
                              html += `<div class="emotion-metric">`;
                              html += `<span class="label" title="${t.writerWeatherHint || ''}">${this.translateValue('Индекс погоды', lang)}:</span>`;
                              html += `<span class="value" style="text-align:right !important;float:right;">${writer.weatherIndex}°C</span>`;
                              html += `</div>`;
                    }
                    
                    const dialogueVal = this.getNumber(writer.dialogueParadigm);
                    if (this.shouldShowMetric(dialogueVal, true)) {
                              html += `<div class="emotion-metric">`;
                              html += `<span class="label" title="${t.writerDialogueHint || ''}">${this.translateValue('Парадигма диалога', lang)}:</span>`;
                              html += `<span class="value" style="text-align:right !important;float:right;">${writer.dialogueParadigm}%</span>`;
                              html += `</div>`;
                    }
                    
                    const timeVal = this.getNumber(writer.timeVector);
                    if (this.shouldShowMetric(timeVal, true)) {
                              html += `<div class="emotion-metric">`;
                              html += `<span class="label" title="${t.writerTimeHint || ''}">${this.translateValue('Вектор времени', lang)}:</span>`;
                              html += `<span class="value" style="text-align:right !important;float:right;">${writer.timeVector}</span>`;
                              html += `</div>`;
                    }
                    
                    const modalityVal = this.getNumber(writer.modalityLevel);
                    if (this.shouldShowMetric(modalityVal, true)) {
                              html += `<div class="emotion-metric">`;
                              html += `<span class="label" title="${t.writerModalityHint || ''}">${this.translateValue('Уровень модальности', lang)}:</span>`;
                              html += `<span class="value" style="text-align:right !important;float:right;">${writer.modalityLevel}‰</span>`;
                              html += `</div>`;
                    }
                    
                    const egoVal = this.getNumber(writer.egoFactor);
                    if (this.shouldShowMetric(egoVal, true)) {
                              html += `<div class="emotion-metric">`;
                              html += `<span class="label" title="${t.writerEgoHint || ''}">${this.translateValue('Эго-фактор', lang)}:</span>`;
                              html += `<span class="value" style="text-align:right !important;float:right;">${writer.egoFactor}%</span>`;
                              html += `</div>`;
                    }
                    
                    const fragmentationVal = this.getNumber(writer.fragmentationDegree);
                    if (this.shouldShowMetric(fragmentationVal, true)) {
                              html += `<div class="emotion-metric">`;
                              html += `<span class="label" title="${t.writerFragmentationHint || ''}">${this.translateValue('Степень фрагментации', lang)}:</span>`;
                              html += `<span class="value" style="text-align:right !important;float:right;">${writer.fragmentationDegree}</span>`;
                              html += `</div>`;
                    }
                    
                    const immersivenessVal = this.getNumber(writer.immersiveness);
                    if (this.shouldShowMetric(immersivenessVal, true)) {
                              html += `<div class="emotion-metric">`;
                              html += `<span class="label" title="${t.writerImmersivenessHint || ''}">${this.translateValue('Показатель иммерсивности', lang)}:</span>`;
                              html += `<span class="value" style="text-align:right !important;float:right;">${writer.immersiveness}‰</span>`;
                              html += `</div>`;
                    }
                    
                    const chaosVal = this.getNumber(writer.chaosEntropyPercent);
                    if (this.shouldShowMetric(chaosVal, true)) {
                              html += `<div class="emotion-metric">`;
                              html += `<span class="label" title="${t.writerChaosHint || ''}">${this.translateValue('Процент энтропии', lang)}:</span>`;
                              html += `<span class="value" style="text-align:right !important;float:right;">${writer.chaosEntropyPercent}%</span>`;
                              html += `</div>`;
                    }
                    
                    html += `</div>`;
    }

    const poetry = result.metrics?.poetry || {};
    const hasPoetryMetrics = Object.keys(poetry).length > 0;
                  
    if (hasPoetryMetrics) {
                            const lang = this.getCurrentLanguage();
                            const t = this.getTranslations(lang);
                  
                            html += `<div class="emotion-section">`;
                            html += `<h3>${lang === 'ru' ? 'Для поэта' : 'For Poet'}</h3>`;
                  
                            const anaphoraVal = this.getNumber(poetry.anaphoraFreq);
                            if (anaphoraVal !== null && anaphoraVal !== 0) {
                                      html += `<div class="emotion-metric">`;
                                      html += `<span class="label" title="${t.poetryAnaphoraHint || ''}">${this.translateValue('Анафорическая частота', lang)}:</span>`;
                                      html += `<span class="value">${poetry.anaphoraFreq}%</span>`;
                                      html += `</div>`;
                            }
                  
                            const epiphoraVal = this.getNumber(poetry.epiphoraFreq);
                            if (epiphoraVal !== null && epiphoraVal !== 0) {
                                      html += `<div class="emotion-metric">`;
                                      html += `<span class="label" title="${t.poetryEpiphoraHint || ''}">${this.translateValue('Эпифорическая частота', lang)}:</span>`;
                                      html += `<span class="value">${poetry.epiphoraFreq}%</span>`;
                                      html += `</div>`;
                            }
                  
                            const consVal = this.getNumber(poetry.consonantWhisper);
                            if (consVal !== null && consVal !== 0) {
                                      html += `<div class="emotion-metric">`;
                                      html += `<span class="label" title="${t.poetryConsonantHint || ''}">${this.translateValue('Шелест букв', lang)}:</span>`;
                                      html += `<span class="value">${poetry.consonantWhisper}</span>`;
                                      html += `</div>`;
                            }
                  
                            const vowelVal = this.getNumber(poetry.vowelCaress);
                            if (vowelVal !== null && vowelVal !== 0) {
                                      html += `<div class="emotion-metric">`;
                                      html += `<span class="label" title="${t.poetryVowelHint || ''}">${this.translateValue('Ласка звуков', lang)}:</span>`;
                                      html += `<span class="value">${poetry.vowelCaress}</span>`;
                                      html += `</div>`;
                            }
                  
                            const syllVal = this.getNumber(poetry.syllableScore);
                            if (syllVal !== null && syllVal !== 0) {
                                      html += `<div class="emotion-metric">`;
                                      html += `<span class="label" title="${t.poetrySyllableHint || ''}">${this.translateValue('Слогопись', lang)}:</span>`;
                                      html += `<span class="value">${poetry.syllableScore}</span>`;
                                      html += `</div>`;
                            }
                  
                            const stropheVal = this.getNumber(poetry.stropheMeter);
                            if (stropheVal !== null && stropheVal !== 0) {
                                      html += `<div class="emotion-metric">`;
                                      html += `<span class="label" title="${t.poetryStropheHint || ''}">${this.translateValue('Строфамёт', lang)}:</span>`;
                                      html += `<span class="value">${poetry.stropheMeter}</span>`;
                                      html += `</div>`;
                            }
                  
                            const lineLenVal = this.getNumber(poetry.lineLength);
                            if (lineLenVal !== null && lineLenVal !== 0) {
                                      html += `<div class="emotion-metric">`;
                                      html += `<span class="label" title="${t.poetryLineLengthHint || ''}">${this.translateValue('Длинностих', lang)}:</span>`;
                                      html += `<span class="value">${poetry.lineLength}</span>`;
                                      html += `</div>`;
                            }
                  
                            const rhymeVal = this.getNumber(poetry.rhymeCatcher);
                            if (rhymeVal !== null && rhymeVal !== 0) {
                                      html += `<div class="emotion-metric">`;
                                      html += `<span class="label" title="${t.poetryRhymeHint || ''}">${this.translateValue('Ловец рифм', lang)}:</span>`;
                                      html += `<span class="value">${poetry.rhymeCatcher}%</span>`;
                                      html += `</div>`;
                            }
                  
                            if (poetry.suitableMeter) {
                                      html += `<div class="emotion-metric">`;
                                      html += `<span class="label" title="${t.poetryMeterHint || ''}">${this.translateValue('Подходящий размер', lang)}:</span>`;
                                      html += `<span class="value">${poetry.suitableMeter}</span>`;
                                      html += `</div>`;
                            }
                  
                            const freedomVal = this.getNumber(poetry.freedomWaves);
                            if (freedomVal !== null && freedomVal !== 0) {
                                      html += `<div class="emotion-metric">`;
                                      html += `<span class="label" title="${t.poetryFreedomHint || ''}">${this.translateValue('Вольноволны', lang)}:</span>`;
                                      html += `<span class="value">${poetry.freedomWaves}%</span>`;
                                      html += `</div>`;
                            }
                  
                            html += `</div>`;
    }

    const journalist = result.metrics?.journalist || {};
    const hasJournalistMetrics = Object.keys(journalist).length > 0;
          
    if (hasJournalistMetrics) {
                    const lang = this.getCurrentLanguage();
                    const t = this.getTranslations(lang);
                    
                    html += `<div class="emotion-section">`;
                    html += `<h3>${lang === 'ru' ? 'Для журналиста' : 'For Journalist'}</h3>`;
                    
                    const digitalVal = this.getNumber(journalist.digitalFootprint);
                    if (this.shouldShowMetric(digitalVal, true)) {
                              html += `<div class="emotion-metric">`;
                              html += `<span class="label" title="${t.journalistDigitalFootprint || ''}">${this.translateValue('Цифровой след', lang)}:</span>`;
                              html += `<span class="value" style="text-align:right !important;float:right;">${journalist.digitalFootprint}‰</span>`;
                              html += `</div>`;
                    }
                    
                    const nameVal = this.getNumber(journalist.nameIndex);
                    if (this.shouldShowMetric(nameVal, true)) {
                              html += `<div class="emotion-metric">`;
                              html += `<span class="label" title="${t.journalistNameIndex || ''}">${this.translateValue('Именной указатель', lang)}:</span>`;
                              html += `<span class="value" style="text-align:right !important;float:right;">${journalist.nameIndex}‰</span>`;
                              html += `</div>`;
                    }
                    
                    const factMirrorVal = this.getNumber(journalist.factMirror);
                    if (this.shouldShowMetric(factMirrorVal, true)) {
                              html += `<div class="emotion-metric">`;
                              html += `<span class="label" title="${t.journalistFactMirror || ''}">${this.translateValue('Зеркало фактов', lang)}:</span>`;
                              html += `<span class="value" style="text-align:right !important;float:right;">${journalist.factMirror}%</span>`;
                              html += `</div>`;
                    }
                    
                    const freshnessVal = this.getNumber(journalist.freshnessGauge);
                    if (this.shouldShowMetric(freshnessVal, true)) {
                              html += `<div class="emotion-metric">`;
                              html += `<span class="label" title="${t.journalistFreshnessGauge || ''}">${this.translateValue('Показатель актуальности', lang)}:</span>`;
                              html += `<span class="value" style="text-align:right !important;float:right;">${journalist.freshnessGauge}‰</span>`;
                              html += `</div>`;
                    }
                    
                    const antiYellowVal = this.getNumber(journalist.antiYellow);
                    if (this.shouldShowMetric(antiYellowVal, true)) {
                              html += `<div class="emotion-metric">`;
                              html += `<span class="label" title="${t.journalistAntiYellow || ''}">${this.translateValue('Анти-желтизна', lang)}:</span>`;
                              html += `<span class="value" style="text-align:right !important;float:right;">${journalist.antiYellow}%</span>`;
                              html += `</div>`;
                    }
                    
                    const opinionVal = this.getNumber(journalist.opinionPalette);
                    if (this.shouldShowMetric(opinionVal, true)) {
                              html += `<div class="emotion-metric">`;
                              html += `<span class="label" title="${t.journalistOpinionPalette || ''}">${this.translateValue('Спектр мнений', lang)}:</span>`;
                              html += `<span class="value" style="text-align:right !important;float:right;">${journalist.opinionPalette}‰</span>`;
                              html += `</div>`;
                    }
                    
                    const bureauVal = this.getNumber(journalist.bureaucraticNoise);
                    if (this.shouldShowMetric(bureauVal, true)) {
                              html += `<div class="emotion-metric">`;
                              html += `<span class="label" title="${t.journalistBureaucraticNoise || ''}">${this.translateValue('Бюрократический шум', lang)}:</span>`;
                              html += `<span class="value" style="text-align:right !important;float:right;">${bureauVal === 0 ? (lang === 'ru' ? 'Отсутствуют' : 'None') : bureauVal + '‰'}</span>`;
                              html += `</div>`;
                    }
                    
                    const echoVal = this.getNumber(journalist.verbalEcho);
                    if (this.shouldShowMetric(echoVal, true)) {
                              html += `<div class="emotion-metric">`;
                              html += `<span class="label" title="${t.journalistVerbalEcho || ''}">${this.translateValue('Словесное эхо', lang)}:</span>`;
                              html += `<span class="value" style="text-align:right !important;float:right;">${echoVal === 0 ? (lang === 'ru' ? 'Отсутствуют' : 'None') : echoVal + '‰'}</span>`;
                              html += `</div>`;
                    }
                    
                    const fogVal = this.getNumber(journalist.fogZone);
                    if (this.shouldShowMetric(fogVal, true)) {
                              html += `<div class="emotion-metric">`;
                              html += `<span class="label" title="${t.journalistFogZone || ''}">${this.translateValue('Зона тумана', lang)}:</span>`;
                              html += `<span class="value" style="text-align:right !important;float:right;">${journalist.fogZone}‰</span>`;
                              html += `</div>`;
                    }
                    
                    const categVal = this.getNumber(journalist.categoricalTone);
                    if (this.shouldShowMetric(categVal, true)) {
                              html += `<div class="emotion-metric">`;
                              html += `<span class="label" title="${t.journalistCategoricalTone || ''}">${this.translateValue('Категоричный тон', lang)}:</span>`;
                              html += `<span class="value" style="text-align:right !important;float:right;">${journalist.categoricalTone}‰</span>`;
                              html += `</div>`;
                    }
                    
                    html += `</div>`;
    }

    const copywriter = result.metrics?.copywriter || {};
    const hasCopywriterMetrics = Object.keys(copywriter).length > 0;
                  
    if (hasCopywriterMetrics) {
                            const lang = this.getCurrentLanguage();
                            const t = this.getTranslations(lang);
                  
                            html += `<div class="emotion-section">`;
                            html += `<h3>${lang === 'ru' ? 'Для копирайтера' : 'For Copywriter'}</h3>`;
                  
                            if (this.shouldShowMetric(copywriter.seoDensity, true)) {
                                      html += `<div class="emotion-metric">`;
                                      html += `<span class="label" title="${t.copywriterSeoDensityHint || ''}">${this.translateValue('SEO-плотность', lang)}:</span>`;
                                      html += `<span class="value">${copywriter.seoDensity}%</span>`;
                                      html += `</div>`;
                            }
                  
                            if (this.shouldShowMetric(copywriter.callToAction, true)) {
                                      html += `<div class="emotion-metric">`;
                                      html += `<span class="label" title="${t.copywriterCallToActionHint || ''}">${this.translateValue('Призывы к действию', lang)}:</span>`;
                                      html += `<span class="value">${copywriter.callToAction}‰</span>`;
                                      html += `</div>`;
                            }
                  
                            if (this.shouldShowMetric(copywriter.clicheMeter, true)) {
                                      html += `<div class="emotion-metric">`;
                                      html += `<span class="label" title="${t.copywriterClicheMeterHint || ''}">${this.translateValue('Штампометр', lang)}:</span>`;
                                      html += `<span class="value">${copywriter.clicheMeter}‰</span>`;
                                      html += `</div>`;
                            }
                  
                            if (this.shouldShowMetric(copywriter.superlativeDegree, true)) {
                                      html += `<div class="emotion-metric">`;
                                      html += `<span class="label" title="${t.copywriterSuperlativeHint || ''}">${this.translateValue('Превосходная степень', lang)}:</span>`;
                                      html += `<span class="value">${copywriter.superlativeDegree}‰</span>`;
                                      html += `</div>`;
                            }
                  
                            if (this.shouldShowMetric(copywriter.storytelling, true)) {
                                      const val = copywriter.storytelling;
                                      const unit = lang === 'ru' ? this.pluralize(val, ['маркер', 'маркера', 'маркеров']) : 'markers';
                                      html += `<div class="emotion-metric">`;
                                      html += `<span class="label" title="${t.copywriterStorytellingHint || ''}">${this.translateValue('Сторителлинг', lang)}:</span>`;
                                      html += `<span class="value">${val} ${unit}</span>`;
                                      html += `</div>`;
                            }
                  
                            if (this.shouldShowMetric(copywriter.fillerWords, true)) {
                                      html += `<div class="emotion-metric">`;
                                      html += `<span class="label" title="${t.copywriterFillerWordsHint || ''}">${this.translateValue('Детектор вредных слов', lang)}:</span>`;
                                      html += `<span class="value">${copywriter.fillerWords}‰</span>`;
                                      html += `</div>`;
                            }
                  
                            if (this.shouldShowMetric(copywriter.waterContent, true)) {
                                      html += `<div class="emotion-metric">`;
                                      html += `<span class="label" title="${t.copywriterWaterContentHint || ''}">${this.translateValue('Водность', lang)}:</span>`;
                                      html += `<span class="value">${copywriter.waterContent}%</span>`;
                                      html += `</div>`;
                            }
                  
                            if (this.shouldShowMetric(copywriter.spamIndex, true)) {
                                      html += `<div class="emotion-metric">`;
                                      html += `<span class="label" title="${t.copywriterSpamIndexHint || ''}">${this.translateValue('Индекс переспама', lang)}:</span>`;
                                      html += `<span class="value">${copywriter.spamIndex}%</span>`;
                                      html += `</div>`;
                            }
                  
                            if (this.shouldShowMetric(copywriter.listDensity, true)) {
                                      const listPresent = copywriter.listDensity > 0;
                                      const displayText = listPresent ? t.listPresent : t.listAbsent;
                                      html += `<div class="emotion-metric">`;
                                      html += `<span class="label" title="${t.copywriterListDensityHint || ''}">${this.translateValue('Списки', lang)}:</span>`;
                                      html += `<span class="value">${displayText}</span>`;
                                      html += `</div>`;
                            }
                  
                            if (this.shouldShowMetric(copywriter.noveltyCoefficient, true)) {
                                      html += `<div class="emotion-metric">`;
                                      html += `<span class="label" title="${t.copywriterNoveltyHint || ''}">${this.translateValue('Игра в уникальность', lang)}:</span>`;
                                      html += `<span class="value">${copywriter.noveltyCoefficient}%</span>`;
                                      html += `</div>`;
                            }
                  
                            html += `</div>`;
    }

    const fun = result.metrics?.fun || {};
    const hasFunMetrics = Object.keys(fun).length > 0;
          
    if (hasFunMetrics) {
                    const lang = this.getCurrentLanguage();
                    const t = this.getTranslations(lang);
                    
                    html += `<div class="emotion-section">`;
                    html += `<h3>${lang === 'ru' ? 'Для настроения' : 'For Fun'}</h3>`;
                    
                    if (this.shouldShowMetric(fun.moreCoffee, true)) {
                              const val = fun.moreCoffee;
                              const unit = lang === 'ru' ? this.pluralize(val, ['джармуш', 'джармуша', 'джармушей']) : 'jarmuschs';
                              html += `<div class="emotion-metric">`;
                              html += `<span class="label" title="${t.funMoreCoffeeHint || ''}">${this.translateValue('Ещё кофе, пожалуйста', lang)}:</span>`;
                              html += `<span class="value">${val} ${unit}</span>`;
                              html += `</div>`;
                    }
                    
                    if (this.shouldShowMetric(fun.lostTime, true)) {
                              const val = fun.lostTime;
                              const unit = lang === 'ru' ? this.pluralize(val, ['пруст', 'пруста', 'прустов']) : 'prousts';
                              html += `<div class="emotion-metric">`;
                              html += `<span class="label" title="${t.funLostTimeHint || ''}">${this.translateValue('В поисках утраченного', lang)}:</span>`;
                              html += `<span class="value">${val} ${unit}</span>`;
                              html += `</div>`;
                    }
                    
                    if (this.shouldShowMetric(fun.rabbitHole, true)) {
                              const val = fun.rabbitHole;
                              const unit = lang === 'ru' ? this.pluralize(val, ['кролик', 'кролика', 'кроликов']) : 'rabbits';
                              html += `<div class="emotion-metric">`;
                              html += `<span class="label" title="${t.funRabbitHoleHint || ''}">${this.translateValue('Я падаю?', lang)}:</span>`;
                              html += `<span class="value">${val} ${unit}</span>`;
                              html += `</div>`;
                    }
                    
                    if (this.shouldShowMetric(fun.pulpFiction, true)) {
                              const val = fun.pulpFiction;
                              const unit = lang === 'ru' ? this.pluralize(val, ['тарантинка', 'тарантинки', 'тарантинок']) : 'tarantinos';
                              html += `<div class="emotion-metric">`;
                              html += `<span class="label" title="${t.funPulpFictionHint || ''}">${this.translateValue('Криминальное чтиво', lang)}:</span>`;
                              html += `<span class="value">${val} ${unit}</span>`;
                              html += `</div>`;
                    }
                    
                    if (this.shouldShowMetric(fun.copyOfCopy, true)) {
                              const val = fun.copyOfCopy;
                              const unit = lang === 'ru' ? this.pluralize(val, ['паланик', 'паланика', 'палаников']) : 'palahniuks';
                              html += `<div class="emotion-metric">`;
                              html += `<span class="label" title="${t.funCopyOfCopyHint || ''}">${this.translateValue('Копия, снятая с копии', lang)}:</span>`;
                              html += `<span class="value">${val} ${unit}</span>`;
                              html += `</div>`;
                    }
                    
                    if (this.shouldShowMetric(fun.scranton, true)) {
                              const val = fun.scranton;
                              const unit = lang === 'ru' ? this.pluralize(val, ['дандермиффлин', 'дандермиффлина', 'дандермиффлинов']) : 'dundermifflins';
                              html += `<div class="emotion-metric">`;
                              html += `<span class="label" title="${t.funScrantonHint || ''}">${this.translateValue('Пора в Скрантон', lang)}:</span>`;
                              html += `<span class="value">${val} ${unit}</span>`;
                              html += `</div>`;
                    }
                    
                    if (this.shouldShowMetric(fun.hogwarts, true)) {
                              const val = fun.hogwarts;
                              const unit = lang === 'ru' ? this.pluralize(val, ['философский камень', 'философских камня', 'философских камней']) : 'philosopher\'s stones';
                              html += `<div class="emotion-metric">`;
                              html += `<span class="label" title="${t.funHogwartsHint || ''}">${this.translateValue('Путешествие в Хогвартс', lang)}:</span>`;
                              html += `<span class="value">${val} ${unit}</span>`;
                              html += `</div>`;
                    }
                    
                    if (this.shouldShowMetric(fun.unknownPlanets, true)) {
                              const val = fun.unknownPlanets;
                              const unit = lang === 'ru' ? this.pluralize(val, ['джедай', 'джедая', 'джедаев']) : 'jedis';
                              html += `<div class="emotion-metric">`;
                              html += `<span class="label" title="${t.funUnknownPlanetsHint || ''}">${this.translateValue('На неведомых планетах', lang)}:</span>`;
                              html += `<span class="value">${val} ${unit}</span>`;
                              html += `</div>`;
                    }
                    
                    if (this.shouldShowMetric(fun.mordor, true)) {
                              const val = fun.mordor;
                              const unit = lang === 'ru' ? this.pluralize(val, ['хоббит', 'хоббита', 'хоббитов']) : 'hobbits';
                              html += `<div class="emotion-metric">`;
                              html += `<span class="label" title="${t.funMordorHint || ''}">${this.translateValue('Ещё чуть-чуть до Мордора', lang)}:</span>`;
                              html += `<span class="value">${val} ${unit}</span>`;
                              html += `</div>`;
                    }
                    
                    if (this.shouldShowMetric(fun.garageRock, true)) {
                              const val = fun.garageRock;
                              const unit = lang === 'ru' ? this.pluralize(val, ['кобейн', 'кобейна', 'кобейнов']) : 'cobains';
                              html += `<div class="emotion-metric">`;
                              html += `<span class="label" title="${t.funGarageRockHint || ''}">${this.translateValue('Гаражный рок', lang)}:</span>`;
                              html += `<span class="value">${val} ${unit}</span>`;
                              html += `</div>`;
                    }
                    
                    if (this.shouldShowMetric(fun.iceMelts, true)) {
                              const val = fun.iceMelts;
                              const unit = lang === 'ru' ? this.pluralize(val, ['титаник', 'титаника', 'титаников']) : 'titanic';
                              html += `<div class="emotion-metric">`;
                              html += `<span class="label" title="${t.funIceMeltsHint || ''}">${this.translateValue('Между нами тает лёд', lang)}:</span>`;
                              html += `<span class="value">${val} ${unit}</span>`;
                              html += `</div>`;
                    }
                    
                    html += `</div>`;
    }

    if (this.hasArrayContent(keywords)) {
        html += `
             <div class="emotion-section">
                 <h3>${translations.keywords}</h3>
               ${keywords.map(keyword => 
                    `<div class="emotion-metric"><span class="value" style="text-align:right !important;float:right;">${this.translateValue(keyword, currentLang)}</span></div>`
                ).join('')}
             </div>`;
    }

    const writingQuality = this.getSafe(result, 'writingQuality', {});
    const repetitions = this.getSafe(writingQuality, 'repetitions', {});
    
    if (repetitions && repetitions.repetitions && repetitions.repetitions.length > 0) {
        const sortedRepetitions = repetitions.repetitions
            .slice()
            .sort((a, b) => a.count - b.count);
        
        html += `
             <div class="emotion-section">
                 <h3>${translations.repetitionsTitle}</h3>
        `;
        
        sortedRepetitions.forEach(rep => {
            const severityColor = rep.count > 5 ? '#ef4444' : '#f59e0b';
            
            html += `
                 <div class="emotion-metric" style="border-left:3px solid ${severityColor};padding-left:8px;">
                     <span class="label">${rep.word}:</span>
                     <span class="value">${rep.count}</span>
                 </div>
            `;
        });
        
        html += `</div>`;
    }

    const textLength = this.getNumber(this.getSafe(result, 'metrics.textLength'));
    const wordCount = this.getNumber(this.getSafe(result, 'metrics.wordCount'));
    const paragraphCount = this.getNumber(this.getSafe(result, 'metrics.paragraphCount'));
    const languageConfidence = this.getNumber(this.getSafe(result, 'languageConfidence'));

     const hasLexicalData = this.shouldShowMetric(textLength, true) || 
                            this.shouldShowMetric(wordCount, true) || 
                            this.shouldShowMetric(paragraphCount, true) ||
                            this.shouldShowMetric(languageConfidence, true);

    if (hasLexicalData) {
        html += `
             <div class="emotion-section">
                 <h3>${translations.lexicalAnalysis}</h3>`;
        
        if (this.shouldShowMetric(textLength, true)) {
            html += `
                 <div class="emotion-metric">
                     <span class="label" title="${translations.totalCharsDesc}">${translations.totalChars}:</span>
                     <span class="value" style="text-align:right !important;float:right;">${textLength}</span>
                 </div>`;
        }
        
        if (this.shouldShowMetric(wordCount, true)) {
            html += `
                 <div class="emotion-metric">
                     <span class="label" title="${translations.totalWordsDesc}">${translations.totalWords}:</span>
                     <span class="value" style="text-align:right !important;float:right;">${wordCount}</span>
                 </div>`;
        }
        
        if (this.shouldShowMetric(paragraphCount, true)) {
            html += `
                 <div class="emotion-metric">
                     <span class="label" title="${translations.paragraphsDesc}">${translations.paragraphs}:</span>
                     <span class="value" style="text-align:right !important;float:right;">${paragraphCount}</span>
                 </div>`;
        }

		const emoticons = this.getSafe(result, 'details.lexical.emoticons', {});
		
		if (Object.keys(emoticons).length > 0) {
            let emoticonsText = '';
            if (emoticons.positive > 0) emoticonsText += `${translations.positive}: ${emoticons.positive} `;
            if (emoticons.negative > 0) emoticonsText += `${translations.negative}: ${emoticons.negative} `;
            if (emoticons.neutral > 0) emoticonsText += `${translations.neutral}: ${emoticons.neutral} `;
            if (emoticons.complex > 0) emoticonsText += `${translations.complex}: ${emoticons.complex} `;
            
            if (emoticonsText) {
                html += `
                     <div class="emotion-metric">
                         <span class="label" title="${translations.emoticonsDesc}">${translations.emoticons}:</span>
                         <span class="value" style="text-align:right !important;float:right;">${emoticonsText}</span>
                     </div>`;
            }
        }
        
        const emotionalWords = this.getNumber(this.getSafe(result, 'details.lexical.summary.totalEmotionalWords'));
        const lexicalDensity = this.getNumber(this.getSafe(result, 'details.lexical.summary.lexicalDensity'));
        const categoryCount = this.getNumber(this.getSafe(result, 'details.lexical.summary.categoryCount'));
        const dominantCategoryRaw = this.getSafe(result, 'details.lexical.summary.dominantCategory');
		const dominantCategory = (dominantCategoryRaw && typeof dominantCategoryRaw === 'object') 
    		? dominantCategoryRaw.primary 
    		: dominantCategoryRaw;
        const lexicalConcentration = this.getNumber(this.getSafe(result, 'details.lexical.summary.lexicalConcentration'));
        const lexicalRichness = this.getNumber(this.getSafe(result, 'details.lexical.summary.lexicalRichness'));
        const emotionalClusters = this.getNumber(this.getSafe(result, 'details.lexical.clusters.length'));
        
        if (this.shouldShowMetric(dominantCategory)) {
            html += `
                 <div class="emotion-metric">
                     <span class="label" title="${translations.dominantCategoryDesc}">${translations.dominantCategory}:</span>
                     <span class="value" style="text-align:right !important;float:right;">${this.translateCategory(dominantCategory, currentLang)}</span>
                 </div>`;
        }
		
		if (this.shouldShowMetric(lexicalDensity, true)) {
            html += `
                 <div class="emotion-metric">
                     <span class="label" title="${translations.lexicalDensityDesc}">${translations.lexicalDensity}:</span>
                     <span class="value" style="text-align:right !important;float:right;">${(lexicalDensity * 100).toFixed(1)}%</span>
                 </div>`;
        }
        
        if (this.shouldShowMetric(lexicalConcentration, true)) {
            html += `
                 <div class="emotion-metric">
                     <span class="label" title="${translations.lexicalConcentrationDesc}">${translations.lexicalConcentration}:</span>
                     <span class="value" style="text-align:right !important;float:right;">${(lexicalConcentration * 100).toFixed(1)}%</span>
                 </div>`;
        }
        
        if (this.shouldShowMetric(lexicalRichness, true)) {
            html += `
                 <div class="emotion-metric">
                     <span class="label" title="${translations.lexicalRichnessDesc}">${translations.lexicalRichness}:</span>
                     <span class="value" style="text-align:right !important;float:right;">${(lexicalRichness * 100).toFixed(1)}%</span>
                 </div>`;
        }

		if (this.shouldShowMetric(textComplexity, true)) {
				html += `
					<div class="emotion-metric">
						<span class="label" title="${translations.textComplexityDesc}">${translations.textComplexity}:</span>
						<span class="value" style="text-align:right !important;float:right;">${(textComplexity * 100).toFixed(1)}%</span>
					</div>
				`;
		}

		if (this.shouldShowMetric(languageConfidence, true)) {
            html += `
                 <div class="emotion-metric">
                     <span class="label" title="${translations.languageConfidenceDesc}">${translations.languageConfidence}:</span>
                     <span class="value" style="text-align:right !important;float:right;">${(languageConfidence * 100).toFixed(1)}%</span>
                 </div>`;
        }
        
        html += `</div>`;
    }

    const sentenceCount = this.getNumber(this.getSafe(result, 'details.syntactic.sentenceStats.count'));
    const avgLength = this.getNumber(this.getSafe(result, 'details.syntactic.sentenceStats.avgLength'));
    const punctuationDistribution = this.getSafe(result, 'details.syntactic.punctuation.distribution', {});

    const hasSyntacticData = this.shouldShowMetric(sentenceCount, true) || this.shouldShowMetric(avgLength, true) || Object.keys(punctuationDistribution).length > 0;

    if (hasSyntacticData) {
        html += `
             <div class="emotion-section">
                 <h3>${translations.syntacticAnalysis}</h3>`;
        
        if (this.shouldShowMetric(sentenceCount, true)) {
            html += `
                 <div class="emotion-metric">
                     <span class="label" title="${translations.sentencesDesc}">${translations.sentences}:</span>
                     <span class="value" style="text-align:right !important;float:right;">${sentenceCount}</span>
                 </div>`;
        }
        
        if (this.shouldShowMetric(avgLength, true)) {
            html += `
                 <div class="emotion-metric">
                     <span class="label" title="${translations.avgLengthDesc}">${translations.avgLength}:</span>
                     <span class="value" style="text-align:right !important;float:right;">${avgLength.toFixed(1)} ${translations.words}</span>
                 </div>`;
        }
        
        const allText = this.getSafe(result, 'details.lexical.cleaned', '') || 
                     this.getSafe(result, 'details.lexical.original', '');
         
        const totalPunctuation = this.countAllPunctuation(allText);
        
        if (this.shouldShowMetric(totalPunctuation, true)) {
            html += `
              <div class="emotion-metric">
                     <span class="label" title="${translations.totalPunctuationDesc}">${translations.totalPunctuation}:</span>
                     <span class="value" style="text-align:right !important;float:right;">${totalPunctuation}</span>
                 </div>`;
        }
        
        const emotionalPunctuation = Object.keys(punctuationDistribution).reduce((sum, key) => {
            const val = punctuationDistribution[key];
            return sum + (this.isValidNumber(val) ? val : 0);
        }, 0);
        
        if (emotionalPunctuation > 0) {
            html += `
                 <div class="emotion-metric">
                     <span class="label" title="${translations.emotionalPunctuationDesc}">${translations.emotionalPunctuation}:</span>
                     <span class="value" style="text-align:right !important;float:right;">${emotionalPunctuation}</span>
                 </div>`;
        }
        
        const sentenceTypes = this.getSafe(result, 'details.syntactic.sentenceTypes', {});
        const syntacticComplexity = this.getNumber(this.getSafe(result, 'details.syntactic.complexity'));
        const rhythmRegularity = this.getNumber(this.getSafe(result, 'details.syntactic.rhythm.regularity'));
        const rhythmPattern =  this.getSafe(result, 'details.syntactic.rhythm.pattern');
        const rhythmFlow = this.getSafe(result, 'details.syntactic.rhythm.flow');
        const syntacticCoherence = this.getNumber(this.getSafe(result, 'details.syntactic.coherence'));
        
        if  (this.shouldShowMetric(sentenceTypes.exclamatory, true)) {
            html += `
                 <div class="emotion-metric">
                     <span class="label" title="${translations.exclamatoryDesc}">${translations.exclamatory}:</span>
                     <span class="value" style="text-align:right !important;float:right;">${sentenceTypes.exclamatory}</span>
                 </div>`;
        }
        
        if (this.shouldShowMetric(sentenceTypes.interrogative, true)) {
            html += `
                 <div class="emotion-metric">
                     <span class="label" title="${translations.interrogativeDesc}">${translations.interrogative}:</span>
                     <span class="value" style="text-align:right !important;float:right;">${sentenceTypes.interrogative}</span>
                 </div>`;
        }
        
        if (this.shouldShowMetric(sentenceTypes.hesitant, true)) {
            html += `
                 <div class="emotion-metric">
                     <span class="label" title="${translations.hesitantDesc}">${translations.hesitant}:</span>
                     <span class="value" style="text-align:right !important;float:right;">${sentenceTypes.hesitant}</span>
                 </div>`;
        }
        
        if (this.shouldShowMetric(sentenceTypes.emphatic, true)) {
            html += `
                 <div class="emotion-metric">
                     <span class="label" title="${translations.emphaticDesc}">${translations.emphatic}:</span>
                     <span class="value" style="text-align:right !important;float:right;">${sentenceTypes.emphatic}</span>
                 </div>`;
        }
        
        if (this.shouldShowMetric(sentenceTypes.imperative, true)) {
            html += `
                 <div class="emotion-metric">
                     <span class="label" title="${translations.imperativeDesc}">${translations.imperative}:</span>
                     <span class="value" style="text-align:right !important;float:right;">${sentenceTypes.imperative}</span>
                 </div>`;
        }
        
        if (this.shouldShowMetric(sentenceTypes.hyperbolic, true)) {
            html += `
                 <div class="emotion-metric">
                     <span class="label" title="${translations.hyperbolicDesc}">${translations.hyperbolic}:</span>
                     <span class="value" style="text-align:right !important;float:right;">${sentenceTypes.hyperbolic}</span>
                 </div>`;
        }
        
        if (this.shouldShowMetric(sentenceTypes.poetic, true)) {
            html += `
                 <div class="emotion-metric">
                     <span class="label" title="${translations.poeticDesc}">${translations.poetic}:</span>
                     <span class="value" style="text-align:right !important;float:right;">${sentenceTypes.poetic}</span>
                 </div>`;
        }

		if (this.shouldShowMetric(syntacticCoherence, true)) {
            html += `
                 <div class="emotion-metric">
                     <span class="label" title="${translations.syntacticCoherenceDesc}">${translations.syntacticCoherence}:</span>
                     <span class="value" style="text-align:right !important;float:right;">${(syntacticCoherence * 100).toFixed(1)}%</span>
                 </div>`;
        }
        
        if (this.shouldShowMetric(rhythmRegularity, true)) {
            html += `
                 <div class="emotion-metric">
                     <span class="label" title="${translations.rhythmDesc}">${translations.rhythm}:</span>
                     <span class="value" style="text-align:right !important;float:right;">${rhythmRegularity.toFixed(2)}</span>
                 </div>`;
        }
        
        if (this.shouldShowMetric(rhythmPattern)) {
            html += `
                 <div class="emotion-metric">
                     <span class="label" title="${translations.rhythmPatternDesc}">${translations.rhythmPattern}:</span>
                     <span class="value" style="text-align:right !important;float:right;">${this.translateRhythmPattern(rhythmPattern, currentLang)}</span>
                 </div>`;
        }
        
        if (this.shouldShowMetric(rhythmFlow)) {
            html += `
                 <div class="emotion-metric">
                     <span class="label" title="${translations.rhythmFlowDesc}">${translations.rhythmFlow}:</span>
                     <span class="value" style="text-align:right !important;float:right;">${this.translateRhythmFlow(rhythmFlow, currentLang)}</span>
                 </div>`;
        }
        
        html += `</div>`;
    }

	const readability = this.getSafe(result, 'details.readability', {});
	const readingLevel = this.getSafe(readability, 'readingLevel');
	const fleschReadingEaseVal = this.getNumber(this.getSafe(readability, 'fleschReadingEase'));
	const fleschKincaidGradeVal = this.getNumber(this.getSafe(readability, 'fleschKincaidGrade'));
	const gunningFogVal = this.getNumber(this.getSafe(readability, 'gunningFog'));
		
	const hasReadabilityData = this.shouldShowMetric(readingLevel) ||
		    this.shouldShowMetric(fleschReadingEaseVal, true) ||
		    this.shouldShowMetric(fleschKincaidGradeVal, true) ||
		    this.shouldShowMetric(gunningFogVal, true);
		
	if (hasReadabilityData) {
		    html += `<div class="emotion-section"><h3>${translations.readability}</h3>`;
		    
		    if (this.shouldShowMetric(fleschReadingEaseVal, true)) {
		        html += `<div class="emotion-metric">
		            <span class="label" title="${translations.fleschReadingEaseDesc}">${translations.fleschReadingEase}:</span>
		            <span class="value" style="text-align:right !important;float:right;">${fleschReadingEaseVal.toFixed(1)}</span>
		        </div>`;
		    }
		    
		    if (this.shouldShowMetric(gunningFogVal, true)) {
		        html += `<div class="emotion-metric">
		            <span class="label" title="${translations.gunningFogDesc}">${translations.gunningFog}:</span>
		            <span class="value" style="text-align:right !important;float:right;">${gunningFogVal.toFixed(1)}</span>
		        </div>`;
		    }
		    
		    if (this.shouldShowMetric(fleschKincaidGradeVal, true)) {
		        html += `<div class="emotion-metric">
		            <span class="label" title="${translations.fleschKincaidGradeDesc}">${translations.fleschKincaidGrade}:</span>
		            <span class="value" style="text-align:right !important;float:right;">${fleschKincaidGradeVal.toFixed(1)}</span>
		        </div>`;
			}

			if (this.shouldShowMetric(readingLevel)) {
		        html += `<div class="emotion-metric">
		            <span class="label" title="${translations.readingLevelDesc}">${translations.readingLevel}:</span>
		            <span class="value" style="text-align:right !important;float:right;">${this.translateReadingLevel(readingLevel, currentLang)}</span>
		        </div>`;
		    }
		    
		    html += `</div>`;
	}

    const contextualIndicators = this.getSafe(result, 'details.contextual.indicators', {});
    const contextualCoherence = this.getNumber(this.getSafe(result, 'details.contextual.coherence'));
    const contextualConsistency = this.getNumber(this.getSafe(result, 'details.contextual.consistency.consistency'));
    const toneVariation = this.getNumber(this.getSafe(result, 'details.contextual.consistency.toneVariation'));

    const hasContextualData = Object.keys(contextualIndicators).length > 0 || 
                            this.shouldShowMetric(contextualCoherence, true) || 
                            this.shouldShowMetric(contextualConsistency, true);

    if (hasContextualData) {
        html += `
             <div class="emotion-section">
                 <h3>${translations.contextualAnalysis}</h3>`;
        
        if (this.shouldShowMetric(contextualIndicators.negations, true)) {
            html += `
                 <div class="emotion-metric">
                     <span class="label" title="${translations.negationsDesc}">${translations.negations}:</span>
                     <span class="value" style="text-align:right !important;float:right;">${contextualIndicators.negations}</span>
                 </div>`;
        }
        
        if (this.shouldShowMetric(contextualIndicators.intensifiers, true)) {
            html += `
                 <div class="emotion-metric">
                     <span class="label" title="${translations.intensifiersDesc}">${translations.intensifiers}:</span>
                     <span class="value" style="text-align:right !important;float:right;">${contextualIndicators.intensifiers}</span>
                 </div>`;
        }
        
        if (this.shouldShowMetric(contextualIndicators.diminutives, true)) {
            html += `
                 <div class="emotion-metric">
                     <span class="label" title="${translations.diminutivesDesc}">${translations.diminutives}:</span>
                     <span class="value" style="text-align:right !important;float:right;">${contextualIndicators.diminutives}</span>
                 </div>`;
        }
        
        if (this.shouldShowMetric(contextualIndicators.augmentatives, true)) {
            html += `
                 <div class="emotion-metric">
                     <span class="label" title="${translations.augmentativesDesc}">${translations.augmentatives}:</span>
                     <span class="value" style="text-align:right !important;float:right;">${contextualIndicators.augmentatives}</span>
                 </div>`;
        }
        
        if (this.shouldShowMetric(contextualIndicators.irony, true)) {
            html += `
                 <div class="emotion-metric">
                     <span class="label" title="${translations.ironyDesc}">${translations.irony}:</span>
                     <span class="value" style="text-align:right !important;float:right;">${contextualIndicators.irony}</span>
                 </div>`;
        }
        
        if (this.shouldShowMetric(contextualIndicators.contrasts, true)) {
            html += `
                 <div class="emotion-metric">
                     <span class="label" title="${translations.contrastsDesc}">${translations.contrasts}:</span>
                     <span class="value" style="text-align:right !important;float:right;">${contextualIndicators.contrasts}</span>
                 </div>`;
        }
        
        if (this.shouldShowMetric(contextualIndicators.rhetorical, true)) {
            html += `
                 <div class="emotion-metric">
                     <span class="label" title="${translations.rhetoricalDesc}">${translations.rhetorical}:</span>
                     <span class="value" style="text-align:right !important;float:right;">${contextualIndicators.rhetorical}</span>
                 </div>`;
        }
        
        if (this.shouldShowMetric(contextualIndicators.hyperbole, true)) {
            html += `
                 <div class="emotion-metric">
                     <span class="label" title="${translations.hyperboleDesc}">${translations.hyperbole}:</span>
                     <span class="value" style="text-align:right !important;float:right;">${contextualIndicators.hyperbole}</span>
                 </div>`;
        }
        
        if (this.shouldShowMetric(contextualIndicators.understatement, true)) {
            html += `
                 <div class="emotion-metric">
                     <span class="label" title="${translations.understatementDesc}">${translations.understatement}:</span>
                     <span class="value" style="text-align:right !important;float:right;">${contextualIndicators.understatement}</span>
                 </div>`;
        }
        
        if (this.shouldShowMetric(contextualCoherence, true)) {
            html += `
                 <div class="emotion-metric">
                     <span class="label" title="${translations.contextualCoherenceDesc}">${translations.contextualCoherence}:</span>
                     <span class="value" style="text-align:right !important;float:right;">${(contextualCoherence * 100).toFixed(1)}%</span>
                 </div>`;
        }
        
        if (this.shouldShowMetric(contextualConsistency, true)) {
            html += `
                 <div class="emotion-metric">
                     <span class="label" title="${translations.contextualConsistencyDesc}">${translations.contextualConsistency}:</span>
                     <span class="value" style="text-align:right !important;float:right;">${(contextualConsistency * 100).toFixed(1)}%</span>
                 </div>`;
        }
        
        if (this.shouldShowMetric(toneVariation, true)) {
            html += `
                 <div class="emotion-metric">
                     <span class="label" title="${translations.toneVariationDesc}">${translations.toneVariation}:</span>
                     <span class="value" style="text-align:right !important;float:right;">${(toneVariation * 100).toFixed(1)}%</span>
                 </div>`;
        }
        
        html += `</div>`;
    }

    const culturalReferences = this.getSafe(result, 'details.cultural.references', {});
    const culturalScores = this.getSafe(result, 'details.cultural.scores', {});
    const culturalCoherenceVal = this.getNumber(this.getSafe(result, 'details.cultural.culturalCoherence'));
    const culturalDensityVal = this.getNumber(this.getSafe(result, 'details.cultural.culturalDensity'));
    const dominantCulturalTheme = this.getSafe(result, 'details.cultural.dominantCulturalTheme');
                
    const hasCulturalData = Object.keys(culturalReferences).length > 0 ||
                    Object.keys(culturalScores).length > 0 ||
                    this.shouldShowMetric(culturalCoherenceVal, true) ||
                    this.shouldShowMetric(culturalDensityVal, true) ||
                    this.shouldShowMetric(dominantCulturalTheme);
                
    if (hasCulturalData) {
                    html += `<div class="emotion-section"><h3>${translations.culturalAnalysis}</h3>`;
                    
                    if (culturalReferences.literary && this.shouldShowMetric(culturalReferences.literary.count, true)) {
                        html += `<div class="emotion-metric">
                            <span class="label" title="${translations.literaryDesc}">${translations.literary}:</span>
                            <span class="value" style="text-align:right !important;float:right;">${culturalReferences.literary.count}</span>
                        </div>`;
                        if (culturalReferences.literary.items && culturalReferences.literary.items.length > 0) {
                        	const uniqueRefs = [...new Set(culturalReferences.literary.items.map(item => item.reference))];
                        	if (uniqueRefs.length > 0) {
                            	html += `<div class="emotion-metric">
                                	<span class="label" title="${translations.literaryReferencesDesc}">${translations.literaryReferences}:</span>
                                	<span class="value" style="display:block;text-align:right !important;float:right;word-break:break-word;margin-top:2px;">${uniqueRefs.slice(0, 3).map(ref => this.translateValue(ref, currentLang)).join(', ')}</span>
                            	</div>`;
                        	}
                    	}
                    }
                    
                    if (culturalReferences.historical && this.shouldShowMetric(culturalReferences.historical.count, true)) {
                        html += `<div class="emotion-metric">
                            <span class="label" title="${translations.historicalDesc}">${translations.historical}:</span>
                            <span class="value" style="text-align:right !important;float:right;">${culturalReferences.historical.count}</span>
                        </div>`;
                        if (culturalReferences.historical.items && culturalReferences.historical.items.length > 0) {
                            const uniquePeriods = [...new Set(culturalReferences.historical.items.map(item => item.period))];
                            if (uniquePeriods.length > 0) {
                                html += `<div class="emotion-metric">
                                    <span class="label" title="${translations.historicalPeriodDesc}">${translations.historicalPeriod}:</span>
                                    <span class="value" style="display:block;text-align:right !important;float:right;word-break:break-word;margin-top:2px;">${uniquePeriods.map(p => this.translateValue(p, currentLang)).join(', ')}</span>
                                </div>`;
                            }
                        }
                    }
                    
                    if (culturalReferences.mythological && this.shouldShowMetric(culturalReferences.mythological.count, true)) {
                        html += `<div class="emotion-metric">
                            <span class="label" title="${translations.mythologicalDesc}">${translations.mythological}:</span>
                            <span class="value" style="text-align:right !important;float:right;">${culturalReferences.mythological.count}</span>
                        </div>`;
                        if (culturalReferences.mythological.items && culturalReferences.mythological.items.length > 0) {
                            const uniqueArchetypes = [...new Set(culturalReferences.mythological.items.map(item => item.archetype))];
                            if (uniqueArchetypes.length > 0) {
                                html += `<div class="emotion-metric">
                                    <span class="label" title="${translations.mythologicalArchetypeDesc}">${translations.mythologicalArchetype}:</span>
                                    <span class="value" style="display:block;text-align:right !important;float:right;word-break:break-word;margin-top:2px;">${uniqueArchetypes.map(a => this.translateValue(a, currentLang)).join(', ')}</span>
                                </div>`;
                            }
                        }
                    }
                    
                    if (culturalReferences.idioms && this.shouldShowMetric(culturalReferences.idioms.count, true)) {
                        html += `<div class="emotion-metric">
                            <span class="label" title="${translations.idiomsDesc}">${translations.idioms}:</span>
                            <span class="value" style="text-align:right !important;float:right;">${culturalReferences.idioms.count}</span>
                        </div>`;
                    }
                    
                    if (this.shouldShowMetric(dominantCulturalTheme)) {
                        html += `<div class="emotion-metric">
                            <span class="label" title="${translations.dominantCulturalThemeDesc}">${translations.dominantTheme}:</span>
                            <span class="value" style="text-align:right !important;float:right;">${this.translateCulturalTheme(dominantCulturalTheme, currentLang)}</span>
                        </div>`;
                    }
                    
                    if (this.shouldShowMetric(culturalScores.culturalDepth, true)) {
                        html += `<div class="emotion-metric">
                            <span class="label" title="${translations.culturalDepthDesc}">${translations.culturalDepth}:</span>
                            <span class="value" style="text-align:right !important;float:right;">${(culturalScores.culturalDepth * 100).toFixed(1)}%</span>
                        </div>`;
                    }
                    
                    if (this.shouldShowMetric(culturalScores.intertextuality, true)) {
                        html += `<div class="emotion-metric">
                            <span class="label" title="${translations.intertextualityDesc}">${translations.intertextuality}:</span>
                            <span class="value" style="text-align:right !important;float:right;">${(culturalScores.intertextuality * 100).toFixed(1)}%</span>
                        </div>`;
                    }
                    
                    if (this.shouldShowMetric(culturalScores.culturalRichness, true)) {
                        html += `<div class="emotion-metric">
                            <span class="label" title="${translations.culturalRichnessDesc}">${translations.culturalRichness}:</span>
                            <span class="value" style="text-align:right !important;float:right;">${(culturalScores.culturalRichness * 100).toFixed(1)}%</span>
                        </div>`;
                    }
                    
                    if (this.shouldShowMetric(culturalCoherenceVal, true)) {
                        html += `<div class="emotion-metric">
                            <span class="label" title="${translations.culturalCoherenceDesc}">${translations.culturalCoherence}:</span>
                            <span class="value" style="text-align:right !important;float:right;">${(culturalCoherenceVal * 100).toFixed(1)}%</span>
                        </div>`;
                    }
                    
                    if (this.shouldShowMetric(culturalDensityVal, true)) {
                        html += `<div class="emotion-metric">
                            <span class="label" title="${translations.culturalDensityDesc}">${translations.culturalDensity}:</span>
                            <span class="value" style="text-align:right !important;float:right;">${(culturalDensityVal * 100).toFixed(1)}%</span>
                        </div>`;
                    }
                    
                    html += `</div>`;
    }

    const semanticDetails = this.getSafe(result, 'details.semantic', {});
    const semanticThematic = this.getSafe(semanticDetails, 'thematic', {});

    const hasSemanticData = this.shouldShowMetric(semanticDetails.density, true) || 
                            this.shouldShowMetric(semanticDetails.semanticRichness, true) ||
                             this.shouldShowMetric(semanticDetails.coherence, true);

    if (hasSemanticData) {
        html += `
             <div class="emotion-section">
                 <h3>${translations.semanticAnalysis}</h3>`;
        
        if (semanticDetails.abstraction && semanticDetails.abstraction.description) {
            html += `
                 <div class="emotion-metric">
                     <span class="label" title="${translations.abstractionLevelDesc}">${translations.abstractionLevel}:</span>
                     <span class="value" style="text-align:right !important;float:right;">${this.translateAbstraction(semanticDetails.abstraction.description, currentLang)}</span>
                 </div>`;
        }

		 if (semanticThematic.dominant) {
            html += `
                 <div class="emotion-metric">
                     <span class="label" title="${translations.thematicDominantDesc}">${translations.thematicDominant}:</span>
                     <span class="value" style="text-align:right !important;float:right;">${this.translateThematicDominant(semanticThematic.dominant, currentLang)}</span>
                 </div>`;
        }

		if (this.shouldShowMetric(semanticThematic.complexity, true)) {
            html += `
                 <div class="emotion-metric">
                     <span class="label" title="${translations.thematicComplexityDesc}">${translations.thematicComplexity}:</span>
                     <span class="value" style="text-align:right !important;float:right;">${(semanticThematic.complexity * 100).toFixed(1)}%</span>
                 </div>`;
        }
		
		if (this.shouldShowMetric(semanticDetails.density, true)) {
            html += `
                 <div class="emotion-metric">
                     <span class="label" title="${translations.semanticDensityDesc}">${translations.semanticDensity}:</span>
                     <span class="value" style="text-align:right !important;float:right;">${(semanticDetails.density * 100).toFixed(1)}%</span>
                 </div>`;
        }
        
        if (this.shouldShowMetric(semanticDetails.semanticRichness, true)) {
            html += `
                 <div class="emotion-metric">
                     <span class="label" title="${translations.semanticRichnessDesc}">${translations.semanticRichness}:</span>
                     <span class="value" style="text-align:right !important;float:right;">${(semanticDetails.semanticRichness * 100).toFixed(1)}%</span>
                 </div>`;
        }
        
        if (this.shouldShowMetric(semanticDetails.coherence, true)) {
            html += `
                 <div class="emotion-metric">
                     <span class="label" title="${translations.semanticCoherenceDesc}">${translations.semanticCoherence}:</span>
                     <span class="value" style="text-align:right !important;float:right;">${(semanticDetails.coherence * 100).toFixed(1)}%</span>
                 </div>`;
        }
        
        html += `</div>`;
    }

    const psychologicalDetails = this.getSafe(result, 'details.psychological', {});
    const plutchikDetails = this.getSafe(psychologicalDetails, 'plutchik', {});
    const maslowDetails = this.getSafe(psychologicalDetails, 'maslow', {});
    const bigFiveDetails = this.getSafe(psychologicalDetails, 'bigFive', {});
    const emotionalIntelligenceDetails = this.getSafe(psychologicalDetails, 'emotionalIntelligence', {});
    const defenseMechanismsDetails = this.getSafe(psychologicalDetails, 'defenseMechanisms', {});
    const selfAwarenessDetails = this.getSafe(psychologicalDetails, 'selfAwarenessLevel', {});

    const hasPsychologicalData = plutchikDetails.primary || 
                                                maslowDetails.dominant ||
                                                bigFiveDetails.profile;

    if (hasPsychologicalData) {
                              html += `
                                        <div class="emotion-section">
                                                  <h3>${translations.psychologicalAnalysis}</h3>`;

                              if (plutchikDetails.primary && plutchikDetails.primary.emotion) {
                                        html += `
                                                  <div class="emotion-metric">
                                                            <span class="label" title="${translations.primaryPlutchikDesc}">${translations.primaryPlutchik}:</span>
                                                            <span class="value" style="text-align:right !important;float:right;">${this.translatePlutchikEmotion(plutchikDetails.primary.emotion, currentLang)}</span>
                                                  </div>`;
                              }

                              if (this.shouldShowMetric(plutchikDetails.emotionalDiversity, true)) {
                                        html += `
                                                  <div class="emotion-metric">
                                                            <span class="label" title="${translations.plutchikDiversityDesc}">${translations.plutchikDiversity}:</span>
                                                            <span class="value" style="text-align:right !important;float:right;">${(plutchikDetails.emotionalDiversity * 100).toFixed(1)}%</span>
                                                  </div>`;
                              }

                              const combinations = this.getSafe(plutchikDetails, 'combinations', []);
                              if (this.hasArrayContent(combinations)) {
                                        html += `<div class="emotion-subsection"><h4>${translations.plutchikCombinations}</h4>`;
                                        combinations.forEach(combo => {
                                                  const comboName = `${this.translatePlutchikEmotion(combo.combination.split(' + ')[0], currentLang)} + ${this.translatePlutchikEmotion(combo.combination.split(' + ')[1], currentLang)} = ${this.translatePlutchikEmotion(combo.result, currentLang)}`;
                                                  html += `<div class="emotion-metric" style="border-left:2px solid #aaa;margin:5px 0;padding-left:8px;">
                                                              <span class="label" title="${translations.plutchikCombinationDesc}">${comboName}:</span>
                                                              <span class="value">${(combo.intensity * 100).toFixed(1)}%</span>
                                                          </div>`;
                                        });
                                        html += `</div>`;
                              }

                              if (maslowDetails.dominant && maslowDetails.dominant.level) {
                                        html += `
                                                  <div class="emotion-metric">
                                                            <span class="label" title="${translations.dominantMaslowDesc}">${translations.dominantMaslow}:</span>
                                                            <span class="value" style="text-align:right !important;float:right;">${this.translateMaslowLevel(maslowDetails.dominant.level, currentLang)}</span>
                                                  </div>`;
                              }

                              if (this.shouldShowMetric(maslowDetails.hierarchyCompletion, true)) {
                                        html += `
                                                  <div class="emotion-metric">
                                                            <span class="label" title="${translations.hierarchyCompletionDesc}">${translations.hierarchyCompletion}:</span>
                                                            <span class="value" style="text-align:right !important;float:right;">${(maslowDetails.hierarchyCompletion * 100).toFixed(1)}%</span>
                                                  </div>`;
                              }

                              const needs = this.getSafe(maslowDetails, 'needs', {});
                              if (Object.keys(needs).length > 0) {
                                        html += `<div class="emotion-subsection"><h4>${translations.maslowNeeds}</h4>`;
                                        Object.entries(needs).forEach(([level, data]) => {
                                                  const levelName = this.translateMaslowLevel(level, currentLang);
                                                  const intensity = (data.score * 100).toFixed(1);
                                                  html += `<div class="emotion-metric" style="border-left:2px solid #4a90e2;margin:5px 0;padding-left:8px;">
                                                              <span class="label" title="${translations.maslowNeedDesc}">${levelName}:</span>
                                                              <span class="value">${intensity}%</span>
                                                          </div>`;
                                        });
                                        html += `</div>`;
                              }

                              if (bigFiveDetails.profile && bigFiveDetails.profile.type) {
                                        html += `
                                                  <div class="emotion-metric">
                                                            <span class="label" title="${translations.personalityTypeDesc}">${translations.personalityType}:</span>
                                                            <span class="value" style="text-align:right !important;float:right;">${this.translatePersonalityType(bigFiveDetails.profile.type, currentLang)}</span>
                                                  </div>`;
                              }

                              if (bigFiveDetails.profile && bigFiveDetails.profile.dominantTraits && 
                                  this.hasArrayContent(bigFiveDetails.profile.dominantTraits)) {
                                        html += `
                                                  <div class="emotion-metric">
                                                            <span class="label" title="${translations.dominantTraitsDesc}">${translations.dominantTraits}:</span>
                                                            <span class="value" style="text-align:right !important;float:right;">${bigFiveDetails.profile.dominantTraits.map(trait => 
                                                                      this.translateBigFiveTrait(trait, currentLang)
                                                              ).join(', ')}</span>
                                                  </div>`;
                              }

                              const traits = this.getSafe(bigFiveDetails, 'traits', {});
                              if (Object.keys(traits).length > 0) {
                                        html += `<div class="emotion-subsection"><h4>${translations.bigFiveTraits}</h4>`;
                                        Object.entries(traits).forEach(([trait, data]) => {
                                                  const traitName = this.translateBigFiveTrait(trait, currentLang);
                                                  const score = (data.score * 100).toFixed(1);
                                                  const level = this.translateBigFiveLevel(data.level, currentLang);
                                                  html += `<div class="emotion-metric" style="border-left:2px solid #f39c12;margin:5px 0;padding-left:8px;">
                                                              <span class="label" title="${translations.bigFiveTraitDesc}">${traitName}:</span>
                                                              <span class="value">${score}% (${level})</span>
                                                          </div>`;
                                        });
                                        html += `</div>`;
                              }

                              if (this.shouldShowMetric(bigFiveDetails.complexity, true)) {
                                        html += `
                                                  <div class="emotion-metric">
                                                            <span class="label" title="${translations.bigFiveComplexityDesc}">${translations.bigFiveComplexity}:</span>
                                                            <span class="value" style="text-align:right !important;float:right;">${(bigFiveDetails.complexity * 100).toFixed(1)}%</span>
                                                  </div>`;
                              }

                              if (emotionalIntelligenceDetails.level) {
                                        html += `
                                                  <div class="emotion-metric">
                                                            <span class="label" title="${translations.emotionalIntelligenceDesc}">${translations.emotionalIntelligence}:</span>
                                                            <span class="value" style="text-align:right !important;float:right;">${this.translateEmotionalIntelligence(emotionalIntelligenceDetails.level, currentLang)}</span>
                                                  </div>`;
                              }

                              if (this.shouldShowMetric(emotionalIntelligenceDetails.score, true)) {
                                        html += `
                                                  <div class="emotion-metric">
                                                            <span class="label" title="${translations.eiScoreDesc}">${translations.eiScore}:</span>
                                                            <span class="value" style="text-align:right !important;float:right;">${(emotionalIntelligenceDetails.score * 100).toFixed(1)}%</span>
                                                  </div>`;
                              }

                              const eiComponents = this.getSafe(emotionalIntelligenceDetails, 'components', {});
                              if (Object.keys(eiComponents).length > 0) {
                                        html += `<div class="emotion-subsection"><h4>${translations.eiComponents}</h4>`;
                                        Object.entries(eiComponents).forEach(([component, score]) => {
                                                  const compName = this.translateEIComponent(component, currentLang);
                                                  html += `<div class="emotion-metric" style="border-left:2px solid #2ecc71;margin:5px 0;padding-left:8px;">
                                                              <span class="label" title="${translations.eiComponentDesc}">${compName}:</span>
                                                              <span class="value">${(score * 100).toFixed(1)}%</span>
                                                          </div>`;
                                        });
                                        html += `</div>`;
                              }

                              if (defenseMechanismsDetails.primaryMechanism) {
                                        html += `
                                                  <div class="emotion-metric">
                                                            <span class="label" title="${translations.primaryDefenseDesc}">${translations.primaryDefense}:</span>
                                                            <span class="value" style="text-align:right !important;float:right;">${this.translateDefenseMechanism(defenseMechanismsDetails.primaryMechanism, currentLang)}</span>
                                                  </div>`;
                              }

                              if (this.shouldShowMetric(defenseMechanismsDetails.overallIntensity, true)) {
                                        html += `
                                                  <div class="emotion-metric">
                                                            <span class="label" title="${translations.defenseIntensityDesc}">${translations.defenseIntensity}:</span>
                                                            <span class="value" style="text-align:right !important;float:right;">${(defenseMechanismsDetails.overallIntensity * 100).toFixed(1)}%</span>
                                                  </div>`;
                              }

                              const mechanismsList = this.getSafe(defenseMechanismsDetails, 'mechanisms', []);
                              if (this.hasArrayContent(mechanismsList)) {
                                        html += `<div class="emotion-subsection"><h4>${translations.defenseMechanisms}</h4>`;
                                        mechanismsList.forEach(mech => {
                                                  const mechName = this.translateDefenseMechanism(mech.mechanism, currentLang);
                                                  const intensity = (mech.intensity * 100).toFixed(1);
                                                  html += `<div class="emotion-metric" style="border-left:2px solid #e67e22;margin:5px 0;padding-left:8px;">
                                                              <span class="label" title="${translations.defenseMechanismDesc}">${mechName}:</span>
                                                              <span class="value">${intensity}%</span>
                                                          </div>`;
                                        });
                                        html += `</div>`;
                              }

                              if (this.shouldShowMetric(psychologicalDetails.psychologicalComplexity, true)) {
                                        html += `
                                                  <div class="emotion-metric">
                                                            <span class="label" title="${translations.psychologicalComplexityDesc}">${translations.psychologicalComplexity}:</span>
                                                            <span class="value" style="text-align:right !important;float:right;">${(psychologicalDetails.psychologicalComplexity * 100).toFixed(1)}%</span>
                                                  </div>`;
                              }

                              if (selfAwarenessDetails.level) {
                                        html += `
                                                  <div class="emotion-metric">
                                                            <span class="label" title="${translations.selfAwarenessLevelDesc}">${translations.selfAwarenessLevel}:</span>
                                                            <span class="value" style="text-align:right !important;float:right;">${this.translateSelfAwareness(selfAwarenessDetails.level, currentLang)}</span>
                                                  </div>`;
                              }

                              if (this.shouldShowMetric(selfAwarenessDetails.score, true)) {
                                        html += `
                                                  <div class="emotion-metric">
                                                            <span class="label" title="${translations.selfAwarenessScoreDesc}">${translations.selfAwarenessScore}:</span>
                                                            <span class="value" style="text-align:right !important;float:right;">${(selfAwarenessDetails.score * 100).toFixed(1)}%</span>
                                                  </div>`;
                              }

                              const selfReflection = this.getNumber(this.getSafe(selfAwarenessDetails, 'selfReflection'));
                              if (this.shouldShowMetric(selfReflection, true)) {
                                        html += `<div class="emotion-metric">
                                                  <span class="label" title="${translations.selfReflectionDesc}">${translations.selfReflection}:</span>
                                                  <span class="value" style="text-align:right !important;float:right;">${(selfReflection * 100).toFixed(1)}%</span>
                                              </div>`;
                              }
                              const metacognition = this.getNumber(this.getSafe(selfAwarenessDetails, 'metacognition'));
                              if (this.shouldShowMetric(metacognition, true)) {
                                        html += `<div class="emotion-metric">
                                                  <span class="label" title="${translations.metacognitionDesc}">${translations.metacognition}:</span>
                                                  <span class="value" style="text-align:right !important;float:right;">${(metacognition * 100).toFixed(1)}%</span>
                                              </div>`;
                              }

                              const cognitiveBiases = this.getSafe(psychologicalDetails, 'cognitiveBiases', {});
                              if (Object.keys(cognitiveBiases).length > 0) {
                                        html += `<div class="emotion-subsection"><h4>${translations.cognitiveBiases}</h4>`;
                                        Object.entries(cognitiveBiases).forEach(([bias, data]) => {
                                                  const biasName = this.translateCognitiveBias(bias, currentLang);
                                                  const intensity = (data.intensity * 100).toFixed(1);
                                                  html += `<div class="emotion-metric" style="border-left:2px solid #9b59b6;margin:5px 0;padding-left:8px;">
                                                              <span class="label" title="${translations.cognitiveBiasDesc}">${biasName}:</span>
                                                              <span class="value">${intensity}%</span>
                                                          </div>`;
                                        });
                                        html += `</div>`;
                              }

                              const communicationStyles = this.getSafe(psychologicalDetails, 'communicationStyles', {});
                              if (Object.keys(communicationStyles).length > 0) {
                                        html += `<div class="emotion-subsection"><h4>${translations.communicationStyles}</h4>`;
                                        Object.entries(communicationStyles).forEach(([style, data]) => {
                                                  const styleName = this.translateCommunicationStyle(style, currentLang);
                                                  const intensity = (data.intensity * 100).toFixed(1);
                                                  html += `<div class="emotion-metric" style="border-left:2px solid #3498db;margin:5px 0;padding-left:8px;">
                                                              <span class="label" title="${translations.communicationStyleDesc}">${styleName}:</span>
                                                              <span class="value">${intensity}%</span>
                                                          </div>`;
                                        });
                                        html += `</div>`;
                              }

                              html += `</div>`; 
    } 

    const psychInsights = this.getSafe(result, 'psychologicalInsights', {});

    if (psychInsights && psychInsights.insights) {
                        const insights = psychInsights.insights;
                        const hasInsights = this.hasArrayContent(insights.emotionalPatterns) || 
                                           (insights.cognitiveStyle && insights.cognitiveStyle.style) ||
                                          this.hasArrayContent(insights.relationalPatterns) ||
                                          this.hasArrayContent(insights.personalGrowth) ||
                                          this.hasArrayContent(insights.therapeuticApproaches);
                        
                        if (hasInsights) {
                            html += `
                             <div class="emotion-section">
                                 <h3>${translations.psychologicalInsights}</h3>`;
                            
                            if (this.hasArrayContent(insights.emotionalPatterns)) {
                                html += `
                                     <div class="emotion-metric">
                                         <span class="label" title="${translations.emotionalPatternsDesc}">${translations.emotionalPatterns}:</span>
                                         <span class="value" style="display:block;text-align:right !important;float:right;word-break:break-word;margin-top:2px;">${insights.emotionalPatterns.map(p => this.translateValue(p, currentLang)).join(', ')}</span>
                                     </div>`;
                            }
                            
                            if (insights.cognitiveStyle && insights.cognitiveStyle.style) {
                                html += `
                                     <div class="emotion-metric">
                                         <span class="label" title="${translations.cognitiveStyleDesc}">${translations.cognitiveStyle}:</span>
                                         <span class="value" style="display:block;text-align:right !important;float:right;word-break:break-word;margin-top:2px;">${this.translateValue(insights.cognitiveStyle.style, currentLang)}</span>
                                     </div>`;
                            }

                            if (insights.cognitiveStyle && insights.cognitiveStyle.factors) {
                                html += `<div class="emotion-subsection"><h4>${translations.cognitiveStyleFactors}</h4>`;
                                Object.entries(insights.cognitiveStyle.factors).forEach(([factor, value]) => {
                                    const factorName = this.translateCognitiveFactor(factor, currentLang);
                                    html += `<div class="emotion-metric" style="border-left:2px solid #9b59b6;margin:5px 0;padding-left:8px;">
                                                <span class="label" title="${translations.cognitiveFactorDesc}">${factorName}:</span>
                                                <span class="value">${(value * 100).toFixed(1)}%</span>
                                            </div>`;
                                });
                                html += `</div>`;
                            }
                            
                            if (this.hasArrayContent(insights.relationalPatterns)) {
                                html += `
                                     <div class="emotion-metric">
                                         <span class="label" title="${translations.relationsDesc}">${translations.relations}:</span>
                                         <span class="value" style="display:block;text-align:right !important;float:right;word-break:break-word;margin-top:2px;">${insights.relationalPatterns.map(p => this.translateValue(p, currentLang)).join(', ')}</span>
                                     </div>`;
                            }
                            
                            if (this.hasArrayContent(insights.personalGrowth)) {
                                html += `
                                     <div class="emotion-metric">
                                         <span class="label" title="${translations.growthPathsDesc}">${translations.growthPaths}:</span>
                                         <span class="value" style="display:block;text-align:right !important;float:right;word-break:break-word;margin-top:2px;">${insights.personalGrowth.map(p => this.translateValue(p, currentLang)).join(', ')}</span>
                                     </div>`;
                            }
                            
                            if (this.hasArrayContent(insights.therapeuticApproaches)) {
                                html += `
                                     <div class="emotion-metric">
                                         <span class="label" title="${translations.therapeuticApproachesDesc}">${translations.therapeuticApproaches}:</span>
                                         <span class="value" style="display:block;text-align:right !important;float:right;word-break:break-word;margin-top:2px;">${insights.therapeuticApproaches.map(p => this.translateValue(p, currentLang)).join(', ')}</span>
                                     </div>`;
                            }
                            
                            html += `</div>`;
                        }
    }

    if (psychInsights && psychInsights.applicability) {
                        const applicability = psychInsights.applicability;
                        
                        html += `
                            <div class="emotion-section">
                                <h3>${translations.insightApplicability}</h3>
                                <div class="emotion-metric">
                                    <span class="label" title="${translations.applicabilityLevelHint}">${translations.applicabilityLevel}:</span>
                                    <span class="value">${this.translateValue(applicability.applicability === 'ограниченная' ? 'ограниченный' : applicability.applicability, currentLang)}</span>
                                </div>
                                <div class="emotion-metric">
                                    <span class="label" title="${translations.applicabilityScoreHint}">${translations.applicabilityScore}:</span>
                                    <span class="value">${(applicability.score * 100).toFixed(1)}%</span>
                                </div>`;

                        if (applicability.limitations && applicability.limitations.length > 0) {
                            html += `<div class="emotion-subsection"><h4>${translations.limitations}</h4>`;
                            applicability.limitations.forEach(lim => {
                                html += `<div class="emotion-metric" style="border-left:2px solid #e74c3c;margin:5px 0;padding-left:8px;">
                                            <span class="value" style="text-align:left;" title="${this.translateValue('Фактор, снижающий точность анализа', currentLang)}">${this.translateValue(lim, currentLang)}</span>
                                        </div>`;
                            });
                            html += `</div>`;
                        }

                        html += `</div>`;
    }

    if (psychInsights && psychInsights.summary && psychInsights.summary.length > 0) {
                        html += `
                            <div class="emotion-section">
                                <h3>${translations.psychologicalSummary}</h3>`;
                        
                        psychInsights.summary.forEach(line => {
                            html += `
                                <div class="emotion-metric" style="border-left:3px solid #9b59b6;padding-left:10px;margin:8px 0;">
                                    <span class="value" style="display:block;text-align:left;font-size:0.95em;line-height:1.5;" title="${this.translateValue('Психологическая характеристика', currentLang)}">${this.translateValue(line, currentLang)}</span>
                                </div>`;
                        });
                        
                        html += `</div>`;
    }

    if (this.hasArrayContent(colorPalette)) {
        html += `
             <div class="emotion-section">
                 <h3>${translations.colorPalette}</h3>
                 <div class="color-preview">
                   ${colorPalette.map(color => 
                        `<div title="${color}" style="background:${color}"></div>`
                    ).join('')}
                 </div>
             </div>`;
    }

	const recommendations = this.generateRecommendations(result.metrics, this.getCurrentLanguage());
	if (recommendations.length > 0) {
                            html += `<div class="emotion-section">`;
                            html += `<h3>${this.getCurrentLanguage() === 'ru' ? 'Рекомендации' : 'Recommendations'}</h3>`;
                            html += `<div style="padding: 5px 0;">`;
                            recommendations.forEach(rec => {
                                      html += `<div style="margin-bottom: 8px; font-size: 0.95em; line-height: 1.4;">${rec}</div>`;
                            });
                            html += `</div>`;
                            html += `</div>`;
    }

    const language = this.getSafe(result, 'language', 'en');
    const readingTime = this.getNumber(this.getSafe(result, 'metrics.readingTime', 0));
    const timestamp  = this.getSafe(result, 'timestamp', Date.now());
    const processingTime = this.getNumber(this.getSafe(result, 'metrics.processingTime', 0));

    html += `
         <div class="emotion-section">
             <h3>${translations.processingInfo}</h3>
             <div class="emotion-metric">
                 <span class="label">${translations.language}:</span>
                 <span class="value" style="text-align:right !important;float:right;">${language.toUpperCase()}</span>
             </div>`;

    if (this.shouldShowMetric(readingTime, true) && readingTime > 0) {
        html += `
             <div class="emotion-metric">
                 <span class="label">${translations.readingTime}:</span>
                 <span class="value" style="text-align:right !important;float:right;">${this.formatReadingTime(readingTime)}</span>
             </div>`;
    }

    html += `
             <div class="emotion-metric">
                 <span class="label">${translations.timestamp}:</span>
                 <span style="text-align:right !important;float:right;">${this.formatTimestamp(timestamp)}</span>
             </div>`;

    if (this.shouldShowMetric(processingTime, true) && processingTime > 0) {
        html += `
             <div class="emotion-metric">
                 <span class="label">${translations.processingTime}:</span>
                 <span class="value" style="text-align:right !important;float:right;">${this.formatProcessingTime(processingTime)}</span>
             </div>`;
    }

    html += `
             <div class="emotion-metric">
                 <span class="label">${translations.analysisVersion}:</span>
                 <span class="value" style="text-align:right !important;float:right;">1.0</span>
             </div>
         </div>
   `;

    content.innerHTML = html;

	this.addDownloadButtonToSidebar();
}

translateCategory(category, lang) {
    if (lang !== 'ru') return category;
    const translations = {
        'neutral': 'нейтральная',
         'balanced': 'баланс',
        'ecstasy': 'экстаз',
        'joy': 'радость',
        'love': 'любовь',
        'peace': 'мир',
        'hope': 'надежда',
        'gratitude' : 'благодарность',
        'inspiration': 'вдохновение',
        'pride': 'гордость',
        'surprise': 'удивление',
        'curiosity': 'любопытство',
        'sadness': 'грусть',
        'grief': 'горе',
        'anger': 'гнев',
        'fear': 'страх',
        'disgust': 'отвращение',
        'shame': 'стыд',
        'guilt': 'вина',
        'loneliness': 'одиночество',
        'envy': 'зависть',
        'despair': 'отчаяние',
        'aesthetic': 'эстетика',
        'nostalgia': 'ностальгия',
        'triumph': 'триумф',
         'liberation': 'освобождение',
        'connection': 'связь',
        'contempt': 'презрение',
        'bitterness': 'горечь',
        'anxiety': 'тревога',
        'emptiness': 'пустота',
        'confusion': 'смятение',
        'ambivalence': 'амбивалентность',
        'irony': 'ирония',
        'nostalgiaMixed': 'смешанная ностальгия',
        'bittersweet': 'горько-сладкое',
        'intensity': 'интенсивность',
        'calmness': 'спокойствие',
        'vulnerability': 'уязвимость',
        'resilience': 'стойкость',
        'peacefulAdj': 'покой',
		'suffer': 'страдание',
		'suffering': 'страдание',
		                                'joyfulAdj': 'радость',
                                        'sadAdj': 'печаль',
                                        'angryAdj': 'злость',
                                        'peacefulAdj': 'покой',
                                        'intenseAdj': 'интенсивность'
    };
    return translations[category] || category;
}

translateNarrative(narrative, lang) {
    if (lang !== 'ru') return narrative;
    const translations = {
        'heroic': 'героический',
        'tragic': 'трагический',
        'romantic': 'романтический',
        'comedic': 'комедийный',
        'epic': 'эпический',
         'lyrical': 'лирический',
        'dramatic': 'драматический',
        'satirical': 'сатирический',
        'mystical': 'мистический',
        'philosophical': 'философский',
         'balanced': 'сбалансированный',
        'complex': 'сложный',
        'realistic': 'реалистичный'
    };
    return translations[narrative] || narrative;
}

translateRhythmPattern(pattern, lang) {
    if (lang !== 'ru') return pattern;
    const translations = {
        'regular': 'регулярный',
        'irregular': 'нерегулярный',
        'wave': 'волновой',
        'chaotic': 'хаотичный',
        'steady': 'устойчивый',
        'variable': 'переменный',
        'ascending': 'восходящий',
        'descending': 'нисходящий',
         'symmetric': 'симметричный',
        'wavy': 'волнистый',
        'crescendo': 'нарастание',
        'decrescendo': 'затухание'
    };
    return translations[pattern] || pattern; 
}

translateRhythmFlow(flow, lang) {
    if (lang !== 'ru') return flow;
    const translations = {
        'smooth': 'плавный',
        'jerky': 'рывковый',
        'flowing': 'текучий',
        'staccato': 'стаккато',
        'balanced': 'сбалансированный',
        'moderate': 'умеренный',
        'choppy': 'прерывистый'
    };
    return translations[flow] || flow;
}

translateEmotionalTrend(trend, lang) {
    if (lang !== 'ru') return trend;
    const translations = {
        'increasing': 'возрастающий',
        'decreasing': 'убывающий',
        'falling': 'убывающий',
        'stable': 'стабильный',
        'fluctuating': 'колеблющийся',
        'complex': 'сложный',
        'rising': 'восходящий'
    };
    return translations[trend] || trend;
}

translateThematicDominant(dominant, lang) {
    if (lang !== 'ru') return dominant;
     const translations = {
        'emotional': 'эмоциональная',
        'cognitive': 'когнитивная',
        'spiritual': 'духовная',
        'philosophical': 'философская',
        'aesthetic': 'эстетическая',
        'social': 'социальная',
        'personal': 'личная',
        'universal': 'универсальная',
        'balanced': 'сбалансированная',
        'existential': 'экзистенциальная',
        'temporal': 'временная',
        'spatial': 'пространственная'
    };
    return translations[dominant] || dominant;
}

translateMaslowLevel(level, lang) {
    if (lang !== 'ru') return level;
    const translations = {
        'physiological': 'физиологические',
        'safety': 'безопасность',
        'love': 'любовь и принадлежность',
        'esteem': 'уважение',
        'self-actualization': 'самоактуализация',
        'self-transcendence': 'самотрансценденция',
        'balanced': 'сбалансированные',
		'love/belonging': 'любовь и принадлежность'
    };
    return translations[level] || level;
}

translatePersonalityType(type, lang) {
    if (lang !== 'ru') return type;
    const translations = {
        'balanced': 'сбалансированный',
        'introverted': 'интровертный',
        'extroverted': 'экстравертный',
        'analytical': 'аналитический',
        'emotional': 'эмоциональный',
        'practical': 'прагматичный',
        'creative': 'креативный',
        'intuitive': 'интуитивный',
		'sensitive': 'чувствительный',
                                        'sociable': 'общительный',
                                        'responsible': 'ответственный',
                                        'resilient': 'устойчивый',
                                        'vulnerable': 'ранимый',
                                        'anxious': 'тревожный',
                                        'secure': 'уверенный',
                                        'insecure': 'неуверенный'
    };
    return translations[type] || type;
}

translateEmotionalIntelligence(level, lang) {
    if (lang !== 'ru') return level;
    const translations = {
        'developing': 'развивающийся',
        'moderate': 'умеренный',
        'high': 'высокий',
        'advanced': 'продвинутый',
        'balanced': 'сбалансированный'
    };
    return translations[level] || level;
}

translateDefenseMechanism(mechanism, lang) {
    if (lang !== 'ru') return mechanism;
    const translations = {
        'none': 'отсутствует',
        'repression': 'вытеснение',
         'projection': 'проекция',
        'denial': 'отрицание',
        'rationalization': 'рационализация',
        'sublimation': 'сублимация',
        'displacement': 'смещение',
        'regression': 'регрессия',
         'compensation': 'компенсация',
        'intellectualization': 'интеллектуализация'
    };
    return translations[mechanism] || mechanism;
}

translateSelfAwareness(level, lang) {
    if (lang !== 'ru') return level;
    const translations = {
        'low': 'низкий',
        'moderate': 'умеренный',
        'high': 'высокий',
        'advanced': 'продвинутый',
        'balanced': 'сбалансированный'
    };
    return translations[level] || level;
}

formatProcessingTime(ms) { 
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

formatReadingTime(minutes) {
    if (!this.isValidNumber(minutes)) {
        return '0:00';
    }
    const mins = Number(minutes);

    if (mins < 0.05) {
        return '0:01';
    }

    if (mins < 1) {
        const seconds = Math.round(mins * 60);
        return `0:${seconds.toString().padStart(2, '0')}`;
    }

    const wholeMinutes = Math.floor(mins);
    const seconds = Math.round((mins - wholeMinutes) * 60);

    if (seconds === 60) {
        return `${wholeMinutes + 1}:00`;
    }

    return `${wholeMinutes}:${seconds.toString().padStart(2, '0')}`;
}

formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString([], { 
        hour: '2-digit', 
        minute: '2-digit'
    });
}

getCurrentLanguage() {
    const ruLangBtn = document.getElementById('lang-ru');
    const enLangBtn = document.getElementById('lang-en');
    if (ruLangBtn && ruLangBtn.classList.contains('active')) {
        return 'ru';
    } else if (enLangBtn && enLangBtn.classList.contains('active')) {
        return 'en';
    }
    return 'ru';
}

getTranslations(lang) {
    const translations = {
        ru: {
            primaryProfile: 'Основной профиль',
            primaryTone: 'Эмоциональная гамма',
            primaryToneDesc: 'Основная эмоциональная окраска текста',
            description: 'Описание',
             polarity: 'Полярность',
            polarityDesc: 'Общая эмоциональная направленность (-100% = негатив, +100% = позитив)',
            intensity: 'Интенсивность',
             intensityDesc: 'Сила эмоционального выражения',
            confidence: 'Достоверность',
            confidenceDesc: 'Уверенность анализа',
            consistency: 'Согласованность',
            consistencyDesc: 'Эмоциональная согласованность текста',
            emotionalRange: 'Эмоциональный диапазон',
            emotionalRangeDesc: 'Размах эмоциональных колебаний',
            emotionalDepth: 'Эмоциональная глубина',
            emotionalDepthDesc: 'Глубина эмоционального переживания',
            ironyLevel: 'Уровень иронии',
            ironyLevelDesc: 'Степень ироничности текста',
            narrative: 'Нарратив',
            narrativeDesc: 'Архетип повествования',
            textComplexity: 'Сложность текста',
            textComplexityDesc: 'Общая сложность текстовой структуры',
            keywords: 'Ключевые слова',
            lexicalAnalysis: 'Лексический анализ',
             totalChars: 'Всего символов',
            totalCharsDesc: 'Общее количество символов в тексте',
            totalWords: 'Всего слов',
            totalWordsDesc: 'Общее количество слов в тексте',
            paragraphs: 'Абзацев',
            paragraphsDesc: 'Количество абзацев в тексте',
            languageConfidence: 'Уверенность в языке',
             languageConfidenceDesc: 'Уверенность в определении языка текста',
            emotionalWords: 'Эмоциональные слова',
            emotionalWordsDesc: 'Слова с эмоциональной окраской',
            lexicalDensity: 'Лексическая плотность',
            lexicalDensityDesc: 'Отношение эмоциональных слов к общему количеству',
            categoriesFound: 'Найдено категорий',
            categoriesFoundDesc: 'Количество обнаруженных эмоциональных категорий',
            dominantCategory: 'Доминирующая категория',
            dominantCategoryDesc: 'Категория с наибольшим весом',
            lexicalConcentration: 'Концентрация лексики',
            lexicalConcentrationDesc: 'Степень концентрации эмоциональных слов',
            lexicalRichness: 'Богатство лексики',
            lexicalRichnessDesc: 'Разнообразие эмоциональной лексики',
            emotionalClusters: 'Эмоциональные кластеры', 
            emotionalClustersDesc: 'Группы связанных эмоциональных слов',
            emoticons: 'Эмоджи',
            emoticonsDesc: 'Cмайлики в тексте',
             positive: 'позитивные',
            negative: 'негативные',
            neutral: 'нейтральные',
            complex: 'сложные',
            syntacticAnalysis: 'Синтаксический анализ',
            sentences: 'Предложения',
            sentencesDesc: 'Количество предложений',
            avgLength: 'Средняя длина',
            avgLengthDesc: 'Средняя длина предложения в словах',
            words: 'слов',
            emotionalPunctuation: 'Знаки препинания',
            emotionalPunctuationDesc: 'Общее количество знаков препинания в тексте',
            exclamatory: 'Восклицательные',
            exclamatoryDesc: 'Предложения с восклицательными знаками',
            interrogative: 'Вопросительные',
            interrogativeDesc: 'Вопросы в тексте',
             hesitant: 'Неуверенные',
            hesitantDesc: 'Предложения с многоточием',
            emphatic: 'Эмфатические',
            emphaticDesc: 'Предложения с усиленной пунктуацией',
            imperative: 'Повелительные',
            imperativeDesc: 'Повелительные предложения',
            hyperbolic: 'Гиперболические',
            hyperbolicDesc: 'Предложения с преувеличением',
            poetic: 'Поэтические',
            poeticDesc: 'Поэтические конструкции',
            complexity: 'Сложность эмоций',
            complexityDesc: 'Сложность эмоциональной палитры',
            rhythm: 'Ритм',
            rhythmDesc: 'Регулярность длины предложений',
            rhythmPattern: 'Паттерн ритма',
            rhythmPatternDesc: 'Тип ритмического паттерна',
            rhythmFlow: 'Поток ритма',
            rhythmFlowDesc: 'Плавность ритма',
            readability: 'Читаемость',
            readabilityDesc: 'Уровень читаемости текста',
            syntacticCoherence: 'Синтаксическая связность',
            syntacticCoherenceDesc: 'Связность синтаксических конструкций',
            contextualAnalysis: 'Контекстуальный анализ',
            negations: 'Отрицания',
            negationsDesc: 'Слова отрицания (не, нет, без)',
             intensifiers: 'Усилители',
            intensifiersDesc: 'Слова, усиливающие эмоции (очень, крайне)',
            diminutives: 'Уменьшительные',
            diminutivesDesc: 'Уменьшительно-ласкательные формы',
            augmentatives: 'Увеличительные',
            augmentativesDesc: 'Увеличительные формы',
            irony: 'Ирония',
            ironyDesc: 'Признаки иронии в тексте',
            contrasts: 'Контрасты',
            contrastsDesc: 'Противопоставления в тексте',
            rhetorical: 'Риторические',
            rhetoricalDesc: 'Риторические вопросы',
            hyperbole: 'Гиперболы',
            hyperboleDesc: 'Преувеличения в тексте',
            understatement: 'Литоты',
            understatementDesc: 'Преуменьшения в тексте',
            contextualCoherence: 'Контекстуальная связность',
            contextualCoherenceDesc: 'Связность контекстуальных элементов',
            contextualConsistency: 'Контекстуальная согласованность',
            contextualConsistencyDesc: 'Согласованность контекстуальных маркеров',
            toneVariation: 'Вариация тона',
            toneVariationDesc: 'Степень изменения эмоционального тона',
            culturalAnalysis: 'Культурный анализ',
            literary: 'Литературные',
             literaryDesc: 'Литературные отсылки',
            historical: 'Исторические',
            historicalDesc: 'Исторические отсылки',
            mythological: 'Мифологические',
            mythologicalDesc: 'Мифологические отсылки',
            traditional: 'Традиционные',
            traditionalDesc: 'Традиционные отсылки',
            idioms: 'Идиомы',
            idiomsDesc: 'Устойчивые выражения и фразеологизмы',
            culturalDepth: 'Глубина культуры',
            culturalDepthDesc: 'Глубина культурных отсылок',
            intertextuality: 'Интертекстуальность',
            intertextualityDesc: 'Степень интертекстуальных связей',
            culturalCoherence: 'Культурная связность',
            culturalCoherenceDesc: 'Связность культурных элементов',
            dominantCulturalTheme: 'Доминирующая культурная тема',
            dominantCulturalThemeDesc: 'Основная культурная тема текста',
            semanticAnalysis: 'Семантический анализ',
            semanticDensity: 'Семантическая плотность',
            semanticDensityDesc: 'Плотность семантического содержания',
            semanticRichness: 'Семантическое богатство',
            semanticRichnessDesc: 'Богатство семантического содержания',
            semanticCoherence: 'Семантическая связность',
            semanticCoherenceDesc: 'Связность семантических элементов',
            abstractionLevel: 'Уровень абстрактности',
            abstractionLevelDesc: 'Степень абстрактности текста',
            semanticClusters: 'Семантические кластеры',
            semanticClustersDesc: 'Группы семантически связанных слов',
             emotionalArc: 'Эмоциональная арка',
            emotionalArcDesc: 'Тип эмоциональной арки повествования',
            emotionalTrend: 'Эмоциональный тренд',
            emotionalTrendDesc: 'Общее направление эмоционального развития',
            emotionalVolatility: 'Эмоциональная волатильность',
            emotionalVolatilityDesc: 'Степень эмоциональных колебаний',
            thematicDominant: 'Доминирующая тема',
            thematicDominantDesc: 'Основная тематическая направленность',
            thematicComplexity: 'Тематическая сложность',
            thematicComplexityDesc: 'Сложность тематической структуры',
            psychologicalAnalysis: 'Психологический анализ',
            primaryPlutchik: 'Основная эмоция Плутчика',
            primaryPlutchikDesc: 'Доминирующая базовая эмоция по Плутчику',
            plutchikDiversity: 'Разнообразие эмоций Плутчика',
             plutchikDiversityDesc: 'Степень разнообразия базовых эмоций',
            dominantMaslow: 'Потребность Маслоу',
            dominantMaslowDesc: 'Доминирующий уровень потребностей по Маслоу',
            hierarchyCompletion: 'Завершенность иерархии',
            hierarchyCompletionDesc: 'Степень завершенности иерархии потребностей',
            personalityType: 'Тип личности',
            personalityTypeDesc: 'Доминирующий тип личности по Большой Пятерке',
            dominantTraits: 'Доминирующие черты',
            dominantTraitsDesc: 'Доминирующие черты личности',
            bigFiveComplexity: 'Сложность личности',
            bigFiveComplexityDesc: 'Степень сложности психологического профиля',
             emotionalIntelligence: 'Эмоциональный интеллект',
            emotionalIntelligenceDesc: 'Уровень эмоционального интеллекта',
            eiScore: 'Оценка ЭИ',
            eiScoreDesc: 'Числовая оценка эмоционального интеллекта',
            primaryDefense: 'Основной защитный механизм',
            primaryDefenseDesc: 'Доминирующий защитный механизм',
             defenseIntensity: 'Интенсивность защиты',
            defenseIntensityDesc: 'Степень выраженности защитных механизмов',
            psychologicalComplexity: 'Психологическая сложность',
            psychologicalComplexityDesc: 'Степень психологической сложности',
            selfAwarenessLevel: 'Уровень самосознания',
            selfAwarenessLevelDesc: 'Степень осознания себя',
            selfAwarenessScore: 'Оценка самосознания',
            selfAwarenessScoreDesc: 'Числовая оценка уровня самосознания',
            psychologicalInsights: 'Психологические инсайты',
			                            plutchikCombinations: 'Комбинации Плутчика',
                                        plutchikCombinationDesc: 'Сочетания базовых эмоций, дающие сложные чувства',
                                        maslowNeeds: 'Потребности по Маслоу',
                                        maslowNeedDesc: 'Выраженность каждого уровня потребностей',
                                        bigFiveTraits: 'Черты Большой пятёрки',
                                        bigFiveTraitDesc: 'Выраженность каждой личностной черты',
                                        eiComponents: 'Компоненты эмоционального интеллекта',
                                        eiComponentDesc: 'Отдельные составляющие эмоционального интеллекта',
                                        defenseMechanisms: 'Защитные механизмы',
                                        defenseMechanismDesc: 'Виды психологической защиты',
                                        selfReflection: 'Саморефлексия',
                                        selfReflectionDesc: 'Способность к самоанализу',
                                        metacognition: 'Метапознание',
                                        metacognitionDesc: 'Осознание собственных мыслительных процессов',
                                        cognitiveStyleFactors: 'Факторы когнитивного стиля',
                                        cognitiveFactorDesc: 'Выраженность различных когнитивных стратегий',
			                            cognitiveBiases: 'Когнитивные искажения',
                                        cognitiveBiasDesc: 'Систематические ошибки мышления, влияющие на восприятие',
                                        communicationStyles: 'Стили общения',
                                        communicationStyleDesc: 'Преобладающие способы взаимодействия с другими',
			                            psychologicalSummary: 'Психологическое резюме',
                                        insightApplicability: 'Применимость инсайтов',
                                        applicabilityLevel: 'Уровень применимости',
                                        applicabilityDesc: 'Насколько результаты анализа применимы к реальной личности автора',
                                        applicabilityScore: 'Оценка применимости',
                                        applicabilityScoreDesc: 'Числовая оценка надёжности и применимости',
                                        limitations: 'Ограничения анализа',
										psychologicalSummaryHint: 'Сводка основных психологических характеристик текста',
										insightApplicabilityHint: 'Насколько результаты анализа можно применить к реальной личности автора',
										applicabilityLevelHint: 'Уровень достоверности и применимости результатов',
										applicabilityScoreHint: 'Числовая оценка от 0 до 100%',
										limitationsHint: 'Факторы, ограничивающие точность анализа',
										insightApplicabilityHint: 'Ограничения анализа — факторы, снижающие точность',
										applicabilityLevelHint: 'Уровень применимости результатов анализа',
										applicabilityScoreHint: 'Числовая оценка от 0 до 100%',
										applicabilityValueHint: 'Текущий уровень применимости',
										limitationsHint: 'Факторы, снижающие точность анализа',
										limitationItemHint: 'Ограничение',
										psychologicalSummaryHint: 'Сводка основных психологических характеристик текста',
										summaryItemHint: 'Психологическая характеристика',

            emotionalPatterns: 'Эмоциональные паттерны',
            emotionalPatternsDesc: 'Характерные эмоциональные паттерны',
             cognitiveStyle: 'Когнитивный стиль',
            cognitiveStyleDesc: 'Доминирующий когнитивный стиль',
            relations: 'Межличностные особенности',
            relationsDesc: 'Характерные межличностные паттерны',
            growthPaths: 'Направления роста',
            growthPathsDesc: 'Рекомендуемые направления личностного роста',
            therapeuticApproaches: 'Терапевтические подходы',
            therapeuticApproachesDesc: 'Рекомендуемые терапевтические подходы',
            colorPalette: 'Цветовая палитра',
            processingInfo: 'Информация об обработке',
            language: 'Язык',
            readingTime: 'Время чтения',
            timestamp: 'Время анализа',
            processingTime: 'Время обработки',
            analysisVersion: 'Версия анализа',
            repetitionsTitle: 'Повторы слов',
            repetitionsDesc: 'Повторяющиеся слова в тексте',
            repetitionCount: 'раз',
            repetitionSeverity: 'критичность',
            criticalRepetitions: 'Критические повторы',
            emotionBalance: 'Баланс эмоций',
            emotionBalanceDesc: 'Сбалансированность позитивных и негативных эмоций',
            emotionDominance: 'Доминирование',
            emotionDominanceDesc: 'Степень доминирования одной эмоции над другими',
            emotionContrast: 'Контраст',
            emotionContrastDesc: 'Разница между позитивными и негативными эмоциями',
            emotionConcentration: 'Концентрация',
            emotionConcentrationDesc: 'Насколько эмоции сосредоточены',
            emotionVolatility: 'Волатильность',
            emotionVolatilityDesc: 'Степень колебаний эмоций',
            emotionMomentum: 'Эмоциональный импульс',
            emotionMomentumDesc: 'Общая эмоциональная энергия',
            peakIntensity: 'Пиковая интенсивность',
            peakIntensityDesc: 'Максимальная интенсивность положительных эмоций',
            valleyDepth: 'Глубина провалов',
            valleyDepthDesc: 'Максимальная интенсивность отрицательных эмоций',
            phaseCount: 'Количество фаз',
            phaseCountDesc: 'Сколько эмоциональных фаз в тексте',
            peakCount: 'Количество пиков',
            peakCountDesc: 'Сколько пиков положительных эмоций',
            valleyCount: 'Количество провалов',
            valleyCountDesc: 'Сколько провалов отрицательных эмоций',
            clusterCount: 'Количество кластеров',
            clusterCountDesc: 'Сколько эмоциональных кластеров',
            avgClusterSize: 'Средний размер кластера',
            avgClusterSizeDesc: 'Среднее количество эмоций в кластере',
            writerHemingwayHint: 'Доля предложений ≤5 слов без союзов: чтобы, который. Высокий % — «рубленый» стиль',
            writerSilenceHint: 'Плотность слов «тишина/молчание» и многоточий. дБ = 10·log₁₀(плотность). Высокое значение — текст полон пауз',
            writerWeatherHint: 'Баланс между «жарой» и «холодом» в лексике. -40°C = ледяной, +40°C = знойный, 0°C = нейтрально',
            writerDialogueHint: 'Доля текста внутри кавычек (прямая речь). Высокое значение — диалоговая проза, низкое — нарратив',
            writerTimeHint: 'Преобладание будущего (+) или прошлого (-). Рассчитано по глагольным формам и маркерам времени',
            writerModalityHint: 'Частота слов неуверенности (может быть, наверное) на 1000 слов. Чем выше, тем текст гипотетичнее',
            writerEgoHint: 'Доля «я/мы» среди всех личных местоимений. >50% — эгоцентричное повествование',
            writerFragmentationHint: '10 = каждое предложение с абзаца, 1 = абзацы по 10 предложений, 0 = монолит',
            writerImmersivenessHint: 'Сенсорная лексика (зрение, слух, осязание, запах, вкус) на 1000 слов. Погружение в сцену',
            writerChaosHint: 'Энтропия ритма: равномерность распределения длин предложений, абзацев и знаков препинания. 0% — монотонно, 100% — богато/хаотично',
	        poetryAnaphoraHint: 'Доля строк, в которых первое слово совпадает с первым словом предыдущей строки',
            poetryEpiphoraHint: 'Доля строк, в которых последнее слово совпадает с последним словом предыдущей строки',
            poetryConsonantHint: 'Суммарное число повторяющихся согласных (каждая дополнительная встреча) на 100 слов',
            poetryVowelHint: 'Суммарное число повторяющихся гласных на 100 слов',
            poetrySyllableHint: 'Среднее число слогов на слово, умноженное на 100',
            poetryStropheHint: 'Средняя длина строки в слогах',
            poetryRhymeHint: 'Количество рифмующихся пар строк (совпадение последних 3 букв) на 100 строк',
            poetryMeterHint: 'Наиболее частый размер четверостиший (длины строк в словах). Например, 8-8-8-8',
            poetryLineLengthHint: 'Средняя длина строки в словах',
            poetryFreedomHint: 'Доля строк с уникальной длиной. Чем выше, тем вольнее стих',
			journalistDigitalFootprint: 'Числа, даты, проценты на 1000 слов. Показатель фактологической насыщенности',
            journalistNameIndex: 'Имена, фамилии, названия организаций и мест на 1000 слов. Чем выше, тем больше конкретных источников',
            journalistFactMirror: 'Отсутствие субъективных выражений. 100% = идеально объективно, 0% = текст полон мнений',
            journalistFreshnessGauge: 'Маркеры «сегодня, вчера, только что» на 1000 слов. Показатель оперативности',
            journalistAntiYellow: 'Отсутствие кликбейтной лексики. 100% = чисто, 0% = много манипуляций',
            journalistOpinionPalette: 'Контрастные союзы (однако, но, с другой стороны) на 1000 слов. Показатель многоголосия',
            journalistBureaucraticNoise: 'Канцеляризмы на 1000 слов. Если 0 — всё в порядке',
            journalistVerbalEcho: 'Тавтологии (однокоренные повторы) на 1000 слов. Если 0 — всё в порядке',
            journalistFogZone: 'Неопределённые формулировки (около, примерно, какой-то) на 1000 слов',
            journalistCategoricalTone: 'Слова-абсолюты (всегда, никогда, каждый) на 1000 слов',
			copywriterSeoDensityHint: 'Суммарная доля топ‑5 самых частотных слов. Показывает общую насыщенность ключевыми словами',
            copywriterCallToActionHint: 'Частота глаголов‑призывов (купи, подпишись, скачай) на 1000 слов',
            copywriterClicheMeterHint: 'Частота маркетинговых штампов (инновационный, уникальный, качественный) на 1000 слов',
            copywriterSuperlativeHint: 'Частота прилагательных в превосходной степени (лучший, идеальный, совершенный) на 1000 слов',
            copywriterStorytellingHint: 'Маркеры повествования (рассказ от первого лица, глаголы прошего времени, имена собственные) на 1000 слов',
            copywriterFillerWordsHint: 'Частота слов‑паразитов (ну, вообще, типа, как бы) на 1000 слов',
            copywriterWaterContentHint: 'Доля стоп‑слов (предлоги, союзы, частицы) в тексте. Высокий % – текст водянистый',
            copywriterSpamIndexHint: 'Доля самого частотного слова. Предупреждает о переспаме ключевых слов',
            copywriterListDensityHint: 'Есть ли списки в представленном тексте (маркированные или нумерованные)',
            copywriterNoveltyHint: 'Доля слов, которые встречаются в тексте только один раз. Показатель разнообразия',
			listPresent: 'присутствуют',
            listAbsent: 'отсутствуют',
			funMoreCoffeeHint: 'Упоминания кофе и кофейных напитков на 1000 слов. Один джармуш — одно упоминание',
            funLostTimeHint: 'Количество длинных слов (≥10 букв) на 1000 слов. Чем больше прустов, тем зануднее текст',
            funRabbitHoleHint: 'Предложения, которые сильно длиннее среднего. Сколько раз текст падает в кроличью нору на 1000 слов',
            funPulpFictionHint: 'Тюремно-криминальная лексика',
            funCopyOfCopyHint: 'Слова раздражения и злости',
            funScrantonHint: 'Офисная лексика',
            funHogwartsHint: 'Магическая лексика',
            funUnknownPlanetsHint: 'Космическая лексика',
            funMordorHint: 'Слова с двойными буквами',
            funGarageRockHint: 'Доля согласных звуков',
            funIceMeltsHint: 'Появляется только если в тексте есть фраза: я тебя люблю. Показывает количество таких фраз',
			culturalAnalysis: 'Культурный анализ',
           				literary: 'Литературные',
                        literaryDesc: 'Литературные отсылки',
                        historical: 'Исторические',
                        historicalDesc: 'Исторические отсылки',
                        mythological: 'Мифологические',
                        mythologicalDesc: 'Мифологические отсылки',
                        traditional: 'Традиционные',
                        traditionalDesc: 'Традиционные отсылки',
                        idioms: 'Идиомы',
                        idiomsDesc: 'Устойчивые выражения',
                        poetic: 'Поэтические',
                        poeticDesc: 'Поэтические паттерны',
                        literaryReferences: 'Кумиры',
                        historicalPeriod: 'Период',
                        mythologicalArchetype: 'Архетип',
                        idiomMeaning: 'Значение',
                        poeticPatternType: 'Тип паттерна',
                        culturalDepth: 'Глубина культуры',
                        culturalDepthDesc: 'Глубина культурных отсылок',
                        intertextuality: 'Интертекстуальность',
                        intertextualityDesc: 'Степень отсылок к другим текстам',
                        culturalRichness: 'Культурное богатство',
                        culturalRichnessDesc: 'Богатство культурных элементов',
                        culturalCoherence: 'Культурная связность',
                        culturalCoherenceDesc: 'Согласованность культурных элементов',
                        culturalDensity: 'Культурная плотность',
                        culturalDensityDesc: 'Плотность культурных отсылок',
                        dominantTheme: 'Доминирующая тема',
                        dominantCulturalThemeDesc: 'Основная культурная тема текста',
                        simile: 'сравнение',
                        contrast: 'контраст',
                        repetition: 'повтор',
                        comparison: 'образ',
                        parallelism: 'параллелизм',
                        poetic: 'Поэтические',
                        trickster: 'хитрец',
                        hero: 'герой',
                        monster: 'монстр',
                        mystical: 'мистический',
                        other: 'не определён',
						undefined: 'не определён',
                        idiomaticExpression: 'идиоматическое выражение',
						literaryReferencesDesc: 'Литературные кумиры и отсылки',
						historicalPeriod: 'Период',
						historicalPeriodDesc: 'Исторический период отсылок',
						mythologicalArchetype: 'Архетип',
						mythologicalArchetypeDesc: 'Мифологический архетип персонажа',
						poeticPatternType: 'Тип паттерна',
						poeticPatternTypeDesc: 'Классификация поэтического приёма',
						
						readability: 'Читаемость текста',
        				readabilityDesc: 'Уровень сложности текста для восприятия',
        				readingLevel: 'Уровень читаемости',
				        readingLevelDesc: 'Текстовая оценка читаемости',
				        fleschReadingEase: 'Индекс Флеша',
				        fleschReadingEaseDesc: 'Чем выше, тем легче читать (0-100)',
				        fleschKincaidGrade: 'Класс',
				        fleschKincaidGradeDesc: 'Класс школы, необходимый для понимания текста',
				        gunningFog: 'Индекс Ганнинга-Фога',
				        gunningFogDesc: 'Оценка читаемости текста по Ганнингу-Фогу',
				        
				        readingLevelVeryEasy: 'очень легко',
				        readingLevelEasy: 'легко',
				        readingLevelFairlyEasy: 'довольно легко',
				        readingLevelStandard: 'стандартно',
				        readingLevelFairlyDifficult: 'довольно сложно',
				        readingLevelDifficult: 'сложно',
				        readingLevelVeryDifficult: 'очень сложно'
        },
        en: {
            primaryProfile: 'Primary Profile',
            primaryTone: 'Emotional Spectrum',
            primaryToneDesc: 'Main emotional tone of the text',
            description: 'Description',
            polarity: 'Polarity',
            polarityDesc: 'Overall emotional direction (-100% = negative, +100% = positive)',
            intensity: 'Intensity',
            intensityDesc: 'Strength of emotional expression',
            confidence: 'Confidence',
            confidenceDesc: 'Analysis confidence level',
            consistency: 'Consistency',
            consistencyDesc: 'Emotional consistency of text',
            emotionalRange: 'Emotional Range',
            emotionalRangeDesc: 'Range of emotional fluctuations',
            emotionalDepth: 'Emotional Depth',
            emotionalDepthDesc: 'Depth of emotional experience',
            ironyLevel: 'Irony Level',
            ironyLevelDesc: 'Degree of irony in text',
            narrative: 'Narrative',
            narrativeDesc: 'Narrative archetype',
            textComplexity: 'Text Complexity',
            textComplexityDesc: 'Overall complexity of text structure',
            keywords: 'Keywords',
            lexicalAnalysis: 'Lexical Analysis',
            totalChars: 'Total Characters',
            totalCharsDesc: 'Total number of characters in text',
            totalWords: 'Total Words',
            totalWordsDesc: 'Total number of words in text',
            paragraphs: 'Paragraphs',
            paragraphsDesc: 'Number of paragraphs in text',
            languageConfidence: 'Language Confidence',
            languageConfidenceDesc: 'Confidence in language detection',
            emotionalWords: 'Emotional Words',
            emotionalWordsDesc: 'Words with emotional coloring',
            lexicalDensity: 'Lexical Density',
            lexicalDensityDesc: 'Ratio of emotional words to total words',
            categoriesFound: 'Categories Found',
            categoriesFoundDesc: 'Number of detected emotional categories',
            dominantCategory: 'Dominant Category',
            dominantCategoryDesc: 'Category with highest weight',
            lexicalConcentration: 'Lexical Concentration',
            lexicalConcentrationDesc: 'Degree of emotional word concentration',
            lexicalRichness: 'Lexical Richness',
            lexicalRichnessDesc: 'Diversity of emotional vocabulary',
            emotionalClusters: 'Emotional Clusters',
            emotionalClustersDesc: 'Groups of related emotional words',
            emoticons: 'Emoticons',
            emoticonsDesc: 'Emotional emoticons in text',
            positive: 'positive',
            negative: 'negative',
            neutral: 'neutral',
            complex: 'complex',
            syntacticAnalysis: 'Syntactic Analysis',
            sentences: 'Sentences',
            sentencesDesc: 'Number of sentences',
            avgLength: 'Average Length',
            avgLengthDesc: 'Average sentence length in words',
            words: 'words',
            totalPunctuation: 'Total Punctuation',
            totalPunctuationDesc: 'Total number of punctuation marks in text',
            emotionalPunctuation: 'Punctuation Marks',
            emotionalPunctuationDesc: 'Total number of punctuation marks in text',
            exclamatory: 'Exclamatory',
            exclamatoryDesc: 'Sentences with exclamation marks',
            interrogative: 'Interrogative',
            interrogativeDesc: 'Questions in text',
            hesitant: 'Hesitant',
            hesitantDesc: 'Sentences with ellipsis',
            emphatic: 'Emphatic',
            emphaticDesc: 'Sentences with emphatic punctuation',
            imperative: 'Imperative',
            imperativeDesc: 'Imperative sentences',
            hyperbolic: 'Hyperbolic',
            hyperbolicDesc: 'Sentences with hyperbole',
            poetic: 'Poetic',
            poeticDesc: 'Poetic constructions',
            complexity: 'Emotion Complexity',
            complexityDesc: 'Complexity of emotional palette',
            rhythm: 'Rhythm',
            rhythmDesc: 'Regularity of sentence lengths',
            rhythmPattern: 'Rhythm Pattern',
            rhythmPatternDesc: 'Type of rhythm pattern',
            rhythmFlow: 'Rhythm Flow',
            rhythmFlowDesc: 'Smoothness of rhythm',
            readability: 'Readability',
            readabilityDesc: 'Text readability level',
            syntacticCoherence: 'Syntactic Coherence',
            syntacticCoherenceDesc: 'Coherence of syntactic structures',
            contextualAnalysis: 'Contextual Analysis',
            negations: 'Negations',
            negationsDesc: 'Negation words (not, no, without)',
            intensifiers: 'Intensifiers',
            intensifiersDesc: 'Emotion amplifying words (very, extremely)',
            diminutives: 'Diminutives',
            diminutivesDesc: 'Diminutive forms',
            augmentatives: 'Augmentatives',
            augmentativesDesc: 'Augmentative forms',
            irony: 'Irony',
            ironyDesc: 'Signs of irony in text',
            contrasts: 'Contrasts',
            contrastsDesc: 'Contrasts in text',
            rhetorical: 'Rhetorical',
            rhetoricalDesc: 'Rhetorical questions',
            hyperbole: 'Hyperbole',
            hyperboleDesc: 'Exaggerations in text',
            understatement: 'Understatement',
            understatementDesc: 'Understatements in text',
            contextualCoherence: 'Contextual Coherence',
            contextualCoherenceDesc: 'Coherence of contextual elements',
            contextualConsistency: 'Contextual Consistency',
            contextualConsistencyDesc: 'Consistency of contextual markers',
            toneVariation: 'Tone Variation',
            toneVariationDesc: 'Degree of emotional tone variation',
            culturalAnalysis: 'Cultural Analysis',
            literary: 'Literary',
            literaryDesc: 'Literary references',
            historical: 'Historical',
            historicalDesc: 'Historical references',
            mythological: 'Mythological',
            mythologicalDesc: 'Mythological references',
            traditional: 'Traditional',
            traditionalDesc: 'Traditional references',
            idioms: 'Idioms',
            idiomsDesc: 'Idioms and phraseological units',
            culturalDepth: 'Cultural Depth',
            culturalDepthDesc: 'Depth of cultural references',
            intertextuality: 'Intertextuality',
            intertextualityDesc: 'Degree of intertextual connections',
            culturalCoherence: 'Cultural Coherence',
            culturalCoherenceDesc: 'Coherence of cultural elements',
            dominantCulturalTheme: 'Dominant Cultural Theme',
            dominantCulturalThemeDesc: 'Main cultural theme of text',
            semanticAnalysis: 'Semantic Analysis',
            semanticDensity: 'Semantic Density',
            semanticDensityDesc: 'Density of semantic content',
            semanticRichness: 'Semantic Richness',
            semanticRichnessDesc: 'Richness of semantic content',
            semanticCoherence: 'Semantic Coherence',
            semanticCoherenceDesc: 'Coherence of semantic elements',
            abstractionLevel: 'Abstraction Level',
            abstractionLevelDesc: 'Degree of text abstraction',
            semanticClusters: 'Semantic Clusters',
            semanticClustersDesc: 'Groups of semantically related words',
            emotionalArc: 'Emotional Arc',
            emotionalArcDesc: 'Type of emotional narrative arc', 
            emotionalTrend: 'Emotional Trend',
            emotionalTrendDesc: 'Overall direction of emotional development',
            emotionalVolatility: 'Emotional Volatility',
            emotionalVolatilityDesc: 'Degree of emotional fluctuations',
            thematicDominant: 'Dominant Theme',
            thematicDominantDesc: 'Main thematic direction',
            thematicComplexity: 'Thematic Complexity',
            thematicComplexityDesc: 'Complexity of thematic structure',
            psychologicalAnalysis: 'Psychological Analysis',
            primaryPlutchik: 'Primary Plutchik Emotion',
            primaryPlutchikDesc: 'Dominant basic emotion according to Plutchik',
            plutchikDiversity: 'Plutchik Emotions Diversity',
            plutchikDiversityDesc: 'Degree of basic emotions diversity',
            dominantMaslow: 'Dominant Maslow Need',
            dominantMaslowDesc: 'Dominant level of needs according to Maslow',
            hierarchyCompletion: 'Hierarchy Completion',
            hierarchyCompletionDesc: 'Degree of needs hierarchy completion',
            personalityType: 'Personality Type',
            personalityTypeDesc: 'Dominant personality type according to Big Five',
            dominantTraits: 'Dominant Traits',
            dominantTraitsDesc: 'Dominant personality traits',
            bigFiveComplexity: 'Big Five Complexity',
            bigFiveComplexityDesc: 'Degree of psychological profile complexity',
            emotionalIntelligence: 'Emotional Intelligence',
            emotionalIntelligenceDesc: 'Level of emotional intelligence',
            eiScore: 'EI Score',
            eiScoreDesc: 'Numerical score of emotional intelligence',
            primaryDefense: 'Primary Defense Mechanism',
            primaryDefenseDesc: 'Dominant defense mechanism',
            defenseIntensity: 'Defense Intensity',
            defenseIntensityDesc: 'Degree of defense mechanisms intensity',
            psychologicalComplexity: 'Psychological Complexity',
            psychologicalComplexityDesc: 'Degree of psychological complexity',
            selfAwarenessLevel: 'Self-Awareness Level',
            selfAwarenessLevelDesc: 'Degree of self-awareness',
            selfAwarenessScore: 'Self-Awareness Score',
            selfAwarenessScoreDesc: 'Numerical score of self-awareness level',
            psychologicalInsights: 'Psychological Insights',
			                            plutchikCombinations: 'Plutchik Combinations',
                                        plutchikCombinationDesc: 'Combinations of basic emotions forming complex feelings',
                                        maslowNeeds: 'Maslow Needs',
                                        maslowNeedDesc: 'Intensity of each need level',
                                        bigFiveTraits: 'Big Five Traits',
                                        bigFiveTraitDesc: 'Expression of each personality trait',
                                        eiComponents: 'EI Components',
                                        eiComponentDesc: 'Individual components of emotional intelligence',
                                        defenseMechanisms: 'Defense Mechanisms',
                                        defenseMechanismDesc: 'Detected psychological defenses',
                                        selfReflection: 'Self-Reflection',
                                        selfReflectionDesc: 'Capacity for introspection',
                                        metacognition: 'Metacognition',
                                        metacognitionDesc: 'Awareness of one\'s own thought processes',
                                        cognitiveStyleFactors: 'Cognitive Style Factors',
                                        cognitiveFactorDesc: 'Expression of different cognitive strategies',
			                            cognitiveBiases: 'Cognitive Biases',
                                        cognitiveBiasDesc: 'Systematic thinking errors that affect perception',
                                        communicationStyles: 'Communication Styles',
                                        communicationStyleDesc: 'Predominant ways of interacting with others',
			                            psychologicalSummary: 'Psychological Summary',
                                        insightApplicability: 'Insight Applicability',
                                        applicabilityLevel: 'Applicability Level',
                                        applicabilityDesc: 'How applicable the analysis results are to the author\'s real personality',
                                        applicabilityScore: 'Applicability Score',
                                        applicabilityScoreDesc: 'Numerical score of reliability and applicability',
                                        limitations: 'Analysis Limitations',
										psychologicalSummaryHint: 'Summary of the main psychological characteristics of the text',
										insightApplicabilityHint: 'How applicable the analysis results are to the author\'s real personality',
										applicabilityLevelHint: 'Level of reliability and applicability of the results',
										applicabilityScoreHint: 'Numerical score from 0 to 100%',
										limitationsHint: 'Factors limiting the accuracy of the analysis',
										insightApplicabilityHint: 'Analysis limitations — factors that reduce accuracy',
										applicabilityLevelHint: 'Applicability level of analysis results',
										applicabilityScoreHint: 'Numerical score from 0 to 100%',
										applicabilityValueHint: 'Current applicability level',
										limitationsHint: 'Factors reducing analysis accuracy',
										limitationItemHint: 'Limitation',
										psychologicalSummaryHint: 'Summary of the main psychological characteristics of the text',
										summaryItemHint: 'Psychological characteristic',
            emotionalPatterns: 'Emotional Patterns',
            emotionalPatternsDesc: 'Characteristic emotional patterns',
            cognitiveStyle: 'Cognitive Style',
            cognitiveStyleDesc: 'Dominant cognitive style',
            relations: 'Relational Patterns',
            relationsDesc: 'Characteristic relational patterns',
            growthPaths: 'Growth Paths',
            growthPathsDesc: 'Recommended personal growth directions',
            therapeuticApproaches: 'Therapeutic Approaches',
            therapeuticApproachesDesc: 'Recommended therapeutic approaches',
            colorPalette: 'Color Palette',
            processingInfo: 'Processing Info',
            language: 'Language',
            readingTime: 'Reading Time',
            timestamp: 'Timestamp',
            processingTime: 'Processing Time',
            analysisVersion: 'Analysis Version',
            repetitionsTitle: 'Word Repetitions',
            repetitionsDesc: 'Repeated words in text',
             repetitionCount: 'times',
            repetitionSeverity: 'severity',
            criticalRepetitions: 'Critical repetitions',
            emotionBalance: 'Emotion Balance',
            emotionBalanceDesc: 'Balance of positive and negative emotions',
            emotionDominance: 'Dominance',
            emotionDominanceDesc: 'Degree of one emotion dominating others',
            emotionContrast: 'Contrast',
            emotionContrastDesc: 'Difference between positive and negative emotions',
            emotionConcentration: 'Concentration',
            emotionConcentrationDesc: 'How concentrated emotions are',
            emotionVolatility: 'Volatility',
            emotionVolatilityDesc: 'Degree of emotion fluctuations',
            emotionMomentum: 'Emotional Momentum',
            emotionMomentumDesc: 'Overall emotional energy',
            peakIntensity: 'Peak Intensity',
            peakIntensityDesc: 'Maximum intensity of positive emotions',
            valleyDepth: 'Valley Depth',
            valleyDepthDesc: 'Maximum intensity of negative emotions',
            phaseCount: 'Phase Count',
            phaseCountDesc: 'Number of emotional phases in text',
            peakCount: 'Peak Count',
            peakCountDesc: 'Number of positive emotion peaks',
            valleyCount: 'Valley Count',
            valleyCountDesc: 'Number of negative emotion valleys',
            clusterCount: 'Cluster Count',
            clusterCountDesc: 'Number of emotional clusters',
            avgClusterSize: 'Average Cluster Size',
            avgClusterSizeDesc: 'Average number of emotions per cluster',
            writerHemingwayHint: 'Percentage of sentences ≤5 words without "that/which/because…". High % means choppy, Hemingway style',
            writerSilenceHint: 'Density of silence words and ellipses. dB = 10·log₁₀(density). High value = text full of pauses',
            writerWeatherHint: 'Balance between "hot" and "cold" vocabulary. -40°C = icy, +40°C = scorching, 0°C = neutral',
            writerDialogueHint: 'Percentage of text inside quotes (direct speech). High = dialogue-driven, low = narration',
            writerTimeHint: 'Future (+) vs past (-) orientation. Calculated from verb forms and tense markers',
            writerModalityHint: 'Frequency of uncertainty words (maybe, perhaps, probably) per 1000 words. Higher = more hypothetical',
            writerEgoHint: 'Percentage of \I/we\ among all personal pronouns. >50% means egocentric narration',
            writerFragmentationHint: '10 = each sentence starts a new paragraph, 1 = 10 sentences per paragraph, 0 = monolithic',
            writerImmersivenessHint: 'Sensory words (sight, hearing, touch, smell, taste) per 1000 words. High = immersive atmosphere',
            writerChaosHint: 'Rhythm entropy: uniformity of sentence length, paragraph length and punctuation. 0% = monotonous, 100% = chaotic/rich',
			poetryAnaphoraHint: 'Percentage of lines where the first word matches the first word of the previous line',
            poetryEpiphoraHint: 'Percentage of lines where the last word matches the last word of the previous line',
            poetryConsonantHint: 'Total repetitions of consonants (each extra occurrence) per 100 words',
            poetryVowelHint: 'Total repetitions of vowels per 100 words',
            poetrySyllableHint: 'Average number of syllables per word, multiplied by 100',
            poetryStropheHint: 'Average line length in syllables',
            poetryRhymeHint: 'Number of rhyming line pairs (matching last 3 letters) per 100 lines',
            poetryMeterHint: 'Most frequent quatrain pattern (word lengths per line). E.g., 8-8-8-8',
            poetryLineLengthHint: 'Average line length in words',
            poetryFreedomHint: 'Percentage of lines with unique length. Higher means freer verse',
			journalistDigitalFootprint: 'Numbers, dates, percentages per 1000 words. Measures factual density',
            journalistNameIndex: 'Names of people, organizations, places per 1000 words. Higher means more specific sources',
            journalistFactMirror: 'Absence of subjective expressions. 100% = perfectly objective, 0% = opinion‑heavy',
            journalistFreshnessGauge: 'Markers like: today, yesterday, just in / per 1000 words. Indicates timeliness',
            journalistAntiYellow: 'Absence of clickbait vocabulary. 100% = clean, 0% = manipulative',
            journalistOpinionPalette: 'Contrastive conjunctions (however, but, on the other hand) per 1000 words. Shows multiple viewpoints',
            journalistBureaucraticNoise: 'Officialese per 1000 words. If 0, all right',
            journalistVerbalEcho: 'Tautologies (cognate repetitions) per 1000 words. If 0, all right',
            journalistFogZone: 'Vague wording (around, approximately, some) per 1000 words',
            journalistCategoricalTone: 'Absolutist words (always, never, every) per 1000 words',
			copywriterSeoDensityHint: 'Total share of the top‑5 most frequent content words. Measures overall keyword saturation',
            copywriterCallToActionHint: 'Frequency of call‑to‑action verbs (buy, subscribe, download) per 1000 words',
            copywriterClicheMeterHint: 'Frequency of marketing clichés (innovative, unique, quality) per 1000 words',
            copywriterSuperlativeHint: 'Frequency of superlative adjectives (best, ideal, perfect) per 1000 words',
            copywriterStorytellingHint: 'Narrative markers (1st person, past tense verbs, proper nouns) per 1000 words',
            copywriterFillerWordsHint: 'Frequency of filler words (well, like, you know) per 1000 words',
            copywriterWaterContentHint: 'Percentage of stop words (prepositions, conjunctions, particles). High % means watery text',
            copywriterSpamIndexHint: 'Percentage of the most frequent content word. Warns against keyword stuffing',
            copywriterListDensityHint: 'Lists in the presented text',
            copywriterNoveltyHint: 'Percentage of words that appear only once. Measures diversity',
			listPresent: 'present',
            listAbsent: 'none',
			funMoreCoffeeHint: 'Mentions of coffee and coffee drinks per 1000 words. One Jarmusch = one mention',
            funLostTimeHint: 'Number of long words (≥10 letters) per 1000 words. More Prousts means more tedious text',
            funRabbitHoleHint: 'Sentences much longer than average. How many times the text falls down the rabbit hole per 1000 words',
            funPulpFictionHint: 'Prison/criminal slang',
            funCopyOfCopyHint: 'Words of irritation and anger',
            funScrantonHint: 'Office vocabulary',
            funHogwartsHint: 'Magical vocabulary',
            funUnknownPlanetsHint: 'Space vocabulary',
            funMordorHint: 'Words with double letters',
            funGarageRockHint: 'Proportion of consonant sounds',
            funIceMeltsHint: 'Appears if the text contains: i love you. Shows the count',
			culturalAnalysis: 'Cultural Analysis',
                        literary: 'Literary',
                        literaryDesc: 'Literary references',
                        historical: 'Historical',
                        historicalDesc: 'Historical references',
                        mythological: 'Mythological',
                        mythologicalDesc: 'Mythological references',
                        traditional: 'Traditional',
                        traditionalDesc: 'Traditional references',
                        idioms: 'Idioms',
                        idiomsDesc: 'Idiomatic expressions',
                        poetic: 'Poetic',
                        poeticDesc: 'Poetic patterns',
                        
                        literaryReferences: 'References',
                        historicalPeriod: 'Period',
                        mythologicalArchetype: 'Archetype',
                        idiomMeaning: 'Meaning',
                        poeticPatternType: 'Pattern Type',
                        
                        culturalDepth: 'Cultural Depth',
                        culturalDepthDesc: 'Depth of cultural references',
                        intertextuality: 'Intertextuality',
                        intertextualityDesc: 'Degree of references to other texts',
                        culturalRichness: 'Cultural Richness',
                        culturalRichnessDesc: 'Richness of cultural elements',
                        culturalCoherence: 'Cultural Coherence',
                        culturalCoherenceDesc: 'Consistency of cultural elements',
                        culturalDensity: 'Cultural Density',
                        culturalDensityDesc: 'Density of cultural references',
                        dominantTheme: 'Dominant Theme',
                        dominantCulturalThemeDesc: 'Main cultural theme of the text',
                        simile: 'simile',
                        contrast: 'contrast',
                        repetition: 'repetition',
                        comparison: 'comparison',
                        parallelism: 'parallelism',
                        poetic: 'Poetic',
                        trickster: 'trickster',
                        hero: 'hero',
                        monster: 'monster',
                        mystical: 'mystical',
                        other: 'undefined',
                        idiomaticExpression: 'idiomatic expression',
			literaryReferences: 'Idols',
			literaryReferencesDesc: 'Literary idols and references',
			historicalPeriod: 'Period',
			historicalPeriodDesc: 'Historical period of the reference',
			mythologicalArchetype: 'Archetype',
			mythologicalArchetypeDesc: 'Mythological archetype of the character',
			poeticPatternType: 'Pattern Type',
			poeticPatternTypeDesc: 'Classification of poetic device',

			readability: 'Text Readability',
	        readabilityDesc: 'Text complexity level for comprehension',
	        readingLevel: 'Reading Level',
	        readingLevelDesc: 'Textual readability assessment',
	        fleschReadingEase: 'Flesch Reading Ease',
	        fleschReadingEaseDesc: 'Higher is easier to read (0-100)',
	        fleschKincaidGrade: 'School Grade',
	        fleschKincaidGradeDesc: 'School grade level needed to understand the text',
	        gunningFog: 'Gunning Fog Index',
	        gunningFogDesc: 'Textual readability score by Gunning Fog',
	        
	        readingLevelVeryEasy: 'very easy',
	        readingLevelEasy: 'easy',
	        readingLevelFairlyEasy: 'fairly easy',
	        readingLevelStandard: 'standard',
	        readingLevelFairlyDifficult: 'fairly difficult',
	        readingLevelDifficult: 'difficult',
	        readingLevelVeryDifficult: 'very difficult'
        }
    };
    return translations[lang] || translations.en;
}

showError(error) {
    const content = document.getElementById('emotions-content');
    const currentLang = this.getCurrentLanguage();
    const title = currentLang === 'ru' ? 'Ошибка анализа' : 'Analysis Error';
    let message = error;
    if (error.includes('avgComplexity') || 
        error.includes('Cannot read properties') || 
        error.includes('undefined') ||
        error.includes('syntactic')) {
        message = currentLang === 'ru' ? 'Недостаточно данных для анализа' : 'Not enough data for analysis';
     }
    content.innerHTML = `<div style="color:#f87171;padding:20px;text-align:center;"><h3>${title}</h3><p>${message}</p></div>`;
}
}
if (document.readyState === 'loading') {
document.addEventListener('DOMContentLoaded', () => {
window.emotionsUI = new EmotionsUI();
});
} else {
window.emotionsUI = new EmotionsUI();
}
})();
























