import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPagedEvents } from "../../features/event/eventSlice";
import { chunk } from "lodash";
import { Row, Col, ConfigProvider } from "antd";
import {
  EventsRow,
  EventsPaginator,
  EventsTitle,
  EventsWrapper,
  EventsMessage,
} from "./styles";
import EventCard from "../../components/EventCard";

const AllEvents = () => {
  const dispatch = useDispatch();
  const pagedEvents = useSelector((state) => state.event.pagedEvents) || [];

  const [currentPage, setCurrentPage] = useState(1);

  const onChange = (page) => {
    document.documentElement.scrollTo(0, 0);
    setCurrentPage(page);
  };

  useEffect(() => {
    dispatch(getPagedEvents(`?page=${currentPage}&limit=12`));
  }, [dispatch, currentPage]);

    return (
        <EventsWrapper>
            <EventsTitle>All Events</EventsTitle>

            <EventsRow>
                {pagedEvents && pagedEvents.length !== 0 ? (
                    chunk(pagedEvents.data, 4).map((row) => (
                        <Row gutter={[20, 20]} style={{ marginTop: 20 }}>
                            {row.map((item) => (
                                <Col span={6} key={item.id} flex={"auto"}>
                                    <EventCard item={item} />
                                </Col>
                            ))}
                        </Row>
                    ))
                ) : (
                    <EventsMessage>No result.</EventsMessage>
                )}
            </EventsRow>

      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#2000bb",
            borderRadius: 12,
            colorBgContainer: "#ffffff",
            itemActiveBg: "#e1daff",
          },
        }}
      >
        <EventsPaginator
          current={currentPage}
          total={30}
          defaultPageSize={12}
          onChange={onChange}
          style={{ marginBottom: 36 }}
        />
      </ConfigProvider>
    </EventsWrapper>
  );
};

export default AllEvents;
