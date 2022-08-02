import { Button, Form, Input } from "antd";
import React from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/AlertsSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post("/api/user/login", values);
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("token", response.data.data);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="authentication">
      <div className="authentication-form card p-3">
        <h1 className="card-title">Welcome Back</h1>
        <Form className="register-form" onFinish={onFinish} autoComplete="off">
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Invalid Input!" }]}
          >
            <Input placeholder="Email Address" type="email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Invalid Input!" }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Button className="primary-button my-2" htmlType="submit">
            LOGIN
          </Button>
          <Link to="/register" className="login-link">
            REGISTER HERE
          </Link>
        </Form>
      </div>
    </div>
  );
}

export default Login;
