import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Container from 'components/common/Container';
import AppBar from 'components/Header/AppBar';
import InfoPage from 'pages/InfoPageMobile/InfoPageMobile';
import { useSelector } from 'react-redux';
import { getToken } from 'redux/auth/authSelectors';
import { useAuth } from 'redux/auth/authSlice';
import { useCurrentUserMutation } from 'redux/auth/auth-api';
import { useEffect } from 'react';
import { getIsLogin } from 'redux/auth/authSelectors';
import Media from 'react-media';

const LoginPage = lazy(() =>
  import('pages/LoginPage' /* webpackChunkName: "LoginPage" */)
);
const RegistrationPage = lazy(() =>
  import('pages/RegistrationPage' /* webpackChunkName: "RegistrationPage" */)
);
const GoogleAnswerPage = lazy(() =>
  import('pages/GoogleAnswerPage' /* webpackChunkName: "GoogleAnswerPage" */)
);
const LibraryPage = lazy(() =>
  import('pages/LibraryPage' /* webpackChunkName: "LibraryPage" */)
);
const TrainingPage = lazy(() =>
  import('pages/TrainingPage' /* webpackChunkName: "TrainingPage" */)
);
const NotFoundPage = lazy(() =>
  import('pages/NotFoundPage' /* webpackChunkName: "NotFoundPage" */)
);

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
          console.log(response.data);
          if (response.data) {
            credentialsUpdate({
              user: response.data.user,
              token,
              isLogin,
            });
          }
        };
        checkCurrentUser();
      }
    },
    [credentialsUpdate, currentUser, isLogin, isUninitialized, token]
  );


  return (
    <Suspense fallback={<Container>Loading...</Container>}>
      <Routes>
        <Route path="/" element={<AppBar />}>
          <Route path="register" element={<RegistrationPage />} />
          <Route index element={<LoginPage />} />
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
    </Suspense>
  );
};

export default App;
