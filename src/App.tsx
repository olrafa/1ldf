import { Route, Routes } from "react-router-dom";
import Main from "./components/main";
import Episode from "./components/episode";
import Header from "./components/bars/Header";
import EpisodeList from "./components/list/EpisodeList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import NotFound from "./components/notFound";
import Team from "./components/team";
import Experience from "./components/experience";
import Article from "./components/article";
import ArticleList from "./components/list/ArticleList";
import Footer from "./components/bars/Footer";
import { HelmetProvider } from "react-helmet-async";
import { inject } from "@vercel/analytics";

inject();

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/episodios" element={<EpisodeList />} />
          <Route path="/episodios/:id" element={<Episode />} />
          <Route path="/equipe" element={<Team />} />
          <Route path="/experiencia" element={<Experience />} />
          <Route
            path="/maisumlivro"
            element={<ArticleList category="book" />}
          />
          <Route path="/maisumlivro/:id" element={<Article type="book" />} />
          <Route
            path="/maisumdisco"
            element={<ArticleList category="record" />}
          />
          <Route path="/maisumdisco/:id" element={<Article type="record" />} />
          <Route
            path="/maisumfilme"
            element={<ArticleList category="film" />}
          />
          <Route path="/maisumfilme/:id" element={<Article type="film" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </HelmetProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
