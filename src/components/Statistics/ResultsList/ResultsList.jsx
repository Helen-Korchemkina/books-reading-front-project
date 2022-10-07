import { useGetStatisticsQuery } from 'redux/statistics/statistics-api';
import { millisecondsToDate, millisecondsToTime } from 'helpers/date';

import s from './ResultsList.module.scss';

const ResultsList = () => {
  const { data: statistics = {} } = useGetStatisticsQuery();
  let classIsNoEmptyArray = s.statisticsWrap;
  if (statistics.readDate?.length === 0) {
    classIsNoEmptyArray = s.hidden;
  }

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
