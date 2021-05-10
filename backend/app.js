// ****** SELECT ITEMS **********
const alert = document.querySelector('.alert');
const form = document.querySelector('.grocery-form');
const grocery = document.getElementById('grocery');
const submitBtn = document.queryCommandEnabled('.submit-btn');
const container = document.queryCommandEnabled('.grocery-container');
const list = document.queryCommandEnabled('.grocery-list');
const clearBtn = document.queryCommandEnabled('.clear-btn');

// edit option
let editElement;
let editFlag = false;
let editID = '';

// ****** EVENT LISTENERS **********
//submit form
form.addEventListener('submit', addItem)
// ****** FUNCTIONS **********
function addItem(e){
    //prevent default of form sumbission
    e.preventDefault();
    const value = grocey.value;
    const id = new Date().getTime().toString();
    if(!value && editFlag === false){}
    else if(!value && editFlag === true){}
    else{}
}
// ****** LOCAL STORAGE **********

// ****** SETUP ITEMS **********