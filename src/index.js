const css = require('./scss/main.scss');
const cardsData = require('./static/data/cards-data.json').default; // Added by David

/**
 *
 *  THIS METHOD RETURNS THUMBNAIL URL BASED ON THUMBNAIL PROP VALUE
 *
 * */
const createImageFinderMethod = ()=> {

  function getImgThumbsObj() {
    const imgFilesObj = require.context('imgs/thumbs', true, /\.jpg|\.jpeg|\.svg|\.png$/);
    const imgCache = {};
    const importAll = (r) => r.keys().forEach(key => imgCache[key] = r(key));
    importAll(imgFilesObj);
    return imgCache;
  }

  const imgThumbsObj = getImgThumbsObj();
  return (imgUrl)=>imgThumbsObj[imgUrl];

}

window._getThumbnailURL = createImageFinderMethod();

// David's code begins
// Retrieve users data
async function getUsers() {
  const response = await fetch(cardsData);
  return response.json();
}

window.onload = () => {
  getUsers().then((usersData) => {
    var users = usersData.users;
    users = users.sort((a,b) => a.teamName.localeCompare(b.teamName) || a.lastName.localeCompare(b.lastName))
    const profileGrid = document.getElementById('profile-card-grid');
    const profileTemplate = document.getElementById('profile-card');
    for (let profile of users) {
      createCard(profileGrid, profileTemplate, profile);
    }
  });
}

/* Duplicate template card, plug in profile data, and append to grid */
function createCard(profileGrid, profileTemplate, profile) {
  const clone = profileTemplate.content.cloneNode(true);
  let thumbnail = clone.querySelectorAll('.thumbnail');
  thumbnail[0].src = _getThumbnailURL(profile.thumbnail);
  setTextField(clone, '.icaName', profile.icaName);
  setTextField(clone, '.title', profile.title);
  setTextField(clone, '.profile-bioShort', profile.bioShort);
  setTextField(clone, '.linkedInSkill', `${profile.linkedInSkill},`);
  setTextField(clone, '.teamName', `${profile.teamName},`);
  let email = clone.querySelectorAll('.email');
  email[0].href = `mailto:${profile.email}`;
  profileGrid.appendChild(clone);
}

/* Set the text value of an element */
function setTextField(parentEl, selector, value) {
  let el = parentEl.querySelectorAll(selector);
  el[0].textContent = value;
}