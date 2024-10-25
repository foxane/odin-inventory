const home = document.getElementById('home-link');
const item = document.getElementById('item-link');
const category = document.getElementById('cat-link');

// Clear previous active link, if any
[home, item, category].forEach(a => a.classList.remove('active'));

let active;
switch (document.location.pathname) {
  case '/':
    active = home;
    break;
  case '/item':
    active = item;
    break;
  case '/category':
    active = category;
    break;
  default:
    active = null;
}

if (active) active.classList.add('active');
