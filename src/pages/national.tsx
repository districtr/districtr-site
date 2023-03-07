import { Button, Districtr, generateUnits } from 'districtr-mapbox-gl'
import * as React from 'react'
import { BiCloudUpload, BiExport, BiImport, BiSave, BiUpload } from 'react-icons/bi'

import MapHeader from '../components/MapHeader'
import MapLoader from '../components/MapLoader'
import MapMenu from '../components/MapMenu'
import { db } from '../components/db'
import MapLayout from '../components/mapLayout'
import SEO from '../components/seo'

const StatesPage = () => {
  const problem = {
    id: 'national-county',
    title: 'Draw 10 New States Test (County)',
    unit_count: 10,
    unit_name: 'State',
    unit_name_plural: 'States',
    bounds: [
      [-124.848974, 32.528832],
      [-70.131211, 42.009518]
    ],
    meta: {
      slug: 'national'
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

  const interactiveLayerIds = ['counties-draw']

  const initialViewState = {
    longitude: -118.411,
    latitude: 33.94,
    bounds: problem.bounds,
    zoom: 10,
    bearing: 0,
    pitch: 0,
    padding: { top: 20, bottom: 20, left: 20, right: 20 },
    fitBoundsOptions: { padding: 20 }
  }

  const sources = [
    {
      id: 'counties',
      config: {
        type: 'geojson',
        data: '/data/national/national-county-pl-5m.geojson',
        generateId: true
      }
    }
  ]

  const layers = [
    {
      name: 'Districtr Map',
      interactive: true,
      config: {
        id: 'counties-draw',
        source: 'counties',
        type: 'fill',
        layout: {
          visibility: 'visible'
        }
      }
    },
    {
      name: 'U.S. County Borders',
      interactive: false,
      config: {
        id: 'counties-borders',
        source: 'counties',
        type: 'line',
        layout: {
          visibility: 'visible'
        },
        paint: {
          'line-color': '#777777',
          'line-width': ['interpolate', ['linear'], ['zoom'], 0, 0, 7, 1],
          'line-opacity': 0.8
        }
      }
    },
    {
      name: 'U.S. County Names',
      interactive: false,
      config: {
        id: 'counties-labels',
        source: 'counties',
        type: 'symbol',
        layout: {
          visibility: 'none',
          'text-field': ['format', ['get', 'basename'], { 'font-scale': 0.8 }]
        },
        paint: {
          'text-halo-color': '#ffffff',
          'text-halo-width': 2,
          'text-halo-blur': 1
        }
      }
    }
  ]

  const columnSets = {
    'counties-draw': {
      geometryKey: 'GEOID',
      columnSets: [
        {
          name: 'Population',
          type: 'population',
          total: {
            key: 'P2TOTPOP',
            sum: 334735155,
            name: 'Total Population'
          },
          subgroups: [
            {
              key: 'P2HISP',
              sum: 65329087,
              name: 'Hispanic or Latino'
            },
            {
              key: 'P2WHITE',
              sum: 191722195,
              name: 'White Alone'
            },
            {
              key: 'P2BLACK',
              sum: 39944624,
              name: 'Black Alone'
            },
            {
              key: 'P2AIAN',
              sum: 2252011,
              name: 'American Indian and Alaska Native Alone'
            },
            {
              key: 'P2ASIAN',
              sum: 19621465,
              name: 'Asian Alone'
            },
            {
              key: 'P2NHPI',
              sum: 622109,
              name: 'Native Hawaiian and Other Pacific Islander Alone'
            },
            {
              key: 'P2OTHER',
              sum: 1692341,
              name: 'Some other race alone'
            },
            {
              key: 'P2MULTIR',
              sum: 13551323,
              name: 'Two or More Races'
            }
          ]
        },
        {
          name: 'Civilian Age Population',
          type: 'population',
          total: {
            key: 'P4TOTPOP',
            sum: 261068184,
            name: 'Total Population'
          },
          subgroups: [
            {
              key: 'P4HISP',
              sum: 46015535,
              name: 'Hispanic or Latino'
            },
            {
              key: 'P4WHITE',
              sum: 157140148,
              name: 'White Alone'
            },
            {
              key: 'P4BLACK',
              sum: 30269865,
              name: 'Black Alone'
            },
            {
              key: 'P4AIAN',
              sum: 1661869,
              name: 'American Indian and Alaska Native Alone'
            },
            {
              key: 'P4ASIAN',
              sum: 15716132,
              name: 'Asian Alone'
            },
            {
              key: 'P4NHPI',
              sum: 451625,
              name: 'Native Hawaiian and Other Pacific Islander Alone'
            },
            {
              key: 'P4OTHER',
              sum: 1179239,
              name: 'Some other race alone'
            },
            {
              key: 'P4MULTIR',
              sum: 8633771,
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
    <SEO title="Draw 10 States" description="The open-source web app for drawing districting plans." />
    <html className={'map-page'} />
    <body className={'map-page'} />
  </>
)

export default StatesPage
