import ModalOverlay from "components/ModalOverlay/ModalOverlay";
import PreloaderStyle from './Preloader.module.css';

export default function Preloader() {
  return (
    <ModalOverlay>
      <div className={`${PreloaderStyle['preloader']}`}></div>
    </ModalOverlay>
  )
}
