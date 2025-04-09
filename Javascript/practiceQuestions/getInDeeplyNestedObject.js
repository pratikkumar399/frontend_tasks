/**
 * @param {Object} objectParam
 * @param {string|Array<string>} pathParam
 * @param {*} [defaultValue]
 * @return {*}
 */
function get(objectParam, pathParam, defaultValue) {
    const keys = Array.isArray(pathParam) ? pathParam : pathParam.split(".");

    let result = objectParam;
    for (let i = 0; i < keys.length; i++) {
        if (result == null) {
            return defaultValue;
        }
        result = result[keys[i]];
    }

    return result === undefined ? defaultValue : result;
}

// get(john, 'profile.name.firstName'); // 'John'
// get(john, 'profile.gender'); // 'Male'
get(jane, 'profile.name.firstName', NoName); // NoName
