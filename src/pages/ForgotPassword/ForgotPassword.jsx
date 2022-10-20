import Container from 'components/common/Container';
import { Link } from 'react-router-dom';
import Button from 'components/common/Button';
import FormInput from 'components/common/FormInput';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import s from '../LoginPage/LoginPage.module.scss';
import { useEffect, useState } from 'react';
import ModalWindow from 'components/common/ModalWindow';
import axios from 'axios';

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Please enter your email')
    .min(10, 'Must be 10 characters or more')
    .max(63, 'Must be no more than 63 characters ')
    .matches(
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]{2,}(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
      'Invalid email'
    ),
});

export default function ForgotPassword() {
  const [togle, setTogle] = useState(false);
  const defaultQuote = `Books are the ships of thoughts, wandering through the waves of
            time.`;
  const defaultAuthor = `Francis Bacon`;
  const [quote, setQuote] = useState(null);
  const [author, setAuthor] = useState(null);
  const [modalMessage, setModalMessage] = useState(
    'We have sent you a link to your email to reset your password.'
  );
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: SignupSchema,
    onSubmit: (values, actions) => {
      async function forgotPasswordPost() {
        try {
          const response = await axios.post(
            `https://books-reading-project.herokuapp.com/api/auth/forgot`,

            {
              email: values.email,
            }
          );
          setTogle(true);
          console.log(response.data);
        } catch (error) {
          setModalMessage(`${values.email} is not registered`);
          setTogle(true);
          console.error(error);
        }
      }
      forgotPasswordPost();
      actions.resetForm();
    },
  });

  const { errors, touched } = formik;

  useEffect(
    () => {
      async function getRandomQuote() {
        try {
          const response = await axios.get(
            'https://books-reading-project.herokuapp.com/api/quote/random'
          );

          setQuote(response.data.random.quote);
          setAuthor(response.data.random.author);
        } catch (error) {
          setQuote(defaultQuote);
          setAuthor(defaultAuthor);
          console.error(error);
        }
      }

      getRandomQuote();
    },
    [defaultAuthor, defaultQuote]
  );

  return (
    <div className={s.wrapper}>
      <div className={s.pictureWrapper}>
        <Container>
          <div className={s.forgotPasswordWrapper}>
            <div className={s.formWrapper}>
              <form
                onSubmit={formik.handleSubmit}
                noValidate
                autoComplete="off"
              >
                <FormInput
                  label={{
                    id: 'email',
                    text: (
                      <>
                        <span className={s.formText}>Email</span>
                        <span className={s.isRequiredField}> *</span>
                      </>
                    ),
                  }}
                  input={{
                    value: formik.values.email,
                    onChange: formik.handleChange,
                    placeholder: 'your@email.com',
                  }}
                  modifClasses={s.inputform}
                  errorMessage={
                    errors.email && touched.email ? errors.email : ''
                  }
                />
                <Button variant="filled" modifClass={s.loginBtn} type="submit">
                  OK
                </Button>
              </form>
            </div>

            <Link className={s.regLink} to="/login">
              Login
            </Link>
          </div>
          {togle ? (
            <ModalWindow
              onClose={() => {
                setTogle(false);
              }}
              modifClass={s.ForgotPasswordModal}
            >
              <p>{modalMessage}</p>
              <Button
                variant="filled"
                modifClass={s.loginBtn}
                onClick={() => {
                  setTogle(false);
                }}
              >
                OK
              </Button>
            </ModalWindow>
          ) : null}
        </Container>
      </div>

      <div className={s.positionWrapper}>
        <div className={s.textWrapper}>
          <span className={s.decorationItem}>“</span>
          <p className={s.textQuote}>{quote}</p>
          <p className={s.textAuthor}>{author}</p>
        </div>
      </div>
    </div>
  );
}
