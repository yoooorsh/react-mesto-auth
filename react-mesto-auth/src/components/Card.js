import React from 'react';
import { CurrentUserContext,  } from '../contexts/CurrentUserContext';

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  
  const isOwn = props.card.owner._id === currentUser._id;

  const isLiked = props.card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = `elements__like-button ${isLiked ? 'elements__like-button_active' : ''}`;

  function handleClick() {
    props.onCardClick(props.card);
  }
  
  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <div className="elements__element">
      <img className="elements__photo" onClick={handleClick} src={props.card.link} alt={props.card.name} />
      <div className="elements__description">
        <h2 className="elements__name">{props.card.name}</h2>
        <div className="elements__like">
          <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button" aria-label="Мне нравится" title="Мне нравится"></button>
          <div className="elements__like-counter">{props.card.likes.length}</div>
        </div>
        {isOwn ? (<button className="elements__delete-button" onClick={handleDeleteClick} type="button" aria-label="Удалить место" title="Удалить место"></button>) : ''}
      </div>
    </div>
  );
}

export default Card;