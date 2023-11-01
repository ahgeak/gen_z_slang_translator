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
  var wikiTextOutput = document.getElementById("wiki-output");
  var wikiOutput = document.getElementsByClassName("definition");
  // Something is wrong with this wiki URL => is not responsive
  var wikiSlangURL = 'https://en.wikipedia.org/wiki/List_of_Generation_Z_slang';

  // Fetch URL and then for respone
  fetch(wikiSlangURL)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`)
      }
      return response.text();
    })

    .then((text) => {
      wikiOutput.wikiTextOutput = text;
    })

    .catch((error) => {
      wikiOutput.wikiTextOutput = `Could not fetch verse: ${error}`;
    })

  // Function for wiki input to search
  function clickToSearchForSlangWords(event) {
    event.preventDefault();
    var wikiInput = getElementsByClassName('input');
    console.log('input', wikiInput);
    var wikiSearchButton = document.getElementsByClassName("searchBtn");

    var inputInSearchBox = wikiInput.text();
    localStorage.setItem(wikiInput, inputInSearchBox);
  }

  wikiSearchButton.addEventListener('click', clickToSearchForSlangWords);

  // Function + For loop to get wiki output from search 
  // function wikiOutputFromSearch(event) {
  //   event.preventDefault();
  // }

  // Function to add wiki output to favorite
  function clickToAddWikiFav(event) {
    event.preventDefault();
    var wikiFavButton = document.getElementsByClassName("favorite-button");
  }

  wikiFavButton.addEventListener('click', clickToAddWikiFav);
});