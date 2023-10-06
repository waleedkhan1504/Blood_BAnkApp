import React, { useState } from "react";
import { Form, Input, Radio, Button, message } from "antd";
import FormItem from "antd/es/form/FormItem";
import { Link, useNavigate } from "react-router-dom";
import OrgHospForm from "./OrgHospForm";
import { getAntdInputVald } from "../../utils/helper";
import { RegisterUser } from "../../apicalls/auth";
const Register = () => {
  const [userType, setUserType] = useState("donar");
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const response = await RegisterUser({ ...values, userType });
      if (response?.success) {
        message.success(response?.message);
        navigate("/login");
      } else throw new Error(response?.message);
    } catch (error) {
      message.error(error.message);
    }
  };
  return (
    <div className="reg">
      <div className=" flex h-screen justify-center items-center  bg-primary">
        <Form
          layout="vertical"
          className="bg-white  rounded shadow grid grid-cols-2 p-5 gap-5 w-1/2"
          onFinish={onFinish}
        >
          <h2 className="col-span-2 uppercase text-2xl">
            <span className="text-primary">{userType}-REGISTRATION</span>
            <hr />
          </h2>
          <Radio.Group
            className="col-span-2"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
          >
            <Radio value="donar">Donar</Radio>
            <Radio value="organization">Organization</Radio>
            <Radio value="hospital">Hospital</Radio>
          </Radio.Group>

          {userType === "donar" && (
            <>
              <FormItem label="Name" name="name" rules={getAntdInputVald()}>
                <Input type="text"></Input>
              </FormItem>
              <FormItem label="Email" name="email" rules={getAntdInputVald()}>
                <Input type="email"></Input>
              </FormItem>
              <FormItem
                label="Password"
                name="password"
                rules={getAntdInputVald()}
              >
                <Input type="password"></Input>
              </FormItem>
              <FormItem label="Phone" name="phone" rules={getAntdInputVald()}>
                <Input type="number"></Input>
              </FormItem>
            </>
          )}
          {userType !== "donar" && (
            <>
              <OrgHospForm value={userType} />
            </>
          )}

          <Button type="primary" block className="col-span-2" htmlType="submit">
            Register
          </Button>
          <Link
            to="/login"
            className="col-span-2 text-center text-gray-600 underline"
          >
            Already have an account ? Login
          </Link>
        </Form>
      </div>
    </div>
  );
};

export default Register;
