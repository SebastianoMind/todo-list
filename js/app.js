
const addButton = document.getElementById('add-button');
const enterKey = document.getElementById('todo-entry-box');



addButton.addEventListener('click', function () {
    addToDoItem();
    clearInput();
});

enterKey.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        addToDoItem();
        clearInput();

    }
})


let loadButton = document.getElementById('load-button');
loadButton.addEventListener('click', function () {
    loadList();
})

let clearButton = document.getElementById('clear-completed-button')
clearButton.addEventListener('click', function () {
    clearCompletedToDoItems();
})

let emptyButton = document.getElementById('empty-button');
emptyButton.addEventListener('click', emptyList);

let saveButton = document.getElementById('save-button');
saveButton.addEventListener('click', saveList);



// vartiabile del selettore Html che ho come id todo-entry-box
var toDoEntrybox = document.getElementById('todo-entry-box');

// variabile del selettore html che ha come id todo-list
var toDoList = document.getElementById('todo-list')

function newToDoItem(itemText, completed) {
    let toDoItem = document.createElement('li');
    let toDoText = document.createTextNode(itemText);

    toDoItem.appendChild(toDoText);

    if (completed) {
        toDoItem.classList.add('completed');
    }

    toDoList.appendChild(toDoItem);
    toDoItem.addEventListener('dblclick', toggleToDoItemState);
}

function addToDoItem() {
    let itemText = toDoEntrybox.value;
    newToDoItem(itemText, false);

}

function toggleToDoItemState() {
    if (this.classList.contains('completed')) {
        this.classList.remove('completed');

    }
    else {
        this.classList.add('completed');
    }
}



function clearCompletedToDoItems() {
    let completedItems = toDoList.getElementsByClassName('completed');
    while (completedItems.length > 0) {
        completedItems.item(0).remove();
    }

}

function emptyList() {
    let toDoItems = toDoList.children;

    while (toDoItems.length > 0) {
        toDoItems.item(0).remove();
    }

    localStorage.clear();
}

function saveList() {

    let toDos = [];

    for (let i = 0; i < toDoList.children.length; i++) {

        let toDo = toDoList.children.item(i);

        var toDoInfo = {
            "task": toDo.innerText,
            "completed": toDo.classList.contains('completed')
        };

        toDos.push(toDoInfo);

    };
    console.log(toDos);

    localStorage.setItem('toDos', JSON.stringify(toDos));

}


function stopGoInterval() {

    let intervallo = setInterval(saveList, 10000);

    let stopInterval = document.getElementById('todo-list').children;

    if (stopInterval.length == 0) {
        clearInterval(intervallo);
    }
    else {
        saveList();
    }

}

setInterval(stopGoInterval, 1000);



function loadList() {

    if (localStorage.getItem('toDos') != null) {
        emptyList()
        let toDos = JSON.parse(localStorage.getItem('toDos'));

        for (let i = 0; i < toDos.length; i++) {
            let toDo = toDos[i];
            newToDoItem(toDo.task, toDo.completed);
        }


    }
}

function clearInput() {
    document.getElementById('todo-entry-box').value = '';



}









