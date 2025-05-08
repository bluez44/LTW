<?php
require_once __DIR__ . '/../config/database.php';

class MissionModel {
    public static function findMissionById($id) {
        global $conn;
        $stmt = $conn->prepare("SELECT * FROM mission WHERE id = ?");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        return $stmt->get_result();
    }

    public static function findMissionByName($name) {
        global $conn;
        $stmt = $conn->prepare("SELECT * FROM mission WHERE title = ?");
        $stmt->bind_param("s", $name);
        $stmt->execute();
        return $stmt->get_result()->fetch_assoc();
    }

    public static function updateMission($id, $title, $description, $icon) {
        global $conn;
        $stmt = $conn->prepare("UPDATE mission SET title = ?, description = ?, icon = ? WHERE id = ?");
        $stmt->bind_param("sssi", $title, $description, $icon, $id);
        return $stmt->execute();
    }

    public static function addMission($title, $description, $icon) {
        global $conn;
        $stmt = $conn->prepare("INSERT INTO mission (title, description, icon) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $title, $description, $icon);
        return $stmt->execute();
    }

    public static function deleteMission($id) {
        global $conn;
        $stmt = $conn->prepare("DELETE FROM mission WHERE id = ?");
        $stmt->bind_param("i", $id);
        return $stmt->execute();
    }
}

?>