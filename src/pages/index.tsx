// If you don't want to use TypeScript you can delete this file!
import { HeadFC, Link, PageProps, graphql } from 'gatsby'
import * as React from 'react'

import Layout from '../components/layout'
import Seo from '../components/seo'

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

export const Head: HeadFC<DataProps> = () => <Seo title="Using TypeScript" />

export default HomePage

export const query = graphql`
  {
    site {
      buildTime(formatString: "YYYY-MM-DD hh:mm a z")
    }
  }
`
