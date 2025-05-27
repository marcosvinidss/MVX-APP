import styled from "styled-components";

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
    text-decoration: none;
    padding: 10px;
    color: inherit;
    display: flex;             /* layout horizontal */
    align-items: center;       /* vertical align */
    gap: 20px;                 /* espaço entre imagem e infos */
  }

  .itemImage {
    flex-shrink: 0;            /* não encolhe */
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
    flex: 1;                   /* ocupa o restante do espaço */
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

export const PageArea = styled.div`
  .list {
    width: 1000px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
`;
