<?php
header("Content-Type: application/json");
require_once 'config.php';

$action = $_GET['action'] ?? '';

if ($action === 'get_todos') {
    $type = $_GET['type'] ?? 'personal';
    $stmt = $conn->prepare("SELECT * FROM todos WHERE type = ? ORDER BY id DESC");
    $stmt->bind_param("s", $type);
    $stmt->execute();
    $result = $stmt->get_result();
    $todos = $result->fetch_all(MYSQLI_ASSOC);
    echo json_encode($todos);
    exit;
}

function handleFileUpload($fileInputName) {
    if (isset($_FILES[$fileInputName]) && $_FILES[$fileInputName]['error'] === UPLOAD_ERR_OK) {
        $tmpName = $_FILES[$fileInputName]['tmp_name'];
        $fileName = time() . '_' . basename($_FILES[$fileInputName]['name']);
        $targetPath = 'uploads/' . $fileName;

        if (move_uploaded_file($tmpName, $targetPath)) {
            return $targetPath;
        }
    }
    return null;
}

if ($action === 'add_todo' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'] ?? '';
    $date = $_POST['date'] ?? '';
    $time = $_POST['time'] ?? '';
    $desc = $_POST['desc'] ?? '';
    $type = $_POST['type'] ?? 'personal';
    
    $photoPath = handleFileUpload('photo');

    $stmt = $conn->prepare("INSERT INTO todos (type, name, date, time, description, photo) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssss", $type, $name, $date, $time, $desc, $photoPath);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "id" => $stmt->insert_id]);
    } else {
        echo json_encode(["status" => "error", "message" => $stmt->error]);
    }
    exit;
}

if ($action === 'edit_todo' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $id   = intval($_POST['id']);
    $name = $_POST['name'] ?? '';
    $date = $_POST['date'] ?? '';
    $time = $_POST['time'] ?? '';
    $desc = $_POST['desc'] ?? '';

    $newPhotoPath = handleFileUpload('photo');

    if ($newPhotoPath) {
        $stmt = $conn->prepare("UPDATE todos SET name=?, date=?, time=?, description=?, photo=? WHERE id=?");
        $stmt->bind_param("sssssi", $name, $date, $time, $desc, $newPhotoPath, $id);
    } else {
        $stmt = $conn->prepare("UPDATE todos SET name=?, date=?, time=?, description=? WHERE id=?");
        $stmt->bind_param("ssssi", $name, $date, $time, $desc, $id);
    }

    if ($stmt->execute()) {
        echo json_encode(["status" => "success"]);
    } else {
        echo json_encode(["status" => "error", "message" => $stmt->error]);
    }
    exit;
}

if ($action === 'delete_todo' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = intval($_POST['id']);
    
    $stmtGet = $conn->prepare("SELECT photo FROM todos WHERE id = ?");
    $stmtGet->bind_param("i", $id);
    $stmtGet->execute();
    $res = $stmtGet->get_result()->fetch_assoc();
    if (!empty($res['photo']) && file_exists($res['photo'])) {
        unlink($res['photo']);
    }

    $stmt = $conn->prepare("DELETE FROM todos WHERE id = ?");
    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success"]);
    } else {
        echo json_encode(["status" => "error", "message" => $stmt->error]);
    }
    exit;
}
?>