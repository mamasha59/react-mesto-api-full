import React, {useState} from 'react';
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup ({onAddPlace, isOpened, onClose, isLoading}) {
    const [placeName, setPlaceName] = useState("");
    const [placeLink, setPlaceLink] = useState("");
    const [isEnable, setIsEnable] = useState(true);
    const [isPlaceNameValid, setIsPlaceNameValid] = useState(true);
    const [isPlaceLinkValid, setIsPlaceLinkValid] = useState(true);

    React.useEffect(() => {
        setPlaceName("");
        setPlaceLink("");
        setIsPlaceNameValid(true);
        setIsPlaceLinkValid(true);
    }, [isOpened]);

    function handlePlaceNameChange(e) {
        if (!e.target.validity.valid) {
            setIsPlaceNameValid(false);
            setIsEnable(false);
        } else {
            setIsEnable(true);
            setIsPlaceNameValid(true);
        }
        setPlaceName(e.target.value);
    }

    function handlePlaceLinkChange(e) {
        if (!e.target.validity.valid) {
            setIsPlaceLinkValid(false);
            setIsEnable(false);
        } else {
            setIsEnable(true);
            setIsPlaceLinkValid(true);
        }
        setPlaceLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({
            placename: placeName,
            placelink: placeLink
        });
    }

    return (
        <PopupWithForm name="photo-adding-form" title="Новое место" value="Создать"
                       isOpened={isOpened}
                       onClose={onClose}
                       onSubmit={handleSubmit}
                       isLoading={isLoading}
                       isEnable={isEnable}
                       isPlaceNameValid={isPlaceNameValid}
                       isPlaceLinkValid={isPlaceLinkValid}>
            <fieldset className="popup__fields">
                <input className={`popup__field popup__placename ${!isPlaceNameValid ? 'popup__field_type_error' : ''}`}
                       placeholder="Название места"
                       value={placeName}
                       onChange={(e) => (handlePlaceNameChange(e))}
                       type="text"
                       required
                       minLength="2"
                       maxLength="40"/>
                <span className={`popup__input-error-message ${!isPlaceNameValid ? 'popup__input-error-message_active' : ''}`}>Как называется место?</span>
                <input className={`popup__field popup__placelink ${!isPlaceLinkValid ? 'popup__field_type_error' : ''}`}
                       placeholder="Ссылка на картинку"
                       value={placeLink}
                       onChange={(e) => (handlePlaceLinkChange(e))}
                       type="url"
                       required/>
                <span className={`popup__input-error-message ${!isPlaceLinkValid ? 'popup__input-error-message_active' : ''}`}>Здесь должна быть ссылка</span>
            </fieldset>
        </PopupWithForm>
    );
}

export default AddPlacePopup;