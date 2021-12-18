import { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from 'components/ModalOverlay/ModalOverlay';
import { modalContainer } from 'utils/constants';
import PropTypes from 'prop-types';
import ModalStyle from './Modal.module.css';

function Modal(props) {

  const overlayRef = useRef(null);

  // Закрыть модальное окно по нажатию Escape.
  const handleCloseEsc = (evt) => {
    if (evt.key === 'Escape')
      props.handleCloseModal();
  };

  // Закрыть модальное окно по нажатию overlay.
  const handleCloseOverlay = (evt) => {
    if (evt.target === overlayRef.current)
      props.handleCloseModal();
  };

  //Установить и удалить слушатель на нажатие Esc.
  useEffect(() => {
    document.addEventListener('keydown', handleCloseEsc);

    return () => {
      document.removeEventListener('keydown', handleCloseEsc);
    }
  }, []);

  //Установить слушатель на клик вне области модального окна.
  useEffect(() => {
    document.addEventListener('click', handleCloseOverlay)

    return () => {
      document.removeEventListener('click', handleCloseOverlay)
    }
  });

  return ReactDOM.createPortal(
    <div className={`${ModalStyle.modal} ${ModalStyle.modal_open} `}>
      <ModalOverlay overlayRef={overlayRef} />
      <div className={ModalStyle.modal__content}>
        <button className={`${ModalStyle['modal__button-close']}`} onClick={props.handleCloseModal}>
          <CloseIcon type="primary" />
        </button>
        {props.children}
      </div>
    </div>,
    modalContainer
  )
}

Modal.propTypes = {
  ingridient: PropTypes.func
}

export default Modal
