import Login from "shared/view/login/Login";

interface Props {
  location: any;
}

export default function LoginPage(props: Props) {
  return <Login {...props} />;
}
