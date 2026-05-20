export interface Item {
  id: string;
  name: string;
  category: ItemCategory;
  image: string;
  obtained: boolean;
  requiredFor?: string[];
}

export type ItemCategory = 'songs' | 'equipment' | 'masks' | 'keys' | 'weapons' | 'defense';

export interface Check {
  id: string;
  name: string;
  location: string;
  completed: boolean;
  requirements: string[]; // Items requis
  type: 'chest' | 'quest' | 'puzzle' | 'key-item' | 'event';
}

export interface Hint {
  id: string;
  itemId: string;
  location: string;
  used: boolean;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  category: AchievementCategory;
  condition: string;
  rarity: number;
  unlocked: boolean;
  unlockedAt?: Date;
}

export type AchievementCategory = 'exploration' | 'combat' | 'collection' | 'speedrun' | 'randomizer';

export interface Rom {
  id: string;
  name: string;
  game: 'OOT' | 'MM' | 'OOTMM';
  seed?: string;
  file: File;
  spoilerLog?: SpoilerLog;
}

export interface SpoilerLog {
  locations: Record<string, string>;
  items: Record<string, string>;
  checks: string[];
}

export interface UserProgress {
  checksCompleted: number;
  hintsAvailable: number;
  hintsUsed: number;
  itemsObtained: string[];
  achievements: string[];
  currentSession?: Session;
}

export interface Session {
  romId: string;
  startTime: Date;
  checks: Check[];
  items: Item[];
}