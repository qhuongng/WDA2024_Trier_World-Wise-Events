import React, { useEffect } from "react";
import EventMap from "../../components/EventMap"
import { useDispatch, useSelector } from 'react-redux';
import { loginGoogle } from "../../features/user/userSlice";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loginGoogle());
  }, [dispatch]);

  return (
    <div>
      <EventMap />
    </div>
  );
};

export default Home;
