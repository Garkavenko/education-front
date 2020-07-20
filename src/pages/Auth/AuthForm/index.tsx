import React from 'react';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import Button from '@material-ui/core/Button';
import styles from './style.module.css';
import useQuery from '../../../hooks/useQuery';
import { API_URL } from '../../../constants/environment';
import { Alert } from '@material-ui/lab';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useCookies } from 'react-cookie';

interface Values {
  login: string;
  password: string;
}

function AuthForm() {
  const [state, fetch] = useQuery(`${API_URL}/auth`, { method: 'get' });
  const [, setCookie] = useCookies([]);
  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <Formik
          initialValues={{
            login: '',
            password: '',
          }}
          validate={values => {
            const errors: Partial<Values> = {};
            if (!values.login) {
              errors.login = 'Поле обязательно для заполнения';
            }
            if (!values.password) {
              errors.password = 'Поле обязательно для заполнения';
            }
            return errors;
          }}
          onSubmit={async (values) => {
            const res = await fetch({ params: values });
            setCookie('AUTH_TOKEN', res.AUTH_TOKEN, { path: '/' });
          }}
        >
          {({ submitForm, isSubmitting, values }) => (
            <Form>
              <div className={styles.inputsContainer}>
                <div className={styles.fieldContainer}>
                  <Field
                    component={TextField}
                    name="login"
                    type="text"
                    label="Логин"
                    autoFocus
                    className={styles.input}
                  />
                </div>
                <div className={styles.fieldContainer}>
                  <Field
                    component={TextField}
                    type="password"
                    label="Пароль"
                    name="password"
                    className={styles.input}
                  />
                </div>
                <Button
                  type="submit"
                  variant="contained"
                  className={styles.input}
                  color="primary"
                  style={{ marginTop: 20 }}
                  disabled={isSubmitting || !values.login || !values.password}
                  onClick={submitForm}
                >
                  Войти
                </Button>
                {!!state.error && <Alert severity="error" className={styles.footer}>{state.error.message}</Alert>}
                <div style={{ visibility: (state.loading) ? 'visible' : 'hidden' }}>
                  <CircularProgress className={styles.footer} />
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default AuthForm;
