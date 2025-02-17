// Function to get the current day of the week (0 - 6, where 0 is Sunday)
function getDayOfWeek() {
    const today = new Date();
    return today.getDay(); // 0-6 elements are spit out
}

// Function to get the current time in hours and minutes
function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    return { hours, minutes };
}

// Function to check if it's class time
function isClassTime(dayOfWeek, hours, minutes) {
    // Define the class schedule which I got from outside the door
    const schedule = {
        1: [ // Monday
            { start: { hours: 8, minutes: 30 }, end: { hours: 9, minutes: 45 } }, // CommLab
            { start: { hours: 15, minutes: 35 }, end: { hours: 16, minutes: 50 } }, // Capstone proj
        ],
        2: [ // Tuesday
            { start: { hours: 8, minutes: 30 }, end: { hours: 9, minutes: 45 } }, // CommLab
            { start: { hours: 11, minutes: 20 }, end: { hours: 12, minutes: 35 } }, // Capstone Project
            { start: { hours: 14, minutes: 10 }, end: { hours: 16, minutes: 50 } }, // Foundations of Graphic Design
        ],
        3: [ // Wednesday
            { start: { hours: 8, minutes: 30 }, end: { hours: 11, minutes: 10 } }, // Comm Lab
            { start: { hours: 15, minutes: 35 }, end: { hours: 16, minutes: 50 } }, // Capstone
            { start: { hours: 18, minutes: 0 }, end: { hours: 21, minutes: 0 } }, // Directing the Noon Actor
        ],
        4: [ // Thursday
            { start: { hours: 8, minutes: 30 }, end: { hours: 9, minutes: 45 } }, // Comm Lab
            { start: { hours: 11, minutes: 20 }, end: { hours: 12, minutes: 35 } }, // Capstone Project
            { start: { hours: 14, minutes: 10 }, end: { hours: 15, minutes: 25 } }, // Foundations of Graphic Design
        ],
    };

    // Check the current days schedule
    const daySchedule = schedule[dayOfWeek] || [];

    // Check if the current time falls within any class period
    for (let classTime of daySchedule) {
        const { start, end } = classTime;
        if (
            (hours > start.hours || (hours === start.hours && minutes >= start.minutes)) &&
            (hours < end.hours || (hours === end.hours && minutes <= end.minutes))
        ) {
            return true; // It's class time
        }
    }

    return false; // It's free time
}

// Function to update the navbar container text based on class schedule
function updateNavbarContent() {
    const dayOfWeek = getDayOfWeek(); // Get the current day
    const { hours, minutes } = getCurrentTime(); // Get the current time

    const navbarContainer = document.getElementById('dynamic-text-container'); // This ID was used by the container

    // Log to check if it's class time or free time
    console.log(`Day: ${dayOfWeek}, Time: ${hours}:${minutes < 10 ? '0' + minutes : minutes}`);

    // Sea  if it's class time or free time
    if (isClassTime(dayOfWeek, hours, minutes)) {
        navbarContainer.innerHTML = '🛑 Busy'; // Class is in session
        console.log('Status: 🛑 Busy');
    } else {
        navbarContainer.innerHTML = '🟢 Free'; // No class, free time
        console.log('Status: 🟢 Free');
    }
}

// I used event listener to make sure DOM is loaded properly, to trigger the call back funcion.
document.addEventListener('DOMContentLoaded', () => {
    updateNavbarContent(); // Call the function to update the content
});
