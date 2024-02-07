import { Route, Routes } from "react-router-dom";
import Main from "./components/main";
import Episode from "./components/episode";
import Header from "./components/header";
import EpisodeList from "./components/list/EpisodeList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import NotFound from "./components/notFound";
import Team from "./components/team";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/episodios" element={<EpisodeList />} />
        <Route path="/episodios/:id" element={<Episode />} />
        <Route path="/equipe" element={<Team />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
