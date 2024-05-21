<?php
$host = 'localhost';
$username = 'root';
$password = '';
$database = 'blog_db';

// Membuat koneksi
$conn = new mysqli($host, $username, $password, $database);

// Memeriksa koneksi
if ($conn->connect_error) {
    die("Koneksi gagal: " . $conn->connect_error);
}

// Mengambil parameter halaman dari URL
$page = isset($_GET['page']) ? $_GET['page'] : 1;
$limit = 2; // Jumlah artikel per halaman
$offset = ($page - 1) * $limit;

// Query untuk mengambil data artikel dengan pagination
$sql = "SELECT id, title, date, author, content, image_path, url FROM articles LIMIT $limit OFFSET $offset";
$result = $conn->query($sql);

// Menghitung jumlah total artikel
$total_sql = "SELECT COUNT(*) AS total FROM articles";
$total_result = $conn->query($total_sql);
$total_row = $total_result->fetch_assoc();
$total_pages = ceil($total_row['total'] / $limit);

// Menyiapkan array untuk menyimpan data artikel
$articles = array();

// Mengambil data artikel dari hasil query
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $articles[] = $row;
    }
}

// Mengembalikan data artikel dalam format JSON beserta total halaman
$response = array(
    'articles' => $articles,
    'totalPages' => $total_pages
);
echo json_encode($response);

// Menutup koneksi
$conn->close();
?>