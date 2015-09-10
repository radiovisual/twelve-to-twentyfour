'use strict';

module.exports = function(str, opts) {

    if (typeof str !== 'string') {
        throw new TypeError('Expected a string');
    }

    // Allow strings already in the 24-hour format to pass through
    var reg24 = /^[0-9]{2}:[0-9]{2}$/;

    if (reg24.test(str)) {

        str.split(':').map(function (i) { parseInt(i, 10); });

        if (str[0] < 24 && str[1] < 60) {
            return str;
        }
    }

    // valid strings: '0:00AM' || '0:00 AM' || '00:00PM' || '00:00 PM'
    if ((str.length < 6 || str.length > 8)) {
        throw new SyntaxError('Invalid time string format. Use `0:00XX` || `0:00 XX` || `00:00XX` || `00:00 XX`');
    }

    // the colon should separate the numbers
    var separator = str.indexOf(":");
    if (separator === -1) {
        throw new SyntaxError('Hours and mins should be separated with a colon');
    }

    // there should be an AM or PM
    var ampm = str.slice(str.length - 2).toUpperCase();
    if (!(ampm === 'AM' || ampm === 'PM')) {
        throw new SyntaxError('Time string must have an `AM` or `PM`.');
    }

    opts = opts || {};

    var time = str.substring(0, str.length - 2).split(":");
    var hour = parseInt(time[0], 10);
    var mins = parseInt(time[1], 10);

    if (isNaN(hour) || isNaN(mins)) {
        throw new SyntaxError('Hour and minutes must be numbers: `00:00`');
    }

    if (hour > 12){ throw new SyntaxError("Hours must be less than 12 in 12-hour time"); }
    if (mins > 59){ throw new SyntaxError("Minutes must be less than 59 in 12-hour time"); }


    if (ampm === 'AM') {

        if (hour < 12) {
            return makeTimeString(hour, mins);

        } else if (hour === 12) {
            return makeTimeString(0, mins);
        }

    } else if (ampm === 'PM') {

        switch (hour) {
            case  1:
                return makeTimeString(13, mins);
            case  2:
                return makeTimeString(14, mins);
            case  3:
                return makeTimeString(15, mins);
            case  4:
                return makeTimeString(16, mins);
            case  5:
                return makeTimeString(17, mins);
            case  6:
                return makeTimeString(18, mins);
            case  7:
                return makeTimeString(19, mins);
            case  8:
                return makeTimeString(20, mins);
            case  9:
                return makeTimeString(21, mins);
            case 10:
                return makeTimeString(22, mins);
            case 11:
                return makeTimeString(23, mins);
            case 12:
                return makeTimeString(12, mins);
        }

    }
};


function makeTimeString(hour, mins){
    return zp(hour)+":"+zp(mins);
}

function zp(num) {

    if (num < 10) {
        return "0"+num;
    } else {
        return num;
    }

}
