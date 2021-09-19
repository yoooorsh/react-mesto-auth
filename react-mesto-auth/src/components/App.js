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

  React.useEffect(() => {
    const token = localStorage.getItem('token');

    if (token){
      auth.getContent(token).then(({data}) => {
        if (data){
          setCurUserEmail(data.email);
          setLoggedIn(true);
          history.push("/");
        }
      }); 
    }
  }, [history]);
  
  return (
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
          handleLogin={handleLogin}
          setCurUserEmail={setCurUserEmail}
        />

        <InfoTooltip 
          isOpen={isInfoTooltipPopupOpen} 
          onClose={closeAllPopups}
          isSuccessAuth={isSuccessAuth}
        />
      </Route>

      <Route exact path="/sign-up">
        <Header/>

        <Register 
          onSuccessRegistration={handleSuccessTooltipOpen}
          onFailedRegistration={handleFailedTooltipOpen}
        />

        <InfoTooltip 
          isOpen={isInfoTooltipPopupOpen} 
          onClose={closeAllPopups}
          isSuccessAuth={isSuccessAuth}
        />
      </Route>

      <Route path="*">
        <Redirect to="/" />
      </Route> 
    </Switch>
  );
}

export default App;
