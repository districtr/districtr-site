import { Districtr } from 'districtr-mapbox-gl'
import { Button } from 'districtr-mapbox-gl'
import { generateUnits } from 'districtr-mapbox-gl'
import { SourceProps } from 'districtr-mapbox-gl/build/Districtr/Districtr.types'
import { graphql } from 'gatsby'
import * as React from 'react'
import { BiCloudUpload, BiExport, BiImport, BiSave, BiUpload } from 'react-icons/bi'

import MapHeader from '../components/MapHeader'
import MapLoader from '../components/MapLoader'
import MapMenu from '../components/MapMenu'
import { db } from '../components/db'
import MapLayout from '../components/mapLayout'
import SEO from '../components/seo'

const MapPageView = (props: { data: { problem: any } }, pageContext: any) => {
  const { problem } = props.data
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

  const initialViewState = {
    center: [(problem.bounds[0][0] + problem.bounds[1][0]) / 2, (problem.bounds[0][1] + problem.bounds[1][1]) / 2],
    latitude: (problem.bounds[0][1] + problem.bounds[1][1]) / 2,
    longitude: (problem.bounds[0][0] + problem.bounds[1][0]) / 2,
    bounds: [
      [problem.bounds[0][0], problem.bounds[0][1]],
      [problem.bounds[1][0], problem.bounds[1][1]]
    ],
    zoom: 10,
    bearing: 0,
    pitch: 0,
    padding: { top: 20, bottom: 20, left: 20, right: 20 },
    fitBoundsOptions: { padding: 20 }
  }

  const columnSets = {}
  const interactiveLayerIds: any[] = []

  const sources: SourceProps[] = [
    {
      id: 'counties',
      config: {
        type: 'geojson',
        data: '/data/national/national-county-pl-5m.geojson',
        generateId: true
      }
    }
  ]

  let layers = [
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
  problem.sources.forEach((item: { value: any[] }) => {
    item.value.forEach(
      (data: { source: { id: { toString: () => any }; url: any; source_layer: any }; layers: any[] }) => {
        sources.push({
          id: data.source.id.toString(),
          config: {
            type: 'vector',
            url: `${data.source.url}`
          }
        })

        data.layers.forEach(
          (layer: {
            columnSets: any[]
            id: string | number
            key: any
            type: string
            is_interactive: any
            name: any
          }) => {
            // For now we are importing legacy columnSets from a seperate source
            if (layer.columnSets) {
              // Find the columnSet with the name "Population" and move it to the first position in the array
              const populationIndex = layer.columnSets.findIndex(
                (columnSet: { name: string }) => columnSet.name === 'Population'
              )
              if (populationIndex !== -1) {
                const populationColumnSet = layer.columnSets.splice(populationIndex, 1)[0]
                layer.columnSets.unshift(populationColumnSet)
              }
              //@ts-ignore
              columnSets[layer.id] = {
                geometryKey: layer.key,
                columnSets: layer.columnSets
              }

              layer.columnSets.forEach((columnSet: { total: { key: any; name: any }; name: any; subgroups: any[] }) => {
                if (columnSet.total) {
                  const layerId = `${layer.id}-${columnSet.name}-${columnSet.total.key}`
                    .toLowerCase()
                    .trim()
                    .replace(/[^\w\s-]/g, '')
                    .replace(/[\s_-]+/g, '-')
                    .replace(/^-+|-+$/g, '')

                  layers.push({
                    name: `${columnSet.name} ${columnSet.total.name}`,
                    interactive: false,
                    config: {
                      id: layerId,
                      source: data.source.id.toString(),
                      //@ts-ignore
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
                  columnSet.subgroups.forEach((subgroup: { key: any; name: any }) => {
                    const layerId = `${layer.id}-${columnSet.name}-${subgroup.key}`
                      .toLowerCase()
                      .trim()
                      .replace(/[^\w\s-]/g, '')
                      .replace(/[\s_-]+/g, '-')
                      .replace(/^-+|-+$/g, '')

                    layers.push({
                      name: `${columnSet.name} ${subgroup.name}`,
                      interactive: false,
                      config: {
                        id: layerId,
                        source: data.source.id.toString(),
                        //@ts-ignore
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
              // @ts-ignore
              paint['fill-color'] = '#777777'
              // @ts-ignore
              layout['visibility'] = 'visible'
            } else if (layer.type === 'line') {
              // @ts-ignore
              paint['line-color'] = '#777777'
              // @ts-ignore
              paint['line-width'] = ['interpolate', ['linear'], ['zoom'], 0, 0, 7, 1]
              // @ts-ignore
              paint['line-opacity'] = 0.8
              // @ts-ignore
              layout['visibility'] = 'none'
            } else {
              // @ts-ignore
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
          }
        )
      }
    )
  })

  //remove layers that have a duplicate config.id
  layers = layers.filter((layer, index, self) => {
    return index === self.findIndex((l) => l.config.id === layer.config.id)
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
        mapStyle={'light-v11'}
        sources={sources}
        layers={layers}
        unitsConfig={units}
        unitCount={problem.unit_count}
        totalMembers={problem.unit_count}
        unitName={problem.unit_name}
        unitNamePlural={problem.unit_name_plural}
        unitType="single"
        interactiveLayerIds={interactiveLayerIds}
        columnSets={columnSets}
        mapState={mapState}
        setMapState={setMapState}
        saveEnabled={enableSave}
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
  query problems($id: String!) {
    problem(id: { eq: $id }) {
      id
      title
      unit_count
      unit_name
      unit_name_plural
      bounds
      unit_type
      meta {
        detail_url
        html_url
        locale
        search_description
        seo_title
        show_in_menus
        slug
        type
      }
      pageId
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
        ... on State {
          id
          meta {
            type
            slug
            show_in_menus
            seo_title
            search_description
            locale
            html_url
            detail_url
          }
        }
      }
    }
  }
`
