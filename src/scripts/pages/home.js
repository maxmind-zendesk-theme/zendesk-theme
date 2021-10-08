
document.addEventListener('DOMContentLoaded', () => {
  const $publicCategoriesSection = document.getElementById('category-public');
  const $privateCategoriesSection = document.getElementById('category-private');
  const $toggleBtn = document.getElementById('toggle-categories');

  const privateBtn = 'Switch to Private';
  const publicBtn = 'Switch to Public';

  const showingPrivate = 'showingPrivate';
  const showingPublic = 'showingPublic';

  const storageKey = 'mm-toggle-categories';

  function showPublicCategories () {
    $publicCategoriesSection.classList.add('active');
    $privateCategoriesSection.classList.remove('active');
    $toggleBtn.innerText = privateBtn;
  }

  function showPrivateCategories () {
    $publicCategoriesSection.classList.remove('active');
    $privateCategoriesSection.classList.add('active');
    $toggleBtn.innerText = publicBtn;
  }

  function showVisibleCategory () {
    const storageValue = sessionStorage.getItem(storageKey);

    if (storageValue === showingPublic) {
      showPublicCategories();
    } else if (storageValue === showingPrivate) {
      showPrivateCategories();
    }
  }

  function toggleCategories () {
    const storageValue = sessionStorage.getItem(storageKey);

    if (storageValue === showingPrivate) {
      sessionStorage.setItem(storageKey, showingPublic);
    } else if (storageValue === showingPublic) {
      sessionStorage.setItem(storageKey, showingPrivate);
    }

    showVisibleCategory();
  }

  if (!sessionStorage.getItem(storageKey)) {
    sessionStorage.setItem(storageKey, showingPublic);
  }

  showVisibleCategory();

  $toggleBtn.addEventListener('click', toggleCategories);
});
