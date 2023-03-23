/**
 * Saves the categories on the local storage with the key 'task-category'. When add.task.html is loaded the categories are 
 * assigned to the selectedTaskValues array.
 */

async function initialize() {
    let categoriesasString = JSON.stringify(categories);
    localStorage.setItem('task-category', categoriesasString);
    selectedTaskValues = JSON.parse(localStorage.getItem('task-category'));
    renderPrioButtonsSection();
    category = await JSON.parse(backend.getItem('category')) || [];
    setTimeout(currentPage, 100);
    getMinDate();
    loadContacts();
}

/**
 * Gets "contacts" from the server
 */
async function loadContacts() {
    setURL("https://maximilian-leyh.developerakademie.net/smallest_backend_ever");
    await downloadFromServer();
    contacts = JSON.parse(backend.getItem("contacts")) || [];
}

function currentPage() {
    document.getElementById('sidebar_addtask_mobile').classList.add('background-color');
    document.getElementById('sidebar_addtask').classList.add('background-color');
}

function getMinDate() {
    document.getElementById('due-date').min = new Date().toISOString().split("T")[0];
}
/**
 * Checks if the category-container is open or not. It is checked with the classList.contains method. When it is open
 * and the user clicks, the if statement notes that the class List ist not been added, through which the else state is executed.
 */

function checkIfCategoryContainerOpen() {
    let newCategory = document.getElementById('new-category');
    if (newCategory.classList.contains('d-none'))
        openNewCategoryAndExistingCategories();
    else
        closeNewCategoryAndExistingCategories();
}

/**
 * Renders the already existing categories from the array selectedTaskValues, which is saved in the local storage.
 */

function openNewCategoryAndExistingCategories() {
    let existingCategories = document.getElementById('existing-categories');
    existingCategories.innerHTML = '';
    for (let i = 0; i < selectedTaskValues.length; i++) {
        let category = selectedTaskValues[i];
        existingCategories.innerHTML += templateExistingCategories(i, category);
    }
    removeClassDnone('new-category');
    removeClassDnone('existing-categories');
}

/**
 * When on category is clicked, the clicked function is displayed in the category-field.
 * @param {number} i is the chosen category form the array categories
 */

function selectedCategory(i) {
    selectedCategoryVariables(i);
    addClassDnone('new-category');
    deleteMistakeMessage('mistake-category-fields');
    document.getElementById('existing-categories').innerHTML = '';
    let categoryContainer = document.getElementById('category-container');
    categoryContainer.innerHTML = templateSelectedCategory();
}

/**
 * Declares the global variables with newCategoryName and selectedCategoryColor with the selected category values.
 * @param {number} i is the chosen category form the array categories
 */

function selectedCategoryVariables(i) {
    newCategoryName = selectedTaskValues[i]['name'];
    selectedCategoryColor = selectedTaskValues[i]['color'];
}

/**
 * Sets the category input field ready to create a new category and declares the global variables with newCategoryName 
 * and selectedCategoryColor as undefined so that the variables can be new declared for the new category.
 */

function createNewCategory() {
    addClassDnone('new-category');
    addClassDnone('existing-categories');
    deleteMistakeMessage('mistake-category-fields');
    newCategoryName = undefined;
    selectedCategoryColor = undefined;
    colorsForNewCategory();
    let categoryContainer = document.getElementById('category-container');
    categoryContainer.innerHTML = templateCreateNewCategory();
}

/**
 * Renders the colors from the array categoryColors.
 */

function colorsForNewCategory() {
    let categoriesForColors = document.getElementById('categories-for-colors');
    categoriesForColors.classList.add('colors');
    for (let c = 0; c < categoryColors.length; c++) {
        categoryColor = categoryColors[c];
        categoriesForColors.innerHTML += templateColorsForNewCategory(c, categoryColor);
    }
}

/**
 * The global variable selectedCategoryColor gets the selected category color value and if not you get a request to select a color.
 * @param {*} categoryColor is the string of the hex color code on the current iteration
 * @param {*} colorIndex is the selected Color Number frm the array categoryColors
 */

function addNewCategoryColor(categoryColor, colorIndex) {
    if (document.getElementById('new-category-name').value) {
        selectedCategoryColor = categoryColor;
        document.getElementById(`selected-color-${colorIndex}`).style.backgroundColor = `${categoryColor}`;
        document.getElementById('mistake-category-fields').innerHTML = '';
    }
    else
        document.getElementById('mistake-category-fields').innerHTML = 'Please enter a new category name first.';
}

/**
 * When selectedCategoryColor and newCategoryName are filled a new Category will be created. If not, 
 * the user gets explains which data is missing.
 */

function addNewCategory() {
    newCategoryName = document.getElementById('new-category-name').value;
    if (selectedCategoryColor && newCategoryName)
        whenCategoryNameAndColorAreSelected();
    else
        whenCategoryNameOrColorMissing();
}

/**
 * A new category is pushed in the array selectedTaskValues and the just now created category gets filled in the Category field.
 */

function whenCategoryNameAndColorAreSelected() {
    selectedTaskValues.push({
        'name': newCategoryName,
        'color': selectedCategoryColor
    });
    let TaskValuesAsString = JSON.stringify(selectedTaskValues);
    localStorage.setItem('task-category', TaskValuesAsString);
    document.getElementById('category-container').innerHTML = templateNewSelectedCategory();
    document.getElementById('categories-for-colors').innerHTML = '';
    document.getElementById('categories-for-colors').classList.remove('colors');
}

/**
 * If one of the variables are undefinded, respectively when color or name isnt filled yet.
 */

function whenCategoryNameOrColorMissing() {
    if (newCategoryName)
        document.getElementById('mistake-category-fields').innerHTML = 'Please select the color for the new category.';
    else
        document.getElementById('mistake-category-fields').innerHTML = 'Please enter a new category name first.';
}

/**
 * Reopens the original Select task category field and the existing categories.
 */

function reOpenExistigCategorys() {
    document.getElementById('category-container').innerHTML = templateOriginalCategoryField();
    openNewCategoryAndExistingCategories();
}

/**
 * Checks if contacts for Assignment are visible by using the classList.contains method.
 */

function checkIfAssignedToIsOpen() {
    let existingContacts = document.getElementById('existing-contacts');
    if (existingContacts.classList.contains('d-none'))
        openExistingContacts();
    else
        addClassDnone('existing-contacts');
}

/**
 * Renders the contacts from the array contacts and seperates them into the ones who are in the array assignedToContacts and who are not
 * this array. It is done to divide them, into the checked contacts, which the user has clicked on, and the contacts who aren´t checked.
 */

function openExistingContacts() {
    deleteMistakeMessage('assigned-to-contacts-required');
    removeClassDnone('existing-contacts');
    let existingContacts = document.getElementById('existing-contacts');
    existingContacts.innerHTML = '';
    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        let findIndex = assignedToContacts.indexOf(i);
        if (assignedToContactIsInArray(findIndex))
            existingContacts.innerHTML += templateExistingContactsChecked(i, contact);
        else
            existingContacts.innerHTML += templateExistingContacts(i, contact);
    }
    existingContacts.innerHTML += templateInvitePerson();
}

/**
 * To add a new Person to the current Task, the existing contacts gets closed 
 * and the input field is opened in the div with the id existing-contacts.
 */

function assignNewPerson() {
    addClassDnone('existing-contacts');
    document.getElementById('contact-container').innerHTML = templateInputNewPerson();
}

/**
 * New Person gets pushed in the array contacts. The index postition of the new Person is found out with the length method - 1.
 * This is important to push the index postition in the array assignedToContacts and for every element in this array an icon gets created 
 * with the function renderAssignedToIconsSection.
 */

function addNewPerson() {
    let email = document.getElementById('email').value;
    let name = email.split('@');
    let icon = email.slice(0, 2);
    let color = randomColorForUserIcon();
    contacts.push({ 'name': name, 'icon': icon, 'iconcolor': color });
    let currentPushedContactIndex = contacts.length - 1;
    addAssignedToIcon(currentPushedContactIndex);
    renderAssignedToIconsSection();
    templateExitNewPerson();
}

/**
 * @returns a random color from the array userIconColors.
 */
function randomColorForUserIcon() {
    return userIconColors[Math.floor(Math.random() * userIconColors.length)];
}

/**
 * 
 * @param {number} findIndex is the result of the indexOf mehthod used for the array assignedToContacts.
 * @returns -1 if the number of the contact i isn´t in the array assignedToContacts. 
 * And if it is, it returns the place, where the i is in the array.
 */

function assignedToContactIsInArray(findIndex) {
    return findIndex > -1;
}

/**
 * checks if the contact is already in the array assignedToContacts or not. After that the selected Contacts gets rendered.
 * @param {number} i is the number in which position the clicked contact i the array is.
 */

function checkAssignedToIcons(i) {
    let findIndex = assignedToContacts.indexOf(i);
    if (assignedToContactIsInArray(findIndex)) {
        removeAssignedToIcon(findIndex);
    }
    else {
        addAssignedToIcon(i);
    }
    renderAssignedToIconsSection();
}

/**
 * Deletes the i from the array assignedToContacts on the position of findIndex.
 * @param {number} findIndex is the result of the indexOf method used for the array assignedToContacts.
 */

function removeAssignedToIcon(findIndex) {
    assignedToContacts.splice(findIndex, 1);
}

/**
 * I from the array contacts is pushed in the array assignedToContacts.
 * @param {number} i is the number in which position the clicked contact i the array is.
 */

function addAssignedToIcon(i) {
    assignedToContacts.push(i);
}

/**
 * When the current task is created, the selected numbers from the assignedToContacts Array are used to get the whole contact Object from
 * the JSON contacts array and they are pushed in the array contactsForCurrentTask.
 */

function assignedToContactsForCurrentTask() {
    for (let i = 0; i < assignedToContacts.length; i++) {
        let contactNumber = assignedToContacts[i];
        contactsForCurrentTask.push(contacts[contactNumber]);
    }
}

/**
 * Renders the Icons from the assignedToContacts Array.
 */

function renderAssignedToIconsSection() {
    let assignedToIconsSection = document.getElementById('assigned-to-icons-section');
    assignedToIconsSection.innerHTML = '';
    for (let i = 0; i < assignedToContacts.length; i++) {
        assignedToIndex = assignedToContacts[i];
        assignedToIconsSection.innerHTML += templateAssignedToContactIcons(assignedToIndex);
    }
}

/**
 * Converts the date to a string with the year first, the month second, and the days third.
 */

function convertDate() {
    let dueDate = document.getElementById('due-date').value;
    let year = dueDate.slice(0, 4);
    let month = dueDate.slice(5, 7);
    let day = dueDate.slice(8, 10);
    date = year + month + day;
}

/**
 * Renders the priority buttons from the array priorities.
 */

function renderPrioButtonsSection() {
    let prioButtonsSection = document.getElementById('prio-buttons-section');
    prioButtonsSection.innerHTML = '';
    for (let i = 0; i < priorities.length; i++) {
        prioButtonsSection.innerHTML += templatePrioButtonsSection(i);
    }
}

/**
 * Selected pririty button gets highlighted and if another button was clicked before, the button returns to his original design.
 * @param {number} i is the selected position from the array priorities
 */

function selectedPriority(i) {
    deleteMistakeMessage('priority-required');
    changeStyleOfSelectedButton(i);
    resetOtherPriorityButtons(i);
}

/**
 * Changes background color and font color from the selected priority button or removes the style when selected buttn gets clicked again.
 * @param {number} i is the selected position from the array priorities
 */

function changeStyleOfSelectedButton(i) {
    let id = priorities[i]['name'];
    let button = document.getElementById(id);
    if (!button.classList.contains('white')) {
        addSelectedButtonStyle(button, i);
    }
    else
        removeStyleOfUnclickedButton(button, i);
}

/**
 * Styles the clicked button with a new background color and the font color white.
 * @param {string} button is the id name of the clicked element, e.g.urgent 
 * @param {number} i is the position of the clicked button in the array priorities
 */

function addSelectedButtonStyle(button, i) {
    button.style.backgroundColor = `${priorities[i]['color']}`;
    button.classList.add('white');
    document.getElementById(`img-${i}`).src = `${priorities[i]['selected-image']}`;
}

/**
 * Checks if a button was clicked before another button has been clicked.
 * @param {number} i is the position of the unclicked button in the array priorities.
 */

function resetOtherPriorityButtons(i) {
    for (let p = 0; p < priorities.length; p++) {
        let priorityId = priorities[p]['name'];
        let button = document.getElementById(priorityId);
        if (p != i && button.classList.contains('white'))
            removeStyleOfUnclickedButton(button, p);
    }
}

/**  
 * Removes the style of the unclicked button to his original style.
 * @param {string} button is the id name of the unclicked element, e.g.urgent.
 * @param {number} p is the position of the unclicked button in the array priorities
 */

function removeStyleOfUnclickedButton(button, p) {
    document.getElementById(`img-${p}`).src = `${priorities[p]['image']}`;
    button.style.backgroundColor = 'white';
    button.classList.remove('white');
}

/**
 * When the task gets created, the current clicked priority button which is stored in the variable priorityId is assigned to the 
 * global variable priorityNameForTask.
 */

function priorityForCurrentTask() {
    for (let i = 0; i < priorities.length; i++) {
        let priorityId = priorities[i]['name'];
        let button = document.getElementById(priorityId);
        if (button.classList.contains('white'))
            priorityNameForTask = priorityId;
    }
}

/**
 * If the value of the subtask input is bigger than 3, the subtask will be added with the function addSubtask. If not, an 
 * error message is displayed.
 */

function checkSubtaskInputValue() {
    let inputSubtask = document.getElementById('input-subtask-area');
    let subtaskToShort = document.getElementById('subtask-to-short');
    if (inputSubtask.value.length < 3) {
        subtaskToShort.innerHTML = 'Your entry must be at least 3 characters long.';
    }
    else {
        subtaskToShort.innerHTML = '';
        addSubtask(inputSubtask.value);
        document.getElementById('input-subtask-area').value = '';
        closeSubtaskInputField();
    }
}

/**
 * Pushes the input of the subtask in the array subtasksForCurrenttask. Since the task is not yet processed the completeted variable is
 * is set to false.
 * @param {string} inputSubtask is the value of the input subtask field which the user has entered.
 */

function addSubtask(inputSubtask) {
    subtasksForCurrenttask.push({ task: inputSubtask, completed: false });
    renderSubtasks();
}

/**
 * Renders the elements depending on the completet status. If the completed status is false the function templateRenderSubtasksNotCompleted
 * is executed. And if the completed status is true the function templateRenderSubtasksWhichAreCompleted is executed.
 */

function renderSubtasks() {
    let subtaskList = document.getElementById('subtask-list');
    subtaskList.innerHTML = '';
    for (let i = 0; i < subtasksForCurrenttask.length; i++) {
        let taskElement = subtasksForCurrenttask[i];
        if (checkCompletedStatus(i) == false) {
            subtaskList.innerHTML += templateRenderSubtasksNotCompleted(taskElement, i);
        }
        else {
            subtaskList.innerHTML += templateRenderSubtasksWhichAreCompleted(taskElement, i);
        }
    }
}

/**
 * @param {number} i is the position of the selected subtask in the array subtasksForCurrenttask.
 * @returns the Boolean value of completed in the array subtasksForCurrenttask at the position i.
 */

function checkCompletedStatus(i) {
    if (!subtasksForCurrenttask[i].completed)
        return false;
    else
        return true;
}

/**
 * The completed boolean value gets changed in dependence of the currentCheckbox status at the position if, when the input checkbox
 * gets clicked.
 * @param {number} i is the position of the selected subtask in the array subtasksForCurrenttask.
 */

function changeCurrentCompleteStatus(i) {
    let currentCheckbox = document.getElementById(`checkbox-${i}`);
    if (currentCheckbox.checked)
        subtasksForCurrenttask[i].completed = true;
    else
        subtasksForCurrenttask[i].completed = false;
}