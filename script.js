const posts = [];

const form = document.querySelector("#new-post-form");
const titleInput = document.querySelector("#title");
const contentInput = document.querySelector("#content");
const addPostBtn = document.querySelector("#add-post-btn");

const titleError = document.querySelector("#title-error");
const contentError = document.querySelector("#content-error");

const postContainer = document.querySelector("#post-container");
const noPostMsg = document.querySelector("#no-post-message");

// console.log(form);
// console.log(titleInput);
// console.log(contentInput);
// console.log(addPostBtn);
// console.log(titleError);
// console.log(contentError);
// console.log(postContainer);
// console.log(noPostMsg);


function validateTitle(){console.log(titleInput.validity);}
function validateContent(){console.log(contentInput.validity);}

titleInput.addEventListener("click", function (){validateTitle();})
contentInput.addEventListener("click", function (){validateContent()})