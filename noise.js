(function() {
  'use strict';
  console.log('=== NOISE ENGINE START ===');
  
  // КОНФИГУРАЦИЯ
  const NOISE_CONFIG = {
    VERSION: '1.3',
    AUDIO: {
      SCALES: {
        joy: [0, 2, 4, 5, 7, 9, 11],
        sorrow: [0, 2, 3, 5, 7, 8, 10],
        tense: [0, 1, 3, 5, 6, 8, 10],
        dream: [0, 2, 4, 6, 8, 10],
        mystic: [0, 3, 4, 6, 7, 9, 11],
        neutral: [0, 2, 4, 7, 9],
        energy: [0, 2, 4, 7, 9, 11],
        calm: [0, 3, 5, 7, 10]
      },
      INSTRUMENTS: {
        warm: {
          type: 'acoustic',
          primary: { wave: 'sawtooth', filter: 1800, env: { a: 0.02, d: 0.1, s: 0.7, r: 0.5 } },
          secondary: { wave: 'triangle', filter: 1200, env: { a: 0.05, d: 0.3, s: 0.6, r: 0.8 } },
          effects: { reverb: 0.4, delay: 0.2, chorus: 0.3 }
        },
        dark: {
          type: 'ambient',
          primary: { wave: 'sine', filter: 800, env: { a: 0.1, d: 0.4, s: 0.5, r: 1.2 } },
          secondary: { wave: 'square', filter: 600, env: { a: 0.2, d: 0.5, s: 0.4, r: 1.5 } },
          effects: { reverb: 0.7, delay: 0.5, chorus: 0.1 }
        },
        neutral: {
          type: 'electronic',
          primary: { wave: 'triangle', filter: 1400, env: { a: 0.03, d: 0.2, s: 0.6, r: 0.7 } },
          secondary: { wave: 'sawtooth', filter: 1600, env: { a: 0.04, d: 0.15, s: 0.65, r: 0.6 } },
          effects: { reverb: 0.3, delay: 0.3, chorus: 0.2 }
        }
      },
      PRESETS: {
        euphoric: { scale: 'joy', instrument: 'warm', tempo: 140, density: 0.8, complexity: 0.7 },
        melancholic: { scale: 'sorrow', instrument: 'dark', tempo: 60, density: 0.6, complexity: 0.9 },
        mysterious: { scale: 'mystic', instrument: 'dark', tempo: 80, density: 0.7, complexity: 0.8 },
        energetic: { scale: 'energy', instrument: 'warm', tempo: 160, density: 0.9, complexity: 0.6 },
        peaceful: { scale: 'calm', instrument: 'neutral', tempo: 90, density: 0.5, complexity: 0.4 },
        tense: { scale: 'tense', instrument: 'dark', tempo: 100, density: 0.8, complexity: 0.7 },
        dreamy: { scale: 'dream', instrument: 'neutral', tempo: 70, density: 0.6, complexity: 0.5 }
      }
    },
    VISUAL: {
      desktop: { bars: 128, particles: 100, heightScale: 3 },
      mobile: { bars: 64, particles: 40, heightScale: 2 }
    },
    ANALYSIS: {
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
          'ревность', 'зависть', 'жадность', 'скупость', 'эгоизм', 'равнодушие', 'холод'
        ],
        en: [
          'sad', 'pain', 'death', 'dark', 'fear', 'lonely', 'sorrow', 'disappointment',
          'loss', 'night', 'winter', 'rain', 'grief', 'trouble', 'misfortune', 'tragedy',
          'disaster', 'agony', 'torment', 'torture', 'humiliation', 'betrayal', 'treason',
          'lie', 'deception', 'hatred', 'malice', 'rage', 'anger', 'jealousy', 'envy',
          'greed', 'stinginess', 'selfishness', 'indifference', 'cold'
        ]
      },
      modifiers: {
        ru: {
          intensifiers: [
            { words: ['очень', 'крайне', 'невероятно', 'исключительно', 'абсолютно', 'страшно', 'ужасно'], weight: 2.0 },
            { words: ['довольно', 'весьма', 'достаточно', 'прилично', 'очень даже'], weight: 1.5 },
            { words: ['немного', 'слегка', 'чуть-чуть', 'едва', 'почти'], weight: 0.5 }
          ],
          negations: ['не', 'никогда', 'нигде', 'ничем', 'никак', 'вовсе не', 'далеко не', 'отнюдь не', 'ни']
        },
        en: {
          intensifiers: [
            { words: ['very', 'extremely', 'incredibly', 'exceptionally', 'absolutely', 'terribly'], weight: 2.0 },
            { words: ['quite', 'rather', 'fairly', 'pretty', 'reasonably'], weight: 1.5 },
            { words: ['slightly', 'a bit', 'somewhat', 'kind of', 'sort of', 'almost'], weight: 0.5 }
          ],
          negations: ['not', "don't", "doesn't", "didn't", 'never', 'nowhere', 'nothing', 'no', 'none', 'neither']
        }
      }
    }
  };
  
  // ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
  function createNoiseContainer() {
    const container = document.createElement('div');
    container.id = 'noise-canvas-container';
    container.style.cssText = `
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      height: 300px;
      max-height: 50vh;
      background: rgba(8, 12, 25, 0.95);
      border-radius: 20px 20px 0 0;
      box-shadow: 0 -5px 30px rgba(0,0,0,0.5);
      display: none;
      z-index: 10000;
      overflow: hidden;
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      border: 1px solid rgba(255,255,255,0.05);
    `;
    
    // Создаем canvas
    const canvas = document.createElement('canvas');
    canvas.id = 'noise-canvas';
    canvas.style.cssText = 'width:100%;height:100%;display:block;';
    container.appendChild(canvas);
    
    // Создаем кнопку закрытия
    const closeBtn = document.createElement('button');
    closeBtn.id = 'noise-close-btn';
    closeBtn.innerHTML = '&times;';
    closeBtn.style.cssText = `
      position: absolute;
      top: 12px;
      right: 12px;
      background: rgba(30, 40, 70, 0.7);
      border: 1px solid rgba(100, 150, 255, 0.3);
      color: rgba(200, 220, 255, 0.9);
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      cursor: pointer;
      z-index: 10001;
    `;
    container.appendChild(closeBtn);
    
    // Создаем панель управления
    const controlsDiv = document.createElement('div');
    controlsDiv.className = 'noise-controls';
    controlsDiv.style.cssText = `
      position: absolute;
      bottom: 10px;
      left: 10px;
      right: 10px;
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px;
      background: rgba(20, 25, 40, 0.7);
      border-radius: 8px;
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
      border: 1px solid rgba(100, 150, 255, 0.2);
    `;
    
    // Play button
    const playBtn = document.createElement('button');
    playBtn.id = 'noise-play-btn';
    playBtn.textContent = 'Play';
    playBtn.style.cssText = `
      background: rgba(40, 60, 100, 0.8);
      border: 1px solid rgba(100, 150, 255, 0.3);
      color: rgba(220, 240, 255, 0.9);
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
      font-family: monospace;
      font-size: 13px;
    `;
    controlsDiv.appendChild(playBtn);
    
    // Stop button
    const stopBtn = document.createElement('button');
    stopBtn.id = 'noise-stop-btn';
    stopBtn.textContent = 'Stop';
    stopBtn.disabled = true;
    stopBtn.style.cssText = `
      background: rgba(40, 60, 100, 0.8);
      border: 1px solid rgba(100, 150, 255, 0.3);
      color: rgba(220, 240, 255, 0.9);
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
      font-family: monospace;
      font-size: 13px;
    `;
    controlsDiv.appendChild(stopBtn);
    
    // Volume slider
    const volumeSlider = document.createElement('input');
    volumeSlider.id = 'noise-volume';
    volumeSlider.type = 'range';
    volumeSlider.min = '0';
    volumeSlider.max = '100';
    volumeSlider.value = '30';
    volumeSlider.style.cssText = `
      flex: 1;
      max-width: 120px;
      accent-color: #667eea;
    `;
    controlsDiv.appendChild(volumeSlider);
    
    // Status text
    const statusText = document.createElement('span');
    statusText.id = 'noise-status';
    statusText.textContent = 'Ready to play';
    statusText.style.cssText = `
      color: rgba(180, 220, 255, 0.9);
      font-family: monospace;
      font-size: 12px;
      padding: 0 8px;
      text-align: center;
      flex: 2;
    `;
    controlsDiv.appendChild(statusText);
    
    container.appendChild(controlsDiv);
    
    // Добавляем обработчики событий для только что созданных элементов
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (window.noiseController) window.noiseController.close();
    });
    
    playBtn.addEventListener('click', () => {
      if (window.noiseController) window.noiseController.play();
    });
    
    stopBtn.addEventListener('click', () => {
      if (window.noiseController) window.noiseController.stop();
    });
    
    volumeSlider.addEventListener('input', (e) => {
      if (window.noiseController && window.noiseController.engine) {
        window.noiseController.engine.setVolume(e.target.value / 100);
      }
    });
    
    return container;
  }
  
  // АНАЛИЗАТОР ТЕКСТА
  class DeepTextAnalyzer {
    constructor(text = '') {
      this.text = text.trim() || "Любовь и радость наполняют моё сердце светом и теплом. Гармония и счастье окружают меня.";
      this.language = this.detectLanguage();
      this.stats = this.calculateStats();
      this.emotionalVector = this.analyzeEmotionalVector();
      this.semanticProfile = this.createSemanticProfile();
      this.audioProfile = this.createAudioProfile();
    }
    
    detectLanguage() {
      const ruChars = this.text.match(/[а-яА-ЯёЁ]/g) || [];
      const enChars = this.text.match(/[a-zA-Z]/g) || [];
      if (ruChars.length > enChars.length * 1.5) return 'ru';
      if (enChars.length > ruChars.length * 1.5) return 'en';
      return 'mixed';
    }
    
    calculateStats() {
      const stats = {
        characters: this.text.length,
        words: 0,
        sentences: 0,
        paragraphs: 0,
        uniqueWords: 0,
        avgWordLength: 0,
        avgSentenceLength: 0
      };
      
      if (this.text.length === 0) return stats;
      
      const words = this.text.toLowerCase()
        .replace(/[^\p{L}\s\-']/gu, ' ')
        .split(/\s+/)
        .filter(w => w.length > 0);
        
      const sentences = this.text.split(/[.!?]+/).filter(s => s.trim().length > 0);
      
      stats.words = words.length;
      stats.sentences = sentences.length;
      stats.uniqueWords = [...new Set(words)].length;
      stats.avgWordLength = words.reduce((sum, w) => sum + w.length, 0) / words.length;
      stats.avgSentenceLength = words.length / Math.max(sentences.length, 1);
      
      return stats;
    }
    
    analyzeEmotionalVector() {
      const textLower = this.text.toLowerCase();
      const words = textLower.match(/[\p{L}\-']+/gu) || [];
      
      let vector = {
        warmth: 0,
        darkness: 0,
        intensity: 0,
        dynamism: 0,
        tension: 0,
        clarity: 0
      };
      
      const lang = this.language === 'mixed' ? ['ru', 'en'] : [this.language];
      
      lang.forEach(l => {
        const warmWords = NOISE_CONFIG.ANALYSIS.warmWords[l] || [];
        const darkWords = NOISE_CONFIG.ANALYSIS.darkWords[l] || [];
        
        words.forEach(word => {
          if (warmWords.includes(word)) {
            vector.warmth += 0.7;
            vector.intensity += 0.7;
            vector.dynamism += 0.2;
          } else if (darkWords.includes(word)) {
            vector.darkness += 0.8;
            vector.intensity += 0.8;
            vector.tension += 0.4;
          }
        });
      });
      
      vector.clarity = Math.min(1, this.stats.uniqueWords / Math.max(this.stats.words, 1));
      
      // Нормализация
      const maxVal = Math.max(
        Math.abs(vector.warmth),
        Math.abs(vector.darkness),
        Math.abs(vector.intensity),
        1
      );
      
      Object.keys(vector).forEach(key => {
        vector[key] = vector[key] / maxVal;
        vector[key] = Math.max(-1, Math.min(1, vector[key]));
      });
      
      return vector;
    }
    
    createSemanticProfile() {
      const vector = this.emotionalVector;
      let dominantEmotion = 'neutral';
      
      if (vector.warmth > vector.darkness * 1.3 && vector.warmth > 0.3) {
        dominantEmotion = 'euphoric';
      } else if (vector.darkness > vector.warmth * 1.3 && vector.darkness > 0.3) {
        dominantEmotion = 'melancholic';
      } else if (vector.darkness > 0.4 && vector.tension > 0.3) {
        dominantEmotion = 'tense';
      } else if (vector.warmth > 0.2) {
        dominantEmotion = 'peaceful';
      }
      
      return {
        dominantEmotion: dominantEmotion,
        warmth: Math.max(0, vector.warmth),
        darkness: Math.max(0, vector.darkness),
        intensity: vector.intensity,
        dynamism: vector.dynamism,
        tension: vector.tension,
        clarity: vector.clarity
      };
    }
    
    createAudioProfile() {
      const profile = this.semanticProfile;
      const preset = NOISE_CONFIG.AUDIO.PRESETS[profile.dominantEmotion] || NOISE_CONFIG.AUDIO.PRESETS.neutral;
      
      return {
        scale: preset.scale,
        instrument: preset.instrument,
        tempo: preset.tempo || 90,
        density: preset.density || 0.6,
        complexity: preset.complexity || 0.5,
        brightness: 0.5 + profile.warmth * 0.5 - profile.darkness * 0.3,
        depth: 0.3 + profile.darkness * 0.7
      };
    }
    
    getAnalysisReport() {
      const profile = this.semanticProfile;
      const audio = this.audioProfile;
      
      return {
        textStats: this.stats,
        emotionalVector: this.emotionalVector,
        semanticProfile: profile,
        audioProfile: audio,
        summary: {
          emotion: profile.dominantEmotion,
          intensity: Math.round(profile.intensity * 100) + '%',
          tempo: audio.tempo + ' BPM',
          scale: audio.scale,
          instrument: audio.instrument
        }
      };
    }
  }
  
  // КОМПОЗИТОР
  class AudioComposer {
    constructor(analyzer) {
      this.analyzer = analyzer;
      this.profile = analyzer.audioProfile;
      this.scale = NOISE_CONFIG.AUDIO.SCALES[this.profile.scale] || NOISE_CONFIG.AUDIO.SCALES.neutral;
      this.instrument = NOISE_CONFIG.AUDIO.INSTRUMENTS[this.profile.instrument] || NOISE_CONFIG.AUDIO.INSTRUMENTS.neutral;
      
      this.composition = this.compose();
    }
    
    midiToFrequency(midiNote) {
      return 440 * Math.pow(2, (midiNote - 69) / 12);
    }
    
    getScaleNote(degree, octave = 4) {
      const rootMidi = 60 + (octave - 4) * 12;
      const octaveShift = Math.floor(degree / this.scale.length);
      const scaleDegree = degree % this.scale.length;
      const midiNote = rootMidi + this.scale[scaleDegree] + (octaveShift * 12);
      return this.midiToFrequency(midiNote);
    }
    
    compose() {
      const layers = {
        atmosphere: this.createAtmosphereLayer(),
        rhythm: this.createRhythmLayer(),
        melody: this.createMelodyLayer()
      };
      
      const totalNotes = Object.values(layers).flat().length;
      
      // Гарантируем наличие хотя бы одной ноты
      if (totalNotes === 0) {
        layers.atmosphere.push({
          type: 'debug',
          frequencies: [440],
          time: 0,
          duration: 3,
          velocity: 0.5,
          waveType: 'sine',
          filter: 1000,
          pan: 0
        });
      }
      
      const maxDuration = Math.max(
        ...Object.values(layers).flat().map(n => n.time + n.duration)
      );
      
      return {
        layers: layers,
        duration: maxDuration || 20,
        profile: this.profile,
        metadata: this.analyzer.getAnalysisReport(),
        sessionId: 'noise-' + Math.random().toString(36).substr(2, 9)
      };
    }
    
    createAtmosphereLayer() {
      const notes = [];
      const duration = (60 / this.profile.tempo) * 16;
      
      for (let i = 0; i < 3; i++) {
        const time = i * duration * 0.5;
        const chordNotes = [
          this.getScaleNote(0, 2),
          this.getScaleNote(2, 3),
          this.getScaleNote(4, 3)
        ];
        
        notes.push({
          type: 'atmosphere',
          frequencies: chordNotes,
          time: time,
          duration: duration * 0.9,
          velocity: 0.2 + (i * 0.1),
          waveType: 'sine',
          filter: this.instrument.primary.filter * 0.7,
          pan: (i - 1) * 0.3
        });
      }
      
      return notes;
    }
    
    createRhythmLayer() {
      const notes = [];
      const beatDuration = 60 / this.profile.tempo;
      
      for (let beat = 0; beat < 8; beat++) {
        const time = beat * beatDuration;
        
        notes.push({
          type: 'rhythm',
          frequencies: [120 + (beat % 3) * 50],
          time: time,
          duration: beatDuration * 0.3,
          velocity: 0.4,
          waveType: 'square',
          filter: 800,
          pan: (beat % 2 === 0 ? -0.2 : 0.2)
        });
      }
      
      return notes;
    }
    
    createMelodyLayer() {
      const notes = [];
      const words = this.analyzer.text.toLowerCase()
        .replace(/[^\p{L}\s\-']/gu, ' ')
        .split(/\s+/)
        .filter(w => w.length > 1);
      
      const noteDuration = (60 / this.profile.tempo) * 2;
      
      const melodyWords = words.slice(0, Math.min(8, words.length));
      
      melodyWords.forEach((word, index) => {
        const time = index * noteDuration * 0.9;
        const wordLength = Math.min(word.length, 10);
        const degree = (wordLength * 7) % (this.scale.length * 2);
        const freq = this.getScaleNote(degree, 4 + Math.floor(degree / this.scale.length));
        
        notes.push({
          type: 'melody',
          frequencies: [freq],
          time: time,
          duration: noteDuration * 0.6,
          velocity: 0.5 + (index / melodyWords.length) * 0.3,
          waveType: this.instrument.primary.wave,
          filter: this.instrument.primary.filter,
          pan: (Math.sin(index) * 0.5),
          word: word
        });
      });
      
      return notes;
    }
  }
  
  // АУДИО ДВИЖОК
  class AdvancedAudioEngine {
    constructor(canvas, playBtn, stopBtn, volumeSlider) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.playBtn = playBtn;
      this.stopBtn = stopBtn;
      this.volumeSlider = volumeSlider;
      this.audioContext = null;
      this.masterGain = null;
      this.analyser = null;
      this.isPlaying = false;
      this.startTime = 0;
      this.scheduledNodes = [];
      
      this.setupVisualizer();
      this.volume = 0.3;
      this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    
    setupVisualizer() {
      const dpr = window.devicePixelRatio || 1;
      const rect = this.canvas.getBoundingClientRect();
      this.canvas.width = rect.width * dpr;
      this.canvas.height = rect.height * dpr;
      this.ctx.scale(dpr, dpr);
    }
    
    async initAudioContext() {
      if (this.audioContext) return true;
      
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.audioContext = new AudioContext();
        
        this.masterGain = this.audioContext.createGain();
        this.masterGain.gain.value = this.volume;
        this.masterGain.connect(this.audioContext.destination);
        
        this.analyser = this.audioContext.createAnalyser();
        this.analyser.fftSize = 1024;
        this.frequencyData = new Uint8Array(this.analyser.frequencyBinCount);
        this.timeData = new Uint8Array(this.analyser.frequencyBinCount);
        
        this.masterGain.connect(this.analyser);
        
        return true;
      } catch (error) {
        console.error('❌ Failed to initialize AudioContext:', error);
        this.audioContext = null;
        return false;
      }
    }
    
    async resumeAudioContext() {
      if (!this.audioContext) return false;
      
      if (this.audioContext.state === 'suspended') {
        try {
          await this.audioContext.resume();
          return true;
        } catch (error) {
          console.error('❌ Failed to resume AudioContext:', error);
          return false;
        }
      }
      
      return true;
    }
    
    createSoundNode(note, instrument) {
      if (!this.audioContext) return [];
      
      const nodes = [];
      const startTime = this.audioContext.currentTime + note.time;
      const endTime = startTime + note.duration;
      
      note.frequencies.forEach(freq => {
        try {
          const osc = this.audioContext.createOscillator();
          const gain = this.audioContext.createGain();
          const filter = this.audioContext.createBiquadFilter();
          
          osc.type = note.waveType || instrument.primary.wave;
          osc.frequency.value = freq;
          
          filter.type = 'lowpass';
          filter.frequency.value = note.filter || instrument.primary.filter;
          
          gain.gain.setValueAtTime(0, startTime);
          gain.gain.linearRampToValueAtTime(note.velocity, startTime + 0.01);
          gain.gain.linearRampToValueAtTime(note.velocity * 0.6, endTime - 0.1);
          gain.gain.linearRampToValueAtTime(0, endTime);
          
          osc.connect(filter);
          filter.connect(gain);
          gain.connect(this.masterGain);
          
          osc.start(startTime);
          osc.stop(endTime);
          
          nodes.push({ osc, gain, filter });
        } catch (error) {
          console.error('❌ Error creating sound node:', error);
        }
      });
      
      return nodes;
    }
    
    async playComposition(composition) {
      if (this.isPlaying) this.stop();
      
      const initSuccess = await this.initAudioContext();
      if (!initSuccess) {
        console.error('❌ Audio context initialization failed');
        return false;
      }
      
      const resumeSuccess = await this.resumeAudioContext();
      if (!resumeSuccess) {
        console.error('❌ Audio context resume failed');
        return false;
      }
      
      this.isPlaying = true;
      this.startTime = this.audioContext.currentTime;
      this.scheduledNodes = [];
      this.composition = composition;
      
      // Проигрываем все ноты
      Object.values(composition.layers).flat().forEach(note => {
        const nodes = this.createSoundNode(note, composition.profile.instrument);
        this.scheduledNodes.push(...nodes);
      });
      
      // Обновляем UI
      if (this.stopBtn) this.stopBtn.disabled = false;
      if (this.playBtn) {
        this.playBtn.disabled = true;
        this.playBtn.textContent = 'Playing';
      }
      
      // Запускаем визуализацию
      this.animate();
      
      // Автоостановка через длительность композиции
      setTimeout(() => {
        if (this.isPlaying) this.stop();
      }, composition.duration * 1000 + 1000);
      
      return true;
    }
    
    stop() {
      this.isPlaying = false;
      
      this.scheduledNodes.forEach(node => {
        try {
          if (node.osc) {
            node.osc.stop();
            node.osc.disconnect();
          }
          if (node.gain) node.gain.disconnect();
          if (node.filter) node.filter.disconnect();
        } catch (e) {
          console.warn('⚠️ Error stopping node:', e);
        }
      });
      
      this.scheduledNodes = [];
      
      if (this.playBtn) {
        this.playBtn.disabled = false;
        this.playBtn.textContent = 'Play';
      }
      if (this.stopBtn) this.stopBtn.disabled = true;
    }
    
    setVolume(value) {
      this.volume = Math.max(0, Math.min(1, value));
      if (this.masterGain) {
        this.masterGain.gain.value = this.volume;
      }
    }
    
    animate() {
      if (!this.isPlaying) {
        // Отображаем статическую визуализацию
        this.drawVisualization();
        requestAnimationFrame(() => this.animate());
        return;
      }
      
      this.drawVisualization();
      requestAnimationFrame(() => this.animate());
    }
    
    drawVisualization() {
      const width = this.canvas.width / (window.devicePixelRatio || 1);
      const height = this.canvas.height / (window.devicePixelRatio || 1);
      const ctx = this.ctx;
      
      // Фон
      ctx.fillStyle = 'rgba(10, 14, 23, 0.15)';
      ctx.fillRect(0, 0, width, height);
      
      // Получаем данные анализатора
      if (this.analyser) {
        this.analyser.getByteFrequencyData(this.frequencyData);
        this.analyser.getByteTimeDomainData(this.timeData);
      }
      
      // Рисуем спектр
      this.drawSpectrum(width, height);
      this.drawInfo(width, height);
    }
    
    drawSpectrum(width, height) {
      const ctx = this.ctx;
      const barCount = this.isMobile ? 64 : 128;
      const barWidth = width / barCount;
      
      for (let i = 0; i < barCount; i++) {
        const freqIndex = Math.floor((i / barCount) * (this.frequencyData ? this.frequencyData.length : 256) * 0.5);
        const value = this.frequencyData && this.frequencyData.length > 0 ? 
          this.frequencyData[freqIndex] : Math.random() * 200;
        
        const barHeight = (value / 255) * height * (this.isMobile ? 2 : 3);
        const hue = (i / barCount) * 240 + 120;
        
        const gradient = ctx.createLinearGradient(0, height, 0, height - barHeight);
        gradient.addColorStop(0, `hsla(${hue}, 80%, 50%, 0.2)`);
        gradient.addColorStop(1, `hsla(${hue}, 100%, 70%, 0.8)`);
        
        ctx.fillStyle = gradient;
        ctx.fillRect(i * barWidth, height - barHeight, barWidth - 1, barHeight);
      }
    }
    
    drawInfo(width, height) {
      const ctx = this.ctx;
      
      ctx.fillStyle = 'rgba(220, 230, 255, 0.9)';
      ctx.font = '12px monospace';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      
      const infoText = this.composition ? 
        `Noise • ${this.composition.metadata.summary.emotion} • ${this.composition.metadata.summary.tempo}` : 
        'Noise Visualization';
      
      ctx.fillText(infoText, 15, 15);
    }
  }
  
  // КОНТРОЛЛЕР
  class NoiseController {
    constructor() {
      console.log('🎛️ Initializing Noise Controller');
      
      this.btn = document.getElementById('noise-btn');
      this.container = document.getElementById('noise-canvas-container');
      this.canvas = document.getElementById('noise-canvas');
      this.closeBtn = document.getElementById('noise-close-btn');
      this.playBtn = document.getElementById('noise-play-btn');
      this.stopBtn = document.getElementById('noise-stop-btn');
      this.volumeSlider = document.getElementById('noise-volume');
      this.statusText = document.getElementById('noise-status');
      
      this.isActive = false;
      this.engine = null;
      this.composition = null;
      
      if (!this.btn) {
        console.error('❌ noise-btn element not found');
        return;
      }
      
      if (!this.container || !this.canvas) {
        console.error('❌ Noise container or canvas not found, creating fallback');
        this.initFallbackElements();
      }
      
      this.setupEventListeners();
      console.log('✅ Noise Controller initialized');
    }
    
    initFallbackElements() {
      // Уже создана в функции createNoiseContainer
    }
    
    setupEventListeners() {
      // Обработчик для основной кнопки
      this.btn.addEventListener('click', (e) => {
        e.stopPropagation();
        console.log('🎛️ Noise button clicked');
        this.toggle();
      });
      
      // Обработчик для кнопки закрытия
      if (this.closeBtn) {
        this.closeBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          console.log('✖️ Close button clicked');
          this.close();
        });
      }
      
      // Обработчик для клика по контейнеру (закрытие по клику на фон)
      if (this.container) {
        this.container.addEventListener('click', (e) => {
          if (e.target === this.container) {
            console.log('⏭️ Background click detected, closing');
            this.close();
          }
        });
      }
      
      // Обработчик клавиши Escape
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isActive) {
          console.log('⌨️ Escape pressed, closing');
          this.close();
        }
      });
      
      // Обработчики кнопок Play/Stop
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
      
      // Обработчик громкости
      if (this.volumeSlider) {
        this.volumeSlider.addEventListener('input', (e) => {
          const value = e.target.value / 100;
          console.log(`🔊 Volume changed to: ${value.toFixed(2)}`);
          
          if (this.engine) {
            this.engine.setVolume(value);
          }
          
          if (this.statusText) {
            this.statusText.textContent = `Volume: ${Math.round(value * 100)}%`;
            setTimeout(() => {
              if (this.statusText && this.statusText.textContent.includes('Volume:')) {
                this.statusText.textContent = 'Ready to play';
              }
            }, 1000);
          }
        });
      }
      
      // Обработчик изменения размера окна
      window.addEventListener('resize', () => {
        if (this.isActive && this.engine) {
          this.engine.setupVisualizer();
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
      
      console.log('📂 Opening noise panel');
      this.isActive = true;
      
      if (this.container) {
        this.container.style.display = 'block';
        this.container.classList.remove('closing');
      }
      
      // Получаем текст из редактора
      const editor = document.getElementById('editor');
      const text = editor ? editor.innerText.trim() : '';
      
      console.log(`📝 Analyzing text (length: ${text.length})`);
      
      // Создаем анализатор и композицию
      try {
        this.analyzer = new DeepTextAnalyzer(text);
        this.composer = new AudioComposer(this.analyzer);
        this.composition = this.composer.composition;
        
        console.log('✅ Composition created successfully', {
          emotion: this.composition.metadata.summary.emotion,
          duration: this.composition.duration.toFixed(1),
          notes: Object.values(this.composition.layers).flat().length
        });
        
        // Создаем или обновляем аудио-движок
        if (!this.engine) {
          this.engine = new AdvancedAudioEngine(
            this.canvas,
            this.playBtn,
            this.stopBtn,
            this.volumeSlider
          );
        }
        
        // Обновляем статус
        if (this.statusText) {
          this.statusText.textContent = `Ready: ${this.composition.metadata.summary.emotion}`;
        }
        
        // Запускаем визуализацию
        this.engine.animate();
        
      } catch (error) {
        console.error('❌ Error creating composition:', error);
        
        // Создаем тестовую композицию
        this.composition = {
          layers: {
            atmosphere: [{
              type: 'debug',
              frequencies: [440],
              time: 0,
              duration: 3,
              velocity: 0.5,
              waveType: 'sine',
              filter: 1000,
              pan: 0
            }]
          },
          duration: 3,
          profile: { instrument: NOISE_CONFIG.AUDIO.INSTRUMENTS.neutral },
          metadata: { summary: { emotion: 'demo', tempo: '90 BPM' } },
          sessionId: 'noise-demo'
        };
        
        if (this.statusText) {
          this.statusText.textContent = 'Demo mode (error creating composition)';
        }
      }
    }
    
    close() {
      if (!this.isActive) return;
      
      console.log('📂 Closing noise panel');
      this.container.classList.add('closing');
      this.stop();
      
      setTimeout(() => {
        this.isActive = false;
        this.container.style.display = 'none';
        this.container.classList.remove('closing');
      }, 300);
    }
    
    async play() {
      if (!this.engine || !this.composition) {
        console.error('❌ No engine or composition available');
        if (this.statusText) this.statusText.textContent = 'Error: No composition available';
        return;
      }
      
      console.log('▶️ Starting playback');
      if (this.statusText) this.statusText.textContent = 'Starting...';
      
      try {
        const success = await this.engine.playComposition(this.composition);
        if (success) {
          console.log('✅ Playback started successfully');
          if (this.statusText) this.statusText.textContent = 'Playing';
        } else {
          console.error('❌ Playback failed to start');
          if (this.statusText) this.statusText.textContent = 'Playback failed';
        }
      } catch (error) {
        console.error('❌ Error during playback:', error);
        if (this.statusText) this.statusText.textContent = 'Playback error';
      }
    }
    
    stop() {
      console.log('⏹️ Stopping playback');
      if (this.engine) this.engine.stop();
      if (this.statusText) this.statusText.textContent = 'Ready to play';
    }
  }
  
  // ГЛОБАЛЬНЫЕ ФУНКЦИИ ОТЛАДКИ
  window.NoiseDebug = {
    analyzeText: (text) => {
      if (!text) return null;
      const analyzer = new DeepTextAnalyzer(text);
      return analyzer.getAnalysisReport();
    },
    createDemoComposition: () => {
      const demoText = "Любовь и радость наполняют моё сердце светом и теплом. Гармония и счастье окружают меня.";
      const analyzer = new DeepTextAnalyzer(demoText);
      const composer = new AudioComposer(analyzer);
      return composer.composition;
    },
    playDemo: async () => {
      if (!window.noiseController) {
        console.error('Noise controller not initialized');
        return;
      }
      
      const demoComp = window.NoiseDebug.createDemoComposition();
      window.noiseController.composition = demoComp;
      
      if (window.noiseController.engine) {
        await window.noiseController.engine.playComposition(demoComp);
      }
    }
  };
  
  console.log('=== NOISE ENGINE LOADED SUCCESSFULLY ===');
  console.log('💡 Tips:');
  console.log('- Click the noise button (green icon) to open the panel');
  console.log('- Type text in the editor to generate music based on emotions');
  console.log('- Use window.NoiseDebug in console for testing');
})();
