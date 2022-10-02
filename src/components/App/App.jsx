import LoginPage from 'pages/LoginPage/LoginPage';
import RegistrationPage from 'pages/RegistrationPage/RegistrationPage';
import { Routes, Route } from 'react-router-dom';
import NotFoundPage from 'pages/NotFoundPage';
import AppBar from 'components/Header/AppBar';
import LibraryPage from 'pages/LibraryPage';
import TrainingPage from 'pages/TrainingPage';
import GoogleAnswerPage from 'pages/GoogleAnswerPage';
import InfoPage from 'pages/InfoPageMobile/InfoPageMobile';
import { useSelector } from 'react-redux';
import { getToken } from 'redux/auth/authSelectors';
import { useAuth } from 'redux/auth/authSlice';
import { useCurrentUserMutation } from 'redux/auth/auth-api';
import { useEffect } from 'react';
import { getIsLogin } from 'redux/auth/authSelectors';
import Media from 'react-media';

const App = () => {
  const token = useSelector(getToken);
  const { credentialsUpdate } = useAuth();
  const [currentUser, { isUninitialized }] = useCurrentUserMutation();
  const isLogin = useSelector(getIsLogin);

  useEffect(
    () => {
      if (token && isUninitialized) {
        const checkCurrentUser = async () => {
          const response = await currentUser();
          if (response.data) {
            credentialsUpdate({ user: response.data, token, isLogin });
          }
        };
        checkCurrentUser();
      }
    },
    [credentialsUpdate, currentUser, isLogin, isUninitialized, token]
  );

  return (
    <Routes>
      <Route path="/" element={<AppBar />}>
        <Route path="register" element={<RegistrationPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="answer-google" element={<GoogleAnswerPage />} />
        <Route
          index
          element={
            <Media
              queries={{
                small: '(max-width: 480px)',
                medium: '(min-width: 481px)',
              }}
            >
              {matches => (
                <>
                  {matches.small && <InfoPage />}
                  {matches.medium && <LoginPage />}
                </>
              )}
            </Media>
          }
        />
        <Route path="library" element={<LibraryPage />} />
        <Route path="training" element={<TrainingPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default App;
