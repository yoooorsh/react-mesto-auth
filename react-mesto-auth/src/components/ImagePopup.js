import React from 'react';

function ImagePopup(props) {
  const popupVisibleClass = props.card.name ? 'popup_visible' : '';
  const link = props.card.link ? props.card.link : '';

  return (
    <div className={`popup popup_content_view-photo popup_opacity_low ${popupVisibleClass}`}>
      <div className="popup__content">
        <button className="popup__close-button" onClick={props.onClose} type="button"></button>
        <img className="popup__photo" src={link} alt="Фото места" />
        <p className="popup__photo-name">{props.card.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;