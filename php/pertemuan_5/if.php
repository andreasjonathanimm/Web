<?php
    $user = "admin";
    // $user = "guest";
    // $user = "user";
    // $user = "qwerty";

    if ($user == "admin") {
        echo "Selamat datang Admin!";
    } else if ($user == "user") {
        echo "Selamat datang User!";
    }
    else if ($user == "guest") {
        echo "Selamat datang Guest!";
    } else {
        echo "Selamat datang";
    }
    
    // // Wordpress Style
    // if ($user == "admin") :
    //     echo "Selamat datang Admin!";
    // endif;
?>