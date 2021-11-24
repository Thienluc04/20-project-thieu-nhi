var courseAPI = 'https://api.openweathermap.org/data/2.5/weather?q=Hanoi&units=metric&appid=d031c9d7a9c30264f0848c2a7fd10558'

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

function start() {
    getWeather(renderWeather);
}

start();

// Get API
function getWeather(callback) {
    fetch(courseAPI)
        .then(function(response) {
            return response.json();
        })
        .then(callback);
}

function renderWeather(data) {
    var today = new Date()
    var listItem = document.querySelector('.weather')
    var date = today.getDate()+' / '+(today.getMonth() +1);
    var day_name = ''
    switch (today.getDay()) {
        case 0:
            day_name = "Chủ nhật";
            break;
        case 1:
            day_name = "Thứ hai";
            break;
        case 2:
            day_name = "Thứ ba";
            break;
        case 3:
            day_name = "Thứ tư";
            break;
        case 4:
            day_name = "Thứ năm";
            break;
        case 5:
            day_name = "Thứ sau";
            break;
        case 6:
            day_name = "Thứ bảy";
        }

    var htmls = `<div class="item">
                    <span>${day_name} ${date}</span>
                    <div class="cloud">
                        <i class="fas fa-cloud-sun-rain"></i>
                        <span>${data.main.temp}/ ${data.main.temp_min} </span>
                        <span> ${data.weather[0].description}</span>
                    </div>
                </div>`

    listItem.innerHTML = htmls
}