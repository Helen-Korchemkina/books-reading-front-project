import s from './Container.module.scss';

function Container({ children }) {
  return <div className={s.container}>{children}</div>;
}

export default Container;
