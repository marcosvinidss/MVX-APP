import React, { useState, useEffect } from "react";
import { PageArea } from './styled';
import useApi from '../../helpers/MvxApi';
import { PageContainer, PageTitle, ErrorMessage } from '../../components/MainComponents';
import { doLogin } from "../../helpers/AuthHandler";

const Page = () => {
  const api = useApi();

  const [name, setName] = useState('');
  const [stateLoc, setStateLoc] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [disable, setDisable] = useState(false);
  const [error, setError] = useState('');
  const [stateList, setStateList] = useState([]);


  useEffect(()=>{
      const getStates = async () =>{
          const slist = await api.getStates();
          setStateList(slist);
      }
      getStates();
  },[])


  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisable(true);
    setError('');

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      setDisable(false);
      return;
    }

    const json = await api.register(name, email, password, stateLoc);

    if (json.error) {
      setError(json.error);
    } else {
      doLogin(json.token);
      window.location.href = '/';
    }

    setDisable(false);
  };

  return (
    <PageContainer>
      <PageArea>
        <form onSubmit={handleSubmit}>
          <div className="form-title">CADASTRO</div>

          <label className="area">
            <div className="area--title">Nome</div>
            <div className="area--input">
              <input
                type="text"
                disabled={disable}
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>
          </label>

          <label className="area">
            <div className="area--title">Estado (UF)</div>
            <div className="area--input">
              <select
                disabled={disable}
                value={stateLoc}
                onChange={e => setStateLoc(e.target.value)}
                required
              >
                <option value="">Selecione um estado</option>
                {stateList.map((state) => (
                  <option key={state._id} value={state._id}>{state.name}</option>
                ))}
              </select>
            </div>
          </label>


          <label className="area">
            <div className="area--title">E-mail</div>
            <div className="area--input">
              <input
                type="email"
                disabled={disable}
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
          </label>

          <label className="area">
            <div className="area--title">Senha</div>
            <div className="area--input">
              <input
                type="password"
                disabled={disable}
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
          </label>

          <label className="area">
            <div className="area--title">Confirmar Senha</div>
            <div className="area--input">
              <input
                type="password"
                disabled={disable}
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </label>

          <label className="area">
            <div className="area--title"></div>
            <div className="area--input">
              <button disabled={disable}>Cadastrar</button>
            </div>
          </label>

          <div className="signup-link">
            Já tem uma conta? <a href="/signin">Faça login aqui</a>
          </div>
        </form>

        {error && <ErrorMessage>{error}</ErrorMessage>}
      </PageArea>
    </PageContainer>
  );
};

export default Page;
