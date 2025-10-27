import styled from "styled-components";

export const ChatContainer = styled.div`
  width: 100%;
  height: 520px;
  border-radius: 16px;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  font-family: "Open Sans", sans-serif;
`;

export const ChatHeader = styled.div`
  padding: 14px 18px;
  font-weight: 600;
  background-color: #302e2e;
  color: #fff;
  font-size: 15px;
  letter-spacing: 0.3px;
`;

export const MessagesArea = styled.div`
  flex: 1;
  padding: 14px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #ffffff;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #d0d0d0;
    border-radius: 4px;
  }
`;

export const MsgRow = styled.div`
  display: flex;
  max-width: 80%;
  align-self: ${(props) => (props.mine ? "flex-end" : "flex-start")};
`;

export const Bubble = styled.div`
  background-color: ${(props) => (props.mine ? "#EAB308" : "#EDEDED")};
  color: ${(props) => (props.mine ? "#1E1E1E" : "#333")};
  padding: 10px 14px;
  border-radius: 16px;
  border-bottom-right-radius: ${(props) => (props.mine ? "4px" : "16px")};
  border-bottom-left-radius: ${(props) => (props.mine ? "16px" : "4px")};
  line-height: 1.4;
  font-size: 14px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
`;

export const InputRow = styled.div`
  display: flex;
  padding: 12px 14px;
  border-top: 1px solid #ddd;
  background: #f6f6f6;
  gap: 10px;
`;

export const Input = styled.input`
  flex: 1;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid #ccc;
  outline: none;
  font-size: 14px;
  background: #fff;
  transition: all 0.2s ease;

  &:focus {
    border-color: #302e2e;
    box-shadow: 0 0 0 2px rgba(48, 46, 46, 0.15);
  }
`;

export const Button = styled.button`
  background-color: #302e2e;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 10px 14px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #504d4d;
  }
`;
