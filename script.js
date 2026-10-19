let editContainer, descContainer, addContainer;
let selectedAddFile = null, selectedEditFile = null;
let loadedTodos = [];

document.addEventListener('DOMContentLoaded', function() {
    editContainer = document.getElementById('editContainer');
    descContainer = document.getElementById('descContainer');
    addContainer = document.getElementById('addContainer');

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme == "dark") {
        document.body.classList.add('dark_mode');
    }

    document.getElementById('addCaptureInput').addEventListener('change', (e) => handleFileSelect(e, 'addPhotoPreview', true));
    document.getElementById('addImportInput').addEventListener('change', (e) => handleFileSelect(e, 'addPhotoPreview', true));
    document.getElementById('editCaptureInput').addEventListener('change', (e) => handleFileSelect(e, 'editPhotoPreview', false));
    document.getElementById('editImportInput').addEventListener('change', (e) => handleFileSelect(e, 'editPhotoPreview', false));

    loadAndRenderTodos();
});

function handleFileSelect(e, previewId, isAddForm) {
    const file = e.target.files[0];
    if (!file) return;

    if (isAddForm) selectedAddFile = file;
    else selectedEditFile = file;

    const reader = new FileReader();
    reader.onload = function(evt) {
        const previewImg = document.getElementById(previewId);
        previewImg.src = evt.target.result;
        previewImg.style.display = 'block';
    };
    reader.readAsDataURL(file);
}

async function loadAndRenderTodos() {
    try {
        const response = await fetch(`api.php?action=get_todos&type=${CURRENT_TYPE}`);
        loadedTodos = await response.json();
        renderTodos(loadedTodos);
    } catch (err) {
        console.error("Gagal memuat data todo:", err);
    }
}

function renderTodos(todos) {
    const container = document.getElementById("todo-list");
    container.innerHTML = '';

    todos.forEach(todo => {
        const todoDiv = document.createElement('div');
        todoDiv.className = 'todo';
        todoDiv.dataset.id = todo.id;

        todoDiv.innerHTML = `
            <div class="upper">
                <div class="name">${todo.name}</div>
                <input type="checkbox" onchange="checkHandle(this)">
            </div>
            <div class="date_time">${todo.date || ''} ${todo.time || ''}</div>
            <div class="btn">
                <button type="button" onclick="openEditForm(${todo.id})">Edit</button>
                <button type="button" onclick="showDesc(${todo.id})">Detail</button>
                <button type="button" onclick="deleteTodo(${todo.id})">Delete</button>
            </div>
        `;
        container.appendChild(todoDiv);
    });
}

function openAddForm() {
    descContainer.style.display = 'none';
    editContainer.style.display = 'none';
    addContainer.style.display = 'flex';
}

async function addTodoForm(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', document.getElementById("addInputName").value);
    formData.append('date', document.getElementById("addInputDate").value);
    formData.append('time', document.getElementById("addInputTime").value);
    formData.append('desc', document.getElementById("addInputDesc").value);
    formData.append('type', CURRENT_TYPE);

    if (selectedAddFile) {
        formData.append('photo', selectedAddFile);
    }

    const res = await fetch('api.php?action=add_todo', {
        method: 'POST',
        body: formData
    });
    const result = await res.json();

    if (result.status === 'success') {
        document.getElementById("addForm").reset();
        selectedAddFile = null;
        document.getElementById('addPhotoPreview').style.display = 'none';
        addContainer.style.display = 'none';
        loadAndRenderTodos();
    }
}

function showDesc(id) {
    const todo = loadedTodos.find(t => t.id == id);
    if (!todo) return;

    document.getElementById('viewName').innerText = todo.name;
    document.getElementById('viewDateTime').innerText = (todo.date || '') + ' ' + (todo.time || '');
    document.getElementById('viewDesc').innerText = todo.description || '';

    const imgElement = document.getElementById('viewPhoto');
    if (todo.photo) {
        imgElement.src = todo.photo;
        imgElement.style.display = 'block';
    } else {
        imgElement.src = '';
        imgElement.style.display = 'none';
    }

    editContainer.style.display = 'none';
    addContainer.style.display = 'none';
    descContainer.style.display = 'flex';
}

function openEditForm(id) {
    const todo = loadedTodos.find(t => t.id == id);
    if (!todo) return;

    document.getElementById('editInputId').value = todo.id;
    document.getElementById('editInputName').value = todo.name;
    document.getElementById('editInputDate').value = todo.date || '';
    document.getElementById('editInputTime').value = todo.time || '';
    document.getElementById('editInputDesc').value = todo.description || '';

    const preview = document.getElementById('editPhotoPreview');
    if (todo.photo) {
        preview.src = todo.photo;
        preview.style.display = 'block';
    } else {
        preview.src = '';
        preview.style.display = 'none';
    }
    selectedEditFile = null;

    descContainer.style.display = 'none';
    addContainer.style.display = 'none';
    editContainer.style.display = 'flex';
}

async function editTodoForm(event) {
    event.preventDefault();
    const id = document.getElementById("editInputId").value;

    const formData = new FormData();
    formData.append('id', id);
    formData.append('name', document.getElementById("editInputName").value);
    formData.append('date', document.getElementById("editInputDate").value);
    formData.append('time', document.getElementById("editInputTime").value);
    formData.append('desc', document.getElementById("editInputDesc").value);

    if (selectedEditFile) {
        formData.append('photo', selectedEditFile);
    }

    const res = await fetch('api.php?action=edit_todo', {
        method: 'POST',
        body: formData
    });
    const result = await res.json();

    if (result.status === 'success') {
        editContainer.style.display = 'none';
        loadAndRenderTodos();
    }
}

async function deleteTodo(id) {
    if (!confirm("Apakah Anda yakin ingin menghapus todo ini?")) return;

    const formData = new FormData();
    formData.append('id', id);

    const res = await fetch('api.php?action=delete_todo', {
        method: 'POST',
        body: formData
    });
    const result = await res.json();

    if (result.status === 'success') {
        loadAndRenderTodos();
    }
}

function checkHandle(checkbox) {
    const todoElement = checkbox.closest('.todo');
    const nameElement = todoElement.querySelector('.name');
    if (checkbox.checked) {
        todoElement.style.backgroundColor = "rgb(186, 186, 186)";
        nameElement.style.textDecoration = "line-through";
    } else {
        todoElement.style.backgroundColor = "";
        nameElement.style.textDecoration = "";
    }
}

function changeTheme(themeBtn) {
    const isDark = document.body.classList.contains("dark_mode");
    localStorage.setItem("theme", isDark ? "light" : "dark");
    document.body.classList.toggle("dark_mode");
    themeBtn.textContent = isDark ? "Dark mode" : "White mode";
}