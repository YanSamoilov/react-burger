import ModalOverlayStyles from './ModalOverlay.module.css';

function ModalOverlay ({ children, overlayRef }: {overlayRef?: React.RefObject<HTMLDivElement>; children?:React.ReactNode}) {

  return (
    <div className={ModalOverlayStyles.modalOverlay} ref={overlayRef}>
      {children}
    </div>
  )
}

export default ModalOverlay
