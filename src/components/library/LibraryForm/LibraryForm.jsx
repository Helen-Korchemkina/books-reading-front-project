import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import { useAddBookMutation } from 'redux/books/books-api';
import FormInput from 'components/common/FormInput';
import Button from 'components/common/Button';
import s from './LibraryForm.module.scss';

const VALIDATION_SCHEMA = Yup.object().shape({
  title: Yup.string()
    .min(1, 'Fill in the field')
    .max(50, 'Maximum characters is 50')
    .required('Fill in the input field')
    .matches(/^[^- ]/, 'Can`t start with a space or hyphen'),
  author: Yup.string()
    .min(1, 'Fill in the field')
    .max(50, 'Maximum characters is 50')
    .required('Fill in the input field')
    .matches(/^[^- ]/, 'Can`t start with a space or hyphen')
    .matches(/^([^\d]*)$/, 'Can`t contains digits'),
  releaseDate: Yup.number()
    .integer('Can`t containts "."')
    .min(1000, 'Minimum year is 1000')
    .max(
      new Date().getFullYear(),
      `Maximum year is ${new Date().getFullYear()}`
    )
    .required('Fill in the field'),
  countOfPages: Yup.number()
    .integer('Can`t containts "."')
    .min(1, 'Minimum pages is 1')
    .max(9999, 'Maximum pages is 9999')
    .required('Fill in the field'),
});

const LibraryForm = ({ onFormSubmit }) => {
  const [addBook, { isLoading }] = useAddBookMutation();

  const formik = useFormik({
    initialValues: {
      title: '',
      author: '',
      releaseDate: '',
      countOfPages: '',
    },
    validationSchema: VALIDATION_SCHEMA,
    onSubmit: async (values, actions) => {
      try {
        await addBook({
          ...values,
        }).unwrap();

        toast.dismiss();
        actions.resetForm();
        onFormSubmit && onFormSubmit();
      } catch (error) {
        console.log(error);
      }
    },
  });

  const { errors, touched } = formik;

  return (
    <form
      className={s.form}
      onSubmit={formik.handleSubmit}
      noValidate
      autoComplete="off"
    >
      <FormInput
        label={{ id: 'title', text: 'Book title' }}
        input={{
          value: formik.values.title,
          onChange: formik.handleChange,
        }}
        modifClasses={{ wrapper: s.title }}
        errorMessage={errors.title && touched.title ? errors.title : ''}
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
          label={{ id: 'releaseDate', text: 'Publication date' }}
          input={{
            value: formik.values.releaseDate,
            type: 'number',
            onChange: formik.handleChange,
          }}
          modifClasses={{ wrapper: s.number }}
          errorMessage={
            errors.releaseDate && touched.releaseDate ? errors.releaseDate : ''
          }
          min={1000}
          max={new Date().getFullYear()}
        />

        <FormInput
          label={{ id: 'countOfPages', text: 'Amount of pages' }}
          input={{
            value: formik.values.countOfPages,
            type: 'number',
            onChange: formik.handleChange,
          }}
          modifClasses={{ wrapper: s.number }}
          errorMessage={
            errors.countOfPages && touched.countOfPages
              ? errors.countOfPages
              : ''
          }
          min={1}
          max={9999}
        />
      </div>

      <Button
        variant="outline"
        type="submit"
        modifClass={s.submit}
        isLoading={isLoading}
        disabled={isLoading}
      >
        Add
      </Button>
    </form>
  );
};

LibraryForm.propTypes = {
  onFormSubmit: PropTypes.func,
};

export default LibraryForm;
