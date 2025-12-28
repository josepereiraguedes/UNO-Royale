
import React from 'react';
import { useGameStore } from '../store';
import { COLOR_CLASSES, RARITY_COLORS } from '../constants';
import { Sparkles } from 'lucide-react';

const ChestReveal: React.FC = () => {
  const { chestRevealing, closeChestReveal } = useGameStore();

  if (!chestRevealing) return null;

  return (
    <div className="fixed inset-0 bg-black/95 z-[110] flex flex-col items-center justify-center p-8 animate-in fade-in duration-300" onClick={closeChestReveal}>
      <div className="absolute top-1/4 animate-royale-float">
        <Sparkles className="text-yellow-400 w-24 h-24 opacity-50" />
      </div>

      <div className="text-center mb-12">
        <h2 className="text-4xl font-game text-white drop-shadow-lg mb-2">NOVA CARTA!</h2>
        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Toque para continuar</p>
      </div>

      <div className={`w-48 h-72 rounded-3xl border-8 border-white shadow-[0_0_50px_rgba(255,255,255,0.3)] flex flex-col items-center justify-center animate-royale-pop relative ${COLOR_CLASSES[chestRevealing.card.color]}`}>
        <div className={`absolute -top-4 -left-4 px-4 py-1 rounded-full font-game text-white text-sm shadow-xl border-2 border-white ${RARITY_COLORS[chestRevealing.card.rarity]}`}>
          {chestRevealing.card.rarity}
        </div>
        
        <span className="text-white font-game text-7xl drop-shadow-2xl">
          {chestRevealing.card.value}
        </span>

        <div className="absolute bottom-6 bg-black/30 px-6 py-2 rounded-2xl border-2 border-white/20">
          <span className="text-white font-game text-xl">x10</span>
        </div>
      </div>

      <div className="mt-16 bg-blue-600 px-10 py-4 rounded-2xl font-game text-xl border-b-8 border-blue-800 shadow-2xl">
        COLETAR
      </div>
    </div>
  );
};

export default ChestReveal;
