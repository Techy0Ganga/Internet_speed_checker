// DOM Elements
const startButton = document.getElementById('start-test');
const speedValue = document.getElementById('speed-value');
const downloadSpeed = document.getElementById('download-speed');
const uploadSpeed = document.getElementById('upload-speed');
const ping = document.getElementById('ping');
const speedGauge = document.querySelector('.speed-gauge');
const gaugeCenter = document.querySelector('.gauge-center');

// Animation variables
let currentSpeed = 0;
let targetSpeed = 0;
let animationFrame;

// Function to update the gauge animation
function updateGauge() {
    // Smoothly animate the speed value
    const diff = targetSpeed - currentSpeed;
    if (Math.abs(diff) > 0.1) {
        currentSpeed += diff * 0.1;
        speedValue.textContent = currentSpeed.toFixed(1);
        
        // Update the gauge gradient
        const percentage = (currentSpeed / 100) * 360; // Assuming max speed is 100 Mbps
        speedGauge.style.background = `conic-gradient(
            from 0deg,
            #667eea ${percentage}deg,
            #764ba2 ${percentage}deg
        )`;
        
        animationFrame = requestAnimationFrame(updateGauge);
    } else {
        currentSpeed = targetSpeed;
        speedValue.textContent = currentSpeed.toFixed(1);
        cancelAnimationFrame(animationFrame);
        gaugeCenter.classList.remove('testing'); // Remove testing class to show numbers
    }
}

// Function to simulate speed test
function simulateSpeedTest() {
    // Reset values and show bunny
    startButton.disabled = true;
    startButton.textContent = 'Testing...';
    gaugeCenter.classList.add('testing'); // Add testing class to show bunny
    
    // Reset speed values
    downloadSpeed.textContent = '-- Mbps';
    uploadSpeed.textContent = '-- Mbps';
    ping.textContent = '-- ms';
    
    // Simulate download test
    setTimeout(() => {
        targetSpeed = Math.random() * 80 + 20; // Random speed between 20-100 Mbps
        downloadSpeed.textContent = targetSpeed.toFixed(1) + ' Mbps';
        gaugeCenter.classList.remove('testing'); // Hide bunny and show numbers
        updateGauge();
        
        // Simulate upload test
        setTimeout(() => {
            const uploadValue = Math.random() * 40 + 10; // Random speed between 10-50 Mbps
            uploadSpeed.textContent = uploadValue.toFixed(1) + ' Mbps';
            
            // Simulate ping
            const pingValue = Math.floor(Math.random() * 50 + 10); // Random ping between 10-60ms
            ping.textContent = pingValue + ' ms';
            
            // Reset button
            startButton.disabled = false;
            startButton.textContent = 'Start Test';
        }, 2000);
    }, 2000);
}

// Event Listeners
startButton.addEventListener('click', simulateSpeedTest);