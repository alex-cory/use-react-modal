import React, { useRef, useCallback, useContext } from 'react'
import UseModalContext from './UseModalContext'
import usePortal from 'react-useportal'
import { parseCSSText } from './utils'

type UseModalArgs = {
 onOpen: any,
 onClose: any,
 background: string,
}

const defaults = {
  onOpen() {},
  onClose() {},
  background: ''
}

export const useModal = ({ onOpen, onClose, background, ...config }: UseModalArgs = defaults) => {
  const context = useContext(UseModalContext)
  const modalStyle = `
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    z-index: 1000;
  `;

  const backgroundStyle = `
    position: absolute;
    background: ${background || context.background || 'transparent'};
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 1000;
  `;

  const modal = useRef();

  const { isOpen, togglePortal, openPortal, closePortal, Portal } = usePortal({
    onOpen(event) {
      const { portal } = event;
      // eslint-disable-next-line no-param-reassign
      portal.current.style.cssText = background ? backgroundStyle : modalStyle;
      if (onOpen) onOpen(event);
    },
    onClose(event) {
      const { portal } = event;
      // eslint-disable-next-line no-param-reassign
      portal.current.removeAttribute('style');
      if (onClose) onClose(event);
    },
    onPortalClick({ target }) {
      const clickingOutsideModal =
        modal && modal.current && !(modal.current as HTMLElement).contains(target as Node);
      if (clickingOutsideModal) closePortal();
    },
    ...config
  });

  const ModalWithBackground = useCallback(
    ({ children }) => (
      <Portal>
        <div ref={modal} style={parseCSSText(modalStyle)}>
          {children}
        </div>
      </Portal>
    ),
    [modalStyle]
  );

  const Modal = background ? ModalWithBackground : Portal;

  return Object.assign([openPortal, closePortal, isOpen, Modal, togglePortal], {
    Modal,
    toggleModal: togglePortal,
    openModal: openPortal,
    closeModal: closePortal,
    isOpen
  });
};

export default useModal;
