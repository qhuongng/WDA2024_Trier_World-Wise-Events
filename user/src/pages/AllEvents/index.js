import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPagedEvents } from '../../features/event/eventSlice';
import { LoadingOutlined } from '@ant-design/icons';
import { chunk } from 'lodash';
import { Row, Col, ConfigProvider, Spin } from 'antd';
import {
  EventsRow,
  EventsPaginator,
  EventsTitle,
  EventsWrapper
} from './styles';
import EventCard from '../../components/EventCard';

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
                <Col span={6} key={item.id} flex={'auto'}>
                  <EventCard item={item} />
                </Col>
              ))}
            </Row>
          ))
        ) : (
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: '#bb0070',
                borderRadius: 12,
                colorBgContainer: '#ffffff',
                itemActiveBg: '#e1daff',
              },
            }}
          >
            <Spin indicator={<LoadingOutlined style={{ fontSize: 36, marginTop: '3rem' }} spin />} />
          </ConfigProvider>
        )}
      </EventsRow>

      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#2000bb',
            borderRadius: 12,
            colorBgContainer: '#ffffff',
            itemActiveBg: '#e1daff',
          },
        }}
      >
        <EventsPaginator
          current={currentPage}
          total={30}
          defaultPageSize={12}
          onChange={onChange}
        />
      </ConfigProvider>
    </EventsWrapper>
  );
};

export default AllEvents;
