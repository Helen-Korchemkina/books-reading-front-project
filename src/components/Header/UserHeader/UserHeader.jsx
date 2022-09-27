import s from './UserHeader.module.css';
import Media from 'react-media';
const UserHeader = () => {
  return (
    <div className={s.nameWraper}>
      <div className={s.circleUnderLater}>
        <h2 className={s.nameFirstLater}>M</h2>
      </div>

      <Media queries={{ small: { minWidth: 768 } }}>
        {matches => matches.small && <p> Maria Sef</p>}
      </Media>
    </div>
  );
};

export default UserHeader;
