import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  BOOKS_STATUS,
  useUpdateStatusBookMutation,
} from 'redux/books/books-api';
import { countStatisticsPage } from 'redux/statistics/statistics-selectors';

import s from './CheckBox.module.scss';

const CheckBox = ({ status, id, countOfPages }) => {
  const [checked, setChecked] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [updateStatusBook] = useUpdateStatusBookMutation();
  const countStatPage = useSelector(countStatisticsPage);

  useEffect(() => {
    if (status === BOOKS_STATUS.finish) {
      setChecked(true);
    }
  }, [status]);

  useEffect(() => {
    if (countOfPages <= countStatPage) {
      setDisabled(false);
    }
  }, [countOfPages, countStatPage]);

  const nandleChange = e => {
    const toggle = e.target.checked;

    if (toggle && !checked) {
      try {
        updateStatusBook({
          id,
          status: BOOKS_STATUS.finish,
          isReadBook: true,
        });
      } catch (error) {
        console.log(error);
      }
      setChecked(true);
    } else {
      try {
        updateStatusBook({
          id,
          status: BOOKS_STATUS.reading,
          isReadBook: true,
        });
      } catch (error) {
        console.log(error);
      }
      setChecked(false);
    }
  };

  return (
    <label className={s.label}>
      <input
        type="checkbox"
        name="checkbox"
        checked={checked}
        disabled={disabled}
        className={s.checkbox__input}
        onChange={nandleChange}
      />
      <span className={s.checkbox__icon}></span>
    </label>
  );
};

export default CheckBox;
