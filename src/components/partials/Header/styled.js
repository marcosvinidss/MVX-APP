import styled from "styled-components";

export const HeaderArea = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap');

  font-family: 'Open Sans', sans-serif;
  background-color: #FFF;
  height: 60px;
  border-bottom: 1px solid #CCC;

  .container {
    max-width: 1000px;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;

    a {
      text-decoration: none;
      color: inherit;
    }
  }

  .logo {
    display: flex;
    align-items: center;
  }

  .logo img {
    height: 40px;
    width: auto;
  }

  nav {
    padding: 10px 0;

    ul,
    li {
      margin: 0;
      padding: 0;
      list-style: none;
    }

    ul {
      display: flex;
      align-items: center;
      height: 40px;
    }

    li {
      margin: 0 20px;

      a, button {
        border:0;
        background:none;
        cursor:pointer;
        color: #302E2E;
        font-size: 14px;
        font-weight: 600;

        &:hover {
          color: #999;
        }

        &.button {
          background-color: #302E2E;
          border-radius: 6px;
          color: #FFF;
          padding: 10px 20px;
          font-size: 15px;

          &:hover {
            background-color: #504D4D;
          }
        }
      }
    }
  }
`;
