import { useLiveQuery } from 'dexie-react-hooks'
import React from 'react'
import { BiMapAlt } from 'react-icons/bi'
import { v1 as uuivV1 } from 'uuid'

import Button from '../Button'
import { db } from '../db'
import { DistrictrMapProps } from '../utils/types'
import { MapController } from './MapController'
import {
  LoaderContainer,
  MapGrid,
  MapGridHeader,
  MapGridWrapper,
  MapWrapper,
  ModuleDescription,
  ModuleDetails,
  ModuleMeta,
  ModuleTitle
} from './MapLoader.styles'
import { MapLoaderProps } from './MapLoader.types'

const MapLoader: React.FC<MapLoaderProps> = ({
  problem,
  userMapId,
  setUserMapId,
  units,
  saveEnabled,
  setLoaderOpen,
  ...props
}) => {
  const [active, setActive] = React.useState(true)
  const [loading, setLoading] = React.useState(true)
  const [userMaps, setUserMaps] = React.useState<DistrictrMapProps[]>([])

  const savedMaps = useLiveQuery(async () => {
    const maps = await db.userMaps.where('problemId').equals(problem.id).toArray()
    if (maps.length > 0) {
      setLoading(false)
      return maps
    } else {
      setLoading(false)
      return []
    }
  }, [])

  const startNewMap = async () => {
    try {
      const map = await db.userMaps.add({
        uuid: uuivV1(),
        problemId: problem.id,
        problem: problem,
        name: problem.title,
        image: false,
        dateCreated: new Date(),
        dateModified: new Date(),
        unitAssignments: new Map(),
        unitPopulations: new Map(),
        unitColumnPopulations: new Map(),
        units: units,
        live: false
      })
      const mapData = await db.userMaps.get(map)
      return mapData
    } catch (error) {
      console.log(error)
      return false
    }
  }

  const handleNewMap = async () => {
    if (saveEnabled) {
      const map = await startNewMap()
      console.log(map)
      setUserMapId(map.id)
      setUserMaps([...userMaps, map])
    } else {
      setLoaderOpen(false)
    }
  }

  React.useEffect(() => {
    if (savedMaps) {
      setUserMaps(savedMaps)
      setLoading(false)
    }
  }, [savedMaps])

  React.useEffect(() => {
    if (active) {
      console.log('active')
    }
  }, [active])

  return (
    <LoaderContainer data-testid="MapLoader" className={loading ? 'loading' : 'loaded'}>
      <MapWrapper>
        <ModuleDetails>
          <ModuleTitle>{problem.title}</ModuleTitle>
          <ModuleDescription>
            <strong>
              Challenge: Draw {problem.unit_count} {problem.unit_name_plural} using [problem.defaultUnitBrush]
            </strong>
            <br />
            Each {problem.unit_name} should have a population of [problem.unitIdealPopulation] [if multimember 'per a
            member of the [problem.administrativeOffice]']
          </ModuleDescription>
          <Button style={{ marginTop: 10 }} onClick={() => handleNewMap()}>
            <BiMapAlt />
            &nbsp;&nbsp;Start A New Map
          </Button>
        </ModuleDetails>

        {loading && <div>Loading...</div>}

        {userMaps.length > 0 && (
          <MapGridWrapper>
            <MapGridHeader>
              You have previously saved work on this module. Select a map from below to resume where you left off.
            </MapGridHeader>
            <MapGrid>
              {userMaps?.map((map, i) => (
                <MapController
                  key={i}
                  map={map}
                  setUserMapId={setUserMapId}
                  setUserMaps={setUserMaps}
                  userMaps={userMaps}
                />
              ))}
            </MapGrid>

            <ModuleMeta>
              [Checkbox] Check this box if you are using a public computer. To save your work, download the block
              assignment file and upload it when you return.
            </ModuleMeta>
          </MapGridWrapper>
        )}
      </MapWrapper>
    </LoaderContainer>
  )
}

export default MapLoader
