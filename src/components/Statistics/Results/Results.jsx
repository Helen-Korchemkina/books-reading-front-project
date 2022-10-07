import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FormInput from 'components/common/FormInput';
import 'react-datetime/css/react-datetime.css';
import Datetime from 'react-datetime';
import Button from 'components/common/Button';
import s from './Results.module.scss';
import { useUpdateStatisticsMutation } from 'redux/statistics/statistics-api';

import ResultsList from '../ResultsList';

const VALIDATION_SCHEMA = Yup.object().shape({
  countOfPages: Yup.number()
    .integer('Can`t containts "."')
    .min(1, 'Minimum pages is 1')
    .max(500, 'Maximum pages is 500')
    .required('Fill in the field'),
});

const inputDateProps = {
  id: 'date',
  placeholder: '',
  name: 'date',
  type: 'text',
  className: `${s.dataTimePicker}`,
};

const Results = () => {
  const [date, setDate] = useState('');
  console.log('date :>> ', date);

  const [updateStatistics] = useUpdateStatisticsMutation();

  const dateToMilliseconds = date => {
    const milliseconds = new Date(date);
    return milliseconds.getTime();
  };

  const formik = useFormik({
    initialValues: {
      countOfPages: '',
    },
    validationSchema: VALIDATION_SCHEMA,
    onSubmit: async (values, actions) => {
      try {
        const body = {
          readDate: dateToMilliseconds(date).toString(),
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
          <div>
            <p className={s.titleDateForm}>Date</p>
            <Datetime
              className={s.wrapDateForm}
              dateFormat="DD.MM.YYYY"
              timeFormat={false}
              inputProps={inputDateProps}
              onChange={setDate}
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
