//Script from the original kss-template. Creates new styles for pseudo-classes so they can be previewed.
;(function() {
    var KssStateGenerator;
    KssStateGenerator = (function() {
        function KssStateGenerator() {
            var idx, idxs, pseudos, replaceRule, rule, stylesheet, _i, _len, _len2, _ref, _ref2;
            pseudos = /(\:hover|\:disabled|\:active|\:visited|\:focus)/g;
            // try {
            _ref = document.styleSheets;
            replaceRule = function(matched, stuff) {
                return ".pseudo-class-" + matched.replace(':', '');
            };
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                stylesheet = _ref[_i];
                idxs = [];
                _ref2 = stylesheet.cssRules || [];
                for (idx = 0, _len2 = _ref2.length; idx < _len2; idx++) {
                    rule = _ref2[idx];
                    if ((rule.type === CSSRule.STYLE_RULE) && pseudos.test(rule.selectorText)) {
                        this.insertRule(rule.cssText.replace(pseudos, replaceRule));
                    }
                }
            }
            // } catch (_error) {console.log(_error.message);}
        }

        KssStateGenerator.prototype.insertRule = function(rule) {
            var headEl, styleEl;
            headEl = document.getElementsByTagName('head')[0];
            styleEl = document.createElement('style');
            styleEl.type = 'text/css';
            if (styleEl.styleSheet) {
                styleEl.styleSheet.cssText = rule;
            } else {
                styleEl.appendChild(document.createTextNode(rule));
            }
            return headEl.appendChild(styleEl);
        };
        return KssStateGenerator;
    })();
    new KssStateGenerator();
}).call(this);

;(function () {
    'use strict';

    function styleguideInit(){
        //Init Prettyprint
        prettyPrint();

        //Toggle visibility of the styleguide menu for small screens only
        $('.styleguide-toggle-menu').on('click', function(event){
            event.preventDefault();
            $(event.currentTarget).toggleClass('icon-Hamburger icon-Close');
            $('.styleguide-header nav').toggleClass('active');
        });

        //Toggle visability of the styleguide 'frame'
        $('.styleguide-toggle-visability').on('click', function(event){
            event.preventDefault();
            //So, this is me just having some fun.
            db.libs.loader.createModal();
            setTimeout(function(){
                if( $('.styleguide-header:visible').length ){
                    location.href = location.pathname + '?hide-styleguide=1' + location.hash;
                } else {
                    location.href = location.pathname + location.hash;
                }
            }, 200);
        });

        //Hide the styleguide 'frame' if ?hide-styleguide=1 is passed
        if(location.search == '?hide-styleguide=1'){
            $('body').addClass('hide-styleguide');
            $('.styleguide-toggle-visability').addClass('active');
            $('.styleguide-toggle-visability span').attr('class', '').addClass('icon-Hamburger');
            db.reflow();
        }

        //If we are on a screen where the styleguide menu is visible, scroll to the closest top level section
        if( Foundation.utils.is_medium_up() ){
            if($('.styleguide-header nav a[href="'+location.pathname+'"]').length){
                //Scrolls the side nav to the closest top level selection
                $('.styleguide-header nav').scrollTop( $('.styleguide-header nav a[href="'+location.pathname+'"]').position().top - $('.styleguide-banner').outerHeight() );
                //Add active class to the current section
                $('.styleguide-header nav a[href="'+location.pathname+location.hash+'"]').addClass('active');
            }

            //Watch for changes to the hash and update to the nav
            $(window).on('hashchange', function(){
                $('.side-nav a.active').removeClass('active');
                $('.side-nav a[href="'+location.pathname+location.hash+'"]').addClass('active');
            });
        }

        //Navigate to section when selected using autocomplete
        $('.styleguide-lookup').on('keyup', function(event){
            if(event.which == 13){
                event.preventDefault();
                var lookup = $('.styleguide-lookup').val();
                $('#js-styleguide-lookup option').each(function(i, el){
                    if( $(el).attr('value') == lookup ){
                        location.href = $(el).attr('data-url');
                    }
                });
            }
        });
    }

    if (document.readyState === 'complete') {
        styleguideInit();
    } else {
        window.onload = function(){
            setTimeout(function(){
                styleguideInit();
            }, 0);
        };
    }
})();

// Hack to update dates in tvguide
;(function () {
    $(".tv-guide .channel-content ul.program-list").each(function(i, ul) {
        var lastDate = null,
            newDay = false;
        $("li", ul).each(function(j, li) {
            var newDate;
            var now = moment($(li).attr('data-show-time'));
                newDate = moment({hour:now.hour(),minute:now.minute()});
            if (lastDate !== null) {
                if (newDay || now.format("YYYYMMDD") > lastDate) {
                    newDate.add(1, 'd');
                    newDay = true;
                }
            }
            lastDate = now.format("YYYYMMDD");

            $(li).attr('data-show-time', newDate.format('YYYY-MM-DD HH:mm'));
        });
    });
    db.libs.tvguide.init();
})();
