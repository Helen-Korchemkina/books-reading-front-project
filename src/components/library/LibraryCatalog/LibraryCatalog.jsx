import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';

import { BOOKS_STATUS } from 'redux/books/books-api';
import LibraryTable from 'components/library/LibraryTable';
import ReviewModalWindow from 'components/library/ReviewModalWindow';
import s from './LibraryCatalog.module.scss';

const LibraryCatalog = ({ books = [] }) => {
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [resumeModalValues, setResumeModalValues] = useState({
    id: null,
    rating: 0,
    resume: '',
  });

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
    const selectedBook = booksByStatus[BOOKS_STATUS.finish].find(
      book => book.id === id
    );
    setResumeModalValues({
      id: selectedBook.id,
      rating: selectedBook.rating,
      resume: selectedBook.resume,
    });
    setShowReviewModal(true);
  };

  return (
    <div>
      {showReviewModal && (
        <ReviewModalWindow
          onModalClose={() => setShowReviewModal(false)}
          startBookValues={{ ...resumeModalValues }}
        />
      )}

      {booksByStatus[BOOKS_STATUS.finish].length > 0 && (
        <div>
          <h2 className={s.title}>Already read</h2>
          <LibraryTable
            books={booksByStatus[BOOKS_STATUS.finish]}
            onShowResumeBtnClick={handleShowResumeBtnClick}
          />
        </div>
      )}

      {booksByStatus[BOOKS_STATUS.reading].length > 0 && (
        <div>
          <h2 className={s.title}>Reading now</h2>
          <LibraryTable books={booksByStatus[BOOKS_STATUS.reading]} />
        </div>
      )}

      {booksByStatus[BOOKS_STATUS.pending].length > 0 && (
        <div>
          <h2 className={s.title}>Going to read</h2>
          <LibraryTable books={booksByStatus[BOOKS_STATUS.pending]} />
        </div>
      )}
    </div>
  );
};

LibraryCatalog.propTypes = {
  books: PropTypes.array.isRequired,
};

export default LibraryCatalog;
