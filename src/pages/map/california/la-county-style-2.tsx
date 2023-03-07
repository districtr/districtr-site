import { Button, Districtr, generateUnits } from 'districtr-mapbox-gl'
import * as React from 'react'
import { BiCloudUpload, BiExport, BiImport, BiSave, BiUpload } from 'react-icons/bi'

import MapHeader from '../../../components/MapHeader'
import MapLoader from '../../../components/MapLoader'
import MapMenu from '../../../components/MapMenu'
import { db } from '../../../components/db'
import MapLayout from '../../../components/mapLayout'
import SEO from '../../../components/seo'

const LATestPage = () => {
  const problem = {
    id: 'la-test-2',
    title: 'LA County Style Test (Blocks)',
    unit_count: 10,
    unit_name: 'City Council District',
    unit_name_plural: 'City Council Districts',
    bounds: [
      [-118.6682, 33.7037],
      [-118.1553, 34.3373]
    ],
    meta: {
      slug: 'la-county-style-2'
    },
    parent: {
      id: 'ca',
      title: 'California',
      meta: {
        slug: 'california'
      }
    }
  }
  const [userMapId, setUserMapId] = React.useState(null)
  const [menuOpen, setMenuOpen] = React.useState(false)
  const [loaderOpen, setLoaderOpen] = React.useState(true)
  const [mapState, setMapState] = React.useState(null)
  const [enableSave, setEnableSave] = React.useState(true)

  const interactiveLayerIds = ['blocks', 'block-groups']

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
    longitude: -118.411,
    latitude: 33.94,
    bounds: [
      [-118.6682, 33.7037],
      [-118.1553, 34.3373]
    ],
    zoom: 10,
    bearing: 0,
    pitch: 0,
    padding: { top: 20, bottom: 20, left: 20, right: 20 },
    fitBoundsOptions: { padding: 20 }
  }

  const sources = []

  let layers = []

  const columnSets = {
    blocks: {
      geometryKey: 'GEOID20',
      columnSets: [
        {
          name: 'Population',
          type: 'population',
          total: {
            key: 'P2TOTPOP',
            sum: 10014009,
            name: 'Total Population'
          },
          subgroups: [
            {
              key: 'P2HISP',
              sum: 4804763,
              name: 'Hispanic or Latino'
            },
            {
              key: 'P2NONHISP',
              sum: 5209246,
              name: 'Not Hispanic or Latino'
            },
            {
              key: 'P2WHITE',
              sum: 4804763,
              name: 'White Alone'
            },
            {
              key: 'P2BLACK',
              sum: 5209246,
              name: 'Black Alone'
            },
            {
              key: 'P2AIAN',
              sum: 4804763,
              name: 'American Indian and Alaska Native Alone'
            },
            {
              key: 'P2ASIAN',
              sum: 5209246,
              name: 'Asian Alone'
            },
            {
              key: 'P2NHPI',
              sum: 4804763,
              name: 'Native Hawaiian and Other Pacific Islander Alone'
            },
            {
              key: 'P2OTHER',
              sum: 5209246,
              name: 'Some other race alone'
            },
            {
              key: 'P2MULTIR',
              sum: 4804763,
              name: 'Two or More Races'
            }
          ]
        },
        {
          name: 'Civilian Age Population',
          type: 'population',
          total: {
            key: 'P4TOTPOP',
            sum: 10014009,
            name: 'Total Population'
          },
          subgroups: [
            {
              key: 'P4HISP',
              sum: 4804763,
              name: 'Hispanic or Latino'
            },
            {
              key: 'P4NONHISP',
              sum: 5209246,
              name: 'Not Hispanic or Latino'
            },
            {
              key: 'P4WHITE',
              sum: 4804763,
              name: 'White Alone'
            },
            {
              key: 'P4BLACK',
              sum: 5209246,
              name: 'Black Alone'
            },
            {
              key: 'P4AIAN',
              sum: 4804763,
              name: 'American Indian and Alaska Native Alone'
            },
            {
              key: 'P4ASIAN',
              sum: 5209246,
              name: 'Asian Alone'
            },
            {
              key: 'P4NHPI',
              sum: 4804763,
              name: 'Native Hawaiian and Other Pacific Islander Alone'
            },
            {
              key: 'P4OTHER',
              sum: 5209246,
              name: 'Some other race alone'
            },
            {
              key: 'P4MULTIR',
              sum: 4804763,
              name: 'Two or More Races'
            }
          ]
        }
      ]
    },
    'block-groups': {
      geometryKey: 'GEOID20',
      columnSets: [
        {
          name: 'Population',
          type: 'population',
          total: {
            key: 'P2TOTPOP',
            sum: 10014009,
            name: 'Total Population'
          },
          subgroups: [
            {
              key: 'P2HISP',
              sum: 4804763,
              name: 'Hispanic or Latino'
            },
            {
              key: 'P2NONHISP',
              sum: 5209246,
              name: 'Not Hispanic or Latino'
            },
            {
              key: 'P2WHITE',
              sum: 4804763,
              name: 'White Alone'
            },
            {
              key: 'P2BLACK',
              sum: 5209246,
              name: 'Black Alone'
            },
            {
              key: 'P2AIAN',
              sum: 4804763,
              name: 'American Indian and Alaska Native Alone'
            },
            {
              key: 'P2ASIAN',
              sum: 5209246,
              name: 'Asian Alone'
            },
            {
              key: 'P2NHPI',
              sum: 4804763,
              name: 'Native Hawaiian and Other Pacific Islander Alone'
            },
            {
              key: 'P2OTHER',
              sum: 5209246,
              name: 'Some other race alone'
            },
            {
              key: 'P2MULTIR',
              sum: 4804763,
              name: 'Two or More Races'
            }
          ]
        },
        {
          name: 'Civilian Age Population',
          type: 'population',
          total: {
            key: 'P4TOTPOP',
            sum: 10014009,
            name: 'Total Population'
          },
          subgroups: [
            {
              key: 'P4HISP',
              sum: 4804763,
              name: 'Hispanic or Latino'
            },
            {
              key: 'P4NONHISP',
              sum: 5209246,
              name: 'Not Hispanic or Latino'
            },
            {
              key: 'P4WHITE',
              sum: 4804763,
              name: 'White Alone'
            },
            {
              key: 'P4BLACK',
              sum: 5209246,
              name: 'Black Alone'
            },
            {
              key: 'P4AIAN',
              sum: 4804763,
              name: 'American Indian and Alaska Native Alone'
            },
            {
              key: 'P4ASIAN',
              sum: 5209246,
              name: 'Asian Alone'
            },
            {
              key: 'P4NHPI',
              sum: 4804763,
              name: 'Native Hawaiian and Other Pacific Islander Alone'
            },
            {
              key: 'P4OTHER',
              sum: 5209246,
              name: 'Some other race alone'
            },
            {
              key: 'P4MULTIR',
              sum: 4804763,
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

      <MapHeader problem={problem} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <MapMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <Districtr
        title={problem.title}
        mapboxAccessToken={`${process.env.GATSBY_MAPBOX_ACCESS_TOKEN}`}
        initialViewState={initialViewState}
        //@ts-ignore
        sources={sources}
        //@ts-ignore
        layers={layers}
        unitsConfig={units}
        mapStyle={'districtr-v1'}
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
    <SEO title="Draw Los Angeles" description="The open-source web app for drawing districting plans." />
    <html className={'map-page'} />
    <body className={'map-page'} />
  </>
)

export default LATestPage
