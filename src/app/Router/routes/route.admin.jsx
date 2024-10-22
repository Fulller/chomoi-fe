import { ADMIN_ROUTE_TYPES } from "../routeTypes/routeTypes";

import MainLayout from "@layouts/admin/MainLayout";
import Home from "@pages/admin/Home";

import ProductReview from "@pages/admin/product/Review";
import AccountUser from "@pages/admin/account/User";
import AccountShop from "@pages/admin/account/Shop";
import OrderReport from "@pages/admin/order/Report";
import CategoryTree from "@pages/admin/category/Management";
import CategoryAttribute from "@pages/admin/category/Attribute";

export default [
  {
    path: "/@admin",
    Page: Home,
    Layout: MainLayout,
    type: ADMIN_ROUTE_TYPES.PRIVATE,
  },
  {
    path: "/@admin/home",
    Page: Home,
    Layout: MainLayout,
    type: ADMIN_ROUTE_TYPES.PRIVATE,
  },
  {
    path: "/@admin/product/review",
    Page: ProductReview,
    Layout: MainLayout,
    type: ADMIN_ROUTE_TYPES.PRIVATE,
    title: "Sản phẩm / Duyệt",
  },
  {
    path: "/@admin/account/user",
    Page: AccountUser,
    Layout: MainLayout,
    type: ADMIN_ROUTE_TYPES.PRIVATE,
    title: "Tài khoản / Người dùng",
  },
  {
    path: "/@admin/account/shop",
    Page: AccountShop,
    Layout: MainLayout,
    type: ADMIN_ROUTE_TYPES.PRIVATE,
    title: "Tài khoản / Cửa hàng",
  },
  {
    path: "/@admin/order/report",
    Page: OrderReport,
    Layout: MainLayout,
    type: ADMIN_ROUTE_TYPES.PRIVATE,
    title: "Đơn hàng / Báo cáo",
  },
  {
    path: "/@admin/category/management",
    Page: CategoryTree,
    Layout: MainLayout,
    type: ADMIN_ROUTE_TYPES.PRIVATE,
    title: "Category / Management",
  },
  {
    path: "/@admin/category/attribute",
    Page: CategoryAttribute,
    Layout: MainLayout,
    type: ADMIN_ROUTE_TYPES.PRIVATE,
    title: "Category / Attribute",
  },
];
