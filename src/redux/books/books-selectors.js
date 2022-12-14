import { BOOKS_STATUS, booksApi } from './books-api';

const getBooks = state =>
  booksApi.endpoints.getBooks.select()(state).data ?? [];
const getPendingBooks = state =>
  getBooks(state)?.filter(book => book.status === BOOKS_STATUS.pending);
const getReadingBooks = state =>
  getBooks(state)?.filter(book => book.status === BOOKS_STATUS.reading);
const getFinishBooks = state =>
  getBooks(state)?.filter(book => book.status === BOOKS_STATUS.finish);
const getBooksOfTranning = state =>
  getBooks(state)?.filter(book => book.isReadBook);
const countPageReadingBooks = state =>
  getReadingBooks(state)?.reduce((acc, book) => (acc += book.countOfPages), 0);
export {
  getBooks,
  getPendingBooks,
  getReadingBooks,
  getFinishBooks,
  getBooksOfTranning,
  countPageReadingBooks,
};
