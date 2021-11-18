window.addEventListener('DOMContentLoaded', () => {
  // nth-child(1) is a link to the MaxMind homepage, which is a hidden element in the breadcrumbs. nth-child(3) is the section name that sets the active sidebar link class
  const $sectionTitle = document.querySelector('.breadcrumbs > li:nth-child(3) > a');
  const $heroTitle = document.querySelector('.hero__title');
  const $articleTitle = document.querySelector('.article__title');

  const $sidebarLinks = document.querySelectorAll('.sidebar-link');
  const $correctGeoipLink = document.querySelector('.correct-geoip-link');

  const $geoipSeeAll = document.querySelector('[data-category-name="geoip-and-geolite"] > .sub-nav-items > .sidebar-item:nth-child(1) > a');
  const $minfraudSeeAll = document.querySelector('[data-category-name="minfraud-services"] > .sub-nav-items > .sidebar-item:nth-child(1) > a');
  const $accountSeeAll = document.querySelector('[data-category-name="account-and-purchasing"] > .sub-nav-items > .sidebar-item:nth-child(1) > a');
  const $dataPrivacySeeAll = document.querySelector('[data-category-name="data-privacy-and-licenses"] > .sub-nav-items > .sidebar-item:nth-child(1) > a');

  function addSidebarLinkActive () {
    $sidebarLinks.forEach($sidebarLink => {
      if ($sectionTitle.innerText === $sidebarLink.innerText) {
        $sidebarLink.classList.add('sidebar-link-active');
      }
    });
  }

  if ($sectionTitle) {
    if ($articleTitle) {
      // If the article is Correct GeoIP2 Data, then make that sidebar link active. For any other article, make the section link title active
      if ($articleTitle.innerText === 'Correct GeoIP2 Data') {
        $correctGeoipLink.classList.add('sidebar-link-active');
      } else {
        addSidebarLinkActive();
      }
    } else {
      addSidebarLinkActive();
    }
  } else if ($heroTitle) {
    if ($heroTitle.innerText === 'GeoIP2 and GeoLite2') {
      $geoipSeeAll.classList.add('sidebar-link-active');
    } else if ($heroTitle.innerText === 'minFraud Web Services') {
      $minfraudSeeAll.classList.add('sidebar-link-active');
    } else if ($heroTitle.innerText === 'Account and Purchasing') {
      $accountSeeAll.classList.add('sidebar-link-active');
    } else if ($heroTitle.innerText === 'Data Privacy') {
      $dataPrivacySeeAll.classList.add('sidebar-link-active');
    }
  }
});
