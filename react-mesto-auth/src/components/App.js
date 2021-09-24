import React, { useState } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import Header from './Header';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';
import MainPage from './MainPage';
import * as auth from '../utils/apiAuth.js';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const history = useHistory();

  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = useState(false);
  const [isSuccessAuth, setSuccessAuth] = useState(false);

  const [curUserEmail, setCurUserEmail] = useState('');

  function handleSuccessTooltipOpen() {
    setSuccessAuth(true);
    setInfoTooltipPopupOpen(true);
  }

  function handleFailedTooltipOpen() {
    setSuccessAuth(false);
    setInfoTooltipPopupOpen(true);
  }

  function closeAllPopups() {
    setInfoTooltipPopupOpen(false);
    setSuccessAuth(false);
  }

  function handleLogin() {
    setLoggedIn(true);
  }

  function handleSubmitRegistration(password, email) {
    auth.register(password, email)
      .then((res) => {
        if(res) {
          handleSuccessTooltipOpen();
          history.push('/sign-in');
        } else {
          handleFailedTooltipOpen();
        }
      })
      .catch((err) => console.log(err));
  }

  function handleSubmitAuth(email, password) {
    auth.authorize(email, password)
    .then((data) => {
      if (data.token) {
        setCurUserEmail(email);
        handleLogin();
        history.push('/');
      }
    })
    .catch((err) => console.log(err));
  }

  React.useEffect(() => {
    const token = localStorage.getItem('token');

    if (token){
      auth.getContent(token).then(({data}) => {
        if (data){
          setCurUserEmail(data.email);
          setLoggedIn(true);
          history.push("/");
        }
      })
      .catch((err) => console.log(err)); 
    }
  }, [history]);
  
  return (
    <>
      <Switch>
        <ProtectedRoute 
          exact 
          path="/"
          component={MainPage}
          loggedIn={loggedIn}
          curUserEmail={curUserEmail}
        />

        <Route exact path="/sign-in">
          <Header/>

          <Login
            onHandleSubmit={handleSubmitAuth}
          />
        </Route>

        <Route exact path="/sign-up">
          <Header/>

          <Register
            onHandleSubmit={handleSubmitRegistration}
          />
        </Route>

        <Route path="*">
          <Redirect to="/" />
        </Route> 
      </Switch>
      <InfoTooltip 
      isOpen={isInfoTooltipPopupOpen} 
      onClose={closeAllPopups}
      isSuccessAuth={isSuccessAuth}
    />
  </>
  );
}

export default App;
