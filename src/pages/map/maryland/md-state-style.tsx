import { Button, Districtr, generateUnits } from 'districtr-mapbox-gl'
import * as React from 'react'
import { BiCloudUpload, BiExport, BiImport, BiSave, BiUpload } from 'react-icons/bi'

import MapHeader from '../../../components/MapHeader'
import MapLoader from '../../../components/MapLoader'
import { db } from '../../../components/db'
import MapLayout from '../../../components/mapLayout'
import SEO from '../../../components/seo'

const MDTestPage = () => {
  const problem = {
    id: 'md-test',
    title: 'Maryland Congressional Districts Test',
    unit_count: 8,
    unit_name: 'district',
    unit_name_plural: 'Congressional Districts',
    bounds: [
      [-79.4877, 37.9121],
      [-75.0491, 39.723]
    ],
    meta: {
      slug: 'md-state-style'
    },
    parent: {
      id: 'md',
      title: 'Maryland',
      meta: {
        slug: 'maryland'
      }
    }
  }
  const [userMapId, setUserMapId] = React.useState(null)
  const [menuOpen, setMenuOpen] = React.useState(false)
  const [loaderOpen, setLoaderOpen] = React.useState(true)
  const [mapState, setMapState] = React.useState(null)
  const [enableSave, setEnableSave] = React.useState(true)

  const interactiveLayerIds = ['Census Block Groups', 'Census Blocks']

  React.useEffect(() => {
    if (userMapId) {
      setLoaderOpen(false)

      // get the map state from the database
      db.userMaps.get(userMapId).then((map) => {
        console.log()
        setMapState({ ...map })
      })
    }
  }, [userMapId])

  React.useEffect(() => {
    if (mapState && userMapId) {
      if (mapState.image) {
        try {
          db.userMaps.update(userMapId, {
            image: mapState.image,
            style: mapState.style,
            problem: problem,
            units: mapState.units,
            unitAssignments: mapState.unitAssignments,
            unitPopulatons: mapState.unitPopulations,
            unitColumnPopulations: mapState.unitColumnPopulations,
            dateModified: new Date()
          })
        } catch (error) {
          console.log(error)
        }
      }
    }
  }, [mapState])

  const initialViewState = {
    bounds: [
      [-79.4877, 37.9121],
      [-75.0491, 39.723]
    ],
    longitude: -77.6114,
    latitude: 38.806,
    zoom: 10,
    bearing: 0,
    pitch: 0,
    padding: { top: 20, bottom: 20, left: 20, right: 20 },
    fitBoundsOptions: { padding: 20 }
  }

  const sources = []

  let layers = []

  const columnSets = {
    'Census Blocks': {
      geometryKey: 'GEOID20',
      columnSets: [
        {
          name: 'Population',
          type: 'population',
          total: {
            key: 'P2TOTPOP',
            sum: 6177224,
            name: 'Total Population'
          },
          subgroups: [
            {
              key: 'P2HISP',
              sum: 729745,
              name: 'Hispanic or Latino'
            },
            {
              key: 'P2WHITE',
              sum: 2913782,
              name: 'White Alone'
            },
            {
              key: 'P2BLACK',
              sum: 5209246,
              name: 'Black Alone'
            },
            {
              key: 'P2AIAN',
              sum: 12055,
              name: 'American Indian and Alaska Native Alone'
            },
            {
              key: 'P2ASIAN',
              sum: 417962,
              name: 'Asian Alone'
            },
            {
              key: 'P2NHPI',
              sum: 2575,
              name: 'Native Hawaiian and Other Pacific Islander Alone'
            },
            {
              key: 'P2OTHER',
              sum: 35314,
              name: 'Some other race alone'
            },
            {
              key: 'P2MULTIR',
              sum: 270764,
              name: 'Two or More Races'
            }
          ]
        },
        {
          name: 'Civilian Age Population',
          type: 'population',
          total: {
            key: 'P4TOTPOP',
            sum: 4815202,
            name: 'Total Population'
          },
          subgroups: [
            {
              key: 'P4HISP',
              sum: 492262,
              name: 'Hispanic or Latino'
            },
            {
              key: 'P4WHITE',
              sum: 2401360,
              name: 'White Alone'
            },
            {
              key: 'P4BLACK',
              sum: 1388741,
              name: 'Black Alone'
            },
            {
              key: 'P4AIAN',
              sum: 9788,
              name: 'American Indian and Alaska Native Alone'
            },
            {
              key: 'P4ASIAN',
              sum: 332666,
              name: 'Asian Alone'
            },
            {
              key: 'P4NHPI',
              sum: 2035,
              name: 'Native Hawaiian and Other Pacific Islander Alone'
            },
            {
              key: 'P4OTHER',
              sum: 23196,
              name: 'Some other race alone'
            },
            {
              key: 'P4MULTIR',
              sum: 165154,
              name: 'Two or More Races'
            }
          ]
        }
      ]
    },
    'Census Block Groups': {
      geometryKey: 'GEOID20',
      columnSets: [
        {
          name: 'Population',
          type: 'population',
          total: {
            key: 'P2TOTPOP',
            sum: 6177224,
            name: 'Total Population'
          },
          subgroups: [
            {
              key: 'P2HISP',
              sum: 729745,
              name: 'Hispanic or Latino'
            },
            {
              key: 'P2WHITE',
              sum: 2913782,
              name: 'White Alone'
            },
            {
              key: 'P2BLACK',
              sum: 1795027,
              name: 'Black Alone'
            },
            {
              key: 'P2AIAN',
              sum: 12055,
              name: 'American Indian and Alaska Native Alone'
            },
            {
              key: 'P2ASIAN',
              sum: 417962,
              name: 'Asian Alone'
            },
            {
              key: 'P2NHPI',
              sum: 2575,
              name: 'Native Hawaiian and Other Pacific Islander Alone'
            },
            {
              key: 'P2OTHER',
              sum: 35314,
              name: 'Some other race alone'
            },
            {
              key: 'P2MULTIR',
              sum: 270764,
              name: 'Two or More Races'
            }
          ]
        },
        {
          name: 'Civilian Age Population',
          type: 'population',
          total: {
            key: 'P4TOTPOP',
            sum: 4815202,
            name: 'Total Population'
          },
          subgroups: [
            {
              key: 'P4HISP',
              sum: 492262,
              name: 'Hispanic or Latino'
            },
            {
              key: 'P4WHITE',
              sum: 2401360,
              name: 'White Alone'
            },
            {
              key: 'P4BLACK',
              sum: 1388741,
              name: 'Black Alone'
            },
            {
              key: 'P4AIAN',
              sum: 9788,
              name: 'American Indian and Alaska Native Alone'
            },
            {
              key: 'P4ASIAN',
              sum: 332666,
              name: 'Asian Alone'
            },
            {
              key: 'P4NHPI',
              sum: 2035,
              name: 'Native Hawaiian and Other Pacific Islander Alone'
            },
            {
              key: 'P4OTHER',
              sum: 23196,
              name: 'Some other race alone'
            },
            {
              key: 'P4MULTIR',
              sum: 165154,
              name: 'Two or More Races'
            }
          ]
        }
      ]
    }
  }

  const sumPopulation = columnSets[interactiveLayerIds[0]].columnSets[0].total.sum

  let units

  if (mapState && mapState.units) {
    units = mapState.units
  } else {
    units = generateUnits(
      null,
      problem.unit_count,
      problem.unit_count,
      problem.unit_name,
      problem.unit_name_plural,
      'single',
      sumPopulation
    )
  }

  return (
    <MapLayout>
      {loaderOpen && (
        <MapLoader
          problem={problem}
          userMapId={userMapId}
          setUserMapId={setUserMapId}
          units={units}
          saveEnabled={enableSave}
          setLoaderOpen={setLoaderOpen}
        />
      )}

      <MapHeader problem={problem} />

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

      <Districtr
        title="Maryland Congressional Districts (Block Groups)"
        mapboxAccessToken={`${process.env.GATSBY_MAPBOX_ACCESS_TOKEN}`}
        initialViewState={initialViewState}
        //@ts-ignore
        sources={sources}
        //@ts-ignore
        layers={layers}
        mapStyle={'districtr-md-v1'}
        unitsConfig={units}
        interactiveLayerIds={interactiveLayerIds}
        columnSets={columnSets}
        mapState={mapState}
        setMapState={setMapState}
        saveEnabled={enableSave}
      />
    </MapLayout>
  )
}

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => (
  <>
    <SEO
      title="Draw Maryland Congressional Districts"
      description="The open-source web app for drawing districting plans."
    />
    <html className={'map-page'} />
    <body className={'map-page'} />
  </>
)

export default MDTestPage
