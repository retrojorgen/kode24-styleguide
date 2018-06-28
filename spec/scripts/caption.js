xdescribe("db.Caption", function() {
    it("sould be defined", function() {
        expect(db.Caption).toBeDefined();
    });

    it("should have init and reflow defined", function() {
        expect( db.Caption.init ).toEqual(jasmine.any(Function));
        expect( db.Caption.reflow ).toEqual(jasmine.any(Function));
    });

    describe("when clicked", function() {
        beforeEach(function(){
            $('body').append('<div class="caption" data-expand>Test</div>');
            db.Caption.init();
        });

        afterEach(function(){
            $('.caption').remove();
        });

        it("once recive the class .active", function(){
            $('.caption').trigger('click');
            expect($('.caption').hasClass('active')).toBeTruthy();
        });

        it("again remove the class .active", function(){
            $('.caption').trigger('click');
            $('.caption').trigger('click');
            expect($('.caption').hasClass('active')).toBeFalsy();
        });

    });
});
