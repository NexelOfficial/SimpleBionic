getDisabledSites().then((sites) => {
  const sitesContainer = document.getElementById("disabled-sites");

    // Add all sites to the list
  for (const site of sites) {
    const img = document.createElement("img");
    const div = document.createElement("div");
    const p = document.createElement("p");
    img.src = `https://www.google.com/s2/favicons?domain=${site}&sz=32`;
    img.className = "site-image";
    div.className = "site-container";
    div.id = `site:${site}`;
    p.textContent = `www.${site}`;

      // Remove on click
    div.onclick = () => {
      enableSite(site).then((success) => {
        if (success) {
          div.remove();
        }
      });
    };

    div.appendChild(img);
    div.appendChild(p);
    sitesContainer.appendChild(div);
  }
});
