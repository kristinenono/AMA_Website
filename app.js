//Class selector function//

function r_e(classname) {
  return document.querySelector(`#${id}`);
}

function appendContent(html) {
  r_e("main").innerHTML = html;
}

r_e("").addEventListener("click", () => {
  // override existing content
  let html = "<h1> test test test </h1>";
  html += "<h3> test test </h3>";
  html += "<p> test test <p>";
  r_e("main").innerHTML = "<h1> About Link Clicked </h1>";
});

let cal_page = `<main>
<div class="wrapper">
  <!-- LEFT MARGIN -->
  <div class="colormargins margin-left">
    <h2 class="heading-tag-upcoming-event">Upcoming Events</h2>
    <div class="flex-container">
      <div class="box margin-event">
        <h2>Philathropy event</h2>

        <a href="#" class="events-button">View Event Here! </a>
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
  <!-- CENTER OF PAGE where calendar goes-->

  <div class="colormargins page-content">
    <div class="navcal">
      <span>
        <button class="today">Today</button>
        <button class="action_left">
          <i class="fa-solid fa-chevron-left"></i>
        </button>
      </span>
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
      <span class="action_right">
        <button><i class="fa-solid fa-chevron-right"></i></button>
      </span>
    </div>

    <div class="calview">
      <div class="weekview">
        <div class="weekdayview">
          <span>
            <br />
            <p class="dayofweek">Sun</p>
            <br />
          </span>
        </div>
        <div class="weekdayview">
          <span>
            <br />
            <p class="dayofweek">Mon</p>
            <br />
          </span>
        </div>
        <div class="weekdayview">
          <span>
            <br />
            <p class="dayofweek">Tue</p>
            <br />
          </span>
        </div>
        <div class="weekdayview">
          <span>
            <br />
            <p class="dayofweek">Wed</p>
            <br />
          </span>
        </div>
        <div class="weekdayview">
          <div class="weekdayview">
            <span>
              <br />
              <p class="dayofweek">Thu</p>
              <br />
            </span>
          </div>
        </div>
        <div class="weekdayview">
          <div class="weekdayview">
            <span>
              <br />
              <p class="dayofweek">Fri</p>
              <br />
            </span>
          </div>
        </div>
        <div class="weekdayview">
          <span>
            <br />
            <p class="dayofweek">Sat</p>
            <br />
          </span>
        </div>
        <!-- Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab,
        recusandae. -->
      </div>
      <div class="weekview">
        <div class="dayview">Lorem, ipsum.</div>
        <div class="dayview">Lorem, ipsum.</div>
        <div class="dayview">Lorem, ipsum.</div>
        <div class="dayview">Lorem, ipsum.</div>
        <div class="dayview">Lorem, ipsum.</div>
        <div class="dayview">Lorem, ipsum.</div>
        <div class="dayview">Lorem, ipsum.</div>
      </div>
      <div class="weekview">
        <div class="dayview">Lorem, ipsum.</div>
        <div class="dayview">Lorem, ipsum.</div>
        <div class="dayview">Lorem, ipsum.</div>
        <div class="dayview">Lorem, ipsum.</div>
        <div class="dayview">Lorem, ipsum.</div>
        <div class="dayview">Lorem, ipsum.</div>
        <div class="dayview">Lorem, ipsum.</div>
      </div>
      <div class="weekview">
        <div class="dayview">Lorem, ipsum.</div>
        <div class="dayview">Lorem, ipsum.</div>
        <div class="dayview">Lorem, ipsum.</div>
        <div class="dayview">Lorem, ipsum.</div>
        <div class="dayview">Lorem, ipsum.</div>
        <div class="dayview">Lorem, ipsum.</div>
        <div class="dayview">Lorem, ipsum.</div>
      </div>
      <div class="weekview">
        <div class="dayview">Lorem, ipsum.</div>
        <div class="dayview">Lorem, ipsum.</div>
        <div class="dayview">Lorem, ipsum.</div>
        <div class="dayview">Lorem, ipsum.</div>
        <div class="dayview">Lorem, ipsum.</div>
        <div class="dayview">Lorem, ipsum.</div>
        <div class="dayview">Lorem, ipsum.</div>
      </div>
      <div class="weekview">
        <div class="dayview">Lorem, ipsum.</div>
        <div class="dayview">Lorem, ipsum.</div>
        <div class="dayview">Lorem, ipsum.</div>
        <div class="dayview">Lorem, ipsum.</div>
        <div class="dayview">Lorem, ipsum.</div>
        <div class="dayview">Lorem, ipsum.</div>
        <div class="dayview">Lorem, ipsum.</div>
      </div>
    </div>
  </div>
  <!-- RIGHT MARGIN -->
  <div class="colormargins margin-right">
    <a href="cal_form.html" class="add-btn">Add Event</a>
    <!-- <button class="add-btn">Add Event</button> -->
  </div>
</div>
</main>`;

console.log(appendContent(cal_page));
