import React, { useContext } from 'react';
import Card from './Card';
import { CurrentUserContext  } from '../contexts/CurrentUserContext';

function Main(props) {

  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__container">
          <div className="profile__avatar">
            <img className="profile__photo" src={currentUser.avatar} alt="Фото профиля" />
            <button className="profile__avatar-edit-button" onClick={props.onEditAvatar} type="button" title="Изменить аватар"></button>
          </div>
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <p className="profile__profession">{currentUser.about}</p>
            <button className="profile__edit-button" onClick={props.onEditProfile} type="button" aria-label="Редактировать профиль" title="Редактировать профиль"></button>
          </div>
        </div>
        <button className="profile__add-button" onClick={props.onAddPlace} type="button" aria-label="Добавить место" title="Добавить место"></button>
      </section>
      <section className="elements">
        {props.cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;