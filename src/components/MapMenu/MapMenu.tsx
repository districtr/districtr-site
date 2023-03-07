import { Button } from 'districtr-mapbox-gl'
import React from 'react'
import { BiCloudUpload, BiExport, BiImport, BiSave, BiUpload } from 'react-icons/bi'

import './MapMenu.css'
import { MapMenuProps } from './MapMenu.types'

const MapMenu: React.FC<MapMenuProps> = ({ menuOpen, setMenuOpen }) => {
  return (
    <div className={menuOpen ? 'districtr-menu-overlay districtr-menu-overlay--active' : 'districtr-menu-overlay'}>
      <div className="districtr-menu-overlay-content">
        <div className="districtr-menu-overlay-content-header">
          <h2>Menu</h2>
          <Button variant="secondary" onClick={() => setMenuOpen(!menuOpen)}>
            Close
          </Button>
        </div>
        <div className="districtr-menu-overlay-content-body">
          <ul className="districtr-menu-overlay-content-body-list">
            <li className="districtr-menu-overlay-content-body-list-item">
              <Button variant="primary" onClick={() => alert('Publishing')}>
                <BiCloudUpload />
                &nbsp;Publish
              </Button>
            </li>
            <li className="districtr-menu-overlay-content-body-list-item">
              <Button variant="primary" onClick={() => alert('Saving')}>
                <BiSave />
                &nbsp;Save
              </Button>
            </li>
            <li className="districtr-menu-overlay-content-body-list-item">
              <Button variant="primary" onClick={() => alert('Loading')}>
                <BiUpload />
                &nbsp;Load
              </Button>
            </li>
            <li className="districtr-menu-overlay-content-body-list-item">
              <Button variant="primary" onClick={() => alert('Exporting')}>
                <BiExport />
                &nbsp;Export
              </Button>
            </li>
            <li className="districtr-menu-overlay-content-body-list-item">
              <Button variant="primary" onClick={() => alert('Importing')}>
                <BiImport />
                &nbsp;Import
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default MapMenu
