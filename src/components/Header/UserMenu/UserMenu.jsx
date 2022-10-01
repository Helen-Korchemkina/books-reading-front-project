import ButtonLogout from '../ButtonLogout';
import s from './UserMenu.module.css';
import Navigation from '../Navigation';
import UserHeader from '../UserHeader';
import Media from 'react-media';
import Container from 'components/Container';
import { Outlet } from 'react-router-dom';

const UserMenu = () => {
  const user = true;
  return (
    <div className={s.wrapper}>
      <header className={s.header}>
        <Container>
          <div className={user ? s.header__section : s.header__section2}>
            <h1 className={s.header__logo}>BR</h1>

            {user && (
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
