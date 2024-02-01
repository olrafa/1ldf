import { ReactElement } from "react";

const NotFound = (): ReactElement => (
  <div className="flex flex-col items-center gap-5 p-6 text-center justify-center text-xl mb-4">
    <div className="font-titles text-6xl">Página não encontrada</div>
    <a href="/" className="content-box-small bg-slate-50 p-2">
      Voltar à página inicial
    </a>
  </div>
);

export default NotFound;
