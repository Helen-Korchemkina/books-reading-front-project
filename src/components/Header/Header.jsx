import ButtonLogout from './ButtonLogout';
import s from './Header.module.css';
import Navigation from './Navigation';
import UserHeader from './UserHeader';

import Media from 'react-media';
const Header = () => {
  const user = true;
  return (
    <div className={user ? s.header__section : s.header__section2}>
      <h1 className={s.header__logo}>BR</h1>
      <div className={s.wrapNav}>
        {user && (
          <Media queries={{ small: { minWidth: 767 } }}>
            {matches => matches.small && <UserHeader />}
          </Media>
        )}
        {user && <Navigation />}
        {user && (
          <Media queries={{ small: { maxWidth: 768 } }}>
            {matches => matches.small && <UserHeader />}
          </Media>
        )}
        {user && <ButtonLogout />}
      </div>
    </div>
  );
};

export default Header;
