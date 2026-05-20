import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { items, ootItems, mmItems } from '../data/item';

interface GameState {
  // Items
  items: typeof items;
  obtainedItemsOOT: string[];
  obtainedItemsMM: string[];
  checksCompleted: number;
  hintsAvailable: number;
  currentGame: 'oot' | 'mm';
  
  // Actions
  obtainItem: (itemId: string) => void;
  completeCheck: () => void;
  useHint: () => void;
  setCurrentGame: (game: 'oot' | 'mm') => void;
  resetProgression: () => void;
  getObtainedItems: () => string[];
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      items: items,
      obtainedItemsOOT: [],
      obtainedItemsMM: [],
      checksCompleted: 0,
      hintsAvailable: 0,
      currentGame: 'oot',

      obtainItem: (itemId: string) => {
        set((state) => {
          const currentObtained = state.currentGame === 'oot' 
            ? state.obtainedItemsOOT 
            : state.obtainedItemsMM;
          
          if (currentObtained.includes(itemId)) return state;
          
          const newObtained = [...currentObtained, itemId];
          const newChecks = state.checksCompleted + 1;
          const newHints = Math.floor(newChecks / 10);
          
          if (state.currentGame === 'oot') {
            return {
              obtainedItemsOOT: newObtained,
              checksCompleted: newChecks,
              hintsAvailable: newHints,
            };
          } else {
            return {
              obtainedItemsMM: newObtained,
              checksCompleted: newChecks,
              hintsAvailable: newHints,
            };
          }
        });
      },

      completeCheck: () => {
        set((state) => {
          const newChecks = state.checksCompleted + 1;
          const newHints = Math.floor(newChecks / 10);
          return {
            checksCompleted: newChecks,
            hintsAvailable: newHints,
          };
        });
      },

      useHint: () => {
        set((state) => ({
          hintsAvailable: Math.max(0, state.hintsAvailable - 1)
        }));
      },

      setCurrentGame: (game: 'oot' | 'mm') => {
        set({ currentGame: game });
      },

      resetProgression: () => {
        set({
          obtainedItemsOOT: [],
          obtainedItemsMM: [],
          checksCompleted: 0,
          hintsAvailable: 0,
        });
      },
      
      getObtainedItems: () => {
        const state = get();
        return state.currentGame === 'oot' ? state.obtainedItemsOOT : state.obtainedItemsMM;
      },
    }),
    {
      name: 'zelda-progression-v3',
    }
  )
);