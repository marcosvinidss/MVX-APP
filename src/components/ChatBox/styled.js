import styled from "styled-components";

export const ChatContainer = styled.div`
  width: 100%;
  max-width: 340px;
  height: 280px;
  border: 1px solid #ccc;
  border-radius: 12px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  font-size: 14px;
`;

export const ChatHeader = styled.div`
  padding: 10px 14px;
  font-weight: 600;
  background-color: #f9f9f9;
  border-bottom: 1px solid #eee;
  color: #333;
`;

export const MessagesArea = styled.div`
  flex: 1;
  padding: 10px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 6px;

  /* scrollbar leve */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 4px;
  }
`;

export const MsgRow = styled.div`
  display: flex;
  max-width: 80%;
  align-self: ${(props) => (props.mine ? "flex-end" : "flex-start")};
  justify-content: ${(props) => (props.mine ? "flex-end" : "flex-start")};
`;

export const Bubble = styled.div`
  background-color: ${(props) => (props.mine ? "#dcf8c6" : "#f1f1f1")};
  border: 1px solid ${(props) => (props.mine ? "#cde7b5" : "#ddd")};
  padding: 8px 10px;
  border-radius: 10px;
  line-height: 1.3;
  word-break: break-word;
  color: #333;
`;

export const InputRow = styled.div`
  display: flex;
  padding: 8px 10px;
  border-top: 1px solid #eee;
  background: #fafafa;
  gap: 6px;
`;

export const Input = styled.input`
  flex: 1;
  padding: 6px 8px;
  border-radius: 8px;
  border: 1px solid #ccc;
  outline: none;
  font-size: 14px;
`;

export const Button = styled.button`
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 6px 10px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background-color: #000;
  }
`;
