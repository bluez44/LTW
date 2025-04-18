<?php
require_once __DIR__ . '/../config/database.php';

class GuestModel {
    public static function sendContactForm($full_name, $email, $phone_number, $content, $created_at)
    {
        global $conn;
        $stmt = $conn->prepare("INSERT INTO contact_form (full_name, email, phoneNo, content, created_at) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param("sssss", $full_name, $email, $phone_number, $content, $created_at);
        
        return $stmt->execute();
    }

}

?>