window.addEventListener('DOMContentLoaded', (event) => {
  const $body = document.querySelector('body');

  // nth-child(1) is a link to the MaxMind homepage, which is a hidden element in the breadcrumbs. nth-child(2) is the category name that sets the color.
  const $categoryTitle = document.querySelector('ol.breadcrumbs > li:nth-child(2) > a');

  const $minfraudCategory = document.querySelector('[data-category="minFraud Web Services"]');
  const $geoipCategory = document.querySelector('[data-category="GeoIP2 and GeoLite2"]');
  const $accountCategory = document.querySelector('[data-category="Account and Purchasing"]');
  const $dataPrivacyCategory = document.querySelector('[data-category="Data Privacy"]');

  const $navCategoryHeaderGeoip = document.querySelector('.nav-category[data-category-name="geoip-and-geolite"');
  const $navCategoryHeaderMinfraud = document.querySelector('.nav-category[data-category-name="minfraud-services"');
  const $navCategoryHeaderAccount = document.querySelector('.nav-category[data-category-name="account-and-purchasing"');
  const $navCategoryHeaderDataPrivacy = document.querySelector('.nav-category[data-category-name="data-privacy-and-licenses"');

  const showActiveCategory = (className, $element) => {
    $body.classList.add(className);
    $element.classList.add('is-open');
    $element.classList.remove('is-closed');
    $element.setAttribute('aria-expanded', 'true');
  };

  if ($geoipCategory || $categoryTitle?.innerText === 'GeoIP2 and GeoLite2') {
    showActiveCategory('page-type--geoip', $navCategoryHeaderGeoip);
  } else if ($minfraudCategory || $categoryTitle?.innerText === 'minFraud Web Services') {
    showActiveCategory('page-type--minfraud', $navCategoryHeaderMinfraud);
  } else if ($accountCategory || $categoryTitle?.innerText === 'Account and Purchasing') {
    showActiveCategory('page-type--account', $navCategoryHeaderAccount);
  } else if ($dataPrivacyCategory || $categoryTitle?.innerText === 'Data Privacy') {
    showActiveCategory('page-type--data-privacy', $navCategoryHeaderDataPrivacy);
  }
});
