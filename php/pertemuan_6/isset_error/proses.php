<?php
    // isset: check if a variable is set or not (null or not)
    if (isset($_POST['nama'])) {
        $nama = $_POST['nama'];
        echo "Nama: $nama <br>";
    }
    if (isset($_POST['email'])) {
        $email = $_POST['email'];
        echo "Email: $email <br>";
    }
    if (isset($_POST['komentar'])) {
        $komentar = $_POST['komentar'];
        echo "Komentar: $komentar <br>";
    }

    if (isset($_GET['nama'])) {
        $nama = $_GET['nama'];
        echo "Nama: $nama <br>";
    }
    if (isset($_GET['email'])) {
        $email = $_GET['email'];
        echo "Email: $email <br>";
    }
    if (isset($_GET['komentar'])) {
        $komentar = $_GET['komentar'];
        echo "Komentar: $komentar <br>";
    }
?>