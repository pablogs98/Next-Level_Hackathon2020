var globalValue = "";

function getValue() {
    return globalValue;
}

function setValue(value) {
    globalValue = value;
}

module.exports.getValue = getValue;
module.exports.setValue = setValue;