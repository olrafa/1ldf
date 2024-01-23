import { Route, Routes } from "react-router-dom";
import Main from "./components/main";
import Episode from "./components/episode";
import Header from "./components/header";

function App() {
  return (
    <div>
      <Header />
      <div className="mt-10"></div>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/episodios/:id" element={<Episode />} />
      </Routes>
    </div>
  );
}

export default App;
