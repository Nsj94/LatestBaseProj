import { Col, Row, Typography, notification } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, useNavigate, Link } from "react-router-dom";
import ForgotPasswordForm from "./forgotPasswordForm";

import forgotPasswordProp from "shared/assets/images/loginPageImg.png";

import API_SERVICE from "client/src/services/api-service";
import { AuthConsumer } from "shared/contexts/AuthContext";
import "./forgotPassword.scss";
const { Title } = Typography;

interface Props {
  location: any;
}

export default function ForgotPassword({ location }: Props) {
  const navigate = useNavigate();

  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  // const { from } = location.state || { from: { pathname: "/dealer" } };

  useEffect(() => {
    document.title = "Forgot Password";
  }, []);

  return (
    <AuthConsumer>
      {({ isAuth, updateAuthToken }) => {
        return isAuth ? (
          <Navigate to={"/"} replace={true} />
        ) : (
          // <Redirect to={from} />
          <Row className="forgotPassword-form-row  ">
            <Col
              sm={24}
              md={12}
              lg={12}
              className={"forgotPassword-form-wrapper-column "}
            >
              <div className="forgotPassword-form-wrapper">
                {/* <div className="logo">
                  <img src={logo} alt="logo" />
                </div> */}
                <div className="forgotPassword-title">Forgot Password?</div>
                <p className="forgotPassword-text">Reset your password</p>

                <ForgotPasswordForm
                  OnforgotPassword={async (email: string) => {
                    setLoading(true);
                    try {
                      const {
                        data: { data },
                      } = await API_SERVICE.forgotPassword(email);
                      setLoading(false);
                      localStorage.setItem("otp-email", email);
                      notification.success({
                        message: data.successMessage,
                        placement: "bottomRight",
                      });
                      navigate("/otp");
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
            <Col sm={24} md={12} lg={12} className="forgotPassword-text-column">
              <div className="forgotPassword-text-wrapper">
                <img
                  src={forgotPasswordProp}
                  alt="forgotPassword"
                  className="img-fluid forgotPassword-prop-image"
                />
              </div>
            </Col>
          </Row>
        );
      }}
    </AuthConsumer>
  );
}
