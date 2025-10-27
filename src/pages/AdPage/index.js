import React, { useEffect, useState, useRef } from "react";
import {
  OverlayWrapper,
  PageInner,
  GalleryArea,
  ThumbStrip,
  MainImageWrapper,
  MainImage,
  SidePanel,
  PanelCard,
  TitleRow,
  PriceText,
  InfoLine,
  ActionRow,
  ActionButton,
  MessageFooter,
  FooterButton,
  ReportModal,
} from "./styled";
import useApi from "../../helpers/MvxApi";
import ChatBox from "../../components/ChatBox"; // importante!
import { useParams } from "react-router-dom";

const AdViewPage = () => {
  const api = useApi();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [adInfo, setAdInfo] = useState({});
  const [activeImage, setActiveImage] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);

  const [showChat, setShowChat] = useState(false); // ✅ restaurado
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [reportDetails, setReportDetails] = useState("");

  const modalRef = useRef();

  useEffect(() => {
    const getAdInfo = async (id) => {
      const json = await api.getAd(id, true);
      setAdInfo(json);
      if (json?.images && json.images.length > 0) setActiveImage(json.images[0]);
      if (json.isFavorite) setIsFavorite(true);
      setLoading(false);
    };
    getAdInfo(id);
  }, [id, api]);

  const handleFavorite = async () => {
    try {
      await api.toggleFavorite(id);
      setIsFavorite((prev) => !prev);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSendMessage = () => {
    setShowChat((prev) => !prev); // ✅ abre e fecha o ChatBox
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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showReportModal]);

  if (loading) {
    return (
      <OverlayWrapper>
        <div style={{ color: "#302E2E", fontSize: 14 }}>Carregando...</div>
      </OverlayWrapper>
    );
  }

  return (
    <OverlayWrapper>
      <PageInner>
        <GalleryArea>
          <MainImageWrapper>
            {activeImage && <MainImage src={activeImage} alt="" />}
          </MainImageWrapper>

          {adInfo.images && adInfo.images.length > 1 && (
            <ThumbStrip>
              {adInfo.images.map((img, idx) => (
                <button
                  key={idx}
                  className={`thumbBtn ${img === activeImage ? "active" : ""}`}
                  onClick={() => setActiveImage(img)}
                >
                  <img src={img} alt={`thumb-${idx}`} />
                </button>
              ))}
            </ThumbStrip>
          )}
        </GalleryArea>

        <SidePanel>
          <PanelCard>
            <TitleRow>
              <div className="textBlock">
                <h1 className="adTitle">{adInfo.title}</h1>
                {adInfo.priceNegotiable ? (
                  <PriceText negociable>Preço negociável</PriceText>
                ) : (
                  <PriceText>R$ {adInfo.price}</PriceText>
                )}
              </div>

              <div className="actionsBlock">
                <ActionRow>
                  <ActionButton onClick={handleSendMessage}>
                    💬 Enviar mensagem
                  </ActionButton>

                  <ActionButton onClick={handleFavorite}>
                    {isFavorite ? "💛 Salvo" : "🤍 Salvar"}
                  </ActionButton>

                  <ActionButton onClick={() => setShowReportModal(true)}>
                    🚨 Denunciar
                  </ActionButton>
                </ActionRow>
              </div>
            </TitleRow>
          </PanelCard>

          <PanelCard>
            <h2 className="sectionTitle">Detalhes</h2>
            {adInfo.description && (
              <p className="descText">{adInfo.description}</p>
            )}
          </PanelCard>

          {/* ChatBox aparece aqui */}
          {showChat && adInfo.userInfo && (
            <ChatBox
              adId={id}
              sellerId={adInfo.userInfo.id || adInfo.idUser}
              sellerName={adInfo.userInfo.name}
            />
          )}

          <MessageFooter>
            <FooterButton onClick={handleSendMessage}>
              {showChat ? "Fechar chat" : "Enviar mensagem"}
            </FooterButton>
          </MessageFooter>
        </SidePanel>
      </PageInner>

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
              <button onClick={() => setShowReportModal(false)}>
                Cancelar
              </button>
            </div>
          </div>
        </ReportModal>
      )}
    </OverlayWrapper>
  );
};

export default AdViewPage;
