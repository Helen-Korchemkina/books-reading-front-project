import {useState} from 'react';
import MediaQuery from 'react-responsive';
import { HiArrowNarrowLeft } from 'react-icons/hi';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import s from './TrainingForm.module.scss';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

  const books = [
    'title1',
    'title2',
    'title3',
    'title4'
];


const TrainingForm = () =>{
    const [start, setStart] = useState(null);
    const [finish, setFinish] = useState(null);
    const [book, setBook] = useState([]);

   

    const handleChangeBook = (event) => {
        const {
            target: { value },
          } = event;
          setBook(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
          );
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
            <FormControl>
                <Select
                className={s.select}
                multiple
                displayEmpty
                value={book}
                onChange={handleChangeBook}
                input={<OutlinedInput />}
                renderValue={(selected) => {
                    if (selected.length === 0) {
                    return <em className={s.placeholder}>Choose books from the library</em>;
                    }

                    return selected.join(', ');
                }}
                MenuProps={MenuProps}
                inputProps={{ 'aria-label': 'Without label' }}
                >
                
                {books.map((name) => (
                    <MenuItem
                    key={name}
                    value={name}
                    
                    >
                    {name}
                    </MenuItem>
                ))}
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

//86 style={getStyles(name, personName, theme)}
//90 MenuProps={MenuProps}