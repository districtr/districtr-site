import { useLiveQuery } from 'dexie-react-hooks'
import { Link } from 'gatsby'
import React from 'react'
import { BiChevronDown, BiChevronUp, BiCloudUpload } from 'react-icons/bi'
import { v1 as uuivV1 } from 'uuid'

import Logo from '../../images/svg/districtr-logo.svg'
import Button from '../Button'
import { db } from '../db'
import {
  LogoWrapper,
  MapHeaderContainer,
  MapMenu,
  MapTitleInput,
  MapTitleWrapper,
  MenuItem,
  MenuItems,
  ResponsiveButtonText
} from './MapHeader.styles'
import { MapHeaderProps } from './MapHeader.types'

const MapHeader: React.FC<MapHeaderProps> = ({ problem, menuOpen, setMenuOpen, children }) => {
  const [userMapTitle, setUserMapTitle] = React.useState(problem.title)
  const titleRef = React.useRef<HTMLInputElement>(null)

  return (
    <MapHeaderContainer test-id="MapHeader">
      <MenuItems>
        <MenuItem>
          <LogoWrapper>
            <Link to={`/states/${problem.parent.meta.slug}`} style={{ cursor: 'pointer', display: 'inline-flex' }}>
              <Logo />
            </Link>
          </LogoWrapper>
        </MenuItem>
        <MenuItem>
          <MapMenu>
            <MapTitleWrapper>
              <MapTitleInput
                type="text"
                ref={titleRef}
                value={userMapTitle}
                style={{ width: userMapTitle.length * 8 }}
                onChange={(e) => setUserMapTitle(e.target.value)}
              />
            </MapTitleWrapper>
            <Button
              size="large"
              variant="toggle"
              onClick={() => {
                setMenuOpen(!menuOpen)
              }}
            >
              {!menuOpen ? <BiChevronDown /> : <BiChevronUp />}
            </Button>
          </MapMenu>
        </MenuItem>
        <MenuItem>
          <Button onClick={() => alert('Publishing')}>
            <BiCloudUpload />
            <ResponsiveButtonText>&nbsp;Publish</ResponsiveButtonText>
          </Button>
        </MenuItem>
        {children}
      </MenuItems>
    </MapHeaderContainer>
  )
}

export default MapHeader
