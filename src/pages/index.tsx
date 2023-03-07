import { useLiveQuery } from 'dexie-react-hooks'
import { HeadFC, Link, PageProps, graphql } from 'gatsby'
import * as React from 'react'

import { MapController } from '../components/MapLoader/MapController'
import { MapGrid, MapGridHeader, MapGridWrapper, ModuleMeta } from '../components/MapLoader/MapLoader.styles'
import { db } from '../components/db'
import Layout from '../components/layout'
import SEO from '../components/seo'
import { DistrictrMapProps } from '../components/utils/types'

type DataProps = {
  site: {
    buildTime: string
  }
}

const HomePage: React.FC<PageProps<DataProps>> = ({ data, location }) => {
  const [loading, setLoading] = React.useState(true)
  const [userMaps, setUserMaps] = React.useState<DistrictrMapProps[]>([])

  const savedMaps = useLiveQuery(async () => {
    const maps = await db.userMaps.orderBy('dateModified').toArray()
    if (maps.length > 0) {
      setLoading(false)
      return maps
    } else {
      setLoading(false)
      return []
    }
  }, [])

  React.useEffect(() => {
    if (savedMaps) {
      setUserMaps(savedMaps)
      setLoading(false)
    }
  }, [savedMaps])

  return (
    <Layout>
      <h1>Districtr Home Page</h1>
      <ul>
        <li>
          <Link to="map/maryland/md-state-style">Maryland (Block Groups)</Link>
          <p>Testing tilesets for a full state.</p>
        </li>
        <li>
          <Link to="map/california/la-county-style">LA County Map Test (Block Groups)</Link>
          <p>
            This map test using the updated Districtr Mapbox style and newly formatted vector tilesets. Draw by block
            groups.
          </p>
          <p>In this map between Zoom 0 and 12 Blocks are shown as Block Groups. At Zoom 12 Census Blocks fade in.</p>
        </li>
        <li>
          <Link to="map/california/la-county-style-2">LA County Map Test (Blocks)</Link>
          <p>
            Same as above but the drawing units are blocks. In this mode, drawing by blocks will eventually be disabled
            under Zoom 12. A message should tell users to zoom in to draw by blocks.
          </p>
          <p>
            For now, if you draw on the map in Zoom 0-12, you will be drawing block groups. From Zoom 12-22 the block
            groups that have been drawn are replaced by blocks.
          </p>
        </li>
      </ul>
      <h5>
        These maps below use old Districtr data, formatting, and styling. They should remain functional but for the
        latest appearence and features see the LA County Tests.
      </h5>
      <ul>
        <li>
          <Link to="/national">National County Map Test</Link>
        </li>
        <li>
          <Link to="/states">State Directory</Link>
        </li>
        <li>
          <Link to="/help">Help Center</Link>
        </li>
      </ul>
      <div>
        {userMaps.length > 0 && (
          <MapGridWrapper>
            <MapGridHeader>
              You have previously saved work on this module. Select a map from below to resume where you left off.
            </MapGridHeader>
            <MapGrid>
              {userMaps?.map((map, i) => (
                <MapController key={i} map={map} setUserMaps={setUserMaps} userMaps={userMaps} />
              ))}
            </MapGrid>

            <ModuleMeta>
              [Checkbox] Check this box if you are using a public computer. To save your work, download the block
              assignment file and upload it when you return.
            </ModuleMeta>
          </MapGridWrapper>
        )}
      </div>
    </Layout>
  )
}

export const Head: HeadFC = () => (
  <SEO title="Home Page" description="The open-source web app for drawing districting plans." />
)

export default HomePage

export const query = graphql`
  {
    site {
      buildTime(formatString: "YYYY-MM-DD hh:mm a z")
    }
  }
`
