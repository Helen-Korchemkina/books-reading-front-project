import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { BOOKS_STATUS, useGetBooksQuery } from 'redux/books/books-api';
import Container from 'components/Container';
import Button from 'components/Button';
import LoadSpinner from 'components/LoadSpinner';
import LibraryForm from 'components/library/LibraryForm';
import LibraryTable from 'components/library/LibraryTable';
import s from './Library.module.scss';

const Library = () => {
  const userHasRunnigTraining = true;
  const navigate = useNavigate();

  const {
    data: books = [],
    isSuccess: isBooksSuccess,
    isLoading: isBooksLoading,
  } = useGetBooksQuery();

  const booksByStatus = useMemo(() => {
    return books.reduce(
      (acc, book) => {
        acc[book.status].push(book);
        return acc;
      },
      {
        [BOOKS_STATUS.pending]: [],
        [BOOKS_STATUS.reading]: [],
        [BOOKS_STATUS.finish]: [],
      }
    );
  }, [books]);

  const handleShowResumeBtnClick = id => {
    const book = booksByStatus[BOOKS_STATUS.finish].find(
      book => book.id === id
    );
    console.log(`Book id: ${book.id}. Book rating: ${book.rating}`);
    console.log(`Book resume: ${book.resume}`);
  };

  if (isBooksLoading) {
    return (
      <Container>
        <LoadSpinner />
      </Container>
    );
  }

  return (
    <Container>
      <LibraryForm />

      {isBooksSuccess && booksByStatus[BOOKS_STATUS.finish].length > 0 && (
        <>
          <h2 className={s.title}>Already read</h2>
          <LibraryTable
            books={booksByStatus[BOOKS_STATUS.finish]}
            onShowResumeBtnClick={handleShowResumeBtnClick}
          />
        </>
      )}

      {isBooksSuccess && booksByStatus[BOOKS_STATUS.reading].length > 0 && (
        <>
          <h2 className={s.title}>Reading now</h2>
          <LibraryTable books={booksByStatus[BOOKS_STATUS.reading]} />
        </>
      )}

      {isBooksSuccess && booksByStatus[BOOKS_STATUS.pending].length > 0 && (
        <>
          <h2 className={s.title}>Going to read</h2>
          <LibraryTable books={booksByStatus[BOOKS_STATUS.pending]} />
        </>
      )}

      {userHasRunnigTraining && (
        <Button
          variant="filled"
          onClick={() => navigate('/training')}
          modifClass={s.trainingBtn}
        >
          My training
        </Button>
      )}
    </Container>
  );
};

export default Library;
