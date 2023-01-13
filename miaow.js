const whitelists = [
  "https://opensea.io/",
]

const sources = [
  "https://raw.githubusercontent.com/ntop001/miaomiaolists/main/whitelist.json",
]

const set = new Map()
whitelists.map( v => (new URL(v)).hostname).forEach( v => {
  set[v] = true
})

async function isWhitelisted(host) {
  if (set[host]) {
    return true
  }
  const kv = await chrome.storage.sync.get(host)
  console.log("get verified key:", host, " val:", kv[host])
  return kv[host]
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

async function getWhitelists(url) {
  const resp = await fetch(url, { method: 'GET', headers: { 'Accept': 'application/json' }})
  if (!resp.ok) {
      throw new Error(`Error! status: ${resp.status}`);
  }
  return await resp.json()
}

async function updateAndSave(url) {
  const data = await getWhitelists(url)
  const { name, key, websites = []} = data
  await websites.forEach( async url => {
    await chrome.storage.sync.set({ [ getHost(url) ] : key || name });
  })
  await chrome.storage.sync.set( { "updated_at": Date.now() })
  console.log("update whitelist at:", new Date())
}

async function updateWhitelists() {
  await chrome.storage.sync.clear()
  await Promise.all( sources.map( url => updateAndSave(url) ))
}

async function checkUpdate() {
    const updatedAt = await chrome.storage.sync.get("updated_at")
    const lastUpdateTime = updatedAt.updated_at
    const currentTime = Date.now()
    if (!lastUpdateTime || (currentTime - lastUpdateTime) > 15*60*1000) {
        await updateWhitelists()
    }
}





