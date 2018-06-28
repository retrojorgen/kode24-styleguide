;(function () {
    'use strict';

    if(typeof window.db == 'undefined') window.db = { libs: {} };

    db.config = {
        version: 'dev',
        serviceURL: 'https://apps.dagbladet.no/poll',
        css: {
            app: '/stylesheets/app.css',
            core: '/stylesheets/core.css'
        },
        pollURL: 'https://apps.dagbladet.no/poll',
        postMessageWhitelist: [
            'http://localhost:4000',
            'https://db-styleguide-tomsky.c9.io',
            'http://dagbladet.no',
            'http://www.dagbladet.no',
            'http://db.no',
            'http://styleguide.dinside.no',
            'https://styleguide.dinside.no'
        ]
    };

})();
