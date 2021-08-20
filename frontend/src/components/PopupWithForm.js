function PopupWithForm(props) { //---общий макет попапа
    return (
    <>
        <div className={`popup popup_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
        <div className="popup__container">
          <h3 className="popup__title">{props.title}</h3>
          <button aria-label="закрыть" type="button" className="popup__close" onClick={props.onClose}>
          </button>
          <form name={props.name}
          
          onSubmit={props.onSubmit}
          className="popup__forms"
         >
        
           {props.children}
           
            <button aria-label="сохранить" type="submit" className="popup__button">{props.button}</button>
          </form>
        </div>
      </div>
      </>
    );
}

export default PopupWithForm;