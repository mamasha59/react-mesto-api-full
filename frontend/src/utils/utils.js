export const containerElements = '.elements';
export const popupForm = '.popup__form';
export const popupPreview = document.querySelector('.popup-preview');
export const previewImagePicture = popupPreview.querySelector('.popup__image');
export const previewTitle = popupPreview.querySelector('.popup__preview-title');
export const userName = document.querySelector('.profile__name');
export const userJob = document.querySelector('.profile__profession');
export const popupPlace = document.querySelector('.popup-place');
export const addButton = document.querySelector('.profile__add-button');
export const popupUserData = document.querySelector('.popup-user');
export const openButton = document.querySelector('.profile__edit-button');
export const avatarButton = document.querySelector('.profile__avatar-edit');
export const popupAvatar = document.querySelector('.popup-avatar');
export const imgAvatar = document.querySelector('.profile__avatar');
export const popupDeleteCard = document.querySelector('.popup-delete-card');

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};
