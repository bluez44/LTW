<?php
require_once __DIR__ . '/../config/database.php';

class GuestModel {
    public static function sendContactForm($full_name, $email, $phone_number, $content, $created_at)
    {
        global $conn;
        $stmt = $conn->prepare("INSERT INTO contact_form (full_name, email, phone, content, created_at) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param("sssss", $full_name, $email, $phone_number, $content, $created_at);
        
        return $stmt->execute();
    }

    public static function getAllMissions() {
        global $conn;
        $stmt = $conn->prepare("SELECT * FROM mission");
        $stmt->execute();
        return $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
    }

    public static function getAllMenuItems() {
        global $conn;
        $stmt = $conn->prepare("SELECT * FROM menu_item");
        $stmt->execute();
        return $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
    }

    public static function getAllSubMenuItems() {
        global $conn;
        $stmt = $conn->prepare("SELECT S.id, M.name as pname, S.name as name, S.link FROM submenu_item as S, menu_item as M WHERE s.menu_id = m.id ORDER BY S.id");
        $stmt->execute();
        return $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
    }
}

?>