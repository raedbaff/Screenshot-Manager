document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("toggle-button");
  const confirmButton = document.getElementById("confirm-button");

  function startCapture() {
    window.electron.send("start-capture");
    toggleButton.textContent = "Stop Capture";
    toggleButton.style.backgroundColor = "red";
    confirmButton.disabled = true;
    confirmButton.style.backgroundColor = "gray";
  }

  function stopCapture() {
    window.electron.send("stop-capture");
    toggleButton.textContent = "Start Capture";
    toggleButton.style.backgroundColor = "green";
    confirmButton.disabled = false;
    confirmButton.style.backgroundColor = "#2e2ed6";
  }

  toggleButton.addEventListener("click", () => {
    if (toggleButton.textContent === "Start Capture") {
      startCapture();
    } else {
      stopCapture();
    }
  });
  confirmButton.addEventListener("click", () => {
    let interval = document.getElementById("interval-input").value;
    if (isNaN(interval) || interval < 1000) {
      alert("Interval must be at least 1000ms");
      return;
    }
    window.electron.send("change-interval", interval);
    alert(`Successfully changed interval to ${interval}ms`);
    document.getElementById("interval-input").value = null
  });
});
