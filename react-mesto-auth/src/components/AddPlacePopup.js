import React, { useState } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const [name, setName] = useState('');
  const [link, setLink ] = useState('');

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      name,
      link,
    });
  }

  return (
    <PopupWithForm
      name="add-element"
      title="Новое место"
      buttonText="Создать"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <div className="popup__field">
        <input className="popup__input popup__input_content_place" id="place-input" required name="input-place" type="text" value={name || ''} onChange={handleNameChange} placeholder="Название" minLength="2" maxLength="30" autoComplete="off" />
        <span className="popup__input-error place-input-error"></span>
      </div>
      <div className="popup__field">
        <input className="popup__input popup__input_content_img-url" id="img-url-input" required name="input-img-url" type="url" value={link || ''} onChange={handleLinkChange} placeholder="Ссылка на картинку" />
        <span className="popup__input-error img-url-input-error"></span>
      </div>
    </PopupWithForm>
  );
}

export default AddPlacePopup;