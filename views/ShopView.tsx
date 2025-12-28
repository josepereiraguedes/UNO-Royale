
import React, { useState, useEffect } from 'react';
import { useGameStore } from '../store';
import { Gem, CircleDollarSign, Package, Zap, CheckCircle2, ShoppingCart, Star, TrendingUp } from 'lucide-react';

const ShopView: React.FC = () => {
  const { player, buyShopItem } = useGameStore();
  const [purchasedItems, setPurchasedItems] = useState<string[]>([]);

  // Itens da Loja
  const dailyDeals = [
    { id: 'free_gold', name: 'Presente Diário', price: 0, currency: 'gold', amount: 100, type: 'gold_pack', color: 'bg-yellow-500', isFree: true },
    { id: 'common_cards', name: 'Pilha Comum', price: 250, currency: 'gold', amount: 25, type: 'cards', color: 'bg-slate-400' },
    { id: 'rare_cards', name: 'Lote Raro', price: 1000, currency: 'gold', amount: 10, type: 'cards', color: 'bg-orange-500' },
  ];

  const chests = [
    { id: 'silver_chest', name: 'Baú de Prata', price: 50, chestType: 'SILVER', color: 'bg-slate-300' },
    { id: 'gold_chest', name: 'Baú de Ouro', price: 150, chestType: 'GOLD', color: 'bg-yellow-600' },
    { id: 'magical_chest', name: 'Baú Mágico', price: 500, chestType: 'MAGICAL', color: 'bg-purple-600' },
  ];

  const goldPacks = [
    { id: 'gold_small', name: 'Bolsa de Ouro', price: 60, amount: 1000, icon: '💰' },
    { id: 'gold_medium', name: 'Balde de Ouro', price: 500, amount: 10000, icon: '🪣' },
    { id: 'gold_large', name: 'Cofre de Ouro', price: 4500, amount: 100000, icon: '🏦' },
  ];

  const handlePurchase = (item: any) => {
    if (purchasedItems.includes(item.id)) return;

    let reward: any = {};
    if (item.type === 'cards') reward = { type: 'cards', amount: item.amount };
    else if (item.chestType) reward = { type: 'chest', chestType: item.chestType };
    else if (item.id.startsWith('gold_')) reward = { type: 'gold_pack', amount: item.amount };
    else if (item.id === 'free_gold') reward = { type: 'gold_pack', amount: item.amount };

    const success = buyShopItem(item.price, item.currency || 'gems', reward);
    
    if (success) {
      setPurchasedItems(prev => [...prev, item.id]);
    } else {
      // Feedback visual de erro (sacudir ou brilho vermelho)
    }
  };

  return (
    <div className="flex flex-col p-4 gap-10 animate-royale-pop pb-24">
      
      {/* Header da Loja */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="bg-blue-600 p-2 rounded-xl shadow-lg border-2 border-blue-400">
                    <ShoppingCart className="text-white" size={24} />
                </div>
                <h2 className="text-3xl font-game text-white drop-shadow-md italic tracking-tighter">LOJA REAL</h2>
            </div>
            <div className="flex flex-col items-end">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Renova em</span>
                <span className="text-xs font-game text-blue-400">14:22:05</span>
            </div>
        </div>
      </div>

      {/* Seção 1: Ofertas Diárias */}
      <div className="flex flex-col gap-4">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <Star size={14} className="text-yellow-500 fill-yellow-500" /> Ofertas Diárias
        </h3>
        <div className="grid grid-cols-3 gap-3">
            {dailyDeals.map((deal) => {
                const sold = purchasedItems.includes(deal.id);
                return (
                    <div 
                        key={deal.id}
                        onClick={() => handlePurchase(deal)}
                        className={`relative bg-slate-800 rounded-3xl p-3 border-4 flex flex-col items-center gap-2 transition-all shadow-xl active:scale-95 cursor-pointer ${sold ? 'border-slate-900 opacity-50 grayscale' : 'border-slate-700 hover:border-blue-500'}`}
                    >
                        {deal.isFree && !sold && (
                            <div className="absolute -top-3 -right-2 bg-green-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full border-2 border-white shadow-lg animate-bounce z-10">GRÁTIS</div>
                        )}
                        <div className={`w-full aspect-square ${deal.color} rounded-2xl shadow-inner flex flex-col items-center justify-center border-2 border-white/20 relative overflow-hidden`}>
                            <span className="text-white font-game text-2xl drop-shadow-lg z-10">+{deal.amount}</span>
                            <div className="absolute inset-0 bg-white/5 pointer-events-none"></div>
                        </div>
                        <div className="text-[9px] font-black text-center uppercase text-slate-300 leading-tight h-5 flex items-center">{deal.name}</div>
                        
                        <button className={`w-full py-2 rounded-xl font-game text-[10px] flex items-center justify-center gap-1 shadow-[0_4px_0_rgba(0,0,0,0.3)] border-b-2 ${sold ? 'bg-slate-700 text-slate-500' : (deal.isFree ? 'bg-green-600 text-white' : 'bg-yellow-500 text-black border-yellow-700')}`}>
                            {sold ? 'COLETADO' : (deal.isFree ? 'COLETAR' : (
                                <>
                                    <CircleDollarSign size={12} />
                                    {deal.price}
                                </>
                            ))}
                        </button>
                    </div>
                );
            })}
        </div>
      </div>

      {/* Seção 2: Baús do Tesouro */}
      <div className="flex flex-col gap-4">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <Package size={14} className="text-cyan-400 fill-cyan-400" /> Baús do Tesouro
        </h3>
        <div className="grid grid-cols-3 gap-3">
            {chests.map((chest) => (
                <div 
                    key={chest.id}
                    onClick={() => handlePurchase(chest)}
                    className="bg-gradient-to-br from-slate-700 to-slate-900 rounded-3xl p-3 border-4 border-slate-600 flex flex-col items-center gap-3 shadow-2xl active:scale-95 transition-transform cursor-pointer group"
                >
                    <div className={`w-full aspect-square ${chest.color} rounded-2xl flex items-center justify-center shadow-xl border-2 border-white/10 group-hover:scale-110 transition-transform`}>
                        <Package size={32} className="text-white drop-shadow-2xl" />
                    </div>
                    <div className="text-[9px] font-game text-white text-center">{chest.name}</div>
                    <button className="w-full py-2 bg-cyan-600 rounded-xl font-game text-white text-[10px] flex items-center justify-center gap-1 shadow-[0_4px_0_rgb(8,145,178)] border-b-2 border-cyan-400">
                        <Gem size={12} fill="currentColor" /> {chest.price}
                    </button>
                </div>
            ))}
        </div>
      </div>

      {/* Seção 3: Tesouraria (Gemas -> Ouro) */}
      <div className="flex flex-col gap-4">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <TrendingUp size={14} className="text-green-500" /> Tesouraria
        </h3>
        <div className="flex flex-col gap-3">
            {goldPacks.map((pack) => (
                <div 
                    key={pack.id}
                    onClick={() => handlePurchase({ ...pack, currency: 'gems', type: 'gold_pack' })}
                    className="bg-slate-800 rounded-2xl p-4 border-2 border-slate-700 flex items-center justify-between shadow-lg active:translate-x-1 transition-all cursor-pointer group"
                >
                    <div className="flex items-center gap-4">
                        <span className="text-4xl group-hover:scale-125 transition-transform drop-shadow-md">{pack.icon}</span>
                        <div>
                            <div className="font-game text-white text-lg leading-none">{pack.amount.toLocaleString()}</div>
                            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{pack.name}</div>
                        </div>
                    </div>
                    <button className="px-6 py-2.5 bg-cyan-600 rounded-xl font-game text-white text-sm flex items-center gap-2 shadow-[0_4px_0_rgb(8,145,178)] border-b-2 border-cyan-400">
                        <Gem size={16} fill="currentColor" /> {pack.price}
                    </button>
                </div>
            ))}
        </div>
      </div>

      {/* Rodapé Dica */}
      <div className="bg-blue-900/10 p-5 rounded-3xl border-2 border-blue-500/20 text-center">
        <p className="text-[10px] text-blue-400 font-black uppercase tracking-widest">A loja é atualizada a cada 24 horas</p>
      </div>

    </div>
  );
};

export default ShopView;
