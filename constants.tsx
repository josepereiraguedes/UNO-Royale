
import React from 'react';
import { CardRarity, CardColor } from './types';

export const RARITY_COLORS: Record<CardRarity, string> = {
  COMMON: 'bg-slate-400',
  RARE: 'bg-orange-500',
  EPIC: 'bg-purple-500',
  LEGENDARY: 'bg-cyan-400'
};

export const COLOR_CLASSES: Record<CardColor, string> = {
  RED: 'bg-red-500',
  BLUE: 'bg-blue-500',
  GREEN: 'bg-green-500',
  YELLOW: 'bg-yellow-400',
  WILD: 'bg-slate-800'
};

export const ARENAS = [
  { id: 1, name: 'Estádio Goblin', minTrophies: 0, color: 'bg-emerald-800' },
  { id: 2, name: 'Fosso de Ossos', minTrophies: 400, color: 'bg-amber-900' },
  { id: 3, name: 'Torneio Bárbaro', minTrophies: 800, color: 'bg-orange-800' },
  { id: 4, name: 'Parquinho da P.E.K.K.A', minTrophies: 1200, color: 'bg-indigo-900' },
  { id: 5, name: 'Vale dos Feitiços', minTrophies: 1600, color: 'bg-fuchsia-900' },
  { id: 6, name: 'Oficina do Construtor', minTrophies: 2000, color: 'bg-stone-700' },
  { id: 7, name: 'Arena Real', minTrophies: 2400, color: 'bg-yellow-700' },
  { id: 8, name: 'Pico Congelado', minTrophies: 2800, color: 'bg-sky-700' },
  { id: 9, name: 'Arena da Selva', minTrophies: 3200, color: 'bg-lime-800' },
  { id: 10, name: 'Montanha do Porco', minTrophies: 3600, color: 'bg-rose-900' },
];

export const INITIAL_CARDS: any[] = [
  { value: '0', color: 'RED', rarity: 'COMMON' },
  { value: '1', color: 'BLUE', rarity: 'COMMON' },
  { value: '2', color: 'GREEN', rarity: 'COMMON' },
  { value: 'PULAR', color: 'YELLOW', rarity: 'RARE' },
  { value: 'INVERTER', color: 'RED', rarity: 'RARE' },
  { value: '+2', color: 'BLUE', rarity: 'EPIC' },
  { value: 'COR', color: 'WILD', rarity: 'LEGENDARY' },
  { value: '+4', color: 'WILD', rarity: 'LEGENDARY' },
];
