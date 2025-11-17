import styled from "styled-components";

export const AdminWrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  background-color: #e5e7eb;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 32px 16px;
  box-sizing: border-box;
`;

export const AdminContainer = styled.div`
  width: 100%;
  max-width: 1240px;
  background-color: #f7f8fa;
  border-radius: 20px;
  padding: 28px 24px 36px;
  font-family: "Inter", sans-serif;
  color: #302e2e;
  box-shadow: 0 14px 40px rgba(0, 0, 0, 0.12);
`;

export const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const LogoImg = styled.img`
  width: 120px;
  height: auto;
`;

export const LogoutBtn = styled.button`
  padding: 10px 16px;
  border-radius: 10px;
  border: none;
  background: #302e2e;
  color: #fff;
  cursor: pointer;
  font-weight: 700;
  font-size: 14px;
  transition: 0.25s;
  &:hover {
    background: #1f1c1c;
  }
`;

export const H1 = styled.h1`
  text-align: center;
  margin: 10px 0 24px;
  font-size: 28px;
  font-weight: 800;
`;

export const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
  margin-bottom: 24px;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const SummaryCard = styled.div`
  background: #ffffff;
  border-radius: 14px;
  padding: 18px 20px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SummaryValue = styled.div`
  font-size: 28px;
  font-weight: 800;
`;

export const SummaryLabel = styled.div`
  font-size: 13px;
  color: #666;
  margin-top: 4px;
`;

export const DualSectionContainer = styled.div`
  display: flex;
  gap: 24px;
  align-items: stretch;
  @media (max-width: 1000px) {
    flex-direction: column;
  }
`;

export const Section = styled.section`
  flex: 1;
  background-color: #ffffff;
  border-radius: 14px;
  padding: 18px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  min-height: 420px;
`;

export const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 800;
  color: #302e2e;
  margin-bottom: 12px;
  text-align: center;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 11px 12px;
  border: 1.6px solid #ddd;
  border-radius: 10px;
  font-size: 15px;
  margin-bottom: 14px;
  transition: 0.25s;
  &:focus {
    outline: none;
    border-color: #302e2e;
    box-shadow: 0 0 6px rgba(48, 46, 46, 0.25);
  }
`;

export const TableScroll = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;

  th,
  td {
    padding: 10px 9px;
    border-bottom: 1px solid #eee;
    text-align: left;
    vertical-align: top;
    word-break: break-word;
  }

  th {
    font-weight: 800;
    background-color: #302e2e;
    color: #fff;
    font-size: 12px;
    letter-spacing: 0.5px;
  }

  tr:hover td {
    background-color: #f6f7f8;
  }

  .idCell {
    white-space: nowrap;
    max-width: 170px;
    overflow: hidden;
    text-overflow: ellipsis;
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: 13px;
  }

  .detailsCell {
    max-width: 240px;
  }

  .adCell a {
    color: #107e8b;
    text-decoration: underline;
  }
`;

export const TableRow = styled.tr``;

export const TableHeader = styled.th``;

export const TableCell = styled.td``;

export const DangerButton = styled.button`
  border: none;
  border-radius: 8px;
  padding: 8px 11px;
  background-color: #e74c3c;
  color: #fff;
  cursor: pointer;
  font-size: 13px;
  font-weight: 700;
  transition: 0.2s;
  &:hover {
    background-color: #c0392b;
  }
`;

export const NeutralButton = styled.button`
  border: none;
  border-radius: 8px;
  padding: 7px 10px;
  background-color: #107e8b;
  color: #fff;
  cursor: pointer;
  font-size: 12px;
  font-weight: 700;
  transition: 0.2s;
  &:hover {
    filter: brightness(0.92);
  }
`;

export const Pill = styled.span`
  display: inline-block;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 800;
  text-transform: capitalize;
  background: #eee;
  color: #555;
  &[data-status="pendente"] {
    background: #fff2f0;
    color: #c0392b;
  }
  &[data-status="resolvido"] {
    background: #ecfff3;
    color: #1b8a4b;
  }
  &[data-status="em análise"] {
    background: #fff7e6;
    color: #9a6b00;
  }
`;

export const AdminLoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f7f8fa;
  font-family: "Inter", sans-serif;
`;

export const LoginBox = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  width: 400px;
  max-width: 90%;
  text-align: center;
`;

export const LogoArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px 0 18px;
  img {
    height: 60px;
    width: auto;
    user-select: none;
  }
`;

export const LoginTitle = styled.h2`
  font-size: 28px;
  font-weight: 800;
  color: #302e2e;
  margin-bottom: 24px;
  user-select: none;
`;

export const LoginInput = styled.input`
  width: 100%;
  font-size: 15px;
  padding: 12px 14px;
  border: 1.8px solid #ddd;
  border-radius: 10px;
  outline: none;
  margin-bottom: 16px;
  color: #302e2e;
  transition: border-color 0.3s, box-shadow 0.3s;
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
  border-radius: 10px;
  color: #fff;
  font-size: 17px;
  font-weight: 700;
  cursor: pointer;
  transition: 0.3s;
  box-shadow: 0 5px 15px rgba(48, 46, 46, 0.3);
  &:hover {
    background-color: #1f1c1c;
    box-shadow: 0 7px 20px rgba(31, 28, 28, 0.5);
  }
`;

export const ErrorMsg = styled.p`
  color: #e74c3c;
  margin: 6px 0 12px;
  font-size: 14px;
  font-weight: 700;
`;

export const FooterNote = styled.p`
  text-align: center;
  font-size: 14px;
  color: #777;
  margin-top: 16px;
  a {
    color: #302e2e;
    font-weight: 700;
    text-decoration: none;
    transition: 0.3s;
  }
  a:hover {
    color: #000;
    text-decoration: underline;
  }
`;
