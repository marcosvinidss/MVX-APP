import styled from "styled-components";

/* Container externo (fundo + centralização horizontal) */
export const OverlayWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #f9f9f9;
  font-family: "Open Sans", sans-serif;

  display: flex;
  justify-content: center;

  padding: 24px 16px;
  box-sizing: border-box;
`;

/* Container interno limitado, alinhando galeria + painel lateral */
export const PageInner = styled.div`
  width: 100%;
  max-width: 1100px;
  display: flex;
  flex-direction: row;
  gap: 24px;
  margin-top: 8px;

  @media (max-width: 1100px) {
    flex-direction: column;
  }
`;

export const GalleryArea = styled.div`
  flex: 1.3;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 0;
`;

/* imagem principal menor, centralizada e com boa proporção */
export const MainImageWrapper = styled.div`
  width: 100%;
  max-width: 700px;
  border-radius: 16px;
  background-color: #fff;
  border: 1px solid #ddd;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;

  display: flex;
  justify-content: center;
  align-items: center;

  aspect-ratio: 4 / 3;
  margin: 0 auto;
`;

export const MainImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
  border-radius: 16px;
`;

export const ThumbStrip = styled.div`
  margin-top: 12px;
  display: flex;
  gap: 8px;
  flex-wrap: nowrap;
  max-width: 100%;
  overflow-x: auto;
  padding-bottom: 4px;

  &::-webkit-scrollbar {
    height: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #d0d0d0;
    border-radius: 4px;
  }

  .thumbBtn {
    border: 2px solid transparent;
    padding: 0;
    border-radius: 10px;
    background: #fff;
    cursor: pointer;
    flex-shrink: 0;
    width: 60px;
    height: 60px;
    overflow: hidden;

    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    border: 1px solid #ddd;

    transition: all 0.15s ease;
  }

  .thumbBtn.active,
  .thumbBtn:hover,
  .thumbBtn:focus-visible {
    border-color: #eab308;
    box-shadow: 0 0 0 2px rgba(234, 179, 8, 0.3),
      0 2px 10px rgba(0, 0, 0, 0.12);
    outline: none;
  }

  .thumbBtn img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;

    image-rendering: -webkit-optimize-contrast;
    image-rendering: crisp-edges;
  }
`;

export const SidePanel = styled.div`
  flex: 0.7;
  min-width: 320px;
  max-width: 400px;

  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (max-width: 1100px) {
    max-width: 100%;
    min-width: 0;
  }
`;

export const PanelCard = styled.div`
  background-color: #ffffff;
  border-radius: 16px;
  border: 1px solid #ddd;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px 20px 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  color: #1e1e1e;

  .sectionTitle {
    font-size: 15px;
    font-weight: 600;
    color: #302e2e;
    margin: 0;
    letter-spacing: 0.2px;
  }

  .detailsGrid {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .row {
    display: flex;
    flex-direction: column;
    font-size: 14px;
    line-height: 1.4;
  }

  .label {
    color: #666;
    font-weight: 500;
    font-size: 13px;
  }

  .value {
    color: #1e1e1e;
    font-size: 14px;
    font-weight: 500;
  }

  .descText {
    font-size: 14px;
    line-height: 1.5;
    color: #333;
    margin: 0;
    white-space: pre-line;
  }
`;

export const TitleRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  .textBlock {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .adTitle {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    color: #1e1e1e;
    line-height: 1.3;
    letter-spacing: 0.2px;
  }
`;

export const PriceText = styled.div`
  font-size: ${(props) => (props.negociable ? "15px" : "22px")};
  font-weight: ${(props) => (props.negociable ? "600" : "700")};
  line-height: 1.3;
  color: ${(props) => (props.negociable ? "#1E1E1E" : "#EAB308")};

  background: ${(props) => (props.negociable ? "#fff9d6" : "transparent")};
  border: ${(props) => (props.negociable ? "1px solid #EAB308" : "none")};
  border-radius: 10px;
  padding: ${(props) => (props.negociable ? "6px 10px" : "0")};

  width: fit-content;
`;

export const InfoLine = styled.div`
  font-size: 13px;
  line-height: 1.4;

  span {
    font-weight: 600;
    color: #444;
    margin-right: 4px;
  }

  .muted {
    color: #666;
  }
`;

export const ActionRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const ActionButton = styled.button`
  background-color: #302e2e;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 10px 12px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  line-height: 1.2;
  transition: all 0.2s ease;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 6px;

  &:hover {
    background-color: #504d4d;
  }

  &:focus-visible {
    outline: 2px solid #eab308;
    outline-offset: 2px;
  }
`;

export const MessageFooter = styled.div`
  background-color: #ffffff;
  border-radius: 16px;
  border: 1px solid #ddd;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 16px;
`;

export const FooterButton = styled.button`
  width: 100%;
  background-color: #302e2e;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 12px 14px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  line-height: 1.2;
  transition: all 0.2s ease;
  text-align: center;

  &:hover {
    background-color: #504d4d;
  }

  &:focus-visible {
    outline: 2px solid #eab308;
    outline-offset: 2px;
  }
`;

/* modal de denúncia */
export const ReportModal = styled.div`
  position: fixed;
  inset: 0;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Open Sans", sans-serif;

  .modalOverlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(3px);
    z-index: -1;
    animation: fadeIn 0.25s ease;
  }

  .modalContent {
    background: #ffffff;
    padding: 24px 28px;
    border-radius: 16px;
    width: 95%;
    max-width: 440px;
    display: flex;
    flex-direction: column;
    gap: 14px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    border: 1px solid #ddd;
    animation: scaleIn 0.25s ease forwards;

    h2 {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
      color: #fff;
      text-align: center;
      background-color: #302e2e;
      border-radius: 10px;
      padding: 10px 12px;
      letter-spacing: 0.3px;
    }

    label {
      font-size: 13px;
      color: #333;
      font-weight: 500;
    }

    select,
    textarea {
      border: 1px solid #ccc;
      border-radius: 10px;
      padding: 10px 12px;
      font-size: 14px;
      outline: none;
      background: #fff;
      transition: all 0.2s ease;
      font-family: "Open Sans", sans-serif;
    }

    select:focus,
    textarea:focus {
      border-color: #302e2e;
      box-shadow: 0 0 0 2px rgba(48, 46, 46, 0.15);
    }

    textarea {
      resize: vertical;
      min-height: 90px;
      line-height: 1.4;
    }

    .buttons {
      display: flex;
      justify-content: space-between;
      gap: 10px;
      margin-top: 8px;
    }

    .buttons button {
      flex: 1;
      border: none;
      border-radius: 10px;
      cursor: pointer;
      font-weight: 500;
      font-size: 14px;
      line-height: 1.2;
      padding: 10px 14px;
      transition: all 0.2s ease;
      font-family: "Open Sans", sans-serif;
    }

    .buttons button:first-child {
      background-color: #302e2e;
      color: #fff;
    }

    .buttons button:first-child:hover {
      background-color: #504d4d;
    }

    .buttons button:last-child {
      background-color: #f1f1f1;
      color: #333;
    }

    .buttons button:last-child:hover {
      background-color: #e4e4e4;
    }
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.9); }
    to { opacity: 1; transform: scale(1); }
  }
`;
