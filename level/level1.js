var timeRemaining = 120;
var timerInterval;

// Add a function to be called when Level 1 is completed
function completeLevel1() {
  localStorage.setItem('level1Complete', 'true');
}

window.onload = function() {
  // Check if level 1 is complete
  if (localStorage.getItem('level1Complete') === 'true') {
    // Unlock Level 2
    var level2 = document.querySelectorAll('.levels a')[1];
    level2.classList.remove('locked');
    level2.href = 'level2.html';
  }
  
  // ...rest of the code...
}

// Start the timer when the level loads
window.onload = function() {
  startTimer();
};

// Start the timer function
function startTimer() {
  timerInterval = setInterval(function() {
    timeRemaining--;
    document.getElementById("time-remaining").innerHTML = timeRemaining;

    if (timeRemaining == 0) {
      clearInterval(timerInterval);
      swal.fire({
        title: "Time's Up!",
        text: "Sorry, you ran out of time.",
        icon: "warning",
        buttons: {
          confirm: {
            text: "OK",
            value: true,
            visible: true,
            className: "",
            closeModal: true
          }
        }
      }).then(function(isConfirmed) {
        if (isConfirmed) {
          // Redirect to next level page
          window.location.href = "level2.html";
        }
      });
    }

  }, 1000);
}



// Define the correct answer
const correctAnswer = "senapan serbu 1";

// Get references to the elements
const img = document.getElementById("soal-img");
const form = document.getElementById("guess-form");
const input = document.getElementById("guess-input");

// Add event listener to form submission
form.addEventListener("submit", function(event) {
  event.preventDefault();

  // Get the user's guess
  const guess = input.value.trim().toLowerCase(); // Trim whitespace from the beginning and end of the guess

  // Check if the guess is correct
  if (guess === correctAnswer || guess === correctAnswer.trim()) {    // Show a success message
    swal.fire("Benar!", "Kamu Menjawab Dengan Benar.", "success");

    // Play a success sound
    const sound = new Howl({
      src: ['success.mp3']
    });
    sound.play();
    
    // Move on to the next level
    setTimeout(function() {
      window.location.href = "selector.html";
      localStorage.setItem('level1Complete', 'true'); 
      localStorage.setItem('level2', 'granted');
    }, 2000);
  } else {
    // Show an error message
    swal.fire("Salah", "Maaf, Jawaban Kamu Salah.", "error");

    // Play an error sound
    const sound = new Howl({
      src: ['error.mp3']
    });
    sound.play();
  }
});

// Add event listener to the Hint button
document.getElementById("hint-btn").addEventListener("click", function() {
  swal.fire({
    title: "Menu",
    text: "Silahkan Di Pilih",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Hint",
    cancelButtonText: "Kembali ke selector"
  }).then((result) => {
    if (result.isConfirmed) {
      // Code to execute when "Hint" button is clicked
      swal.fire({
        title: "Hint",
        text: "Hint.",
        icon: "info",
        button: "OK"
      });
    } else if (result.dismiss === swal.DismissReason.cancel) {
      // Code to execute when "Menu" button is clicked
      window.location.href = "selector.html"; // Change the URL to the desired page
    }
  });
});
