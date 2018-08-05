class Api {
  constructor() {
    this.token = null;
    this.id = null;
    this.error = null;
  }
  setToken(newToken, newId) {
    this.token = newToken;
    this.id = newId;
  }
  request(endPoint, options) {
    const finalEndpoint = endPoint.replace(':userId', this.id);
    const finalOptions = options || {};
    if (!finalOptions.headers) {
      finalOptions.headers = {};
    }
    if (this.token) {
      finalOptions.headers.Authorization = `Bearer ${this.token}`;
    }
    if (finalOptions.method === 'POST') {
      if (!finalOptions.headers.Accept) {
        finalOptions.headers.Accept = 'application/json';
      }
      if (!finalOptions.headers['content-type']) {
        finalOptions.headers['content-type'] = 'application/json';
      }
      if (typeof finalOptions.body === 'object') {
        finalOptions.body = JSON.stringify(finalOptions.body);
      }
    }
    return fetch(
      `http://localhost:3000/api/v1/${finalEndpoint}`,
      finalOptions,
    ).then(data => data.json());
  }
}

export default new Api();
