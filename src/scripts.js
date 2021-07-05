var $ = require('jquery');



$('form').submit(function(event) {
    var userEmail = $('#email').val();

    event.preventDefault();
    $.ajax({
        url: '/',
        type: 'POST',
        data: {
            email: userEmail
        },
        success: function(response) {
            console.log(response);

        }
    });
})