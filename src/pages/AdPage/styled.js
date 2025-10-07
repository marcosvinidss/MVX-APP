import styled from "styled-components";

export const PageContainer = styled.div`
  max-width: 1000px;
  margin: 30px auto;
  padding: 0 15px;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 60px);
`;

export const PageArea = styled.div`
  display: flex;
  gap: 30px;
  margin-top: 20px;

  @media (max-width: 900px) {
    flex-direction: column;
  }

  .box {
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
    padding: 20px;
  }

  .leftSide {
    flex: 2;

    .adImage img {
      width: 100%;
      max-height: 500px;
      object-fit: contain;
      border-radius: 12px;
    }

    .titleRow {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .favoriteBtn {
      background: none;
      border: none;
      font-size: 28px;
      cursor: pointer;
      transition: transform 0.2s;
    }

    .favoriteBtn:hover {
      transform: scale(1.15);
    }

    .adDescription .views {
      color: #888;
      margin-top: 10px;
    }
  }

  .rightSide {
    flex: 1;
    max-width: 350px;
    display: flex;
    flex-direction: column;
    gap: 20px;

    .priceBox,
    .contactBox {
      background-color: #fff;
      border-radius: 12px;
      border: 1px solid #ddd;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      padding: 20px;
    }

    .price {
      font-size: 34px;
      font-weight: 700;
      color: #008f39;
      text-align: center;
    }

    .negotiable {
      font-size: 18px;
      font-weight: 600;
      color: #ff7f00;
      text-align: center;
    }

    .contactBox a {
      display: block;
      margin-top: 18px;
      background-color: #008f39;
      color: #fff;
      text-align: center;
      padding: 14px 0;
      border-radius: 12px;
      text-decoration: none;
      font-weight: 700;
      transition: background-color 0.3s;
    }

    .contactBox a:hover {
      background-color: #006d29;
    }

    .reportButton {
      margin-top: 12px;
      width: 100%;
      background-color: #ff3b3b;
      color: #fff;
      padding: 12px 0;
      border-radius: 12px;
      border: none;
      font-weight: 600;
      cursor: pointer;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
      transition: all 0.2s ease;
    }

    .reportButton:hover {
      background-color: #e03535;
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
    background: rgba(0, 0, 0, 0.55);
    backdrop-filter: blur(3px);
    z-index: -1;
    animation: fadeIn 0.3s ease;
  }

  .modalContent {
    background: #fff;
    padding: 25px 30px;
    border-radius: 16px;
    width: 90%;
    max-width: 420px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    box-shadow: 0 6px 30px rgba(0, 0, 0, 0.25);
    animation: scaleIn 0.3s ease forwards;

    h2 {
      margin: 0 0 8px;
      font-size: 22px;
      font-weight: 700;
      color: #222;
      text-align: center;
    }

    select,
    textarea {
      border: 1px solid #ccc;
      border-radius: 8px;
      padding: 10px;
      font-size: 14px;
      outline: none;
      transition: border-color 0.3s;
    }

    select:focus,
    textarea:focus {
      border-color: #008f39;
      box-shadow: 0 0 6px rgba(0, 143, 57, 0.3);
    }

    textarea {
      resize: vertical;
      min-height: 90px;
    }

    .buttons {
      display: flex;
      justify-content: flex-end;
      gap: 10px;

      button {
        padding: 10px 16px;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 600;
      }

      button:first-child {
        background: #008f39;
        color: #fff;
      }

      button:first-child:hover {
        background: #006d29;
      }

      button:last-child {
        background: #ccc;
        color: #222;
      }

      button:last-child:hover {
        background: #bbb;
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
  background-color: #ddd;
  height: ${(props) => props.height || 20}px;
  border-radius: 5px;
`;
