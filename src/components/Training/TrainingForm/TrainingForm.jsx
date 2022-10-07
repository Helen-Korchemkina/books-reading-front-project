import {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { BsCalendarEvent } from "react-icons/bs";
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
import {getReadingBooks} from 'redux/books/books-selectors';


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
//  const readingBooks = useSelector(getReadingBooks);
//  console.log(readingBooks);




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

    const handleSubmit = (e) =>{
      e.preventDefault();
      dispatch(addTimerValue({ start, finish }));
    };
  

  
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
console.log(start, finish)
    return(
        <>
        <div className={s.container}>
            <h1 className={s.title}>My Training</h1>
            <form 
                className={s.form}
                onSubmit={handleSubmit}
                autoComplete="off"
            >
      
            <div className={s.content}>
                <div className={s.iconContainer} >    
                    <BsCalendarEvent className={s.icon}/>
                    <Datetime
                        selected={start}
                        onChange={(date) => setStart(Date.parse(date))}
                        selectsStart
                        start={start}
                        finish={finish}
                        closeOnClickOutside="true"
                        closeOnSelect={ true }
                        inputProps={ inputPropsStart }
                        isValidDate={(current) => current.isAfter(moment().add(-1,'days'))}
                        
                    />
                </div>        
                    
                <div className={s.iconContainer} >    
                    <BsCalendarEvent className={s.icon}/>
                    <Datetime
                        selected={finish}
                        onChange={(date) => setFinish(Date.parse(date))}
                        selectsFinish
                        start={start}
                        finish={finish}
                        minDate={start}
                        closeOnClickOutside="true"
                        closeOnSelect={ true }
                        isValidDate={(current) => current.isAfter(moment().add(1,'days'))}
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
                // label="Choose book from library"
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