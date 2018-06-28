describe("All Components", function() {
    it("should have init and reflow defined", function() {
        for(var component in db.libs) {
            expect( db.libs[component].init ).toEqual(jasmine.any(Function));
            expect( db.libs[component].reflow ).toEqual(jasmine.any(Function));
        };
    });
});
