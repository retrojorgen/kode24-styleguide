xdescribe("db.ImageLightbox", function() {
    it("should be defined", function() {
        expect(db.ImageLightbox).toBeDefined();
    });

    it("should have init and reflow defined", function() {
        expect( db.ImageLightbox.init ).toEqual(jasmine.any(Function));
        expect( db.ImageLightbox.reflow ).toEqual(jasmine.any(Function));
    });

    describe("when clicked", function() {
        beforeEach(function(){
            $('body').append('<figure id="image-lightbox-test" data-image-lightbox><img src="http://gfx.dagbladet.no/labrador/269/269931/26993179/jpg/active/978x.jpg"></figure>');
            db.ImageLightbox.init();
        });

        afterEach(function(){
            $('figure').remove();
        });

        it("once recive the class .active", function(){
            //FIXME: trigger throws: TypeError: 'undefined' is not an object (evaluating 'b.length') in file:///Users/tom-mariusolsen/Sites/db-styleguide/styleguide/scripts/vendor.min.js (line 5) (1)
            $('#image-lightbox-test').trigger('click');
            expect( $('figure').hasClass('active') ).toBeTruthy();
        });

        it("again remove the class .active", function(){
            //FIXME: trigger throws: TypeError: 'undefined' is not an object (evaluating 'b.length') in file:///Users/tom-mariusolsen/Sites/db-styleguide/styleguide/scripts/vendor.min.js (line 5) (1)
            $('figure').trigger('click');
            $('figure').trigger('click');
            expect($('figure').hasClass('active')).toBeFalsy();
        });

    });

    describe("when markup is invalid", function() {
        beforeEach(function(){
            $('body').append('<figure data-image-lightbox></figure>');
            db.ImageLightbox.init();
        });

        afterEach(function(){
            $('figure').remove();
        });

        it("should throw error if no src is found", function(){
            expect($('figure').hasClass('active')).toBeFalsy();
            expect( function(){ $('figure').trigger('click') } ).toThrow();
        });

        it("should not recive the class active if no src is found", function(){
            expect($('figure').hasClass('active')).toBeFalsy();
        });

    });
});
