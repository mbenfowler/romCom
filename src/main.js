// Create variables targetting the relevant DOM elements here 👇
var fullCover = document.querySelector(".main-cover");
var coverImage = document.querySelector(".cover-image");
var coverTitle = document.querySelector(".cover-title");
var coverDescriptor1 = document.querySelector(".tagline-1");
var coverDescriptor2 = document.querySelector(".tagline-2");
var homeButton = document.querySelector('.home-button');
var showNewRandomCoverButton = document.querySelector('.random-cover-button');
var saveCoverButton = document.querySelector('.save-cover-button');
var viewSavedCoversButton = document.querySelector('.view-saved-button');
var createBookBtn = document.querySelector('.create-new-book-button');
var homeView = document.querySelector('.home-view');
var savedView = document.querySelector('.saved-view');
var makeNewButton = document.querySelector('.make-new-button');
var formView = document.querySelector('.form-view');
var userCover = document.querySelector('.user-cover');
var userTitle = document.querySelector('.user-title');
var userDecr1 = document.querySelector('.user-desc1');
var userDecr2 = document.querySelector('.user-desc2');

var savedCoversSection = document.querySelector('.saved-covers-section');

// We've provided a few variables below
var savedCovers = [
  createCover("http://3.bp.blogspot.com/-iE4p9grvfpQ/VSfZT0vH2UI/AAAAAAAANq8/wwQZssi-V5g/s1600/Do%2BNot%2BForsake%2BMe%2B-%2BImage.jpg", "Sunsets and Sorrows", "sunsets", "sorrows")
];
var currentCover;
var currentView;

// Add your event listeners here 👇
showNewRandomCoverButton.addEventListener('click', getRandomCover);
viewSavedCoversButton.addEventListener('click', function () {
  currentView = homeView;
  switchToViewSavedCovers(currentView);
});
saveCoverButton.addEventListener('click', saveCover);
makeNewButton.addEventListener('click', makeCoverButton);
homeButton.addEventListener('click', goHome)

window.onload = (event) => {
  currentCover = createCover(
    getRandomImage(),
    getRandomTitle(),
    getRandomDesc(),
    getRandomDesc()
  );

  coverImage.src = currentCover.coverImg; 
  coverTitle.innerHTML = currentCover.title;
  coverDescriptor1.innerHTML = currentCover.tagline1;
  coverDescriptor2.innerHTML = currentCover.tagline2;
};

// Create your event handlers and other functions here 👇

function getRandomImage() {
  var randomIndex = getRandomIndex(covers);
  return covers[randomIndex];
}

function getRandomTitle() {
  var randomIndex = getRandomIndex(titles);
  return titles[randomIndex];
}

function getRandomDesc() {
  var randomIndex = getRandomIndex(descriptors);
  return descriptors[randomIndex];
}

function getRandomCover() {
  currentCover = createCover(
    getRandomImage(), 
    getRandomTitle(), 
    getRandomDesc(), 
    getRandomDesc()
    );
  fullCover.innerHTML = `<img class="cover-image" src="${currentCover.coverImg}">
    <h2 class="cover-title">${currentCover.title}</h2>
    <h3 class="tagline">A tale of <span class="tagline-1">${currentCover.tagline1}</span> and <span class="tagline-2">${currentCover.tagline2}</span></h3>
    <img class="price-tag" src="./assets/price.png">
    <img class="overlay" src="./assets/overlay.png">`
  return currentCover;
}

function goHome() {
  homeButton.classList.add('hidden');
  formView.classList.add('hidden');
  
  showNewRandomCoverButton.classList.remove('hidden');
  makeNewButton.classList.remove('hidden');
  homeView.classList.remove('hidden');
  saveCoverButton.classList.remove('hidden');
}

function makeCoverButton() {
  makeNewButton.classList.add('hidden');
  homeView.classList.add('hidden');
  saveCoverButton.classList.add('hidden');
  showNewRandomCoverButton.classList.add('hidden');
  savedView.classList.add('hidden');

  formView.classList.remove('hidden')
  homeButton.classList.remove('hidden');
}

function saveCover() {
  if (!savedCovers.includes(currentCover)) {
    savedCovers.push(currentCover);
  } else {
    alert('Already Saved!✅')
  }
}

function switchToViewSavedCovers(currentView) {
  showNewRandomCoverButton.classList.add("hidden");
  saveCoverButton.classList.add("hidden");
  currentView.classList.add("hidden");
  formView.classList.add("hidden");
  
  homeButton.classList.remove("hidden");
  savedView.classList.remove("hidden");
  appendCoversToSavedView();
}

var savedCoverIDs = [];
function appendCoversToSavedView() {
  for(i = 0; i < savedCovers.length; i++) {
    let thisCover = savedCovers[i];
    if(savedCoverIDs.includes(thisCover.id)) {
      continue;
    }

    savedCoverIDs.push(thisCover.id);
    
    let newSection = document.createElement('section');
    newSection.classList.add('mini-cover');
    newSection.setAttribute('id', thisCover.id)
    savedCoversSection.appendChild(newSection);

    let img = document.createElement('img');
    img.classList.add('cover-image');
    img.src = thisCover.coverImg;
    newSection.append(img);

    let title = document.createElement('h2');
    title.classList.add('cover-title');
    title.innerHTML = thisCover.title;
    newSection.append(title);

    let tagline = document.createElement('h3');
    tagline.classList.add('tagline');
    tagline.innerHTML = `A tale of ${thisCover.tagline1} and ${thisCover.tagline2}`;
    newSection.append(tagline);
    
    let priceTag = document.createElement('img');
    priceTag.classList.add('price-tag');
    priceTag.src = "./assets/price.png";
    newSection.append(priceTag);

    let overlay = document.createElement('img');
    overlay.classList.add('overlay');
    overlay.src = "./assets/overlay.png";
    newSection.append(overlay);

    newSection.addEventListener('dblclick', (e) => {
      var coverToRemove = document.getElementById(`${thisCover.id}`);
      coverToRemove.remove();
    });
  }
}

// MAKE MY BOOK BUTTON //
createBookBtn.addEventListener("click", function(event){
  event.preventDefault();
  makeBookButton();
});

function makeBookButton() {
  try {
    new URL(userCover.value)
  }
  catch(error){
    alert('Please enter a valid url‼️')
    return
  }
  if (userCover.value === '' ||
    userTitle.value === '' ||
    userDecr1.value === ''||
    userDecr2.value === '') {
      alert('⚠️Please fill out all fields before continuing! ☺︎')
    } else {
      currentCover = createCover(userCover.value, userTitle.value, userDecr1.value, userDecr2.value);
      fullCover.innerHTML = `<img class="cover-image" src="${currentCover.coverImg}">
        <h2 class="cover-title">${currentCover.title}</h2>
        <h3 class="tagline">A tale of <span class="tagline-1">${currentCover.tagline1}</span> and <span class="tagline-2">${currentCover.tagline2}</span></h3>
        <img class="price-tag" src="./assets/price.png">
        <img class="overlay" src="./assets/overlay.png">`;
      saveNewInfo();
      goHome();
    }
}

function saveNewInfo() {
 covers.push(currentCover.coverImg);
 titles.push(currentCover.title);
 descriptors.push(currentCover.tagline1, currentCover.tagline2);
}

function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

function createCover(imgSrc, title, descriptor1, descriptor2) {
  var cover = {
    id: Date.now(),
    coverImg: imgSrc,
    title: title,
    tagline1: descriptor1,
    tagline2: descriptor2
  }
  return cover
}
