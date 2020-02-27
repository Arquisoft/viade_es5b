'use strict'

/**
 * Returns a partial Email object (minus the `to` and `from` properties),
 * suitable for sending with Nodemailer.
 *
 * Used to send a Welcome email after a new user account has been created.
 *
 * @param data {Object}
 *
 * @param data.webid {string}
 *
 * @return {Object}
 */
function render (data) {
  return {
    subject: 'Hooooola, este es el mejor servidor de PODs',

    /**
     * Text version of the Welcome email
     */
    text: `-.-

Your account has been created.

Your Web Id: ${data.webid}`,

    /**
     * HTML version of the Welcome email
     */
    html: `<p>Que si, estas creando un POD</p>

<p>Buen trabajo, ya estas lsito.</p>

<p>Your Web Id: ${data.webid}</p>`
  }
}

module.exports.render = render
