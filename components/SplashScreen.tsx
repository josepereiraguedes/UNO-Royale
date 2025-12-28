
import React from 'react';

const SplashScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-slate-900 z-[100] flex flex-col items-center justify-center p-12">
      <div className="relative mb-12 animate-royale-pop">
        <div className="text-6xl font-game text-white drop-shadow-[0_8px_0_rgb(30,58,138)] italic">
          UNO<span className="text-blue-500">ROYALE</span>
        </div>
        <div className="absolute -top-6 -right-6 bg-yellow-400 text-black px-3 py-1 font-game text-sm rounded-lg rotate-12 shadow-lg border-2 border-white">
          TM
        </div>
      </div>
      
      <div className="w-full max-w-xs">
        <div className="w-full h-4 bg-slate-800 rounded-full border-2 border-slate-700 overflow-hidden shadow-inner">
          <div className="h-full bg-gradient-to-r from-blue-500 via-blue-400 to-white animate-[loading_2s_ease-in-out_forwards]" style={{width: '0%'}}></div>
        </div>
        <p className="text-center mt-3 text-slate-400 font-black uppercase text-[10px] tracking-widest animate-pulse">
          Carregando recursos reais...
        </p>
      </div>

      <style>{`
        @keyframes loading {
          0% { width: 0%; }
          20% { width: 15%; }
          50% { width: 70%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
