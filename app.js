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

//create template for the HTML we will be working with
var listItem = [
  '<li data-item-id="@index">',
    '<span class="shopping-item @check">@title</span>',
    '<div class="shopping-item-controls">',
      '<button class="shopping-item-toggle">',
        '<span class="button-label-check">check</span>',
      '</button>',
      '<button class="shopping-item-delete">',
        '<span class="button-label-delete">delete</span>',
      '</button>',
    '</div>',
  '</li>'
].join('');

//////////////////////////////////////////
// STATE MODIFICATIONS FUNCTIONS
//////////////////////////////////////////
// push the item to the end of the list with the title of the item (value) and the checked as default=false
function addItem(state, newItem) {
  state.items.push({
      title: newItem,
      checked: false
    })
};

//GET ITEM
function getItem(state, itemIndex) {
  return state.items[itemIndex];
}

//CHECK ITEM
function checkItem (state, index, newState) {
  state.items[index] = newState;
}

//DELETE item//Get item
function deleteItem(state, itemIndex) {
  state.items.splice(itemIndex, 1);
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
function checkItemClick (checkButton, listElement, state, dataIndex) {
  listElement.on( "click", '.shopping-item-toggle', function( event ) { //<<<<<<<<<
      //I needed to use the actual class rather than the variable in order for this to work-- WHY?
      event.preventDefault();
      var itemIndex = $(event.target.closest('li')).attr(dataIndex);
      // console.log('checked' + itemIndex);
      // console.log(event.target);
      var oldItem = getItem(state, itemIndex);

      checkItem(state, itemIndex, {
        title: oldItem.title,
        checked: !oldItem.checked
      });

      $(event.target).closest('li').toggleClass('shopping-item__checked');
      renderList(state);
  });
}

//DELETE ITEM FROM list
function deleteItemClick (deleteButton, listElement, state, dataIndex) {
  listElement.on( "click", '.shopping-item-delete', function( event ) { //<<<<<<<<<
      //I needed to use the actual class rather than the variable in order for this to work
      event.preventDefault();
      var itemIndex = $(event.target.closest('li')).attr(dataIndex); //<<<<<<<<<
      // why did i need to use even.target above instead of 'this' <<<<<<<<<<
      console.log('delete' + itemIndex)
      console.log(event.target);

      deleteItem(state, itemIndex);
      renderList(state);
  });
}

//add to shopping list
function addItemSubmission (formElement, item, formInput, state) {
  formElement.submit(function(event) {
    event.preventDefault();
    var newItem = $('#shopping-list-entry').val(); //<<<<<<<<<
    // why does the above work with it written out but not as a variable?? <<<<<<<<<<
    addItem(state, newItem);
    renderList(state, newItem);
  });
}

//////////////////////////////////////////
// FINAL RENDER LIST
//////////////////////////////////////////

$(function () {
  //create variables for all the items we will be interacting with -- take out all classes aboce and only put here if possible
  var formElement = $('#js-shopping-list-form');
  var formInput = $('#shopping-list-entry');
  var dataIndex = 'data-item-id';
  var listElement = $('.shopping-list');
  var checkButton = $('.shopping-item-toggle');
  var deleteButton = $('.shopping-item-delete');

  //render the list for intial load since we changed it to use ALL js and no HTML
  renderList(state);
  //call the add item function with the variables from above that are relevant to that function
  addItemSubmission (formElement, formInput, listElement, state);
  checkItemClick (checkButton, listElement, state, dataIndex);
  deleteItemClick (deleteButton, listElement, state, dataIndex);
});
