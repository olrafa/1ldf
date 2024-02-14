import { ReactElement } from "react";

const Sobre = (): ReactElement => (
  <div className="flex flex-col items-center gap-5 p-6 text-center justify-center text-xl">
    <div className="font-titles text-6xl">Sobre este site</div>
    <div className="md:w-3/5 whitespace-pre-line text-left text-base">
      <p>
        Este é um site de código aberto, que usa a licença MIT. Você pode
        consultar e colaborar com o site via GitHub.
      </p>
      <p>
        Não utilizamos cookies, e não coletamos dados sobre os usuários.
        Buscamos evitar trackers nos links que damos para livros, discos e
        filmes, mas de vez em quando é possível falhar.
      </p>
      <p>
        Os episódios do podcast estão disponíveis no site por via dos vídeos
        incorporados à página. É provável que o YouTube colete alguns dados
        quando você utiliza o serviço.
      </p>
    </div>
  </div>
);

export default Sobre;
