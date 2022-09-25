import { useState } from 'react';
import Container from 'components/Container';
import FormInput from 'components/FormInput';
import Button from 'components/Button';

const App = () => {
  const [value, setValue] = useState('');

  return (
    <Container>
      <FormInput
        label={{ id: 'bookTitle', text: 'Book title' }}
        input={{
          value,
          type: 'text',
          onChange: ({ target }) => setValue(target.value),
        }}
        errorMessage=""
      />

      <Button variant="outline" type="submit">
        Add
      </Button>
    </Container>
  );
};

export default App;
