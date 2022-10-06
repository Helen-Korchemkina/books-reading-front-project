import {useState} from 'react';
import dayjs from 'dayjs';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
// import { useaddTimerValueMutation } from 'redux/books/books-api';
import { BsCalendarEvent } from "react-icons/bs";
import FormInput from 'components/common/FormInput';
// import Box from '@mui/material/Box';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
// import OutlinedInput from '@mui/material/OutlinedInput';
import "react-datetime/css/react-datetime.css";
import Datetime from "react-datetime";
import Button from 'components/common/Button';
import s from './Results.module.scss';






const VALIDATION_SCHEMA = Yup.object().shape({
    date: Yup.number()
      .integer('Can`t containts "."')
      .min(dayjs(), `Minimum year is ${dayjs()}`)
      .required('Fill in the field'),
    pages: Yup.number()
    .integer('Can`t containts "."')
    .min(1, 'Minimum pages is 1')
    .max(9999, 'Maximum pages is 9999')
    .required('Fill in the field'),
  });


const Results = () =>{
    const [date, setDate] = useState(null);
    const [pages, setPages] = useState(null);
    // const [addTimerValue, { isLoading }] = useaddTimerValueMutation();
    
    
    const formik = useFormik({
        initialValues: {
            date: '',
            pages: '',
          },
        validationSchema: VALIDATION_SCHEMA,
        onSubmit: async (values, actions) => {
            try {
                await console.log(date, pages, 'ONSUBMIT')
            //   await addTimerValue({
            //     ...values
            //   })
      
              
            //   actions.resetForm();
    
            } catch (error) {
              console.log(error);
            }
          },
    });
   
    

    let inputDateProps = {
        id:"date",
        placeholder:"",
        name:"date",
        type:"text",
        className:`${s.dataTimePicker}`,
        // onChange:`${formik.handleChange}`,
        // value:`${formik.values.start}`,        
    }

    let inputPagesProps = {
        id:"pages",
        placeholder:"",
        name:"pages",
        type:"text",
        className:`${s.dataTimePicker}`,
        // onChange:`${formik.handleChange}`,
        // value:`${formik.values.start}`,        
    }

    console.log(date, pages)

    return(
        <>
        <div className={s.container}>
          <p className={s.title}> Results </p>
            <form 
                action="" 
                className={s.form}
                onSubmit={formik.handleSubmit}
            >
            <div className={s.reswrap}>
                <div >    
                    <p className={s.titleDateForm}>Date</p> 
                    <Datetime 
                    className={s.wrapDateForm}
                    closeOnClickOutside="true"
                    closeOnSelect={ true }
                    inputProps={ inputDateProps }
                    onChange={(e) => setDate(e._d)}
                    />
                </div>        
                    
                <div className={s.iconContainer} >    
                            <FormInput
                              
                //    inputProps={ inputPagesProps }
                                 label={{ id: 'countOfPages', text: 'Amount of pages' }}
          input={{
            value: formik.values.countOfPages,
            type: 'number',
            // onChange: formik.setPages,
          }}
                    onChange={(e) => setPages(e._d)}
                 />
                  </div>  
            </div>
            <div className={s.tableSelect}>
          
            <Button variant="filled" modifClass={s.btn} type="submit" >Add</Button>
            </div>
            </form>
        </div>
        </>
    );
}

export default Results;















