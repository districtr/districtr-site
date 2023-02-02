module.exports = {
  siteMetadata: {
    title: `Districtr`,
    description: `Districtr is the open-source web app that empowers all people to draw districting plans.`,
    author: `@mggg`,
    siteUrl: `https://districtr.org/`
  },
  plugins: [
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
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
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png` // This path is relative to the root of the site.
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
    }
  ],
  graphqlTypegen: true
}
