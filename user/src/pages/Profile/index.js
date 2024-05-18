import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { getAuthUser } from "../../utils/authStorage";
import { useDispatch } from "react-redux";
import { FormOutlined } from "@ant-design/icons";
import { FormTitleWrapper } from "./styles";
import { Form, Input } from "antd";
import { updateUser } from "../../features/user/userSlice";
import {
  FormButton,
  FormError,
  FormInputWrapper,
  FormTitle,
  FormWrapper,
} from "../Login/styles";

const profileSchema = yup.object({
  userName: yup.string().required("Username is required!"),
  email: yup
    .string()
    .email("Email should be valid!")
    .required("Email address is required!"),
  phoneNumber: yup.string().required("Mobile number is required!"),
});

const Profile = () => {
  const [componentDisabled, setComponentDisabled] = useState(true);
  const user = getAuthUser();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      userName: user?.userName,
      email: user?.email,
      phoneNumber: user?.phoneNumber,
    },
    validationSchema: profileSchema,
    onSubmit: (values) => {
      dispatch(updateUser(values));
      setComponentDisabled(true);
    },
  });
  const handleClickUpdate = () => {
    setComponentDisabled(!componentDisabled);
  };
  return (
    <div>
      <BreadcrumbCustom />

      <FormWrapper>
        <div>
          <FormTitleWrapper style={{ width: "100%", position: "relative" }}>
            <FormTitle>Profile</FormTitle>
            <FormOutlined
              style={{ position: "absolute", right: "10%" }}
              onClick={handleClickUpdate}
            />
          </FormTitleWrapper>

          <FormInputWrapper
            disabled={componentDisabled}
            onFinish={formik.handleSubmit}
          >
            <Form.Item label="Username" name="userName">
              <Input
                defaultValue={formik.values.userName}
                values={formik.values.userName}
                onChange={formik.handleChange("userName")}
                onPressEnter={formik.handleBlur("userName")}
              />
              <FormError>
                {formik.touched.userName && formik.errors.userName}
              </FormError>
            </Form.Item>

            <Form.Item label="Email" name="email">
              <Input
                defaultValue={formik.values.email}
                values={formik.values.email}
                onChange={formik.handleChange("email")}
                onPressEnter={formik.handleBlur("email")}
              />
              <FormError>
                {formik.touched.email && formik.errors.email}
              </FormError>
            </Form.Item>

            <Form.Item label="Mobile number" name="phoneNumber">
              <Input
                defaultValue={formik.values.phoneNumber}
                values={formik.values.phoneNumber}
                onChange={formik.handleChange("phoneNumber")}
                onPressEnter={formik.handleBlur("phoneNumber")}
              />
              <FormError>
                {formik.touched.phoneNumber && formik.errors.phoneNumber}
              </FormError>
            </Form.Item>

            {!componentDisabled ? (
              <Form.Item>
                <FormButton type="primary" htmlType="submit">
                  Updated
                </FormButton>
              </Form.Item>
            ) : (
              <></>
            )}
          </FormInputWrapper>
        </div>
      </FormWrapper>
    </div>
  );
};

export default Profile;
