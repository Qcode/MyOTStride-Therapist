class Api {
  constructor() {
    this.token = localStorage.getItem('token');
    this.therapistId = localStorage.getItem('therapistId');
    this.clientId = localStorage.getItem('clientId');
    this.error = null;
  }

  setToken(newToken) {
    this.token = newToken;
    localStorage.setItem('token', newToken);
  }

  setClientId(newClientId) {
    this.clientId = newClientId;
    localStorage.setItem('clientId',newClientId);
  }

  setTherapistId(newTherapistId) {
    this.therapistId = newTherapistId;
    localStorage.setItem('therapistId',newTherapistId);
  }

  request(endPoint, options) {
    const finalEndpoint = endPoint
      .replace(':therapistId', this.therapistId)
      .replace(':clientId', this.clientId);
    const finalOptions = options || {};
    if (!finalOptions.headers) {
      finalOptions.headers = {};
    }
    if (this.token) {
      finalOptions.headers.Authorization = `Bearer ${this.token}`;
    }
    if (typeof finalOptions.body === 'object') {
      finalOptions.body = JSON.stringify(finalOptions.body);
    }
    if (!finalOptions.headers.Accept) {
      finalOptions.headers.Accept = 'application/json';
    }
    if (!finalOptions.headers['content-type']) {
      finalOptions.headers['content-type'] = 'application/json';
    }
    return fetch(
      `http://localhost:3000/api/v1/${finalEndpoint}`,
      finalOptions
    ).then(data => {
      if (!data.ok) {
        throw new Error(data.status);
      }
      const contentType = data.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return data.json();
      }
      return data.text();
    });
  }
}

export default new Api();
