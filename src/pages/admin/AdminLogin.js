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

const API =
  (import.meta && import.meta.env && import.meta.env.VITE_API_URL) ||
  process.env.REACT_APP_API_URL ||
  "http://localhost:5000";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const safeParse = async (res) => {
    const ct = res.headers.get("content-type") || "";
    if (ct.includes("application/json")) return await res.json();
    const text = await res.text();
    return { msg: text || "Resposta não JSON" };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setError("");
    setLoading(true);
    try {
      const controller = new AbortController();
      const t = setTimeout(() => controller.abort(), 15000);
      const res = await fetch(`${API}/admin/login`, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        signal: controller.signal
      });
      clearTimeout(t);
      const json = await safeParse(res);
      if (res.ok && json.token) {
        localStorage.setItem("adminToken", json.token);
        if (json.admin) localStorage.setItem("adminData", JSON.stringify(json.admin));
        navigate("/admin", { replace: true });
        return;
      }
      const msg = json?.msg || json?.error || `Falha no login (${res.status})`;
      setError(typeof msg === "string" ? msg : "E-mail ou senha incorretos.");
    } catch (err) {
      setError(err?.name === "AbortError" ? "Tempo de conexão esgotado." : "Erro ao conectar com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLoginContainer>
      <LoginBox>
        <LogoArea>
          <img src="/img/MVX.png" alt="MVX Logo" />
        </LogoArea>
        <LoginTitle>Área Administrativa</LoginTitle>
        <form onSubmit={handleSubmit} noValidate>
          <LoginInput
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
          <LoginInput
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
          {error && <ErrorMsg>{error}</ErrorMsg>}
          <LoginButton type="submit" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </LoginButton>
        </form>
        <FooterNote>
          <a href="/">Voltar ao site</a>
        </FooterNote>
      </LoginBox>
    </AdminLoginContainer>
  );
};

export default AdminLogin;
