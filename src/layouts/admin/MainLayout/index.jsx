import { Layout, Menu } from "antd";
import { useState } from "react";
import { menuItems } from "./menuItems";
import logo from "@assets/images/logo-web-icon.svg";
import "./AdminLayout.scss";
import { Link, useLocation } from "react-router-dom";

const { Sider, Content } = Layout;

export default function AdminLayout({ children }) {
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
      key: `/@admin/${item.path}`,
      label: (
        <Link to={item.path == "/" ? item.path : `/@admin/${item.path}`}>
          {item.label}
        </Link>
      ),
    })),
  }));

  return (
    <Layout className="admin-layout">
      <Sider
        className="admin-sider"
        collapsible
        collapsed={collapsed}
        onCollapse={toggleCollapse}
      >
        <Link to="/@admin/">
          <div className="logo">
            <img src={logo} alt="logo" />
            {!collapsed && <h1>ADMIN</h1>}
          </div>
        </Link>

        <Menu
          className="admin-sider-menu"
          mode="inline"
          selectedKeys={[selectedKey]}
          items={menuData}
        />
      </Sider>
      <Layout>
        <Content className="admin-content">{children}</Content>
      </Layout>
    </Layout>
  );
}
