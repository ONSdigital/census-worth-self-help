const createSources = function(config = {}) {
  let sources = {
    'default-src': ['\'self\''],
    'script-src': ['\'self\''],
    'img-src': ['\'self\'', 'data:'],
    'style-src': ['\'self\''],
    'font-src': ['\'self\''],
    'connect-src': ['\'self\''],
  }
  if (config.chatDomain) {
    sources['frame-src'] = ['https://' + config.chatDomain]
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