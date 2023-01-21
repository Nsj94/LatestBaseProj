import { Button, Form, Input } from "antd";
import { useTranslation } from "react-i18next";
// import { useHistory } from "react-router-dom";
import username from "../../assets/icons/username.png";

interface Props {
  OnforgotPassword: (email: string) => void;
  loading: boolean;
}

export default function ForgotPasswordForm({
  OnforgotPassword,
  loading,
}: Props) {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  // const history = useHistory();

  function handleSubmit(values: any) {
    if (OnforgotPassword) {
      const { email } = values;
      OnforgotPassword(email);
    }
  }

  return (
    <>
      <Form
        className={"forgot-pass-form"}
        form={form}
        layout="vertical"
        fields={[]}
        initialValues={{
          email: "",
        }}
        onFinish={handleSubmit}
        requiredMark={false}
      >
        <Form.Item
          className={"mb-3"}
          label={"Enter your registered email or username"}
          name="email"
          rules={[{ required: true, message: "Email required" }]}
        >
          <Input
            autoComplete={"off"}
            size="large"
            placeholder="username/email"
            className="forgot-input"
            prefix={<img src={username} />}
          />
        </Form.Item>

        <Form.Item className="mb-3">
          <Button
            type="primary"
            htmlType="submit"
            block
            loading={loading}
            className="theme-button primary reset-btn"
          >
            Reset Password
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
