document.addEventListener('DOMContentLoaded', () => {
    // CONFIGURATION
    const SLIDE_DURATION = 4000; // 4 seconds per slide
    const NEXT_PAGE_URL = "home.html"; // The renamed existing index file

    // ELEMENTS
    const slide1 = document.getElementById('slide-1');
    const slide2 = document.getElementById('slide-2');
    const progressBar = document.getElementById('progress-bar');
    const skipBtn = document.getElementById('skip-btn');

    let startTime = null;
    let currentSlide = 1;
    let animationFrame;

    function startSequence() {
        startTime = Date.now();
        requestAnimationFrame(animate);
    }

    function animate() {
        const now = Date.now();
        const elapsed = now - startTime;
        
        // Calculate progress (0% to 100% over 2 slides * duration)
        const totalDuration = SLIDE_DURATION * 2;
        const progress = Math.min((elapsed / totalDuration) * 100, 100);
        progressBar.style.width = `${progress}%`;

        // Transition Logic
        if (currentSlide === 1 && elapsed > SLIDE_DURATION) {
            transitionToSlide2();
        }

        if (elapsed > totalDuration) {
            finishIntro();
            return;
        }

        animationFrame = requestAnimationFrame(animate);
    }

    function transitionToSlide2() {
        if (currentSlide !== 1) return;
        currentSlide = 2;
        
        // Fade out slide 1
        slide1.style.opacity = '0';
        setTimeout(() => {
            slide1.classList.remove('active');
            slide2.classList.add('active');
            // Trigger reflow/opacity for slide 2
            setTimeout(() => slide2.style.opacity = '1', 50);
        }, 500); // Wait for CSS opacity transition
    }

    function finishIntro() {
        cancelAnimationFrame(animationFrame);
        // Use replace to prevent "Back" button returning to intro
        window.location.replace(NEXT_PAGE_URL);
    }

    // Event Listeners
    skipBtn.addEventListener('click', finishIntro);
    document.body.addEventListener('click', () => {
        // Simple click-to-advance logic
        if (currentSlide === 1) {
            startTime = Date.now() - SLIDE_DURATION; // Fast forward
        } else {
            finishIntro();
        }
    });

    // Start
    startSequence();
});