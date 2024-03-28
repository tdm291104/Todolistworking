
let lists = document.getElementsByClassName("list");
let todo = document.getElementById("todos");
let doing = document.getElementById("doings");
let completed = document.getElementById("completeds");
let blocked = document.getElementById("blockeds")

document.addEventListener("DOMContentLoaded", function() {
    loadState();
    attachDragAndDropEvents(); // Gắn sự kiện kéo và thả sau khi trang được tải lại
});

// Load trạng thái từ Local Storage
function loadState() {
    let savedState = localStorage.getItem("listsState");
    if (savedState) {
        let state = JSON.parse(savedState);
        todo.innerHTML = state.todo;
        doing.innerHTML = state.doing;
        completed.innerHTML = state.completed;
        blocked.innerHTML = state.blocked;
    }
}

// Lưu trạng thái vào Local Storage
function saveState() {
    let state = {
        todo: todo.innerHTML,
        doing: doing.innerHTML,
        completed: completed.innerHTML,
        blocked: blocked.innerHTML
    };
    localStorage.setItem("listsState", JSON.stringify(state));
}


function attachDragAndDropEvents() {
    // Thiết lập sự kiện "dragstart" cho các phần tử trong danh sách
    for (let i = 0; i < lists.length; i++) {
        lists[i].addEventListener("dragstart", function(e) {
            let selected = e.target;
            selected.classList.add("dragging");
        });

        lists[i].addEventListener("dragend", function(e) {
            let selected = e.target;
            selected.classList.remove("dragging");
            saveState();
        });
    }

    // Thiết lập sự kiện "drop" cho danh sách "todos"
    todo.addEventListener("drop", function(e) {
        e.preventDefault();
        let draggedItem = document.querySelector(".dragging");
        if (draggedItem) {
            todo.appendChild(draggedItem);
            saveState();
        }
    });

    // Thiết lập sự kiện "drop" cho danh sách "doings"
    doing.addEventListener("drop", function(e) {
        e.preventDefault();
        let draggedItem = document.querySelector(".dragging");
        if (draggedItem) {
            doing.appendChild(draggedItem);
            saveState();
        }
    });
    completed.addEventListener("drop", function(e) {
        e.preventDefault();
        let draggedItem = document.querySelector(".dragging");
        if (draggedItem) {
            completed.appendChild(draggedItem);
            saveState();
        }
    });
    blocked.addEventListener("drop", function(e) {
        e.preventDefault();
        let draggedItem = document.querySelector(".dragging");
        if (draggedItem) {
            blocked.appendChild(draggedItem);
            saveState();
        }
    });

    // Thiết lập sự kiện "dragover" cho cả danh sách "todos" và "doings"
    todo.addEventListener("dragover", function(e) {
        e.preventDefault();
    });

    doing.addEventListener("dragover", function(e) {
        e.preventDefault();
    });
    completed.addEventListener("dragover", function(e) {
        e.preventDefault();
    });
    blocked.addEventListener("dragover", function(e) {
        e.preventDefault();
    });

}
const newtask = document.getElementById("input")
function OnInput(){
    newtask.style.display = "flex"
}


function SaveInput() {
    // var inputs = document.querySelectorAll("#input input");
    // inputs.forEach(function(input) {
    //     input.value = "";
    // });
    // newtask.style.display = "none"
}
localStorage.removeItem("listsState")



function addTodo() {
    // Create a new div element for the todo item
    var todoDiv = document.createElement("div");
    todoDiv.classList.add("list");
    todoDiv.setAttribute("draggable", "true");

    // Set inner HTML for the todo item, including delete and edit icons
    todoDiv.innerHTML = `
        <a href="#">Marketing</a>
        <h3>Write SEO article for new product</h3>
        <p>this is an mkkm mkmkmsad mkasdm anksdmk aksdnk</p>
        <span>29/11/2004</span>
        <div class="icons">
            <i class="fas fa-edit edit-icon" onclick="editTodo()"></i>
            <i class="fas fa-trash delete-icon" onclick="deleteTodo()"></i>
        </div>
    `;

    // Append the todoDiv to the parent container with id "todos"
    document.getElementById("todos").appendChild(todoDiv);
    attachDragAndDropEvents();
}
