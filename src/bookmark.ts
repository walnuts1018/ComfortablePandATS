import { editFavTabMessage } from "./eventListener";

const MAX_FAVORITES = 10;

function getSiteIdAndHrefLectureNameMap(): Map<string, { href: string, title: string }> {
  const sites = document.querySelectorAll(".fav-sites-entry");
  const map = new Map<string, { href: string; title: string }>();
  sites.forEach(site => {
    const siteId = site.querySelector(".site-favorite-btn")?.getAttribute("data-site-id");
    if (siteId == null) return;
    const href = (site.querySelector(".fav-title")?.childNodes[1] as HTMLAnchorElement).href;
    const title = (site.querySelector(".fav-title")?.childNodes[1] as HTMLAnchorElement).title;
    map.set(siteId, { href: href, title: title });
  });
  return map;
}

function isCurrentSite(siteId: string): boolean {
  const currentSiteIdM = window.location.href.match(/https?:\/\/panda\.ecs\.kyoto-u\.ac\.jp\/portal\/site\/([^\/]+)/);
  if (currentSiteIdM == null) return false;
  return currentSiteIdM[1] == siteId;
}

function getCurrentShownSiteHrefs(): Array<string> {
  const topnav = document.querySelector("#topnav");
  if (topnav == null) return new Array<string>();
  const sites = topnav.querySelectorAll(".Mrphs-sitesNav__menuitem");
  const hrefs: Array<string> = [];
  sites.forEach(site => hrefs.push((site.childNodes[1] as HTMLAnchorElement).href)) // TODO: gabagaba
  if (hrefs.length < 2) return hrefs;
  return hrefs.slice(1); // omit "Home"
}

// お気に入り上限を超えた講義を topbar に追加する
// ネットワーク通信を行うので注意
function addMissingBookmarkedLectures(): Promise<void> {
  const topnav = document.querySelector("#topnav");
  if (topnav == null) return new Promise((resolve, reject) => resolve());
  const request = new XMLHttpRequest();
  request.open("GET", "https://panda.ecs.kyoto-u.ac.jp/portal/favorites/list");
  request.responseType = "json";
  // @ts-ignore
  document.querySelector(".organizeFavorites").addEventListener("click", editFavTabMessage);
  return new Promise((resolve, reject) => {
    request.addEventListener("load", (e) => {
      const res = request.response;
      if (res == null) {
        console.log("failed to fetch favorites list");
        reject();
      }
      const favorites = res.favoriteSiteIds as [string];
      const sitesInfo = getSiteIdAndHrefLectureNameMap();
      const currentlyShownSites = getCurrentShownSiteHrefs();
      for (const favorite of favorites) {
        // skip if favorite is the current site
        if (isCurrentSite(favorite)) continue;

        const siteInfo = sitesInfo.get(favorite);
        if (siteInfo == undefined) continue;
        const href = siteInfo.href;
        const title = siteInfo.title;

        // skip if the site is already shown
        if (currentlyShownSites.find(c => c == href) != null) continue;

        const li = document.createElement("li");
        li.classList.add("Mrphs-sitesNav__menuitem");
        const anchor = document.createElement("a");
        anchor.classList.add("link-container");
        anchor.href = href;
        anchor.title = title;
        const span = document.createElement("span");
        span.innerText = title;
        anchor.appendChild(span);
        li.appendChild(anchor);
        topnav.appendChild(li);
      }
      resolve();
    });
    request.send();
  });
}

export { addMissingBookmarkedLectures };
