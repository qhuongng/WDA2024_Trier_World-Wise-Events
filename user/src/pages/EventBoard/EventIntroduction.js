import React, { useEffect } from "react";
import {
  EventIntroductionImage,
  EventIntroductionLeft,
  EventIntroductionWrapper,
} from "./styles";
import { Carousel, Row, Col } from "antd";

function formatDuration(startDate, endDate) {
  const options = { month: "short", day: "numeric", year: "numeric" };
  const start = new Date(startDate);
  const end = new Date(endDate);

  const formattedStartDate = start.toLocaleDateString("en-US", options);
  const formattedEndDate = end.toLocaleDateString("en-US", options);

  return `${formattedStartDate} - ${formattedEndDate}`;
}

const EventIntroduction = ({ item }) => {
  const duration = formatDuration(item.startDate, item.endDate);
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
              <button>Take quiz</button>
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
