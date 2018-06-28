xdescribe("db.libs.alert", function() {
    it("should be defined", function() {
        expect(db.libs.alert).toBeDefined();
    });

    describe("db.libs.Alert.create", function() {

        it("should create a new alert", function(){
            db.Alert.create({ text: 'test' });

            var $alerts = $('.alert-group');
            var $alert = $alerts.find('.alert-box');

            expect( $alerts.length ).toBe(1);
            expect( $alert.length ).toBe(1);
            expect( $alert.text() ).toContain('test');
        });

        it("should append new alerts", function(){
            db.Alert.create({ text: 'again' });

            var $alerts = $('.alert-group');
            var $alert = $alerts.find('.alert-box');

            expect( $alerts.length ).toBe(1);
            expect( $alert.length ).toBe(2);
            expect( $alert.last().text() ).toContain('again');
        });

        it("should create new alert with options", function(){
            db.Alert.create({ text: 'class and tag', classes: 'success', tag: 'div' });

            var $alerts = $('.alert-group');
            var $alert = $alerts.find('.alert-box');

            expect( $alert.last().hasClass('success') ).toBe(true);
            expect( $alert.last().prop('tagName') ).toBe('DIV');
        });

    });

    describe("db.Alert.clear", function() {

        it("should remove all alerts", function(){
            db.Alert.clear();

            var $alerts = $('.alert-group');
            expect( $alerts.length ).toBe(0);
        });

    });
});
