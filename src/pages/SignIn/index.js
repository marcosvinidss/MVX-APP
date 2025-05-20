import React, { useState } from "react";
import { PageArea } from './styled';
import useApi from '../../helpers/MvxApi';
import { PageContainer, PageTitle, ErrorMessage } from '../../components/MainComponents';
import { doLogin } from "../../helpers/AuthHandler";

const Page = () => {
  const api = useApi();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRememberPassword] = useState(false);
  const [disable, setDisable] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisable(true);
    setError('');

    const json = await api.login(email, password);

    if (json.error) {
      setError(json.error);
    } else {
      doLogin(json.token, remember);
      window.location.href = '/';
    }

    setDisable(false);
  };

  return (
    <PageContainer>
      <PageArea>
        
        <form onSubmit={handleSubmit}>
          <div className="form-title">LOGIN</div>

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

          <label className="area checkbox-area">
            <div className="area--title">Lembrar Senha?</div>
            <div className="area--input">
              <input
                type="checkbox"
                disabled={disable}
                checked={remember}
                onChange={() => setRememberPassword(!remember)}
              />
            </div>
          </label>

          <label className="area">
            <div className="area--title"></div>
            <div className="area--input">
              <button disabled={disable}>Fazer Login</button>
            </div>
          </label>
            <div className="signup-link">
                Ainda não tem uma conta?
                <a href="/signup">Cadastre-se aqui</a>
            </div>
        </form>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}l
      </PageArea>
    </PageContainer>
  );
};

export default Page;
