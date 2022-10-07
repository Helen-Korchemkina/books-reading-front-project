import {useState} from 'react';
import TimerForm from './TimerForm/TimerForm';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import "react-datetime/css/react-datetime.css";
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


const TrainingForm = ({date_start, date_finish, setDate_start, setDate_finish}) =>{

    console.log(setDate_start)
    // const handleChangeBook = (event) => {
    //     const {
    //         target: { value },
    //       } = event;
    //       setBook(
    //         // On autofill we get a stringified value.
    //         typeof value === 'string' ? value.split(',') : value,
    //       );
    // };

    

    return(
        <>
        <div className={s.container}>
            <h1 className={s.title}>My Training</h1>
            <form 
                className={s.form}
                // onSubmit={handleSubmit}
                autoComplete="off"
            >

            <TimerForm date_start={date_start} date_finish={date_finish} setDate_start={setDate_start} setDate_finish={setDate_finish}/>

            <div className={s.tableSelect}>
            <Box sx={{ minWidth: 120 }} className={s.boxSelect}>
            <FormControl>
                <Select
                className={s.select}
                multiple
                displayEmpty
                // value={book}
                // onChange={handleChangeBook}
                // input={<OutlinedInput />}
                // renderValue={(selected) => {
                //     if (selected.length === 0) {
                //     return <em className={s.placeholder}>Choose books from the library</em>;
                //     }

                //     return selected.join(', ');
                // }}
                MenuProps={MenuProps}
                inputProps={{ 'aria-label': 'Without label' }}
                >
                
                {/* {books.map((name) => (
                    <MenuItem
                    key={name}
                    value={name}
                    >
                    {name}
                    </MenuItem>
                ))} */}
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