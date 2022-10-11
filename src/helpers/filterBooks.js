export const filterBooksIsRead = (array, isRead) => {
  return [...array].filter(book => book.isReadBook === isRead);
};

export const countPageStatistics = statistics => {
  return statistics.numberOfPagesRead?.reduce((acc, item) => (acc += item), 0);
};

export const countPageIsRead = books => {
  return books.reduce((acc, book) => (acc += book.countOfPages), 0);
};
