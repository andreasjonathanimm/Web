<!DOCTYPE html>
<html lang="id">
    <head>
        <meta charset="UTF-8">
        <title>Belajar PHP</title>
    </head>
    <body>
        <!-- Post is private -->
        <h1>Pemrosesan Form (Post)</h1>
        <form action="proses.php" method="post">
            <p>
                <label for="nama">Nama:</label>
                <input type="text" name="nama" id="nama">
            </p>
            <p>
                <label for="email">Email:</label>
                <input type="email" name="email" id="email">
            </p>
            <p>
                <label for="komentar">Komentar:</label>
                <textarea name="komentar" id="komentar" cols="30" rows="10"></textarea>
            </p>
            <p>
                <input type="submit" value="Kirim">
            </p>
        </form>

        <!-- Get is public -->
        <h1>Pemrosesan Form (Get)</h1>
        <form action="proses.php" method="get">
            <p>
                <label for="nama">Nama:</label>
                <input type="text" name="nama" id="nama">
            </p>
            <p>
                <label for="email">Email:</label>
                <input type="email" name="email" id="email">
            </p>
            <p>
                <label for="komentar">Komentar:</label>
                <textarea name="komentar" id="komentar" cols="30" rows="10"></textarea>
            </p>
            <p>
                <input type="submit" value="Kirim">
            </p>
        </form>
    </body>
</html>