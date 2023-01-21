import { useState } from "react";
import { Col, Row, Typography, notification } from "antd";
import { Link, Navigate, useNavigate } from "react-router-dom";

import RegisterForm from "./RegisterForm";

import { useTranslation } from "react-i18next";

//@ts-ignore
import logo from "../../assets/NCAgroLogo.png";
//@ts-ignore
import loginProp from "shared/assets/images/loginPageImg.png";
import "./Register.scss";

import API_SERVICE from "client/src/services/api-service";
import React from "react";
import { AuthConsumer } from "shared/contexts/AuthContext";
import { LOGIN, OTP } from "../../constants/RouteConstants";

const { Title } = Typography;

interface Props {
  location: any;
}

export default function Register({ location }: Props) {
  const navigate = useNavigate();

  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  // const { from } = location.state || { from: { pathname: "/" } };

  return (
    <AuthConsumer>
      {({ isAuth, updateAuthToken }) => {
        return isAuth ? (
          <Navigate to={"/"} replace={true} />
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

                  <h1 className="login-title pt-3 pb-2">Sign Up</h1>
                  <p className="login-subtext">
                    Already have an account ?
                    <Link to={LOGIN}> Please Login!</Link>
                  </p>
                  <RegisterForm
                    onRegister={async (email: string, name: string) => {
                      setLoading(true);
                      try {
                        const {
                          data: { data },
                        } = await API_SERVICE.register(email, name);
                        notification.success({
                          message: "Company Registered",
                          placement: "bottomRight",
                        });
                        setLoading(false);
                        navigate(OTP);
                      } catch (e) {
                        notification.error({
                          message: t(API_SERVICE.handleErrors(e)),
                          placement: "bottomRight",
                        });
                        setLoading(false);
                      }
                    }}
                    loading={loading}
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
