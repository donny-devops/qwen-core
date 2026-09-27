// Generate a pleasant notification sound using Web Audio API
export function playNotificationSound() {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Play a sequence of pleasant tones
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    const duration = 0.2;
    
    notes.forEach((freq, i) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(freq, audioContext.currentTime + i * duration);
      
      gainNode.gain.setValueAtTime(0, audioContext.currentTime + i * duration);
      gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + i * duration + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + i * duration + duration);
      
      oscillator.start(audioContext.currentTime + i * duration);
      oscillator.stop(audioContext.currentTime + i * duration + duration);
    });
  } catch (e) {
    console.warn('Audio notification not available:', e);
  }
}

export function playClickSound() {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  } catch (e) {
    // Silent fail
  }
}
