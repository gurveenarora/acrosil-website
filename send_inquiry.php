<?php
/* 
   Acrosil Products Pvt. Ltd. - Inquiry Form Handler PHP Script
*/

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect and sanitize form inputs
    $name = isset($_POST['name']) ? filter_var(trim($_POST['name']), FILTER_SANITIZE_FULL_SPECIAL_CHARS) : '';
    $phone = isset($_POST['phone']) ? filter_var(trim($_POST['phone']), FILTER_SANITIZE_FULL_SPECIAL_CHARS) : '';
    $email = isset($_POST['email']) ? filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL) : '';
    $product = isset($_POST['product']) ? filter_var(trim($_POST['product']), FILTER_SANITIZE_FULL_SPECIAL_CHARS) : 'General Inquiry';
    $message = isset($_POST['message']) ? filter_var(trim($_POST['message']), FILTER_SANITIZE_FULL_SPECIAL_CHARS) : '';

    // Simple validation
    if (empty($name) || empty($phone) || empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        header("Location: index.html?status=error#contact");
        exit;
    }

    // Target recipient email (official client email)
    $to = "acrosil@rediffmail.com";
    $subject = "New Web Inquiry from: " . $name . " - Acrosil Website";

    // Build email body
    $email_content = "Name: $name\n";
    $email_content .= "Phone: $phone\n";
    $email_content .= "Email: $email\n";
    $email_content .= "Product Interest: $product\n\n";
    $email_content .= "Message / Specification Details:\n$message\n";

    // Email headers
    $headers = "From: website@acrosil.com\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    // Send email
    if (mail($to, $subject, $email_content, $headers)) {
        header("Location: index.html?status=success#contact");
    } else {
        header("Location: index.html?status=error#contact");
    }
} else {
    header("Location: index.html");
    exit;
}
?>
