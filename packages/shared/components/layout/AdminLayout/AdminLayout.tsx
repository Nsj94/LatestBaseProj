import * as React from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Badge,
  Col,
  Button,
  Dropdown,
  Layout,
  Menu,
  Row,
  Space,
  Typography,
} from "antd";
import { useTranslation } from "react-i18next";

import { useState } from "react";
import "./index.scss";
import type { MenuProps } from "antd";

import {
  AppstoreOutlined,
  BellOutlined,
  DownOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";

import {
  ADMIN,
  ADMIN_DASHBOARD,
  BANNER_LIST,
} from "../../../constants/RouteConstants";
import { logout } from "../../../contexts/AuthContext";
import useWindowDimensions from "../../../hooks/WindowsDimension";

const { Title } = Typography;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuProps["items"] = [
  getItem("Dashboard", `${ADMIN}`, <AppstoreOutlined />),
  getItem(
    "Banner Management",
    "banner",
    <AppstoreOutlined className="admin-sidebar-icon" />,
    [
      getItem(
        "Home Slider",
        `${BANNER_LIST}`,
        <AppstoreOutlined className="admin-sidebar-icon" />
      ),
    ]
  ),
];

interface LayoutProps {
  children: any;
  title?: any;
  titleIcon?: any;
  titleSearch?: any;
  titleAction?: any;
  onMenuClick?: (route: string) => void;
  panel?: any;
  pagination: any;
  filters: any;
}

const { Header, Footer, Sider, Content } = Layout;

export default function AdminLayout({
  children,
  titleSearch,
  titleIcon,
  titleAction,
  title,
  panel,
  pagination,
  filters,
}: LayoutProps) {
  const { t } = useTranslation();
  const [collapsed, setCollapsed] = useState(false);
  const [visible, setVisible] = useState(false);
  const showVisible = () => {
    if (visible) setVisible(false);
    else setVisible(true);
  };
  const windowDimensions = useWindowDimensions();

  const navigate = useNavigate();

  const menu = [
    {
      key: "0",
      label: "Profile Details",
      onClick: () => navigate("/"),
    },
    {
      key: "1",
      label: "Logout",
      onClick: () => logout(),
    },
  ];

  const onClick: MenuProps["onClick"] = (e: any) => {
    navigate(e.key);
    if (windowDimensions.width < 769) {
      setCollapsed(true);
      setVisible(true);
    }
  };

  //@ts-ignore
  const adminProfilePic =
    JSON.parse(localStorage.getItem("user")!)?.user?.file?.url ||
    "https://api-milano.valuescale.co.in/images/profiles/21ef19fd-a54b-4aef-bcd1-e1be4c569f68.jpg";
  const userName = JSON.parse(localStorage.getItem("user")!)?.user?.name;

  React.useEffect(() => {
    if (windowDimensions.width < 769) {
      setVisible(true);
      setCollapsed(true);
    }
    document.title = "Admin Dashboard";
  }, []);

  return (
    <div className={"admin-list-layout"}>
      <div className="admin-dashboard-main">
        <Layout className="admin-layout">
          <Sider
            className={`${visible ? "admin-sider-right" : "admin-sider-main"}`}
            trigger={null}
            collapsible
            collapsed={collapsed}
          >
            <div className="admin-sider">
              <div
                className={
                  visible ? "ant-layout-sider-collapsed" : "admin-logo"
                }
              >
                <Link to={ADMIN_DASHBOARD}>
                  <img
                    className={visible ? "ant-layout-sider-collapsed" : ""}
                    src={""}
                    alt=""
                  />
                </Link>
              </div>
              <div
                className={"admin-sider-title"}
                style={{ display: visible ? "none" : "block" }}
              >
                MENU
              </div>
              <Menu
                onClick={onClick}
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                mode="inline"
                theme="dark"
                items={items}
                className="admin-sider-menu"
              />
            </div>
          </Sider>

          <Layout className="site-layout">
            <Header className="site-layout-background p-0">
              <Row
                gutter={{ xs: 8, sm: 16, md: 24 }}
                align="middle"
                justify="space-between"
                className="admin-header"
              >
                <Col
                  xs={visible ? 8 : 24}
                  sm={visible ? 8 : 24}
                  md={12}
                  lg={12}
                  className="admin-header-left"
                >
                  {React.createElement(
                    collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                    {
                      className: "trigger",
                      onClick: () => {
                        setCollapsed(!collapsed);
                        setVisible(!visible);
                      },
                    }
                  )}
                  {titleSearch}
                </Col>
                <Col
                  className={`gutter-row header-col admin-header-right ${
                    visible ? "admin-right-show" : "admin-right-hide"
                  }`}
                  xs={16}
                  sm={16}
                  md={12}
                  lg={12}
                >
                  <Dropdown
                    // trigger={["click"]}
                    dropdownRender={(menu) => <div>Hello</div>}
                  >
                    <Badge count={1}>
                      <BellOutlined />
                    </Badge>
                  </Dropdown>
                  <div className="admin-avatar-container">
                    <div className="avatar flex align-items-center">
                      <img
                        src={
                          adminProfilePic !== ""
                            ? adminProfilePic
                            : "https://avatars.dicebear.com/api/open-peeps/stefan.svg"
                        }
                        alt="user"
                      />
                    </div>
                    <div className="dropdown flex align-items-center">
                      <Dropdown
                        dropdownRender={(menu) => {
                          return (
                            <Button
                              className="nav-button"
                              onClick={() => logout()}
                            >
                              Log Out
                            </Button>
                          );
                        }}
                      >
                        <a onClick={(e) => e.preventDefault()}>
                          <Space>
                            {userName}
                            <DownOutlined />
                          </Space>
                        </a>
                      </Dropdown>
                    </div>
                  </div>
                </Col>
              </Row>
            </Header>
            <Content
              className={`manage-products-main-content p-2 ${
                visible ? "content-right-show" : "admin-right-hide"
              }`}
            >
              <Row
                className="align-items-center stock-summary-container mb-2 mt-2"
                gutter={{
                  xs: 8,
                  sm: 16,
                  md: 24,
                }}
              >
                <div className="manage-order-title">{title}</div>
              </Row>
              {children}
            </Content>
            <Footer className="p-2 admin-footer">
              <span>2022 © Milano</span>
            </Footer>
          </Layout>
        </Layout>
      </div>
    </div>
  );
}
