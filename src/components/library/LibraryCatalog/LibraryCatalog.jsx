import { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import {
  getPendingBooks,
  getReadingBooks,
  getFinishBooks,
} from 'redux/books/books-selectors';
import { useGetBooksQuery } from 'redux/books/books-api';
import LoadSpinner from 'components/common/LoadSpinner';
import LibraryTable from 'components/library/LibraryTable';
import EmptyLibraryModal from 'components/library/EmptyLibraryModal';
import ReviewModalWindow from 'components/library/ReviewModalWindow';
import s from './LibraryCatalog.module.scss';

const LibraryCatalog = ({ onCloseMobileModal }) => {
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewBookId, setReviewBookId] = useState(null);

  const { data: books = [], isFetching } = useGetBooksQuery();
  const pendingBooks = useSelector(getPendingBooks);
  const readingBooks = useSelector(getReadingBooks);
  const finishBooks = useSelector(getFinishBooks);

  const handleShowResumeBtnClick = id => {
    setReviewBookId(id);
    setShowReviewModal(true);
  };

  return (
    <div className={s.container}>
      {showReviewModal && (
        <ReviewModalWindow
          bookId={reviewBookId}
          onModalClose={() => setShowReviewModal(false)}
        />
      )}

      {books.length === 0 && (
        <>
          {isFetching && <LoadSpinner />}
          {!isFetching && (
            <EmptyLibraryModal onConfirmBtnClick={onCloseMobileModal} />
          )}
        </>
      )}

      {finishBooks.length > 0 && (
        <div>
          <h2 className={s.title}>Already read</h2>
          <LibraryTable
            books={finishBooks}
            onShowResumeBtnClick={handleShowResumeBtnClick}
          />
        </div>
      )}

      {readingBooks.length > 0 && (
        <div>
          <h2 className={s.title}>Reading now</h2>
          <LibraryTable books={readingBooks} />
        </div>
      )}

      {pendingBooks.length > 0 && (
        <div>
          <h2 className={s.title}>Going to read</h2>
          <LibraryTable books={pendingBooks} />
        </div>
      )}

      {books.length !== 0 && isFetching && <LoadSpinner />}
    </div>
  );
};

LibraryCatalog.propTypes = {
  onCloseMobileModal: PropTypes.func.isRequired,
};

export default LibraryCatalog;
