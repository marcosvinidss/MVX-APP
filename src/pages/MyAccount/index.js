import React, { useEffect, useState } from "react";
import useApi from "../../helpers/MvxApi";
import { PageArea } from "./styled";

const MinhaConta = () => {
  const api = useApi();

  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [stateId, setStateId] = useState(""); // armazena sempre o _id do estado
  const [statesList, setStatesList] = useState([]);
  const [pixKey, setPixKey] = useState(""); // 🔹 novo campo
  const [message, setMessage] = useState("");

  useEffect(() => {
    const load = async () => {
      setLoading(true);

      const [user, states] = await Promise.all([
        api.getUserInfo(),
        api.getStates()
      ]);

      setStatesList(states || []);

      if (user) {
        setName(user.name || "");
        setEmail(user.email || "");
        setPixKey(user.pixKey || "");

        // Tentativas para preencher o select de estado corretamente:
        // 1) Se backend já enviar stateId, usa direto
        if (user.stateId) {
          setStateId(user.stateId);
        } else if (user.state) {
          // 2) Se vier apenas o NOME do estado (como seu controller original fazia),
          // tenta encontrar o _id correspondente na lista
          const found = (states || []).find(s => {
            // compara nome normalizado para evitar diferenças de caixa/acentos simples
            const a = String(s.name || "").trim().toLowerCase();
            const b = String(user.state || "").trim().toLowerCase();
            return a === b;
          });
          if (found) setStateId(found._id);
        }
      }

      setLoading(false);
    };

    load();
  }, [api]);

  const handleSave = async () => {
    setMessage("");

    const payload = {
      name,
      email,
      state: stateId, // backend espera o _id aqui
      pixKey: pixKey // 🔹 salva/atualiza a chave PIX
    };

    const json = await api.updateUser(payload);

    if (json?.error) {
      // quando o validator retorna objeto mapeado
      if (typeof json.error === "object") {
        const firstKey = Object.keys(json.error)[0];
        const firstErr = json.error[firstKey]?.msg || "Erro ao atualizar.";
        setMessage(firstErr);
        return;
      }
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
              <select
                value={stateId}
                onChange={(e) => setStateId(e.target.value)}
              >
                <option value="">Selecione um estado</option>
                {statesList.map((s) => (
                  <option key={s._id} value={s._id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </label>

            {/* 🔹 Campo de Chave PIX */}
            <label>
              <strong>Chave PIX do vendedor:</strong>
              <input
                type="text"
                placeholder="CPF/CNPJ, e-mail, telefone ou chave aleatória"
                value={pixKey}
                onChange={(e) => setPixKey(e.target.value)}
              />
              <small style={{ color: "#666" }}>
                Esta chave será usada no pagamento seguro via PIX.
              </small>
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
