import { MdOutlineMenuBook } from 'react-icons/md';
import { MdDeleteOutline } from 'react-icons/md';
import Media from 'react-media';

import BooksTableMobile from 'components/Training/BooksTableMobile';

import {
  BOOKS_STATUS,
  useUpdateStatusBookMutation,
} from 'redux/books/books-api';
import CheckBox from './CheckBox';

import s from './BooksTable.module.scss';

const BooksTableStub = ({ books = [], isShow }) => {
  const [updateStatusBook] = useUpdateStatusBookMutation();

  const isBooksNoEmpty = books.length === 0 ? s.contentWrap : s.isContentWrap;

  const handleClickDeliteBookFromTrening = async (id, status) => {
    if (status === BOOKS_STATUS.reading) return;
    try {
      await updateStatusBook({
        id,
        status: BOOKS_STATUS.pending,
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
            <div className={s.wrap}>
              <div className={s.titleWrap}>
                <label htmlFor="titleB" className={s.titleB}>
                  Book title
                </label>
                <label htmlFor="titleA" className={s.titleA}>
                  Author
                </label>
                <label htmlFor="titleY" className={s.titleY}>
                  Year
                </label>
                <label htmlFor="titleP" className={s.titleP}>
                  Pages
                </label>
              </div>
              <div className={isBooksNoEmpty}>
                {books.map(
                  ({
                    _id,
                    title,
                    author,
                    countOfPages,
                    releaseDate,
                    status,
                  }) => (
                    <div key={_id} className={s.inputWrap}>
                      {isShow ? (
                        <CheckBox
                          status={status}
                          id={_id}
                          countOfPages={countOfPages}
                        />
                      ) : (
                        <MdOutlineMenuBook className={s.icon} />
                      )}
                      <input
                        disabled
                        id="titleB"
                        type="text"
                        value={title}
                        className={s.titleBInput}
                        readOnly
                      />
                      <input
                        id="titleA"
                        type="text"
                        value={author}
                        className={s.titleAInput}
                        readOnly
                      />
                      <input
                        id="titleA"
                        type="text"
                        value={releaseDate}
                        className={s.titleYInput}
                        readOnly
                      />
                      <input
                        id="titleA"
                        type="text"
                        value={countOfPages}
                        className={s.titlePInput}
                        readOnly
                      />
                      {status === BOOKS_STATUS.pending && (
                        <MdDeleteOutline
                          className={s.iconDel}
                          onClick={() =>
                            handleClickDeliteBookFromTrening(_id, status)
                          }
                        />
                      )}
                    </div>
                  )
                )}
                {!isShow && (
                  <div className={s.inputWrap}>
                    <MdOutlineMenuBook className={s.icon} />
                    <span className={s.spanText}>...</span>
                    {books.length === 0 && (
                      <span className={s.spanScroll}></span>
                    )}
                  </div>
                )}
              </div>
            </div>
          )
        }
      </Media>
    </>
  );
};

export default BooksTableStub;
