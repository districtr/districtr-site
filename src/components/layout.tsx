import 'districtr-mapbox-gl/build/districtr-mapbox-gl.css'
import { graphql, useStaticQuery } from 'gatsby'
import * as React from 'react'

import ThemeProvider from '../theme'
import Header from './header'

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
    <ThemeProvider>
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <div
        style={{
          margin: `0 auto`,
          width: `100%`,
          maxWidth: `960px`,
          padding: `15px`
        }}
      >
        <main>{children}</main>
      </div>
    </ThemeProvider>
  )
}

export default Layout
