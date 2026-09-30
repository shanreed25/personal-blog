const posts = [];

const form = document.querySelector("#new-post-form");
const titleInput = document.querySelector("#title");
const contentInput = document.querySelector("#content");
const addPostBtn = document.querySelector("#add-post-btn");

const titleError = document.querySelector("#title-error");
const contentError = document.querySelector("#content-error");

const postsContainer = document.querySelector("#posts-container");
const noPostMsg = document.querySelector("#no-post-message");

const LOCAL_STORAGE_KEY = "blogPosts"; //name the localStorage stores the data as

//Title error messages object, that maps the flag to the error message
const titleErrorMsgs = {
    valueMissing: "Title is required" ,
    tooLong: "Title must be 100 characters or less",//this will neverbe true because i am using maxlength attribute int the HTML, so this error message will never show
    customError: null, //null will make it use the validationMessage
};

//Content error messages object, that maps the flag to the error message
const contentErrorMsgs = {
    valueMissing: "Content is required" ,
    customError: null, //null will make it use the validationMessage
};



//this function works for both title and content
function validateInput(input, errSpan, inputMessages){
    input.classList.add("touched");
    //check inputs for only spaces and then set a custom error message
    if (input.value.length > 0 && input.value.trim() === "") {
        input.setCustomValidity("Enter more than just spaces");
    } else {
        input.setCustomValidity("");
    }

    //Object.entries(inputMessages) turns the object into an array, where each value is an array
    //with the matching key and value like [[key1, value1], [key2, value2] etc....]
    // then the each [key, value] array is destructured into a flag and message avriable
    for (const [flag, message] of Object.entries(inputMessages)){
        if (input.validity[flag]) {//look up each flag on the validity object, then sets error message for the first one that is true
            errSpan.textContent = message ?? input.validationMessage; //use message unless message is null or undefined, then use field.validationMessage
            return false;//I only want one message to show so the loop needs to stop, and return false so the form does not submit
        }
    }
    errSpan.textContent = "";//if the loop completes with no match the span is cleared
    return true;// need the function to return true or false because that is the signal that the form is ok to submit
};

//adds each post to the post list
function addPostToList(){
    const post = {
        id: crypto.randomUUID(),
        title: titleInput.value.trim(),
        content: contentInput.value.trim(),
        timestamp: new Date(Date.now()),
    }

    posts.unshift(post)
}
//Creates cards for 
function createPostCards(){
    posts.forEach(post => {
        const postContainer = document.createElement("li");
        const title = document.createElement("h3");
        const content = document.createElement("p");
        const timestamp = document.createElement("p");


        const postButtons = document.createElement("div");
        const editButton = document.createElement("button");
        const deleteButton = document.createElement("button");
        
        postContainer.classList.add("post-card");
        title.classList.add("post-title");
        postContainer.dataset.id = post.id;
        


        postButtons.classList.add("post-btns-container");
        editButton.type = "button";
        editButton.classList.add("post-btn", "edit-btn");
        deleteButton.type = "button";
        deleteButton.classList.add("post-btn", "delete-btn");

        title.textContent = post.title;
        content.textContent = post.content;

        const date = new Date(post.timestamp);
        const postDate = date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
        });
        timestamp.textContent = postDate;
        editButton.textContent = "EDIT";
        deleteButton.textContent = "DELETE";

        postButtons.append(editButton, deleteButton);
        postContainer.append(title, timestamp, content, postButtons);

        postsContainer.appendChild(postContainer);
    })
};

//displays the list of post in the UI
function renderPost(){
    postsContainer.innerHTML = " ";//remove currently rendered post
    //Remove empty state message
    if (posts.length > 0){
        noPostMsg.classList.add("no-msg")
    }

    createPostCards();
    
    console.log(posts);
}

//Saves to local storagee
function saveLocalPosts(){
    const localposts = JSON.stringify(posts);
    localStorage.setItem(LOCAL_STORAGE_KEY, localposts)
};

// addEventListener passes the event object as the first argument automatically,
// so validateInput is wrapped in a function that calls it with the three values it needs
titleInput.addEventListener("input", () => validateInput(titleInput, titleError, titleErrorMsgs));
contentInput.addEventListener("input", () => validateInput(contentInput, contentError, contentErrorMsgs));

form.addEventListener("submit", function (e){
    e.preventDefault();
    

    const titileValid = validateInput(titleInput, titleError, titleErrorMsgs);
    const contentValid = validateInput(contentInput, contentError, contentErrorMsgs);

    //object with a true or false value for each input that indicates if the field is valid or not
    const isFormValid = {
        titileValid: titileValid,
        contentValid: contentValid,
    }


    //returns an array of the objects values something like [true, true, false, false]
    const isFormValidArr = Object.values(isFormValid); 

    //if every value in the array is true, this returns true
    const formValid = isFormValidArr.every((field) => field === true);

    //return first invalid field
    const firstInvalidfield = form.querySelector(":invalid");

    if (formValid) {
        alert("Form Submitted");
        addPostToList();
        renderPost();
        form.reset();

        /*remove touch class from input*/
        [titleInput, contentInput].forEach((input) => input.classList.remove("touched"));
        
    } else if (firstInvalidfield) {
        //If any field is invalid, focus on the first invalid field.
        firstInvalidfield.focus();
  }
});
