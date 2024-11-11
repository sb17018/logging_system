// ++++++ FIELDS ++++++++++ //

const USER_INPUT = document.querySelector("#userName");
const CHECKBOX_INPUT = document.querySelector("#emailAsUser");
const EMAIL_INPUT = document.querySelector("#email");
const RE_EMAIL_INPUT = document.querySelector("#reEmail");
const PASS_INPUT = document.querySelector("#password");
const VISIBILITY_ON_ICON = document.querySelector("#eyeIconOpen");
const VISIBILITY_OFF_ICON = document.querySelector("#eyeIconClosed");
const RE_PASS_INPUT = document.querySelector("#rePassword");
const SUBMIT_INPUT = document.querySelector("#submitButton");

const EMAIL_PROMPT = document.querySelector("#emailPrompt");
const EMAIL_PROMPT_TEXT = "In email format!";
EMAIL_PROMPT.textContent = EMAIL_PROMPT_TEXT;
const RE_EMAIL_PROMPT = document.querySelector("#reEmailPrompt");
const RE_EMAIL_PROMPT_TEXT = "Needs to be typed in!";
RE_EMAIL_PROMPT.textContent = RE_EMAIL_PROMPT_TEXT;
const PASS_PROMPT = document.querySelector("#passwordPrompt");
const PASS_PROMPT_TEXT = "8 characters long, at least!";
PASS_PROMPT.textContent = PASS_PROMPT_TEXT;
const RE_PASS_PROMPT = document.querySelector("#rePasswordPrompt");
const RE_PASS_PROMPT_TEXT = "Needs to be typed in!";
RE_PASS_PROMPT.textContent = RE_PASS_PROMPT_TEXT;

const PASSWORD_PATERN = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i;

// +++++++++++++ ADD LISTENERS +++++++++++++ //

document.body.addEventListener("click", checkIfEmpty);
document.querySelector("#userNameLabel").addEventListener("click", event => uncheckEmailAsUser(event));
USER_INPUT.addEventListener("click", event => uncheckEmailAsUser(event));
USER_INPUT.addEventListener("focus", event => uncheckEmailAsUser(event));
CHECKBOX_INPUT.addEventListener("click", event => event.stopPropagation());
CHECKBOX_INPUT.addEventListener("change", toggleEmailAsUser);
document.querySelector("#emailAsUserLabel").addEventListener("click", event => uncheckEmailAsUser(event));
EMAIL_INPUT.addEventListener("focus", () => { clearPropmt(); checkIfEmpty() });
EMAIL_INPUT.addEventListener("input", emailMatch);
EMAIL_INPUT.addEventListener("blur", () => { emailFormat(); emailMatchComplete() });
RE_EMAIL_INPUT.addEventListener("focus", () => { emailMatch(); checkIfEmpty() });
RE_EMAIL_INPUT.addEventListener("input", emailMatch);
RE_EMAIL_INPUT.addEventListener("blur", () => { emailMatch(); emailMatchComplete() });
PASS_INPUT.addEventListener("focus", checkIfEmpty);
PASS_INPUT.addEventListener("input", () => { passwordLength(); passwordMatch() });
PASS_INPUT.addEventListener("blur", passwordMatchComplete);
VISIBILITY_ON_ICON.addEventListener("click", toggleVisibility);
VISIBILITY_OFF_ICON.addEventListener("click", toggleVisibility);
RE_PASS_INPUT.addEventListener("focus", () => { passwordMatch(); checkIfEmpty() });
RE_PASS_INPUT.addEventListener("input", passwordMatch);
RE_PASS_INPUT.addEventListener("blur", passwordMatchComplete);
SUBMIT_INPUT.addEventListener("mouseover", event => checkEmailAsUser(event));
SUBMIT_INPUT.addEventListener("focus", event => checkEmailAsUser(event));
SUBMIT_INPUT.addEventListener("click", submitForm);


// +++++++++ operation on User field +++++++++ //

// when is exited empty, disable it and check emailAsUser checkbox
// revoke when clicked outside of empty user input
function checkIfEmpty() {
    if (USER_INPUT.value === "" && !CHECKBOX_INPUT.checked) {
        CHECKBOX_INPUT.checked = true;
        USER_INPUT.classList.add("disabled");
    }
}

function uncheckEmailAsUser(event) {
    console.log("Hi")
    USER_INPUT.classList.remove("disabled");
    USER_INPUT.focus();
    CHECKBOX_INPUT.checked = false;
    event.stopPropagation();
}

// +++++++++ operation on emailAsUser checkbox +++++++++ //

// when checking box, user field get empty, when unchecking box, cursor focuses on user field
function checkEmailAsUser(event) {
    event.preventDefault();
    USER_INPUT.value = "";
    USER_INPUT.classList.add("disabled");
    USER_INPUT.blur();
    CHECKBOX_INPUT.checked = true;
}

function toggleEmailAsUser(){
    if (CHECKBOX_INPUT.checked) {
        USER_INPUT.value = "";
        USER_INPUT.classList.add("disabled");
    }
    else {
        USER_INPUT.classList.remove("disabled");
        USER_INPUT.focus();
    }
}

// +++++++++ operation on email field +++++++++ //

// checks if input is in email format and shows prompt if not when cursor is leaving
function emailFormat() {
    let result = EMAIL_INPUT.value.match(PASSWORD_PATERN);

    if (result || EMAIL_INPUT.value == "") EMAIL_PROMPT.textContent = "";
    else EMAIL_PROMPT.textContent = "Email in wrong format!";
}

// when starting or coming back to typing its prompt should be emptied
function clearPropmt() {
    EMAIL_PROMPT.textContent = "";
}


// +++++++++ operation on email and re-email fields +++++++++ //

// checks if input in email and re-email match when typing in        
function emailMatch() {
    // when input in email empty      
    if (EMAIL_INPUT.value == "") {
        EMAIL_PROMPT.textContent = EMAIL_PROMPT_TEXT;
        RE_EMAIL_INPUT.value = "";
        RE_EMAIL_INPUT.disabled = true;
        RE_EMAIL_PROMPT.textContent = "Needs to be typed in!";
    } else {
        RE_EMAIL_INPUT.disabled = false;
        if (EMAIL_INPUT.value.substring(0, RE_EMAIL_INPUT.value.length) !== RE_EMAIL_INPUT.value) RE_EMAIL_PROMPT.textContent = "Emails don't match!";
        else RE_EMAIL_PROMPT.textContent = "";
    }
    // when input in re-email empty   
    if (RE_EMAIL_INPUT.value == "") {
        RE_EMAIL_PROMPT.textContent = RE_EMAIL_PROMPT_TEXT;
    }

}

// checks if input in email and re-email match while exiting email field  
function emailMatchComplete() {
    if (RE_EMAIL_INPUT.value !== EMAIL_INPUT.value && RE_EMAIL_INPUT.value !== "") {
        RE_EMAIL_PROMPT.textContent = "Emails don't match!";
    }
    if (EMAIL_INPUT.value === "") EMAIL_PROMPT.textContent = EMAIL_PROMPT_TEXT;
}

// prevents pasting in re-email field
RE_EMAIL_INPUT.onpaste = e => {
    e.preventDefault();
    RE_EMAIL_PROMPT.textContent = RE_EMAIL_PROMPT_TEXT;
}

// +++++++++ operation on password field +++++++++ //

// checks if input in pass and re-pass match when typing in        
function passwordLength() {
    if (PASS_INPUT.value.length > 7) PASS_PROMPT.textContent = "";
    else PASS_PROMPT.textContent = PASS_PROMPT_TEXT;
}


// +++++++++ operation on re-password field +++++++++ //

// checks if input in email and re-email match when typing in        
function passwordMatch() {
    // when input in password empty      
    if (PASS_INPUT.value.length < 8) {
        PASS_PROMPT.textContent = PASS_PROMPT_TEXT;
        RE_PASS_INPUT.value = "";
        RE_PASS_INPUT.disabled = true;
        RE_PASS_PROMPT.textContent = "Needs to be typed in!";
    } else {
        RE_PASS_INPUT.disabled = false;
        if (PASS_INPUT.value.substring(0, RE_PASS_INPUT.value.length) !== RE_PASS_INPUT.value) RE_PASS_PROMPT.textContent = "Passwords don't match!";
        else RE_PASS_PROMPT.textContent = "";
    }
    // when input in re-password empty   
    if (RE_PASS_INPUT.value == "") {
        RE_PASS_PROMPT.textContent = RE_PASS_PROMPT_TEXT;
    }
}

// checks if input in password and re-password match while exiting password field          
function passwordMatchComplete() {
    if (RE_PASS_INPUT.value !== PASS_INPUT.value && RE_PASS_INPUT.value !== "") {
        RE_PASS_PROMPT.textContent = "Passwords don't match!";
    }
}

// prevents pasting in re-password field
RE_PASS_INPUT.onpaste = e => {
    e.preventDefault();
    RE_PASS_PROMPT.textContent = RE_PASS_PROMPT_TEXT;
}

// toggle pass and re-pass visibility in re-password field
function toggleVisibility() {
    if (VISIBILITY_ON_ICON.classList.contains("visible")) {
        PASS_INPUT.setAttribute("type", "text");
        RE_PASS_INPUT.setAttribute("type", "text");
    } else {
        PASS_INPUT.setAttribute("type", "password");
        RE_PASS_INPUT.setAttribute("type", "password");
    }
    VISIBILITY_ON_ICON.classList.toggle("visible");
    VISIBILITY_OFF_ICON.classList.toggle("visible");
}


// +++++++++ operation on submit button +++++++++ //

//activate button when all * filelds completed
function activateSubmitButton() {
    if (EMAIL_INPUT.value.match(PASSWORD_PATERN) && EMAIL_INPUT.value === RE_EMAIL_INPUT.value && PASS_INPUT.value === RE_PASS_INPUT.value && EMAIL_INPUT.value !== "" && PASS_INPUT.value !== "") {
        SUBMIT_INPUT.disabled = false;
    }
    else {
        SUBMIT_INPUT.disabled = true;
    }
}

//add  function to all * fields
const INPUTS = document.querySelectorAll("input");
INPUTS.forEach((input, index) => {
    if (index > 0) {
        input.addEventListener("input", activateSubmitButton);
        input.addEventListener("blur", activateSubmitButton);
    }
});

//action on click
function submitForm(e) {
    console.log("Username = " + USER_INPUT.value + "\nEmail = " + EMAIL_INPUT.value + "\nPassword = " + PASS_INPUT.value);
}