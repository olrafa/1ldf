import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import type { Route } from "./+types/root";
import "./index.css";
import Header from "./components/bars/Header";
import Footer from "./components/bars/Footer";
import NavigationProgress from "./components/loader/NavigationProgress";
import NotFound from "./components/notFound/NotFound";
import { buildJsonLd, buildMeta } from "./lib/meta";

export const links: Route.LinksFunction = () => [
  { rel: "icon", type: "image/jpg", href: "/profile.jpg" },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Passion+One:wght@400;700;900&display=swap",
  },
];

export const meta: Route.MetaFunction = () => [
  ...buildMeta({}),
  buildJsonLd({
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "1 Livro, 1 Disco, 1 Filme",
    url: "https://1livrodiscofilme.com.br",
  }),
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <Meta />
        <Links />
      </head>
      <body>
        <Header />
        <NavigationProgress />
        {children}
        <Footer />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  if (isRouteErrorResponse(error) && error.status === 404) {
    return <NotFound />;
  }

  if (import.meta.env.DEV) {
    console.error(error);
  }

  return (
    <div className="flex flex-col items-center gap-5 p-6 text-center justify-center text-xl mb-4">
      <div className="font-titles text-6xl">Algo deu errado</div>
      <a href="/" className="content-box-small bg-slate-50 p-2">
        Voltar à página inicial
      </a>
    </div>
  );
}
