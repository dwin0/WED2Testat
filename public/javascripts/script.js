(function($) {

    var dark = false;

    $(document).on('ready', function () {

        $('#changeStyle').on('click', function () {
            console.log('click');

            if(dark) {
                $('body').removeClass('dark');
            } else {
                $('body').addClass('dark');
            }
            dark = !dark;

        });

    });

}) (jQuery);

