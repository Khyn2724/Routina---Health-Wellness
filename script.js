const toggleIcon = document.getElementById('dark-mode-toggle');
const body = document.body;

// Check if the user has a saved preference
if (localStorage.getItem('dark-mode') === 'enabled') {
    body.classList.add('dark-mode');
}

toggleIcon.addEventListener('click', () => {
    body.classList.toggle('dark-mode');

    // Save the user's preference
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('dark-mode', 'enabled');
    } else {
        localStorage.removeItem('dark-mode');
    }
});

const carouselSlide = document.querySelector('.carousel-slide');
const images = document.querySelectorAll('.carousel-image');

let counter = 0;
const size = images[0].clientWidth;

document.querySelector('.next-btn').addEventListener('click', () => {
    if (counter >= images.length - 1) counter = -1;
    carouselSlide.style.transition = "transform 0.4s ease-in-out";
    counter++;
    carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
});

document.querySelector('.prev-btn').addEventListener('click', () => {
    if (counter <= 0) counter = images.length;
    carouselSlide.style.transition = "transform 0.4s ease-in-out";
    counter--;
    carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
});



document.getElementById("sidebarToggle").addEventListener("click", function() {
    document.getElementById("sidebar").style.left = "0";
    document.getElementById("main-content").style.marginLeft = "250px";
});

document.getElementById("sidebarClose").addEventListener("click", function() {
    document.getElementById("sidebar").style.left = "-250px";
    document.getElementById("main-content").style.marginLeft = "0";
});

// Switching between different sections in the sidebar
document.getElementById("AboutUsLink").addEventListener("click", function() {
    activateSection('AboutUs');
});

document.getElementById("healthAdviceLink").addEventListener("click", function() {
    activateSection('healthAdvice');
});
document.getElementById("routineTrackerLink").addEventListener("click", function() {
    activateSection('routineTracker');
});
document.getElementById("healthTrackerLink").addEventListener("click", function() {
    activateSection('healthTracker');
});
document.getElementById("stressLevelTrackerLink").addEventListener("click", function() {
    activateSection('stressLevelTracker');
});
document.getElementById("CustomerLink").addEventListener("click", function() {
    activateSection('CustomerSupport');
});

function activateSection(sectionId) {
    const sections = document.querySelectorAll(".tracker-content");
    sections.forEach(section => {
        section.classList.remove("active");
    });
    document.getElementById(sectionId).classList.add("active");
}

// Routine Progress Charts
const exerciseProgressCtx = document.getElementById('exerciseProgress').getContext('2d');
new Chart(exerciseProgressCtx, {
    type: 'doughnut',
    data: {
        datasets: [{
            data: [30, 60],
            backgroundColor: ['#06af00', '#e0e0e0']
        }]
    },
    options: {
        cutout: '80%',
    }
});

const mealProgressCtx = document.getElementById('mealProgress').getContext('2d');
new Chart(mealProgressCtx, {
    type: 'doughnut',
    data: {
        datasets: [{
            data: [3, 5],
            backgroundColor: ['#06af00', '#e0e0e0']
        }]
    },
    options: {
        cutout: '80%',
    }
});

// Health Tracker Charts
const stepsProgressCtx = document.getElementById('stepsProgress').getContext('2d');
new Chart(stepsProgressCtx, {
    type: 'doughnut',
    data: {
        datasets: [{
            data: [5000, 5000],
            backgroundColor: ['#06af00', '#e0e0e0']
        }]
    },
    options: {
        cutout: '80%',
    }
});

const waterIntakeProgressCtx = document.getElementById('waterIntakeProgress').getContext('2d');
new Chart(waterIntakeProgressCtx, {
    type: 'doughnut',
    data: {
        datasets: [{
            data: [4, 4],
            backgroundColor: ['#06af00', '#e0e0e0']
        }]
    },
    options: {
        cutout: '80%',
    }
});


// Stress Level Tracker Chart
const stressLevelChartCtx = document.getElementById('stressLevelChart').getContext('2d');
const stressLevelChart = new Chart(stressLevelChartCtx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Stress Level',
            data: [],
            borderColor: '#f44336', // Line color (Stress Level Line)
            fill: false
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    color: 'blue', // Change the color of the chart label (Stress Level)
                    font: {
                        size: 14 // Adjust font size if needed
                    }
                }
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Time', // Label for the X-axis
                    color: 'white' // Color of the X-axis label
                },
                ticks: {
                    color: 'white' // Color of the X-axis ticks (numbers)
                }
            },
            y: {
                beginAtZero: true,
                max: 10,
                title: {
                    display: true,
                    text: 'Stress Level (1-10)', // Label for the Y-axis
                    color: 'white' // Color of the Y-axis label
                },
                ticks: {
                    color: 'white' // Color of the Y-axis ticks (numbers)
                }
            }
        }
    }
});


// Log Stress Level
document.getElementById('logStressLevelBtn').addEventListener('click', function() {
    const stressLevel = document.getElementById('stressLevelInput').value;
    if (stressLevel >= 0 && stressLevel <= 10) {
        stressLevelChart.data.labels.push(new Date().toLocaleTimeString());
        stressLevelChart.data.datasets[0].data.push(parseInt(stressLevel));
        stressLevelChart.update();
        document.getElementById('stressLevelInput').value = '';
    } else {
        alert("Please enter a valid stress level between 0 and 10.");
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const waterProgress = document.getElementById('waterProgress');
    const waterMedal = document.getElementById('waterMedal');

    let waterTaskCompletion = 0;


    const updateProgressBar = (progressElement, completionPercent) => {
        progressElement.style.width = `${completionPercent}%`;
    };

    const checkCompletion = (completionPercent, medalElement) => {
        if (completionPercent >= 100) {
            medalElement.style.display = 'block'; // Show the medal if task is complete
        }
    };

    document.getElementById('completeWaterTaskBtn').addEventListener('click', () => {
        waterTaskCompletion += 25; // Increment by 25% per step (assuming 4 steps for drinking water)
        if (waterTaskCompletion > 100) waterTaskCompletion = 100;
        updateProgressBar(waterProgress, waterTaskCompletion);
        checkCompletion(waterTaskCompletion, waterMedal);
    });

});


document.addEventListener('DOMContentLoaded', () => {
    const proteinProgress = document.getElementById('proteinProgress');
    const proteinMedal = document.getElementById('proteinMedal');

    let proteinTaskCompletion = 0;


    const updateProgressBar = (progressElement, completionPercent) => {
        progressElement.style.width = `${completionPercent}%`;
    };

    const checkCompletion = (completionPercent, medal2Element) => {
        if (completionPercent >= 100) {
            medal2Element.style.display = 'block'; // Show the medal if task is complete
        }
    };

    document.getElementById('completeProteinTaskBtn').addEventListener('click', () => {
        proteinTaskCompletion += 25; // Increment by 25% per step (assuming 4 steps for drinking water)
        if (proteinTaskCompletion > 100) proteinTaskCompletion = 100;
        updateProgressBar(proteinProgress, proteinTaskCompletion);
        checkCompletion(proteinTaskCompletion, proteinMedal);
    });

});

document.addEventListener('DOMContentLoaded', () => {
    const sleepProgress = document.getElementById('sleepProgress');
    const sleepMedal = document.getElementById('sleepMedal');

    let sleepTaskCompletion = 0;


    const updateProgressBar = (progressElement, completionPercent) => {
        progressElement.style.width = `${completionPercent}%`;
    };

    const checkCompletion = (completionPercent, medal3Element) => {
        if (completionPercent >= 100) {
            medal3Element.style.display = 'block'; // Show the medal if task is complete
        }
    };

    document.getElementById('completeSleepTaskBtn').addEventListener('click', () => {
        sleepTaskCompletion += 25; // Increment by 25% per step (assuming 4 steps for drinking water)
        if (sleepTaskCompletion > 100) sleepTaskCompletion = 100;
        updateProgressBar(sleepProgress, sleepTaskCompletion);
        checkCompletion(sleepTaskCompletion, sleepMedal);
    });

});

document.addEventListener('DOMContentLoaded', () => {
    const healthProgress = document.getElementById('healthProgress');
    const healthMedal = document.getElementById('healthMedal');

    let healthTaskCompletion = 0;


    const updateProgressBar = (progressElement, completionPercent) => {
        progressElement.style.width = `${completionPercent}%`;
    };

    const checkCompletion = (completionPercent, medal4Element) => {
        if (completionPercent >= 100) {
            medal4Element.style.display = 'block'; // Show the medal if task is complete
        }
    };

    document.getElementById('completeHealthTaskBtn').addEventListener('click', () => {
        healthTaskCompletion += 25; // Increment by 25% per step (assuming 4 steps for drinking water)
        if (healthTaskCompletion > 100) healthTaskCompletion = 100;
        updateProgressBar(healthProgress, healthTaskCompletion);
        checkCompletion(healthTaskCompletion, healthMedal);
    });

});


// Get the modal, button, and close elements
const popupModal = document.getElementById('popupModal');
const openPopupBtn = document.getElementById('openPopupBtn');
const closePopupBtn = document.getElementById('closePopupBtn');
const popupCloseBtn = document.getElementById('popupCloseBtn');

// When the user clicks the button, open the modal
openPopupBtn.addEventListener('click', () => {
    popupModal.style.display = 'block';
});

// When the user clicks on the 'x' (close), close the modal
closePopupBtn.addEventListener('click', () => {
    popupModal.style.display = 'none';
});

// When the user clicks on the 'Close' button inside the popup
popupCloseBtn.addEventListener('click', () => {
    popupModal.style.display = 'none';
});

// When the user clicks anywhere outside the modal, close it
window.addEventListener('click', (event) => {
    if (event.target == popupModal) {
        popupModal.style.display = 'none';
    }
});

const popup2Modal = document.getElementById('popup2Modal');
const openPopupBtn2 = document.getElementById('openPopupBtn2');
const closePopupBtn2 = document.getElementById('closePopupBtn2');
const popupCloseBtn2 = document.getElementById('popupCloseBtn2');

// When the user clicks the button, open the modal
openPopupBtn2.addEventListener('click', () => {
    popup2Modal.style.display = 'block';
});

// When the user clicks on the 'x' (close), close the modal
closePopupBtn2.addEventListener('click', () => {
    popup2Modal.style.display = 'none';
});

// When the user clicks on the 'Close' button inside the popup
popupCloseBtn2.addEventListener('click', () => {
    popup2Modal.style.display = 'none';
});

// When the user clicks anywhere outside the modal, close it
window.addEventListener('click', (event) => {
    if (event.target == popup2Modal) {
        popup2Modal.style.display = 'none';
    }
});

//reward
const popup3Modal = document.getElementById('popup3Modal');
const openPopupBtn3 = document.getElementById('openPopupBtn3');
const closePopupBtn3 = document.getElementById('closePopupBtn3');
const popupCloseBtn3 = document.getElementById('popupCloseBtn3');

// When the user clicks the button, open the modal
openPopupBtn3.addEventListener('click', () => {
    popup3Modal.style.display = 'block';
});

// When the user clicks on the 'x' (close), close the modal
closePopupBtn3.addEventListener('click', () => {
    popup3Modal.style.display = 'none';
});

// When the user clicks on the 'Close' button inside the popup
popupCloseBtn3.addEventListener('click', () => {
    popup3Modal.style.display = 'none';
});

// When the user clicks anywhere outside the modal, close it
window.addEventListener('click', (event) => {
    if (event.target == popup3Modal) {
        popup3Modal.style.display = 'none';
    }
});

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Simple validation (you can replace this with your authentication logic)
    if (email === "test@example.com" && password === "password") {
        alert("Login successful!");
        // Redirect to another page or perform other actions
    } else {
        document.getElementById('loginMessage').textContent = "Invalid email or password.";
    }
});





document.getElementById("runningLink").addEventListener("click", function() {
    activateSection('RunningTracker'); // Ensure this matches the actual section ID
});






