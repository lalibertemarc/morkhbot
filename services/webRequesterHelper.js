const axios = require("axios");

async function getAsync(url, timeout = 3000, headers = {}) {
    return await axios.get(url, { timeout: timeout, headers: headers });
}

async function postAsync(url, dataToPost, timeout = 3000, headers = {}) {
    return await axios.post(url, dataToPost, { timeout: timeout, headers: headers });
}

async function putAsync(url, dataToPost, timeout = 3000, headers = {}) {
    return await axios.put(url, dataToPost, { timeout: timeout, headers: headers });
}

async function patchAsync(url, dataToPost, timeout = 3000, headers = {}) {
    return await axios.patch(url, dataToPost, { timeout: timeout, headers: headers });
}

module.exports = {
    getAsync: getAsync,
    postAsync: postAsync,
    putAsync: putAsync,
    patchAsync: patchAsync
};
