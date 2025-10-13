import styled from "styled-components";

/* ======== CONTAINER PRINCIPAL ======== */
export const AdminContainer = styled.div`
  min-height: 100vh;
  background-color: #f7f8fa;
  padding: 40px 20px;
  font-family: "Inter", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  color: #302e2e;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

/* ======== WRAPPER CENTRALIZADO ======== */
export const PageWrapper = styled.div`
  max-width: 1100px;
  width: 100%;
  margin: 0 auto;
`;

/* ======== LOGO ======== */
export const LogoArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0 10px;

  img {
    height: 60px;
    width: auto;
    user-select: none;
  }
`;

/* ======== TÍTULO ======== */
export const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #302e2e;
  text-align: center;
  margin: 25px 0 35px;
  user-select: none;
`;

/* ======== ABAS SUPERIORES ======== */
export const TabHeader = styled.div`
  display: flex;
  justify-content: center;
  gap: 25px;
  margin-bottom: 30px;
  border-bottom: 2px solid #e0e0e0;
  padding-bottom: 10px;
`;

export const TabButton = styled.button`
  background: none;
  border: none;
  font-size: 16px;
  font-weight: ${(props) => (props.active ? "700" : "500")};
  color: ${(props) => (props.active ? "#302e2e" : "#888")};
  border-bottom: ${(props) => (props.active ? "3px solid #302e2e" : "none")};
  cursor: pointer;
  padding: 8px 12px;
  transition: all 0.3s ease;

  &:hover {
    color: #000;
  }
`;

/* ======== GRID PARA SEÇÕES LADO A LADO ======== */
export const DualSectionContainer = styled.div`
  display: flex;
  gap: 30px;
  margin-top: 20px;
  width: 100%;
  justify-content: space-between;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

/* ======== SEÇÃO PADRÃO ======== */
export const Section = styled.section`
  flex: 1;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
`;

/* ======== TÍTULO DAS SEÇÕES ======== */
export const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #302e2e;
  margin-bottom: 15px;
  text-align: center;
`;

/* ======== CAMPO DE PESQUISA ======== */
export const SearchInput = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1.8px solid #ddd;
  border-radius: 6px;
  font-size: 15px;
  margin-bottom: 15px;
  transition: 0.3s ease;

  &:focus {
    outline: none;
    border-color: #302e2e;
    box-shadow: 0 0 6px rgba(48, 46, 46, 0.3);
  }
`;

/* ======== TABELA PADRÃO ======== */
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 15px;

  th,
  td {
    padding: 12px 10px;
    border-bottom: 1px solid #e0e0e0;
    text-align: left;
  }

  th {
    font-weight: 700;
    background-color: #302e2e;
    color: #fff;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-size: 14px;
  }

  tr:hover td {
    background-color: #f4f4f4;
  }
`;

export const TableRow = styled.tr``;

export const TableHeader = styled.th``;

export const TableCell = styled.td`
  color: #302e2e;
`;

/* ======== BOTÃO EXCLUIR ======== */
export const DeleteButton = styled.button`
  border: none;
  border-radius: 6px;
  padding: 8px 12px;
  background-color: #e74c3c;
  color: #fff;
  cursor: pointer;
  font-size: 14px;
  transition: 0.3s ease;

  &:hover {
    background-color: #c0392b;
    box-shadow: 0 3px 8px rgba(231, 76, 60, 0.3);
  }
`;

/* ======== LOGIN ADMIN ======== */
export const AdminLoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f7f8fa;
`;

export const LoginBox = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 40px;
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.12);
  width: 400px;
  max-width: 90%;
  text-align: center;
`;

export const LoginTitle = styled.h2`
  font-size: 28px;
  font-weight: 700;
  color: #302e2e;
  margin-bottom: 30px;
  user-select: none;
`;

export const LoginInput = styled.input`
  width: 100%;
  font-size: 15px;
  padding: 12px 14px;
  border: 1.8px solid #ddd;
  border-radius: 6px;
  outline: none;
  margin-bottom: 20px;
  color: #302e2e;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    border-color: #302e2e;
    box-shadow: 0 0 8px rgba(48, 46, 46, 0.4);
  }
`;

export const LoginButton = styled.button`
  width: 100%;
  background-color: #302e2e;
  border: none;
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
`;

export const ErrorMsg = styled.p`
  color: #e74c3c;
  margin-top: 10px;
  font-size: 14px;
  font-weight: 500;
`;

export const FooterNote = styled.p`
  text-align: center;
  font-size: 14px;
  color: #777;
  margin-top: 20px;

  a {
    color: #302e2e;
    font-weight: 600;
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: #000;
      text-decoration: underline;
    }
  }
`;
