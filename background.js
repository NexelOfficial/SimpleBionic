const titleDisabled = browser.i18n.getMessage("titleDisabled");
const titleEnabled = browser.i18n.getMessage("titleEnabled");

// Create context menu. Should not be called as it's used as a callback.
async function createContextMenu(tabs) {
  const currentTab = tabs[0];
  const baseOnly = getBaseUrl(currentTab.url);
  const siteDisabled = await isSiteDisabled(baseOnly);

  const title = siteDisabled ? titleDisabled : titleEnabled;

  console.log(baseOnly);

  browser.contextMenus.create({
    id: "disable-on-page",
    title: title,
    contexts: ["all"],
  });
}

// Handle context menu
browser.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId !== "disable-on-page") {
    return;
  }

  const baseOnly = getBaseUrl(tab.url);
  const siteDisabled = await isSiteDisabled(baseOnly);

  if (siteDisabled) {
    await enableSite(baseOnly);
  } else {
    await disableSite(baseOnly);
  }

  await browser.tabs.reload();

  const newTitle = !siteDisabled ? titleDisabled : titleEnabled;
  browser.contextMenus.update("disable-on-page", { title: newTitle });
});

// Get the current browser tab and handle callback by creating the context menu
browser.tabs
  .query({ currentWindow: true, active: true })
  .then(createContextMenu);
