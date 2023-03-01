import { Districtr } from 'districtr-mapbox-gl'
import * as React from 'react'

import MapLayout from '../components/mapLayout'
import SEO from '../components/seo'

const LATestPage = () => {
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

  return (
    <MapLayout>
      <Districtr
        title="LA County Style Test (Block Groups)"
        mapboxAccessToken={`${process.env.GATSBY_MAPBOX_ACCESS_TOKEN}`}
        initialViewState={initialViewState}
        //@ts-ignore
        sources={sources}
        //@ts-ignore
        layers={layers}
        unitCount={10}
        totalMembers={10}
        unitName="City Council"
        unitNamePlural="City Council"
        unitType="single"
        interactiveLayerIds={['block-groups', 'blocks']}
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
    <SEO title="Draw Los Angeles" description="The open-source web app for drawing districting plans." />
    <html className={'map-page'} />
    <body className={'map-page'} />
  </>
)

export default LATestPage
