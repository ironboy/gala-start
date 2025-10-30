import start from './pages/start.js';
import aboutUs from './pages/about-us.js';

// which function to run on which hash
const menu = {
  "start": start,
  "about-us": aboutUs
};

function loadPageContent() {
  // if no hash redirect to #start
  if (location.hash === '') { location.replace('#start'); }
  // get the correct function to run depending on location.hash
  const functionToRun = menu[location.hash.slice(1)];
  // run the function and expect it return a html string
  const html = functionToRun();
  // replace the contents of the main element
  document.querySelector('main').innerHTML = html;
}

// call loadPageContent once on page load
loadPageContent();

// and then on every hash change of the url/location
window.onhashchange = loadPageContent;