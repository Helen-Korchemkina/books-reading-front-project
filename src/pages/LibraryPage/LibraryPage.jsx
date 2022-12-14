import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import classNames from 'classnames';

import { getPendingBooks, getReadingBooks } from 'redux/books/books-selectors';
import Container from 'components/common/Container';
import Button from 'components/common/Button';
import GoBackButton from 'components/common/GoBackButton';
import PlusButton from 'components/common/PlusButton';
import LibraryForm from 'components/library/LibraryForm';
import LibraryCatalog from 'components/library/LibraryCatalog';
import s from './LibraryPage.module.scss';

const LibraryPage = () => {
  const [showFormOnMobile, setShowFormOnMobile] = useState(true);
  const navigate = useNavigate();
  const hasPendingBook = useSelector(getPendingBooks).length !== 0;
  const hasReadingBook = useSelector(getReadingBooks).length !== 0;
  const isMobileScreen = useMediaQuery({ query: '(max-width: 768px)' });
  const hideAddForm = isMobileScreen ? !showFormOnMobile : false;
  const hideCatalog = isMobileScreen ? showFormOnMobile : false;

  useEffect(() => {
    setShowFormOnMobile(true);
  }, [isMobileScreen]);

  return (
    <Container>
      {isMobileScreen && (
        <GoBackButton onClick={() => setShowFormOnMobile(!hideCatalog)} />
      )}

      <div className={classNames({ [s.hide]: hideAddForm })}>
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
      </div>

      <div
        className={classNames({
          [s.catalogWrapper]: true,
          [s.hide]: hideCatalog,
        })}
      >
        <LibraryCatalog onCloseMobileModal={() => setShowFormOnMobile(true)} />

        {(hasPendingBook || hasReadingBook) && (
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
      </div>
    </Container>
  );
};

export default LibraryPage;
