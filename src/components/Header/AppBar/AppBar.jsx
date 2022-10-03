import LibraryPage from 'pages/LibraryPage';
import LoginPage from 'pages/LoginPage';
import { useSelector } from 'react-redux';
import { getIsLogin } from 'redux/auth/authSelectors';
import UserMenu from '../UserMenu';

const AppBar = () => {
  const islogin = useSelector(getIsLogin);
  return <UserMenu>{islogin ? <LibraryPage /> : <LoginPage />}</UserMenu>;
};
export default AppBar;
