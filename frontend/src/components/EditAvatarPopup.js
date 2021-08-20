import React from 'react';
import PopupWithForm from './PopupWithForm'

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault()
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }
  return (
    <PopupWithForm
      isOpen={isOpen}
      name="edit-avatar"
      title="Обновить аватар"
      onClose={onClose}
      onSubmit={handleSubmit}
      button={"Сохранить"}>
      <input
        className="popup__input popup__input_avatar-link"
        placeholder="Ссылка на картинку"
        type="url"
        name="avatar"
        ref={avatarRef}
        id="popup__avatar" required
      />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;