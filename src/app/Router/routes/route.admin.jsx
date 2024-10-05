import { ADMIN_ROUTE_TYPES } from "../routeTypes/routeTypes";

import MainLayout from "@layouts/admin/MainLayout";
import Home from "@pages/admin/Home";

export default [
  {
    path: "/@admin/",
    Page: Home,
    Layout: MainLayout,
    type: ADMIN_ROUTE_TYPES.PRIVATE,
    title: "Trang chủ admin",
  },
];
