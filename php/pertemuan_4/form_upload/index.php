<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Belajar PHP</title>
    </head>
    <body>
        <form action="index.php" method="post" enctype="multipart/form-data">
            <p>Nama File: <input type="text" name="nama_file"></p>
            <p>File: <input type="file" name="file"></p>
            <p><input type="submit" name="submit" value="Upload"></p>
    </body>

    <?php
        if (isset($_POST['submit'])) {
            $nama_file = $_POST['nama_file'];
            $file = $_FILES['file']['name'];
            $tmp = $_FILES['file']['tmp_name'];
            $path = "files/".$file;

            if (move_uploaded_file($tmp, $path)) {
                echo "File berhasil diupload";
            } else {
                echo "File gagal diupload";
            }
        }
    ?>
</html>
