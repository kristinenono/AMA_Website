//Class selector function//

function r_e(id) {
  return document.querySelector(`#${id}`);
}

function appendContent(html) {
  r_e("sample").innerHTML += html;
}

r_e("month-select").addEventListener("click", () => {
  console.log("+++++");
});
