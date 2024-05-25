import React, { useEffect } from "react";
import { getAuthUser } from "../../utils/authStorage";
import {
  EventIntroductionImage,
  EventIntroductionLeft,
  EventIntroductionWrapper,
  EventIntroductionQuizButton,
  EventBoardTop
} from "./styles";
import { Carousel, Row, Col, ConfigProvider, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import EventQuizLeaderboard from "./EventQuizLeaderboard";

function formatDuration(startDate, endDate) {
  const options = { month: "short", day: "numeric", year: "numeric" };
  const start = new Date(startDate);
  const end = new Date(endDate);

  const formattedStartDate = start.toLocaleDateString("en-US", options);
  const formattedEndDate = end.toLocaleDateString("en-US", options);

  return `${formattedStartDate} - ${formattedEndDate}`;
}

const EventIntroduction = () => {
  const user = getAuthUser();
  const item = useSelector((state) => state.event.singleEvent) || null;
  const duration = item ? formatDuration(item.startDate, item.endDate) : "";

  return item ? (
    <EventBoardTop>
      <EventIntroductionWrapper>
        <Row wrap={false} style={{ minHeight: '20rem' }}>
          <Col span={11}>
            <EventIntroductionLeft>
              <div className="title">{item.eventName}</div>
              <div className="country">
                {item.city}, {item.country}
              </div>
              <div className="time">
                {duration}
                {item.isOngoing ? (
                  <span className="ongoing-glyph">•</span>
                ) : (
                  <></>
                )}
                {item.isOngoing ? (
                  <span className="ongoing">Ongoing</span>
                ) : (
                  <></>
                )}
              </div>
              <div className="description">{item.description}</div>
              {user ? (
                <EventIntroductionQuizButton
                  item={item}
                  to={`../../quiz/${item.id}/intro`}
                >
                  Take quiz
                </EventIntroductionQuizButton>
              ) : (
                <EventIntroductionQuizButton item={null} to={`/login`}>
                  Take quiz
                </EventIntroductionQuizButton>
              )}
            </EventIntroductionLeft>
          </Col>
          <Col>
            <Carousel autoplay autoplaySpeed={2000} dots={false} infinite>
              {item.images.map((image) => (
                <EventIntroductionImage>
                  <img
                    src={`${process.env.REACT_APP_SERVER_API_URL}/image/getImage/${image}`}
                    alt=""
                  />
                </EventIntroductionImage>
              ))}
            </Carousel>
          </Col>
        </Row>
      </EventIntroductionWrapper>

      <EventQuizLeaderboard id={item.id} />

    </EventBoardTop>
  ) : (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#bb0070",
          borderRadius: 12,
          colorBgContainer: "#ffffff",
          itemActiveBg: "#e1daff",
        },
      }}
    >
      <Spin
        indicator={
          <LoadingOutlined style={{ fontSize: 36, marginTop: "3rem" }} spin />
        }
      />
    </ConfigProvider>
  );
};

export default EventIntroduction;
