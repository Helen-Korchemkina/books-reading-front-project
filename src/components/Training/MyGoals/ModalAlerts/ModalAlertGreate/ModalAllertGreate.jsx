import Button from 'components/common/Button';
import { MdOutlineThumbUp } from 'react-icons/md';
import s from './ModalAllertGreate.module.scss';
import {
  BOOKS_STATUS,
  useUpdateStatusBookMutation,
} from 'redux/books/books-api';
import { useNavigate } from 'react-router-dom';
import { getBooks } from 'redux/books/books-selectors';
import { useSelector } from 'react-redux';
import { useUpdateStatisticsMutation } from 'redux/statistics/statistics-api';
import { useUpdateUserTrainingMutation } from 'redux/auth/auth-api';

function ModalAllertGreate({ click }) {
  const navigate = useNavigate();
  const [updateStatusBook] = useUpdateStatusBookMutation();
  const allBooks = useSelector(getBooks);
  const [updateStatistics] = useUpdateStatisticsMutation();
  const [updateUserTraining] = useUpdateUserTrainingMutation();

  const handleNewTraining = () => {
    navigate('/library', { replace: true });

    allBooks.map(async book => {
      if (
        (book.status === BOOKS_STATUS.reading && book.isReadBook) ||
        (book.status === BOOKS_STATUS.finish && book.isReadBook)
      ) {
        await updateStatusBook({
          id: book._id,
          status: BOOKS_STATUS.finish,
          isReadBook: false,
        });
      }
    });
    click(false);
    updateStatistics({ numberOfPagesRead: null, readDate: null });
    updateUserTraining({
      date_start: '0',
      date_finish: '0',
    });
  };

  return (
    <div className={s.modal}>
      <MdOutlineThumbUp className={s.likeIcon} />
      <p className={s.text}>Congratulations! Another book read.</p>
      <div className={s.buttonWrap}>
        <Button
          variant="filled"
          modifClass={s.button}
          onClick={() => handleNewTraining()}
        >
          Done
        </Button>
      </div>
    </div>
  );
}

export default ModalAllertGreate;
