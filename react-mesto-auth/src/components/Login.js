import { React, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Form from './Form';
import * as auth from '../utils/apiAuth.js';

function Login(props) {
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

    if (!email || !password){
      return;
    }
    
    auth.authorize(email, password)
    .then((data) => {
      if (data.token) {
        props.setCurUserEmail(email);
        setEmail('');
        setPassword('');
        props.handleLogin();
        history.push('/');
      }
    })
    .catch(err => console.log(err));
  }

  return (
    <Form
      name="sign-in"
      title="Вход"
      buttonText="Войти"
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
  );
}

export default Login;