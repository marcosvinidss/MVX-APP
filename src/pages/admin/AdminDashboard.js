import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AdminContainer,
  Section,
  SectionTitle,
  Table,
  TableHeader,
  TableRow,
  TableCell,
  DeleteButton,
  DualSectionContainer,
  SearchInput,
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
      const parsedUsers = Array.isArray(usersJson)
        ? usersJson
        : Array.isArray(usersJson.users)
        ? usersJson.users
        : [];
      const parsedReports = Array.isArray(reportsJson)
        ? reportsJson
        : Array.isArray(reportsJson.reports)
        ? reportsJson.reports
        : [];
      setUsers(parsedUsers);
      setReports(parsedReports);
    } catch (err) {
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
    const t = localStorage.getItem("adminToken");
    if (!t) {
      navigate("/admin/login", { replace: true });
      return;
    }
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <p>Carregando dados...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  const filteredUsers = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(searchUser.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchUser.toLowerCase())
  );

  const filteredReports = reports.filter(
    (r) =>
      r.reporter?.name?.toLowerCase().includes(searchReport.toLowerCase()) ||
      r.reportedUser?.name?.toLowerCase().includes(searchReport.toLowerCase()) ||
      r.reason?.toLowerCase().includes(searchReport.toLowerCase())
  );

  return (
    <AdminContainer>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div style={{ textAlign: "left" }}>
          <img src="/img/MVX.png" alt="MVX Logo" style={{ width: 120, height: "auto" }} />
        </div>
        <button onClick={handleLogout} style={{ padding: "8px 14px", borderRadius: 8, border: "none", cursor: "pointer" }}>
          Sair
        </button>
      </div>

      <h1 style={{ textAlign: "center", marginBottom: 30 }}>Painel Administrativo</h1>

      <DualSectionContainer>
        <Section>
          <SectionTitle>Usuários Cadastrados</SectionTitle>
          <SearchInput
            type="text"
            placeholder="Pesquisar usuário..."
            value={searchUser}
            onChange={(e) => setSearchUser(e.target.value)}
          />
          {filteredUsers.length === 0 ? (
            <p>Nenhum usuário encontrado.</p>
          ) : (
            <Table>
              <thead>
                <TableRow>
                  <TableHeader>Nome</TableHeader>
                  <TableHeader>E-mail</TableHeader>
                  <TableHeader>Ações</TableHeader>
                </TableRow>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>{user.name || "—"}</TableCell>
                    <TableCell>{user.email || "—"}</TableCell>
                    <TableCell>
                      <DeleteButton onClick={() => handleBanUser(user._id)}>Banir</DeleteButton>
                    </TableCell>
                  </TableRow>
                ))}
              </tbody>
            </Table>
          )}
        </Section>

        <Section>
          <SectionTitle>Denúncias</SectionTitle>
          <SearchInput
            type="text"
            placeholder="Pesquisar denúncia..."
            value={searchReport}
            onChange={(e) => setSearchReport(e.target.value)}
          />
          {filteredReports.length === 0 ? (
            <p>Nenhuma denúncia registrada.</p>
          ) : (
            <Table>
              <thead>
                <TableRow>
                  <TableHeader>ID</TableHeader>
                  <TableHeader>Denunciante</TableHeader>
                  <TableHeader>Usuário Denunciado</TableHeader>
                  <TableHeader>Anúncio</TableHeader>
                  <TableHeader>Motivo</TableHeader>
                  <TableHeader>Detalhes</TableHeader>
                  <TableHeader>Status</TableHeader>
                </TableRow>
              </thead>
              <tbody>
                {filteredReports.map((r) => (
                  <TableRow key={r._id}>
                    <TableCell>{r._id}</TableCell>
                    <TableCell>
                      {r.reporter ? `${r.reporter.name || "—"} (${r.reporter.email || "—"})` : "—"}
                    </TableCell>
                    <TableCell>
                      {r.reportedUser ? `${r.reportedUser.name || "—"} (${r.reportedUser.email || "—"})` : "—"}
                    </TableCell>
                    <TableCell>{r.reportedAd?.title || "—"}</TableCell>
                    <TableCell>{r.reason || "—"}</TableCell>
                    <TableCell style={{ maxWidth: 200, whiteSpace: "pre-wrap" }}>
                      {r.details || "—"}
                    </TableCell>
                    <TableCell>{r.status || "pendente"}</TableCell>
                  </TableRow>
                ))}
              </tbody>
            </Table>
          )}
        </Section>
      </DualSectionContainer>
    </AdminContainer>
  );
};

export default AdminDashboard;
