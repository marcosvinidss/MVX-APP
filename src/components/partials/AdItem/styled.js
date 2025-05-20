import styled from "styled-components";

export const Item = styled.div`
  width: 200px;
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  overflow: hidden;
  transition: transform 0.2s;
  flex-shrink: 0;

  &:hover {
    transform: scale(1.02);
  }

  a {
    text-decoration: none;
    color: inherit;
    display: block;
  }

  .itemImage {
    width: 100%;
    height: 150px;
    background-color: #f2f2f2;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .itemName {
    font-size: 16px;
    font-weight: bold;
    color: #302E2E;
    text-align: center;
    margin: 10px 0 4px;
  }

  .itemPrice {
    font-size: 14px;
    color: #777;
    text-align: center;
    margin-bottom: 10px;
  }
`;
