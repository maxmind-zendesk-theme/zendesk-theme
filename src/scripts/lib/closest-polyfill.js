function closest (element, selector) {
  if (Element.prototype.closest) {
    return element.closest(selector);
  }
  do {
    if (Element.prototype.matches && element.matches(selector)
      || Element.prototype.msMatchesSelector && element.msMatchesSelector(selector)
      || Element.prototype.webkitMatchesSelector && element.webkitMatchesSelector(selector)) {
      return element;
    }
    element = element.parentElement || element.parentNode;
  } while (element !== null && element.nodeType === 1);
  return null;
}
