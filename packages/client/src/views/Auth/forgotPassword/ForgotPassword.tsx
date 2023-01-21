import React from "react";
import ForgotPassword from "shared/view/forgotPassword/forgotPassword";

interface Props {
  location: any;
}

export default function ForgotPassPage(props: Props) {
  return <ForgotPassword {...props} />;
}
