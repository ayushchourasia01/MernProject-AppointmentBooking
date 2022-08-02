import { Button, Form, Input } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/AlertsSlice";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post("/api/user/register", {
        ...values,
        fullName: `${values.firstName} ${values.lastName}`,
      });
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
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
        <h1 className="card-title">Stay Healthy</h1>
        <Form className="register-form" onFinish={onFinish} autoComplete="off">
          <div className="full-name">
            <Form.Item
              name="firstName"
              rules={[{ required: true, message: "Invalid Input!" }]}
            >
              <Input placeholder="First Name" />
            </Form.Item>
            <Form.Item
              name="lastName"
              rules={[{ required: true, message: "Invalid Input!" }]}
            >
              <Input placeholder="Last Name" />
            </Form.Item>
          </div>
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
            REGISTER
          </Button>
          <Link to="/login" className="login-link">
            CLICK HERE TO LOGIN
          </Link>
        </Form>
      </div>
    </div>
  );
}

export default Register;
