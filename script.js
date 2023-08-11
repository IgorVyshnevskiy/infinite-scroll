const refs = {
  imageContainer: document.getElementById('image-container'),
  loader: document.getElementById('loader'),
};

let photoArray = [];

const COUNT = 10;
const API_KEY = 'z1nHTXwgArswVQ-gOPdPcmxO83jLB2pXeUUnUobfS38';

const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${API_KEY}&count=${COUNT}`;

function HelperSetAttributes(element, attributes) {
  for( const key in attributes) {
    element.setAttribute(key, attributes[key])
  }
}

function displayPhotosMarkUp() {
  photoArray.forEach((photo) => {
    const item = document.createElement('a');
    // item.setAttribute('href', photo.links.html);
    // item.setAttribute('target', '_blank');
    HelperSetAttributes(item, {
      href: photo.links.html,
      target: '_blank'
    })

    const image = document.createElement('img');
    // image.setAttribute('src', photo.urls.regular);
    // image.setAttribute('alt', photo.alt_description);
    // image.setAttribute('title', photo.alt_description);

    HelperSetAttributes(image, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    })
    item.appendChild(image);
    refs.imageContainer.appendChild(item)
  });
}

async function fetchPhotosFromAPI() {
  try {
    const response = await fetch(apiUrl);
    photoArray = await response.json();
    displayPhotosMarkUp();
  } catch (error) {
    console.log(error);
  }
}

fetchPhotosFromAPI();
