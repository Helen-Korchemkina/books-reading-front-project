import { useEffect, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Media from 'react-media';

import { getToken } from 'redux/auth/authSelectors';
import { useAuth } from 'redux/auth/authSlice';
import { useCurrentUserQuery } from 'redux/auth/auth-api';
import AppBar from 'components/Header/AppBar';
import Container from 'components/common/Container';
import PrivateRoute from 'components/common/PrivateRoute';
import ProtectedRoute from 'components/common/ProtectedRoute';

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
const InfoPageMobile = lazy(() =>
  import('pages/InfoPageMobile' /* webpackChunkName: "TrainingPage" */)
);
const NotFoundPage = lazy(() =>
  import('pages/NotFoundPage' /* webpackChunkName: "NotFoundPage" */)
);

const App = () => {
  const token = useSelector(getToken);
  const { credentialsUpdate } = useAuth();
  const { data, isError, isSuccess, isLoading } = useCurrentUserQuery(null, {
    skip: !Boolean(token),
  });

  useEffect(
    () => {
      if (isSuccess) {
        credentialsUpdate({
          user: data.user,
          token,
        });
      }

      if (isError) {
        credentialsUpdate({
          user: null,
          token: null,
        });
      }
    },
    [credentialsUpdate, isSuccess, isError, token, data]
  );

  if (isLoading) {
    return <Container>Data synchronization....</Container>;
  }

  return (
    <Suspense fallback={<Container>Loading...</Container>}>
      <Routes>
        <Route path="/" element={<AppBar />}>
          <Route element={<ProtectedRoute redirectTo="/library" />}>
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              index
              element={
                <Media
                  queries={{
                    small: '(max-width: 767px)',
                    medium: '(min-width: 768px)',
                  }}
                >
                  {matches => (
                    <>
                      {matches.small && <InfoPageMobile />}
                      {matches.medium && <LoginPage />}
                    </>
                  )}
                </Media>
              }
            />
            <Route path="/answer-google" element={<GoogleAnswerPage />} />
          </Route>

          <Route element={<PrivateRoute redirectTo="/login" />}>
            <Route path="/library" element={<LibraryPage />} />
            <Route path="/training" element={<TrainingPage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
