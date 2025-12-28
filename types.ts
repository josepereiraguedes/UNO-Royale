
export type CardColor = 'RED' | 'BLUE' | 'GREEN' | 'YELLOW' | 'WILD';
export type CardValue = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | 'SKIP' | 'REVERSE' | 'DRAW2' | 'WILD' | 'WILD4';
export type CardRarity = 'COMMON' | 'RARE' | 'EPIC' | 'LEGENDARY';

export interface Card {
  id: string;
  color: CardColor;
  value: CardValue;
  rarity: CardRarity;
  level: number;
  copies: number;
}

export interface Player {
  id: string;
  name: string;
  level: number;
  xp: number;
  trophies: number;
  gold: number;
  gems: number;
  arena: number;
  deck: Card[];
  chestSlots: (Chest | null)[];
}

export interface Chest {
  id: string;
  type: 'SILVER' | 'GOLD' | 'MAGICAL' | 'LEGENDARY';
  unlockTime: number;
  isOpening: boolean;
}

export interface Opponent {
  id: string;
  name: string;
  hand: Card[]; // Agora os bots têm mãos reais para lógica de IA
  handCount: number;
  trophies: number;
  isBot: boolean;
}

export interface BattleState {
  status: 'MATCHMAKING' | 'IN_BATTLE' | 'RESULT';
  type: 'RANKED' | 'ARENA_MODE';
  arenaLevel?: number;
  isFastMode?: boolean;
  players: {
    me: { id: string; name: string; hand: Card[]; trophies: number };
    opponents: Opponent[];
  };
  turn: string; // ID do jogador atual
  discardPile: Card[];
  drawPileCount: number;
  currentDirection: 1 | -1;
  currentColor: CardColor;
  winner?: string;
}

export enum GameView {
  HOME = 'HOME',
  SHOP = 'SHOP',
  DECK = 'DECK',
  CLAN = 'CLAN',
  EVENTS = 'EVENTS',
  ARENA_MAP = 'ARENA_MAP'
}
