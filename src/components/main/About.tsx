import { ReactElement } from "react";
import profile from "../../assets/profile.jpg";

const About = (): ReactElement => (
  <div className="text-left text-lg mt-4 p-5 border-4 border-ldfBlue flex md:flex-row flex-col items-center gap-8">
    <img src={profile} />
    <div>
      <p>
        Todo mundo tem um filme que marcou sua vida, um disco cujas músicas
        viraram hinos e trilha sonora para as mais diferentes situações e
        emoções, e um livro que parece ter sido escrito sob medida para causar
        um impacto dentro da alma. O que nossas obras de arte favoritas são
        capazes de dizer sobre nossa personalidade?
      </p>
      <br />
      <p>
        Em 1 Livro, 1 Disco, 1 Filme a conversa gira em torno desse ponto de
        partida. É um talk show em que o entrevistado revela seu filme, disco e
        livro favorito e como tais preferências são reflexos de sua formação
        pessoal, carreira e visão de mundo.
      </p>
      <br />
      <p>Episódios toda segunda-feira.</p>
    </div>
  </div>
);

export default About;
