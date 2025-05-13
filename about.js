
    // Intersection Observer for scroll animations
    document.addEventListener('DOMContentLoaded', function() {
        // Function to check if element is in viewport
        function isInViewport(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
                rect.bottom >= 0
            );
        }

        // Elements to animate
        const aboutTitle = document.getElementById('about-title');
        const aboutSubtitle = document.getElementById('about-subtitle');
        const aboutImage = document.getElementById('about-image');
        const aboutInfo = document.getElementById('about-info');
        const elements = [aboutTitle, aboutSubtitle, aboutImage, aboutInfo];

        // Function to handle scroll animation
        function handleScroll() {
            elements.forEach(element => {
                if (isInViewport(element) && element) {
                    element.classList.add('in-view');
                }
            });
        }

        // Check on load
        handleScroll();

        // Check on scroll
        window.addEventListener('scroll', handleScroll);
    });
