$(document).ready(function() {
    // handle click event on timeline items
    $('.timeline-item').on('click', function() {
        var selectedKeyMoment = $(this);

        // Update the image and description in the first two columns
        var backgroundImage = selectedKeyMoment.find('img').attr('src');
        var description = selectedKeyMoment.find('.moment-description').text();
        var title = selectedKeyMoment.find('h4').text();

        // Update the background image of the div
        $('#key-moment-image').css('background-image', 'url(' + backgroundImage + ')');
        $('#key-moment-description').text(description);
        $('#key-moment-title').text(title);

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

        // Initialize the resizable and draggable features for the image
        $('#resizable-image').resizable({
            aspectRatio: true, // Lock aspect ratio when resizing
            containment: '#image-frame', // Restrict resizing within the frame
        });

        $('#resizable-image').draggable({
            containment: '#image-frame', // Restrict dragging within the frame
        });
    });
});
