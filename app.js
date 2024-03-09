const calendarView = document.querySelector(".calview");
const monthSelect = document.getElementById("month-select");
const prevMonthBtn = document.querySelector(".action_left");
const nextMonthBtn = document.querySelector(".action_right button");
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

let currentDate = new Date();

function generateCalendar(date) {
  // this is where we set the cal grid
  const totalDays = 42;
  calendarView.innerHTML = "";
  let currentYear = date.getFullYear();
  let currentMonth = date.getMonth();
  let firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  let daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  let dayCellsGenerated = 0;

  let calendarHtml = '<div class="weekview">';

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
