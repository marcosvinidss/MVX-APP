import React, { useEffect, useState } from "react";
import MvxApi from "../../helpers/MvxApi";
import { PageArea } from "./styled";

const MyAds = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyAds = async () => {
      const api = MvxApi();
      try {
        const myAds = await api.getMyAds(); // token já é tratado no helper
        setAds(myAds || []);
      } catch (error) {
        console.error("Erro ao buscar anúncios:", error);
        setAds([]);
      } finally {
        setLoading(false);
      }
    };
    fetchMyAds();
  }, []);

  const formatPrice = (price) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(price || 0);

  const handleEdit = (id) => {
    window.location.href = `/post-an-ad?id=${id}`;
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este anúncio?")) return;

    const api = MvxApi();
    try {
      await api.deleteAd(id);
      setAds((prev) => prev.filter((ad) => ad.id !== id));
    } catch (error) {
      console.error("Erro ao excluir anúncio:", error);
      alert("Não foi possível excluir o anúncio.");
    }
  };

  if (loading)
    return (
      <PageArea>
        <p>Carregando anúncios...</p>
      </PageArea>
    );

  if (!ads || ads.length === 0)
    return (
      <PageArea>
        <p>Você ainda não possui anúncios.</p>
      </PageArea>
    );

  return (
    <PageArea>
      <h1>Meus Anúncios</h1>
      <div className="adsList">
        {ads.map((ad) => (
          <div className="adItem" key={ad.id}>
            <div className="adImg">
              <img src={ad.image || "/img/no-image.png"} alt={ad.title || "Anúncio"} />
            </div>
            <div className="adContent">
              <h3>{ad.title || "Sem título"}</h3>
              <p>{formatPrice(ad.price)}</p>
              <div className="adButtons">
                <button className="edit" onClick={() => handleEdit(ad.id)}>Editar</button>
                <button className="delete" onClick={() => handleDelete(ad.id)}>Excluir</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </PageArea>
  );
};

export default MyAds;
