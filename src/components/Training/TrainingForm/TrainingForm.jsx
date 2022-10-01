import {useState} from 'react';
import MediaQuery from 'react-responsive';
import { HiArrowNarrowLeft } from 'react-icons/hi';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import s from './TrainingForm.module.scss';
const TrainingForm = () =>{
    const [start, setStart] = useState(null);
    const [finish, setFinish] = useState(null);
    const [book, setBook] = useState('');

    const handleChangeBook = (event) => {
        setBook(event.target.start);
    };

    const handleChangeStart = (newValue) => {
        setStart(newValue);
    };

    const handleChangeFinish = (newValue) => {
        setFinish(newValue);
    };
    return(
        <>
        <MediaQuery minWidth={320} maxWidth={767}>
            <HiArrowNarrowLeft className={s.icon}/>    
        </MediaQuery>
        <div className={s.container}>
            <h1 className={s.title}>My Training</h1>
            <form action="" className={s.form}>
            <div className={s.content}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                    renderInput={(props) => 
                    <TextField 
                        placeholder='Start'
                        value={start === null ? 'Start' : start} 
                        {...props}
                        />}
                    className={s.dataTimePicker}
                    minDate={dayjs()}
                    value={start}
                    onChange={handleChangeStart}
                />
                <DateTimePicker
                    renderInput={(props) => <TextField
                        placeholder='Finish'
                        value={finish === null ? 'Finish' : finish} 
                        {...props} 
                         />}
                    className={s.dataTimePicker}
                    minDate={dayjs()}
                    value={finish}
                    onChange={handleChangeFinish}
                />
            </LocalizationProvider>
            </div>
            <div className={s.tableSelect}>
            <Box sx={{ minWidth: 120 }} className={s.boxSelect}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Book</InputLabel>
                    <Select
                    className={s.select}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={book}
                    label="Choose book from the library"
                    onChange={handleChangeBook}
                    >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <button type="submit" className={s.button}>Add</button>
            </div>
            </form>
        </div>
        </>
    );
}

export default TrainingForm;
