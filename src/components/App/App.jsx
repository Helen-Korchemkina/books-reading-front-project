import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Container from 'components/common/Container';
import AppBar from 'components/Header/AppBar';

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
  return (
    <Suspense fallback={<Container>Loading...</Container>}>
      <Routes>
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/answer-google" element={<GoogleAnswerPage />} />
        <Route path="/" element={<AppBar />}>
          <Route index element={<LibraryPage />} />
          <Route path="training" element={<TrainingPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
