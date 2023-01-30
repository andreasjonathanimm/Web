const light = {
    isDarkMode: false
};

const button = document.querySelector('.button');
button.addEventListener('click', function(event) {
    if (!light.isDarkMode) {
        document.querySelector('#mode').innerHTML = "<link rel=\"stylesheet\" id=\"mode\" href=\"assets/style/dark.css\"/>"
        light.isDarkMode = true;
    } else {
        document.querySelector('#mode').innerHTML = "<link rel=\"stylesheet\" id=\"mode\" href=\"assets/style/light.css\"/>"
        light.isDarkMode = false;
    }

})