import styled from 'styled-components';

export const PageArea = styled.div`
  max-width: 500px;
  margin: 50px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 0 8px rgba(0,0,0,0.2);

  h1 {
    text-align: center;
    color: #222;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  label span {
    font-weight: bold;
    margin-bottom: 5px;
  }

  input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 6px;
  }

  button {
    background-color: #0077ff;
    color: #fff;
    border: none;
    padding: 12px;
    border-radius: 6px;
    cursor: pointer;
    transition: 0.2s;
  }

  button:hover {
    background-color: #005fd1;
  }

  .error {
    color: red;
    text-align: center;
  }

  .admin-menu {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .admin-menu button {
    background-color: #222;
    color: #fff;
  }
`;
