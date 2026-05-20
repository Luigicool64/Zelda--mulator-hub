// src/services/n64EmulatorService.ts
export interface N64Config {
  canvas: HTMLCanvasElement;
  romData: ArrayBuffer;
  onLoad?: () => void;
  onError?: (error: string) => void;
  onFrame?: () => void;
}

class N64EmulatorService {
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private isRunning: boolean = false;
  private animationId: number | null = null;
  private fps: number = 0;
  private frameCount: number = 0;
  private lastTime: number = 0;
  private romName: string = '';
  private videoElement: HTMLVideoElement | null = null;

  async init(config: N64Config): Promise<boolean> {
    this.canvas = config.canvas;
    this.ctx = this.canvas.getContext('2d');
    
    if (!this.ctx) {
      config.onError?.('Impossible d\'initialiser le contexte canvas');
      return false;
    }

    // Configurer le canvas
    this.canvas.width = 640;
    this.canvas.height = 480;
    this.canvas.style.width = '100%';
    this.canvas.style.height = 'auto';
    this.canvas.style.aspectRatio = '4/3';

    // Simuler le chargement de la ROM
    setTimeout(() => {
      this.startDemoMode();
      config.onLoad?.();
    }, 1500);

    return true;
  }

  private startDemoMode(): void {
    if (!this.ctx || !this.canvas) return;

    // Démarrer l'animation de démonstration
    this.isRunning = true;
    this.startRenderLoop();
  }

  private startRenderLoop(): void {
    let frameIndex = 0;
    const frames = [
      { text: 'Nintendo 64', color: '#c9a03d' },
      { text: 'Ready to Play!', color: '#4caf50' },
      { text: 'Connect your controller', color: '#ff9800' },
      { text: 'Loading game data...', color: '#2196f3' },
    ];

    const render = () => {
      if (!this.isRunning || !this.ctx || !this.canvas) return;

      // Effacer le canvas
      this.ctx.fillStyle = '#0a0a0a';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

      // Dessiner un effet de scanlines
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      for (let i = 0; i < this.canvas.height; i += 2) {
        this.ctx.fillRect(0, i, this.canvas.width, 1);
      }

      // Animation de démonstration
      const currentFrame = frames[Math.floor(Date.now() / 2000) % frames.length];
      
      // Dessiner un contour N64
      this.ctx.strokeStyle = currentFrame.color;
      this.ctx.lineWidth = 3;
      this.ctx.strokeRect(50, 50, this.canvas.width - 100, this.canvas.height - 100);

      // Texte principal
      this.ctx.fillStyle = currentFrame.color;
      this.ctx.font = 'bold 32px monospace';
      this.ctx.textAlign = 'center';
      this.ctx.fillText(currentFrame.text, this.canvas.width / 2, this.canvas.height / 2);

      // Logo N64
      this.ctx.font = 'bold 48px monospace';
      this.ctx.fillStyle = '#c9a03d';
      this.ctx.fillText('64', this.canvas.width / 2, this.canvas.height / 2 - 40);

      // Instructions
      this.ctx.font = '14px monospace';
      this.ctx.fillStyle = '#aaa';
      this.ctx.fillText('Press any key to start', this.canvas.width / 2, this.canvas.height - 50);

      // FPS counter
      this.frameCount++;
      const now = performance.now();
      if (now - this.lastTime >= 1000) {
        this.fps = this.frameCount;
        this.frameCount = 0;
        this.lastTime = now;
      }

      this.animationId = requestAnimationFrame(render);
    };

    this.lastTime = performance.now();
    this.animationId = requestAnimationFrame(render);
  }

  start(): void {
    if (!this.isRunning) {
      this.isRunning = true;
      this.startRenderLoop();
    }
  }

  pause(): void {
    this.isRunning = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  reset(): void {
    this.pause();
    this.start();
  }

  saveState(): Uint8Array | null {
    // Simuler une sauvegarde
    const mockSave = new Uint8Array([0x4E, 0x36, 0x34, Date.now() % 256]);
    localStorage.setItem('n64_save_state', JSON.stringify(Array.from(mockSave)));
    return mockSave;
  }

  loadState(saveData: Uint8Array): boolean {
    // Simuler le chargement
    console.log('Loading save state:', saveData);
    return true;
  }

  getFPS(): number {
    return this.fps;
  }

  isRunningState(): boolean {
    return this.isRunning;
  }

  destroy(): void {
    this.pause();
    this.canvas = null;
    this.ctx = null;
  }
}

export const n64EmulatorService = new N64EmulatorService();