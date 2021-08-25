import React from 'react';

import PopupWithForm from './PopupWithForm';

function ApproveDeleteCardPopup(props) {
  const { card, isOpen, onClose, onApproveDelition } = props;
  const [buttonText, setButtonText] = React.useState('Да');

  React.useEffect(() => {
    resetButtonText();
  }, [isOpen]);

  // Функции для изменения текста на кнопке отправки
  function changeButtonText() {
    setButtonText('Удаление...');
  }

  function resetButtonText() {
    setButtonText('Да');
  }

  // Обработчик отправки данных
  function handleSubmit(e) {
    e.preventDefault();
    changeButtonText();

    onApproveDelition(card);
  }

  return (
    <PopupWithForm isOpen={isOpen} name="delition" onClose={onClose} title="Вы уверены?" buttonText={buttonText} onSubmit={handleSubmit}/>
  )
}

export default ApproveDeleteCardPopup;