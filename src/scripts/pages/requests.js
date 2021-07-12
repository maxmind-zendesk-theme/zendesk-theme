document.addEventListener('DOMContentLoaded', () => {
  const ENTER = 13;

  function saveFocus () {
    const activeElementId = document.activeElement.getAttribute('id');
    sessionStorage.setItem('returnFocusTo', '#' + activeElementId);
  }

  function restoreFocus () {
    const returnFocusTo = sessionStorage.getItem('returnFocusTo');
    if (returnFocusTo) {
      sessionStorage.removeItem('returnFocusTo');
      const returnFocusToEl = document.querySelector(returnFocusTo);
      returnFocusToEl && returnFocusToEl.focus && returnFocusToEl.focus();
    }
  }

  restoreFocus();

  // Submit requests filter form on status or organization change in the request list page
  Array.prototype.forEach.call(document.querySelectorAll('#request-status-select, #request-organization-select'), function (el) {
    el.addEventListener('change', function (e) {
      e.stopPropagation();
      saveFocus();
      this.closest('form').submit();
    });
  });

  // Submit requests filter form on search in the request list page
  const quickSearch = document.querySelector('#quick-search');
  quickSearch && quickSearch.addEventListener('keyup', function (e) {
    if (e.keyCode === ENTER) {
      e.stopPropagation();
      saveFocus();
      this.closest('form').submit();
    }
  });

  // Submit organization form in the request page
  const requestOrganisationSelect = document.querySelector('#request-organization select');
  if (requestOrganisationSelect) {
    requestOrganisationSelect.addEventListener('change', function () {
      this.closest('form').submit();
    });
  }
});
