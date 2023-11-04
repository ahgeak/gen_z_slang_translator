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
    var wikiTextOutput = document.querySelector("#search-output");
    var wikiOutput = document.querySelector("#definition-output");
    var slangTerms = [];
    var definitionTerms = [];
    
    // Fetch URL and then for respone
      fetch(wikiRequestUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          // console.log(content[0][1][0]);
          // console.log(content[0][1][1]);
          // for (let i = 0; i < slangTerm.length; i++) {
          //   var displaySearchOuput = '${content.slangTerm}';
          //   console.log(displaySearchOuput);
          //   return displaySearchOuput;
          // }
          // var slangString = JSON.stringify(slangTerm);
          // $("#search-output").get('${content.slangTerm}');
          
          // var definitionTerm = content[0][1][1];
          // var definitionString = JSON.stringify(definitionTerm);
          // $("#definition-output").text(definitionString);
          var termsArray = data[0].slice(1);
          termsArray.forEach(function(term) {
            slangTerms.push ({
              term: term[0],
              definition: term[1]
            })
          })
          console.log(slangTerms);
          return slangTerms;
        })
        .catch(function (error){
          console.log(error);
        })

    function termsToLowerCase(slangTerms) {
      var slangTermsToLower = JSON.stringify(slangTerms.term[0]);
      console.log(slangTermsToLower);
    }
    termsToLowerCase();

  // Function for wiki input to search
    function clickToSearchForSlangWords(event) {
      event.preventDefault();
      for (let index = 0; index < array.length; index++) {
        const element = array[index];
        
      }
      }

    var wikiSearchButton = document.querySelector("#searchBtn");
    wikiSearchButton.addEventListener('click',clickToSearchForSlangWords);

  //   // Function + For loop to get wiki output from search 
  //   // Maybe we dont need a function to display search output 
  //   function wikiOutputFromSearch(event) {
  //     event.preventDefault();
  //     var outputInDefinitionArea = wikiOutput.text;
  //   }

  //   // Function to add wiki output to favorite
  //   function clickToAddWikiFav(event) {
  //     event.preventDefault();
  //   }

  //   var wikiFavButton = document.querySelector(".favorite-button");
  //   wikiFavButton.addEventListener('click', clickToAddWikiFav);
  });