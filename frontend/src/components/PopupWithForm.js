import React from 'react';

function PopupWithForm ({name, title, value, children, isOpened, onClose, onSubmit, isLoading, isEnable}) {
    return (
                <section className={`popup popup_${name} ${isOpened ? 'popup_opened' : ''}`}>
                    <form className="popup__container" name={name} onSubmit={onSubmit}>
                        <h2 className="popup__title">{title}</h2>
                        {children}
                        <button className={`popup__submitbtn ${!isEnable ? 'popup__submitbtn_disabled' : ''}`} disabled={!isEnable} type="submit" value={value}>{isLoading ? "Подождите..." : value}</button>
                        <button className="popup__closebtn" type="button" onClick={onClose}></button>
                    </form>
                </section>
        );
}

export default PopupWithForm;