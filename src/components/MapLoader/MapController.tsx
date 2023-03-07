import React from 'react'
import TimeAgo from 'react-timeago'

import Button from '../Button'
import { db } from '../db'
import {
  MapGridItem,
  MapInfo,
  MapMeta,
  MapScreenshot,
  MapScreenshotWrapper,
  MapStatus,
  MapTitle
} from './MapLoader.styles'
import { MapControllerProps } from './MapLoader.types'

export const MapController: React.FC<MapControllerProps> = ({ map, setUserMapId, setUserMaps, userMaps }) => {
  const [mapId, setMapId] = React.useState(map.id)
  const [parentLink, setParentLink] = React.useState('')

  React.useEffect(() => {
    setMapId(mapId)
  }, [map])

  const handleResume = () => {
    if (setUserMapId) {
      console.log('Resuming Map')
      setUserMapId(mapId)
    }
  }

  const deleteMap = async () => {
    await db.userMaps.delete(mapId)
    setUserMaps(userMaps.filter((m) => m.id !== mapId))
  }

  return (
    <MapGridItem>
      <MapScreenshotWrapper>
        <MapScreenshot src={map.image || 'https://dummyimage.com/200x200/000/fff'} alt={map.name} />
      </MapScreenshotWrapper>
      <MapStatus>
        <div>{map.live ? 'Published' : 'Draft'}</div>
        <div>
          <em>
            <TimeAgo date={`${map.dateModified}`} />
          </em>
        </div>
      </MapStatus>
      <MapInfo>
        <div>
          <MapTitle>{map.name}</MapTitle>
        </div>
      </MapInfo>
      <div className="resume-button">
        {map && setUserMapId && (
          <Button fullWidth={true} onClick={() => handleResume()}>
            Resume
          </Button>
        )}

        {map && !setUserMapId && (
          <Button fullWidth={true} href={`/map/${map.problem.parent.meta.slug}/${map.problem.meta.slug}`}>
            Go to Map
          </Button>
        )}
      </div>
      <div className="delete-button">
        <Button variant={'text'} fullWidth={true} onClick={() => deleteMap()} style={{ color: '#802800' }}>
          Delete
        </Button>
      </div>
    </MapGridItem>
  )
}
