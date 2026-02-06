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
            'peacefulAdj': 'спокойный'
        };
        return translations[emotion] || emotion;
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
            'none': 'отсутствует'
        };
        return translations[theme] || theme;
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
                    <h3>${translations.primaryProfile}</h3>`;
            
            if (this.shouldShowMetric(primaryToneName)) {
                html += `
                    <div class="emotion-metric">
                        <span class="label" title="${translations.primaryToneDesc}">${translations.primaryTone}:</span>
                        <span class="value">${primaryToneName}</span>
                    </div>`;
            }
            
            if (this.shouldShowMetric(primaryToneDesc)) {
                html += `
                    <div class="emotion-metric">
                        <span class="label">${translations.description}:</span>
                        <span class="value" style="display:block;text-align:right;word-break:break-word;margin-top:2px;">${primaryToneDesc}</span>
                    </div>`;
            }
            
            if (this.shouldShowMetric(polarity, true)) {
                html += `
                    <div class="emotion-metric">
                        <span class="label" title="${translations.polarityDesc}">${translations.polarity}:</span>
                        <span class="value">${(polarity * 100).toFixed(1)}%</span>
                    </div>`;
            }
            
            if (this.shouldShowMetric(intensity, true)) {
                html += `
                    <div class="emotion-metric">
                        <span class="label" title="${translations.intensityDesc}">${translations.intensity}:</span>
                        <span class="value">${(intensity * 100).toFixed(1)}%</span>
                    </div>`;
            }
            
            if (this.shouldShowMetric(confidence, true)) {
                html += `
                    <div class="emotion-metric">
                        <span class="label" title="${translations.confidenceDesc}">${translations.confidence}:</span>
                        <span class="value">${(confidence * 100).toFixed(1)}%</span>
                    </div>`;
            }
            
            if (this.shouldShowMetric(consistency, true)) {
                html += `
                    <div class="emotion-metric">
                        <span class="label" title="${translations.consistencyDesc}">${translations.consistency}:</span>
                        <span class="value">${(consistency * 100).toFixed(1)}%</span>
                    </div>`;
            }
            
            if (this.shouldShowMetric(textComplexity, true)) {
                html += `
                    <div class="emotion-metric">
                        <span class="label" title="${translations.textComplexityDesc}">${translations.textComplexity}:</span>
                        <span class="value">${(textComplexity * 100).toFixed(1)}%</span>
                    </div>`;
            }
            
            if (this.shouldShowMetric(complexity, true)) {
                html += `
                    <div class="emotion-metric">
                        <span class="label" title="${translations.complexityDesc}">${translations.complexity}:</span>
                        <span class="value">${(complexity * 100).toFixed(1)}%</span>
                    </div>`;
            }
            
            if (this.shouldShowMetric(emotionalRange, true)) {
                html += `
                    <div class="emotion-metric">
                        <span class="label" title="${translations.emotionalRangeDesc}">${translations.emotionalRange}:</span>
                        <span class="value">${(emotionalRange * 100).toFixed(1)}%</span>
                    </div>`;
            }
            
            if (this.shouldShowMetric(emotionalDepth, true)) {
                html += `
                    <div class="emotion-metric">
                        <span class="label" title="${translations.emotionalDepthDesc}">${translations.emotionalDepth}:</span>
                        <span class="value">${(emotionalDepth * 100).toFixed(1)}%</span>
                    </div>`;
            }
            
            if (this.shouldShowMetric(emotionalTrend)) {
                html += `
                    <div class="emotion-metric">
                        <span class="label" title="${translations.emotionalTrendDesc}">${translations.emotionalTrend}:</span>
                        <span class="value">${this.translateEmotionalTrend(emotionalTrend, currentLang)}</span>
                    </div>`;
            }
            
            if (this.shouldShowMetric(emotionalArc)) {
                html += `
                    <div class="emotion-metric">
                        <span class="label" title="${translations.emotionalArcDesc}">${translations.emotionalArc}:</span>
                        <span class="value">${this.translateEmotionalArc(emotionalArc, currentLang)}</span>
                    </div>`;
            }
            
            if (this.shouldShowMetric(narrative)) {
                html += `
                    <div class="emotion-metric">
                        <span class="label" title="${translations.narrativeDesc}">${translations.narrative}:</span>
                        <span class="value">${this.translateNarrative(narrative, currentLang)}</span>
                    </div>`;
            }
            
            html += `</div>`;
        }

        if (this.hasArrayContent(keywords)) {
            html += `
                <div class="emotion-section">
                    <h3>${translations.keywords}</h3>
                   ${keywords.map(keyword => 
                        `<div class="emotion-metric"><span class="value">${keyword}</span></div>`
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
                        <span class="value">${textLength}</span>
                    </div>`;
            }
            
            if (this.shouldShowMetric(wordCount, true)) {
                html += `
                    <div class="emotion-metric">
                        <span class="label" title="${translations.totalWordsDesc}">${translations.totalWords}:</span>
                        <span class="value">${wordCount}</span>
                    </div>`;
            }
            
            if (this.shouldShowMetric(paragraphCount, true)) {
                html += `
                    <div class="emotion-metric">
                        <span class="label" title="${translations.paragraphsDesc}">${translations.paragraphs}:</span>
                        <span class="value">${paragraphCount}</span>
                    </div>`;
            }
            
            if (this.shouldShowMetric(languageConfidence, true)) {
                html += `
                    <div class="emotion-metric">
                        <span class="label" title="${translations.languageConfidenceDesc}">${translations.languageConfidence}:</span>
                        <span class="value">${(languageConfidence * 100).toFixed(1)}%</span>
                    </div>`;
            }
            
            const emotionalWords = this.getNumber(this.getSafe(result, 'details.lexical.summary.totalEmotionalWords'));
            const lexicalDensity = this.getNumber(this.getSafe(result, 'details.lexical.summary.lexicalDensity'));
            const categoryCount = this.getNumber(this.getSafe(result, 'details.lexical.summary.categoryCount'));
            const dominantCategory = this.getSafe(result, 'details.lexical.summary.dominantCategory');
            const lexicalConcentration = this.getNumber(this.getSafe(result, 'details.lexical.summary.lexicalConcentration'));
            const lexicalRichness = this.getNumber(this.getSafe(result, 'details.lexical.summary.lexicalRichness'));
            const emotionalClusters = this.getNumber(this.getSafe(result, 'details.lexical.clusters.length'));
            const emoticons = this.getSafe(result, 'details.lexical.emoticons', {});
            
            if (this.shouldShowMetric(emotionalWords, true)) {
                html += `
                    <div class="emotion-metric">
                        <span class="label" title="${translations.emotionalWordsDesc}">${translations.emotionalWords}:</span>
                        <span class="value">${emotionalWords}</span>
                    </div>`;
            }
            
            if (this.shouldShowMetric(lexicalDensity, true)) {
                html += `
                    <div class="emotion-metric">
                        <span class="label" title="${translations.lexicalDensityDesc}">${translations.lexicalDensity}:</span>
                        <span class="value">${(lexicalDensity * 100).toFixed(1)}%</span>
                    </div>`;
            }
            
            if (this.shouldShowMetric(categoryCount, true)) {
                html += `
                    <div class="emotion-metric">
                        <span class="label" title="${translations.categoriesFoundDesc}">${translations.categoriesFound}:</span>
                        <span class="value">${categoryCount}</span>
                    </div>`;
            }
            
            if (this.shouldShowMetric(dominantCategory)) {
                html += `
                    <div class="emotion-metric">
                        <span class="label" title="${translations.dominantCategoryDesc}">${translations.dominantCategory}:</span>
                        <span class="value">${this.translateCategory(dominantCategory, currentLang)}</span>
                    </div>`;
            }
            
            if (this.shouldShowMetric(lexicalConcentration, true)) {
                html += `
                    <div class="emotion-metric">
                        <span class="label" title="${translations.lexicalConcentrationDesc}">${translations.lexicalConcentration}:</span>
                        <span class="value">${(lexicalConcentration * 100).toFixed(1)}%</span>
                    </div>`;
            }
            
            if (this.shouldShowMetric(lexicalRichness, true)) {
                html += `
                    <div class="emotion-metric">
                        <span class="label" title="${translations.lexicalRichnessDesc}">${translations.lexicalRichness}:</span>
                        <span class="value">${(lexicalRichness * 100).toFixed(1)}%</span>
                    </div>`;
            }
            
            if (this.shouldShowMetric(emotionalClusters, true)) {
                html += `
                    <div class="emotion-metric">
                        <span class="label" title="${translations.emotionalClustersDesc}">${translations.emotionalClusters}:</span>
                        <span class="value">${emotionalClusters}</span>
                    </div>`;
            }
            
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
                            <span class="value">${emoticonsText}</span>
                        </div>`;
                }
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
                        <span class="value">${sentenceCount}</span>
                    </div>`;
            }
            
            if (this.shouldShowMetric(avgLength, true)) {
                html += `
                    <div class="emotion-metric">
                        <span class="label" title="${translations.avgLengthDesc}">${translations.avgLength}:</span>
                        <span class="value">${avgLength.toFixed(1)} ${translations.words}</span>
                    </div>`;
            }
            
            const allText = this.getSafe(result, 'details.lexical.cleaned', '') || 
                         this.getSafe(result, 'details.lexical.original', '');
            
            const totalPunctuation = this.countAllPunctuation(allText);
            
            if (this.shouldShowMetric(totalPunctuation, true)) {
                html += `
                    <div class="emotion-metric">
                        <span class="label" title="${translations.totalPunctuationDesc}">${translations.totalPunctuation}:</span>
                        <span class="value">${totalPunctuation}</span>
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
                        <span class="value">${emotionalPunctuation}</span>
                    </div>`;
            }
            
            const sentenceTypes = this.getSafe(result, 'details.syntactic.sentenceTypes', {});
            const syntacticComplexity = this.getNumber(this.getSafe(result, 'details.syntactic.complexity'));
            const rhythmRegularity = this.getNumber(this.getSafe(result, 'details.syntactic.rhythm.regularity'));
            const rhythmPattern = this.getSafe(result, 'details.syntactic.rhythm.pattern');
            const rhythmFlow = this.getSafe(result, 'details.syntactic.rhythm.flow');
            const readingLevel = this.getSafe(result, 'details.syntactic.readability.readingLevel');
            const syntacticCoherence = this.getNumber(this.getSafe(result, 'details.syntactic.coherence'));
            
            if (this.shouldShowMetric(sentenceTypes.exclamatory, true)) {
                html += `
                    <div class="emotion-metric">
                        <span class="label" title="${translations.exclamatoryDesc}">${translations.exclamatory}:</span>
                        <span class="value">${sentenceTypes.exclamatory}</span>
                    </div>`;
            }
            
            if (this.shouldShowMetric(sentenceTypes.interrogative, true)) {
                html += `
                    <div class="emotion-metric">
                        <span class="label" title="${translations.interrogativeDesc}">${translations.interrogative}:</span>
                        <span class="value">${sentenceTypes.interrogative}</span>
                    </div>`;
            }
            
            if (this.shouldShowMetric(sentenceTypes.hesitant, true)) {
                html += `
                    <div class="emotion-metric">
                        <span class="label" title="${translations.hesitantDesc}">${translations.hesitant}:</span>
                        <span class="value">${sentenceTypes.hesitant}</span>
                    </div>`;
            }
            
            if (this.shouldShowMetric(sentenceTypes.emphatic, true)) {
                html += `
                    <div class="emotion-metric">
                        <span class="label" title="${translations.emphaticDesc}">${translations.emphatic}:</span>
                        <span class="value">${sentenceTypes.emphatic}</span>
                    </div>`;
            }
            
            if (this.shouldShowMetric(sentenceTypes.imperative, true)) {
                html += `
                    <div class="emotion-metric">
                        <span class="label" title="${translations.imperativeDesc}">${translations.imperative}:</span>
                        <span class="value">${sentenceTypes.imperative}</span>
                    </div>`;
            }
            
            if (this.shouldShowMetric(sentenceTypes.hyperbolic, true)) {
                html += `
                    <div class="emotion-metric">
                        <span class="label" title="${translations.hyperbolicDesc}">${translations.hyperbolic}:</span>
                        <span class="value">${sentenceTypes.hyperbolic}</span>
                    </div>`;
            }
            
            if (this.shouldShowMetric(sentenceTypes.poetic, true)) {
                html += `
                    <div class="emotion-metric">
                        <span class="label" title="${translations.poeticDesc}">${translations.poetic}:</span>
                        <span class="value">${sentenceTypes.poetic}</span>
                    </div>`;
            }
            
            if (this.shouldShowMetric(syntacticComplexity, true)) {
                html += `
                    <div class="emotion-metric">
                        <span class="label" title="${translations.complexityDesc}">${translations.complexity}:</span>
                        <span class="value">${syntacticComplexity.toFixed(2)}</span>
                    </div>`;
            }
            
            if (this.shouldShowMetric(rhythmRegularity, true)) {
                html += `
                    <div class="emotion-metric">
                        <span class="label" title="${translations.rhythmDesc}">${translations.rhythm}:</span>
                        <span class="value">${rhythmRegularity.toFixed(2)}</span>
                    </div>`;
            }
            
            if (this.shouldShowMetric(rhythmPattern)) {
                html += `
                    <div class="emotion-metric">
                        <span class="label" title="${translations.rhythmPatternDesc}">${translations.rhythmPattern}:</span>
                        <span class="value">${this.translateRhythmPattern(rhythmPattern, currentLang)}</span>
                    </div>`;
            }
            
            if (this.shouldShowMetric(rhythmFlow)) {
                html += `
                    <div class="emotion-metric">
                        <span class="label" title="${translations.rhythmFlowDesc}">${translations.rhythmFlow}:</span>
                        <span class="value">${this.translateRhythmFlow(rhythmFlow, currentLang)}</span>
                    </div>`;
            }
            
            if (this.shouldShowMetric(readingLevel)) {
                html += `
                    <div class="emotion-metric">
                        <span class="label" title="${translations.readabilityDesc}">${translations.readability}:</span>
                        <span class="value">${this.translateReadability(readingLevel, currentLang)}</span>
                    </div>`;
            }
            
            if (this.shouldShowMetric(syntacticCoherence, true)) {
                html += `
                    <div class="emotion-metric">
                        <span class="label" title="${translations.syntacticCoherenceDesc}">${translations.syntacticCoherence}:</span>
                        <span class="value">${(syntacticCoherence * 100).toFixed(1)}%</span>
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
                        <span class="value">${contextualIndicators.negations}</span>
                    </div>`;
            }
            
            if (this.shouldShowMetric(contextualIndicators.intensifiers, true)) {
                html += `
                    <div class="emotion-metric">
                        <span class="label" title="${translations.intensifiersDesc}">${translations.intensifiers}:</span>
                        <span class="value">${contextualIndicators.intensifiers}</span>
                    </div>`;
            }
            
            if (this.shouldShowMetric(contextualIndicators.diminutives, true)) {
                html += `
                    <div class="emotion-metric">
                        <span class="label" title="${translations.diminutivesDesc}">${translations.diminutives}:</span>
                        <span class="value">${contextualIndicators.diminutives}</span>
                    </div>`;
            }
            
            if (this.shouldShowMetric(contextualIndicators.augmentatives, true)) {
                html += `
                    <div class="emotion-metric">
                        <span class="label" title="${translations.augmentativesDesc}">${translations.augmentatives}:</span>
                        <span class="value">${contextualIndicators.augmentatives}</span>
                    </div>`;
            }
            
            if (this.shouldShowMetric(contextualIndicators.irony, true)) {
                html += `
                    <div class="emotion-metric">
                        <span class="label" title="${translations.ironyDesc}">${translations.irony}:</span>
                        <span class="value">${contextualIndicators.irony}</span>
                    </div>`;
            }
            
            if (this.shouldShowMetric(contextualIndicators.contrasts, true)) {
                html += `
                    <div class="emotion-metric">
                        <span class="label" title="${translations.contrastsDesc}">${translations.contrasts}:</span>
                        <span class="value">${contextualIndicators.contrasts}</span>
                    </div>`;
            }
            
            if (this.shouldShowMetric(contextualIndicators.rhetorical, true)) {
                html += `
                    <div class="emotion-metric">
                        <span class="label" title="${translations.rhetoricalDesc}">${translations.rhetorical}:</span>
                        <span class="value">${contextualIndicators.rhetorical}</span>
                    </div>`;
            }
            
            if (this.shouldShowMetric(contextualIndicators.hyperbole, true)) {
                html += `
                    <div class="emotion-metric">
                        <span class="label" title="${translations.hyperboleDesc}">${translations.hyperbole}:</span>
                        <span class="value">${contextualIndicators.hyperbole}</span>
                    </div>`;
            }
            
            if (this.shouldShowMetric(contextualIndicators.understatement, true)) {
                html += `
                    <div class="emotion-metric">
                        <span class="label" title="${translations.understatementDesc}">${translations.understatement}:</span>
                        <span class="value">${contextualIndicators.understatement}</span>
                    </div>`;
            }
            
            if (this.shouldShowMetric(contextualCoherence, true)) {
                html += `
                    <div class="emotion-metric">
                        <span class="label" title="${translations.contextualCoherenceDesc}">${translations.contextualCoherence}:</span>
                        <span class="value">${(contextualCoherence * 100).toFixed(1)}%</span>
                    </div>`;
            }
            
            if (this.shouldShowMetric(contextualConsistency, true)) {
                html += `
                    <div class="emotion-metric">
                        <span class="label" title="${translations.contextualConsistencyDesc}">${translations.contextualConsistency}:</span>
                        <span class="value">${(contextualConsistency * 100).toFixed(1)}%</span>
                    </div>`;
            }
            
            if (this.shouldShowMetric(toneVariation, true)) {
                html += `
                    <div class="emotion-metric">
                        <span class="label" title="${translations.toneVariationDesc}">${translations.toneVariation}:</span>
                        <span class="value">${(toneVariation * 100).toFixed(1)}%</span>
                    </div>`;
            }
            
            html += `</div>`;
        }

        const culturalReferences = this.getSafe(result, 'details.cultural.references', {});
        const culturalScores = this.getSafe(result, 'details.cultural.scores', {});
        const culturalCoherenceVal = this.getNumber(this.getSafe(result, 'details.cultural.culturalCoherence'));
        const dominantCulturalTheme = this.getSafe(result, 'details.cultural.dominantCulturalTheme');

        const hasCulturalData = Object.keys(culturalReferences).length > 0 || 
                                Object.keys(culturalScores).length > 0 ||
                                this.shouldShowMetric(culturalCoherenceVal, true);

        if (hasCulturalData) {
            html += `
                <div class="emotion-section">
                    <h3>${translations.culturalAnalysis}</h3>`;
            
            if (culturalReferences.literary && this.shouldShowMetric(culturalReferences.literary.count, true)) {
                html += `
                    <div class="emotion-metric">
                        <span class="label" title="${translations.literaryDesc}">${translations.literary}:</span>
                        <span class="value">${culturalReferences.literary.count}</span>
                    </div>`;
            }
            
            if (culturalReferences.historical && this.shouldShowMetric(culturalReferences.historical.count, true)) {
                html += `
                    <div class="emotion-metric">
                        <span class="label" title="${translations.historicalDesc}">${translations.historical}:</span>
                        <span class="value">${culturalReferences.historical.count}</span>
                    </div>`;
            }
            
            if (culturalReferences.mythological && this.shouldShowMetric(culturalReferences.mythological.count, true)) {
                html += `
                    <div class="emotion-metric">
                        <span class="label" title="${translations.mythologicalDesc}">${translations.mythological}:</span>
                        <span class="value">${culturalReferences.mythological.count}</span>
                    </div>`;
            }
            
            if (culturalReferences.traditional && this.shouldShowMetric(culturalReferences.traditional.count, true)) {
                html += `
                    <div class="emotion-metric">
                        <span class="label" title="${translations.traditionalDesc}">${translations.traditional}:</span>
                        <span class="value">${culturalReferences.traditional.count}</span>
                    </div>`;
            }
            
            if (culturalReferences.idioms && this.shouldShowMetric(culturalReferences.idioms.count, true)) {
                html += `
                    <div class="emotion-metric">
                        <span class="label" title="${translations.idiomsDesc}">${translations.idioms}:</span>
                        <span class="value">${culturalReferences.idioms.count}</span>
                    </div>`;
            }
            
            if (culturalReferences.poetic && this.shouldShowMetric(culturalReferences.poetic.count, true)) {
                html += `
                    <div class="emotion-metric">
                        <span class="label" title="${translations.poeticDesc}">${translations.poetic}:</span>
                        <span class="value">${culturalReferences.poetic.count}</span>
                    </div>`;
            }
            
            if (this.shouldShowMetric(culturalScores.culturalDepth, true)) {
                html += `
                    <div class="emotion-metric">
                        <span class="label" title="${translations.culturalDepthDesc}">${translations.culturalDepth}:</span>
                        <span class="value">${(culturalScores.culturalDepth * 100).toFixed(1)}%</span>
                    </div>`;
            }
            
            if (this.shouldShowMetric(culturalScores.intertextuality, true)) {
                html += `
                    <div class="emotion-metric">
                        <span class="label" title="${translations.intertextualityDesc}">${translations.intertextuality}:</span>
                        <span class="value">${(culturalScores.intertextuality * 100).toFixed(1)}%</span>
                    </div>`;
            }
            
            if (this.shouldShowMetric(culturalCoherenceVal, true)) {
                html += `
                    <div class="emotion-metric">
                        <span class="label" title="${translations.culturalCoherenceDesc}">${translations.culturalCoherence}:</span>
                        <span class="value">${(culturalCoherenceVal * 100).toFixed(1)}%</span>
                    </div>`;
            }
            
            if (this.shouldShowMetric(dominantCulturalTheme)) {
                html += `
                    <div class="emotion-metric">
                        <span class="label" title="${translations.dominantCulturalThemeDesc}">${translations.dominantCulturalTheme}:</span>
                        <span class="value">${this.translateCulturalTheme(dominantCulturalTheme, currentLang)}</span>
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
            
            if (this.shouldShowMetric(semanticDetails.density, true)) {
                html += `
                    <div class="emotion-metric">
                        <span class="label" title="${translations.semanticDensityDesc}">${translations.semanticDensity}:</span>
                        <span class="value">${(semanticDetails.density * 100).toFixed(1)}%</span>
                    </div>`;
            }
            
            if (this.shouldShowMetric(semanticDetails.semanticRichness, true)) {
                html += `
                    <div class="emotion-metric">
                        <span class="label" title="${translations.semanticRichnessDesc}">${translations.semanticRichness}:</span>
                        <span class="value">${(semanticDetails.semanticRichness * 100).toFixed(1)}%</span>
                    </div>`;
            }
            
            if (this.shouldShowMetric(semanticDetails.coherence, true)) {
                html += `
                    <div class="emotion-metric">
                        <span class="label" title="${translations.semanticCoherenceDesc}">${translations.semanticCoherence}:</span>
                        <span class="value">${(semanticDetails.coherence * 100).toFixed(1)}%</span>
                    </div>`;
            }
            
            if (semanticDetails.abstraction && semanticDetails.abstraction.description) {
                html += `
                    <div class="emotion-metric">
                        <span class="label" title="${translations.abstractionLevelDesc}">${translations.abstractionLevel}:</span>
                        <span class="value">${this.translateAbstraction(semanticDetails.abstraction.description, currentLang)}</span>
                    </div>`;
            }
            
            if (semanticDetails.clusters && this.shouldShowMetric(semanticDetails.clusters.length, true)) {
                html += `
                    <div class="emotion-metric">
                        <span class="label" title="${translations.semanticClustersDesc}">${translations.semanticClusters}:</span>
                        <span class="value">${semanticDetails.clusters.length}</span>
                    </div>`;
            }
            
            if (semanticThematic.dominant) {
                html += `
                    <div class="emotion-metric">
                        <span class="label" title="${translations.thematicDominantDesc}">${translations.thematicDominant}:</span>
                        <span class="value">${this.translateThematicDominant(semanticThematic.dominant, currentLang)}</span>
                    </div>`;
            }
            
            if (this.shouldShowMetric(semanticThematic.complexity, true)) {
                html += `
                    <div class="emotion-metric">
                        <span class="label" title="${translations.thematicComplexityDesc}">${translations.thematicComplexity}:</span>
                        <span class="value">${(semanticThematic.complexity * 100).toFixed(1)}%</span>
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
                        <span class="value">${this.translatePlutchikEmotion(plutchikDetails.primary.emotion, currentLang)}</span>
                    </div>`;
            }
            
            if (this.shouldShowMetric(plutchikDetails.emotionalDiversity, true)) {
                html += `
                    <div class="emotion-metric">
                        <span class="label" title="${translations.plutchikDiversityDesc}">${translations.plutchikDiversity}:</span>
                        <span class="value">${(plutchikDetails.emotionalDiversity * 100).toFixed(1)}%</span>
                    </div>`;
            }
            
            if (maslowDetails.dominant && maslowDetails.dominant.level) {
                html += `
                    <div class="emotion-metric">
                        <span class="label" title="${translations.dominantMaslowDesc}">${translations.dominantMaslow}:</span>
                        <span class="value">${this.translateMaslowLevel(maslowDetails.dominant.level, currentLang)}</span>
                    </div>`;
            }
            
            if (this.shouldShowMetric(maslowDetails.hierarchyCompletion, true)) {
                html += `
                    <div class="emotion-metric">
                        <span class="label" title="${translations.hierarchyCompletionDesc}">${translations.hierarchyCompletion}:</span>
                        <span class="value">${(maslowDetails.hierarchyCompletion * 100).toFixed(1)}%</span>
                    </div>`;
            }
            
            if (bigFiveDetails.profile && bigFiveDetails.profile.type) {
                html += `
                    <div class="emotion-metric">
                        <span class="label" title="${translations.personalityTypeDesc}">${translations.personalityType}:</span>
                        <span class="value">${this.translatePersonalityType(bigFiveDetails.profile.type, currentLang)}</span>
                    </div>`;
            }
            
            if (bigFiveDetails.profile && bigFiveDetails.profile.dominantTraits && 
                this.hasArrayContent(bigFiveDetails.profile.dominantTraits)) {
                html += `
                    <div class="emotion-metric">
                        <span class="label" title="${translations.dominantTraitsDesc}">${translations.dominantTraits}:</span>
                        <span class="value">${bigFiveDetails.profile.dominantTraits.map(trait => 
                            this.translateBigFiveTrait(trait, currentLang)
                        ).join(', ')}</span>
                    </div>`;
            }
            
            if (this.shouldShowMetric(bigFiveDetails.complexity, true)) {
                html += `
                    <div class="emotion-metric">
                        <span class="label" title="${translations.bigFiveComplexityDesc}">${translations.bigFiveComplexity}:</span>
                        <span class="value">${(bigFiveDetails.complexity * 100).toFixed(1)}%</span>
                    </div>`;
            }
            
            if (emotionalIntelligenceDetails.level) {
                html += `
                    <div class="emotion-metric">
                        <span class="label" title="${translations.emotionalIntelligenceDesc}">${translations.emotionalIntelligence}:</span>
                        <span class="value">${this.translateEmotionalIntelligence(emotionalIntelligenceDetails.level, currentLang)}</span>
                    </div>`;
            }
            
            if (this.shouldShowMetric(emotionalIntelligenceDetails.score, true)) {
                html += `
                    <div class="emotion-metric">
                        <span class="label" title="${translations.eiScoreDesc}">${translations.eiScore}:</span>
                        <span class="value">${(emotionalIntelligenceDetails.score * 100).toFixed(1)}%</span>
                    </div>`;
            }
            
            if (defenseMechanismsDetails.primaryMechanism) {
                html += `
                    <div class="emotion-metric">
                        <span class="label" title="${translations.primaryDefenseDesc}">${translations.primaryDefense}:</span>
                        <span class="value">${this.translateDefenseMechanism(defenseMechanismsDetails.primaryMechanism, currentLang)}</span>
                    </div>`;
            }
            
            if (this.shouldShowMetric(defenseMechanismsDetails.overallIntensity, true)) {
                html += `
                    <div class="emotion-metric">
                        <span class="label" title="${translations.defenseIntensityDesc}">${translations.defenseIntensity}:</span>
                        <span class="value">${(defenseMechanismsDetails.overallIntensity * 100).toFixed(1)}%</span>
                    </div>`;
            }
            
            if (this.shouldShowMetric(psychologicalDetails.psychologicalComplexity, true)) {
                html += `
                    <div class="emotion-metric">
                        <span class="label" title="${translations.psychologicalComplexityDesc}">${translations.psychologicalComplexity}:</span>
                        <span class="value">${(psychologicalDetails.psychologicalComplexity * 100).toFixed(1)}%</span>
                    </div>`;
            }
            
            if (selfAwarenessDetails.level) {
                html += `
                    <div class="emotion-metric">
                        <span class="label" title="${translations.selfAwarenessLevelDesc}">${translations.selfAwarenessLevel}:</span>
                        <span class="value">${this.translateSelfAwareness(selfAwarenessDetails.level, currentLang)}</span>
                    </div>`;
            }
            
            if (this.shouldShowMetric(selfAwarenessDetails.score, true)) {
                html += `
                    <div class="emotion-metric">
                        <span class="label" title="${translations.selfAwarenessScoreDesc}">${translations.selfAwarenessScore}:</span>
                        <span class="value">${(selfAwarenessDetails.score * 100).toFixed(1)}%</span>
                    </div>`;
            }
            
            html += `</div>`;
        }

        const psychologicalInsights = this.getSafe(result, 'psychologicalInsights', {});

        if (psychologicalInsights && psychologicalInsights.insights) {
            const insights = psychologicalInsights.insights;
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
                            <span class="value" style="display:block;text-align:right;word-break:break-word;margin-top:2px;">${insights.emotionalPatterns.join(', ')}</span>
                        </div>`;
                }
                
                if (insights.cognitiveStyle && insights.cognitiveStyle.style) {
                    html += `
                        <div class="emotion-metric">
                            <span class="label" title="${translations.cognitiveStyleDesc}">${translations.cognitiveStyle}:</span>
                            <span class="value" style="display:block;text-align:right;word-break:break-word;margin-top:2px;">${this.translateCognitiveStyle(insights.cognitiveStyle.style, currentLang)}</span>
                        </div>`;
                }
                
                if (this.hasArrayContent(insights.relationalPatterns)) {
                    html += `
                        <div class="emotion-metric">
                            <span class="label" title="${translations.relationsDesc}">${translations.relations}:</span>
                            <span class="value" style="display:block;text-align:right;word-break:break-word;margin-top:2px;">${insights.relationalPatterns.join(', ')}</span>
                        </div>`;
                }
                
                if (this.hasArrayContent(insights.personalGrowth)) {
                    html += `
                        <div class="emotion-metric">
                            <span class="label" title="${translations.growthPathsDesc}">${translations.growthPaths}:</span>
                            <span class="value" style="display:block;text-align:right;word-break:break-word;margin-top:2px;">${insights.personalGrowth.join(', ')}</span>
                        </div>`;
                }
                
                if (this.hasArrayContent(insights.therapeuticApproaches)) {
                    html += `
                        <div class="emotion-metric">
                            <span class="label" title="${translations.therapeuticApproachesDesc}">${translations.therapeuticApproaches}:</span>
                            <span class="value" style="display:block;text-align:right;word-break:break-word;margin-top:2px;">${insights.therapeuticApproaches.join(', ')}</span>
                        </div>`;
                }
                
                html += `</div>`;
            }
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

        const language = this.getSafe(result, 'language', 'en');
        const readingTime = this.getNumber(this.getSafe(result, 'metrics.readingTime', 0));
        const timestamp = this.getSafe(result, 'timestamp', Date.now());
        const processingTime = this.getNumber(this.getSafe(result, 'metrics.processingTime', 0));

        html += `
            <div class="emotion-section">
                <h3>${translations.processingInfo}</h3>
                <div class="emotion-metric">
                    <span class="label">${translations.language}:</span>
                    <span class="value">${language.toUpperCase()}</span>
                </div>`;

        if (this.shouldShowMetric(readingTime, true) && readingTime > 0) {
            html += `
                <div class="emotion-metric">
                    <span class="label">${translations.readingTime}:</span>
                    <span class="value">${this.formatReadingTime(readingTime)}</span>
                </div>`;
        }

        html += `
                <div class="emotion-metric">
                    <span class="label">${translations.timestamp}:</span>
                    <span>${this.formatTimestamp(timestamp)}</span>
                </div>`;

        if (this.shouldShowMetric(processingTime, true) && processingTime > 0) {
            html += `
                <div class="emotion-metric">
                    <span class="label">${translations.processingTime}:</span>
                    <span class="value">${this.formatProcessingTime(processingTime)}</span>
                </div>`;
        }

        html += `
                <div class="emotion-metric">
                    <span class="label">${translations.analysisVersion}:</span>
                    <span class="value">1.0</span>
                </div>
            </div>
       `;

        content.innerHTML = html;
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
            'gratitude': 'благодарность',
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
            'resilience': 'стойкость'
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
    
    translateReadability(level, lang) {
        if (lang !== 'ru') return level;
        const translations = {
            'very easy': 'очень легко',
            'easy': 'легко',
            'fairly easy': 'довольно легко',
            'standard': 'стандартно',
            'fairly difficult': 'довольно сложно',
            'difficult': 'сложно',
            'very difficult': 'очень сложно'
        };
        return translations[level] || level;
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
            'balanced': 'сбалансированные'
        };
        return translations[level] || level;
    }
    
    translatePersonalityType(type, lang) {
        if (lang !== 'ru') return type;
        const translations = {
            'balanced': 'сбалансированный',
            'introverted': 'интровертированный',
            'extroverted': 'экстравертированный',
            'analytical': 'аналитический',
            'emotional': 'эмоциональный',
            'practical': 'прагматичный',
            'creative': 'креативный',
            'intuitive': 'интуитивный'
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
    
    translateCognitiveStyle(style, lang) {
        if (lang !== 'ru') return style;
        const translations = {
            'reflective': 'рефлексивный',
            'impulsive': 'импульсивный',
            'analytical': 'аналитический',
            'intuitive': 'интуитивный',
            'balanced': 'сбалансированный',
            'creative': 'креативный',
            'practical': 'прагматичный'
        };
        return translations[style] || style;
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
                descriptionText: 'Сдержанное богатое эмоциональное переживание',
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
                emoticonsDesc: 'Эмоциональные смайлики в тексте',
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
                totalPunctuation: 'Всего знаков препинания',
                totalPunctuationDesc: 'Общее количество знаков препинания в тексте',
                emotionalPunctuation: 'Эмоциональные знаки',
                emotionalPunctuationDesc: 'Знаки препинания с эмоциональной окраской',
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
                criticalRepetitions: 'Критические повторы'
            },
            en: {
                primaryProfile: 'Primary Profile',
                primaryTone: 'Emotional Spectrum',
                primaryToneDesc: 'Main emotional tone of the text',
                description: 'Emotional Spectrum',
                descriptionText: 'Restrained rich emotional experience',
                emotionalPatterns: 'moderate emotional expressiveness',
                cognitiveStyle: 'reflective',
                relations: 'balanced communication style',
                growthPaths: 'expanding emotional repertoire, developing psychological awareness',
                therapeuticApproaches: 'general strengthening psychotherapy',
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
                emotionalPunctuation: 'Emotional Punctuation',
                emotionalPunctuationDesc: 'Punctuation marks with emotional coloring',
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
                criticalRepetitions: 'Critical repetitions'
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
