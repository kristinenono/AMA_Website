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
  let daysInFirstWeek = 7 - firstDayOfMonth;
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
  // Get the form and password input element
  var signupForm = document.getElementById("signup_form");
  var passwordInput = document.getElementById("password");
  var cancelButton = document.getElementById("cancel_btn");

  // Add a click event listener to the cancel button
  cancelButton.addEventListener("click", function (event) {
    // Prevent the default action of the button (submitting the form)
    event.preventDefault();

    // Redirect the user to the index.html page
    window.location.href = "index.html";
  });
});

// Wait for the DOM content to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Get the form and password input element
  var signupForm = document.getElementById("signup_form");
  var passwordInput = document.getElementById("password");

  // Add a submit event listener to the form
  signupForm.addEventListener("submit", function (event) {
    // Prevent the default form submission
    event.preventDefault();

    // Get the value of the password input
    var password = passwordInput.value;

    // Check if the password meets the required criteria (e.g., minimum length)
    if (password.length < 8) {
      // Display an error message if the password is too short
      alert("Password must be at least 8 characters long.");
      return; // Stop further execution of the function
    }

    // If the password is valid, you can proceed with form submission
    // Here, you can add code to submit the form data to the server
    // For demonstration purposes, let's just log the password to the console
    console.log("Password:", password);

    // Reset the form fields
    signupForm.reset();
  });
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
