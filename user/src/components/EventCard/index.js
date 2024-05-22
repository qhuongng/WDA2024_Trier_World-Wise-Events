import React from "react";
import {
  EventCardImage,
  EventCardInfo,
  EventCardDuration,
  EventCardLocation,
  EventCardTitle,
  OngoingEventCardTitle,
  EventCardWrapper,
  OngoingEventCardWrapper,
  EventCardOngoingTag,
  EventCardDurationWrapper
} from "./styles";

function formatDuration(startDate, endDate) {
  const options = { month: "short", day: "numeric", year: "numeric" };
  const start = new Date(startDate);
  const end = new Date(endDate);

  const formattedStartDate = start.toLocaleDateString("en-US", options);
  const formattedEndDate = end.toLocaleDateString("en-US", options);

  return `${formattedStartDate} - ${formattedEndDate}`;
}

const EventCard = ({ item }) => {
  const duration = formatDuration(item.startDate, item.endDate);

  if (item.isOngoing) {
    return (
      <OngoingEventCardWrapper to={item.id}>
        <EventCardImage
          style={{
            backgroundImage: `url(${process.env.REACT_APP_SERVER_URL}/image/getImage/${item.images[0]})`,
          }}
        />

        <EventCardInfo>
          <OngoingEventCardTitle>{item.eventName}</OngoingEventCardTitle>
          <EventCardLocation>{item.city}, {item.country}</EventCardLocation>
          <EventCardDurationWrapper>
            <EventCardDuration>{duration} •</EventCardDuration>
            <EventCardOngoingTag>Ongoing</EventCardOngoingTag>
          </EventCardDurationWrapper>
        </EventCardInfo>
      </OngoingEventCardWrapper >
    );
  } else {
    return (
      <EventCardWrapper to={item.id}>
        <EventCardImage
          style={{
            backgroundImage: `url(${process.env.REACT_APP_SERVER_URL}/image/getImage/${item.images[0]})`,
          }}
        />

        <EventCardInfo>
          <EventCardTitle>{item.eventName}</EventCardTitle>
          <EventCardLocation>{item.city}, {item.country}</EventCardLocation>
          <EventCardDurationWrapper>
            <EventCardDuration>{duration}</EventCardDuration>
          </EventCardDurationWrapper>
        </EventCardInfo>
      </EventCardWrapper>
    );
  }
};

export default EventCard;
