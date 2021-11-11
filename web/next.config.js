module.exports = {
  env: {}, // add your env variables https://nextjs.org/docs/api-reference/next.config.js/environment-variables
  images: {
    domains: ['cdn2.thedogapi.com'],
  },
  pageExtensions: ['tsx'],
  experimental: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
}
