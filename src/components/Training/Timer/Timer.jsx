import { useEffect, useState } from 'react';
import s from './Timer.module.scss';

const Timer = ({ date_finish, timerIsActive }) => {
  const [timerGoals, setTimerGoals] = useState('');
  const [timerYears, setTimerYears] = useState('');

  const convertMS = t => {
    const data = new Date(t);
    const seconds = pad(data.getSeconds());
    const minutes = pad(data.getMinutes());
    const hours = pad(data.getHours());
    const month = data.getMonth();
    const days = pad(data.getDate() + month * 30);

    return { seconds, minutes, hours, days };
  };

  function pad(value) {
    return String(value).padStart(2, '0');
  }

  useEffect(() => {
    if (timerIsActive) {
      if (date_finish) {
        setTimeout(() => {
          const deltaGoals = new Date(+date_finish) - Date.now();
          setTimerGoals(convertMS(deltaGoals));
        }, 1000);
      }
    }
  }, [timerGoals, date_finish, timerIsActive]);

  useEffect(() => {
    if (timerIsActive) {
      setTimeout(() => {
        const curYear = '1672441200';
        const deltaYears = new Date(+curYear) - Date.now();
        setTimerYears(convertMS(deltaYears));
      }, 1000);
    } else {
    }
  }, [timerYears, timerIsActive]);

  return (
    <>
      <div className={s.container}>
        <div className={s.titleContainer}>
          <h2>Years countdown</h2>
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

        <div className={s.titleContainer}>
          <h2>Goals countdown</h2>
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
      </div>
    </>
  );
};

export default Timer;
