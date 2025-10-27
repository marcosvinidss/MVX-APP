import styled from "styled-components";

export const PageWrapper = styled.div`
  max-width: 1000px;
  margin: 30px auto;
  padding: 0 15px;
  font-family: "Open Sans", sans-serif;

  h1 {
    font-size: 22px;
    font-weight: 600;
    color: #302e2e;
    margin-bottom: 20px;
  }
`;

// área principal em 2 colunas
export const MessagesLayout = styled.div`
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 16px;
  min-height: 480px;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;

// coluna da lista de conversas
export const ConversationListWrapper = styled.div`
  border: 1px solid #ddd;
  border-radius: 12px;
  background: #fff;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: 480px;
  max-height: 70vh;

  .listHeader {
    padding: 12px 16px;
    border-bottom: 1px solid #eee;
    font-size: 14px;
    font-weight: 600;
    color: #302e2e;
  }

  .listScroll {
    overflow-y: auto;
    flex: 1;
  }
`;

export const ConversationList = styled.div`
  display: flex;
  flex-direction: column;
  .convButton {
    text-decoration: none;
    border: 0;
    background: transparent;
    cursor: pointer;
    width: 100%;
    text-align: left;
    padding: 0;
  }
`;

export const ConversationItem = styled.div`
  border-bottom: 1px solid #eee;
  padding: 14px 16px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  transition: background 0.15s ease;

  &:hover {
    background: #fafafa;
  }

  &.active {
    background: #f0f0f0;
  }

  .convMain {
    flex: 1;
    min-width: 0;
  }

  .convName {
    font-size: 15px;
    color: #000;
    font-weight: 600;
    margin-bottom: 4px;
  }

  .convLastMsg {
    font-size: 14px;
    color: #555;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 220px;
  }

  .convMeta {
    text-align: right;
    min-width: 80px;
    color: #777;
    font-size: 12px;
  }

  .convDate {
    color: #888;
  }
`;

// coluna do chat
export const ChatAreaWrapper = styled.div`
  border: 1px solid #ddd;
  border-radius: 12px;
  background: #fff;
  min-height: 480px;
  max-height: 70vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .placeholder {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #777;
    font-size: 14px;
    padding: 20px;
    text-align: center;
  }

  /* forçando o ChatBox ocupar todo o espaço vertical */
  .chatBoxWrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
`;
