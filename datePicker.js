// Query selectors
const daysTag = document.querySelector(".days"),
currentDate = document.querySelector(".current-date"),
prevNextIcon = document.querySelectorAll(".icons span"),
selectedDateInput = document.querySelector("#selected-date");

// Getting new date, current year and month
let date = new Date(),
currYear = date.getFullYear(),
currMonth = date.getMonth(),
selectedDate = null; // Holds the selected date

// Storing full name of all months in array
const months = [
"January", "February", "March", "April", "May", "June", "July",
"August", "September", "October", "November", "December"
];

const renderCalendar = () => {
let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // First day of month
  lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // Last date of month
  lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // Last day of month
  lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // Last date of previous month

let liTag = "";

for (let i = firstDayofMonth; i > 0; i--) { // Previous month's last days
  liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
}

for (let i = 1; i <= lastDateofMonth; i++) { // Current month's days
  let isToday =
    i === date.getDate() &&
    currMonth === new Date().getMonth() &&
    currYear === new Date().getFullYear()
      ? "active"
      : "";
  let isSelected =
    selectedDate &&
    i === selectedDate.getDate() &&
    currMonth === selectedDate.getMonth() &&
    currYear === selectedDate.getFullYear()
      ? "selected"
      : "";

  liTag += `<li class="${isToday} ${isSelected}" data-day="${i}">${i}</li>`;
}

for (let i = lastDayofMonth; i < 6; i++) { // Next month's first days
  liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
}

currentDate.innerText = `${months[currMonth]} ${currYear}`; // Display current month & year
daysTag.innerHTML = liTag;

// Add event listeners to day elements
document.querySelectorAll(".days li").forEach(day => {
  day.addEventListener("click", (e) => {
    if (!e.target.classList.contains("inactive")) {
      const selectedDay = parseInt(e.target.dataset.day);
      selectedDate = new Date(currYear, currMonth, selectedDay);
      // selectedDateInput.value = `${selectedDate.getFullYear()}-${String(
      //   selectedDate.getMonth() + 1
      // ).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;

      selectedDateInput.value = `${String(selectedDate.getDate()).padStart(2, '0')}-${String(
  selectedDate.getMonth() + 1).padStart(2, '0')}-${selectedDate.getFullYear()}`;
      
      console.log("Date picked by user:", selectedDate); // Log the picked date
      
      renderCalendar(); // Re-render calendar to show selected date
    }
  });
});
};

renderCalendar();

prevNextIcon.forEach(icon => { // Previous and next icons
icon.addEventListener("click", () => {
  currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

  if (currMonth < 0 || currMonth > 11) {
    date = new Date(currYear, currMonth, new Date().getDate());
    currYear = date.getFullYear();
    currMonth = date.getMonth();
  } else {
    date = new Date();
  }
  renderCalendar();
});
});