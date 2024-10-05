import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FaShoppingCart, FaTags, FaPlusCircle } from "react-icons/fa";
import SearchBox from "./SearchBox";
import Avatar from "./Avatar";
import logo from "@assets/images/logo.svg";
import { useSelector, useDispatch } from "react-redux";
import { setRedirect } from "@redux/slices/auth.slice";
import { Link, useHref } from "react-router-dom";
import ToolTip from "@components/TollTip";
import "./MainLayout.scss";

const MainLayout = ({ children }) => {
  const dispatch = useDispatch();
  const isLoging = useSelector((state) => state.auth.isLoging);
  const href = useHref();
  const [headerHeight, setHeaderHeight] = useState(0);
  const updateHeaderHeight = () => {
    const headerElement = document.getElementById("header");
    if (headerElement) {
      setHeaderHeight(headerElement.offsetHeight);
    }
  };

  useEffect(() => {
    updateHeaderHeight();
    window.addEventListener("resize", updateHeaderHeight);
    return () => {
      window.removeEventListener("resize", updateHeaderHeight);
    };
  }, []);

  const menu = [
    { title: "Đơn mua", icon: FaShoppingCart, path: "/order/buy" },
    { title: "Đơn bán", icon: FaTags, path: "/order/sell" },
  ];

  function handleSaveredirect() {
    dispatch(setRedirect(href));
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        <div
          id="header"
          className="mx-auto flex items-center justify-between py-4 px-8 space-x-4"
        >
          <Link to="/" className="logo flex items-center space-x-4">
            <img src={logo} alt="Logo" className="h-10 w-10" />
            <span className="font-bold text-xl whitespace-nowrap">CHỢ CŨ</span>
          </Link>
          <SearchBox className="searchBox"></SearchBox>
          <div className="menuAction flex items-center space-x-2">
            {isLoging && (
              <>
                {menu.map((item) => {
                  const Icon = item.icon;
                  return (
                    <ToolTip key={uuidv4()} content={item.title}>
                      <Link
                        to={item.path}
                        className="menuAction-item flex items-center bg-gray-100 px-4 py-2 rounded-md hover:bg-gray-200 whitespace-nowrap space-x-2"
                      >
                        <Icon />
                        <span className="ml-2 hidden xl:inline">
                          {item.title}
                        </span>
                      </Link>
                    </ToolTip>
                  );
                })}
              </>
            )}
          </div>
          <ToolTip content="Đăng sản phẩm">
            <Link
              to="/product/new"
              className="postProduct flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 whitespace-nowrap"
            >
              <FaPlusCircle />
              <span className="ml-2 100px:hidden 500px:hidden 600px:inline 800px:hidden 900px:hidden xl:inline">
                Đăng sản phẩm
              </span>
            </Link>
          </ToolTip>
          <div className="avatar flex items" content="Avatar">
            {isLoging ? (
              <Avatar />
            ) : (
              <div className="flex space-x-6">
                <Link
                  to="/login"
                  className="text-blue-500 hover:underline"
                  onClick={handleSaveredirect}
                >
                  Đăng nhập
                </Link>
                <Link
                  to="/register"
                  className="text-blue-500 hover:underline"
                  onClick={handleSaveredirect}
                >
                  Đăng ký
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>
      <main
        style={{ marginTop: headerHeight }}
        className="bg-gray-100 flex-grow px-6 py-4"
      >
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
