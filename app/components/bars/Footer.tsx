import { ReactElement } from "react";

const Footer = (): ReactElement => {
  return (
    <>
      <div className="md:mt-4"></div>
      <div className="w-full flex flex-row bg-slate-900 text-slate-400 items-center p-3 text-sm text-center justify-center bottom-0 absolute">
        <p>
          ©{new Date().getFullYear()} 1LDF. Todos os direitos reservados. Não
          utilizamos cookies nem coletamos dados pessoais.
        </p>
      </div>
    </>
  );
};

export default Footer;
