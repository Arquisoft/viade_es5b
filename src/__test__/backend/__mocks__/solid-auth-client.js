/*
 * Clase que representa el modulo auth de solid
 */
'use strict';

const auth =jest.genMockFromModule('solid-auth-client');

auth.currentSession = function() {
  return {webId : "https://pedro223.inrupt.net/profile/card#me"}
}

module.exports = auth;

