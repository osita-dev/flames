import { useCallback, useRef } from "react";

// Web Audio API based sound effects for better browser compatibility
export const useSoundEffects = () => {
  const audioContextRef = useRef<AudioContext | null>(null);

  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  const playTone = useCallback((frequency: number, duration: number, type: OscillatorType = "sine", volume = 0.1) => {
    try {
      const ctx = getAudioContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      oscillator.type = type;
      oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
      
      gainNode.gain.setValueAtTime(volume, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + duration);
    } catch (e) {
      // Audio not supported
    }
  }, [getAudioContext]);

  const playPop = useCallback(() => {
    playTone(800, 0.08, "sine", 0.15);
    setTimeout(() => playTone(1200, 0.05, "sine", 0.1), 20);
  }, [playTone]);

  const playSwoosh = useCallback(() => {
    try {
      const ctx = getAudioContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(400, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.2);
      
      gainNode.gain.setValueAtTime(0.08, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
      
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.2);
    } catch (e) {
      // Audio not supported
    }
  }, [getAudioContext]);

  const playHeartTap = useCallback(() => {
    playTone(600, 0.1, "sine", 0.12);
    setTimeout(() => playTone(750, 0.15, "sine", 0.1), 80);
  }, [playTone]);

  const playEliminate = useCallback(() => {
    playTone(300, 0.15, "triangle", 0.1);
  }, [playTone]);

  const playWinner = useCallback(() => {
    const notes = [523, 659, 784, 1047]; // C5, E5, G5, C6
    notes.forEach((freq, i) => {
      setTimeout(() => playTone(freq, 0.3, "sine", 0.12), i * 100);
    });
  }, [playTone]);

  const playSparkle = useCallback(() => {
    const sparkleNotes = [1500, 2000, 1800, 2200];
    sparkleNotes.forEach((freq, i) => {
      setTimeout(() => playTone(freq, 0.08, "sine", 0.05), i * 40);
    });
  }, [playTone]);

  return {
    playPop,
    playSwoosh,
    playHeartTap,
    playEliminate,
    playWinner,
    playSparkle,
  };
};
