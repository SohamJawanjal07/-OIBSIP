// Conversion functions
function celsiusToFahrenheit(celsius) {
    return (celsius * 9/5) + 32;
}

function celsiusToKelvin(celsius) {
    return celsius + 273.15;
}

function fahrenheitToCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5/9;
}

function fahrenheitToKelvin(fahrenheit) {
    return (fahrenheit - 32) * 5/9 + 273.15;
}

function kelvinToCelsius(kelvin) {
    return kelvin - 273.15;
}

function kelvinToFahrenheit(kelvin) {
    return (kelvin - 273.15) * 9/5 + 32;
}

// Get values from input
function getInputValue() {
    const tempInput = document.getElementById('temperature');
    const value = tempInput.value.trim();

    // Check if empty
    if (value === '') {
        showError('Please enter a temperature value');
        return null;
    }

    // Check if numeric
    const numValue = parseFloat(value);
    if (isNaN(numValue)) {
        showError('Please enter a valid number');
        return null;
    }

    return numValue;
}

// Check absolute zero limits
function isAbsoluteZeroViolation(celsius) {
    return celsius < -273.15;
}

// Show error message
function showError(message) {
    const errorEl = document.getElementById('error');
    const alertEl = document.getElementById('alert');
    
    if (message) {
        errorEl.textContent = message;
        alertEl.textContent = message;
        alertEl.style.display = 'block';
        document.getElementById('results').style.display = 'none';
    } else {
        errorEl.textContent = '';
        alertEl.style.display = 'none';
    }
}

// Main convert function
function convert() {
    // Clear previous error
    showError('');

    // Get input value
    const temp = getInputValue();
    if (temp === null) {
        return;
    }

    const unit = document.getElementById('input-unit').value;

    // Convert to Celsius first
    let celsius;
    
    if (unit === 'celsius') {
        celsius = temp;
    } else if (unit === 'fahrenheit') {
        celsius = fahrenheitToCelsius(temp);
    } else if (unit === 'kelvin') {
        celsius = kelvinToCelsius(temp);
    }

    // Check absolute zero violation
    if (isAbsoluteZeroViolation(celsius)) {
        showError('Temperature cannot be below absolute zero (−273.15°C / 0K / −459.67°F). Please enter a valid value.');
        return;
    }

    // Convert to all units
    const fahrenheit = celsiusToFahrenheit(celsius);
    const kelvin = celsiusToKelvin(celsius);

    // Display results
    displayResults(celsius, fahrenheit, kelvin);
}

// Display results
function displayResults(celsius, fahrenheit, kelvin) {
    document.getElementById('result-celsius').textContent = roundToTwo(celsius) + ' °C';
    document.getElementById('result-fahrenheit').textContent = roundToTwo(fahrenheit) + ' °F';
    document.getElementById('result-kelvin').textContent = roundToTwo(kelvin) + ' K';
    document.getElementById('results').style.display = 'block';
}

// Round to 2 decimal places
function roundToTwo(num) {
    return Math.round(num * 100) / 100;
}

// Allow Enter key to convert
document.getElementById('temperature').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        convert();
    }
});

// Real-time input validation
document.getElementById('temperature').addEventListener('input', function() {
    const value = this.value.trim();
    const errorEl = document.getElementById('error');

    if (value === '') {
        errorEl.textContent = '';
        return;
    }

    const numValue = parseFloat(value);
    if (isNaN(numValue)) {
        errorEl.textContent = 'Enter a valid number';
    } else {
        errorEl.textContent = '';
    }
});
