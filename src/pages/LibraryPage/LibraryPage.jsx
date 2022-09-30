import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi';

import { BOOKS_STATUS, useGetBooksQuery } from 'redux/books/books-api';
import Container from 'components/Container';
import Button from 'components/Button';
import LoadSpinner from 'components/LoadSpinner';
import LibraryForm from 'components/library/LibraryForm';
import LibraryCategories from 'components/library/LibraryCategories';
import s from './LibraryPage.module.scss';

const LibraryPage = () => {
  const {
    data: books = [],
    isSuccess: isBooksSuccess,
    isLoading: isBooksLoading,
  } = useGetBooksQuery();

  const navigate = useNavigate();
  const userHasRunnigTraining = true;
  const [showAddForm, setShowAddForm] = useState(true);
  const isMobileScreen = useMediaQuery({ query: '(max-width: 768px)' });

  useEffect(() => {
    setShowAddForm(true);
  }, [isMobileScreen]);

  const hasPendingBook = useMemo(
    () => books.some(book => book.status === BOOKS_STATUS.pending),
    [books]
  );

  if (isBooksLoading) {
    return (
      <Container>
        <LoadSpinner />
      </Container>
    );
  }

  if (isBooksSuccess) {
    return (
      <Container>
        {isMobileScreen && books.length !== 0 && (
          <Button
            variant="icon"
            onClick={() => setShowAddForm(!showAddForm)}
            modifClass={s.goBackBtn}
          >
            <span className="visually-hidden">
              {showAddForm ? 'Show book categories' : 'Show add book form'}
            </span>
            <HiOutlineArrowNarrowLeft />
          </Button>
        )}

        {isMobileScreen ? showAddForm && <LibraryForm /> : <LibraryForm />}

        {!hasPendingBook && <div>Library is empty</div>}

        {books.length !== 0 && isMobileScreen ? (
          !showAddForm && (
            <>
              <LibraryCategories books={books} />
              {userHasRunnigTraining && (
                <Button
                  variant="filled"
                  onClick={() => navigate('/training')}
                  modifClass={s.trainingBtn}
                >
                  My training
                </Button>
              )}
            </>
          )
        ) : (
          <>
            <LibraryCategories books={books} />
            {hasPendingBook && userHasRunnigTraining && (
              <Button
                variant="filled"
                onClick={() => navigate('/training')}
                modifClass={s.trainingBtn}
              >
                My training
              </Button>
            )}
          </>
        )}

        {isMobileScreen && books.length !== 0 && !showAddForm && (
          <Button
            variant="filled"
            modifClass={s.showAddFormBtn}
            onClick={() => setShowAddForm(true)}
          >
            <span className="visually-hidden">Show add book form</span>
          </Button>
        )}
      </Container>
    );
  }
};

export default LibraryPage;
