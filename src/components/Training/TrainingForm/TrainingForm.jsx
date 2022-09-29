import {useState} from 'react';
import { HiArrowNarrowLeft } from 'react-icons/hi';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import s from './TrainingForm.module.css';
const TrainingForm = () =>{
    const [value, setValue] = useState(dayjs());


    const handleChange = (newValue) => {
        setValue(newValue);
  };
    return(
        <>
        <div className={s.container}>
            <HiArrowNarrowLeft className={s.icon}/>
            <h1 className={s.title}>My Goals</h1>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    className={s.dataTimePicker}
                    minDate={dayjs()}
                    value={value}
                    onChange={handleChange}
                />
            </LocalizationProvider>
        </div>
        </>
    );
}

export default TrainingForm;