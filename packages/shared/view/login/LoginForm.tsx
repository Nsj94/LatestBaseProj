import { KeyOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";

interface Props {
  onLogin: (email: string, password: string) => void;
  loading: boolean;
}

export default function LoginForm({ onLogin, loading }: Props) {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  function handleSubmit(values: any) {
    if (onLogin) {
      const { email, password } = values;
      onLogin(email, password);
    }
  }
  return (
    <>
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
          label={<label className="login-label">Email Id</label>}
          name="fulName"
          rules={[{ required: true, message: "Email Address required" }]}
        >
          <Input
            type="email"
            autoComplete={"off"}
            size="large"
            placeholder="Enter your Email Address"
            className="input-theme"
            prefix={<UserOutlined className="input-icon mx-2" />}
          />
        </Form.Item>
        <Form.Item
          className={"mb-3 "}
          label={<label className="login-label">Password</label>}
          name="email"
          rules={[{ required: true, message: "Password required" }]}
        >
          <Input.Password
            autoComplete={"off"}
            size="large"
            placeholder="Enter your Password"
            prefix={<KeyOutlined className="input-icon mx-2" />}
            className="input-theme"
          />
        </Form.Item>

        <Form.Item className="mb-3">
          <Button
            type="primary"
            htmlType="submit"
            block
            loading={loading}
            className="theme-btn"
          >
            NEXT
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
