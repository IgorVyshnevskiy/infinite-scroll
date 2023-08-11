const refs = {
  imageContainer: document.getElementById('image-container'),
  loader: document.getElementById('loader'),
}; 

let photoArray = [];
let ready = false;
let totalImages = 0;
let imagesLoaded = 0;
let COUNT = 5;
 
const API_KEY = 'z1nHTXwgArswVQ-gOPdPcmxO83jLB2pXeUUnUobfS38';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${API_KEY}&count=${COUNT}`;

function imageLoaded() {
  imagesLoaded += 1;
  if (imagesLoaded === totalImages) {
    refs.loader.hidden = true;
    ready = true;
    COUNT = 30
  }
}


function HelperSetAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

function displayPhotosMarkUp() {
  photoArray.forEach((photo) => {
    imagesLoaded = 0;
    totalImages = photoArray.length;
    const item = document.createElement('a');
    HelperSetAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    });

    const image = document.createElement('img');
    HelperSetAttributes(image, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    image.addEventListener('load', imageLoaded);
    item.appendChild(image);
    refs.imageContainer.appendChild(item);
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

window.addEventListener('scroll', () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    fetchPhotosFromAPI();
  }
});

fetchPhotosFromAPI();
