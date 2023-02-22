<!DOCTYPE html>
<html lang="id">
    <head>
        <meta charset="UTF-8">
        <title>Belajar PHP</title>
    </head>
    <body>
        <h1>Hasil Pemrosesan (Post)</h1>
        <?php
            $nama = $_POST['nama'];
            $email = $_POST['email'];
            $komentar = $_POST['komentar'];
            echo "Nama: $nama <br>";
            echo "Email: $email <br>";
            echo "Komentar: $komentar <br>";
        ?>

        <h1>Hasil Pemrosesan (Get)</h1>
        <?php
            $nama = $_GET['nama'];
            $email = $_GET['email'];
            $komentar = $_GET['komentar'];
            echo "Nama: $nama <br>";
            echo "Email: $email <br>";
            echo "Komentar: $komentar <br>";
        ?>
    </body>
</html>