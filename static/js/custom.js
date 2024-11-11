document.addEventListener("DOMContentLoaded", function() {
    const menuIcon = document.getElementById("menu-icon");
    const userOptions = document.querySelector(".user-options");
    const svgContainer = document.querySelector(".svg-container");
    
    // JavaScript to cycle through the SVGs
    let currentIndex = 0;
    const svgItems = document.querySelectorAll('.svg-item');

    // Function to change the displayed SVG
    function changeSVG() {
        svgItems.forEach((item, index) => {
            item.style.display = index === currentIndex ? 'block' : 'none';
        });

        currentIndex = (currentIndex + 1) % svgItems.length;
    }

    // Change the SVG every 3 seconds
    setInterval(changeSVG, 5000);

    // Initial display setup
    changeSVG();

    // Show content with a fade-in effect
    setTimeout(function() {
        svgContainer.classList.add("show");
    }, 500); // Adjust delay as needed
    
  
    // Toggle the visibility of the menu icon and user options on click
    menuIcon.addEventListener("click", function(event) {
      event.preventDefault();
      userOptions.classList.toggle("d-none"); // Show or hide user options
      userOptions.classList.toggle("show");
      menuIcon.classList.toggle("hide"); // Hide the menu icon
    });
  
    // Optional: Hide user options if clicking outside the menu or options
    document.addEventListener("click", function(event) {
      if (!menuIcon.contains(event.target) && !userOptions.contains(event.target)) {
        userOptions.classList.add("d-none"); // Hide user options
        userOptions.classList.remove("show");
        menuIcon.classList.remove("hide"); // Show the menu icon again
      }
    });
    
    // Timeout for messages
    setTimeout(function () {
      let messages = document.getElementById('msg');
      let alert = new bootstrap.Alert(messages);
      alert.close();
    }, 3420);
});
  