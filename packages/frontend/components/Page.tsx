import React from 'react'
import styled from '../utils/styled'
import { ThemeProvider } from 'emotion-theming'
import theme from '../utils/theme'

import Header from './Header'
import Meta from './Meta'
import Normalize from './Normalize'

const StyledPage = styled.div(({ theme: { colors } }) => ({
  background: 'white',
  color: colors.text,
}))

interface Props {
  children: React.ReactNode
}

export default ({ children }: Props) => {
  return (
    <ThemeProvider theme={theme}>
      <Normalize />
      <StyledPage>
        <Meta />
        <Header />
        {children}
      </StyledPage>
    </ThemeProvider>
  )
}
