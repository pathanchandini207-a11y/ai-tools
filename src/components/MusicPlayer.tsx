import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const TRACKS = [
  {
    id: 1,
    title: "Cybernetic Horizon",
    artist: "AI Gen Alpha",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    color: "text-cyan-400",
    glow: "shadow-[0_0_15px_rgba(34,211,238,0.5)]"
  },
  {
    id: 2,
    title: "Neon Grid Runner",
    artist: "AI Gen Beta",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    color: "text-fuchsia-400",
    glow: "shadow-[0_0_15px_rgba(232,121,249,0.5)]"
  },
  {
    id: 3,
    title: "Synthwave Protocol",
    artist: "AI Gen Gamma",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    color: "text-lime-400",
    glow: "shadow-[0_0_15px_rgba(163,230,53,0.5)]"
  }
];

export function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentTrack = TRACKS[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    setIsPlaying(true);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    setIsPlaying(true);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      if (duration) {
        setProgress((current / duration) * 100);
      }
    }
  };

  const handleTrackEnded = () => {
    nextTrack();
  };

  return (
    <div className={`bg-neutral-900/80 backdrop-blur-md border border-neutral-800 rounded-2xl p-6 w-full max-w-md mx-auto transition-all duration-500 ${currentTrack.glow}`}>
      <audio
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleTrackEnded}
      />
      
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className={`text-xl font-bold font-sans tracking-tight ${currentTrack.color} drop-shadow-[0_0_8px_currentColor]`}>
            {currentTrack.title}
          </h3>
          <p className="text-neutral-400 text-sm font-mono mt-1">{currentTrack.artist}</p>
        </div>
        <div className="flex space-x-1">
          {[...Array(3)].map((_, i) => (
            <div 
              key={i} 
              className={`w-1.5 bg-current rounded-full ${currentTrack.color} ${isPlaying ? 'animate-pulse' : 'h-2'}`}
              style={{ 
                height: isPlaying ? `${Math.random() * 16 + 8}px` : '8px',
                animationDelay: `${i * 0.15}s`,
                animationDuration: '0.5s'
              }}
            />
          ))}
        </div>
      </div>

      <div className="w-full h-1.5 bg-neutral-800 rounded-full mb-6 overflow-hidden">
        <div 
          className={`h-full ${currentTrack.color.replace('text-', 'bg-')} transition-all duration-100 ease-linear shadow-[0_0_10px_currentColor]`}
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex items-center justify-between">
        <button 
          onClick={() => setIsMuted(!isMuted)}
          className="text-neutral-400 hover:text-white transition-colors p-2"
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>

        <div className="flex items-center space-x-6">
          <button 
            onClick={prevTrack}
            className="text-neutral-300 hover:text-white transition-colors"
          >
            <SkipBack size={24} />
          </button>
          
          <button 
            onClick={togglePlay}
            className={`w-14 h-14 flex items-center justify-center rounded-full bg-neutral-800 border border-neutral-700 hover:scale-105 transition-all ${isPlaying ? currentTrack.glow : ''}`}
          >
            {isPlaying ? <Pause size={28} className={currentTrack.color} /> : <Play size={28} className={`ml-1 ${currentTrack.color}`} />}
          </button>
          
          <button 
            onClick={nextTrack}
            className="text-neutral-300 hover:text-white transition-colors"
          >
            <SkipForward size={24} />
          </button>
        </div>
        
        <div className="w-9" /> {/* Spacer for balance */}
      </div>
    </div>
  );
}
