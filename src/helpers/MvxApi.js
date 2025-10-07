import Cookies from "js-cookie";
import qs from "qs";

const BASEAPI = "http://localhost:5000";

// -------------------- Helpers --------------------

const apiFetchFile = async (endpoint, body) => {
  if (!body.get("token")) {
    const token = Cookies.get("token");
    if (token) body.append("token", token);
  }

  const res = await fetch(BASEAPI + endpoint, {
    method: "POST",
    body,
  });

  const json = await res.json();
  return json;
};

const apiFetchFilePut = async (endpoint, body) => {
  if (!body.get("token")) {
    const token = Cookies.get("token");
    if (token) body.append("token", token);
  }

  const res = await fetch(BASEAPI + endpoint, {
    method: "PUT",
    body,
  });

  const json = await res.json();
  return json;
};

const apiFetchPost = async (endpoint, body = {}) => {
  if (!body.token) {
    const token = Cookies.get("token");
    if (token) body.token = token;
  }

  const res = await fetch(BASEAPI + endpoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
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
    const token = Cookies.get("token");
    if (token) body.token = token;
  }

  const res = await fetch(BASEAPI + endpoint, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
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
    const token = Cookies.get("token");
    if (token) body.token = token;
  }

  const res = await fetch(`${BASEAPI + endpoint}?${qs.stringify(body)}`);
  const json = await res.json();

  if (json.notallowed) {
    window.location.href = "/signin";
    return;
  }

  return json;
};

const apiFetchDelete = async (endpoint, body = {}) => {
  if (!body.token) {
    const token = Cookies.get("token");
    if (token) body.token = token;
  }

  const res = await fetch(BASEAPI + endpoint, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
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

// -------------------- API --------------------

const MvxApi = {
  baseURL: BASEAPI, // ✅ importante: expõe o baseURL pro frontend

  login: async (email, password) => {
    return await apiFetchPost("/user/signin", { email, password });
  },

  register: async (name, email, password, stateLoc) => {
    return await apiFetchPost("/user/signup", {
      name,
      email,
      password,
      state: stateLoc,
    });
  },

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

  getAd: async (id, other = false) => {
    return await apiFetchGet("/ad/item", { id, other });
  },

  addAd: async (fData) => {
    return await apiFetchFile("/ad/add", fData);
  },

  editAd: async (id, fData) => {
    return await apiFetchFile(`/ad/${id}`, fData);
  },

  getUserInfo: async () => {
    return await apiFetchGet("/user/me");
  },

  updateUser: async (data) => {
    return await apiFetchPut("/user/me", data);
  },

  getMyAds: async () => {
    const json = await apiFetchGet("/ad/my-ads");
    return json.ads || [];
  },

  deleteAd: async (id) => {
    return await apiFetchDelete(`/ad/${id}`);
  },

  toggleFavorite: async (id) => {
    return await apiFetchPost(`/ad/${id}/favorite`);
  },

  getFavorites: async () => {
    const json = await apiFetchGet("/user/favorites");
    return Array.isArray(json)
      ? json
      : json?.favorites
        ? json.favorites
        : [];
  },
  reportAd: async (adId, reason, details) => {
    const token = Cookies.get("token"); // 🔐 pega o token salvo nos cookies
    const json = await apiFetchPost("/report", {
      token, // ✅ envia o token dentro do corpo (como o back espera)
      reportedAd: adId,
      reason,
      details,
    });
    return json;
  },

};

export default () => MvxApi;
