
import React from 'react';
import { ShoppingBag, LayoutDashboard, Swords, Users, Map } from 'lucide-react';
import { useGameStore } from '../store';
import { GameView } from '../types';

const BottomNav: React.FC = () => {
  const { currentView, setView } = useGameStore();

  const navItems = [
    { id: GameView.SHOP, icon: ShoppingBag, label: 'Loja' },
    { id: GameView.DECK, icon: LayoutDashboard, label: 'Baralho' },
    { id: GameView.HOME, icon: Swords, label: 'Batalha' },
    { id: GameView.ARENA_MAP, icon: Map, label: 'Arena' },
    { id: GameView.CLAN, icon: Users, label: 'Social' },
  ];

  return (
    <nav className="absolute bottom-0 left-0 right-0 bg-slate-800 border-t border-slate-700 flex justify-around items-center p-2 safe-area-bottom z-10 shadow-[0_-4px_10px_rgba(0,0,0,0.3)]">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setView(item.id)}
          className={`flex flex-col items-center p-2 transition-all duration-300 btn-royale-push ${
            currentView === item.id ? 'text-blue-400 scale-110 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]' : 'text-slate-400'
          }`}
        >
          <item.icon size={22} className={currentView === item.id ? 'animate-royale-float' : ''} />
          <span className="text-[9px] font-bold mt-1 uppercase tracking-wider">{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default BottomNav;
