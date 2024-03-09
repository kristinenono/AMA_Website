//Class selector function//

function r_e(id) {
  return document.querySelector(`#${id}`);
}

function appendContent(html) {
  r_e("sample").innerHTML += html;
}

// let eventbtn = ` <div class="form-content">
// <div class="modal is-active mainbackground">
//   <h2 class="title">New Event</h2>
//   <div class="field">
//     <label class="label">Name of Event</label>
//     <div class="control">
//       <input class="input" type="text" placeholder="LinkedIn Workshop" />
//     </div>
//   </div>
//   <div class="field">
//     <label class="label">Date and Time of Event</label>
//     <div class="control">
//       <input
//         class="input"
//         type="datetime-local"
//         placeholder="12-01-22 01:22"
//       />
//     </div>
//   </div>
//   <div class="field">
//     <label class="label">Choose Event Category</label>
//     <div class="control">
//       <div class="select">
//         <select name="" id="">
//           <option>--select--</option>
//           <option value="">Philanthropy</option>
//           <option value="">Professional Development</option>
//           <option value="">Speaker Event</option>
//           <option value="">Social Event</option>
//         </select>
//       </div>
//     </div>
//   </div>
//   <div class="field">
//     <label class="label">Points Assigned</label>
//     <div class="control">
//       <input class="input" type="number" placeholder="5" />
//     </div>
//   </div>
//   <div class="field">
//     <label class="label">Description of Event</label>
//     <div class="control">
//       <textarea
//         cols="20"
//         rows="12"
//         placeholder="Dress Code: Business Casual
// Location: Grainger"
//       ></textarea>
//     </div>
//   </div>
//   <div class="field has-addons">
//     <div class="control">
//       <input class="input" type="text" placeholder="Generate Code" />
//     </div>
//     <div class="control">
//       <a class="button btncolor">Go</a>
//     </div>
//   </div>
//   <div class="field is-grouped">
//     <div class="control">
//       <button class="button">Submit</button>
//     </div>
//     <div class="control">
//       <button class="button">Cancel</button>
//     </div>
//   </div>
// </div>
// </div>`;

r_e("eventbtn").addEventListener("click", () => {
  let html = "<h1> test test test </h1>";
  html += "<h3> test test </h3>";
  html += "<p> test test <p>";
  r_e("sample").innerHTML = "<h1> About Link Clicked </h1>";
});
