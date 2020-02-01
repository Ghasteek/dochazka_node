module.exports = {
    // takes time in format HH:MM in string and return it in minutes sum
    timeToMinutes: function (input){
        const inputSplitted = input.split(':');
        return (inputSplitted[0]*60 + inputSplitted[1]*1);
    },

    // takes time in sum of minutes in number and return string in HH:MM format
    minutesToTime: function (input){ 
        let wholeMinutes = input % 60;
        const wholeHours = (input - wholeMinutes) / 60;
        if (wholeMinutes < 10) { wholeMinutes = '0' + wholeMinutes; } // leading zero to miutes
        return (`${wholeHours}:${wholeMinutes}`);
    },

    // take date in formay YYYY-MM-DD and takes these '-' out, so it can be put to db
    dateToInt: function (stringDate){
        return stringDate.replace(/-/g, '');
    },

    // takes date from db in format YYYYMMDD and returns string in DD.MM.YYYY
    intToDate: function (intDate){
        const dateString = intDate + ''; // just "convert" int into string
        return (`${dateString.substring(6, 8)}.${dateString.substring(4, 6)}.${dateString.substring(0, 4)}`);
    }
  };