document.addEventListener("DOMContentLoaded", function() {
    // Function for running text behavior
    function startRunningText() {
        document.querySelectorAll('.running-text').forEach(function(container) {
            let text = container.textContent.trim();  // Get the product description text
            container.textContent = ''; // Clear the container text

            // Split text into parts (e.g., sentences) and create paragraphs
            let parts = text.split('.').filter(Boolean);  // Split by period for sentences
            let paragraphs = parts.map(part => {
                let p = document.createElement('p');
                p.textContent = part + '.';
                p.classList.add('inactive');
                container.appendChild(p);
                return p;
            });

            let currentIndex = 0;
            let intervalId;

            // Function to show the current paragraph based on the index
            function showCurrentParagraph() {
                paragraphs.forEach((p, index) => p.style.display = 'none'); // Hide all paragraphs

                // Show previous paragraph as inactive if applicable
                if (currentIndex > 0) {
                    paragraphs[currentIndex - 1].classList.add('inactive');
                    paragraphs[currentIndex - 1].style.display = 'block';
                }

                // Show the current paragraph as active
                paragraphs[currentIndex].classList.remove('inactive');
                paragraphs[currentIndex].classList.add('active');
                paragraphs[currentIndex].style.display = 'block';

                // Show next paragraph as inactive if applicable
                if (currentIndex < paragraphs.length - 1) {
                    paragraphs[currentIndex + 1].classList.add('inactive');
                    paragraphs[currentIndex + 1].style.display = 'block';
                }

                // Smooth scroll to bottom
                container.scrollTo({
                    top: container.scrollHeight,
                    behavior: 'smooth'
                });
            }

            // Initial display of the first paragraph with a slight delay
            setTimeout(function() {
                paragraphs[0].classList.add('active');
                paragraphs[0].style.display = 'block';

                // Start automatic paragraph change
                intervalId = setInterval(function() {
                    if (currentIndex < paragraphs.length - 1) {
                        currentIndex++;
                        showCurrentParagraph();
                    } else {
                        clearInterval(intervalId);  // Stop at the last paragraph
                    }
                }, 3000);  // Interval between changes
            }, 500);  // Initial delay

            // Handle paragraph click to advance manually
            paragraphs.forEach(p => {
                p.addEventListener('click', function() {
                    clearInterval(intervalId);  // Stop the automatic interval
                    currentIndex = (currentIndex + 1) % paragraphs.length; // Loop to next
                    showCurrentParagraph();

                    if (currentIndex === paragraphs.length - 1) {
                        clearInterval(intervalId);
                    } else {
                        intervalId = setInterval(function() {
                            currentIndex++;
                            if (currentIndex >= paragraphs.length) {
                                currentIndex = paragraphs.length - 1;
                                clearInterval(intervalId);
                            }
                            showCurrentParagraph();
                        }, 5000);
                    }
                });
            });
        });
    }

    // Initialize the running text effect
    startRunningText();


});
  