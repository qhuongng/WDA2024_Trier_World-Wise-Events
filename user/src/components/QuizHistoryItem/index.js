import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    QuizHistoryItemWrapper,
    QuizHistoryItemEventName,
    QuizHistoryItemTime,
    QuizHistoryItemScore,
    QuizHistoryItemInfo
} from "./styles";
import { getOneEvent } from '../../features/event/eventSlice';

const QuizHistoryItem = ({ history }) => {
    const dispatch = useDispatch();
    const event = useSelector((state) => state.event.eventsById[history.idEvent]) || null;
    const mins = parseInt(history.time / 60);
    const secs = parseInt(history.time % 60);

    useEffect(() => {
        if (!event) {
            dispatch(getOneEvent(history.idEvent));
        }
    }, [dispatch, history.idEvent, event]);

    return (
        <QuizHistoryItemWrapper>
            <QuizHistoryItemInfo>
                {event ? <QuizHistoryItemEventName>{event.eventName}</QuizHistoryItemEventName> : <QuizHistoryItemEventName>Retrieving quiz...</QuizHistoryItemEventName>}
                <QuizHistoryItemTime>{mins} minutes {secs} seconds</QuizHistoryItemTime>
            </QuizHistoryItemInfo>

            <QuizHistoryItemScore>{history.score} pts</QuizHistoryItemScore>
        </QuizHistoryItemWrapper>
    );
};

export default QuizHistoryItem;
