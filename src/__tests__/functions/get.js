/**
 * get.js
 * 
 * @param {string | string[]} path
 * @param {object} data
 * @returns unknown
 */

function isObject(data) {
    return (
        data &&
        typeof data === 'object' &&
        typeof data !== 'function' &&
        !Array.isArray(data)
    );
}

function removeBracketsFromString(path) {
    while (path.indexOf('[') !== -1 || path.indexOf(']') !== -1) {
        path = path.replace('[', '.').replace(']', '');
    }
    return path;
}

function goThroughPath(path, data) {
    let result = data[path.splice(0,1)];
    for(let value of path) {
        result = result[value];
        if(!result) break;
    }
    return result;
}


function get(path, data) {
    if(isObject(data)) {
        if (typeof(path) === 'string') {
            path = removeBracketsFromString(path).split('.');
            return goThroughPath(path, data);
        } 
        else if (Array.isArray(path)) {
            return goThroughPath(path, data);
        }
    }
}

module.exports = { get }