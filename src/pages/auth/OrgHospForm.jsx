import { Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";
import { getAntdInputVald } from "../../utils/helper";

const OrgHospForm = ({ value }) => {
  return (
    <>
      <Form.Item
        label={value === "hospital" ? "hospitalName" : "organizationName"}
        name={value === "hospital" ? "hospitalName" : "organizationName"}
        rules={getAntdInputVald()}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Owner" name="owner" rules={getAntdInputVald()}>
        <Input />
      </Form.Item>
      <Form.Item label="Email" name="email" rules={getAntdInputVald()}>
        <Input />
      </Form.Item>
      <Form.Item label="password" name="password" rules={getAntdInputVald()}>
        <Input type="password" />
      </Form.Item>
      <Form.Item label="website" name="website">
        <Input />
      </Form.Item>
      <Form.Item label="phone" name="phone" rules={getAntdInputVald()}>
        <Input />
      </Form.Item>
      <Form.Item
        label="address"
        name="address"
        className="col-span-2"
        rules={getAntdInputVald()}
      >
        <TextArea />
      </Form.Item>
    </>
  );
};

export default OrgHospForm;
