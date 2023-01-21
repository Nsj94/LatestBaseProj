import { Button, Form, Input } from "antd";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import eye from "../../assets/icons/eye.png";
import lockIcon from "../../assets/icons/lockIcon.png";

interface Props {
  onresetPassword: (password: any) => void;
  loading: boolean;
}

export default function ResetPasswordForm({ onresetPassword, loading }: Props) {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const params = useParams();

  function handleSubmit(values: any) {
    if (onresetPassword) {
      const { confirm } = values;
      onresetPassword(confirm);
      // const token = params.token;
      // onresetPassword({password, token});
    }
  }

  return (
    <Form
      className={"reset-password-form"}
      form={form}
      layout="vertical"
      fields={[]}
      onFinish={handleSubmit}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 20 }}
      requiredMark={false}
    >
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Password required" }]}
        label="Password"
        className={"mb-3"}
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
        hasFeedback
      >
        <Input.Password
          size="large"
          type="password"
          placeholder="password"
          className="login-input"
          autoComplete={"off"}
          placeholder="New Password"
          prefix={<img src={lockIcon} />}
          suffix={<img src={eye} />}
        />
      </Form.Item>

      <Form.Item
        className={"mb-3"}
        name="confirm"
        label="Confirm Password"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("The two passwords that you entered do not match!")
              );
            },
          }),
        ]}
      >
        <Input.Password
          size="large"
          type="password"
          placeholder="password"
          className="login-input"
          autoComplete={"off"}
          placeholder="Confirm password"
          prefix={<img src={lockIcon} />}
          suffix={<img src={eye} />}
        />
      </Form.Item>

      <br />

      <Form.Item style={{ justifyContent: "flex-end" }} className="mb-3">
        <Button
          type="primary"
          htmlType="submit"
          block
          loading={loading}
          style={{ color: "white" }}
          className="theme-button primary reset-btn"
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
