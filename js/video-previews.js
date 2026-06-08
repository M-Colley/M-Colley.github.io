// ==========================================
// 1. INJECT CSS FOR VIDEO PREVIEWS
// ==========================================
const videoStyles = document.createElement('style');
videoStyles.innerHTML = `
    /* Container holds the relative position */
    .pub-media-container {
        position: relative;
        cursor: pointer;
        overflow: hidden;
        width: 240px; /* A bit larger than the static publication images */
        border-radius: 4px; /* Optional: adds a slight rounding to match typical Bootstrap polaroids */
    }

    /* Ensure the image takes up the full width of the container */
    .pub-media-container img {
        width: 100%;
        display: block;
    }

    /* Position the video directly over the image */
    .pub-video-preview {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover; /* Ensures video covers the area without distorting */
        opacity: 0;        /* Hidden by default */
        transition: opacity 0.3s ease-in-out; /* Smooth fade-in effect */
        z-index: 2;
    }

    /* Video becomes fully visible on hover */
    .pub-media-container:hover .pub-video-preview {
        opacity: 1;
    }
`;
// Add the styles to the <head> of the document
document.head.appendChild(videoStyles);


// ==========================================
// 2. VIDEO HOVER PLAYBACK LOGIC
// ==========================================
function initVideoPreviews() {
    // Find all media containers on the page
    const mediaContainers = document.querySelectorAll('.pub-media-container');

    mediaContainers.forEach(container => {
        const video = container.querySelector('.pub-video-preview');

        if (video) {
            // The preview clips are pre-trimmed to start at the interesting
            // moment, so we simply play from the beginning on hover.
            container.addEventListener('mouseenter', () => {
                video.play().catch(error => {
                    // Catch errors if browser blocks autoplay (e.g., low battery mode)
                    console.log("Video autoplay was prevented:", error);
                });
            });

            // When the mouse leaves, pause the video and reset it.
            container.addEventListener('mouseleave', () => {
                video.pause();
                video.currentTime = 0; // Reset for the next hover
            });
        }
    });
}

// Run the initialization when the DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initVideoPreviews);
} else {
    // If the script is loaded asynchronously or deferred and the DOM is already ready
    initVideoPreviews();
}
