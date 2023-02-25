const path = require(`path`)
const fs = require('fs').promises

exports.onCreateNode = async ({ node, actions, createNodeId, createContentDigest }) => {
  const { createNode, createParentChildLink, deleteNode, getNode } = actions
  const nodeType = node.internal.type

  const createStateNodes = () => {
    if (nodeType === 'StateJson') {
      const newNode = node
      newNode.id = createNodeId(`state-${node.meta.slug}`)
      newNode.internal.type = 'State'
      delete newNode.internal.owner
      createNode(newNode)
    }
  }

  const createStateChildren = async () => {
    if (nodeType === 'State' && node.meta) {
      // console.log(node)
      // for every county in node.counties, create a county node

      node.counties.forEach((county) => {
        if (node.meta.slug === 'california') {
          const nodeContent = JSON.stringify(county)
          const nodeMeta = {
            id: createNodeId(`county-${county.meta.slug}`),
            parent: node.id,
            children: [],
            pageId: county.id,
            childrenUrl: `http://admin.districtr.org/wagtail-api/pages/?child_of=${county.id}&limit=1000`,
            internal: {
              type: `County`,
              mediaType: `text/html`,
              content: nodeContent,
              contentDigest: createContentDigest(county)
            }
          }
          const countyNode = Object.assign({}, county, nodeMeta)
          createNode(countyNode)
          createParentChildLink({ parent: node, child: countyNode })
        }
      })

      // Import legacy columnsets into the new format
      const layerConfigs = await fs
        .readFile(path.join(__dirname, 'src/bakery/layerConfig.json'))
        .then((res) => JSON.parse(res)) // parse the JSON into a JS object

      // find an item in layerConfigs by its id
      const findLayerConfig = (id) => {
        return layerConfigs.find((item) => item.id === id)
      }

      // for every problem in node.problems, create a problem node
      node.problems.forEach((problem) => {
        const nodeContent = JSON.stringify(problem)
        const nodeMeta = {
          id: createNodeId(`problem-${problem.meta.slug}`),
          parent: node.id,
          children: [],
          pageId: problem.id,
          childrenUrl: `http://admin.districtr.org/wagtail-api/pages/?child_of=${problem.id}&limit=1000`,
          internal: {
            type: `Problem`,
            mediaType: `text/html`,
            content: nodeContent,
            contentDigest: createContentDigest(problem)
          }
        }

        const sourceBlock = problem.sources

        let skip = false

        // for source in sources, find the layerConfig that matches the source id
        // and add the layerConfig to the source object
        sourceBlock.forEach((sources) => {
          sources.value.forEach((obj) => {
            obj.layers.forEach((layer) => {
              const layerConfig = findLayerConfig(layer.id)
              if (layerConfig) {
                layer.columnSets = layerConfig.columnSets
                layer.key = layerConfig.key
              }
            })
          })
        })

        problem.sources = sourceBlock

        const problemNode = Object.assign(
          {
            title: problem.title,
            sources: problem.sources,
            unit_count: problem.unit_count,
            unit_name: problem.unit_name,
            unit_name_plural: problem.unit_name_plural,
            bounds: problem.bounds
          },
          problem,
          nodeMeta
        )
        //console.log(problemNode)

        if (!skip) {
          createNode(problemNode)
          createParentChildLink({ parent: node, child: problemNode })
        }
      })
    } else {
      // get the node parent and delete it
      //const parent = getNode(node.parent)
      //deleteNode(parent)
      //deleteNode(node)
    }
  }
  return Promise.all([createStateNodes(), createStateChildren()])
}

exports.createPages = async ({ actions, graphql }) => {
  const { data } = await graphql(`
    query {
      allState {
        edges {
          node {
            id
            childrenCounty {
              title
              meta {
                slug
                type
              }
              id
            }
            parent {
              ... on State {
                id
                meta {
                  slug
                }
              }
            }
            meta {
              slug
            }
            childrenProblem {
              id
              title
              meta {
                slug
                type
              }
              parent {
                ... on State {
                  id
                  meta {
                    slug
                  }
                }
              }
            }
          }
        }
      }
    }
  `)

  data.allState.edges.forEach((state) => {
    const pagePath = `/states/${state.node.meta.slug}`
    actions.createPage({
      path: pagePath,
      component: path.resolve(`./src/templates/statePage.js`),
      ownerNodeId: `${state.node.id}`,
      context: {
        id: state.node.id
      }
    })

    state.node.childrenCounty.forEach((county) => {
      const pagePath = `/states/${state.node.meta.slug}/${county.meta.slug}`
      actions.createPage({
        path: pagePath,
        component: path.resolve(`./src/templates/countyPage.js`),
        ownerNodeId: `${county.id}`,
        context: {
          id: county.id
        }
      })
    })

    state.node.childrenProblem.forEach((problem) => {
      const pagePath = `/map/${state.node.meta.slug}/${problem.meta.slug}`
      actions.createPage({
        path: pagePath,
        component: path.resolve(`./src/templates/mapPage.js`),
        ownerNodeId: `${problem.id}`,
        context: {
          id: problem.id
        }
      })
    })
  })

  return
}
