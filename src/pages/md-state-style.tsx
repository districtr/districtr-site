import { Districtr } from 'districtr-mapbox-gl'
import * as React from 'react'

import MapLayout from '../components/mapLayout'
import SEO from '../components/seo'

const MDTestPage = () => {
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
              key: '1795027',
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

  return (
    <MapLayout>
      <Districtr
        title="Maryland Congressional Districts (Block Groups)"
        mapboxAccessToken={`${process.env.GATSBY_MAPBOX_ACCESS_TOKEN}`}
        initialViewState={initialViewState}
        //@ts-ignore
        sources={sources}
        //@ts-ignore
        layers={layers}
        mapStyle={'districtr-md-v1'}
        unitCount={8}
        totalMembers={8}
        unitName="Congressional District"
        unitNamePlural="Congressional Districts"
        unitType="single"
        interactiveLayerIds={['Census Block Groups', 'Census Blocks']}
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
  <SEO
    title="Draw Maryland Congressional Districts"
    description="The open-source web app for drawing districting plans."
  />
)

export default MDTestPage
