/**
 * SPY VS. SPY // AUDIO TERMINAL - MODERN CLEAN CLIENT APPLICATION
 * Features: Zero-latency Web Audio API, Canvas Visualizer, In-Browser ZIP Extractor (JSZip),
 * Cloudflare/CORS-resilient URL fetcher, IndexedDB persistence, Keyboard Hotkeys.
 */

(function () {
  'use strict';

  // --- DEFAULT SOUNDS CATALOG (PS2 RIPS) ---
  const DEFAULT_SOUNDS = [
    { id: 'DATA_00000.wav', file: './DATA_00000.wav', emoji: '🙀', name: 'Yeoww', category: 'reactions', desc: 'Classic panicked spy scream', duration: 1.15 },
    { id: 'DATA_00149.wav', file: './DATA_00149.wav', emoji: '💻', name: 'Hack & Break', category: 'tech', desc: 'Console hacking alarm & system breach', duration: 7.75 },
    { id: 'DATA_00164.wav', file: './DATA_00164.wav', emoji: '🕳️', name: 'Spy Hole', category: 'gadgets', desc: 'Secret hatch and periscope deploy', duration: 1.4 },
    { id: 'DATA_00174.wav', file: './DATA_00174.wav', emoji: '🔑', name: 'Ignition', category: 'gadgets', desc: 'Trap ignition / vehicle key turn', duration: 0.72 },
    { id: 'DATA_00189.wav', file: './DATA_00189.wav', emoji: '🚗', name: 'Engine Starting', category: 'gadgets', desc: 'Getaway engine cranking to life', duration: 2.77 },
    { id: 'DATA_00200.wav', file: './DATA_00200.wav', emoji: '⌨️', name: 'Typing', category: 'tech', desc: 'Rapid spy terminal keystroke', duration: 0.27 },
    { id: 'DATA_00212.wav', file: './DATA_00212.wav', emoji: '🔫', name: 'Laser', category: 'weapons', desc: 'High-tech raygun zap', duration: 0.5 },
    { id: 'DATA_00221.wav', file: './DATA_00221.wav', emoji: '⏲️', name: 'Bomb Timer', category: 'weapons', desc: 'Ticking time bomb before detonation', duration: 2.79 },
    { id: 'DATA_00250.wav', file: './DATA_00250.wav', emoji: '🐒', name: 'Monkey Laugh', category: 'reactions', desc: 'Taunting cackling laugh', duration: 1.82 },
    { id: 'DATA_00252.wav', file: './DATA_00252.wav', emoji: '😈', name: 'Mwahahaha', category: 'reactions', desc: 'Diabolical villain laughter', duration: 2.3 },
    { id: 'DATA_00264.wav', file: './DATA_00264.wav', emoji: '🚪', name: 'Electronic Door', category: 'tech', desc: 'Automated bunker bulkhead door', duration: 0.98 },
    { id: 'DATA_00271.wav', file: './DATA_00271.wav', emoji: '📡', name: 'Scanning', category: 'gadgets', desc: 'Radar sweep and frequency scanner', duration: 0.73 },
    { id: 'DATA_00275.wav', file: './DATA_00275.wav', emoji: '🛎️', name: 'Bell', category: 'foley', desc: 'Clear resonant desk bell chime', duration: 6.32 },
    { id: 'DATA_00295.wav', file: './DATA_00295.wav', emoji: '🦹', name: 'Evil Laugh', category: 'reactions', desc: 'Sinister mastermind chuckle', duration: 0.95 },
    { id: 'DATA_00301.wav', file: './DATA_00301.wav', emoji: '🗣️', name: 'Chatter', category: 'reactions', desc: 'Incomprehensible spy murmur', duration: 0.6 },
    { id: 'DATA_00329.wav', file: './DATA_00329.wav', emoji: '⚡', name: 'Electrocution', category: 'weapons', desc: 'High-voltage electric zap & yell', duration: 6.29 },
    { id: 'DATA_00330.wav', file: './DATA_00330.wav', emoji: '⚡', name: 'Shock Voltage', category: 'weapons', desc: 'Sustained electrical zap discharge', duration: 3.43 },
    { id: 'DATA_00358.wav', file: './DATA_00358.wav', emoji: '💨', name: 'Whoosh Impact', category: 'foley', desc: 'Swift dodge and impact swoosh', duration: 0.83 },
    { id: 'DATA_00386.wav', file: './DATA_00386.wav', emoji: '🚁', name: 'Helicopter Leave', category: 'gadgets', desc: 'Extraction helicopter blades departing', duration: 6.99 },
    { id: 'DATA_00402.wav', file: './DATA_00402.wav', emoji: '💥', name: 'Bomb Boom', category: 'weapons', desc: 'Heavy cartoon dynamite explosion', duration: 1.18 },
    { id: 'DATA_00405.wav', file: './DATA_00405.wav', emoji: '🐣', name: 'Chirp', category: 'foley', desc: 'Tiny gadget chirp alert', duration: 0.15 },
    { id: 'DATA_00408.wav', file: './DATA_00408.wav', emoji: '🌀', name: 'Spring Trap', category: 'weapons', desc: 'Bouncy boxing glove spring coil', duration: 2.21 },
    { id: 'DATA_00416.wav', file: './DATA_00416.wav', emoji: '📞', name: 'Phone Dial', category: 'tech', desc: 'Rotary / touch-tone phone bleep', duration: 0.28 },
    { id: 'DATA_00418.wav', file: './DATA_00418.wav', emoji: '💧', name: 'Plonk', category: 'foley', desc: 'Drip drop water plunk', duration: 0.31 },
    { id: 'DATA_00419.wav', file: './DATA_00419.wav', emoji: '🚰', name: 'Valve / Yell', category: 'reactions', desc: 'Steam pipe release and shout', duration: 0.93 },
    { id: 'DATA_00424.wav', file: './DATA_00424.wav', emoji: '💥', name: 'Pew-Gun', category: 'weapons', desc: 'Arcade blaster gunshot', duration: 0.34 },
    { id: 'DATA_00425.wav', file: './DATA_00425.wav', emoji: '📢', name: 'Bike Horn', category: 'foley', desc: 'Classic cartoon squeeze horn honk', duration: 0.53 }
  ];

  const HOTKEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Z', 'X', 'C', 'V', 'B', 'N', 'M'];

  // --- APPLICATION STATE ---
  const state = {
    audioCtx: null,
    masterGain: null,
    analyser: null,
    audioBufferCache: new Map(), // soundId -> AudioBuffer
    activeSources: new Map(),    // soundId -> { source, startTime, duration, rafId, loop }
    customSounds: [],            // Custom imported items
    allSounds: [],               // Combined default + custom
    favorites: new Set(JSON.parse(localStorage.getItem('spy_soundboard_favorites') || '[]')),
    loopingSounds: new Set(),
    activeCategory: 'all',
    searchQuery: '',
    currentSpeed: 1.0,
    volume: 1.0,
    isMuted: false,
    playbackMode: localStorage.getItem('spy_playback_mode') || 'poly', // 'poly' or 'solo'
    viewMode: localStorage.getItem('spy_view_mode') || 'grid',         // 'grid' or 'compact'
    showHotkeys: localStorage.getItem('spy_show_hotkeys') !== 'false',
    theme: localStorage.getItem('spy_theme') || 'shadow',
    loadedCount: 0
  };

  // --- INDEXED DB ENGINE ---
  const DB_NAME = 'SpySoundboardDB';
  const DB_VERSION = 1;
  const STORE_NAME = 'custom_sounds';

  function openDatabase() {
    return new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, DB_VERSION);
      req.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        }
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }

  async function loadCustomSoundsFromDB() {
    try {
      const db = await openDatabase();
      return new Promise((resolve) => {
        const tx = db.transaction(STORE_NAME, 'readonly');
        const store = tx.objectStore(STORE_NAME);
        const req = store.getAll();
        req.onsuccess = () => resolve(req.result || []);
        req.onerror = () => resolve([]);
      });
    } catch (err) {
      console.warn('IndexedDB unavailable:', err);
      return [];
    }
  }

  async function saveCustomSoundToDB(soundObj) {
    try {
      const db = await openDatabase();
      const tx = db.transaction(STORE_NAME, 'readwrite');
      tx.objectStore(STORE_NAME).put(soundObj);
    } catch (err) {
      console.warn('Failed to save to IndexedDB:', err);
    }
  }

  async function deleteCustomSoundFromDB(id) {
    try {
      const db = await openDatabase();
      const tx = db.transaction(STORE_NAME, 'readwrite');
      tx.objectStore(STORE_NAME).delete(id);
    } catch (err) {
      console.warn('Failed to delete from IndexedDB:', err);
    }
  }

  // --- AUDIO ENGINE ---
  function initAudioContext() {
    if (state.audioCtx) return state.audioCtx;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return null;

    state.audioCtx = new AudioContextClass();

    state.masterGain = state.audioCtx.createGain();
    state.masterGain.gain.setValueAtTime(state.isMuted ? 0 : state.volume, state.audioCtx.currentTime);

    state.analyser = state.audioCtx.createAnalyser();
    state.analyser.fftSize = 128;
    state.analyser.smoothingTimeConstant = 0.8;

    state.masterGain.connect(state.analyser);
    state.analyser.connect(state.audioCtx.destination);

    initVisualizer();
    return state.audioCtx;
  }

  async function loadAudioBuffer(sound) {
    if (state.audioBufferCache.has(sound.id)) {
      return state.audioBufferCache.get(sound.id);
    }

    initAudioContext();
    if (!state.audioCtx) return null;

    try {
      let arrayBuffer;
      if (sound.audioData) {
        // Blob or ArrayBuffer from IndexedDB or ZIP
        arrayBuffer = sound.audioData instanceof ArrayBuffer 
          ? sound.audioData 
          : await sound.audioData.arrayBuffer();
      } else if (sound.file) {
        const resp = await fetch(sound.file);
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        arrayBuffer = await resp.arrayBuffer();
      } else {
        throw new Error('No audio source provided');
      }

      // decodeAudioData consumes the arrayBuffer, so slice a copy if we need to reuse it
      const copy = arrayBuffer.slice(0);
      const audioBuffer = await state.audioCtx.decodeAudioData(copy);
      state.audioBufferCache.set(sound.id, audioBuffer);
      return audioBuffer;
    } catch (err) {
      console.error(`Failed to load audio for ${sound.id}:`, err);
      return null;
    }
  }

  // Pre-cache all sounds in the background
  async function preCacheSounds() {
    const statusEl = document.getElementById('loader-status');
    const total = state.allSounds.length;

    for (let i = 0; i < total; i++) {
      const sound = state.allSounds[i];
      try {
        const buf = await loadAudioBuffer(sound);
        if (buf && !sound.duration) {
          sound.duration = Math.round(buf.duration * 100) / 100;
        }
        state.loadedCount++;
        const card = document.querySelector(`.sound-card[data-id="${CSS.escape(sound.id)}"]`);
        if (card) card.classList.add('cached');

        if (statusEl) {
          if (state.loadedCount === total) {
            statusEl.innerHTML = `All sounds cached // Ready (${state.loadedCount}/${total})`;
            statusEl.style.color = 'var(--accent)';
          } else {
            statusEl.textContent = `Pre-caching audio: ${state.loadedCount}/${total}`;
          }
        }
      } catch (e) {
        console.warn('Pre-cache error:', e);
      }
    }
  }

  // Play Sound Node
  async function playSound(soundId) {
    initAudioContext();
    if (state.audioCtx.state === 'suspended') {
      await state.audioCtx.resume();
    }

    const sound = state.allSounds.find(s => s.id === soundId);
    if (!sound) return;

    // If already playing, toggle stop
    if (state.activeSources.has(soundId)) {
      stopSound(soundId);
      return;
    }

    // In Exclusive (solo) mode, stop everything else
    if (state.playbackMode === 'solo') {
      stopAllSounds();
    }

    const buffer = await loadAudioBuffer(sound);
    if (!buffer) {
      showToast(`⚠️ Could not decode audio: ${sound.name}`);
      return;
    }

    const source = state.audioCtx.createBufferSource();
    source.buffer = buffer;
    source.playbackRate.value = state.currentSpeed;
    source.loop = state.loopingSounds.has(soundId);

    source.connect(state.masterGain);

    const startTime = state.audioCtx.currentTime;
    const effectiveDuration = (buffer.duration / state.currentSpeed);

    source.start(0);

    const card = document.querySelector(`.sound-card[data-id="${CSS.escape(soundId)}"]`);
    if (card) {
      card.classList.add('playing');
    }

    // Update active telemetry
    updateActiveTelemetry();

    // Progress Bar Animation
    const progressBar = card ? card.querySelector('.card-progress-bar') : null;
    function updateProgress() {
      if (!state.activeSources.has(soundId)) return;
      const elapsed = state.audioCtx.currentTime - startTime;
      if (progressBar) {
        const percent = Math.min(100, (elapsed / effectiveDuration) * 100);
        progressBar.style.width = `${percent}%`;
      }
      if (elapsed < effectiveDuration || source.loop) {
        const rafId = requestAnimationFrame(updateProgress);
        const item = state.activeSources.get(soundId);
        if (item) item.rafId = rafId;
      }
    }
    const rafId = requestAnimationFrame(updateProgress);

    source.onended = () => {
      // Loop check
      if (source.loop && state.activeSources.has(soundId)) {
        return;
      }
      stopSound(soundId, false);
    };

    state.activeSources.set(soundId, {
      source,
      startTime,
      duration: effectiveDuration,
      rafId,
      loop: source.loop
    });
  }

  function stopSound(soundId, cancelNode = true) {
    if (!state.activeSources.has(soundId)) return;
    const active = state.activeSources.get(soundId);

    if (cancelNode) {
      try {
        active.source.stop();
        active.source.disconnect();
      } catch (e) {}
    }
    cancelAnimationFrame(active.rafId);
    state.activeSources.delete(soundId);

    const card = document.querySelector(`.sound-card[data-id="${CSS.escape(soundId)}"]`);
    if (card) {
      card.classList.remove('playing');
      const progressBar = card.querySelector('.card-progress-bar');
      if (progressBar) progressBar.style.width = '0%';
    }
    updateActiveTelemetry();
  }

  function stopAllSounds() {
    state.activeSources.forEach((active, id) => {
      try {
        active.source.stop();
        active.source.disconnect();
      } catch (e) {}
      cancelAnimationFrame(active.rafId);
    });
    state.activeSources.clear();

    document.querySelectorAll('.sound-card.playing').forEach(card => {
      card.classList.remove('playing');
      const progressBar = card.querySelector('.card-progress-bar');
      if (progressBar) progressBar.style.width = '0%';
    });
    updateActiveTelemetry();
  }

  function updateActiveTelemetry() {
    const countEl = document.getElementById('active-voices-count');
    if (countEl) {
      countEl.textContent = state.activeSources.size;
    }
  }

  // --- REALTIME AUDIO VISUALIZER ---
  function initVisualizer() {
    const canvas = document.getElementById('audio-visualizer');
    if (!canvas || !state.analyser) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    function resize() {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    }
    resize();
    window.addEventListener('resize', resize);

    const bufferLength = state.analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    let idleAngle = 0;

    function draw() {
      requestAnimationFrame(draw);
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);

      state.analyser.getByteFrequencyData(dataArray);

      // Check if there is active audio
      let sum = 0;
      for (let i = 0; i < bufferLength; i++) sum += dataArray[i];
      const isAudible = sum > 10;

      if (!isAudible) {
        // Draw idle radar wave
        idleAngle += 0.04;
        ctx.beginPath();
        ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--border-subtle').trim() || '#1f2937';
        ctx.lineWidth = 1.5;
        const midY = height / 2;
        ctx.moveTo(0, midY);

        for (let x = 0; x < width; x += 3) {
          const y = midY + Math.sin(x * 0.03 + idleAngle) * 3;
          ctx.lineTo(x, y);
        }
        ctx.stroke();
        return;
      }

      // Draw real-time glowing frequency bars
      const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#00ffcc';
      const numBars = Math.min(bufferLength, 32);
      const barWidth = (width / numBars) - 2;

      for (let i = 0; i < numBars; i++) {
        const val = dataArray[i] / 255.0;
        const barHeight = Math.max(3, val * (height - 4));
        const x = i * (barWidth + 2);
        const y = height - barHeight;

        ctx.fillStyle = accentColor;
        ctx.fillRect(x, y, barWidth, barHeight);

        // Peak dot
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(x, Math.max(0, y - 3), barWidth, 2);
      }
    }
    requestAnimationFrame(draw);
  }

  // --- SOUNDBOARD RENDERING ---
  function renderSoundboard() {
    const grid = document.getElementById('soundboard-grid');
    if (!grid) return;

    // Filter by category & search query
    const filtered = state.allSounds.filter(sound => {
      // Category filter
      if (state.activeCategory === 'favorites') {
        if (!state.favorites.has(sound.id)) return false;
      } else if (state.activeCategory === 'custom') {
        if (!sound.isCustom) return false;
      } else if (state.activeCategory !== 'all') {
        if (sound.category !== state.activeCategory) return false;
      }

      // Search query filter
      if (state.searchQuery) {
        const q = state.searchQuery.toLowerCase();
        const matchesName = sound.name.toLowerCase().includes(q);
        const matchesId = sound.id.toLowerCase().includes(q);
        const matchesDesc = (sound.desc || '').toLowerCase().includes(q);
        const matchesCat = (sound.category || '').toLowerCase().includes(q);
        if (!matchesName && !matchesId && !matchesDesc && !matchesCat) return false;
      }

      return true;
    });

    // Update sound count telemetry
    const totalCountEl = document.getElementById('total-sounds-count');
    if (totalCountEl) totalCountEl.textContent = state.allSounds.length;

    // Update categories count badges
    updateCategoryCounts();

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="grid-empty-state">
          <div class="empty-icon">🕵️‍♂️</div>
          <h3>NO CLASSIFIED AUDIO FOUND</h3>
          <p>No sound effects match your current search query or filter. Clear the search or pull in files to add more!</p>
          <button id="empty-clear-btn" class="btn btn-primary">CLEAR FILTERS</button>
        </div>
      `;
      const clearBtn = document.getElementById('empty-clear-btn');
      if (clearBtn) {
        clearBtn.addEventListener('click', () => {
          state.searchQuery = '';
          state.activeCategory = 'all';
          const input = document.getElementById('search-input');
          if (input) input.value = '';
          updateCategoryTabs();
          renderSoundboard();
        });
      }
      return;
    }

    // Grid vs Compact class
    if (state.viewMode === 'compact') {
      grid.classList.add('compact-view');
    } else {
      grid.classList.remove('compact-view');
    }

    grid.innerHTML = filtered.map((sound, idx) => {
      const isPlaying = state.activeSources.has(sound.id);
      const isStarred = state.favorites.has(sound.id);
      const isLooping = state.loopingSounds.has(sound.id);
      const hotkey = HOTKEYS[idx] || '';
      const durationFormatted = sound.duration ? `${sound.duration.toFixed(1)}s` : '--';

      return `
        <div class="sound-card ${isPlaying ? 'playing' : ''} ${state.audioBufferCache.has(sound.id) ? 'cached' : ''}" 
             data-id="${sound.id}" 
             data-hotkey="${hotkey}" 
             tabindex="0"
             role="button"
             title="${sound.desc || sound.name}">
          
          <div class="card-progress-bar"></div>

          <div class="card-top">
            <span class="card-hotkey" style="${state.showHotkeys && hotkey ? '' : 'display: none;'}">[ ${hotkey} ]</span>
            <div class="card-actions-mini" onclick="event.stopPropagation();">
              <button class="mini-action-btn loop-btn ${isLooping ? 'active' : ''}" 
                      title="${isLooping ? 'Disable Loop' : 'Enable Loop'}" 
                      data-sound-id="${sound.id}">🔁</button>
              <button class="mini-action-btn star-btn ${isStarred ? 'starred' : ''}" 
                      title="${isStarred ? 'Remove from favorites' : 'Star favorite'}" 
                      data-sound-id="${sound.id}">⭐</button>
              ${sound.isCustom ? `
                <button class="mini-action-btn delete-btn" 
                        title="Delete custom sound" 
                        data-sound-id="${sound.id}">🗑️</button>
              ` : ''}
            </div>
          </div>

          <div class="card-center">
            <div class="card-icon-wrap">${sound.emoji || '🎵'}</div>
            <div class="card-title">${escapeHtml(sound.name)}</div>
          </div>

          <div class="card-bottom">
            <span class="card-duration">${durationFormatted}</span>
            <span class="card-filename">${escapeHtml(sound.id)}</span>
            <div class="card-playing-indicator">
              <span class="eq-bar"></span>
              <span class="eq-bar"></span>
              <span class="eq-bar"></span>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Attach click listeners to cards
    grid.querySelectorAll('.sound-card').forEach(card => {
      const id = card.dataset.id;
      card.addEventListener('click', () => {
        playSound(id);
      });

      // Mini actions
      const starBtn = card.querySelector('.star-btn');
      if (starBtn) {
        starBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          toggleFavorite(id);
        });
      }

      const loopBtn = card.querySelector('.loop-btn');
      if (loopBtn) {
        loopBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          toggleLoop(id);
        });
      }

      const delBtn = card.querySelector('.delete-btn');
      if (delBtn) {
        delBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          deleteCustomSound(id);
        });
      }
    });
  }

  function updateCategoryCounts() {
    const counts = {
      all: state.allSounds.length,
      reactions: 0,
      weapons: 0,
      gadgets: 0,
      tech: 0,
      foley: 0,
      favorites: state.favorites.size,
      custom: state.customSounds.length
    };

    state.allSounds.forEach(s => {
      if (counts[s.category] !== undefined) counts[s.category]++;
    });

    document.querySelectorAll('.cat-pill').forEach(pill => {
      const cat = pill.dataset.category;
      const countEl = pill.querySelector('.cat-count');
      if (countEl && counts[cat] !== undefined) {
        countEl.textContent = counts[cat];
      }
    });
  }

  function updateCategoryTabs() {
    document.querySelectorAll('.cat-pill').forEach(pill => {
      pill.classList.toggle('active', pill.dataset.category === state.activeCategory);
    });
  }

  function toggleFavorite(soundId) {
    if (state.favorites.has(soundId)) {
      state.favorites.delete(soundId);
    } else {
      state.favorites.add(soundId);
    }
    localStorage.setItem('spy_soundboard_favorites', JSON.stringify([...state.favorites]));
    renderSoundboard();
  }

  function toggleLoop(soundId) {
    if (state.loopingSounds.has(soundId)) {
      state.loopingSounds.delete(soundId);
    } else {
      state.loopingSounds.add(soundId);
    }
    // Update live source loop state if playing
    if (state.activeSources.has(soundId)) {
      state.activeSources.get(soundId).source.loop = state.loopingSounds.has(soundId);
    }
    renderSoundboard();
  }

  async function deleteCustomSound(soundId) {
    await deleteCustomSoundFromDB(soundId);
    state.customSounds = state.customSounds.filter(s => s.id !== soundId);
    state.allSounds = [...DEFAULT_SOUNDS, ...state.customSounds];
    state.audioBufferCache.delete(soundId);
    stopSound(soundId);
    renderSoundboard();
    showToast('Custom sound deleted.');
  }

  // --- EMOJI & CATEGORY INFERENCE FROM FILENAME ---
  function inferEmojiAndCategory(filename) {
    const fn = filename.toLowerCase();

    // Reactions & laughs
    if (fn.includes('laugh') || fn.includes('mwah') || fn.includes('chuckle') || fn.includes('cackle')) {
      return { emoji: '😈', category: 'reactions' };
    }
    if (fn.includes('scream') || fn.includes('yeow') || fn.includes('yell') || fn.includes('pain') || fn.includes('shout')) {
      return { emoji: '🙀', category: 'reactions' };
    }
    if (fn.includes('chatter') || fn.includes('voice') || fn.includes('talk') || fn.includes('speech')) {
      return { emoji: '🗣️', category: 'reactions' };
    }

    // Weapons & traps
    if (fn.includes('bomb') || fn.includes('boom') || fn.includes('explod') || fn.includes('dynamite')) {
      return { emoji: '💥', category: 'weapons' };
    }
    if (fn.includes('laser') || fn.includes('gun') || fn.includes('blast') || fn.includes('pew') || fn.includes('shoot') || fn.includes('bullet')) {
      return { emoji: '🔫', category: 'weapons' };
    }
    if (fn.includes('electr') || fn.includes('shock') || fn.includes('volt') || fn.includes('zap') || fn.includes('lightning')) {
      return { emoji: '⚡', category: 'weapons' };
    }
    if (fn.includes('timer') || fn.includes('clock') || fn.includes('tick')) {
      return { emoji: '⏲️', category: 'weapons' };
    }
    if (fn.includes('spring') || fn.includes('trap') || fn.includes('box')) {
      return { emoji: '🌀', category: 'weapons' };
    }

    // Gadgets & vehicles
    if (fn.includes('heli') || fn.includes('rotor') || fn.includes('chopper') || fn.includes('fly')) {
      return { emoji: '🚁', category: 'gadgets' };
    }
    if (fn.includes('car') || fn.includes('engine') || fn.includes('motor') || fn.includes('drive')) {
      return { emoji: '🚗', category: 'gadgets' };
    }
    if (fn.includes('key') || fn.includes('ignit')) {
      return { emoji: '🔑', category: 'gadgets' };
    }
    if (fn.includes('radar') || fn.includes('scan') || fn.includes('sonar') || fn.includes('detect')) {
      return { emoji: '📡', category: 'gadgets' };
    }
    if (fn.includes('hole') || fn.includes('periscope') || fn.includes('spy')) {
      return { emoji: '🕳️', category: 'gadgets' };
    }

    // Tech
    if (fn.includes('hack') || fn.includes('comput') || fn.includes('code') || fn.includes('alarm')) {
      return { emoji: '💻', category: 'tech' };
    }
    if (fn.includes('type') || fn.includes('key') || fn.includes('keyboard')) {
      return { emoji: '⌨️', category: 'tech' };
    }
    if (fn.includes('door') || fn.includes('gate') || fn.includes('bulkhead')) {
      return { emoji: '🚪', category: 'tech' };
    }
    if (fn.includes('phone') || fn.includes('dial') || fn.includes('call') || fn.includes('ring')) {
      return { emoji: '📞', category: 'tech' };
    }

    // Foley
    if (fn.includes('bell') || fn.includes('chime') || fn.includes('ding')) {
      return { emoji: '🛎️', category: 'foley' };
    }
    if (fn.includes('horn') || fn.includes('honk') || fn.includes('squeak')) {
      return { emoji: '📢', category: 'foley' };
    }
    if (fn.includes('water') || fn.includes('plonk') || fn.includes('drip') || fn.includes('drop')) {
      return { emoji: '💧', category: 'foley' };
    }
    if (fn.includes('whoosh') || fn.includes('swoosh') || fn.includes('wind') || fn.includes('hit') || fn.includes('punch')) {
      return { emoji: '💨', category: 'foley' };
    }
    if (fn.includes('chirp') || fn.includes('bird') || fn.includes('beep')) {
      return { emoji: '🐣', category: 'foley' };
    }

    return { emoji: '🎵', category: 'foley' };
  }

  function cleanSoundTitle(filename) {
    let name = filename.replace(/\.[^/.]+$/, ''); // Remove extension
    name = name.replace(/^DATA_0*/i, 'Sound #'); // If DATA_00149 -> Sound #149
    name = name.replace(/[-_]/g, ' ');           // Replace hyphens/underscores with space
    name = name.replace(/([a-z])([A-Z])/g, '$1 $2'); // CamelCase to spaces
    return name.trim();
  }

  // --- ZIP EXTRACTION & FILE IMPORT (JSZip) ---
  async function processZipFile(zipFile) {
    if (!window.JSZip) {
      showToast('⚠️ JSZip library loading, please wait...');
      return;
    }

    showToast('📦 Unpacking ZIP sound archive...');

    try {
      const zip = new JSZip();
      const loadedZip = await zip.loadAsync(zipFile);
      const audioFiles = [];

      loadedZip.forEach((relativePath, zipEntry) => {
        if (!zipEntry.dir && /\.(wav|mp3|ogg|flac|m4a|aac)$/i.test(zipEntry.name)) {
          audioFiles.push(zipEntry);
        }
      });

      if (audioFiles.length === 0) {
        showToast('⚠️ No audio files found in ZIP archive.');
        return;
      }

      showToast(`Decoding ${audioFiles.length} sound files...`);
      let importedCount = 0;

      for (const entry of audioFiles) {
        const arrayBuf = await entry.async('arraybuffer');
        const filename = entry.name.split('/').pop();
        const { emoji, category } = inferEmojiAndCategory(filename);
        const name = cleanSoundTitle(filename);

        const newSound = {
          id: `custom_${Date.now()}_${Math.random().toString(36).substr(2, 6)}_${filename}`,
          name: name,
          emoji: emoji,
          category: category,
          desc: `Imported from ${zipFile.name}`,
          audioData: arrayBuf,
          isCustom: true,
          duration: 0
        };

        // Cache buffer to precalculate duration
        initAudioContext();
        if (state.audioCtx) {
          try {
            const buf = await state.audioCtx.decodeAudioData(arrayBuf.slice(0));
            newSound.duration = Math.round(buf.duration * 100) / 100;
            state.audioBufferCache.set(newSound.id, buf);
          } catch (e) {
            console.warn('Decode error for', filename, e);
          }
        }

        await saveCustomSoundToDB(newSound);
        state.customSounds.push(newSound);
        importedCount++;
      }

      state.allSounds = [...DEFAULT_SOUNDS, ...state.customSounds];
      renderSoundboard();
      showToast(`🎉 Successfully extracted ${importedCount} sounds!`);
      closeModal('import-modal');
    } catch (err) {
      console.error('ZIP extraction failed:', err);
      showToast('⚠️ Failed to extract ZIP archive: ' + err.message);
    }
  }

  async function processAudioFiles(fileList) {
    let count = 0;
    for (const file of fileList) {
      if (!/\.(wav|mp3|ogg|flac|m4a|aac)$/i.test(file.name)) continue;

      const arrayBuf = await file.arrayBuffer();
      const { emoji, category } = inferEmojiAndCategory(file.name);
      const name = cleanSoundTitle(file.name);

      const newSound = {
        id: `custom_${Date.now()}_${Math.random().toString(36).substr(2, 6)}_${file.name}`,
        name: name,
        emoji: emoji,
        category: category,
        desc: `Imported local file: ${file.name}`,
        audioData: arrayBuf,
        isCustom: true,
        duration: 0
      };

      initAudioContext();
      if (state.audioCtx) {
        try {
          const buf = await state.audioCtx.decodeAudioData(arrayBuf.slice(0));
          newSound.duration = Math.round(buf.duration * 100) / 100;
          state.audioBufferCache.set(newSound.id, buf);
        } catch (e) {}
      }

      await saveCustomSoundToDB(newSound);
      state.customSounds.push(newSound);
      count++;
    }

    if (count > 0) {
      state.allSounds = [...DEFAULT_SOUNDS, ...state.customSounds];
      renderSoundboard();
      showToast(`🎉 Imported ${count} audio file${count > 1 ? 's' : ''}!`);
      closeModal('import-modal');
    } else {
      showToast('⚠️ No valid audio files were selected.');
    }
  }

  // --- URL IMPORT HANDLER ---
  async function fetchSoundFromUrl(url) {
    if (!url || !url.trim()) return;
    const cleanUrl = url.trim();

    // Check if it's a Spriters/Sounds Resource asset page URL
    if (cleanUrl.includes('spriters-resource.com') || cleanUrl.includes('sounds-resource.com')) {
      const notice = document.getElementById('spriters-notice-box');
      if (notice) {
        notice.scrollIntoView({ behavior: 'smooth' });
        notice.style.boxShadow = '0 0 20px var(--accent)';
        setTimeout(() => notice.style.boxShadow = '', 2000);
      }
      showToast('💡 See the Sounds Resource guide above to drop the asset ZIP!');
      return;
    }

    showToast('Fetching audio from URL...');

    // Attempt direct fetch first, then fallback to CORS proxies
    const fetchMethods = [
      () => fetch(cleanUrl),
      () => fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(cleanUrl)}`),
      () => fetch(`https://corsproxy.io/?url=${encodeURIComponent(cleanUrl)}`)
    ];

    let response = null;
    for (const method of fetchMethods) {
      try {
        const resp = await method();
        if (resp.ok) {
          response = resp;
          break;
        }
      } catch (e) {}
    }

    if (!response) {
      showToast('⚠️ Could not fetch URL (CORS or server error). Download it and drop the file instead!');
      return;
    }

    try {
      const arrayBuf = await response.arrayBuffer();
      const filename = cleanUrl.split('/').pop().split('?')[0] || 'remote_audio.wav';

      // Check if it's a ZIP file
      if (filename.endsWith('.zip')) {
        await processZipFile(new Blob([arrayBuf], { type: 'application/zip' }));
        return;
      }

      const { emoji, category } = inferEmojiAndCategory(filename);
      const name = cleanSoundTitle(filename);

      const newSound = {
        id: `custom_${Date.now()}_${filename}`,
        name: name,
        emoji: emoji,
        category: category,
        desc: `Fetched from ${cleanUrl}`,
        audioData: arrayBuf,
        isCustom: true,
        duration: 0
      };

      initAudioContext();
      if (state.audioCtx) {
        try {
          const buf = await state.audioCtx.decodeAudioData(arrayBuf.slice(0));
          newSound.duration = Math.round(buf.duration * 100) / 100;
          state.audioBufferCache.set(newSound.id, buf);
        } catch (e) {}
      }

      await saveCustomSoundToDB(newSound);
      state.customSounds.push(newSound);
      state.allSounds = [...DEFAULT_SOUNDS, ...state.customSounds];
      renderSoundboard();
      showToast(`🎉 Imported "${name}"!`);
      closeModal('import-modal');
    } catch (err) {
      console.error('URL processing failed:', err);
      showToast('⚠️ Failed to decode audio from URL.');
    }
  }

  // --- UI MODALS ---
  function openModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.add('open');

    if (id === 'import-modal') {
      renderCustomLibraryInModal();
    }
  }

  function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.remove('open');
  }

  function renderCustomLibraryInModal() {
    const container = document.getElementById('modal-custom-list');
    if (!container) return;

    if (state.customSounds.length === 0) {
      container.innerHTML = `
        <div style="font-size: 11.5px; color: var(--text-muted); text-align: center; padding: 16px;">
          No custom sounds imported yet. Drop a ZIP or audio file above!
        </div>
      `;
      return;
    }

    container.innerHTML = state.customSounds.map(sound => `
      <div class="custom-item-row">
        <div class="custom-item-left">
          <span>${sound.emoji}</span>
          <span class="custom-item-name">${escapeHtml(sound.name)}</span>
          <span style="font-size: 10px; color: var(--text-muted);">(${sound.duration ? sound.duration.toFixed(1) + 's' : '--'})</span>
        </div>
        <div style="display: flex; gap: 6px;">
          <button class="btn btn-ghost" style="padding: 4px 8px; font-size: 11px;" onclick="window.SpyApp.previewSound('${sound.id}')">▶ Play</button>
          <button class="btn btn-danger" style="padding: 4px 8px; font-size: 11px;" onclick="window.SpyApp.deleteCustomSound('${sound.id}')">🗑</button>
        </div>
      </div>
    `).join('');
  }

  // --- TOAST NOTIFICATIONS ---
  function showToast(message) {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>🕵️‍♂️</span> <span>${escapeHtml(message)}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.2s ease';
      setTimeout(() => toast.remove(), 250);
    }, 3200);
  }

  // --- UTILS ---
  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>"']/g, m => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[m]));
  }

  // --- KEYBOARD LISTENER ---
  function setupKeyboardShortcuts() {
    window.addEventListener('keydown', (e) => {
      // Don't trigger hotkeys if user is typing in an input
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) {
        if (e.key === 'Escape') {
          document.activeElement.blur();
        }
        return;
      }

      // Space -> Stop all
      if (e.code === 'Space') {
        e.preventDefault();
        stopAllSounds();
        return;
      }

      // Slash -> Search focus
      if (e.key === '/') {
        e.preventDefault();
        const searchInput = document.getElementById('search-input');
        if (searchInput) searchInput.focus();
        return;
      }

      // R -> Random sound
      if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        triggerRandomSound();
        return;
      }

      // Escape -> Close modals
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-backdrop.open').forEach(m => m.classList.remove('open'));
        return;
      }

      // Number & Letter hotkeys for sound cards
      const pressed = e.key.toUpperCase();
      const card = document.querySelector(`.sound-card[data-hotkey="${pressed}"]`);
      if (card) {
        e.preventDefault();
        const id = card.dataset.id;
        playSound(id);
      }
    });
  }

  function triggerRandomSound() {
    if (state.allSounds.length === 0) return;
    const randomSound = state.allSounds[Math.floor(Math.random() * state.allSounds.length)];
    playSound(randomSound.id);
  }

  // --- DRAG & DROP SETUP ---
  function setupDragAndDrop() {
    const globalOverlay = document.getElementById('global-drag-overlay');
    let dragCounter = 0;

    window.addEventListener('dragenter', (e) => {
      e.preventDefault();
      dragCounter++;
      if (globalOverlay) globalOverlay.classList.add('active');
    });

    window.addEventListener('dragleave', (e) => {
      e.preventDefault();
      dragCounter--;
      if (dragCounter <= 0 && globalOverlay) {
        globalOverlay.classList.remove('active');
        dragCounter = 0;
      }
    });

    window.addEventListener('dragover', (e) => {
      e.preventDefault();
    });

    window.addEventListener('drop', async (e) => {
      e.preventDefault();
      dragCounter = 0;
      if (globalOverlay) globalOverlay.classList.remove('active');

      const files = e.dataTransfer.files;
      if (!files || files.length === 0) return;

      const file = files[0];
      if (file.name.endsWith('.zip')) {
        await processZipFile(file);
      } else {
        await processAudioFiles(files);
      }
    });

    // Dropzone inside modal
    const modalDropzone = document.getElementById('modal-dropzone');
    const filePicker = document.getElementById('modal-file-picker');

    if (modalDropzone && filePicker) {
      modalDropzone.addEventListener('click', () => filePicker.click());
      filePicker.addEventListener('change', async (e) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;
        const file = files[0];
        if (file.name.endsWith('.zip')) {
          await processZipFile(file);
        } else {
          await processAudioFiles(files);
        }
        filePicker.value = '';
      });
    }
  }

  // --- EVENT LISTENERS INITIALIZATION ---
  function setupEventListeners() {
    // Stop All button
    const stopBtn = document.getElementById('stop-all-btn');
    if (stopBtn) {
      stopBtn.addEventListener('click', stopAllSounds);
    }

    // Random button
    const randomBtn = document.getElementById('random-sound-btn');
    if (randomBtn) {
      randomBtn.addEventListener('click', triggerRandomSound);
    }

    // Import / Pull button
    const importBtn = document.getElementById('import-open-btn');
    if (importBtn) {
      importBtn.addEventListener('click', () => openModal('import-modal'));
    }

    // Modal Close buttons
    document.querySelectorAll('.modal-close-btn, .modal-backdrop').forEach(el => {
      el.addEventListener('click', (e) => {
        if (e.target === el) {
          el.closest('.modal-backdrop').classList.remove('open');
        }
      });
    });

    // Modal tab switches
    document.querySelectorAll('.modal-tab-btn').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.modal-tab-btn').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const target = tab.dataset.tab;
        document.querySelectorAll('.modal-tab-pane').forEach(p => {
          p.style.display = p.id === target ? 'flex' : 'none';
        });
      });
    });

    // URL Fetch form submit
    const urlBtn = document.getElementById('url-fetch-btn');
    const urlInput = document.getElementById('url-input-field');
    if (urlBtn && urlInput) {
      urlBtn.addEventListener('click', () => {
        fetchSoundFromUrl(urlInput.value);
        urlInput.value = '';
      });
      urlInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          fetchSoundFromUrl(urlInput.value);
          urlInput.value = '';
        }
      });
    }

    // Search input
    const searchInput = document.getElementById('search-input');
    const searchClear = document.getElementById('search-clear-btn');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        state.searchQuery = e.target.value;
        if (searchClear) {
          searchClear.style.display = state.searchQuery ? 'block' : 'none';
        }
        renderSoundboard();
      });
      if (searchClear) {
        searchClear.addEventListener('click', () => {
          searchInput.value = '';
          state.searchQuery = '';
          searchClear.style.display = 'none';
          searchInput.focus();
          renderSoundboard();
        });
      }
    }

    // Category Filter Pills
    document.querySelectorAll('.cat-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        state.activeCategory = pill.dataset.category;
        updateCategoryTabs();
        renderSoundboard();
      });
    });

    // Volume Slider & Mute
    const volSlider = document.getElementById('volume-slider');
    const volBtn = document.getElementById('volume-mute-btn');
    if (volSlider) {
      volSlider.addEventListener('input', (e) => {
        state.volume = parseFloat(e.target.value);
        state.isMuted = false;
        if (state.masterGain && state.audioCtx) {
          state.masterGain.gain.setValueAtTime(state.volume, state.audioCtx.currentTime);
        }
        if (volBtn) volBtn.textContent = state.volume === 0 ? '🔇' : '🔊';
      });
    }
    if (volBtn) {
      volBtn.addEventListener('click', () => {
        state.isMuted = !state.isMuted;
        if (state.masterGain && state.audioCtx) {
          state.masterGain.gain.setValueAtTime(state.isMuted ? 0 : state.volume, state.audioCtx.currentTime);
        }
        volBtn.textContent = state.isMuted ? '🔇' : '🔊';
        if (volSlider) volSlider.value = state.isMuted ? 0 : state.volume;
      });
    }

    // Playback Speed Options
    document.querySelectorAll('.speed-opt').forEach(opt => {
      opt.addEventListener('click', () => {
        document.querySelectorAll('.speed-opt').forEach(o => o.classList.remove('active'));
        opt.classList.add('active');
        state.currentSpeed = parseFloat(opt.dataset.speed);

        // Update currently active sources
        state.activeSources.forEach(active => {
          active.source.playbackRate.value = state.currentSpeed;
        });
      });
    });

    // Playback Mode (Poly vs Solo)
    const modeBtn = document.getElementById('playback-mode-toggle');
    if (modeBtn) {
      modeBtn.textContent = state.playbackMode === 'poly' ? '🔀 MULTI' : '🎯 SOLO';
      modeBtn.addEventListener('click', () => {
        state.playbackMode = state.playbackMode === 'poly' ? 'solo' : 'poly';
        localStorage.setItem('spy_playback_mode', state.playbackMode);
        modeBtn.textContent = state.playbackMode === 'poly' ? '🔀 MULTI' : '🎯 SOLO';
        showToast(state.playbackMode === 'poly' ? 'Multi-sound playback enabled' : 'Solo playback mode enabled');
      });
    }

    // View Mode Toggle (Grid vs Compact)
    const viewBtn = document.getElementById('view-mode-toggle');
    if (viewBtn) {
      viewBtn.textContent = state.viewMode === 'grid' ? '▦ GRID' : '☰ LIST';
      viewBtn.addEventListener('click', () => {
        state.viewMode = state.viewMode === 'grid' ? 'compact' : 'grid';
        localStorage.setItem('spy_view_mode', state.viewMode);
        viewBtn.textContent = state.viewMode === 'grid' ? '▦ GRID' : '☰ LIST';
        renderSoundboard();
      });
    }

    // Hotkey Toggle
    const hotkeyToggle = document.getElementById('hotkey-toggle-btn');
    if (hotkeyToggle) {
      hotkeyToggle.textContent = state.showHotkeys ? '⌨️ KEYS ON' : '⌨️ KEYS OFF';
      hotkeyToggle.addEventListener('click', () => {
        state.showHotkeys = !state.showHotkeys;
        localStorage.setItem('spy_show_hotkeys', state.showHotkeys);
        hotkeyToggle.textContent = state.showHotkeys ? '⌨️ KEYS ON' : '⌨️ KEYS OFF';
        renderSoundboard();
      });
    }

    // Theme Switcher
    const themeSelect = document.getElementById('theme-picker');
    if (themeSelect) {
      themeSelect.value = state.theme;
      applyTheme(state.theme);
      themeSelect.addEventListener('change', (e) => {
        state.theme = e.target.value;
        localStorage.setItem('spy_theme', state.theme);
        applyTheme(state.theme);
      });
    }

    // Export Soundboard Pack
    const exportBtn = document.getElementById('export-pack-btn');
    if (exportBtn) {
      exportBtn.addEventListener('click', exportSoundboardPack);
    }
  }

  function applyTheme(theme) {
    if (theme === 'noir') {
      document.documentElement.setAttribute('data-theme', 'noir');
    } else if (theme === 'crt') {
      document.documentElement.setAttribute('data-theme', 'crt');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }

  // Export soundboard bundle as JSON (with base64 audio for custom items)
  async function exportSoundboardPack() {
    showToast('Exporting soundboard bundle...');
    const exportData = {
      version: 1,
      name: 'Spy vs Spy Soundboard Pack',
      exportedAt: new Date().toISOString(),
      customSounds: []
    };

    for (const cs of state.customSounds) {
      let b64 = '';
      if (cs.audioData) {
        const bytes = new Uint8Array(cs.audioData);
        let binary = '';
        for (let i = 0; i < bytes.byteLength; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        b64 = btoa(binary);
      }
      exportData.customSounds.push({
        name: cs.name,
        emoji: cs.emoji,
        category: cs.category,
        desc: cs.desc,
        duration: cs.duration,
        base64Audio: b64
      });
    }

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `spy_soundboard_pack_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Pack exported successfully!');
  }

  // --- INITIALIZATION ---
  async function init() {
    // Load custom sounds from IndexedDB
    state.customSounds = await loadCustomSoundsFromDB();
    state.allSounds = [...DEFAULT_SOUNDS, ...state.customSounds];

    setupEventListeners();
    setupKeyboardShortcuts();
    setupDragAndDrop();
    renderSoundboard();

    // Start background audio pre-caching
    preCacheSounds();

    // Expose preview & delete helper for modal
    window.SpyApp = {
      previewSound: (id) => playSound(id),
      deleteCustomSound: async (id) => {
        await deleteCustomSound(id);
        renderCustomLibraryInModal();
      }
    };
  }

  // Boot on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
