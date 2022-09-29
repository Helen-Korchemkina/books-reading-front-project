import Media from 'react-media';
import EllipsisText from 'react-ellipsis-text';
import classNames from 'classnames';
import Rating from '@mui/material/Rating';
import { MdOutlineMenuBook } from 'react-icons/md';
import PropTypes from 'prop-types';

import { BOOKS_STATUS } from 'redux/books/books-api';
import Button from 'components/Button';
import s from './LibraryTable.module.scss';

const LibraryTable = ({ books = [], onShowResumeBtnClick }) => {
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
          <tr key={book.id} className={s.bodyRow}>
            <td className={s.bodyRowTitle}>
              <MdOutlineMenuBook
                className={classNames({
                  [s.icon]: true,
                  [s.iconFill]: book.status === BOOKS_STATUS.reading,
                })}
              />
              <Media queries={{ small: { minWidth: 768 } }}>
                {matches =>
                  matches.small && book.status === BOOKS_STATUS.finish ? (
                    <EllipsisText text={book.title} length={20} />
                  ) : (
                    <span>{book.title}</span>
                  )
                }
              </Media>
            </td>
            <td className={s.inlineTitle}>
              <Media queries={{ small: { minWidth: 768 } }}>
                {matches =>
                  matches.small && book.status === BOOKS_STATUS.finish ? (
                    <EllipsisText text={book.author} length={20} />
                  ) : (
                    <>
                      <span className={s.subtitle}>Author:</span>
                      {book.author}
                    </>
                  )
                }
              </Media>
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
                  name="read-only"
                  size="small"
                  defaultValue={book.rating}
                  readOnly
                />
              </td>
            )}
            {book.status === BOOKS_STATUS.finish && (
              <td className={s.btnCell}>
                <Button
                  variant="filled"
                  modifClass={s.button}
                  onClick={() => onShowResumeBtnClick(book.id)}
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
      id: PropTypes.string.isRequired,
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
