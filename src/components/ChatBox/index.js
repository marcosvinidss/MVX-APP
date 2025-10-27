import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import useApi from "../../helpers/MvxApi";

import {
  ChatContainer,
  ChatHeader,
  MessagesArea,
  MsgRow,
  Bubble,
  InputRow,
  Input,
  Button,
} from "./styled";

const socket = io("http://localhost:5000");

export default function ChatBox({ adId, sellerId, sellerName }) {
  const api = useApi();

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null);

  const bottomRef = useRef(null);

  // pega o usuário logado
  useEffect(() => {
    const loadMe = async () => {
      const me = await api.getUserInfo();

      if (me?.id) {
        setCurrentUserId(me.id);
      } else if (me?._id) {
        setCurrentUserId(me._id);
      } else if (me?.user?._id) {
        setCurrentUserId(me.user._id);
      }
    };
    loadMe();
  }, [api]);

  // carrega histórico
  useEffect(() => {
    const loadHistory = async () => {
      if (!sellerId) return;

      const res = await api.getChatHistory(adId, sellerId);

      if (res && res.messages) {
        setMessages(res.messages);
      } else {
        setMessages([]);
      }
    };

    loadHistory();
  }, [adId, sellerId, api]);

  // socket realtime
  useEffect(() => {
    if (!adId) return;

    socket.emit("join_ad_room", { adId });

    const handleReceive = (msg) => {
      if (msg.adId === adId) {
        setMessages((prev) => [...prev, msg]);
      }
    };

    socket.on("receive_message", handleReceive);

    return () => {
      socket.off("receive_message", handleReceive);
    };
  }, [adId]);

  // scroll pro fim sempre que chegam msgs
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // enviar mensagem
  const handleSend = async () => {
    if (!input.trim() || !currentUserId || !sellerId) {
      return;
    }

    // grava no banco
    await api.sendChatMessage(adId, sellerId, input);

    // avisa realtime -> servidor vai fazer broadcast (inclusive pra mim)
    socket.emit("send_message", {
      adId,
      senderId: currentUserId,
      receiverId: sellerId,
      message: input,
    });

    // IMPORTANTE: não damos setMessages manual aqui
    // deixamos o socket 'receive_message' adicionar
    setInput("");
  };

  return (
    <ChatContainer>
      <ChatHeader>Conversando com {sellerName}</ChatHeader>

      <MessagesArea>
        {messages.map((m, i) => {
          const isMine = m.senderId === currentUserId;
          return (
            <MsgRow key={i} mine={isMine}>
              <Bubble mine={isMine}>{m.message}</Bubble>
            </MsgRow>
          );
        })}
        <div ref={bottomRef} />
      </MessagesArea>

      <InputRow>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Digite sua mensagem..."
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
        />
        <Button onClick={handleSend}>Enviar</Button>
      </InputRow>
    </ChatContainer>
  );
}
