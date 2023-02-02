import { Link, graphql } from 'gatsby'
import React from 'react'

import Layout from '../components/layout'

const StateDetailView = (props) => {
  const { state } = props.data

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
          <Link to="/states/">Back to States</Link>{' '}
        </p>
        <h1>{state.title}</h1>
        <h4>Problems</h4>
        <ul>
          {state.childrenProblem
            .sort((a, b) => a.title.localeCompare(b.title))
            .map((problem) => (
              <li key={problem.id}>
                <Link to={`/map/${state.meta.slug}/${problem.meta.slug}`}>{problem.title}</Link>
              </li>
            ))}
        </ul>

        <h4>Counties</h4>
        <ul>
          {state.childrenCounty
            .sort((a, b) => a.title.localeCompare(b.title))
            .map((county) => (
              <li key={county.id}>
                <Link to={`/states/${state.meta.slug}/${county.meta.slug}`}>{county.title}</Link>
              </li>
            ))}
        </ul>
      </div>
    </Layout>
  )
}

export default StateDetailView

export const query = graphql`
  query ($id: String!) {
    state(id: { eq: $id }) {
      id
      title
      meta {
        slug
      }
      childrenCounty {
        id
        title
        meta {
          slug
        }
      }
      childrenProblem {
        id
        title
        meta {
          slug
        }
      }
    }
  }
`
