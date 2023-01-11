window.onload = async function() {
 	let container = document.getElementById("links-container");
	let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

	const host = getFullDomain(tab.url)
	const isWhite = isWhitelisted(getHost(tab.url)) || false

  	const links = `
  		<div> ${isWhite? "Verified url:":"NOT verified:"}</div>
  		<div> <a href="${host}" target="_blank">${isWhite?"":""} ${host}</a> </div>
  	`
  	container.innerHTML = links
}



