<?php
require_once 'config.php';
$currentType = $_GET['type'] ?? 'personal';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TODO AOI - Organizational</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <h1>TODO AOI (<?php echo ucfirst($currentType); ?>)</h1>
    </header>
    <main>
        <?php include 'sidebar.php'; ?>
        <button class="theme_toggle" onclick="changeTheme(this)">Dark Mode</button>
        <div class="space"></div>
        
        <div class="container" style="display: flex; gap: 20px;">
            <div class="todo_container" style="flex: 1;">
                <div class="todo_box">
                    <div class="todo_head">
                        <p>To-do list (<?php echo ucfirst($currentType); ?>)</p> 
                        <button type="button" onclick="openAddForm()">Add</button>
                    </div>
                    <div class="todo_list" id="todo-list">

                    </div>
                </div>    
            </div>

            <div class="edit_container" id="editContainer" style="display: none;">
                <div class="edit_box">
                    <form id="editForm" onsubmit="editTodoForm(event)">
                        <input type="hidden" id="editInputId">
                        <img id="editPhotoPreview">
                        <input type="file" id="editCaptureInput" accept="image/*" capture="environment" style="display: none;">
                        <input type="file" id="editImportInput" accept="image/*" style="display: none;">

                        <div class="line"><label>Name</label><input type="text" id="editInputName" required></div>
                        <div class="line"><label>Date</label><input type="date" id="editInputDate"></div>
                        <div class="line"><label>Time</label><input type="time" id="editInputTime"></div>
                        <div class="line_desc"><label>Description</label><textarea id="editInputDesc"></textarea></div>

                        <div class="line_btn">
                            <button type="button" onclick="document.getElementById('editCaptureInput').click()">Take photo</button>
                            <button type="button" onclick="document.getElementById('editImportInput').click()">Import photo</button>
                            <button type="submit">Save</button>
                            <button type="button" onclick="document.getElementById('editContainer').style.display='none'">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>

            <div class="desc_container" id="descContainer" style="display: none;">
                <div class="desc_box">
                    <div class="name" id="viewName"></div>
                    <div class="date_time" id="viewDateTime"></div>
                    <div class="desc" id="viewDesc"></div>
                    <div id="photoContainer"><img id="viewPhoto"></div>
                    <button onclick="document.getElementById('descContainer').style.display = 'none'">Tutup</button>
                </div>
            </div>

            <div class="add_container" id="addContainer" style="display: none;">
                <div class="add_box">
                    <form id="addForm" onsubmit="addTodoForm(event)">
                        <img id="addPhotoPreview">
                        <input type="file" id="addCaptureInput" accept="image/*" capture="environment" style="display: none;">
                        <input type="file" id="addImportInput" accept="image/*" style="display: none;">

                        <div class="line"><label>Name</label><input type="text" id="addInputName" required></div>
                        <div class="line"><label>Date</label><input type="date" id="addInputDate"></div>
                        <div class="line"><label>Time</label><input type="time" id="addInputTime"></div>
                        <div class="line_desc"><label>Description</label><textarea id="addInputDesc"></textarea></div>

                        <div class="line_btn">
                            <button type="button" onclick="document.getElementById('addCaptureInput').click()">Take photo</button>
                            <button type="button" onclick="document.getElementById('addImportInput').click()">Import photo</button>
                            <button type="submit">Add</button>
                            <button type="button" onclick="document.getElementById('addContainer').style.display='none'">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="space"></div>
    </main>
    
    <script>
        const CURRENT_TYPE = "<?php echo $currentType; ?>";
    </script>
    <script src="script.js"></script>
</body>
</html>