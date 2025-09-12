import React, { useEffect, useState } from "react";
import useApi from "../../helpers/MvxApi";
import { PageArea } from "./styled";
import Cookies from "js-cookie";

const MinhaConta = () => {
  const api = useApi();

  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState("");
  const [statesList, setStatesList] = useState([]);
  const [message, setMessage] = useState("");

  // carregar dados do usuário + estados
  useEffect(() => {
    const getUserInfo = async () => {
      setLoading(true);

      const user = await api.getUserInfo();
      const states = await api.getStates();

      if (user) {
        setName(user.name || "");
        setEmail(user.email || "");
        setState(user.state || ""); // aqui usamos o ID do estado
      }
      setStatesList(states);

      setLoading(false);
    };

    getUserInfo();
  }, []);

  // salvar alterações
  const handleSave = async () => {
    setMessage("");

    const token = Cookies.get("token");

    const json = await api.updateUser({
      name,
      email,
      state,
      token, // necessário para o backend
    });

    if (json.error) {
      setMessage(json.error);
    } else {
      setMessage("Dados atualizados com sucesso!");
    }
  };

  return (
    <PageArea>
      <h1>Minha Conta</h1>

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <>
          <div className="user-info">
            <label>
              <strong>Nome:</strong>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>

            <label>
              <strong>Email:</strong>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <label>
              <strong>Estado:</strong>
              <select value={state} onChange={(e) => setState(e.target.value)}>
                <option value="">Selecione um estado</option>
                {statesList.map((s, index) => (
                  <option key={index} value={s._id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {message && <div className="feedback">{message}</div>}

          <button className="edit-button" onClick={handleSave}>
            Salvar Alterações
          </button>
        </>
      )}
    </PageArea>
  );
};

export default MinhaConta;
