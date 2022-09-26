import { useFormik } from 'formik';
import * as Yup from 'yup';

import Container from 'components/Container';
import FormInput from 'components/FormInput';
import Button from 'components/Button';
import s from './LibraryForm.module.scss';

const addBookSchema = Yup.object().shape({
  bookTitle: Yup.string()
    .min(1, 'Fill in the field')
    .max(50, 'Maximum characters is 50')
    .required('Fill in the input field')
    .matches(/^[^- ]/, 'Field can`t start with a space or hyphen'),
  author: Yup.string()
    .min(1, 'Fill in the field')
    .max(50, 'Maximum characters is 50')
    .required('Fill in the input field')
    .matches(/^[^- ]/, 'The field can`t start with a space or hyphen')
    .matches(/^([^\d]*)$/, 'The field can`t contains digits'),
  publicationDate: Yup.number()
    .min(1900, 'Minimum year is 1900')
    .max(
      new Date().getFullYear(),
      `Maximum year is ${new Date().getFullYear()}`
    )
    .required('Fill in the field'),
  amountPages: Yup.number()
    .min(1, 'Minimum pages is 1')
    .max(9999, 'Maximum pages is 9999')
    .required('Fill in the field'),
});

const LibraryForm = () => {
  const formik = useFormik({
    initialValues: {
      bookTitle: '',
      author: '',
      publicationDate: '',
      amountPages: '',
    },
    validationSchema: addBookSchema,
    onSubmit: (values, actions) => {
      console.log(JSON.stringify(values, null, 2));
      actions.resetForm();
    },
  });

  const { errors, touched } = formik;

  return (
    <Container>
      <form
        className={s.form}
        onSubmit={formik.handleSubmit}
        noValidate
        autoComplete="off"
      >
        <FormInput
          label={{ id: 'bookTitle', text: 'Book title' }}
          input={{
            value: formik.values.bookTitle,
            onChange: formik.handleChange,
          }}
          modifClasses={{ wrapper: s.title }}
          errorMessage={
            errors.bookTitle && touched.bookTitle ? errors.bookTitle : ''
          }
        />

        <div className={s.details}>
          <FormInput
            label={{ id: 'author', text: 'Author' }}
            input={{
              value: formik.values.author,
              onChange: formik.handleChange,
            }}
            modifClasses={{ wrapper: s.author }}
            errorMessage={errors.author && touched.author ? errors.author : ''}
          />

          <FormInput
            label={{ id: 'publicationDate', text: 'Publication date' }}
            input={{
              value: formik.values.publicationDate,
              type: 'number',
              onChange: formik.handleChange,
            }}
            modifClasses={{ wrapper: s.number }}
            errorMessage={
              errors.publicationDate && touched.publicationDate
                ? errors.publicationDate
                : ''
            }
          />

          <FormInput
            label={{ id: 'amountPages', text: 'Amount of pages' }}
            input={{
              value: formik.values.amountPages,
              type: 'number',
              onChange: formik.handleChange,
            }}
            modifClasses={{ wrapper: s.number }}
            errorMessage={
              errors.amountPages && touched.amountPages
                ? errors.amountPages
                : ''
            }
          />
        </div>

        <Button variant="outline" type="submit" modifClass={s.submit}>
          Add
        </Button>
      </form>
    </Container>
  );
};

export default LibraryForm;
