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
              <div className="flex flex-col gap-y-10 justify-center items-center">
                <GameMode />
                <div className="flex flex-col gap-y-10">
                  <Element />
                  <Answer />
                </div>
                {/* spacing needs fixing */}
                <div className="absolute bottom-20">
                  <Score />
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
