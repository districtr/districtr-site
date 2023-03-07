import { Link } from 'gatsby'
import * as React from 'react'
import styled from 'styled-components'

import Logo from '../images/svg/districtr-logo.svg'

interface HeaderProps {
  siteTitle: string
}

const LogoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 40px;
  margin: 0;
  padding: 0;

  svg {
    height: 43px;
    width: 48px;

    .logoText {
      display: none;
    }
  }

  @media (min-width: 768px) {
    svg {
      height: 43px;
      width: 143px;

      .logoText {
        display: block;
      }
    }
  }
`

const Header: React.FC<HeaderProps> = ({ siteTitle }) => (
  <header
    style={{
      margin: `0 auto`,
      padding: `10px 15px`,
      display: `flex`,
      alignItems: `center`,
      justifyContent: `space-between`,
      height: `10vh`,
      width: `100%`,
      maxWidth: `960px`
    }}
  >
    <Link to="/">
      <LogoWrapper>
        <Logo />
      </LogoWrapper>
    </Link>
  </header>
)

export default Header
