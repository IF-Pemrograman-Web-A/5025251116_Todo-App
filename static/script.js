const editContainer = document.getElementById('editContainer');
const descContainer = document.getElementById('descContainer');
const addContainer = document.getElementById('addContainer');

function showDesc(btnElement) {
    const todoElement = btnElement.closest('.todo')

    document.getElementById('viewName').innerText = todoElement.dataset.name;
    document.getElementById('viewDateTime').innerText = todoElement.dataset.date + ' ' + todoElement.dataset.time;
    document.getElementById('viewDesc').innerText = todoElement.dataset.desc;

    editContainer.style.display = 'none';
    addContainer.style.display = 'none';
    descContainer.style.display = 'flex';
}

function openEditForm(btnElement) {
    const todoElement = btnElement.closest('.todo');
    
    document.getElementById('inputId').value = todoElement.dataset.id;
    document.getElementById('inputName').value = todoElement.dataset.name;
    document.getElementById('inputDate').value = todoElement.dataset.date;
    document.getElementById('inputTime').value = todoElement.dataset.time;
    document.getElementById('inputDesc').value = todoElement.dataset.desc;

    descContainer.style.display = 'none';
    addContainer.style.display = 'none';
    editContainer.style.display = 'flex';
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

function changeTheme(themeBtn){
    if(themeBtn.textContent == "Dark Mode") themeBtn.textContent = "White Mode";
    else themeBtn.textContent = "Dark Mode";

    const bodyElement = document.querySelector('body');
    bodyElement.classList.toggle("dark_mode");
}