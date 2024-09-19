import "./App.css";
import Layout from "./components/Layout";
import GameMode from "./components/GameMode";
import Element from "./components/Element";
import Score from "./components/Score";

function App() {
  return (
    <div className="h-screen flex flex-col">
      <Layout />
      <GameMode />
      <Element />
      <Score />
    </div>
  );
}

export default App;
