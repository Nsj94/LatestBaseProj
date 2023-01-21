import { DatePicker, Layout, Spin } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.scss";
const { Content } = Layout;

interface Props {
  location: any;
}

export default function AdminDashboard({ location }: Props) {
  let navigate = useNavigate();

  return (
    <>
      <Content className="admin-content">Dashboard</Content>
    </>
  );
}
