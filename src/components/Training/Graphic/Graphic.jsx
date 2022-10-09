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
import { getBooksOfTranning } from 'redux/books/books-selectors';
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
  const { data: trainingData = {} } = useGetUserTrainingQuery();
  const { data: statistics = [], isSuccess } = useGetStatisticsQuery();
  const booksOfTranning = useSelector(getBooksOfTranning);

  const { labels, planningPoints = [] } = useMemo(
    () =>
      getPlanningGraphData(
        trainingData?.training?.startMillisecond,
        trainingData?.training?.finishMillisecond,
        booksOfTranning
      ),
    [
      trainingData?.training?.finishMillisecond,
      trainingData?.training?.startMillisecond,
      booksOfTranning,
    ]
  );

  const factPoints = useMemo(() => {
    if (
      isSuccess &&
      trainingData?.training?.startMillisecond &&
      labels.length > 0
    ) {
      return getFactPoints(
        trainingData?.training?.startMillisecond,
        labels,
        statistics
      );
    }
    return [];
  }, [isSuccess, statistics, trainingData?.training?.startMillisecond, labels]);

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
