<?php
// array
$siswa = array("Rizky", "Rahmat", "Rahayu");
var_dump($siswa);

// array literal
$siswa = ["Rizky", "Rahmat", "Rahayu"];
var_dump($siswa);

echo $siswa[2]; // Rahayu
echo "<br>";
echo "Murdi itu bernama $siswa[0]"; // Murdi itu bernama Rizky

// array assignment
$macam = array("Rizky", 12, 12.5, true);
$macam[1] = "Bee";
$macam[2] = 212;
$macam[3] = 1.5;
var_dump($macam);

// multi dimensional array
$koordinat = array(
    array(8,2),
    array(3,4),
    array(5,6)
    );
echo $koordinat[1][0]; // 3
echo "<br>";
echo $koordinat[2][1]; // 6
echo "<br>";
echo $koordinat[0][0]; // 8

// array asosiatif
$siswa = array(
    "nama" => "Rizky",
    "umur" => 12,
    "tinggi" => 12.5,
    "lulus" => true
    );
?>