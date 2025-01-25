const Cryptr = require('cryptr');
const { model } = require('mongoose');
const cryptr = new Cryptr('zxcvbnm123zxcvbnm123');

const encryptPassword = (password) => {
    return cryptr.encrypt(password)
}
const decryptPassword = (password) => {
    return cryptr.decrypt(password)

}
module.exports = { encryptPassword, decryptPassword }