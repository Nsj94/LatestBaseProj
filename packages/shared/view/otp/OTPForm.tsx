import { Button, Col, Form, Input, Row } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
interface Props {
  onOTP: (email: string, password: string) => void;
  loading: boolean;
}

export default function OTPForm({ onOTP, loading }: Props) {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  function handleSubmit(values: any) {
    const email = localStorage.getItem("otp-email");
    if (onOTP) {
      const { otp } = values;
      //@ts-ignore
      onOTP(email, otp);
    }
  }

  return (
    <Form
      className={"w-100 d-flex flex-column gap-4 mt-3"}
      form={form}
      layout="vertical"
      fields={[]}
      onFinish={handleSubmit}
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
    >
      <Form.Item
        className={"mb-3"}
        label={
          <label className="login-label">
            <b>Enter the OTP to proceed</b>
          </label>
        }
        name="otp"
        rules={[{ required: true, message: "Enter Otp !!! " }]}
      >
        <Input
          autoComplete={"off"}
          size="large"
          type="password"
          placeholder="Enter the OTP"
          className="input-theme"
        />
      </Form.Item>
      <Row className="d-flex justify-content-end ">
        <Col>
          <Button block className="resend-otp-btn py-2 h-100 px-3  ">
            Resend OTP
          </Button>
        </Col>
      </Row>

      <Form.Item className="mb-3">
        <Button
          type="primary"
          htmlType="submit"
          block
          loading={loading}
          className="theme-btn"
        >
          SIGN UP
        </Button>
      </Form.Item>
    </Form>
  );
}
