import { HeadFC, Link, PageProps, graphql } from 'gatsby'
import * as React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'

type DataProps = {
  site: {
    buildTime: string
  }
}

const HomePage: React.FC<PageProps<DataProps>> = ({ data, location }) => (
  <Layout>
    <h1>Districtr Home Page</h1>
    <ul>
      <li>
        <Link to="/national">National County Map Test</Link>
      </li>
      <li>
        <Link to="/states">State Directory</Link>
      </li>
      <li>
        <Link to="/help">Help Center</Link>
      </li>
    </ul>
  </Layout>
)

export const Head: HeadFC = () => (
  <SEO title="Home Page" description="The open-source web app for drawing districting plans." />
)

export default HomePage

export const query = graphql`
  {
    site {
      buildTime(formatString: "YYYY-MM-DD hh:mm a z")
    }
  }
`
