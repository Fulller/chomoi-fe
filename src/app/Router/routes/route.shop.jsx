import { SHOP_ROUTE_TYPES } from "../routeTypes/routeTypes";

import MainLayout from "@layouts/shop/MainLayout";
import Home from "@pages/shop/Home";

export default [
  {
    path: "/@shop/",
    Page: Home,
    Layout: MainLayout,
    type: SHOP_ROUTE_TYPES.PRIVATE,
    title: "Trang chủ shop",
  },
];
