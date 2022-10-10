import { useState, useEffect } from 'react';

import {
  filterBooksIsRead,
  countPageStatistics,
  countPageIsRead,
  filterBooksGoingAndStatus,
} from 'helpers/filterBooks';
import { millisecondsToDay } from 'helpers/date';

import { useGetStatisticsQuery } from 'redux/statistics/statistics-api';
import { useGetBooksQuery } from 'redux/books/books-api';
import { BOOKS_STATUS } from 'redux/books/books-api';

import ModalAllertFaster from './ModalAlerts/ModalAlertFaster';
import ModalAllertGreate from './ModalAlerts/ModalAlertGreate';
import ModalWindow from 'components/common/ModalWindow';

import s from './MyGoals.module.scss';

const MyGoals = ({ isShow, time }) => {
  const { data: statistics = {} } = useGetStatisticsQuery();
  const { data = [] } = useGetBooksQuery();

  const [isGoodReading, setIsGoodReading] = useState(false);
  const [isBadReading, setIsBadReading] = useState(false);

  const showBlockContainer = isShow ? 'isShowBlockContainer' : 'blockContainer';
  const showBlock = isShow ? 'isShowBlock' : 'block';
  const showNumber = isShow ? 'isShowNumber' : 'number';

  const alreadyReadLength = filterBooksGoingAndStatus(
    data,
    BOOKS_STATUS.finish,
    true
  );
  const isRead = filterBooksIsRead(data, true);

  const numberOfPagesFromStatistics = countPageStatistics(statistics);
  const numberOfPagesFromIsRead = countPageIsRead(isRead);
  const page = numberOfPagesFromIsRead - numberOfPagesFromStatistics;

  const days = millisecondsToDay(time);

  useEffect(() => {
    if (days === 0 && page > 0 && time !== null) {
      setIsBadReading(true);
    }
    if (days > 0 && page <= 0 && isRead.length > 0) {
      setIsGoodReading(true);
    }
  }, [days, isRead.length, page, time]);

  return (
    <div className={s.container}>
      <h1 className={s.title}>My Goals</h1>
      <div className={s[showBlockContainer]}>
        <div className={s[showBlock]}>
          <p className={s[showNumber]}>{isRead.length}</p>
          <p className={s.desc}>Amount of books</p>
        </div>
        <div className={s[showBlock]}>
          <p className={s[showNumber]}>{days || 0}</p>
          <p className={s.desc}>Amount of days</p>
        </div>
        {isShow && (
          <div className={s[showBlock]}>
            <p className={s.numberShow}>{alreadyReadLength.length}</p>
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
