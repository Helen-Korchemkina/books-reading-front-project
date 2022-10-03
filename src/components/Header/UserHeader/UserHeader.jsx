import s from './UserHeader.module.css';
import Media from 'react-media';
import { useSelector } from 'react-redux';
import { getName } from 'redux/auth/authSelectors';
const UserHeader = () => {
  const user = useSelector(getName);
  return (
    <div className={s.nameWraper}>
      <div className={s.circleUnderLater}>
        <h2 className={s.nameFirstLater}>{user.slice(0, 1).toUpperCase()}</h2>
      </div>

      <Media queries={{ small: { minWidth: 768 } }}>
        {matches => matches.small && <p> {user}</p>}
      </Media>
    </div>
  );
};

export default UserHeader;
