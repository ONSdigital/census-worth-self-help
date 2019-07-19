const createSources = function(config = {}) {
  let sources = {
    'connect-src': ['\'self\''],
    'default-src': ['\'self\''],
    'font-src': ['\'self\''],
    'img-src': ['\'self\'', 'data:'],
    'media-src': ['https:'],
    'script-src': ['\'self\'', '\'unsafe-inline\''],
    'style-src': ['\'self\'', '\'unsafe-inline\''],
  }
  if (config.chatDomain) {
    sources['frame-src'] = ['https://' + config.chatDomain]
    sources['img-src'].push('https://' + config.chatDomain)
    sources['script-src'].push('https://' + config.chatDomain)
  }
  return sources
}

const csp = function(config) {
  const sources = createSources(config)
  return Object.keys(sources).map(function(key){
    return `${key} ${sources[key].join(' ')};`
  })
}

module.exports = {
 default : function(config) {
   const cspHeaderValue = csp(config).join(' ')

   return function(req, res, next){
     res.setHeader('Content-Security-Policy', cspHeaderValue)
     next()
   }
 }
}