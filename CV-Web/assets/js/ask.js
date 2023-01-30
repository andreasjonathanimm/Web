document.addEventListener('DOMContentLoaded', function () {
    const submitForm = document.getElementById('form');
    const answerList = document.getElementById('answer');

    // Load the lists of possible answers available
    const text = document.createElement('p');
    text.classList.add('text-center');
    text.innerText = "Selamat datang! Silahkan masukkan teks dari list berikut!"

    const list = document.createElement('ul');
    const contents = ["List", "Angkatan", "Organisasi Mahasiswa", "Hobi"];

    for (let content of contents) {
        list.appendChild(listed(content));
    }

    answerList.append(text, list);

    // Add event listener to the button to answer the question
    submitForm.addEventListener('submit', function (event) {
        event.preventDefault();
        answer();
    });
});

// Lists the contents
function listed(content) {
    const list = document.createElement('li');
    list.innerHTML = "<p>" + content + "</p>";
    return list;
}

// Answer the questions with available answers
function answer() {
    const answerList = document.getElementById('answer');

    // Resets the answerList
    answerList.innerHTML = '';

    let question = document.getElementById('question').value;
    let answer;
    question.toLowerCase();

    if (question.includes("angkat")) {
        answer = "Saya dari angkatan 2021, salam kenal!";
    } else if (question.includes("organis") || question.includes("mahasis") || question.includes("organisasi mahasiswa")) {
        answer = "Saya masuk organisasi mahasiswa FASCO pada tahun 2021, memang menarik cara kerjanya sebuah badan otonom!";
    } else if (question.includes("hobi")) {
        answer = "Hobi saya adalah belajar bahasa dan bermain catur, semoga saya bisa berlatih dengan Anda!";
    } else {
        const text = document.createElement('p');
        text.classList.add('text-center');
        text.innerText = "Selamat datang! Silahkan masukkan teks dari list berikut!"

        const list = document.createElement('ul');
        const contents = ["List", "Angkatan", "Organisasi Mahasiswa", "Hobi"];

        for (let content of contents) {
            list.appendChild(listed(content));
        }

        answerList.append(text, list);
    }

    // If the question can be answered, show the answer
    if (answer != undefined) {
        answerList.innerHTML = "<p class=\"text-center\">" + answer +"</p>";
        answerList.innerHTML += "<p class=\"text-center\"><em>Ketikkan \"List\" atau kata-kata lain untuk kembali ke List</em></p>";
    }
}