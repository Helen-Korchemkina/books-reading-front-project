import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { useGetUserTrainingQuery } from 'redux/auth/auth-api';
import { useGetBooksQuery } from 'redux/books/books-api';
import { useGetStatisticsQuery } from 'redux/statistics/statistics-api';
import { getTraining } from 'redux/auth/authSelectors';
import { getReadingBooks } from 'redux/books/books-selectors';
import {
  getGraphOptions,
  getGraphData,
  getPlanningGraphData,
  getFactPoints,
} from './utils';
import s from './Graphic.module.scss';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Graphic = () => {
  useGetBooksQuery();
  useGetUserTrainingQuery();
  const { data: statistics = [], isSuccess } = useGetStatisticsQuery();

  const readingBooks = useSelector(getReadingBooks);
  const currentTraining = useSelector(getTraining);
  // console.log('currentTraining', currentTraining);

  const { labels, planningPoints = [] } = useMemo(
    () =>
      getPlanningGraphData(
        currentTraining.startMillisecond,
        currentTraining.finishMillisecond,
        readingBooks
      ),
    [
      currentTraining.finishMillisecond,
      currentTraining.startMillisecond,
      readingBooks,
    ]
  );

  const factPoints = useMemo(() => {
    if (isSuccess && currentTraining?.startMillisecond && labels.length > 0) {
      return getFactPoints(
        currentTraining.startMillisecond,
        labels,
        statistics
      );
    }
    return [];
  }, [isSuccess, statistics, currentTraining.startMillisecond, labels]);

  return (
    <div className={s.container}>
      <div className={s.graphic}>
        <Line
          options={getGraphOptions(labels.length)}
          data={getGraphData(labels, planningPoints, factPoints)}
        />
      </div>
    </div>
  );
};

export default Graphic;
