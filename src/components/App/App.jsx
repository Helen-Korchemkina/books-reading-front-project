import LoginPage from 'pages/LoginPage/LoginPage';
import RegistrationPage from 'pages/RegistrationPage/RegistrationPage';
import { Routes, Route } from 'react-router-dom';
import NotFound from 'pages/NotFound';
import AppBar from 'components/Header/AppBar';
import Library from 'pages/Library';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/register" element={<div>Register page dummy</div>} />
        <Route path="/login" element={<div>Login page dummy</div>} />
        <Route path="/" element={<AppBar />}>
          <Route index element={<Library />} />
          <Route path="/training" element={<div>Traning page dummy</div>} />
          <Route path="statistic" element={<div>Statistic page dummy</div>} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
