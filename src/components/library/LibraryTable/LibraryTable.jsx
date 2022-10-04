import classNames from 'classnames';
import { useMediaQuery } from 'react-responsive';
import LinesEllipsis from 'react-lines-ellipsis';
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC';
import Rating from '@mui/material/Rating';
import { MdOutlineMenuBook } from 'react-icons/md';
import PropTypes from 'prop-types';

import { BOOKS_STATUS } from 'redux/books/books-api';
import Button from 'components/common/Button';
import s from './LibraryTable.module.scss';

const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis);

const LibraryTable = ({ books = [], onShowResumeBtnClick }) => {
  const isMobileScreen = useMediaQuery({ query: '(max-width: 768px)' });

  return (
    <table className={s.table}>
      <thead>
        <tr className={s.headerRow}>
          <th>Book title</th>
          <th>Author</th>
          <th>Year</th>
          <th>Pages</th>
          {books[0].status === BOOKS_STATUS.finish && (
            <>
              <th>Rating</th>
              <th></th>
            </>
          )}
        </tr>
      </thead>
      <tbody>
        {books.map(book => (
          <tr key={book._id} className={s.bodyRow}>
            <td className={s.bodyRowTitle}>
              <MdOutlineMenuBook
                className={classNames({
                  [s.icon]: true,
                  [s.iconFill]: book.status === BOOKS_STATUS.reading,
                })}
              />
              {book.status === BOOKS_STATUS.finish && !isMobileScreen ? (
                <ResponsiveEllipsis
                  text={book.title}
                  maxLine="1"
                  basedOn="letters"
                />
              ) : (
                <span>{book.title}</span>
              )}
            </td>
            <td className={s.inlineTitle}>
              <span className={s.subtitle}>Author:</span>
              {book.status === BOOKS_STATUS.finish && !isMobileScreen ? (
                <ResponsiveEllipsis
                  text={book.author}
                  maxLine="1"
                  basedOn="letters"
                />
              ) : (
                <span>{book.author}</span>
              )}
            </td>
            <td className={s.inlineTitle}>
              <span className={s.subtitle}>Year:</span>
              {book.releaseDate}
            </td>
            <td className={s.inlineTitle}>
              <span className={s.subtitle}>Pages:</span>
              {book.countOfPages}
            </td>
            {book.status === BOOKS_STATUS.finish && (
              <td className={s.inlineTitle}>
                <span className={s.subtitle}>Rating:</span>
                <Rating
                  className={s.rating}
                  name="rating"
                  size="small"
                  value={book.rating}
                  readOnly
                />
              </td>
            )}
            {book.status === BOOKS_STATUS.finish && (
              <td className={s.btnCell}>
                <Button
                  variant="filled"
                  modifClass={s.button}
                  onClick={() => onShowResumeBtnClick(book._id)}
                >
                  Resume
                </Button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

LibraryTable.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      releaseDate: PropTypes.number.isRequired,
      countOfPages: PropTypes.number.isRequired,
      status: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
    })
  ).isRequired,
  onShowResumeBtnClick: PropTypes.func,
};

export default LibraryTable;
