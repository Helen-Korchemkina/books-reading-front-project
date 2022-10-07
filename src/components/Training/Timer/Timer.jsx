import {useEffect, useState, useCallback} from 'react';
import { getTraining } from 'redux/auth/authSelectors';
import { useSelector } from 'react-redux';
import s from './Timer.module.scss';


const Timer = () =>{ 
    const {startMillisecond, finishMillisecond} = useSelector(getTraining);
    const [timerGoals, setTimerGoals] = useState('');
    const [timerYears, setTimerYears] = useState('');

    const convertMS = (t) =>{
        const data = new Date(t);
        const seconds = data.getSeconds();
        const minutes =  data.getMinutes();
        const hours = data.getHours(); 
        const month = data.getMonth();
        const days = data.getDate() + (month * 30);
        
        return {seconds, minutes , hours, days};
    }
    
    useEffect(() => {
        if(finishMillisecond){
            setTimeout(() =>{
                const deltaGoals = new Date(+finishMillisecond) - Date.now();
                setTimerGoals(convertMS(deltaGoals));
            }, 1000);
        
        }
      }, [timerGoals, finishMillisecond]);

      useEffect(() => {
        setTimeout(() =>{
            const curYear = '1672441200';
            const deltaYears = new Date(+curYear) - Date.now();
            setTimerYears(convertMS(deltaYears));
        }, 1000);
        
        

      }, [timerYears]);

    return(
    <>
    <div className={s.container}>
    <div className={s.titleContainer}>
    <h2>Years countdown</h2>
    <div className={s.timer}>
      <div className={s.field}>
        <span className={s.value} data-days>{timerGoals.days}</span>
        <span className={s.label}>DAYS</span>
      </div>
      <span className={s.twodots}>:</span> 
      <div className={s.field}>
        <span className={s.value} data-hours>{timerGoals.hours}</span>
        <span className={s.label}>HRS</span>
      </div>
      <span className={s.twodots}>:</span> 
      <div className={s.field}>
        <span className={s.value} data-minutes>{timerGoals.minutes}</span>
        <span className={s.label}>MINS</span>
      </div>
      <span className={s.twodots}>:</span> 
      <div className={s.field}>
        <span className={s.value} data-seconds>{timerGoals.seconds}</span>
        <span className={s.label}>SECS</span>
      </div>
    </div>    
    </div>    
        
    

    
    
        <div className={s.titleContainer}>
        <h2>Goals countdown</h2>
        <div className={s.timer}>
      <div className={s.field}>
        <span className={s.value} data-days>{timerYears.days}</span>
        <span className={s.label}>DAYS</span>
      </div>
      <span className={s.twodots}>:</span> 
      <div className={s.field}>
        <span className={s.value} data-hours>{timerYears.hours}</span>
        <span className={s.label}>HRS</span>
      </div>
      <span className={s.twodots}>:</span> 
      <div className={s.field}>
        <span className={s.value} data-minutes>{timerYears.minutes}</span>
        <span className={s.label}>MINS</span>
      </div>
      <span className={s.twodots}>:</span> 
      <div className={s.field}>
        <span className={s.value} data-seconds>{timerYears.seconds}</span>
        <span className={s.label}>SECS</span>
      </div>
    </div>
    </div>
    </div>
    </>)
}

export default Timer;