import React, {useState} from 'react';
import {Route, Switch, useHistory} from 'react-router-dom';
import Main from './Main';
import ImagePopup from "./ImagePopup";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import BurgerMenu from "./BurgerMenu";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from "../utils/auth.js";
import {api} from "../utils/api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App () {
    const [currentUser, setCurrentUser] = useState({});
    const [loggedIn, setLoggedIn] = useState(false);
    const [userEmail, setUserEmail] = useState("");
    const [isMobile, setIsMobile] = useState(false);

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
    const [isBurgerOpen, setIsBurgerOpen] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isFail, setIsFail] = useState(false);

    const [cards, setCards] = useState([]);
    const [selectedCard, setSelectedCard] = useState({});

    const [isLoading, setIsLoading] = useState(false);

    const history = useHistory();

    React.useEffect(() => {
        api.getOwnerInfo()
            .then((result) => {
                setCurrentUser({...result})
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    React.useEffect (() => {
        api.getInitialCards()
            .then((result) => {
                setCards([...result]);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleEditAvatarClick = () => {
        setIsEditAvatarPopupOpen(true);
    }

    const handleEditProfileClick = () => {
        setIsEditProfilePopupOpen(true);
    }

    const handleAddPlaceClick = () => {
        setIsAddPlacePopupOpen(true);
    }

    const handleBurgerClick = () => {
        setIsBurgerOpen(true);
    }

    const closeAllPopups = () => {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsImagePopupOpen(false);
        setIsSuccess(false);
        setIsFail(false);
    }

    const closeBurger = () => {
        setIsBurgerOpen(false);
    }

    const handleCardClick = (card) => {
        setSelectedCard({...card});
        setIsImagePopupOpen(true);
    }

    const handleUpdateUser = ({name, about}) => {
        setIsLoading(true);
        api.editProfile(name, about)
            .then((result) => {
                setCurrentUser({...result});
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    const handleUpdateAvatar = ({avatar}) => {
        setIsLoading(true);
        api.editAvatar(avatar)
            .then((result) => {
                setCurrentUser({...result});
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    const handleCardLike = (card) => {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        api.changeLikeCardStatus(card._id, isLiked)
            .then((data) => {
                setCards((cards) => cards.map((item) => item._id === card._id ? data : item));
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handleCardDelete = (card) => {
        const isOwn = card.owner._id === currentUser._id;
        if (isOwn) {
            api.deleteCard(card._id)
                .then (() => {
                    setCards((cards) => cards.filter((item) => item._id === card._id ? null : item));
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }

    const handleAddPlaceSubmit = ({placename, placelink}) => {
        setIsLoading(true);
        api.addNewCard(placename, placelink)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    const handleRegister = (email, password) => {
        auth.register(email, password)
            .then(() => {
                console.log(email, password);
                handleSuccess();
                history.push("/sign-in");
            })
            .catch(handleError);
    }

    const handleLogin = (email, password) => {
        auth.authorize(email, password)
            .then((result) => {
                const {token} = result;
                localStorage.setItem("token", token);
                setLoggedIn(true);
                history.push("/");
            })
            .catch(handleError);
    }

    const handleLogout = () => {
        setLoggedIn(false);
        setUserEmail("");
        localStorage.removeItem("token");
    }

    const checkToken = () => {
        const token = localStorage.getItem("token");
        if (token) {
            auth.getContent(token)
                .then((result) => {
                    const {data} = result;
                    setUserEmail(data.email);
                    setLoggedIn(true);
                    history.push("/");
                })
                .catch(handleError);
        }
    }

    React.useEffect(() => {
        checkToken();
        window.addEventListener("resize", handleMobile);
    }, [])

    const handleError = (error) => {
        console.error(error);
        setIsFail(true);
    }

    const handleSuccess = () => {
        setIsSuccess(true);
    }

    const handleMobile = () => {
        if(window.innerWidth < 500) {
            setIsMobile(true);
        } else {
            setIsMobile(false);
        }
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Switch>
                    <Route path="/sign-in">
                        <Login
                            onClose={closeAllPopups}
                            isLoading={isLoading}
                            handleLogin={handleLogin}
                            checkToken={checkToken}
                            userEmail={userEmail}
                            name="login"
                            title="Вход"
                            value="Войти"
                            headerPath="/sign-up"
                            headerValue="Регистрация"/>
                    </Route>
                    <Route path="/sign-up">
                        <Register
                            onClose={closeAllPopups}
                            isLoading={isLoading}
                            handleRegister={handleRegister}
                            name="register"
                            title="Регистрация"
                            value="Зарегистрироваться"
                            headerPath="/sign-in"
                            headerValue="Войти"/>
                    </Route>
                    <ProtectedRoute exact path="/"
                                    component={Main}
                                    loggedIn={loggedIn}
                                    headerValue="Выйти"
                                    userEmail={userEmail}
                                    handleLogout={handleLogout}
                                    headerPath="/sign-up"
                                    handleBurgerClick={handleBurgerClick}
                                    isMobile={isMobile}
                                    onEditProfile={handleEditProfileClick}
                                    onAddPlace={handleAddPlaceClick}
                                    onEditAvatar={handleEditAvatarClick}
                                    onCardClick={handleCardClick}
                                    cards={cards}
                                    onCardLike={handleCardLike}
                                    onCardDelete={handleCardDelete}/>
                </Switch>
                <EditProfilePopup
                        isOpened={isEditProfilePopupOpen}
                        onClose={closeAllPopups}
                        onUpdateUser={handleUpdateUser}
                        isLoading={isLoading}/>
                    <EditAvatarPopup
                        isOpened={isEditAvatarPopupOpen}
                        onClose={closeAllPopups}
                        onUpdateAvatar={handleUpdateAvatar}
                        isLoading={isLoading}/>
                    <AddPlacePopup
                        isOpened={isAddPlacePopupOpen}
                        onClose={closeAllPopups}
                        onAddPlace={handleAddPlaceSubmit}
                        isLoading={isLoading}/>
                    <ImagePopup
                        card={selectedCard}
                        onClose={closeAllPopups}
                        isOpened={isImagePopupOpen}/>
                    <PopupWithForm
                        name="confirm"
                        title="Вы уверены?"
                        value="Да"
                        isLoading={isLoading}/>
                    <InfoTooltip
                        isFail={isFail}
                        isSuccess={isSuccess}
                        onClose={closeAllPopups}/>
                    <BurgerMenu
                        loggedIn={loggedIn}
                        isOpened={isBurgerOpen}
                        handleLogout={handleLogout}
                        onClose={closeBurger}
                        userEmail={userEmail}/>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;