import "./App.css";

// components
import Layout from "./components/layout/Layout";
import GameMode from "./components/GameMode";
import Element from "./components/sub-components/Element";
import Score from "./components/sub-components/Score";
import HUDWrapper from "./components/sub-components/HUDWrapper";
import Answer from "./components/Answer";
import About from "./components/pages/About";
import Faq from "./components/pages/Faq";
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

  return (
    <>
      <HUDWrapper />
      <div className="atomology-scale-wrap">
        <div className="flex flex-col gap-y-10 justify-center items-center">
          <GameMode />
          <div className="flex flex-col gap-y-10 mt-20 lg:mt-0">
            <Element />
            <Answer />
          </div>
          {/* spacing: keep score in normal flow on small screens to avoid overlap; absolute on large screens */}
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
      <Layout>
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/" element={<MainGameContent />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
