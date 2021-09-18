import React, {useState} from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import DeleteConfirmationPopup from './DeleteConfirmationPopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isDeleteConfirmationPopupOpen, setIsDeleteConfirmationPopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState({name: '', link: ''});

  const [deletedCard, setDeletedCard] = useState({name: '', link: ''});

  const [currentUser, setCurrentUser] = useState({});

  const [cards, setCards] = useState([]);

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userInfo, cards]) => {
        setCurrentUser(userInfo);
        setCards(cards);
      })
      .catch(err => {
        console.log(`Api error: ${err}`);
      });
  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleDeleteConfirmationClick(card) {
    setDeletedCard(card);
    setIsDeleteConfirmationPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeleteConfirmationPopupOpen(false);
    setSelectedCard({name: '', link: ''});
    setDeletedCard({name: '', link: ''});
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => {
        console.log(`Api error: ${err}`);
      });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch(err => {
        console.log(`Api error: ${err}`);
      });
  } 

  function handleUpdateUser({name, about}) {
    api.setUserInfo(name, about)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch(err => {
        console.log(`Api error: ${err}`);
      });
  }

  function handleUpdateAvatar({avatar}) {
    api.setAvatarPhoto(avatar)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch(err => {
        console.log(`Api error: ${err}`);
      });
  }

  function handleAddPlace({name, link}) {
    api.addNewCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => {
        console.log(`Api error: ${err}`);
      });
  }
  
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header />
      <Main 
        onEditAvatar={handleEditAvatarClick} 
        onEditProfile={handleEditProfileClick} 
        onAddPlace={handleAddPlaceClick}
        cards={cards}
        onCardClick={handleCardClick}
        onCardLike={handleCardLike}
        onCardDelete={handleDeleteConfirmationClick}
      />
      <Footer />

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen} 
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser} 
      />
      
      <AddPlacePopup 
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlace}
      />
      
      <ImagePopup 
        card={selectedCard}
        onClose={closeAllPopups}
      />

      <DeleteConfirmationPopup
        card={deletedCard}
        isOpen={isDeleteConfirmationPopupOpen}
        onClose={closeAllPopups}
        onCardDelete={handleCardDelete}
      />
      
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen} 
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}  
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
