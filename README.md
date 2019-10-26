<p style="text-align: center;" align="center">
    <h1 align="center">useModal</h1>
</p>
<p align="center">🖼 React hook for Modals</p>
<p align="center">
    <a href="https://github.com/alex-cory/use-react-modal/pulls">
      <img src="https://camo.githubusercontent.com/d4e0f63e9613ee474a7dfdc23c240b9795712c96/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f5052732d77656c636f6d652d627269676874677265656e2e737667" />
    </a>
    <a href="https://lgtm.com/projects/g/alex-cory/react-useportal/context:javascript">
      <img alt="undefined" src="https://img.shields.io/lgtm/grade/javascript/g/alex-cory/react-useportal.svg?logo=lgtm&logoWidth=18"/>
    </a>
    <a href="https://www.npmjs.com/package/use-react-modal">
        <img src="https://img.shields.io/npm/dt/use-react-modal.svg" />
    </a>
    <a href="https://bundlephobia.com/result?p=use-react-modal">
      <img alt="undefined" src="https://img.shields.io/bundlephobia/minzip/use-react-modal.svg">
    </a>
    <a href="https://greenkeeper.io/">
      <img src="https://badges.greenkeeper.io/alex-cory/use-react-modal.svg">
    </a>
    <a href="https://circleci.com/gh/alex-cory/use-react-modal">
      <img src="https://img.shields.io/circleci/project/github/alex-cory/use-react-modal/master.svg" />
    <a href="https://codeclimate.com/github/alex-cory/use-react-modal/maintainability">
      <img src="https://api.codeclimate.com/v1/badges/609840b6dc914e035d15/maintainability" />
    </a>
    <a href="https://github.com/alex-cory/use-react-modal/blob/master/license.md">
      <img alt="undefined" src="https://img.shields.io/github/license/alex-cory/use-react-modal.svg">
    </a>
    <a href="https://snyk.io/test/github/alex-cory/use-react-modal?targetFile=package.json">
      <img src="https://snyk.io/test/github/alex-cory/use-react-modal/badge.svg?targetFile=package.json" alt="Known Vulnerabilities" data-canonical-src="https://snyk.io/test/github/alex-cory/use-react-modal?targetFile=package.json" style="max-width:100%;">
    </a>
    <a href="https://www.npmjs.com/package/use-react-modal">
      <img src="https://img.shields.io/npm/v/use-react-modal.svg" alt="Known Vulnerabilities" data-canonical-src="https://snyk.io/test/github/alex-cory/use-react-modal?targetFile=package.json" style="max-width:100%;">
    </a>
</p>

Simple, lightweight hook for Modals/Dialogs.

This hook is also isomorphic, meaning it works with SSR (server side rendering).

<p align="center">
  <a href="https://github.com/alex-cory/react-useportal">
    <img src="https://github.com/alex-cory/react-useportal/raw/master/usePortal.gif" />
  </a>
</p>

Features
--------
- SSR (server side rendering) support
- TypeScript support
- 2 dependencies ([use-ssr](https://github.com/alex-cory/use-ssr), [react-useportal](https://github.com/alex-cory/use-ssr))
- Built in state

### Examples
- [Example](https://codesandbox.io/s/usemodal-dj3du)

Installation
------------

```shell
yarn add use-react-modal      or     npm i -S use-react-modal
```

Usage
-----

### Basic Usage

```jsx 
import useModal from 'use-react-modal'

const App = () => {
  const { isOpen, openModal, closeModal, Modal } = useModal()

  return (
    <>
      <button onClick={openModal}>Open Me!</button>
      {isOpen && (
        <Modal>
          <button onClick={closeModal}>close</button>
          Whatever you put here will be centered to the middle of the screen.
        </Modal>
      )
    </>
  )
}
```

### With Provider
```jsx 
import useModal from 'use-react-modal'

const App = () => {
  const { isOpen, openModal, closeModal, Modal } = useModal()

  return (
    <>
      {isOpen && (
        <Modal>
          Now, whatever you put here will be centered AND have a backdrop
          with the color specified in the Provider
        </Modal>
      )
    </>
  )
}


const App = () => (
  <Provider background='rgba(0, 0, 0, 0.5)'>
    This text is portaled into San Francisco!
  </Portal>
)
```

### Customizing the Portal directly
By using `onOpen`, `onClose` or any other event handler, you can modify the `Portal` and return it. See [useDropdown](https://codesandbox.io/s/useportal-usedropdown-587fo) for a working example. It's important that you pass the `event` object to `openPortal` and `togglePortal` otherwise you will need to attach a `ref` to the clicked element.

```jsx
import useModal from 'use-react-modal'

const useModal = () => {
  const { isOpen, togglePortal, closePortal, Portal } = usePortal({
    onOpen({ portal }) {
      portal.current.style.cssText = `
        /* add your css here for the Portal */
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        z-index: 1000;
      `
    }
  })

  return {
    Modal: Portal,
    toggleModal: togglePortal,
    closeModal: closePortal,
    isOpen
  }
}

const App = () => {
  const { openModal, closeModal, isOpen, Modal } = useModal()
  
  return <>
    <button onClick={e => openModal(e)}>Open Modal<button>
    {isOpen && (
      <Modal>
        This will dynamically center to the middle of the screen regardless of the size of what you put in here
      </Modal>
    )}
  </>
}
```

**Make sure you are passing the html synthetic event to the `openModal` and `toggleModal` . i.e. `onClick={e => openModal(e)}`**

### Usage with a `ref`
If for some reason, you don't want to pass around the `event` to `openModal` or `toggleModal`, you can use a `ref` like this.
```jsx
import useModal from 'use-react-modal'

const App = () => {
  const { ref, openModal, closeModal, isOpen, Modal } = useModal()

  return (
    <>
      {/* see below how I don't have to pass the event if I use the ref */}
      <button ref={ref} onClick={() => openModal()}>
        Open Modal
      </button>
      {isOpen && (
        <Modal>
          <p>
            <button onClick={closePortal}>Close me!</button>, hit ESC or
            Cool Modal 😜
          </p>
        </Modal>
      )}
    </>
  )
}
```

Options
-----
| Option                | Description                                                                              |
| --------------------- | ---------------------------------------------------------------------------------------- |
| `background` | sets the color of the backdrop, if nothing is set, there will be no backdrop |
| `closeOnOutsideClick` | This will close the modal when not clicking within the modal. Default is `true` |
| `closeOnEsc`   | This will allow you to hit ESC and it will close the modal. Default is `true`    |
| `bindTo` | This is the DOM node you want to attach the modal to. By default it attaches to `document.body` |
| `isOpen` | This will be the default for the modal being open or closed. Default is `false` |
| `onOpen` | This is used to call something when the modal is opened |
| `onClose` | This is used to call something when the modal is closed |
| html event handlers (i.e. `onClick`) | These can be used instead of `onOpen`. |

### Option Usage

```js
const {
  openModal,
  closeModal,
  toggleModal,
  isOpen,
  Modal,
  ref, // if you don't pass an event to openModal, closeModal, or toggleModal, you will need to put this on the element you want to interact with/click
} = useModal({
  background: 'rgba(0, 0, 0, 0.5)', // sets the color of the backdrop, if nothing is set, there will be no backdrop
  closeOnOutsideClick: true,
  closeOnEsc: true,
  bindTo, // attach the portal to this node in the DOM
  isOpen: false,
  // `event` has all the fields that a normal `event` would have such as `event.target.value`, etc.
  // with the additional `portal` and `targetEl` added to it as seen in the examples below
  onOpen: (event) => {
    // can access: event.portal, event.targetEl, event.event, event.target, etc.
  },
  // `onClose` will not have an `event` unless you pass an `event` to `closePortal`
  onClose({ targetEl, event, portal }) {},
  // `targetEl` is the element that you either are attaching a `ref` to
  // or that you are putting `openPortal` or `togglePortal` or `closePortal` on

  // in addition, any event handler such as onClick, onMouseOver, etc will be handled the same
  onClick({ targetEl, event, portal }) {}
})
```
Todos
------
- [ ] maybe disable scrolling outside of the portal when it is open?
- [ ] React Native support. [1](https://github.com/zenyr/react-native-portal) [2](https://github.com/cloudflare/react-gateway) [3](https://medium.com/@naorzruk/portals-in-react-native-22797ba8aa1b) [4](https://stackoverflow.com/questions/46505378/can-we-have-react-16-portal-functionality-react-native) [5](https://github.com/callstack/react-native-paper/blob/master/src/components/Portal/PortalManager.tsx) Probably going to have to add a `Provider`...
- [ ] add correct return types
- [ ] tests (priority)
- [ ] maybe have a `<Provider order={['Modal', 'openModal']} />` then you can change the order of the array destructuring syntax
