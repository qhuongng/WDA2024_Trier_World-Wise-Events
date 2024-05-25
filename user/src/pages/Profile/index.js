import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { getAuthUser } from '../../utils/authStorage';
import { updateUser, resetPass, updateAvatar } from '../../features/user/userSlice';
import { getUserResult } from '../../features/quiz/quizSlice';
import { ConfigProvider, notification, Spin, Modal, Upload } from 'antd';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { ModalButton, ModalSecondaryButton } from '../EventBoard/styles';
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

const imgTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp', 'image/bmp', 'image/tiff'];

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

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
  const [fileList, setFileList] = useState([]);
  const [on, setOn] = useState(false);

  const handleOk = () => {
    const formData = new FormData();
    if (fileList.length === 1) {
      formData.append("image", fileList[0]);
    }
    dispatch(updateAvatar(formData));
    setOn(false);
  };
  const handleCancel = () => {
    setOn(false);
    setFileList([]);
  };

  const props = {
    listType: "picture-circle",
    showUploadList: { showPreviewIcon: false },
    maxCount: 1,
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: async (file) => {
      const isImg = imgTypes.includes(file.type);

      if (!isImg) {
        notification.error({
          message: 'Incorrect file type',
          description: `${file.name} is not an image file.`,
          duration: '3'
        });
      }
      else {
        file.url = await getBase64(file);
        setFileList([...fileList, file]);
      }

      return false;
    },
    fileList,
  };

  const uploadButton = (
    <button
      type="button"
      style={{
        border: 0,
        background: "none",
      }}
    >
      <PlusOutlined />
      <div>Upload a photo</div>
    </button>
  );

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
              backgroundImage: `url(${process.env.REACT_APP_SERVER_BASE_URL}/api/image/getImage/${user?.avatar})`,
            }}
            onClick={() => { setOn(!on) }} />
          :
          <ProfilePhoto
            style={{
              backgroundImage: `url(${user?.avatar})`,
            }}

          >

          </ProfilePhoto>
        }

        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#2000bb',
              borderRadius: 12,
              titleColor: '#2000bb',
              fontFamily: 'Inter',
              titleFontSize: '1.1rem'
            },
          }}>
          <Modal
            title="Change avatar"
            style={{ fontFamily: 'Inter' }}
            open={on}
            onCancel={handleCancel}
            footer={[
              <ModalSecondaryButton onClick={handleCancel}>
                Cancel
              </ModalSecondaryButton>,
              <ModalButton onClick={handleOk}>
                Post
              </ModalButton>
            ]}>
            <Upload {...props}>
              {fileList.length < 1 ? uploadButton : null}
            </Upload>
          </Modal>
        </ConfigProvider >
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
