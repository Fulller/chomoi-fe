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

export { ROUTE_TYPES, SERVER_URL, ROLES };
