import React from "react";
import {
  EventCardImage,
  EventCardInfo,
  EventCardDuration,
  EventCardDesc,
  EventCardTitle,
  OngoingEventCardTitle,
  EventCardWrapper,
  OngoingEventCardWrapper
} from "./styles";

function formatDuration(startDate, endDate) {
  const options = { month: 'short', day: 'numeric', year: 'numeric' };
  const start = new Date(startDate);
  const end = new Date(endDate);

  const formattedStartDate = start.toLocaleDateString('en-US', options);
  const formattedEndDate = end.toLocaleDateString('en-US', options);

  return `${formattedStartDate} - ${formattedEndDate}`;
}


const EventCard = ({ item, style }) => {
  const duration = formatDuration(item.startDate, item.endDate);

  if (item.isOngoing) {
    return (
      <OngoingEventCardWrapper style={style}>
        <EventCardImage
          style={{
            backgroundImage: `url(${process.env.REACT_APP_SERVER_URL}/image/getImage/${item.images[0]})`,
          }}
        />

        <EventCardInfo>
          <OngoingEventCardTitle>{item.eventName}</OngoingEventCardTitle>
          <EventCardDuration>{duration} • Ongoing</EventCardDuration>
          <EventCardDesc>{item.description}</EventCardDesc>
        </EventCardInfo>
      </OngoingEventCardWrapper>
    );
  }
  else {
    return (
      <EventCardWrapper style={style}>
        <EventCardImage
          style={{
            backgroundImage: `url(${process.env.REACT_APP_SERVER_URL}/image/getImage/${item.images[0]})`,
          }}
        />

        <EventCardInfo>
          <EventCardTitle>{item.eventName}</EventCardTitle>
          <EventCardDuration>{duration}</EventCardDuration>
          <EventCardDesc>{item.description}</EventCardDesc>
        </EventCardInfo>
      </EventCardWrapper>
    );
  }
};

export default EventCard;
