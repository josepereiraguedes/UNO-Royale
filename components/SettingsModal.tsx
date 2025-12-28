
import React, { useState } from 'react';
import { useGameStore } from '../store';
import { X, Volume2, VolumeX, Music, Smartphone, User, LogOut, RotateCcw, ShieldCheck, HelpCircle } from 'lucide-react';

const SettingsModal: React.FC = () => {
  const { isSettingsOpen, setSettingsOpen, settings, toggleSetting, player, updatePlayerName, resetProgress } = useGameStore();
  const [editingName, setEditingName] = useState(player.name);

  if (!isSettingsOpen) return null;

  const handleNameSave = () => {
    updatePlayerName(editingName);
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-[200] flex items-center justify-center p-6 animate-in fade-in duration-200">
      <div className="bg-slate-800 w-full max-w-sm rounded-[3rem] border-4 border-slate-700 shadow-2xl overflow-hidden animate-royale-pop">
        
        {/* Header */}
        <div className="bg-slate-700 p-6 flex items-center justify-between border-b-4 border-slate-900">
          <h2 className="text-2xl font-game text-white italic drop-shadow-md">OPÇÕES</h2>
          <button 
            onClick={() => setSettingsOpen(false)}
            className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center shadow-[0_4px_0_rgb(153,27,27)] border-2 border-red-400 active:translate-y-1 active:shadow-none transition-all"
          >
            <X size={24} className="text-white" />
          </button>
        </div>

        <div className="p-6 space-y-8 overflow-y-auto max-h-[70vh]">
          
          {/* Perfil */}
          <div className="space-y-4">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
                <User size={14} /> Perfil do Jogador
            </h3>
            <div className="flex gap-2">
              <input 
                type="text" 
                value={editingName}
                onChange={(e) => setEditingName(e.target.value)}
                className="flex-1 bg-slate-950 border-2 border-slate-700 rounded-xl px-4 py-3 font-bold text-white focus:border-blue-500 outline-none transition-colors"
                placeholder="Nome do Jogador"
              />
              <button 
                onClick={handleNameSave}
                className="px-4 py-3 bg-blue-600 rounded-xl font-game text-xs text-white shadow-[0_4px_0_rgb(29,78,216)] border-2 border-blue-400 active:translate-y-1 active:shadow-none transition-all"
              >
                SALVAR
              </button>
            </div>
          </div>

          {/* Configurações de Áudio/Tátil */}
          <div className="space-y-4">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Áudio & Feedback</h3>
            <div className="grid grid-cols-2 gap-3">
              <SettingToggle 
                label="SFX" 
                active={settings.sfx} 
                icon={settings.sfx ? Volume2 : VolumeX} 
                onClick={() => toggleSetting('sfx')} 
              />
              <SettingToggle 
                label="Música" 
                active={settings.music} 
                icon={Music} 
                onClick={() => toggleSetting('music')} 
              />
              <SettingToggle 
                label="Vibração" 
                active={settings.vibration} 
                icon={Smartphone} 
                onClick={() => toggleSetting('vibration')} 
              />
            </div>
          </div>

          {/* Seção Social/Conta */}
          <div className="space-y-4">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Conta & Suporte</h3>
            <div className="space-y-2">
              <button className="w-full flex items-center justify-between p-4 bg-slate-900/50 rounded-2xl border border-slate-700 hover:bg-slate-700 transition-colors">
                <div className="flex items-center gap-3">
                  <ShieldCheck size={20} className="text-blue-400" />
                  <span className="text-sm font-bold text-white">Termos e Privacidade</span>
                </div>
                <HelpCircle size={16} className="text-slate-600" />
              </button>
              
              <button className="w-full flex items-center justify-between p-4 bg-slate-900/50 rounded-2xl border border-slate-700 hover:bg-slate-700 transition-colors">
                <div className="flex items-center gap-3">
                  <HelpCircle size={20} className="text-cyan-400" />
                  <span className="text-sm font-bold text-white">Ajuda e Suporte</span>
                </div>
              </button>
            </div>
          </div>

          {/* Perigo */}
          <div className="pt-4 border-t border-slate-700 space-y-3">
            <button 
              onClick={resetProgress}
              className="w-full flex items-center justify-center gap-2 p-4 bg-red-900/20 text-red-500 rounded-2xl border-2 border-red-500/20 hover:bg-red-900/40 transition-all font-black uppercase text-[10px] tracking-widest"
            >
              <RotateCcw size={16} /> Reiniciar Progresso
            </button>
            <button className="w-full flex items-center justify-center gap-2 p-4 bg-slate-700 text-slate-400 rounded-2xl font-black uppercase text-[10px] tracking-widest opacity-50 cursor-not-allowed">
              <LogOut size={16} /> Sair da Conta
            </button>
          </div>

        </div>

        {/* Footer Version */}
        <div className="p-4 bg-slate-900/30 text-center">
            <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest">UNO Royale v1.4.2-stable • Made by AI Studio</span>
        </div>

      </div>
    </div>
  );
};

interface SettingToggleProps {
  label: string;
  active: boolean;
  icon: any;
  onClick: () => void;
}

const SettingToggle: React.FC<SettingToggleProps> = ({ label, active, icon: Icon, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center p-4 rounded-3xl border-4 transition-all active:scale-90 ${
      active 
      ? 'bg-blue-600 border-blue-400 shadow-[0_4px_0_rgb(29,78,216)]' 
      : 'bg-slate-700 border-slate-600 shadow-[0_4px_0_rgb(51,65,85)] opacity-60'
    }`}
  >
    <Icon size={24} className="text-white mb-2" />
    <span className="text-[10px] font-game text-white uppercase">{label}</span>
  </button>
);

export default SettingsModal;
