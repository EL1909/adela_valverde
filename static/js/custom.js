$(function() {
    // handle click event on timeline items
    $('.timeline-item').on('click', function() {
        var selectedKeyMoment = $(this);

        // Update the image and description in the first two columns
        var backgroundImage = selectedKeyMoment.find('img').attr('src');
        var description = selectedKeyMoment.find('.moment-description').text();
        var title = selectedKeyMoment.find('h4').text();
        var excerpt = selectedKeyMoment.find('.moment-excerpt').text();

        // Update the content and image of the divs
        $('#key-moment-image').css('background-image', 'url(' + backgroundImage + ')');
        $('#key-moment-description').text(description);
        $('#key-moment-title').text(title);
        $('#key-moment-excerpt').text(excerpt);

        // Add active class to the selected timeline item
        $('.timeline-item').removeClass('active');
        selectedKeyMoment.addClass('active');
    });

    // handle click event on the "Create New Moment" link
    $('#create-new-moment').on('click', function(event) {
        event.preventDefault();

        // Open the modal or navigate to the separate page for creating the new moment
        $('#create-moment-modal').modal('show');
    });

    var cropper;

    // Handle file input change event to initialize the Cropper.js instance
    $('#moment_image').on('change', function(event) {
        var input = event.target;

        // Ensure that a file is selected
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            // Read the selected file as data URL
            reader.onload = function() {
                var imageDataURL = reader.result;

                // Do something with the data URL (e.g., display the image or initialize the Cropper)
                if (cropper) {
                    cropper.destroy();
                }

                $('#cropper-image').attr('src', imageDataURL);

                cropper = new Cropper(document.getElementById('cropper-image'), {
                    aspectRatio: 1, 
                    cropBoxData: {
                        width: 320,
                        height: 380,
                    },
                    viewMode: 2, // Allow cropping within the container without extending beyond
                    zoomable: true,
                });
            };

            // Start reading the file
            reader.readAsDataURL(input.files[0]);
        } else {
            // If no file is selected, destroy the existing Cropper instance
            if (cropper) {
                cropper.destroy();
            }
        }
    });

    $(document).ready(function() {
        // Initialize the start date picker
        $('#start_date').datepicker({
            format: 'yyyy-mm-dd', // Adjust the date format as needed
            autoclose: true,
            // Other options...
        });
    
        // Initialize the end date picker
        $('#end_date').datepicker({
            format: 'yyyy-mm-dd', // Adjust the date format as needed
            autoclose: true,
            // Other options...
        });
    });
    

    // handle form submission for creating a new moment
    $('#new-moment-form').on('submit', function(event) {
        event.preventDefault();

        // Get the form data
        var formData = new FormData(this);

        // Get the cropped image data URL from Cropper.js
        var croppedImageDataURL = cropper.getCroppedCanvas().toDataURL();

        // Add the cropped image data URL to the form data
        formData.set('cropped_image', croppedImageDataURL);

        // Send the form data to the server to create the new moment
        $.ajax({
            type: 'POST',
            url: '{% url "keymoments/create_key_moment" %}',
            data: formData,
            processData: false,
            contentType: false,
            success: function(response) {
                // On success, update the timeline with the new moment HTML
                var newMomentHTML = '<div class="timeline-item" data-dates="' + response.start_date + '">'
                    + '<a href="#">'
                    + '<h4>' + response.title + '</h4>'
                    + '<p class="moment-excerpt">' + response.excerpt + '</p>'
                    + '<p class="moment-description" style="display: none;">' + response.description + '</p>'
                    + '<img src="' + response.image_url + '" alt="' + response.title + '" style="display: none;">'
                    + '</a>'
                    + '</div>';

                $('.history-items').append(newMomentHTML);

                // Close the modal or navigate back to the timeline page
                $('#create-moment-modal').modal('hide');

                // Reset the form fields for the next moment creation
                $('#new-moment-form')[0].reset();
            },
            error: function(error) {
                // Handle any errors that may occur during form submission
                console.log ("Error en carga de datos")
            }
        });
    });
});
