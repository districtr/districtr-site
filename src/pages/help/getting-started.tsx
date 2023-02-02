import { Link } from 'gatsby'
import * as React from 'react'

import Layout from '../../components/layout'
import Seo from '../../components/seo'

const GettingStarted = () => (
  <Layout>
    <h1>Getting Started</h1>
    <p>Quickly learn how to use Districtr</p>
    <p>
      <Link to="/help">Go back to Help Center</Link>
    </p>
    <p>
      <Link to="/">Go back to the homepage</Link>
    </p>
  </Layout>
)

export const Head = () => <Seo title="Getting Started" />

export default GettingStarted
