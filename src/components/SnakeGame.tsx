import { useSnakeGame } from '../hooks/useSnakeGame';
import { Trophy, Play, RotateCcw } from 'lucide-react';

export function SnakeGame() {
  const { snake, food, score, gameOver, isPaused, hasStarted, resetGame, GRID_SIZE } = useSnakeGame();

  return (
    <div className="flex flex-col items-center">
      {/* Score Header */}
      <div className="flex items-center justify-between w-full max-w-[400px] mb-6 px-4 py-3 bg-neutral-900/80 backdrop-blur-sm border border-cyan-900/50 rounded-xl shadow-[0_0_15px_rgba(6,182,212,0.15)]">
        <div className="flex items-center space-x-2 text-cyan-400">
          <Trophy size={20} className="drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]" />
          <span className="font-mono text-lg font-bold tracking-wider">SCORE</span>
        </div>
        <div className="font-mono text-2xl font-black text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
          {score.toString().padStart(4, '0')}
        </div>
      </div>

      {/* Game Board */}
      <div className="relative p-2 bg-neutral-900 rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.8)] border border-neutral-800">
        <div 
          className="relative bg-black rounded-lg overflow-hidden border border-neutral-800"
          style={{
            width: `${GRID_SIZE * 20}px`,
            height: `${GRID_SIZE * 20}px`,
            backgroundImage: 'linear-gradient(rgba(34, 211, 238, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 211, 238, 0.05) 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}
        >
          {/* Food */}
          <div
            className="absolute bg-fuchsia-500 rounded-full shadow-[0_0_10px_rgba(217,70,239,0.8)] animate-pulse"
            style={{
              width: '20px',
              height: '20px',
              left: `${food.x * 20}px`,
              top: `${food.y * 20}px`,
              transform: 'scale(0.8)'
            }}
          />

          {/* Snake */}
          {snake.map((segment, index) => {
            const isHead = index === 0;
            return (
              <div
                key={`${segment.x}-${segment.y}-${index}`}
                className={`absolute rounded-sm ${isHead ? 'bg-cyan-300 z-10' : 'bg-cyan-500/80'}`}
                style={{
                  width: '20px',
                  height: '20px',
                  left: `${segment.x * 20}px`,
                  top: `${segment.y * 20}px`,
                  boxShadow: isHead ? '0 0 15px rgba(103,232,249,0.8)' : '0 0 5px rgba(6,182,212,0.5)',
                  transform: 'scale(0.9)'
                }}
              />
            );
          })}

          {/* Overlays */}
          {(!hasStarted || gameOver || isPaused) && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex flex-col items-center justify-center z-20">
              {!hasStarted ? (
                <div className="text-center animate-pulse">
                  <Play size={48} className="text-cyan-400 mx-auto mb-4 drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]" />
                  <p className="text-cyan-400 font-mono text-sm tracking-widest">PRESS ANY KEY TO START</p>
                </div>
              ) : gameOver ? (
                <div className="text-center">
                  <h2 className="text-4xl font-black text-fuchsia-500 mb-2 drop-shadow-[0_0_15px_rgba(217,70,239,0.8)] tracking-widest">GAME OVER</h2>
                  <p className="text-white font-mono mb-6">FINAL SCORE: {score}</p>
                  <button 
                    onClick={resetGame}
                    className="flex items-center space-x-2 mx-auto px-6 py-3 bg-neutral-800 hover:bg-neutral-700 text-cyan-400 rounded-full border border-cyan-900 transition-all hover:shadow-[0_0_15px_rgba(34,211,238,0.4)]"
                  >
                    <RotateCcw size={18} />
                    <span className="font-mono font-bold">PLAY AGAIN</span>
                  </button>
                </div>
              ) : isPaused ? (
                <div className="text-center">
                  <h2 className="text-3xl font-black text-lime-400 mb-2 drop-shadow-[0_0_15px_rgba(163,230,53,0.8)] tracking-widest">PAUSED</h2>
                  <p className="text-neutral-400 font-mono text-sm">PRESS SPACE TO RESUME</p>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-6 text-neutral-500 font-mono text-xs text-center max-w-[400px]">
        Use <span className="text-neutral-300">WASD</span> or <span className="text-neutral-300">Arrow Keys</span> to move. <span className="text-neutral-300">Space</span> to pause.
      </div>
    </div>
  );
}
