import { useState, useEffect } from 'react';
import {
  filterBooksIsRead,
  filterBooksStatus,
  countPageStatistics,
  countPageIsRead,
} from 'helpers/filterBooks';
import { millisecondsToDay } from 'helpers/date';
import { useGetStatisticsQuery } from 'redux/statistics/statistics-api';

import s from './MyGoals.module.scss';
import ModalAllertFaster from './ModalAlerts/ModalAlertFaster';
import ModalAllertGreate from './ModalAlerts/ModalAlertGreate';
import ModalWindow from 'components/common/ModalWindow';

const ALREADY_READ = 'Already read';

const MyGoals = ({ isShow, books = [], time }) => {
  const { data: statistics = {} } = useGetStatisticsQuery();

  const [isGoodReading, setIsGoodReading] = useState(false);
  const [isBadReading, setIsBadReading] = useState(false);

  const showBlockContainer = isShow ? 'isShowBlockContainer' : 'blockContainer';
  const showBlock = isShow ? 'isShowBlock' : 'block';
  const showNumber = isShow ? 'isShowNumber' : 'number';

  const alreadyReadLength = filterBooksStatus(books, ALREADY_READ);
  const isRead = filterBooksIsRead(books, true);
  const numberOfPagesFromStatistics = countPageStatistics(statistics);
  const numberOfPagesFromIsRead = countPageIsRead(isRead);
  const page = numberOfPagesFromIsRead - numberOfPagesFromStatistics;

  const days = millisecondsToDay(time);

  useEffect(() => {
    if (days === 0 && page > 0) {
      setIsBadReading(true);
    }
    if (days > 0 && page <= 0) {
      setIsGoodReading(true);
    }
  }, [days, page]);

  return (
    <div className={s.container}>
      <h1 className={s.title}>My Goals</h1>
      <div className={s[showBlockContainer]}>
        <div className={s[showBlock]}>
          <p className={s[showNumber]}>{isShow ? isRead.length : 0}</p>
          <p className={s.desc}>Amount of books</p>
        </div>
        <div className={s[showBlock]}>
          <p className={s[showNumber]}>{isShow ? days : 0}</p>
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
          <ModalAllertGreate />
        </ModalWindow>
      )}
      {isBadReading && (
        <ModalWindow onClose={setIsBadReading}>
          <ModalAllertFaster />
        </ModalWindow>
      )}
    </div>
  );
};

export default MyGoals;
