import { Layout, Menu } from "antd";
import { useState } from "react";
import { menuItems } from "./menuItems";
import logo from "@assets/images/logo-web-icon.svg";
import "./ShopMainLayout.scss";
import { Link, useLocation } from "react-router-dom";

const { Sider, Content } = Layout;

export default function ShopMainLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const selectedKey = location.pathname;

  const menuData = menuItems.map((menuItem) => ({
    key: `menu-item-${menuItem.title}`,
    icon: menuItem.icon,
    label: menuItem.title,
    children: menuItem.items.map((item) => ({
      key: `/@shop/${item.path}`,
      label: (
        <Link to={item.path == "/" ? item.path : `/@shop/${item.path}`}>
          {item.label}
        </Link>
      ),
    })),
  }));

  return (
    <Layout className="shop-layout">
      <Sider
        className="shop-sider"
        collapsible
        collapsed={collapsed}
        onCollapse={toggleCollapse}
      >
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
          <Link to="/@shop/order/all">{!collapsed && <h1>CỬA HÀNG</h1>}</Link>
        </div>

        <Menu
          className="shop-sider-menu"
          mode="inline"
          selectedKeys={[selectedKey]}
          items={menuData}
        />
      </Sider>
      <Layout>
        <Content className="shop-content">{children}</Content>
      </Layout>
    </Layout>
  );
}
