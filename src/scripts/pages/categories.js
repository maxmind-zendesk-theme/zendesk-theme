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

  if ($geoipCategory) {
    $body.classList.add('page-type--geoip');
    $navCategoryHeaderGeoip.classList.add('is-open');
    $navCategoryHeaderGeoip.setAttribute('aria-expanded', 'true');
    $navCategoryHeaderGeoip.classList.remove('is-closed');
  } else if ($minfraudCategory) {
    $body.classList.add('page-type--minfraud');
    $navCategoryHeaderMinfraud.classList.add('is-open');
    $navCategoryHeaderMinfraud.setAttribute('aria-expanded', 'true');
    $navCategoryHeaderMinfraud.classList.remove('is-closed');
  } else if ($accountCategory) {
    $body.classList.add('page-type--account');
    $navCategoryHeaderAccount.classList.add('is-open');
    $navCategoryHeaderAccount.setAttribute('aria-expanded', 'true');
    $navCategoryHeaderAccount.classList.remove('is-closed');
  } else if ($dataPrivacyCategory) {
    $body.classList.add('page-type--data-privacy');
    $navCategoryHeaderDataPrivacy.classList.add('is-open');
    $navCategoryHeaderDataPrivacy.setAttribute('aria-expanded', 'true');
    $navCategoryHeaderDataPrivacy.classList.remove('is-closed');
  }

  if ($categoryTitle) {
    if ($categoryTitle.innerText === 'GeoIP2 and GeoLite2') {
      $body.classList.add('page-type--geoip');
      $navCategoryHeaderGeoip.classList.add('is-open');
      $navCategoryHeaderGeoip.setAttribute('aria-expanded', 'true');
      $navCategoryHeaderGeoip.classList.remove('is-closed');
    } else if ($categoryTitle.innerText === 'minFraud Web Services') {
      $body.classList.add('page-type--minfraud');
      $navCategoryHeaderMinfraud.classList.add('is-open');
      $navCategoryHeaderMinfraud.setAttribute('aria-expanded', 'true');
      $navCategoryHeaderMinfraud.classList.remove('is-closed');
    } else if ($categoryTitle.innerText === 'Account and Purchasing') {
      $body.classList.add('page-type--account');
      $navCategoryHeaderAccount.classList.add('is-open');
      $navCategoryHeaderAccount.setAttribute('aria-expanded', 'true');
      $navCategoryHeaderAccount.classList.remove('is-closed');
    } else if ($categoryTitle.innerText === 'Data Privacy') {
      $body.classList.add('page-type--data-privacy');
      $navCategoryHeaderDataPrivacy.classList.add('is-open');
      $navCategoryHeaderDataPrivacy.setAttribute('aria-expanded', 'true');
      $navCategoryHeaderDataPrivacy.classList.remove('is-closed');
    }
  }
});
