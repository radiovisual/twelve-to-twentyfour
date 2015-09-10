'use strict';
var assert = require('assert');

var twentyfour = require('./');

describe('twelve-to-twentyfour', function(){

    it('should error when not a string', function(){
        assert.throws(function(){
            twentyfour({});
        });
    });

    it('should error with incorrect format: incorrect length', function(){
        assert.throws(function(){
            twentyfour("000:000AM");
        });
    });

    it('should error with incorrect 24-hour format', function(done){
        assert.throws(function(){
            twentyfour("00:00:85");
        });
        assert.throws(function(){
            twentyfour("00:85:00");
        });
        assert.throws(function(){
            twentyfour("85:00:00");
        });
        done();
    });

    it('should error with incorrect format: no colon', function(){
        assert.throws(function(){
            twentyfour("000000AM");
        });
    });

    it('should error with incorrect format: no am or pm', function(){
        assert.throws(function(){
            twentyfour("1:00");
        });
    });

    it('should error with incorrect seconds', function(){
        assert.throws(function(){
            twentyfour("1:00:89 AM");
        });
    });

    it('should allow 24-hour strings to pass unchanged', function(){
        assert.equal(twentyfour("00:00"), '00:00');
    });

    it('should allow 24-hour strings with seconds to pass unchanged', function(){
        assert.equal(twentyfour("10:10:10"), '10:10:10');
    });

    it('should allow 12-hour strings with seconds', function(){
        assert.equal(twentyfour("10:10:01 PM"), '22:10:01');
    });

    it('should error if hours is greater than 12', function(){
        assert.throws(function(){
            twentyfour("13:00AM");
        });
    });

    it('should error if minutes is greater than 59', function(){
        assert.throws(function(){
            twentyfour("12:65AM");
        });
    });

    it('should honor one space after the time', function(){
        assert.equal(twentyfour('1:01 PM'), '13:01');
        assert.equal(twentyfour('1:01PM'), '13:01');
        assert.throws(function(){
            twentyfour("12:00  AM"); // two spaces fail
        });
    });

    it('should convert 12-hour time to 24-hour time ', function(){

        // AM
        assert.equal(twentyfour('1:01 AM'), '01:01');
        assert.equal(twentyfour('2:59 AM'), '02:59');
        assert.equal(twentyfour('3:12 AM'), '03:12');
        assert.equal(twentyfour('4:00 AM'), '04:00');
        assert.equal(twentyfour('5:00 AM'), '05:00');
        assert.equal(twentyfour('6:12 AM'), '06:12');
        assert.equal(twentyfour('7:22 AM'), '07:22');
        assert.equal(twentyfour('8:59 AM'), '08:59');
        assert.equal(twentyfour('9:59 AM'), '09:59');
        assert.equal(twentyfour('10:59 AM'), '10:59');
        assert.equal(twentyfour('11:04 AM'), '11:04');
        assert.equal(twentyfour('12:04 PM'), '12:04');

        // PM
        assert.equal(twentyfour('1:01 PM'), '13:01');
        assert.equal(twentyfour('2:59 PM'), '14:59');
        assert.equal(twentyfour('3:12 PM'), '15:12');
        assert.equal(twentyfour('4:04:04 PM'), '16:04:04');
        assert.equal(twentyfour('5:00 PM'), '17:00');
        assert.equal(twentyfour('6:12 PM'), '18:12');
        assert.equal(twentyfour('7:22 PM'), '19:22');
        assert.equal(twentyfour('8:59 PM'), '20:59');
        assert.equal(twentyfour('9:59 PM'), '21:59');
        assert.equal(twentyfour('10:59 PM'), '22:59');
        assert.equal(twentyfour('11:04 PM'), '23:04');
        assert.equal(twentyfour('12:04AM'), '00:04');
        assert.equal(twentyfour('12:00AM'), '00:00');
    });




});