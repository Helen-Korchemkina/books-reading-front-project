import { MdOutlineMenuBook } from 'react-icons/md';
import { MdDeleteOutline } from 'react-icons/md';
import Media from 'react-media';
import classNames from 'classnames';

import BooksTableMobile from '../BooksTableMobile';
import {
  useUpdateStatusBookMutation,
  BOOKS_STATUS,
} from 'redux/books/books-api';
import s from './BooksTable.module.scss';

const BooksTable = ({ books = [] }) => {
  const [updateStatusBook] = useUpdateStatusBookMutation();

  const handleClickDeliteBookFromTrening = (id, status) => {
    if (status === BOOKS_STATUS.reading) return;
    try {
      updateStatusBook({
        id,
        status: BOOKS_STATUS.pending,
        isReadBook: false,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddStatusAlreadyRead = (id, status) => {
    try {
      if (status === BOOKS_STATUS.finish) {
        updateStatusBook({
          id,
          status: BOOKS_STATUS.reading,
          isReadBook: false,
        });
        return;
      }
      updateStatusBook({
        id,
        status: BOOKS_STATUS.finish,
        isReadBook: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const isActivIcon = status => {
    return status === BOOKS_STATUS.finish ? 'iconActive' : 'icon';
  };

  // const iconDelete = status => {
  //   return status !== 'Going to read' ? 'iconNone' : 'iconDel';
  //  }

  return (
    <>
      <Media queries={{ small: { maxWidth: 767 } }}>
        {matches =>
          matches.small && (
            <BooksTableMobile
              books={books}
              onDel={handleClickDeliteBookFromTrening}
              onAlready={handleAddStatusAlreadyRead}
            />
          )
        }
      </Media>
      <Media queries={{ small: { minWidth: 768 } }}>
        {matches =>
          matches.small && (
            <div className={s.wrap}>
              <table className={s.table}>
                <thead>
                  <tr className={s.headerRow}>
                    <th>Book title</th>
                    <th>Author</th>
                    <th>Year</th>
                    <th>Pages</th>
                  </tr>
                </thead>
                <tbody className={s.tBody}>
                  {books.map(
                    ({
                      _id,
                      title,
                      author,
                      countOfPages,
                      releaseDate,
                      status,
                      isReadBook,
                    }) => (
                      <tr key={_id} className={s.bodyRow}>
                        <td className={s.bodyRowTitle}>
                          <MdOutlineMenuBook
                            className={classNames({
                              [s[isActivIcon(status)]]: true,
                            })}
                            onClick={() =>
                              handleAddStatusAlreadyRead(_id, status)
                            }
                          />
                          <span className={s.title}>{title}</span>
                        </td>
                        <td className={s.inlineTitle}>
                          {/* <span className={s.subtitle}>Author:</span> */}
                          {author}
                        </td>
                        <td className={s.inlineTitle}>
                          {/* <span className={s.subtitle}>Year:</span> */}
                          {releaseDate}
                        </td>
                        <td className={s.inlineTitle}>
                          {title !== '...' && status === BOOKS_STATUS.pending && (
                            <MdDeleteOutline
                              className={classNames({
                                [s.iconDelete]: true,
                              })}
                              onClick={() =>
                                handleClickDeliteBookFromTrening(_id, status)
                              }
                            />
                          )}
                          <span className={s.subtitle}>Pages:</span>
                          {countOfPages}
                        </td>
                      </tr>
                    )
                  )}
                  <tr>
                    <td className={s.bodyRowTitle}>
                      <MdOutlineMenuBook className={s.icon} />
                      <span className={s.title}>...</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )
        }
      </Media>
    </>
  );
};

export default BooksTable;
