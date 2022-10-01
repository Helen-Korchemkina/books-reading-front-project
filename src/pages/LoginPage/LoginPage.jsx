import Container from 'components/Container';
import { Link } from 'react-router-dom';
import Button from 'components/Button';
import FormInput from 'components/FormInput';
import GoogleBtn from 'components/GoogleBtn/GoogleBtn';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import s from './LoginPage.module.scss';

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Please enter your email'),
  password: Yup.string()
    .required('Please Enter your password')
    .min(8, 'Must be 8 characters or more')
    .matches(/[a-z]+/, 'One lowercase character')
    .matches(/[A-Z]+/, 'One uppercase character')
    .matches(/\d+/, 'One number'),
});

export default function LoginPage() {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: SignupSchema,
    onSubmit: (values, actions) => {
      console.log(JSON.stringify(values, null, 2));
      actions.resetForm();
    },
  });

  const { errors, touched } = formik;

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

            <Link className={s.regLink}>Register</Link>
          </div>
        </Container>
      </div>

      <div className={s.positionWrapper}>
        <div className={s.textWrapper}>
          <span className={s.decorationItem}>“</span>
          <p className={s.textQuote}>
            Books are the ships of thoughts, wandering through the waves of
            time.
          </p>
          <p className={s.textAuthor}>Francis Bacon</p>
        </div>
      </div>
    </div>
  );
}
