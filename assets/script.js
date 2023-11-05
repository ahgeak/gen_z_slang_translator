
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
    var wikiSearchOutputInTextBox = document.querySelector("#search-output");
    var wikiDefinitionOutputInTextBox = document.querySelector("#definition-output");
    var wikiSearchButton = document.querySelector("#searchBtn");
    var userInput = document.querySelector("#wiki-input")

    var slangTerms = [];
    var definitionTerms = [];
    
    // Fetch URL and then for respone
      fetch(wikiRequestUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          var termsArray = data[0].slice(1);
          termsArray.forEach(function(term) {
            slangTerms.push ({
              term: term[0],
              definition: term[1]
            })
          })
          // console.log(slangTerms);
          return slangTerms;
        })
        .catch(function (error){
          console.log(error);
        })

  // // Function for wiki input to search
    function clickToSearchForSlangWords(event) {
      event.preventDefault();
      console.log(slangTerms)

      // userInputEl
      // userInputVal

      for(let i = 0 ; i< slangTerms.length ; i++) {
        console.log(userInput)
        //console.log(slangTerms[i].term.toLowerCase() + " vs " + userInput)
        if(slangTerms[i].term.toLowerCase()===userInput.value.toLowerCase()) {
          console.log("Matched!")
          wikiSearchOutputInTextBox.textContent = slangTerms[i].term
          wikiDefinitionOutputInTextBox.textContent = slangTerms[i].definition
        } else {
          console.log("Not matched")
        }
      }

      return;
      }
    
    wikiSearchButton.addEventListener('click',clickToSearchForSlangWords);
    wikiSearchButton.disabled = true;

    userInput.addEventListener("keyup", function() {
      var numberOfCharacters = userInput.value.length
      console.log(numberOfCharacters)
      if(numberOfCharacters!==0) {
        wikiSearchButton.disabled = false;
      } else {
        wikiSearchButton.disabled = true;
      }

    })
  });