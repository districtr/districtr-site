import { UnitConfigProps } from 'districtr-mapbox-gl/build/Districtr/Districtr.types'

import { ProblemProps } from '../utils/types'

export interface MapLoaderProps {
  problem: ProblemProps
  userMapId: number | boolean
  setUserMapId: (id: number | boolean) => void
  units: UnitConfigProps[]
  saveEnabled: boolean
  setLoaderOpen: (open: boolean) => void
}

export interface MapControllerProps {
  map: any
  setUserMaps: (maps: any) => void
  setUserMapId?: (id: number | boolean) => void
  userMaps: any
}
