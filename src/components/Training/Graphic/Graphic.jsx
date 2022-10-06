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
  getFactGraphData,
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

const mockStatistics = {
  _id: '633e7200d32d2c2b6c188dd3',
  readDate: [
    '2022-10-8',
    '2022-10-8',
    '2022-10-9',
    '2022-10-10',
    '2022-10-12',
    '2022-10-13',
    '2022-10-15',
    '2022-10-18',
    '2022-10-18',
    '2022-10-18',
    '2022-10-20',
  ],
  readTime: [],
  numberOfPagesRead: [
    '5',
    '20',
    '30',
    '33',
    '50',
    '21',
    '44',
    '30',
    '35',
    '18',
    '37',
  ],
};

const Graphic = () => {
  useGetBooksQuery();
  useGetUserTrainingQuery();
  const { data: statistics = [], isSuccess } = useGetStatisticsQuery();

  const readingBooks = useSelector(getReadingBooks);
  const currentTraining = useSelector(getTraining);
  console.log('currentTraining', currentTraining);

  const { labels, pagesData: planningData = [] } = useMemo(() => {
    if (isSuccess && mockStatistics && currentTraining?.finishMillisecond) {
      return getPlanningGraphData(
        currentTraining.startMillisecond,
        currentTraining.finishMillisecond,
        readingBooks
      );
    }
    return { labels: [], pagesData: [] };
  }, [
    currentTraining.finishMillisecond,
    currentTraining.startMillisecond,
    isSuccess,
    readingBooks,
  ]);

  const factData = useMemo(() => {
    if (isSuccess && mockStatistics && currentTraining?.finishMillisecond) {
      return getFactGraphData(mockStatistics);
    }
    return [];
  }, [statistics]);

  return (
    <>
      {isSuccess && currentTraining?.finishMillisecond && (
        <div className={s.container}>
          <div className={s.graphic}>
            <Line
              options={getGraphOptions(labels.length)}
              data={getGraphData(labels, planningData, factData)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Graphic;
