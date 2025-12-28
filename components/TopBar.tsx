
import React from 'react';
import { useGameStore } from '../store';
import { Settings, CircleDollarSign, Gem } from 'lucide-react';

const TopBar: React.FC = () => {
  const { player, setSettingsOpen } = useGameStore();
  const xpNeeded = player.level * 500;
  const xpPercentage = (player.xp / xpNeeded) * 100;

  return (
    <div className="bg-slate-800 p-2.5 flex items-center justify-between shadow-2xl z-10 border-b-2 border-slate-900">
      <div className="flex items-center gap-3">
        <div className="relative active:scale-90 transition-transform cursor-pointer">
          <div className="w-12 h-12 bg-gradient-to-b from-blue-500 to-blue-700 rounded-xl flex items-center justify-center border-2 border-white/30 font-game text-lg text-white shadow-lg italic">
            {player.level}
          </div>
          <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-black text-[9px] px-2 py-0.5 rounded-full font-black border-2 border-slate-800 shadow-md">REI</div>
        </div>
        <div className="flex flex-col">
            <span className="text-xs font-black text-white leading-none mb-1 tracking-tight">{player.name}</span>
            <div className="w-28 h-2.5 bg-slate-950 rounded-full border border-slate-700 overflow-hidden shadow-inner">
                <div 
                    className="h-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-700 shadow-[0_0_8px_rgba(59,130,246,0.5)]" 
                    style={{ width: `${xpPercentage}%` }}
                ></div>
            </div>
            <div className="text-[8px] text-slate-500 font-black uppercase mt-1">XP {player.xp}/{xpNeeded}</div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center bg-slate-950 rounded-full pl-1 pr-3 py-1 border border-slate-700 shadow-inner group cursor-pointer hover:border-yellow-500 transition-colors">
          <div className="bg-yellow-500 p-1 rounded-full shadow-lg mr-1.5 border border-yellow-200">
            <CircleDollarSign size={12} className="text-white" />
          </div>
          <span className="text-xs font-black text-white">{player.gold.toLocaleString()}</span>
        </div>
        
        <div className="flex items-center bg-slate-950 rounded-full pl-1 pr-3 py-1 border border-slate-700 shadow-inner group cursor-pointer hover:border-cyan-500 transition-colors">
          <div className="bg-cyan-500 p-1 rounded-full shadow-lg mr-1.5 border border-cyan-200">
            <Gem size={12} className="text-white" />
          </div>
          <span className="text-xs font-black text-white">{player.gems.toLocaleString()}</span>
        </div>
        
        <button 
          onClick={() => setSettingsOpen(true)}
          className="p-2 bg-slate-700 rounded-xl text-slate-300 shadow-md active:translate-y-0.5 transition-all hover:bg-slate-600 border border-slate-600"
        >
          <Settings size={20} />
        </button>
      </div>
    </div>
  );
};

export default TopBar;
