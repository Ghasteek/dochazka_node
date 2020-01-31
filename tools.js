module.exports = {
    multiply: function (input) {
        return (input * input);
    },
    timeToMinutes: function (input){
        const inputSplitted = input.split(':');
        return (inputSplitted[0]*60 + inputSplitted[1]*1);
    },
    minutesToTime: function (input){ 
        let wholeMinutes = input % 60;
        const wholeHours = (input - wholeMinutes) / 60;
        if (wholeMinutes < 10) { wholeMinutes = '0' + wholeMinutes; }
        //console.log(`${wholeHours}:${wholeMinutes}`);
        return (`${wholeHours}:${wholeMinutes}`);
    },
    /*remakeShift: function (inputShifts){ 
        let remakedShifts = [] [];
        let tempArray = [];
        inputShifts.forEach(remakedShift => {
            //tempArray.push(this.intToDate(remakedShift.date)),
            tempArray.push(22),
            console.log('numb');
            //tempArray.push(`${this.minutesToTime(remakedShift.arrival)}`),
            //tempArray.push(`${this.minutesToTime(remakedShift.departure)}`),
            console.log(tempArray),
            remakedShifts.push(tempArray),
            tempArray = [];
        });
        console.log('shifts remaked...' + remakedShifts);
        //return remakedShifts;
    },*/
    dateToInt: function (stringDate){
        return stringDate.replace(/-/g, '');
    },
    intToDate: function (intDate){
        return (`${intDate.substring(6, 8)}.${intDate.substring(4, 6)}.${intDate.substring(0, 4)}`);
    }
  };