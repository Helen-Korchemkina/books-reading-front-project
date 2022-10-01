import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import { BOOKS_STATUS, useGetBooksQuery } from 'redux/books/books-api';
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
  const {
    data: books = [],
    isSuccess: isBooksSuccess,
    isLoading: isBooksLoading,
  } = useGetBooksQuery();

  const navigate = useNavigate();
  const [switchComponents, setSwitchComponents] = useState(true);
  const userHasRunnigTraining = true;
  const isMobileScreen = useMediaQuery({ query: '(max-width: 768px)' });
  const showAddForm = isMobileScreen ? switchComponents : true;
  const showCatalog = isMobileScreen ? !switchComponents : true;

  useEffect(() => {
    setSwitchComponents(true);
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
        {isMobileScreen && (
          <GoBackButton onClick={() => setSwitchComponents(!showAddForm)} />
        )}

        {showAddForm && (
          <LibraryForm
            onFormSubmit={
              isMobileScreen
                ? () => {
                    setSwitchComponents(false);
                    setTimeout(() => {
                      window.scrollTo({
                        top: document.body.scrollHeight,
                        behavior: 'smooth',
                      });
                    });
                  }
                : null
            }
          />
        )}
        <div className={s.catalogWrapper}>
          {books.length === 0 && showCatalog && (
            <EmptyLibraryModal
              onConfirmBtnClick={() => setSwitchComponents(true)}
            />
          )}

          {books.length !== 0 && showCatalog && (
            <>
              <LibraryCatalog books={books} />
              {!hasPendingBook && userHasRunnigTraining && (
                <Button
                  variant="filled"
                  onClick={() => navigate('/training')}
                  modifClass={s.trainingBtn}
                >
                  My training
                </Button>
              )}

              {isMobileScreen && (
                <PlusButton onClick={() => setSwitchComponents(true)} />
              )}
            </>
          )}
        </div>
      </Container>
    );
  }
};

export default LibraryPage;
