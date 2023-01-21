import React, { useState, useEffect } from "react";
import { Typography, Modal, notification, Spin } from "antd";
import API_SERVICE from "../services/api-service";

const { Text, Title, Link } = Typography;

export default function ConfirmationModal(props: any) {
  const [loading, setLoading] = useState(false);
  return (
    <Modal
      title=""
      visible={!!(props.action && props.callback)}
      onOk={async () => {
        setLoading(true);
        try {
          await props.action.apply(props.action, props.params || []);
          notification.success({ message: "Success" });
        } catch (e) {
          console.log(e);
          notification.error({ message: API_SERVICE.handleErrors(e), placement: "bottomRight" });
        } finally {
          setLoading(false);
          props.callback(true);
        }
      }}
      onCancel={() => {
        props.callback(false);
      }}
      okText={
        <span className={"btn-spin-wrapper"}>{loading && <Spin />} Yes</span>
      }
      cancelText="No"
    >
      <Text>{props.message}</Text>
    </Modal>
  );
}
