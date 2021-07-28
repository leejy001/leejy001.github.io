import React, { useEffect, useRef, useState } from "react";

const useInterval = (callback, delay) => {
  const savedCallback = useRef();
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => {
      savedCallback.current();
    };
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

const TimeForDay = ({ date }) => {
  const curTime = new Date();
  const utc = curTime.getTime() + curTime.getTimezoneOffset() * 60 * 1000;
  const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
  const [curDate, setCurDate] = useState(new Date(utc + KR_TIME_DIFF));
  const [time, setTime] = useState("");
  useInterval(() => {
    setCurDate(new Date(utc + KR_TIME_DIFF));
  }, 60000);

  useEffect(() => {
    const createTime = new Date(date);
    const utc =
      createTime.getTime() + createTime.getTimezoneOffset() * 60 * 1000;
    const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
    const creatAt = new Date(utc + KR_TIME_DIFF);

    const betweenTime = Math.floor(
      (curDate.getTime() - creatAt.getTime()) / 1000 / 60
    );
    if (betweenTime < 1) return "방금전";
    if (betweenTime < 60) {
      setTime(`${betweenTime}분전`);
    } else {
      const betweenTimeHour = Math.floor(betweenTime / 60);
      if (betweenTimeHour < 24) {
        setTime(`${betweenTimeHour}시간전`);
      } else {
        const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
        if (betweenTimeDay < 7) {
          setTime(`${betweenTimeDay}일전`);
        } else if (betweenTimeDay === 7) {
          setTime("일주일전");
        } else {
          setTime(
            `${createTime.getFullYear()}년 ${createTime.getMonth()}월 ${createTime.getDate()}일`
          );
        }
      }
    }
  }, [date, curDate]);

  return <div style={{ marginTop: "-5px" }}>{time}</div>;
};

export default TimeForDay;
