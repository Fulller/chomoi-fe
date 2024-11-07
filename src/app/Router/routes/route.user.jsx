import { Fragment } from "react";
import MainLayout from "@layouts/user/MainLayout";
import AuthLayout from "@layouts/user/AuthLayout";
import AccountLayout from "@layouts/user/AccountLayout";

import NotFound from "@pages/user/NotFound";
import Home from "@pages/user/Home";
import Login from "@pages/user/auth/Login";
import Register from "@pages/user/auth/Register";
import ReceiveTokens from "@pages/user/auth/ReceiveTokens";
import ForgotPassword from "@pages/user/auth/ForgotPassword";
import Logout from "@pages/user/auth/Logout";
import Setting from "@pages/user/Setting";
import Cart from "@pages/user/Cart";
import Orders from "@pages/user/Orders";
import Account from "@pages/user/Account";

import { USER_ROUTE_TYPES } from "../routeTypes/routeTypes";
import Checkout from "@pages/user/Orders/Checkout";

export default [
  {
    path: "/",
    Page: Home,
    Layout: MainLayout,
    type: USER_ROUTE_TYPES.PUBLIC,
    title: "Trang chủ",
  },
  {
    path: "/home",
    Page: Home,
    Layout: MainLayout,
    type: USER_ROUTE_TYPES.PUBLIC,
    title: "Trang chủ",
  },
  {
    path: "/login",
    Page: Login,
    Layout: AuthLayout,
    type: USER_ROUTE_TYPES.PUBLIC,
    title: "Đăng nhập",
  },
  {
    path: "/register",
    Page: Register,
    Layout: AuthLayout,
    type: USER_ROUTE_TYPES.PUBLIC,
    title: "Đăng ký",
  },
  {
    path: "/logout",
    Page: Logout,
    Layout: Fragment,
    type: USER_ROUTE_TYPES.PUBLIC,
    title: "Đăng xuất",
  },
  {
    path: "/auth/receive-tokens",
    Page: ReceiveTokens,
    Layout: Fragment,
    type: USER_ROUTE_TYPES.PUBLIC,
    title: "Nhận tokens",
  },
  {
    path: "/forgot-password",
    Page: ForgotPassword,
    Layout: AuthLayout,
    type: USER_ROUTE_TYPES.PUBLIC,
    title: "Lấy lại mật khẩu",
  },
  {
    path: "/setting",
    Page: Setting,
    Layout: MainLayout,
    type: USER_ROUTE_TYPES.PRIVATE,
    title: "Cài đặt tài khoản",
  },
  {
    path: "/cart",
    Page: Cart,
    Layout: MainLayout,
    type: USER_ROUTE_TYPES.PRIVATE,
    title: "Giỏ hàng",
  },
  {
    path: "/orders",
    Page: Orders,
    Layout: MainLayout,
    type: USER_ROUTE_TYPES.PRIVATE,
    title: "Đơn hàng",
  },
  {
    path: "/404",
    Page: NotFound,
    Layout: MainLayout,
    type: USER_ROUTE_TYPES.PUBLIC,
    title: "Không tìm thấy trang",
  },
  {
    path: "/account/:page",
    Page: Account,
    Layout: AccountLayout,
    type: USER_ROUTE_TYPES.PRIVATE,
    title: "Địa chỉ",
  },
  {
    path: "/orders/:page",
    Page: Orders,
    Layout: AccountLayout,
    type: USER_ROUTE_TYPES.PRIVATE,
    title: "Đơn mua",
  },
  {
    path: "/checkout",
    Page: Checkout,
    Layout: MainLayout,
    type: USER_ROUTE_TYPES.PRIVATE,
    title: "Thanh toán",
  },
  {
    path: "*",
    Page: NotFound,
    Layout: MainLayout,
    type: USER_ROUTE_TYPES.PUBLIC,
    title: "Không tìm thấy trang",
  },
];
