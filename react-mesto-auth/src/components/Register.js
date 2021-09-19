import { React, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Form from './Form';
import * as auth from '../utils/apiAuth.js';

function Register(props) {
  const [email, setEmail] = useState('');
  const [password , setPassword ] = useState('');

  const history = useHistory();

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    auth.register(password, email).then((res) => {
      if(res) {
        props.onSuccessRegistration();
        history.push('/sign-in');
      } else {
        props.onFailedRegistration();
      }
    });
  }

  return (
    <>
      <Form
        name="sign-up"
        title="Регистрация"
        buttonText="Зарегистрироваться"
        onSubmit={handleSubmit}
      >
        <div className="form__field">
          <input className="form__input form__input_content_email" id="email-input" required name="input-email" type="email" value={email || ''} onChange={handleEmailChange} placeholder="Email" minLength="2" maxLength="40" autoComplete="off" />
          <span className="form__input-error email-input-error"></span>
        </div>
        <div className="form__field">
          <input className="form__input form__input_content_password" id="password-input" required name="input-password" type="password" value={password || ''} onChange={handlePasswordChange} placeholder="Пароль" minLength="2" maxLength="200" autoComplete="off" />
          <span className="form__input-error password-input-error"></span>
        </div>
      </Form>
      <span className="form__sign-in-text">Уже зарегистрированы? <Link className="form__sign-in-link" to="/sign-in" >Войти</Link></span>
    </>
  );
}

export default Register;