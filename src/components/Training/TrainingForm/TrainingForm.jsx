import {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { BsCalendarEvent } from "react-icons/bs";
import {} from 'redux/auth/auth-api'
import { useUpdateUserTrainingMutation } from 'redux/auth/auth-api';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import "react-datetime/css/react-datetime.css";
import Datetime from "react-datetime";
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


const TrainingForm = () =>{
//   const dispatch = useDispatch();
//   const [addTimerValue] = useUpdateUserTrainingMutation();
//   const {date} = useGetUserTrainingQuery();
  const [date_start, setDate_start] = useState('');
  const [date_finish, setDate_finish] = useState('');

//   console.log(date)

//   async function handleSubmit(e){
//     e.preventDefault();
//     // console.log({date_start, date_finish})
     
//     try {
//         dispatch(
//             await addTimerValue({date_start, date_finish})
//         );
//     } catch (error) {
//        console.log(error) 
//     }
//     };

    // const handleChangeBook = (event) => {
    //     const {
    //         target: { value },
    //       } = event;
    //       setBook(
    //         // On autofill we get a stringified value.
    //         typeof value === 'string' ? value.split(',') : value,
    //       );
    // };

    let inputPropsStart = {
        id:"start",
        placeholder:"Start",
        name:"start",
        type:"text",
        className:`${s.dataTimePicker}`,      
    }

    let inputPropsFinish = {
        id:"finish",
        placeholder:"Finish",
        name:"finish",
        type:"text",
        className:`${s.dataTimePicker}`,         
    }
    return(
        <>
        <div className={s.container}>
            <h1 className={s.title}>My Training</h1>
            <form 
                className={s.form}
                // onSubmit={handleSubmit}
                autoComplete="off"
            >
      
            <div className={s.content}>
                <div className={s.iconContainer} >    
                    <BsCalendarEvent className={s.icon}/>
                    <Datetime
                        selected={date_start}
                        onChange={(date) => setDate_start(Date.parse(date).toString())}
                        selectsStart
                        closeOnClickOutside="true"
                        closeOnSelect={ true }
                        inputProps={ inputPropsStart }
                        isValidDate={(current) => current.isAfter(moment().add(-1,'days'))}
                        
                    />
                </div>        
                    
                <div className={s.iconContainer} >    
                    <BsCalendarEvent className={s.icon}/>
                    <Datetime
                        selected={date_finish}
                        onChange={(date) => setDate_finish(Date.parse(date).toString())}
                        selectsFinish
                        minDate={date_start}
                        closeOnClickOutside="true"
                        closeOnSelect={ true }
                        isValidDate={(current) => current.isAfter()}
                        inputProps={ inputPropsFinish }
                    />
                </div>  
            </div>
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