import Link from "antd/es/typography/Link";
import SearchBox from "@layouts/user/MainLayout/components/SearchBox";
import Actions from "@layouts/user/MainLayout/components/Actions";
import { useSelector } from "react-redux";
import Avatar from "@layouts/user/MainLayout/components/Avatar";
import AuthActions from "@layouts/user/MainLayout/components/AuthActions";
import { useState, useEffect } from "react";
import logo from "@assets/images/logo.svg";

export default function MainLayout({ children }) {
  const isLoging = useSelector((state) => state.auth.isLoging);
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

  return (
    <div className="min-h-screen flex flex-col">
      <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        <div
          id="header"
          className="mx-auto flex items-center justify-between py-4 px-8 space-x-8"
        >
          <Link to="/" className="logo flex items-center space-x-4">
            <img src={logo} alt="Logo" className="h-10 w-10" />
            <span className="font-bold text-xl whitespace-nowrap">CHỢ MỚI</span>
          </Link>
          <SearchBox className="searchBox" />
          <Actions />
          <div className="flex items" content="Avatar">
            {isLoging ? <Avatar /> : <AuthActions />}
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
}
