(function() {
  'use strict';
  console.log('=== NOISE ENGINE START ===');
  
  // КОНФИГУРАЦИЯ (обновленная)
  const NOISE_CONFIG = {
    VERSION: '2.0',
    AUDIO: {
      SCALES: {
        joy: [0, 2, 4, 5, 7, 9, 11],
        sorrow: [0, 2, 3, 5, 7, 8, 10],
        tense: [0, 1, 3, 5, 6, 8, 10],
        dream: [0, 2, 4, 6, 8, 10],
        mystic: [0, 3, 4, 6, 7, 9, 11],
        neutral: [0, 2, 4, 7, 9],
        energy: [0, 2, 4, 7, 9, 11],
        calm: [0, 3, 5, 7, 10],
        pentatonic: [0, 2, 4, 7, 9],
        blues: [0, 3, 5, 6, 7, 10]
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
        },
        bright: {
          type: 'digital',
          primary: { wave: 'square', filter: 2000, env: { a: 0.01, d: 0.05, s: 0.8, r: 0.3 } },
          secondary: { wave: 'sawtooth', filter: 1800, env: { a: 0.02, d: 0.1, s: 0.9, r: 0.4 } },
          effects: { reverb: 0.2, delay: 0.1, chorus: 0.4 }
        }
      },
      PRESETS: {
        euphoric: { scale: 'joy', instrument: 'warm', tempo: 140, density: 0.8, complexity: 0.7 },
        melancholic: { scale: 'sorrow', instrument: 'dark', tempo: 60, density: 0.6, complexity: 0.9 },
        mysterious: { scale: 'mystic', instrument: 'dark', tempo: 80, density: 0.7, complexity: 0.8 },
        energetic: { scale: 'energy', instrument: 'bright', tempo: 160, density: 0.9, complexity: 0.6 },
        peaceful: { scale: 'calm', instrument: 'neutral', tempo: 90, density: 0.5, complexity: 0.4 },
        tense: { scale: 'tense', instrument: 'dark', tempo: 100, density: 0.8, complexity: 0.7 },
        dreamy: { scale: 'dream', instrument: 'neutral', tempo: 70, density: 0.6, complexity: 0.5 },
        neutral: { scale: 'neutral', instrument: 'neutral', tempo: 90, density: 0.5, complexity: 0.5 },
        happy: { scale: 'pentatonic', instrument: 'warm', tempo: 120, density: 0.7, complexity: 0.6 },
        sad: { scale: 'blues', instrument: 'dark', tempo: 70, density: 0.6, complexity: 0.7 }
      }
    },
    // ... остальная конфигурация остается
  };
  
  // УЛУЧШЕННЫЙ АНАЛИЗАТОР ТЕКСТА
  class EnhancedTextAnalyzer {
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
      const sentences = this.text.split(/[.!?]+/).filter(s => s.trim().length > 0);
      
      let vector = {
        warmth: 0,
        darkness: 0,
        intensity: 0,
        dynamism: 0,
        tension: 0,
        clarity: 0,
        positivity: 0,
        negativity: 0,
        complexity: 0
      };
      
      const lang = this.language === 'mixed' ? ['ru', 'en'] : [this.language];
      
      // Улучшенный анализ: учитываем контекст и последовательности
      lang.forEach(l => {
        const warmWords = NOISE_CONFIG.ANALYSIS.warmWords[l] || [];
        const darkWords = NOISE_CONFIG.ANALYSIS.darkWords[l] || [];
        
        // Анализируем не просто слова, а контекст
        for (let i = 0; i < words.length; i++) {
          const word = words[i];
          
          if (warmWords.includes(word)) {
            // Проверяем контекст (следующие/предыдущие слова)
            const contextWeight = this.getContextWeight(words, i, 'warm');
            vector.warmth += 0.7 * contextWeight;
            vector.positivity += 0.5 * contextWeight;
            vector.intensity += 0.4 * contextWeight;
          } else if (darkWords.includes(word)) {
            const contextWeight = this.getContextWeight(words, i, 'dark');
            vector.darkness += 0.8 * contextWeight;
            vector.negativity += 0.6 * contextWeight;
            vector.intensity += 0.6 * contextWeight;
            vector.tension += 0.3 * contextWeight;
          }
        }
      });
      
      // Учитываем структуру текста
      vector.dynamism = Math.min(1, sentences.length / 10);
      vector.clarity = Math.min(1, this.stats.uniqueWords / Math.max(this.stats.words, 1));
      vector.complexity = Math.min(1, (this.stats.avgSentenceLength * this.stats.avgWordLength) / 100);
      
      // Нормализация
      const total = Object.values(vector).reduce((a, b) => a + Math.abs(b), 0);
      if (total > 0) {
        Object.keys(vector).forEach(key => {
          vector[key] = vector[key] / total * 2; // Усиливаем значения
        });
      }
      
      return vector;
    }
    
    getContextWeight(words, index, type) {
      let weight = 1.0;
      const contextSize = 2;
      
      // Проверяем соседние слова
      for (let i = Math.max(0, index - contextSize); i <= Math.min(words.length - 1, index + contextSize); i++) {
        if (i === index) continue;
        
        const neighbor = words[i];
        const intensifiers = NOISE_CONFIG.ANALYSIS.modifiers[this.language === 'ru' ? 'ru' : 'en'].intensifiers;
        
        // Учитываем усилители
        intensifiers.forEach(level => {
          if (level.words.includes(neighbor)) {
            weight *= level.weight;
          }
        });
      }
      
      return weight;
    }
    
    createSemanticProfile() {
      const vector = this.emotionalVector;
      let dominantEmotion = 'neutral';
      
      // Улучшенная логика определения эмоции
      const scores = {
        euphoric: vector.warmth * 1.5 + vector.positivity - vector.tension,
        melancholic: vector.darkness * 1.5 + vector.negativity - vector.dynamism,
        tense: vector.tension * 2 + vector.darkness - vector.warmth,
        peaceful: vector.warmth * 0.7 - vector.tension * 0.5 + vector.clarity,
        mysterious: vector.darkness * 0.8 + vector.complexity * 1.2,
        energetic: vector.dynamism * 1.5 + vector.intensity,
        dreamy: vector.complexity * 1.3 - vector.tension,
        happy: vector.positivity * 1.2 + vector.warmth,
        sad: vector.negativity * 1.2 + vector.darkness
      };
      
      // Находим эмоцию с максимальным счетом
      let maxScore = 0;
      Object.entries(scores).forEach(([emotion, score]) => {
        if (score > maxScore) {
          maxScore = score;
          dominantEmotion = emotion;
        }
      });
      
      // Если все оценки низкие, используем нейтральную
      if (maxScore < 0.2) {
        dominantEmotion = 'neutral';
      }
      
      return {
        dominantEmotion: dominantEmotion,
        warmth: Math.max(0, vector.warmth),
        darkness: Math.max(0, vector.darkness),
        intensity: vector.intensity,
        dynamism: vector.dynamism,
        tension: vector.tension,
        clarity: vector.clarity,
        complexity: vector.complexity,
        positivity: vector.positivity,
        negativity: vector.negativity
      };
    }
    
    createAudioProfile() {
      const profile = this.semanticProfile;
      
      // ВСЕГДА возвращаем валидный пресет
      const preset = NOISE_CONFIG.AUDIO.PRESETS[profile.dominantEmotion] || NOISE_CONFIG.AUDIO.PRESETS.neutral;
      
      return {
        scale: preset.scale,
        instrument: preset.instrument,
        tempo: Math.max(40, Math.min(200, preset.tempo + 
          (profile.dynamism * 60) - 
          (profile.tension * 30) + 
          (profile.intensity * 40))),
        density: Math.max(0.1, Math.min(1, preset.density + 
          (profile.complexity * 0.3) - 
          (profile.clarity * 0.2))),
        complexity: Math.max(0.1, Math.min(1, preset.complexity + 
          (profile.complexity * 0.5))),
        brightness: 0.3 + profile.warmth * 0.6 - profile.darkness * 0.3,
        depth: 0.2 + profile.darkness * 0.8,
        panWidth: 0.3 + profile.dynamism * 0.4,
        reverbAmount: 0.3 + profile.darkness * 0.4
      };
    }
  }
  
  // УЛУЧШЕННЫЙ КОМПОЗИТОР
  class EnhancedAudioComposer {
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
      console.log('🎵 Creating composition with profile:', this.profile);
      
      const layers = {
        atmosphere: this.createAtmosphereLayer(),
        harmony: this.createHarmonyLayer(),
        rhythm: this.createRhythmLayer(),
        melody: this.createMelodyLayer(),
        bass: this.createBassLayer()
      };
      
      // Убираем пустые слои
      Object.keys(layers).forEach(key => {
        if (layers[key].length === 0) {
          delete layers[key];
        }
      });
      
      // Всегда гарантируем хотя бы атмосферный слой
      if (Object.keys(layers).length === 0) {
        layers.atmosphere = [{
          type: 'atmosphere',
          frequencies: [220, 330, 440],
          time: 0,
          duration: 4,
          velocity: 0.3,
          waveType: 'sine',
          filter: 800,
          pan: 0
        }];
      }
      
      const maxDuration = Math.max(
        ...Object.values(layers).flat().map(n => n.time + n.duration),
        8 // Минимум 8 секунд
      );
      
      return {
        layers: layers,
        duration: maxDuration,
        profile: this.profile,
        metadata: this.analyzer.analyzer.getAnalysisReport(),
        sessionId: 'noise-' + Math.random().toString(36).substr(2, 9)
      };
    }
    
    createAtmosphereLayer() {
      const notes = [];
      const duration = (60 / this.profile.tempo) * 8;
      const numChords = Math.max(2, Math.floor(this.profile.density * 6));
      
      for (let i = 0; i < numChords; i++) {
        const time = i * duration * 0.8;
        const chordNotes = [
          this.getScaleNote(0, 2),
          this.getScaleNote(2, 3),
          this.getScaleNote(4, 3),
          this.getScaleNote(6, 3)
        ];
        
        // Добавляем вариативность
        const chordType = Math.floor(Math.random() * 3);
        if (chordType === 1) {
          chordNotes.push(this.getScaleNote(1, 3)); // добавляем дополнительную ноту
        }
        
        notes.push({
          type: 'atmosphere',
          frequencies: chordNotes,
          time: time,
          duration: duration * (0.7 + Math.random() * 0.3),
          velocity: 0.2 + (i * 0.05),
          waveType: 'sine',
          filter: this.instrument.primary.filter * (0.5 + Math.random() * 0.5),
          pan: (Math.sin(i) * this.profile.panWidth)
        });
      }
      
      return notes;
    }
    
    createHarmonyLayer() {
      if (this.profile.complexity < 0.3) return [];
      
      const notes = [];
      const duration = (60 / this.profile.tempo) * 4;
      const numChords = Math.max(2, Math.floor(this.profile.density * 8));
      
      for (let i = 0; i < numChords; i++) {
        const time = i * duration * 0.9;
        const chordRoot = (i * 2) % 7;
        const chordNotes = [
          this.getScaleNote(chordRoot, 3),
          this.getScaleNote(chordRoot + 2, 3),
          this.getScaleNote(chordRoot + 4, 3)
        ];
        
        notes.push({
          type: 'harmony',
          frequencies: chordNotes,
          time: time,
          duration: duration * 0.6,
          velocity: 0.4 + Math.random() * 0.2,
          waveType: this.instrument.primary.wave,
          filter: this.instrument.primary.filter * (0.7 + Math.random() * 0.3),
          pan: (i % 2 === 0 ? -0.3 : 0.3) * this.profile.panWidth
        });
      }
      
      return notes;
    }
    
    createRhythmLayer() {
      const notes = [];
      const beatDuration = 60 / this.profile.tempo;
      const numBeats = Math.max(4, Math.floor(8 * this.profile.density));
      
      for (let beat = 0; beat < numBeats; beat++) {
        // Пропускаем некоторые доли для ритмичности
        if (Math.random() > this.profile.density * 0.8) continue;
        
        const time = beat * beatDuration;
        const freq = 80 + (beat % 4) * 30;
        
        notes.push({
          type: 'rhythm',
          frequencies: [freq],
          time: time,
          duration: beatDuration * 0.2,
          velocity: 0.3 + (beat % 2) * 0.2,
          waveType: 'square',
          filter: 600 + Math.random() * 400,
          pan: (beat % 2 === 0 ? -0.1 : 0.1)
        });
      }
      
      return notes;
    }
    
    createMelodyLayer() {
      if (this.profile.complexity < 0.4) return [];
      
      const notes = [];
      const words = this.analyzer.text.toLowerCase()
        .replace(/[^\p{L}\s\-']/gu, ' ')
        .split(/\s+/)
        .filter(w => w.length > 1);
      
      if (words.length === 0) return [];
      
      const noteDuration = (60 / this.profile.tempo) * 1.5;
      const melodyWords = words.slice(0, Math.min(16, words.length));
      
      let currentTime = 0;
      let previousNote = 0;
      
      melodyWords.forEach((word, index) => {
        // Пропускаем некоторые слова для создания ритма
        if (Math.random() > this.profile.density * 0.9) return;
        
        const time = currentTime;
        currentTime += noteDuration * (0.8 + Math.random() * 0.4);
        
        // Создаем более музыкальную мелодию
        const wordValue = this.calculateWordValue(word);
        const degree = (wordValue + index * 3) % (this.scale.length * 2);
        
        // Добавляем движение: иногда делаем шаг вверх, иногда вниз
        const direction = Math.random() > 0.5 ? 1 : -1;
        const step = Math.floor(Math.random() * 3) + 1;
        const melodyNote = Math.max(0, Math.min(this.scale.length * 2 - 1, 
          previousNote + (direction * step)));
        
        previousNote = melodyNote;
        
        const freq = this.getScaleNote(melodyNote, 4 + Math.floor(melodyNote / this.scale.length));
        
        notes.push({
          type: 'melody',
          frequencies: [freq],
          time: time,
          duration: noteDuration * (0.5 + Math.random() * 0.3),
          velocity: 0.5 + (index / melodyWords.length) * 0.3,
          waveType: this.instrument.primary.wave,
          filter: this.instrument.primary.filter * (0.8 + Math.random() * 0.4),
          pan: (Math.sin(index) * 0.4) * this.profile.panWidth,
          word: word
        });
      });
      
      return notes;
    }
    
    createBassLayer() {
      if (this.profile.density < 0.4) return [];
      
      const notes = [];
      const duration = (60 / this.profile.tempo) * 2;
      const numNotes = Math.max(2, Math.floor(4 * this.profile.density));
      
      for (let i = 0; i < numNotes; i++) {
        const time = i * duration;
        const degree = (i * 4) % 7;
        const freq = this.getScaleNote(degree, 2);
        
        notes.push({
          type: 'bass',
          frequencies: [freq],
          time: time,
          duration: duration * 0.8,
          velocity: 0.4,
          waveType: 'triangle',
          filter: 400,
          pan: 0
        });
      }
      
      return notes;
    }
    
    calculateWordValue(word) {
      // Более сложная функция для расчета значения слова
      let value = 0;
      for (let i = 0; i < word.length; i++) {
        value += word.charCodeAt(i);
      }
      return value % 100;
    }
  }
  
  // Обновим NoiseController для использования улучшенных классов
  class NoiseController {
    constructor() {
      console.log('🎛️ Enhanced Noise Controller Initializing');
      
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
      
      this.setupEventListeners();
      console.log('✅ Enhanced Noise Controller initialized');
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
        // Используем улучшенный анализатор
        this.analyzer = new EnhancedTextAnalyzer(text);
        this.composer = new EnhancedAudioComposer({ 
          analyzer: this.analyzer,
          audioProfile: this.analyzer.audioProfile 
        });
        this.composition = this.composer.composition;
        
        console.log('✅ Enhanced composition created successfully', {
          emotion: this.analyzer.semanticProfile.dominantEmotion,
          duration: this.composition.duration.toFixed(1),
          layers: Object.keys(this.composition.layers),
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
          const emotion = this.analyzer.semanticProfile.dominantEmotion;
          const tempo = Math.round(this.composition.profile.tempo);
          this.statusText.textContent = `${emotion} • ${tempo} BPM • ${Object.keys(this.composition.layers).length} layers`;
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
              frequencies: [220, 330, 440],
              time: 0,
              duration: 4,
              velocity: 0.3,
              waveType: 'sine',
              filter: 800,
              pan: 0
            }]
          },
          duration: 4,
          profile: { 
            tempo: 90,
            instrument: NOISE_CONFIG.AUDIO.INSTRUMENTS.neutral 
          },
          metadata: { summary: { emotion: 'demo', tempo: '90 BPM' } },
          sessionId: 'noise-demo'
        };
        
        if (this.statusText) {
          this.statusText.textContent = 'Demo mode (error creating composition)';
        }
      }
    }
    
    // ... остальные методы остаются без изменений
  }
  
  // Добавим экспорт класса
  window.NoiseController = NoiseController;
  window.EnhancedTextAnalyzer = EnhancedTextAnalyzer;
  
  console.log('=== ENHANCED NOISE ENGINE LOADED SUCCESSFULLY ===');
  console.log('💡 Tips:');
  console.log('- Type different texts to hear different music');
  console.log('- Long emotional texts create more complex compositions');
  console.log('- Use window.NoiseDebug in console for testing');
})();
