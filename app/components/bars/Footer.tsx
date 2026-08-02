import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactElement } from "react";

const Footer = (): ReactElement => {
  return (
    <>
      <div className="md:mt-4"></div>
      <div className="w-full flex flex-row bg-slate-900 text-slate-400 items-center p-2 text-sm text-center justify-center md:gap-8 bottom-0 absolute">
        <p>
          ©2024 1LDF. Todos os direitos reservados. Não utilizamos cookies, e
          coletamos apenas dados anônimos de contagem de usuários.{" "}
          <span className="mr-2">Este é um site de código aberto.</span>
          <a
            href="https://github.com/olrafa/1ldf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-100"
          >
            <FontAwesomeIcon icon={faGithub} />
          </a>
        </p>
      </div>
    </>
  );
};

export default Footer;
