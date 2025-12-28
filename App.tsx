
import React, { useEffect } from 'react';
import { useGameStore } from './store';
import { GameView } from './types';
import HomeView from './views/HomeView';
import BattleView from './views/BattleView';
import DeckView from './views/DeckView';
import ShopView from './views/ShopView';
import ClanView from './views/ClanView';
import ArenaMapView from './views/ArenaMapView';
import BottomNav from './components/BottomNav';
import TopBar from './components/TopBar';
import SplashScreen from './components/SplashScreen';
import ChestReveal from './components/ChestReveal';
import SettingsModal from './components/SettingsModal';

const App: React.FC = () => {
  const { currentView, battle, isSplashScreen, setSplashScreen, isOpeningChest } = useGameStore();

  useEffect(() => {
    const timer = setTimeout(() => setSplashScreen(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (isSplashScreen) {
    return <SplashScreen />;
  }

  if (battle) {
    return <BattleView />;
  }

  const renderView = () => {
    switch (currentView) {
      case GameView.HOME: return <HomeView />;
      case GameView.DECK: return <DeckView />;
      case GameView.SHOP: return <ShopView />;
      case GameView.CLAN: return <ClanView />;
      case GameView.ARENA_MAP: return <ArenaMapView />;
      default: return <HomeView />;
    }
  };

  return (
    <div className="flex flex-col h-screen w-full max-w-md mx-auto bg-slate-900 shadow-2xl overflow-hidden relative border-x border-slate-800">
      <TopBar />
      <main className="flex-1 overflow-y-auto pb-24 scroll-smooth">
        {renderView()}
      </main>
      <BottomNav />
      {isOpeningChest && <ChestReveal />}
      <SettingsModal />
    </div>
  );
};

export default App;
