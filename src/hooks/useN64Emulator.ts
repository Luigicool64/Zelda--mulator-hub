// src/hooks/useN64Emulator.ts (version corrigée)
import { useRef, useState, useEffect, useCallback } from 'react';

declare global {
  interface Window {
    EJS_player: string;
    EJS_core: string;
    EJS_gameUrl: string;
    EJS_pathtodata: string;
    EJS_startOnLoad: boolean;
    EJS_onGameStart: () => void;
    EJS_onGameLoaded: () => void;
    EJS_emulator: any;
  }
}

interface UseN64EmulatorOptions {
  romFile?: File;
  romUrl?: string;
  onProgress?: (checkId: string) => void;
  onError?: (error: string) => void;
  autoStart?: boolean;
}

export function useN64Emulator(options: UseN64EmulatorOptions) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fps, setFps] = useState(0);
  const [romName, setRomName] = useState<string | null>(null);

  // Attendre que EmulatorJS soit chargé
  const waitForEmulator = useCallback((): Promise<void> => {
    return new Promise((resolve) => {
      if (typeof window.EJS_emulator !== 'undefined' || typeof (window as any).EJS_startEmulator !== 'undefined') {
        resolve();
        return;
      }
      
      const checkInterval = setInterval(() => {
        if (typeof window.EJS_emulator !== 'undefined' || typeof (window as any).EJS_startEmulator !== 'undefined') {
          clearInterval(checkInterval);
          resolve();
        }
      }, 100);
      
      setTimeout(() => {
        clearInterval(checkInterval);
        resolve();
      }, 5000);
    });
  }, []);

  // Initialiser l'émulateur
  const initEmulator = useCallback(async (romUrl: string) => {
    if (!containerRef.current) {
      setError('Conteneur non disponible');
      return false;
    }

    setIsLoading(true);
    setError(null);

    try {
      await waitForEmulator();

      // Nettoyer
      containerRef.current.innerHTML = '';

      // Créer le conteneur
      const playerDiv = document.createElement('div');
      playerDiv.id = 'emulatorjs';
      playerDiv.style.width = '100%';
      playerDiv.style.height = '100%';
      containerRef.current.appendChild(playerDiv);

      // Configuration
      window.EJS_player = 'emulatorjs';
      window.EJS_core = 'n64';
      window.EJS_gameUrl = romUrl;
      window.EJS_pathtodata = 'https://cdn.emulatorjs.org/stable/data/';
      window.EJS_startOnLoad = true;
      window.EJS_onGameLoaded = () => {
        setIsReady(true);
        setIsPlaying(true);
        setIsLoading(false);
        options.onProgress?.('emulator-ready');
      };

      // Démarrer
      if ((window as any).EJS_startEmulator) {
        (window as any).EJS_startEmulator();
      } else if (window.EJS_emulator) {
        window.EJS_emulator.start();
      } else {
        throw new Error('EmulatorJS non disponible');
      }

      return true;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Erreur inconnue';
      setError(errorMsg);
      options.onError?.(errorMsg);
      setIsLoading(false);
      return false;
    }
  }, [waitForEmulator, options]);

  // Charger la ROM
  const loadRom = useCallback(async () => {
    if (options.romFile) {
      const romUrl = URL.createObjectURL(options.romFile);
      setRomName(options.romFile.name);
      await initEmulator(romUrl);
    } else if (options.romUrl) {
      setRomName(options.romUrl.split('/').pop() || 'ROM');
      await initEmulator(options.romUrl);
    }
  }, [options.romFile, options.romUrl, initEmulator]);

  useEffect(() => {
    if (options.autoStart !== false && (options.romFile || options.romUrl)) {
      loadRom();
    }
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [options.romFile, options.romUrl, options.autoStart, loadRom]);

  // Simulation FPS
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setFps(Math.floor(30 + Math.random() * 10));
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const start = useCallback(() => {
    if ((window as any).EJS_resume) (window as any).EJS_resume();
    setIsPlaying(true);
  }, []);

  const pause = useCallback(() => {
    if ((window as any).EJS_pause) (window as any).EJS_pause();
    setIsPlaying(false);
  }, []);

  const reset = useCallback(() => {
    if ((window as any).EJS_reset) (window as any).EJS_reset();
    options.onProgress?.('reset');
  }, [options]);

  const saveState = useCallback((slot: number) => {
    if ((window as any).EJS_saveState) {
      (window as any).EJS_saveState(slot);
      options.onProgress?.(`save-slot-${slot + 1}`);
      return true;
    }
    return false;
  }, [options]);

  const loadState = useCallback((slot: number) => {
    if ((window as any).EJS_loadState) {
      (window as any).EJS_loadState(slot);
      options.onProgress?.(`load-slot-${slot + 1}`);
      return true;
    }
    return false;
  }, [options]);

  return {
    containerRef,
    isReady,
    isPlaying,
    isLoading,
    error,
    fps,
    romName,
    start,
    pause,
    reset,
    saveState,
    loadState,
    togglePause: () => (isPlaying ? pause() : start())
  };
}