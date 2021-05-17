// ****** SELECT ITEMS **********
const alert = document.querySelector('.alert');
const form = document.querySelector('.grocery-form');
const grocery = document.getElementById('grocery');
const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.grocery-container');
const list = document.querySelector('.grocery-list');
const clearBtn = document.querySelector('.clear-btn');

// edit option
let editElement;
let editFlag = false;
let editID = '';

// ****** EVENT LISTENERS **********
//submit form
form.addEventListener('submit', addItem)
// clear items
clearBtn.addEventListener("click", clearItems);


// ****** FUNCTIONS **********
function addItem(e){
    //prevent default of form sumbission
    e.preventDefault();
    const value = grocery.value;
    const id = new Date().getTime().toString();
    if(value && !editFlag){
        const element = document.createElement('article');
        // add class
        element.classList.add('grocery-item');
        //add id
        const attr = document.createAttribute('data-id');
        attr.value = id;
        element.setAttributeNode(attr);
        element.innerHTML =
            `<p class="title">${value}</p>
            <div class="btn-container">
                <button type="button" class="edit-btn">
                    <i class="fas fa-edit"></i>
                </button>
                <button type="button" class="delete-btn">
                <i class="fas fa-trash"></i>
            </button>
            </div>`;
        //target delete/edit AFTER created for access
        const deleteBtn = element.querySelector('.delete-btn');
        const editBtn = element.querySelector('.edit-btn');
        deleteBtn.addEventListener('click', deleteItem);
        editBtn.addEventListener('click', editItem);
        //append child
        list.appendChild(element);
        //display alert
        displayAlert('item added to your list', 'success');
        //show container
        container.classList.add('show-container');
        //add to local storage
        addToLocalStorage(id, value);
        //set back to default
        setBackToDefault();
    }
    else if(value && editFlag){
        editElement.innerHTML = value;
        displayAlert('item changed', 'success');
        //editLocalStorage(editID, value);
        setBackToDefault();
    }
    else{
        displayAlert('please enter value', 'danger')
    }
}

//display alert
function displayAlert(text, action){
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);

    //remove alert
    setTimeout(function(){
        alert.textContent = '';
        alert.classList.remove(`alert-${action}`);
    }, 1000);
}

//clear items
function clearItems(){
    const items = document.querySelectorAll('.grocery-item');
    if(items.length > 0){
        items.forEach(function(item){
            list.removeChild(item);
        });
    }
    container.classList.remove('show-container');
    displayAlert('empty list', 'danger');
    setBackToDefault();
    //localStorage.removeItem('list');
}

//edit function
function editItem(e){
    const element = e.currentTarget.parentElement.parentElement;
    //set edit item/access 'title'
    editElement = e.currentTarget.parentElement.previousElementSibling;
    //set form value
    grocery.value = editElement.innerHTML;
    editFlag = true;
    editID = element.dataset.id;
    //change value on submit
    submitBtn.textContent = 'edit';
}
//delete function
function deleteItem(e){
    //grab parent's parent/grocery item
    const element = e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id;
    list.removeChild(element);
    //if no more list items: remove container
    if(list.children.length === 0){
        container.classList.remove('show-container');
    }
    displayAlert('item removed', 'danger');
    setBackToDefault();
    //remove from local storage
    //removeFromLocalStorage(id);
}
//set back to default
function setBackToDefault(){
    grocery.value = '';
    editFlag = false;
    editID = '';
    submitBtn.textContent = 'Add';
}


// ****** LOCAL STORAGE **********
function addToLocalStorage(id, value){
    //ES6 shorthand for {id:id, value:value} because value name and property name are the same
    const grocery = {id, value};
    //ternary operatory (if item exists, get item. if no item, let items equal '[]')
    let items = localStorage.getItem('list')?JSON.parse(localStorage.getItem('list')):[];
    //console.log(items)
    items.push(grocery);
    localStorage.setItem('list', JSON.stringify(items));
}

function removeFromLocalStorage(id){

}

function editLocalStorage(id, value){}
    //localStorage API
    //setItem
    //getItem
    //removeItem
    //save as strings
    //LOCAL STORAGE REFERENCE
    //localStorage.setItem('orange', JSON.stringify(['item1', 'item2']));
    //const oranges = JSON.parse(localStorage.getItem('orange'));
    //console.log('oranges');
    //localStorage.removeItem('orange');
// ****** SETUP ITEMS **********