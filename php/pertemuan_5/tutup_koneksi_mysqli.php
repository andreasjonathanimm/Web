<?php
    // tutup koneksi
    $koneksi = mysqli_connect("localhost", "root", "", "db_mahasiswa");

    // cek koneksi
    if (!$koneksi) {
        die("Koneksi gagal: " . mysqli_connect_error());
    }
?>
<!DOCTYPE html>
<html>
<head>
    <title>Tutup Koneksi</title>
</head>
<body>
    <h1>Tutup Koneksi</h1>
</body>
</html>
<?php
    // tutup koneksi
    mysqli_close($koneksi);
?>