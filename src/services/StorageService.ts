// services/StorageService.ts
export class StorageService {
  private db: IDBDatabase | null = null;
  private readonly DB_NAME = 'ZeldaRandomizerDB';
  private readonly DB_VERSION = 1;

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.DB_NAME, this.DB_VERSION);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };
      
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        
        // Store pour les ROMs (fichiers binaires)
        if (!db.objectStoreNames.contains('roms')) {
          const romStore = db.createObjectStore('roms', { keyPath: 'id' });
          romStore.createIndex('game', 'game', { unique: false });
          romStore.createIndex('mode', 'mode', { unique: false });
          romStore.createIndex('isFavorite', 'isFavorite', { unique: false });
          romStore.createIndex('lastPlayed', 'lastPlayed', { unique: false });
        }
        
        // Store pour les spoiler logs (JSON)
        if (!db.objectStoreNames.contains('spoilerLogs')) {
          const spoilerStore = db.createObjectStore('spoilerLogs', { keyPath: 'romId' });
          spoilerStore.createIndex('seed', 'seed', { unique: false });
          spoilerStore.createIndex('importedAt', 'importedAt', { unique: false });
        }
        
        // Store pour les métadonnées des ROMs
        if (!db.objectStoreNames.contains('romMetadata')) {
          const metaStore = db.createObjectStore('romMetadata', { keyPath: 'id' });
          metaStore.createIndex('name', 'name', { unique: false });
          metaStore.createIndex('game', 'game', { unique: false });
        }
      };
    });
  }

  // Sauvegarder une ROM
  async saveRom(rom: {
    id: string;
    name: string;
    game: 'oot' | 'mm';
    mode: 'vanilla' | 'rando';
    file: File;
    size: number;
    lastPlayed?: Date;
    isFavorite: boolean;
  }): Promise<void> {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['roms', 'romMetadata'], 'readwrite');
      
      // Sauvegarder le fichier ROM
      const romStore = transaction.objectStore('roms');
      const romData = {
        id: rom.id,
        data: rom.file,
        size: rom.size,
        type: rom.file.type
      };
      romStore.put(romData);
      
      // Sauvegarder les métadonnées
      const metaStore = transaction.objectStore('romMetadata');
      const metadata = {
        id: rom.id,
        name: rom.name,
        game: rom.game,
        mode: rom.mode,
        size: rom.size,
        lastPlayed: rom.lastPlayed?.toISOString(),
        isFavorite: rom.isFavorite
      };
      metaStore.put(metadata);
      
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
  }

  // Récupérer une ROM
  async getRom(id: string): Promise<{ metadata: any; file: File } | null> {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['roms', 'romMetadata'], 'readonly');
      
      const romRequest = transaction.objectStore('roms').get(id);
      const metaRequest = transaction.objectStore('romMetadata').get(id);
      
      let romResult: any = null;
      let metaResult: any = null;
      
      romRequest.onsuccess = () => { romResult = romRequest.result; checkComplete(); };
      metaRequest.onsuccess = () => { metaResult = metaRequest.result; checkComplete(); };
      
      const checkComplete = () => {
        if (romResult !== null && metaResult !== null) {
          if (romResult && metaResult) {
            const file = new File([romResult.data], metaResult.name, { type: romResult.type });
            resolve({ metadata: metaResult, file });
          } else {
            resolve(null);
          }
        }
      };
      
      transaction.onerror = () => reject(transaction.error);
    });
  }

  // Récupérer toutes les métadonnées des ROMs
  async getAllRomMetadata(): Promise<any[]> {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction('romMetadata', 'readonly');
      const store = transaction.objectStore('romMetadata');
      const request = store.getAll();
      
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  }

  // Supprimer une ROM
  async deleteRom(id: string): Promise<void> {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['roms', 'romMetadata', 'spoilerLogs'], 'readwrite');
      
      transaction.objectStore('roms').delete(id);
      transaction.objectStore('romMetadata').delete(id);
      transaction.objectStore('spoilerLogs').delete(id);
      
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
  }

  // Sauvegarder un spoiler log
  async saveSpoilerLog(romId: string, spoilerLog: any): Promise<void> {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction('spoilerLogs', 'readwrite');
      const store = transaction.objectStore('spoilerLogs');
      
      store.put({
        romId: romId,
        ...spoilerLog,
        importedAt: new Date().toISOString()
      });
      
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
  }

  // Récupérer un spoiler log
  async getSpoilerLog(romId: string): Promise<any | null> {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction('spoilerLogs', 'readonly');
      const store = transaction.objectStore('spoilerLogs');
      const request = store.get(romId);
      
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });
  }

  // Supprimer un spoiler log
  async deleteSpoilerLog(romId: string): Promise<void> {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction('spoilerLogs', 'readwrite');
      const store = transaction.objectStore('spoilerLogs');
      store.delete(romId);
      
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
  }

  // Mettre à jour les favoris
  async toggleFavorite(id: string, isFavorite: boolean): Promise<void> {
    if (!this.db) await this.init();
    
    const metadata = await this.getRomMetadata(id);
    if (metadata) {
      metadata.isFavorite = isFavorite;
      await this.updateRomMetadata(metadata);
    }
  }

  private async getRomMetadata(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction('romMetadata', 'readonly');
      const store = transaction.objectStore('romMetadata');
      const request = store.get(id);
      
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  private async updateRomMetadata(metadata: any): Promise<void> {
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction('romMetadata', 'readwrite');
      const store = transaction.objectStore('romMetadata');
      store.put(metadata);
      
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
  }
}

export const storageService = new StorageService();