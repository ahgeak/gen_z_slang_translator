document.addEventListener('DOMContentLoaded', () => {
    // Functions to open and close a modal
    function openModal($el) {
      $el.classList.add('is-active');
    }
  
    function closeModal($el) {
      $el.classList.remove('is-active');
    }
  
    function closeAllModals() {
      (document.querySelectorAll('.modal') || []).forEach(($modal) => {
        closeModal($modal);
      });
    }
  
    // Add a click event on buttons to open a specific modal
    (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
      const modal = $trigger.dataset.target;
      const $target = document.getElementById(modal);
  
      $trigger.addEventListener('click', () => {
        openModal($target);
      });
    });
  
    // Add a click event on various child elements to close the parent modal
    (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
      const $target = $close.closest('.modal');
  
      $close.addEventListener('click', () => {
        closeModal($target);
      });
    });
  
    // Add a keyboard event to close all modals
    document.addEventListener('keydown', (event) => {
      if (event.code === 'Escape') {
        closeAllModals();
      }
    });
  });

  // https://developers.giphy.com/docs/api/#quick-start-guide
var tempSearchWord = "penguin"; // this will change once connected to Bryan's code
var tempSearchDefinition = "A cute animal that lives in the Antarctic"
var tempGiphyApiKey = "u9ItgShSNZy4TjZz99RxhFbHCXXkvSMU"; // this will connect to the API key in keys.js
var requestURL =
  "https://api.giphy.com/v1/gifs/search?api_key=" +
  tempGiphyApiKey +
  "&limit=3&q=" +
  tempSearchWord;
console.log(requestURL);

// Event listener for the "Make a Gif?" button
var gifButton = document.getElementById("gif-button");
gifButton.addEventListener("click", searchGif);

// searchGif funciton is called when "Make a Gif?" button is clicked. This function uses an API fetch request to return 3 gifs related to the inputed search word
function searchGif() {
  fetch(requestURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (content) {
      $("#gif1").attr({
        src: content.data[0].images.downsized.url,
        alt: content.data[0].title,
      });
      document.getElementById("gif-title-1").textContent = content.data[0].title
      $("#gif2").attr({
        src: content.data[1].images.downsized.url,
        alt: content.data[1].title,
      });
      document.getElementById("gif-title-2").textContent = content.data[1].title
      $("#gif3").attr({
        src: content.data[2].images.downsized.url,
        alt: content.data[2].title,
      });
      document.getElementById("gif-title-3").textContent = content.data[2].title
    });
    // varibles to get Gif Card IDs
    var gifCardOne = document.getElementById("gif-card-1");
    var gifCardTwo = document.getElementById("gif-card-2");
    var gifCardThree = document.getElementById("gif-card-3");

    // Changing the view to visible so the gifs will appear on screen
    gifCardOne.setAttribute("view", "visible");
    gifCardTwo.setAttribute("view", "visible");
    gifCardThree.setAttribute("view", "visible");
}


// Event listener for the "Favorites List" button
var favoriteButton = document.getElementById("favorite-button");
favoriteButton.addEventListener("click", storeFavoriteList);

var storedFavoritesArray = {
  word: "",
  definition: ""
}

console.log(storedFavoritesArray);

// var string = JSON.stringify(storedFavoritesArray);
 
function storeFavorite(){
  localStorage.setItem("word", tempSearchWord);
  localStorage.setItem("definition", JSON.stringify(tempSearchDefinition));
}

function storeFavoriteList() {
  // var tempObjectArray = {
  //   word: tempSearchWord,
  //   definition: tempSearchDefinition
  // }
  // storedFavoritesArray.push(JSON.stringify(tempObjectArray));

  var favoriteListContent = document.getElementById("favorite-list-content");
  var headerElement = document.createElement("h4");
  var pElement = document.createElement("p");

  favoriteListContent.appendChild(headerElement);
  // headerElement.textContent = tempSearchWord;
  headerElement.textContent = localStorage.getItem("word", tempSearchWord);
  // headerElement.innerHTML = tempSearchWord;
  
  favoriteListContent.appendChild(pElement);
  pElement.innerHTML = tempSearchDefinition;
  storeFavorite();
}

var favoriteListButton = document.querySelector("modal-js-example")