import React, { useState, useEffect, useRef } from "react";
import { PageArea } from "./styled";
import useApi from "../../helpers/MvxApi";
import {
  PageContainer,
  PageTitle,
  ErrorMessage,
} from "../../components/MainComponents";
import MaskedInput from "react-text-mask";
import { createNumberMask } from "text-mask-addons";
import { useLocation, useNavigate } from "react-router-dom";

const AddAd = () => {
  const api = useApi();
  const fileField = useRef();
  const navigate = useNavigate();
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const adId = query.get("id");

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [priceNegotiable, setPriceNegotiable] = useState(false);
  const [desc, setDesc] = useState("");
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [disable, setDisable] = useState(false);
  const [error, setError] = useState("");

  const priceMask = createNumberMask({
    prefix: "R$ ",
    includeThousandsSeparator: true,
    thousandsSeparatorSymbol: ".",
    allowDecimal: true,
    decimalSymbol: ",",
  });

  useEffect(() => {
    const loadCategories = async () => {
      const cats = await api.getCategories();
      setCategories(cats);
    };
    loadCategories();
  }, [api]);

  useEffect(() => {
    if (!adId) return;

    const loadAd = async () => {
      setDisable(true);
      const json = await api.getAd(adId);
      if (!json || json.error) {
        setError("Erro ao carregar anúncio.");
        setDisable(false);
        return;
      }

      setTitle(json.title || "");
      setPrice(
        json.price ? `R$ ${json.price.toFixed(2).replace(".", ",")}` : ""
      );
      setPriceNegotiable(json.priceNegotiable || false);
      setDesc(json.description || "");
      setCategory(json.category?._id || "");
      setExistingImages(json.images || []);
      setDisable(false);
    };

    loadAd();
  }, [adId, api]);

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleDeleteExistingImage = (url) => {
    setExistingImages(existingImages.filter((img) => img !== url));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisable(true);
    setError("");

    if (!title.trim()) {
      setError("Título é obrigatório.");
      setDisable(false);
      return;
    }

    if (!category) {
      setError("Selecione uma categoria.");
      setDisable(false);
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("priceneg", priceNegotiable);
    formData.append("desc", desc);
    formData.append("cat", category);
    formData.append("images", JSON.stringify(existingImages));
    images.forEach((file) => formData.append("img", file));

    const json = adId
      ? await api.editAd(adId, formData)
      : await api.addAd(formData);

    if (json.error) {
      setError(json.error);
    } else {
      navigate(`/ad/${json.id || adId}`);
    }

    setDisable(false);
  };

  return (
    <PageContainer>
      <PageArea>
        <form onSubmit={handleSubmit}>
          <div className="form-title">
            {adId ? "EDITAR ANÚNCIO" : "POSTAR ANÚNCIO"}
          </div>

          <label className="area">
            <div className="area--title">Título</div>
            <div className="area--input">
              <input
                type="text"
                disabled={disable}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
          </label>

          <label className="area">
            <div className="area--title">Categoria</div>
            <div className="area--input">
              <select
                disabled={disable}
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                required
              >
                <option value="">Selecione a categoria</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </label>

          <label className="area">
            <div className="area--title">Preço</div>
            <div className="area--input">
              <MaskedInput
                className="price-input"
                mask={priceMask}
                placeholder="R$ 0,00"
                disabled={disable}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </label>

          <label className="area checkbox-area">
            <div className="area--title">Preço Negociável</div>
            <div className="area--input">
              <input
                type="checkbox"
                disabled={disable}
                checked={priceNegotiable}
                onChange={() => setPriceNegotiable(!priceNegotiable)}
              />
            </div>
          </label>

          <label className="area">
            <div className="area--title">Descrição</div>
            <div className="area--input">
              <textarea
                disabled={disable}
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              ></textarea>
            </div>
          </label>

          <label className="area">
            <div className="area--title">Imagens Existentes</div>
            <div className="area--input existing-images">
              {existingImages.map((img, index) => (
                <div key={index} className="image-item">
                  <img src={img} alt="Anúncio" />
                  <button
                    type="button"
                    onClick={() => handleDeleteExistingImage(img)}
                  >
                    Remover
                  </button>
                </div>
              ))}
            </div>
          </label>

          <label className="area">
            <div className="area--title">Adicionar novas imagens</div>
            <div className="area--input">
              <input
                type="file"
                disabled={disable}
                multiple
                ref={fileField}
                onChange={handleImageChange}
                accept="image/*"
              />
            </div>
          </label>

          <label className="area">
            <div className="area--title" />
            <div className="area--input">
              <button disabled={disable}>
                {adId ? "Salvar Alterações" : "Postar Anúncio"}
              </button>
            </div>
          </label>
        </form>

        {error && <ErrorMessage>{error}</ErrorMessage>}
      </PageArea>
    </PageContainer>
  );
};

export default AddAd;
