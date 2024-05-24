import React from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  LoginBox,
  LoginButton,
  LoginButtonWrapper,
  LoginError,
  LoginForm,
  LoginLink,
  LoginLogo,
  LoginTitle,
  LoginWrapper,
} from "./styles";
import { useDispatch } from "react-redux";
import { loginUser } from "../../features/user/userSlice";
import Input from "../../components/Input";

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
            <LoginLink to="/register">Sign Up</LoginLink>
            <LoginButton type="submit">Login</LoginButton>
          </LoginButtonWrapper>
        </LoginForm>
      </LoginBox>
    </LoginWrapper>
  );
};

export default Login;
