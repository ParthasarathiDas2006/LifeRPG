// Web Audio API Procedural Synthesizer for authentic RPG audio & dynamic BGM tracks

export interface BgmTrackInfo {
  id: string;
  name: string;
  genre: string;
  bpm: number;
  description: string;
}

export const BGM_TRACKS: BgmTrackInfo[] = [
  {
    id: 'cyber-surge',
    name: 'Cyber Surge',
    genre: 'Synthwave / Battle Royale',
    bpm: 132,
    description: 'High-octane adrenaline synth pulses inspired by Free Fire & Cyberpunk arena combat',
  },
  {
    id: 'heros-triumph',
    name: "Hero's Triumph",
    genre: 'Chiptune RPG Anthem',
    bpm: 116,
    description: 'Triumphant major-key fanfare motivating epic level-ups and habit streaks',
  },
  {
    id: 'zen-hyperdrive',
    name: 'Zen Hyperdrive',
    genre: 'Lo-Fi Focus Beat',
    bpm: 80,
    description: 'Warm, rhythmic ambient chords engineered for 25-minute IRL deep work sprints',
  },
];

type AudioStateListener = (state: {
  isPlaying: boolean;
  currentTrack: string;
  bgmVolume: number;
  sfxVolume: number;
  isBgmMuted: boolean;
  isSfxMuted: boolean;
}) => void;

class SoundEngine {
  private ctx: AudioContext | null = null;
  private bgmGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;

  // BGM playback state
  private isBgmPlaying = false;
  private currentTrackId = 'cyber-surge';
  private bgmVolumeLevel = 0.35;
  private sfxVolumeLevel = 0.6;
  private isBgmMuted = false;
  private isSfxMuted = false;
  private bgmIntervalId: ReturnType<typeof setInterval> | null = null;
  private stepCounter = 0;
  private listeners: AudioStateListener[] = [];

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        // Master BGM gain
        this.bgmGain = this.ctx.createGain();
        this.bgmGain.gain.setValueAtTime(this.isBgmMuted ? 0 : this.bgmVolumeLevel, this.ctx.currentTime);
        this.bgmGain.connect(this.ctx.destination);

        // Master SFX gain
        this.sfxGain = this.ctx.createGain();
        this.sfxGain.gain.setValueAtTime(this.isSfxMuted ? 0 : this.sfxVolumeLevel, this.ctx.currentTime);
        this.sfxGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public subscribe(listener: AudioStateListener): () => void {
    this.listeners.push(listener);
    this.notify();
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notify() {
    const state = {
      isPlaying: this.isBgmPlaying,
      currentTrack: this.currentTrackId,
      bgmVolume: this.bgmVolumeLevel,
      sfxVolume: this.sfxVolumeLevel,
      isBgmMuted: this.isBgmMuted,
      isSfxMuted: this.isSfxMuted,
    };
    this.listeners.forEach((l) => l(state));
  }

  // --- BGM Playback Controls ---

  public toggleBgm() {
    if (this.isBgmPlaying) {
      this.stopBgm();
    } else {
      this.startBgm(this.currentTrackId);
    }
  }

  public setTrack(trackId: string) {
    this.currentTrackId = trackId;
    if (this.isBgmPlaying) {
      this.stopBgm();
      this.startBgm(trackId);
    } else {
      this.notify();
    }
  }

  public setBgmVolume(val: number) {
    this.bgmVolumeLevel = Math.max(0, Math.min(1, val));
    if (this.ctx && this.bgmGain && !this.isBgmMuted) {
      this.bgmGain.gain.setValueAtTime(this.bgmVolumeLevel, this.ctx.currentTime);
    }
    this.notify();
  }

  public toggleBgmMute() {
    this.isBgmMuted = !this.isBgmMuted;
    if (this.ctx && this.bgmGain) {
      this.bgmGain.gain.setValueAtTime(this.isBgmMuted ? 0 : this.bgmVolumeLevel, this.ctx.currentTime);
    }
    this.notify();
  }

  public toggleSfxMute() {
    this.isSfxMuted = !this.isSfxMuted;
    if (this.ctx && this.sfxGain) {
      this.sfxGain.gain.setValueAtTime(this.isSfxMuted ? 0 : this.sfxVolumeLevel, this.ctx.currentTime);
    }
    this.notify();
  }

  public startBgm(trackId = this.currentTrackId) {
    const ctx = this.getContext();
    if (!ctx) return;
    this.stopBgm();

    this.currentTrackId = trackId;
    this.isBgmPlaying = true;
    this.stepCounter = 0;

    const track = BGM_TRACKS.find((t) => t.id === trackId) || BGM_TRACKS[0];
    const beatDuration = (60 / track.bpm) * 1000;
    // 16th note step interval
    const stepInterval = beatDuration / 4;

    this.bgmIntervalId = setInterval(() => {
      this.scheduleBgmStep(track.id, this.stepCounter);
      this.stepCounter = (this.stepCounter + 1) % 64; // 4-bar loop of 16th notes
    }, stepInterval);

    this.notify();
  }

  public stopBgm() {
    if (this.bgmIntervalId) {
      clearInterval(this.bgmIntervalId);
      this.bgmIntervalId = null;
    }
    this.isBgmPlaying = false;
    this.notify();
  }

  private scheduleBgmStep(trackId: string, step: number) {
    const ctx = this.getContext();
    if (!ctx || !this.bgmGain || this.isBgmMuted) return;

    const now = ctx.currentTime;

    if (trackId === 'cyber-surge') {
      // 132 BPM Cyberpunk / Free Fire Adrenaline
      // Kick on 0, 4, 8, 12 in every bar of 16
      const barStep = step % 16;
      if (barStep === 0 || barStep === 4 || barStep === 8 || barStep === 12) {
        this.synthKick(now);
      }
      // Hi-hat on every odd 16th note
      if (barStep % 2 === 1) {
        this.synthHiHat(now, barStep % 4 === 2 ? 0.08 : 0.04);
      }
      // Snare / Clap on 4 and 12
      if (barStep === 4 || barStep === 12) {
        this.synthSnare(now);
      }

      // Driving bass line (E1 -> G1 -> A1 -> D1)
      const bassNotes = [41.2, 41.2, 49.0, 41.2, 55.0, 41.2, 73.4, 65.4];
      const bassFreq = bassNotes[Math.floor(step / 2) % bassNotes.length];
      if (step % 2 === 0) {
        this.synthBass(now, bassFreq, 0.12, 'sawtooth');
      }

      // Synth Arpeggio lead
      const arpNotes = [164.8, 196.0, 246.94, 329.63, 392.0, 493.88, 587.33, 659.25];
      if (step % 2 === 1) {
        const noteIdx = (step * 3) % arpNotes.length;
        this.synthArp(now, arpNotes[noteIdx], 0.1, 'square');
      }
    } else if (trackId === 'heros-triumph') {
      // 116 BPM RPG Anthem (Chords in C Major / A Minor)
      const barStep = step % 16;
      if (barStep === 0 || barStep === 8) {
        this.synthKick(now);
      }
      if (barStep === 4 || barStep === 12) {
        this.synthSnare(now);
      }

      // Heroic brass chord stabs on beat
      if (barStep === 0 || barStep === 6 || barStep === 10) {
        const chordRoots = [261.63, 329.63, 392.0]; // C, E, G
        chordRoots.forEach((freq) => {
          this.synthArp(now, freq, 0.25, 'triangle');
        });
      }

      // Ascending melody
      const melody = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 587.33, 659.25];
      if (step % 4 === 0) {
        const note = melody[Math.floor(step / 4) % melody.length];
        this.synthArp(now, note * 1.5, 0.2, 'sawtooth');
      }
    } else if (trackId === 'zen-hyperdrive') {
      // 80 BPM Lo-Fi Ambient Focus
      const barStep = step % 16;
      // Soft gentle kick
      if (barStep === 0 || barStep === 10) {
        this.synthKick(now, 0.08);
      }
      // Soft rim snare on 8
      if (barStep === 8) {
        this.synthHiHat(now, 0.05);
      }

      // Warm floating chord pads every 16 steps
      if (barStep === 0) {
        const chordBank = [
          [220.0, 261.63, 329.63, 392.0], // Am7
          [174.61, 220.0, 261.63, 329.63], // Fmaj7
          [196.0, 246.94, 293.66, 349.23], // G7
          [130.81, 164.81, 196.0, 246.94], // Cmaj7
        ];
        const chord = chordBank[Math.floor(step / 16) % chordBank.length];
        chord.forEach((f) => {
          this.synthPad(now, f, 1.8);
        });
      }
    }
  }

  // --- Procedural Synth Instruments for BGM ---

  private synthKick(time: number, gainVal = 0.22) {
    if (!this.ctx || !this.bgmGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.frequency.setValueAtTime(140, time);
    osc.frequency.exponentialRampToValueAtTime(32, time + 0.12);

    gain.gain.setValueAtTime(gainVal, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.12);

    osc.connect(gain);
    gain.connect(this.bgmGain);
    osc.start(time);
    osc.stop(time + 0.12);
  }

  private synthSnare(time: number) {
    if (!this.ctx || !this.bgmGain) return;
    const osc = this.ctx.createOscillator();
    const oscGain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(180, time);
    osc.frequency.exponentialRampToValueAtTime(60, time + 0.1);
    oscGain.gain.setValueAtTime(0.12, time);
    oscGain.gain.exponentialRampToValueAtTime(0.001, time + 0.1);
    osc.connect(oscGain);
    oscGain.connect(this.bgmGain);
    osc.start(time);
    osc.stop(time + 0.1);

    this.synthHiHat(time, 0.1, 0.12);
  }

  private synthHiHat(time: number, gainVal = 0.05, duration = 0.05) {
    if (!this.ctx || !this.bgmGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(8000, time);

    gain.gain.setValueAtTime(gainVal, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

    osc.connect(gain);
    gain.connect(this.bgmGain);
    osc.start(time);
    osc.stop(time + duration);
  }

  private synthBass(time: number, freq: number, duration = 0.14, type: OscillatorType = 'sawtooth') {
    if (!this.ctx || !this.bgmGain) return;
    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, time);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(320, time);
    filter.frequency.exponentialRampToValueAtTime(80, time + duration);

    gain.gain.setValueAtTime(0.18, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.bgmGain);

    osc.start(time);
    osc.stop(time + duration);
  }

  private synthArp(time: number, freq: number, duration = 0.1, type: OscillatorType = 'square') {
    if (!this.ctx || !this.bgmGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, time);

    gain.gain.setValueAtTime(0.08, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

    osc.connect(gain);
    gain.connect(this.bgmGain);

    osc.start(time);
    osc.stop(time + duration);
  }

  private synthPad(time: number, freq: number, duration = 1.8) {
    if (!this.ctx || !this.bgmGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, time);

    gain.gain.setValueAtTime(0.001, time);
    gain.gain.linearRampToValueAtTime(0.07, time + 0.3);
    gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

    osc.connect(gain);
    gain.connect(this.bgmGain);

    osc.start(time);
    osc.stop(time + duration);
  }

  // --- Sound Effects (SFX) Suite ---

  playTaskComplete() {
    const ctx = this.getContext();
    if (!ctx || !this.sfxGain || this.isSfxMuted) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.frequency.setValueAtTime(523.25, now);
    osc.frequency.setValueAtTime(659.25, now + 0.08);
    osc.frequency.setValueAtTime(783.99, now + 0.16);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.start(now);
    osc.stop(now + 0.35);
  }

  playCrit() {
    this.playCritStrike();
  }

  playCritStrike() {
    const ctx = this.getContext();
    if (!ctx || !this.sfxGain || this.isSfxMuted) return;

    const now = ctx.currentTime;
    const notes = [440, 554.37, 659.25, 880];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.connect(gain);
      gain.connect(this.sfxGain!);

      const startTime = now + idx * 0.05;
      osc.frequency.setValueAtTime(freq, startTime);
      gain.gain.setValueAtTime(0.3, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.3);

      osc.start(startTime);
      osc.stop(startTime + 0.3);
    });
  }

  playLevelUp() {
    const ctx = this.getContext();
    if (!ctx || !this.sfxGain || this.isSfxMuted) return;

    const now = ctx.currentTime;
    const melody = [
      { freq: 523.25, time: 0.0, dur: 0.1 },
      { freq: 659.25, time: 0.1, dur: 0.1 },
      { freq: 783.99, time: 0.2, dur: 0.1 },
      { freq: 1046.5, time: 0.3, dur: 0.4 },
    ];

    melody.forEach((note) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'square';
      osc.connect(gain);
      gain.connect(this.sfxGain!);

      const start = now + note.time;
      osc.frequency.setValueAtTime(note.freq, start);
      gain.gain.setValueAtTime(0.3, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + note.dur);

      osc.start(start);
      osc.stop(start + note.dur);
    });
  }

  playCoin() {
    const ctx = this.getContext();
    if (!ctx || !this.sfxGain || this.isSfxMuted) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.frequency.setValueAtTime(987.77, now);
    osc.frequency.setValueAtTime(1318.51, now + 0.08);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    osc.start(now);
    osc.stop(now + 0.3);
  }

  playClick() {
    this.playMenuClick();
  }

  playMenuClick() {
    const ctx = this.getContext();
    if (!ctx || !this.sfxGain || this.isSfxMuted) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.04);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    osc.start(now);
    osc.stop(now + 0.05);
  }

  playEquip() {
    const ctx = this.getContext();
    if (!ctx || !this.sfxGain || this.isSfxMuted) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(140, now + 0.12);

    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    osc.start(now);
    osc.stop(now + 0.12);
  }

  playError() {
    const ctx = this.getContext();
    if (!ctx || !this.sfxGain || this.isSfxMuted) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.frequency.setValueAtTime(150, now);
    osc.frequency.setValueAtTime(130, now + 0.1);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    osc.start(now);
    osc.stop(now + 0.25);
  }

  // --- Dopamine-Rich Specialized Game Sounds ---

  // Free Fire-style Crate Opening Thrill (Suspense riser -> Grand burst)
  playCrateOpen() {
    const ctx = this.getContext();
    if (!ctx || !this.sfxGain || this.isSfxMuted) return;

    const now = ctx.currentTime;
    // Riser
    const riser = ctx.createOscillator();
    const riserGain = ctx.createGain();
    riser.type = 'sawtooth';
    riser.frequency.setValueAtTime(220, now);
    riser.frequency.exponentialRampToValueAtTime(880, now + 0.4);
    riserGain.gain.setValueAtTime(0.05, now);
    riserGain.gain.linearRampToValueAtTime(0.3, now + 0.4);
    riserGain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
    riser.connect(riserGain);
    riserGain.connect(this.sfxGain);
    riser.start(now);
    riser.stop(now + 0.45);

    // Explosive golden fanfare after 0.4s
    const fanfareTime = now + 0.4;
    [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, fanfareTime + idx * 0.04);
      gain.gain.setValueAtTime(0.35, fanfareTime + idx * 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, fanfareTime + 0.6);
      osc.connect(gain);
      gain.connect(this.sfxGain!);
      osc.start(fanfareTime + idx * 0.04);
      osc.stop(fanfareTime + 0.6);
    });
  }

  // Blacksmith Forge Enhancement: Success Fanfare
  playEnhanceSuccess() {
    const ctx = this.getContext();
    if (!ctx || !this.sfxGain || this.isSfxMuted) return;

    const now = ctx.currentTime;
    // Anvil strike
    const anvil = ctx.createOscillator();
    const anvilGain = ctx.createGain();
    anvil.type = 'square';
    anvil.frequency.setValueAtTime(1200, now);
    anvil.frequency.exponentialRampToValueAtTime(300, now + 0.1);
    anvilGain.gain.setValueAtTime(0.4, now);
    anvilGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
    anvil.connect(anvilGain);
    anvilGain.connect(this.sfxGain);
    anvil.start(now);
    anvil.stop(now + 0.15);

    // Radiant harmonic shimmer
    [659.25, 830.61, 987.77, 1318.51].forEach((freq, idx) => {
      const shimmer = ctx.createOscillator();
      const shimmerGain = ctx.createGain();
      shimmer.type = 'sine';
      shimmer.frequency.setValueAtTime(freq, now + 0.1 + idx * 0.06);
      shimmerGain.gain.setValueAtTime(0.3, now + 0.1 + idx * 0.06);
      shimmerGain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
      shimmer.connect(shimmerGain);
      shimmerGain.connect(this.sfxGain!);
      shimmer.start(now + 0.1 + idx * 0.06);
      shimmer.stop(now + 0.6);
    });
  }

  // Blacksmith Forge: Failure Clank
  playEnhanceFail() {
    const ctx = this.getContext();
    if (!ctx || !this.sfxGain || this.isSfxMuted) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(65, now + 0.25);
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.25);
  }

  // Daily Wheel Spin Tick
  playSpinTick() {
    const ctx = this.getContext();
    if (!ctx || !this.sfxGain || this.isSfxMuted) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(700, now);
    osc.frequency.exponentialRampToValueAtTime(200, now + 0.03);
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.03);
  }

  // Arena Combat Impact
  playArenaClash() {
    const ctx = this.getContext();
    if (!ctx || !this.sfxGain || this.isSfxMuted) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(450, now);
    osc.frequency.exponentialRampToValueAtTime(90, now + 0.15);
    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.15);
  }

  // IRL Focus Hyperdrive Chime
  playFocusChime() {
    const ctx = this.getContext();
    if (!ctx || !this.sfxGain || this.isSfxMuted) return;

    const now = ctx.currentTime;
    [440, 880, 1320].forEach((freq) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);
      osc.connect(gain);
      gain.connect(this.sfxGain!);
      osc.start(now);
      osc.stop(now + 0.9);
    });
  }
}

export const soundEngine = new SoundEngine();
