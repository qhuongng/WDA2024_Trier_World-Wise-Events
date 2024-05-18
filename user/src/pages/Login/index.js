import React from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { FormButton, FormError, FormTitle, FormWrapper } from "./styles";
import { Form, Input, Button } from "antd";
import { useDispatch } from "react-redux";
import { loginUser } from "../../features/user/userSlice";

const loginSchema = yup.object({
  email: yup
    .string()
    .email("Email should be valid")
    .required("Email address is required"),
  password: yup.string().required("Password is required"),
});

const Login = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      dispatch(loginUser(values));
    },
  });
  return (
    <FormWrapper>
      <div style={{ width: "40%", margin: "3rem" }}>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={formik.handleSubmit}
          autoComplete="off"
        >
          <FormTitle>Login Account</FormTitle>
          <Form.Item label="Email" name="email">
            <Input
              values={formik.values.email}
              onChange={formik.handleChange("email")}
              onPressEnter={formik.handleBlur("email")}
            />{" "}
            <FormError>{formik.touched.email && formik.errors.email}</FormError>
          </Form.Item>

          <Form.Item label="Password" name="password">
            <Input.Password
              values={formik.values.password}
              onChange={formik.handleChange("password")}
              onPressEnter={formik.handleBlur("password")}
            />
            <FormError>
              {formik.touched.password && formik.errors.password}
            </FormError>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <FormButton type="primary" htmlType="submit">
              Login
            </FormButton>
          </Form.Item>
        </Form>
      </div>
    </FormWrapper>
  );
};

export default Login;
