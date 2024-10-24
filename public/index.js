function copyUrl() {

  let payment_link = document.getElementById("copy-text");
  let range = document.createRange();
  range.selectNode(payment_link);
  
  window.getSelection().removeAllRanges();
  
  window.getSelection().addRange(range);

  navigator.clipboard.writeText(payment_link.textContent)
    .then(() => {
      alert('Text copied to clipboard!');
    })
    .catch(err => {
      alert("Unable to copy!");
    });

  window.getSelection().removeAllRanges();
}
