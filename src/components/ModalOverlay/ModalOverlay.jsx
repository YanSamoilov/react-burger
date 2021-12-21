import ModalOverlayStyles from './ModalOverlay.module.css';

function ModalOverlay ({overlayRef}) {

  return (
    <div className={ModalOverlayStyles.modalOverlay} ref={overlayRef}></div>
  )
}

export default ModalOverlay
