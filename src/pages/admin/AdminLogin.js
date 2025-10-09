import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/admin/signin", {
        email,
        password,
      });

      if (response.data.token) {
        localStorage.setItem(
          "adminData",
          JSON.stringify({
            token: response.data.token,
            isAdmin: true,
          })
        );
        navigate("/admin/dashboard");
      } else {
        setError("Credenciais inválidas ou sem permissão de administrador.");
      }
    } catch (err) {
      setError("Erro ao fazer login como administrador.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login Administrativo</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="E-mail do administrador"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Entrar</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default AdminLogin;
