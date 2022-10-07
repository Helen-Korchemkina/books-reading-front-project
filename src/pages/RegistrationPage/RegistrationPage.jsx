import Container from 'components/common/Container';
import { Link } from 'react-router-dom';
import Button from 'components/common/Button';
import FormInput from 'components/common/FormInput';
import GoogleBtn from 'components/GoogleBtn/GoogleBtn';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import s from '../LoginPage/LoginPage.module.scss';
import BooksReadingAdvantages from 'components/BooksReadingAdvantages/BooksReadingAdvantages';
import { useAddNewUserMutation } from 'redux/auth/auth-api';
import { useAuth } from 'redux/auth/authSlice';
import Media from 'react-media';

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .required('Please enter your name')
    .matches(
      /^(?:[0-9][a-zA-Z0-9 ]*)?[a-zA-Z0-9 ][a-zA-Z0-9 !@#$%^&*(),.?":{}|<>]*$/,
      'Please use only latin letters and numbers'
    )
    .min(3, 'Must be 3 characters or more')
    .max(100, 'Must be no more than 100 characters '),
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
  confirm_password: Yup.string()
    .label('confirm password')
    .required()
    .min(5, 'Must be 8 characters or more')
    .max(30, 'Must be no more than 30 characters ')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

export default function RegstrationPage() {
  const { credentialsUpdate } = useAuth();
  const [addNewUser] = useAddNewUserMutation();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirm_password: '',
    },
    validationSchema: SignupSchema,
    onSubmit: (values, actions) => {
      actions.resetForm();
      const loginFetch = async loginData => {
        try {
          const response = await addNewUser(loginData);
          if (response?.error?.status === 400) {
            console.log(response?.error?.status);
            return;
          } else {
            credentialsUpdate({
              user: {
                name: response.data.data.name,
                email: response.data.data.email,
              },
              token: response.data.token,
            });
          }
        } catch (error) {
          console.log(error);
        }
      };
      loginFetch({
        name: values.name,
        email: values.email,
        password: values.password,
        confirm_password: values.confirm_password,
      });
    },
  });

  const { errors, touched } = formik;

  return (
    <div className={s.wrapper}>
      <div className={`${s.pictureWrapper} ${s.pictureRegister}`}>
        <Container>
          <div className={s.registerWrapper}>
            <GoogleBtn />
            <div className={s.formWrapper}>
              <form
                onSubmit={formik.handleSubmit}
                noValidate
                autoComplete="off"
              >
                <FormInput
                  label={{
                    id: 'name',
                    text: (
                      <>
                        <span className={s.formText}>Name</span>
                        <span className={s.isRequiredField}> *</span>
                      </>
                    ),
                  }}
                  input={{
                    value: formik.values.name,
                    onChange: formik.handleChange,
                  }}
                  modifClasses={s.inputform}
                  errorMessage={errors.name && touched.name ? errors.name : ''}
                />
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
                  Register
                </Button>
              </form>
            </div>
            <span className={s.loginLink}>
              Already have an account?{' '}
              <Link className={s.regLink} to="/login">
                Log in
              </Link>
            </span>
          </div>
        </Container>
      </div>

      <div className={s.regTextWrapper}>
        <Media
          queries={{
            small: '(min-width: 768px)',
          }}
        >
          {matches => <>{matches.small && <BooksReadingAdvantages />}</>}
        </Media>
      </div>
    </div>
  );
}
