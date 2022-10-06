import { statisticsApi } from './statistics-api';

const getStatistics = state =>
  statisticsApi.endpoints.getStatistics.select()(state).data ?? [];

export { getStatistics };
