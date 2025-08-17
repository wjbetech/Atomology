import "./App.css";

// components
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
      <Layout>
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<Faq />} />
          <Route
            path="/"
            element={
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
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
