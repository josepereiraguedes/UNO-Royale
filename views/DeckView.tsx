
import React from 'react';
import { useGameStore } from '../store';
import { RARITY_COLORS, COLOR_CLASSES } from '../constants';
import { Info, Plus, ArrowUp } from 'lucide-react';

const DeckView: React.FC = () => {
  const { player, upgradeCard } = useGameStore();

  return (
    <div className="flex flex-col p-4 gap-6 animate-royale-pop">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-game text-white drop-shadow-md italic">MEU BARALHO</h2>
        <div className="bg-slate-800 px-4 py-1.5 rounded-full border-2 border-slate-700 text-[10px] font-black text-blue-400 uppercase shadow-inner">
            CUSTO MÉDIO: 3.8
        </div>
      </div>

      {/* Baralho Selecionado */}
      <div className="grid grid-cols-4 gap-3">
        {player.deck.slice(0, 8).map((card) => {
          const cost = card.level * 400;
          const copiesNeeded = card.level * 10;
          const canUpgrade = player.gold >= cost && card.copies >= copiesNeeded;

          return (
            <div key={card.id} className="flex flex-col gap-2 items-center group">
              <div 
                className={`w-full aspect-[2/3] rounded-2xl relative overflow-hidden flex flex-col items-center justify-center border-4 border-white/20 shadow-xl transition-transform active:scale-90 ${COLOR_CLASSES[card.color]}`}
              >
                <span className="text-white font-game text-3xl drop-shadow-[0_4px_0_rgba(0,0,0,0.4)] italic">{card.value}</span>
                <div className={`absolute bottom-0 left-0 right-0 h-2 ${RARITY_COLORS[card.rarity]}`}></div>
                <div className="absolute top-1 right-1 bg-black/40 rounded px-1.5 border border-white/10">
                  <span className="text-[9px] font-black text-white">NV {card.level}</span>
                </div>
              </div>
              
              <div className="w-full flex flex-col items-center gap-1">
                <div className="w-full bg-slate-900 rounded-full h-2.5 overflow-hidden border border-slate-700 shadow-inner relative">
                    <div 
                        className={`h-full transition-all duration-500 ${canUpgrade ? 'bg-gradient-to-r from-green-400 to-green-600' : 'bg-slate-600'}`} 
                        style={{ width: `${Math.min(100, (card.copies / copiesNeeded) * 100)}%` }}
                    ></div>
                </div>
                <span className="text-[9px] font-black text-slate-500">{card.copies}/{copiesNeeded}</span>
                
                <button 
                  onClick={() => upgradeCard(card.id)}
                  disabled={!canUpgrade}
                  className={`w-full py-1.5 rounded-lg font-game text-[10px] flex items-center justify-center gap-1 shadow-md transition-all ${
                    canUpgrade 
                    ? 'bg-green-500 text-white shadow-[0_3px_0_rgb(21,128,61)] active:shadow-none active:translate-y-1' 
                    : 'bg-slate-700 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  <ArrowUp size={10} /> {cost}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Coleção Bloqueada */}
      <div className="mt-4">
        <h3 className="text-xs font-black text-slate-600 uppercase tracking-widest mb-4 border-b-2 border-slate-800 pb-2 flex items-center gap-2">
            Cartas para Desbloquear <span className="bg-slate-800 px-2 py-0.5 rounded text-[9px]">12/48</span>
        </h3>
        <div className="grid grid-cols-4 gap-3 opacity-40 grayscale">
            {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="aspect-[2/3] bg-slate-800 rounded-2xl border-2 border-dashed border-slate-700 flex flex-col items-center justify-center gap-2">
                    <Plus className="text-slate-600" size={24} />
                    <div className="bg-slate-900 px-2 py-0.5 rounded text-[8px] font-black text-slate-500 uppercase">Arena {Math.floor(i/4) + 8}</div>
                </div>
            ))}
        </div>
      </div>

      <div className="bg-blue-900/10 p-5 rounded-3xl border-2 border-blue-500/20 flex gap-4 items-center shadow-lg">
        <div className="p-3 bg-blue-600 rounded-2xl shadow-xl border-2 border-blue-400">
            <Info className="text-white" size={24} />
        </div>
        <div>
            <h4 className="text-xs font-game text-blue-400 mb-1">Dica de Pro</h4>
            <p className="text-[11px] text-blue-200/70 font-bold leading-relaxed">
                Melhorar cartas aumenta o nível do seu Rei e concede mais vida e dano às suas torres de defesa durante eventos!
            </p>
        </div>
      </div>
    </div>
  );
};

export default DeckView;
