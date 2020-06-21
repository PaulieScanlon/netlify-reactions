module.exports = {
  siteMetadata: {
    name: "Demo Blog",
    description: "A demo Gatsby blog using React Svg Bubble Slider",
    keywords: ["React", "Gatsby", "GSAP"],
    siteUrl: "https://netlify-reactions.netlify.app",
    siteImage: "images/netlify-reactions-open-graph-image.jpg",
    profileImage: ``,
    lang: `en`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/src/posts/`,
      },
    },
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/layouts/PagesLayout.js`),
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
      },
    },
    `gatsby-plugin-theme-ui`,
    `gatsby-plugin-react-helmet`,
  ],
};
