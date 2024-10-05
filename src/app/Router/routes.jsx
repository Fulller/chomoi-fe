import { Fragment } from "react";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";

import MainLayout from "@layouts/MainLayout";
import AuthLayout from "@layouts/AuthLayout";
import NotFound from "@pages/NotFound";
import Home from "@pages/Home";
import Login from "@pages/auth/Login";
import Register from "@pages/auth/Register";
import ReceiveTokens from "@pages/auth/ReceiveTokens";
import ForgotPassword from "@pages/auth/ForgotPassword";
import BuyOrder from "@pages/order/BuyOrder";
import SellOrder from "@pages/order/SellOrder";
import FromMeRating from "@pages/rating/FromMeRating";
import ForMeRating from "@pages/rating/ForMeRating";
import Setting from "@pages/Setting";
import Logout from "@pages/auth/Logout";
import NewProduct from "@pages/product/NewProduct";

const ROUTE_TYPES = {
  PUBLIC: PublicRoute,
  PRIVATE: PrivateRoute,
};

const routes = [
  {
    path: "/",
    Page: Home,
    Layout: MainLayout,
    type: ROUTE_TYPES.PUBLIC,
    title: "Trang chủ",
  },
  {
    path: "/home",
    Page: Home,
    Layout: MainLayout,
    type: ROUTE_TYPES.PUBLIC,
    title: "Trang chủ",
  },
  {
    path: "/login",
    Page: Login,
    Layout: AuthLayout,
    type: ROUTE_TYPES.PUBLIC,
    title: "Đăng nhập",
  },
  {
    path: "/register",
    Page: Register,
    Layout: AuthLayout,
    type: ROUTE_TYPES.PUBLIC,
    title: "Đăng ký",
  },
  {
    path: "/logout",
    Page: Logout,
    Layout: Fragment,
    type: ROUTE_TYPES.PUBLIC,
    title: "Đăng xuất",
  },
  {
    path: "/auth/receive-tokens",
    Page: ReceiveTokens,
    Layout: Fragment,
    type: ROUTE_TYPES.PUBLIC,
    title: "Nhận tokens",
  },
  {
    path: "/forgot-password",
    Page: ForgotPassword,
    Layout: AuthLayout,
    type: ROUTE_TYPES.PUBLIC,
    title: "Lấy lại mật khẩu",
  },

  {
    path: "/order/buy",
    Page: BuyOrder,
    Layout: MainLayout,
    type: ROUTE_TYPES.PRIVATE,
    title: "Đơn hàng mua",
  },
  {
    path: "/order/sell",
    Page: SellOrder,
    Layout: MainLayout,
    type: ROUTE_TYPES.PRIVATE,
    title: "Đơn hàng bán",
  },
  {
    path: "/rating/from-me",
    Page: FromMeRating,
    Layout: MainLayout,
    type: ROUTE_TYPES.PRIVATE,
    title: "Đánh giá từ tôi",
  },
  {
    path: "/rating/for-me",
    Page: ForMeRating,
    Layout: MainLayout,
    type: ROUTE_TYPES.PRIVATE,
    title: "Đánh giá cho tôi",
  },
  {
    path: "/setting",
    Page: Setting,
    Layout: MainLayout,
    type: ROUTE_TYPES.PRIVATE,
    title: "Cài đăt tài khoản",
  },
  {
    path: "/product/new",
    Page: NewProduct,
    Layout: MainLayout,
    type: ROUTE_TYPES.PRIVATE,
    title: "Đăng bán sản phẩm",
  },
  {
    path: "/404",
    Page: NotFound,
    Layout: MainLayout,
    type: ROUTE_TYPES.PUBLIC,
    title: "Không tìm thấy trang",
  },
  {
    path: "*",
    Page: NotFound,
    Layout: MainLayout,
    type: ROUTE_TYPES.PUBLIC,
    title: "Không tìm thấy trang",
  },
];

export default routes.map((route) => {
  const { Layout, Page, title } = route;
  return {
    path: route.path,
    type: route.type,
    title: title,
    element: (
      <Layout>
        <Page></Page>
      </Layout>
    ),
  };
});
