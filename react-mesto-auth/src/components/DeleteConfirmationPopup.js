import React from 'react';
import PopupWithForm from './PopupWithForm';

function DeleteConfirmationPopup(props) {

  function handleSubmit(e) {
    e.preventDefault();

    props.onCardDelete(props.card);
  }

  return (
    <PopupWithForm
      name="delete-confirmation"
      title="Вы уверены?"
      buttonText="Да"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    />
  );
}

export default DeleteConfirmationPopup;