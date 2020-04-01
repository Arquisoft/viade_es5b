/*import EventEmitter from 'events';
import { act } from "@testing-library/react";

const fetchResponse = { ok: true, status: 200 };

class SolidAuthClient extends EventEmitter {
  constructor() {
    super();
    this.session = undefined;
    this.mockWebId("https://pedro223.inrupt.net/profile/card#me");
    console.log(this.session);
  }

  fetch = () => fetchResponse;

  popupLogin = () => {};

  logout = () => {};

  trackSession(callback) {
    if (this.session !== undefined) callback(this.session);
    this.on('session', callback);
  }

  mockWebId(webId) {
    this.session = webId ? { webId } : null;
    act(() => {
      this.emit('session', this.session);
    });
  }
}

const instance = new SolidAuthClient();
jest.spyOn(instance, 'fetch');
jest.spyOn(instance, 'popupLogin');
jest.spyOn(instance, 'logout');
jest.spyOn(instance, 'removeListener');

export default instance;*/
