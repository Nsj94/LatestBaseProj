import { MailOutlined, UserOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Form, Input, notification } from "antd";
import API_SERVICE from "client/src/services/api-service";
import { useTranslation } from "react-i18next";
import { OTP } from "../../constants/RouteConstants";

interface Props {
  onRegister: (email: string, name: string) => void;
  loading: boolean;
}

export default function RegisterForm({ onRegister, loading }: Props) {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  function handleSubmit(values: any) {
    if (onRegister) {
      const { email, name } = values;
      onRegister(email, name);
    }
  }

  return (
    <Form
      className={"w-100 d-flex flex-column gap-4 mt-3"}
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
    >
      <Form.Item
        className={"  mb-3 "}
        label={<label className="login-label">Full Name</label>}
        name="fulName"
        rules={[{ required: true, message: "Name required" }]}
      >
        <Input
          autoComplete={"off"}
          size="large"
          placeholder="Enter your Full Name"
          className="input-theme"
          prefix={<UserOutlined className="input-icon mx-2" />}
        />
      </Form.Item>
      <Form.Item
        className={"mb-3 "}
        label={<label className="login-label">Email Id</label>}
        name="email"
        rules={[{ required: true, message: "Email required" }]}
      >
        <Input
          autoComplete={"off"}
          size="large"
          placeholder="Enter your Email Id"
          prefix={<MailOutlined className="input-icon mx-2" />}
          className="input-theme"
        />
      </Form.Item>

      <Form.Item className="mb-3">
        <Button
          type="primary"
          onClick={() => navigate(OTP)}
          // htmlType="submit"
          block
          loading={loading}
          className="theme-btn"
        >
          NEXT
        </Button>
      </Form.Item>
    </Form>
  );
}
