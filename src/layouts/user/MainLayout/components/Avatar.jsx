import Tippy from "@tippyjs/react/headless";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
import { useState, useRef } from "react";
import {
  FaCog,
  FaShoppingBag,
  FaSignOutAlt,
  FaShoppingCart,
  FaUser,
  FaStore,
} from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import { Link } from "react-router-dom";

import { ROLES } from "@configs/const.config";

export default function Avatar() {
  const user = useSelector((state) => state.auth.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const tippyRef = useRef(null);
  const isAdmin = user?.roles?.includes(ROLES.ADMIN);
  const isShop = user?.roles?.includes(ROLES.SHOP);

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
    { label: "Giỏ hàng", Icon: FaShoppingCart, path: "/cart" },
    { label: "Đơn hàng", Icon: FaShoppingBag, path: "/orders/all" },
    { label: "Tài khoản", Icon: FaCog, path: "/account/profile" },
    isShop
      ? { label: "Cửa hàng", Icon: FaStore, path: "/@shop" }
      : { label: "Đăng ký cửa hàng", Icon: FaStore, path: "/upgrade-to-shop" },
    {
      label: "Đăng xuất",
      Icon: FaSignOutAlt,
      action: handleLogout,
      path: "/logout",
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
          className="bg-white shadow-lg hover:shadow-xl rounded-md p-2 flex flex-col tooltip-scroll "
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
              <div className="font-semibold">{user?.displayName}</div>
              <div className="text-gray-500">{user?.email}</div>
            </div>
          </div>
          {menuItems.map((item) => {
            const { Icon } = item;
            return (
              <Link
                key={uuidv4()}
                className="flex items-center text-left p-2 hover:bg-gray-100 w-full"
                onClick={() => handleMenuItemClick(item.action || toggleMenu)}
                to={item?.path}
              >
                {item.Icon && (
                  <span className="mr-2">
                    <Icon />
                  </span>
                )}
                {item.label}
              </Link>
            );
          })}
          {isAdmin && (
            <Link
              key={uuidv4()}
              className="flex items-center text-left p-2 hover:bg-gray-100 w-full"
              to="/@admin"
            >
              <span className="mr-2">
                <RiAdminFill />
              </span>
              Admin
            </Link>
          )}
        </div>
      )}
      
    >
      <span onClick={toggleMenu} className="cursor-pointer avatar">
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
