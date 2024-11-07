import { FiShoppingCart, FiUser, FiPackage, FiTag } from "react-icons/fi";
import { MdSupportAgent } from "react-icons/md";
import { BsShopWindow } from "react-icons/bs";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";

export const menuItems = [
  {
    icon: <FiPackage />,
    title: "Đơn hàng",
    items: [
      { label: "Tất cả", path: "order/all" },
      { label: "Chờ xác nhận", path: "order/delivery" },
      { label: "Đơn hủy", path: "order/canceled" },
      { label: "Trả hàng", path: "order/refund" },
    ],
  },
  {
    icon: <FiShoppingCart />,
    title: "Sản phẩm",
    items: [
      { label: "Tất cả sản phẩm", path: "product/all" },
      { label: "Thêm sản phẩm", path: "product/create" },
    ],
  },
  {
    icon: <MdSupportAgent />,
    title: "Chăm sóc KH",
    items: [
      { label: "Quản lý chat", path: "support/chat" },
      { label: "Đánh giá", path: "support/review" },
    ],
  },
  {
    icon: <MdOutlineAccountBalanceWallet />,
    title: "Tài chính",
    items: [
      { label: "Doanh thu", path: "finance/balance" },
      { label: "Tài khoản Momo", path: "finance/momo" },
    ],
  },
  {
    icon: <BsShopWindow />,
    title: "Quản lý shop",
    items: [
      { label: "Hồ sơ", path: "shop/profile" },
      { label: "Thiết lập", path: "shop/setting" },
    ],
  },
];
