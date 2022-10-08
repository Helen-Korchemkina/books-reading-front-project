import { useState } from 'react';
import TimerForm from './TimerForm/TimerForm';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useGetBooksQuery } from '../../../redux/books/books-api';
import BooksTable from '../BooksTable/BooksTable';
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

const TrainingForm = ({
  date_start,
  date_finish,
  setDate_start,
  setDate_finish,
}) => {
  const [selectedBook, setSelectedBook] = useState([]);
  const [booksListArr, setBooksListArr] = useState([]);

  const { data = [] } = useGetBooksQuery();

  const handleChangeBook = event => {
    event.preventDefault();
    setSelectedBook(event.target.value);
    console.log(selectedBook);
  };

  const handleAddBook = e => {
    e.preventDefault();

    const booksArrInfo = data.filter(book => book.title === selectedBook);
    setBooksListArr([booksArrInfo, ...booksListArr].flat());
    console.log(booksListArr);
  };

  return (
    <>
      <div className={s.container}>
        <h1 className={s.title}>My Training</h1>
        <form
          className={s.form}
          // onSubmit={handleSubmit}
          autoComplete="off"
        >
          <TimerForm
            date_start={date_start}
            date_finish={date_finish}
            setDate_start={setDate_start}
            setDate_finish={setDate_finish}
          />

          <div className={s.tableSelect}>
            <Box sx={{ minWidth: 120 }} className={s.boxSelect}>
              <FormControl>
                <Select
                  className={s.select}
                  displayEmpty
                  value={selectedBook}
                  onChange={handleChangeBook}
                  input={<OutlinedInput />}
                  renderValue={selected => {
                    if (selected.length === 0) {
                      return (
                        <em className={s.placeholder}>
                          Choose books from the library
                        </em>
                      );
                    }

                    return selected + '';
                  }}
                  MenuProps={MenuProps}
                  inputProps={{ 'aria-label': 'Without label' }}
                >
                  {data.map(book => (
                    <MenuItem key={book._id} value={book.title + ''}>
                      {book.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <button type="submit" className={s.button} onClick={handleAddBook}>
              Add
            </button>
          </div>
        </form>
      </div>
      {booksListArr.length > 0 && <BooksTable books={booksListArr} />}
    </>
  );
};

export default TrainingForm;
