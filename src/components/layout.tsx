import '@districtr/districtr-mapbox-gl/build/index.css'
import { graphql, useStaticQuery } from 'gatsby'
import * as React from 'react'

import Header from './header'
import './layout.css'

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <div
        style={{
          margin: `0 auto`,
          width: `100%`,
          maxWidth: `var(--size-content)`,
          padding: `var(--size-gutter)`
        }}
      >
        <main>{children}</main>
      </div>
    </>
  )
}

export default Layout

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
