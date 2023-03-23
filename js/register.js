
let users = [];

setURL('https://maximilian-leyh.developerakademie.net/smallest_backend_ever');
/**
 * Downloading users json from server
 */
async function init() {
    await downloadFromServer();
    users = JSON.parse(backend.getItem("users")) || [];
}
/**
 * Adding user to backend
 */
async function addUser(){
    let email = document.getElementById('Email_signup');
    let name = document.getElementById('Name_signup');
    let password = document.getElementById('password_input');
    users.push({name: name.value, email: email.value, password: password.value});
    await  backend.setItem('users', JSON.stringify(users));
    //Going to login screen
    window.location.href = './index.html';
}


