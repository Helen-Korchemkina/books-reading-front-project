import { useEffect, useState, useRef } from 'react';
import s from './Timer.module.scss';

const convertMS = t => {
  const data = new Date(t);
  const seconds = pad(data.getSeconds());
  const minutes = pad(data.getMinutes());
  const hours = pad(data.getHours());
  const month = data.getMonth();
  const days = pad(data.getDate() + month * 30);

  return { seconds, minutes, hours, days };
};

const pad = value => {
  return String(value).padStart(2, '0');
};

const Timer = ({ date_finish, timerIsActive }) => {
  const [timerGoals, setTimerGoals] = useState({
    seconds: 0,
    minutes: 0,
    hours: 0,
    month: 0,
    days: 0,
  });
  const [timerYears, setTimerYears] = useState({
    seconds: 0,
    minutes: 0,
    hours: 0,
    month: 0,
    days: 0,
  });
  const timer1Id = useRef(null);
  const timer2Id = useRef(null);

  useEffect(() => {
    if (timerIsActive && date_finish) {
      timer1Id.current = setTimeout(() => {
        const deltaGoals = new Date(+date_finish) - Date.now();
        setTimerGoals(convertMS(deltaGoals));
      }, 1000);
    }

    return () => clearTimeout(timer1Id.current);
  }, [timerGoals, date_finish, timerIsActive]);

  useEffect(() => {
    if (timerIsActive) {
      timer2Id.current = setTimeout(() => {
        const curYear = new Date(
          (new Date().getFullYear() + 1).toString()
        ).getTime();
        const deltaYears = new Date(+curYear) - Date.now();
        setTimerYears(convertMS(deltaYears));
      }, 1000);
    }

    return () => clearTimeout(timer2Id.current);
  }, [timerYears, timerIsActive]);

  return (
    <>
      <div className={s.container}>
        <div className={s.titleContainer}>
          <h2>Years countdown</h2>
          <div className={s.timer}>
            <div className={s.field}>
              <span className={s.value} data-days>
                {timerYears.days}
              </span>
              <span className={s.label}>DAYS</span>
            </div>
            <span className={s.twodots}>:</span>
            <div className={s.field}>
              <span className={s.value} data-hours>
                {timerYears.hours}
              </span>
              <span className={s.label}>HRS</span>
            </div>
            <span className={s.twodots}>:</span>
            <div className={s.field}>
              <span className={s.value} data-minutes>
                {timerYears.minutes}
              </span>
              <span className={s.label}>MINS</span>
            </div>
            <span className={s.twodots}>:</span>
            <div className={s.field}>
              <span className={s.value} data-seconds>
                {timerYears.seconds}
              </span>
              <span className={s.label}>SECS</span>
            </div>
          </div>
        </div>

        <div className={s.titleContainer}>
          <h2>Goals countdown</h2>
          <div className={s.timer}>
            <div className={s.field}>
              <span className={s.value} data-days>
                {timerGoals.days}
              </span>
              <span className={s.label}>DAYS</span>
            </div>
            <span className={s.twodots}>:</span>
            <div className={s.field}>
              <span className={s.value} data-hours>
                {timerGoals.hours}
              </span>
              <span className={s.label}>HRS</span>
            </div>
            <span className={s.twodots}>:</span>
            <div className={s.field}>
              <span className={s.value} data-minutes>
                {timerGoals.minutes}
              </span>
              <span className={s.label}>MINS</span>
            </div>
            <span className={s.twodots}>:</span>
            <div className={s.field}>
              <span className={s.value} data-seconds>
                {timerGoals.seconds}
              </span>
              <span className={s.label}>SECS</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Timer;
