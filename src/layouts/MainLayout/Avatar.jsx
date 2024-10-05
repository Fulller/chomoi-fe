import Tippy from "@tippyjs/react/headless";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
import { useState, useRef } from "react";
import {
  FaUser,
  FaStar,
  FaShoppingCart,
  FaTags,
  FaHistory,
  FaCog,
  FaSignOutAlt,
  FaBookmark,
  FaStarHalfAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { Rate } from "antd";

export default function Avatar() {
  const user = useSelector((state) => state.auth.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const tippyRef = useRef(null);
  const rating = user?.raing || 4.6;

  // Toggle menu state
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle when clicking a menu item
  const handleMenuItemClick = (action) => {
    if (action) action(); // Perform the action if exists
    setIsMenuOpen(false); // Close menu after clicking
  };

  function handleLogout() {
    // Handle logout logic here
    console.log("Logging out...");
  }

  const menuItems = [
    {
      title: "Quản lý đơn hàng",
      items: [
        { label: "Đơn mua", icon: <FaShoppingCart />, path: "/order/buy" },
        { label: "Đơn bán", icon: <FaTags />, path: "/order/sell" },
        // {
        //   label: "Lịch sử giao dịch",
        //   icon: <FaHistory />,
        //   path: "/order/history",
        // },
      ],
    },
    {
      title: "Tiện ích",
      items: [
        {
          label: "Đánh giá cho tôi",
          icon: <FaStar />,
          path: "/rating/for-me",
        },
        {
          label: "Đánh giá từ tôi",
          icon: <FaStarHalfAlt />,
          path: "/rating/from-me",
        },
        // {
        //   label: "Tìm kiếm đã lưu",
        //   icon: <FaBookmark />,
        //   path: "/search/saved",
        // },
      ],
    },
    {
      title: "Tài khoản",
      items: [
        { label: "Cài đặt tài khoản", icon: <FaCog />, path: "/setting" },
        {
          label: "Đăng xuất",
          icon: <FaSignOutAlt />,
          action: handleLogout,
          path: "/logout",
        },
      ],
    },
  ];

  return (
    <Tippy
      interactive={true}
      visible={isMenuOpen}
      placement="bottom-end"
      fallbackPlacements={["top-end"]}
      onClickOutside={() => setIsMenuOpen(false)} // Close menu when clicking outside
      ref={tippyRef}
      render={(attrs) => (
        <div
          className="bg-white shadow-lg hover:shadow-xl rounded-md p-2 flex flex-col tooltip-scroll"
          tabIndex={-1}
          {...attrs}
        >
          <div className="flex items-center p-2 border-b">
            {user?.avatar ? (
              <img
                src={user?.avatar}
                alt="Avatar"
                className="h-10 w-10 rounded-full mr-2"
              />
            ) : (
              <FaUser className="h-10 w-10 rounded-full mr-2" />
            )}
            <div>
              <div className="font-semibold">{user?.name}</div>
              <div className="text-gray-500">{user?.email}</div>
              <div className="font-semibold">
                <span className="mr-4">{rating.toFixed(1)}</span>
                <Rate allowHalf value={rating} disabled />
              </div>
            </div>
          </div>

          {menuItems.map((section, index) => (
            <div key={uuidv4()}>
              <div className="font-semibold p-2 bg-gray-200 text-gray-800 border-b">
                {section.title}
              </div>
              {section.items.map((item, itemIndex) => (
                <Link
                  key={uuidv4()}
                  className="flex items-center text-left p-2 hover:bg-gray-100 w-full"
                  onClick={() => handleMenuItemClick(item.action || toggleMenu)}
                  to={item?.path}
                >
                  {item.icon && <span className="mr-2">{item.icon}</span>}
                  {item.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
      )}
    >
      <span onClick={toggleMenu} className="cursor-pointer">
        {user?.avatar ? (
          <img
            src={user?.avatar}
            alt="Avatar"
            className="h-10 w-10 rounded-full"
          />
        ) : (
          <FaUser className="h-10 w-10 rounded-full" />
        )}
      </span>
    </Tippy>
  );
}
