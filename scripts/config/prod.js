;(function () {
    'use strict';

    if(typeof window.db == 'undefined') window.db = { libs: {} };

    window.db.config = {
        version: '0.28.5',
        serviceURL: 'https://apps.dinside.no/dinside',
        pollURL: 'https://apps.dinside.no/poll',
        css: {
            app: '//styleguide.dinside.no/stylesheets/app.css',
            core: '//styleguide.dinside.no/stylesheets/core.css'
        },
        postMessageWhitelist: [
            'http://localhost:4000',
            'https://db-styleguide-tomsky.c9.io',
            'http://dinside.no',
            'http://www.dinside.no',
            'http://db.no',
            'http://styleguide.dinside.no',
            'https://styleguide.dinside.no',
            'http://www.tom.s1.labdevs.com/'
        ]
    };

})();
