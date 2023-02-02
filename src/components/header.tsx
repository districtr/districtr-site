import { Link } from 'gatsby'
import * as React from 'react'

const Header = ({ siteTitle }) => (
  <header
    style={{
      margin: `0 auto`,
      padding: `var(--space-4) var(--size-gutter)`,
      display: `flex`,
      alignItems: `center`,
      justifyContent: `space-between`,
      height: `10vh`,
      width: `100%`,
      maxWidth: `var(--size-content)`
    }}
  >
    <Link
      to="/"
      style={{
        fontSize: `var(--font-sm)`,
        textDecoration: `none`
      }}
    >
      {siteTitle}
    </Link>
  </header>
)

export default Header
