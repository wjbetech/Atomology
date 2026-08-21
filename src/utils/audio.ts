// Shared WebAudio helpers used by game celebration/feedback sounds.
// All failures (autoplay policies, unsupported browsers) fail silently.

type AudioContextCtor = typeof AudioContext;

function getAudioContextCtor(): AudioContextCtor | null {
  return (
    window.AudioContext ??
    (window as Window & { webkitAudioContext?: AudioContextCtor })
      .webkitAudioContext ??
    null
  );
}

export const playTone = (
  freq: number,
  duration = 0.12,
  type: OscillatorType = "sine"
) => {
  try {
    const Ctx = getAudioContextCtor();
    if (!Ctx) return;
    const ctx = new Ctx();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = type;
    o.frequency.value = freq;
    o.connect(g);
    g.connect(ctx.destination);
    g.gain.setValueAtTime(0.001, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 0.01);
    o.start();
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    setTimeout(() => {
      o.stop();
      ctx.close();
    }, duration * 1000 + 50);
  } catch {
    // ignore audio errors silently
  }
};

// Richer short celebration: three-note arpeggio + bright sparkle overlay
export const playCelebration = () => {
  try {
    const Ctx = getAudioContextCtor();
    if (!Ctx) return;
    const ctx = new Ctx();
    const now = ctx.currentTime;
    const master = ctx.createGain();
    master.gain.value = 0.001;
    master.connect(ctx.destination);

    // quick fade-in
    master.gain.exponentialRampToValueAtTime(0.6, now + 0.02);

    const notes = [523.25, 659.25, 783.99]; // C5, E5, G5 arpeggio
    const noteDur = 0.14;

    notes.forEach((freq, i) => {
      const t = now + i * (noteDur * 0.9);
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      // slightly detuned saw + triangle mix for warmth
      o.type = "sawtooth";
      o.frequency.value = freq;
      const o2 = ctx.createOscillator();
      o2.type = "triangle";
      o2.frequency.value = freq * 0.999;

      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.35, t + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, t + noteDur);

      o.connect(g);
      o2.connect(g);
      g.connect(master);

      o.start(t);
      o2.start(t);
      o.stop(t + noteDur + 0.02);
      o2.stop(t + noteDur + 0.02);
    });

    // sparkle overlay
    const sparkle = ctx.createOscillator();
    const sg = ctx.createGain();
    sparkle.type = "sine";
    sparkle.frequency.value = 1400;
    sg.gain.setValueAtTime(0.0001, now);
    sg.gain.exponentialRampToValueAtTime(0.18, now + 0.02);
    sg.gain.exponentialRampToValueAtTime(0.0001, now + notes.length * noteDur);
    sparkle.connect(sg);
    sg.connect(master);
    sparkle.start(now);
    sparkle.stop(now + notes.length * noteDur + 0.02);

    // schedule context close
    setTimeout(() => {
      try {
        master.disconnect();
        ctx.close();
      } catch {
        // ignore
      }
    }, (notes.length * noteDur + 0.2) * 1000);
  } catch {
    // ignore audio errors silently
  }
};
