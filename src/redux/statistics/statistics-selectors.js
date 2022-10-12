import { statisticsApi } from './statistics-api';

const getStatistics = state =>
  statisticsApi.endpoints.getStatistics.select()(state).data ?? [];

const countStatisticsPage = state =>
  getStatistics(state)?.numberOfPagesRead?.reduce((acc, el) => (acc += el), 0);

export { getStatistics, countStatisticsPage };
