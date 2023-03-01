import { Districtr } from 'districtr-mapbox-gl'
import * as React from 'react'

import MapLayout from '../components/mapLayout'
import SEO from '../components/seo'

const StatesPage = () => {
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
            key: 'POP100',
            max: 10014009,
            min: 64,
            sum: 331449281,
            name: 'Total Population'
          }
        }
      ]
    }
  }

  return (
    <MapLayout>
      <Districtr
        title="Draw 10 States"
        mapboxAccessToken={`${process.env.GATSBY_MAPBOX_ACCESS_TOKEN}`}
        //@ts-ignore
        sources={sources}
        //@ts-ignore
        layers={layers}
        unitCount={10}
        totalMembers={10}
        unitName="State"
        unitNamePlural="States"
        unitType="single"
        interactiveLayerIds={['counties-draw']}
        columnSets={columnSets}
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
