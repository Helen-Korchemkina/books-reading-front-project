import { Link } from 'react-router-dom';
import Container from 'components/Container';

import s from './NotFound.module.scss';

const NotFound = () => {
  return (
    <Container>
      <div className={s.container}>
        <Link to="/">Go home page</Link>
        <p>Sorry page not found</p>
      </div>
    </Container>
  );
};

export default NotFound;
