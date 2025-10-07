import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import MvxApi from "../../helpers/MvxApi";
import { PageArea } from "./styled";

const FavPage = () => {
  const api = MvxApi();
  const navigate = useNavigate();

  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadFavorites = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.getFavorites();
      console.log("📦 API Favorites Response:", res);

      const list = res?.favorites || res || [];

      const normalized = list
        .filter(Boolean)
        .map((item) => {
          const id = item.id || item._id;
          const title = item.title || "Sem título";
          const price = item.price ?? 0;

          // 🖼️ Lógica de imagem 100% compatível com o backend
          let image = "/img/no-image.png";

          if (item.images?.length > 0) {
            const imgObj = item.images[0];
            if (imgObj?.url) {
              const imgUrl = imgObj.url.trim();

              // Monta o caminho completo se necessário
              if (!imgUrl.startsWith("http") && !imgUrl.startsWith("/")) {
                image = `${api.baseURL}/media/${imgUrl}`;
              } else {
                image = imgUrl;
              }
            }
          }

          return { id, title, price, image };
        });

      setFavorites(normalized);
    } catch (err) {
      console.error("❌ Erro ao carregar favoritos:", err);
      setFavorites([]);
    } finally {
      setLoading(false);
    }
  }, [api]);

  useEffect(() => {
    loadFavorites();

    const onStorage = (e) => {
      if (e.key === "favUpdatedAt") loadFavorites();
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener("focus", loadFavorites);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("focus", loadFavorites);
    };
  }, [loadFavorites]);

  const formatPrice = (price) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price || 0);

  const handleRemoveFavorite = async (id) => {
    try {
      await api.toggleFavorite(id);
      setFavorites((prev) => prev.filter((ad) => ad.id !== id));
      localStorage.setItem("favUpdatedAt", Date.now().toString());
    } catch (err) {
      console.error("❌ Erro ao remover favorito:", err);
      alert("Não foi possível remover dos favoritos.");
    }
  };

  const openAd = (id) => navigate(`/ad/${id}`);

  if (loading)
    return (
      <PageArea>
        <p>Carregando favoritos...</p>
      </PageArea>
    );

  if (!favorites.length)
    return (
      <PageArea>
        <p>Você ainda não possui anúncios favoritos.</p>
      </PageArea>
    );

  return (
    <PageArea>
      <h1>Meus Favoritos</h1>
      <div className="adsList">
        {favorites.map((ad) => (
          <div
            className="adItem"
            key={ad.id}
            onClick={() => openAd(ad.id)}
            style={{ cursor: "pointer" }}
          >
            <div className="adImg">
              <img
                src={ad.image}
                alt={ad.title}
                onError={(e) => {
                  e.target.onerror = null; // evita loop infinito
                  e.target.src = "/img/no-image.png";
                }}
              />
            </div>
            <div className="adContent">
              <h3>{ad.title}</h3>
              <p>{formatPrice(ad.price)}</p>
              <div className="adButtons">
                <button
                  className="remove"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFavorite(ad.id);
                  }}
                >
                  Remover dos Favoritos
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </PageArea>
  );
};

export default FavPage;
