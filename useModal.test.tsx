import React, { ReactNode, ReactElement } from 'react'
import useModal, { Provider } from './src'
import { renderHook } from '@testing-library/react-hooks'

describe('useModal', () => {
  it('should not be open', () => {
    const wrapper = ({ children }: { children?: ReactNode }): ReactElement => {
      return <Provider background='rgba(0, 0, 0, 0.5)'>{children as ReactElement}</Provider>
    }
    expect(useModal).toBeDefined()
    const { result } = renderHook(() => useModal(), {
      wrapper
    })
    const { isOpen } = result.current
    expect(isOpen).toBe(false)
  })
})