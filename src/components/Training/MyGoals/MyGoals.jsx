import Results from 'components/Training/Results';
import s from './MyGoals.module.scss';

const MyGoals = ({ isShow }) => {
  const showBlockContainer = isShow ? 'isShowBlockContainer' : 'blockContainer';
  const showBlock = isShow ? 'isShowBlock' : 'block';
  const showNumber = isShow ? 'isShowNumber' : 'number';

  return (
    <>
      <div className={s.container}>
        <h1 className={s.title}>My Goals</h1>
        <div className={s[showBlockContainer]}>
          <div className={s[showBlock]}>
            <p className={s[showNumber]}>0</p>
            <p className={s.desc}>Amount of books</p>
          </div>
          <div className={s[showBlock]}>
            <p className={s[showNumber]}>0</p>
            <p className={s.desc}>Amount of days</p>
          </div>
          {isShow && (
            <div className={s[showBlock]}>
              <p className={s.numberShow}>0</p>
              <p className={s.desc}>Books left</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyGoals;
