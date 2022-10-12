import Container from 'components/common/Container';
import { Link } from 'react-router-dom';
import Button from 'components/common/Button';
import FormInput from 'components/common/FormInput';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import s from '../LoginPage/LoginPage.module.scss';
import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import ModalWindow from 'components/common/ModalWindow';
import axios from 'axios';

const SignupSchema = Yup.object().shape({
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
  confirm_password: Yup.string()
    .label('confirm password')
    .required('Please confirm your password')
    .min(5, 'Must be 8 characters or more')
    .max(30, 'Must be no more than 30 characters ')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

export default function NewPassword() {
  const [searchParams] = useSearchParams();
  const [token, setToken] = useState(null);
  const [togle, setTogle] = useState(false);
  const navigate = useNavigate();
  useEffect(
    () => {
      setToken(searchParams.get('token'));
    },
    [searchParams]
  );

  const defaultQuote = `Books are the ships of thoughts, wandering through the waves of
            time.`;
  const defaultAuthor = `Francis Bacon`;
  const [quote, setQuote] = useState(null);
  const [author, setAuthor] = useState(null);
  const formik = useFormik({
    initialValues: {
      password: '',
      confirm_password: '',
    },
    validationSchema: SignupSchema,
    onSubmit: (values, actions) => {
      async function newPasswordPost() {
        console.log(token);
        try {
          const response = await axios.patch(
            `https://books-reading-project.herokuapp.com/api/auth/change`,

            {
              token: token,
              password: values.password,
              confirm_password: values.confirm_password,
            }
          );
          setTogle(true);
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
      }
      newPasswordPost();
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
            <div className={s.formWrapper}>
              <form
                onSubmit={formik.handleSubmit}
                noValidate
                autoComplete="off"
              >
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
                  }}
                  modifClasses={s.inputform}
                  errorMessage={
                    errors.password && touched.password ? errors.password : ''
                  }
                />
                <FormInput
                  onPaste={e => e.preventDefault()}
                  label={{
                    id: 'confirm_password',
                    text: (
                      <>
                        <span className={s.formText}>Confirm password</span>
                        <span className={s.isRequiredField}> *</span>
                      </>
                    ),
                  }}
                  input={{
                    type: 'password',
                    value: formik.values.confirm_password,
                    onChange: formik.handleChange,
                  }}
                  modifClasses={s.inputform}
                  errorMessage={
                    errors.confirm_password && touched.confirm_password
                      ? errors.confirm_password
                      : ''
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
              <p className={s.modalText}>
                Your password has been successfully updated
              </p>
              <Button
                variant="filled"
                modifClass={s.loginBtn}
                onClick={() => {
                  setTogle(false);
                  navigate('/', { replace: true });
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
