document.addEventListener('DOMContentLoaded', () => {
  // show form controls when the textarea receives focus or backbutton is used and value exists
  const commentContainerTextarea = document.querySelector('.comment-container textarea');
  const commentContainerFormControls = document.querySelector('.comment-form-controls, .comment-ccs');

  if (commentContainerTextarea) {
    commentContainerTextarea.addEventListener('focus', function focusCommentContainerTextarea () {
      commentContainerFormControls.style.display = 'block';
      commentContainerTextarea.removeEventListener('focus', focusCommentContainerTextarea);
    });

    if (commentContainerTextarea.value !== '') {
      commentContainerFormControls.style.display = 'block';
    }
  }

  // Expand Request comment form when Add to conversation is clicked
  const showRequestCommentContainerTrigger = document.querySelector('.request-container .comment-container .comment-show-container');
  const requestCommentFields = document.querySelectorAll('.request-container .comment-container .comment-fields');
  const requestCommentSubmit = document.querySelector('.request-container .comment-container .request-submit-comment');

  if (showRequestCommentContainerTrigger) {
    showRequestCommentContainerTrigger.addEventListener('click', function () {
      showRequestCommentContainerTrigger.style.display = 'none';
      Array.prototype.forEach.call(requestCommentFields, function (e) { e.style.display = 'block'; });
      requestCommentSubmit.style.display = 'inline-block';

      if (commentContainerTextarea) {
        commentContainerTextarea.focus();
      }
    });
  }

  // Mark as solved button
  const requestMarkAsSolvedButton = document.querySelector('.request-container .mark-as-solved:not([data-disabled])');
  const requestMarkAsSolvedCheckbox = document.querySelector('.request-container .comment-container input[type=checkbox]');
  const requestCommentSubmitButton = document.querySelector('.request-container .comment-container input[type=submit]');

  if (requestMarkAsSolvedButton) {
    requestMarkAsSolvedButton.addEventListener('click', function () {
      requestMarkAsSolvedCheckbox.setAttribute('checked', true);
      requestCommentSubmitButton.disabled = true;
      this.setAttribute('data-disabled', true);
      this.closest('form').submit();
    });
  }

  // Change Mark as solved text according to whether comment is filled
  const requestCommentTextarea = document.querySelector('.request-container .comment-container textarea');

  const usesWysiwyg = requestCommentTextarea && requestCommentTextarea.dataset.helper === 'wysiwyg';

  function isEmptyPlaintext (s) {
    return s.trim() === '';
  }

  function isEmptyHtml (xml) {
    const doc = new DOMParser().parseFromString(`<_>${xml}</_>`, 'text/xml');
    const img = doc.querySelector('img');
    return img === null && isEmptyPlaintext(doc.children[0].textContent);
  }

  const isEmpty = usesWysiwyg ? isEmptyHtml : isEmptyPlaintext;

  if (requestCommentTextarea) {
    requestCommentTextarea.addEventListener('input', function () {
      if (isEmpty(requestCommentTextarea.value)) {
        if (requestMarkAsSolvedButton) {
          requestMarkAsSolvedButton.innerText = requestMarkAsSolvedButton.getAttribute('data-solve-translation');
        }
        requestCommentSubmitButton.disabled = true;
      } else {
        if (requestMarkAsSolvedButton) {
          requestMarkAsSolvedButton.innerText = requestMarkAsSolvedButton.getAttribute('data-solve-and-submit-translation');
        }
        requestCommentSubmitButton.disabled = false;
      }
    });
  }

  // Disable submit button if textarea is empty
  if (requestCommentTextarea && isEmpty(requestCommentTextarea.value)) {
    requestCommentSubmitButton.disabled = true;
  }
});
