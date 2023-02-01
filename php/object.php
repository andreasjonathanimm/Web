<?php
class Siswa {
    public $nama;
    public $umur;
    public $tinggi;
    public $lulus;
    
    public function __toString() {
        return "Nama: $this->nama, Umur: $this->umur, Tinggi: $this->tinggi, Lulus: $this->lulus";
    }
}

$siswa = new Siswa;
$siswa->nama = "Rizky";
$siswa->umur = 12;
$siswa->tinggi = 12.5;
$siswa->lulus = true;

echo "<pre>";
print_r($siswa);
echo "</pre>";
?>