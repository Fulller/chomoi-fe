import env from "@configs/env.config";

const ROUTE_TYPES = {
  PUBLIC: "PUBLIC",
  PRIVATE: "PRIVATE",
};

const SERVER_URL = {
  API: `${env.serverUrl}/api`,
  AUTH: `${env.serverUrl}/auth`,
  OAUTH2_GOOGLE: `${env.serverUrl}/oauth2/authorization/google`,
};

const ROLES = {
  USER: "USER",
  SHOP: "SHOP",
  ADMIN: "ADMIN",
};

const PRODUCT_STATUSES = {
  PENDING: {
    title: "Đang chờ duyệt",
    actions: { ACTIVE: "Duyệt", REJECTED: "Từ chối" },
  },
  ACTIVE: {
    title: "Đang bán",
    actions: { BLOCKED: "Khóa" },
  },
  BLOCKED: {
    title: "Đang bị khóa",
    actions: { DRAFT: "Mở khóa (Nháp)" },
  },
  DRAFT: {
    title: "",
    actions: { },
  },
};

export { ROUTE_TYPES, SERVER_URL, ROLES, PRODUCT_STATUSES };
