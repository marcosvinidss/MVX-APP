import styled from "styled-components";

export const PageContainer = styled.div`
  max-width: 1000px;
  margin: 40px auto;
  padding: 0 15px;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 60px);
  background-color: #f7f8fa;
`;

export const PageArea = styled.div`
  display: flex;
  gap: 28px;
  margin-top: 25px;

  @media (max-width: 900px) {
    flex-direction: column;
  }

  .box {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
    padding: 20px 24px;
  }

  /* ---------- LADO ESQUERDO ---------- */
  .leftSide {
    flex: 2;

    .adImage img {
      width: 100%;
      max-height: 500px;
      object-fit: contain;
      border-radius: 10px;
      background-color: #fafafa;
    }

    .titleRow {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 12px;
    }

    .favoriteBtn {
      background: none;
      border: none;
      font-size: 28px;
      cursor: pointer;
      color: #ff7f00;
      transition: transform 0.2s ease;
    }

    .favoriteBtn:hover {
      transform: scale(1.15);
    }

    .adName h2 {
      font-size: 24px;
      color: #222;
      margin-bottom: 4px;
    }

    small {
      color: #999;
    }

    .adDescription {
      margin-top: 18px;
      line-height: 1.5;
      color: #444;
      font-size: 15px;
    }

    .adDescription .views {
      color: #888;
      margin-top: 10px;
      font-size: 14px;
    }
  }

  /* ---------- LADO DIREITO ---------- */
  .rightSide {
    flex: 1;
    max-width: 340px;
    display: flex;
    flex-direction: column;
    gap: 18px;

    .priceBox,
    .contactBox {
      background-color: #fff;
      border-radius: 10px;
      border: 1px solid #eee;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
      padding: 20px;
    }

    .price {
      font-size: 32px;
      font-weight: 700;
      color: #ff7f00;
      text-align: center;
    }

    .negotiable {
      font-size: 18px;
      font-weight: 600;
      color: #008f39;
      text-align: center;
    }

    .createdBy {
      font-size: 15px;
      color: #444;
      display: flex;
      flex-direction: column;
      gap: 4px;

      strong {
        color: #222;
        font-weight: 600;
      }

      small {
        color: #777;
      }
    }

    /* Botão de contato */
    .contactBox a {
      display: block;
      margin-top: 18px;
      background-color: #ff7f00;
      color: #fff;
      text-align: center;
      padding: 13px 0;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 700;
      transition: all 0.25s ease;
      box-shadow: 0 2px 8px rgba(255, 127, 0, 0.25);
    }

    .contactBox a:hover {
      background-color: #e67300;
      box-shadow: 0 3px 10px rgba(255, 127, 0, 0.35);
    }

    /* Botão de denúncia (mais discreto) */
    .reportButton {
      margin-top: 10px;
      width: fit-content;
      align-self: center;
      background-color: transparent;
      color: #d9534f;
      font-size: 14px;
      border: none;
      padding: 6px 10px;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 500;
      transition: all 0.25s ease;
    }

    .reportButton:hover {
      background-color: rgba(217, 83, 79, 0.08);
      transform: translateY(-1px);
    }
  }
`;

export const ReportModal = styled.div`
  position: fixed;
  inset: 0;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;

  .modalOverlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(3px);
    z-index: -1;
    animation: fadeIn 0.3s ease;
  }

  .modalContent {
    background: #fff;
    padding: 30px 35px;
    border-radius: 12px;
    width: 95%;
    max-width: 460px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    box-shadow: 0 8px 35px rgba(0, 0, 0, 0.25);
    animation: scaleIn 0.3s ease forwards;
    border-top: 5px solid #ff7f00;

    h2 {
      margin: 0;
      font-size: 22px;
      font-weight: 700;
      color: #222;
      text-align: center;
    }

    p {
      text-align: center;
      color: #666;
      font-size: 14px;
      margin-top: -6px;
      margin-bottom: 4px;
    }

    label {
      font-size: 14px;
      color: #333;
      font-weight: 500;
      margin-top: 5px;
    }

    select,
    textarea {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 10px;
      font-size: 14px;
      outline: none;
      transition: border-color 0.3s, box-shadow 0.3s;
      background: #fafafa;
    }

    select:focus,
    textarea:focus {
      border-color: #ff7f00;
      box-shadow: 0 0 6px rgba(255, 127, 0, 0.3);
      background: #fff;
    }

    textarea {
      resize: vertical;
      min-height: 90px;
    }

    .buttons {
      display: flex;
      justify-content: space-between;
      gap: 10px;
      margin-top: 8px;

      button {
        flex: 1;
        padding: 10px 18px;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 600;
        font-size: 14px;
        transition: all 0.25s ease;
      }

      button:first-child {
        background: #ff7f00;
        color: #fff;
        box-shadow: 0 2px 6px rgba(255, 127, 0, 0.3);
      }

      button:first-child:hover {
        background: #e67300;
      }

      button:last-child {
        background: #f1f1f1;
        color: #333;
      }

      button:last-child:hover {
        background: #e4e4e4;
      }
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

export const Fake = styled.div`
  background-color: #eee;
  height: ${(props) => props.height || 20}px;
  border-radius: 6px;
`;
