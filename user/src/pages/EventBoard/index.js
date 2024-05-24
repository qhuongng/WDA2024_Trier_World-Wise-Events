import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  EventBoardWrapper,
  EventCreatePost,
  EventCreatePostButton,
} from "./styles";
import EventIntroduction from "./EventIntroduction";
import EventCommentsList from "./EventCommentsList";
import { useDispatch } from "react-redux";
import { getOneEvent } from "../../features/event/eventSlice";
import { setItem } from "../../features/event/eventSlice";
import { Affix, Button, Modal, Upload } from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { getAuthUser } from "../../utils/authStorage";

const EventBoard = () => {
  const user = getAuthUser();
  const { id } = useParams();
  const [on, setOn] = useState(false);
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOneEvent(id));
    return () => {
      dispatch(setItem());
    };
  }, [dispatch, id]);

  const handleOk = () => {
    setOn(false);
    setValue("");
  };

  const handleCancel = () => {
    setOn(false);
    setValue("");
  };

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
          autoSize={{ minRows: 3, maxRows: 5 }}
          style={{ background: "#F1F1F1", border: "none" }}
        />
        <Upload
          action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
          listType="picture-card"

          // fileList={fileList}
          // onPreview={handlePreview}
          // onChange={handleChange}
        >
          {/* {fileList.length >= 8 ? null : uploadButton} */}
        </Upload>
        {/* {previewImage && (
          <Image
            wrapperStyle={{
              display: "none",
            }}
            preview={{
              visible: previewOpen,
              onVisibleChange: (visible) => setPreviewOpen(visible),
              afterOpenChange: (visible) => !visible && setPreviewImage(""),
            }}
            src={previewImage}
          />
        )} */}
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
