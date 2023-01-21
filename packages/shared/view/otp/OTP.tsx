import { Col, Row, notification } from "antd";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import OTPForm from "./OTPForm";
import { ArrowLeftOutlined } from "@ant-design/icons";

import { useTranslation } from "react-i18next";
import "./OTP.scss";

//@ts-ignore
import logo from "../../assets/NCAgroLogo.png";
import API_SERVICE from "client/src/services/api-service";
//@ts-ignore
import loginProp from "shared/assets/images/loginPageImg.png";
import { AuthConsumer } from "../../contexts/AuthContext";
import { REGISTER } from "../../constants/RouteConstants";
import React from "react";

interface Props {
  location: any;
}

export default function OTP({ location }: Props) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { from } = location.state || { from: { pathname: "/" } };

  useEffect(() => {
    document.title = "OTP Page";
  }, []);

  return (
    <AuthConsumer>
      {({ isAuth, updateAuthToken }) => {
        return isAuth ? (
          <Navigate to={from} />
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
                className="h-100 position-relative"
                // style={{
                //   backgroundImage: `url(${
                //     windowsDimension.width < 768 && backgroundTexture
                //   })`,
                // }}
              >
                <ArrowLeftOutlined
                  onClick={() => navigate(-1)}
                  className="back-icon position-absolute top-0 start-0  m-2 fw-bold p-2 rounded-circle "
                />
                <div className=" login-form-wrapper h-100 d-flex justify-content-center align-items-start flex-column mx-auto">
                  <div className="login-logo">
                    <img src={logo} alt="logo" />
                  </div>

                  <h1 className="login-title pt-3 pb-2">Sign Up</h1>
                  <p className=" login-subtext otp-text-top">
                    OTP (One-Time-Password) sent to your Email ID
                  </p>

                  <OTPForm
                    onOTP={async (email: string, otp: string) => {
                      setLoading(true);
                      try {
                        let otpEmail = localStorage.getItem("otp-email");
                        const { data: data } = await API_SERVICE.resetPassword(
                          otpEmail,
                          otp
                        );
                        notification.success({
                          message: "OTP verified",
                          placement: "bottomRight",
                        });
                        setLoading(false);
                        localStorage.setItem(
                          "uuid",
                          JSON.stringify(data.data.uuid)
                        );
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
