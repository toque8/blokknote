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
                    'гармония', 'благополучие', 'щедрость', 'верность', 'честность', 'мудрость', 'свобода'
                ],
                en: [
                    'love', 'joy', 'happy', 'peace', 'hope', 'dream', 'light', 'warm', 'smile', 'friend', 
                    'family', 'sun', 'spring', 'celebration', 'success', 'victory', 'beauty', 'harmony', 
                    'wellbeing', 'generosity', 'loyalty', 'honesty', 'wisdom', 'freedom', 'adventure'
                ]
            },
            darkWords: {
                ru: [
                    'грусть', 'боль', 'смерть', 'тьма', 'страх', 'одиночество', 'тоска', 'печаль', 
                    'разочарование', 'потеря', 'ночь', 'зима', 'дождь', 'горе', 'беда', 'несчастье', 
                    'трагедия', 'катастрофа', 'агония', 'мучение', 'пытка', 'истязание', 'унижение'
                ],
                en: [
                    'sad', 'pain', 'death', 'dark', 'fear', 'lonely', 'sorrow', 'disappointment', 
                    'loss', 'night', 'winter', 'rain', 'grief', 'trouble', 'misfortune', 'tragedy', 
                    'disaster', 'agony', 'torment', 'torture', 'humiliation', 'betrayal'
                ]
            }
        }
    };
    
    const DeviceDetector = {
        isMobile: () => window.innerWidth <= 768,
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
            this.colorPalette = this.generateColorPalette(32);
        }
        
        generateSeed() {
            return Date.now() ^ (Math.random() * 0xFFFFFF);
        }
        
        generateSessionId() {
            return 'textuniverse-' + Math.random().toString(36).substring(2, 12);
        }
        
        generatePhysics() {
            return {
                gravity: Math.random() * 0.6 - 0.3,
                viscosity: 0.88 + Math.random() * 0.08,
                turbulence: 0.1 + Math.random() * 0.3,
                attraction: 0.0005 + Math.random() * 0.0045,
                repulsion: 0.0005 + Math.random() * 0.0025,
                timeScale: 0.7 + Math.random() * 0.6
            };
        }
        
        generateBehaviors() {
            const allBehaviors = ['orbit', 'swarm', 'wave', 'chaos', 'spiral', 'magnetic', 'pulse'];
            const selected = [];
            const count = Math.floor(Math.random() * 3) + 2;
            
            for (let i = 0; i < count; i++) {
                const available = allBehaviors.filter(b => !selected.includes(b));
                if (available.length === 0) break;
                const index = Math.floor(Math.random() * available.length);
                selected.push(available[index]);
            }
            return selected;
        }
        
        generateParticleCount() {
            const isMobile = DeviceDetector.isMobile();
            const range = isMobile ? CONFIG.PARTICLES.mobile : CONFIG.PARTICLES.desktop;
            return Math.floor(range.min + Math.random() * (range.max - range.min));
        }
        
        detectLanguage() {
            const ruChars = this.text.match(/[а-яА-ЯёЁ]/g) || [];
            const enChars = this.text.match(/[a-zA-Z]/g) || [];
            if (ruChars.length > enChars.length * 1.2) return 'ru';
            if (enChars.length > ruChars.length * 1.2) return 'en';
            return 'mixed';
        }
        
        createHash() {
            return Math.random().toString(36).substring(2, 8);
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
            if (this.text.length < 10) return 'neutral';
            
            const textLower = this.text.toLowerCase();
            let warmCount = 0;
            let darkCount = 0;
            
            if (this.detectLanguage() === 'ru' || this.detectLanguage() === 'mixed') {
                const ruWarmRegex = new RegExp(CONFIG.SENSITIVITY.warmWords.ru.join('|'), 'giu');
                const ruDarkRegex = new RegExp(CONFIG.SENSITIVITY.darkWords.ru.join('|'), 'giu');
                
                const warmMatches = textLower.match(ruWarmRegex);
                const darkMatches = textLower.match(ruDarkRegex);
                
                if (warmMatches) warmCount += warmMatches.length;
                if (darkMatches) darkCount += darkMatches.length;
            }
            
            if (this.detectLanguage() === 'en' || this.detectLanguage() === 'mixed') {
                const enWarmRegex = new RegExp(CONFIG.SENSITIVITY.warmWords.en.join('|'), 'gi');
                const enDarkRegex = new RegExp(CONFIG.SENSITIVITY.darkWords.en.join('|'), 'gi');
                
                const warmMatches = textLower.match(enWarmRegex);
                const darkMatches = textLower.match(enDarkRegex);
                
                if (warmMatches) warmCount += warmMatches.length;
                if (darkMatches) darkCount += darkMatches.length;
            }
            
            if (warmCount === 0 && darkCount === 0) return 'neutral';
            
            const totalWords = Math.max(this.stats.words, 1);
            const warmRatio = warmCount / totalWords;
            const darkRatio = darkCount / totalWords;
            
            if (warmRatio > 0.7) return 'hot';
            if (warmRatio > 0.5) return 'warm';
            if (darkRatio > 0.7) return 'haze';
            if (darkRatio > 0.5) return 'dark';
            
            return 'neutral';
        }
        
        generateIntensityMultipliers() {
            switch(this.sensitivity) {
                case 'hot': return { speed: 1.5, amplitude: 1.5, size: 1.2 };
                case 'warm': return { speed: 1.2, amplitude: 1.2, size: 1.1 };
                case 'neutral': return { speed: 1.0, amplitude: 1.0, size: 1.0 };
                case 'dark': return { speed: 0.8, amplitude: 0.8, size: 0.9 };
                case 'haze': return { speed: 0.6, amplitude: 0.6, size: 0.8 };
                default: return { speed: 1.0, amplitude: 1.0, size: 1.0 };
            }
        }
        
        generateColorPalette(count) {
            const palette = [];
            
            for (let i = 0; i < count; i++) {
                let h, s, l;
                
                switch(this.sensitivity) {
                    case 'hot':
                        h = Math.random() * 60 + (Math.random() > 0.5 ? 300 : 0);
                        s = 70 + Math.random() * 30;
                        l = 40 + Math.random() * 20;
                        break;
                    case 'warm':
                        h = 20 + Math.random() * 60;
                        s = 50 + Math.random() * 30;
                        l = 50 + Math.random() * 20;
                        break;
                    case 'neutral':
                        h = Math.random() * 360;
                        s = 40 + Math.random() * 30;
                        l = 40 + Math.random() * 20;
                        break;
                    case 'dark':
                        h = Math.random() * 360;
                        s = 20 + Math.random() * 30;
                        l = 20 + Math.random() * 20;
                        break;
                    case 'haze':
                        h = 180 + Math.random() * 120;
                        s = 10 + Math.random() * 20;
                        l = 10 + Math.random() * 15;
                        break;
                    default:
                        h = Math.random() * 360;
                        s = 30 + Math.random() * 40;
                        l = 40 + Math.random() * 20;
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
            this.lastRenderTime = 0;
            this.frameCount = 0;
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
            
            this.interactionPoint.x = rect.width / 2;
            this.interactionPoint.y = rect.height / 2;
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
            const centerX = this.canvas.width / (2 * (window.devicePixelRatio || 1));
            const centerY = this.canvas.height / (2 * (window.devicePixelRatio || 1));
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
            const centerX = this.canvas.width / (2 * (window.devicePixelRatio || 1));
            const centerY = this.canvas.height / (2 * (window.devicePixelRatio || 1));
            const sizeMultiplier = this.session.intensityMultipliers.size;
            
            for (let i = 0; i < count; i++) {
                const angle = (i / count) * Math.PI * 2;
                const distance = 30 + (i % 5) * 15;
                const baseSize = 1.5 + Math.random() * 3;
                const particleSize = Math.min(baseSize * sizeMultiplier, 6);
                const colorIndex = Math.floor(Math.random() * colors.length);
                
                this.particles.push({
                    type: 'semantic',
                    x: centerX + Math.cos(angle) * distance,
                    y: centerY + Math.sin(angle) * distance,
                    vx: 0,
                    vy: 0,
                    radius: particleSize,
                    color: colors[colorIndex],
                    originalX: centerX + Math.cos(angle) * distance,
                    originalY: centerY + Math.sin(angle) * distance,
                    life: 1,
                    trail: [],
                    behavior: this.session.behaviors[i % this.session.behaviors.length]
                });
            }
        }
        
        setupEventListeners() {
            const canvas = this.canvas;
            const updatePoint = (clientX, clientY) => {
                const rect = canvas.getBoundingClientRect();
                this.interactionPoint.x = clientX - rect.left;
                this.interactionPoint.y = clientY - rect.top;
                this.interactionPoint.active = true;
            };
            
            canvas.addEventListener('mousemove', (e) => {
                updatePoint(e.clientX, e.clientY);
            });
            
            canvas.addEventListener('mouseleave', () => {
                this.interactionPoint.active = false;
            });
            
            if (DeviceDetector.isTouch()) {
                canvas.addEventListener('touchstart', (e) => {
                    e.preventDefault();
                    if (e.touches.length === 1) {
                        updatePoint(e.touches[0].clientX, e.touches[0].clientY);
                    }
                }, { passive: false });
                
                canvas.addEventListener('touchmove', (e) => {
                    e.preventDefault();
                    if (e.touches.length === 1) {
                        updatePoint(e.touches[0].clientX, e.touches[0].clientY);
                    }
                }, { passive: false });
                
                canvas.addEventListener('touchend', () => {
                    this.interactionPoint.active = false;
                });
            }
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
            const behavior = particle.behavior;
            const time = this.time;
            
            switch(behavior) {
                case 'orbit':
                    if (particle.orbitRadius) {
                        particle.orbitAngle += particle.orbitSpeed * multipliers.speed;
                        const centerX = this.canvas.width / (2 * (window.devicePixelRatio || 1));
                        const centerY = this.canvas.height / (2 * (window.devicePixelRatio || 1));
                        const targetX = centerX + Math.cos(particle.orbitAngle) * particle.orbitRadius;
                        const targetY = centerY + Math.sin(particle.orbitAngle) * particle.orbitRadius;
                        particle.vx += (targetX - particle.x) * 0.02 * multipliers.amplitude;
                        particle.vy += (targetY - particle.y) * 0.02 * multipliers.amplitude;
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
                    const centerX = this.canvas.width / (2 * (window.devicePixelRatio || 1));
                    const centerY = this.canvas.height / (2 * (window.devicePixelRatio || 1));
                    const angle = Math.atan2(particle.y - centerY, particle.x - centerX);
                    particle.vx += Math.cos(angle + Math.PI / 2) * 0.03 * multipliers.amplitude;
                    particle.vy += Math.sin(angle + Math.PI / 2) * 0.03 * multipliers.amplitude;
                    break;
                    
                case 'pulse':
                    const pulse = Math.sin(time * 2 + index) * 0.5 + 0.5;
                    const newRadius = particle.radius + pulse * 0.3 * multipliers.amplitude;
                    particle.radius = Math.min(newRadius, 6);
                    break;
            }
        }
        
        applyPhysics(particle, physics, multipliers) {
            const centerX = this.canvas.width / (2 * (window.devicePixelRatio || 1));
            const centerY = this.canvas.height / (2 * (window.devicePixelRatio || 1));
            
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
            
            ctx.clearRect(0, 0, width, height);
            
            if (!this.isMobile) {
                this.drawGrid(ctx, width, height);
            }
            
            this.particles.forEach(particle => {
                this.drawParticle(particle);
            });
            
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
            const width = this.canvas.width / (window.devicePixelRatio || 1);
            const height = this.canvas.height / (window.devicePixelRatio || 1);
            ctx.clearRect(0, 0, width, height);
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
            
            const text = this.getEditorText();
            this.currentSession = new QuantumSession(text);
            this.particleSystem = new ParticleSystem(this.canvas, this.currentSession);
            
            this.startAnimation();
        }
        
        close() {
            if (!this.isActive) return;
            
            this.isActive = false;
            this.container.style.display = 'none';
            this.stopAnimation();
            
            if (this.particleSystem) {
                this.particleSystem.destroy();
                this.particleSystem = null;
            }
            
            this.currentSession = null;
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
    }
    
    function initializeChaos() {
        try {
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => {
                    setTimeout(() => {
                        new ChaosController();
                    }, 100);
                });
            } else {
                setTimeout(() => {
                    new ChaosController();
                }, 100);
            }
        } catch (error) {
            console.error('ChaOS initialization failed:', error);
            const btn = document.getElementById('chaos-btn');
            if (btn) btn.style.display = 'none';
        }
    }
    
    initializeChaos();
})();
