function updateApp() {
    const app = document.getElementById('app');
    if (app) {
        app.innerHTML = `<h1>Hello from Bun!</h1>
                         <p>The time is: ${new Date().toLocaleTimeString()}</p>`;
    }
}

// Update every second
setInterval(updateApp, 1000);

// Initial update
document.addEventListener('DOMContentLoaded', updateApp);