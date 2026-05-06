// -------------------------------------------------------
// CARD HOVER LOGGING
// When the mouse enters any card, log its title to the console.
// -------------------------------------------------------

// Select every element with the class "card" and loop over each one
document.querySelectorAll('.card').forEach(card => {

    // Listen for the moment the mouse cursor moves onto this card
    card.addEventListener('mouseenter', () => {

        // Find the <h2> element inside this card and read its visible text,
        // then print a message to the browser's developer console
        console.log("Exploring " + card.querySelector('h2').innerText);

        // Placeholder comment — a sound effect could be triggered here instead of / in addition to the log
        // You could trigger a subtle sound effect here
    });
});


// -------------------------------------------------------
// BUTTON HOVER SHAKE
// When the mouse enters a button wrapper, make the parent
// card play a quick shake animation, then reset it so it
// can be triggered again on the next hover.
// -------------------------------------------------------

// Select every element with the class "button-wrapper" and loop over each one
document.querySelectorAll('.button-wrapper').forEach(wrapper => {

    // Listen for the moment the mouse cursor moves onto this button wrapper
    wrapper.addEventListener('mouseenter', () => {

        // Walk up the DOM tree from the button wrapper to find its closest ancestor with class "card"
        const card = wrapper.closest('.card');

        // Apply the "shake" CSS keyframe animation to the card (0.2s duration, smooth easing)
        card.style.animation = 'shake 0.2s ease-in-out';

        // After 200ms (once the animation has finished playing), clear the animation style.
        // This reset is necessary — without it, setting the same animation again later
        // would have no effect because the browser sees it as already applied.
        setTimeout(() => {
            card.style.animation = ''; // Clears the inline style, allowing the animation to retrigger next hover
        }, 200); // Matches the 0.2s (200ms) animation duration above
    });
});


// -------------------------------------------------------
// LOADING SCREEN DISMISSAL
// Once the page has fully loaded, wait a short moment so
// the loading animation is visible, then fade out the
// overlay and reveal the page content.
// -------------------------------------------------------

// Wait until the entire page (images, scripts, etc.) has finished loading
window.addEventListener('load', function () {

    // Grab the loading overlay element by its ID
    const loadingOverlay = document.getElementById('loading-overlay');

    // Reference to the <body> element — used to toggle the 'loading' class
    const body = document.body;

    // Wait 1.2 seconds before starting the fade-out.
    // This ensures the loading animation plays for at least a brief visible moment
    // even on fast connections where the page loads almost instantly.
    setTimeout(() => {

        // Start fading out the overlay by setting its opacity to 0.
        // The actual visual fade relies on a CSS "transition: opacity" rule being set on the element.
        loadingOverlay.style.opacity = '0';

        // Remove the 'loading' class from <body>.
        // This class is typically used in CSS to hide the main page content (e.g. overflow:hidden),
        // so removing it reveals/unlocks the page underneath.
        body.classList.remove('loading');

        // After the CSS fade transition finishes (500ms), fully hide the overlay.
        // Setting display:none removes it from the layout entirely so it can't accidentally
        // block mouse clicks or sit invisibly on top of page content.
        setTimeout(() => {
            loadingOverlay.style.display = 'none';
        }, 500); // Must match the CSS transition duration on #loading-overlay

    }, 1200); // Minimum time (1.2 seconds) to show the loading animation
});


// -------------------------------------------------------
// IMMEDIATE LOADING CLASS
// This line runs as soon as the script is parsed — before
// the page finishes loading — to hide content right away.
// -------------------------------------------------------

// Adds the 'loading' class to <body> instantly when the script executes.
// CSS uses this class to hide or obscure the main content while the loading
// overlay is visible. The class is removed again inside the load event above.
document.body.classList.add('loading');