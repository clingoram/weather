$(document).ready(function () {
    var units = "C", lat, lon;

    function getIP(units) {
        $('.location').empty();
        $.getJSON('http://ip-api.com/json', function (location) {
            $('.location').append( location.city + ', ' + location.country);
            lat = location.lat;
            lon = location.lon;
            getWeather(lat, lon, units);
        });
    }

    getIP(units);

    function getWeather(lat, lon, units) {
        var url;
            url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&units=metric&appid=534c4f52d9431381c9322dbc7b834462';

        $.getJSON(url, function (data) {
            
            $('.degree').html(Math.round(data.main.temp));
            $('.deg').html('&deg;C');
            getIcon(data.weather[0].icon);
            $('.description').html(data.weather[0].description); //天氣描述
            $('.wet').html(data.main.humidity + '&nbsp;' + '%');   //濕度
            $('.cld').html(data.clouds.all + '&nbsp;' + '%'); //雲量
            $('.windS').html(data.wind.speed + '&nbsp' +'kph''); //風速   

            dayForecast(lat, lon, units);
        });
    }

    //weather icon
    function getIcon(i) {
        switch (i) {
            case '01d':
                $(".icon").html("<i class='wi wi-day-sunny'></i>");
                break;
            case '02d':
                $(".icon").html("<i class='wi wi-day-cloudy'></i>");
                break;
            case '03d':
                $(".icon").html("<i class='wi wi-cloud'></i>");
                break;
            case '04d':
                $(".icon").html("<i class='wi wi-cloudy'></i>");
                break;
            case '09d':
                $(".icon").html("<i class='wi wi-sprinkle'></i>");
                break;
            case '10d':
                $(".icon").html("<i class='wi wi-day-sprinkle'></i>");
                break;
            case '11d':
                $(".icon").html("<i class='wi wi-thunderstorm'></i>");
                break;
            case '13d':
                $(".icon").html("<i class='wi wi-snow'></i>");
                break;
            case '50d':
                $(".icon").html("<i class='wi wi-strong-wind'></i>");
                break;
            case '01n':
                $(".icon").html("<i class='wi wi-night-clear'></i>");
                break;
            case '02n':
                $(".icon").html("<i class='wi wi-night-alt-cloudy'></i>");
                break;
            case '03n':
                $(".icon").html("<i class='wi wi-cloud'></i>");
                break;
            case '04n':
                $(".icon").html("<i class='wi wi-cloudy'></i>");
                break;
            case '09n':
                $(".icon").html("<i class='wi wi-sprinkle'></i>");
                break;
            case '10n':
                $(".icon").html("<i class='wi wi-night-sprinkle'></i>");
                break;
            case '11n':
                $(".icon").html("<i class='wi wi-thunderstorm'></i>");
                break;
            case '13n':
                $(".icon").html("<i class='wi wi-snow'></i>");
                break;
            case '50n':
                $(".icon").html("<i class='wi wi-strong-wind'></i>");
                break;
            default:
                $(".icon").html("<i class='wi wi-day-cloudy'></i>");
                break;
        }
    };

    function dayForecast(lat, lon, units) {
        var url, d = new Date();
        url = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&units=metric&APPID=534c4f52d9431381c9322dbc7b834462';

        $.getJSON(url, function (data) {

            var dayone = data.list[0].dt_txt.substring(5, 10).replace('-', '/'),
                daytwo = data.list[8].dt_txt.substring(5, 10).replace('-', '/'),
                daythree = data.list[16].dt_txt.substring(5, 10).replace('-', '/'),
                dayfour = data.list[24].dt_txt.substring(5, 10).replace('-', '/');

            var icon1, icon2, icon3, icon4;
            var week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], day1, day2, day3, day4;

            day1 = d.getDay() + 1;
            day2 = d.getDay() + 2;
            day3 = d.getDay() + 3;
            day4 = d.getDay() + 4;

            if (day1 === 7) { day1 = 0; }
            if (day2 === 7) { day2 = 0; }
            else if (day2 === 8) { day2 = 1; }
            if (day3 === 7) { day3 = 0; }
            else if (day3 === 8) { day3 = 1; }
            else if (day3 === 9) { day3 = 2; }
            if (day4 === 7) { day4 = 0; }
            else if (day4 === 8) { day4 = 1; }
            else if (day4 === 9) { day4 = 2; }

            $('.dayone').html('<h3>' + week[day1] + '</h3><p><img class="img" src="http://openweathermap.org/img/w/' + data.list[0].weather[0].icon + '.png"/> <div class="status">' + data.list[0].weather[0].main + '</div></p><p class="temp">' + Math.round(data.list[0].main.temp_max) + '&nbsp;&deg;' + units + '</p><p class="tempH">' + Math.round(data.list[0].main.temp_min) + '&nbsp;&deg;' + units + '</p>');

            $('.daytwo').html('<h3>' + week[day2] + '</h3><p><img class="img" src="http://openweathermap.org/img/w/' + data.list[8].weather[0].icon + '.png"/><div class="status">' + data.list[8].weather[0].main + '</div></p><p class="temp">' + Math.round(data.list[8].main.temp_max) + '&nbsp;&deg;' + units + '</p><p class="tempH">' + Math.round(data.list[8].main.temp_min) + '&nbsp;&deg;' + units + '</p>');

            $('.daythree').html('<h3>' + week[day3] + '</h3><p><img class="img" src="http://openweathermap.org/img/w/' + data.list[16].weather[0].icon + '.png" /> <div class="status">' + data.list[16].weather[0].main + '</div></p><p class="temp">' + Math.round(data.list[16].main.temp_max) + '&nbsp;&deg;' + units + '</p><p class="tempH">' + Math.round(data.list[16].main.temp_min) + '&nbsp;&deg;' + units + '</p>');

            $('.dayfour').html('<h3>' + week[day4] + '</h3> <p><img class="img" src="http://openweathermap.org/img/w/' + data.list[24].weather[0].icon + '.png" />  <div class="status">' + data.list[24].weather[0].main + '</div></p> <p class="temp">' + Math.round(data.list[24].main.temp_max) + '&nbsp;&deg;' + units + '</p><p class="tempH">' + Math.round(data.list[24].main.temp_min) + '&nbsp;&deg;' + units + '</p>');
        });
    }

    //search
    //get weather from enter a city
        $('#searchBar').autocomplete({
            source: function (request, response) {
                $.getJSON('http://gd.geobytes.com/AutoCompleteCity?callback=?&q=' + request.term, function (data) {
                    if (data[0] === '') { response(close()) }
                    else { response(data); }
                });
            },
            minLength: 3,
            select: function (event, ui) {
                retrieveLocation(ui.item.value);
            }
        });

        function retrieveLocation(location) {
            $.getJSON('http://gd.geobytes.com/GetCityDetails?callback=?&fqcn=' + location, function (data) {
                getNewLocation(data.geobytescity, data.geobytescode, data.geobytescountry);
                lat = data.geobyteslatitude;
                lon = data.geobyteslongitude;
                getWeather(lat, lon, units);
                
            })
        }

        function getNewLocation(city, country) {
            $('.location').empty();
            $('.location').append(city + ", " + country);

            $('.my-location').click(function () {
                getIP();
                getWeather(lat, lon, units);
            });
        }
});

//日期
$(document).ready(function () {

    var d = new Date();

    var day, month, date, year, time;
    var date = d.getDate() 
    var day = d.getDay(); //week
    var year = d.getFullYear(); 
    var month = d.getMonth(); //count from 0

    switch (d.getMonth()) {
        case 0:
            month = "Jan.";
            break;
        case 1:
            month = "Feb.";
            break;
        case 2:
            month = "Mar.";
            break;
        case 3:
            month = "Apr.";
            break;
        case 4:
            month = "May";
            break;
        case 5:
            month = "June";
            break;
        case 6:
            month = "July";
            break;
        case 7:
            month = "Aug.";
            break;
        case 8:
            month = "Sep.";
            break;
        case 9:
            month = "Oct.";
            break;
        case 10:
            month = "Nov.";
            break;
        case 11:
            month = "Dec.";
            break;

    }
    switch (d.getDay()) {

        case 0:
            day = "Sunday";
            break;

        case 1:
            day = "Monday";
            break;

        case 2:
            day = "Tuesday";
            break;

        case 3:
            day = "Wednesday";
            break;

        case 4:
            day = "Thursday";
            break;

        case 5:
            day = "Friday";
            break;

        case 6:
            day = "Saturday";
            break;

    }
    switch (d.getDate()) {
        case 1:
            date = "1st";
            break;
        case 2:
            date = "2nd";
            break;
        case 3:
            date = "3rd";
            break;
        case 4:
            date = "4th";
            break;
        case 5:
            date = "5th";
            break;
        case 6:
            date = "6th";
            break;
        case 7:
            date = "7th";
            break;
        case 8:
            date = "8th";
            break;
        case 9:
            date = "9th";
            break;
        case 10:
            date = "10th";
            break;
        case 11:
            date = "11th";
            break;
        case 12:
            date = "12th";
            break;
        case 13:
            date = "13th";
            break;
        case 14:
            date = "14th";
            break;
        case 15:
            date = "15th";
            break;
        case 16:
            date = "16th";
            break;
        case 17:
            date = "17th";
            break;
        case 18:
            date = "18th";
            break;
        case 19:
            date = "19th";
            break;
        case 20:
            date = "20th";
            break;
        case 21:
            date = "21st";
            break;
        case 22:
            date = "22nd";
            break;
        case 23:
            date = "23rd";
            break;
        case 24:
            date = "24th";
            break;
        case 25:
            date = "25th";
            break;
        case 26:
            date = "26th";
            break;
        case 27:
            date = "27th";
            break;
        case 28:
            date = "28th";
            break;
        case 29:
            date = "29th";
            break;
        case 30:
            date = "30th";
            break;
        case 31:
            date = "31st";
            break;
    }

    $('#day').text(day + ','); //天 
    $('#month').text(month); //月
    $('#date').text(date); //日期
    $('#year').text(year);  //年
});
//time
function displayTime() {
    var currentTime = new Date();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var seconds = currentTime.getSeconds();
    var diem = "AM";

    var myClock = document.getElementById('time');

    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    if (hours < 10) {
        hours = "0" + hours;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    if (hours > 12) {
        hours = hours - 12;
        diem = "PM";
    }

    if (hours === 0) {
        hours = 12;
    }

    $('.time').text(hours + ":" + minutes + ":" + seconds + " " + diem);

    if (seconds == 0) {

    }
}
displayTime();
setInterval(displayTime, 1000);
