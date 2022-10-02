import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import classNames from 'classnames';
import Rating from '@mui/material/Rating';
import PropTypes from 'prop-types';

import Button from 'components/common/Button';
import ModalWindow from 'components/common/ModalWindow';
import s from './ReviewModalWindow.module.scss';

const VALIDATION_SCHEMA = Yup.object().shape({
  resume: Yup.string()
    .max(1000, 'Maximum characters is 1000')
    .matches(/^[^- ]/, 'Field can`t start with a space or hyphen'),
});

const ReviewModalWindow = ({
  initialRating = 0,
  initialResume = '',
  onModalClose,
}) => {
  const [rating, setRating] = useState(initialRating);

  const formik = useFormik({
    initialValues: {
      resume: initialResume,
    },
    validationSchema: VALIDATION_SCHEMA,
    onSubmit: async values => {
      console.log('rating ', rating);
      console.log(JSON.stringify(values));
    },
  });

  const { errors, touched } = formik;

  return (
    <ModalWindow onClose={onModalClose} modifClass={s.modal}>
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
            onClick={onModalClose}
          >
            Back
          </Button>
          <Button variant="filled" type="submit" modifClass={s.button}>
            Save
          </Button>
        </div>
      </form>
    </ModalWindow>
  );
};

ReviewModalWindow.propTypes = {
  rating: PropTypes.number,
  resume: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

export default ReviewModalWindow;
