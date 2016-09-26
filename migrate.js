#!/usr/bin/env node

var fs = require('fs');

var original = JSON.parse(fs.readFileSync('big.json'));

var timestamps = {};

var baseTime;

console.log("Opened file with name", original.name);

baseTime = new Date(original.date).getTime();
console.log(baseTime);

baseTime /= 1000;
baseTime = baseTime.toFixed(0);
console.log(baseTime);

console.log("number of keys", Object.keys(original.channels).length);

var keys = Object.keys(original.channels);


for (var l = 0; l < keys.length; l++) {
    var key = keys[l];
    var channel = original.channels[key];
    for (var i = 0; i < channel.timestamps.length; i++) {
        var ts = channel.timestamps[i];
        var value = channel.values[i];
        if (!timestamps.hasOwnProperty(ts)) {
            timestamps[ts] = {};
        }
        timestamps[ts][key] = value;
    }
}

var data = '';
keys = Object.keys(timestamps);
for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var mark = {
        '@timestamp': key,
        sensors: timestamps[key]
    };
    data += JSON.stringify({"index": {"_id": i}}) + '\n';
    data += JSON.stringify(mark) + '\n';
}

fs.writeFileSync('out.json', data);

console.log('done');

