import styled from "styled-components";

export const PageArea = styled.div`
  display: flex;
  margin-top: 20px;
  gap: 20px;

  .leftSide {
    width: 250px;
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 10px;

    .filterName {
      font-size: 16px;
      font-weight: bold;
      margin: 15px 0 5px 0;
      color: #302e2e;
    }

    input, select {
      width: 100%;
      height: 40px;
      border: 1px solid #ccc;
      border-radius: 8px;
      padding: 0 10px;
      font-size: 14px;
      margin-bottom: 15px;
      background-color: #fff;
    }

    ul {
      list-style: none;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 10px;

      .categoryItem {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px;
        border-radius: 8px;
        cursor: pointer;
        background-color: #fff;
        transition: background-color 0.2s, border 0.2s;

        span {
          font-size: 14px;
          color: #302e2e;
        }

        &:hover {
          background-color: #e1e1e1;
        }

        &.active {
          background-color: #302e2e;
          color: #fff;

          span {
            color: #fff;
          }
        }
      }
    }
  }

  .rightSide {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 15px;

    .adItem {
      display: flex;
      align-items: center;
      padding: 15px;
      border: 1px solid #ddd;
      border-radius: 10px;
      background-color: #fff;
      box-shadow: 0 2px 5px rgba(0,0,0,0.05);
      transition: box-shadow 0.2s;

      &:hover {
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      }

      img {
        width: 120px;
        height: 90px;
        object-fit: cover;
        border-radius: 8px;
        margin-right: 15px;
      }

      .info {
        display: flex;
        flex-direction: column;

        .title {
          font-size: 16px;
          font-weight: bold;
          color: #302e2e;
          margin-bottom: 5px;
        }

        .price {
          font-size: 14px;
          color: #00a650;
        }
      }
    }
  }
`;
