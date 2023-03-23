let email = "";
let users;

/**
 * url for backend
 */
setURL("https://maximilian-leyh.developerakademie.net/smallest_backend_ever");

function onPageLoad() {
    email = getEmailUrlParameter();
    users = getUsers();
}

/**
 * Get mail adresse from url
 * @returns email as string
 */
function getEmailUrlParameter() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const email = urlParams.get("email");
    return email;
}

function onSubmit(event) {
    event.preventDefault();
}

/**
 * load users from backend
 */
async function getUsers() {
    await downloadFromServer();
    users = JSON.parse(backend.getItem("users")) || [];
}

/**
 * reset password
 */
function resetPassword() {
    let password = document.getElementById("password");
    let confirmedPassword = document.getElementById("password_input");
    let user = users.find((u) => u.email == email);
    if (password.value == confirmedPassword.value && user) {
        let newPassword = document.getElementById("password_input");
        user.password = newPassword.value;
        alert("Password is reseted!");
        save();
    } else {
        alert("Passwords do not match!");
    }
}

async function save() {
    await backend.setItem("users", JSON.stringify(users));
    window.location.href = "./index.html";
}

/**
 * toggle password input
 */
function changeVisibilityResetPassword() {
    if (passwordState === 0) {
        document.getElementById("login-password-image").src = "./assets/img/visibility-off.png";
        document.getElementById("password").type = "password";
        passwordState = 1;
    } else {
        document.getElementById("login-password-image").src = "./assets/img/visibility.png";
        document.getElementById("password").type = "text";
        passwordState = 0;
    }
}
