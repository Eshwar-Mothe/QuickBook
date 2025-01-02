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

    localStorage.setItem('newDetails',JSON.stringify(newSearch));
    const newItems = localStorage.getItem('newDetails');
    
    const newObject = JSON.parse(newItems);
    
    console.log(newObject);
});



