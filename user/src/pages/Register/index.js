import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { registerUser } from "../../features/user/userSlice";
import {
  RegisterBox,
  RegisterButton,
  RegisterError,
  RegisterForm,
  RegisterLogo,
  RegisterTitle,
  RegisterWrapper,
  Option,
  RegisterLink,
  RegisterOptionButton
} from "./styles";
import Input from "../../components/Input";
import { notification, Divider } from "antd";
import {
  GoogleOutlined,
  MailOutlined
} from '@ant-design/icons';

const signUpWithGoogle = () => {
  try {
    window.open(`${process.env.REACT_APP_SERVER_BASE_URL}/auth/google/callback`, "_self")
  } catch (error) {
    notification.error({
      message: error,
      duration: "1",
    });
  }
}

const registerSchema = yup.object({
  username: yup.string().required("Username is required"),
  email: yup
    .string()
    .email("Invalid email")
    .required("Email address is required"),
  password: yup.string().required("Password is required"),
});

const Register = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      dispatch(registerUser(values));
    },
  });

  return (
    <RegisterWrapper>
      <RegisterLogo to='/'>
        <img src="logo.png" alt="" />
        <div>World-Wise Events</div>
      </RegisterLogo>
      <RegisterBox>
        <Option>
          <RegisterTitle style={{ marginBottom: '3rem' }}>Log in</RegisterTitle>
          <RegisterOptionButton onClick={signUpWithGoogle} style={{ marginBottom: '2rem' }}>
            <GoogleOutlined style={{ marginRight: '1rem' }} />
            Continue with Google
          </RegisterOptionButton>
          <RegisterLink to="/login">
            <MailOutlined style={{ marginRight: '1rem' }} />
            Log in with email
          </RegisterLink>
        </Option>

        <Divider type="vertical" style={{ height: '100%' }} />

        <RegisterForm action="" onSubmit={formik.handleSubmit}>
          <RegisterTitle>Join us!</RegisterTitle>
          <div>
            <Input
              type="text"
              label="Username"
              id="username"
              name="username"
              onChange={formik.handleChange("username")}
              value={formik.values.username}
            />
            <RegisterError>
              {formik.touched.username && formik.errors.username}
            </RegisterError>
          </div>
          <div>
            <Input
              type="text"
              label="Email address"
              id="email"
              name="email"
              onChange={formik.handleChange("email")}
              value={formik.values.email}
            />
            <RegisterError>
              {formik.touched.email && formik.errors.email}
            </RegisterError>
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
            <RegisterError>
              {formik.touched.password && formik.errors.password}
            </RegisterError>
          </div>
          <div>
            <Input
              type="password"
              label="Confirm password"
              id="confirmPassword"
              name="confirmPassword"
              onChange={formik.handleChange("confirmPassword")}
              value={formik.values.confirmPassword}
            />
            <RegisterError>
              {formik.touched.confirmPassword && formik.errors.confirmPassword}
            </RegisterError>
          </div>
          <RegisterButton type="submit">Sign up</RegisterButton>
        </RegisterForm>
      </RegisterBox>
    </RegisterWrapper>
  );
};

export default Register;
