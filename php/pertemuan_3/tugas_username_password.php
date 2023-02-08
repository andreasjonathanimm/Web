<?php
    // Initialization
    $username = "admin";
    $password = "password";

    // Process
    if ($username == "admin" && $password == "password") {
        echo "Username dan password sesuai, hak akses diberikan";
    } else if ($username == "admin") {
        echo "Username sesuai, password tidak sesuai";
    } else if ($password == "password") {
        echo "Username tidak sesuai, password sesuai";
    } else {
        echo "Nama dan Password tidak sesuai";
    }
?>