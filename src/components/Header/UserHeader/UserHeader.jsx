import s from './UserHeader.module.css';
import Media from 'react-media';
const UserHeader = () => {
  return (
    <div className={s.nameWraper}>
      <h2>M</h2>
      <Media queries={{ small: { minWidth: 768 } }}>
        {matches => matches.small && <p> Maria Sef</p>}
      </Media>
    </div>
  );
};

export default UserHeader;
