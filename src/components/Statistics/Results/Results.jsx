import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FormInput from 'components/common/FormInput';
import 'react-datetime/css/react-datetime.css';
import Button from 'components/common/Button';
import s from './Results.module.scss';
import { useUpdateStatisticsMutation } from 'redux/statistics/statistics-api';
import { millisecondsToDate } from 'helpers/date';

import ResultsList from '../ResultsList';

const VALIDATION_SCHEMA = Yup.object().shape({
  countOfPages: Yup.number()
    .integer('Can`t containts "."')
    .min(1, 'Minimum pages is 1')
    .max(9999, 'Maximum pages is 9999')
    .required('Fill in the field'),
});

const Results = () => {
  const [updateStatistics] = useUpdateStatisticsMutation();
  const [date, setDate] = useState('hhh');

  useEffect(() => {
    const dateToday = Date.now();
    setDate(millisecondsToDate(dateToday));
  }, []);

  const formik = useFormik({
    initialValues: {
      countOfPages: '',
    },
    validationSchema: VALIDATION_SCHEMA,
    onSubmit: async (values, actions) => {
      try {
        const body = {
          readDate: Date.now().toString(),
          numberOfPagesRead: values.countOfPages,
        };
        await updateStatistics(body);
        actions.resetForm();
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div className={s.containerResult}>
      <p className={s.resultTitle}>Result</p>
      <form className={s.form} onSubmit={formik.handleSubmit}>
        <div className={s.inputWrap}>
          <div className={s.formDateInput}>
            <FormInput
              label={{ id: 'readDate', text: 'Date' }}
              input={{
                type: 'text',
                value: date,
                onChange: formik.handleChange,
              }}
              disabled
              modifClasses={{ label: s.titleDateForm, wrapper: s.inputMargin }}
            />
          </div>
          <div className={s.formInput}>
            <FormInput
              label={{ id: 'countOfPages', text: 'Amount of pages' }}
              input={{
                type: 'number',
                value: formik.values.countOfPages,
                onChange: formik.handleChange,
              }}
              modifClasses={{ label: s.titleDateForm, wrapper: s.inputMargin }}
            />
          </div>
        </div>
        <div className={s.buttonWrap}>
          <Button variant="filled" modifClass={s.buttonRes} type="submit">
            Add result
          </Button>
        </div>
      </form>
      <ResultsList />
    </div>
  );
};

export default Results;
