import { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from 'components/ModalOverlay/ModalOverlay';
import { modalContainer } from 'utils/constants';
import PropTypes from 'prop-types';
import ModalStyle from './Modal.module.css';

function Modal({ children, handleCloseModal }) {

  const overlayRef = useRef(null);

  //Установить и удалить слушатель на нажатие Esc.
  useEffect(() => {

    // Закрыть модальное окно по нажатию Escape.
    const handleCloseEsc = (evt) => {
      if (evt.key === 'Escape')
        handleCloseModal();
    };

    document.addEventListener('keydown', handleCloseEsc);

    return () => {
      document.removeEventListener('keydown', handleCloseEsc);
    }
  }, [handleCloseModal]);

  //Установить слушатель на клик вне области модального окна.
  useEffect(() => {

    // Закрыть модальное окно по нажатию overlay.
    const handleCloseOverlay = (evt) => {
      if (evt.target === overlayRef.current)
        handleCloseModal();
    };

    document.addEventListener('click', handleCloseOverlay)

    return () => {
      document.removeEventListener('click', handleCloseOverlay)
    }
  }, [handleCloseModal]);

  return ReactDOM.createPortal(
    <div className={`${ModalStyle.modal} ${ModalStyle.modal_open} `}>
      <ModalOverlay overlayRef={overlayRef} />
      <div className={ModalStyle.modal__content}>
        <button className={`${ModalStyle['modal__button-close']}`} onClick={handleCloseModal}>
          <CloseIcon type="primary" />
        </button>
        {children}
      </div>
    </div>,
    modalContainer
  )
}

Modal.propTypes = {
  children: PropTypes.node,
  handleCloseModal: PropTypes.func.isRequired
}

export default Modal
