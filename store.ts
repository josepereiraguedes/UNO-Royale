
import { create } from 'zustand';
import { Player, GameView, BattleState, Card, Chest, CardColor, Opponent } from './types';
import { INITIAL_CARDS } from './constants';

interface GameStore {
  player: Player;
  currentView: GameView;
  battle: BattleState | null;
  isSplashScreen: boolean;
  isOpeningChest: boolean;
  isSettingsOpen: boolean;
  settings: {
    sfx: boolean;
    music: boolean;
    vibration: boolean;
  };
  chestRevealing: { card: Card; isNew: boolean } | null;
  passProgress: number;
  unlockedArenaLevel: number;
  pendingArenaReward: { gold: number, gems: number } | null;

  // Ações de Sistema
  setSplashScreen: (val: boolean) => void;
  setView: (view: GameView) => void;
  setSettingsOpen: (val: boolean) => void;
  toggleSetting: (key: 'sfx' | 'music' | 'vibration') => void;
  
  // Ações de Perfil
  updatePlayerName: (name: string) => void;
  resetProgress: () => void;

  // Batalha
  startMatchmaking: () => void;
  startArenaBattle: (arenaLevel: number) => void;
  cancelMatchmaking: () => void;
  playCard: (cardId: string) => void;
  drawCard: () => void;
  endBattle: (winnerId: string) => void;
  collectArenaReward: () => void;
  closeBattle: () => void;
  
  // Economia
  addGold: (amount: number) => void;
  addGems: (amount: number) => void;
  upgradeCard: (cardId: string) => void;
  buyShopItem: (cost: number, currency: 'gold' | 'gems', reward: any) => boolean;
  
  // Baús
  startOpeningChest: (slotIndex: number) => void;
  claimChest: (slotIndex: number) => void;
  closeChestReveal: () => void;
}

const generateCard = (base: any): Card => ({
  id: Math.random().toString(36).substr(2, 9),
  ...base,
  level: 1,
  copies: Math.floor(Math.random() * 20) + 5,
});

const initialState = {
  player: {
    id: 'user_1',
    name: 'Jogador Real',
    level: 1,
    xp: 150,
    trophies: 2450,
    gold: 5000,
    gems: 500,
    arena: 7,
    deck: INITIAL_CARDS.map(generateCard),
    chestSlots: [null, null, null, null],
  },
  currentView: GameView.HOME,
  battle: null,
  isSplashScreen: true,
  isOpeningChest: false,
  isSettingsOpen: false,
  settings: {
    sfx: true,
    music: true,
    vibration: true,
  },
  chestRevealing: null,
  passProgress: 35,
  unlockedArenaLevel: 1,
  pendingArenaReward: null,
};

export const useGameStore = create<GameStore>((set, get) => {
  
  const botThinkAndMove = async () => {
    const state = get();
    const battle = state.battle;
    if (!battle || battle.status !== 'IN_BATTLE') return;

    const currentTurnId = battle.turn;
    const currentBot = battle.players.opponents.find(o => o.id === currentTurnId);
    if (!currentBot || !currentBot.isBot) return;

    const delay = battle.isFastMode ? 800 : (1500 + Math.random() * 1000);
    await new Promise(r => setTimeout(r, delay));

    const topCard = battle.discardPile[battle.discardPile.length - 1];
    const validCards = currentBot.hand.filter(c => 
      c.color === battle.currentColor || 
      c.value === topCard.value || 
      c.color === 'WILD'
    );

    if (validCards.length === 0) {
      const newCard = generateCard(INITIAL_CARDS[Math.floor(Math.random() * INITIAL_CARDS.length)]);
      const newOpponents = battle.players.opponents.map(o => 
        o.id === currentBot.id 
        ? { ...o, hand: [...o.hand, newCard], handCount: o.handCount + 1 }
        : o
      );
      const nextTurnId = getNextTurnId(battle, currentTurnId);
      set({ battle: { ...battle, players: { ...battle.players, opponents: newOpponents }, turn: nextTurnId } });
      if (nextTurnId !== 'user_1') botThinkAndMove();
      return;
    }

    let cardToPlay: Card;
    const arena = battle.arenaLevel || 1;
    if (arena <= 3) cardToPlay = validCards[0];
    else if (arena <= 7) {
      const sameColor = validCards.filter(c => c.color === battle.currentColor && c.color !== 'WILD');
      cardToPlay = sameColor.length > 0 ? sameColor[0] : validCards[0];
    } else {
      const colorCounts: Record<string, number> = { RED: 0, BLUE: 0, GREEN: 0, YELLOW: 0 };
      currentBot.hand.forEach(c => { if (c.color !== 'WILD') colorCounts[c.color]++; });
      const bestColor = Object.entries(colorCounts).reduce((a, b) => a[1] > b[1] ? a : b)[0] as CardColor;
      cardToPlay = validCards.find(c => c.color === bestColor) || validCards.find(c => c.color !== 'WILD') || validCards[0];
    }
    executeMove(currentTurnId, cardToPlay.id);
  };

  const getNextTurnId = (battle: BattleState, currentId: string) => {
    const allPlayers = [{ id: 'user_1' }, ...battle.players.opponents];
    const currentIndex = allPlayers.findIndex(p => p.id === currentId);
    let nextIndex = (currentIndex + battle.currentDirection + allPlayers.length) % allPlayers.length;
    return allPlayers[nextIndex].id;
  };

  const executeMove = (playerId: string, cardId: string) => {
    const state = get();
    const battle = state.battle;
    if (!battle) return;

    let card: Card | undefined;
    let isMe = playerId === 'user_1';

    if (isMe) card = battle.players.me.hand.find(c => c.id === cardId);
    else card = battle.players.opponents.find(o => o.id === playerId)?.hand.find(c => c.id === cardId);

    if (!card) return;

    let drawCount = 0;
    let skipNext = false;
    let newDirection = battle.currentDirection;
    let newColor = card.color === 'WILD' ? battle.currentColor : card.color;

    if (card.value === 'SKIP') skipNext = true;
    if (card.value === 'REVERSE') {
      if (battle.players.opponents.length === 1) skipNext = true;
      else newDirection = (battle.currentDirection * -1) as 1 | -1;
    }
    if (card.value === 'DRAW2') drawCount = 2;
    if (card.value === 'WILD4') {
        drawCount = 4;
        if (!isMe) {
            const opp = battle.players.opponents.find(o => o.id === playerId);
            const counts: any = { RED:0, BLUE:0, GREEN:0, YELLOW:0 };
            opp?.hand.forEach(c => { if(c.color !== 'WILD') counts[c.color]++ });
            newColor = Object.entries(counts).reduce((a:any, b:any) => a[1] > b[1] ? a : b)[0] as CardColor;
        } else newColor = 'BLUE';
    }

    let nextBattle = { ...battle };
    if (isMe) {
      const newHand = battle.players.me.hand.filter(c => c.id !== cardId);
      nextBattle.players.me.hand = newHand;
      if (newHand.length === 0) { get().endBattle('user_1'); return; }
    } else {
      nextBattle.players.opponents = battle.players.opponents.map(o => {
        if (o.id === playerId) {
          const newHand = o.hand.filter(c => c.id !== cardId);
          return { ...o, hand: newHand, handCount: newHand.length };
        }
        return o;
      });
      if (nextBattle.players.opponents.find(o => o.id === playerId)?.hand.length === 0) { get().endBattle(playerId); return; }
    }

    nextBattle.discardPile = [...battle.discardPile, card];
    nextBattle.currentColor = newColor;
    nextBattle.currentDirection = newDirection;

    let nextTurnId = getNextTurnId(nextBattle, playerId);
    if (drawCount > 0) {
      if (nextTurnId === 'user_1') nextBattle.players.me.hand = [...nextBattle.players.me.hand, ...Array.from({length: drawCount}).map(() => generateCard(INITIAL_CARDS[Math.floor(Math.random()*INITIAL_CARDS.length)]))];
      else nextBattle.players.opponents = nextBattle.players.opponents.map(o => o.id === nextTurnId ? { ...o, hand: [...o.hand, ...Array.from({length: drawCount}).map(() => generateCard(INITIAL_CARDS[Math.floor(Math.random()*INITIAL_CARDS.length)]))], handCount: o.hand.length + drawCount } : o);
      skipNext = true;
    }
    if (skipNext) nextTurnId = getNextTurnId(nextBattle, nextTurnId);
    nextBattle.turn = nextTurnId;
    set({ battle: nextBattle });
    if (nextTurnId !== 'user_1') botThinkAndMove();
  };

  return {
    ...initialState,

    setSplashScreen: (val) => set({ isSplashScreen: val }),
    setView: (view) => set({ currentView: view }),
    setSettingsOpen: (val) => set({ isSettingsOpen: val }),
    toggleSetting: (key) => set(s => ({ settings: { ...s.settings, [key]: !s.settings[key] } })),
    
    updatePlayerName: (name) => set(s => ({ player: { ...s.player, name: name || 'Jogador Real' } })),
    resetProgress: () => {
      if (confirm('Tem certeza que deseja reiniciar seu progresso? Isso não pode ser desfeito.')) {
        set({ ...initialState, isSplashScreen: false });
      }
    },

    addGold: (amount) => set(s => ({ player: { ...s.player, gold: s.player.gold + amount } })),
    addGems: (amount) => set(s => ({ player: { ...s.player, gems: s.player.gems + amount } })),

    upgradeCard: (cardId) => {
        const p = get().player;
        const cardIndex = p.deck.findIndex(c => c.id === cardId);
        if (cardIndex === -1) return;
        const card = p.deck[cardIndex];
        const cost = card.level * 400;
        const req = card.level * 10;
        if (p.gold >= cost && card.copies >= req) {
            const newDeck = [...p.deck];
            newDeck[cardIndex] = { ...card, level: card.level + 1, copies: card.copies - req };
            set({ player: { ...p, gold: p.gold - cost, deck: newDeck, xp: p.xp + (card.level * 50) } });
        }
    },

    buyShopItem: (cost, currency, reward) => {
        const p = get().player;
        if (p[currency] < cost) return false;

        const newPlayer = { ...p, [currency]: p[currency] - cost };

        if (reward.type === 'cards') {
            const randomCardIdx = Math.floor(Math.random() * newPlayer.deck.length);
            newPlayer.deck[randomCardIdx].copies += reward.amount;
        } else if (reward.type === 'chest') {
            const emptySlot = newPlayer.chestSlots.findIndex(s => s === null);
            if (emptySlot === -1) return false;
            newPlayer.chestSlots[emptySlot] = { id: Math.random().toString(), type: reward.chestType, unlockTime: 0, isOpening: false };
        } else if (reward.type === 'gold_pack') {
            newPlayer.gold += reward.amount;
        }

        set({ player: newPlayer });
        return true;
    },

    startArenaBattle: (level) => {
      const isFastMode = level === 10;
      const botCount = level;
      const opponents: Opponent[] = Array.from({ length: botCount }).map((_, i) => {
        const hSize = isFastMode ? 5 : 7;
        const hand = Array.from({ length: hSize }).map(() => generateCard(INITIAL_CARDS[Math.floor(Math.random() * INITIAL_CARDS.length)]));
        return { id: `bot_${i}`, name: `Bot Arena ${level}`, hand: hand, handCount: hSize, trophies: level * 100, isBot: true };
      });
      set({ battle: { status: 'IN_BATTLE', type: 'ARENA_MODE', arenaLevel: level, isFastMode, players: { me: { id: 'user_1', name: 'Jogador Real', hand: Array.from({ length: isFastMode ? 5 : 7 }).map(() => generateCard(INITIAL_CARDS[Math.floor(Math.random() * INITIAL_CARDS.length)])), trophies: get().player.trophies }, opponents }, turn: 'user_1', discardPile: [generateCard({ value: '5', color: 'RED', rarity: 'COMMON' })], drawPileCount: 100, currentDirection: 1, currentColor: 'RED' } });
    },

    startMatchmaking: () => {
      set({ battle: { status: 'MATCHMAKING', type: 'RANKED', players: { me: { id: 'user_1', name: 'Jogador Real', hand: [], trophies: get().player.trophies }, opponents: [{ id: 'opp_1', name: 'Robô de Elite', hand: [], handCount: 0, trophies: get().player.trophies - 20, isBot: true }] }, turn: '', discardPile: [], drawPileCount: 54, currentDirection: 1, currentColor: 'RED' } });
      setTimeout(() => {
        const b = get().battle; if (!b) return;
        set({ battle: { ...b, status: 'IN_BATTLE', turn: 'user_1', discardPile: [generateCard({ value: '1', color: 'BLUE', rarity: 'COMMON' })], players: { ...b.players, me: { ...b.players.me, hand: Array.from({length:7}).map(() => generateCard(INITIAL_CARDS[Math.floor(Math.random()*INITIAL_CARDS.length)])) }, opponents: b.players.opponents.map(o => ({ ...o, hand: Array.from({length:7}).map(() => generateCard(INITIAL_CARDS[Math.floor(Math.random()*INITIAL_CARDS.length)])) , handCount: 7 })) } } });
      }, 1500);
    },

    playCard: (id) => executeMove('user_1', id),
    drawCard: () => {
      const b = get().battle; if (!b || b.turn !== 'user_1') return;
      const nextId = getNextTurnId(b, 'user_1');
      set({ battle: { ...b, players: { ...b.players, me: { ...b.players.me, hand: [...b.players.me.hand, generateCard(INITIAL_CARDS[Math.floor(Math.random() * INITIAL_CARDS.length)])] } }, turn: nextId } });
      if (nextId !== 'user_1') botThinkAndMove();
    },

    endBattle: (winnerId) => {
      const { battle, player } = get();
      if (!battle) return;
      
      const isWin = winnerId === 'user_1';
      const isArena = battle.type === 'ARENA_MODE';
      const isRanked = battle.type === 'RANKED';

      let newTrophies = player.trophies;
      let newGold = player.gold;
      let newChestSlots = [...player.chestSlots];

      if (isRanked) {
        if (isWin) {
          newTrophies += 30;
          newGold += 20;
          const emptySlot = newChestSlots.findIndex(s => s === null);
          if (emptySlot !== -1) {
            newChestSlots[emptySlot] = { id: Math.random().toString(), type: Math.random() > 0.8 ? 'GOLD' : 'SILVER', unlockTime: 0, isOpening: false };
          }
        } else {
          newTrophies = Math.max(0, newTrophies - 20);
        }
      }

      set(s => ({ 
        battle: { ...s.battle!, status: 'RESULT', winner: winnerId },
        player: { ...s.player, trophies: newTrophies, gold: newGold, chestSlots: newChestSlots, xp: s.player.xp + 50 } 
      }));
    },

    closeBattle: () => set({ battle: null }),

    collectArenaReward: () => {
      const { pendingArenaReward, player } = get();
      if (pendingArenaReward) set({ player: { ...player, gold: player.gold + pendingArenaReward.gold, gems: player.gems + pendingArenaReward.gems }, pendingArenaReward: null, battle: null });
    },

    cancelMatchmaking: () => set({ battle: null }),
    startOpeningChest: (index) => set(s => {
        const slots = [...s.player.chestSlots];
        if (slots[index]) slots[index] = { ...slots[index]!, isOpening: true, unlockTime: Date.now() + 5000 };
        return { player: { ...s.player, chestSlots: slots } };
    }),
    claimChest: (index) => {
        const chest = get().player.chestSlots[index];
        if (!chest) return;
        const card = generateCard(INITIAL_CARDS[Math.floor(Math.random()*INITIAL_CARDS.length)]);
        set(s => ({ 
            isOpeningChest: true, 
            chestRevealing: { card, isNew: false }, 
            player: { ...s.player, gold: s.player.gold + 200, chestSlots: s.player.chestSlots.map((sc, i) => i === index ? null : sc) } 
        }));
    },
    closeChestReveal: () => set({ isOpeningChest: false, chestRevealing: null })
  };
});
