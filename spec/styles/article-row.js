casper.start('http://localhost:4000/docs/section-21.html?hide-styleguide=1')

.then(function() {
    phantomcss.screenshot('#styleguide-mod-example-21\\.1', 'Deck 21.1');
})
.then(function() {
    phantomcss.screenshot('#styleguide-mod-example-21\\.2\\.primary', 'Color 21.2');
})
.then(function() {
    phantomcss.screenshot('#styleguide-mod-example-21\\.2\\.1', 'Nested 21.2.1');
})
.then(function() {
    phantomcss.screenshot('#styleguide-mod-example-21\\.3', 'Collapse 21.3');
});
