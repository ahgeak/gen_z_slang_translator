document.addEventListener("DOMContentLoaded", () => {
  // Functions to open and close a modal
  function openModal($el) {
    $el.classList.add("is-active");
  }

  function closeModal($el) {
    $el.classList.remove("is-active");
  }

  function closeAllModals() {
    (document.querySelectorAll(".modal") || []).forEach(($modal) => {
      closeModal($modal);
    });
  }

  // Add a click event on buttons to open a specific modal
  (document.querySelectorAll(".js-modal-trigger") || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);

    $trigger.addEventListener("click", () => {
      openModal($target);
    });
  });

  // Add a click event on various child elements to close the parent modal
  (
    document.querySelectorAll(
      ".modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button"
    ) || []
  ).forEach(($close) => {
    const $target = $close.closest(".modal");

    $close.addEventListener("click", () => {
      closeModal($target);
    });
  });

  // Add a keyboard event to close all modals
  document.addEventListener("keydown", (event) => {
    if (event.code === "Escape") {
      closeAllModals();
    }
  });
});

$(function () {
  // Global variables for wiki url and wiki input + output
  var wikiRequestUrl =
    "https://www.wikitable2json.com/api/List_of_Generation_Z_slang?lang=en&cleanRef=false";
  var wikiSearchOutputInTextBox = document.querySelector("#search-output");
  var wikiDefinitionOutputInTextBox =
    document.querySelector("#definition-output");
  var wikiSearchButton = document.querySelector("#searchBtn");
  var userInput = document.querySelector("#wiki-input");
  var slangTerms = [];
  var definitionTerms = [];
  var currentSearchOutput = "";
  console.log(currentSearchOutput);
  var storedFavoritesArray = JSON.parse(localStorage.getItem("favorites")) || [];
  // var storedFavoritesArray = JSON.parse(localStorage.getItem("favorites"));
  // var storedFavoritesArray = [];

  // Fetch URL and then for response
  fetch(wikiRequestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var termsArray = data[0].slice(1);
      termsArray.forEach(function (term) {
        slangTerms.push({
          term: term[0],
          definition: term[1],
        });
      });
      // console.log(slangTerms);
      return slangTerms;
    })
    .catch(function (error) {
      console.log(error);
    });
  // // Function for wiki input to search
  function clickToSearchForSlangWords(event) {
    event.preventDefault();
    console.log(slangTerms);
    // userInputEl
    // userInputVal
    for (let i = 0; i < slangTerms.length; i++) {
      // console.log(userInput)
      //console.log(slangTerms[i].term.toLowerCase() + ” vs ” + userInput)
      if (slangTerms[i].term.toLowerCase() === userInput.value.toLowerCase()) {
        // console.log("Matched!")
        wikiSearchOutputInTextBox.textContent = slangTerms[i].term;
        wikiDefinitionOutputInTextBox.textContent = slangTerms[i].definition;
        currentSearchOutput = slangTerms[i].term;
        var definition = slangTerms[i].definition;
        fetchGiphy(currentSearchOutput, definition);
        // It changed the object to a string but we do not know how to update the global variable so that we can use it later in giphy portion
      }
      // else {
      //   console.log("Not matched")
      // }
    }
    return;
  }
  wikiSearchButton.addEventListener("click", clickToSearchForSlangWords);
  wikiSearchButton.disabled = true;
  // Add keyup event listener. When number of characters match user input on search, search button will enable.
  userInput.addEventListener("keyup", function () {
    var numberOfCharacters = userInput.value.length;
    console.log(numberOfCharacters);
    if (numberOfCharacters !== 0) {
      wikiSearchButton.disabled = false;
    } else {
      wikiSearchButton.disabled = true;
    }
  });

  // https://developers.giphy.com/docs/api/#quick-start-guide
  function fetchGiphy(searchTerm, definition) {
    console.log(searchTerm);

    // var tempSearchWord = "penguin"; // this will change once connected to Bryan's code
    // var tempSearchDefinition = "A cute animal that lives in the Antarctic"
    var tempGiphyApiKey = "u9ItgShSNZy4TjZz99RxhFbHCXXkvSMU"; // this will connect to the API key in keys.js
    var requestURL = `https://api.giphy.com/v1/gifs/search?api_key=${tempGiphyApiKey}&limit=3&q=${searchTerm}`;
    console.log(requestURL);
    console.log(currentSearchOutput);

    // Event listener for the "Make a Gif?" button
    var gifButton = document.getElementById("gif-button");
    gifButton.addEventListener("click", searchGif);

    // searchGif funciton is called when "Make a Gif?" button is clicked. This function uses an API fetch request to return 3 gifs related to the inputed search word
    function searchGif() {
      fetch(requestURL)
        .then(function (response) {
          console.log(response);
          return response.json();
        })
        .then(function (content) {
          console.log(content);
          $("#gif1").attr({
            src: content.data[0].images.downsized.url,
            alt: content.data[0].title,
          });
          document.getElementById("gif-title-1").textContent =
            content.data[0].title;
          $("#gif2").attr({
            src: content.data[1].images.downsized.url,
            alt: content.data[1].title,
          });
          document.getElementById("gif-title-2").textContent =
            content.data[1].title;
          $("#gif3").attr({
            src: content.data[2].images.downsized.url,
            alt: content.data[2].title,
          });
          document.getElementById("gif-title-3").textContent =
            content.data[2].title;
        })
        .catch(function (err) {
          console.error(err);
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
    
    favoriteButton.addEventListener("click", function (event) {
      //if statement second array with previously searched terms and search that array to see if it is in there
      // console.log(JSON.stringify(storedFavoritesArray.value) + "this is the word");
      // if (JSON.stringify(storedFavoritesArray) === searchTerm){
      //   console.log("block");
      // }

      // if (storedFavoritesArray.indexOf(searchTerm) !== -1) {
      //   return;
      // }

      // if (storedFavoritesArray === searchTerm){
      //   console.log ("blocked");
      // }
      
      var storedFavoritesObject = {
        word: searchTerm,
        definition: definition,
      };
      
      // for (var i = 0; i < storedFavoritesArray.length; i++){
      //   if (storedFavoritesArray[i].word == searchTerm) {
      //     console.log("block");
      //   } 
      // }
      
      storedFavoritesArray.push(storedFavoritesObject);
      console.log(storedFavoritesArray);
      localStorage.setItem("favorites", JSON.stringify(storedFavoritesArray));
    });
    renderStoredFavoriteList();
  }

  function renderStoredFavoriteList() {
    console.log(storedFavoritesArray);
    for (var i = 0; i < storedFavoritesArray.length; i++) {
      var favoriteListContent = document.getElementById("favorite-list-content");
      var headerElement = document.createElement("h4");
      var pElement = document.createElement("p");

      favoriteListContent.appendChild(headerElement);
      headerElement.textContent = storedFavoritesArray[i].word;

      favoriteListContent.appendChild(pElement);
      pElement.textContent = storedFavoritesArray[i].definition;
    }
  }

  // function storeFavoriteList() {
  //   // var tempObjectArray = {
  //   //   word: tempSearchWord,
  //   //   definition: tempSearchDefinition
  //   // }
  //   // storedFavoritesArray.push(JSON.stringify(tempObjectArray));

  //   localStorage.setItem("word", tempSearchWord);
  //   localStorage.setItem("definition", tempSearchDefinition);
  //   // storedFavoritesArray.push({"word": tempSearchWord, "defintion": tempSearchDefinition});
  //   storedFavoritesArray.word = tempSearchWord;
  //   storedFavoritesArray.definition = tempSearchDefinition;
  //   // how do I add to the array instead of just update it?

  //   console.log(storedFavoritesArray);
  //   renderStoredFavoriteList();
  // }

  var favoriteListButton = document.querySelector("modal-js-example");
});
