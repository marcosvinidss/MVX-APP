import styled from "styled-components";

export const PageContainer = styled.div`
  max-width: 1000px;
  margin: 30px auto; /* afasta do header e footer */
  padding: 0 15px;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 60px); /* ocupa a altura da tela menos header/footer */
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
    box-shadow: 0 2px 12px rgba(0,0,0,0.08);
    padding: 20px;
  }

  .leftSide {
    flex: 2;

    .adImage {
      width: 100%;
      max-height: 500px;
      margin-bottom: 20px;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);

      .each-slide {
        display: flex !important;
        justify-content: center;
        align-items: center;
        background: #f9f9f9;
        height: auto !important;
        max-height: 500px;
      }

      img {
        width: 100%;
        height: auto;
        max-height: 500px;
        object-fit: contain;
        border-radius: 12px;
      }
    }

    .adInfo {
      padding: 10px 0;

      .adName {
        margin-bottom: 15px;

        h2 {
          margin: 0;
          font-size: 30px;
          font-weight: 700;
          color: #222;
        }

        small {
          color: #666;
          font-weight: 400;
        }
      }

      .adDescription {
        font-size: 16px;
        line-height: 1.6;
        color: #333;
        margin-top: 10px;
      }

      .priceArea {
        margin-top: 25px;

        .priceLabel {
          font-weight: 600;
          color: #444;
          margin-bottom: 5px;
        }

        .priceInput {
          display: flex;
          align-items: center;

          input {
            flex: 1;
            padding: 12px 14px;
            font-size: 18px;
            border-radius: 8px;
            border: 1px solid #ddd;
            outline: none;
            transition: all 0.3s ease;

            &:focus {
              border-color: #302e2e;
              box-shadow: 0 0 8px rgba(48, 46, 46, 0.2);
            }
          }

          label {
            margin-left: 10px;
            display: flex;
            align-items: center;
            font-size: 14px;
            color: #666;

            input[type="checkbox"] {
              margin-right: 6px;
              width: 16px;
              height: 16px;
            }
          }
        }
      }
    }
  }

  .rightSide {
    flex: 1;
    max-width: 350px;
    display: flex;
    flex-direction: column;
    gap: 20px;

    .priceBox {
      background-color: #fff;
      border-radius: 12px;
      border: 1px solid #ddd;
      padding: 25px 20px;
      text-align: center;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);

      .price {
        font-size: 34px;
        font-weight: 700;
        color: #008f39;
        margin-bottom: 10px;
      }

      .negotiable {
        font-size: 18px;
        color: #ff7f00;
        font-weight: 600;
      }
    }

    .contactBox {
      background-color: #fff;
      border-radius: 12px;
      border: 1px solid #ddd;
      padding: 20px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);

      .createdBy {
        font-size: 14px;
        color: #444;

        strong {
          display: block;
          font-size: 18px;
          font-weight: 700;
          margin-top: 8px;
          color: #222;
        }

        small {
          display: block;
          color: #666;
          margin-top: 6px;
          font-weight: 400;
        }
      }

      a {
        display: block;
        margin-top: 18px;
        background-color: #008f39;
        color: white;
        text-align: center;
        padding: 14px 0;
        border-radius: 12px;
        text-decoration: none;
        font-weight: 700;
        transition: background-color 0.3s ease;

        &:hover {
          background-color: #006d29;
        }
      }
    }
  }
`;

// Fake placeholder para carregamento
export const Fake = styled.div`
  background-color: #ddd;
  height: ${props => props.height || 20}px;
  border-radius: 5px;
`;
