const whitelists = [
  "https://opensea.io/",
]

const set = new Map()
whitelists.map( v => (new URL(v)).hostname).forEach( v => {
  set[v] = true
})

function isWhitelisted(host) {
  return set[host]
}

function isWhitelistedUrl(url) {
  return isWhitelisted(getHost(url)) 
}

function getHost(url) {
  if (!url) {
    return ""
  }
  var url = new URL(url)
  var domain = url.hostname
  return domain
}

function getFullDomain(url) {
    if (!url) {
      return ""
    }
    var url = new URL(url)
    var full = `${url.protocol}//${url.hostname}`
    return full
}

