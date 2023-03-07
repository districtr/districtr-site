import * as React from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'

import Normalize from './normalize'
import Root from './root'

const colors = {
  cream: '#F7F5ED',
  white: '#FFFFFF',
  black: '#000000',
  gray: {
    100: '#fafafa',
    200: '#e4e4e4',
    300: '#c9c9c9',
    400: '#b1b1b1',
    500: '#808080',
    600: '#666666',
    700: '#4d4d4d',
    800: '#333333',
    900: '#242424'
  },
  green: {
    100: '#CFFAD4',
    200: '#BDE4C2',
    300: '#A7C9AB',
    400: '#839E86',
    500: '#6A806C',
    600: '#556657',
    700: '#3F4D41',
    800: '#2A332B',
    900: '#1E241E'
  },
  red: {
    100: '#FA4F00',
    200: '#E44800',
    300: '#C94000',
    400: '#9E3200',
    500: '#802800',
    600: '#662000',
    700: '#4D1800',
    800: '#331000',
    900: '#240B00'
  }
}

const spacing = {
  xs: '10px',
  sm: '16px',
  md: '25px',
  lg: '45px',
  xl: '70px'
}

const shapes = {
  borderRadius: {
    sm: '5px',
    md: '8px',
    lg: '13px'
  },
  sizes: {
    widths: {
      xs: '100px',
      sm: '160px',
      md: '260px',
      lg: '425px',
      xl: '685px'
    },
    heights: {
      xs: '100px',
      sm: '160px',
      md: '260px',
      lg: '425px',
      xl: '685px'
    }
  }
}

const media = {
  width: {
    xs: '320px',
    sm: '480px',
    md: '768px',
    lg: '1024px',
    xl: '1280px'
  },
  height: {
    xs: '480px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px'
  },
  minWidth: {
    xs: '(min-width: 320px)',
    sm: '(min-width: 480px)',
    md: '(min-width: 768px)',
    lg: '(min-width: 1024px)',
    xl: '(min-width: 1280px)'
  },
  orientation: {
    portrait: 'portrait',
    landscape: 'landscape'
  }
}

const type = {
  baseFontSize: '16px',
  baseLineHeight: '1.4',
  fontFamily: {
    secondary: 'malaga, serif',
    primary: `source-sans-3`
  },
  fontSize: {
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '20px',
    p: '1rem', // typescale.com: Minor Third
    h6: '0.833rem',
    h5: '1rem',
    h4: '1.44rem',
    h3: '1.728rem',
    h2: '2.074rem',
    h1: '2.488rem'
  },
  fontWeight: {
    100: '100',
    200: '200',
    300: '300',
    400: '400',
    500: '500',
    600: '600',
    700: '700',
    800: '800',
    900: '900'
  },
  lineHeight: {
    xs: '1.1',
    sm: '1.2',
    md: '1.4',
    lg: '1.68'
  }
}

const themeLight = {
  background: colors.cream,
  foreground: colors.gray[800],
  fontColor: colors.gray[800],
  borders: {
    100: `1px solid ${colors.gray[200]}`
  },
  shadows: {
    100: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    200: '0px 4px 4px rgba(0, 0, 0, 0.25)'
  },
  colors: colors,
  spacing: spacing,
  shapes: shapes,
  type: type,
  media: media
}

const themeDark = {
  background: colors.gray[800],
  foreground: colors.cream,
  fontColor: colors.white,
  borders: {
    100: `1px solid ${colors.gray[200]}`
  },
  shadows: {
    100: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    200: '0px 4px 4px rgba(0, 0, 0, 0.25)'
  },
  colors: colors,
  spacing: spacing,
  shapes: shapes,
  type: type,
  media: media
}

const theme = themeLight

const ThemeProvider = ({ children }) => {
  return (
    <StyledThemeProvider theme={theme}>
      <Normalize />
      <Root />
      {children}
    </StyledThemeProvider>
  )
}

export default ThemeProvider
