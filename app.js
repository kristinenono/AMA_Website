// main functions to use
const mainContent = document.getElementById("main-content");
const homeLink = document.getElementById("home-link");

document.addEventListener("DOMContentLoaded", function () {
  // Function to load the home page content
  function loadHomePage(event) {
    event.preventDefault();
    mainContent.innerHTML = `<div class="titleContainers">
      <div class="column column1">
          <h1 class="title">Welcome to <br />AMA UW-Madison</h1>
      </div>
      <div class="column column2">
          <img src="images/capitalPlaceholder.png" alt="Madison Capital" width="100%" height="100%" />
      </div>
    </div>
    <div id="aboutSection" class="aboutSection-box">
      <h2 class="primaryheader">About us</h2>
      <p class="primaryBody">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum at magni
          porro voluptatibus, quasi doloribus provident officiis, illo hic laborum
          distinctio mollitia quis minima ducimus.
      </p>
    </div>
    <div id="involvementSection" class="involvementSection">
      <div class="involvementText">
          <h3 class="secondaryheader">Get involved</h3>
          <h4 class="tertiaryHeader">Our primary events include:</h4>
          <ul class="primaryBody">
              <li>Member meetings</li>
              <li>Professional developments</li>
              <li>Social events</li>
              <li>Community outreach</li>
              <li>And more!</li>
          </ul>
          <div>
              <p>
                  <button class="involvementButton1"><b>LEARN MORE</b></button>&nbsp;&nbsp;
                  <button class="involvementButton2"><b>JOIN</b></button>
              </p>
          </div>
      </div>
      <div class="involvementImage-flex">
          <img src="images/Bucks_event.png" alt="AMA Event" width="100%" height="Auto" />
      </div>
    </div>`;
  }

  // Call the loadHomePage function
  loadHomePage(new Event("click"));

  // Get the home link element
  const homeLink = document.getElementById("home-link");

  // Add an event listener to load the home page when the home link is clicked
  homeLink.addEventListener("click", loadHomePage);
});

function r_e(id) {
  return document.querySelector(`#${id}`);
}
function appendContent(html) {
  r_e("main").innerHTML = html;
}

let cal_page_content = `<main>
  <div id="cal_page" class="wrapper">
    <!-- LEFT MARGIN -->
    <div class="colormargins margin-left">
      <h2 class="heading-tag-upcoming-event">Upcoming Events</h2>
      <div class="flex-container">
        <div class="box margin-event">
          <h2>Philathropy event</h2>

          <a href="#" class="events-button">View Event Here! </a>

          <div id="eventCard" class="event-card hidden">
            <!-- Content of the event card goes here -->
            <h2 class="secondaryheader">Event Title</h2>
            <p class="primaryBody">Date: [Event Date]</p>
            <p class="primaryBody">Location: [Event Location]</p>
            <!-- Add more details as needed -->
            <button id="editEventCard">Edit</button>
            <button id="deleteEventCard">Delete</button>
            <button id="closeEventCard">Close</button>
          </div>
        </div>
        <div class="box margin-event">
          <h2>Professional Development Event</h2>

          <a href="#" class="events-button">View Event Here! </a>
        </div>
        <div class="box margin-event">
          <h2>Speaker Event</h2>

          <a href="#" class="events-button">View Event Here! </a>
        </div>
        <div class="box margin-event">
          <h2>Social Event</h2>

          <a href="#" class="events-button">View Event Here! </a>
        </div>
      </div>
    </div>
    <div class="calview">
</div>`;

// Member drop down button
var dropdownButton = document.querySelector(".bttn1");
var dropdownContent = document.querySelector(".dropdown-content");

dropdownButton.addEventListener("click", function () {
  dropdownContent.classList.toggle("show");
});

document.addEventListener("click", function (event) {
  if (!event.target.closest(".dropdown")) {
    dropdownContent.classList.remove("show");
  }
});

const calendarView = document.querySelector(".calview");
const monthSelect = r_e("month-select");
const prevMonthBtn = document.querySelector(".action_left");
const nextMonthBtn = document.querySelector(".action_right");
const yearblock = r_e("yearblock");
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
  const totalDays = 42;
  calendarView.innerHTML = "";
  let currentYear = date.getFullYear();
  let currentMonth = date.getMonth();
  let firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  let daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  let dayCellsGenerated = 0;
  let emptyCellsCount = 0;

  yearblock.innerHTML = currentYear;
  // adding in a comment to restore the js
  let calendarHtml = "<div class='weekdayview'>";
  for (let title = 0; title <= 6; title++) {
    calendarHtml += `<div class='dayofweek'>${dayNames[title]}</div>`;
  }
  calendarHtml += "</div><div class='monthview'><div class='weekview'>";

  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarHtml += '<div class="dayview empty"></div>';
    dayCellsGenerated++;
    emptyCellsCount++;
  }
  for (let day = 1; day <= daysInMonth; day++) {
    calendarHtml += `<div class="dayview">${day}</div>`;
    dayCellsGenerated++;
    if (dayCellsGenerated % 7 === 0 && dayCellsGenerated !== totalDays) {
      calendarHtml += '</div><div class="weekview">';
      emptyCellsCount = 0; // Reset empty cells count at the start of a new week
    }
  }

  while (dayCellsGenerated < totalDays) {
    calendarHtml += '<div class="dayview empty"></div>';
    dayCellsGenerated++;
    emptyCellsCount++;
    if (dayCellsGenerated % 7 === 0 && dayCellsGenerated !== totalDays) {
      calendarHtml += '</div><div class="weekview">';
      emptyCellsCount = 0; // Reset empty cells count at the start of a new week
    }
  }

  if (emptyCellsCount === 7) {
    // Remove the last weekview div if all its cells are empty
    calendarHtml = calendarHtml.substring(
      0,
      calendarHtml.lastIndexOf('<div class="weekview">')
    );
  }

  calendarHtml += "</div>"; // Close the last weekview or monthview div properly
  calendarView.innerHTML = calendarHtml; // Set the calendar HTML to the innerHTML of the calendarView
  monthSelect.value = monthNames[currentMonth];
}
generateCalendar(currentDate);
const todayBtn = document.querySelector("#today-btn");
todayBtn.addEventListener("click", function () {
  currentDate = new Date(); // Reset currentDate to today's date
  generateCalendar(currentDate); // Regenerate the calendar for the current month
});

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
}); // Get the Today button
cal_page_content += calendarView;

cal_page_content += `<!-- RIGHT MARGIN -->
    <div class="colormargins margin-right">
      <a href="#" class="add-btn" id="eventbtn">Add Event</a>
      <!-- <button class="add-btn">Add Event</button> -->
      <!-- href="cal_form.html" -->
    </div>
  </div>
  <div id="addEventsPopup" class="popup">
    <div class="popup-content">
      <span class="close" onclick="closeAddEventsPopup()">&times;</span>
      <h2 class="secondaryheader2">Add Event</h2>
      <form>
        <p class="addEventContent">
          <label for="eventTitle">Event Title:</label>
          <input type="text" id="eventTitle" required />
        </p>

        <p class="addEventContent">
          <label for="eventType">Event Type:</label>
          <select id="eventType" required>
            <option value="memberMeeting">Member Meeting</option>
            <option value="professionalDevelopment">
              Professional Development
            </option>
            <option value="social">Social</option>
            <option value="philanthropic">Philanthropic</option>
            <option value="dei">DEI</option>
          </select>
        </p>

        <p class="addEventContent">
          <label for="eventDescription">Event Description:</label>
        </p>
        <p class="addEventContent">
          <textarea id="eventDescription" rows="4" required></textarea>
        </p>

        <p class="addEventContent">
          <label for="eventDate">Event Date:</label>
          <input type="date" id="eventDate" required />
        </p>

        <input type="submit" value="Add Event" />
      </form>
    </div>
  </div>
</main>`;

// click event for cal
r_e("calendarbtn").addEventListener("click", () => {
  appendContent(cal_page_content);
});

// JavaScript to handle the burger menu toggle
document.addEventListener("DOMContentLoaded", function () {
  const burger = document.querySelector(".navbar-burger");
  const menu = document.querySelector(".navbar-menu");
  const loginSignupBurger = document.querySelector(".login-signup-burger");

  burger.addEventListener("click", function () {
    burger.classList.toggle("active");
    menu.classList.toggle("active");
    loginSignupBurger.classList.toggle("active"); // Toggle login and signup in burger menu
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
      burger.classList.remove("active");
      menu.classList.remove("active");
      loginSignupBurger.classList.remove("active"); // Remove active class on resize
    }
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

// MODAL POP UP IN HTML
function openModal() {
  var modal = document.getElementById("logmodal");
  modal.style.display = "block";
}

function closeModal() {
  var modal = document.getElementById("logmodal");
  modal.style.display = "none";
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
  var passwordField = document.querySelector(
    '#logmodal input[type="password"]'
  );

  emailField.value = ""; // Clearing the email input field
  passwordField.value = ""; // Clearing the password input field
}

// Function to handle cancel button click event
document
  .getElementById("logcancel_btn")
  .addEventListener("click", function (event) {
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
};

// JavaScript to handle the burger menu toggle
document.addEventListener("DOMContentLoaded", function () {
  const burger = document.querySelector(".navbar-burger");
  const menu = document.querySelector(".navbar-menu");
  const loginSignupBurger = document.querySelector(".login-signup-burger");
  const backgroundDiv = document.querySelector(".background-div");

  burger.addEventListener("click", function () {
    burger.classList.toggle("active");
    menu.classList.toggle("active");
    loginSignupBurger.classList.toggle("active"); // Toggle login and signup in burger menu
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
      burger.classList.remove("active");
      menu.classList.remove("active");
      loginSignupBurger.classList.remove("active"); // Remove active class on resize
    }
  });
});
