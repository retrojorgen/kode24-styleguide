describe("db.libs.tvguide", function() {
    it("sould be defined", function() {
        expect(db.libs.tvguide).toBeDefined();
    });

    it("should have init and reflow defined", function() {
        expect( db.libs.tvguide.init ).toEqual(jasmine.any(Function));
        expect( db.libs.tvguide.reflow ).toEqual(jasmine.any(Function));
    });
});
