<?php
date_default_timezone_set('Asia/Kolkata');

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $consent = isset($_POST['consent']) ? $_POST['consent'] : 'unknown';

    // Optional: sanitize input
    if (!in_array($consent, ['accepted', 'rejected'])) {
        $consent = 'invalid';
    }

    $ip = $_SERVER['REMOTE_ADDR'];
    $timestamp = date("Y-m-d H:i:s");

    $data = "$timestamp | $ip | $consent\n";

    // Save in project root (one level up from /forms/)
    file_put_contents(__DIR__ . "/../cookie_log.txt", $data, FILE_APPEND);

    echo "Saved";
} else {
    http_response_code(405); // Method Not Allowed
}
?>
