const deleteModal = document.getElementById('deleteModal');
deleteModal.addEventListener('show.bs.modal', event => {
  const button = event.relatedTarget;

  // Get item name and url
  const url = button.getAttribute('data-url');
  const name = button.getAttribute('data-name');

  // Change element info
  const nameElement = document.getElementById('delete-name');
  const confirmDeleteLink = document.getElementById('confirmDeleteLink');
  nameElement.innerText = name;
  confirmDeleteLink.setAttribute('href', url);
});
