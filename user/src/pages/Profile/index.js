import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingOutlined } from '@ant-design/icons';
import { getAuthUser } from '../../utils/authStorage';
import { updateUser, resetPass } from '../../features/user/userSlice';
import { getUserResult } from '../../features/quiz/quizSlice';
import { Button, ConfigProvider, Spin } from 'antd';
import * as yup from 'yup';
import { useFormik } from 'formik';
import {
  ProfilePhoto,
  ProfileTitle,
  ProfileSubtitle,
  ProfileWrapper,
  ProfileLeft,
  ProfileRight,
  ProfileButton,
  ProfileError
} from './styles';
import QuizHistoryItem from '../../components/QuizHistoryItem';
import Input from '../../components/Input';

const updateProfileSchema = yup.object({
  username: yup
    .string()
    .required('Username is required'),
  email: yup
    .string()
    .email('Invalid email')
    .required('Email address is required'),
});

const updatePasswordSchema = yup.object({
  oldPassword: yup
    .string()
    .required('Password is required'),
  newPassword: yup
    .string()
    .required('New password is required'),
  confirmPassword: yup
    .string()
    .required("Password confirmation is required")
    .oneOf([yup.ref("newPassword")], "Passwords do not match"),
});

const Profile = () => {
  const user = getAuthUser();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const quizHistory = useSelector((state) => state.quiz.results) || null;

  const [updateButtonDisabled, setUpdateButtonDisabled] = useState(true);
  const [updatePasswordButtonDisabled, setUpdatePasswordButtonDisabled] = useState(true);
  const [updateEmailDisabled, setUpdateEmailDisabled] = useState(user?.googleID !== "" ? true : false);

  const updateProfileFormik = useFormik({
    initialValues: {
      id: user?._id,
      username: user?.username,
      email: user?.email,
    },
    validationSchema: updateProfileSchema,
    onSubmit: (values) => {
      dispatch(updateUser(values));
      setUpdateButtonDisabled(true);
    },
  });

  const updatePasswordFormik = useFormik({
    initialValues: {
      id: user?._id,
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    },
    validationSchema: updatePasswordSchema,
    onSubmit: (values) => {
      dispatch(resetPass(values));
      setUpdatePasswordButtonDisabled(true);
    },
  });

  const updateAvatar = () => {

  }

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      dispatch(getUserResult(user._id));
    }
  }, [dispatch, user, navigate]);

  return (
    <ProfileWrapper>
      <ProfileLeft>
        <ProfileTitle>Account</ProfileTitle>
        {(user?.googleID === '' || user?.googleID === null || user?.googleID === undefined) ?
          <ProfilePhoto
            style={{
              backgroundImage: `url(${process.env.REACT_APP_SERVER_API_URL}/image/getImage/${user?.avatar})`,
            }} /> 
          :
          <ProfilePhoto
            style={{
              backgroundImage: `url(${user?.avatar})`,
            }} />
        }

        <div style={{ marginBottom: '1rem' }}>
          <Input
            type='text'
            label='Username'
            id='username'
            name='username'
            onChange={(e) => {
              setUpdateButtonDisabled(false);
              updateProfileFormik.handleChange(e);
            }}
            value={updateProfileFormik.values.username}
          />
          <ProfileError>
            {updateProfileFormik.touched.username && updateProfileFormik.errors.username}
          </ProfileError>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <Input
            type='text'
            label='Email address'
            id='email'
            name='email'
            onChange={(e) => {
              setUpdateButtonDisabled(false);
              updateProfileFormik.handleChange(e);
            }}
            value={updateProfileFormik.values.email}
            disabled={updateEmailDisabled}
          />
          <ProfileError>
            {updateProfileFormik.touched.email && updateProfileFormik.errors.email}
          </ProfileError>
        </div>

        <ProfileButton
          style={{ marginBottom: '3rem' }}
          type='submit'
          disabled={updateButtonDisabled}
          onClick={updateProfileFormik.handleSubmit}>
          Update profile
        </ProfileButton>

        {(user?.googleID === undefined || user?.googleID === null || user?.googleID === "") &&
          <>
            <ProfileSubtitle>Reset Password</ProfileSubtitle>

            <div style={{ marginBottom: '1rem' }}>
              <Input
                type='password'
                label='Old password'
                id='oldPassword'
                name='oldPassword'
                onChange={(e) => {
                  setUpdatePasswordButtonDisabled(false);
                  updatePasswordFormik.handleChange(e);
                }}
                value={updatePasswordFormik.values.oldPassword}
              />
              <ProfileError>
                {updatePasswordFormik.touched.oldPassword && updatePasswordFormik.errors.oldPassword}
              </ProfileError>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <Input
                type='password'
                label='New password'
                id='newPassword'
                name='newPassword'
                onChange={(e) => {
                  setUpdatePasswordButtonDisabled(false);
                  updatePasswordFormik.handleChange(e);
                }}
                value={updatePasswordFormik.values.newPassword}
              />
              <ProfileError>
                {updatePasswordFormik.touched.newPassword && updatePasswordFormik.errors.newPassword}
              </ProfileError>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <Input
                type='password'
                label='Confirm new password'
                id='confirmPassword'
                name='confirmPassword'
                onChange={(e) => {
                  setUpdatePasswordButtonDisabled(false);
                  updatePasswordFormik.handleChange(e);
                }}
                value={updatePasswordFormik.values.confirmPassword}
              />
              <ProfileError>
                {updatePasswordFormik.touched.confirmPassword && updatePasswordFormik.errors.confirmPassword}
              </ProfileError>
            </div>

            <ProfileButton
              type='submit'
              disabled={updatePasswordButtonDisabled}
              onClick={updatePasswordFormik.handleSubmit}>
              Update password
            </ProfileButton>
          </>}
      </ProfileLeft>

      <ProfileRight>
        <ProfileTitle>Quiz history</ProfileTitle>
        {quizHistory ?
          quizHistory.data.map(history => (
            <QuizHistoryItem history={history}></QuizHistoryItem>))
          :
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: '#bb0070'
              },
            }}
          >
            <Spin indicator={<LoadingOutlined style={{ fontSize: 36, marginTop: '3rem' }} spin />} />
          </ConfigProvider>
        }
      </ProfileRight>
    </ProfileWrapper>
  );
};

export default Profile;
