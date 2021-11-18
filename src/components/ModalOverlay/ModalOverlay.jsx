import React from "react";
import ReactDOM from "react-dom";
import { modalContainer } from "../../utils/constants";
import Modal from "../Modal/Modal";
import ModalOverlayStyles from "./ModalOverlay.module.css";

function ModalOverlay ({overlayRef}) {

  return (
    <div className={ModalOverlayStyles.modalOverlay} ref={overlayRef}></div>
  )
}

export default ModalOverlay
