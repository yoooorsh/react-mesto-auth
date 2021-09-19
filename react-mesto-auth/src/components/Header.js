import React from 'react';
import logo from '../images/logo.svg';
import { Link, useRouteMatch, useHistory } from 'react-router-dom';

function Header(props) {
  const match = useRouteMatch();
  
  const history = useHistory();

  function signOut(){
    localStorage.removeItem('token');
    history.push('/sign-in');
  }

  return (
    <header className="header">
      <img className="logo" src={logo} alt="Mesto" />
      <div className="header__account">
      {match.url === "/sign-in" && (
        <Link 
          to={"/sign-up"}
          className={`header__nav-link`}
        >
          Регистрация
        </Link>   
      )}
      {match.url === "/sign-up" && (
        <Link 
          to={"/sign-in"}
          className={`header__nav-link`}
        >
          Войти
        </Link>   
      )}
      {match.url === "/" && (
        <>
          <span className="header__login">{props.curUserEmail || ''}</span>
          <button
            onClick={signOut}
            className={"header__nav-link header__button"}
          >
            Выйти
          </button>
        </>  
      )}
      </div>
    </header>
  );
}

export default Header;