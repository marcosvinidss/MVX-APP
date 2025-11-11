import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AdminContainer,
  TopBar,
  LogoImg,
  LogoutBtn,
  H1,
  SummaryGrid,
  SummaryCard,
  SummaryLabel,
  SummaryValue,
  DualSectionContainer,
  Section,
  SectionTitle,
  SearchInput,
  TableScroll,
  Table,
  TableRow,
  TableHeader,
  TableCell,
  DangerButton,
  NeutralButton,
  Pill,
} from "./styled";

const API =
  (import.meta && import.meta.env && import.meta.env.VITE_API_URL) ||
  process.env.REACT_APP_API_URL ||
  "http://localhost:5000";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchUser, setSearchUser] = useState("");
  const [searchReport, setSearchReport] = useState("");

  const requireAdmin = () => {
    const t = localStorage.getItem("adminToken");
    if (!t) {
      navigate("/admin/login", { replace: true });
      return null;
    }
    return t;
  };

  const loadData = async () => {
    const token = requireAdmin();
    if (!token) return;
    try {
      setLoading(true);
      setError("");
      const [usersRes, reportsRes] = await Promise.all([
        fetch(`${API}/admin/users`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`${API}/admin/reports`, { headers: { Authorization: `Bearer ${token}` } }),
      ]);
      const usersJson = await usersRes.json();
      const reportsJson = await reportsRes.json();
      setUsers(Array.isArray(usersJson) ? usersJson : usersJson?.users || []);
      setReports(Array.isArray(reportsJson) ? reportsJson : reportsJson?.reports || []);
    } catch (err) {
      console.error(err);
      setError("Erro ao carregar os dados do servidor.");
    } finally {
      setLoading(false);
    }
  };

  const handleBanUser = async (id) => {
    const token = requireAdmin();
    if (!token) return;
    if (!window.confirm("Tem certeza que deseja banir este usuário?")) return;
    try {
      const res = await fetch(`${API}/admin/user/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Erro ao banir usuário");
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch {
      alert("Erro ao banir usuário.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminData");
    navigate("/admin/login", { replace: true });
  };

  useEffect(() => {
    if (!localStorage.getItem("adminToken")) {
      navigate("/admin/login", { replace: true });
      return;
    }
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredUsers = useMemo(
    () =>
      users.filter(
        (u) =>
          u.name?.toLowerCase().includes(searchUser.toLowerCase()) ||
          u.email?.toLowerCase().includes(searchUser.toLowerCase())
      ),
    [users, searchUser]
  );

  const filteredReports = useMemo(
    () =>
      reports.filter((r) => {
        const needle = searchReport.toLowerCase();
        return (
          r.reporter?.name?.toLowerCase().includes(needle) ||
          r.reportedUser?.name?.toLowerCase().includes(needle) ||
          r.reason?.toLowerCase().includes(needle) ||
          r.status?.toLowerCase().includes(needle)
        );
      }),
    [reports, searchReport]
  );

  if (loading) return <AdminContainer>Carregando dados...</AdminContainer>;
  if (error) return <AdminContainer><p style={{ color: "red" }}>{error}</p></AdminContainer>;

  /* contadores para os cards */
  const usersCount = users.length;
  const pendingCount = reports.filter((r) => (r.status || "pendente") === "pendente").length;
  const resolvedCount = reports.filter((r) => r.status === "resolvido").length;

  return (
    <AdminContainer>
      <TopBar>
        <LogoImg src="/img/MVX.png" alt="MVX" />
        <LogoutBtn onClick={handleLogout}>Sair</LogoutBtn>
      </TopBar>

      <H1>Painel Administrativo</H1>

      <SummaryGrid>
        <SummaryCard>
          <SummaryValue>{usersCount}</SummaryValue>
          <SummaryLabel>Usuários ativos</SummaryLabel>
        </SummaryCard>
        <SummaryCard>
          <SummaryValue>{pendingCount}</SummaryValue>
          <SummaryLabel>Denúncias pendentes</SummaryLabel>
        </SummaryCard>
        <SummaryCard>
          <SummaryValue>{resolvedCount}</SummaryValue>
          <SummaryLabel>Denúncias resolvidas</SummaryLabel>
        </SummaryCard>
      </SummaryGrid>

      <DualSectionContainer>
        {/* ===== USUÁRIOS ===== */}
        <Section>
          <SectionTitle>Usuários Cadastrados</SectionTitle>
          <SearchInput
            type="text"
            placeholder="Pesquisar usuário..."
            value={searchUser}
            onChange={(e) => setSearchUser(e.target.value)}
          />
          <TableScroll>
            <Table>
              <colgroup>
                <col style={{ width: "38%" }} />
                <col style={{ width: "42%" }} />
                <col style={{ width: "20%" }} />
              </colgroup>
              <thead>
                <TableRow>
                  <TableHeader>Nome</TableHeader>
                  <TableHeader>E-mail</TableHeader>
                  <TableHeader>Ações</TableHeader>
                </TableRow>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <TableRow><TableCell colSpan={3}>Nenhum usuário encontrado.</TableCell></TableRow>
                ) : (
                  filteredUsers.map((user) => (
                    <TableRow key={user._id}>
                      <TableCell className="nowrap">{user.name || "—"}</TableCell>
                      <TableCell>{user.email || "—"}</TableCell>
                      <TableCell>
                        <DangerButton onClick={() => handleBanUser(user._id)}>Banir</DangerButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </tbody>
            </Table>
          </TableScroll>
        </Section>

        {/* ===== DENÚNCIAS ===== */}
        <Section>
          <SectionTitle>Denúncias</SectionTitle>
          <SearchInput
            type="text"
            placeholder="Pesquisar por denunciante, motivo ou status..."
            value={searchReport}
            onChange={(e) => setSearchReport(e.target.value)}
          />
          <TableScroll>
            <Table>
              <colgroup>
                <col style={{ width: "12%" }} />  {/* ID com largura fixa para não “quebrar” char por linha */}
                <col style={{ width: "15%" }} />
                <col style={{ width: "14%" }} />
                <col style={{ width: "16%" }} />
                <col style={{ width: "12%" }} />
                <col style={{ width: "19%" }} />
                <col style={{ width: "12%" }} />
              </colgroup>
              <thead>
                <TableRow>
                  <TableHeader>ID</TableHeader>
                  <TableHeader>Denunciante</TableHeader>
                  <TableHeader>Usuário denunciado</TableHeader>
                  <TableHeader>Anúncio</TableHeader>
                  <TableHeader>Motivo</TableHeader>
                  <TableHeader>Detalhes</TableHeader>
                  <TableHeader>Status</TableHeader>
                </TableRow>
              </thead>
              <tbody>
                {filteredReports.length === 0 ? (
                  <TableRow><TableCell colSpan={7}>Nenhuma denúncia registrada.</TableCell></TableRow>
                ) : (
                  filteredReports.map((r) => (
                    <TableRow key={r._id}>
                      <TableCell className="idCell">{r._id}</TableCell>
                      <TableCell>
                        {r.reporter ? `${r.reporter.name || "—"} (${r.reporter.email || "—"})` : "—"}
                      </TableCell>
                      <TableCell>
                        {r.reportedUser ? `${r.reportedUser.name || "—"} (${r.reportedUser.email || "—"})` : "—"}
                      </TableCell>
                      <TableCell className="adCell">
                        {r.reportedAd?.title ? <a href={`/ad/${r.reportedAd?._id || ""}`}>{r.reportedAd.title}</a> : "—"}
                      </TableCell>
                      <TableCell>{r.reason || "—"}</TableCell>
                      <TableCell className="detailsCell">{r.details || "—"}</TableCell>
                      <TableCell>
                        <Pill data-status={(r.status || "pendente").toLowerCase()}>
                          {r.status || "pendente"}
                        </Pill>
                        {/* exemplo de ação rápida (opcional) */}
                        {/* <NeutralButton style={{ marginLeft: 8 }}>Marcar pendente</NeutralButton> */}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </tbody>
            </Table>
          </TableScroll>
        </Section>
      </DualSectionContainer>
    </AdminContainer>
  );
};

export default AdminDashboard;
