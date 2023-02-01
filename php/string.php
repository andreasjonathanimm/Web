<?php
$nama = "Rizky";
echo "Selamat pagi $nama";

define("GAJI", 5000000);
echo "$nama bergaji Rp. GAJI";
echo "<br>";
echo "$nama bergaji Rp. ".GAJI;

unset($nama);
echo $nama; // Warning: Undefined variable $nama

$nama = 'Rizky';
echo $nama;
echo "<br>";

// heredoc
$kalimat = <<<habis
Sedang belajar bahasa pemrograman PHP,
dan sedang belajar string di PHP.
habis;

var_dump($kalimat);

// nowdoc
$bahasa = "pemrograman PHP";
$kalimat = <<<'habis'
Sedang belajar bahasa pemrograman $bahasa,
dan sedang belajar string di PHP.
habis;

var_dump($kalimat);
?>