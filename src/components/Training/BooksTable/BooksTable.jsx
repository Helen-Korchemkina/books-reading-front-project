import { MdOutlineMenuBook } from 'react-icons/md';
import { MdDeleteOutline } from 'react-icons/md';
import Button from 'components/common/Button';
import classNames from 'classnames';
import s from './BooksTable.module.scss';
import {useRemoveBookMutation} from '../../../redux/books/books-api';

const BooksTable = ({books = []}) => {
  const [removeBook] = useRemoveBookMutation();
  console.log(books)
  return (
    <>
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
          {books.map(({ _id, title, author, countOfPages, releaseDate }) => (
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
                    })} onClick={() => removeBook(_id)}
                  />
                )}
                <span className={s.subtitle}>Pages:</span>
                {countOfPages}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </>
  );
};

export default BooksTable;

