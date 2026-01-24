(function() {
    'use strict';
    
    const CONFIG = {
        VERSION: '4.3',
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
                    'любовь', 'радость', 'счастье', 'добро', 'мир', 'надежда', 'мечта', 'свет', 'тепло', 
                    'улыбка', 'друг', 'семья', 'солнце', 'весна', 'праздник', 'успех', 'победа', 'красота', 
                    'гармония', 'благополучие', 'щедрость', 'верность', 'честность', 'мудрость', 'свобода', 
                    'приключение', 'открытие', 'вдохновение', 'творчество', 'энергия', 'жизнь', 'здоровье', 
                    'благодарность', 'спокойствие', 'уют', 'комфорт', 'ласка', 'нежность', 'страсть', 'восторг',
                    'ликование', 'триумф', 'согласие', 'единство', 'дружба', 'поддержка', 'забота', 'опека',
                    'восхищение', 'признание', 'почет', 'уважение', 'доверие', 'понимание', 'сочувствие'
                ],
                en: [
                    'love', 'joy', 'happy', 'peace', 'hope', 'dream', 'light', 'warm', 'smile', 'friend', 
                    'family', 'sun', 'spring', 'celebration', 'success', 'victory', 'beauty', 'harmony', 
                    'wellbeing', 'generosity', 'loyalty', 'honesty', 'wisdom', 'freedom', 'adventure', 
                    'discovery', 'inspiration', 'creativity', 'energy', 'life', 'health', 'gratitude', 
                    'calm', 'cozy', 'comfort', 'affection', 'tenderness', 'passion', 'delight', 'ecstasy',
                    'triumph', 'agreement', 'unity', 'friendship', 'support', 'care', 'guardianship',
                    'admiration', 'recognition', 'honor', 'respect', 'trust', 'understanding', 'compassion'
                ]
            },
            darkWords: {
                ru: [
                    'грусть', 'боль', 'смерть', 'тьма', 'страх', 'одиночество', 'тоска', 'печаль', 
                    'разочарование', 'потеря', 'ночь', 'зима', 'дождь', 'горе', 'беда', 'несчастье', 
                    'трагедия', 'катастрофа', 'агония', 'мучение', 'пытка', 'истязание', 'унижение', 
                    'предательство', 'измена', 'ложь', 'обман', 'ненависть', 'злоба', 'ярость', 'гнев', 
                    'ревность', 'зависть', 'жадность', 'скупость', 'эгоизм', 'равнодушие', 'холод', 
                    'лед', 'мороз', 'туман', 'туча', 'гроза', 'ураган', 'разрушение', 'крах', 'провал',
                    'поражение', 'позор', 'стыд', 'вина', 'раскаяние', 'сожаление', 'отчаяние', 'безысходность'
                ],
                en: [
                    'sad', 'pain', 'death', 'dark', 'fear', 'lonely', 'sorrow', 'disappointment', 
                    'loss', 'night', 'winter', 'rain', 'grief', 'trouble', 'misfortune', 'tragedy', 
                    'disaster', 'agony', 'torment', 'torture', 'humiliation', 'betrayal', 'treason', 
                    'lie', 'deception', 'hatred', 'malice', 'rage', 'anger', 'jealousy', 'envy', 
                    'greed', 'stinginess', 'selfishness', 'indifference', 'cold', 'ice', 'frost', 
                    'fog', 'cloud', 'storm', 'hurricane', 'destruction', 'collapse', 'failure',
                    'defeat', 'shame', 'guilt', 'remorse', 'regret', 'despair', 'hopelessness'
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
            if (warmCount > darkCount * 1.5) return 'warm';
            if (darkCount > warmCount * 1.5) return 'dark';
            if (warmCount > darkCount) return 'warmish';
            if (darkCount > warmCount) return 'darkish';
            return 'balanced';
        }
        
        escapeRegExp(string) {
            return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        }
        
        getColorPalette() {
            switch(this.sensitivity) {
                case 'warm':
                    return [
                        '#FF6B6B', '#FF8E53', '#FFD166', '#06D6A0', '#118AB2', '#EF476F', '#FF9A76', '#FFD97D',
                        '#83D483', '#4ECDC4', '#FF6B8B', '#FF9F68', '#FFE277', '#2DD4BF', '#0EA5E9', '#F43F5E',
                        '#FF8A65', '#FFCA3A', '#8AC926', '#1982C4', '#FF595E', '#FF924C', '#FFCA3A', '#8AC926',
                        '#6A4C93', '#1982C4', '#FF5D8F', '#FF9E6D', '#FFE156', '#38B000', '#00BBF9', '#F72585',
                        '#FF7D00', '#FFBD00', '#3A86FF', '#8338EC', '#FF006E', '#FB5607', '#FFBE0B', '#3A86FF',
                        '#FF5A8C', '#FF9670', '#FFE045', '#52B788', '#0096C7', '#E63946', '#FF8C42', '#F9C74F',
                        '#43AA8B', '#577590', '#FF6B8B', '#FF9F68', '#FFE277', '#2DD4BF', '#0EA5E9', '#F43F5E'
                    ];
                case 'warmish':
                    return [
                        '#FF9A76', '#FFB997', '#FFD6A5', '#CAFFBF', '#9BF6FF', '#A0C4FF', '#BDB2FF', '#FFC6FF',
                        '#FFADAD', '#FFD6A5', '#FFB5A7', '#FFC8A2', '#FFE4B5', '#D8F3DC', '#B5EAD7', '#C7F9CC',
                        '#A2D2FF', '#BDE0FE', '#CDB4DB', '#FFAFCC', '#FFC8DD', '#FFD7BA', '#FFE5D9', '#FEC89A',
                        '#FFB4A2', '#E5989B', '#B5838D', '#6D6875', '#FFB7C3', '#FFDAC1', '#E2F0CB', '#B5EAD7',
                        '#C7CEEA', '#FFD6E0', '#FF9AA2', '#FFB7B2', '#FFDAC1', '#E2F0CB', '#B5EAD7', '#C7CEEA',
                        '#FF9AA2', '#FFB7B2', '#FFDAC1', '#E2F0CB', '#B5EAD7', '#C7CEEA', '#FF9AA2', '#FFB7B2',
                        '#FFDAC1', '#E2F0CB', '#B5EAD7', '#C7CEEA', '#FF9AA2', '#FFB7B2', '#FFDAC1', '#E2F0CB'
                    ];
                case 'dark':
                    return [
                        '#2F2F2F', '#4A4A4A', '#696969', '#808080', '#A9A9A9', '#36454F', '#4F5D6A', '#65737E',
                        '#7B8793', '#919BA6', '#1C1C1C', '#363636', '#525252', '#6E6E6E', '#8A8A8A', '#2C3E50',
                        '#34495E', '#5D6D7E', '#7F8C8D', '#95A5A6', '#0D0D0D', '#262626', '#404040', '#5C5C5C',
                        '#787878', '#212121', '#424242', '#616161', '#757575', '#9E9E9E', '#121212', '#2D2D2D',
                        '#484848', '#636363', '#7E7E7E', '#17202A', '#2C3E50', '#566573', '#7B7D7D', '#99A3A4',
                        '#0A0A0A', '#1F1F1F', '#343434', '#4F4F4F', '#6A6A6A', '#141414', '#2E2E2E', '#494949',
                        '#646464', '#7F7F7F', '#191919', '#333333', '#4E4E4E', '#696969', '#848484', '#1E1E1E'
                    ];
                case 'darkish':
                    return [
                        '#555555', '#777777', '#999999', '#BBBBBB', '#DDDDDD', '#6B6B6B', '#8C8C8C', '#ADADAD',
                        '#CECECE', '#EFEFEF', '#666666', '#888888', '#AAAAAA', '#CCCCCC', '#EEEEEE', '#5E5E5E',
                        '#7F7F7F', '#A0A0A0', '#C1C1C1', '#E2E2E2', '#707070', '#919191', '#B2B2B2', '#D3D3D3',
                        '#F4F4F4', '#626262', '#838383', '#A4A4A4', '#C5C5C5', '#E6E6E6', '#747474', '#959595',
                        '#B6B6B6', '#D7D7D7', '#F8F8F8', '#686868', '#898989', '#AAAAAA', '#CBCBCB', '#ECECEC',
                        '#727272', '#939393', '#B4B4B4', '#D5D5D5', '#F6F6F6', '#767676', '#979797', '#B8B8B8',
                        '#D9D9D9', '#FAFAFA', '#7A7A7A', '#9B9B9B', '#BCBCBC', '#DDDDDD', '#FEFEFE', '#7E7E7E'
                    ];
                case 'balanced':
                    return [
                        '#667eea', '#764ba2', '#6B8DD6', '#8E37D7', '#00d2ff', '#3a7bd5', '#834d9b', '#d04ed6',
                        '#FF416C', '#FF4B2B', '#5A67D8', '#9F7AEA', '#4299E1', '#0BC5EA', '#00B5D8', '#00CCBB',
                        '#38B2AC', '#319795', '#4FD1C5', '#81E6D9', '#D53F8C', '#ED64A6', '#F687B3', '#FC8181',
                        '#F56565', '#E53E3E', '#DD6B20', '#ED8936', '#F6AD55', '#FBD38D', '#68D391', '#48BB78',
                        '#38A169', '#2F855A', '#276749', '#805AD5', '#6B46C1', '#553C9A', '#44337A', '#322659',
                        '#4C51BF', '#434190', '#3C366B', '#2D3748', '#1A202C', '#718096', '#A0AEC0', '#CBD5E0',
                        '#E2E8F0', '#EDF2F7', '#F7FAFC', '#FFFFFF', '#000000', '#1A365D', '#2D3748', '#4A5568'
                    ];
                default:
                    return [
                        '#667eea', '#764ba2', '#6B8DD6', '#8E37D7', '#00d2ff', '#3a7bd5', '#834d9b', '#d04ed6',
                        '#FF416C', '#FF4B2B', '#5A67D8', '#9F7AEA', '#4299E1', '#0BC5EA', '#00B5D8', '#00CCBB',
                        '#38B2AC', '#319795', '#4FD1C5', '#81E6D9', '#D53F8C', '#ED64A6', '#F687B3', '#FC8181',
                        '#F56565', '#E53E3E', '#DD6B20', '#ED8936', '#F6AD55', '#FBD38D', '#68D391', '#48BB78',
                        '#38A169', '#2F855A', '#276749', '#805AD5', '#6B46C1', '#553C9A', '#44337A', '#322659',
                        '#4C51BF', '#434190', '#3C366B', '#2D3748', '#1A202C', '#718096', '#A0AEC0', '#CBD5E0',
                        '#E2E8F0', '#EDF2F7', '#F7FAFC', '#FFFFFF', '#000000', '#1A365D', '#2D3748', '#4A5568'
                    ];
            }
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
            lines.push('semantic visualization of your text');
            lines.push(`id: ${this.sessionId}`);
            if (this.text.length > 0) {
                lines.push(`symbols: ${this.stats.symbols}`);
                lines.push(`words: ${this.stats.words}`);
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
            for (let i = 0; i < count; i++) {
                const angle = (i / count) * Math.PI * 2;
                const radius = (i % 5 + 1) * (maxRadius / 5);
                const particleSize = 1 + Math.random() * 3;
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
            for (let i = 0; i < count; i++) {
                const angle = (i / count) * Math.PI * 2;
                const distance = 30 + (i % 5) * 15;
                const baseSize = 1.5 + Math.random() * 3;
                const particleSize = Math.min(baseSize, 4.5);
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
            this.particles.forEach((particle, index) => {
                if (particle.trail.length > this.performance.trailLength) {
                    particle.trail.shift();
                }
                particle.trail.push({ x: particle.x, y: particle.y });
                this.applyBehavior(particle, index);
                this.applyPhysics(particle, physics);
                if (this.interactionPoint.active) {
                    this.applyInteraction(particle);
                }
                particle.x += particle.vx * physics.timeScale;
                particle.y += particle.vy * physics.timeScale;
                particle.vx *= physics.viscosity;
                particle.vy *= physics.viscosity;
                this.handleBoundaries(particle);
            });
        }
        
        applyBehavior(particle, index) {
            const behaviors = this.session.behaviors;
            const time = this.time;
            behaviors.forEach(behavior => {
                switch(behavior) {
                    case 'orbit':
                        if (particle.orbitRadius) {
                            particle.orbitAngle += particle.orbitSpeed;
                            const centerX = this.canvas.width / 2 / (window.devicePixelRatio || 1);
                            const centerY = this.canvas.height / 2 / (window.devicePixelRatio || 1);
                            const targetX = centerX + Math.cos(particle.orbitAngle) * particle.orbitRadius;
                            const targetY = centerY + Math.sin(particle.orbitAngle) * particle.orbitRadius;
                            particle.vx += (targetX - particle.x) * 0.02;
                            particle.vy += (targetY - particle.y) * 0.02;
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
                                particle.vx += dx * 0.002;
                                particle.vy += dy * 0.002;
                            }
                        }
                        break;
                    case 'wave':
                        particle.vy += Math.sin(time + particle.x * 0.02) * 0.15;
                        particle.vx += Math.cos(time + particle.y * 0.02) * 0.15;
                        break;
                    case 'chaos':
                        particle.vx += (Math.random() - 0.5) * 0.3;
                        particle.vy += (Math.random() - 0.5) * 0.3;
                        break;
                    case 'spiral':
                        const centerX = this.canvas.width / 2 / (window.devicePixelRatio || 1);
                        const centerY = this.canvas.height / 2 / (window.devicePixelRatio || 1);
                        const angle = Math.atan2(particle.y - centerY, particle.x - centerX);
                        particle.vx += Math.cos(angle + Math.PI / 2) * 0.03;
                        particle.vy += Math.sin(angle + Math.PI / 2) * 0.03;
                        break;
                    case 'magnetic':
                        const dx = this.interactionPoint.x - particle.x;
                        const dy = this.interactionPoint.y - particle.y;
                        const distance = Math.sqrt(dx * dx + dy * dy);
                        if (distance > 10) {
                            const force = 0.001 / distance;
                            particle.vx += dx * force;
                            particle.vy += dy * force;
                        }
                        break;
                    case 'pulse':
                        const pulse = Math.sin(time * 2 + index) * 0.5 + 0.5;
                        const newRadius = particle.radius + pulse * 0.3;
                        particle.radius = Math.min(newRadius, 5);
                        break;
                }
            });
        }
        
        applyPhysics(particle, physics) {
            const centerX = this.canvas.width / 2 / (window.devicePixelRatio || 1);
            const centerY = this.canvas.height / 2 / (window.devicePixelRatio || 1);
            const dx = centerX - particle.x;
            const dy = centerY - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance > 20) {
                const force = physics.attraction / distance;
                particle.vx += dx * force;
                particle.vy += dy * force;
            }
            particle.vy += physics.gravity * 0.08;
            if (physics.turbulence > 0) {
                particle.vx += (Math.random() - 0.5) * physics.turbulence * 0.5;
                particle.vy += (Math.random() - 0.5) * physics.turbulence * 0.5;
            }
        }
        
        applyInteraction(particle) {
            const dx = this.interactionPoint.x - particle.x;
            const dy = this.interactionPoint.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 80) {
                if (distance < 15) {
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
            console.log('🌌 Chaos Universe v' + CONFIG.VERSION + ' initialized');
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
