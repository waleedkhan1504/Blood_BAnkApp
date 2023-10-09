import { Form, Input, Modal, Radio, Select, message } from "antd";
import React, { useState } from "react";
import { getAntdInputVald } from "../../../utils/helper";
import { Option } from "antd/es/mentions";
import { useDispatch, useSelector } from "react-redux";
import { AddInventory } from "../../../apicalls/inventory";
import { SetLoading } from "../../../redux/loaderSlice";
const InventoryForm = ({ open, setOpen, reloadData }) => {
  const { currentUser } = useSelector((state) => state.users);
  const [inventoryType, setInventoryType] = useState("in");
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    //console.log(values);
    try {
      // dispatch(SetLoading(true));
      const response = await AddInventory({
        ...values,
        inventoryType,
        organization: currentUser._id,
      });
      if (response?.success) {
        dispatch(SetLoading(true));
        reloadData();
        message.success(response?.message);
        setOpen(false);
        dispatch(SetLoading(false));
      } else {
        throw new Error(response?.message);
      }
    } catch (error) {
      message.error(error?.message);
      dispatch(SetLoading(false));
    }
  };
  return (
    <div>
      <Modal
        title="Add inventory"
        centered
        open={open}
        onCancel={() => setOpen(false)}
        onOk={() => form.submit()}
      >
        <Form
          layout="vertical"
          className="flex flex-col gap-3"
          form={form}
          onFinish={onFinish}
        >
          <Form.Item label="Inventory Type" rules={getAntdInputVald()}>
            <Radio.Group
              value={inventoryType}
              onChange={(e) => setInventoryType(e.target.value)}
            >
              <Radio value="in">In</Radio>
              <Radio value="out">Out</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="Blood Group"
            name="bloodGroup"
            rules={getAntdInputVald()}
          >
            <Select name="" id="">
              <Select.Option value="a+">A+</Select.Option>
              <Select.Option value="o-">0-</Select.Option>
              <Select.Option value="ab+">AB+</Select.Option>
              <Select.Option value="ab-">AB-</Select.Option>
              <Select.Option value="o+">O+</Select.Option>
              <Select.Option value="a-">A-</Select.Option>
              <Select.Option value="b-">B-</Select.Option>

              <Option value="b">B+</Option>
              <Option value="a">A</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label={inventoryType === "out" ? "hospital Email" : "donar Email"}
            name="email"
            rules={getAntdInputVald()}
          >
            <Input type="email"></Input>
          </Form.Item>
          <Form.Item
            label="Quantity (ML)"
            name="quantity"
            rules={getAntdInputVald()}
          >
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default InventoryForm;
