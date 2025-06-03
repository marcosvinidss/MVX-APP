import React, { useEffect, useState } from "react";
import useApi from "../../helpers/MvxApi";
import { PageArea } from "./styled";

const Page = () => {
  const api = useApi();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const getInfo = async () => {
      const json = await api.getUserInfo();
      if (json) {
        setUserInfo(json);
      }
    };
    getInfo();
  }, []);

  return (
    <PageArea>
      <h1>Minha Conta</h1>
      {userInfo ? (
        <div className="user-info">
          <p><strong>Nome:</strong> {userInfo.name}</p>
          <p><strong>Email:</strong> {userInfo.email}</p>
          <p><strong>Estado:</strong> {userInfo.state}</p>
        </div>
      ) : (
        <p>Carregando...</p>
      )}
    </PageArea>
  );
};

export default Page;
