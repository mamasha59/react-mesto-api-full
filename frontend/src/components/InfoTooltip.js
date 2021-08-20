import err from '../images/Err.svg';
import ok from '../images/Ok.svg';
function InfoTooltip(props) {
    return (
        <div className={`popup ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container popup__container_registr">
                <button onClick={props.onClose} type="button" className="popup__close"></button>
                <div className="popup__card">
                    <img src={props.isOk ? ok : err} alt={props.isOk ? ok : err} className="popup__response" />
                    <p className="popup__response-text">{props.isOk ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</p>
                </div>
            </div>
        </div>
    )
}
export default InfoTooltip;