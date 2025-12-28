
import React from 'react';
import { useGameStore } from '../store';
import { Trophy, Lock, Play, Gift, Zap } from 'lucide-react';

const ArenaMapView: React.FC = () => {
  const { unlockedArenaLevel, startArenaBattle, pendingArenaReward, collectArenaReward } = useGameStore();

  const arenas = Array.from({ length: 10 }).map((_, i) => ({
    level: i + 1,
    name: i === 9 ? 'ARENA LENDÁRIA (FAST)' : `Arena ${i + 1}`,
    bots: i + 1,
    gold: (i + 1) * 100,
    gems: (i + 1) * 10,
    color: i === 9 ? 'bg-rose-600' : 'bg-slate-800'
  }));

  return (
    <div className="flex flex-col p-4 gap-6 pb-20 animate-royale-pop">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-game text-white drop-shadow-md italic">MODO ARENA</h2>
        <div className="bg-blue-600 px-4 py-1 rounded-full text-[10px] font-black border-2 border-blue-400">PVE PROGRESSÃO</div>
      </div>

      <div className="flex flex-col gap-4">
        {arenas.reverse().map((arena) => {
          const isUnlocked = unlockedArenaLevel >= arena.level;
          const isCurrent = unlockedArenaLevel === arena.level;

          return (
            <div 
              key={arena.level}
              className={`relative rounded-3xl p-5 border-4 transition-all overflow-hidden ${
                isUnlocked ? `${arena.color} border-slate-600 shadow-xl` : 'bg-slate-900 border-slate-800 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg border-2 ${isUnlocked ? 'bg-blue-500 border-blue-300' : 'bg-slate-700 border-slate-600'}`}>
                    {arena.level === 10 ? <Zap size={24} className="text-yellow-300" /> : <Trophy size={24} className="text-white" />}
                  </div>
                  <div>
                    <h3 className="font-game text-lg text-white leading-none">{arena.name}</h3>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
                      {arena.bots} Oponentes • Modo {arena.level === 10 ? 'Rápido' : 'Normal'}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center gap-3 bg-black/40 px-3 py-1.5 rounded-xl border border-white/10">
                    <div className="flex items-center gap-1 text-yellow-500 text-xs font-bold">
                        <span>{arena.gold}</span>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full border border-yellow-200"></div>
                    </div>
                    <div className="flex items-center gap-1 text-cyan-400 text-xs font-bold">
                        <span>{arena.gems}</span>
                        <div className="w-3 h-3 bg-cyan-400 rounded-full border border-cyan-200"></div>
                    </div>
                  </div>

                  {isCurrent && (
                    <button 
                      onClick={() => startArenaBattle(arena.level)}
                      className="px-6 py-2.5 bg-green-500 text-white font-game rounded-xl shadow-[0_4px_0_rgb(21,128,61)] border-2 border-white/20 active:translate-y-1 active:shadow-none transition-all flex items-center gap-2"
                    >
                      <Play size={16} fill="currentColor" /> INICIAR
                    </button>
                  )}

                  {!isUnlocked && (
                    <div className="flex items-center gap-2 text-slate-500 font-game text-xs">
                        <Lock size={14} /> BLOQUEADO
                    </div>
                  )}
                </div>
              </div>

              {/* Background Glow for Current Arena */}
              {isCurrent && (
                <div className="absolute inset-0 bg-blue-500/10 animate-pulse pointer-events-none"></div>
              )}
            </div>
          );
        })}
      </div>

      {pendingArenaReward && (
        <div className="fixed inset-0 bg-black/90 z-[120] flex items-center justify-center p-8 animate-royale-pop">
            <div className="bg-slate-800 p-8 rounded-[3rem] border-4 border-slate-700 w-full max-w-sm text-center shadow-2xl">
                <Gift className="w-20 h-20 text-yellow-400 mx-auto mb-6 animate-bounce" />
                <h2 className="text-3xl font-game text-white mb-6">ARENA VENCIDA!</h2>
                <div className="flex justify-around mb-10">
                    <div className="flex flex-col items-center">
                        <span className="text-xs font-black text-slate-500 uppercase">Ouro</span>
                        <div className="text-3xl font-game text-yellow-500">+{pendingArenaReward.gold}</div>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-xs font-black text-slate-500 uppercase">Gemas</span>
                        <div className="text-3xl font-game text-cyan-400">+{pendingArenaReward.gems}</div>
                    </div>
                </div>
                <button 
                  onClick={collectArenaReward}
                  className="w-full py-5 bg-gradient-to-b from-yellow-400 to-orange-600 rounded-3xl font-game text-2xl text-white shadow-[0_8px_0_rgb(154,52,18)] active:translate-y-2 active:shadow-none transition-all border-2 border-yellow-200"
                >
                  COLETAR PRÊMIOS
                </button>
            </div>
        </div>
      )}
    </div>
  );
};

export default ArenaMapView;
