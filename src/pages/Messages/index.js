import React, { useEffect, useState } from "react";
import useApi from "../../helpers/MvxApi";

import ChatBox from "../../components/ChatBox";

import {
  PageWrapper,
  MessagesLayout,
  ConversationListWrapper,
  ConversationList,
  ConversationItem,
  ChatAreaWrapper,
} from "./styled";

const MessagesPage = () => {
  const api = useApi();

  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  // conversa selecionada
  // { adId, otherUserId, otherUserName }
  const [selectedConversation, setSelectedConversation] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setLoadError(null);

        const data = await api.getUserChats?.();
        console.log("getUserChats() =>", data);

        if (Array.isArray(data)) {
          setConversations(data);

          // se quiser já abrir a primeira conversa automaticamente:
          if (data.length > 0) {
            setSelectedConversation({
              adId: data[0].adId,
              otherUserId: data[0].otherUserId,
              otherUserName: data[0].otherUserName,
            });
          }
        } else {
          setConversations([]);
        }
      } catch (err) {
        console.error("Erro carregando conversas:", err);
        setLoadError("Não foi possível carregar suas conversas.");
        setConversations([]);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [api]);

  const formatDateTime = (iso) => {
    if (!iso) return "";
    const d = new Date(iso);
    const dia = d.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    const hora = d.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${dia} às ${hora}`;
  };

  return (
    <PageWrapper>
      <h1>Conversas</h1>

      <MessagesLayout>
        {/* COLUNA ESQUERDA: lista de conversas */}
        <ConversationListWrapper>
          <div className="listHeader">Suas conversas</div>

          <div className="listScroll">
            {loading && (
              <p style={{ color: "#666", fontSize: 14, padding: "12px 16px" }}>
                Carregando...
              </p>
            )}

            {!loading && loadError && (
              <p style={{ color: "#c00", fontSize: 14, padding: "12px 16px" }}>
                {loadError}
              </p>
            )}

            {!loading &&
              !loadError &&
              conversations.length === 0 && (
                <p
                  style={{
                    color: "#666",
                    fontSize: 14,
                    padding: "12px 16px",
                  }}
                >
                  Você ainda não iniciou nenhuma conversa.
                </p>
              )}

            {!loading && !loadError && conversations.length > 0 && (
              <ConversationList>
                {conversations.map((conv, idx) => {
                  const isActive =
                    selectedConversation &&
                    selectedConversation.adId === conv.adId &&
                    selectedConversation.otherUserId === conv.otherUserId;

                  return (
                    <button
                      key={idx}
                      className="convButton"
                      onClick={() =>
                        setSelectedConversation({
                          adId: conv.adId,
                          otherUserId: conv.otherUserId,
                          otherUserName: conv.otherUserName,
                        })
                      }
                    >
                      <ConversationItem className={isActive ? "active" : ""}>
                        <div className="convMain">
                          <div className="convName">{conv.otherUserName}</div>
                          <div className="convLastMsg">
                            {conv.lastMessage}
                          </div>
                        </div>

                        <div className="convMeta">
                          <div className="convDate">
                            {formatDateTime(conv.updatedAt)}
                          </div>
                        </div>
                      </ConversationItem>
                    </button>
                  );
                })}
              </ConversationList>
            )}
          </div>
        </ConversationListWrapper>

        {/* COLUNA DIREITA: chat ativo */}
        <ChatAreaWrapper>
          {!selectedConversation && (
            <div className="placeholder">
              Selecione uma conversa para começar a enviar mensagens.
            </div>
          )}

          {selectedConversation && (
            <div className="chatBoxWrapper">
              <ChatBox
                adId={selectedConversation.adId}
                sellerId={selectedConversation.otherUserId}
                sellerName={selectedConversation.otherUserName}
              />
            </div>
          )}
        </ChatAreaWrapper>
      </MessagesLayout>
    </PageWrapper>
  );
};

export default MessagesPage;
