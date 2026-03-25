import { SnakeGame } from './components/SnakeGame';
import { MusicPlayer } from './components/MusicPlayer';

export default function App() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50 selection:bg-cyan-500/30 flex flex-col relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-[120px] pointer-events-none" />

      <header className="w-full p-6 text-center relative z-10">
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-lime-400">
          NEON SNAKE & BEATS
        </h1>
      </header>

      <main className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-12 p-6 z-10 w-full max-w-6xl mx-auto">
        <div className="flex-1 flex justify-center w-full">
          <SnakeGame />
        </div>
        
        <div className="w-full lg:w-[400px] flex flex-col justify-center">
          <MusicPlayer />
        </div>
      </main>
    </div>
  );
}
