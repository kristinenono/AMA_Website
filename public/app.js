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
    r_e("signupbtn").classList.add("is-hidden");
    r_e("loginbtn").classList.add("is-hidden");
    if (r_e("joinbuttonhome") != null) {
      r_e("joinbuttonhome").classList.add("is-hidden");
    }
  } else {
    r_e("indicator").innerHTML = "";
    r_e("signout_button").classList.add("is-hidden");
    r_e("indicator").classList.add("is-hidden");
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

let home_page_content = `<div class="titleContainers">
<div class="column column1">
    <h1 class="title has-text-light">Welcome to <br />AMA UW-Madison</h1>
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
            <button class="involvementButton2" id="joinbuttonhome"><b>JOIN</b></button>
        </p>
    </div>
</div>
<div class="involvementImage-flex">
    <img src="images/Bucks_event.png" alt="AMA Event" width="100%" height="Auto" />
</div>
</div>`;

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
//           <h1 class="title has-text-light">Welcome to <br />AMA UW-Madison</h1>
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
});

let abt_content = `<div> TESTING </div>`;

//about page
r_e("abt-link").addEventListener("click", () => {
  appendContent(abt_content);
});

// Cal page content
r_e("calendarbtn").addEventListener("click", () => {
  configure_message_bar("must sign in to view");
  let check_auth = auth.currentUser;
  if (check_auth == null) {
    signup_modal.classList.add("is-active");
  }
  if (check_auth != null) {
    let cal_page_content = `
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
    cal_page_content += `<div class="colormargins margin-right">
<a href="#" class="add-btn2" id="eventbtn">Add Event</a>
</main>`;
    appendContent(cal_page_content);
  }
});

// points page content
r_e("pointbtn").addEventListener("click", () => {
  /*let check_auth = auth.currentUser;
  if (check_auth == null) {
    signup_modal.classList.add("is-active");
  }
  if (check_auth != null) { */
  let points_content = `<div class="columns is-centered">
  <div class="column is-four-fifths">
  <div>
    <div class="field is-grouped">
      <div class="control">
        <label for="nameSearch" class="label">Search by Name:</label>
        <input type="text" id="nameSearch" class="input" placeholder="Search name...">
      </div>
      <div class="control">
      <label for="semesterFilter" class="label">Filter by Semester:</label>
      <div class="select">
                  <select id="semesterFilter">
                      <option value="">All</option>
                      <option value="Fall 2023">Fall 2023</option>
                      <option value="Spring 2024">Spring 2024</option>
                      <option value="Fall 2024">Fall 2024</option>
                      <option value="Spring 2025">Spring 2025</option>
                  </select>
              </div>
          </div>
          <div class="control" style="margin-top: 1.5rem;">
            <button id="applyFilters" class="button is-primary is-fullwidth has-text-centered">Apply Filters</button>
          </div>
      </div>
  </div>
  <div class="table-container">
      <table class="table is-fullwidth is-striped is-hoverable">
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
          <tbody>
              <tr>
                  <td>John Doe</td>
                  <td>Spring 2024</td>
                  <td>3</td>
                  <td>1</td>
                  <td>2</td>
                  <td>1</td>
                  <td></td>
              </tr>
              <tr>
                  <td>Jane Smith</td>
                  <td>Spring 2024</td>
                  <td>2</td>
                  <td>1</td>
                  <td>2</td>
                  <td>1</td>
                  <td></td>
              </tr>
        <tr>
            <td>Michael Johnson</td>
            <td>Spring 2025</td>
            <td>1</td>
            <td>1</td>
            <td>2</td>
            <td>1</td>
            <td></td>
        </tr>
        <tr>
            <td>Emma Lee</td>
            <td>Spring 2024</td>
            <td>3</td>
            <td>12</td>
            <td>2</td>
            <td>1</td>
            <td></td>
        </tr>
        <tr>
            <td>Emma Lee</td>
            <td>Fall 2024</td>
            <td>3</td>
            <td>3</td>
            <td>2</td>
            <td>1</td>
            <td></td>
        </tr>
    </tbody>
</table>`;

  appendContent(points_content);

  // Function to calculate total points for each row initially and after filters are applied
  function calculateTotalPoints() {
    // Get all table rows
    const tableRows = document.querySelectorAll("tbody tr");

    // Loop through each table row
    tableRows.forEach((row) => {
      const eventColumns = row.cells.length;
      let totalPoints = 0;
      // Loop through columns containing points (columns 2 to 5)
      for (let i = 2; i < 6; i++) {
        totalPoints += parseInt(row.cells[i].textContent) || 0; // Parse the text content to integer
      }
      // Display the total points in the last cell of the row
      row.cells[eventColumns - 1].textContent = totalPoints;
    });
  }

  // Function to get the current semester based on the current date
  function getCurrentSemester() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth(); // Month is zero-based

    // Determine the semester based on the current month
    let currentSemester;
    if (currentMonth >= 0 && currentMonth <= 5) {
      currentSemester = "Spring " + currentDate.getFullYear();
    } else {
      currentSemester = "Fall " + currentDate.getFullYear();
    }

    return currentSemester;
  }

  // Set the current semester text when the page loads
  window.addEventListener("load", function () {
    // document.getElementById("current-semester").textContent = getCurrentSemester();
    document.getElementById("semesterFilter").value = getCurrentSemester();
    document.getElementById("applyFilters").click();
  });

  // Calculate total points when the page loads
  window.addEventListener("load", calculateTotalPoints);

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
        .value.toLowerCase();

      // Get all table rows
      const tableRows = document.querySelectorAll("tbody tr");

      // Loop through each table row
      tableRows.forEach((row) => {
        // Get the values of the cells in the current row
        const name = row.cells[0].textContent.toLowerCase();
        const semester = row.cells[1].textContent.toLowerCase();

        // Check if the row matches the filters
        const nameMatches = name.includes(nameSearchValue);
        const semesterMatches =
          semesterFilterValue === "" ||
          semester === semesterFilterValue ||
          semesterFilterValue === "all";

        // If the row matches the filters, display it; otherwise, hide it
        if (nameMatches && semesterMatches) {
          row.style.display = "";
        } else {
          row.style.display = "none";
        }

        // Calculate total points for each row
        let totalPoints = 0;
        for (let i = 2; i < row.cells.length - 1; i++) {
          totalPoints += parseInt(row.cells[i].textContent); // Parse the text content to integer
        }
        // Display the total points in the last cell of the row
        row.cells[row.cells.length - 1].textContent = totalPoints;
      });
    });
  //}
});

// contact page content
let contact_content = `<div id="contactSectionTop" class="contactSection-box contactTopFormat">
<h2 class="primaryheader">Let's get in touch.</h2>
<h3 class="tertiaryHeader">
  <a href="mailto:amauwmadison@gmail.com">amauwmadison@gmail.com</a>
</h3>

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
  <h3 class="secondaryheader">Have a question?</h3>
  <h4 class="tertiaryHeader">
    Contact us through this form and we'll get back to you shortly.
  </h4>
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

// Call the function to display existing posts when the page loads
show_posts();

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

// console.log(firebase);

document.querySelector("#addevtsbt").addEventListener("click", () => {
  alert("event added");
});
// const addevtsbt = r_e("addevtsbt");
// let evtname = r_e("evtname");
// let evttime = r_e("datetime");
// let evttype = r_e("evttype");
// let ptsassigned = r_e("ptsassigned");
// let descriptionevt = r_e("descriptionevt");

// addevtsbt.addEventListener("click", () => {
//   alert("event added");
//   // Uncomment the below lines if you're ready to use them for adding event details to the database
//   /*
//     let name = evtname.value;
//     let time = evttime.value;
//     let type = evttype.value;
//     let pts = ptsassigned.value;
//     let desc = descriptionevt.value;
//     let event = {
//         name: name,
//         time: time,
//         type: type,
//         pts: pts,
//         desc: desc,
//     };
//     db.collection("events")
//         .add(event)
//         .then(() => alert("Event added to database"))
//         .catch(error => console.error("Error adding event: ", error));
//     */
// });
// authentication

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
