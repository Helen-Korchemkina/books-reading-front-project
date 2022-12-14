// import { MdOutlineMenuBook } from 'react-icons/md';
// import { MdDeleteOutline } from 'react-icons/md';

// import classNames from 'classnames';
import s from './BooksTable.module.scss';

const BooksTable = () => {
  
  const booksDefault = [
    {
      title: 'Scrum. A  revolutionary method...',
      author: 'Jeff Sutherland',
      releaseDate: 2022,
      countOfPages: 15,
    },
    // {
    //   title: '...',
    //   author: '',
    //   releaseDate: '',
    //   countOfPages: '',
    // },
  ];
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
          {booksDefault.map(book => (
            <tr key={book.id} className={s.bodyRow}>
              <td className={s.bodyRowTitle}>
                <input type="checkbox"  className={s.checkbox} />
                {/* <MdOutlineMenuBook
                  className={classNames({
                    [s.icon]: true,
                  })}
                 /> */}
                <span className={s.title}>{book.title}</span>
              </td>
              <td className={s.inlineTitle}>
                <span className={s.subtitle}>Author:</span>
                {book.author}
              </td>
              <td className={s.inlineTitle}>
                <span className={s.subtitle}>Year:</span>
                {book.releaseDate}
              </td>
              <td className={s.inlineTitle}>
                {/* {book.title !== '...' && (
                  <MdDeleteOutline
                    className={classNames({
                      [s.iconDelete]: true,
                    })}
                  />
                )} */}
                <span className={s.subtitle}>Pages:</span>
                {book.countOfPages}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
     
    </>
  );
};

export default BooksTable;

// onClick={() => onStart??raningBtnClick(book.id)}
