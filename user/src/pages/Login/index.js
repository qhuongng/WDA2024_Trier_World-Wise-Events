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
} from "./styles";
import { useDispatch } from "react-redux";
import { loginUser } from "../../features/user/userSlice";
import Input from "../../components/Input";
import { notification } from "antd";

const signUpWithGoogle = () => {
  try {
    window.open("http://localhost:3600/auth/google/callback", "_self")
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
      <LoginLogo>
        <img src="logo.png" alt="" />
        <div>World-Wise Events</div>
      </LoginLogo>
      <LoginBox>
        <Option>
          <LoginTitle>Sign up</LoginTitle>
          <LoginButton onClick={signUpWithGoogle}>
            <img src="google.png" alt="" />
            Continue with Google
          </LoginButton>
          <LoginLink to="/register">
            <img src="mail.png" alt="" />
            Sign up with email
          </LoginLink>
        </Option>
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
            <LoginButton type="submit">Login</LoginButton>
          </LoginButtonWrapper>
        </LoginForm>
      </LoginBox>
    </LoginWrapper>
  );
};

export default Login;
