import React, { useMemo, ReactElement, ReactChildren } from 'react'
import UseModalContext from './UseModalContext'

export const Provider = ({
  background,
  // animations, // in the future 😘
  children,
}: any): ReactElement => {
  const defaults = useMemo(
    (): any => ({
      background: '',
    }),
    [background],
  )

  return (
    <UseModalContext.Provider value={defaults}>{children}</UseModalContext.Provider>
  )
}
