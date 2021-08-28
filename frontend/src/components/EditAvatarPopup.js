import React, {useState} from 'react';
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup ({onUpdateAvatar, isOpened, onClose, isLoading}) {
    const [avatar, setAvatar] = useState("");
    const [isEnable, setIsEnable] = useState(true);
    const [isAvatarValid, setIsAvatarValid] = useState(true);

    React.useEffect(() => {
        setAvatar("");
        setIsAvatarValid(true);
    }, [isOpened]);

    function handleAvatarChange (e) {
        if (!e.target.validity.valid) {
            setIsAvatarValid(false);
            setIsEnable(false);
        } else {
            setIsEnable(true);
            setIsAvatarValid(true);
        }
        setAvatar(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
            avatar
        });
    }

    return (
        <PopupWithForm name="avatar" title="Обновить аватар" value="Обновить"
                       isOpened={isOpened}
                       onClose={onClose}
                       onSubmit={handleSubmit}
                       isLoading={isLoading}
                       isEnable={isEnable}
                       isAvatarValid={isAvatarValid}>
            <fieldset className="popup__fields">
                <input className={`popup__field popup__avatar-link ${!isAvatarValid ? 'popup__field_type_error' : ''}`}
                       placeholder="Ссылка на аватарку"
                       type="url"
                       required
                       value={avatar}
                       onChange={(e) => (handleAvatarChange(e))}/>
                <span className={`popup__input-error-message ${!isAvatarValid ? 'popup__input-error-message_active' : ''}`}>Здесь должна быть ссылка</span>
            </fieldset>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;