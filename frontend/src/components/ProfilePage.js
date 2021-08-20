import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from '../utils/api.js'
import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import PopupDeletePlace from './PopupDeletePlace';
import EditAvatarPopup from './EditAvatarPopup';
import ImagePopup from './ImagePopup';

function Home(props) {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);//---стейт попапа редак. профиль
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);//---стейт попапа добавить место
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);//---стейт попапа обновить аватар
    const [selectedCard, setSelectedCard] = React.useState({ link: "", name: "", isOpen: false });//--стейт попапа просмотра из.
    const [currentUser, setCurrentUser] = React.useState({});//---стейт попапа пользователя
    const [cards, setCards] = React.useState([]);//---стейт карточек пользователя
    const [selectedCardDelete, setSelectedCardDelete] = React.useState({});
    const [isConfirmDeletePopupOpen, setConfirmDeletePopupOpen] = React.useState(false);

    React.useEffect(() => {
        const promises = [api.getUserInfo(), api.getCards()];
        Promise.all(promises)
            .then(([data, cards]) => {
                setCurrentUser(data)
                setCards(cards);
            })
            .catch((err) => console.log(`Что-то не то...: ${err}`))
    }, [])

    function closeAllPopups() { //-----ЗАКРЫТИЕ ПОПАПОВ
        setIsAddPlacePopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setConfirmDeletePopupOpen(false);
        //setInfoTooltipOpen(false)
        setSelectedCard({ link: "", name: "", isOpen: false });
    }
    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }
    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }
    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }
    function handleCardClick(card) {
        setSelectedCard({ link: card.link, name: card.name, isOpen: true });
    }

    //-------
    function handleConfirmDeleteClick(card) {//------попап УДАЛЕНИЕ КАРТОЧКИ
        setConfirmDeletePopupOpen(true);
        setSelectedCardDelete(card);
    }

    function handleCardLike(card) {//---изменение лайка запрос
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch((err) => console.log(`Что-то не то...: ${err}`));
    }

    function handleCardDelete() {//----удаление карточки запрос
        api.deleteCard(selectedCardDelete._id)
            .then(() => {
                const newCards = cards.filter((c) => c._id !== selectedCardDelete._id);
                setCards(newCards);
                setSelectedCardDelete({});
                closeAllPopups();
            })
            .catch((err) => console.log(`Что-то не то...: ${err}`));

    }
    //--------------------///
    function handleAddPlaceSubmit(card) {//----размещение карточки на сервере
        api.postCards(card)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch((err) => console.log(`Что-то не то...: ${err}`));
    }
    function handleUpdateUser(data) {//---запрос на изменение инфы о пользователе
        api.setUserInfo(data)
            .then(() => {
                setCurrentUser({ ...currentUser, ...data });
                closeAllPopups();
            })
            .catch((err) => console.log(`Что-то не то...: ${err}`));
    }

    function handleUpdateAvatar(avatar, isLoading) {//---смена аватара запрос
        api.updateAvatar(avatar)
            .then(() => {
                setCurrentUser({ ...currentUser, ...avatar });
                closeAllPopups();
            })
            .catch((err) => console.log(`Упс!: ${err}`))

    }
    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Header>
                    <p className="header__email">
                        {props.email}
                    </p>
                    <button className="header__link header__link_exit" onClick={props.onLogout}>
                        Выйти
                    </button>
                </Header>

                <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

                <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

                <PopupDeletePlace isOpen={isConfirmDeletePopupOpen} onClose={closeAllPopups} onDeleteCard={handleCardDelete} />

                <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

                <ImagePopup card={selectedCard} onClose={closeAllPopups} />
                <Main
                    onEditAvatar={handleEditAvatarClick}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onCardClick={handleCardClick}
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleConfirmDeleteClick}
                />
                <Footer />
            </div>

        </CurrentUserContext.Provider >
    );
}

export default Home;
