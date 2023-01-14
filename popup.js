window.onload = async function() {
	let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

	const host = getFullDomain(tab.url)
	const isWhite = await isWhitelisted(getHost(tab.url)) || false

	// show verified or not image
	buildCheckingResult(host, isWhite)

	// show app info
	await buildAppInfo()
}

function buildCheckingResult(host, isWhite) {
	// show image
	let image = document.getElementById("id-verifyimg");
	if (isWhite) {
		image.src = chrome.runtime.getURL("assets/images/verified.png");
	} else {
		image.src = chrome.runtime.getURL("assets/images/notverified.png");
	}


	// show website url
	let divHost = document.getElementById("id-website");
	divHost.innerHTML = host

	// show verified text
	let divTip = document.getElementById("id-verifiytxt")
	if (isWhite) {
		divTip.innerHTML = "已验证安全"
		divTip.style.color = "#099C1D"
	} else {
		divTip.innerHTML = "未验证网址"
		divTip.style.color = "#666"
	}
}

async function buildAppInfo() {
	let container = document.getElementById("id-updatedat");
	const kv = await chrome.storage.sync.get("updated_at")
	if (kv.updated_at) {
		container.innerHTML = (new Date(kv.updated_at)).toLocaleString()
	} else {
		container.innerHTML = 'NA'
	}
}