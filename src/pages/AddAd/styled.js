import styled from "styled-components";

export const PageContainer = styled.div`
  padding: 20px;
  background-color: #f4f4f4;
  min-height: 100vh;
`;

export const PageTitle = styled.h1`
  font-size: 36px;
  font-weight: 700;
  color: #302E2E;
  text-align: center;
  margin-bottom: 30px;
  user-select: none;
`;

export const ErrorMessage = styled.div`
  margin-top: 15px;
  background-color: #ffdddd;
  border: 1px solid #ff5c5c;
  padding: 10px 15px;
  border-radius: 6px;
  color: #b30000;
  font-weight: 600;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  user-select: none;
`;

export const PageArea = styled.div`
  form {
    background-color: #fff;
    border-radius: 8px;
    padding: 30px 40px 40px;
    box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.12);
    max-width: 500px;
    margin: 40px auto;
    min-height: 520px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
  }

  .form-title {
    font-size: 34px;
    font-weight: 700;
    color: #302E2E;
    text-align: center;
    margin-bottom: 30px;
    user-select: none;
  }

  .area {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;

    &.checkbox-area {
      flex-direction: row;
      align-items: center;
      margin-bottom: 30px;

      .area--title {
        width: auto;
        margin-right: 10px;
        text-align: left;
        font-weight: normal;
        font-size: 15px;
        user-select: none;
      }

      .area--input {
        flex: none;

        input[type="checkbox"] {
          width: 14px;
          height: 14px;
          accent-color: #302E2E;
          cursor: pointer;
          margin: 0;
        }
      }
    }

    .area--title {
      font-weight: 700;
      font-size: 16px;
      margin-bottom: 8px;
      color: #302E2E;
      user-select: none;
    }

    .area--input {
      input[type="text"],
      input[type="email"],
      input[type="password"],
      textarea {
        width: 100%;
        font-size: 15px;
        padding: 10px 12px;
        border: 1.8px solid #ddd;
        border-radius: 6px;
        outline: none;
        transition: border-color 0.3s ease, box-shadow 0.3s ease;
        color: #302E2E;

        &:focus {
          border-color: #302E2E;
          box-shadow: 0 0 8px rgba(48, 46, 46, 0.4);
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
    background-color: #302E2E;
    border: none;
    outline: none;
    padding: 14px 0;
    border-radius: 8px;
    color: #fff;
    font-size: 17px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s ease;
    box-shadow: 0 5px 15px rgba(48, 46, 46, 0.3);

    &:hover {
      background-color: #1f1c1c;
      box-shadow: 0 7px 20px rgba(31, 28, 28, 0.5);
    }
  }

  .signup-link {
    margin-top: 25px;
    text-align: center;
    font-size: 14px;
    color: #666;
    text-decoration:none;

    a {
      color: #302E2E;
      font-weight: 600;
      text-decoration: none;
      margin-left: 5px;
      transition: color 0.3s ease;

      &:hover {
        color: #000;
        text-decoration: underline;
      }
    }
  }
`;
