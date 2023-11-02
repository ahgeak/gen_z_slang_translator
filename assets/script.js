// Trigger button for modal 
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

// Wiki section for Gen Z Slang
$(function () {
  var wikiTextOutput = document.querySelector("#wiki-output");
  var wikiOutput = document.querySelector(".definition");
  var wikiRequestUrl = 'https://en.wikipedia.org/w/api.php?action=query&prop=revisions&format=json&titles=List_of_Generation_Z_slang&rvprop=content&origin=*';

  // Fetch URL and then for respone
  fetch(wikiRequestUrl)
  .then(function(response){
    return response.json();
  })
  .then(function(content) {
    console.log(content);
  })
    // .then((response) => {
    //   if (!response.ok) {
    //     throw new Error(`HTTP error: ${response.status}`)
    //   }
    //   return response.text();
    // })

    // .then((text) => {
    //   wikiOutput.wikiTextOutput = text;
    // })

    // .catch((error) => {
    //   wikiOutput.wikiTextOutput = `Could not fetch verse: ${error}`;
    // })

  // Function for wiki input to search
  function clickToSearchForSlangWords(event) {
    event.preventDefault();
    var wikiInput = document.querySelector("#wiki-input");
    // console.log(wikiInput.value);
    var inputInSearchBox = document.querySelector(".input");
    var userInput = wikiInput.value;
  }
  
  var wikiSearchButton = document.querySelector(".searchBtn");
  wikiSearchButton.addEventListener('click', clickToSearchForSlangWords);
  
  // Function + For loop to get wiki output from search 
  // Maybe we dont need a function to display search output 
  function wikiOutputFromSearch(event) {
    event.preventDefault();
    var outputInDefinitionArea = wikiOutput.val();
  }

  // Function to add wiki output to favorite
  function clickToAddWikiFav(event) {
    event.preventDefault();
  }
  
  var wikiFavButton = document.querySelector(".favorite-button");
  wikiFavButton.addEventListener('click', clickToAddWikiFav);
});