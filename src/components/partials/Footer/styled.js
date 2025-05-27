import styled from "styled-components";

export const FooterArea = styled.footer`
  background-color: #302e2e;
  color: #eee;
  padding: 20px 0;
  font-family: 'Arial', sans-serif;
  font-size: 14px;

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;

    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  }

  .logo {
    font-weight: 700;
    font-size: 22px;
    color: #FFF; /* cor de destaque */
    user-select: none;
  }

  .links {
    display: flex;
    gap: 15px;

    a {
      color: #eee;
      text-decoration: none;
      transition: color 0.3s ease;

      &:hover {
        color: #ff6600;
      }
    }
  }

  .copyright {
    flex-basis: 100%;
    margin-top: 10px;
    text-align: center;
    font-size: 13px;
    color: #bbb;
  }

  @media (max-width: 600px) {
    .container {
      flex-direction: column;
      align-items: center;
      gap: 10px;
    }

    .links {
      justify-content: center;
    }
  }
`;
