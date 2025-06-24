import styled from "styled-components";

export const PageContainer = styled.div`
  padding: 40px 20px;
  background: linear-gradient(to bottom, #f4f4f4, #eaeaea);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const PageTitle = styled.h1`
  font-size: 40px;
  font-weight: 800;
  color: #2c2c2c;
  text-align: center;
  margin-bottom: 40px;
  user-select: none;
  letter-spacing: -0.5px;
`;

export const ErrorMessage = styled.div`
  margin-top: 15px;
  background-color: #ffe5e5;
  border: 1px solid #ff5c5c;
  padding: 12px 18px;
  border-radius: 8px;
  color: #b30000;
  font-weight: 600;
  max-width: 520px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  user-select: none;
`;

export const PageArea = styled.div`
  form {
    background-color: #ffffff;
    border-radius: 12px;
    padding: 40px 50px;
    box-shadow: 0 10px 32px rgba(0, 0, 0, 0.1);
    max-width: 540px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
  }

  .form-title {
    font-size: 32px;
    font-weight: 700;
    color: #2c2c2c;
    text-align: center;
    margin-bottom: 30px;
    user-select: none;
  }

  .area {
    display: flex;
    flex-direction: column;
    margin-bottom: 24px;

    &.checkbox-area {
      flex-direction: row;
      align-items: center;
      margin-top: 12px;

      .area--title {
        width: auto;
        margin-right: 10px;
        font-size: 15px;
        color: #444;
      }

      .area--input {
        flex: none;

        input[type="checkbox"] {
          width: 16px;
          height: 16px;
          accent-color: #302e2e;
          cursor: pointer;
        }
      }
    }

    .area--title {
      font-weight: 600;
      font-size: 16px;
      margin-bottom: 6px;
      color: #333;
    }

    .area--input {
      input[type="text"],
      input[type="email"],
      input[type="password"],
      textarea {
        width: 100%;
        font-size: 15px;
        padding: 12px 14px;
        border: 2px solid #ddd;
        border-radius: 8px;
        outline: none;
        color: #302e2e;
        background-color: #fff;
        transition: all 0.3s ease;

        &:focus {
          border-color: #302e2e;
          box-shadow: 0 0 10px rgba(48, 46, 46, 0.3);
        }
      }

      textarea {
        resize: vertical;
        min-height: 100px;
      }
    }
  }

  .area:last-child .area--input {
    width: 100%;
  }

  button {
    width: 100%;
    background-color: #302e2e;
    border: none;
    padding: 15px 0;
    border-radius: 10px;
    color: #fff;
    font-size: 16.5px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
    box-shadow: 0 6px 18px rgba(48, 46, 46, 0.25);

    &:hover {
      background-color: #1f1c1c;
      box-shadow: 0 8px 24px rgba(31, 28, 28, 0.35);
    }
  }

  .signup-link {
    margin-top: 30px;
    text-align: center;
    font-size: 14px;
    color: #666;
    user-select: none;

    a {
      color: #302e2e;
      font-weight: 600;
      margin-left: 6px;
      text-decoration: none;
      transition: color 0.3s ease;

      &:hover {
        color: #000;
        text-decoration: underline;
      }
    }
  }

  @media (max-width: 600px) {
    form {
      padding: 30px 20px;
    }

    .form-title {
      font-size: 28px;
    }

    .area--input input,
    .area--input textarea {
      font-size: 14px;
    }

    button {
      font-size: 15px;
    }
  }
`;
