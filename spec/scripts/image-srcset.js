describe("db.libs.imageSrcset", function() {
    it("sould be defined", function() {
        expect(db.libs.imageSrcset).toBeDefined();
    });

    it("should have init and reflow defined", function() {
        expect( db.libs.imageSrcset.init ).toEqual(jasmine.any(Function));
        expect( db.libs.imageSrcset.reflow ).toEqual(jasmine.any(Function));
    });

    describe("when loading", function() {
        beforeEach(function(){
            $('body').append('<img data-srcset="/assets/test/small-q60.jpg 320w, /assets/test/medium-q60.jpg 640w, /assets/test/large-q60.jpg 1024w" src="/assets/test/small-q60.jpg">');
            $('body').append('<img style="margin-top: 2000px;" data-defer data-srcset="/assets/test/small-q60.jpg 320w, /assets/test/medium-q60.jpg 640w, /assets/test/large-q60.jpg 1024w">');
            db.libs.imageSrcset.init();
        });

        afterEach(function(){
            $('img').remove();
        });
        
        it("should read correct number of images", function(){
            expect(db.libs.imageSrcset.getImages().length).toEqual(1);
        });

        it("should read correct number of deffered images", function(){
            expect(db.libs.imageSrcset.getDefferedImages().length).toEqual(1);
        });
    });

    describe("when re-evaluating images already loaded", function() {
        beforeEach(function(){
            $('body').append('<img height="500" data-srcset="/assets/test/small-q60.jpg 320w, /assets/test/medium-q60.jpg 640w, /assets/test/large-q60.jpg 1024w" src="/assets/test/small-q60.jpg">');
            db.libs.imageSrcset.init();
        });

        afterEach(function(){
            $('img').remove();
        });
        
        it("should change to correct src when loading the page", function() {
            expect(document.querySelectorAll('img')[0].getAttribute('src')).toBe('/assets/test/large-q60.jpg');
        });
    });

    describe("when evaluating/loading deffered images", function() {
        beforeEach(function(){
            $('body').prepend('<img id="image-test-2" width="100" height="100" style="margin-top: 2000px; display:block;" data-defer data-srcset="/assets/test/small-q60.jpg 320w, /assets/test/medium-q60.jpg 640w, /assets/test/large-q60.jpg 1024w">');
            $('body').prepend('<img id="image-test-1" width="100" height="100" style="display:block;" data-defer data-srcset="/assets/test/small-q60.jpg 320w, /assets/test/medium-q60.jpg 640w, /assets/test/large-q60.jpg 1024w">');
            db.libs.imageSrcset.init();
        });

        afterEach(function(){
            $('img').remove();
        });
        
        it("should load deffered about to enter the viewport", function() {
            expect(document.querySelectorAll('img')[0].getAttribute('src')).toBe('/assets/test/large-q60.jpg');
        });

        it("should not load deffered images not in viewport", function() {
            expect(document.querySelectorAll('img')[1].getAttribute('src')).toBeFalsy();
        });
    });

    describe("when srcset is empty", function() {
        afterEach(function(){
            $('img').remove();
        });
        
        it("should not throw errors", function() {
            $('body').prepend('<img width="100" height="100" data-defer data-srcset="">');
            expect( function(){
                db.libs.imageSrcset.init();
            } ).not.toThrow();
        });
    });

    describe("when srcset is not formatted correctly", function() {
        afterEach(function(){
            $('img').remove();
        });
        it("should not throw errors", function() {
            $('body').prepend('<img width="100" height="100" data-defer data-srcset="lkjldkflkj asfl kjlqwkj">');
            expect( function(){
                db.libs.imageSrcset.init();
            } ).not.toThrow();
        });
    });
});
