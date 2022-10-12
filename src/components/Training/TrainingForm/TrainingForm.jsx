import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import Media from 'react-media';

import { useUpdateStatusBookMutation } from 'redux/books/books-api';
import { BOOKS_STATUS } from 'redux/books/books-api';
import { getBooks, getPendingBooks } from 'redux/books/books-selectors';

import { filterBooksIsRead } from 'helpers/filterBooks';

import TimerForm from './TimerForm/TimerForm';
import BooksTable from '../BooksTable/BooksTable';
import BooksTableStub from 'components/Training/BooksTable/BooksTableStub';

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
  isShow,
  date_start,
  date_finish,
  setDate_start,
  setDate_finish,
}) => {
  const [selectedBook, setSelectedBook] = useState(
    'Choose books from the library'
  );
  const [booksListForSelect, setBooksListForSelect] = useState([]);
  const [booksListForTable, setBooksListForTable] = useState([]);

  const [updateStatusBook] = useUpdateStatusBookMutation();
  const allBooks = useSelector(getBooks);
  const bookPending = useSelector(getPendingBooks);

  useEffect(() => {
    const sortBook = filterBooksIsRead(bookPending, false);
    setBooksListForSelect(sortBook);

    const isRead = filterBooksIsRead(allBooks, true);
    setBooksListForTable(isRead);
  }, [allBooks, bookPending]);

  const handleChangeBook = event => {
    event.preventDefault();
    setSelectedBook(event.target.value);
  };

  const handleAddBook = e => {
    e.preventDefault();

    bookPending.forEach(book => {
      if (book.title === selectedBook) {
        try {
          updateStatusBook({
            id: book._id,
            status: BOOKS_STATUS.pending,
            isReadBook: true,
          });
        } catch (error) {
          console.log(error);
        }
      }
    });

    setSelectedBook('Choose books from the library');
  };

  return (
    <>
      {!isShow && (
        <div className={s.container}>
          <h1 className={s.title}>My Training</h1>
          <form className={s.form} autoComplete="off">
            {!isShow && (
              <TimerForm
                date_start={date_start}
                date_finish={date_finish}
                setDate_start={setDate_start}
                setDate_finish={setDate_finish}
              />
            )}

            <div className={s.tableSelect}>
              <Box sx={{ minWidth: 120 }} className={s.boxSelect}>
                <FormControl>
                  <Select
                    className={s.select}
                    sx={{ color: '#a6abb9' }}
                    displayEmpty
                    value={selectedBook}
                    onChange={handleChangeBook}
                    input={<OutlinedInput />}
                    renderValue={selected => {
                      if (selected.length === 0) {
                        return (
                          <em className={s.placeholder}>{selectedBook}</em>
                        );
                      }

                      return selected + '';
                    }}
                    MenuProps={MenuProps}
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    <MenuItem disabled value="">
                      <em>Choose books from the library</em>
                    </MenuItem>
                    {booksListForSelect.map(book => (
                      <MenuItem key={book._id} value={book.title + ''}>
                        {book.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <button
                type="submit"
                className={s.button}
                onClick={handleAddBook}
              >
                Add
              </button>
            </div>
          </form>
        </div>
      )}

      <Media queries={{ small: { minWidth: 768 } }}>
        <BooksTableStub books={booksListForTable} isShow={isShow} />
        {/* {booksListForTable.length === 0 ? (
          <BooksTableStub />
        ) : (
          <BooksTable books={booksListForTable} isShow={isShow} />
        )} */}
      </Media>
    </>
  );
};

export default TrainingForm;
