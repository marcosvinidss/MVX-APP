import Cookies from "js-cookie";
import qs from "qs";

const BASEAPI = "http://localhost:5000";

/* ==================== Token helpers ==================== */
const getUserToken = () => Cookies.get("token");
const userAuthHeader = () => {
  const t = getUserToken();
  return t ? { Authorization: `Bearer ${t}` } : {};
};

/* ==================== Core fetchers (compat) ==================== */
/* Envia Authorization: Bearer e mantém compat com token no body/query */
const apiFetchFile = async (endpoint, body) => {
  if (!body.get("token")) {
    const token = getUserToken();
    if (token) body.append("token", token); // legado
  }

  const res = await fetch(BASEAPI + endpoint, {
    method: "POST",
    headers: {
      ...userAuthHeader(), // novo
    },
    body,
  });

  const json = await res.json();
  return json;
};

const apiFetchFilePut = async (endpoint, body) => {
  if (!body.get("token")) {
    const token = getUserToken();
    if (token) body.append("token", token); // legado
  }

  const res = await fetch(BASEAPI + endpoint, {
    method: "PUT",
    headers: {
      ...userAuthHeader(), // novo
    },
    body,
  });

  const json = await res.json();
  return json;
};

const apiFetchPost = async (endpoint, body = {}) => {
  if (!body.token) {
    const token = getUserToken();
    if (token) body.token = token; // legado
  }

  const res = await fetch(BASEAPI + endpoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...userAuthHeader(), // novo
    },
    body: JSON.stringify(body),
  });

  const json = await res.json();
  if (json.notallowed) {
    window.location.href = "/signin";
    return;
  }
  return json;
};

const apiFetchPut = async (endpoint, body = {}) => {
  if (!body.token) {
    const token = getUserToken();
    if (token) body.token = token; // legado
  }

  const res = await fetch(BASEAPI + endpoint, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...userAuthHeader(), // novo
    },
    body: JSON.stringify(body),
  });

  const json = await res.json();
  if (json.notallowed) {
    window.location.href = "/signin";
    return;
  }
  return json;
};

const apiFetchGet = async (endpoint, body = {}) => {
  if (!body.token) {
    const token = getUserToken();
    if (token) body.token = token; // legado (query)
  }

  const res = await fetch(`${BASEAPI + endpoint}?${qs.stringify(body)}`, {
    headers: {
      Accept: "application/json",
      ...userAuthHeader(), // novo
    },
  });
  const json = await res.json();

  if (json.notallowed) {
    window.location.href = "/signin";
    return;
  }
  return json;
};

const apiFetchDelete = async (endpoint, body = {}) => {
  if (!body.token) {
    const token = getUserToken();
    if (token) body.token = token; // legado
  }

  const res = await fetch(BASEAPI + endpoint, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...userAuthHeader(), // novo
    },
    body: JSON.stringify(body),
  });

  const json = await res.json();
  if (json.notallowed) {
    window.location.href = "/signin";
    return;
  }
  return json;
};

/* ==================== ADMIN HELPERS ==================== */
const apiFetchAdminGet = async (endpoint) => {
  const adminToken = Cookies.get("adminToken");

  if (!adminToken) {
    console.error("Admin token não encontrado. Faça login novamente.");
    window.location.href = "/admin/login";
    return;
  }

  const res = await fetch(BASEAPI + endpoint, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${adminToken}`,
    },
  });

  const json = await res.json();
  return json;
};

/* ==================== API ==================== */
const MvxApi = {
  baseURL: BASEAPI,

  // ----- Usuário
  login: async (email, password) => apiFetchPost("/user/signin", { email, password }),
  register: async (name, email, password, stateLoc) =>
    apiFetchPost("/user/signup", { name, email, password, state: stateLoc }),

  getStates: async () => {
    const json = await apiFetchGet("/states");
    return json.states || [];
  },

  getCategories: async () => {
    const json = await apiFetchGet("/categories");
    return json.categories || [];
  },

  getAds: async (options) => {
    const json = await apiFetchGet("/ad/list", options);
    return json || [];
  },

  getAd: async (id, other = false) => apiFetchGet("/ad/item", { id, other }),

  addAd: async (fData) => apiFetchFile("/ad/add", fData),

  editAd: async (id, fData) => apiFetchFile(`/ad/${id}`, fData),

  getUserInfo: async () => apiFetchGet("/user/me"),

  updateUser: async (data) => apiFetchPut("/user/me", data),

  getMyAds: async () => {
    const json = await apiFetchGet("/ad/my-ads");
    return json.ads || [];
  },

  deleteAd: async (id) => apiFetchDelete(`/ad/${id}`),

  // ----- Favoritos
  toggleFavorite: async (id) => {
    const json = await apiFetchPost(`/ad/${id}/favorite`);
    if (json?.error) throw new Error(json.error);
    // Normaliza formatos: { favorites, isFavorite, ok } OU { favorites }
    return {
      isFavorite: typeof json?.isFavorite === "boolean" ? json.isFavorite : undefined,
      favorites: Array.isArray(json?.favorites) ? json.favorites : [],
    };
  },

  getFavorites: async () => {
    const json = await apiFetchGet("/user/favorites");
    if (json?.error) throw new Error(json.error);
    // aceita { favorites } ou array puro
    return Array.isArray(json) ? json : Array.isArray(json?.favorites) ? json.favorites : [];
  },

  // ----- Denúncia
  reportAd: async (adId, reason, details) =>
    apiFetchPost("/report", { reportedAd: adId, reason, details }),

  // ----- Admin
  adminLogin: async (email, password) => {
    const json = await apiFetchPost("/admin/login", { email, password });
    if (json.token) {
      Cookies.set("adminToken", json.token, { expires: 1 });
    }
    return json;
  },
  getAdminReports: async () => {
    const json = await apiFetchAdminGet("/admin/reports");
    return json.reports || [];
  },
  getAdminUsers: async () => {
    const json = await apiFetchAdminGet("/admin/users");
    return json.users || [];
  },

  // ----- Chat
  getChatHistory: async (adId, otherUserId) => apiFetchGet(`/chat/${adId}/${otherUserId}`),
  sendChatMessage: async (adId, receiverId, message) =>
    apiFetchPost(`/chat`, { adId, receiverId, message }),
  getUserChats: async () => {
    const json = await apiFetchGet("/chat/conversations");
    return Array.isArray(json) ? json : [];
  },

  // ----- Pagamento (Mock)
  createMockPayment: async (adId, amount, buyerEmail) =>
    apiFetchPost("/payment/mock/create", { adId, amount, buyerEmail }),

  confirmMockPayment: async (paymentId) =>
    apiFetchPost("/payment/mock/confirm", { paymentId }),

  // ----- Util
  getUserById: async (id) => apiFetchGet(`/user/${id}`),
};

export default () => MvxApi;
