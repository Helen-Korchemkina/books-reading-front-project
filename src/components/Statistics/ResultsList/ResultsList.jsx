import { useGetStatisticsQuery } from 'redux/statistics/statistics-api';

import s from './ResultsList.module.scss';

const addLeadingZero = d => {
  return d < 10 ? '0' + d : d;
};

const ResultsList = () => {
  const { data: statistics = {} } = useGetStatisticsQuery();
  let classIsNoEmptyArray = s.statisticsWrap;
  if (statistics.readDate?.length === 0) {
    classIsNoEmptyArray = s.hidden;
  }

  const millisecondsToDate = mls => {
    const date = new Date(Number(mls));
    const Y = date.getFullYear();
    const M = addLeadingZero(date.getMonth() + 1);
    const D = addLeadingZero(date.getDate());

    return `${D}.${M}.${Y}`;
  };
  const millisecondsToTime = mls => {
    const date = new Date(Number(mls));

    const H = addLeadingZero(date.getHours());
    const M = addLeadingZero(date.getMinutes());
    const S = addLeadingZero(date.getSeconds());

    return `${H}:${M}:${S}`;
  };

  return (
    <div className={classIsNoEmptyArray}>
      <p className={s.title}>STATISTICS</p>

      <ul className={s.list}>
        {statistics.readDate?.map((item, index) => (
          <li className={s.item} key={item + index}>
            <span className={s.date}>{millisecondsToDate(item)}</span>
            <span className={s.time}>{millisecondsToTime(item)}</span>
            <span className={s.count}>
              {statistics.numberOfPagesRead[index]}{' '}
              <span className={s.countText}>pages</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResultsList;
