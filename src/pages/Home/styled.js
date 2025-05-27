import styled from "styled-components";

export const SearchArea = styled.div`
  background-color: #f7f7f7;
  border-bottom: 1px solid #ccc;
  padding: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  .searchBox {
    width: 1000px;
    display: flex;
    align-items: center;
    justify-content: center;

    form {
      display: flex;
      gap: 10px;
      width: 100%;

      input[type="text"] {
        flex: 1 1 60%;
        padding: 18px 15px;
        font-size: 16px;
        border: 1.5px solid #ccc;
        border-radius: 6px;
        outline: none;
        color: #302e2e;
        background-color: white;
        transition: border-color 0.3s ease;

        &:focus {
          border-color: #302e2e;
          box-shadow: 0 0 8px rgba(48, 46, 46, 0.3);
        }
      }

      select {
        flex: 1 1 20%;
        padding: 18px 40px 18px 15px;
        font-size: 16px;
        border: 1.5px solid #ccc;
        border-radius: 6px;
        outline: none;
        color: #302e2e;
        background-color: white;
        appearance: none;
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='10' height='7'%3e%3cpath fill='%23302E2E' d='M0 0l5 7 5-7z'/%3e%3c/svg%3e");
        background-repeat: no-repeat;
        background-position: calc(100% - 12px) center;
        background-size: 10px 7px;
        transition: border-color 0.3s ease;

        &:focus {
          border-color: #302e2e;
          box-shadow: 0 0 8px rgba(48, 46, 46, 0.3);
        }
      }

      button {
        flex: 1 1 20%;
        background-color: #302e2e;
        color: white;
        border: none;
        padding: 18px 0;
        font-size: 16px;
        font-weight: 400;
        border-radius: 6px;
        cursor: pointer;
        transition: background-color 0.3s ease;

        &:hover {
          background-color: #1f1c1c;
        }
      }
    }
  }

  @media (max-width: 1024px) {
    .searchBox {
      width: 90%;
    }
  }

  @media (max-width: 600px) {
    padding: 15px 10px;

    .searchBox form {
      flex-direction: column;

      input[type="text"],
      select,
      button {
        width: 100%;
        margin-bottom: 10px;
        flex-basis: auto;
        padding: 18px 15px;
      }

      button {
        margin-bottom: 0;
      }
    }
  }
`;

export const PageArea = styled.div`
  h2 {
    font-size: 24px;
    font-weight: 500;
    color: #555;
    text-align: center;
    margin: 30px 0 15px;
  }

  .list {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
  }

  .seeAllLink {
    color: #302e2e;
    text-decoration: none;
    font-weight: 600;
    display: inline-block;
    margin-top: 10px;
    text-align: center;
  }

  hr {
    margin: 30px 0;
  }

  p {
    color: #666;
    font-size: 14px;
    max-width: 1000px;
    margin: 20px auto;
    text-align: center;
  }
`;

export const CategoryGrid = styled.div`
  margin-top: 30px;
  width: 100%;
  max-width: 1000px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 16px;
  padding: 10px;

  .categoryItem {
    background-color: #302e2e;
    border-radius: 50%;
    width: 80px;
    height: 80px;
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    font-size: 12px;
    font-weight: 500;
    padding: 10px;
    text-align: center;

    img, svg {
      width: 28px;
      height: 28px;
      margin-bottom: 6px;
      fill: #fff;
    }

    span {
      font-size: 13px;
      color: #fff;
      font-weight: 500;
    }

    &:hover {
      transform: scale(1.05);
      background-color: #1f1c1c;
    }
  }

  @media (max-width: 600px) {
    .categoryItem {
      width: 70px;
      height: 70px;

      img, svg {
        width: 24px;
        height: 24px;
      }

      span {
        font-size: 11px;
      }
    }
  }
`;

// AdItem styles - pode ficar em um arquivo separado, ex: components/partials/styled.js
export const Item = styled.div`
  width: 100%;
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  overflow: hidden;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.02);
  }

  a {
    display: flex;
    align-items: center;
    gap: 20px;
    text-decoration: none;
    color: inherit;
    padding: 10px;
  }

  .itemImage {
    flex-shrink: 0;
    width: 180px;
    height: 120px;
    background-color: #f2f2f2;
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  }

  .itemInfo {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .itemName {
    font-size: 20px;
    font-weight: 600;
    color: #302E2E;
    margin-bottom: 8px;
  }

  .itemPrice {
    font-size: 16px;
    color: #555;
  }
`;
