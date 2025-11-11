import styled from "styled-components";

/* ===== CONTAINER GERAL ===== */
export const AdminContainer = styled.div`
  min-height: 100vh;
  background-color: #f7f8fa;
  padding: 32px 24px 48px;   /* + respiro */
  font-family: "Inter", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  color: #302e2e;
  max-width: 1240px;         /* centralizado e confortável */
  margin: 0 auto;
`;

/* ===== TOP BAR ===== */
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
`;

/* ===== TÍTULO ===== */
export const H1 = styled.h1`
  text-align: center;
  margin: 10px 0 22px;
  font-size: 28px;
  font-weight: 800;
`;

/* ===== CARDS RESUMO ===== */
export const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
  margin-bottom: 22px;
  @media (max-width: 900px) { grid-template-columns: 1fr; }
`;
export const SummaryCard = styled.div`
  background: #fff;
  border-radius: 14px;
  padding: 18px 20px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.08);
  display: flex; flex-direction: column; align-items: center;
`;
export const SummaryValue = styled.div` font-size: 28px; font-weight: 800;`;
export const SummaryLabel = styled.div` font-size: 13px; color: #666; margin-top: 4px;`;

/* ===== GRID 2 COLUNAS ===== */
export const DualSectionContainer = styled.div`
  display: flex;
  gap: 26px;                 /* + respiro */
  align-items: stretch;
  @media (max-width: 1000px) { flex-direction: column; }
`;

/* ===== SEÇÃO ===== */
export const Section = styled.section`
  flex: 1;
  background-color: #fff;
  border-radius: 14px;
  padding: 18px;             /* + respiro */
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  display: flex; flex-direction: column;
`;

/* ===== TÍTULO SEÇÃO ===== */
export const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 800;
  color: #302e2e;
  margin-bottom: 12px;
  text-align: center;
`;

/* ===== BUSCA ===== */
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
    box-shadow: 0 0 6px rgba(48,46,46,0.25);
  }
`;

/* ===== WRAPPER DE SCROLL DA TABELA ===== */
export const TableScroll = styled.div`
  width: 100%;
  overflow: auto;            /* evita “espremer” a tabela */
`;

/* ===== TABELA ===== */
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;       /* colgroup passa a valer */
  font-size: 15px;

  th, td {
    padding: 12px 10px;
    border-bottom: 1px solid #eee;
    text-align: left;
    vertical-align: top;
  }

  th {
    font-weight: 800;
    background-color: #302e2e;
    color: #fff;
    text-transform: uppercase;
    letter-spacing: .4px;
    font-size: 13px;
  }

  tr:hover td { background-color: #f6f7f8; }

  /* utilitários */
  .nowrap { white-space: nowrap; }
  .idCell {
    white-space: nowrap;         /* não quebrar */
    max-width: 180px;            /* largura mínima decente */
    overflow: hidden;
    text-overflow: ellipsis;     /* reticências */
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  }
  .detailsCell { max-width: 260px; white-space: pre-wrap; }
  .adCell a { color: #107E8B; text-decoration: underline; }
`;

export const TableRow = styled.tr``;
export const TableHeader = styled.th``;
export const TableCell = styled.td` color: #302e2e;`;

/* ===== AÇÕES ===== */
export const ActionRow = styled.div` display: flex; gap: 8px; flex-wrap: wrap;`;
export const DangerButton = styled.button`
  border: none; border-radius: 10px; padding: 9px 12px;
  background-color: #e74c3c; color: #fff; cursor: pointer;
  font-size: 14px; font-weight: 800; transition: .2s;
  &:hover { background-color: #c0392b; }
`;
export const NeutralButton = styled.button`
  border: none; border-radius: 10px; padding: 9px 12px;
  background-color: #107E8B; color: #fff; cursor: pointer;
  font-size: 14px; font-weight: 800; transition: .2s;
  &:hover { filter: brightness(.92); }
`;

/* ===== STATUS PILL ===== */
export const Pill = styled.span`
  display: inline-block; padding: 6px 10px; border-radius: 999px;
  font-size: 12px; font-weight: 800; text-transform: capitalize;
  background: #eee; color: #555;
  &[data-status="pendente"] { background: #fff2f0; color: #c0392b; }
  &[data-status="resolvido"] { background: #ecfff3; color: #1b8a4b; }
  &[data-status="em análise"] { background: #fff7e6; color: #9a6b00; }
`;

/* ===== PAGINAÇÃO (se usar) ===== */
export const Pager = styled.div`
  display: flex; gap: 12px; align-items: center; justify-content: center;
  margin-top: 12px; font-weight: 700;
`;
export const PagerBtn = styled.button`
  padding: 8px 12px; border: 1px solid #ddd; border-radius: 10px; background: #fff; cursor: pointer;
  &:disabled { opacity: .5; cursor: not-allowed; }
`;

/* ===== LINK PEQUENO ===== */
export const SmallLink = styled.span`
  color: #107E8B; cursor: pointer; text-decoration: underline; word-break: break-word;
`;

/* ====== (mantidos) estilos da tela de login ====== */
export const AdminLoginContainer = styled.div`
  display: flex; flex-direction: column; justify-content: center; align-items: center;
  height: 100vh; background-color: #f7f8fa;
`;
export const LoginBox = styled.div`
  background-color: #fff; border-radius: 12px; padding: 40px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.12); width: 400px; max-width: 90%; text-align: center;
`;
export const LogoArea = styled.div`
  display: flex; justify-content: center; align-items: center; padding: 6px 0 18px;
  img { height: 60px; width: auto; user-select: none; }
`;
export const LoginTitle = styled.h2`
  font-size: 28px; font-weight: 800; color: #302e2e; margin-bottom: 24px; user-select: none;
`;
export const LoginInput = styled.input`
  width: 100%; font-size: 15px; padding: 12px 14px; border: 1.8px solid #ddd; border-radius: 10px;
  outline: none; margin-bottom: 16px; color: #302e2e; transition: border-color .3s, box-shadow .3s;
  &:focus { border-color: #302e2e; box-shadow: 0 0 8px rgba(48,46,46,.4); }
`;
export const LoginButton = styled.button`
  width: 100%; background-color: #302e2e; border: none; padding: 14px 0; border-radius: 10px;
  color: #fff; font-size: 17px; font-weight: 700; cursor: pointer; transition: .3s; box-shadow: 0 5px 15px rgba(48,46,46,.3);
  &:hover { background-color: #1f1c1c; box-shadow: 0 7px 20px rgba(31,28,28,.5); }
`;
export const ErrorMsg = styled.p` color: #e74c3c; margin: 6px 0 12px; font-size: 14px; font-weight: 700;`;
export const FooterNote = styled.p`
  text-align: center; font-size: 14px; color: #777; margin-top: 16px;
  a { color: #302e2e; font-weight: 700; text-decoration: none; transition: .3s;
    &:hover { color: #000; text-decoration: underline; }
  }
`;
