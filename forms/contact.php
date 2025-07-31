<?php

// $to = 'manishagarwal@trueview.com'; // 
$to = 'info@techtrueview.com'; // 

header('Content-Type: application/json'); // Return JSON response

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Collect form inputs safely
    $name = strip_tags(trim($_POST['name']));
    $email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
    $subject_input = strip_tags(trim($_POST['subject']));
    $message = strip_tags(trim($_POST['message']));

    // Validate inputs
    if (empty($name) || empty($email) || empty($subject_input) || empty($message)) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Please complete all required fields.']);
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Invalid email address.']);
        exit;
    }

    // Prepare email
    $subject = "New Contact Form: $subject_input";

    $body = "
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> {$name}</p>
        <p><strong>Email:</strong> {$email}</p>
        <p><strong>Subject:</strong> {$subject_input}</p>
        <p><strong>Message:</strong><br>{$message}</p>
    ";

    // Email headers
    $headers = "From: no-reply@techtrueview.com\r\n";
    $headers .= "Reply-To: {$email}\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";

    // Send email
    if (mail($to, $subject, $body, $headers)) {
        echo json_encode(['status' => 'success', 'message' => 'Your message has been sent successfully.']);
    } else {
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => 'Failed to send your message. Please try again later.']);
    }

} else {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method.']);
}

?>
