import LoginPage from 'pages/LoginPage/LoginPage';
import RegistrationPage from 'pages/RegistrationPage/RegistrationPage';
import { Routes, Route } from 'react-router-dom';
import NotFound from 'pages/NotFound';
import AppBar from 'components/Header/AppBar';
import Library from 'pages/Library';
import TrainingPage from 'pages/TrainingPage';
import GoogleAnswerPage from 'pages/GoogleAnswerPage';
import InfoPage from 'pages/InfoPageMobile/InfoPageMobile';
import Media from 'react-media';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/answer-google" element={<GoogleAnswerPage />} />
        <Route
          path="/"
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
        >
          <Route index element={<Library />} />
          <Route path="/training" element={<TrainingPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
