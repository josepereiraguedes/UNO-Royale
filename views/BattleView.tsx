
import React, { useEffect, useState } from 'react';
import { useGameStore } from '../store';
import { COLOR_CLASSES } from '../constants';
import { User, AlertCircle, RefreshCw, MessageCircle, Trophy, Zap, Crown, Swords, Coins } from 'lucide-react';

const BattleView: React.FC = () => {
  const { battle, cancelMatchmaking, playCard, drawCard, closeBattle } = useGameStore();
  const [showUnoAlert, setShowUnoAlert] = useState(false);
  const [showEmojiMenu, setShowEmojiMenu] = useState(false);
  const [activeEmoji, setActiveEmoji] = useState<string | null>(null);

  useEffect(() => {
    if (battle?.status === 'IN_BATTLE' && battle.players.me.hand.length === 1) {
        setShowUnoAlert(true);
        setTimeout(() => setShowUnoAlert(false), 2000);
    }
  }, [battle?.players.me.hand.length]);

  const triggerEmoji = (emoji: string) => {
    setActiveEmoji(emoji);
    setShowEmojiMenu(false);
    setTimeout(() => setActiveEmoji(null), 2500);
  };

  if (!battle) return null;

  if (battle.status === 'MATCHMAKING') {
    return (
      <div className="fixed inset-0 bg-slate-900 z-50 flex flex-col items-center justify-center p-6 text-center animate-royale-pop">
        <div className="w-28 h-28 bg-blue-600 rounded-3xl flex items-center justify-center animate-bounce shadow-[0_8px_0_rgb(29,78,216)] border-4 border-blue-400 mb-10">
            <RefreshCw size={54} className="animate-spin text-white" />
        </div>
        <h2 className="text-3xl font-game mb-2 text-white drop-shadow-md italic">PROCURANDO...</h2>
        <p className="text-blue-400 font-bold mb-12 uppercase tracking-widest text-xs">Arena Real</p>
        <button onClick={cancelMatchmaking} className="mt-12 text-slate-500 font-bold hover:text-white underline underline-offset-4 active:scale-95 transition-all">CANCELAR</button>
      </div>
    );
  }

  if (battle.status === 'RESULT') {
    const isWinner = battle.winner === 'user_1';
    const isRanked = battle.type === 'RANKED';

    return (
      <div className="fixed inset-0 bg-black/90 z-[100] flex flex-col items-center justify-center p-8 animate-royale-pop">
        <div className="relative mb-12">
            <div className={`text-6xl font-game italic drop-shadow-[0_8px_0_rgba(0,0,0,0.5)] ${isWinner ? 'text-yellow-400' : 'text-red-500'}`}>
                {isWinner ? 'VITÓRIA!' : 'DERROTA...'}
            </div>
            <div className="absolute -top-10 left-1/2 -translate-x-1/2">
                <Crown size={80} className={`drop-shadow-xl animate-royale-float ${isWinner ? 'text-yellow-400' : 'text-slate-600'}`} />
            </div>
        </div>

        <div className="bg-slate-800 w-full max-w-xs p-8 rounded-[3rem] border-4 border-slate-700 shadow-2xl space-y-8">
            <div className="flex justify-around items-center">
                <div className="flex flex-col items-center">
                    <span className="text-[10px] font-black text-slate-500 uppercase">Troféus</span>
                    <div className={`flex items-center gap-2 text-3xl font-game ${isWinner ? 'text-blue-400' : 'text-red-400'}`}>
                        {isWinner ? '+' : '-'}{isRanked ? (isWinner ? 30 : 20) : 0}
                        <Trophy size={24} fill="currentColor" />
                    </div>
                </div>
                {isWinner && (
                    <div className="flex flex-col items-center">
                        <span className="text-[10px] font-black text-slate-500 uppercase">Ouro</span>
                        <div className="flex items-center gap-2 text-3xl font-game text-yellow-500">
                            +20 <Coins size={24} fill="currentColor" />
                        </div>
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-4">
                {isWinner && isRanked && (
                    <div className="bg-slate-900/50 p-4 rounded-2xl border-2 border-slate-700 flex items-center justify-center gap-3">
                        <div className="w-10 h-12 bg-gradient-to-br from-slate-300 to-slate-500 rounded-lg flex items-center justify-center shadow-lg border-2 border-white/20">
                            <Zap size={20} className="text-white" />
                        </div>
                        <div className="text-left">
                            <span className="text-[8px] font-black text-slate-500 uppercase">Baú Ganho</span>
                            <div className="text-xs font-game text-white uppercase italic">Baú de Prata</div>
                        </div>
                    </div>
                )}

                <button 
                    onClick={closeBattle}
                    className="w-full py-5 bg-blue-600 rounded-3xl font-game text-2xl text-white shadow-[0_8px_0_rgb(29,78,216)] border-2 border-blue-400 active:translate-y-2 active:shadow-none transition-all"
                >
                    OK
                </button>
            </div>
        </div>
      </div>
    );
  }

  const isMyTurn = battle.turn === 'user_1';
  const topDiscard = battle.discardPile[battle.discardPile.length - 1];

  return (
    <div className="fixed inset-0 bg-slate-900 z-50 flex flex-col overflow-hidden">
      
      {/* HUD Superior - Grid de Oponentes */}
      <div className="bg-slate-800/60 p-4 pt-10 grid grid-cols-2 sm:grid-cols-3 gap-2 border-b-2 border-white/5 max-h-[35%] overflow-y-auto">
        {battle.players.opponents.map((opp, i) => (
            <div key={opp.id} className={`flex items-center gap-2 p-2 rounded-xl border-2 transition-all ${battle.turn === opp.id ? 'bg-red-900/40 border-red-500 animate-pulse' : 'bg-black/40 border-white/10'}`}>
                <div className="relative">
                    <div className={`w-8 h-10 rounded-lg flex items-center justify-center font-game text-white shadow-lg ${COLOR_CLASSES['WILD']}`}>
                        {opp.handCount}
                    </div>
                </div>
                <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-white leading-none truncate w-20">{opp.name}</span>
                    <span className="text-[8px] text-yellow-500 font-game mt-1">{opp.trophies} TR</span>
                </div>
            </div>
        ))}
      </div>

      {/* Mesa Central */}
      <div className="flex-1 flex flex-col items-center justify-center gap-8 relative bg-slate-950 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]">
        
        {battle.isFastMode && (
            <div className="absolute top-4 flex items-center gap-2 bg-yellow-500/20 px-4 py-1 rounded-full border border-yellow-500/30">
                <Zap size={14} className="text-yellow-400 animate-pulse" />
                <span className="text-[10px] font-game text-yellow-400">MODO RÁPIDO ATIVO</span>
            </div>
        )}

        <div className="flex items-center gap-12">
            {/* Monte Compra */}
            <div onClick={() => isMyTurn && drawCard()} className="w-20 h-28 bg-slate-800 rounded-xl border-4 border-slate-700 shadow-2xl flex items-center justify-center cursor-pointer btn-royale-push active:scale-90 transition-all">
                <div className="text-slate-600 font-game text-xl italic opacity-50">UNO</div>
            </div>

            {/* Descarte */}
            <div className={`w-24 h-34 rounded-2xl border-4 border-white shadow-2xl flex items-center justify-center transform scale-110 animate-royale-pop transition-colors duration-500 ${COLOR_CLASSES[battle.currentColor]}`}>
                <span className="text-white font-game text-5xl drop-shadow-lg italic">{topDiscard.value}</span>
            </div>
        </div>

        {showUnoAlert && (
            <div className="absolute z-50 animate-bounce">
                <div className="bg-yellow-400 text-black font-game text-5xl px-12 py-5 rounded-full shadow-2xl border-8 border-white italic">UNO!</div>
            </div>
        )}
      </div>

      {/* Lado do Jogador */}
      <div className="bg-slate-900 p-4 pb-12 flex flex-col items-center relative">
        {/* Minha Reação */}
        {activeEmoji && <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-white text-5xl p-4 rounded-3xl rounded-bl-none shadow-2xl animate-royale-pop">{activeEmoji}</div>}

        <div className="flex -space-x-12 px-4 max-w-full overflow-x-auto h-40 items-center scroll-smooth no-scrollbar">
          {battle.players.me.hand.map((card, i) => (
            <div
              key={card.id}
              onClick={() => isMyTurn && playCard(card.id)}
              className={`w-28 h-40 rounded-2xl border-4 border-white shadow-xl cursor-pointer hover:-translate-y-12 transition-all flex-shrink-0 relative ${COLOR_CLASSES[card.color]} ${!isMyTurn ? 'grayscale opacity-60' : ''} btn-royale-push`}
              style={{ transform: `rotate(${(i - battle.players.me.hand.length / 2) * 4}deg)` }}
            >
              <span className="text-white font-game text-4xl italic">{card.value}</span>
            </div>
          ))}
        </div>

        <div className="mt-8 flex items-center gap-6">
            <button onClick={() => setShowEmojiMenu(!showEmojiMenu)} className="w-14 h-14 bg-slate-800 rounded-2xl border-4 border-slate-700 flex items-center justify-center text-white shadow-xl"><MessageCircle size={28} /></button>
            <div className={`flex items-center gap-4 px-8 py-3 rounded-full border-4 shadow-2xl transition-all ${isMyTurn ? 'bg-blue-600 border-blue-400 scale-110' : 'bg-slate-800 border-slate-700 opacity-50'}`}>
                <span className="font-game text-white text-lg italic tracking-tighter">{isMyTurn ? 'SUA VEZ' : 'AGUARDE'}</span>
            </div>
        </div>

        {showEmojiMenu && (
            <div className="absolute bottom-32 left-8 bg-slate-800 p-4 rounded-3xl border-4 border-slate-700 grid grid-cols-2 gap-3 shadow-2xl animate-royale-pop z-50">
                {['😂', '😭', '😠', '🔥', '👏', '👑'].map(e => (
                    <button key={e} onClick={() => triggerEmoji(e)} className="text-3xl p-2 hover:bg-slate-700 rounded-xl transition-colors">{e}</button>
                ))}
            </div>
        )}
      </div>
    </div>
  );
};

export default BattleView;
