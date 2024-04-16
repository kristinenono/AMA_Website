function configure_message_bar(message) {
  r_e("message_bar").classList.remove("is-hidden");
  r_e("message_bar").innerHTML = message;
  setTimeout(() => {
    r_e("message_bar").classList.add("is-hidden");
    r_e("message_bar").innerHTML = "";
  }, 3000);
}

r_e("sign_form").addEventListener("submit", (e) => {
  e.preventDefault();
  let email_val = r_e("email_").value;
  let password_val = r_e("password_").value;
  let full_name_val = r_e("signup_name").value;
  auth
    .createUserWithEmailAndPassword(email_val, password_val)
    .then(() => {
      let dbuser = { email: email_val, full_name: full_name_val };
      db.collection("ama_users").add(dbuser);
      r_e("sign_form").reset();
      r_e("signmodal").classList.remove("is-active");
      configure_message_bar(
        `Signed Up Successfully - Welcome ${full_name_val}!`
      );
      r_e("signup_error").innerHTML = "";
    })
    .catch((err) => {
      r_e("signup_error").innerHTML = err.message;
    });
});

r_e("log_form").addEventListener("submit", (e) => {
  e.preventDefault();
  let email_val = r_e("email").value;
  let password_val = r_e("password").value;
  auth
    .signInWithEmailAndPassword(email_val, password_val)
    .then(() => {
      r_e("log_form").reset();
      r_e("logmodal").classList.remove("is-active");
      db.collection("ama_users")
        .where(`email`, `==`, `${email_val}`)
        .get()
        .then((user) => {
          configure_message_bar(
            `Signed In Successfully - Welcome Back ${
              user.docs[0].data().full_name
            }!`
          );
        });
      r_e("log_error").innerHTML = "";
    })
    .catch((err) => {
      r_e("log_error").innerHTML = err.message;
    });
});

r_e("signout_button").addEventListener("click", () => {
  auth
    .signOut()
    .then(() => {
      configure_message_bar("Signed Out Successfully!");
      if (r_e("cal_page") != null) {
        loadHomePage;
        r_e("joinbuttonhome").addEventListener("click", openSignupModal);
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

// check user
auth.onAuthStateChanged((user) => {
  if (user) {
    r_e("indicator").innerHTML = `Signed In As ${user.email}`;
    r_e("signout_button").classList.remove("is-hidden");
    r_e("indicator").classList.remove("is-hidden");
    r_e("indicator").classList.add("margin-class");
    r_e("signout_button").classList.add("margin-class");
    r_e("signupbtn").classList.add("is-hidden");
    r_e("loginbtn").classList.add("is-hidden");
    if (r_e("joinbuttonhome") != null) {
      r_e("joinbuttonhome").classList.add("is-hidden");
    }
  } else {
    r_e("indicator").innerHTML = "";
    r_e("signout_button").classList.add("is-hidden");
    r_e("indicator").classList.add("is-hidden");
    r_e("indicator").classList.remove("margin-class");
    r_e("signout_button").classList.remove("margin-class");
    r_e("signupbtn").classList.remove("is-hidden");
    r_e("loginbtn").classList.remove("is-hidden");
    if (r_e("joinbuttonhome") != null) {
      r_e("joinbuttonhome").classList.remove("is-hidden");
    }
  }
});

// Grab the elements for login and signup buttons and modals
var loginButton = document.getElementById("loginbtn");
var signupButton = document.getElementById("signupbtn");
var loginModal = document.getElementById("logmodal");
var signupModal = document.getElementById("signmodal");

// Function to open login modal
function openLoginModal() {
  loginModal.classList.add("is-active");
}

// Function to open signup modal
function openSignupModal() {
  signupModal.classList.add("is-active");
}

// Event listeners for login and signup buttons
loginButton.addEventListener("click", openLoginModal);
signupButton.addEventListener("click", openSignupModal);

// Close modals when clicking on the background or "X" button
document
  .querySelectorAll(".modal-background, .modal-close")
  .forEach(function (el) {
    el.addEventListener("click", function () {
      loginModal.classList.remove("is-active");
      signupModal.classList.remove("is-active");
    });
  });

let signup_cancel = document.querySelector("#signup_cancel");
signup_cancel.addEventListener("click", () => {
  r_e("signmodal").classList.remove("is-active");
  r_e("home-link").click();
  window.location.reload();
});
let log_cancel = document.querySelector("#log_cancel");
log_cancel.addEventListener("click", () => {
  loginModal.classList.remove("is-active");
});

r_e("user_found").addEventListener("click", () => {
  if (signupModal.classList.contains("is-active")) {
    signupModal.classList.remove("is-active");
    loginModal.classList.add("is-active");
  }
});
r_e("user_notfound").addEventListener("click", () => {
  if (loginModal.classList.contains("is-active")) {
    loginModal.classList.remove("is-active");
    signupModal.classList.add("is-active");
  }
});

let home_page_content = `<div class="titleContainers">
<div class="column column1">
    <h1 class="title is-1 has-text-light" id="title_uw">Welcome to <br />AMA UW-Madison</h1>
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
            <button class="involvementButton1" id="learnbuttonhome"><b>LEARN MORE</b></button>
            <button class="involvementButton2" id="joinbuttonhome"><b>JOIN</b></button>
        </p>
    </div>
</div>
<div class="involvementImage-flex">
    <img src="images/Bucks_event.png" alt="AMA Event" width="100%" height="Auto" />
</div>
</div>`;
document.querySelector("#joinbuttonhome").addEventListener("click", () => {
  r_e("signupbtn").click();
});
document.querySelector("#learnbuttonhome").addEventListener("click", () => {
  r_e("abt-link").click();
});
// main functions to use
// console.log(firebase);
// const mainContent = document.getElementById("main-content");
// const homeLink = document.getElementById("home-link");

// document.addEventListener("DOMContentLoaded", function () {
//   // Function to load the home page content
//   function loadHomePage(event) {
//     event.preventDefault();
//     mainContent.innerHTML = `<div class="titleContainers">
//       <div class="column column1">
//           <h1 class="title is-1 has-text-light">Welcome to <br />AMA UW-Madison</h1>
//       </div>
//       <div class="column column2">
//           <img src="images/capitalPlaceholder.png" alt="MadisonCapital" width="100%" height="100%" />
//       </div>
//     </div>
//     <div id="aboutSection" class="aboutSection-box">
//       <h2 class="primaryheader">About us</h2>
//       <p class="primaryBody">
//           Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum at magni
//           porro voluptatibus, quasi doloribus provident officiis, illo hic laborum
//           distinctio mollitia quis minima ducimus.
//       </p>
//     </div>
//     <div id="involvementSection" class="involvementSection">
//       <div class="involvementText">
//           <h3 class="secondaryheader">Get involved</h3>
//           <h4 class="tertiaryHeader">Our primary events include:</h4>
//           <ul class="primaryBody">
//               <li>Member meetings</li>
//               <li>Professional developments</li>
//               <li>Social events</li>
//               <li>Community outreach</li>
//               <li>And more!</li>
//           </ul>
//           <div>
//               <p>
//                   <button class="involvementButton1"><b>LEARN MORE</b></button>&nbsp;&nbsp;
//                   <button class="involvementButton2" id="joinbuttonhome"><b>JOIN</b></button>
//               </p>
//           </div>
//       </div>
//       <div class="involvementImage-flex">
//           <img src="images/Bucks_event.png" alt="AMA Event" width="100%" height="Auto" />
//       </div>
//     </div>`;
//   }

//   // Call the loadHomePage function
//   loadHomePage(new Event("click"));

//   // Get the home link element
//   const homeLink = document.getElementById("home-link");

//   // Add an event listener to load the home page when the home link is clicked
//   homeLink.addEventListener("click", loadHomePage);
// });

// main functions for innerHTML
function r_e(id) {
  return document.querySelector(`#${id}`);
}
function appendContent(html) {
  r_e("main-content").innerHTML = html;
}

// Member drop down button
var dropdownButton = r_e("members-link");
var dropdownContent = document.querySelector(".dropdown-content");

dropdownButton.addEventListener("click", () => {
  dropdownContent.classList.remove("is-hidden");
});

document.addEventListener("click", function (event) {
  if (!event.target.closest(".dropdown")) {
    dropdownContent.classList.remove("show");
  }
});

// home page
r_e("home-link").addEventListener("click", () => {
  appendContent(home_page_content);
  let check_auth = auth.currentUser;
  if (check_auth != null) {
    r_e("joinbuttonhome").classList.add("is-hidden");
  }
  window.location.reload();
});

let abt_content = `      <div id="contactSectionTop" class="contactSection-box contactTopFormat">
<h2 class="primaryheader">More About Us</h2>
<div class="social-icons-container">
  <a href="#" class="social-icon" title="Email">
    <p>EVENT TYPES</p>
  </a>
  <a href="#aboutHeaderSection" class="social-icon" title="Instagram">
    <p>MEMBERSHIP REQUIREMENTS</p>
  </a>
  <a href="#aboutHeaderSection2" class="social-icon" title="LinkedIn">
    <p>CORPORATE PARTNERSHIPS</p>
  </a>
</div>
</div>

<h3 class="aboutHeader">Event Types</h3>

<div class="gridContainer">
<ul class="grid-list">
  <li>
    <div class="service-card has-after">
      <div class="card-content">
        <div class="aboutCardContent">
          <div class="aboutCardTxt-flex">
            <h3 class="aboutCardImg">
              <i class="fa-solid fa-person-chalkboard"></i>
            </h3>
            <h3 class="aboutCardHeader">Speaker/Member Meetings</h3>
          </div>
        </div>
      </div>
    </div>
  </li>
  <li>
    <div class="service-card has-after">
      <div class="card-content">
        <div class="aboutCardContent">
          <div class="aboutCardTxt-flex">
            <h3 class="aboutCardImg">
              <i class="fa-solid fa-briefcase"></i>
            </h3>
            <h3 class="aboutCardHeader">
              Professional Development Workshops
            </h3>
          </div>
        </div>
      </div>
    </div>
  </li>
  <li>
    <div class="service-card has-after">
      <div class="card-content">
        <div class="aboutCardContent">
          <div class="aboutCardTxt-flex">
            <h3 class="aboutCardImg">
              <i class="fa-regular fa-comments"></i>
            </h3>
            <h3 class="aboutCardHeader">Social Events</h3>
          </div>
        </div>
      </div>
    </div>
  </li>
  <li>
    <div class="service-card has-after">
      <div class="card-content">
        <div class="aboutCardContent">
          <div class="aboutCardTxt-flex">
            <h3 class="aboutCardImg">
              <i class="fa-regular fa-heart"></i>
            </h3>
            <h3 class="aboutCardHeader">DEI Workshops</h3>
          </div>
        </div>
      </div>
    </div>
  </li>
  <li>
    <div class="service-card has-after">
      <div class="card-content">
        <div class="aboutCardContent">
          <div class="aboutCardTxt-flex">
            <h3 class="aboutCardImg">
              <i class="fa-solid fa-handshake-angle"></i>
            </h3>
            <h3 class="aboutCardHeader">Volunteer Events</h3>
          </div>
        </div>
      </div>
    </div>
  </li>
  <li>
    <div class="service-card has-after">
      <div class="card-content">
        <div class="aboutCardContent">
          <div class="aboutCardTxt-flex">
            <h3 class="aboutCardImg">
              <i class="fa-regular fa-circle-check"></i>
            </h3>
            <h3 class="aboutCardHeader">Leadership Opportunities</h3>
          </div>
        </div>
      </div>
    </div>
  </li>
  <!-- Repeat for other services -->
</ul>
</div>
<div id="aboutHeaderSection">
<div class="contactForm-flex">
  <div class="membership-info">
    <h3 class="aboutHeader">Membership Requirements</h3>
    <div class="membershipRequirementsSection">
      <h4 class="aboutCardHeader2">
        <strong>1) Dues:</strong>
      </h4>
      <p>
        All members are required to pay <strong>local</strong> and
        <strong>national dues.</strong>
      </p>
      <p>
        <strong>Local dues: </strong>$25/semester OR $35/year paid to
        our Venmo (@uwmadisonAMA)
      </p>
      <p>
        <strong>National dues: </strong>$29/year paid to
        <a href="https://www.ama.org/ama-member-benefits/"
          >AMA National Website</a
        >
      </p>
    </div>
    <div class="membershipRequirementsSection">
      <h4 class="aboutCardHeader2">
        <strong>2) Point Requirements:</strong>
      </h4>

      <div class="requirements-container">
        <div class="requirements-column">
          <p>
            <strong><u>Lead Member Requirements:</u></strong>
          </p>
          <ul>
            <li>*6/7 Member Meetings</li>
            <li>*2 Professional Development Events</li>
            <li>*2 Social Events</li>
            <li>*1 Volunteer Point</li>
            <li>*1 DEI Education Point</li>
            <li>Join a Committee</li>
          </ul>
        </div>
        <div class="requirements-column">
          <p>
            <strong><u>General Member Requirements:</u></strong>
          </p>
          <ul>
            <li>*4/7 Member Meetings</li>
            <li>*1 Professional Development Events</li>
            <li>*1 Social Events</li>
            <li>*1 Volunteer Point</li>
            <li>*1 DEI Education Point</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <img
            id="execImage"
            src="images/Exec_board.png"
            alt="MembershipImages"
          />
        </div>
      </div>

      <div id="aboutHeaderSection2">
        <div class="contactForm-flex">
          <img
            id="speakerEventImg"
            src="images/Speaker_event.png"
            alt="MembershipImages"
          />
  <div class="membership-info2">
    <h3 class="aboutHeader2">Corporate Partnerships</h3>
    <div class="membershipRequirementsSection2">
      <p>
        Corporate sponsorships are essential to our club, offering our
        members valuable opportunities. UW AMA works with businesses to
        connect our members with industry experts for learning and
        networking. This partnership also gives our sponsors visibility
        and a platform to share job openings.
      </p>
      <br />
      <p><strong>Partner with UW AMA in the following ways:</strong></p>
      <p>
        <li>Speak at a member meeting</li>
        <li>Host a professional development workshop</li>
        <li>Host a DEI workshop</li>
      </p>
      <br />
      <p>
        <strong>Interested in partnering? </strong>Please contact us at
        amauwmadison@gmail.com, or fill out the form on our Contact
        page.
      </p>
    </div>
  </div>
</div>
</div>`;

//about page
r_e("abt-link").addEventListener("click", () => {
  appendContent(abt_content);
});

document.querySelector(".aboutfooter").addEventListener("click", () => {
  r_e("abt-link").click();
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
function openEventModal(eventId) {
  // Find the corresponding link element
  const link = document.querySelector(
    `.view-event-link[data-event-id="${eventId}"]`
  );
  // If the link exists, trigger a click event on it
  if (link) {
    link.click();
  }
}

function generateCalendarHTML(date, events) {
  const totalDays = 42;
  let currentYear = date.getFullYear();
  let currentMonth = date.getMonth();
  let firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  let daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  let dayCellsGenerated = 0;
  let emptyCellsCount = 0;

  let calendarHtml = "<div class='weekdayview'>";
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
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
    const eventOnThisDay = events.filter((event) => {
      const eventDate = new Date(event.data.time);
      return (
        eventDate.getFullYear() === currentYear &&
        eventDate.getMonth() === currentMonth &&
        eventDate.getDate() === day
      );
    });

    let dayHtml = `<div class="dayview"><div>${day}</div>`; // Date number above button name
    eventOnThisDay.forEach((event) => {
      const eventDate = new Date(event.data.time);
      const formattedDate = eventDate.toLocaleString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      // dayHtml += `<button class="event" data-event-id="${event.id}" onclick="alert('${formattedDate}')">${event.data.name}</button>`;
      dayHtml += `<button class="event evtbutton" data-event-id="${event.id}" onclick="openEventModal('${event.id}')">${event.data.name}</button>`;
    });
    dayHtml += `</div>`;

    calendarHtml += dayHtml;
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
  return calendarHtml; // Return the calendar HTML string
}

function fetchEventsAndGenerateCalendarHTML(date) {
  db.collection("events")
    .get()
    .then((querySnapshot) => {
      const events = []; // Array to store events data
      querySnapshot.forEach((doc) => {
        // Extract event data and push it to the events array
        const eventData = {
          id: doc.id,
          data: doc.data(),
        };
        events.push(eventData);
      });

      // Once events are fetched, generate calendar HTML
      const calendarHtml = generateCalendarHTML(date, events);

      // Update the calendar view with the generated HTML
      document.querySelector(".calview").innerHTML = calendarHtml;
    })
    .catch((error) => {
      console.error("Error getting events: ", error);
    });
}
function logAllEvents() {
  db.collection("events")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
      });
    })
    .catch((error) => {
      console.error("Error getting events: ", error);
    });
}

// Call the function to log all events
logAllEvents();

// Function to generate a random code
// function generateRandomCode(length) {
//   const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
//   let code = "";
//   for (let i = 0; i < length; i++) {
//     code += characters.charAt(Math.floor(Math.random() * characters.length));
//   }
//   return code;
// }

// // Function to update the input field with the generated code
// function updateCodeInput() {
//   const codeInput = document.getElementById("codeInput");
//   const randomCode = generateRandomCode(8); // Generate a random 8-character code (adjust length as needed)
//   codeInput.value = randomCode;
// }

r_e("calendarbtn").addEventListener("click", () => {
  let check_auth = auth.currentUser;
  console.log("btn clicked");
  if (check_auth == null) {
    // User is not signed in
    signupModal.classList.remove("is-active");
    loginModal.classList.add("is-active");
  } else {
    // User is signed in
    let cal_page_content = `<main>
    <div id="cal_page" class="wrapper">
      <!-- LEFT MARGIN -->
      <div class="colormargins margin-left">
        <h2 class="heading-tag-upcoming-event">Upcoming Events</h2>
        <div class="flex-container">
        <div id="all_events"></div>
        <div class="modal is-hidden" id="eventModal">
  <div class="modal-background"></div>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title" id="eventModalTitle"></p>
      <button class="delete" aria-label="close" id="closeModal"></button>
    </header>
    <section class="modal-card-body" id="eventModalContent">
      <!-- Event details will be populated here -->
    </section>
    <footer class="modal-card-foot">
      <button class="button" id="closeModalButton">Close</button>
    </footer>
  </div>
 </div>
     
         
         </div>
      </div>
      <div id="sample" class="colormargins page-content">
      <div class="navcal">
        <span class="today">
          <button id="today-btn">Today</button>
        </span>
        <button class="action_left">
          <i class="fa-solid fa-chevron-left"></i>
        </button>
        <select class="selectdrop" id="month-select">
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>
        <button class="action_right">
          <i class="fa-solid fa-chevron-right"></i>
        </button>
        <span class="yearblock">
          <button id="yearblock"></button>
        </span>
      </div>
        <div class="calview">
          <!-- Calendar view will be populated here -->
          ${fetchEventsAndGenerateCalendarHTML(currentDate)}
        </div>
      </div>
      ${rightMarginHTML(auth.currentUser.email == "amauwmadison@gmail.com")}
    </div>
  </main>`;
    appendContent(cal_page_content);

    // Set the month select dropdown value to the current month
    const monthSelect = document.getElementById("month-select");
    const currentMonth = currentDate.getMonth(); // Get the current month index
    monthSelect.selectedIndex = currentMonth;

    document.getElementById("today-btn").addEventListener("click", () => {
      const currentDate = new Date(); // Get the current date
      const currentMonth = currentDate.getMonth(); // Get the current month index
      const currentYear = currentDate.getFullYear(); // Get the current year
      const firstDayOfMonth = new Date(currentYear, currentMonth, 1); // Get the first day of the current month
      document.querySelector(".calview").innerHTML =
        fetchEventsAndGenerateCalendarHTML(firstDayOfMonth, currentMonth);

      // Update the month select dropdown value to the current month
      const monthSelect = document.getElementById("month-select");
      monthSelect.selectedIndex = currentMonth;
    });

    document
      .getElementById("month-select")
      .addEventListener("change", (event) => {
        const selectedMonth = event.target.value;
        const selectedMonthIndex = monthNames.indexOf(selectedMonth);
        const currentYear = new Date().getFullYear(); // Get the current year
        const firstDayOfSelectedMonth = new Date(
          currentYear,
          selectedMonthIndex,
          1
        );
        document.querySelector(".calview").innerHTML =
          fetchEventsAndGenerateCalendarHTML(firstDayOfSelectedMonth);
      });

    document.querySelector(".action_left").addEventListener("click", () => {
      currentDate.setMonth(currentDate.getMonth() - 1); // Move to the previous month
      const currentMonth = currentDate.getMonth(); // Get the updated month index
      const currentYear = currentDate.getFullYear(); // Get the updated year
      const firstDayOfMonth = new Date(currentYear, currentMonth, 1); // Get the first day of the updated month
      document.querySelector(".calview").innerHTML =
        fetchEventsAndGenerateCalendarHTML(firstDayOfMonth, currentMonth);

      // Update the month select dropdown value to the updated month
      monthSelect.selectedIndex = currentMonth;
    });

    document.querySelector(".action_right").addEventListener("click", () => {
      currentDate.setMonth(currentDate.getMonth() + 1); // Move to the next month
      const currentMonth = currentDate.getMonth(); // Get the updated month index
      const currentYear = currentDate.getFullYear(); // Get the updated year
      const firstDayOfMonth = new Date(currentYear, currentMonth, 1); // Get the first day of the updated month
      document.querySelector(".calview").innerHTML =
        fetchEventsAndGenerateCalendarHTML(firstDayOfMonth, currentMonth);

      // Update the month select dropdown value to the updated month
      monthSelect.selectedIndex = currentMonth;
    });

    // Set the content of yearblock to the current year
    document.getElementById(
      "yearblock"
    ).textContent = `${currentDate.getFullYear()}`;
    let addEventForm = r_e("popupmodal");

    function rightMarginHTML(is_admin) {
      if (is_admin) {
        return `<div class="colormargins margin-right">
        <a href="#" class="add-btn2" id="eventbtn">Add Event</a>
        <div class="modal is-hidden" id="popupmodal">
          <div class = "modal-background" id= "popupbg"></div>
          <div class="modal-content section has-background-white">
          <h2 class="title">New Event</h2>
          <form id="cal_form_modal">
          <div class="field">
          <label class="label" >Name of Event</label>
          <div class="control">
            <input class="input" id = "evtname" type="text" placeholder="LinkedIn Workshop" />
          </div>
          </div>
          <div class="field">
          <label class="label">Date and Time of Event</label>
          <div class="control">
            <input
              class="input"
              id = "datetime"
              type="datetime-local"
              placeholder="12-01-22 01:22"
            />
          </div>
          </div>
          <div class="field">
          <label class="label">Choose Event Category</label>
          <div class="control">
            <div class="select">
              <select name="" id="evttype">
                <option>--select--</option>
                <option value="Philanthropy">Philanthropy</option>
                <option value="Professional Development">Professional Development</option>
                <option value="Speaker Event">Speaker Event</option>
                <option value="Social Event">Social Event</option>
              </select>
            </div>
          </div>
          </div>
          <div class="field">
          <label class="label">Points Assigned</label>
          <div class="control">
            <input class="input" id = "ptsassigned" type="number" placeholder="5" />
          </div>
          </div>
          <div class="field">
          <label class="label">Description of Event</label>
          <div class="control">
            <textarea
              cols="20"
              rows="12"
              id = "descriptionevt"
              placeholder="Dress Code: Business Casual
          Location: Grainger"
            ></textarea>
          </div>
          </div>
          <div class="field has-addons">
          <div class="control">
            <input id="codeInput" class="input" type="text" placeholder="Generate Code" />
          </div>
          <div class="control">
            <a id="generateButton" class="button btncolor">Go</a>
          </div>
          </div>
          <div class="field is-grouped">
          <div class="control">
            <button class="button" id = "addevtsbt">Submit</button>
          </div>
          <div class="control">
            <button class="button" id="addEventcncl">Cancel</button>
          </div>
          </div>
          </div>
        </form>
          </div></div>
  </div>`;
      } else {
        return `<div class="colormargins margin-right">
        <a href="#" class="add-btn2" id="ptbtn">View Points</a>
        </main>
    </div>`;
      }
    }

    if (auth.currentUser.email == "amauwmadison@gmail.com") {
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
      document
        .querySelectorAll(".modal-background, .modal-close")
        .forEach(function (el) {
          el.addEventListener("click", function () {
            addEventForm.classList.remove("is-active");
          });
        });
      const addevtsbt = r_e("addevtsbt");
      let evtname = r_e("evtname");
      let evttime = r_e("datetime");
      let evttype = r_e("evttype");
      let ptsassigned = r_e("ptsassigned");
      let descriptionevt = r_e("descriptionevt");

      // let season = month >= 1 && month <= 6 ? "SPRING" : "FALL";
      document
        .getElementById("generateButton")
        .addEventListener("click", () => {
          function generateRandomCode(length) {
            const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            let code = "";
            for (let i = 0; i < length; i++) {
              code += characters.charAt(
                Math.floor(Math.random() * characters.length)
              );
            }
            return code;
          }

          // Call the generateRandomCode function to get a random code
          const randomCode = generateRandomCode(8); // Generate an 8-character code (adjust length as needed)

          // Update the code input field with the generated code
          document.getElementById("codeInput").value = randomCode;
        });
      addevtsbt.addEventListener("click", (e) => {
        console.log("eventsbtnclicked");
        e.preventDefault();
        let name = evtname.value;
        let time = evttime.value;
        let month = new Date(time).getMonth() + 1;
        let evtyear = new Date(time).getFullYear();
        let season = month >= 1 && month <= 6 ? "SPRING" : "FALL";
        let type = evttype.value;
        let pts = ptsassigned.value;
        let desc = descriptionevt.value;
        let evtcode = document.querySelector("#codeInput").value;
        // let month = new Date(evttime).getMonth() + 1;
        // let evtyear = new Date(evttime).getFullYear();
        console.log(evtyear);
        let event = {
          name: name,
          time: time,
          type: type,
          pts: pts,
          desc: desc,
          semester: `${season} ${evtyear}`,
          code: evtcode,
        };
        db.collection("events")
          .add(event)
          .then(() => {
            alert("Event added to database");
            // Clear form fields after successful submission
            evtname.value = "";
            evttime.value = "";
            evttype.value = "";
            ptsassigned.value = "";
            descriptionevt.value = "";
            document.getElementById("codeInput").value = ""; // Clear generated code field
          })
          .catch((error) => console.error("Error adding event: ", error));
        addEventForm.classList.remove("is-active");
      });
    } else {
      r_e("ptbtn").addEventListener("click", () => {
        let check_auth = auth.currentUser;
        console.log("btn clicked");
        if (check_auth == null) {
          // User is not signed in
          alert("You must sign in to view the points page");
        } else {
          displayContentBasedOnEmail(check_auth.email);
        }
      });
    }

    function show_event_cards() {
      db.collection("events")
        .orderBy("time")
        .limit(4) // Limit to the first 4 closest events
        .get()
        .then((querySnapshot) => {
          let html = "";
          querySnapshot.forEach((doc) => {
            const event = doc.data();
            const eventId = doc.id;

            // Extracting date and time from the event
            const eventDate = new Date(event.time);
            const eventDateFormat = eventDate.toLocaleDateString("en-US", {
              month: "2-digit",
              day: "2-digit",
              year: "numeric",
            });
            const eventTimeFormat = eventDate.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            });

            html += `
              <div class="box margin-event">
                <h2>${event.name}</h2>
                <!-- "View Event Here" link -->
                <a href="#" class="view-event-link" data-event-id="${eventId}">View Event Here!</a>
              </div>
              <!-- Hidden modal for event details -->
              <div class="modal is-hidden" id="eventModal_${eventId}">
                <div class="modal-background"></div>
                <div class="modal-content">
                  <div class="box">
                    <h2>${event.name}</h2>
                    <p>Date: ${eventDateFormat}</p>
                    <p>Time: ${eventTimeFormat}</p>
                    <p>Description: ${event.desc}</p>
                    <p>Type: ${event.type}</p>
                    <!-- Add other details here -->
                    <button class="button" id="submit_points">Submit Points</button>
                    <button class="button" id="evtmodalcancel">Cancel</button>
                    <div class="modal is-hidden" id="attd_mod">
                      <div class="modal-background"></div>
                      <div class="modal-content section has-background-white">
                        <h2 class="title">Member Attendance Form</h2>
                        <form id="member_attend">
                          <div class="field">
                            <label class="label">Name of AMA Member</label>
                            <div class="control">
                              <input type="text" id="evtattd" placeholder="Bucky Badger" />
                            </div>
                          </div>
                          <div class="field">
                            <label class="label">Code Provided in Event</label>
                            <div class="control">
                              <input type="text" id="genevtcode" placeholder="877hs3" />
                            </div>
                          </div>
                          <div class="field is-grouped">
                            <div class="control">
                              <button class="button" id="addevtsbt">Submit</button>
                            </div>
                            <div class="control">
                              <button class="button" id="addEventcncl">Cancel</button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <button class="modal-close" aria-label="close"></button>
                </div>
              </div>
            `;
          });
          document.querySelector("#all_events").innerHTML = html;

          // Add event listeners to each "View Event Here" link
          document.querySelectorAll(".view-event-link").forEach((link) => {
            link.addEventListener("click", function (event) {
              event.preventDefault(); // Prevent default link behavior
              const eventId = this.getAttribute("data-event-id");
              // Show the corresponding hidden modal
              document
                .getElementById(`eventModal_${eventId}`)
                .classList.remove("is-hidden");
              document
                .getElementById(`eventModal_${eventId}`)
                .classList.add("is-active");
            });
          });

          // Add event listeners to close modals
          document
            .querySelectorAll(".modal-close, #evtmodalcancel")
            .forEach((element) => {
              element.addEventListener("click", function () {
                // Hide the modal when the close button is clicked
                const modalId = this.closest(".modal").id;
                document.getElementById(modalId).classList.add("is-hidden");
              });
            });
        })
        .catch((error) => {
          console.error("Error getting events: ", error);
        });
    }

    // Refresh the list of events
    show_event_cards(); // <-- Call the function to update the event list

    const viewEventLinks = document.querySelectorAll(".events-button");
    const eventCard = document.getElementById("eventCard");
    const closeEventCardBtn = document.getElementById("eventCard");

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
  }
});

// Function to fetch events from Firestore and generate calendar HTML

// Call the function to fetch events from Firestore and generate calendar HTML
fetchEventsAndGenerateCalendarHTML(currentDate);

document.querySelector(".eventsfooter").addEventListener("click", () => {
  r_e("calendarbtn").click();
});

// points page content
r_e("pointbtn").addEventListener("click", () => {
  let check_auth = auth.currentUser;
  console.log("btn clicked");
  if (check_auth == null) {
    // User is not signed in
    alert("You must sign in to view the points page");
  } else {
    displayContentBasedOnEmail(check_auth.email);
  }
});

function displayContentBasedOnEmail(email) {
  const adminEmail = "amauwmadison@gmail.com";

  if (email === adminEmail) {
    addContent(true);
  } else {
    addContent(false);
  }
}

function addContent(isAdmin) {
  if (isAdmin) {
    let points_content = `<div class="filter-container">
    <div class="filtername">
      <label for="nameSearch">Search by Name:</label>
      <input type="text" id="nameSearch" placeholder="Search name...">
    </div>
    <div class="filtersem">
      <label for="semesterFilter">Filter by Semester:</label>
      <select id="semesterFilter">
              <option value="SPRING 2024">SPRING 2024</option>
              <option value="FALL 2024">FALL 2024</option>
              <option value="SPRING 2025">SPRING 2025</option>
              <option value="FALL 2025">FALL 2025</option>
          </select>
      <!-- <label for="eventFilter">Filter by Event:</label>
      <select id="eventFilter">
          <option data-event="Total Points">All</option>
          <option data-event="Philanthropy Points">Philanthropy Points</option>
          <option data-event="Developement Points">Developement Points</option>
          <option data-event="Social Points">Social Points</option>
          <option data-event="Speaker Points">Speaker Points</option>
      </select> -->
    </div>
      <button id="applyFilters" class="redbtn pointbtn">Apply Filters</button>
      <button id="editbtn" class="bluebtn pointbtn">Edit Points</button>
  </div>   
  <div id="savecancelbtn" class="container editsavecancel is-hidden">
    <button id="editsave" class="bluebtn pointbtn">Save</button>
    <button id="editcancel" class="redbtn pointbtn">Cancel</button>
  </div>              
  <table class="table is-bordered is-striped is-hoverable">
      <thead>
        <tr>
          <th class="has-text-white">Member</th>
          <th class="has-text-white">Semester</th>
          <th class="has-text-white">Philanthropy Points</th>
          <th class="has-text-white">Development Points</th>
          <th class="has-text-white">Social Points</th>
          <th class="has-text-white">Speaker Points</th>
          <th class="has-text-white">Total Points</th>
      </tr>
      </thead>
      <tbody
  id="all_people"
  class="has-background-lightgray p-4 m-3 has-background-grey-lighter"
>
  <!-- Table rows will be dynamically added here -->
</tbody>
</table>`;
    appendContent(points_content);
    defineEditFunctions();
    attachEventListeners();
    fetchAndPopulatePoints();

    function fetchAndPopulatePoints(selectedSemester, searchQuery) {
      selectedSemester = selectedSemester || getCurrentSemester(); // Default to current semester if not provided
      db.collection("ama_users")
        .get()
        .then((userSnapshot) => {
          const rows = document.querySelectorAll("#all_people tr");

          // Create an object to store total points for each member
          const memberTotalPoints = {};

          // Iterate over each document in the user snapshot
          userSnapshot.forEach((userDoc) => {
            const fullName = userDoc.data().full_name;
            memberTotalPoints[fullName] = {
              philanthropy: 0,
              professional_development: 0,
              social: 0,
              speaker: 0,
            };
          });

          // Get member points from member_points collection
          db.collection("member_points")
            .get()
            .then((snapshot) => {
              // Iterate over each document in the member points snapshot
              snapshot.forEach((doc) => {
                const data = doc.data();
                const fullName = data.member;
                const eventType = data.eventType.toLowerCase();
                const eventPoints = parseInt(data.points) || 0;
                const pointSemester = data.pointSemester.toUpperCase();

                // Check if the member exists in the object and the points are for the selected semester
                if (
                  memberTotalPoints[fullName] &&
                  (selectedSemester === pointSemester ||
                    (selectedSemester === getCurrentSemester() &&
                      pointSemester === getCurrentSemester())) &&
                  // Check if the search query matches the member's name
                  (searchQuery
                    ? fullName.toLowerCase().includes(searchQuery)
                    : true)
                ) {
                  // Add points to the respective event type
                  memberTotalPoints[fullName][eventType] += eventPoints;
                }
              });

              // Pass selected semester to updateTableWithData function
              // Pass the searchQuery to the updateTableWithData function
              updateTableWithData(
                memberTotalPoints,
                selectedSemester,
                searchQuery
              );
            })
            .catch((error) => {
              console.error("Error getting member points documents: ", error);
            });
        })
        .catch((error) => {
          console.error("Error getting users documents: ", error);
        });
    }

    // Call the function to fetch and populate points when the page loads
    window.onload = function () {
      fetchAndPopulatePoints();
    };

    document
      .getElementById("applyFilters")
      .addEventListener("click", function () {
        // Get the filter values
        const nameSearchValue = document
          .getElementById("nameSearch")
          .value.trim()
          .toLowerCase();
        const semesterFilterValue = document
          .getElementById("semesterFilter")
          .value.toUpperCase();

        // Call fetchAndPopulatePoints with the selected semester and search query
        fetchAndPopulatePoints(semesterFilterValue, nameSearchValue);
      });
  } else {
    let points_content = `<div class="columns is-centered mt-4">
    <div class="column pr-outer">
        <div class="card px-4 py-3 has-text-centered" event-type="philanthropy">
            <header class="card-header has-background-link-dark">
                <p class="card-header-title has-text-white is-centered">Philanthropy</p>
            </header>
            <div class="card-content">
                <div class="content">
                    
                </div>
            </div>
        </div>
    </div>
    <div class="column">
        <div class="card px-4 py-3 has-text-centered" event-type="professional_development">
            <header class="card-header has-background-link-dark">
                <p class="card-header-title has-text-white is-centered">Professional Development</p>
            </header>
            <div class="card-content">
                <div class="content">
                    
                </div>
            </div>
        </div>
    </div>
    <div class="column">
        <div class="card px-4 py-3 has-text-centered" event-type="social">
            <header class="card-header has-background-link-dark">
                <p class="card-header-title has-text-white is-centered">Social</p>
            </header>
            <div class="card-content">
                <div class="content">
                    
                </div>
            </div>
        </div>
    </div>
    <div class="column pl-outer">
        <div class="card px-4 py-3 has-text-centered" event-type="speaker">
            <header class="card-header has-background-link-dark">
                <p class="card-header-title has-text-white is-centered">Speaker</p>
            </header>
            <div class="card-content">
                <div class="content">
                    
                </div>
            </div>
        </div>
    </div>
</div>
<div class="columns is-centered mt-4">
    <div class="column is-half">
        <div class="card px-4 py-3 has-text-centered" event-type="total">
            <header class="card-header has-background-link-dark">
                <p class="card-header-title has-text-white is-centered">Total Points</p>
            </header>
            <div class="card-content">
                <div class="content">
                    
                </div>
            </div>
        </div>
    </div>
</div>`;
    appendContent(points_content);
    let memberTotalPoints = {};
    PopulatePoints();
    updateCardsWithPoints(memberTotalPoints);
  }
}
function getCurrentSemester() {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth(); // Month is zero-based

  // Determine the semester based on the current month
  let currentSemester;
  if (currentMonth >= 0 && currentMonth <= 5) {
    currentSemester = "SPRING " + currentDate.getFullYear();
  } else {
    currentSemester = "FALL " + currentDate.getFullYear();
  }

  return currentSemester.toUpperCase();
}

function updateTableWithData(memberTotalPoints, selectedSemester, searchQuery) {
  const tableBody = document.getElementById("all_people");
  tableBody.innerHTML = ""; // Clear existing table rows

  // Iterate over each member and populate the table
  for (const fullName in memberTotalPoints) {
    const totalPoints = memberTotalPoints[fullName];

    // Check if the member's name matches the search query
    if (searchQuery && !fullName.toLowerCase().includes(searchQuery)) {
      continue; // Skip this member if it doesn't match the search query
    }

    // Create a new row for the member
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td>${fullName}</td>
      <td>${selectedSemester}</td>
      <td>${totalPoints.philanthropy}</td>
      <td>${totalPoints.professional_development}</td>
      <td>${totalPoints.social}</td>
      <td>${totalPoints.speaker}</td>
      <td>${
        totalPoints.philanthropy +
        totalPoints.professional_development +
        totalPoints.social +
        totalPoints.speaker
      }</td>
  `;

    // Append the row to the table
    tableBody.appendChild(newRow);
  }
  function calculateTotalPoints() {
    const rows = document.querySelectorAll("#all_people tr");
    rows.forEach((row) => {
      let totalPoints = 0;
      for (let i = 2; i < row.cells.length - 1; i++) {
        totalPoints += parseInt(row.cells[i].textContent) || 0;
      }
      row.cells[row.cells.length - 1].textContent = totalPoints;
    });
  }
  calculateTotalPoints(); // Calculate total points after populating individual points
}

function defineEditFunctions() {
  console.log("Defining edit functions");

  function showsavecancel() {
    console.log("Executing showsavecancel");
    editpointsmode(true);
    document.getElementById("savecancelbtn").classList.remove("is-hidden");
    document.getElementById("savecancelbtn").classList.add("is-active");
    document.getElementById("editbtn").classList.add("is-hidden");
  }

  function canceledit() {
    console.log("Executing canceledit");
    document.getElementById("savecancelbtn").classList.add("is-hidden");
    document.getElementById("savecancelbtn").classList.remove("is-active");
    document.getElementById("editbtn").classList.remove("is-hidden");
    editpointsmode(false);
  }

  function saveedit() {
    console.log("Executing saveedit");
    document.getElementById("savecancelbtn").classList.add("is-hidden");
    document.getElementById("editbtn").classList.remove("is-hidden");
    editpointsmode(false);
  }

  // Define these functions in the global scope if they need to be accessible elsewhere
  window.showsavecancel = showsavecancel;
  window.canceledit = canceledit;
  window.saveedit = saveedit;

  // Move the attachment of event listeners here to ensure they are defined first
  document.getElementById("editbtn").addEventListener("click", showsavecancel);
  document.getElementById("editsave").addEventListener("click", saveedit);
  document.getElementById("editcancel").addEventListener("click", canceledit);

  // Call attachEventListeners here if it needs to use these functions
  attachEventListeners();
}

document.addEventListener("DOMContentLoaded", function () {
  defineEditFunctions(); // This now also handles attaching event listeners
});

function attachEventListeners() {
  document.getElementById("editbtn").addEventListener("click", showsavecancel);
  document.getElementById("editsave").addEventListener("click", saveedit);
  document.getElementById("editcancel").addEventListener("click", canceledit);
}

const eventsCollectionRef = db.collection("events"); // Replace "events" with the actual name of your events collection
const formResponsesCollectionRef = db.collection("form_responses"); // Replace "form_responses" with the actual name of your form responses collection
const mergedCollectionRef = db.collection("member_points"); // Replace "merged_data" with the actual name of your merged data collection

//Need to fix so that the function can take form_responses.attended_members as an array

async function mergeDataAndDeleteDuplicates() {
  try {
    const eventsSnapshot = await eventsCollectionRef.get();
    const formResponsesSnapshot = await formResponsesCollectionRef.get();
    const mergedDocsSnapshot = await mergedCollectionRef.get();

    const formResponsesData = {};
    formResponsesSnapshot.forEach((doc) => {
      const formData = doc.data();
      formResponsesData[formData.code] = formData;
    });

    const existingKeys = new Set();
    const batch = firebase.firestore().batch();

    eventsSnapshot.forEach((eventsDoc) => {
      const eventData = eventsDoc.data();
      const eventCode = eventData.code;

      if (formResponsesData[eventCode]) {
        const formResponseData = formResponsesData[eventCode];
        const key = `${eventCode}_${formResponseData.attended_members}`;

        if (!existingKeys.has(key)) {
          existingKeys.add(key);
          const mergedData = {
            code: eventCode,
            eventType: eventData.type,
            points: eventData.pts,
            pointSemester: eventData.semester,
            member: formResponseData.attended_members,
            key: key,
          };
          batch.set(mergedCollectionRef.doc(key), mergedData);
        }
      }
    });

    await batch.commit();

    const uniqueKeys = new Set();
    const deleteBatch = firebase.firestore().batch();

    mergedDocsSnapshot.forEach((doc) => {
      const key = doc.data().key;
      if (uniqueKeys.has(key)) {
        deleteBatch.delete(doc.ref);
      } else {
        uniqueKeys.add(key);
      }
    });

    await deleteBatch.commit();

    console.log("Operation completed successfully.");
  } catch (error) {
    console.error("Operation failed: ", error);
  }
}

// Execute the function to merge data and delete duplicates
mergeDataAndDeleteDuplicates();
function PopulatePoints() {
  db.collection("ama_users")
    .get()
    .then((userSnapshot) => {
      // Initialize an object to store total points per user, by event type
      const memberTotalPoints = {};

      // Iterate over each user document
      userSnapshot.forEach((userDoc) => {
        const fullName = userDoc.data().full_name;
        memberTotalPoints[fullName] = {
          philanthropy: 0,
          professional_development: 0,
          social: 0,
          speaker: 0,
          total: 0,
        };
      });

      // Fetch member points
      db.collection("member_points")
        .get()
        .then((snapshot) => {
          // Process each point document
          snapshot.forEach((doc) => {
            const data = doc.data();
            const fullName = auth.currentUser.full_name; // Assuming member name stored here
            const eventType = data.eventType.toLowerCase().replace(/\s+/g, "_"); // Format to match key names in the object
            const eventPoints = parseInt(data.points) || 0;

            // Accumulate points if user is found
            if (
              memberTotalPoints[fullName] &&
              memberTotalPoints[fullName][eventType] !== undefined
            ) {
              memberTotalPoints[fullName][eventType] += eventPoints;
            }
          });

          updateCardsWithPoints(memberTotalPoints);
        })
        .catch((error) => {
          console.error("Error getting member points documents: ", error);
        });
    })
    .catch((error) => {
      console.error("Error getting users documents: ", error);
    });
}

function updateCardsWithPoints(memberTotalPoints) {
  console.log(
    "Updating cards with the following points data:",
    memberTotalPoints
  );

  Object.keys(memberTotalPoints).forEach((fullName) => {
    const points = memberTotalPoints[fullName];
    for (const eventType in points) {
      const selector = `.card[event-type="${eventType}"] .content`;
      const contentDiv = document.querySelector(selector);
      if (contentDiv) {
        contentDiv.textContent = `${points[eventType]}`; // Ensure string format
        // console.log(`Updated ${eventType} points to ${points[eventType]}`);
      } else {
        console.log(`No element found for selector: ${selector}`);
      }
    }
  });
}

document.querySelector(".pointfooter").addEventListener("click", () => {
  r_e("pointbtn").click();
});

// contact page content
let contact_content = `<div id="contactSectionTop" class="contactSection-box contactTopFormat">
<h2 class="primaryheader">Let's get in touch.</h2>


<div class="social-icons-container">
  <a
    href="mailto:amauwmadison@gmail.com"
    class="social-icon"
    title="Email"
  >
    <i class="fas fa-envelope fa-2x"></i>
  </a>
  <a
    href="https://www.instagram.com/amabadgers/"
    class="social-icon"
    title="Instagram"
  >
    <i class="fab fa-instagram fa-2x"></i>
  </a>
  <a
    href="https://www.linkedin.com/in/ama-badgers-5247a9252/"
    class="social-icon"
    title="LinkedIn"
  >
    <i class="fab fa-linkedin fa-2x"></i>
  </a>
  <a
    href="https://www.tiktok.com/@ama.badgers"
    class="social-icon"
    title="TikTok"
  >
    <i class="fab fa-tiktok fa-2x"></i>
  </a>
</div>
</div>

<div id="contactFormSection" class="contactFormSection">
<div class="contactFormText">
  <h3 class="secondaryheader">Interested in AMA?</h3>
  <h4 class="tertiaryHeader">
Please fill out this contact form or you can reach us us at
<a href="mailto:amauwmadison@gmail.com"> amauwmadison@gmail.com</a> </h4> 
</div>
<div class="contactForm-flex">
  <form action="https://api.web3forms.com/submit" method="POST">
    <input
      type="hidden"
      name="access_key"
      value="a4172b4c-7ec1-4f25-824e-9653e33b2437"
      class="contact-form"
      data-reveal="right"
    />
    <div class="field is-horizontal">
      <div class="input-wrapper">
        <input
          id="name"
          type="text"
          name="name"
          placeholder="First and Last Name *"
          required
          class="input-field"
        />
      </div>
      <div class="input-wrapper">
        <input
          id="name"
          type="email"
          name="email_address"
          placeholder="Email *"
          required
          class="input-field"
        />
      </div>
    </div>

    <textarea
      id="message"
      name="message"
      placeholder="Message *"
      required
      class="input-field"
    ></textarea>

    <button type="submit" class="contactBtn" id="submit">
      Send Message
    </button>
  </form>
</div>
</div>`;
r_e("contact-link").addEventListener("click", () => {
  appendContent(contact_content);
  let check_auth = auth.currentUser;
  if (check_auth == null) {
    signup_modal.classList.add("is-active");
  }
  if (check_auth != null) {
    appendContent(contact_content);
  }
});

document.querySelector(".contactfooter").addEventListener("click", () => {
  r_e("contact-link").click();
});
document.querySelector(".sponsorfooter").addEventListener("click", () => {
  r_e("contact-link").click();
});

//join button
r_e("joinbuttonhome").addEventListener("click", () => {
  appendContent(contact_content);
  console.log("learnbuttonclicked");
});
let blog_content = ` <main>
<div class="blogpage">
  <div id="blogSection" class="blogSection-box">
    <h2 class="primaryheader">Blog</h2>
    <p class="primaryBody">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum at
      magni porro voluptatibus, quasi doloribus provident officiis, illo
      hic laborum distinctio mollitia quis minima ducimus.
    </p>
    <button id="addPostButton" class="addPostBtn">Add a post</button>
  </div>

  <div id="addPostForm" class="modal">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="box">
        <h1
          id="addPostTitle"
          class="card-header-title is-centered is-large is-size-4"
        >
          Add a Blog Post
        </h1>
        <div class="field">
          <label class="label">Title</label>
          <div class="control">
            <input class="input" type="text" id="title" />
          </div>
        </div>
        <div class="field">
          <label class="label">Message</label>
          <div class="control">
            <textarea class="textarea" id="message"></textarea>
          </div>
        </div>
        <div class="field">
          <label class="label">Author</label>
          <div class="control">
            <input class="input" type="text" id="author" />
          </div>
        </div>
        <div class="field">
          <label class="label">Date</label>
          <div class="control">
            <input class="input" type="date" id="date" />
          </div>
        </div>
        <button id="submitPost" class="button">Submit</button>
      </div>
    </div>
    <button class="modal-close is-large" aria-label="close"></button>
  </div>

  <!-- all posts from the database -->
  <div
    id="all_posts"
    class="has-background-lightgray p-4 m-3 has-background-grey-lighter"
  >
    <h1 class="title">All posts</h1>
  </div>
</div>
</main>`;

// Blog page content

document.querySelector(".blogfooter").addEventListener("click", () => {
  r_e("blog-link").click();
});

// Blog page content
r_e("blog-link").addEventListener("click", () => {
  appendContent(blog_content);

  // Wait for the content to be appended to the DOM
  setTimeout(() => {
    // Get the modal
    var modal = document.getElementById("addPostForm");

    // Get the button that opens the modal
    var btn = document.getElementById("addPostButton");

    // Get the <span> element that closes the modal
    var span = modal.querySelector(".modal-close");

    // When the user clicks the button, open the modal
    btn.onclick = function () {
      modal.classList.add("is-active");
    };

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
      modal.classList.remove("is-active");
    };

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.classList.remove("is-active");
      }
    };

    // Handle form submission
    document.querySelector("#submitPost").addEventListener("click", () => {
      // construct the post object
      let post = {
        title: document.querySelector("#title").value,
        message: document.querySelector("#message").value,
        author: document.querySelector("#author").value,
        date: document.querySelector("#date").value,
      };

      // store the post object into the Firestore collection "allPosts"
      db.collection("allPosts")
        .add(post)
        .then(() => {
          alert("Post added");
          modal.classList.remove("is-active"); // Hide the modal after successful submission
        })
        .catch((error) => {
          console.error("Error adding post: ", error);
        });
    });

    // Function to show all posts
    function show_posts() {
      db.collection("allPosts")
        .get()
        .then((querySnapshot) => {
          let html = "";
          querySnapshot.forEach((doc) => {
            const post = doc.data();
            const postId = doc.id;
            html += `
                    <div class="container my-4">
                      <div class="card" id="${postId}">
                        <header class="card-header">
                          <p class="card-header-title">${post.title}</p>
                        </header>
                        <div class="card-content">
                          <div class="content">
                            ${post.message}
                            <br><br>
                            <p class="card-header-subtitle"><span style="font-size: smaller; font-weight: bold;">By: ${post.author} // <time datetime="${post.date}">${post.date}</time></span></p>
                          </div>
                        </div>
                        <footer class="card-footer">
                          <a href="#" class="card-footer-item" onclick="editPost('${postId}')">Edit</a>
                          <a href="#" class="card-footer-item" onclick="deletePost('${postId}')">Delete</a>
                        </footer>
                      </div>
                    </div>`;
          });
          document.querySelector("#all_posts").innerHTML = html;
        })
        .catch((error) => {
          console.error("Error getting posts: ", error);
        });
    }

    // Function to delete a post
    function deletePost(postId) {
      if (confirm("Are you sure you want to delete this post?")) {
        db.collection("allPosts")
          .doc(postId)
          .delete()
          .then(() => {
            console.log("Post successfully deleted!");
            show_posts();
          })
          .catch((error) => {
            console.error("Error removing post: ", error);
          });
      }
    }

    // Function to edit a post
    function editPost(postId) {
      // Retrieve the post data from Firestore using the postId
      db.collection("allPosts")
        .doc(postId)
        .get()
        .then((doc) => {
          if (doc.exists) {
            const post = doc.data();
            // Populate the form fields with the retrieved post data
            document.querySelector("#title").value = post.title;
            document.querySelector("#message").value = post.message;
            document.querySelector("#author").value = post.author;
            document.querySelector("#date").value = post.date;

            // Display a form with input fields for editing
            const editForm = `
            <div class="box">
              <h2 class="card-header-title is-centered is-2 mt-0" style="font-size: larger;">Edit Post</h2>
<div class="field">
  <label class="label">Title</label>
  <div class="control">
    <input class="input" type="text" id="edit_title" value="${post.title}" />
  </div>
</div>
<div class="field">
  <label class="label">Message</label>
  <div class="control">
    <textarea class="textarea" type="text" id="edit_message" value="${post.message}"></textarea>

  </div>
</div>
<div class="field">
  <label class="label">Author</label>
  <div class="control">
    <input class="input" type="text" id="edit_author" value="${post.author}" />
</div>
<div class="field">
  <label class="label">Date</label>
  <div class="control">
    <input class="input" type="date" id="edit_date" value="${post.date}" />
  </div>
</div>
<div class="field is-grouped">
  <div class="control">
    <button class="addPostBtn" onclick="saveEdit('${postId}')">Save</button>
  </div>
</div>
</div>

          `;
            document.querySelector(`#${postId}`).innerHTML = editForm;
          } else {
            console.log("No such document!");
          }
        })
        .catch((error) => {
          console.error("Error getting document:", error);
        });
    }

    // Function to save edited post
    function saveEdit(postId) {
      const editedPost = {
        title: document.querySelector("#edit_title").value,
        message: document.querySelector("#edit_message").value,
        author: document.querySelector("#edit_author").value,
        date: document.querySelector("#edit_date").value,
      };

      // Update the post in Firestore
      db.collection("allPosts")
        .doc(postId)
        .update(editedPost)
        .then(() => {
          console.log("Post successfully updated!");
          // Reload the posts after updating
          show_posts();
        })
        .catch((error) => {
          console.error("Error updating post:", error);
        });
    }

    // Call the function to display existing posts when the page loads
    show_posts();
  }, 0);

  let check_auth = auth.currentUser;
  if (check_auth == null) {
    signup_modal.classList.add("is-active");
  }
  if (check_auth != null) {
    appendContent(blog_content);
  }
});
r_e("blog-link").addEventListener("click", () => {
  r_e("addPostButton").classList.add("is-hidden");

  //check user
  auth.onAuthStateChanged((user) => {
    if (user) {
      // User is logged in
      console.log("User email:", user.email);

      // Check if the user's email matches
      if (user.email === "gracevanzeeland@gmail.com") {
        r_e("addPostButton").classList.remove("is-hidden");
      } else {
      }
    } else {
      // User is not logged in
      console.log("User not logged in");
    }
  });
});
let test = r_e("");

// Get the modal
let modal = document.getElementById("#addPostForm");

// Get the button that opens the modal
let btn = document.getElementById("addPostButton");

// Get the <span> element that closes the modal
let span = modal.querySelector(".modal-close");

// When the user clicks the button, open the modal
btn.onclick = function () {
  modal.classList.add("is-active");
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.classList.remove("is-active");
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.classList.remove("is-active");
  }
};

// Handle form submission
document.querySelector("#submitPost").addEventListener("click", () => {
  // construct the post object
  let post = {
    title: document.querySelector("#title").value,
    message: document.querySelector("#message").value,
    author: document.querySelector("#author").value,
    date: document.querySelector("#date").value,
  };

  // store the post object into the Firestore collection "allPosts"
  db.collection("allPosts")
    .add(post)
    .then(() => {
      alert("Post added");
      modal.classList.remove("is-active"); // Hide the modal after successful submission
    })
    .catch((error) => {
      console.error("Error adding post: ", error);
    });
});

// Function to show all posts
function show_posts() {
  db.collection("allPosts")
    .get()
    .then((querySnapshot) => {
      let html = "";
      querySnapshot.forEach((doc) => {
        const post = doc.data();
        const postId = doc.id;
        html += `
                    <div class="container my-4">
                      <div class="card" id="${postId}">
                        <header class="card-header">
                          <p class="card-header-title">${post.title}</p>
                        </header>
                        <div class="card-content">
                          <div class="content">
                            ${post.message}
                            <br><br>
                            <p class="card-header-subtitle"><span style="font-size: smaller; font-weight: bold;">By: ${post.author} // <time datetime="${post.date}">${post.date}</time></span></p>
                          </div>
                        </div>
                        <footer class="card-footer">
                          <a href="#" class="card-footer-item" onclick="editPost('${postId}')">Edit</a>
                          <a href="#" class="card-footer-item" onclick="deletePost('${postId}')">Delete</a>
                        </footer>
                      </div>
                    </div>`;
      });
      document.querySelector("#all_posts").innerHTML = html;
    })
    .catch((error) => {
      console.error("Error getting posts: ", error);
    });
}

// Function to delete a post
function deletePost(postId) {
  if (confirm("Are you sure you want to delete this post?")) {
    db.collection("allPosts")
      .doc(postId)
      .delete()
      .then(() => {
        console.log("Post successfully deleted!");
        show_posts();
      })
      .catch((error) => {
        console.error("Error removing post: ", error);
      });
  }
}

// Function to edit a post
function editPost(postId) {
  // Retrieve the post data from Firestore using the postId
  db.collection("allPosts")
    .doc(postId)
    .get()
    .then((doc) => {
      if (doc.exists) {
        const post = doc.data();
        // Populate the form fields with the retrieved post data
        document.querySelector("#title").value = post.title;
        document.querySelector("#message").value = post.message;
        document.querySelector("#author").value = post.author;
        document.querySelector("#date").value = post.date;

        // Display a form with input fields for editing
        const editForm = `
            <div class="box">
              <h2 class="card-header-title is-centered is-2 mt-0" style="font-size: larger;">Edit Post</h2>
<div class="field">
  <label class="label">Title</label>
  <div class="control">
    <input class="input" type="text" id="edit_title" value="${post.title}" />
  </div>
</div>
<div class="field">
  <label class="label">Message</label>
  <div class="control">
    <textarea class="textarea" type="text" id="edit_message" value="${post.message}"></textarea>

  </div>
</div>
<div class="field">
  <label class="label">Author</label>
  <div class="control">
    <input class="input" type="text" id="edit_author" value="${post.author}" />
</div>
<div class="field">
  <label class="label">Date</label>
  <div class="control">
    <input class="input" type="date" id="edit_date" value="${post.date}" />
  </div>
</div>
<div class="field is-grouped">
  <div class="control">
    <button class="addPostBtn" onclick="saveEdit('${postId}')">Save</button>
  </div>
</div>
</div>

          `;
        document.querySelector(`#${postId}`).innerHTML = editForm;
      } else {
        console.log("No such document!");
      }
    })
    .catch((error) => {
      console.error("Error getting document:", error);
    });
}

// Function to save edited post
function saveEdit(postId) {
  const editedPost = {
    title: document.querySelector("#edit_title").value,
    message: document.querySelector("#edit_message").value,
    author: document.querySelector("#edit_author").value,
    date: document.querySelector("#edit_date").value,
  };

  // Update the post in Firestore
  db.collection("allPosts")
    .doc(postId)
    .update(editedPost)
    .then(() => {
      console.log("Post successfully updated!");
      // Reload the posts after updating
      show_posts();
    })
    .catch((error) => {
      console.error("Error updating post:", error);
    });
}

//
// Call the function to display existing posts when the page loads
show_posts();

// expand burger
let burger_stack = documentquerySelector("#burger_stack");
let burger_menu = document.q.uerySelector("#burger_menu");
let home_burger = document.querySelector("#home-link");
let about_burger = document.querySelector("#abt-link");
let members_burger = document.querySelector("#members-link");
let blog_burger = document.querySelector("#blog-link");
let contact_burger = document.querySelector("#contact-link");
function expand_burger() {
  burger_menu.classList.toggle("is-active");
  burger_menu.classList.toggle("has-background-light");
  burger_stack.classList.toggle("is-active");
  home_burger.classList.toggle("has-text-light");
  about_burger.classList.toggle("has-text-light");
  members_burger.classList.toggle("has-text-light");
  blog_burger.classList.toggle("has-text-light");
  contact_burger.classList.toggle("has-text-light");
}
burger_stack.addEventListener("click", expand_burger);

// console.log(firebase);
// let r1 = {
//   ID: "a123",
//   name: "nonna kitchen",
//   loc_code: 13,
//   style: ["american", "chinese", "italian"],
// };

// r2 is a document in the restaurants collection
// let r2 = {
//   ID: "b789",
//   name: "johns burger",
//   loc_code: 20,
//   style: ["italian"],
//   noise_level: "low",
// };

// db.collection("restaurants").add(r2);

// db.collection("restaurants").doc("abc1234").set(r2);

// store info from form into db

// create a click event hander on the submit button

document.querySelector("#submit").addEventListener("click", () => {
  // store the selected hobbies in an array

  let user_hobbies = [];
  let hobbies = document.querySelectorAll(".hobbies");
  // console.log(hobbies);

  hobbies.forEach((h) => {
    if (h.checked == true) {
      user_hobbies.push(h.value);
    }
  });

  // console.log(user_hobbies);

  // construct the person object
  let person = {
    name: document.querySelector("#name").value,
    age: parseInt(document.querySelector("#age").value),
    color: document.querySelector("#favcolor").value,
    hobbies: user_hobbies,
  };

  //   store the person obj into the people collection

  db.collection("people")
    .add(person)
    .then(() => alert("person added"));
});

// update sally's age and fav color and add madison as her fav city
// db.collection("people").doc("0ZysVBXcqVY9LFCB2ETx").update({
//   age: 24,
//   color: "white",
//   city: "madison",
// });

// add pete and jackie as sally's siblings
// db.collection("people")
//   .doc("0ZysVBXcqVY9LFCB2ETx")
//   .update({
//     siblings: ["pete", "jackie"],
//   });

// add tom as a new sibling for sally

// db.collection("people")
//   .doc("0ZysVBXcqVY9LFCB2ETx")
//   .update({
//     siblings: firebase.firestore.FieldValue.arrayUnion("tom"),
//   });

// remove pete from sally's siblings

// db.collection("people")
//   .doc("0ZysVBXcqVY9LFCB2ETx")
//   .update({
//     siblings: firebase.firestore.FieldValue.arrayRemove("pete"),
//   });

// show the list of all people stored in the db

function show_people() {
  db.collection("people")
    .get()
    .then((res) => {
      let data = res.docs;

      let html = ``;
      data.forEach((d) => {
        html += `<p>${d.data().name}</p>`;
      });

      // append the html variable to the document
      document.querySelector("#all_people").innerHTML += html;
    });
}
// call the show_people function

// show_people();

// show all people whose age is greater than 25 and less than 43

// db.collection("people")
//   .where("age", ">", 25)
//   .where("age", "<", 43)
//   .get()
//   .then((res) => {
//     let data = res.docs;

//     let html = ``;
//     data.forEach((d) => {
//       html += `<p>${d.data().name}</p>`;
//     });

//     // append the html variable to the document
//     document.querySelector("#all_people").innerHTML += html;
//   });

// show all people who have the name sally

// db.collection("people")
//   .where("name", "==", "sally")
//   .get()
//   .then((res) => {
//     let data = res.docs;

//     let html = ``;
//     data.forEach((d) => {
//       html += `<p>${d.data().name}</p>`;
//     });

//     // append the html variable to the document
//     document.querySelector("#all_people").innerHTML += html;
//   });

// show all people who have the name sally or pete

// db.collection("people")
//   .where("name", "in", ["sally", "Sally", "Pete", "pete"])
//   .get()
//   .then((res) => {
//     let data = res.docs;

//     let html = ``;
//     data.forEach((d) => {
//       html += `<p>${d.data().name}</p>`;
//     });

//     // append the html variable to the document
//     document.querySelector("#all_people").innerHTML += html;
//   });

// show all people who have swimming as a hobby
// db.collection("people")
//   .where("hobbies", "array-contains", "swimming")
//   .get()
//   .then((res) => {
//     let data = res.docs;

//     let html = ``;
//     data.forEach((d) => {
//       html += `<p>${d.data().name}</p>`;
//     });

//     // append the html variable to the document
//     document.querySelector("#all_people").innerHTML += html;
//   });

//  show all people who have swimming or reading as a hobby

// db.collection("people")
//   .where("hobbies", "array-contains-any", ["swimming", "reading"])
//   .get()
//   .then((res) => {
//     let data = res.docs;

//     let html = ``;
//     data.forEach((d) => {
//       html += `<p>${d.data().name}</p>`;
//     });

//     // append the html variable to the document
//     document.querySelector("#all_people").innerHTML += html;
//   });

// show all people with a name sally and age greater than 35

db.collection("people")
  .where("name", "==", "sally")
  .where("age", ">", 35)
  .get()
  .then((res) => {
    let data = res.docs;

    let html = ``;
    data.forEach((d) => {
      html += `<p>${d.data().name}</p>`;
    });

    // append the html variable to the document
    document.querySelector("#all_people").innerHTML += html;
  });
