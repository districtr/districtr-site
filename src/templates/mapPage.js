import { Districtr } from 'districtr-mapbox-gl'
import { graphql } from 'gatsby'
import * as React from 'react'

import MapLayout from '../components/mapLayout'
import SEO from '../components/seo'

const MapPageView = (props) => {
  const { problem } = props.data
  console.log(problem)

  const initialViewState = {
    longitude: -95.0,
    latitude: 36.5,
    bounds: [
      [problem.bounds[0][0], problem.bounds[0][1]],
      [problem.bounds[1][0], problem.bounds[1][1]]
    ],
    zoom: 5,
    bearing: 0,
    pitch: 0,
    padding: { top: 20, bottom: 20, left: 20, right: 20 },
    fitBoundsOptions: { padding: 20 }
  }

  const columnSets = {}
  const interactiveLayerIds = []

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
      name: 'U.S. County Borders',
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

  // for every source in problem.sources, add a source to the sources array
  problem.sources.forEach((item) => {
    item.value.forEach((data) => {
      sources.push({
        id: data.source.id.toString(),
        config: {
          type: 'vector',
          url: `${data.source.url}`
        }
      })

      data.layers.forEach((layer) => {
        // For now we are importing legacy columnSets from a seperate source
        if (layer.columnSets) {
          // Find the columnSet with the name "Population" and move it to the first position in the array
          const populationIndex = layer.columnSets.findIndex((columnSet) => columnSet.name === 'Population')
          if (populationIndex !== -1) {
            const populationColumnSet = layer.columnSets.splice(populationIndex, 1)[0]
            layer.columnSets.unshift(populationColumnSet)
          }

          columnSets[layer.id] = {
            geometryKey: layer.key,
            columnSets: layer.columnSets
          }

          layer.columnSets.forEach((columnSet) => {
            if (columnSet.total) {
              layers.push({
                name: `${columnSet.name} ${columnSet.total.name}`,
                interactive: false,
                config: {
                  id: `${layer.id}-${columnSet.name}-${columnSet.total.name}`,
                  source: data.source.id.toString(),
                  'source-layer': data.source.source_layer,
                  type: 'symbol',
                  layout: {
                    visibility: 'none',
                    'text-field': ['format', ['get', `${columnSet.total.key}`], { 'font-scale': 0.8 }]
                  },
                  paint: {
                    'text-halo-color': '#ffffff',
                    'text-halo-width': 2,
                    'text-halo-blur': 1
                  }
                }
              })
            }
            if (columnSet.subgroups) {
              columnSet.subgroups.forEach((subgroup) => {
                layers.push({
                  name: `${columnSet.name} ${subgroup.name}`,
                  interactive: false,
                  config: {
                    id: `${layer.id}-${columnSet.name}-${subgroup.name}`,
                    source: data.source.id.toString(),
                    'source-layer': data.source.source_layer,
                    type: 'symbol',
                    layout: {
                      visibility: 'none',
                      'text-field': ['format', ['get', `${subgroup.key}`], { 'font-scale': 0.8 }]
                    },
                    paint: {
                      'text-halo-color': '#ffffff',
                      'text-halo-width': 2,
                      'text-halo-blur': 1
                    }
                  }
                })
              })
            }
          })
        }

        const paint = {}
        const layout = {}

        if (layer.type === 'fill') {
          paint['fill-color'] = '#777777'
          layout['visibility'] = 'visible'
        } else if (layer.type === 'line') {
          paint['line-color'] = '#777777'
          paint['line-width'] = ['interpolate', ['linear'], ['zoom'], 0, 0, 7, 1]
          paint['line-opacity'] = 0.8
          layout['visibility'] = 'none'
        } else {
          layout['visibility'] = 'none'
        }

        if (layer.is_interactive) {
          interactiveLayerIds.push(layer.id)
        }

        layers.push({
          name: layer.name,
          interactive: layer.is_interactive,
          config: {
            id: layer.id,
            source: data.source.id.toString(),
            'source-layer': data.source.source_layer,
            type: layer.type,
            layout: layout,
            paint: paint
          }
        })
      })
    })
  })

  // sort interactiveLayerIds so the layer ending in "blocks-draw" is first
  interactiveLayerIds.sort((a, b) => {
    if (a.endsWith('blocks-draw')) {
      return -1
    } else if (b.endsWith('blocks-draw')) {
      return 1
    } else {
      return 0
    }
  })

  return (
    <MapLayout>
      <Districtr
        title={problem.title}
        mapboxAccessToken={`${process.env.MAPBOX_ACCESS_TOKEN}`}
        initialViewState={initialViewState}
        sources={sources}
        layers={layers}
        unitCount={problem.unit_count}
        totalMembers={problem.unit_count}
        unitName={problem.unit_name}
        unitNamePlural={problem.unit_name_plural}
        unitType="single"
        interactiveLayerIds={interactiveLayerIds}
        columnSets={columnSets}
      />
    </MapLayout>
  )
}

export const Head = ({ data }) => {
  const problem = data.problem

  return (
    <>
      <SEO title={problem.title} description={`${problem.unit_count} ${problem.unit_name_plural}`} />
      <html className={'map-page'} />
      <body className={'map-page'} />
    </>
  )
}

export default MapPageView

export const query = graphql`
  query ($id: String!) {
    problem(id: { eq: $id }) {
      id
      sources {
        id
        type
        value {
          layers {
            filter
            is_interactive
            id
            layout
            name
            paint
            type
            key
            columnSets {
              key
              name
              type
              metadata {
                race
                year
              }
              subgroups {
                key
                max
                min
                name
                sum
              }
              total {
                key
                max
                min
                name
                sum
              }
            }
          }
          source {
            id
            name
            source_layer
            source_type
            type
            url
          }
        }
      }
      parent {
        id
        parent {
          ... on State {
            id
            title
          }
        }
      }
      title
      unit_count
      unit_name
      unit_name_plural
      bounds
    }
  }
`
