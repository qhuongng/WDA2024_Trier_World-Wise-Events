import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { EventBoardWrapper, ModalButton, ModalSecondaryButton } from "./styles";
import EventIntroduction from "./EventIntroduction";
import EventCommentsList from "./EventCommentsList";
import { useDispatch } from "react-redux";
import { getOneEvent } from "../../features/event/eventSlice";
import { setItem } from "../../features/event/eventSlice";
import { notification, FloatButton, Modal, Upload, ConfigProvider } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { getAuthUser } from "../../utils/authStorage";
import { createSinglePost } from "../../features/post/postSlice";

const imgTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp', 'image/bmp', 'image/tiff'];

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const EventBoard = () => {
  const user = getAuthUser();
  const navigate = useNavigate();
  const { id } = useParams();
  const [on, setOn] = useState(false);
  const [value, setValue] = useState("");
  const [fileList, setFileList] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOneEvent(id));
    return () => {
      dispatch(setItem());
    };
  }, [dispatch, id]);

  const handleOk = () => {
    const formData = new FormData();
    formData.append("idEvent", id);
    formData.append("idUser", user._id);
    if (value === "") {
      return;
    }
    formData.append("text", value);
    if (fileList.length === 1) {
      formData.append("image", fileList[0]);
    }
    dispatch(createSinglePost(formData));
    setOn(false);
    setValue("");
  };

  const handleCancel = () => {
    setOn(false);
    setFileList([]);
  };

  const props = {
    listType: "picture-card",
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

  return (
    <>
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
          title="Make a post"
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
          <TextArea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Comment"
            autoSize={{ minRows: 10, maxRows: 5 }}
            style={{
              background: "#e1daff",
              border: "none",
              marginTop: "1rem",
              marginBottom: "1rem",
            }}
          />

          <Upload {...props}>
            {fileList.length < 1 ? uploadButton : null}
          </Upload>
        </Modal>
      </ConfigProvider >

      <EventBoardWrapper>
        <EventIntroduction />

        <EventCommentsList />

        {!on && (
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: '#bb0070'
              },
            }}
          >
            <FloatButton
              tooltip={<div>Create post</div>}
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                if (!user) {
                  navigate('/login');
                  return;
                }

                setOn(!on);
              }}
              style={{ width: '3.5rem', height: '3.5rem', marginRight: '1rem', marginBottom: '1rem' }}
            />
          </ConfigProvider>
        )}
      </EventBoardWrapper>
    </>
  );
};

export default EventBoard;
