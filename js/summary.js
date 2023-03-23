/**
 * Varriables
 */
let todos = [];
let inProgress = [];
let awaitFeedback = [];
let doneTasks = [];
let urgentTasks = [];
let tasklist = [];
let user = [];

/**
 * init function when body is loading
 */
async function summaryInit() {
    includeHTML();
    loadCurrentUser();
    showGreeting();
    await loadTasklistForSummary()
    loadTodos();
    loadInProgress();
    loadAwaitFeedback();
    loadDoneTasks();
    loadUrgentTasks();
    loadTotalamount();
    urgentImage();
}

async function loadTasklistForSummary() {
    setURL("https://maximilian-leyh.developerakademie.net/smallest_backend_ever");
    await downloadFromServer();
    tasklist = JSON.parse(backend.getItem("tasklist")) || [];
}

function loadCurrentUser() {
    user = localStorage.getItem("currentUser");
}

/**
 * showing greeting slogan 
 */
function showGreeting() {
    let dateNow = new Date();
    let hours = dateNow.getHours();
    let greetingSlogan = returnGreetingSlogan(hours);
    currentUser = localStorage.getItem("currentUser");
    document.getElementById('greeting-slogan').innerHTML = greetingSlogan;
    document.getElementById('greeting-slogan-mobile').innerHTML = greetingSlogan;
    document.getElementById('greet').innerHTML = currentUser;
    document.getElementById('greeting-name').innerHTML = currentUser;
}

/**
 * returning the daytime greeting slogan
 * @param {number} hours - the hours of time now
 * @returns - greeting slogan
 */
function returnGreetingSlogan(hours) {
    let greetingSlogan;
    if (hours < 6 || hours > 22) {
        greetingSlogan = 'Good night, ';
    }
    if (hours >= 6 && hours < 10) {
        greetingSlogan = 'Good morning, ';
    }
    if (hours >= 10 && hours < 17) {
        greetingSlogan = 'Have a nice day, ';
    }
    if (hours >= 17 && hours <= 22) {
        greetingSlogan = 'Good evening, ';
    }
    return greetingSlogan;
}
/**
 * filtering the array for the value todo
 */
function loadTodos() {
    todos = tasklist.filter(t => t['progress'] == 'todo');
    document.getElementById('amount-todo').innerHTML = `<b>${todos.length}</b>`;
}

/**
 * filtering the array for the value inProgress
 */
function loadInProgress() {
    inProgress = tasklist.filter(t => t['progress'] == 'inprogresss');
    document.getElementById('amount-progress').innerHTML = `<b>${inProgress.length}</b>`;
}

/**
 * filtering the array for the value awaitFeedback
 */
function loadAwaitFeedback() {
    awaitFeedback = tasklist.filter(t => t['progress'] == 'awaitfeedback');
    document.getElementById('amount-feedback').innerHTML = `<b>${awaitFeedback.length}</b>`;
}

/**
 * filtering the array for the value doneTasks
 */
function loadDoneTasks() {
    doneTasks = tasklist.filter(t => t['progress'] == 'donetask');
    document.getElementById('amount-done').innerHTML = `<b>${doneTasks.length}</b>`;
}
/**
 * filtering the array of the value urgent and sort the date 
 */
function loadUrgentTasks() {
    urgentTasks = tasklist.filter(t => t['progress'] != 'donetask');
    urgentTasks = urgentTasks.filter(t => t['priority'] == 'urgent');
    if (urgentTasks.length > 0) {
        urgentTasks = urgentTasks.sort((a, b) => {
            if (a.duedate < b.duedate) {
                return -1;
            }
        });

        document.getElementById('amount-urgent').innerHTML = `<b>${urgentTasks.length}</b>`;
        let duedateunformated = JSON.stringify(urgentTasks[0]['duedate']);
        let year = duedateunformated.slice(0, 4);
        let month = duedateunformated.slice(4, 6);
        let day = duedateunformated.slice(6);
        let duedate = day + '.' + month + '.' + year;
        document.getElementById('upcoming-date').innerHTML = `<b>${duedate}</b>`;
    }
    else { document.getElementById('amount-urgent').innerHTML = "0" };
}

/**
 * filtering the array for the value amount-total
 */
function loadTotalamount() {
    document.getElementById('amount-total').innerHTML = `<b>${tasklist.length}</b>`;
}

/**
 * filtering the array, for the value urgent Tasks
 */
function urgentImage() {
    urgentTasks = tasklist.filter(t => t['progress'] != 'donetask');
    urgentTasks = urgentTasks.filter(t => t['priority'] == 'urgent');
    if (urgentTasks.length > 0) {
        return changeImage();
    }

}

/**
 * remove the classlist d-none from urgent-img
 */
function changeImage() {
    document.getElementById('urgent-img').classList.remove('d-none');
}