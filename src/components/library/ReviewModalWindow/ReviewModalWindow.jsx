import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import classNames from 'classnames';
import Rating from '@mui/material/Rating';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import { useUpdateReviewBookMutation } from 'redux/books/books-api';
import Button from 'components/common/Button';
import ModalWindow from 'components/common/ModalWindow';
import s from './ReviewModalWindow.module.scss';

const VALIDATION_SCHEMA = Yup.object().shape({
  resume: Yup.string()
    .min(1, 'Fill in the field')
    .max(1000, 'Maximum characters is 1000')
    .required('Fill in the input field')
    .matches(/^[^- ]/, 'Field can`t start with a space or hyphen'),
});

const ReviewModalWindow = ({
  startBookValues = { rating: 0, resume: '' },
  onModalClose,
}) => {
  const [rating, setRating] = useState(startBookValues.rating);
  const [updateReviewBook, { isLoading }] = useUpdateReviewBookMutation();

  const formik = useFormik({
    initialValues: {
      resume: startBookValues.resume,
    },
    validationSchema: VALIDATION_SCHEMA,
    onSubmit: async ({ resume }) => {
      try {
        await updateReviewBook({
          id: startBookValues._id,
          rating,
          resume,
        }).unwrap();

        toast.dismiss();
        onModalClose();
      } catch (error) {
        console.log(error);
      }
    },
  });

  const { errors, touched } = formik;

  const handleCloseModal = () => {
    toast.dismiss();
    onModalClose();
  };

  return (
    <ModalWindow onClose={handleCloseModal} modifClass={s.modal}>
      <form onSubmit={formik.handleSubmit} noValidate autoComplete="off">
        <div className={s.inputWrapper}>
          <p className={s.label}>Choose rating of the book</p>
          <Rating
            className={s.rating}
            name="rating"
            size="large"
            value={rating}
            onChange={(_, newValue) => {
              setRating(newValue);
            }}
          />
        </div>

        <div className={s.inputWrapper}>
          <label htmlFor="resume" className={s.label}>
            Resume
          </label>
          <textarea
            id="resume"
            name="resume"
            placeholder="..."
            className={classNames({
              [s.resume]: true,
              [s.invalid]: touched.resume && errors.resume,
              [s.filled]: formik.values.resume.length > 0,
            })}
            onChange={formik.handleChange}
            value={formik.values.resume}
          ></textarea>
          <span className={s.error}>{touched.resume && errors.resume}</span>
        </div>

        <div className={s.buttonWrapper}>
          <Button
            variant="outline"
            modifClass={classNames(s.button, s.buttonBack)}
            onClick={handleCloseModal}
          >
            Back
          </Button>
          <Button
            variant="filled"
            type="submit"
            modifClass={s.button}
            isLoading={isLoading}
          >
            Save
          </Button>
        </div>
      </form>
    </ModalWindow>
  );
};

ReviewModalWindow.propTypes = {
  startBookValues: PropTypes.exact({
    _id: PropTypes.string.isRequired,
    rating: PropTypes.number,
    resume: PropTypes.string,
  }).isRequired,
  onModalClose: PropTypes.func.isRequired,
};

export default ReviewModalWindow;
