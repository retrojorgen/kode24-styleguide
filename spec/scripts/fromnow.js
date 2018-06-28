xdescribe("db.FromNow", function() {
    it("sould be defined", function() {
        expect(db.FromNow).toBeDefined();
    });

    it("should have init and reflow defined", function() {
        expect( db.FromNow.init ).toEqual(jasmine.any(Function));
        expect( db.FromNow.reflow ).toEqual(jasmine.any(Function));
    });

    describe("db.FromNow.init", function() {
        beforeEach(function(){
            $('body').append('<time id="from-now-test" data-from-now datetime="">Publisert 17. januar 2012</time>');
            $('#from-now-test').attr('datetime', moment().subtract(1, 'days').toISOString());
            db.FromNow.init();
        });

        afterEach(function(){
            $('#from-now-test').remove();
        });

        it("text should be 'fromNow'", function() {
            expect($('#from-now-test').text()).toBe('i går');
        });

        it("should recivethe class .active", function() {
            expect($('#from-now-test').hasClass('active')).toBeTruthy();
        });
    });

    describe("when clicked", function() {

        beforeEach(function(){
            $('body').append('<time id="from-now-test" data-from-now datetime="">Test</time>');
            $('#from-now-test').attr('datetime', moment().subtract(1, 'days').toISOString());
            db.FromNow.init();
        });

        afterEach(function(){
            $('#from-now-test').remove();
        });

        it("should recive the class .active", function() {
            $('#from-now-test').trigger('click');
            expect($('#from-now-test').hasClass('active')).toBeFalsy();
        });

        it("should revert the text to it's original", function() {
            $('#from-now-test').trigger('click');
            expect($('#from-now-test').text()).toBe('Test');
        });

        it("twice should add class .active again", function() {
            $('#from-now-test').trigger('click');
            $('#from-now-test').trigger('click');
            expect($('#from-now-test').hasClass('active')).toBeTruthy();
        });

        it("twice should change the text to 'fromNow' again", function() {
            $('#from-now-test').trigger('click');
            $('#from-now-test').trigger('click');
            expect($('#from-now-test').text()).toBe('i går');
        });

    });

    describe("when date is invalid", function() {
        beforeEach(function(){
            $('body').append('<time id="from-now-test" data-from-now datetime="">Test</time>');
            $('#from-now-test').attr('datetime', moment().subtract(1, 'days').format('YYYY.MM.DD'));
        });

        afterEach(function(){
            $('#from-now-test').remove();
        });

        it("throw error", function() {
            expect( db.FromNow.init ).toThrow();
        });

        it("leave text unchanged", function() {
            expect($('#from-now-test').text()).toBe('Test');
        });

        it("text does not change when clicked", function() {
            $('#from-now-test').trigger('click');
            expect($('#from-now-test').text()).toBe('Test');
        });

    });

});
