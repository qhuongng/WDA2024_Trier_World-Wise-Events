import React, { useEffect } from "react";
import { getAuthUser } from "../../utils/authStorage";
import {
  EventIntroductionImage,
  EventIntroductionLeft,
  EventIntroductionWrapper,
  EventIntroductionQuizButton,
} from "./styles";
import { Carousel, Row, Col } from "antd";
import { useSelector } from "react-redux";

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

  return (
    <EventIntroductionWrapper>
      {item && (
        <Row wrap={false}>
          <Col span={12}>
            <EventIntroductionLeft>
              <div className="title">{item.eventName}</div>
              <div className="country">{item.city}</div>
              <div className="time">{duration}</div>
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
            <Carousel autoplay autoplaySpeed={2000} dots={false}>
              {item.images.map((image) => (
                <EventIntroductionImage>
                  <img
                    src={`http://localhost:3600/api/image/getImage/${image}`}
                    alt=""
                  />
                </EventIntroductionImage>
              ))}
            </Carousel>
          </Col>
        </Row>
      )}
    </EventIntroductionWrapper>
  );
};

export default EventIntroduction;
