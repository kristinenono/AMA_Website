const calendarView = document.querySelector(".calview");
const monthSelect = document.getElementById("month-select");
const prevMonthBtn = document.querySelector(".action_left");
const nextMonthBtn = document.querySelector(".action_right");
const yearblock = document.getElementById("yearblock");
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const dayNames = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];

let currentDate = new Date();

function generateCalendar(date) {
  // this is where we set the cal grid
  const totalDays = 42;
  calendarView.innerHTML = "";
  let currentYear = date.getFullYear();
  let currentMonth = date.getMonth();
  let firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  // this is the first day of the week
  let daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  let dayCellsGenerated = 0;

  yearblock.innerHTML = currentYear;
  let calendarHtml = "";

  calendarHtml += `<div class="weekdayview">`;
  for (let title = 0; title <= 6; title++) {
    calendarHtml += `<div class="dayofweek">${dayNames[title]}
  </div>`;
  }

  calendarHtml += `</div>`;
  calendarHtml += `<div class="weekview">`;
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarHtml += '<div class="dayview empty"></div>';
    dayCellsGenerated++;
  }
  for (let day = 1; day <= daysInMonth; day++) {
    calendarHtml += `<div class="dayview">${day}</div>`;
    dayCellsGenerated++;
    if (dayCellsGenerated % 7 === 0 && dayCellsGenerated !== totalDays) {
      calendarHtml += '</div><div class="weekview">'; // Start a new row every 7 days unless it's the last cell
    }
  }

  while (dayCellsGenerated < totalDays) {
    calendarHtml += '<div class="dayview empty"></div>';
    dayCellsGenerated++;
    if (dayCellsGenerated % 7 === 0 && dayCellsGenerated !== totalDays) {
      calendarHtml += '</div><div class="weekview">';
    }
  }

  if (dayCellsGenerated % 7 !== 1) {
    calendarHtml += "</div>";
  }
  calendarHtml += `</div>`;
  calendarView.innerHTML = calendarHtml;
  monthSelect.value = monthNames[currentMonth];
}

function changeMonth(step) {
  currentDate.setMonth(currentDate.getMonth() + step);
  generateCalendar(currentDate);
}

monthSelect.addEventListener("change", function () {
  currentDate.setMonth(monthNames.indexOf(this.value));
  generateCalendar(currentDate);
});

prevMonthBtn.addEventListener("click", function () {
  changeMonth(-1);
});

nextMonthBtn.addEventListener("click", function () {
  changeMonth(1);
});

generateCalendar(currentDate);

const todayBtn = document.querySelector("#today-btn"); // Get the Today button

todayBtn.addEventListener("click", function () {
  currentDate = new Date(); // Reset currentDate to today's date
  generateCalendar(currentDate); // Regenerate the calendar for the current month
});

document.addEventListener("DOMContentLoaded", function () {
  const viewEventLinks = document.querySelectorAll(".events-button");
  const eventCard = document.getElementById("eventCard");
  const closeEventCardBtn = document.getElementById("closeEventCard");

  // Show the event card when any "View Event Here" link is clicked
  viewEventLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      eventCard.classList.remove("hidden");
    });
  });

  // Close the event card when the close button is clicked
  closeEventCardBtn.addEventListener("click", function () {
    eventCard.classList.add("hidden");
  });
});
// Add Events Popup
var addEventsPopup = document.getElementById("addEventsPopup");

// Function to open the popup
function openAddEventsPopup() {
  addEventsPopup.style.display = "block";
}

// Function to close the popup
function closeAddEventsPopup() {
  addEventsPopup.style.display = "none";
}

// Attach the open function to your "Add Event" button
document.getElementById("eventbtn").onclick = function () {
  openAddEventsPopup();
};

var dropdownButton = document.querySelector(".bttn1");
var dropdownContent = document.querySelector(".dropdown-content");

function toggleDropdown() {
  dropdownContent.classList.toggle("show");
}

dropdownButton.addEventListener("click", toggleDropdown);

document.addEventListener("click", function (event) {
  if (!event.target.closest(".dropdown")) {
    dropdownContent.classList.remove("show");
  }
});

// MODAL POP UP IN HTML
function openModal() {
  var modal = document.getElementById('logmodal');
  modal.style.display = 'block';
}

function closeModal() {
  var modal = document.getElementById('logmodal');
  modal.style.display = 'none';
}

// Function to handle login button click event
function loginclick() {
  openModal();
}

// Function to handle span (close) click event
function modalclose() {
  closeModal();
}

// when cancel is clicked the fields empty
function clearFields() {
  var emailField = document.querySelector('#logmodal input[type="email"]');
  var passwordField = document.querySelector('#logmodal input[type="password"]');

  emailField.value = ''; // Clearing the email input field
  passwordField.value = ''; // Clearing the password input field
}

// Function to handle cancel button click event
document.getElementById('logcancel_btn').addEventListener('click', function(event) {
  event.preventDefault(); // Prevent the default form submission behavior
  clearFields(); // Clear the input fields
});


// SIGN UP MODAL
function signupclick() {
  var modal = document.getElementById("signmodal");
  modal.style.display = "block";
}

// Function to close the signup modal
function signmodalclose() {
  var modal = document.getElementById("signmodal");
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the signup modal, close it
window.onclick = function (event) {
  var modal = document.getElementById("signmodal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


// JavaScript to handle the burger menu toggle
document.addEventListener('DOMContentLoaded', function () {
  const burger = document.querySelector('.navbar-burger');
  const menu = document.querySelector('.navbar-menu');
  const loginSignupBurger = document.querySelector('.login-signup-burger');
   
  burger.addEventListener('click', function () {
    burger.classList.toggle('active');
    menu.classList.toggle('active');
    loginSignupBurger.classList.toggle('active'); // Toggle login and signup in burger menu
  });
      
  window.addEventListener('resize', function () {
    if (window.innerWidth > 768) {
      burger.classList.remove('active');
      menu.classList.remove('active');
      loginSignupBurger.classList.remove('active'); // Remove active class on resize
    }
  });
});