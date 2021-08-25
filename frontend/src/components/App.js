import React from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import InfoTooltip from "./InfoTooltip";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ApproveDeleteCardPopup from "./ApproveDeleteCardPopup";

import api from "../utils/api";
import auth from "../utils/auth";

import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";

import CurrentUserContext from "../contexts/CurrentUserContext";

import successRegIcon from "../images/success_reg.svg";
import badRegIcon from "../images/bad_reg.svg";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isApproveCardDeletePopupOpen, setIsApproveCardDeletePopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);

  const [infoTooltipContent, setInfoTooltipContent] = React.useState({
    text: "Что-то пошло не так! Попробуйте ещё раз.",
    img: badRegIcon,
  });

  const [selectedCard, setSelectedCard] = React.useState({});
  const [deletedCard, setDeletedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState("");

  const history = useHistory();

  // Переход на главную страницу, если пользователь авторизован
  React.useEffect(() => {
    if (loggedIn) {
      history.push("./main");
    }
  }, [loggedIn, history]);

  // Загрузка на страницу данных пользователя и карточек с сервера при запуске приложения
  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userData, cards]) => {
      setCurrentUser(userData);
      setCards(cards);
      setLoggedIn(true);
      setUserEmail(userData.email);
    })
    .catch((err) => {
      if (err.message === 'Ошибка 401') {
        history.push("./signin");
      } else {
        console.log("Ошибка при загрузке данных пользователя и карточек", err.message);
      }
    });
  }, [history, loggedIn]);

  // Обработчик входа пользователя
  function onLogin(data) {
    return auth
      .login(data)
      .then((res) => {
        setUserEmail(res.email);
        setLoggedIn(true);
      })
      .catch((err) => {
        console.log("Ошибка при попытке авторизовать пользователя", err.message);
      });
  }

  // Обработчик регистрации нового пользователя
  function onRegister(data) {
    return auth
      .register(data)
      .then(() => handleSuccessRegister())
      .then(() => {
        openInfoToolTip();
        history.push("./sign-in");
      })
      .catch((err) => {
        openInfoToolTip();
        console.log("Ошибка при попытке зарегистрировать пользователя", err.message);
      });
  }

  // Обработчик выхода пользователя
  function onLogout() {
    return auth
      .logout()
      .then(() => {
        setLoggedIn(false);
        setUserEmail("");
        history.push("./sign-in");
      })
      .catch((err) => {
        console.log("Ошибка при попытке выхода из лчиного кабинета", err.message);
      });
  }

  // Функции открытия модальных окон
  function openInfoToolTip() {
    setIsInfoTooltipOpen(true);
  }

  function handleSuccessRegister() {
    const text = "Вы успешно зарегистрировались!";
    const img = successRegIcon;
    setInfoTooltipContent({ text, img });
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

  function handleApproveDelitionClick() {
    setIsApproveCardDeletePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  // Функции закрытия модальных окон
  function closeInfoTooltip() {
    setIsInfoTooltipOpen(false);
  }

  function closeEditAvatarPopup() {
    setIsEditAvatarPopupOpen(false);
  }

  function closeEditProfilePopup() {
    setIsEditProfilePopupOpen(false);
  }

  function closeAddPlacePopup() {
    setIsAddPlacePopupOpen(false);
  }

  function closeApproveCardDeletePopup() {
    setIsApproveCardDeletePopupOpen(false);
  }

  function closeImagePopup() {
    setSelectedCard({});
  }

  // Функции для обновления данных пользователя
  function handleUpdateUser(data) {
    api
      .editUserInfo(data)
      .then((user) => {
        setCurrentUser(user);
        closeEditProfilePopup();
      })
      .catch((err) => {
        console.log("Ошибка при попытке обновить данные пользователя", err.message, data);
      });
  }

  function handleUpdateAvatar(data) {
    api
      .changeUserAvatar(data)
      .then((user) => {
        setCurrentUser(user);
        closeEditAvatarPopup();
      })
      .catch((err) => {
        console.log("Ошибка при попытке обновить фотографию пользователя", err.message);
      });
  }

  // Функция для добавления новой карточки
  function handleAddPlaceSubmit(card) {
    api
      .addNewCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAddPlacePopup();
      })
      .catch((err) => {
        console.log("Ошибка при попытке добавить новую карточку", err.message);
      });
  }

  // Сохранение объекта карточки, на иконку удаления которой нажали
  function handlePickDeletedCard(card) {
    setDeletedCard(card);
  }

  // Функция для обработки лайков (добавить или убрать лайк, в заисимости от того, лайкали ли Вы эту карточку ранее)
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    if (isLiked) {
      api
        .removeLikeFromCard(card._id)
        .then((newCard) => {
          setCards((cards) => cards.map((c) => (c._id === card._id ? newCard : c)));
        })
        .catch((err) => {
          console.log("Ошибка при попытке поставить/убрать лайк карточке", err.message);
        });
    } else {
      api
        .putLikeOnCard(card._id)
        .then((newCard) => {
          setCards((cards) => cards.map((c) => (c._id === card._id ? newCard : c)));
        })
        .catch((err) => {
          console.log("Ошибка при попытке поставить/убрать лайк карточке", err.message);
        });
    }
  }

  // Функция для удаления карточки
  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
        closeApproveCardDeletePopup();
      })
      .catch((err) => {
        console.log("Ошибка при попытке удалить карточку", err.message);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Header userEmail={userEmail} onLogout={onLogout} />

          <Switch>
            <ProtectedRoute
              exact
              path="/main"
              loggedIn={loggedIn}
              component={Main}
              cards={cards}
              onCardLike={handleCardLike}
              onApproveDelition={handleApproveDelitionClick}
              onPickDeletedCard={handlePickDeletedCard}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
            />

            <Route path="/sign-up">
              <Register onRegister={onRegister} />
            </Route>
            <Route path="/sign-in">
              <Login onLogin={onLogin} />
            </Route>
            <Route>{loggedIn ? <Redirect to="/main" /> : <Redirect to="/sign-in" />}</Route>
          </Switch>

          <Footer />

          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            onClose={closeInfoTooltip}
            content={infoTooltipContent}
          />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeEditProfilePopup}
            onUpdateUser={handleUpdateUser}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAddPlacePopup}
            onAddPlace={handleAddPlaceSubmit}
          />

          <ImagePopup card={selectedCard} onClose={closeImagePopup} />

          <ApproveDeleteCardPopup
            card={deletedCard}
            isOpen={isApproveCardDeletePopupOpen}
            onClose={closeApproveCardDeletePopup}
            onApproveDelition={handleCardDelete}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeEditAvatarPopup}
            onUpdateAvatar={handleUpdateAvatar}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
