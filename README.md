# 🕵️‍♂️ Spy vs. Spy // Tactical Audio Soundboard & Terminal

A clean, modern, zero-latency interactive soundboard inspired by *Spy vs. Spy* (PlayStation 2), featuring audio visualization, client-side ZIP extraction, persistent IndexedDB sound packs, and seamless asset ingestion from [The Sounds Resource](https://sounds.spriters-resource.com/playstation_2/spyvsspy/asset/452648/) and custom URLs.

Live Site: [spy.williamtroup.com](https://spy.williamtroup.com/)

---

## ✨ Features & Improvements

### 🎨 Clean Espionage Aesthetic & Multi-Theme UI
* **Shadow Agent Mode (Default):** Deep dark obsidian theme with neon cyan glowing highlights and subtle glassmorphic panels.
* **Classic MAD Noir Mode:** High-contrast retro comic monochrome styling.
* **CRT Amber Terminal Mode:** Phosphor amber scanlines and vintage terminal look.
* **Real-Time Audio Visualizer:** High-FPS Web Audio API canvas visualizer displaying dynamic frequency bars and idle radar sweeps.
* **Sound Cards with Progress Tracking:** Smooth real-time progress bars illuminate across active cards during playback.

### ⚡ Zero-Latency Web Audio API Engine
* Instant sample playback with pre-cached `AudioBuffer` memory management.
* **Polyphonic vs. Solo Mode:** Choose between layering multiple sounds simultaneously (`MULTI`) or auto-cutting previous sounds on new triggers (`SOLO`).
* **Pitch & Speed Control:** Real-time speed adjustments (`0.75x`, `1.0x`, `1.25x`, `1.5x`).
* **Loop Toggle per Sound:** Loop any sound continuously for background ambience or rhythmic chaos.
* **Master Controls:** Master volume slider, mute toggle, and master `⏹ STOP ALL` button.

### 📥 Ingestion & Asset Pulling (Sounds Resource & Custom Files)
* **Direct ZIP Extraction in Browser:** Powered by `JSZip`, drag & drop any `.zip` sound pack (such as asset packs downloaded from [The Sounds Resource](https://sounds.spriters-resource.com/playstation_2/spyvsspy/asset/452648/)).
* **Auto-Tagging & Smart Emoji Detection:** Filenames are automatically cleaned, classified (Reactions, Weapons, Gadgets, Tech, Foley), and given contextual emojis.
* **Local File Uploads:** Supports `.wav`, `.mp3`, `.ogg`, `.flac`, `.aac`, and `.m4a`.
* **CORS-Resilient URL Importer:** Pull sounds from direct web URLs with automatic fallback through proxy gateways.
* **Persistent Library:** All imported custom sounds are stored locally in browser `IndexedDB` (`SpySoundboardDB`) so they remain saved across page reloads.
* **Soundboard Backup & Export:** Export custom sound packs as `.json` bundles.

### ⌨️ Comprehensive Keyboard Hotkeys
* <kbd>1</kbd> - <kbd>9</kbd>, <kbd>0</kbd>, <kbd>Q</kbd> - <kbd>P</kbd>, <kbd>A</kbd> - <kbd>L</kbd>, <kbd>Z</kbd> - <kbd>M</kbd>: Instant pad triggers.
* <kbd>SPACE</kbd>: Master Stop All.
* <kbd>/</kbd>: Focus instant search.
* <kbd>R</kbd>: Trigger a random sound effect.
* <kbd>ESC</kbd>: Clear search / close modals.

---

## 🎵 Default Sound Library (PlayStation 2 Rips)

| Key | Sound Name | Category | File | Description |
|:---:|:---|:---|:---|:---|
| 1 | 🙀 Yeoww | Reactions | `DATA_00000.wav` | Classic panicked spy scream |
| 2 | 💻 Hack & Break | Tech | `DATA_00149.wav` | Console hacking alarm & system breach |
| 3 | 🕳️ Spy Hole | Gadgets | `DATA_00164.wav` | Secret hatch and periscope deploy |
| 4 | 🔑 Ignition | Gadgets | `DATA_00174.wav` | Trap ignition / vehicle key turn |
| 5 | 🚗 Engine Starting | Gadgets | `DATA_00189.wav` | Getaway engine cranking to life |
| 6 | ⌨️ Typing | Tech | `DATA_00200.wav` | Rapid spy terminal keystroke |
| 7 | 🔫 Laser | Weapons | `DATA_00212.wav` | High-tech raygun zap |
| 8 | ⏲️ Bomb Timer | Weapons | `DATA_00221.wav` | Ticking time bomb before detonation |
| 9 | 🐒 Monkey Laugh | Reactions | `DATA_00250.wav` | Taunting cackling laugh |
| 0 | 😈 Mwahahaha | Reactions | `DATA_00252.wav` | Diabolical villain laughter |
| Q | 🚪 Electronic Door | Tech | `DATA_00264.wav` | Automated bunker bulkhead door |
| W | 📡 Scanning | Gadgets | `DATA_00271.wav` | Radar sweep and frequency scanner |
| E | 🛎️ Bell | Foley | `DATA_00275.wav` | Clear resonant desk bell chime |
| R | 🦹 Evil Laugh | Reactions | `DATA_00295.wav` | Sinister mastermind chuckle |
| T | 🗣️ Chatter | Reactions | `DATA_00301.wav` | Incomprehensible spy murmur |
| Y | ⚡ Electrocution | Weapons | `DATA_00329.wav` | High-voltage electric zap & yell |
| U | ⚡ Shock Voltage | Weapons | `DATA_00330.wav` | Sustained electrical zap discharge |
| I | 💨 Whoosh Impact | Foley | `DATA_00358.wav` | Swift dodge and impact swoosh |
| O | 🚁 Helicopter Leave | Gadgets | `DATA_00386.wav` | Extraction helicopter blades departing |
| P | 💥 Bomb Boom | Weapons | `DATA_00402.wav` | Heavy cartoon dynamite explosion |
| A | 🐣 Chirp | Foley | `DATA_00405.wav` | Tiny gadget chirp alert |
| S | 🌀 Spring Trap | Weapons | `DATA_00408.wav` | Bouncy boxing glove spring coil |
| D | 📞 Phone Dial | Tech | `DATA_00416.wav` | Rotary / touch-tone phone bleep |
| F | 💧 Plonk | Foley | `DATA_00418.wav` | Drip drop water plunk |
| G | 🚰 Valve / Yell | Reactions | `DATA_00419.wav` | Steam pipe release and shout |
| H | 💥 Pew-Gun | Weapons | `DATA_00424.wav` | Arcade blaster gunshot |
| J | 📢 Bike Horn | Foley | `DATA_00425.wav` | Classic cartoon squeeze horn honk |

---

## 📥 How to Pull Files from The Sounds Resource

1. Visit [The Sounds Resource: Spy vs. Spy (PS2) Asset #452648](https://sounds.spriters-resource.com/playstation_2/spyvsspy/asset/452648/) (or any game sound rip on the site).
2. Click the **Download Asset** link to save the `.zip` archive to your computer.
3. Drag & drop the `.zip` file anywhere onto the soundboard window!
4. The client unpacks the archive in memory, computes durations, categorizes each sound, and adds them to your custom board immediately.

---

## 🚀 Running Locally & Deploying

Because the application is built on static HTML5, CSS3, and modern vanilla JavaScript:

### Running locally
```bash
# Serve with python3 or any static web server:
python3 -m http.server 8000
# Open http://localhost:8000 in your browser
```

### GitHub Pages Deployment
1. Ensure `CNAME` contains your custom domain (e.g. `spy.williamtroup.com`).
2. Commit and push changes to the `main` branch:
   ```bash
   git add .
   git commit -m "Remake Spy vs Spy soundboard with clean UI & asset puller"
   git push origin main
   ```
3. GitHub Pages will build and deploy the site automatically.
