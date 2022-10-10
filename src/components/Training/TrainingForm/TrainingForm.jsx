import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';

import {
  useGetBooksQuery,
  useUpdateStatusBookMutation,
} from '../../../redux/books/books-api';
import { BOOKS_STATUS } from '../../../redux/books/books-api';
import {
  filterBooksIsRead,
  filterBooksGoingAndStatus,
} from 'helpers/filterBooks';

import TimerForm from './TimerForm/TimerForm';
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
  isShow,
  date_start,
  date_finish,
  setDate_start,
  setDate_finish,
  isInTable,
}) => {
  const [selectedBook, setSelectedBook] = useState([]);
  const [booksListForSelect, setBooksListForSelect] = useState([]);
  const [booksListForTable, setBooksListForTable] = useState([]);
  const [isUpdate, setIsUpdate] = useState(true);

  const [updateStatusBook] = useUpdateStatusBookMutation();
  const { data = [] } = useGetBooksQuery();

  useEffect(() => {
    isInTable(booksListForTable.length);
  }, [booksListForTable, isInTable]);

  useEffect(() => {
    const sortBook = filterBooksGoingAndStatus(
      data,
      BOOKS_STATUS.pending,
      false
    );
    setBooksListForSelect(sortBook);
    const result = filterBooksIsRead(data, true);
    setBooksListForTable(result);
  }, [data]);

  useEffect(() => {
    if (isShow && isUpdate) {
      booksListForTable.forEach(book => {
        try {
          updateStatusBook({
            id: book._id,
            status: BOOKS_STATUS.reading,
            isReadBook: true,
          });
        } catch (error) {
          console.log(error);
        }
      });
      setIsUpdate(false);
    }
  }, [booksListForTable, isShow, isUpdate, updateStatusBook]);

  const handleChangeBook = event => {
    event.preventDefault();
    setSelectedBook(event.target.value);
  };

  const handleAddBook = e => {
    e.preventDefault();

    [...data].forEach(book => {
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

      {booksListForTable.length > 0 && (
        <BooksTable books={booksListForTable} isShow={isShow} />
      )}
    </>
  );
};

export default TrainingForm;
