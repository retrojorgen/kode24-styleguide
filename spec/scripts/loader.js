describe("db.libs.loader", function() {
    it("sould be defined", function() {
        expect(db.libs.loader).toBeDefined();
    });

    it("should have init and reflow defined", function() {
        expect( db.libs.loader.init ).toEqual(jasmine.any(Function));
        expect( db.libs.loader.reflow ).toEqual(jasmine.any(Function));
    });

    describe("when calling pause", function(){
        it("should add the class 'pause'", function(){
            $('body').append('<div id="js-loader" class="loader"></div>');
            db.libs.loader.pause($('#js-loader'));
            expect($('#js-loader').hasClass('pause')).toBeTruthy();
            $('#js-loader').remove();
        });
    });

    describe("when calling play", function(){
        it("should remove the class 'pause'", function(){
            $('body').append('<div id="js-loader" class="loader"></div>');
            db.libs.loader.play($('#js-loader'));
            expect($('#js-loader').hasClass('pause')).toBeFalsy();
            $('#js-loader').remove();
        });
    });

    describe("when calling toggle", function(){
        it("should toggle the class 'pause'", function(){
            $('body').append('<div id="js-loader" class="loader"></div>');
            db.libs.loader.toggle($('#js-loader'));
            expect($('#js-loader').hasClass('pause')).toBeTruthy();
            db.libs.loader.toggle($('#js-loader'));
            expect($('#js-loader').hasClass('pause')).toBeFalsy();
            db.libs.loader.toggle($('#js-loader'));
            expect($('#js-loader').hasClass('pause')).toBeTruthy();
            $('#js-loader').remove();
        });
    });

    xdescribe("db.Loader.resume", function(){
        it("should remove the class pause from the loader", function(){
            db.Loader.resume();
            expect($('.loader').hasClass('pause')).toBeFalsy();
        });
    });

    xdescribe("db.Loader.destroy", function(){
        it("should remove the loader", function(){
            db.Loader.destroy();
            var loader = $('.loader').length;
            expect(loader).toBe(0);
        });
    });

});
