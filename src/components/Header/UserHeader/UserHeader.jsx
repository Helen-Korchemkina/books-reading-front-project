import s from './UserHeader.module.scss';
import Media from 'react-media';
import { useSelector } from 'react-redux';
import { getName } from 'redux/auth/authSelectors';
const UserHeader = () => {
  const user = useSelector(getName);
  return (
    <div className={s.nameWraper}>
      <div className={s.circleUnderLater}>
        <span className={s.nameFirstLater}>
          {user.slice(0, 1).toUpperCase()}
        </span>
      </div>

      <Media queries={{ small: { minWidth: 768 } }}>
        {matches => matches.small && <p className={s.user}> {user}</p>}
      </Media>
    </div>
  );
};

export default UserHeader;
