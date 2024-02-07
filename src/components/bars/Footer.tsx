import { ReactElement } from "react";

const Footer = (): ReactElement => {
  return (
    <div className="w-full flex flex-row bg-black text-slate-400 gap-4 items-center p-2 text-sm text-center justify-center md:gap-8 h-10 bottom-0">
      This will be the footer
    </div>
  );
};

export default Footer;
