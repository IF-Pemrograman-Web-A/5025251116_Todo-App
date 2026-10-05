
let db;
let editContainer;
let descContainer;
let addContainer;
let currentAddPhoto = null;
let currentEditPhoto = null;

document.addEventListener('DOMContentLoaded', async function(){

    editContainer = document.getElementById('editContainer');
    descContainer = document.getElementById('descContainer');
    addContainer = document.getElementById('addContainer');

    const savedTheme = localStorage.getItem('theme');
    if(savedTheme == "dark") {
        document.body.classList.add('dark_mode');
    }

    document.getElementById('addCaptureInput').addEventListener('change', (e) => processFile(e.target.files[0], 'addPhotoPreview', true));
    document.getElementById('addImportInput').addEventListener('change', (e) => processFile(e.target.files[0], 'addPhotoPreview', true));
    
    document.getElementById('editCaptureInput').addEventListener('change', (e) => processFile(e.target.files[0], 'editPhotoPreview', false));
    document.getElementById('editImportInput').addEventListener('change', (e) => processFile(e.target.files[0], 'editPhotoPreview', false));

    if ('serviceWorker' in navigator && 'Notification' in window) {
        try {
            await navigator.serviceWorker.register('sw.js');
            console.log('Service Worker berhasil diregistrasi');
            
            if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
                await Notification.requestPermission();
            }
        } catch (error) {
            console.error('Service Worker gagal:', error);
        }
    }

    setInterval(checkTodoAlarms, 60000); 
    
    setTimeout(checkTodoAlarms, 2000);
})

function processFile(file, previewId, isAddForm) {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const base64String = e.target.result;
        
        const previewImg = document.getElementById(previewId);
        previewImg.src = base64String;
        previewImg.style.display = 'block';

        if (isAddForm) {
            currentAddPhoto = base64String;
        } else {
            currentEditPhoto = base64String;
        }
    };
    reader.readAsDataURL(file);
}

function showDesc(btnElement) {
    const todoId = Number(btnElement.closest('.todo').dataset.id);
    
    const transaction = db.transaction("todos", "readonly");
    const store = transaction.objectStore("todos");
    const request = store.get(todoId);

    request.onsuccess = () => {
        const data = request.result;
        if (data) {
            document.getElementById('viewName').innerText = data.name;
            document.getElementById('viewDateTime').innerText = data.date + ' ' + data.time;
            document.getElementById('viewDesc').innerText = data.desc;

            const imgElement = document.getElementById('viewPhoto');
            if (data.photo) {
                imgElement.src = data.photo;
                imgElement.style.display = 'block';
            } else {
                imgElement.src = '';
                imgElement.style.display = 'none';
            }

            editContainer.style.display = 'none';
            addContainer.style.display = 'none';
            descContainer.style.display = 'flex';
        }
    }
}

function openEditForm(btnElement) {
    const todoId = Number(btnElement.closest('.todo').dataset.id);

    const transaction = db.transaction("todos", "readonly");
    const store = transaction.objectStore("todos");
    const request = store.get(todoId);

    request.onsuccess = () => {
        const data = request.result;
        if (data) {
            document.getElementById('editInputId').value = data.id;
            document.getElementById('editInputName').value = data.name;
            document.getElementById('editInputDate').value = data.date;
            document.getElementById('editInputTime').value = data.time;
            document.getElementById('editInputDesc').value = data.desc;

            const preview = document.getElementById('editPhotoPreview');
            if (data.photo) {
                preview.src = data.photo;
                preview.style.display = 'block';
                currentEditPhoto = data.photo;
            } else {
                preview.src = '';
                preview.style.display = 'none';
                currentEditPhoto = null;
            }

            descContainer.style.display = 'none';
            addContainer.style.display = 'none';
            editContainer.style.display = 'flex';
        }
    }
}

function openAddForm() {

    descContainer.style.display = 'none';
    editContainer.style.display = 'none';
    addContainer.style.display = 'flex';
}

function checkHandle(checkbox){
    const todoElement = checkbox.closest('.todo');
    const nameElement = todoElement.querySelector('.name');
    
    if(checkbox.checked){
        todoElement.style.backgroundColor = "rgb(186, 186, 186)";   
        nameElement.style.textDecoration = "line-through";
    }
    else{
        todoElement.style.backgroundColor = "";
        nameElement.style.textDecoration = "";
    }
}

function renderTodos(todos) {
    const container = document.getElementById("todo-list");
    container.innerHTML = '';

    todos.forEach(todo => {
        const todoDiv = document.createElement('div');
        todoDiv.className = 'todo';
        todoDiv.dataset.id = todo.id;
        todoDiv.dataset.name = todo.name;
        todoDiv.dataset.date = todo.date;
        todoDiv.dataset.time = todo.time;
        todoDiv.dataset.desc = todo.desc;


        todoDiv.innerHTML = `
        <div class="upper">
        <div class="name">
            ${ todo.name }
        </div>
        <input type="checkbox" onchange="checkHandle(this)">
        </div>
        
        <div class="date_time">
            ${ todo.date } ${ todo.time }
        </div>

        <div class="btn">
            <button type="button" onclick="openEditForm(this)">Edit</button>
            <button type="button" onclick="showDesc(this)">Detail</button>
            <button type="button" onclick="deleteTodo(this)">Delete</button>
        </div>
        `;

        container.appendChild(todoDiv);
    });
}

function loadAndRenderTodos() {
    if(!db) return;

    const transaction = db.transaction("todos", "readonly");
    const store = transaction.objectStore("todos");

    const getAllReq = store.getAll();
    getAllReq.onsuccess = function() {
        const todos = getAllReq.result;
        renderTodos(todos);
    }
}

function addTodoForm(event){
    event.preventDefault();
    const addFormElement = document.getElementById("addForm");

    const newTodo = {
        name: document.getElementById("addInputName").value,
        date: document.getElementById("addInputDate").value,
        time: document.getElementById("addInputTime").value,
        desc: document.getElementById("addInputDesc").value,
        photo: currentAddPhoto,
        notified: false
    };

    const transaction = db.transaction("todos", "readwrite");
    const store = transaction.objectStore("todos");
    const request = store.add(newTodo);

    request.onsuccess = () => {
        addFormElement.reset();
        
        currentAddPhoto = null;
        document.getElementById('addPhotoPreview').style.display = 'none';
        document.getElementById('addPhotoPreview').src = '';

        document.getElementById("addContainer").style.display = "none";
        loadAndRenderTodos();
    }
}

function editTodoForm(event){
    event.preventDefault();
    const id = Number(document.getElementById("editInputId").value);
    if (isNaN(id) || id == 0) return;

    const transaction = db.transaction("todos", "readwrite");
    const store = transaction.objectStore("todos");
    const request = store.get(id);

    request.onsuccess = () => {
        let data = request.result;
        if (data) {
            data.name = document.getElementById("editInputName").value;
            data.date = document.getElementById("editInputDate").value;
            data.time = document.getElementById("editInputTime").value;
            data.desc = document.getElementById("editInputDesc").value;
            data.photo = currentEditPhoto; 
            data.notified = false;

            const updateRequest = store.put(data);
            updateRequest.onsuccess = () => {
                document.getElementById("editForm").reset();
                document.getElementById("editContainer").style.display = "none";
                loadAndRenderTodos();
            };
        }
    }
}

function deleteTodo(btnElement){
    const todoElement = btnElement.closest('.todo');
    
    const todoId = Number(todoElement.dataset.id);

    const transaction = db.transaction("todos", "readwrite");
    const store = transaction.objectStore("todos");
    const request = store.delete(todoId);

    request.onsuccess = () => {
        loadAndRenderTodos();
    }
}

function changeTheme(themeBtn){
    const isDark = document.body.classList.contains("dark_mode");
    localStorage.setItem("theme", isDark ? "light" : "dark");

    const bodyElement = document.querySelector('body');
    bodyElement.classList.toggle("dark_mode");

    themeBtn.textContent = isDark ? "Dark mode" : "White mode";
}


const request = indexedDB.open("myDB", 1);

request.onupgradeneeded = function(event) {
    db = event.target.result;

    if(!db.objectStoreNames.contains("todos")){
        db.createObjectStore("todos", {keyPath: "id", autoIncrement: true});
    }
}

request.onsuccess = function(event) {
    db = event.target.result;
    loadAndRenderTodos();
}


function checkTodoAlarms() {
    if (!db || Notification.permission !== 'granted') return;

    const transaction = db.transaction("todos", "readwrite");
    const store = transaction.objectStore("todos");
    const request = store.getAll();

    request.onsuccess = () => {
        const todos = request.result;
        const now = new Date(); 

        todos.forEach(todo => {
            if (todo.date && todo.time && !todo.notified) {
                
                const todoDateTime = new Date(`${todo.date}T${todo.time}`);

                if (now >= todoDateTime) {
                    
                    navigator.serviceWorker.ready.then((registration) => {
                        registration.showNotification("Pengingat Todo: " + todo.name, {
                            body: todo.desc || "Waktunya untuk kegiatanmu!",
                            icon: todo.photo || null, 
                            tag: `todo-${todo.id}`
                        });
                    });

                    todo.notified = true;
                    store.put(todo); 
                }
            }
        });
    };
}