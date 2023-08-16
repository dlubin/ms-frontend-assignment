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
    console.log(usersData);
  });
}