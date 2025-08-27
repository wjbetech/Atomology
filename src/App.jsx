// components
import Layout from "./components/layout/Layout";
import Home from "./components/layout/Home";
import Score from "./components/sub-components/Score";
import HUDWrapper from "./components/sub-components/HUDWrapper";
import MultipleChoice from "./components/pages/MultipleChoice";
import OpenAnswer from "./components/pages/OpenAnswer";
import About from "./components/pages/About";
import Faq from "./components/pages/Faq";
import Contact from "./components/pages/Contact";
import HangmanDifficultySelect from "./components/hangman/HangmanDifficultySelect";
import HangmanGame from "./components/hangman/HangmanGame";

// react-router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useGameStore } from "./store/atomologyStore";

function MainGameContent() {
  const gameMode = useGameStore((s) => s.gameMode);
  const hangmanDifficulty = useGameStore((s) => s.hangmanDifficulty);
  const hangmanWord = useGameStore((s) => s.hangmanWord);
  const gameStarted = useGameStore((s) => s.gameStarted);

  // Show difficulty select if Hangman mode and no difficulty
  if (gameMode === "hangman" && !hangmanDifficulty && gameStarted) {
    return <HangmanDifficultySelect />;
  }

  // Show Hangman game if Hangman mode, difficulty, and word are set
  if (
    gameMode === "hangman" &&
    hangmanDifficulty &&
    hangmanWord &&
    gameStarted
  ) {
    return <HangmanGame />;
  }

  // Show Multiple Choice mode
  if (gameMode === "multi" && gameStarted) {
    return <MultipleChoice />;
  }

  // Show Open Answer mode
  if (gameMode === "open" && gameStarted) {
    return <OpenAnswer />;
  }

  // Default: show game mode selection and HUD
  return (
    <>
      {/* HUDWrapper is now rendered at the top level, so remove this duplicate */}
      <div className="atomology-scale-wrap flex-1 h-full flex place-content-center">
        <div className="flex-1 h-full w-full flex flex-col gap-y-10 justify-center items-center place-content-center place-items-center min-h-[calc(var(--vh,1vh)*100-var(--site-navbar-height)-var(--site-footer-height))]">
          <Home />
          <div className="static lg:absolute lg:bottom-20">
            <Score />
          </div>
        </div>
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      {/* Single source of truth for app background and base text color */}
      <div className="min-h-screen min-w-screen bg-content text-base-content">
        <HUDWrapper />
        <Layout>
          <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/" element={<MainGameContent />} />
          </Routes>
        </Layout>
      </div>
    </Router>
  );
}

export default App;
