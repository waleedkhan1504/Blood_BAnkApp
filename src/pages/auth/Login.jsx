import { Button, Form, Input, Radio, message } from "antd";
import React, { useState } from "react";
import { getAntdInputVald } from "../../utils/helper";
import FormItem from "antd/es/form/FormItem";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser } from "../../apicalls/auth";
import { useDispatch, useSelector } from "react-redux";
import { SetLoading } from "../../redux/loaderSlice";

const Login = () => {
  const [userType, setUserType] = useState("donar");
  const { loading } = useSelector((state) => state.loaders);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const response = await LoginUser({ ...values, userType });
      dispatch(SetLoading(true));
      if (response?.success) {
        message.success(response?.message);
        localStorage.setItem("token", response.token);
        dispatch(SetLoading(true));
      } else throw new Error(response?.message);
    } catch (error) {
      message.error(error.message);
      dispatch(SetLoading(false));
    }
    if (localStorage.getItem("token")) {
      navigate("/");
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
            <span className="text-primary">{userType}-LOGIN</span>
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
          <FormItem label="Email" name="email" rules={getAntdInputVald()}>
            <Input type="email"></Input>
          </FormItem>
          <FormItem label="Password" name="password" rules={getAntdInputVald()}>
            <Input type="password"></Input>
          </FormItem>
          <Button type="primary" block className="col-span-2" htmlType="submit">
            Login
          </Button>
          <Link
            to="/register"
            className="col-span-2 text-center text-gray-600 underline"
          >
            Don't have an account ? Register
          </Link>
        </Form>
      </div>
    </div>
  );
};

export default Login;
