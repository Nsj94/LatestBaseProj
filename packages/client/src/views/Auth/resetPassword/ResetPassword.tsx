import React from "react";
import ResetPassword from "shared/view/resetPassword/resetPassword";

interface Props {
  location: any;
}

export default function ResetPasswordPage(props: Props) {
  return <ResetPassword {...props} />;
}
