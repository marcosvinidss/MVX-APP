import styled from "styled-components";

export const HeaderArea = styled.div`
  font-family: "Open Sans", sans-serif;
  background-color: #fff;
  height: 60px;
  border-bottom: 1px solid #ccc;
  z-index: 20;
  position: relative;

  .container {
    max-width: 1000px;
    margin: auto;
    height: 100%;
    padding: 0 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .logo img {
    height: 40px;
    width: auto;
  }

  .actions {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  /* Botão Criar Anúncio */
  .createAdButton {
    background-color: #302e2e;
    color: #fff;
    font-weight: 500;
    font-size: 15px;
    padding: 10px 20px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
    min-width: 140px;

    &:hover {
      background-color: #504d4d;
      transform: translateY(-1px);
      box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    }

    &:active {
      transform: translateY(0);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
  }

  /* Container para os botões de Login / Cadastrar */
  .authButtons {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  /* Regras base para os botões de autenticação */
  .authButtons a,
  .authButtons .loginBtn,
  .authButtons .signupBtn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    border-radius: 8px;
    padding: 8px 12px;
    font-size: 14px;
    font-weight: 400;
    cursor: pointer;
    transition: all 0.18s ease;
    line-height: 1;
  }

  /* Botão de Entrar (contorno simples) */
  .authButtons .loginBtn {
    background: transparent;
    color: #302e2e;
    border: 1px solid #ccc;

    &:hover {
      background: #f3f3f3;
      border-color: #bfbfbf;
    }
  }

  /* Botão de Cadastrar — destaque leve com gradiente */
  .authButtons .signupBtn {
    background: linear-gradient(135deg, #3d3a3a 0%, #5a5757 100%);
    color: #fff;
    border: none;
    font-weight: 500;
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.15);

    &:hover {
      background: linear-gradient(135deg, #524f4f 0%, #6c6a6a 100%);
      transform: translateY(-1px);
      box-shadow: 0 5px 10px rgba(0, 0, 0, 0.25);
    }

    &:active {
      transform: translateY(0);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
  }

  /* Ícone do menu hambúrguer */
  .menuButton {
    background: none;
    border: none;
    cursor: pointer;
    padding: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.15s ease;

    svg {
      color: #302e2e;
    }

    &:hover {
      transform: scale(1.08);
    }
  }

  /* Responsividade */
  @media (max-width: 480px) {
    .createAdButton {
      padding: 7px 10px;
      font-size: 13px;
      min-width: auto;
    }
    .authButtons a,
    .authButtons .loginBtn,
    .authButtons .signupBtn {
      padding: 7px 8px;
      font-size: 13px;
    }
    .actions {
      gap: 8px;
    }
  }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 9;
`;

export const SideMenu = styled.div`
  position: fixed;
  top: 0;
  right: ${(props) => (props.open ? "0" : "-260px")};
  width: 260px;
  height: 100%;
  background-color: #fff;
  box-shadow: -2px 0 6px rgba(0, 0, 0, 0.2);
  padding-top: 80px;
  transition: right 0.3s ease;
  z-index: 10;

  ul {
    list-style: none;
    padding: 0 20px;
    margin: 0;
  }

  li {
    margin-bottom: 20px;
  }

  a,
  button {
    display: block;
    text-decoration: none;
    color: #333;
    font-size: 18px;
    font-weight: 500;
    background: none;
    border: none;
    cursor: pointer;
    width: 100%;
    text-align: left;
    transition: color 0.2s ease;
  }

  a:hover,
  button:hover {
    color: #007bff;
  }
`;
