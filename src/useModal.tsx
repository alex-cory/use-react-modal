import React, { useRef, useCallback, useContext, MutableRefObject } from 'react'
import UseModalContext from './UseModalContext'
import usePortal from 'react-useportal'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import { parseCSSText } from './utils'
import useSSR from 'use-ssr'

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

const modalStyles = `
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  z-index: 1000;
`


export const useModal = ({ onOpen, onClose, background, ...config }: UseModalArgs = defaults) => {
  const { isServer } = useSSR()
  const context = useContext(UseModalContext)
  const bg = background === null ? '' : background || context.background

  const modal = useRef() as MutableRefObject<HTMLDivElement>

  const { isOpen, togglePortal, openPortal, closePortal, Portal: Backdrop, ref } = usePortal({
    onOpen(event) {
      if (isServer) return
      disableBodyScroll(document.body)
 
      // eslint-disable-next-line no-param-reassign
      event.portal.current.style.cssText = `
        position: absolute;
        background: ${bg ? bg : 'transparent'};
        width: 100vw;
        height: 100vh;
        top: ${window.scrollY}px;
        left: 0;
        z-index: 1000;
      `

      if (onOpen) onOpen(event)
    },
    onClose(event) {
      if (isServer) return
      enableBodyScroll(document.body)
 
      // eslint-disable-next-line no-param-reassign
      event.portal.current.removeAttribute('style')
      if (onClose) onClose(event)
    },
    onPortalClick({ target }) {
      const clickingOutsideModal = modal && modal.current && !modal.current.contains(target as Node)
      if (clickingOutsideModal) closePortal()
    },
    ...config
  })

  const ModalWithBackdrop = useCallback((props: any) => (
    <Backdrop>
      <div ref={modal} style={parseCSSText(modalStyles)} {...props} />
    </Backdrop>
  ), [modalStyles])

  // you cannot spread in this because it will give different values for ModalWithBackdrop
  // when doing array vs object destructuring
  return Object.assign([openPortal, closePortal, isOpen, ModalWithBackdrop, togglePortal, modal, ref], {
    Modal: ModalWithBackdrop,
    toggleModal: togglePortal,
    openModal: openPortal,
    closeModal: closePortal,
    isOpen,
    backdropRef: ref,
    modalRef: modal,
  })
}

export default useModal
