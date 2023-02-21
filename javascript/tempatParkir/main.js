// Requirement:
// - Mobil bisa parkir dan keluar dari tempat parkir
// - Mobil bisa parkir di dua slot jika size mobil lebih besar:
//    - Sedan mengambil 1 slot
//    - Truk mengambil 2 slot
// - Tempat parkir punya dua lantai
//    - Mobil bisa parkir di lantai 1 atau lantai 2

// Asumsi:
// - Asumsi tempat parkir bisa lebih dari satu, maka mobil punya fungsi parkir dan keluar
// - Asumsi mobil bisa parkir di lantai 1 atau lebih, maka mobil punya atribut lantai
// - Asumsi mobil bisa parkir di dua slot jika size mobil lebih besar, maka mobil punya atribut size
// - Asumsi tempat parkir punya dua atau lebih lantai dengan jumlah slot yang sama, maka tempat parkir punya atribut lantai

class TempatParkir {
    constructor(lantai, slot) {
        this.lantai = lantai;
        this.slot = slot;
        this.isiSlotPerLantai = [];
        for (let i = 0; i < lantai; i++) {
            this.isiSlotPerLantai.push(slot);
        }
    }

    isLantaiTersedia(lantai, size) {
        return this.isiSlotPerLantai[lantai - 1] >= size;
    }

    slotLantai(lantai) {
        return this.isiSlotPerLantai[lantai - 1];
    }

    pakaiSlot(lantai, size) {
        this.isiSlotPerLantai[lantai - 1] -= size;
    }

    kosongkanSlot(lantai, size) {
        this.isiSlotPerLantai[lantai - 1] += size;
    }
}

class Mobil {
    constructor(size) {
        this.size = size;
        this.lantai = null;
    }

    parkir(tempatParkir) {
        for (let i = 0; i < tempatParkir.lantai; i++) {
            if (tempatParkir.isLantaiTersedia(i + 1, this.size)) {
                this.lantai = i + 1;
                tempatParkir.pakaiSlot(i + 1, this.size);
                console.log('Mobil parkir di lantai ' + this.lantai);
                break;
            }
        }

        if (this.lantai === null) {
            console.log('Tempat parkir penuh');
        }
    }

    keluar(tempatParkir) {
        if (this.lantai === null) {
            console.log('Mobil belum parkir');
            return;
        }
        tempatParkir.kosongkanSlot(this.lantai, this.size);
        this.lantai = null;
        console.log('Mobil keluar');
    }
}

const tempatParkir = new TempatParkir(2, 2);
const mobil1 = new Mobil(1);
const mobil2 = new Mobil(2);

mobil1.parkir(tempatParkir);
mobil2.parkir(tempatParkir);

console.log("Slot lantai 1: " + tempatParkir.slotLantai(1));
console.log("Slot lantai 2: " + tempatParkir.slotLantai(2));

mobil1.keluar(tempatParkir);
mobil2.keluar(tempatParkir);

console.log("Slot lantai 1: " + tempatParkir.slotLantai(1));
console.log("Slot lantai 2: " + tempatParkir.slotLantai(2));