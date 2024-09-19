import "./App.css";
import Layout from "./components/Layout";
import GameMode from "./components/GameMode";
import Element from "./components/Element";
import Score from "./components/Score";
import Answer from "./components/Answer";

function App() {
  return (
    <div className="h-screen flex flex-col bg-neutral">
      <Layout />
      <GameMode />
      <Element />
      <Answer />
      <Score />
    </div>
  );
}

export default App;
