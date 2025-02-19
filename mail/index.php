<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

header('Content-Type: application/json');

$input = json_decode(file_get_contents('php://input'), true);

if (!isset($input['address']) || !filter_var($input['address'], FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['status' => 'error', 'message' => 'Invalid email address']);
    exit;
}

if (!isset($input['html']) || empty($input['html'])) {
    echo json_encode(['status' => 'error', 'message' => 'HTML content is required']);
    exit;
}

$mail = new PHPMailer(true);

try {
    //Server settings
    $mail->isSMTP();                                            // Send using SMTP
    $mail->Host       = 'smtp.gmail.com';                     // Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
    $mail->Username   = 'sahabuab@gmail.com';               // SMTP username
    $mail->Password   = 'mnqniylvfbjfdfqr';                        // SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;         // Enable TLS encryption
    $mail->Port       = 587;                                    // TCP port to connect to

    //Recipients
    $mail->setFrom('sahabuab@gmail.com', 'Mailer');
    $mail->addAddress($input['address']);

    // Content
    $mail->isHTML(true);                                        // Set email format to HTML
    $mail->Subject = 'Your Building Quote';
    $mail->Body    = $input['html'];
    $mail->AltBody = strip_tags($input['html']);

    $mail->send();
    echo json_encode(['status' => 'success', 'message' => 'Message has been sent']);
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => "Message could not be sent. Mailer Error: {$mail->ErrorInfo}"]);
}
