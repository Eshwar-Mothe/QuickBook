const items = localStorage.getItem('user')

const userObject = JSON.parse(items)

console.log(userObject.src)

document.getElementById('src').value = userObject.src
document.getElementById('dest').value = userObject.dest
document.getElementById('quota').value = userObject.quota
document.getElementById('class').value = userObject.cls

console.log(userObject.quota)
console.log(userObject.cls)


if (userObject && userObject.date) {
    // Function to check the ISO Format

    function isISODateFormat(dateString) {
        // Regular expression for basic ISO 8601 date format
        const isoDateRegex = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?)?$/;
        return isoDateRegex.test(dateString);
    }

    if (isISODateFormat(userObject.date)) {
        document.getElementById('doj').value = userObject.date;
        console.log("The date is in ISO format:", userObject.date);
    } else {
        console.log("The date is NOT in ISO format:", userObject.date);
        const [day, month, year] = userObject.date.split('-'); // Split into parts
        const isoDate = `${year}-${month}-${day}`; // Reformat to "YYYY-MM-DD"

        document.getElementById('doj').value = isoDate;
    }
}




// Toggling the TrainSchedule Feature in trainsAvl.html

const getSchedules = document.querySelectorAll('.schedule');

getSchedules.forEach((scheduleButton) => {
    scheduleButton.addEventListener('click', (event) => {

        const clickedButton = event.target;
        const trainSection = clickedButton.closest('.train');

        if (trainSection) {
            const trainNumber = trainSection.querySelector('#trainNumber').innerText;

            console.log(`Train Number: ${trainNumber}`);
        }
        const schedule = document.getElementById('trainSchedule');
        schedule.style.display = 'block';

    });
});

const closeToggle = document.getElementById('toggle')

closeToggle.addEventListener('click', () => {
    const schedule = document.getElementById('trainSchedule');
    closeToggle.style.cursor = 'pointer';
    schedule.style.display = 'none';
});


// Swapping At Ribbon

const swap = document.getElementById('swapper');

swap.addEventListener('click', () => {
    // alert('Swapping');
    let Source = document.getElementById('src');

    let Dest = document.getElementById('dest');

    let srcValue = Source.value;
    let destValue = Dest.value;


    if (srcValue === '' || destValue === '') {
        alert("values must not be empty");
        console.log('Values are empty, swap not allowed');
        return;
    }
    else {
        Source.value = destValue;
        Dest.value = srcValue;

    }
    swap.classList.toggle('swapped')
});


// Modifying the Search

const modifyButton = document.getElementById('modify')

const searchButton = document.getElementById('newSearch')

const ribbonSrc = document.getElementById('src');
const ribbonDest = document.getElementById('dest');
const ribbonQuota = document.getElementById('quota');
const ribbonClass = document.getElementById('class');
const ribbonDoj = document.getElementById('doj');

modifyButton.addEventListener('click', () => {
    searchButton.style.display = 'block';
    // Enabling to change input Values by removing disable attribute

    ribbonSrc.removeAttribute('disabled');
    ribbonDest.removeAttribute('disabled');
    ribbonQuota.removeAttribute('disabled');
    ribbonClass.removeAttribute('disabled');
    ribbonDoj.removeAttribute('disabled');

});

searchButton.addEventListener('click', () => {
    searchButton.style.display = 'none';

    const ribbonSrc = document.getElementById('src');
    const ribbonDest = document.getElementById('dest');
    const ribbonQuota = document.getElementById('quota');
    const ribbonClass = document.getElementById('class');
    const ribbonDoj = document.getElementById('doj');

    ribbonSrc.setAttribute('disabled', 'disabled');
    ribbonDest.setAttribute('disabled', 'disabled');
    ribbonQuota.setAttribute('disabled', 'disabled');
    ribbonClass.setAttribute('disabled', 'disabled');
    ribbonDoj.setAttribute('disabled', 'disabled');

    const newSearch = {
        'src': ribbonSrc.value,
        'dest': ribbonDest.value,
        'quota': ribbonQuota.value,
        'class': ribbonClass.value,
        'doj': ribbonDoj.value
    }

    localStorage.setItem('newDetails', JSON.stringify(newSearch));
    const newItems = localStorage.getItem('newDetails');

    const newObject = JSON.parse(newItems);

    console.log(newObject);
});

// const baseUrl = 'http://127.0.0.1:5503/';

// const bookingNav = document.querySelectorAll('.booking1');

bookingNav.forEach((pnrButton) => {
    pnrButton.addEventListener('click', () => {
        location.href = `${baseUrl}bookingPage.html`;
    })
})


// Trains Avl Data

// Fetch data from the JSON server
fetch('http://localhost:3000/data')
    .then(response => response.json())
    .then(data => {
        console.log(data)
        console.log(data.route)
        const trainInfo = data.route;
        console.log(trainInfo[trainInfo.length - 1].station_name)

        trainInfo.map((data) => {
            // console.log(data)
        })

        // Update Train Main Info
        const trainInfoRow = document.getElementById('trainInfoRow');
        trainInfoRow.innerHTML = `
        <td>${data.trainNumber}</td>
        <td>${data.trainName}</td>
        <td>${trainInfo[0].station_name}</td>
        <td>${trainInfo[trainInfo.length - 1].station_name}</td>
        <td class="rDays">
        <ul>
            ${Object.entries(data.runDays).map(([day, runs]) => `
                <li class="${runs ? 'true' : 'false'}">${day}</li>
            `).join('')}
        </ul>
        </td>
    `;

        // Update Detailed Station Info
        function convertMinutesTo24HrTime(minutes) {
            const baseTime = new Date();
            baseTime.setHours(0, 0, 0, 0); 
        
            const time = new Date(baseTime.getTime() + minutes * 60000); 
        
            const hours = String(time.getHours()).padStart(2, '0'); 
            const minutesFormatted = String(time.getMinutes()).padStart(2, '0'); 
        
            return `${hours}:${minutesFormatted}`;
        }
        
        stationsInfo.innerHTML = trainInfo
            .filter(station => station.stop === true) 
            .map((station, index) => `
                <tr class="stationsInfo">
                    <td>${index + 1}</td>
                    <td>${station.platform_number}</td>
                    <td>${station.station_code}</td>
                    <td>${station.station_name}</td>
                    <td>${station.route_number || '1'}</td>
                    <td>${

                        (station.sta_min) > 0 ?
                        (convertMinutesTo24HrTime(station.sta_min)) : '--'
                    }</td>
                    <td>${
                        (station.std_min) > 0 ?
                        (convertMinutesTo24HrTime(station.std_min)) : '--'
                    }</td>
                    <td>${
                        (station.distance_from_source) > 0 ? 
                        ((station.std_min) - (station.sta_min) > 0 ? String(station.std_min - station.sta_min).padStart(2, '0') + ':00' : '--') : '--'}</td>
                    <td>${Math.floor(station.distance_from_source)}</td>
                    <td>${station.day}</td>
                </tr>
            `)
            .join('');
    })
    .catch(error => console.error('Error fetching data:', error));


    fetch('http://localhost:3000/data')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        
        // Update Train Name and Number
        document.getElementById('trainName').innerHTML = `${data.trainName} (<span id="trainNumber">${data.trainNumber}</span>)`;
        
        // Update Running Days
        const daysList = document.querySelector('.avlDays');
        daysList.innerHTML = 'Runs On:' + Object.entries(data.runDays)
            .map(([day, runs]) => `<li class="${runs ? '' : 'inactive'}">${day.charAt(0).toUpperCase()}</li>`)
            .join('');
        
        // Update Train Schedule
        const trainInfo = data.route;
        document.getElementById('Stime').textContent = `${convertMinutesTo24HrTime(trainInfo[0].sta_min)} | `;
        document.getElementById('tstation').textContent = `${trainInfo[0].station_name} | `;
        document.getElementById('tdate').textContent = `Thu, 19 Dec`;
        
        document.getElementById('Etime').textContent = `${convertMinutesTo24HrTime(trainInfo[trainInfo.length - 1].std_min)} | `;
        document.getElementById('Dstation').textContent = `${trainInfo[trainInfo.length - 1].station_name} | `;
        document.getElementById('Edate').textContent = `Thu, 19 Dec`;
        
        // Update Classes and Availability
        const bookingSection = document.querySelector('.bookingSection');
        bookingSection.innerHTML = data.class.map(trainClass => `
            <section class="trainClass1">
                <p id="bookingClass">${trainClass.name}</p>
                <p id="avail">AVAILABLE - <span id="availTickets">${getRandomTickets()}</span></p>
                <p id="price">&#8377;${getRandomPrice()}</p>
            </section>
        `).join('');
    })
    .catch(error => console.error('Error fetching data:', error));

function convertMinutesTo24HrTime(minutes) {
    const baseTime = new Date();
    baseTime.setHours(0, 0, 0, 0);
    const time = new Date(baseTime.getTime() + minutes * 60000);
    return `${String(time.getHours()).padStart(2, '0')}:${String(time.getMinutes()).padStart(2, '0')}`;
}

function getRandomTickets() {
    return Math.floor(Math.random() * 100) + 1;
}

function getRandomPrice() {
    return Math.floor(Math.random() * 1000) + 500;
}


// Function to convert minutes into "HH:MM" format
function convertMinutesToTime(minutes) {
    let hours = Math.floor(minutes / 60);
    let mins = minutes % 60;
    return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
}


// Function to convert minutes to "HH:MM"
function convertMinutesToTime(minutes) {
    let hours = Math.floor(minutes / 60) % 24; // Ensure hours stay within 24-hour format
    let mins = minutes % 60;
    return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
}

// Function to format date (Weekday, DD MMM)
function formatDate(date) {
    const options = { weekday: 'short', day: '2-digit', month: 'short' };
    return date.toLocaleDateString('en-US', options);
}

// Fetch train data
const trainsSchecdule = () => {
    document.getElementById('trainSchedule').style.display = 'block';

    console.log('triggering')

    fetch('http://localhost:3000/data')
        .then(response => response.json())
        .then(data => {
            console.log(data);
    
            // Extract train details
            document.getElementById('trainName').innerHTML = `${data.trainName} (<span id="trainNumber">${data.trainNumber}</span>)`;
    
            // Running days
            const runDaysList = document.querySelector('.avlDays');
            runDaysList.innerHTML = `Runs On: ` + Object.entries(data.runDays)
                .map(([day, runs]) => `<li class="${runs ? '' : 'inactive'}">${day[0].toUpperCase()}</li>`)
                .join('');
    
            // Train Route Info (First and Last Station)
            const trainRoute = data.route;
            const startStation = trainRoute[0];
            const endStation = trainRoute[trainRoute.length - 1];
    
            // Get today's date as base departure date
            let today = new Date();
            let departureDate = new Date(today);
            departureDate.setHours(Math.floor(startStation.std_min / 60), startStation.std_min % 60, 0, 0);
    
            // Calculate total journey time
            let totalJourneyMinutes = endStation.sta_min - startStation.std_min;
    
            let arrivalDate = new Date(departureDate.getTime() + totalJourneyMinutes * 60000);
    
            // Display Departure Info
            document.getElementById('Stime').innerText = convertMinutesToTime(startStation.std_min) + ' | ';
            document.getElementById('tstation').innerText = startStation.station_name + ' | ';
            document.getElementById('tdate').innerText = formatDate(departureDate);
    
            // Display Arrival Info
            document.getElementById('Etime').innerText = convertMinutesToTime(arrivalDate.getHours() * 60 + arrivalDate.getMinutes()) + ' | ';
            document.getElementById('Dstation').innerText = endStation.station_name + ' | ';
            document.getElementById('Edate').innerText = formatDate(arrivalDate);
    
            // Display total journey time
            let journeyHours = Math.floor(totalJourneyMinutes / 60);
            let journeyMins = totalJourneyMinutes % 60;
            document.getElementById('timeSpan').innerText = `----- ${journeyHours}:${String(journeyMins).padStart(2, '0')} -----`;
    
        })
        .catch(error => console.error('Error fetching data:', error));
}


    fetch('http://localhost:3000/data')
    .then(response => response.json())
    .then(data => {
        console.log(data);

        // Select the container where train details will be inserted
        const trainsContainer = document.querySelector('.showAvlTrains');
        trainsContainer.innerHTML = ''; // Clear previous content

        // Loop through all available trains
        const weekDaysOrder = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

        data.avlTrains.forEach(train => {
            const trainElement = document.createElement('section');
            trainElement.classList.add('train');
        
            // Convert the fetched run days to a Set for quick lookup
            const availableDays = new Set(train.run_days);
        
            trainElement.innerHTML = `
            <section class="train train1">
                <header>
                    <p id="trainName">${train.train_name} (<span id="trainNumber">${train.train_number}</span>)</p>
                    <p id="days">
                        <ul class="avlDays">
                            Runs On: ${weekDaysOrder.map(day => 
                                `<li class="${availableDays.has(day) ? '' : 'inactive'}">${day}</li>`
                            ).join('')}
                        </ul>
                    </p>
                    <p class="schedule" onclick="trainsSchecdule()">Train Schedule</p>
                </header>
        
                <section class="trainInfo">
                    <p><span id="Stime">${train.from_sta} | </span><span id="tstation">${train.from_station_name}</span> | <span id="tdate">${train.train_date}</span></p>
                    <p id="timeSpan">----- ${train.duration} -----</p>
                    <p><span id="Etime">${train.to_sta} | </span><span id="Dstation">${train.to_station_name}</span> | <span id="Edate">${train.train_date}</span></p>
                </section>
        
                <section class="bookingSection">
                    ${train.class_type.map(trainClass => `
                        <section class="trainClass1">
                            <p id="bookingClass">${trainClass}</p>
                            <p id="avail">AVAILABLE - <span id="availTickets">${getRandomTickets()}</span></p>
                            <p id="price">&#8377;${getRandomPrice()}</p>
                        </section>
                    `).join('')}
                </section>
        
                <section class="book">
                    <button>Book</button>
                </section>
            </section>
            `;
        
            // Append the train element to the main container
            trainsContainer.appendChild(trainElement);
        });
        
    })
    .catch(error => console.error('Error fetching data:', error));

// Helper functions for random tickets and price (for demo purposes)
function getRandomTickets() {
    return Math.floor(Math.random() * 50) + 1; // Generates random tickets (1-50)
}

function getRandomPrice() {
    return Math.floor(Math.random() * 500) + 500; // Generates random price (500-1000)
}



