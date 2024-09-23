import "./App.css";
import Layout from "./components/Layout";
import GameMode from "./components/GameMode";
import Element from "./components/Element";
import Score from "./components/Score";
import Answer from "./components/Answer";
import About from "./components/About";
import Faq from "./components/Faq";

// react-router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="h-screen flex flex-col bg-neutral">
        <Layout />
        <div className="max-w-[33%] flex flex-col place-self-center m-auto">
          <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/faq" element={<Faq />} />
            <Route
              path="/"
              element={
                <>
                  <GameMode />
                  <Element />
                  <div>
                    <Answer />
                  </div>
                  <Score />
                </>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
