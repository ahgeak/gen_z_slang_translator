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
    // Global variables for wiki url and wiki input + output
    var wikiRequestUrl = 'https://www.wikitable2json.com/api/List_of_Generation_Z_slang?lang=en&cleanRef=false';
    var wikiTextOutput = document.querySelector("#wiki-output");
    var wikiOutput = document.querySelector(".definition");
    var wikiInput = document.querySelector("#wiki-input");
    
    // Fetch URL and then for respone
      fetch(wikiRequestUrl)
        .then(function (response) {
          return response.json();
        })
        .then( (content) => {
          // This console.log is working!! Use this!
          // console.log(content[0][1][0]);
          // console.log(content[0][1][1]);
          var slangTerm = content[0][1][0];
          var slangString = JSON.stringify(slangTerm);
          if (userInput === slangString) {
            $("#search-output").text(slangString);
            console.log("match");
          } else {
            console.log("doesnt match");
            console.log(userInput);
          }
          var definitionTerm = content[0][1][1];
          var definitionString = JSON.stringify(definitionTerm);
          $("#definition-output").text(definitionString);
        })

    // Matrix for slang word and definition
    // var slangMatrix = [
    //   ["@me", "Pronounced 'at me.' Used on social media when someone feels attacked by a post."],
    //   ["Asl", "Shortened version of 'as hell' Unrelated to early internet slang 'age/sex/location.'"],
    //   ["Ate", "Used to express praise/admiration for a certion action or emotion performed by someone, with them often doing that action successfully."]
    // ];
    
    // for (let i = 0; i < slangMatrix.length; i++) {
    //   console.log('Term: ${slangMatrix[i][0]}, Definition: ${slangMatrix[i][1]}')

  // Function for wiki input to search
    function clickToSearchForSlangWords(event) {
      event.preventDefault();
      // console.log(wikiInput.value);
      var inputInSearchBox = document.querySelector(".input");
      var userInput = wikiInput.value;
      return userInput;
      }

    var wikiSearchButton = document.querySelector("#searchBtn");
    wikiSearchButton.addEventListener('click',clickToSearchForSlangWords);

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