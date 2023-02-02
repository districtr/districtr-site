/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */
import '@districtr/districtr-mapbox-gl/build/districtr-mapbox-gl.css'
import * as React from 'react'

import './layout.css'

const MapLayout = ({ children }) => {
  return (
    <>
      <main
        style={{
          width: '100%',
          height: '100%',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1
        }}
      >
        {children}
      </main>
    </>
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
