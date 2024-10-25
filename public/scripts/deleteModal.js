let url = '';

const pwEl = document.getElementById('password');
const deleteModal = document.getElementById('deleteModal');
const deleteForm = document.getElementById('delete-form');

// Setup deletion target
deleteModal.addEventListener('show.bs.modal', event => {
  const button = event.relatedTarget;

  // Get item name and url
  url = button.getAttribute('data-url');
  const name = button.getAttribute('data-name');

  // Change element info
  const nameElement = document.getElementById('delete-name');
  nameElement.innerText = name;
});

// Setup password
pwEl.addEventListener('input', e => {
  deleteForm.setAttribute('action', url + '?pw=' + pwEl.value);
});
