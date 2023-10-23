const moment = require('moment');
const fs = require("fs");

const arrayRemove =  (arr, value) => { 
    return arr.filter(function(ele){ 
        return ele != value; 
    });
}

const arrayDiff =  (arr1, arr2) => {
    for (var element of arr1){
        if(! arr2.includes(element)){
            arr1 = arrayRemove(arr1, element)
        }
    }
    return arr1;
}

const definePath = async function(docservers, filename) {
    var date = moment(new Date());
    var directory = docservers + date.format('Y/') + date.format('MM/') + date.format('DD/')
    try {
        await fs.lstatSync(directory).isDirectory()
    } catch (e) {
        if (e.code == 'ENOENT') {
            try {
                await fs.promises.mkdir(directory, { recursive: true });
            } catch (error) {
                return { error: error };
            }
        }
        else {
            return { error: e };
        }
    }

    try {
        await fs.lstatSync(directory + filename).isFile()
    } catch (e) {
        if (e.code != 'ENOENT') {
            return { error: e };
        }
    }

    return directory;
}

function roundDown(number, decimals) {
    decimals = decimals || 0;
    return ( Math.floor( number * Math.pow(10, decimals) ) / Math.pow(10, decimals) );
}

function roundUp(number, decimals) {
    decimals = decimals || 0;
    return ( Math.ceil( number * Math.pow(10, decimals) ) / Math.pow(10, decimals) );
}

module.exports = { arrayRemove, arrayDiff, definePath, roundUp, roundDown }