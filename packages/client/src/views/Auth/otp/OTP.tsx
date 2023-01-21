import React from "react";
import OTP from "shared/view/otp/OTP";

interface Props {
  location: any;
}

export default function OtpPage(props: Props) {
  return <OTP {...props} />;
}
