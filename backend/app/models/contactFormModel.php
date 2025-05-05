<?php
require_once __DIR__ . '/../config/database.php';

class contactFormModel {
    public static function sendContactForm($full_name, $email, $phone_number, $content, $created_at)
    {
        global $conn;
        $stmt = $conn->prepare("INSERT INTO contact_form (full_name, email, phone, content, created_at) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param("sssss", $full_name, $email, $phone_number, $content, $created_at);
        
        return $stmt->execute();
    }

    public static function getAllContactForms()
    {
        global $conn;
        $stmt = $conn->prepare("SELECT * FROM contact_form ORDER BY created_at DESC");
        $stmt->execute();
        return $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
    }

    public static function getContactForm($id)
    {
        global $conn;
        $stmt = $conn->prepare("SELECT * FROM contact_form WHERE id = ?");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        return $stmt->get_result()->fetch_assoc();
    }
}
?>