const calendarView = document.getElementById("calendarView");
const currentMonth = document.getElementById("currentMonth");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");

const today = new Date();
let currentDate = new Date(today.getFullYear(), today.getMonth(), 1);

// Generate the calendar for the current month
function generateCalendar(date) {
    calendarView.innerHTML = `
        <div class="day">Sun</div>
        <div class="day">Mon</div>
        <div class="day">Tue</div>
        <div class="day">Wed</div>
        <div class="day">Thu</div>
        <div class="day">Fri</div>
        <div class="day">Sat</div>
    `;

    const year = date.getFullYear();
    const month = date.getMonth();
    currentMonth.textContent = `${date.toLocaleString("default", {
        month: "long",
    })} ${year}`;

    // Get the first day and total days of the month
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    // Add blank spaces for days before the 1st
    for (let i = 0; i < firstDay; i++) {
        calendarView.innerHTML += `<div class="date empty"></div>`;
    }

    // Add the actual days
    for (let day = 1; day <= totalDays; day++) {
        const isToday =
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear();

        const dayClass = isToday ? "current-date" : "date";
        const weekendClass =
            new Date(year, month, day).getDay() === 0 ||
            new Date(year, month, day).getDay() === 6
                ? "weekend"
                : "weekday";

        calendarView.innerHTML += `<div class="date ${dayClass} ${weekendClass}">${day}</div>`;
    }
}

// Navigate between months
prevButton.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    generateCalendar(currentDate);
});

nextButton.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    generateCalendar(currentDate);
});

// Initial load
generateCalendar(currentDate);
