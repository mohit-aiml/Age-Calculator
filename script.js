function calculateAge() {
    const dobInput = document.getElementById('dob').value;
    const resultDiv = document.getElementById('result');
    
    if (!dobInput) {
        resultDiv.innerHTML = 'Please enter your date of birth.';
        return;
    }
    
    const dobDate = new Date(dobInput);
    const currentDate = new Date();
    
    // Check if the entered date is in the future
    if (dobDate > currentDate) {
        resultDiv.innerHTML = 'Please enter a valid date (not in the future).';
        return;
    }
    
    // Calculate age more accurately
    let years = currentDate.getFullYear() - dobDate.getFullYear();
    let months = currentDate.getMonth() - dobDate.getMonth();
    let days = currentDate.getDate() - dobDate.getDate();
    
    // Adjust for negative days
    if (days < 0) {
        months--;
        const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
        days += lastMonth.getDate();
    }
    
    // Adjust for negative months
    if (months < 0) {
        years--;
        months += 12;
    }
    
    // Display result with animation
    resultDiv.style.animation = 'none';
    setTimeout(() => {
        resultDiv.style.animation = 'timeTick 3s ease-in-out infinite';
    }, 10);
    
    resultDiv.innerHTML = `
        🎂 You are <strong>${years}</strong> years, <strong>${months}</strong> months, and <strong>${days}</strong> days old! 🎂
    `;
}

// Add real-time clock updates
function updateClocks() {
    const clocks = document.querySelectorAll('.clock');
    const now = new Date();
    
    clocks.forEach((clock, index) => {
        // Create different time zones or just different speeds for visual effect
        const offset = index * 2; // 2 hour difference between clocks
        const clockTime = new Date(now.getTime() + (offset * 60 * 60 * 1000));
        
        const hours = clockTime.getHours() % 12;
        const minutes = clockTime.getMinutes();
        
        const hourAngle = (hours * 30) + (minutes * 0.5); // 30 degrees per hour + minute adjustment
        const minuteAngle = minutes * 6; // 6 degrees per minute
        
        // Update clock hands via CSS custom properties
        clock.style.setProperty('--hour-rotation', `${hourAngle}deg`);
        clock.style.setProperty('--minute-rotation', `${minuteAngle}deg`);
    });
}

// Initialize clocks when page loads
document.addEventListener('DOMContentLoaded', function() {
    updateClocks();
    // Update clocks every second
    setInterval(updateClocks, 1000);
    
    // Add Enter key support for date input
    document.getElementById('dob').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            calculateAge();
        }
    });
});
