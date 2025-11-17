import styled from "styled-components";

export const PageContainer = styled.div`
  background: radial-gradient(circle at top, #ffffff 0, #f4f4f4 45%, #e4e4e4 100%);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  font-family: "Inter", sans-serif;
`;

/* se você não usar PageTitle e ErrorMessage daqui, pode remover esses dois exports sem problema */
export const PageTitle = styled.h1`
  font-size: 40px;
  font-weight: 800;
  color: #2c2c2c;
  text-align: center;
  margin-bottom: 40px;
  user-select: none;
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
  max-width: 850px;
  width: 100%;
  margin: 60px auto 70px; /* respiro do header e do footer */
  display: flex;
  justify-content: center;
  animation: fadeIn 0.3s ease;

  form {
    width: 100%;
    background-color: #ffffff;
    border-radius: 18px;
    padding: 48px 56px 40px;
    box-shadow: 0 18px 50px rgba(0, 0, 0, 0.18);
    display: flex;
    flex-direction: column;
  }

  .form-title {
    font-size: 30px;
    font-weight: 800;
    color: #111827;
    text-align: center;
    margin-bottom: 32px;
    letter-spacing: -0.4px;
  }

  .area {
    margin-bottom: 22px;
    display: flex;
    flex-direction: column;

    &.checkbox-area {
      flex-direction: row;
      align-items: center;

      .area--title {
        margin-bottom: 0;
        margin-right: 10px;
      }

      .area--input {
        display: flex;
        align-items: center;
      }

      input[type="checkbox"] {
        width: 18px;
        height: 18px;
        accent-color: #302e2e;
        cursor: pointer;
      }
    }

    .area--title {
      font-weight: 600;
      font-size: 15px;
      margin-bottom: 6px;
      color: #374151;
    }

    .area--input {
      width: 100%;

      input,
      textarea,
      select,
      .price-input {
        width: 100%;
        font-size: 15px;
        padding: 12px 14px;
        border: 2px solid #d4d4d4;
        border-radius: 10px;
        outline: none;
        color: #111827;
        background-color: #ffffff;
        transition: border-color 0.25s ease, box-shadow 0.25s ease;

        &:focus {
          border-color: #111111;
          box-shadow: 0 0 0 1px #11111133;
        }
      }

      textarea {
        resize: vertical;
        min-height: 120px;
      }

      .existing-images {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;

        .image-item {
          position: relative;

          img {
            width: 110px;
            height: 110px;
            object-fit: cover;
            border-radius: 10px;
            border: 1px solid #ddd;
          }

          button {
            position: absolute;
            top: -6px;
            right: -6px;
            background-color: #ef4444;
            border: none;
            color: #ffffff;
            border-radius: 50%;
            width: 24px;
            height: 24px;
            font-size: 12px;
            cursor: pointer;
          }
        }
      }
    }
  }

  button {
    width: 100%;
    background-color: #111111;
    border: none;
    padding: 15px 0;
    border-radius: 999px;
    color: #ffffff;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    transition: 0.2s;
    box-shadow: 0 10px 28px rgba(0, 0, 0, 0.35);

    &:hover {
      background-color: #000000;
      transform: translateY(-1px);
      box-shadow: 0 14px 34px rgba(0, 0, 0, 0.45);
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
      box-shadow: none;
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 720px) {
    margin: 40px auto 50px;

    form {
      padding: 32px 20px 28px;
      border-radius: 16px;
    }

    .form-title {
      font-size: 26px;
    }
  }
`;
