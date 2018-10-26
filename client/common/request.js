const fetch = require('isomorphic-fetch');
const urljoin = require('url-join');

let serverAddr = 'http://localhost:3100';
const getServerAddr = () => serverAddr;
const setServerAddr = addr => {
  serverAddr = addr;
}

const addr = (path, params) => {
  if (params == null || params.length === 0) {
    return urljoin(getServerAddr(), path);
  }
  let paramsStr = '';
  if (params != null && Object.keys(params).length > 0) {
    paramsStr = Object.keys(params).map(key => `${key}=${encodeURIComponent(params[key])}`
      ).join('&');
  }
  return urljoin(getServerAddr(), `${path}?${paramsStr}`);
};

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
};

const parseJSON = (response) => response.json();

const postJsonHeader = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const getJsonHeader = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const post = (url, data = {}) => {
  return fetch(addr(url), {
    method: 'POST',
    headers: postJsonHeader,
    body: JSON.stringify(data),
  })
  .then(checkStatus);
};

const get = (url, params = {}, data) => {
  if (data) {
    return fetch(addr(url, params), {
      method: 'GET',
      headers: getJsonHeader,
      body: JSON.stringify(data),
    })
    .then(checkStatus);
  }
  return fetch(addr(url, params), {
    method: 'GET',
  })
  .then(checkStatus);
};

const jsonPost = (...args) => {
  return post(...args)
    .then(parseJSON)
    .then(checkJson);
};

const jsonGet = (...args) => {
  return get(...args)
    .then(parseJSON)
    .then(checkJson);
};

module.exports = {
  get, post, jsonGet, jsonPost, setServerAddr,
}
