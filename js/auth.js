let passwordState = 0;
let currentUser = "";
let rememberMe = false;

/**
 * Loading login form
 */
function loadHtml() {
    let loginForm = document.getElementById("form");
    document.getElementById("header_left").classList.remove("d-none");
    loginForm.innerHTML = ``;
    loginForm.innerHTML = htmlLogin();
}

function htmlLogin() {
    return `
<div class="login_form">
    <h2>Log in</h2>
    <form onsubmit="login(); return false;">
        <input class="input_mail" type="email" placeholder="Email" id="Email_login" required>
        <div style=position:relative;>
            <input type="password" placeholder="Password" id="password_input"class="input_password" required>
            <img onclick="changeVisibility()" id="login-password-image" class="img-password" src="./assets/img/password_icon.png">
        </div>
            <div id="wrongPassword" class="wrong-password d-none">Wrong Email/Password!</div>
            <div class="login_form_part3">
             <div style="display:flex;">
             <input type="checkbox" id="remember_me">
             <p>Remember me</p>
            </div>
             <p onclick="loadForgotPassword()" class="forgot_password">Forgot my password</p>
            </div>
                <div class="loginform_buttonarea">
                    <button class="login_button" type="submit">Log in</button>
                    <a onclick="loginGuest()" class="guest_button" formnovalidate >Guest Log in</a>
        </div>
    </form>
</div>
  `;
}

/**
 * Checking if user is already signed in
 * Login
 */
function login() {
    let email = document.getElementById("Email_login");
    let password = document.getElementById("password_input");
    let user = users.find((u) => u.email == email.value && u.password == password.value);
    if (user) {
        currentUser = user.name;
        localStorage.setItem("currentUser", currentUser);
        window.location.href = "./summary.html";
    } else {
        event.preventDefault();
        document.getElementById("wrongPassword").classList.remove("d-none");
        email.value = "";
        password.value = "";
    }
}

function loginGuest() {
    localStorage.setItem("currentUser", "Guest");
    window.location.href = "./summary.html";
}

/**
 * Toggle password input
 */
function changeVisibility() {
    if (passwordState === 0) {
        document.getElementById("login-password-image").src = "./assets/img/visibility-off.png";
        document.getElementById("password_input").type = "password";
        passwordState = 1;
    } else {
        document.getElementById("login-password-image").src = "./assets/img/visibility.png";
        document.getElementById("password_input").type = "text";
        passwordState = 0;
    }
}

/**
 * Loading sig up form
 */
function loadSignUpForm() {
    let signUpForm = document.getElementById("form");
    document.getElementById("header_left").classList.add("d-none");
    signUpForm.innerHTML = ``;
    signUpForm.innerHTML = htmlSignup();
}

function htmlSignup() {
    return `

 <div class="login_form">
  <h2>Sign up</h2>
  <img onclick="loadHtml()" class="arrow" src="./assets/img/arrow-left.png">
  <form onsubmit="addUser(); return false">
       <input class="input_name" type="text" placeholder="Name" id="Name_signup" required>
       <input class="input_mail" type="email" placeholder="Email" id="Email_signup" required>
       <div style=position:relative;>
                <input type="password" placeholder="Password" id="password_input"class="input_password"  minlength="8" required>
                <img onclick="changeVisibility()" id="login-password-image" class="img-password" src="./assets/img/password_icon.png">
        </div>
       <div class="loginform_buttonarea">
       <button class="login_button" type="submit">Sign up</button>
       </div>
   </form>
 </div>

`;
}

/**
 * Loading forgot password form
 */
function loadForgotPassword() {
    let signUpForm = document.getElementById("form");
    document.getElementById("header_left").classList.add("d-none");
    signUpForm.innerHTML = ``;
    signUpForm.innerHTML = htmlForgotPassword();
}

/**
 * Send automatic mail
 */
async function onSubmit(event) {
    event.preventDefault(); // prevent default form action
    let formData = new FormData(event.target); // create a formdata based on our form element in HTML
    let response = await action(formData);
    if (response.ok) {
        alert("Email was send!"); // Feedback für enduser
        document.getElementById("email_signup").value = "";
        window.location.href = "./index.html";
    } else {
        alert("Email not send!");
    }
}

/**
 * Sending mail and giving back true or false
 */
function action(formData) {
    let email = document.getElementById("email_signup");
    let user = users.find((u) => u.email == email.value);
    if (user) {
        const input = "https://maximilian-leyh.developerakademie.net/send_mail_join/send_mail.php";
        const requestInit = {
            method: "post",
            body: formData,
        };
        return fetch(input, requestInit);
    } else {
        alert("Email is not assigned!");
    }
}

function htmlForgotPassword() {
    return `
<div class="login_form">
  <h2 class="text-size">I forgot my <br> Password</h2>
  <img onclick="loadHtml()" class="arrow" src="./assets/img/arrow-left.png">
  <p style="margin-top:-10px; margin-bottom:40px; text-align:center;">Don´t worry! We will send an email with the instructions to <br> reset your password.</p>
  <form onsubmit="onSubmit(event)">
       <input class="input_mail" type="email"  name="email" placeholder="Email" id="email_signup" required>
       <div class="loginform_buttonarea">
       <button class="login_button" style="margin-top:20px;" type="submit">Send me the email</button>
       </div>
   </form>
</div>
   `;
}
