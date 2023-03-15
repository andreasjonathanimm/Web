<?php
    // Buat database query execution
    $sql = "CREATE DATABASE db_mahasiswa";
    // Buat koneksi
    $link = mysqli_connect("localhost", "root", "");

    // Cek koneksi
    if (!$link) {
        die("Koneksi gagal: " . mysqli_connect_error());
    }

    // Buat database
    if (mysqli_query($link, $sql)) {
        echo "Database berhasil dibuat";
    } else {
        echo "Database gagal dibuat: " . mysqli_error($link);
    }

    // Tutup koneksi
    mysqli_close($link);
?>