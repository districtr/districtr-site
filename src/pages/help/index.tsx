import { Link } from 'gatsby'
import * as React from 'react'

import Layout from '../../components/layout'
import Seo from '../../components/seo'

const HelpCenter = () => (
  <Layout>
    <h1>Help Center</h1>
    <p>All articles related to using Districtr</p>
    <p>
      <Link to="/help/getting-started">Getting Started Tutorial</Link>
    </p>
    <p>
      <Link to="/">Go back to the homepage</Link>
    </p>
  </Layout>
)

export const Head = () => <Seo title="Help Center" />

export default HelpCenter
