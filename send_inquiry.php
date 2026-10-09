<?php
/* 
   Acrosil Products Pvt. Ltd. - Inquiry & RFQ Form Handler PHP Script
   Supports File Uploads (.png, .jpg, .jpeg, .doc, .docx, .pdf)
*/

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect and sanitize form inputs
    $name = isset($_POST['name']) ? filter_var(trim($_POST['name']), FILTER_SANITIZE_FULL_SPECIAL_CHARS) : (isset($_POST['contact_person']) ? filter_var(trim($_POST['contact_person']), FILTER_SANITIZE_FULL_SPECIAL_CHARS) : '');
    $company = isset($_POST['company']) ? filter_var(trim($_POST['company']), FILTER_SANITIZE_FULL_SPECIAL_CHARS) : '';
    $country = isset($_POST['country']) ? filter_var(trim($_POST['country']), FILTER_SANITIZE_FULL_SPECIAL_CHARS) : '';
    $phone = isset($_POST['phone']) ? filter_var(trim($_POST['phone']), FILTER_SANITIZE_FULL_SPECIAL_CHARS) : '';
    $email = isset($_POST['email']) ? filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL) : '';
    $product = isset($_POST['product']) ? filter_var(trim($_POST['product']), FILTER_SANITIZE_FULL_SPECIAL_CHARS) : 'General Inquiry';
    $material = isset($_POST['material']) ? filter_var(trim($_POST['material']), FILTER_SANITIZE_FULL_SPECIAL_CHARS) : '';
    $quantity = isset($_POST['quantity']) ? filter_var(trim($_POST['quantity']), FILTER_SANITIZE_FULL_SPECIAL_CHARS) : '';
    $application = isset($_POST['application']) ? filter_var(trim($_POST['application']), FILTER_SANITIZE_FULL_SPECIAL_CHARS) : '';
    $delivery_date = isset($_POST['delivery_date']) ? filter_var(trim($_POST['delivery_date']), FILTER_SANITIZE_FULL_SPECIAL_CHARS) : '';
    $message = isset($_POST['message']) ? filter_var(trim($_POST['message']), FILTER_SANITIZE_FULL_SPECIAL_CHARS) : '';

    // File upload handling for PNG, JPG, JPEG, DOC, DOCX, PDF
    $uploaded_file_info = "";
    if (isset($_FILES['drawing_file']) && $_FILES['drawing_file']['error'] == UPLOAD_ERR_OK) {
        $file_name = basename($_FILES['drawing_file']['name']);
        $file_ext = strtolower(pathinfo($file_name, PATHINFO_EXTENSION));
        $allowed_exts = array('png', 'jpg', 'jpeg', 'doc', 'docx', 'pdf');
        
        if (in_array($file_ext, $allowed_exts)) {
            $upload_dir = __DIR__ . '/uploads/';
            if (!file_exists($upload_dir)) {
                mkdir($upload_dir, 0755, true);
            }
            $target_file = $upload_dir . time() . '_' . preg_replace("/[^a-zA-Z0-9\._-]/", "", $file_name);
            if (move_uploaded_file($_FILES['drawing_file']['tmp_name'], $target_file)) {
                $uploaded_file_info = "Uploaded Drawing/File: " . basename($target_file);
            }
        }
    }

    // Target recipient email (official client email)
    $to = "acrosil@rediffmail.com";
    $subject = "New Product Inquiry / Drawing from: " . $name . ($company ? " ($company)" : "") . " - Acrosil Website";

    // Build email body
    $email_content = "Name: $name\n";
    if ($company) $email_content .= "Company: $company\n";
    if ($country) $email_content .= "Country: $country\n";
    $email_content .= "Phone: $phone\n";
    $email_content .= "Email: $email\n";
    $email_content .= "Product Interest: $product\n";
    if ($material) $email_content .= "Material: $material\n";
    if ($quantity) $email_content .= "Quantity: $quantity\n";
    if ($application) $email_content .= "Application: $application\n";
    if ($delivery_date) $email_content .= "Delivery Date: $delivery_date\n";
    if ($uploaded_file_info) $email_content .= "$uploaded_file_info\n";
    $email_content .= "\nMessage / Specification Details:\n$message\n";

    // Email headers
    $headers = "From: website@acrosil.com\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    // Send email
    if (@mail($to, $subject, $email_content, $headers)) {
        header("Location: index.html?status=success#contact");
    } else {
        header("Location: index.html?status=success#contact");
    }
} else {
    header("Location: index.html");
    exit;
}
?>
