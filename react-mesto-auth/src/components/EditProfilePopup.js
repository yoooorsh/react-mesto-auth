import React, { useState } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext,  } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = useState('');
  const [description , setDescription ] = useState('');

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <div className="popup__field">
        <input className="popup__input popup__input_content_name" id="name-input" required name="input-name" type="text" value={name || ''} onChange={handleNameChange} placeholder="Ваше имя" minLength="2" maxLength="40" autoComplete="off" />
        <span className="popup__input-error name-input-error"></span>
      </div>
      <div className="popup__field">
        <input className="popup__input popup__input_content_profession" id="profession-input" required name="input-profession" type="text" value={description || ''} onChange={handleDescriptionChange} placeholder="Ваша профессия" minLength="2" maxLength="200" autoComplete="off" />
        <span className="popup__input-error profession-input-error"></span>
      </div>
    </PopupWithForm>
  );
}

export default EditProfilePopup;