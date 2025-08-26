import React, { useEffect, useState } from "react";
import AnswerButton from "./AnswerButton";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore, useUIStore } from "../store/atomologyStore";
import ConfettiSparks from "./sub-components/ConfettiSparks";

// sanitiser hook
import { sanitiseAnswer } from "../utils/answerSanitiser";

export default function Answer() {
  const {
    loading,
    answer,
    setScore,
    gameMode,
    gameStarted,
    elements,
    playerAnswer,
    setPlayerAnswer,
    answerElementName,
    setFetchTrigger,
    addGuessedElement,
  } = useGameStore();
  const soundEnabled = useUIStore((s) => s.soundEnabled);
  const [input, setInput] = useState("");
  // unified message state: 'none' | 'incorrect' | 'correct'
  const [message, setMessage] = useState<"none" | "incorrect" | "correct">(
    "none"
  );
  // nonce increments each time a new message is shown so keyed motion elements
  // always mount/unmount even if the same message text appears repeatedly.
  const [messageNonce, setMessageNonce] = useState(0);
  // timer ref used to cancel and prevent overlapping messages
  const messageTimer = React.useRef<number | null>(null);
  // Track wrong answers that have been disabled for the current round
  const [disabledAnswers, setDisabledAnswers] = useState<Set<string>>(
    new Set()
  );
  // When true the round is locked because the correct answer was picked;
  // used to disable all buttons and show the deep-green celebration style.
  const [answeredCorrect, setAnsweredCorrect] = useState(false);
  // brief celebration trigger for confetti
  const [celebrate, setCelebrate] = useState(false);

  useEffect(() => {
    if (!gameStarted) {
      setInput("");
    }
  }, [gameStarted]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    console.log(e.target.value);
  };

  const showMessage = (type: "incorrect" | "correct", duration = 3000) => {
    // cancel any existing message timer
    if (messageTimer.current) {
      clearTimeout(messageTimer.current);
      messageTimer.current = null;
    }
    // bump nonce before setting message so animated components receive a
    // unique key every time and will re-run their entrance animation.
    setMessageNonce((n) => n + 1);
    setMessage(type);
    // schedule clear
    messageTimer.current = window.setTimeout(() => {
      setMessage("none");
      messageTimer.current = null;
    }, duration) as unknown as number;
  };

  // small helper tones using WebAudio API to avoid extra assets
  const playTone = (
    freq: number,
    duration = 0.12,
    type: OscillatorType = "sine"
  ) => {
    try {
      const ctx = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
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
    } catch (e) {
      // ignore audio errors (e.g., autoplay policies) silently
    }
  };

  // richer short celebration: three-note arpeggio + bright sparkle overlay
  const playCelebration = () => {
    try {
      const Ctx = window.AudioContext || (window as any).webkitAudioContext;
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
        o.type = "sawtooth" as OscillatorType;
        o.frequency.value = freq;
        const o2 = ctx.createOscillator();
        o2.type = "triangle" as OscillatorType;
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
      sparkle.type = "sine" as OscillatorType;
      sparkle.frequency.value = 1400;
      sg.gain.setValueAtTime(0.0001, now);
      sg.gain.exponentialRampToValueAtTime(0.18, now + 0.02);
      sg.gain.exponentialRampToValueAtTime(
        0.0001,
        now + notes.length * noteDur
      );
      sparkle.connect(sg);
      sg.connect(master);
      sparkle.start(now);
      sparkle.stop(now + notes.length * noteDur + 0.02);

      // schedule context close
      setTimeout(() => {
        try {
          master.disconnect();
          ctx.close();
        } catch (e) {}
      }, (notes.length * noteDur + 0.2) * 1000);
    } catch (e) {
      // ignore audio errors silently
    }
  };

  // Play the incorrect tone whenever the unified message state becomes 'incorrect'
  useEffect(() => {
    if (message === "incorrect" && soundEnabled) {
      playTone(220, 0.18, "triangle");
    }
  }, [message, soundEnabled]);

  // Handle multi-choice button click
  const handleMultiSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    const selectedAnswer = e.currentTarget.value;
    setPlayerAnswer(selectedAnswer);
    // ignore if already disabled or the round is already locked
    if (disabledAnswers.has(selectedAnswer) || answeredCorrect) return;

    if (answer && selectedAnswer === answer.name) {
      setScore((prevScore: number) => prevScore + 1);
      setInput("");
      // Add guessed element symbol to HUD
      if (answer.symbol) addGuessedElement(answer.symbol);
      // lock the round: disable all buttons and show celebration style
      setAnsweredCorrect(true);
      // show correct message (this cancels any 'incorrect' message instantly)
      showMessage("correct", 2000);
      // celebration visual + tone
      setCelebrate(true);
      if (soundEnabled) playCelebration();
      // clear disabled answers and unlock after celebration (2s)
      setTimeout(() => {
        setDisabledAnswers(new Set());
        setAnsweredCorrect(false);
        // clear player answer in store so next round's UI doesn't mark it incorrect
        setPlayerAnswer("");
        // trigger a fresh fetch for the next round
        setFetchTrigger();
        // stop celebration after the round advances
        setCelebrate(false);
      }, 2000);
    } else {
      // add this wrong answer to the disabled set for the round
      setDisabledAnswers((prev) => new Set(prev).add(selectedAnswer));
      showMessage("incorrect", 4000);
    }
  };

  const handleOpenSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("you submitted your guess!");

    // game logic
    const inputElement = e.currentTarget.elements.namedItem(
      "answer"
    ) as HTMLInputElement;
    const givenAnswer = sanitiseAnswer(inputElement?.value);
    setPlayerAnswer(givenAnswer);

    if (answer && givenAnswer == answer.name) {
      setScore((prevScore: number) => prevScore + 1);
      setInput("");
      // Add guessed element symbol to HUD
      if (answer.symbol) addGuessedElement(answer.symbol);
      // lock round and show deep-green celebration; clear disabled after celebration
      setAnsweredCorrect(true);
      showMessage("correct", 2000);
      setCelebrate(true);
      if (soundEnabled) playCelebration();
      setTimeout(() => {
        setDisabledAnswers(new Set());
        setAnsweredCorrect(false);
        // clear player answer in store so next round's UI doesn't mark it incorrect
        setPlayerAnswer("");
        // trigger a fresh fetch for the next round
        setFetchTrigger();
        setCelebrate(false);
      }, 2000);
    } else {
      showMessage("incorrect", 4000);
    }
  };

  // cleanup message timer on unmount
  useEffect(() => {
    return () => {
      if (messageTimer.current) {
        clearTimeout(messageTimer.current);
        messageTimer.current = null;
      }
    };
  }, []);

  if (elements.length === 4) {
    // Visual feedback state
    const isCorrect = playerAnswer === answerElementName && playerAnswer !== "";
    const isIncorrect =
      playerAnswer !== answerElementName && playerAnswer !== "";

    if (gameStarted && gameMode === "multi" && !loading) {
      return (
        <>
          <div className="w-full lg:mb-10 px-4 lg:px-20 lg:max-w-none mx-auto grid grid-cols-2 justify-center gap-3">
            {elements.map((e, idx) => {
              const wasPickedWrong = disabledAnswers.has(e.name);
              const isThisDisabled = wasPickedWrong || answeredCorrect;
              const isCorrectBtn = !!answer && e.name === answer.name;
              const isSelected = playerAnswer === e.name;
              return (
                <AnswerButton
                  key={e.name}
                  idx={idx}
                  label={e.name}
                  disabled={isThisDisabled}
                  isCorrect={isCorrectBtn}
                  isPickedWrong={wasPickedWrong}
                  isRoundLocked={answeredCorrect}
                  isSelected={isSelected && isCorrect}
                  onClick={handleMultiSubmit}
                />
              );
            })}
          </div>
          {/* Feedback popup hoisted below the grid */}
          <div className="relative flex justify-center items-center w-full py-10 h-[40px]">
            {/* screen-reader live region; kept visually hidden but updates when message changes */}
            <span className="sr-only text-xl" role="status" aria-live="polite">
              {message === "incorrect"
                ? "Incorrect, try again!"
                : message === "correct"
                ? "Correct!"
                : ""}
            </span>
            <AnimatePresence>
              {message === "incorrect" && !loading ? (
                <motion.span
                  key={`incorrect-${messageNonce}`}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.28 }}
                  className="label-text-alt text-red-500 font-semibold text-lg absolute inset-x-0 top-3 text-center whitespace-nowrap"
                  style={{ willChange: "transform, opacity" }}
                >
                  Incorrect, try again!
                </motion.span>
              ) : null}

              {!loading && message === "correct" ? (
                <motion.span
                  key={`correct-${messageNonce}`}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.28 }}
                  className="label-text-alt text-green-600 font-semibold text-lg absolute inset-x-0 top-3 text-center whitespace-nowrap"
                  style={{ willChange: "transform, opacity" }}
                >
                  Correct!
                </motion.span>
              ) : null}
            </AnimatePresence>
          </div>
          {/* Confetti is now anchored and rendered by <Element />; keep celebrate state here for audio/timing only */}
        </>
      );
    }

    if (gameStarted && gameMode === "open") {
      return (
        <form className="form-control" onSubmit={handleOpenSubmit}>
          <input
            type="text"
            name="answer"
            id="answer"
            value={input}
            className={`rounded-full input input-bordered placeholder:text-gray-400/50 placeholder:italic transition-all duration-300 ${
              isCorrect ? "bg-green-200 border-green-500 animate-pulse" : ""
            } ${isIncorrect ? "bg-red-200 border-red-500 shake" : ""}`}
            onChange={handleChange}
            placeholder="What's that element..."
          />
          <div
            className="label relative flex items-center justify-center"
            style={{ minHeight: "24px" }}
          >
            <AnimatePresence>
              {!loading && message === "incorrect" ? (
                <motion.span
                  key={`open-incorrect-${messageNonce}`}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="label-text-alt text-red-500 pt-2 font-semibold text-[16px] absolute inset-x-0 top-3 text-center whitespace-nowrap"
                >
                  Incorrect, try again!
                </motion.span>
              ) : null}

              {!loading && message === "correct" ? (
                <motion.span
                  key={`open-correct-${messageNonce}`}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="label-text-alt text-green-600 pt-2 font-semibold text-[16px] absolute inset-x-0 top-3 text-center whitespace-nowrap"
                >
                  Correct!
                </motion.span>
              ) : null}
            </AnimatePresence>
          </div>
          {/* Confetti is now anchored and rendered by <Element />; keep celebrate state here for audio/timing only */}
        </form>
      );
    }
  }

  if (!gameMode || !gameStarted) {
    return (
      <div className="my-8">
        <span>Get started by picking a game mode!</span>
      </div>
    );
  }
}
