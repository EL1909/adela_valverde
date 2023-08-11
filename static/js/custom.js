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
    
    function initializeCropper(imageDataURL)    {
        if (cropper)    {
            cropper.destroy();
        }

        $('#cropper-image').attr('src', imageDataURL);

        cropper = new Cropper(document.getElementById('cropper-image'), {
            aspectRatio: 1,
            cropBoxData: {
                with:320,
                height:380,
            },
            viewMode:2, // Allow cropping within the container without extending beyond
            zoomable: true,
        });
    }

    // Handle file input change event to initialize the Cropper.js instance
    $('#moment_image').on('change', function(event) {
        var input = event.target;

        // Ensure that a file is selected
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            // Read the selected file as data URL
            reader.onload = function() {
                var imageDataURL = reader.result;
                initializeCropper(imageDataURL);
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
    

    // Initialize the start date picker
    $('#start_date').datepicker({
        format: 'dd/mm/yyyy', // Adjust the date format as needed (e.g., 'dd/mm/yyyy')
        autoclose: true,
        // Other options...
    });

    // Initialize the end date picker
    $('#end_date').datepicker({
        format: 'dd/mm/yyyy', // Adjust the date format as needed (e.g., 'dd/mm/yyyy')
        autoclose: true,
        // Other options...
    });


    // handle form submission for creating a new moment
    $('#new-moment-form').on('submit', function(event) {
        event.preventDefault();

        // Create a new FormData object
        var formData = new FormData();

        // Add other form fields to the form data object
        formData.append('title', $('#title').val());
        formData.append('excerpt', $('#excerpt').val());
        formData.append('description', $('#description').val());
        formData.append('start_date', $('#start_date').val());
        formData.append('end_date', $('#end_date').val());
        formData.append('moment_type', $('#moment_type').val());
        formData.append('location', $('#location').val());

        // Get the cropped image data URL from Cropper.js
        var croppedImageDataURL = cropper.getCroppedCanvas().toDataURL();

        // Convert the data URL to a Blob object (file)
        var croppedImageFile = dataURLtoBlob(croppedImageDataURL);

        // Append the cropped image file to the FormData object
        formData.append('cropped_image', croppedImageFile, 'cropped_image.jpg');

        // Send the form data to the server to create the new moment

        var csrftoken = $('[name=csrfmiddlewaretoken]').val();

        $.ajax({
            headers: {
                "X-CSRFToken": csrftoken
            },
            type: 'POST',
            url: '/keymoments/create_key_moment/',
            data: formData,
            processData: false,
            contentType: false,
            success: function(response) {
                // On success, update the timeline with the new moment HTML
                console.log(response);
                console.log(response.title);
                console.log(response.start_date);
                console.log(response.image_url);
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

    // Function to convert data URL to Blob
    function dataURLtoBlob(dataURL) {
        var arr = dataURL.split(',');
        var mime = arr[0].match(/:(.*?);/)[1];
        var bstr = atob(arr[1]);
        var n = bstr.length;
        var u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
    }


    // Handle edit button click event
    $('.edit-moment').on('click', function(event) {
        event.preventDefault();
        var momentId = $(this).data('moment-id');

        // Open the modal with the edit form
        $('#moment-modal').modal('show');

        // Fetch existing moment data via AJAX and pre-populate the form
        $.ajax({
            type: 'GET',
            url: '/keymoments/edit/' + momentId + '/',
            success: function(response) {
                $('#title').val(response.title);
                $('#excerpt').val(response.excerpt);
                $('#description').val(response.description);
                $('#start_date').val(response.start_date);
                $('#end_date').val(response.end_date);
                $('#moment_type').val(response.moment_type);
                $('#location').val(response.location);
            
            // Display the cropped image in the Cropper instance (if available)
            if (response.cropped_image_data) {
                initializeCropper(response.cropped_image_data);
            }

            // Set form action URL for editing
            $('#moment-form').attr('action', '/keymoments/edit/' + momentId + '/');
        },
        error: function(error) {
            console.log('Error fetching moment data for editing');
        }
        });   
    });
});