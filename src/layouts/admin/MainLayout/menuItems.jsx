import { FiShoppingCart, FiUser, FiPackage, FiTag } from "react-icons/fi";

export const menuItems = [
  {
    icon: <FiShoppingCart />,
    title: "Sản phẩm",
    items: [{ label: "Duyệt sản phẩm", path: "product/review" }],
  },
  {
    icon: <FiUser />,
    title: "Tài khoản",
    items: [
      { label: "Người dùng", path: "account/user" },
      { label: "Cửa hàng", path: "account/shop" },
      { label: "Về trang người dùng", path: "/" },
    ],
  },
  {
    icon: <FiPackage />,
    title: "Đơn hàng",
    items: [{ label: "Báo cáo", path: "order/report" }],
  },
  {
    icon: <FiTag />,
    title: "Category",
    items: [
      { label: "Management", path: "category/management" },
      { label: "Attribute", path: "category/attribute" },
    ],
  },
];
