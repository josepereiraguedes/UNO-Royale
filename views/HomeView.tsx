
import React from 'react';
import { useGameStore } from '../store';
import { ARENAS } from '../constants';
import { Trophy, ChevronRight, Lock, Timer, Star } from 'lucide-react';

const HomeView: React.FC = () => {
  const { player, startMatchmaking, startOpeningChest, claimChest, passProgress } = useGameStore();
  const currentArena = ARENAS.find(a => a.id === player.arena) || ARENAS[0];

  return (
    <div className="flex flex-col items-center p-4 gap-4 animate-royale-pop pb-10">
      
      {/* Pass Royale Banner */}
      <div className="w-full bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-700 rounded-2xl p-0.5 shadow-lg border-b-4 border-yellow-800 cursor-pointer group active:scale-[0.98] transition-all">
        <div className="bg-slate-900 rounded-[14px] p-3 flex items-center justify-between overflow-hidden relative">
            <div className="absolute inset-0 bg-yellow-500/5 group-hover:bg-yellow-500/10 transition-colors"></div>
            <div className="flex items-center gap-3 relative z-10">
                <div className="bg-yellow-500 p-1.5 rounded-lg rotate-12 shadow-xl border-2 border-white">
                    <Star className="text-white fill-current" size={20} />
                </div>
                <div>
                    <div className="text-[10px] text-yellow-500 font-black uppercase tracking-tighter leading-none mb-1">Pass Royale</div>
                    <div className="w-32 h-2 bg-slate-800 rounded-full overflow-hidden mt-1 border border-slate-700">
                        <div className="h-full bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.6)]" style={{width: `${passProgress}%`}}></div>
                    </div>
                </div>
            </div>
            <div className="text-right relative z-10">
                <div className="text-[9px] font-black text-slate-500 uppercase">Patamar</div>
                <div className="text-lg font-game text-white leading-none">12</div>
            </div>
        </div>
      </div>

      {/* Caminho de Troféus */}
      <div className="w-full bg-slate-800 rounded-xl p-3 flex items-center justify-between border-b-4 border-slate-900 cursor-pointer active:translate-y-1 transition-transform">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg shadow-lg border-2 border-blue-400">
            <Trophy className="text-white" size={20} />
          </div>
          <div>
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none mb-1">Caminho de Troféus</div>
            <div className="text-xl font-game leading-none text-blue-400">{player.trophies}</div>
          </div>
        </div>
        <ChevronRight className="text-slate-500" />
      </div>

      {/* Display da Arena */}
      <div className={`w-full h-44 rounded-3xl ${currentArena.color} relative flex flex-col items-center justify-center shadow-[inset_0_4px_20px_rgba(0,0,0,0.6)] overflow-hidden border-4 border-slate-800`}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        <div className="z-10 text-center animate-royale-float">
            <h2 className="text-3xl font-game text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] italic">{currentArena.name}</h2>
            <div className="inline-block bg-black/40 px-4 py-1 rounded-full border border-white/10 mt-2">
                <p className="text-[10px] text-white/90 font-black uppercase tracking-widest">Arena {currentArena.id}</p>
            </div>
        </div>
        <div className="absolute -bottom-8 -right-8 opacity-10">
            <Trophy size={160} />
        </div>
      </div>

      {/* Botão de Batalha Principal */}
      <div className="relative mt-2">
        <button 
            onClick={startMatchmaking}
            className="w-60 h-20 py-4 bg-gradient-to-b from-yellow-400 via-orange-500 to-orange-700 rounded-[2rem] shadow-[0_10px_0_rgb(154,52,18),0_15px_30px_rgba(0,0,0,0.4)] active:shadow-none active:translate-y-2 transition-all flex items-center justify-center gap-4 border-4 border-white/20 btn-royale-push"
        >
            <SwordsIcon />
            <span className="text-3xl font-game text-white drop-shadow-[0_3px_0_rgba(0,0,0,0.5)] italic tracking-tighter">BATALHA</span>
        </button>
      </div>

      {/* Slots de Baús */}
      <div className="grid grid-cols-4 gap-2 w-full mt-6">
        {player.chestSlots.map((chest, i) => (
          <div key={i} className="aspect-[4/5] bg-slate-800 rounded-2xl border-2 border-slate-700 flex flex-col items-center justify-center p-1 relative overflow-hidden active:scale-95 transition-all shadow-xl group">
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
            {chest ? (
                <div 
                    onClick={() => chest.isOpening ? (chest.unlockTime <= Date.now() ? claimChest(i) : null) : startOpeningChest(i)}
                    className="flex flex-col items-center cursor-pointer w-full h-full justify-center"
                >
                    <div className={`w-14 h-14 rounded-full mb-2 ${chest.type === 'GOLD' ? 'bg-gradient-to-br from-yellow-400 to-orange-600' : 'bg-gradient-to-br from-slate-400 to-slate-600'} flex items-center justify-center shadow-2xl border-2 border-white/40 group-hover:scale-110 transition-transform`}>
                        <Lock size={20} className="text-white drop-shadow-lg" />
                    </div>
                    <span className="text-[8px] font-black text-center uppercase leading-tight text-slate-400">BAÚ DE {chest.type === 'GOLD' ? 'OURO' : 'PRATA'}</span>
                    
                    {chest.isOpening ? (
                        <div className={`flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full ${chest.unlockTime <= Date.now() ? 'bg-green-500 text-white animate-bounce' : 'bg-blue-900/50 text-blue-400'}`}>
                            {chest.unlockTime <= Date.now() ? (
                                <span className="text-[9px] font-black uppercase">ABRIR!</span>
                            ) : (
                                <>
                                    <Timer size={10} />
                                    <span className="text-[9px] font-black tracking-tighter">ABRINDO</span>
                                </>
                            )}
                        </div>
                    ) : (
                        <div className="mt-1 px-2 py-0.5 bg-slate-900 rounded-full border border-slate-700">
                             <span className="text-[9px] text-yellow-500 font-black uppercase">DESBLOQUEAR</span>
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex flex-col items-center opacity-30">
                    <div className="w-10 h-10 border-4 border-slate-700 rounded-full mb-1"></div>
                    <span className="text-[8px] text-slate-600 font-black uppercase tracking-widest">Slot Vazio</span>
                </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const SwordsIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
        <path d="M14.5 17.5 3 6 3 3 6 3 17.5 14.5" />
        <line x1="13" y1="19" x2="19" y2="13" />
        <line x1="16" y1="16" x2="20" y2="20" />
        <path d="M14.5 6.5 18 3 21 3 21 6 17.5 9.5" />
        <line x1="5" y1="14" x2="9" y2="18" />
        <line x1="7" y1="17" x2="4" y2="20" />
    </svg>
)

export default HomeView;
