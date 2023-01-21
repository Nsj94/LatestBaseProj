import { Col, Row, notification } from "antd";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import ResetPasswordForm from "./resetPasswordForm";

import { useTranslation } from "react-i18next";
import resetPasswordProp from "shared/assets/images/loginPageImg.png";
import "./resetPassword.scss";

import API_SERVICE from "client/src/services/api-service";
import { AuthConsumer } from "shared/contexts/AuthContext";

interface Props {
  location: any;
}

export default function ResetPassword({ location }: Props) {
  const { t } = useTranslation();
  const history = useNavigate();
  const [loading, setLoading] = useState(false);
  // const { from } = location.state || { from: { pathname: "/dealer" } };

  return (
    <AuthConsumer>
      {({ isAuth, updateAuthToken }) => {
        return isAuth ? (
          <Navigate to={"/admin"} replace={true} />
        ) : (
          <Row className="resetPassword-form-row">
            <Col
              sm={10}
              md={12}
              lg={12}
              className={"resetPassword-form-wrapper-column"}
            >
              <div className="resetPassword-form-wrapper">
                <Row>
                  <Col>
                    {/* <div className="logo">
                        <img src={logo} alt="logo" />
                      </div> */}
                    <div className="resetPassword-title">Set new password</div>
                    <p className="resetPassword-text">
                      Enter new password which you have not used earlier
                    </p>
                  </Col>
                </Row>
                <ResetPasswordForm
                  onresetPassword={async (password: any) => {
                    setLoading(true);
                    try {
                      const uuid = JSON.parse(localStorage.getItem("uuid")!);
                      await API_SERVICE.changePassword(uuid, password);
                      console.log(uuid, password);
                      notification.success({
                        message: "Password changed",
                        placement: "bottomRight",
                      });
                      setLoading(false);
                      navigate("/");
                      localStorage.clear();
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
            <Col sm={10} md={12} lg={12} className="resetPassword-text-column">
              <div className="resetPassword-text-wrapper">
                <img
                  src={resetPasswordProp}
                  alt="forgotPassword"
                  className="img-fluid resetPassword-prop-image"
                />
              </div>
            </Col>
          </Row>
        );
      }}
    </AuthConsumer>
  );
}
