xdescribe("db.Table", function() {
    it("sould be defined", function() {
        expect(db.Table).toBeDefined();
    });

    it("should have init and reflow defined", function() {
        expect( db.Table.init ).toEqual(jasmine.any(Function));
        expect( db.Table.reflow ).toEqual(jasmine.any(Function));
    });

    describe("when row is clicked", function() {
        beforeEach(function(){
            $('body').append('<table id="table-test" data-focus><tbody><tr id="table-row"><td></td></tr></tbody></table>');
            db.Table.init();
        });

        afterEach(function(){
            $('#table-test').remove();
        });

        it("once recive the class .active", function(){
            $('#table-row').trigger('click');
            expect($('#table-row').hasClass('active')).toBeTruthy();
        });

        it("again remove the class .active", function(){
            $('#table-row').trigger('click');
            $('#table-row').trigger('click');
            expect($('#table-row').hasClass('active')).toBeFalsy();
        });

    });
});
