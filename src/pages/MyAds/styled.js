import styled from "styled-components";

export const PageArea = styled.div`
  max-width: 700px;
  margin: 40px auto;
  padding: 25px;

  h1 {
    text-align: center;
    color: #302e2e;
    margin-bottom: 30px;
  }

  .adsList {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .adItem {
    display: flex;
    background: #f9f9f9;
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid #ddd;
    transition: transform 0.3s, box-shadow 0.3s;

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
    }

    .adImg {
      width: 200px;
      height: 140px;
      flex-shrink: 0;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .adContent {
      flex: 1;
      padding: 15px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      h3 {
        margin: 0 0 10px 0;
        font-size: 18px;
        color: #302e2e;
      }

      p {
        margin: 0 0 15px 0;
        font-weight: 600;
        color: #555;
      }

      .adButtons {
        display: flex;
        gap: 10px;

        button {
          flex: 1;
          padding: 10px 0;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;

          &.edit {
            background: #302e2e;
            color: #fff;

            &:hover {
              background: #1f1d1d;
              transform: translateY(-2px);
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
            }
          }

          &.delete {
            background: linear-gradient(135deg, #ff416c, #ff4b2b);
            color: #fff;

            &:hover {
              background: linear-gradient(135deg, #ff4b2b, #ff416c);
              transform: translateY(-2px);
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
            }
          }
        }
      }
    }
  }

  @media (max-width: 600px) {
    padding: 15px;

    .adItem {
      flex-direction: column;

      .adImg {
        width: 100%;
        height: 200px;
      }

      .adButtons {
        flex-direction: column;
        button {
          width: 100%;
        }
      }
    }
  }
`;
