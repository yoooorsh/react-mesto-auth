import React, { useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {

  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
  
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <div className="popup__field">
        <input ref={avatarRef} className="popup__input popup__input_content_avatar-url" id="avatar-url-input" required name="input-avatar-url" type="url" placeholder="Ссылка на фото для аватара" />
        <span className="popup__input-error avatar-url-input-error"></span>
      </div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;