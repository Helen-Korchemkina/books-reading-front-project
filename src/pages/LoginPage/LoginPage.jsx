import Container from 'components/common/Container';
import { Link } from 'react-router-dom';
import Button from 'components/common/Button';
import FormInput from 'components/common/FormInput';
import GoogleBtn from 'components/GoogleBtn/GoogleBtn';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import s from './LoginPage.module.scss';
import { useLoginMutation } from 'redux/auth/auth-api';
import { useAuth } from 'redux/auth/authSlice';
import { useEffect, useState } from 'react';
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
  password: Yup.string()
    .required('Please Enter your password')
    .min(5, 'Must be 8 characters or more')
    .max(30, 'Must be no more than 30 characters ')
    .matches(/[a-z]+/, 'Must contain one lowercase character')
    .matches(/[A-Z]+/, 'Must contain one uppercase character')
    .matches(/\d+/, 'Must contain one number')
    .matches(
      /^(?![.-]+)(?!.* )(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,30}/,
      'Must not contain spaces, and starts with - or .'
    ),
});

export default function LoginPage() {
  const [login] = useLoginMutation();
  const { credentialsUpdate } = useAuth();
  const defaultQuote = `Books are the ships of thoughts, wandering through the waves of
            time.`;
  const defaultAuthor = `Francis Bacon`;
  const [quote, setQuote] = useState(null);
  const [author, setAuthor] = useState(null);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: SignupSchema,
    onSubmit: (values, actions) => {
      const loginCheckFetch = async loginData => {
        const response = await login(loginData);
        if (response?.error?.status === 400) {
          return;
        } else {
          credentialsUpdate({
            user: {
              name: response.data?.data?.name,
              email: response.data?.data?.email,
            },
            token: response.data?.token,
          });
        }
      };
      loginCheckFetch({
        email: values.email,
        password: values.password,
      });
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
          <div className={s.loginWrapper}>
            <GoogleBtn />
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
                <FormInput
                  label={{
                    id: 'password',
                    text: (
                      <>
                        <span className={s.formText}>Password</span>
                        <span className={s.isRequiredField}> *</span>
                      </>
                    ),
                  }}
                  input={{
                    type: 'password',
                    value: formik.values.password,
                    onChange: formik.handleChange,
                    placeholder: 'Password',
                  }}
                  modifClasses={s.inputform}
                  errorMessage={
                    errors.password && touched.password ? errors.password : ''
                  }
                />
                <Button variant="filled" modifClass={s.loginBtn} type="submit">
                  Login
                </Button>
              </form>
            </div>

            <Link className={s.regLink} to="/register">
              Register
            </Link>
            <Link className={s.regLink} to="/forgot-password">
              Forgot password
            </Link>
          </div>
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
