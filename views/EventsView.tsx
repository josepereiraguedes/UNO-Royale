
import React from 'react';
import { Calendar, Star, Trophy, Clock } from 'lucide-react';

const EventsView: React.FC = () => {
  return (
    <div className="flex flex-col p-4 gap-6 animate-royale-pop">
      <h2 className="text-2xl font-game text-white drop-shadow-md">EVENTOS</h2>

      {/* Evento Especial Principal */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-indigo-950 rounded-[2.5rem] p-7 border-4 border-purple-500/30 relative overflow-hidden group cursor-pointer shadow-2xl active:scale-95 transition-transform">
        <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform pointer-events-none">
            <Star size={140} />
        </div>
        <div className="relative z-10">
            <div className="flex items-center gap-2 text-yellow-400 font-black text-[10px] uppercase tracking-widest mb-3 bg-black/30 w-fit px-3 py-1 rounded-full border border-yellow-500/20">
                <Clock size={12} /> Termina em: 2d 14h
            </div>
            <h3 className="text-3xl font-game mb-1 leading-none text-white italic drop-shadow-lg">CAOS SELVAGEM</h3>
            <p className="text-[11px] text-indigo-200 font-bold mb-8 uppercase tracking-tight">Todas as cartas jogadas viram Coringa +4!</p>
            
            <div className="flex items-center justify-between">
                <div className="flex -space-x-3">
                    {[1,2,3].map(i => (
                        <div key={i} className="w-10 h-10 rounded-full bg-slate-800 border-2 border-purple-400 flex items-center justify-center shadow-lg">
                            <Trophy size={18} className="text-yellow-500 drop-shadow-sm" />
                        </div>
                    ))}
                    <div className="ml-5 flex flex-col justify-center">
                        <span className="text-[10px] font-black text-indigo-300 uppercase leading-none">Prêmios</span>
                        <span className="text-[14px] font-game text-white leading-none">+3 Itens</span>
                    </div>
                </div>
                <button className="px-8 py-3 bg-yellow-400 text-black font-game rounded-2xl shadow-[0_6px_0_rgb(161,98,7)] border-2 border-white/40 active:shadow-none active:translate-y-1 transition-all">ENTRAR</button>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-800 p-5 rounded-3xl border-2 border-slate-700 flex flex-col gap-3 shadow-lg active:scale-95 transition-all">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-700 rounded-xl flex items-center justify-center shadow-lg border-2 border-white/20">
                <Trophy size={24} className="text-white" />
            </div>
            <div className="font-game text-xs text-white leading-tight">TORNEIO GLOBAL</div>
            <div className="text-[9px] text-slate-500 font-black uppercase tracking-wider italic">Começa em 5h</div>
        </div>
        <div className="bg-slate-800 p-5 rounded-3xl border-2 border-slate-700 flex flex-col gap-3 shadow-lg active:scale-95 transition-all">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-xl flex items-center justify-center shadow-lg border-2 border-white/20">
                <Calendar size={24} className="text-white" />
            </div>
            <div className="font-game text-xs text-white leading-tight">UNO CLÁSSICO</div>
            <div className="text-[9px] text-slate-500 font-black uppercase tracking-wider italic">Modo Treino</div>
        </div>
      </div>

      <div className="bg-slate-900/60 p-8 rounded-[2rem] border-2 border-slate-800 border-dashed text-center">
        <p className="text-slate-600 font-black italic uppercase text-[10px] tracking-widest">Novos eventos em breve...</p>
      </div>
    </div>
  );
};

export default EventsView;
