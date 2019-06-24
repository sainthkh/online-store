import React from 'react';
import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming';
import theme from './theme';

export default ({ children }: { children: React.ReactNode }) => (
  <EmotionThemeProvider theme={theme}>
    {children}
  </EmotionThemeProvider>
)