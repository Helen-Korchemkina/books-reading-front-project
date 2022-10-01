import { Link } from 'react-router-dom';
import Container from 'components/common/Container';

import s from './NotFoundPage.module.scss';

const NotFoundPage = () => {
  return (
    <Container>
      <div className={s.container}>
        <Link to="/">Go home page</Link>
        <p>Sorry page not found</p>
      </div>
    </Container>
  );
};

export default NotFoundPage;
