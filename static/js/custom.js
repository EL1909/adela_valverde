$(document).ready(function() {
    // handle click event on timeline items
    $('.timeline-item').on('click', function() {
        var selectedKeyMoment = $(this);

        // Update the image and description in the first two columns
        var backgroundImage = selectedKeyMoment.find('img').attr('src');
        var description = selectedKeyMoment.find('.moment-description').text();
        var title = selectedKeyMoment.find('h4').text();
        var excerpt = selectedKeyMoment.find('.moment-excerpt').text();

        // Update the background image of the div
        $('#key-moment-image').css('background-image', 'url(' + backgroundImage + ')');
        $('#key-moment-description').text(description);
        $('#key-moment-title').text(title);
        $('#key-moment-excerpt').text(excerpt);

        // Reset the size and position of the image within the frame
        $('#resizable-image').css({
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
        });

        // Add active class to the selected timeline item
        $('.timeline-item').removeClass('active');
        selectedKeyMoment.addClass('active');
    });
});


$(document).ready(function() {
    // handle click event on the "Create New Moment" link
    $('#create-new-moment').on('click', function(event) {
        event.preventDefault();

        // Open the modal or navigate to the separate page for creating the new moment
        // You can use Bootstrap modal or any other method to show the form for creating a new moment
        // For simplicity, let's assume we're using a modal:
        $('#create-moment-modal').modal('show');
    });
});


$(document).ready(function() {
    // handle form submission for creating a new moment
    $('#new-moment-form').on('submit', function(event) {
        event.preventDefault();

        // Get the form data
        var formData = $(this).serialize();

        // Send the form data to the server to create the new moment
        // You can use AJAX to send the data or submit the form using the traditional form submission
        // For this example, let's assume we're using AJAX:
        $.ajax({
            type: 'POST',
            url: '{% url "create_key_moment" %}',  // Replace with the actual URL for creating a new moment
            data: formData,
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
            },
            error: function(error) {
                // Handle any errors that may occur during form submission
            }
        });
    });
});

