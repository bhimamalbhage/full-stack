// API Base URL - will work in both local and deployed environments
const API_BASE = window.location.origin;

// DOM Elements
const statusDot = document.querySelector('.status-dot');
const statusText = document.getElementById('status-text');
const checkHealthBtn = document.getElementById('check-health');
const fetchDataBtn = document.getElementById('fetch-data');
const sendDataBtn = document.getElementById('send-data');
const dataInput = document.getElementById('data-input');
const apiResponse = document.getElementById('api-response');
const sendResponse = document.getElementById('send-response');

// Check health status
async function checkHealth() {
    try {
        statusText.textContent = 'Checking...';
        statusDot.className = 'status-dot';
        
        const response = await fetch(`${API_BASE}/health`);
        const data = await response.json();
        
        if (response.ok) {
            statusDot.classList.add('healthy');
            statusText.textContent = `Healthy - ${new Date(data.timestamp).toLocaleTimeString()}`;
        } else {
            throw new Error('Health check failed');
        }
    } catch (error) {
        statusDot.classList.add('error');
        statusText.textContent = 'Error - Backend unreachable';
        console.error('Health check error:', error);
    }
}

// Fetch data from API
async function fetchData() {
    try {
        const response = await fetch(`${API_BASE}/api/data`);
        const data = await response.json();
        apiResponse.textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        apiResponse.textContent = `Error: ${error.message}`;
        console.error('Fetch error:', error);
    }
}

// Send data to API
async function sendData() {
    const inputValue = dataInput.value.trim();
    
    if (!inputValue) {
        sendResponse.textContent = 'Please enter some data first';
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE}/api/data`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data: inputValue })
        });
        
        const data = await response.json();
        sendResponse.textContent = JSON.stringify(data, null, 2);
        dataInput.value = '';
    } catch (error) {
        sendResponse.textContent = `Error: ${error.message}`;
        console.error('Send error:', error);
    }
}

// Event Listeners
checkHealthBtn.addEventListener('click', checkHealth);
fetchDataBtn.addEventListener('click', fetchData);
sendDataBtn.addEventListener('click', sendData);

// Allow Enter key to send data
dataInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendData();
    }
});

// Check health on page load
checkHealth();
