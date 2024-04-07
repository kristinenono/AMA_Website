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
          <img src="images/capitalPlaceholder.png" alt="MadisonCapital" width="100%" height="100%" />
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


// Login/Signup Modal Open/Close 
let loginmodal = document.querySelector("#logmodal");
let loginbutton = document.querySelector("#loginbtn");
let login_mbg = document.querySelector("#log_modalbg")

let signupmodal = document.querySelector("#signmodal");
let signupbutton = document.querySelector("#signupbtn");
let signup_mbg = document.querySelector("#sign_modalbg")

// function to open up login and signup modals
function openLoginModal() {
  loginmodal.classList.add('is-active');
};

function openSignupModal() {
  signupmodal.classList.add('is-active');
};

// click functions for login and signup buttons to open up the modal
loginbutton.addEventListener('click', openLoginModal);
signupbutton.addEventListener('click', openSignupModal);

  // Close modals when clicking on the background or "X" button
    document.querySelectorAll('.modal-background, .modal-close').forEach(function(el) {
      el.addEventListener('click', function() {
        loginmodal.classList.remove('is-active');
        signupmodal.classList.remove('is-active');
      });
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

cal_page_content += `<div class="colormargins margin-right">
<a href="#" class="add-btn2" id="eventbtn">Add Event</a>
</main>`;

// click event for cal
r_e("calendarbtn").addEventListener("click", () => {
  appendContent(cal_page_content);
});
// addEventModal
let addEventForm = r_e("popupmodal");

function show_addEvent_form() {
  addEventForm.classList.remove("is-hidden");
  addEventForm.classList.add("is-active");
}

let addEventbtn = r_e("eventbtn");
addEventbtn.addEventListener("click", show_addEvent_form);

let addEventcancel = r_e("addEventcncl");
addEventcancel.addEventListener("click", () => {
  addEventForm.classList.remove("is-active");
});

// Function to generate a random code
function generateRandomCode(length) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < length; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
}

// Function to update the input field with the generated code
function updateCodeInput() {
  const codeInput = document.getElementById("codeInput");
  const randomCode = generateRandomCode(8); // Generate a random 8-character code (adjust length as needed)
  codeInput.value = randomCode;
}

// Event listener for the "Go" button click event
const generateButton = document.getElementById("generateButton");
if (generateButton) {
  generateButton.addEventListener("click", updateCodeInput);
}

// eventcardModal
let eventCard1 = r_e("card_modal_1");
let eventbtn1 = r_e("eventbtn1");
let eventclose1 = r_e("closeEventCard");

function showEventCard1() {
  eventCard1.classList.remove("is-hidden");
  eventCard1.classList.add("is-active");
}
eventbtn1.addEventListener("click", showEventCard1);

eventclose1.addEventListener("click", () => {
  eventCard1.classList.remove("is-active");
});
// eventcardModal2
let eventCard2 = r_e("card_modal_2");
let eventbtn2 = r_e("eventbtn2");
let eventclose2 = r_e("closeEventCard2");

function showEventCard2() {
  eventCard2.classList.remove("is-hidden");
  eventCard2.classList.add("is-active");
}
eventbtn2.addEventListener("click", showEventCard2);

eventclose2.addEventListener("click", () => {
  eventCard2.classList.remove("is-active");
});

// / eventcardModal3
let eventCard3 = r_e("card_modal_3");
let eventbtn3 = r_e("eventbtn3");
let eventclose3 = r_e("closeEventCard3");

function showEventCard3() {
  eventCard3.classList.remove("is-hidden");
  eventCard3.classList.add("is-active");
}
eventbtn3.addEventListener("click", showEventCard3);

eventclose3.addEventListener("click", () => {
  eventCard3.classList.remove("is-active");
});

// / eventcardModal4
let eventCard4 = r_e("card_modal_4");
let eventbtn4 = r_e("eventbtn4");
let eventclose4 = r_e("closeEventCard4");

function showEventCard4() {
  eventCard4.classList.remove("is-hidden");
  eventCard4.classList.add("is-active");
}
eventbtn4.addEventListener("click", showEventCard4);

eventclose4.addEventListener("click", () => {
  eventCard4.classList.remove("is-active");
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
  const closeEventCardBtn = document.getElementById("eventCard");
  // Add an event listener to the close button
  document
    .getElementById("closeAddEventsPopup")
    .addEventListener("click", closeAddEventsPopup);

  // Function to close the add events popup
  function closeAddEventsPopup() {
    var addEventsPopup = document.getElementById("addEventsPopup");
    addEventsPopup.style.display = "none";
  }

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

// // Add Events Popup
// var addEventsPopup = document.getElementById("addEventsPopup");

// // Function to open the popup
// function openAddEventsPopup() {
//   addEventsPopup.style.display = "block";
// }

// // Function to close the popup
// function closeAddEventsPopup() {
//   addEventsPopup.style.display = "none";
// }

// // Attach the open function to your "Add Event" button
// document.getElementById("eventbtn").onclick = function () {
//   openAddEventsPopup();
// };


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
