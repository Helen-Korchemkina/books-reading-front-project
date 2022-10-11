export const getGraphOptions = days => ({
  responsive: true,
  plugins: {
    legend: {
      display: false,
      title: 'Action',
    },
    title: {
      display: true,
      text: `Amont of pages / DA ${days}`,
      align: 'start',
      font: {
        size: 14,
        weight: 500,
      },
    },
  },
  scales: {
    x: {
      stacked: true,
      title: {
        display: true,
        text: 'DAY',
        align: 'end',
        font: {
          size: 14,
          weight: 500,
        },
      },
    },
    y: {
      min: 0,
    },
  },
});

export const getGraphData = (labels, planningData, factData) => ({
  labels,
  datasets: [
    {
      label: 'PLAN',
      data: planningData,
      borderColor: '#091E3F',
      backgroundColor: '#091E3F',
      tension: 0.3,
    },
    {
      label: 'ACT',
      data: factData,
      borderColor: '#FF6B08',
      backgroundColor: '#FF6B08',
      tension: 0.4,
    },
  ],
});

export const getPlanningGraphData = (start, finish, books) => {
  if (!start || !finish || finish < start || books.length === 0) {
    return { labels: [], planningPoints: [] };
  }

  const countDays = Math.ceil(
    (new Date(+finish) - new Date(+start)) / (1000 * 3600 * 24)
  );
  const pages = books.reduce((summ, book) => (summ += book.countOfPages), 0);
  const pagePerDay = Math.round((pages / countDays) * 100) / 100;

  const labels = Array(countDays)
    .fill()
    .map((_, i) => i + 1);
  const planningPoints = Array(countDays).fill(pagePerDay);

  return { labels, planningPoints };
};

export const getFactPoints = (start, labels, statistics) => {
  const startDate = new Date(+start);

  const daysToStatistics = labels.reduce((acc, _, index) => {
    const hash = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate() + index
    ).toLocaleDateString();
    acc[hash] = 0;
    return acc;
  }, {});

  statistics.readDate.forEach((date, index) => {
    const factDate = new Date(+date).toLocaleDateString();
    daysToStatistics[factDate] += Number(statistics.numberOfPagesRead[index]);
  });

  const lastDate = new Date(
    +[...statistics.readDate].sort()[statistics.readDate.length - 1]
  ).toLocaleDateString();
  const lastDayIndex = Object.keys(daysToStatistics).findIndex(
    day => day === lastDate
  );

  if (lastDayIndex === -1) {
    return [];
  }

  const points = Object.values(daysToStatistics).slice(0, lastDayIndex + 1);

  return points;
};
