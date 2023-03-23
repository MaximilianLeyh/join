/**
 * Changes the image from the clear Button, so it will be displayed in light blue whe the user hovers over the button.
 */

function showClearImgLightBlue() {
    document.getElementById('clear-img').src = './assets/img/clear-x-light-blue.svg';
}

/**
 * Is called with the event-handler onmouseout, so it will displayed a dark blue, if the user no longer hovers over the button.
 */

function showClearImgDarkBlue() {
    document.getElementById('clear-img').src = './assets/img/clear-x.svg';
}

/**
 * Closes the categories by adding the class d-none (display: none).
 * The function is used in the function checkIfCategoryContainerOpen.
 */

function closeNewCategoryAndExistingCategories() {
    addClassDnone('existing-categories');
    addClassDnone('new-category');
}

/**
 * If the input field is set for a new category and the x is clicked, this function removes the input and sets the Categor field 
 * to its original version.
 */

function removeCategoryInput() {
    document.getElementById('categories-for-colors').classList.remove('colors');
    document.getElementById('mistake-category-fields').innerHTML = '';
    document.getElementById('categories-for-colors').innerHTML = '';
    document.getElementById('category-container').innerHTML = templateOriginalCategoryField();
}

/**
 * Changes the input field to the actual input field, where the subtask can be entered or removed.
 */

function changeSubtaskInputField() {
    addClassDnone('subtask-before');
    removeClassDnone('subtask-after');
    focusOnField('input-subtask-area');
}

/**
 * Focus on the input field is highlighted.
 * @param {string} idElement gets the id of a Document Object Model Element.
 */

function focusOnField(idElement) {
    document.getElementById(idElement).focus();
}

/**
 * Closes the SubtaskInput Field by showing the original div with the id 'subtask-before'.
 */

function closeSubtaskInputField() {
    removeClassDnone('subtask-before');
    addClassDnone('subtask-after');
    document.getElementById('subtask-to-short').innerHTML = '';
    document.getElementById('input-subtask-area').value = '';
}

/**
 * Clears the input fields values.
 */

function deleteInputandTextareaValues() {
    document.getElementById('input-title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('due-date').value = '';
    document.getElementById('input-subtask-area').value = '';
}

/**
 * Taskid gets the number from the tasklist.length. This will be the identification number for the current task.
 */

function getIdFromTasklist() {
    taskid = tasklist.length
}

/**
 * All tasks already created are loaded from the server to get the id number for the currentTask with the function getIdFromTasklist.
 */

async function loadTasklistForId() {
    setURL("https://maximilian-leyh.developerakademie.net/smallest_backend_ever");
    await downloadFromServer();
    tasklist = JSON.parse(backend.getItem("tasklist")) || [];
    getIdFromTasklist();
}

/**
 * User is redirected to board.html.
 */

function redirectToBoardPage() {
    window.location.href = "./board.html";
}

/**
 * This function removes the class d-none, so the Element is there.
 * @param {string} idElement is the id of the HTML-Element
 */

function removeClassDnone(idElement) {
    document.getElementById(idElement).classList.remove('d-none');
}

/**
 This function adds the class d-none, so the Element is not there.
 * @param {string} idElement is the id of the HTML-Element
 */

function addClassDnone(idElement) {
    document.getElementById(idElement).classList.add('d-none');
}