import { NavLink } from 'react-router-dom';
import { BsHouseDoor } from 'react-icons/bs';
import { MdOutlineMenuBook } from 'react-icons/md';
import s from './Navigation.module.css';

const Navigation = () => {
  return (
    <div className={s.navWraper}>
      <NavLink
        to="library"
        end
        className={({ isActive }) =>
          isActive ? `${s.active} ${s.link}` : s.link
        }
      >
        <BsHouseDoor className={s.icons} />
      </NavLink>
      <NavLink
        to="training"
        className={({ isActive }) =>
          isActive ? `${s.active} ${s.link}` : s.link
        }
      >
        <MdOutlineMenuBook className={s.icons} />
      </NavLink>
        {/* <NavLink
        to="statistics"
        className={({ isActive }) =>
          isActive ? `${s.active} ${s.link}` : s.link
        }
      >
        <MdOutlineMenuBook className={s.icons} />
      </NavLink> */}

      <div className={s.vertical}></div>
    </div>
  );
};

export default Navigation;
