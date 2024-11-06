function copyUrl() {
  let payment_link = document.getElementById("copy-text");
  let range = document.createRange();
  range.selectNode(payment_link);

  window.getSelection().removeAllRanges();

  window.getSelection().addRange(range);

  navigator.clipboard
    .writeText(payment_link.textContent)
    .then(() => {
      alert("Text copied to clipboard!");
    })
    .catch((err) => {
      alert("Unable to copy!");
    });

  window.getSelection().removeAllRanges();
}

function setTarget() {
  const form = document.forms["admin-form"];
  const selectedValue = document.getElementById("type").value;
  console.log(selectedValue);
  if (selectedValue === "directors") {
    form.setAttribute("hx-target", ".directors-list");
  } else if (selectedValue === "locations") {
    form.setAttribute("hx-target", ".locations-list");
  }
}

function startLoadingAnimation(button) {
  button.innerHTML =
    'Generating Invoice <div class="spinner-border spinner-border-sm text-light ms-1" role="status"><span class="visually-hidden">Loading...</span></div>';
}
