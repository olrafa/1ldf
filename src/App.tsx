import "./App.css";
import { Route, Routes } from "react-router-dom";
import Main from "./components/main";
import Episode from "./components/episode";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/episodios/:id" element={<Episode />} />
    </Routes>
  );
}

export default App;
