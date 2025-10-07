import React, { useState, useEffect } from "react";
import { HeaderArea, SideMenu, Overlay } from "./styled";
import { Link, useNavigate } from "react-router-dom";
import { isLogged, doLogout } from "../../../helpers/AuthHandler";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const logged = isLogged();
  const navigate = useNavigate();

  const handleLogout = () => {
    doLogout();
    window.location.href = "/";
  };

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const handleCreateAd = () => {
    if (logged) {
      navigate("/post-an-ad");
    } else {
      navigate("/signin");
    }
  };

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && menuOpen) setMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  return (
    <>
      <HeaderArea>
        <div className="container">
          <div className="logo">
            <Link to="/">
              <img src="/img/MVX.png" alt="MVX Logo" />
            </Link>
          </div>

          <div className="actions">
            {logged ? (
              <>
                <button className="menuButton" onClick={toggleMenu}>
                  {menuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>

                <button className="createAdButton" onClick={handleCreateAd}>
                  + Criar Anúncio
                </button>
              </>
            ) : (
              <>
                <div className="authButtons">
                  <Link to="/signin" className="loginBtn">
                    Entrar
                  </Link>
                  <Link to="/signup" className="signupBtn">
                    Cadastrar
                  </Link>
                </div>

                <button className="createAdButton" onClick={handleCreateAd}>
                  + Criar Anúncio
                </button>
              </>
            )}
          </div>

        </div>
      </HeaderArea>

      {menuOpen && <Overlay onClick={toggleMenu} />}

      <SideMenu open={menuOpen}>
        <ul>
          <li>
            <Link to="/my-ads" onClick={toggleMenu}>
              Meus Anúncios
            </Link>
          </li>
          <li>
            <Link to="/favorites" onClick={toggleMenu}>
              Anúncios Favoritos
            </Link>
          </li>
          <li>
            <Link to="/my-account" onClick={toggleMenu}>
              Minha Conta
            </Link>
          </li>
          <li>
            <button onClick={handleLogout}>Sair</button>
          </li>
        </ul>
      </SideMenu>
    </>
  );
};

export default Header;
