// @ts-check

/**
 * @type {import('gatsby').GatsbyConfig}
 */
const gatsbyConfig = {
  siteMetadata: {
    title: `Districtr`,
    description: `Districtr is the open-source web app that empowers all people to draw districting plans.`,
    author: `@mggg`,
    siteUrl: `https://districtr.org/`
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-netlify`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    {
      resolve: `gatsby-plugin-web-font-loader`,
      options: {
        typekit: {
          id: `nbp8hks`
        }
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Districtr`,
        short_name: `Districtr`,
        start_url: `/`,
        background_color: `#FFFFFF`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`, // This path is relative to the root of the site.
        cache_busting_mode: `none`,
        orientation: `landscape`,
        categories: [`education`, `social`, `government`, `politics`]
      }
    },
    {
      resolve: `gatsby-transformer-json`
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./src/bakery`
      }
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /svg/
        }
      }
    }
  ],
  graphqlTypegen: false
}

module.exports = gatsbyConfig
