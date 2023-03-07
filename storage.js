function getBaseUrl(url) {
  const noHttps = url.replace("https://", "").replace("http://", "");
  const noParams = noHttps.split("/")[0];
  const dotParts = noParams.split(".");

  return `${dotParts[dotParts.length - 2]}.${dotParts[dotParts.length - 1]}`;
}

async function getDisabledSites() {
  return browser.storage.sync.get("disabledSites").then((result) => {
    if (result.disabledSites && Array.isArray(result.disabledSites)) {
      return result.disabledSites;
    } else {
      return [];
    }
  });
}

async function isSiteDisabled(site) {
  const sites = await getDisabledSites();

  return sites.includes(site);
}

async function disableSite(site) {
  const sites = await getDisabledSites();

  if (!sites.includes(site)) {
    sites.push(site);
    await browser.storage.sync.set({ disabledSites: sites });
    return true;
  }

  return false;
}

async function enableSite(site) {
  const sites = await getDisabledSites();

  if (sites.includes(site)) {
    while (sites.includes(site)) {
      sites.pop(site);
    }

    await browser.storage.sync.set({ disabledSites: sites });
    return true;
  }

  return false;
}
