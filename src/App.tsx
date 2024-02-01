import { Route, Routes } from "react-router-dom";
import Main from "./components/main";
import Episode from "./components/episode";
import Header from "./components/header";
import EpisodeList from "./components/list/EpisodeList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <div className="mt-10"></div>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/episodios" element={<EpisodeList />} />
        <Route path="/episodios/:id" element={<Episode />} />
      </Routes>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
