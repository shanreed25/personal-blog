# Interactive Personal Blog Platform

> Demostrates DOM manipulation handling user events, implementing form validation, and utilizing localStorage for data persistence. The primary focus is on client-side JavaScript functionality to create a dynamic and interactive web application.



# Current Status
> Form fields are validated whenever the user types and shows one custom error message at a time
- One error messages object for each input
- One function that takes the input, the error span element and a error message object. The function
    - checks the input for only spaces, if it has spaces `setCustomValidity()` sets a custom message for it
    - the error message object is converted to an array
    - the array is compared aganist the `validity` object's flags and the for first one that is true it sets the message for it
    - this function returns true(when there are no errors) or false(when the are errors) so it can be used to determine if the form is completely valid