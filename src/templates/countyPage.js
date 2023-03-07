import { Link, graphql } from 'gatsby'
import React from 'react'

import Layout from '../components/layout'

const CountyDetailView = (props) => {
  console.log(props)
  const { county } = props.data
  console.log(county)

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
          <Link to={`/states/${county.parent.meta.slug}/`}>{`Back to ${county.parent.title}`}</Link>{' '}
        </p>
        <h1>{county.title}</h1>
      </div>
    </Layout>
  )
}

export default CountyDetailView

export const query = graphql`
  query county($id: String!) {
    county(id: { eq: $id }) {
      title
      id
      meta {
        slug
        type
        detail_url
      }
      parent {
        ... on State {
          id
          title
          meta {
            slug
          }
        }
      }
    }
  }
`
