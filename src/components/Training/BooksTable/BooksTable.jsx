import { MdOutlineMenuBook } from 'react-icons/md';
import { MdDeleteOutline } from 'react-icons/md';
import Media from 'react-media';
import classNames from 'classnames';
import BooksTableMobile from '../BooksTableMobile';
import s from './BooksTable.module.scss';
import { useUpdateStatusBookMutation } from '../../../redux/books/books-api';

const BooksTable = ({ books = [] }) => {
  const [updateStatusBook] = useUpdateStatusBookMutation();

  const handleClickDeliteBookFromTrening = id => {
    try {
      updateStatusBook({
        id,
        status: 'Going to read',
        isReadBook: false,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Media queries={{ small: { maxWidth: 767 } }}>
        {matches =>
          matches.small && (
            <BooksTableMobile
              books={books}
              onDel={handleClickDeliteBookFromTrening}
            />
          )
        }
      </Media>
      <Media queries={{ small: { minWidth: 768 } }}>
        {matches =>
          matches.small && (
            <table className={s.table}>
              <thead>
                <tr className={s.headerRow}>
                  <th>Book title</th>
                  <th>Author</th>
                  <th>Year</th>
                  <th>Pages</th>
                </tr>
              </thead>
              <tbody>
                {books.map(
                  ({ _id, title, author, countOfPages, releaseDate }) => (
                    <tr key={_id} className={s.bodyRow}>
                      <td className={s.bodyRowTitle}>
                        <MdOutlineMenuBook
                          className={classNames({
                            [s.icon]: true,
                          })}
                        />
                        <span className={s.title}>{title}</span>
                      </td>
                      <td className={s.inlineTitle}>
                        <span className={s.subtitle}>Author:</span>
                        {author}
                      </td>
                      <td className={s.inlineTitle}>
                        <span className={s.subtitle}>Year:</span>
                        {releaseDate}
                      </td>
                      <td className={s.inlineTitle}>
                        {title !== '...' && (
                          <MdDeleteOutline
                            className={classNames({
                              [s.iconDelete]: true,
                            })}
                            onClick={() =>
                              handleClickDeliteBookFromTrening(_id)
                            }
                          />
                        )}
                        <span className={s.subtitle}>Pages:</span>
                        {countOfPages}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          )
        }
      </Media>
    </>
  );
};

export default BooksTable;
