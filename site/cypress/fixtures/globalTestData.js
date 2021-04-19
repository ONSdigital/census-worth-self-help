// Here you can add any test data that is used across multiple tests

// Article names
const deepArticle = 'deep article'
const editorialWorkflowArticle = 'editorial workflow'
const injectionAttackArticle = 'Injection Attack'
const reviwemeArticle = 'reviweme'

// Article paths
const aVerySimpleArticlePath = '/a/very-simple-article/'
const anArticleWithRolesPath = '/an-article-with-many-roles/'
const deepArticlePath = '/deep-article/'
const editorialWorkflowPath = '/editorial-workflow'
const imageArticlePath = '/image-tests'
const reviwemePath = '/reviweme'
const videoArticlePath = '/video-test/'

// Page URLs
const explorePagePath = '/explore'
const formatTestsPath = '/format-tests'

// Resources
const faviconPath='/favicon.png'

const chromebookSize = [
  {
    screenWidth: 1280,
    screenHeight: 850
  }
]

const samsungA10Size = [
  {
    screenWidth: 720,
    screenHeight: 1520
  }
]

const samsungJ4PlusSize = [
  {
    screenWidth: 720,
    screenHeight: 1480
  }
]

// Text colour
const errorTextColour = "rgb(204, 0, 0)"

module.exports = {
  // Article names
  deepArticle,
  editorialWorkflowArticle,
  injectionAttackArticle,
  reviwemeArticle,

  // Screen sizes
  chromebookSize,
  samsungA10Size,
  samsungJ4PlusSize,

    // URLs
  aVerySimpleArticlePath,
  anArticleWithRolesPath,
  deepArticlePath,
  editorialWorkflowPath,
  explorePagePath,
  formatTestsPath,
  imageArticlePath,
  reviwemePath,
  videoArticlePath,

  // Resources
  faviconPath,

  // Text colour
  errorTextColour
}
