<?php
// operators
// arithmetic operators
// +, -, *, /, %, **
$angka1 = 10;
$angka2 = 3;
$hasil = $angka1 + $angka2;
echo $hasil; // 13
echo "<br>";

$hasil = $angka1 - $angka2;
echo $hasil; // 7
echo "<br>";

$hasil = $angka1 * $angka2;
echo $hasil; // 30
echo "<br>";

$hasil = $angka1 / $angka2;
echo $hasil; // 3.3333333333333
echo "<br>";

$hasil = $angka1 % $angka2;
echo $hasil; // 1
echo "<br>";

$hasil = $angka1 ** $angka2;
echo $hasil; // 1000
echo "<br>";

// assignment operators
// =, +=, -=, *=, /=, %=, **=
$angka1 += $angka2;
echo $angka1; // 13
echo "<br>";

$angka1 -= $angka2;
echo $angka1; // 10
echo "<br>";

$angka1 *= $angka2;
echo $angka1; // 30
echo "<br>";

$angka1 /= $angka2;
echo $angka1; // 10
echo "<br>";

$angka1 %= $angka2;
echo $angka1; // 1
echo "<br>";

$angka1 **= $angka2;
echo $angka1; // 1
echo "<br>";

// comparison operators
// ==, ===, !=, <>, !==, <, >, <=, >=, <=>
$angka1 = 10;
$angka2 = 3;
$hasil = $angka1 == $angka2;
var_dump($hasil); // bool(false)
echo "<br>";

$hasil = $angka1 === $angka2;
var_dump($hasil); // bool(false)
echo "<br>";

$hasil = $angka1 != $angka2;
var_dump($hasil); // bool(true)
echo "<br>";

$hasil = $angka1 <> $angka2;
var_dump($hasil); // bool(true)
echo "<br>";

$hasil = $angka1 !== $angka2;
var_dump($hasil); // bool(true)
echo "<br>";

$hasil = $angka1 < $angka2;
var_dump($hasil); // bool(false)
echo "<br>";

$hasil = $angka1 > $angka2;
var_dump($hasil); // bool(true)
echo "<br>";

$hasil = $angka1 <= $angka2;
var_dump($hasil); // bool(false)
echo "<br>";

$hasil = $angka1 >= $angka2;
var_dump($hasil); // bool(true)
echo "<br>";

$hasil = $angka1 <=> $angka2;
var_dump($hasil); // int(1)
echo "<br>";

// increment/decrement operators
// ++, --
$angka1 = 10;
$angka2 = 3;
$hasil = $angka1++;
echo $hasil; // 10
echo "<br>";

$hasil = ++$angka1;
echo $hasil; // 12
echo "<br>";

$hasil = $angka1--;
echo $hasil; // 12
echo "<br>";

$hasil = --$angka1;
echo $hasil; // 10
echo "<br>";

// logical operators
// and, or, xor, &&, ||, !
$angka1 = 10;
$angka2 = 3;
$hasil = $angka1 == 10 and $angka2 == 3;
var_dump($hasil); // bool(true)
echo "<br>";

$hasil = $angka1 == 10 or $angka2 == 3;
var_dump($hasil); // bool(true)
echo "<br>";

$hasil = $angka1 == 10 xor $angka2 == 3;
var_dump($hasil); // bool(false)
echo "<br>";

$hasil = $angka1 == 10 && $angka2 == 3;
var_dump($hasil); // bool(true)
echo "<br>";

$hasil = $angka1 == 10 || $angka2 == 3;
var_dump($hasil); // bool(true)
echo "<br>";

$hasil = !($angka1 == 10);
var_dump($hasil); // bool(false)
echo "<br>";

// string operators
// ., .=
$nama1 = "Muhammad";
$nama2 = "Rizki";
$hasil = $nama1 . " " . $nama2;
echo $hasil; // Muhammad Rizki
echo "<br>";

$nama1 .= " " . $nama2;
echo $nama1; // Muhammad Rizki
echo "<br>";

// array operators
// +, ==, ===, !=, <>
$angka1 = [1, 2, 3];
$angka2 = [4, 5, 6];
$hasil = $angka1 + $angka2;
var_dump($hasil); // array(6) { [0]=> int(1) [1]=> int(2) [2]=> int(3) [3]=> int(4) [4]=> int(5) [5]=> int(6) }
echo "<br>";

$hasil = $angka1 == $angka2;
var_dump($hasil); // bool(false)
echo "<br>";

$hasil = $angka1 === $angka2;
var_dump($hasil); // bool(false)
echo "<br>";

$hasil = $angka1 != $angka2;
var_dump($hasil); // bool(true)
echo "<br>";

$hasil = $angka1 <> $angka2;
var_dump($hasil); // bool(true)
echo "<br>";

// conditional assignment operators
// ?:, ??, ??
$angka1 = 10;
$angka2 = 3;
$hasil = $angka1 == 10 ?: 10;
echo $hasil; // 10
echo "<br>";

$hasil = $angka1 == 10 ?? 10;
echo $hasil; // 10
echo "<br>";

$hasil = $angka1 == 10 ?? 10 ?? 3;
echo $hasil; // 10
echo "<br>";

// execution operators
// ``
$hasil = `dir`;
echo $hasil; // menampilkan isi folder
echo "<br>";

// error control operators
// @
$hasil = @file_get_contents("https://www.google.com");
var_dump($hasil); // bool(false)
echo "<br>";

// bitwise operators
// &, |, ^, ~, <<, >>
$a = 10; // 1010
$b = 3; // 0011
$hasil = $a & $b;
echo($hasil); // 2
echo "<br>";

$hasil = $a | $b;
echo($hasil); // 11
echo "<br>";

$hasil = $a ^ $b;
echo($hasil); // 9
echo "<br>";

$hasil = ~$a;
echo($hasil); // -11
echo "<br>";

$hasil = $a << $b;
echo($hasil); // 80
echo "<br>";

$hasil = $a >> $b;
echo($hasil); // 1
echo "<br>";

// operators order
// ()
// ++, --
// !
// *, /, %
// +, -
// <<, >>
// <, <=, >, >=
// ==, !=, ===, !==
// &
// ^
// |
// &&
// ||
// ?:
// ??
// =, +=, -=, *=, /=, %=, .=, &=, ^=, |=, <<=, >>=
// and
// xor
// or
// ,
$hasil = 10 + 3 * 2;
echo $hasil; // 16
echo "<br>";

?>