// Base URL for navigation
const baseUrl = 'http://127.0.0.1:5500/';

// Button Navigations
const availTrains = document.getElementById('searchTrain');

const bookingNav = document.querySelectorAll('.booking1');
const statusNav = document.querySelectorAll('.status1');
const pnrNav = document.querySelectorAll('.pnr1');

// Navigation to check the Status of the trains
statusNav.forEach((statusButton) => {
    statusButton.addEventListener('click', () => {
        location.href = `${baseUrl}trainsAvl.html`;
    })
})

// Navingation to Check the PNR Status
pnrNav.forEach((pnrButton) => {
    pnrButton.addEventListener('click', () => {
        location.href = `${baseUrl}pnrCheck.html`;
    })
})




// Fetching entered values
const swaping = document.getElementById('swapperSymbol');

swaping.addEventListener('click', () => {
    let Source = document.getElementById('src');
    let Dest = document.getElementById('dest');

    let srcValue = Source.value;
    let destValue = Dest.value;


    if (srcValue === '' || destValue === '') {
        console.log('Values are empty, swap not allowed');
        return;
    }

    console.log('Before Swap:', srcValue, destValue);


    Source.value = destValue;
    Dest.value = srcValue;

    console.log('After Swap:', Source.value, Dest.value);
});

console.log(document)

const getDateValue = () => {
    const mobileDate = document.getElementById('doj');
    const desktopDate = document.getElementById('selected-date');
    if (mobileDate.style.display !== 'none' || mobileDate.style.display !== '') {
        console.log('true', mobileDate.value)
        // return mobileDate.value; // Mobile date picker value
    }
    else if (desktopDate.style.display !== 'none' || desktopDate.style.display !== '') {
        console.log(desktopDate.value)
        // return desktopDate.value;

    }
    return '';
};


const valueChecker = () => {
    let Source = document.getElementById('src').value;
    let Dest = document.getElementById('dest').value;
    let userClass = document.getElementById('class').value;
    let userQuota = document.getElementById('quota').value;
    let dojSamp = document.getElementById('selected-date').value; //Desktop view
    let mbl = document.getElementById('doj').value; //mobile View
    // console.log(mbl);

    let doj = ''
    if (dojSamp != '') {
        doj = document.getElementById('selected-date').value;
    }
    else if (mbl != '') {
        doj = document.getElementById('doj').value;
    }
    else {
        console.log("Please select")
    }
    console.log('Date', doj)

    console.log("Details", Source, Dest, userClass, userQuota, doj);


    if (!Source || !Dest || !userClass || !userQuota || !doj) {
        return false
    }
    else {
        const searchedValues = {
            'src': `${Source}`,
            'dest': `${Dest}`,
            'quota': `${userQuota}`,
            'cls': `${userClass}`,
            'date': `${doj}`,
        }

        console.log(searchedValues);

        // localStorage.clear();
        localStorage.setItem('user', JSON.stringify(searchedValues))
        return true
    }
}

availTrains.addEventListener('click', valueChecker);

availTrains.addEventListener('click', () => {
    console.log("return", valueChecker())
    if (valueChecker()) {
        location.href = `${baseUrl}trainsAvl.html`;
        console.log("Redirecting")

    }
    else {
        console.log("Values are missing in Travel Details");
        alert('Please fill the required fields')
    }
});

// Redirecting to booking page after checking the value in the LocalStorage

const checkLocal1 = localStorage.getItem('user');
const checkLocal2 = localStorage.getItem('newDetails');


// Navigation to book the ticket
bookingNav.forEach((bookinButton) => {
    bookinButton.addEventListener('click', () => {
        if (checkLocal1 || checkLocal2) {
            location.href = `${baseUrl}bookingPage.html`;
        }
        else {
            alert('Please search the train Details first')
        }
    });
});