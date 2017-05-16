
// Single state objects and variables
var state = {
    items: [
      {title: 'Learn JavaScript', checked: false},
      {title: 'Learn state management', checked: false},
      {title: 'Learn state management', checked: false},
      {title: 'apples', checked: false},
      {title: 'oranges', checked: false},
      {title: 'milk', checked: true},
      {title: 'bread', checked: false}
    ]
};

console.log(state)

// State modification functions
var addItem = function(state, item) {
    state.items.push(item);
    console.log(item)
};


//Get item
function getItem(state, itemIndex) {
  return state.item[itemIndex]
}

//DELETE item//Get item
function deleteItem(state, itemIndex) {
  state.splice(itemIndex)
}

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

// Render functions
var renderList = function(state) {
  var itemsHTML = ''

  state.items.forEach(function(item, index) {
    var itemHTML = listItem.replace('@title', item.title );

    itemHTML += itemHTML.replace('@check', item.checked ? 'shopping-item__checked' : '')

    // item.checked
    //   ? itemHTML.replace('@check', 'shopping-item__checked')
    //   : itemHTML.replace('@check', '')

    // check to see if checked === true
    // if ( item.checked ) {
    //   // if checked === true then we add this class to shopping-item element
    //   itemHTML = itemHTML.replace('@check', 'shopping-item__checked')
    // }
    // else {
    //   itemHTML = itemHTML.replace('@check', '')
    // }

    itemsHTML += itemHTML
  });

  $('.shopping-list').html(itemsHTML);
}

/////////////////////
// Event listeners
/////////////////////

//check as complete
//uses event delegations to go up the bubble and create a function from there
function markItem () {
  $( ".shopping-list" ).on( "click", ".shopping-item-toggle", function( event ) {
      event.preventDefault();
      $(this).parent().parent().find('.shopping-item').toggleClass('shopping-item__checked');

      // - [ ] find the referenced object on state.items
      // - [ ] mark that object as checked
      // - [ ] render everything again
  });
}
//delete item
//uses event delegations to go up the bubble and create a function from there
function deleteItem () {
  $( ".shopping-list" ).on( "click", ".shopping-item-delete", function( ev ) {
      ev.preventDefault();

      console.log({this: this, ev: ev});

      $(this).parent().parent().remove();
  });
}

//add to shopping list
function addItemSubmission () {
  $('#js-shopping-list-form').submit(function(event) {
    event.preventDefault();
    var item = $('#shopping-list-entry').val();
    // console.log( addItem(state, $('#shopping-list-entry').val()) );
    addItem(state, item);
    renderList(state, item);
  });
}

/////////////////////
// FINAL RENDER LIST
/////////////////////

$(function () {
  renderList(state);
  markItem ();
  deleteItem ();
  addItemSubmission ();
});
