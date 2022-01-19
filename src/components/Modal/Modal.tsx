import { FC, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from 'components/ModalOverlay/ModalOverlay';
import { modalContainer } from 'utils/constants';
import { IModalProps } from 'services/types/data';
import ModalStyle from './Modal.module.css';

export const Modal: FC<IModalProps> = ({ children, handleCloseModal }) => {

  const overlayRef = useRef<HTMLDivElement>(null);

  //Установить и удалить слушатель на нажатие Esc.
  useEffect(() => {

    // Закрыть модальное окно по нажатию Escape.
    const handleCloseEsc = (evt: KeyboardEvent) => {
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
    const handleCloseOverlay = (evt: MouseEvent) => {
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

export default Modal
