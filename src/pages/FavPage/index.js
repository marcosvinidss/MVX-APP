import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import MvxApi from "../../helpers/MvxApi";
import { PageArea } from "./styled";

const FavPage = () => {
  const api = MvxApi();
  const navigate = useNavigate();

  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  // Resolve primeira imagem do anúncio cobrindo string/objeto e caminhos relativos
  const resolveImage = (images) => {
    if (!images || images.length === 0) return "/img/no-image.png";

    const first = images[0];

    // Caso seja string
    if (typeof first === "string") {
      const s = first.trim();
      if (!s) return "/img/no-image.png";
      // já é URL absoluta
      if (s.startsWith("http://") || s.startsWith("https://")) return s;
      // já vem com barra (ex: "/media/abc.jpg")
      if (s.startsWith("/")) return s;
      // só o nome do arquivo (ex: "abc.jpg") -> prefixa /media
      return `${api.baseURL}/media/${s}`;
    }

    // Caso seja objeto (ex.: { url: 'abc.jpg' } ou { path: '/media/abc.jpg' })
    if (first && typeof first === "object") {
      const candidate = (first.url || first.path || "").trim();
      if (!candidate) return "/img/no-image.png";
      if (candidate.startsWith("http://") || candidate.startsWith("https://")) return candidate;
      if (candidate.startsWith("/")) return candidate;
      return `${api.baseURL}/media/${candidate}`;
    }

    return "/img/no-image.png";
  };

  const loadFavorites = useCallback(async () => {
    setLoading(true);
    try {
      // helper já retorna array normalizado (ou converte {favorites} -> array)
      const list = await api.getFavorites();

      const normalized = (Array.isArray(list) ? list : [])
        .filter(Boolean)
        .map((item) => ({
          id: item.id || item._id,
          title: item.title || "Sem título",
          price: item.price ?? (item.priceNegotiable ? null : 0),
          priceNegotiable: !!item.priceNegotiable,
          image: resolveImage(item.images),
          category: item.category || item.categorySlug || null,
          stateName: item.stateName || null,
        }));

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

    // Atualiza lista quando outra aba/rota alterna o favorito
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

  const formatPrice = (price, negotiable) => {
    if (negotiable) return "Preço negociável";
    if (price == null) return "—";
    try {
      return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(price);
    } catch {
      return `R$ ${price}`;
    }
  };

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

  if (loading) {
    return (
      <PageArea>
        <p>Carregando favoritos...</p>
      </PageArea>
    );
  }

  if (!favorites.length) {
    return (
      <PageArea>
        <p>Você ainda não possui anúncios favoritos.</p>
      </PageArea>
    );
  }

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
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/img/no-image.png";
                }}
              />
            </div>
            <div className="adContent">
              <h3>{ad.title}</h3>
              <p>{formatPrice(ad.price, ad.priceNegotiable)}</p>
              <div style={{ fontSize: 12, color: "#777" }}>
                {ad.category ? `Categoria: ${ad.category}` : ""}
                {ad.stateName ? ` • ${ad.stateName}` : ""}
              </div>
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
