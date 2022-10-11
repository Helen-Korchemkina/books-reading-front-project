import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import {
  countPageStatistics,
  countPageIsRead,
  filterBooksIsRead,
} from 'helpers/filterBooks';
import { millisecondsToDay } from 'helpers/date';

import { useGetStatisticsQuery } from 'redux/statistics/statistics-api';
import { getBooks, getFinishBooks } from 'redux/books/books-selectors';

import ModalAllertFaster from './ModalAlerts/ModalAlertFaster';
import ModalAllertGreate from './ModalAlerts/ModalAlertGreate';
import ModalWindow from 'components/common/ModalWindow';

import s from './MyGoals.module.scss';

const MyGoals = ({ isShow, startTime, finishTime }) => {
  const { data: statistics = {} } = useGetStatisticsQuery();

  const [isGoodReading, setIsGoodReading] = useState(false);
  const [isBadReading, setIsBadReading] = useState(false);

  const showBlockContainer = isShow ? 'isShowBlockContainer' : 'blockContainer';
  const showBlock = isShow ? 'isShowBlock' : 'block';
  const showNumber = isShow ? 'isShowNumber' : 'number';

  const alreadyRead = useSelector(getFinishBooks);
  const allBooks = useSelector(getBooks);
  const alreadyReadLength = filterBooksIsRead(alreadyRead, true);
  const isRead = filterBooksIsRead(allBooks, true);
  const booksLeft = isRead.length - alreadyReadLength.length;

  const numberOfPagesFromStatistics = countPageStatistics(statistics);
  const numberOfPagesFromIsRead = countPageIsRead(isRead);
  const page = numberOfPagesFromIsRead - numberOfPagesFromStatistics;

  const days = millisecondsToDay(startTime, finishTime);

  useEffect(() => {
    if (days === 0 && page > 0 && finishTime !== null) {
      setIsBadReading(true);
    }
    if (
      (days > 0 && page <= 0 && isRead.length > 0) ||
      (booksLeft === 0 && isRead.length > 0)
    ) {
      setIsGoodReading(true);
    }
  }, [days, isRead.length, page, finishTime, booksLeft]);

  return (
    <div className={s.container}>
      <h1 className={s.title}>My Goals</h1>
      <div className={s[showBlockContainer]}>
        <div className={s[showBlock]}>
          <p className={s[showNumber]}>{isRead.length || 0}</p>
          <p className={s.desc}>Amount of books</p>
        </div>
        <div className={s[showBlock]}>
          <p className={s[showNumber]}>{days || 0}</p>
          <p className={s.desc}>Amount of days</p>
        </div>
        {isShow && (
          <div className={s[showBlock]}>
            <p className={s.numberShow}>{booksLeft || 0}</p>
            <p className={s.desc}>Books left</p>
          </div>
        )}
      </div>
      {isGoodReading && (
        <ModalWindow onClose={setIsGoodReading}>
          <ModalAllertGreate click={setIsGoodReading} />
        </ModalWindow>
      )}
      {isBadReading && (
        <ModalWindow onClose={setIsBadReading}>
          <ModalAllertFaster click={setIsBadReading} />
        </ModalWindow>
      )}
    </div>
  );
};

export default MyGoals;
