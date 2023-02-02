import { Link, graphql } from 'gatsby'
import React from 'react'

import Layout from '../../components/layout'

const StateIndexView = (props) => {
  return (
    <Layout>
      <div
        style={{
          width: '100%',
          maxWidth: 1200,
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: 25,
          padding: 15
        }}
      >
        <p>
          <Link to={`/national/`}>National Map</Link>{' '}
        </p>
        <h1>States</h1>
        <ul>
          {props.data.allState.edges.map((state) => (
            <li key={state.node.id}>
              <Link to={`/states/${state.node.meta.slug}`}>{state.node.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  )
}

export default StateIndexView

export const query = graphql`
  query {
    allState(sort: { title: ASC }) {
      edges {
        node {
          title
          id
          meta {
            slug
            type
            detail_url
          }
        }
      }
    }
  }
`
