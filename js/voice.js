// Check if the browser supports the Web Speech API
if ("webkitSpeechRecognition" in window) {
  const recognition = new webkitSpeechRecognition();
  recognition.continuous = false; // Set to false for single phrases
  recognition.interimResults = false; // Do not return interim results

  // Get references to the input field and mic button
  const micButton = document.getElementById("mic-button");
  const searchInput = document.getElementById("search-input");

  // Add an event listener for the mic button click
  micButton.addEventListener("click", () => {
    recognition.start();
    console.log("Voice recognition started.");
  });

  // Capture the result when speech is recognized
  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    searchInput.value = transcript;
    console.log("Recognized speech:", transcript);
  };

  // Log any errors
  recognition.onerror = (event) => {
    console.error("Speech recognition error", event.error);
  };

  // Optional: Stop recognition after a certain time or on a certain event
  recognition.onend = () => {
    console.log("Voice recognition ended.");
  };
} else {
  console.error("Speech recognition not supported in this browser.");
}
