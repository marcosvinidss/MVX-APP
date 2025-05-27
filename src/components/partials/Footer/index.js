import React from "react";
import { FooterArea } from "./styled";

const Footer = () => {
  return (
    <FooterArea>
      <div className="container">
        <div className="logo">MVX</div>
        <div className="links">
          <a href="/">Sobre nós</a>
          <a href="/">Ajuda</a>
          <a href="/">Termos de Uso</a>
          <a href="/">Privacidade</a>
        </div>
        <div className="copyright">
          © {new Date().getFullYear()} MVX - Todos os direitos reservados
        </div>
      </div>
    </FooterArea>
  );
};

export default Footer;
