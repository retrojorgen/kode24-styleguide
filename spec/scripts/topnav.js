describe("db.libs.topnav", function() {
    it("sould be defined", function() {
        expect(db.libs.topnav).toBeDefined();
    });

    it("should have init and reflow defined", function() {
        expect( db.libs.topnav.init ).toEqual(jasmine.any(Function));
        expect( db.libs.topnav.reflow ).toEqual(jasmine.any(Function));
    });
});
