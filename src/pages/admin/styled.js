import styled from "styled-components";

export const AdminWrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  background: radial-gradient(circle at top, #eef2ff 0, #e5e7eb 40%, #d1d5db 100%);
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
  border-radius: 24px;
  padding: 28px 24px 36px;
  font-family: "Inter", sans-serif;
  color: #302e2e;
  box-shadow: 0 18px 50px rgba(15, 23, 42, 0.25);
  border: 1px solid rgba(148, 163, 184, 0.3);
`;

export const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const LogoImg = styled.img`
  width: 130px;
  height: auto;
`;

export const LogoutBtn = styled.button`
  padding: 10px 18px;
  border-radius: 999px;
  border: none;
  background: #302e2e;
  color: #fff;
  cursor: pointer;
  font-weight: 700;
  font-size: 14px;
  transition: 0.25s;
  box-shadow: 0 10px 25px rgba(17, 24, 39, 0.3);
  &:hover {
    background: #1f1c1c;
    transform: translateY(-1px);
    box-shadow: 0 14px 32px rgba(15, 23, 42, 0.45);
  }
`;

export const H1 = styled.h1`
  text-align: center;
  margin: 6px 0 22px;
  font-size: 26px;
  font-weight: 800;
  letter-spacing: 0.03em;
`;

export const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
  margin-bottom: 24px;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const SummaryCard = styled.div`
  background: linear-gradient(135deg, #ffffff 0%, #f3f4f6 60%, #e5e7eb 100%);
  border-radius: 18px;
  padding: 18px 20px;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.18);
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid rgba(209, 213, 219, 0.8);
`;

export const SummaryValue = styled.div`
  font-size: 28px;
  font-weight: 800;
`;

export const SummaryLabel = styled.div`
  font-size: 13px;
  color: #6b7280;
  margin-top: 4px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
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
  border-radius: 18px;
  padding: 18px;
  box-shadow: 0 10px 32px rgba(15, 23, 42, 0.16);
  display: flex;
  flex-direction: column;
  min-height: 420px;
  border: 1px solid rgba(229, 231, 235, 0.9);
`;

export const SectionTitle = styled.h2`
  font-size: 17px;
  font-weight: 800;
  color: #111827;
  margin-bottom: 10px;
  text-align: left;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 11px 12px;
  border: 1.6px solid #e5e7eb;
  border-radius: 999px;
  font-size: 14px;
  margin-bottom: 14px;
  transition: 0.25s;
  background-color: #f9fafb;
  &:focus {
    outline: none;
    border-color: #107e8b;
    box-shadow: 0 0 0 3px rgba(16, 126, 139, 0.18);
    background-color: #ffffff;
  }
`;

export const TableScroll = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  border-radius: 14px;
  border: 1px solid #e5e7eb;
  background-color: #ffffff;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;

  th,
  td {
    padding: 10px 10px;
    border-bottom: 1px solid #f3f4f6;
    text-align: left;
    vertical-align: top;
    word-break: break-word;
  }

  thead tr {
    background: #111827;
  }

  th {
    font-weight: 700;
    color: #f9fafb;
    font-size: 11px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  tbody tr:last-child td {
    border-bottom: none;
  }

  tbody tr:hover td {
    background-color: #f9fafb;
  }

  tbody tr.clickable-report-row:hover td {
    background: linear-gradient(90deg, #f9fafb 0, #eef2ff 100%);
  }

  .idCell {
    white-space: nowrap;
    max-width: 170px;
    overflow: hidden;
    text-overflow: ellipsis;
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: 12px;
    color: #4b5563;
  }

  .detailsCell {
    max-width: 260px;
  }

  .adCell a {
    color: #107e8b;
    text-decoration: underline;
    font-weight: 600;
  }
`;

export const TableRow = styled.tr``;

export const TableHeader = styled.th``;

export const TableCell = styled.td``;

export const DangerButton = styled.button`
  border: none;
  border-radius: 999px;
  padding: 7px 12px;
  background-color: #ef4444;
  color: #fff;
  cursor: pointer;
  font-size: 12px;
  font-weight: 700;
  transition: 0.2s;
  box-shadow: 0 6px 18px rgba(248, 113, 113, 0.45);
  &:hover {
    background-color: #b91c1c;
    transform: translateY(-0.5px);
  }
`;

export const NeutralButton = styled.button`
  border: none;
  border-radius: 999px;
  padding: 7px 12px;
  background-color: #107e8b;
  color: #fff;
  cursor: pointer;
  font-size: 11px;
  font-weight: 700;
  transition: 0.2s;
  box-shadow: 0 5px 16px rgba(16, 126, 139, 0.45);
  white-space: nowrap;
  &:hover {
    filter: brightness(0.92);
    transform: translateY(-0.5px);
  }
`;

export const Pill = styled.span`
  display: inline-block;
  padding: 5px 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 800;
  text-transform: capitalize;
  background: #e5e7eb;
  color: #374151;

  &[data-status="pendente"] {
    background: #fef2f2;
    color: #b91c1c;
  }
  &[data-status="resolvido"] {
    background: #ecfdf3;
    color: #15803d;
  }
  &[data-status="em análise"] {
    background: #fffbeb;
    color: #92400e;
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
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 12px 32px rgba(15, 23, 42, 0.3);
  width: 400px;
  max-width: 90%;
  text-align: center;
  border: 1px solid rgba(209, 213, 219, 0.9);
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
  font-size: 26px;
  font-weight: 800;
  color: #111827;
  margin-bottom: 24px;
  user-select: none;
`;

export const LoginInput = styled.input`
  width: 100%;
  font-size: 15px;
  padding: 12px 14px;
  border: 1.8px solid #e5e7eb;
  border-radius: 10px;
  outline: none;
  margin-bottom: 16px;
  color: #111827;
  transition: border-color 0.3s, box-shadow 0.3s;
  background-color: #f9fafb;
  &:focus {
    border-color: #107e8b;
    box-shadow: 0 0 0 3px rgba(16, 126, 139, 0.2);
    background-color: #ffffff;
  }
`;

export const LoginButton = styled.button`
  width: 100%;
  background-color: #302e2e;
  border: none;
  padding: 14px 0;
  border-radius: 999px;
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: 0.3s;
  box-shadow: 0 10px 28px rgba(17, 24, 39, 0.4);
  &:hover {
    background-color: #1f1c1c;
    transform: translateY(-1px);
    box-shadow: 0 14px 36px rgba(15, 23, 42, 0.65);
  }
`;

export const ErrorMsg = styled.p`
  color: #ef4444;
  margin: 6px 0 12px;
  font-size: 14px;
  font-weight: 700;
`;

export const FooterNote = styled.p`
  text-align: center;
  font-size: 14px;
  color: #6b7280;
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

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.45);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  padding: 16px;
`;

export const ModalContent = styled.div`
  width: 100%;
  max-width: 780px;
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0 22px 60px rgba(15, 23, 42, 0.45);
  padding: 22px 22px 18px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  border: 1px solid rgba(209, 213, 219, 0.9);
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 4px;
`;

export const ModalTitle = styled.h2`
  font-size: 18px;
  font-weight: 800;
  color: #111827;
`;

export const CloseButton = styled.button`
  border: none;
  background: #f3f4f6;
  font-size: 12px;
  color: #4b5563;
  cursor: pointer;
  padding: 6px 12px;
  border-radius: 999px;
  transition: background-color 0.15s ease, color 0.15s ease, transform 0.1s;
  font-weight: 600;
  &:hover {
    background-color: #e5e7eb;
    color: #111827;
    transform: translateY(-0.5px);
  }
`;

export const ModalBody = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 1.2fr);
  gap: 18px;
  margin-top: 4px;
  @media (max-width: 780px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const ModalFieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ModalField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

export const ModalFieldLabel = styled.span`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #6b7280;
`;

export const ModalFieldValue = styled.span`
  font-size: 13px;
  color: #111827;
  word-break: break-word;
  a {
    color: #107e8b;
    text-decoration: underline;
    font-weight: 600;
  }
`;

export const ModalDivider = styled.div`
  height: 1px;
  width: 100%;
  background: linear-gradient(90deg, transparent 0, #e5e7eb 20%, #e5e7eb 80%, transparent 100%);
  margin: 4px 0;
`;

export const ModalTagRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

export const TagChip = styled.span`
  font-size: 11px;
  padding: 4px 8px;
  border-radius: 999px;
  background-color: #f3f4f6;
  color: #4b5563;
  font-weight: 600;
`;
