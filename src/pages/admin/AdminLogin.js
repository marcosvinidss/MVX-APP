import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AdminLoginContainer,
  LoginBox,
  LoginTitle,
  LoginInput,
  LoginButton,
  ErrorMsg,
  FooterNote,
  LogoArea
} from "./styled";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:5000/admin/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const json = await res.json();

      // 🔍 verifica se a resposta tem token válido
      if (res.ok && json.token) {
        // salva o token e dados do admin
        localStorage.setItem("adminToken", json.token);
        localStorage.setItem("adminData", JSON.stringify(json.admin));

        // redireciona para o painel
        navigate("/admin");
      } else {
        // mostra erro retornado pelo backend (msg ou error)
        setError(json.msg || json.error || "E-mail ou senha incorretos.");
      }
    } catch (err) {
      console.error("Erro ao conectar com o servidor:", err);
      setError("Erro ao conectar com o servidor.");
    }
  };

  return (
    <AdminLoginContainer>
      <LoginBox>
        <LogoArea>
          <img src="/img/MVX.png" alt="MVX Logo" />
        </LogoArea>

        <LoginTitle>Área Administrativa</LoginTitle>

        <form onSubmit={handleSubmit}>
          <LoginInput
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <LoginInput
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <ErrorMsg>{error}</ErrorMsg>}

          <LoginButton type="submit">Entrar</LoginButton>
        </form>

        <FooterNote>
          <a href="/">Voltar ao site</a>
        </FooterNote>
      </LoginBox>
    </AdminLoginContainer>
  );
};

export default AdminLogin;
