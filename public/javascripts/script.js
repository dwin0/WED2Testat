//Achtung: Gemäss Vorgabe kein JS auf dem Client. Nachfragen, wie die Sortierung und der Switcher genau gemacht werden sollen (neu laden?)

(function($) {

    var dark = false;

    $(document).on('ready', function () {

        $('#changeStyle').on('click', function () {
            if(dark) {
                $('body').removeClass('dark');
            } else {
                $('body').addClass('dark');
            }
            dark = !dark;
        });

        $('input[type=reset]').on('click', function () {
            window.location.href = "/";
        })

    });

}) (jQuery);
