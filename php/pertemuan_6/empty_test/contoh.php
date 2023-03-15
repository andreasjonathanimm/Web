<?php
    // trim: remove whitespace (or other characters) from the beginning and end of a string
    $nama = trim($_POST['nama']);
    $email = trim($_POST['email']);
    $komentar = trim($_POST['komentar']);

    // check if the variable is empty
    if (empty($nama)) {
        echo "Nama tidak boleh kosong <br>";
    }
    if (empty($email)) {
        echo "Email tidak boleh kosong <br>";
    }
    if (empty($komentar)) {
        echo "Komentar tidak boleh kosong <br>";
    }
?>