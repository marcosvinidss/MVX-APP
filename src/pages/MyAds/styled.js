import styled from "styled-components";

export const MyAdsArea = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 30px 15px;

  h2 {
    font-size: 26px;
    font-weight: 700;
    color: #302E2E;
    text-align: center;
    margin-bottom: 30px;
  }

  p {
    text-align: center;
    color: #666;
    font-size: 14px;
    margin: 20px 0;
  }

  .adsList {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    justify-items: center;
  }

  .adItem {
    width: 100%;
    background-color: #fff;
    border-radius: 15px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
    overflow: hidden;
    transition: transform 0.3s, box-shadow 0.3s;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 12px 25px rgba(0, 0, 0, 0.15);
    }

    .adContent {
      padding: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      h3 {
        font-size: 20px;
        font-weight: 700;
        color: #302E2E;
        margin-bottom: 10px;
      }

      p {
        font-size: 14px;
        color: #555;
        margin-bottom: 15px;
      }

      .adButtons {
        display: flex;
        gap: 12px;

        button {
          flex: 1;
          padding: 12px 0;
          border: none;
          border-radius: 8px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

          &.edit {
            background-color: #302E2E; /* fundo escuro padrão */
            color: #fff;

            &:hover {
              background-color: #1f1d1d;
              transform: translateY(-2px);
              box-shadow: 0 6px 12px rgba(0,0,0,0.15);
            }
          }

          &.delete {
            background: linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%);
            color: #fff;

            &:hover {
              background: linear-gradient(135deg, #ff4b2b 0%, #ff416c 100%);
              transform: translateY(-2px);
              box-shadow: 0 6px 12px rgba(0,0,0,0.15);
            }
          }
        }
      }
    }
  }

  @media (max-width: 768px) {
    padding: 20px 10px;

    .adsList {
      grid-template-columns: 1fr;
      gap: 15px;
    }

    .adItem .adContent .adButtons {
      flex-direction: column;

      button {
        width: 100%;
      }
    }
  }
`;
  