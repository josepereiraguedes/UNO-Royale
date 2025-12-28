
import React from 'react';
import { Users, MessageCircle, Shield, TrendingUp } from 'lucide-react';

const ClanView: React.FC = () => {
  return (
    <div className="flex flex-col p-4 gap-6 animate-royale-pop">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-game text-white drop-shadow-md">CLÃ REAL</h2>
        <button className="p-2.5 bg-blue-600 rounded-xl shadow-[0_4px_0_rgb(29,78,216)] border-2 border-blue-400">
            <TrendingUp size={20} className="text-white" />
        </button>
      </div>

      {/* Meu Clã */}
      <div className="bg-slate-800 rounded-3xl p-5 border-4 border-slate-700 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <Shield size={120} />
        </div>
        <div className="flex items-center gap-5 mb-6 relative z-10">
            <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-red-800 rounded-2xl flex items-center justify-center shadow-2xl border-4 border-white/20 animate-royale-float">
                <Shield size={40} className="text-white drop-shadow-lg" />
            </div>
            <div>
                <h3 className="text-2xl font-game leading-none text-white mb-1">OS ELITES</h3>
                <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest">48/50 MEMBROS • 45,000 TROFÉUS</div>
            </div>
        </div>

        <div className="grid grid-cols-2 gap-3 relative z-10">
            <button className="flex items-center justify-center gap-2 py-4 bg-slate-700 rounded-2xl font-black text-xs uppercase tracking-wider shadow-[0_4px_0_rgb(51,65,85)] active:shadow-none active:translate-y-1 transition-all border border-slate-600">
                <MessageCircle size={18} /> CHAT
            </button>
            <button className="flex items-center justify-center gap-2 py-4 bg-blue-600 rounded-2xl font-black text-xs uppercase tracking-wider shadow-[0_4px_0_rgb(29,78,216)] active:shadow-none active:translate-y-1 transition-all border-2 border-blue-400">
                <Users size={18} /> MEMBROS
            </button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-3 border-b border-slate-800 pb-2">Atividade Recente</h3>
        <div className="space-y-2">
            {[
                { user: 'SkyWalker', action: 'doou', card: 'Azul 7', time: '2m' },
                { user: 'MasterCard', action: 'entrou', card: 'no Clã', time: '15m' },
                { user: 'LuckyPro', action: 'ganhou', card: 'Baú Dourado', time: '1h' },
            ].map((activity, i) => (
                <div key={i} className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 flex justify-between items-center shadow-sm">
                    <div className="text-[11px] font-bold">
                        <span className="text-blue-400">{activity.user}</span>
                        <span className="text-slate-500 mx-1.5 font-normal italic">{activity.action}</span>
                        <span className="text-white">{activity.card}</span>
                    </div>
                    <span className="text-[9px] text-slate-600 font-black uppercase">{activity.time} atrás</span>
                </div>
            ))}
        </div>
      </div>

      <button className="w-full py-5 bg-slate-800 rounded-3xl border-2 border-dashed border-slate-700 text-slate-500 font-black uppercase tracking-widest text-[10px] hover:border-blue-500 hover:text-blue-400 transition-all active:scale-[0.98]">
        DOAR CARTAS
      </button>
    </div>
  );
};

export default ClanView;
