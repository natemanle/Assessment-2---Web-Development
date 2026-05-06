// Wait until the entire HTML document has been parsed and built before running any code.
// This prevents errors from trying to access elements that don't exist yet.
document.addEventListener("DOMContentLoaded", () => {

    // -------------------------------------------------------
    // CONFIGURATION
    // -------------------------------------------------------

    // The maximum number of characters to show before truncating a review
    const MAX_CHARACTERS = 250; // Set your desired character limit

    // Grab every element with the class "review-bubble" on the page
    const reviewBubbles = document.querySelectorAll(".review-bubble");


    // -------------------------------------------------------
    // READ MORE / READ LESS TRUNCATION
    // Loop over each review bubble and check if its text is
    // long enough to need a "Read More" button.
    // -------------------------------------------------------

    // Iterate over each review bubble one at a time
    reviewBubbles.forEach(bubble => {

        // Find the <p> tag inside this bubble — this holds the review text
        const paragraph = bubble.querySelector("p");

        // Save the full original HTML content of the paragraph before we change anything.
        // Using innerHTML (not innerText) preserves any bold, links, or other formatting.
        const fullText = paragraph.innerHTML;

        // Only truncate if the review text is longer than the character limit
        if (fullText.length > MAX_CHARACTERS) {

            // Cut the text down to the first 250 characters and add "..." to signal it continues
            const truncatedText = fullText.substring(0, MAX_CHARACTERS) + "...";

            // Replace the paragraph's content with the shortened version as the default display
            paragraph.innerHTML = truncatedText;

            // -------------------------------------------------------
            // CREATE THE TOGGLE BUTTON
            // -------------------------------------------------------

            // Create a new <button> element in memory (not yet added to the page)
            const btn = document.createElement("button");

            // Set the button's visible label to "Read More" initially
            btn.innerText = "Read More";

            // Assign a CSS class so the button can be styled via stylesheet
            btn.className = "read-more-btn";

            // -------------------------------------------------------
            // BUTTON CLICK TOGGLE
            // When clicked, switch between showing full text and
            // truncated text, updating the button label to match.
            // -------------------------------------------------------

            btn.addEventListener("click", () => {

                // Check which state we're currently in by reading the button label
                if (btn.innerText === "Read More") {

                    // Currently showing truncated text — expand to the full review
                    paragraph.innerHTML = fullText;

                    // Update the button label to offer the reverse action
                    btn.innerText = "Read Less";

                } else {

                    // Currently showing full text — collapse back to the truncated version
                    paragraph.innerHTML = truncatedText;

                    // Reset the button label back to "Read More"
                    btn.innerText = "Read More";
                }
            });

            // Attach the finished button to the end of this review bubble in the DOM
            bubble.appendChild(btn);
        }
        // If the review text is 250 characters or fewer, skip it entirely — no button needed
    });


    // -------------------------------------------------------
    // LOADING OVERLAY DISMISSAL
    // After 1.2 seconds, fade out the loading overlay and
    // then fully hide it so it can't block page interactions.
    // -------------------------------------------------------

    // Wait 1.2 seconds so the loading animation is visible before starting the fade
    setTimeout(() => {

        // Find the loading overlay element by its ID
        const overlay = document.getElementById('loading-overlay');

        // Begin fading the overlay out — relies on a CSS "transition: opacity" being set on the element
        overlay.style.opacity = '0';

        // After the 500ms CSS fade transition finishes, fully remove the overlay from the layout
        setTimeout(() => {

            // Setting display:none removes the element entirely so it can't block mouse clicks
            overlay.style.display = 'none';

            // Remove the 'loading' class from <body> — CSS uses this to hide/lock the page content,
            // so removing it reveals the page underneath
            document.body.classList.remove('loading');

        }, 500); // Must match the CSS opacity transition duration on #loading-overlay

    }, 1200); // Minimum display time for the loading animation (1.2 seconds)

}); // End of DOMContentLoaded