<?php
$angka_int = 100;
var_dump($angka_int); // int(100)
echo "<br>";

$angka_str = (string) $angka_int;
var_dump($angka_str); // string(3) "100"
echo "<br>";

$angka_bool = (bool) $angka_int;
var_dump($angka_bool); // bool(true)

// integer castings
$angka_int = (integer) $angka_str;
// or
$angka_int = (int) $angka_str;
// from float, double, real, rounds up to the nearest integer
// from string, if the string is numeric, it will be converted to integer
// or if the string has number at the beginning, it will be converted to integer until it meets a non-numeric character
// or if the string is empty or not numeric, it will be converted to 0
// from boolean, true will be converted to 1 and false will be converted to 0
// from array, it will be converted to 1 otherwise 0 if the array is empty
// from NULL, it will be converted to 0
// from object, it will be converted to 1 causes error: Warning
// from resource, it will be converted to id resource, automatically by PHP

// string castings
$angka_str = (string) $angka_int;

// boolean castings
$angka_bool = (boolean) $angka_int;
// or
$angka_bool = (bool) $angka_int;
// from integer, 0 will be converted to false and non-zero will be converted to true
// from float, 0.0 will be converted to false and non-zero will be converted to true
// from string, empty string and "0" will be converted to false and non-empty string will be converted to true

// float castings
$angka_float = (float) $angka_int;
// or
$angka_float = (double) $angka_int;

// array castings
$angka_array = (array) $angka_int;

// object castings
$angka_object = (object) $angka_int;

// binary castings
$angka_binary = (binary) $angka_int;

?>