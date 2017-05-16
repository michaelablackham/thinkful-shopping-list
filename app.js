//////////////////////////////////////////
// SINGLE STATE OBJECTS AND VARIABLES
//////////////////////////////////////////
var state = {
    items: [
      {title: 'apples', checked: false},
      {title: 'oranges', checked: false},
      {title: 'milk', checked: true},
      {title: 'bread', checked: false}
    ]
};

var listItem = [
  '<li data-item-id="@index">',
    '<span class="shopping-item @check">@title</span>',
    '<div class="shopping-item-controls">',
      '<button class="shopping-item-toggle">',
        '<span class="button-label">check</span>',
      '</button>',
      '<button class="shopping-item-delete">',
        '<span class="button-label">delete</span>',
      '</button>',
    '</div>',
  '</li>'
].join('');

//////////////////////////////////////////
// STATE MODIFICATIONS FUNCTIONS
//////////////////////////////////////////
// push the item to the end of the list with the title of the item (value) and the checked as false
function addItem(state, newItem) {
  state.items.push({
      title: newItem,
      checked: false
    })
};

//DELETE item//Get item
function checkItem (state, index, newState) {
  state.items[index] = newState;
}


//Get item
// Get the index/[position of the item being interacted with
function getItem(state, item, itemIndex) {
  return state.items[itemIndex]
}

// Render functions
function renderList (state) {
  var itemsHTML = ''

  state.items.forEach(function(items, index) {
    var itemHTML = listItem.replace('@title', items.title ).replace('@index', index);

    items.checked
      ? itemHTML = itemHTML.replace('@check', 'shopping-item__checked')
      : itemHTML = itemHTML.replace('@check', '')

    itemsHTML += itemHTML
  });

  $('.shopping-list').html(itemsHTML);
}

//////////////////////////////////////////
// Event listeners
//////////////////////////////////////////

//check as complete
//uses event delegations to go up the bubble and create a function from there
function checkItemClick (checkButton, listElement, state, items) {
  listElement.on( "click", checkButton, function( event ) {
      event.preventDefault();
      var itemIndex = $(this).closest('li').index();
      console.log(itemIndex)

      checkItem (state, items, {
        title: state.items.title,
        checked: !state.items.checked
      });
      renderList(state)
  });
}

//add to shopping list
function addItemSubmission (formElement, item, formInput, state) {
  formElement.submit(function(event) {
    event.preventDefault();
    var newItem = $('#shopping-list-entry').val();
    console.log(newItem)
    addItem(state, newItem);
    renderList(state, newItem);
  });
}


// function markItem () {
//   $( ".shopping-list" ).on( "click", ".shopping-item-toggle", function( event ) {
//       event.preventDefault();
//       $(this).parent().parent().find('.shopping-item').toggleClass('shopping-item__checked');
//   });
// }
//delete item
//uses event delegations to go up the bubble and create a function from there
//DELETE item//Get item
// function deleteItem(state, itemIndex) {
//   state.splice(itemIndex)
// }
//
// function deleteItem () {
//   $( ".shopping-list" ).on( "click", ".shopping-item-delete", function( ev ) {
//       ev.preventDefault();
//
//       console.log({this: this, ev: ev});
//
//       $(this).parent().parent().remove();
//   });
// }



//////////////////////////////////////////
// FINAL RENDER LIST
//////////////////////////////////////////

$(function () {
  //create variables for all the items we will be interacting with -- take out all classes aboce and only put here if possible
  var formElement = $('#js-shopping-list-form');
  var formInput = $('#shopping-list-entry');
  var dataIndex = $('data-item-id');
  var listElement = $('.shopping-list');
  var checkButton = $('.shopping-item-toggle');
  var deleteButton = $('.shopping-item-delete');

  //render the list for intial load since we changed it to use ALL js and no HTML
  renderList(state);
  //call the add item function with the variables from above that are relevant to that function
  addItemSubmission (formElement, formInput, listElement, state);
  // checkItemClick (checkButton, listElement, state);
});
