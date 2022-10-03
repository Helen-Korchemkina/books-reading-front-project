import ButtonLogout from '../ButtonLogout';
import s from './UserMenu.module.css';
import Navigation from '../Navigation';
import UserHeader from '../UserHeader';
import Media from 'react-media';
import Container from 'components/common/Container';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getIsLogin } from 'redux/auth/authSelectors';

const UserMenu = () => {
  const islogin = useSelector(getIsLogin);
  return (
    <div className={s.wrapper}>
      <header className={s.header}>
        <Container>
          <div className={islogin ? s.header__section : s.header__section2}>
            <h1 className={s.header__logo}>BR</h1>

            {islogin && (
              <div className={s.wrapNav}>
                <Media queries={{ small: { minWidth: 767 } }}>
                  {matches => matches.small && <UserHeader />}
                </Media>
                <Navigation />
                <Media queries={{ small: { maxWidth: 768 } }}>
                  {matches => matches.small && <UserHeader />}
                </Media>
                <ButtonLogout />
              </div>
            )}
          </div>
        </Container>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default UserMenu;
