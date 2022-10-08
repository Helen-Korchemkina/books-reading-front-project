import moment from 'moment';
import { BsCalendarEvent } from 'react-icons/bs';
import 'react-datetime/css/react-datetime.css';
import Datetime from 'react-datetime';
import s from '../TrainingForm.module.scss';

const TimerForm = ({
  date_start,
  date_finish,
  setDate_start,
  setDate_finish,
}) => {

  let inputPropsStart = {
    id: 'start',
    placeholder: 'Start',
    name: 'start',
    type: 'text',
    className: `${s.dataTimePicker}`,
  };

  let inputPropsFinish = {
    id: 'finish',
    placeholder: 'Finish',
    name: 'finish',
    type: 'text',
    className: `${s.dataTimePicker}`,
  };

  return (
    <>
      <div className={s.content}>
        <div className={s.iconContainer}>
          <BsCalendarEvent className={s.icon} />
          <Datetime
            selected={date_start}
            onChange={date => setDate_start(Date.parse(date).toString())}
            selectsStart
            closeOnClickOutside="true"
            closeOnSelect={true}
            inputProps={inputPropsStart}
            isValidDate={current => current.isAfter(moment().add(-1, 'days'))}
          />
        </div>

        <div className={s.iconContainer}>
          <BsCalendarEvent className={s.icon} />
          <Datetime
            selected={date_finish}
            onChange={date => setDate_finish(Date.parse(date).toString())}
            selectsFinish
            minDate={date_start}
            closeOnClickOutside="true"
            closeOnSelect={true}
            isValidDate={current => current.isAfter(Number(date_start))}
            inputProps={inputPropsFinish}
          />
        </div>
      </div>
    </>
  );
};

export default TimerForm;
