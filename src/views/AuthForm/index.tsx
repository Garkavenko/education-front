import React from 'react';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import { LinearProgress } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import styles from './style.module.css';
import useQuery from '../../hooks/useQuery';
import { API_URL } from '../../constants/environment';
import { Alert } from '@material-ui/lab';
import CircularProgress from '@material-ui/core/CircularProgress';

interface Values {
  login: string;
  password: string;
}

function AuthForm() {
  const [state, fetch] = useQuery(`${API_URL}/login`, { method: 'get' });
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
          onSubmit={(values) => fetch({ params: values })}
        >
          {({ submitForm, isSubmitting, values }) => (
            <Form>
              <div className={styles.inputsContainer}>
                <h3>Вход</h3>
                <Field
                  component={TextField}
                  name="login"
                  type="text"
                  label="Логин"
                  autoFocus
                  className={styles.input}
                />
                <br />
                <Field
                  component={TextField}
                  type="password"
                  label="Пароль"
                  name="password"
                  className={styles.input}
                />
                {isSubmitting && <LinearProgress />}
                <br />
                <Button
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting || !values.login || !values.password}
                  onClick={submitForm}
                >
            Submit
                </Button>
                {!!state.error && <Alert severity="error" className={styles.footer}>{state.error}</Alert>}
                {state.loading && <CircularProgress className={styles.footer} />}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default AuthForm;
