// src/components/emulator/N64Emulator.tsx
import React, { useState, useEffect } from 'react';
import EmulatorJS from 'react-emulatorjs';

interface N64EmulatorProps {
  romFile?: File;
  onProgress?: (checkId: string) => void;
  onError?: (error: string) => void;
}

export function N64Emulator({ romFile, onProgress, onError }: N64EmulatorProps) {
  const [romUrl, setRomUrl] = useState<string | null>(null);

  useEffect(() => {
    if (romFile) {
      const url = URL.createObjectURL(romFile);
      setRomUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [romFile]);

  if (!romUrl) {
    return <div className="emulator-loading">Chargement de la ROM...</div>;
  }

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <EmulatorJS
        EJS_core="n64"
        EJS_gameUrl={romUrl}
        EJS_pathtodata="/data"
        EJS_startOnLoad={true}
        EJS_onGameStart={() => {
          console.log('Jeu N64 démarré');
          onProgress?.('emulator-ready');
        }}
        EJS_onGameLoaded={() => {
          console.log('ROM chargée');
        }}
        EJS_onError={(err: any) => {
          const errorMsg = typeof err === 'string' ? err : 'Erreur émulateur';
          onError?.(errorMsg);
        }}
      />
    </div>
  );
}