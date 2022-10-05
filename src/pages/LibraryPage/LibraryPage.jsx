import { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import { BOOKS_STATUS, useGetBooksQuery } from 'redux/books/books-api';
import { getTraining } from 'redux/auth/authSelectors';
import Container from 'components/common/Container';
import Button from 'components/common/Button';
import GoBackButton from 'components/common/GoBackButton';
import PlusButton from 'components/common/PlusButton';
import LoadSpinner from 'components/common/LoadSpinner';
import LibraryForm from 'components/library/LibraryForm';
import LibraryCatalog from 'components/library/LibraryCatalog';
import EmptyLibraryModal from 'components/library/EmptyLibraryModal';
import s from './LibraryPage.module.scss';

const LibraryPage = () => {
  const { currentData: books = [], isFetching } = useGetBooksQuery();
  const userTraining = useSelector(getTraining);
  const userHasRunnigTraining =
    userTraining?.date_finish && userTraining.date_finish < Date.now();
  const [showFormOnMobile, setShowFormOnMobile] = useState(true);
  const navigate = useNavigate();
  const isMobileScreen = useMediaQuery({ query: '(max-width: 768px)' });
  const showAddForm = isMobileScreen ? showFormOnMobile : true;
  const showCatalog = isMobileScreen ? !showFormOnMobile : true;

  useEffect(() => {
    setShowFormOnMobile(true);
  }, [isMobileScreen]);

  const hasPendingBook = useMemo(
    () => books.some(book => book.status === BOOKS_STATUS.pending),
    [books]
  );

  return (
    <Container>
      {isMobileScreen && (
        <GoBackButton onClick={() => setShowFormOnMobile(!showAddForm)} />
      )}

      {showAddForm && (
        <LibraryForm
          onFormSubmit={
            isMobileScreen
              ? () => {
                  setShowFormOnMobile(false);
                  setTimeout(() => {
                    window.scrollTo({
                      top: document.body.scrollHeight + 120,
                      behavior: 'smooth',
                    });
                  });
                }
              : null
          }
        />
      )}

      <div className={s.catalogWrapper}>
        {showCatalog && books.length === 0 && (
          <>
            {isFetching && <LoadSpinner />}
            {!isFetching && (
              <EmptyLibraryModal
                onConfirmBtnClick={() => setShowFormOnMobile(true)}
              />
            )}
          </>
        )}

        {showCatalog && books.length !== 0 && (
          <>
            <LibraryCatalog books={books} />
            {isFetching && <LoadSpinner />}

            {hasPendingBook  && (
              <Button
                variant="filled"
                onClick={() => navigate('/training')}
                modifClass={s.trainingBtn}
              >
                My training
              </Button>
            )}

            {isMobileScreen && (
              <PlusButton onClick={() => setShowFormOnMobile(true)} />
            )}
          </>
        )}
      </div>
    </Container>
  );
};

export default LibraryPage;
