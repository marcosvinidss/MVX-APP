import React, { useEffect, useState, useRef } from "react";
import { PageArea, PageContainer, Fake, ReportModal } from "./styled";
import useApi from "../../helpers/MvxApi";
import { useParams } from "react-router-dom";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const Page = () => {
  const api = useApi();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [adInfo, setAdInfo] = useState({});
  const [isFavorite, setIsFavorite] = useState(false);

  // Modal de denúncia
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [reportDetails, setReportDetails] = useState("");

  const modalRef = useRef();

  useEffect(() => {
    const getAdInfo = async (id) => {
      const json = await api.getAd(id, true);
      setAdInfo(json);
      if (json.isFavorite) setIsFavorite(true);
      setLoading(false);
    };
    getAdInfo(id);
  }, [id]);

  const handleFavorite = async () => {
    try {
      await api.toggleFavorite(id);
      setIsFavorite(!isFavorite);
    } catch (err) {
      console.error("Erro ao favoritar:", err);
    }
  };

  const handleReportSubmit = async () => {
    if (!reportReason) {
      alert("Por favor, selecione um motivo antes de enviar.");
      return;
    }

    try {
      const res = await api.reportAd(id, reportReason, reportDetails);
      alert(res.message || "Denúncia enviada com sucesso!");
      setShowReportModal(false);
      setReportReason("");
      setReportDetails("");
    } catch (err) {
      console.error("Erro ao enviar denúncia:", err);
      alert("Erro ao enviar denúncia. Tente novamente.");
    }
  };

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setShowReportModal(false);
    }
  };

  useEffect(() => {
    if (showReportModal) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showReportModal]);

  const formatDate = (date) => {
    const cDate = new Date(date);
    const months = [
      "Janeiro", "Fevereiro", "Março", "Abril",
      "Maio", "Junho", "Julho", "Agosto",
      "Setembro", "Outubro", "Novembro", "Dezembro",
    ];
    return `${cDate.getDate()} de ${months[cDate.getMonth()]} de ${cDate.getFullYear()}`;
  };

  return (
    <PageContainer>
      <PageArea>
        {/* ---------- LADO ESQUERDO ---------- */}
        <div className="leftSide">
          <div className="box">
            <div className="adImage">
              {loading && <Fake height={300} />}
              {!loading && adInfo.images && adInfo.images.length > 0 && (
                <Slide easing="ease" indicators autoplay duration={3000}>
                  {adInfo.images.map((img, index) => (
                    <div key={index} className="each-slide">
                      <img src={img} alt={`slide-${index}`} />
                    </div>
                  ))}
                </Slide>
              )}
            </div>

            <div className="adInfo">
              <div className="adName">
                {loading && <Fake height={20} />}

                {adInfo.title && (
                  <div className="titleRow">
                    <h2>{adInfo.title}</h2>
                    <button
                      onClick={handleFavorite}
                      className="favoriteBtn"
                      title={
                        isFavorite
                          ? "Remover dos favoritos"
                          : "Adicionar aos favoritos"
                      }
                    >
                      {isFavorite ? "💛" : "🤍"}
                    </button>
                  </div>
                )}

                {adInfo.dateCreated && (
                  <small>Criado em {formatDate(adInfo.dateCreated)}</small>
                )}
              </div>

              <div className="adDescription">
                {loading && <Fake height={100} />}
                {adInfo.description && <p>{adInfo.description}</p>}
                {!loading && adInfo.views >= 0 && (
                  <p className="views">{adInfo.views} visualizações</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ---------- LADO DIREITO ---------- */}
        <div className="rightSide">
          {loading && <Fake height={100} />}
          {!loading && (
            <>
              <div className="priceBox">
                {adInfo.priceNegotiable ? (
                  <div className="negotiable">Preço Negociável</div>
                ) : (
                  <div className="price">R$ {adInfo.price}</div>
                )}
              </div>

              <div className="contactBox">
                {adInfo.userInfo && (
                  <>
                    <div className="createdBy">
                      Criado por:
                      <strong>{adInfo.userInfo.name}</strong>
                      <small>E-mail: {adInfo.userInfo.email}</small>
                    </div>

                    <a
                      href={`mailto:${adInfo.userInfo.email}?subject=Interesse no anúncio: ${encodeURIComponent(
                        adInfo.title
                      )}&body=Olá ${
                        adInfo.userInfo.name
                      }, tenho interesse no seu anúncio "${adInfo.title}". Podemos conversar?`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Falar com o vendedor
                    </a>

                    <button
                      className="reportButton"
                      onClick={() => setShowReportModal(true)}
                    >
                      🚨 Denunciar Usuário
                    </button>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </PageArea>

      {/* ---------- MODAL DE DENÚNCIA ---------- */}
      {showReportModal && (
        <ReportModal>
          <div className="modalOverlay" />
          <div className="modalContent scaleIn" ref={modalRef}>
            <h2>Denunciar Anúncio</h2>

            <label>Motivo:</label>
            <select
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
            >
              <option value="">Selecione...</option>
              <option value="Conteúdo inadequado">Conteúdo inadequado</option>
              <option value="Informações falsas">Informações falsas</option>
              <option value="Spam / engano">Spam / engano</option>
              <option value="Outro">Outro</option>
            </select>

            <label>Detalhes (opcional):</label>
            <textarea
              value={reportDetails}
              onChange={(e) => setReportDetails(e.target.value)}
              placeholder="Explique o motivo..."
            ></textarea>

            <div className="buttons">
              <button onClick={handleReportSubmit}>Enviar</button>
              <button onClick={() => setShowReportModal(false)}>Cancelar</button>
            </div>
          </div>
        </ReportModal>
      )}
    </PageContainer>
  );
};

export default Page;
