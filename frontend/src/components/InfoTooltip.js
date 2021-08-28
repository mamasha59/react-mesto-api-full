import React from 'react';
import success from "../images/success.svg";
import fail from "../images/fail.svg";

function InfoTooltip ({name, isSuccess, isFail, onClose}) {
    const successMessage = "Вы успешно зарегистрировались";
    const failMessage = "Что-то пошло не так! Попробуйте ещё раз.";

    return (
        <section className={`popup popup_${name} ${isSuccess || isFail? 'popup_opened' : ''}`}>
            <figure className="popup__container">
                <button className="popup__closebtn" type="button" onClick={onClose}></button>
                <div className="popup__icon-group">
                    <img
                        className="popup__icon"
                        src={isSuccess ? success : fail}
                        alt={isSuccess ? successMessage : failMessage}/>
                    <figcaption className="popup__icon-title">
                        {isSuccess ? successMessage : failMessage}
                    </figcaption>
                </div>
            </figure>
        </section>
    );

}

export default InfoTooltip;