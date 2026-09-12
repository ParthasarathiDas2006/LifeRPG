'use client';

import React, { useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Music, Disc3, Sparkles } from 'lucide-react';
import { soundEngine, BGM_TRACKS } from '@/lib/sound';

export function AudioPlayerHUD() {
  const [audioState, setAudioState] = useState({
    isPlaying: false,
    currentTrack: 'cyber-surge',
    bgmVolume: 0.35,
    sfxVolume: 0.6,
    isBgmMuted: false,
    isSfxMuted: false,
  });

  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const unsubscribe = soundEngine.subscribe((state) => {
      setAudioState(state);
    });
    return unsubscribe;
  }, []);

  const activeTrack =
    BGM_TRACKS.find((t) => t.id === audioState.currentTrack) || BGM_TRACKS[0];

  const handleTogglePlay = () => {
    soundEngine.toggleBgm();
  };

  const handleSelectTrack = (trackId: string) => {
    soundEngine.setTrack(trackId);
    if (!audioState.isPlaying) {
      soundEngine.startBgm(trackId);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    soundEngine.setBgmVolume(parseFloat(e.target.value));
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-1.5 rounded-full border border-purple-500/30 bg-slate-900/90 px-2.5 py-1 shadow-glow-xp backdrop-blur-md">
        {/* Play/Pause Button */}
        <button
          onClick={handleTogglePlay}
          className={`flex h-6 w-6 items-center justify-center rounded-full transition ${
            audioState.isPlaying
              ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 shadow-glow-gold'
              : 'bg-purple-600/30 text-purple-300 hover:bg-purple-600/50'
          }`}
          title={audioState.isPlaying ? 'Pause BGM' : 'Play Dopamine BGM'}
        >
          {audioState.isPlaying ? (
            <Pause className="h-3 w-3 fill-current" />
          ) : (
            <Play className="h-3 w-3 fill-current ml-0.5" />
          )}
        </button>

        {/* Track Label & Animated Equalizer */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1.5 text-left group"
          title="Change Music Track"
        >
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-wider text-purple-300 group-hover:text-amber-300 transition flex items-center gap-1">
              <Disc3
                className={`h-2.5 w-2.5 ${
                  audioState.isPlaying ? 'animate-spin text-amber-400' : 'text-slate-500'
                }`}
              />
              {activeTrack.name}
            </span>
          </div>

          {/* Equalizer Visualizer Bars */}
          <div className="flex items-end gap-0.5 h-3.5 px-0.5">
            <span
              className={`w-0.5 rounded-full bg-purple-400 transition-all duration-150 ${
                audioState.isPlaying ? 'h-3 animate-pulse' : 'h-1 opacity-40'
              }`}
            />
            <span
              className={`w-0.5 rounded-full bg-amber-400 transition-all duration-150 ${
                audioState.isPlaying ? 'h-3.5 animate-bounce' : 'h-1.5 opacity-40'
              }`}
            />
            <span
              className={`w-0.5 rounded-full bg-cyan-400 transition-all duration-150 ${
                audioState.isPlaying ? 'h-2 animate-pulse' : 'h-1 opacity-40'
              }`}
            />
          </div>
        </button>

        {/* Volume/Mute Toggle */}
        <button
          onClick={() => soundEngine.toggleBgmMute()}
          className="text-slate-400 hover:text-white transition p-0.5"
          title={audioState.isBgmMuted ? 'Unmute BGM' : 'Mute BGM'}
        >
          {audioState.isBgmMuted ? (
            <VolumeX className="h-3.5 w-3.5 text-rose-400" />
          ) : (
            <Volume2 className="h-3.5 w-3.5 text-slate-300" />
          )}
        </button>
      </div>

      {/* Expanded Track Selector Popup */}
      {isExpanded && (
        <div className="absolute right-0 top-10 z-50 w-72 rounded-2xl border border-purple-500/40 bg-slate-900/95 p-3 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-purple-300">
              <Music className="h-3.5 w-3.5" />
              <span>Dopamine Soundtracks</span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">Web Audio Synth</span>
          </div>

          <div className="space-y-1.5 mb-3">
            {BGM_TRACKS.map((track) => {
              const isCurrent = track.id === audioState.currentTrack;
              return (
                <button
                  key={track.id}
                  onClick={() => handleSelectTrack(track.id)}
                  className={`w-full text-left rounded-xl p-2 transition flex items-start justify-between ${
                    isCurrent
                      ? 'bg-purple-900/40 border border-purple-500/50'
                      : 'hover:bg-slate-800/60 border border-transparent'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-white">{track.name}</span>
                      {isCurrent && (
                        <span className="rounded bg-amber-400/20 px-1 py-0.2 text-[9px] font-black text-amber-300">
                          ACTIVE
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-slate-400 line-clamp-1">{track.description}</p>
                  </div>
                  <span className="text-[10px] font-mono text-purple-400 shrink-0 ml-1">
                    {track.bpm} BPM
                  </span>
                </button>
              );
            })}
          </div>

          {/* Volume Control */}
          <div className="rounded-xl bg-slate-950/60 p-2 space-y-2">
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span>BGM Volume</span>
              <span className="font-mono text-white">
                {Math.round(audioState.bgmVolume * 100)}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={audioState.bgmVolume}
              onChange={handleVolumeChange}
              className="w-full accent-purple-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
            />

            <div className="flex items-center justify-between pt-1 border-t border-slate-800/80">
              <span className="text-[10px] text-slate-400">SFX Audio Clicks</span>
              <button
                onClick={() => soundEngine.toggleSfxMute()}
                className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  audioState.isSfxMuted
                    ? 'bg-rose-950/80 text-rose-300 border border-rose-800'
                    : 'bg-emerald-950/80 text-emerald-300 border border-emerald-800'
                }`}
              >
                {audioState.isSfxMuted ? 'SFX MUTED' : 'SFX ON'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
