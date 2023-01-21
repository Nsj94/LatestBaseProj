import React from "react";
import Register from "shared/view/register/Register";

interface Props {
  location: any;
}

export default function RegisterPage(props: Props) {
  return <Register {...props} />;
}
