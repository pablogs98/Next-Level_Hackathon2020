var globalValue = {};

function get(key) {
    return globalValue[key];
}

function set(key, value) {
    globalValue[key] = value;
}

module.exports.getValue = get;
module.exports.setValue = set;