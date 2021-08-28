import React, {useState} from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup ({onUpdateUser, isOpened, onClose, isLoading}) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const currentUser = React.useContext(CurrentUserContext);
    const [isEnable, setIsEnable] = useState(true);
    const [isNameValid, setIsNameValid] = useState(true);
    const [isDescriptionValid, setIsDescriptionValid] = useState(true);

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
        setIsNameValid(true);
        setIsDescriptionValid(true);
    }, [currentUser, isOpened]);

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name,
            about: description
        });
    }

    function handleNameChange(e) {
        if (!e.target.validity.valid) {
            setIsNameValid(false);
            setIsEnable(false);
        } else {
            setIsEnable(true);
            setIsNameValid(true);
        }
        setName(e.target.value);
    }

    function handleDescriptionChange(e) {
        if (!e.target.validity.valid) {
            setIsDescriptionValid(false);
            setIsEnable(false);
        } else {
            setIsEnable(true);
            setIsDescriptionValid(true);
        }
        setDescription(e.target.value);
    }

    return (
        <PopupWithForm name="profile-info-form" title="Редактировать профиль" value="Сохранить"
                       isOpened={isOpened}
                       onClose={onClose}
                       onSubmit={handleSubmit}
                       isLoading={isLoading}
                       isEnable={isEnable}
                       isNameValid={isNameValid}
                       isDescriptionValid={isDescriptionValid}>
            <fieldset className="popup__fields">
                <input className={`popup__field popup__name ${!isNameValid ? 'popup__field_type_error' : ''}`}
                       placeholder="Имя"
                       value={name || ""}
                       onChange={(e) => (handleNameChange(e))}
                       type="text"
                       required/>
                <span className={`popup__input-error-message ${!isNameValid ? 'popup__input-error-message_active' : ''}`}>Напишите имя</span>
                <input className={`popup__field popup__job ${!isDescriptionValid ? 'popup__field_type_error' : ''}`}
                       placeholder="О себе"
                       value={description || ""}
                       onChange={(e) => (handleDescriptionChange(e))}
                       type="text"
                       required/>
                <span className={`popup__input-error-message ${!isDescriptionValid ? 'popup__input-error-message_active' : ''}`}>O себе</span>
            </fieldset>
        </PopupWithForm>
    );
}

export default EditProfilePopup;