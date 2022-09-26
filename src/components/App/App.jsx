import { Routes, Route, Outlet } from 'react-router-dom';

import Container from 'components/Container';
import Library from 'pages/Library';
import NotFound from 'pages/NotFound';

const SharedLayout = () => (
  <div
    style={{
      minHeight: '100vh',
      backgroundColor: 'var(--color-inner-bgn)',
    }}
  >
    {/* Fake navigate menu */}
    <div style={{ backgroundColor: 'var(--color-white)' }}>
      <Container style={{ minHeight: '60px' }}>Fake navigate menu</Container>
    </div>

    <Outlet />
  </div>
);

const App = () => {
  return (
    <Routes>
      <Route path="/register" element={<div>Register page dummy</div>} />
      <Route path="/login" element={<div>Login page dummy</div>} />
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Library />} />
        <Route path="training" element={<div>Traning page dummy</div>} />
        <Route path="statistic" element={<div>Statistic page dummy</div>} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
