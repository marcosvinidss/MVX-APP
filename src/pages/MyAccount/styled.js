// styled.js dentro da pasta da página MinhaConta
import styled from "styled-components";

export const PageArea = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  h1 {
    text-align: center;
    font-size: 28px;
    color: #302e2e;
    margin-bottom: 30px;
  }

  .user-info {
    display: flex;
    flex-direction: column;
    gap: 20px;

    p {
      font-size: 16px;
      color: #555;
      padding: 12px 20px;
      background-color: #f9f9f9;
      border: 1px solid #ddd;
      border-radius: 8px;

      strong {
        color: #302e2e;
        margin-right: 5px;
      }
    }
  }

  @media (max-width: 600px) {
    padding: 15px;

    h1 {
      font-size: 24px;
    }

    .user-info p {
      font-size: 15px;
      padding: 10px 15px;
    }
  }
`;
