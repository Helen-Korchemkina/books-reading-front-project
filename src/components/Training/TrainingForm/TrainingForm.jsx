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
import {useGetBooksQuery} from '../../../redux/books/books-api';
import BooksTable from '../BooksTable';
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
  const dispatch = useDispatch();
  const [addTimerValue, { isLoading }] = useUpdateUserTrainingMutation();
  const [book, setBook] = useState('');
  const [start, setStart] = useState('');
  const [finish, setFinish] = useState('');
  const [selectedBook, setSelectedBook] = useState([]);
  const [booksListArr, setBooksListArr] = useState([]);

 const {data} = useGetBooksQuery();

  const handleChangeBook = (event) => {
    event.preventDefault();
    setSelectedBook(event.target.value);
    console.log(selectedBook);
      };

  const handleAddBook = (e) => {
    e.preventDefault();
    
    const booksArrInfo = data.filter(book => book.title === selectedBook);
    setBooksListArr([booksArrInfo, ...booksListArr].flat());
          console.log(booksListArr);
  }


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
                displayEmpty
                value={selectedBook}
                onChange={handleChangeBook}
                input={<OutlinedInput />}
                renderValue={(selected) => {
                    if (selected.length === 0) {
                    return <em className={s.placeholder}>Choose books from the library</em>;
                    }

                    return selected + "";
                }}
                MenuProps={MenuProps}
                inputProps={{ 'aria-label': 'Without label' }}
                >
                
                {data.map((book) => (
                    <MenuItem
                    key={book._id}
                    value={book.title + ""}
                    >
                   {book.title}
                    </MenuItem>
                ))}
                </Select>
            </FormControl>
            </Box>
            <button type="submit" className={s.button} onClick={handleAddBook}>Add</button>
            </div>
            </form>
        </div>
       {booksListArr.length > 0 && <BooksTable books={booksListArr} /> } 
        </>
    );
}

export default TrainingForm;