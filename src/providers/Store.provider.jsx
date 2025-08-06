'use client'

import { Provider } from 'react-redux'
import store from 'lib/store.global'
import { memo } from 'react'

const ReduxProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>
}

export default memo(ReduxProvider)
