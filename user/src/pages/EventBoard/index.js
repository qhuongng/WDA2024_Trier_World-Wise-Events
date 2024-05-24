import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { EventBoardWrapper, EventCreatePostButton } from "./styles";
import EventIntroduction from "./EventIntroduction";
import EventCommentsList from "./EventCommentsList";
import { useDispatch } from "react-redux";
import { getOneEvent } from "../../features/event/eventSlice";
import { setItem } from "../../features/event/eventSlice";
import { Affix, Modal, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { getAuthUser } from "../../utils/authStorage";
import { createSinglePost } from "../../features/post/postSlice";

const EventBoard = () => {
  const user = getAuthUser();
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
  };

  const handleChange = (e) => {
    setFileList([e.file.originFileObj]);
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
      <div>Upload</div>
    </button>
  );

  return (
    <>
      <Modal
        title="Make a post"
        open={on}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <TextArea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Comment"
          autoSize={{ minRows: 10, maxRows: 5 }}
          style={{
            background: "#F1F1F1",
            border: "none",
            marginBottom: "1rem",
          }}
        />
        <Upload
          listType="picture-card"
          onChange={handleChange}
          showUploadList={{ showPreviewIcon: false }}
        >
          {fileList.length < 1 ? uploadButton : null}
        </Upload>
      </Modal>
      <EventBoardWrapper>
        <EventIntroduction />
        <EventCommentsList />
        {!on && (
          <Affix
            offsetTop={100}
            style={{ position: "absolute", top: "70%", right: 50 }}
          >
            <EventCreatePostButton
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setOn(!on)}
            />
          </Affix>
        )}
      </EventBoardWrapper>
    </>
  );
};

export default EventBoard;
