window.addEventListener('load', function () {
    const loadingOverlay = document.getElementById('loading-overlay');
    const body = document.body;

    // A small delay makes the loading scene visible for a brief moment
    setTimeout(() => {
        // Fade out the loading screen
        loadingOverlay.style.opacity = '0';
        // Remove the 'loading' class to show content
        body.classList.remove('loading');

        // After the fade is complete, hide the element entirely so it doesn't block clicks
        setTimeout(() => {
            loadingOverlay.style.display = 'none';
        }, 500); // Must match the CSS transition duration
    }, 1200); // Minimum time (1.2 seconds) to show the animation
});