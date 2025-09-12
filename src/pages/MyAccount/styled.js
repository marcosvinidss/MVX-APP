import styled from "styled-components";

export const PageArea = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 25px;
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

    label {
      display: flex;
      flex-direction: column;
      font-size: 16px;
      color: #302e2e;

      strong {
        margin-bottom: 6px;
      }

      input,
      select {
        padding: 10px 12px;
        border: 1px solid #ccc;
        border-radius: 6px;
        font-size: 15px;
        background: #fff;

        &:focus {
          border-color: #302e2e;
          outline: none;
        }
      }

      select {
        cursor: pointer;
      }
    }
  }

  .feedback {
    margin: 15px 0;
    text-align: center;
    font-weight: 600;
    color: green;
  }

  .edit-button {
    display: block;
    width: 100%;
    max-width: 200px;
    margin: 30px auto 0;
    padding: 12px 20px;
    background-color: #302e2e;
    color: #fff;
    font-size: 16px;
    font-weight: 600;
    text-align: center;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #1f1d1d;
    }
  }

  @media (max-width: 600px) {
    padding: 15px;

    h1 {
      font-size: 24px;
    }

    .edit-button {
      width: 100%;
      font-size: 15px;
    }

    .user-info label {
      font-size: 15px;

      input,
      select {
        font-size: 14px;
        padding: 8px 10px;
      }
    }
  }
`;
