// components
import React, { Suspense } from "react";
import Layout from "./components/layout/Layout";
import HUDWrapper from "./components/sub-components/HUDWrapper";
import ErrorBoundary from "./components/ErrorBoundary";
import ResumeToPlay from "./components/ResumeToPlay";
import HomePage from "./components/pages/HomePage";
import InstructionsPage from "./components/pages/InstructionsPage";
import ConfigurePage from "./components/pages/ConfigurePage";
import PlayPage from "./components/pages/PlayPage";
import ResultsPage from "./components/pages/ResultsPage";
import NotFoundPage from "./components/pages/NotFoundPage";

// Static content pages load on demand
const About = React.lazy(() => import("./components/pages/About"));
const Faq = React.lazy(() => import("./components/pages/Faq"));
const Contact = React.lazy(() => import("./components/pages/Contact"));

// react-router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      {/* Crash guard: fallback uses navigation, so it must live inside Router */}
      <ErrorBoundary>
        {/* Single source of truth for app background and base text color */}
        <div className="min-h-screen min-w-screen bg-void text-specimen transition-colors">
          <HUDWrapper />
          <Layout>
            <ResumeToPlay />
            <Suspense fallback={null}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/instructions" element={<InstructionsPage />} />
                <Route path="/configure" element={<ConfigurePage />} />
                <Route path="/play" element={<PlayPage />} />
                <Route path="/results" element={<ResultsPage />} />
                <Route path="/about" element={<About />} />
                <Route path="/faq" element={<Faq />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </Layout>
        </div>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
