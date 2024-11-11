import { SHOP_ROUTE_TYPES } from "../routeTypes/routeTypes";

import MainLayout from "@layouts/shop/MainLayout";

import Home from "@pages/shop/Home";
import Update from "@pages/shop/shop/Update";
import FinanceBalance from "@pages/shop/finance/Balance";
import FinanceMomo from "@pages/shop/finance/Momo";
import OrderAll from "@pages/shop/order/All";
import OrderCancelled from "@pages/shop/order/Cancelled";
import OrderDelivery from "@pages/shop/order/Delivery";
import OrderRefund from "@pages/shop/order/Refund";
import ProductAll from "@pages/shop/product/All";
import ProductCreate from "@pages/shop/product/Create";
import ProductEdit from "@pages/shop/product/Edit";
import ProductStock from "@pages/shop/product/Stock";
import ShopProfile from "@pages/shop/shop/Profile";
import ShopSetting from "@pages/shop/shop/Setting";
import SupportChat from "@pages/shop/support/Chat";
import SupportReview from "@pages/shop/support/Review";

export default [
  {
    path: "/@shop/",
    Page: Home,
    Layout: MainLayout,
    type: SHOP_ROUTE_TYPES.PRIVATE,
    title: "Trang chủ shop",
  },
  {
    path: "/@shop/order/all",
    Page: OrderAll,
    Layout: MainLayout,
    type: SHOP_ROUTE_TYPES.PRIVATE,
    title: "Đơn hàng / Tấc cả",
  },
  {
    path: "/@shop/order/delivery",
    Page: OrderDelivery,
    Layout: MainLayout,
    type: SHOP_ROUTE_TYPES.PRIVATE,
    title: "Đơn hàng / Giao hàng loạt",
  },
  {
    path: "/@shop/order/canceled",
    Page: OrderCancelled,
    Layout: MainLayout,
    type: SHOP_ROUTE_TYPES.PRIVATE,
    title: "Đơn hàng / Đơn hủy",
  },
  {
    path: "/@shop/order/refund",
    Page: OrderRefund,
    Layout: MainLayout,
    type: SHOP_ROUTE_TYPES.PRIVATE,
    title: "Đơn hàng / Trả hàng/Hoàn tiền",
  },
  {
    path: "/@shop/product/all",
    Page: ProductAll,
    Layout: MainLayout,
    type: SHOP_ROUTE_TYPES.PRIVATE,
    title: "Sản phẩm / Tất cả sản phẩm",
  },
  {
    path: "/@shop/product/create",
    Page: ProductCreate,
    Layout: MainLayout,
    type: SHOP_ROUTE_TYPES.PRIVATE,
    title: "Sản phẩm / Thêm sản phẩm",
  },
  {
    path: "/@shop/product/edit",
    Page: ProductEdit,
    Layout: MainLayout,
    type: SHOP_ROUTE_TYPES.PRIVATE,
    title: "Sản phẩm / Sửa sản phẩm",
  },
  {
    path: "/@shop/product/edit/:productId",
    Page: ProductStock,
    Layout: MainLayout,
    type: SHOP_ROUTE_TYPES.PRIVATE,
    title: "Sản phẩm / Quản lý kho hàng",
  },
  {
    path: "/@shop/support/chat",
    Page: SupportChat,
    Layout: MainLayout,
    type: SHOP_ROUTE_TYPES.PRIVATE,
    title: "Chăm sóc KH / Quản lý chat",
  },
  {
    path: "/@shop/support/review",
    Page: SupportReview,
    Layout: MainLayout,
    type: SHOP_ROUTE_TYPES.PRIVATE,
    title: "Chăm sóc KH / Đánh giá",
  },
  {
    path: "/@shop/finance/balance",
    Page: FinanceBalance,
    Layout: MainLayout,
    type: SHOP_ROUTE_TYPES.PRIVATE,
    title: "Tài chính / Số dư",
  },
  {
    path: "/@shop/finance/momo",
    Page: FinanceMomo,
    Layout: MainLayout,
    type: SHOP_ROUTE_TYPES.PRIVATE,
    title: "Tài chính / Tài khoản Momo",
  },
  {
    path: "/@shop/shop/profile",
    Page: ShopProfile,
    Layout: MainLayout,
    type: SHOP_ROUTE_TYPES.PRIVATE,
    title: "Quản lý shop / Hồ sơ",
  },
  {
    path: "/@shop/shop/profile/edit",
    Page: Update,
    Layout: MainLayout,
    type: SHOP_ROUTE_TYPES.PRIVATE,
    title: "Chỉnh sửa thông tin shop",
  },
  {
    path: "/@shop/shop/setting",
    Page: ShopSetting,
    Layout: MainLayout,
    type: SHOP_ROUTE_TYPES.PRIVATE,
    title: "Quản lý shop / Thiết lập",
  },
];
