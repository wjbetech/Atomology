import "./App.css";
import Layout from "./components/Layout";
import GameMode from "./components/GameMode";
import Element from "./components/Element";
import Score from "./components/Score";
import Answer from "./components/Answer";
import About from "./components/About";
import Faq from "./components/Faq";
import Footer from "./components/Footer";

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
                <div className="flex flex-col gap-y-10">
                  <GameMode />
                  <Element />
                  <div>
                    <Answer />
                  </div>
                  <Score />
                </div>
              }
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
