import { UserOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Tabs,
  Typography,
  notification,
} from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { REGISTER } from "../../constants/RouteConstants";
import "./Login.scss";
import LoginForm from "./LoginForm";
//@ts-ignore
import logo from "../../assets/NCAgroLogo.png";
//@ts-ignore
import loginProp from "shared/assets/images/loginPageImg.png";
//@ts-ignore

import API_SERVICE from "client/src/services/api-service";
import React from "react";
import { AuthConsumer } from "shared/contexts/AuthContext";
import useWindowDimensions from "../../hooks/WindowsDimension";
import type { TabsProps } from "antd";

interface Props {
  location: any;
}

export default function Login({ location }: Props) {
  const windowsDimension = useWindowDimensions();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const { from } = location.state || { from: { pathname: "/" } };

  useEffect(() => {
    document.title = "Login Page";
  }, []);

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: (
        <>
          <p className="m-0 login-tab-title text-break">Sign In using OTP</p>
        </>
      ),
      children: (
        <>
          <SignInWithOtp />
        </>
      ),
    },
    {
      key: "2",

      label: (
        <>
          <p className="m-0 login-tab-title text-break">
            Sign In using Password
          </p>
        </>
      ),
      children: (
        <LoginForm
          onLogin={async (email: string, password: string) => {
            setLoading(true);
            try {
              const {
                data: { data },
              } = await API_SERVICE.login(email, password);
              updateAuthToken(data);
            } catch (e) {
              notification.error({
                message: API_SERVICE.handleErrors(e),
                placement: "bottomRight",
              });
              setLoading(false);
            }
          }}
          loading={loading}
        />
      ),
    },
  ];

  return (
    <AuthConsumer>
      {({ isAuth, user, updateAuthToken }) => {
        return isAuth ? (
          <Navigate to="/admin" />
        ) : (
          <>
            <Row>
              <Col
                xs={0}
                sm={0}
                md={12}
                className="login-bg-image h-100"
                style={{
                  backgroundImage: `url(${loginProp})`,
                }}
              ></Col>
              <Col
                xs={24}
                sm={24}
                md={12}
                className="h-100"
                // style={{
                //   backgroundImage: `url(${
                //     windowsDimension.width < 768 && backgroundTexture
                //   })`,
                // }}
              >
                <div className="login-form-wrapper h-100 d-flex justify-content-center align-items-start flex-column mx-auto">
                  <div className="login-logo">
                    <img src={logo} alt="logo" />
                  </div>
                  <h1 className="login-title pt-3 pb-2">Sign In</h1>
                  <p className="login-subtext">
                    Do not have an account?
                    <Link to={REGISTER}> Please, Sign Up!</Link>
                  </p>
                  <Tabs
                    defaultActiveKey="1"
                    centered
                    className="w-100 d-flex justify-content-between login-tabs"
                    destroyInactiveTabPane
                    items={items}
                  />
                </div>
              </Col>
            </Row>
          </>
        );
      }}
    </AuthConsumer>
  );
}
function updateAuthToken(data: any) {
  throw new Error("Function not implemented.");
}

function SignInWithOtp() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [otpSignInForm] = Form.useForm();
  const handleSubmit = (values: { email: string }) => {
    console.log(values.email);
    navigate(`/otp`);
  };

  return (
    <>
      <Form
        className={"w-100 d-flex flex-column gap-4 mt-3"}
        form={otpSignInForm}
        layout="vertical"
        onFinish={handleSubmit}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
      >
        <Form.Item
          className={"  mb-3 "}
          label={<label className="login-label">Email Id</label>}
          name="email"
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
