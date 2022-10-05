import {useState} from 'react';
import dayjs from 'dayjs';
import { useFormik } from 'formik';
import * as Yup from 'yup';
// import { useaddTimerValueMutation } from 'redux/books/books-api';
import { BsCalendarEvent } from "react-icons/bs";
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

  const books = [
    'title1',
    'title2',
    'title3',
    'title4'
];

const VALIDATION_SCHEMA = Yup.object().shape({
    start: Yup.number()
      .integer('Can`t containts "."')
      .min(dayjs(), `Minimum year is ${dayjs()}`)
      .required('Fill in the field'),
    finish: Yup.number()
    .integer('Can`t containts "."')
    .min(dayjs(), `Minimum year is ${dayjs().add(1, 'day')}`)
    .required('Fill in the field'), 
  });


const TrainingForm = () =>{
    const [start, setStart] = useState(null);
    const [finish, setFinish] = useState(null);
    // const [addTimerValue, { isLoading }] = useaddTimerValueMutation();
    const [book, setBook] = useState([]);
    
    const formik = useFormik({
        initialValues: {
            start: '',
            finish: '',
          },
        validationSchema: VALIDATION_SCHEMA,
        onSubmit: async (values, actions) => {
            try {
                await console.log(start, finish, 'ONSUBMIT')
            //   await addTimerValue({
            //     ...values
            //   })
      
              
            //   actions.resetForm();
    
            } catch (error) {
              console.log(error);
            }
          },
    });
   
    const handleChangeBook = (event) => {
        const {
            target: { value },
          } = event;
          setBook(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
          );
    };

    let inputStartProps = {
        id:"start",
        placeholder:"Start",
        name:"start",
        type:"text",
        className:`${s.dataTimePicker}`,
        // onChange:`${formik.handleChange}`,
        // value:`${formik.values.start}`,        
    }

    let inputFinishProps = {
        id:"finish",
        placeholder:"Finish",
        name:"finish",
        type:"text",
        className:`${s.dataTimePicker}`,
        // onChange:`${formik.handleChange}`,
        // value:`${formik.values.start}`,        
    }

    console.log(start, finish)

    return(
        <>
        <div className={s.container}>
            <h1 className={s.title}>My Training</h1>
            <form 
                action="" 
                className={s.form}
                onSubmit={formik.handleSubmit}
            >
            <div className={s.content}>
                <div className={s.iconContainer} >    
                    <BsCalendarEvent className={s.icon}/>
                    <Datetime 
                    closeOnClickOutside="true"
                    closeOnSelect={ true }
                    inputProps={ inputStartProps }
                    onChange={(e) => setStart(e._d)}
                    />
                </div>        
                    
                <div className={s.iconContainer} >    
                    <BsCalendarEvent className={s.icon}/>
                    <Datetime 
                    closeOnClickOutside="true"
                    closeOnSelect={ true }
                    inputProps={ inputFinishProps }
                    onChange={(e) => setFinish(e._d)}
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