import React from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  LoginBox,
  LoginButton,
  LoginButtonWrapper,
  LoginError,
  Option,
  LoginForm,
  LoginLink,
  LoginLogo,
  LoginTitle,
  LoginWrapper,
  LoginOptionButton
} from "./styles";
import {
  GoogleOutlined,
  MailOutlined
} from '@ant-design/icons';
import { useDispatch } from "react-redux";
import { loginUser } from "../../features/user/userSlice";
import Input from "../../components/Input";
import { notification, Divider } from "antd";

const signUpWithGoogle = () => {
  try {
    window.open(`${process.env.REACT_APP_SERVER_BASE_URL}/auth/google/callback`, "_self")
  } catch (error) {
    console.log(error);
    notification.error({
      message: error,
      duration: "1",
    });
  }
}

const loginSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email")
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
    <LoginWrapper>
      <LoginLogo to={'/'}>
        <img src="logo.png" alt="" />
        <div>World-Wise Events</div>
      </LoginLogo>

      <LoginBox>
        <Option>
          <LoginTitle style={{ marginBottom: '3rem' }}>Sign up</LoginTitle>
          <LoginOptionButton onClick={signUpWithGoogle} style={{ marginBottom: '2rem' }}>
            <GoogleOutlined style={{ marginRight: '1rem' }} />
            Continue with Google
          </LoginOptionButton>
          <LoginLink to="/register">
            <MailOutlined style={{ marginRight: '1rem' }} />
            Sign up with email
          </LoginLink>
        </Option>

        <Divider type="vertical" style={{ height: '100%' }} />

        <LoginForm action="" onSubmit={formik.handleSubmit}>
          <LoginTitle>Welcome back!</LoginTitle>
          <div>
            <Input
              type="text"
              label="Email address"
              id="email"
              name="email"
              onChange={formik.handleChange("email")}
              value={formik.values.email}
            />
            <LoginError>
              {formik.touched.email && formik.errors.email}
            </LoginError>
          </div>

          <div>
            <Input
              type="password"
              label="Password"
              id="password"
              name="password"
              onChange={formik.handleChange("password")}
              value={formik.values.password}
            />
            <LoginError>
              {formik.touched.password && formik.errors.password}
            </LoginError>
          </div>

          <LoginButtonWrapper>
            <LoginButton type="submit">Log in</LoginButton>
          </LoginButtonWrapper>
        </LoginForm>
      </LoginBox>
    </LoginWrapper>
  );
};

export default Login;
