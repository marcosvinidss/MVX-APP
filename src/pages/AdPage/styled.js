import styled from "styled-components";

export const PageContainer = styled.div`
  max-width: 1000px;
  margin: 20px auto;
  padding: 0 15px;
  border-radius: 6px;
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
    border-radius: 6px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    padding: 20px;
  }

  .leftSide {
    flex: 2;

  .adImage {
  width: 100%;
  max-height: 500px; /* limite máximo para não ficar gigante */
  margin-bottom: 20px;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);

  .each-slide {
    display: flex !important;
    justify-content: center;
    align-items: center;
    background: #f9f9f9;
    height: auto !important; /* deixa ajustar a altura */
    max-height: 500px;
  }

  img {
    width: auto;
    max-width: 100%;
    max-height: 500px;
    height: auto;
    object-fit: contain;
    border-radius: 6px;
  }
}


    .adInfo {
      padding: 10px 0;

      .adName {
        margin-bottom: 15px;

        h2 {
          margin: 0;
          font-size: 28px;
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
        line-height: 1.5;
        color: #333;
        margin-top: 10px;
      }
    }
  }

  .rightSide {
    flex: 1;
    max-width: 350px;
    display: flex;
    flex-direction: column;
    gap: 25px;

    .priceBox {
      background-color: #f5f5f5;
      border-radius: 10px;
      padding: 25px 20px;
      text-align: center;
      box-shadow: 0 1px 5px rgba(0,0,0,0.1);

      .price {
        font-size: 32px;
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
      background-color: #fafafa;
      border-radius: 10px;
      padding: 20px;
      box-shadow: 0 1px 5px rgba(0,0,0,0.1);

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
        border-radius: 10px;
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


export const Fake = styled.div`
  background-color: #ddd;
  height: ${props => props.height || 20}px;
  border-radius: 5px;
`;
