function copyUrl(event) {
  event.preventDefault();
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
  
  const commit_order_div = document.getElementById('order-commit-div')
  commit_order_div.style.display = 'block';
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


async function commitOrder(event) {
  event.preventDefault();

  const requestData = {
    order_note : document.getElementById("note-textarea").value || ""
  };

  try {
    const response = await fetch("/orders/commit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestData)
    });

    if (response.status !== 200) {
      alert("Failed to commit the order.");
      return;
    }

    let data = await response.json();
    if (data.redirectUrl) {
      alert("Order committed successfully!");
      window.location.href = data.redirectUrl;
    } else {
      alert("Failed to commit order!");
    }
  } catch (error) {
    alert("An unexpected error occurred.");
  }
}



// Animations

function startLoadingAnimation(event, button) {
  event.preventDefault();
  button.innerHTML =
    'Generating Invoice <div class="spinner-border spinner-border-sm text-light ms-1" role="status"><span class="visually-hidden">Loading...</span></div>';
}

function startFetchingAnimation(event, button) {
  event.preventDefault();
  button.innerHTML =
    'Fetching Contact <div class="spinner-border spinner-border-sm text-dark ms-1" role="status"><span class="visually-hidden">Loading...</span></div>';
}

function startStoringContactAnimation(event, button) {
  event.preventDefault();
  button.innerHTML =
    'Saving Contact <div class="spinner-border spinner-border-sm text-light ms-1" role="status"><span class="visually-hidden">Loading...</span></div>';
}

function startStoringOrderAnimation(event, button) {
  event.preventDefault();
  button.innerHTML =
    'Saving Order <div class="spinner-border spinner-border-sm text-light ms-1" role="status"><span class="visually-hidden">Loading...</span></div>';
}
