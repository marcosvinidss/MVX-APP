import React, { useEffect, useState } from "react";
import { PageContainer, PageBody } from "../../components/MainComponents"; // use PageBody
import useApi from "../../helpers/MvxApi";
import AdItem from "../../components/partials/AdItem";

const MyAds = () => {
  const api = useApi();
  const [adList, setAdList] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadUserAds = async () => {
    setLoading(true);
    const json = await api.getUserAds();
    if (json && json.ads) setAdList(json.ads);
    else setAdList([]);
    setLoading(false);
  };

  useEffect(() => {
    loadUserAds();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este anúncio?")) {
      const json = await api.deleteAd(id);
      if (!json.error) {
        alert("Anúncio excluído com sucesso!");
        loadUserAds();
      } else {
        alert("Erro ao excluir anúncio: " + json.error);
      }
    }
  };

  const handleEdit = (id) => {
    window.location.href = `/post-an-ad?id=${id}`;
  };

  return (
    <PageContainer>
      <PageBody>
        <h2>Meus Anúncios</h2>

        {loading && <p>Carregando anúncios...</p>}
        {!loading && adList.length === 0 && (
          <p>Você ainda não publicou nenhum anúncio.</p>
        )}

        <div className="adsList">
          {adList.map((ad) => (
            <div key={ad.id} className="adItem">
              <AdItem data={ad} />
              <div className="adButtons">
                <button className="edit" onClick={() => handleEdit(ad.id)}>
                  Editar
                </button>
                <button className="delete" onClick={() => handleDelete(ad.id)}>
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      </PageBody>
    </PageContainer>
  );
};

export default MyAds;
