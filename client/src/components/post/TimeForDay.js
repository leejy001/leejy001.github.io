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
    console.log(curDate);
  }, 60000);

  useEffect(() => {
    const creatTime = new Date(date);
    const utc = creatTime.getTime() + creatTime.getTimezoneOffset() * 60 * 1000;
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
        if (betweenTimeDay < 30) {
          setTime(`${betweenTimeDay}일전`);
        } else if (betweenTimeDay < 365) {
          setTime(`${curDate.getMonth() - creatAt.getMonth()}달전`);
        } else {
          setTime(`${Math.floor(betweenTimeDay / 365)}년전`);
        }
      }
    }
  }, [date, curDate]);

  return <div style={{ marginTop: "-5px" }}>{time}</div>;
};

export default TimeForDay;
