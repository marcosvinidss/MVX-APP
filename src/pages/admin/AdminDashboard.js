import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AdminWrapper,
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
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  CloseButton,
  ModalBody,
  ModalFieldGroup,
  ModalField,
  ModalFieldLabel,
  ModalFieldValue,
  ModalDivider,
  ModalTagRow,
  TagChip,
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
  const [selectedReport, setSelectedReport] = useState(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

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
    } catch {
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
      if (!res.ok) throw new Error();
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch {}
  };

  const handleToggleReportStatus = (id) => {
    setReports((prev) =>
      prev.map((r) =>
        r._id === id
          ? { ...r, status: (r.status || "pendente") === "pendente" ? "resolvido" : "pendente" }
          : r
      )
    );
    setSelectedReport((prev) =>
      prev && prev._id === id
        ? {
            ...prev,
            status: (prev.status || "pendente") === "pendente" ? "resolvido" : "pendente",
          }
        : prev
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminData");
    navigate("/admin/login", { replace: true });
  };

  const openReportModal = (report) => {
    setSelectedReport(report);
    setIsReportModalOpen(true);
  };

  const closeReportModal = () => {
    setIsReportModalOpen(false);
    setSelectedReport(null);
  };

  const formatDateTime = (value) => {
    if (!value) return "—";
    try {
      const d = new Date(value);
      if (Number.isNaN(d.getTime())) return "—";
      return d.toLocaleString("pt-BR");
    } catch {
      return "—";
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("adminToken")) {
      navigate("/admin/login", { replace: true });
      return;
    }
    loadData();
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
        const q = searchReport.toLowerCase();
        return (
          r.reporter?.name?.toLowerCase().includes(q) ||
          r.reportedUser?.name?.toLowerCase().includes(q) ||
          r.reason?.toLowerCase().includes(q) ||
          r.status?.toLowerCase().includes(q)
        );
      }),
    [reports, searchReport]
  );

  if (loading)
    return (
      <AdminWrapper>
        <AdminContainer>Carregando...</AdminContainer>
      </AdminWrapper>
    );

  if (error)
    return (
      <AdminWrapper>
        <AdminContainer>{error}</AdminContainer>
      </AdminWrapper>
    );

  const usersCount = users.length;
  const pendingCount = reports.filter((r) => (r.status || "pendente") === "pendente").length;
  const resolvedCount = reports.filter((r) => r.status === "resolvido").length;

  return (
    <AdminWrapper>
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
          <Section>
            <SectionTitle>Usuários</SectionTitle>
            <SearchInput
              value={searchUser}
              onChange={(e) => setSearchUser(e.target.value)}
              placeholder="Pesquisar usuário por nome ou e-mail..."
            />
            <TableScroll>
              <Table>
                <thead>
                  <TableRow>
                    <TableHeader>Nome</TableHeader>
                    <TableHeader>E-mail</TableHeader>
                    <TableHeader>Ações</TableHeader>
                  </TableRow>
                </thead>
                <tbody>
                  {filteredUsers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={3}>Nenhum usuário encontrado</TableCell>
                    </TableRow>
                  ) : (
                    filteredUsers.map((u) => (
                      <TableRow key={u._id}>
                        <TableCell>{u.name || "—"}</TableCell>
                        <TableCell>{u.email || "—"}</TableCell>
                        <TableCell>
                          <DangerButton onClick={() => handleBanUser(u._id)}>Banir</DangerButton>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </tbody>
              </Table>
            </TableScroll>
          </Section>

          <Section>
            <SectionTitle>Denúncias</SectionTitle>
            <SearchInput
              value={searchReport}
              onChange={(e) => setSearchReport(e.target.value)}
              placeholder="Pesquisar por nome, motivo ou status..."
            />
            <TableScroll>
              <Table>
                <thead>
                  <TableRow>
                    <TableHeader>ID</TableHeader>
                    <TableHeader>Denunciante</TableHeader>
                    <TableHeader>Denunciado</TableHeader>
                    <TableHeader>Anúncio</TableHeader>
                    <TableHeader>Motivo</TableHeader>
                    <TableHeader>Detalhes</TableHeader>
                    <TableHeader>Status</TableHeader>
                  </TableRow>
                </thead>
                <tbody>
                  {filteredReports.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7}>Nenhuma denúncia encontrada</TableCell>
                    </TableRow>
                  ) : (
                    filteredReports.map((r) => (
                      <TableRow
                        key={r._id}
                        onClick={() => openReportModal(r)}
                        className="clickable-report-row"
                      >
                        <TableCell className="idCell">{r._id}</TableCell>
                        <TableCell>{r.reporter ? r.reporter.name : "—"}</TableCell>
                        <TableCell>{r.reportedUser ? r.reportedUser.name : "—"}</TableCell>
                        <TableCell className="adCell">
                          {r.reportedAd ? (
                            <a href={`/ad/${r.reportedAd._id}`}>{r.reportedAd.title}</a>
                          ) : (
                            "—"
                          )}
                        </TableCell>
                        <TableCell>{r.reason || "—"}</TableCell>
                        <TableCell className="detailsCell">{r.details || "—"}</TableCell>
                        <TableCell>
                          <div
                            style={{
                              display: "flex",
                              gap: 8,
                              flexWrap: "wrap",
                              alignItems: "center",
                            }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Pill data-status={(r.status || "pendente").toLowerCase()}>
                              {r.status || "pendente"}
                            </Pill>
                            <NeutralButton onClick={() => handleToggleReportStatus(r._id)}>
                              {(r.status || "pendente") === "pendente"
                                ? "Marcar resolvido"
                                : "Marcar pendente"}
                            </NeutralButton>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </tbody>
              </Table>
            </TableScroll>
          </Section>
        </DualSectionContainer>

        {isReportModalOpen && selectedReport && (
          <ModalOverlay onClick={closeReportModal}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <ModalHeader>
                <ModalTitle>Detalhes da denúncia</ModalTitle>
                <CloseButton onClick={closeReportModal}>Fechar</CloseButton>
              </ModalHeader>

              <ModalTagRow>
                <Pill data-status={(selectedReport.status || "pendente").toLowerCase()}>
                  {selectedReport.status || "pendente"}
                </Pill>
                {selectedReport.reportedAd && (
                  <TagChip>Ref. anúncio: {selectedReport.reportedAd._id}</TagChip>
                )}
                {selectedReport.createdAt && (
                  <TagChip>Criada em {formatDateTime(selectedReport.createdAt)}</TagChip>
                )}
              </ModalTagRow>

              <ModalDivider />

              <ModalBody>
                <ModalFieldGroup>
                  <ModalField>
                    <ModalFieldLabel>ID da denúncia</ModalFieldLabel>
                    <ModalFieldValue>{selectedReport._id}</ModalFieldValue>
                  </ModalField>

                  <ModalField>
                    <ModalFieldLabel>Denunciante</ModalFieldLabel>
                    <ModalFieldValue>
                      {selectedReport.reporter ? selectedReport.reporter.name : "—"}
                    </ModalFieldValue>
                  </ModalField>

                  <ModalField>
                    <ModalFieldLabel>E-mail do denunciante</ModalFieldLabel>
                    <ModalFieldValue>
                      {selectedReport.reporter && selectedReport.reporter.email
                        ? selectedReport.reporter.email
                        : "—"}
                    </ModalFieldValue>
                  </ModalField>

                  <ModalField>
                    <ModalFieldLabel>Denunciado</ModalFieldLabel>
                    <ModalFieldValue>
                      {selectedReport.reportedUser ? selectedReport.reportedUser.name : "—"}
                    </ModalFieldValue>
                  </ModalField>

                  <ModalField>
                    <ModalFieldLabel>E-mail do denunciado</ModalFieldLabel>
                    <ModalFieldValue>
                      {selectedReport.reportedUser && selectedReport.reportedUser.email
                        ? selectedReport.reportedUser.email
                        : "—"}
                    </ModalFieldValue>
                  </ModalField>

                  <ModalField>
                    <ModalFieldLabel>Data/Hora da denúncia</ModalFieldLabel>
                    <ModalFieldValue>
                      {formatDateTime(
                        selectedReport.createdAt || selectedReport.created_at || null
                      )}
                    </ModalFieldValue>
                  </ModalField>
                </ModalFieldGroup>

                <ModalFieldGroup>
                  <ModalField>
                    <ModalFieldLabel>Anúncio relacionado</ModalFieldLabel>
                    <ModalFieldValue>
                      {selectedReport.reportedAd ? (
                        <a
                          href={`/ad/${selectedReport.reportedAd._id}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {selectedReport.reportedAd.title}
                        </a>
                      ) : (
                        "—"
                      )}
                    </ModalFieldValue>
                  </ModalField>

                  <ModalField>
                    <ModalFieldLabel>Motivo</ModalFieldLabel>
                    <ModalFieldValue>{selectedReport.reason || "—"}</ModalFieldValue>
                  </ModalField>

                  <ModalField>
                    <ModalFieldLabel>Detalhes da denúncia</ModalFieldLabel>
                    <ModalFieldValue>
                      {selectedReport.details && selectedReport.details.trim() !== ""
                        ? selectedReport.details
                        : "—"}
                    </ModalFieldValue>
                  </ModalField>

                  <ModalField>
                    <ModalFieldLabel>Status</ModalFieldLabel>
                    <ModalFieldValue>
                      <ModalTagRow>
                        <Pill data-status={(selectedReport.status || "pendente").toLowerCase()}>
                          {selectedReport.status || "pendente"}
                        </Pill>
                        <NeutralButton onClick={() => handleToggleReportStatus(selectedReport._id)}>
                          {(selectedReport.status || "pendente") === "pendente"
                            ? "Marcar resolvido"
                            : "Marcar pendente"}
                        </NeutralButton>
                      </ModalTagRow>
                    </ModalFieldValue>
                  </ModalField>
                </ModalFieldGroup>
              </ModalBody>
            </ModalContent>
          </ModalOverlay>
        )}
      </AdminContainer>
    </AdminWrapper>
  );
};

export default AdminDashboard;
