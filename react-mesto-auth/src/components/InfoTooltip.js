import React from 'react';
import successImg from '../images/success.svg';
import errorImg from '../images/error.svg';

function InfoTooltip(props) {
  const popupVisibleClass = props.isOpen ? 'popup_visible' : '';

  return (
    <div className={`popup popup_content_auth-tooltip ${popupVisibleClass && 'popup_visible'}`}>
      <div className="popup__union">
        <button className="popup__close-button" onClick={props.onClose} type="button"></button>
        <img className="popup__img" src={props.isSuccessAuth ? successImg : errorImg} alt="Фото места" />
        <p className="popup__message">{props.isSuccessAuth ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</p>
      </div>
    </div>
  );
}

export default InfoTooltip;