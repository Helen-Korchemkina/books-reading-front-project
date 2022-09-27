import { NavLink } from 'react-router-dom';
import { BsHouseDoor } from 'react-icons/bs';
import { MdOutlineMenuBook } from 'react-icons/md';
import s from './Navigation.module.css';

const Navigation = () => {
  return (
    <div className={s.navWraper}>
      <NavLink
        to="/home"
        style={({ isActive }) => ({
          background: isActive && 'var(--color-super-light-grey)',
        })}
        className={s.link}
      >
        <BsHouseDoor className={s.icons} />
      </NavLink>
      <NavLink
        to="/library"
        style={({ isActive }) => ({
          background: isActive && 'var(--color-super-light-grey)',
        })}
        className={s.link}
      >
        <MdOutlineMenuBook className={s.icons} />
      </NavLink>

      <div className={s.vertical}></div>
    </div>
  );
};

export default Navigation;
