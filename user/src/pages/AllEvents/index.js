import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllEvents, getPagedEvents, getKeywordEvents } from '../../features/event/eventSlice';
import { LoadingOutlined, SearchOutlined } from '@ant-design/icons';

import { ConfigProvider, Spin, Flex } from 'antd';
import {
  EventsRow,
  EventsPaginator,
  EventsTitle,
  EventsWrapper,
  CoverHeader,
  InputContainer,
  InputSearchButton
} from './styles';
import EventCard from '../../components/EventCard';
import Input from '../../components/Input';

const AllEvents = () => {
  const dispatch = useDispatch();
  const allEvents = useSelector((state) => state.event.allEvents) || [];
  const pagedEvents = useSelector((state) => state.event.pagedEvents) || [];
  const keywordEvents = useSelector((state) => state.event.keywordEvents) || [];

  const [eventCount, setEventCount] = useState(30);
  const [currentPage, setCurrentPage] = useState(1);
  const [keyword, setKeyword] = useState("");

  const onChangePage = (page) => {
    setCurrentPage(page);
    document.documentElement.scrollTo(0, 0);
  };

  const onPressEnter = (e) => {
    setKeyword(e.target.value);
    dispatch(getKeywordEvents(`?keyword=${keyword}`));
    dispatch(getPagedEvents(`?page=1&limit=12&keyword=${keyword}`));
    setCurrentPage(1);
    setKeyword("");
  }

  useEffect(() => {
    dispatch(getAllEvents());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getPagedEvents(`?page=${currentPage}&limit=12&keyword=${keyword}`));
  }, [dispatch, currentPage]);

  useEffect(() => {
    if (keywordEvents.data && keywordEvents.data.length > 0) {
      setEventCount(keywordEvents.data.length);
    }
    else {
      setEventCount(allEvents?.data?.length);
    }
  }, [pagedEvents, keywordEvents]);

  return (
    <EventsWrapper>
      <CoverHeader>
        <EventsTitle>All Events</EventsTitle>
        <InputContainer>
          <Input
            onChange={(e) => setKeyword(e.target.value)}
            value={keyword}
            onPressEnter={onPressEnter}
            placeholder={'Search by event name, city or country'}
          />

          <InputSearchButton onClick={onPressEnter}>
            <SearchOutlined />
          </InputSearchButton>
        </InputContainer>
      </CoverHeader>

      <EventsRow>
        {pagedEvents.data && pagedEvents.data.length > 0 ? (
          <Flex style={{ width: '100%' }} wrap gap="middle">
            {pagedEvents.data.map((item) => <EventCard style={{ width: '23.8%' }} item={item} />)}
          </Flex>
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
          total={eventCount}
          defaultPageSize={12}
          onChange={onChangePage}
        />
      </ConfigProvider>
    </EventsWrapper>
  );
};

export default AllEvents;
