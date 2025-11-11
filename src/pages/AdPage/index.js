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
import ChatBox from "../../components/ChatBox";
import { useParams } from "react-router-dom";

const AdViewPage = () => {
  const api = useApi();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [adInfo, setAdInfo] = useState({});
  const [activeImage, setActiveImage] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);

  const [showChat, setShowChat] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [reportDetails, setReportDetails] = useState("");

  const [showPayModal, setShowPayModal] = useState(false);
  const [paymentId, setPaymentId] = useState(null);
  const [buyerEmail, setBuyerEmail] = useState("");
  const [creatingPayment, setCreatingPayment] = useState(false);
  const [confirmingPayment, setConfirmingPayment] = useState(false);
  const [sellerPix, setSellerPix] = useState("");

  const modalRef = useRef();

  useEffect(() => {
    const getAdInfo = async (adId) => {
      const json = await api.getAd(adId, true);
      setAdInfo(json || {});
      if (json?.images && json.images.length > 0) setActiveImage(json.images[0]);
      setIsFavorite(!!json?.isFavorite);
      if (json?.userInfo?.id || json?.idUser) {
        const sellerId = json.userInfo?.id || json.idUser;
        const seller = await api.getUserById(sellerId);
        if (seller?.pixKey) setSellerPix(seller.pixKey);
        else setSellerPix(null);
      }
      setLoading(false);
    };
    getAdInfo(id);
  }, [id, api]);

  const handleFavorite = async () => {
    try {
      await api.toggleFavorite(id);
      setIsFavorite((prev) => !prev);
    } catch {}
  };

  const handleSendMessage = () => {
    setShowChat((prev) => !prev);
  };

  const handleReportSubmit = async () => {
    if (!reportReason) return alert("Por favor, selecione um motivo antes de enviar.");
    try {
      const res = await api.reportAd(id, reportReason, reportDetails);
      alert(res?.message || "Denúncia enviada com sucesso!");
      setShowReportModal(false);
      setReportReason("");
      setReportDetails("");
    } catch {
      alert("Erro ao enviar denúncia. Tente novamente.");
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setShowReportModal(false);
        setShowPayModal(false);
      }
    };
    if (showReportModal || showPayModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showReportModal, showPayModal]);

  const handleStartPayment = async () => {
    try {
      setCreatingPayment(true);
      const me = await api.getUserInfo();
      const email = me?.email || "comprador@exemplo.com";
      setBuyerEmail(email);
      const amount = adInfo?.price ?? 1;
      if (!sellerPix) {
        setShowPayModal(true);
        setCreatingPayment(false);
        return;
      }
      const resp = await api.createMockPayment(id, amount, email);
      if (resp?.paymentId) {
        setPaymentId(resp.paymentId);
        setShowPayModal(true);
      } else {
        alert(resp?.error || "Não foi possível iniciar o pagamento simulado.");
      }
    } catch {
      alert("Erro ao iniciar pagamento.");
    } finally {
      setCreatingPayment(false);
    }
  };

  const handleConfirmPayment = async () => {
    if (!paymentId) return;
    try {
      setConfirmingPayment(true);
      const resp = await api.confirmMockPayment(paymentId);
      if (resp?.ok) {
        alert("Pagamento aprovado (simulado)!");
        setShowPayModal(false);
        setPaymentId(null);
      } else {
        alert(resp?.error || "Falha ao confirmar pagamento.");
      }
    } catch {
      alert("Erro ao confirmar pagamento.");
    } finally {
      setConfirmingPayment(false);
    }
  };

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
          <div style={{ position: "relative" }}>
            <MainImageWrapper>
              {activeImage && (
                <MainImage
                  src={activeImage}
                  srcSet={`${activeImage}?w=800 1x, ${activeImage}?w=1600 2x`}
                  alt={adInfo.title || ""}
                />
              )}
            </MainImageWrapper>

            <button
              onClick={handleFavorite}
              aria-label={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
              style={{
                position: "absolute",
                top: 12,
                right: 12,
                width: 44,
                height: 44,
                borderRadius: 999,
                border: "none",
                background: "rgba(0,0,0,0.6)",
                color: "#fff",
                cursor: "pointer",
                display: "grid",
                placeItems: "center",
                boxShadow: "0 2px 8px rgba(0,0,0,.25)",
                backdropFilter: "blur(2px)",
                zIndex: 4
              }}
            >
              <span style={{ fontSize: 20 }}>{isFavorite ? "💛" : "🤍"}</span>
            </button>
          </div>

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
              <div className="textBlock" style={{ width: "100%" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                  <h1 className="adTitle" style={{ margin: 0 }}>{adInfo.title}</h1>
                  <button
                    onClick={handleFavorite}
                    aria-label={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontSize: 26,
                      lineHeight: 1
                    }}
                  >
                    {isFavorite ? "💛" : "🤍"}
                  </button>
                </div>
                {adInfo.priceNegotiable ? (
                  <PriceText negociable>Preço negociável</PriceText>
                ) : (
                  <PriceText>R$ {adInfo.price}</PriceText>
                )}
              </div>

              <div className="actionsBlock">
                <ActionRow>
                  <ActionButton onClick={handleSendMessage}>Enviar mensagem</ActionButton>
                  <ActionButton onClick={handleFavorite}>{isFavorite ? "Salvo" : "Salvar"}</ActionButton>
                  <ActionButton onClick={() => setShowReportModal(true)}>Denunciar</ActionButton>
                  <ActionButton onClick={handleStartPayment} disabled={creatingPayment}>
                    {creatingPayment ? "Iniciando..." : "Pagamento via PIX"}
                  </ActionButton>
                </ActionRow>
              </div>
            </TitleRow>
          </PanelCard>

          <PanelCard>
            <h2 className="sectionTitle">Detalhes</h2>
            {adInfo.description && <p className="descText">{adInfo.description}</p>}
            {adInfo.stateName && (
              <InfoLine>
                <span>Estado:</span> {adInfo.stateName}
              </InfoLine>
            )}
            {adInfo.category?.name && (
              <InfoLine>
                <span>Categoria:</span> {adInfo.category.name}
              </InfoLine>
            )}
          </PanelCard>

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
            />

            <div className="buttons">
              <button onClick={handleReportSubmit}>Enviar</button>
              <button onClick={() => setShowReportModal(false)}>Cancelar</button>
            </div>
          </div>
        </ReportModal>
      )}

      {showPayModal && (
        <ReportModal>
          <div className="modalOverlay" />
          <div className="modalContent scaleIn" ref={modalRef}>
            <h2>Pagamento via PIX</h2>

            <div style={{ display: "grid", gap: 10, fontSize: 14 }}>
              <div>
                <strong>Anúncio:</strong> {adInfo?.title || "-"}
              </div>
              <div>
                <strong>Valor:</strong> R$ {adInfo?.price ?? 1}
              </div>
              <div>
                <strong>Comprador:</strong> {buyerEmail || "-"}
              </div>

              {sellerPix ? (
                <>
                  <div>
                    <strong>Chave PIX do vendedor:</strong>{" "}
                    <span style={{ color: "#107E8B" }}>{sellerPix}</span>
                  </div>

                  <div style={{ textAlign: "center", marginTop: 12 }}>
                    <strong>Escaneie o QR Code abaixo para realizar o pagamento:</strong>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: 10,
                      }}
                    >
                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=pix+${encodeURIComponent(
                          sellerPix
                        )}`}
                        alt="QR Code PIX"
                        style={{ borderRadius: 8, boxShadow: "0 2px 6px rgba(0,0,0,0.2)" }}
                      />
                    </div>
                    <p style={{ fontSize: 12, marginTop: 8, color: "#555" }}>
                      Abra o aplicativo do seu banco e escaneie o QR Code para enviar o valor.
                    </p>
                  </div>
                </>
              ) : (
                <div
                  style={{
                    textAlign: "center",
                    background: "#FFF6F6",
                    border: "1px solid #FFD5D5",
                    borderRadius: 8,
                    padding: "14px 10px",
                    marginTop: 10,
                  }}
                >
                  <h3 style={{ color: "#C62828", marginBottom: 6 }}>
                    Vendedor sem PIX cadastrado
                  </h3>
                  <p style={{ fontSize: 14, color: "#444" }}>
                    O vendedor ainda não cadastrou uma chave PIX.
                    <br />
                    Use o chat para combinar outra forma de pagamento.
                  </p>
                </div>
              )}

              <div className="buttons" style={{ marginTop: 18 }}>
                <button
                  onClick={handleConfirmPayment}
                  disabled={confirmingPayment || !sellerPix}
                >
                  {confirmingPayment ? "Confirmando..." : "Confirmar pagamento"}
                </button>
                <button onClick={() => setShowPayModal(false)}>Cancelar</button>
              </div>
            </div>
          </div>
        </ReportModal>
      )}
    </OverlayWrapper>
  );
};

export default AdViewPage;
