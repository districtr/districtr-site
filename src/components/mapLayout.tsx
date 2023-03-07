import { Button } from 'districtr-mapbox-gl'
//import 'districtr-mapbox-gl/build/districtr-mapbox-gl.css'
import * as React from 'react'
import styled from 'styled-components'

import ThemeProvider from '../theme'

const MainContainer = styled.main`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`

const MapLayout = ({ children }) => {
  return (
    <ThemeProvider>
      <MainContainer>{children}</MainContainer>
    </ThemeProvider>
  )
}

export default MapLayout

export const Head = () => (
  <>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap"
      rel="stylesheet"
    />
  </>
)
