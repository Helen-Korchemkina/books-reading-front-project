import { BOOKS_STATUS, booksApi } from './books-api';

const getBooks = state => booksApi.endpoints.getBooks.select()(state).data;
const getPendingBooks = state =>
  booksApi.endpoints.getBooks
    .select()(state)
    .data?.filter(book => book.status === BOOKS_STATUS.pending);

export { getBooks, getPendingBooks };
