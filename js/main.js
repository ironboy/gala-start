import start from './pages/start.js';
import jazzClub from './pages/jazz-club.js';
import metalClub from './pages/metal-club.js';
import createClub from './pages/create-club.js';
import clubCreated from './pages/club-created.js';
import register from './pages/register.js';
import { login, logout, checkStoredLogin } from './pages/login.js';

window.baseUrl = 'http://localhost:3002/'

const user = await checkStoredLogin();

// Our menu: label to display in menu and
// function to run on menu choice
const menu = {
  // urlHash
  "start": { label: 'Start', function: start },
  "jazz-klubben": { label: 'Jazz-klubben', function: jazzClub },
  "metal-klubben": { label: 'Metal-klubben', function: metalClub },
  "register": { label: 'Registrera dig', function: register },
  "login": { label: 'Logga in', function: login },
  "create-club": { label: 'Skapa en klubb', function: createClub, isAdminPage: true },
  "club-created": { label: 'Skapa en klubb', function: clubCreated, isAdminPage: true, showInMenu: false }
  // menu items can be manipulated later to reflect state changes later, see in createMenu function
};

function createMenu() {
  // manipulate menu items when state changes
  menu.login.label = (user ? 'Logga ut' : 'Logga in')
  menu.login.function = (user ? logout : login)
  console.info('creating the menu', user, menu)
  // Object.entries -> convert object to array
  // then map to create a-tags (links)
  // then join everything into one big string
  const menuHtml = Object.entries(menu)
    .map(([urlHash, { label, isAdminPage, showInMenu }]) => {
      if (showInMenu === false) { return; }
      if (isAdminPage && user && user.isAdmin) {
        return `<a href="#${urlHash}">${label}</a>`;
      } else if (!isAdminPage) {
        return `<a href="#${urlHash}">${label}</a>`;
      }
    })
    .filter(x => x) // remove empty entries
    .join(' | ');
  // set the menu html
  document.querySelector('header nav').innerHTML = menuHtml
}
// call createMenu once on page load
createMenu()
// and then on every hash change of the url/location
window.onhashchange = createMenu;


async function loadPageContent() {
  // remove # and anything after and including ? from the hash
  const hash = location.hash.slice(1).split('?')[0]
  // if no hash redirect to #start
  if (hash === '') { location.replace('#start'); }
  // add a class on body so that we can style different pages differently
  document.body.setAttribute('class', hash);
  // get the correct function to run depending on location.hash
  const functionToRun = menu[hash].function;
  // run the function and expect it return a html string
  const html = await functionToRun();
  // replace the contents of the main element
  document.querySelector('main').innerHTML = html;
}

// call loadPageContent once on page load
loadPageContent();

// and then on every hash change of the url/location
window.onhashchange = loadPageContent;
