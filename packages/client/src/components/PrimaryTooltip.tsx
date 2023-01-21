import React from "react";
import { Tooltip } from "antd";

export default function PrimaryTooltip(props: any) {
  return (
    <Tooltip title={props.title} color={"#f48028"} arrowPointAtCenter>
      <span>{props.text}</span>
    </Tooltip>
  );
}
