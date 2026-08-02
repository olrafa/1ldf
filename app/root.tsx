import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "react-router";
import type { Route } from "./+types/root";
import "./index.css";
import Header from "./components/bars/Header";
import Footer from "./components/bars/Footer";
import NavigationProgress from "./components/loader/NavigationProgress";
import NotFound from "./components/notFound/NotFound";
import { buildMeta, SITE_URL } from "./lib/meta";

export const links: Route.LinksFunction = () => [
  { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
  { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
  { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
  { rel: "manifest", href: "/site.webmanifest" },
];

export const meta: Route.MetaFunction = () => buildMeta({});

export function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const canonicalUrl = `${SITE_URL}${pathname}`;

  return (
    <html lang="pt-BR">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:url" content={canonicalUrl} />
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
      <Link to="/" className="content-box-small bg-slate-50 p-2">
        Voltar à página inicial
      </Link>
    </div>
  );
}
