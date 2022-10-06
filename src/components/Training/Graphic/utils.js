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
      borderColor: 'rgb(9,30,63)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
      tension: 0.8,
    },
    {
      label: 'ACT',
      data: factData,
      borderColor: 'rgb(255,107,8)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      tension: 0.8,
    },
  ],
});

export const getPlanningGraphData = (start, finish, books) => {
  const countDays = (new Date(+finish) - new Date(+start)) / (1000 * 3600 * 24);
  const pages = books.reduce((summ, book) => (summ += book.countOfPages), 0);
  const pagePerDay = Math.ceil(pages / countDays);
  const lastDayPages = pages % pagePerDay;

  const labels = Array(countDays)
    .fill()
    .map((_, i) => i + 1);
  const pagesData = Array(countDays).fill(pagePerDay);
  pagesData[pagesData.length - 1] = lastDayPages;

  return { labels, pagesData };
};

export const getFactGraphData = statistics => {
  const dayToPage = statistics.readDate.reduce((acc, date, index) => {
    if (acc[date]) {
      acc[date] += Number(statistics.numberOfPagesRead[index]);
    } else {
      acc[date] = Number(statistics.numberOfPagesRead[index]);
    }
    return acc;
  }, {});

  return Object.values(dayToPage);
};
