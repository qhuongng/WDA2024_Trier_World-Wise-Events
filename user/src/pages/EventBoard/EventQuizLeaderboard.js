import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLeaderboard } from "../../features/quiz/quizSlice";
import {
    EventQuizLeaderboardWrapper,
    EventQuizLeaderboardTitle,
    EventQuizLeaderboardItem,
    EventQuizLeaderboardRank,
    EventQuizLeaderboardName,
    EventQuizLeaderboardScore,
    EventQuizLeaderboardStats,
    EventQuizLeaderboardTime,
    EventQuizLeaderboardItemGroup
} from './styles';
import { ConfigProvider, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const EventQuizLeaderboard = ({ id }) => {
    const dispatch = useDispatch();
    const leaderboard = useSelector((state) => state.quiz.leaderboard) || null;

    useEffect(() => {
        dispatch(getLeaderboard(id));
    }, [dispatch, id]);

    return (
        <EventQuizLeaderboardWrapper>
            <EventQuizLeaderboardTitle>Leaderboard</EventQuizLeaderboardTitle>

            <EventQuizLeaderboardItemGroup>
                {leaderboard ?
                    leaderboard.data.map((item, index) => {
                        if (item !== null && item !== undefined) {
                            let mins = parseInt(item.time / 60);
                            let secs = parseInt(item.time % 60);

                            return (
                                <EventQuizLeaderboardItem>
                                    <EventQuizLeaderboardRank>{index + 1}</EventQuizLeaderboardRank>
                                    <EventQuizLeaderboardName>{item.username}</EventQuizLeaderboardName>
                                    <EventQuizLeaderboardStats>
                                        <EventQuizLeaderboardScore>{item.score} pts</EventQuizLeaderboardScore>
                                        <EventQuizLeaderboardTime>{mins}m{secs}s</EventQuizLeaderboardTime>
                                    </EventQuizLeaderboardStats>
                                </EventQuizLeaderboardItem>
                            );
                        }

                        return <></>;
                    })
                    :
                    (<ConfigProvider
                        theme={{
                            token: {
                                colorPrimary: "#bb0070"
                            },
                        }}>
                        <Spin indicator={<LoadingOutlined style={{ fontSize: 36, marginTop: '3rem' }} spin />} />
                    </ConfigProvider>)
                }
            </EventQuizLeaderboardItemGroup>
        </EventQuizLeaderboardWrapper>
    );
};

export default EventQuizLeaderboard;
