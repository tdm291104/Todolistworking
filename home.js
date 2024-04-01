const logout = document.getElementById("Logout");
let lists = document.getElementsByClassName("list");
let todo = document.getElementById("todos");
let doing = document.getElementById("doings");
let completed = document.getElementById("completeds");
let blocked = document.getElementById("blockeds")

logout.addEventListener("click", function(){
    window.location.href = "index.html"
})

document.addEventListener("DOMContentLoaded", function() {
    loadState();
    attachDragAndDropEvents(); // Gắn sự kiện kéo và thả sau khi trang được tải lại
    updateListCount()
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
            updateListCount()
            saveState();
        });
    }

    // Thiết lập sự kiện "drop" cho danh sách "todos"
    todo.addEventListener("drop", function(e) {
        e.preventDefault();
        let draggedItem = document.querySelector(".dragging");
        if (draggedItem) {
            todo.appendChild(draggedItem);
            updateListCount()
            saveState();
        }
    });

    // Thiết lập sự kiện "drop" cho danh sách "doings"
    doing.addEventListener("drop", function(e) {
        e.preventDefault();
        let draggedItem = document.querySelector(".dragging");
        if (draggedItem) {
            doing.appendChild(draggedItem);
            updateListCount()
            saveState();
        }
    });
    completed.addEventListener("drop", function(e) {
        e.preventDefault();
        let draggedItem = document.querySelector(".dragging");
        if (draggedItem) {
            completed.appendChild(draggedItem);
            updateListCount()
            saveState();
        }
    });
    blocked.addEventListener("drop", function(e) {
        e.preventDefault();
        let draggedItem = document.querySelector(".dragging");
        if (draggedItem) {
            blocked.appendChild(draggedItem);
            updateListCount()
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
const newtask = document.getElementById("bginput")
const bg = document.getElementById("bg")
function OnInput(){
    newtask.style.display = "flex"
    bg.style.display = "block"
    a.classList.remove("error")
    h3.classList.remove("error")
    p.classList.remove("error")
}
function OffInput(){
    newtask.style.display = "none"
    bg.style.display = "none"
    var inputs = document.querySelectorAll("#input input");
        inputs.forEach(function(input) {
            input.value = "";
    });
    var textarea = document.querySelectorAll("#input textarea")
        textarea.forEach(function(textarea){
            textarea.value = ""
    })
    a.classList.remove("error")
    h3.classList.remove("error")
    p.classList.remove("error")
    a.classList.remove("success")
    h3.classList.remove("success")
    p.classList.remove("success")
}

const a = document.getElementById("a")
const h3 = document.getElementById("h3")
const p =  document.getElementById("p")
function SaveInput() {
    if(a.value!=""&&h3.value != ""&&p.value != ""){
        addTodo(a.value, h3.value, p.value)
        var inputs = document.querySelectorAll("#input input");
        inputs.forEach(function(input) {
            input.value = "";
        });
        var textarea = document.querySelectorAll("#input textarea")
        textarea.forEach(function(textarea){
            textarea.value = ""
        })
        newtask.style.display = "none"
        attachDragAndDropEvents();
        alert("Thêm thành công")
        a.classList.remove("success")
        h3.classList.remove("success")
        p.classList.remove("success")
    }
    validateSaveInput()
}


const del = document.querySelector(".icons i:last-child")
function deleteTodo(event){
    // Lấy ra todo item cha của icon được click
    var todoItem = event.target.closest('.list');
    // Xóa todo item khỏi DOM
    todoItem.remove();
    updateListCount()
    saveState()
    alert("Xóa thành công")
}


function getCurrentDate() {
    var currentDate = new Date();
    var month = currentDate.toLocaleString('default', { month: 'long' });
    var day = currentDate.getDate();
    var year = currentDate.getFullYear();
    return `${month} ${day}, ${year}`;
}

function addTodo(input_a, input_h3, input_p) {
    // Create a new div element for the todo item
    var todoDiv = document.createElement("div");
    todoDiv.classList.add("list");
    todoDiv.setAttribute("draggable", "true");

    // Set inner HTML for the todo item, including delete and edit icons
    todoDiv.innerHTML = `
    <div class="toplist">
        <a href="">${input_a}</a>
        <div class="icons">
            <i class="bx bx-edit-alt" onclick="OnInputEdit(event)"></i>
            <i class="bx bx-trash-alt" onclick="deleteTodo(event)"></i>
        </div>
    </div>
    <h3>${input_h3}</h3>
    <p>${input_p}</p>
    <i class="fa-regular fa-clock"></i> <span>${getCurrentDate()}</span>
    `;

    // Append the todoDiv to the parent container with id "todos"
    document.getElementById("todos").appendChild(todoDiv);
    updateListCount()
    saveState()
}


function updateListCount() {
    var listCountTodo = document.querySelectorAll("#todos .list").length;
    var listCountDoing = document.querySelectorAll("#doings .list").length;
    var listCountCompleted = document.querySelectorAll("#completeds .list").length;
    var listCountBlocked = document.querySelectorAll("#blockeds .list").length;
    document.getElementById("listCountTodo").textContent = listCountTodo;
    document.getElementById("listCountDoing").textContent = listCountDoing;
    document.getElementById("listCountCompleted").textContent = listCountCompleted;
    document.getElementById("listCountBlocked").textContent = listCountBlocked;
}

function validateA(){
    if(a.value === ""){
        a.classList.add("error")
        a.classList.remove("success")
        return false
    }else{
        a.classList.remove("error")
        a.classList.add("success")
        return true
    }
}
function validateH3(){
    if(h3.value === ""){
        h3.classList.add("error")
        h3.classList.remove("success")
        return false
    }else{
        h3.classList.remove("error")
        h3.classList.add("success")
        return true
    }
}
function validateP(){
    if(p.value === ""){
        p.classList.add("error")
        p.classList.remove("success")
        return false
    }else{
        p.classList.remove("error")
        p.classList.add("success")
        return true
    }
}
function validateSaveInput(){
    validateA()
    validateH3()
    validateP()
}

// Edit
let editingTodoDiv = null;
const edit = document.getElementById("bginputedit")
function OnInputEdit(event){
    event.stopPropagation();
    edit.style.display = "flex"
    bg.style.display = "block"
    
    var adiv = event.target.closest('.list').querySelector("a")
    var h3div = event.target.closest('.list').querySelector("h3")
    var pdiv = event.target.closest('.list').querySelector("p")
    edita.value = adiv.textContent
    edith3.value = h3div.textContent
    editp.value = pdiv.textContent
    edita.classList.remove("error")
    edith3.classList.remove("error")
    editp.classList.remove("error")

    editingTodoDiv = event.target.closest('.list')

    var parentDivId = editingTodoDiv.parentNode.id;
    switch (parentDivId) {
        case 'todos':
            document.getElementById('todoradio').checked = true;
            break;
        case 'doings':
            document.getElementById('doingradio').checked = true;
            break;
        case 'completeds':
            document.getElementById('completedradio').checked = true;
            break;
        case 'blockeds':
            document.getElementById('blockedradio').checked = true;
            break;
        default:
            break;
    }
}
function OffInputEdit(){
    edit.style.display = "none"
    bg.style.display = "none"
    var inputs = document.querySelectorAll("#input input");
        inputs.forEach(function(input) {
            input.value = "";
    });
    var textarea = document.querySelectorAll("#input textarea")
        textarea.forEach(function(textarea){
            textarea.value = ""
    })
    edita.classList.remove("error")
    edith3.classList.remove("error")
    editp.classList.remove("error")
    edita.classList.remove("success")
    edith3.classList.remove("success")
    editp.classList.remove("success")
}

    
document.querySelectorAll('input[type="radio"]').forEach(function(radio) {
    radio.addEventListener('click', function() {
        // Lấy id của div cần di chuyển tương ứng với nút radio đã chọn
        var targetId = this.id.replace("radio", "").toLowerCase() + "s"; // Ví dụ: "todos", "doings", "completeds", "blockeds"

        // Lấy div cần di chuyển
        var divToMove = editingTodoDiv;

        // Lấy div đích dựa trên id
        var targetDiv = document.getElementById(targetId);

        var buttonsubmit = document.querySelector("#inputedit button")

        buttonsubmit.addEventListener('click', function() {
            // Di chuyển div vào vị trí mới
            targetDiv.appendChild(divToMove);
            saveState()
            updateListCount()
        })
        
    });
});

function Edit(input_a, input_h3, input_p){
    var adiv1 = editingTodoDiv.querySelector("a");
    var h3div1 = editingTodoDiv.querySelector("h3");
    var pdiv1 = editingTodoDiv.querySelector("p");

    adiv1.textContent = input_a.value;
    h3div1.textContent = input_h3.value;
    pdiv1.textContent = input_p.value;

    saveState()
}


const edita = document.getElementById("edita")
const edith3 = document.getElementById("edith3")
const editp =  document.getElementById("editp")
function SaveInputEdit() {
    if(edita.value!=""&&edith3.value != ""&&editp.value != ""){
        Edit(edita, edith3, editp)
        var inputs = document.querySelectorAll("#inputedit input");
        inputs.forEach(function(input) {
            input.value = "";
        });
        var textarea = document.querySelectorAll("#inputedit textarea")
        textarea.forEach(function(textarea){
            textarea.value = ""
        })
        edit.style.display = "none"
        attachDragAndDropEvents();
        alert("Sửa thành công")
        edita.classList.remove("success")
        edith3.classList.remove("success")
        editp.classList.remove("success")
    }
    validateSaveInputEdit()
}
function validateEditA(){
    if(edita.value === ""){
        edita.classList.add("error")
        edita.classList.remove("success")
        return false
    }else{
        edita.classList.remove("error")
        edita.classList.add("success")
        return true
    }
}
function validateEditH3(){
    if(edith3.value === ""){
        edith3.classList.add("error")
        edith3.classList.remove("success")
        return false
    }else{
        edith3.classList.remove("error")
        edith3.classList.add("success")
        return true
    }
}
function validateEditP(){
    if(editp.value === ""){
        editp.classList.add("error")
        editp.classList.remove("success")
        return false
    }else{
        editp.classList.remove("error")
        editp.classList.add("success")
        return true
    }
}
function validateSaveInputEdit(){
    validateEditA()
    validateEditH3()
    validateEditP()
}


// localStorage.removeItem("listsState")
