import { useState } from 'react';
import Container from 'components/Container';
import FormInput from 'components/FormInput';
import Button from 'components/Button';
import InfoPage from 'pages/InfoPageMobile/InfoPageMobile';

const App = () => {
  const [value, setValue] = useState('');

  return <InfoPage />;
};

export default App;
